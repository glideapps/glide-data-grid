import * as React from "react";
import { Theme } from "../common/styles";
import { withTheme } from "styled-components";
import ImageWindowLoader from "../common/image-window-loader";
import { getColumnIndexForX, getEffectiveColumns, getRowIndexForY, useMappedColumns } from "./data-grid-lib";
import {
    GridColumn,
    GridCell,
    GridCellKind,
    Rectangle,
    GridSelection,
    GridMouseEventArgs,
    GridDragEventArgs,
    GridKeyEventArgs,
    InnerGridCell,
} from "./data-grid-types";
import { dontAwait } from "../common/support";
import { buildSpriteMap } from "./data-grid-sprites";
import { useDebouncedMemo, useEventListener } from "../common/utils";
import makeRange from "lodash/range";
import { drawCell, drawGrid } from "./data-grid-render";

export interface DataGridProps {
    readonly width: number;
    readonly height: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly translateX?: number;
    readonly translateY?: number;

    readonly firstColSticky: boolean;
    readonly lastRowSticky: boolean;
    readonly allowResize?: boolean;
    readonly isResizing: boolean;
    readonly isDragging: boolean;

    readonly columns: readonly GridColumn[];
    readonly rows: number;

    readonly headerHeight: number;
    readonly rowHeight: number | ((index: number) => number);

    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;

    readonly eventTargetRef?: React.MutableRefObject<HTMLDivElement | null>;

    readonly className?: string;

    readonly getCellContent: (cell: readonly [number, number]) => InnerGridCell;
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;

    readonly selectedRows?: readonly number[];
    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;
    readonly prelightCells?: readonly (readonly [number, number])[];

    readonly disabledRows?: readonly number[];

    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs) => void;

    readonly onCellFocused?: (args: readonly [number, number]) => void;

    readonly onMouseMove?: (event: MouseEvent) => void;

    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;

    readonly isDraggable?: boolean;
    readonly onDragStart?: (args: GridDragEventArgs) => void;

    readonly drawCustomCell?: (ctx: CanvasRenderingContext2D, cell: GridCell, theme: Theme, rect: Rectangle) => boolean;

    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };
}

interface Props extends DataGridProps {
    readonly theme: Theme;
}

interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
}

export interface DataGridRef {
    focus: () => void;
}

