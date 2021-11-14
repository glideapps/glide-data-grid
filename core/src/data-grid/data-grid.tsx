import * as React from "react";
import { Theme } from "../common/styles";
import { withTheme } from "styled-components";
import ImageWindowLoader from "../common/image-window-loader";
import {
    getColumnIndexForX,
    getEffectiveColumns,
    getRowIndexForY,
    getStickyWidth,
    useMappedColumns,
} from "./data-grid-lib";
import {
    GridColumn,
    GridCellKind,
    Rectangle,
    GridSelection,
    GridMouseEventArgs,
    GridDragEventArgs,
    GridKeyEventArgs,
    InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    DrawCustomCellCallback,
} from "./data-grid-types";
import { SpriteManager, SpriteMap } from "./data-grid-sprites";
import { useDebouncedMemo, useEventListener } from "../common/utils";
import makeRange from "lodash/range";
import { drawCell, drawGrid, makeBuffers } from "./data-grid-render";
import { AnimationManager, StepCallback } from "./animation-manager";
import { browserIsFirefox } from "../common/browser-detect";

export interface DataGridProps {
    readonly width: number;
    readonly height: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly translateX?: number;
    readonly translateY?: number;

    readonly freezeColumns: number;
    readonly lastRowSticky: boolean;
    readonly allowResize?: boolean;
    readonly isResizing: boolean;
    readonly isDragging: boolean;

    readonly columns: readonly GridColumn[];
    readonly rows: number;

    readonly headerHeight: number;
    readonly enableGroups: boolean;
    readonly rowHeight: number | ((index: number) => number);

    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;

    readonly eventTargetRef?: React.MutableRefObject<HTMLDivElement | null>;

    readonly className?: string;

    readonly getCellContent: (cell: readonly [number, number]) => InnerGridCell;
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;

    readonly selectedRows?: CompactSelection;
    readonly selectedColumns?: CompactSelection;
    readonly selectedCell?: GridSelection;
    readonly prelightCells?: readonly (readonly [number, number])[];

    readonly disabledRows?: CompactSelection;

    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs, isOutside: boolean) => void;

    readonly onCellFocused?: (args: readonly [number, number]) => void;

    readonly onMouseMove?: (event: MouseEvent) => void;

    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;

    readonly verticalBorder: (col: number) => boolean;

    readonly isDraggable?: boolean;
    readonly onDragStart?: (args: GridDragEventArgs) => void;

    readonly drawCustomCell?: DrawCustomCellCallback;

    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };

    readonly experimental?: {
        readonly paddingRight?: number;
        readonly paddingBottom?: number;
        readonly disableFirefoxRescaling?: boolean;
    };

    readonly headerIcons?: SpriteMap;
}

interface Props extends DataGridProps {
    readonly theme: Theme;
}

type Item = readonly [number, number | undefined];

interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
}

type DamageUpdateList = readonly {
    cell: readonly [number, number];
    // newValue: GridCell,
}[];