const DataGrid: React.ForwardRefRenderFunction<DataGridRef, Props> = (p, forwardedRef) => {
    const {
        width,
        height,
        className,
        theme,
        columns,
        cellXOffset: cellXOffsetReal,
        cellYOffset,
        headerHeight,
        rowHeight,
        rows,
        getCellContent,
        onHeaderMenuClick,
        selectedRows,
        selectedCell,
        selectedColumns,
        firstColSticky,
        lastRowSticky,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onItemHovered,
        dragAndDropState,
        onKeyDown,
        onKeyUp,
        canvasRef,
        onDragStart,
        eventTargetRef,
        isResizing,
        isDragging,
        isDraggable,
        allowResize,
        disabledRows,
        prelightCells,
        drawCustomCell,
        onCellFocused,
    } = p;
    const translateX = p.translateX ?? 0;
    const translateY = p.translateY ?? 0;
    const cellXOffset = Math.max(0, Math.min(columns.length - 1, cellXOffsetReal));

    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const imageLoader = React.useRef<ImageWindowLoader>();
    const canBlit = React.useRef<boolean>();
    const damageRegion = React.useRef<readonly (readonly [number, number])[] | undefined>(undefined);
    const lastBlitData = React.useRef<BlitData>({ cellXOffset, cellYOffset, translateX, translateY });
    const [hoveredItem, setHoveredItem] = React.useState<readonly [number, number | undefined] | undefined>();
    const [hoveredOnEdge, setHoveredOnEdge] = React.useState<boolean>();

    React.useEffect(() => {
        dontAwait(buildSpriteMap(theme));
    }, [theme]);

    const mappedColumns = useMappedColumns(columns, firstColSticky);

    const getBoundsForItem = React.useCallback(
        (canvas: HTMLCanvasElement, col: number, row: number | undefined): Rectangle => {
            const rect = canvas.getBoundingClientRect();

            const result: Rectangle = {
                x: rect.x,
                y: rect.y + headerHeight + translateY,
                width: 0,
                height: 0,
            };
            const effectiveCols = getEffectiveColumns(
                mappedColumns,
                cellXOffset,
                width,
                firstColSticky,
                undefined,
                translateX
            );

            for (const c of effectiveCols) {
                result.width = c.width + 1;
                if (c.sourceIndex === col) {
                    if (!c.sticky) result.x += translateX;
                    break;
                }
                result.x += c.width;
            }

            if (row === undefined) {
                result.y = rect.y;
                result.height = headerHeight;
            } else if (lastRowSticky && row === rows - 1) {
                const stickyHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
                result.y = rect.y + (height - stickyHeight);
                result.height = stickyHeight;
            } else {
                for (let r = cellYOffset; r < row; r++) {
                    result.y += typeof rowHeight === "number" ? rowHeight : rowHeight(r);
                }
                result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
            }

            return result;
        },
        [
            headerHeight,
            translateY,
            mappedColumns,
            cellXOffset,
            width,
            firstColSticky,
            translateX,
            lastRowSticky,
            rows,
            rowHeight,
            height,
            cellYOffset,
        ]
    );

    const getMouseArgsForPosition = React.useCallback(
        (canvas: HTMLCanvasElement, posX: number, posY: number, ev?: MouseEvent): GridMouseEventArgs => {
            const rect = canvas.getBoundingClientRect();
            const x = posX - rect.left;
            const y = posY - rect.top;
            const edgeDetectionBuffer = 5;

            const effectiveCols = getEffectiveColumns(
                mappedColumns,
                cellXOffset,
                width,
                firstColSticky,
                undefined,
                translateX
            );

            // -1 === off right edge
            const col = getColumnIndexForX(x, effectiveCols, translateX);

            // -1: header or above
            // undefined: offbottom
            const row = getRowIndexForY(
                y,
                height,
                headerHeight,
                rows,
                rowHeight,
                cellYOffset,
                translateY,
                lastRowSticky
            );

            const shiftKey = ev?.shiftKey === true;

            let result: GridMouseEventArgs;
            if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
                const horizontal = x > width ? -1 : x < 0 ? 1 : 0;
                const vertical = y > height ? 1 : y < 0 ? -1 : 0;

                result = {
                    kind: "out-of-bounds",
                    location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row ?? rows - 1],
                    direction: [horizontal, vertical],
                    shiftKey,
                };
            } else if (row === -1) {
                let bounds = getBoundsForItem(canvas, col, undefined);
                const firstAllowed = firstColSticky ? 1 : 0;
                let isEdge =
                    bounds !== undefined &&
                    bounds.x + bounds.width - posX <= edgeDetectionBuffer &&
                    col >= firstAllowed;

                const previousCol = col - 1;
                if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= firstAllowed) {
                    isEdge = true;
                    bounds = getBoundsForItem(canvas, previousCol, undefined);
                    result = {
                        kind: "header",
                        location: [previousCol, undefined],
                        bounds: bounds,
                        isEdge,
                        shiftKey,
                    };
                } else {
                    result = {
                        kind: "header",
                        location: [col, undefined],
                        bounds: bounds,
                        isEdge,
                        shiftKey,
                    };
                }
            } else {
                const bounds = getBoundsForItem(canvas, col, row);
                const isEdge = bounds !== undefined && bounds.x + bounds.width - posX < edgeDetectionBuffer;
                result = {
                    kind: "cell",
                    location: [col, row],
                    bounds: bounds,
                    isEdge,
                    shiftKey,
                };
            }
            return result;
        },
        [
            mappedColumns,
            cellXOffset,
            width,
            firstColSticky,
            translateX,
            height,
            headerHeight,
            rows,
            rowHeight,
            cellYOffset,
            translateY,
            lastRowSticky,
            getBoundsForItem,
        ]
    );

    function isSameItem(item: GridMouseEventArgs | undefined, other: GridMouseEventArgs | undefined) {
        if (item === other) return true;
        return (
            item?.kind === other?.kind &&
            item?.location[0] === other?.location[0] &&
            item?.location[1] === other?.location[1]
        );
    }

    let hoveredCol: number | undefined;
    if (hoveredItem?.[0] !== undefined && hoveredItem[1] === undefined) {
        hoveredCol = hoveredItem[0];
    }

    const draw = React.useCallback(() => {
        const canvas = ref.current;
        if (canvas === null) return;

        drawGrid(
            width,
            height,
            cellXOffset,
            cellYOffset,
            translateX,
            translateY,
            columns,
            mappedColumns,
            firstColSticky,
            dragAndDropState,
            theme,
            headerHeight,
            selectedRows,
            disabledRows,
            rowHeight,
            selectedColumns,
            hoveredCol,
            isResizing,
            selectedCell,
            lastRowSticky,
            rows,
            getCellContent,
            drawCustomCell,
            prelightCells,
            imageLoader.current,
            lastBlitData,
            canvas,
            canBlit.current,
            damageRegion.current
        );
    }, [
        width,
        height,
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        columns,
        mappedColumns,
        firstColSticky,
        dragAndDropState,
        theme,
        headerHeight,
        selectedRows,
        disabledRows,
        rowHeight,
        selectedColumns,
        hoveredCol,
        isResizing,
        selectedCell,
        lastRowSticky,
        rows,
        getCellContent,
        drawCustomCell,
        prelightCells,
    ]);

    React.useEffect(() => {
        imageLoader.current = new ImageWindowLoader();
    }, []);

    canBlit.current = canBlit.current !== undefined;
    React.useEffect(() => {
        canBlit.current = false;
    }, [
        width,
        height,
        columns,
        theme,
        headerHeight,
        rowHeight,
        rows,
        isResizing,
        getCellContent,
        selectedRows,
        selectedColumns,
        selectedCell,
        firstColSticky,
        dragAndDropState,
        hoveredCol,
        prelightCells,
    ]);

    React.useEffect(draw, [draw]);

    const imageLoaded = React.useCallback(
        (locations: readonly (readonly [number, number])[]) => {
            canBlit.current = false;
            damageRegion.current = locations;
            draw();
            damageRegion.current = undefined;
        },
        [draw]
    );

    imageLoader.current?.setCallback(imageLoaded);

    const [hCol, hRow] = hoveredItem ?? [];
    const headerHovered = hCol !== undefined && hRow === undefined;
    const newRowCellHovered =
        hCol !== undefined && hRow !== undefined && getCellContent([hCol, hRow]).kind === "new-row";
    const canDrag = hoveredOnEdge ?? false;
    const style = React.useMemo(
        () => ({
            width,
            height,
            display: "block",
            cursor: isDragging
                ? "grabbing"
                : canDrag || isResizing
                ? "col-resize"
                : headerHovered || newRowCellHovered
                ? "pointer"
                : "default",
        }),
        [width, height, canDrag, isResizing, isDragging, headerHovered, newRowCellHovered]
    );

    const target = eventTargetRef?.current;
    if (target !== null && target !== undefined) {
        // because we have an event target we need to set its cursor instead.
        target.style.cursor = style.cursor;
    }

    const onMouseDownImpl = React.useCallback(
        (ev: MouseEvent) => {
            const canvas = ref.current;
            const eventTarget = eventTargetRef?.current;
            if (canvas === null || (ev.target !== canvas && ev.target !== eventTarget)) return;
            const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);

            if (args.kind === "header") {
                const [col] = args.location;
                const header = columns[col];

                if (header.hasMenu === true && !(hoveredOnEdge ?? false)) {
                    const headerBounds = getBoundsForItem(canvas, col, undefined);
                    if (ev.clientX > headerBounds.x + headerBounds.width - 40) {
                        onHeaderMenuClick?.(col, headerBounds);
                        return;
                    }
                }
            }

            onMouseDown?.(args);
        },
        [
            eventTargetRef,
            getMouseArgsForPosition,
            onMouseDown,
            columns,
            hoveredOnEdge,
            getBoundsForItem,
            onHeaderMenuClick,
        ]
    );
    useEventListener("mousedown", onMouseDownImpl, window, true);

    const onMouseUpImpl = React.useCallback(
        (ev: MouseEvent) => {
            const canvas = ref.current;
            if (canvas === null || onMouseUp === undefined) return;

            onMouseUp(getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev));
        },
        [getMouseArgsForPosition, onMouseUp]
    );
    useEventListener("mouseup", onMouseUpImpl, window, true);

    const hoveredRef = React.useRef<GridMouseEventArgs>();
    const onMouseMoveImpl = React.useCallback(
        (ev: MouseEvent) => {
            const canvas = ref.current;
            if (canvas === null) return;

            const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
            if (!isSameItem(args, hoveredRef.current)) {
                onItemHovered?.(args);
                setHoveredItem(args.kind === "out-of-bounds" ? undefined : args.location);
                hoveredRef.current = args;
            }

            setHoveredOnEdge(args.kind !== "out-of-bounds" && args.isEdge && allowResize === true);

            onMouseMove?.(ev);
        },
        [getMouseArgsForPosition, onItemHovered, allowResize, onMouseMove]
    );
    useEventListener("mousemove", onMouseMoveImpl, window, true);

    const onKeyDownImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null) return;

            let bounds: Rectangle | undefined;
            if (selectedCell !== undefined) {
                bounds = getBoundsForItem(canvas, selectedCell.cell[0], selectedCell.cell[1]);
            }

            onKeyDown?.({
                bounds,
                cancel: () => {
                    event.stopPropagation();
                    event.preventDefault();
                },
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                key: event.key,
                keyCode: event.keyCode,
            });
        },
        [onKeyDown, selectedCell, getBoundsForItem]
    );

    const onKeyUpImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null) return;

            let bounds: Rectangle | undefined;
            if (selectedCell !== undefined) {
                bounds = getBoundsForItem(canvas, selectedCell.cell[0], selectedCell.cell[1]);
            }

            onKeyUp?.({
                bounds,
                cancel: () => {
                    event.stopPropagation();
                    event.preventDefault();
                },
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                key: event.key,
                keyCode: event.keyCode,
            });
        },
        [onKeyUp, selectedCell, getBoundsForItem]
    );

    const refImpl = React.useCallback(
        (instance: HTMLCanvasElement | null) => {
            ref.current = instance;
            if (canvasRef !== undefined) {
                canvasRef.current = instance;
            }
        },
        [canvasRef]
    );

    const onDragStartImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = ref.current;
            if (canvas === null || !isDraggable === true) return;

            let dragMime: string | undefined;
            let dragData: string | undefined;

            const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const setData = (mime: string, payload: string) => {
                dragMime = mime;
                dragData = payload;
            };

            let dragImage: Element | undefined;
            let dragImageX: number | undefined;
            let dragImageY: number | undefined;
            const setDragImage = (image: Element, x: number, y: number) => {
                dragImage = image;
                dragImageX = x;
                dragImageY = y;
            };

            onDragStart?.({
                ...args,
                setData,
                setDragImage,
            });
            if (dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
                event.dataTransfer.setData(dragMime, dragData);
                event.dataTransfer.effectAllowed = "link";

                if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
                    event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
                } else {
                    const [col, row] = args.location;
                    if (row !== undefined) {
                        const offscreen = document.createElement("canvas");
                        const boundsForDragTarget = getBoundsForItem(canvas, col, row);

                        offscreen.width = boundsForDragTarget.width;
                        offscreen.height = boundsForDragTarget.height;

                        const ctx = offscreen.getContext("2d");
                        if (ctx !== null) {
                            ctx.fillStyle = theme.dataViewer.bgColor;
                            ctx.fillRect(0, 0, offscreen.width, offscreen.height);
                            drawCell(
                                ctx,
                                row,
                                getCellContent([col, row]),
                                0,
                                0,
                                0,
                                boundsForDragTarget.width,
                                boundsForDragTarget.height,
                                false,
                                theme,
                                drawCustomCell,
                                imageLoader.current
                            );
                        }

                        offscreen.style.left = "-100%";
                        offscreen.style.position = "absolute";

                        document.body.appendChild(offscreen);

                        event.dataTransfer.setDragImage(
                            offscreen,
                            boundsForDragTarget.width / 2,
                            boundsForDragTarget.height / 2
                        );

                        window.setTimeout(() => {
                            document.body.removeChild(offscreen);
                        }, 0);
                    }
                }
            } else {
                event.preventDefault();
            }
        },
        [isDraggable, getMouseArgsForPosition, onDragStart, getBoundsForItem, theme, getCellContent, drawCustomCell]
    );
    useEventListener("dragstart", onDragStartImpl, eventTargetRef?.current ?? null, false, false);

    const focusRef = React.useRef<HTMLElement | null>(null);
    const focusElement = React.useCallback(
        (el: HTMLElement | null) => {
            // We don't want to steal the focus if we don't currently own the focus.
            if (ref.current === null || !ref.current.contains(document.activeElement)) return;
            if (el === null) {
                canvasRef?.current?.focus();
            } else {
                el.focus();
            }
            focusRef.current = el;
        },
        [canvasRef]
    );

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            focus: () => {
                const el = focusRef.current;
                // The element in the ref may have been removed however our callback method ref
                // won't see the removal so bad things happen. Checking to see if the element is
                // no longer attached is enough to resolve the problem. In the future this
                // should be replaced with something much more robust.
                if (el === null || !document.contains(el)) {
                    canvasRef?.current?.focus();
                } else {
                    el.focus();
                }
            },
        }),
        [canvasRef]
    );

    const accessibilityTree = useDebouncedMemo(
        () => {
            const effectiveCols = getEffectiveColumns(
                mappedColumns,
                cellXOffset,
                width,
                firstColSticky,
                dragAndDropState,
                translateX
            );

            const getRowData = (cell: InnerGridCell) => {
                switch (cell.kind) {
                    case GridCellKind.Boolean:
                    case GridCellKind.Markdown:
                    case GridCellKind.Number:
                    case GridCellKind.RowID:
                    case GridCellKind.Text:
                    case GridCellKind.Uri:
                        return cell.data?.toString() ?? "";
                    case GridCellKind.Drilldown:
                        return cell.data.map(d => d.text).join(", ");
                    case GridCellKind.Bubble:
                        return cell.data.join(", ");
                    case GridCellKind.Image:
                        return cell.data.map((i, index) => <img key={index} src={i} />);
                }

                return "";
            };

            return (
                <div role="grid" aria-rowcount={rows} aria-colcount={mappedColumns.length}>
                    <div role="rowgroup">
                        <div role="row" aria-rowindex={1} row-index={1}>
                            {effectiveCols.map(c => (
                                <div role="columnheader" aria-colindex={c.sourceIndex + 1} key={c.sourceIndex}>
                                    {c.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div role="rowgroup">
                        {makeRange(cellYOffset, Math.min(rows, cellYOffset + 50)).map(row => (
                            <div role="row" key={row} aria-rowindex={row + 2} row-index={row + 2}>
                                {effectiveCols.map(c => {
                                    const col = c.sourceIndex;
                                    const key = `${col},${row}`;
                                    const [fCol, fRow] = selectedCell?.cell ?? [];
                                    const focused = fCol === col && fRow === row;
                                    return (
                                        <div
                                            key={key}
                                            role="gridcell"
                                            aria-colindex={col + 1}
                                            id={`glide-cell-${col}-${row}`}
                                            onClick={() => {
                                                const canvas = canvasRef?.current;
                                                if (canvas === null || canvas === undefined) return;
                                                return onKeyDown?.({
                                                    bounds: getBoundsForItem(canvas, col, row),
                                                    cancel: () => undefined,
                                                    ctrlKey: false,
                                                    key: "Enter",
                                                    keyCode: 13,
                                                    metaKey: false,
                                                    shiftKey: false,
                                                });
                                            }}
                                            onFocusCapture={e => {
                                                if (e.target === focusRef.current) return;
                                                return onCellFocused?.([col, row]);
                                            }}
                                            ref={focused ? focusElement : undefined}
                                            tabIndex={-1}>
                                            {getRowData(getCellContent([col, row]))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            );
        },
        [
            cellXOffset,
            cellYOffset,
            mappedColumns,
            dragAndDropState,
            firstColSticky,
            focusElement,
            getCellContent,
            selectedCell?.cell,
            translateX,
            width,
        ],
        100
    );

    return (
        <canvas
            tabIndex={0}
            onKeyDown={onKeyDownImpl}
            onKeyUp={onKeyUpImpl}
            className={className}
            ref={refImpl}
            style={style}>
            {accessibilityTree}
        </canvas>
    );
};

export default React.memo(withTheme(React.forwardRef(DataGrid)));