export interface DataGridRef {
    focus: () => void;
    getBounds: (col: number, row: number) => Rectangle | undefined;
    damage: (cells: DamageUpdateList) => void;
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
        enableGroups,
        selectedCell,
        selectedColumns,
        freezeColumns,
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
        headerIcons,
        verticalBorder,
        drawCustomCell,
        onCellFocused,
    } = p;
    const translateX = p.translateX ?? 0;
    const translateY = p.translateY ?? 0;
    const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));

    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const imageLoader = React.useRef<ImageWindowLoader>();
    const canBlit = React.useRef<boolean>();
    const damageRegion = React.useRef<readonly Item[] | undefined>(undefined);
    const [scrolling, setScrolling] = React.useState<boolean>(false);
    const hoverValues = React.useRef<readonly { item: Item; hoverAmount: number }[]>([]);
    const lastBlitData = React.useRef<BlitData>({ cellXOffset, cellYOffset, translateX, translateY });
    const [hoveredItemInfo, setHoveredItemInfo] = React.useState<[Item, readonly [number, number]] | undefined>();
    const [hoveredOnEdge, setHoveredOnEdge] = React.useState<boolean>();
    const [buffers] = React.useState(() => makeBuffers());

    const spriteManager = React.useMemo(() => new SpriteManager(headerIcons), [headerIcons]);

    const scrollingStopRef = React.useRef(-1);
    const disableFirefoxRescaling = p.experimental?.disableFirefoxRescaling === true;
    React.useEffect(() => {
        if (!browserIsFirefox || window.devicePixelRatio === 1 || disableFirefoxRescaling) return;
        // We don't want to go into scroll mode for a single repaint
        if (scrollingStopRef.current !== -1) {
            setScrolling(true);
        }
        window.clearTimeout(scrollingStopRef.current);
        scrollingStopRef.current = window.setTimeout(() => {
            setScrolling(false);
            scrollingStopRef.current = -1;
        }, 200);
    }, [cellYOffset, cellXOffset, translateX, translateY, disableFirefoxRescaling]);

    React.useEffect(() => {
        const fn = async () => {
            const changed = await spriteManager.buildSpriteMap(theme, columns);
            if (changed) {
                lastDrawRef.current();
            }
        };
        void fn();
    }, [columns, spriteManager, theme]);

    const mappedColumns = useMappedColumns(columns, freezeColumns);

    const getBoundsForItem = React.useCallback(
        (canvas: HTMLCanvasElement, col: number, row: number | undefined): Rectangle => {
            const rect = canvas.getBoundingClientRect();

            const result: Rectangle = {
                x: rect.x,
                y: rect.y + headerHeight + translateY,
                width: 0,
                height: 0,
            };

            if (col >= freezeColumns) {
                const dir = cellXOffset > col ? -1 : 1;
                const freezeWidth = getStickyWidth(mappedColumns);
                result.x += freezeWidth + translateX;
                for (let i = cellXOffset; i !== col; i += dir) {
                    result.x += mappedColumns[i].width * dir;
                }
            } else {
                for (let i = 0; i < col; i++) {
                    result.x += mappedColumns[i].width;
                }
            }
            result.width = mappedColumns[col].width + 1;

            if (row === undefined) {
                result.y = rect.y;
                result.height = headerHeight;
            } else if (lastRowSticky && row === rows - 1) {
                const stickyHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
                result.y = rect.y + (height - stickyHeight);
                result.height = stickyHeight;
            } else {
                const dir = cellYOffset > row ? -1 : 1;
                for (let r = cellYOffset; r !== row; r += dir) {
                    result.y += (typeof rowHeight === "number" ? rowHeight : rowHeight(r)) * dir;
                }
                result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
            }

            return result;
        },
        [
            headerHeight,
            translateY,
            freezeColumns,
            lastRowSticky,
            rows,
            cellXOffset,
            mappedColumns,
            translateX,
            rowHeight,
            height,
            cellYOffset,
        ]
    );

    const getMouseArgsForPosition = React.useCallback(
        (canvas: HTMLCanvasElement, posX: number, posY: number, ev?: MouseEvent | TouchEvent): GridMouseEventArgs => {
            const rect = canvas.getBoundingClientRect();
            const x = posX - rect.left;
            const y = posY - rect.top;
            const edgeDetectionBuffer = 5;

            const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, undefined, translateX);

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
            const ctrlKey = ev?.ctrlKey === true;
            const metaKey = ev?.metaKey === true;
            const isTouch = ev !== undefined && !(ev instanceof MouseEvent);

            let result: GridMouseEventArgs;
            if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
                const horizontal = x > width ? -1 : x < 0 ? 1 : 0;
                const vertical = y > height ? 1 : y < 0 ? -1 : 0;

                let isEdge = false;
                if (col === -1 && row === -1) {
                    const b = getBoundsForItem(canvas, mappedColumns.length - 1, undefined);
                    isEdge = posX < b.x + b.width + edgeDetectionBuffer;
                }

                result = {
                    kind: "out-of-bounds",
                    location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row ?? rows - 1],
                    direction: [horizontal, vertical],
                    shiftKey,
                    ctrlKey,
                    metaKey,
                    isEdge,
                    isTouch,
                };
            } else if (row <= -1) {
                let bounds = getBoundsForItem(canvas, col, undefined);
                let isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;

                const previousCol = col - 1;
                if (posX - bounds.x <= edgeDetectionBuffer) {
                    isEdge = true;
                    bounds = getBoundsForItem(canvas, previousCol, undefined);
                    result = {
                        kind: enableGroups && row === -2 ? "group-header" : "header",
                        location: [previousCol, undefined],
                        bounds: bounds,
                        isEdge,
                        shiftKey,
                        ctrlKey,
                        metaKey,
                        isTouch,
                        localEventX: posX - bounds.x,
                        localEventY: posY - bounds.y,
                    };
                } else {
                    result = {
                        kind: enableGroups && row === -2 ? "group-header" : "header",
                        location: [col, undefined],
                        bounds: bounds,
                        isEdge,
                        shiftKey,
                        ctrlKey,
                        metaKey,
                        isTouch,
                        localEventX: posX - bounds.x,
                        localEventY: posY - bounds.y,
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
                    ctrlKey,
                    metaKey,
                    isTouch,
                    localEventX: posX - bounds.x,
                    localEventY: posY - bounds.y,
                };
            }
            return result;
        },
        [
            mappedColumns,
            cellXOffset,
            width,
            translateX,
            height,
            headerHeight,
            rows,
            rowHeight,
            cellYOffset,
            translateY,
            lastRowSticky,
            getBoundsForItem,
            enableGroups,
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

    const [hoveredItem] = hoveredItemInfo ?? [];
    let hoveredCol: number | undefined;
    if (hoveredItem?.[0] !== undefined && hoveredItem[1] === undefined) {
        hoveredCol = hoveredItem[0];
    }

    const hoverInfoRef = React.useRef(hoveredItemInfo);
    hoverInfoRef.current = hoveredItemInfo;
    const draw = React.useCallback(() => {
        const canvas = ref.current;
        if (canvas === null) return;

        drawGrid(
            canvas,
            buffers,
            width,
            height,
            cellXOffset,
            cellYOffset,
            Math.round(translateX),
            Math.round(translateY),
            columns,
            mappedColumns,
            enableGroups,
            freezeColumns,
            dragAndDropState,
            theme,
            headerHeight,
            selectedRows ?? CompactSelection.empty(),
            disabledRows ?? CompactSelection.empty(),
            rowHeight,
            verticalBorder,
            selectedColumns ?? CompactSelection.empty(),
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
            canBlit.current,
            damageRegion.current,
            hoverValues.current,
            hoverInfoRef.current,
            spriteManager,
            scrolling
        );
    }, [
        buffers,
        width,
        height,
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        columns,
        mappedColumns,
        enableGroups,
        freezeColumns,
        dragAndDropState,
        theme,
        headerHeight,
        selectedRows,
        disabledRows,
        rowHeight,
        verticalBorder,
        selectedColumns,
        hoveredCol,
        isResizing,
        selectedCell,
        lastRowSticky,
        rows,
        getCellContent,
        drawCustomCell,
        prelightCells,
        spriteManager,
        scrolling,
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
        dragAndDropState,
        prelightCells,
        scrolling,
    ]);

    const lastDrawRef = React.useRef(draw);
    React.useEffect(() => {
        draw();
        lastDrawRef.current = draw;
    }, [draw]);

    const imageLoaded = React.useCallback((locations: readonly (readonly [number, number])[]) => {
        const last = canBlit.current;
        canBlit.current = false;
        damageRegion.current = locations;
        lastDrawRef.current();
        damageRegion.current = undefined;
        canBlit.current = last;
    }, []);

    const damage = React.useCallback((cells: DamageUpdateList) => {
        const last = canBlit.current;
        canBlit.current = false;
        damageRegion.current = cells.map(x => x.cell);
        lastDrawRef.current();
        damageRegion.current = undefined;
        canBlit.current = last;
    }, []);

    imageLoader.current?.setCallback(imageLoaded);

    const [hCol, hRow] = hoveredItem ?? [];
    const headerHovered = hCol !== undefined && hRow === undefined;
    let clickableInnerCellHovered = false;
    let editableBoolHovered = false;
    if (hCol !== undefined && hRow !== undefined) {
        const cell = getCellContent([hCol, hRow]);
        clickableInnerCellHovered =
            cell.kind === InnerGridCellKind.NewRow ||
            (cell.kind === InnerGridCellKind.Marker && cell.markerKind !== "number");
        editableBoolHovered = cell.kind === GridCellKind.Boolean && cell.allowEdit === true;
    }
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
                : headerHovered || clickableInnerCellHovered || editableBoolHovered
                ? "pointer"
                : "default",
        }),
        [width, height, isDragging, canDrag, isResizing, headerHovered, clickableInnerCellHovered, editableBoolHovered]
    );

    const target = eventTargetRef?.current;
    if (target !== null && target !== undefined) {
        // because we have an event target we need to set its cursor instead.
        target.style.cursor = style.cursor;
    }

    const onMouseDownImpl = React.useCallback(
        (ev: MouseEvent | TouchEvent) => {
            const canvas = ref.current;
            const eventTarget = eventTargetRef?.current;
            if (canvas === null || (ev.target !== canvas && ev.target !== eventTarget)) return;

            let clientX: number;
            let clientY: number;
            if (ev instanceof MouseEvent) {
                if (ev.button !== 0) return;
                clientX = ev.clientX;
                clientY = ev.clientY;
            } else {
                clientX = ev.touches[0].clientX;
                clientY = ev.touches[0].clientY;
            }
            if (ev.target === eventTarget && eventTarget !== null) {
                const bounds = eventTarget.getBoundingClientRect();
                if (clientX > bounds.left + eventTarget.clientWidth) return;
                if (clientY > bounds.top + eventTarget.clientHeight) return;
            }

            const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

            if (args.kind === "header") {
                const [col] = args.location;
                const header = columns[col];

                if (header.hasMenu === true && !(hoveredOnEdge ?? false)) {
                    const headerBounds = getBoundsForItem(canvas, col, undefined);
                    if (clientX > headerBounds.x + headerBounds.width - 40) {
                        return;
                    }
                }
            }

            onMouseDown?.(args);
        },
        [columns, eventTargetRef, getBoundsForItem, getMouseArgsForPosition, hoveredOnEdge, onMouseDown]
    );
    useEventListener("touchstart", onMouseDownImpl, window, true);
    useEventListener("mousedown", onMouseDownImpl, window, true);

    const onMouseUpImpl = React.useCallback(
        (ev: MouseEvent | TouchEvent) => {
            const canvas = ref.current;
            if (onMouseUp === undefined || canvas == null) return;
            const eventTarget = eventTargetRef?.current;

            const isOutside = ev.target !== canvas && ev.target !== eventTarget;

            if (!isOutside) {
                ev.preventDefault();
            }

            let clientX: number;
            let clientY: number;
            if (ev instanceof MouseEvent) {
                if (ev.button !== 0) return;
                clientX = ev.clientX;
                clientY = ev.clientY;
            } else {
                clientX = ev.changedTouches[0].clientX;
                clientY = ev.changedTouches[0].clientY;
            }

            const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

            if (args.kind === "header") {
                const [col] = args.location;
                const header = columns[col];

                if (header.hasMenu === true && !(hoveredOnEdge ?? false)) {
                    const headerBounds = getBoundsForItem(canvas, col, undefined);
                    if (clientX > headerBounds.x + headerBounds.width - 40) {
                        onHeaderMenuClick?.(col, headerBounds);
                        return;
                    }
                }
            }

            onMouseUp(args, isOutside);
        },
        [
            onMouseUp,
            eventTargetRef,
            getMouseArgsForPosition,
            columns,
            hoveredOnEdge,
            getBoundsForItem,
            onHeaderMenuClick,
        ]
    );
    useEventListener("mouseup", onMouseUpImpl, window, false);
    useEventListener("touchend", onMouseUpImpl, window, false);

    const onAnimationFrame = React.useCallback<StepCallback>(values => {
        const last = canBlit.current;
        canBlit.current = false;
        damageRegion.current = values.map(x => x.item);
        hoverValues.current = values;
        lastDrawRef.current();
        damageRegion.current = undefined;
        canBlit.current = last;
    }, []);

    const animationManager = React.useRef(new AnimationManager(onAnimationFrame));
    React.useEffect(() => {
        animationManager.current.setHovered(hoveredItem);
    }, [hoveredItem]);

    const hoveredRef = React.useRef<GridMouseEventArgs>();
    const onMouseMoveImpl = React.useCallback(
        (ev: MouseEvent) => {
            const canvas = ref.current;
            if (canvas === null) return;

            const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
            if (!isSameItem(args, hoveredRef.current)) {
                onItemHovered?.(args);
                setHoveredItemInfo(
                    args.kind === "out-of-bounds" || args.kind === "group-header"
                        ? undefined
                        : [args.location, [args.localEventX, args.localEventY]]
                );
                hoveredRef.current = args;
            } else if (args.kind === "cell" || args.kind === "header") {
                const newInfo: typeof hoverInfoRef.current = [args.location, [args.localEventX, args.localEventY]];
                setHoveredItemInfo(newInfo);
                hoverInfoRef.current = newInfo;

                if (args.kind === "cell") {
                    imageLoaded([args.location]);
                }
            }

            setHoveredOnEdge(args.kind === "header" && args.isEdge && allowResize === true);

            onMouseMove?.(ev);
        },
        [getMouseArgsForPosition, allowResize, onMouseMove, onItemHovered, imageLoaded]
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
            if (canvas === null || !isDraggable === true) return false;

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
                            ctx.fillStyle = theme.bgCell;
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
                                imageLoader.current,
                                1,
                                undefined
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
                canvasRef?.current?.focus({
                    preventScroll: true,
                });
            } else {
                el.focus({
                    preventScroll: true,
                });
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
                    canvasRef?.current?.focus({
                        preventScroll: true,
                    });
                } else {
                    el.focus({
                        preventScroll: true,
                    });
                }
            },
            getBounds: (col: number, row: number) => {
                if (canvasRef === undefined || canvasRef.current === null) {
                    return undefined;
                }

                return getBoundsForItem(canvasRef.current, col, row);
            },
            damage,
        }),
        [canvasRef, damage, getBoundsForItem]
    );

    const accessibilityTree = useDebouncedMemo(
        () => {
            const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);

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
                    case GridCellKind.Image:
                    case GridCellKind.Bubble:
                        return cell.data.join(", ");
                    case GridCellKind.Custom:
                        return cell.copyData;
                    // While this would seemingly be better, it triggers the browser to actually
                    // download the image which we may not want. Sad :(
                    // case GridCellKind.Image:
                    //     return cell.data.map((i, index) => <img key={index} src={i} />);
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
            focusElement,
            getCellContent,
            selectedCell?.cell,
            translateX,
            width,
        ],
        100
    );

    const stickyX = getStickyWidth(mappedColumns);
    const stickyShadowStyle = React.useMemo<React.CSSProperties>(
        () => ({
            position: "absolute",
            top: 0,
            left: stickyX,
            width: style.width - stickyX,
            height: style.height,
            opacity: cellXOffset > freezeColumns || translateX !== 0 ? 1 : 0,
            pointerEvents: "none",
            boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)",
            transition: "opacity 150ms",
        }),
        [cellXOffset, freezeColumns, stickyX, style.height, style.width, translateX]
    );

    let stickyShadow: React.ReactNode;
    if (mappedColumns[0].sticky) {
        stickyShadow = <div style={stickyShadowStyle} />;
    }

    return (
        <>
            <canvas
                tabIndex={0}
                onKeyDown={onKeyDownImpl}
                onKeyUp={onKeyUpImpl}
                className={className}
                ref={refImpl}
                style={style}>
                {accessibilityTree}
            </canvas>
            {stickyShadow}
        </>
    );
};

export default React.memo(withTheme(React.forwardRef(DataGrid)));
