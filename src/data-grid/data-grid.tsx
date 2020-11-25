import * as React from "react";
import { Theme } from "../common/styles";
import { withTheme } from "styled-components";
import ImageWindowLoader from "../common/image-window-loader";
import {
    drawBoolean,
    drawBubbles,
    drawImage,
    drawProtectedCell,
    drawTextCell,
    getColumnIndexForX,
    getEffectiveColumns,
    getRowIndexForY,
    roundedPoly,
} from "./data-grid-lib";
import {
    GridColumn,
    GridCell,
    GridCellKind,
    Rectangle,
    GridSelection,
    GridMouseEventArgs,
    GridDragEventArgs,
    GridKeyEventArgs,
} from "./data-grid-types";
import { dontAwait } from "../common/support";
import { buildSpriteMap, drawSprite, SpriteVariant } from "./data-grid-sprites";
import { useEventListener } from "../common/utils";

export interface DataGridProps {
    readonly width: number;
    readonly height: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly firstColSticky: boolean;
    readonly allowResize: boolean;

    readonly columns: readonly GridColumn[];
    readonly rows: number;

    readonly headerHeight: number;
    readonly rowHeight: number | ((index: number) => number);

    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;

    readonly className?: string;

    readonly getCellContent: (cell: readonly [number, number]) => GridCell;
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;

    readonly selectedRows?: readonly number[];
    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;
    readonly prelightCells?: readonly (readonly [number, number])[];

    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs) => void;

    readonly onMouseMove?: (event: MouseEvent) => void;

    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;

    readonly isDraggable?: boolean;
    readonly onDragStart?: (args: GridDragEventArgs) => void;

    readonly drawCustomCell?: (
        ctx: CanvasRenderingContext2D,
        cell: GridCell,
        theme: Theme,
        x: number,
        y: number,
        width: number,
        height: number
    ) => boolean;

    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };
}

interface Props extends DataGridProps {
    readonly theme: Theme;
}

const DataGrid: React.FunctionComponent<Props> = p => {
    const {
        width,
        height,
        className,
        theme,
        columns,
        cellXOffset,
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
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onItemHovered,
        dragAndDropState,
        onKeyDown,
        onKeyUp,
        canvasRef,
        onDragStart,
        isDraggable,
        allowResize,
        prelightCells,
        drawCustomCell,
    } = p;

    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const imageLoader = React.useRef<ImageWindowLoader>();
    const canBlit = React.useRef<boolean>();
    const damageRegion = React.useRef<readonly (readonly [number, number])[] | undefined>(undefined);
    const lastCellYOffset = React.useRef<number>(cellYOffset);
    const [hoveredItem, setHoveredItem] = React.useState<readonly [number, number | undefined] | undefined>();
    const [hoveredOnEdge, setHoveredOnEdge] = React.useState<boolean>();

    React.useEffect(() => {
        dontAwait(buildSpriteMap(theme));
    }, [theme]);

    const getBoundsForItem = React.useCallback(
        (canvas: HTMLCanvasElement, col: number, row: number | undefined): Rectangle => {
            const rect = canvas.getBoundingClientRect();

            const result: Rectangle = {
                x: rect.x,
                y: rect.y + headerHeight,
                width: 0,
                height: 0,
            };
            const effectiveCols = getEffectiveColumns(columns, cellXOffset, width, firstColSticky);

            for (const c of effectiveCols) {
                result.width = c.width + 1;
                if (c.sourceIndex === col) break;
                result.x += c.width;
            }

            if (row === undefined) {
                result.y = rect.y;
                result.height = headerHeight;
            } else {
                for (let r = cellYOffset; r < row; r++) {
                    result.y += typeof rowHeight === "number" ? rowHeight : rowHeight(r);
                }
                result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
            }

            return result;
        },
        [cellXOffset, cellYOffset, columns, firstColSticky, headerHeight, rowHeight, width]
    );

    const getMouseArgsForPosition = React.useCallback(
        (canvas: HTMLCanvasElement, posX: number, posY: number, ev?: MouseEvent): GridMouseEventArgs => {
            const rect = canvas.getBoundingClientRect();
            const x = posX - rect.left;
            const y = posY - rect.top;
            const edgeDetectionBuffer = 5;

            const effectiveCols = getEffectiveColumns(columns, cellXOffset, width, firstColSticky);

            // -1 === off right edge
            const col = getColumnIndexForX(x, effectiveCols);

            // -1: header or above
            // undefined: offbottom
            const row = getRowIndexForY(y, headerHeight, rows, rowHeight, cellYOffset);

            const shiftKey = ev?.shiftKey === true;

            let result: GridMouseEventArgs;
            if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
                const horizontal = x > width ? -1 : x < 0 ? 1 : 0;
                const vertical = y > height ? 1 : y < 0 ? -1 : 0;

                result = {
                    kind: "out-of-bounds",
                    location: [col !== -1 ? col : x < 0 ? 0 : columns.length - 1, row ?? rows - 1],
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
            cellXOffset,
            cellYOffset,
            columns,
            firstColSticky,
            getBoundsForItem,
            headerHeight,
            height,
            rowHeight,
            rows,
            width,
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

        const dpr = window.devicePixelRatio ?? 1;

        if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
        }

        const ctx = canvas.getContext("2d", {
            alpha: false,
        });
        if (ctx === null) return;

        const getRowHeight = (r: number) => (typeof rowHeight === "number" ? rowHeight : rowHeight(r));

        ctx.save();
        ctx.beginPath(); // clear any path in the ctx
        ctx.scale(dpr, dpr);

        const damage = damageRegion.current;
        let blitted = false;
        let drawRegion: Rectangle | undefined;

        if (canBlit.current === true) {
            const lastOffset = lastCellYOffset.current;
            const current = cellYOffset;

            if (current === lastOffset) return;

            const min = Math.min(lastOffset, current);
            const max = Math.max(lastOffset, current);

            let delta = 0;
            for (let i = min; i < max; i++) {
                delta += getRowHeight(i);
            }

            if (current < lastOffset) {
                delta = -delta;
            }

            // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
            const blitHeight = height - headerHeight - Math.abs(delta);

            if (blitHeight > 150) {
                blitted = true;
                if (delta > 0) {
                    ctx.drawImage(
                        canvas,
                        0,
                        (delta + headerHeight) * dpr,
                        width * dpr,
                        blitHeight * dpr,
                        0,
                        headerHeight,
                        width,
                        blitHeight
                    );
                    ctx.rect(0, height - delta, width, delta);
                    drawRegion = {
                        x: 0,
                        y: height - delta,
                        width: width,
                        height: delta,
                    };
                    ctx.clip();
                } else {
                    ctx.drawImage(
                        canvas,
                        0,
                        headerHeight * dpr,
                        width * dpr,
                        blitHeight * dpr,
                        0,
                        -delta + headerHeight,
                        width,
                        blitHeight
                    );
                    ctx.rect(0, headerHeight, width, -delta);
                    drawRegion = {
                        x: 0,
                        y: headerHeight,
                        width: width,
                        height: -delta,
                    };
                    ctx.clip();
                }
            }
        }

        const effectiveCols = getEffectiveColumns(columns, cellXOffset, width, firstColSticky, dragAndDropState);

        if (damage !== undefined) {
            let row = cellYOffset;
            let y = headerHeight;
            ctx.beginPath();
            while (y < height) {
                let x = 0;
                const rh = getRowHeight(row);

                for (const c of effectiveCols) {
                    const rowLocal = row;
                    if (damage.find(d => d[0] === c.sourceIndex && d[1] === rowLocal) !== undefined) {
                        ctx.rect(x + 1, y + 1, c.width - 1, rh - 1);
                    }
                    x += c.width;
                }

                row++;
                y += rh;
            }

            ctx.clip();
            ctx.beginPath();
        }

        ctx.fillStyle = theme.dataViewer.gridColor;
        ctx.fillRect(0, 0, width, height);

        if (!blitted && damage === undefined) {
            // draw header background
            ctx.fillStyle = theme.dataViewer.columnHeader.bgColor;
            ctx.fillRect(0, 0, width, headerHeight);
        }

        // draw lines all at once
        {
            ctx.beginPath();

            // vertical lines
            let x = 0.5;
            effectiveCols.forEach(c => {
                x += c.width;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            });

            // horizontal lines
            let y = headerHeight + 0.5;
            let row = cellYOffset;
            while (y <= height) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);

                y += getRowHeight(row);
                row++;
            }

            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        const xPad = 8;
        const yPad = 2;

        // draw header contents
        if (!blitted && damage === undefined) {
            let x = 0;
            for (const c of effectiveCols) {
                const selected = selectedColumns?.includes(c.sourceIndex);
                const hovered = hoveredCol === c.sourceIndex && dragAndDropState === undefined;

                const hasSelectedCell = selectedCell !== undefined && selectedCell.cell[0] === c.sourceIndex;

                const fillStyle = selected
                    ? theme.dataViewer.columnHeader.fgSelected
                    : theme.dataViewer.columnHeader.fgColor;

                const bgFillStyle = selected
                    ? theme.dataViewer.columnHeader.bgSelected
                    : hasSelectedCell
                    ? theme.dataViewer.columnHeader.bgDark
                    : theme.dataViewer.columnHeader.bgColor;

                ctx.save();

                if (selected) {
                    ctx.fillStyle = bgFillStyle;
                    ctx.fillRect(x + 1, 0, c.width - 1, headerHeight);
                } else if (hasSelectedCell) {
                    ctx.fillStyle = theme.dataViewer.columnHeader.bgDark;
                    ctx.fillRect(x + 1, 0, c.width - 1, headerHeight);
                }

                ctx.rect(x + xPad, yPad, c.width - xPad, headerHeight - yPad * 2);
                ctx.clip();

                let drawX = x + xPad;
                ctx.globalAlpha = hovered || selected ? 1 : 0.6;
                if (c.icon !== undefined) {
                    let variant: SpriteVariant = selected ? "selected" : "normal";
                    if (c.style === "highlight") {
                        variant = selected ? "selected" : "special";
                    }
                    drawSprite(c.icon, variant, ctx, drawX, (headerHeight - 20) / 2, 20);

                    if (c.overlayIcon !== undefined) {
                        ctx.globalAlpha = 1;
                        drawSprite(
                            c.overlayIcon,
                            selected ? "selected" : "special",
                            ctx,
                            drawX + 9,
                            (headerHeight - 18) / 2 + 6,
                            18
                        );
                        ctx.globalAlpha = hovered || selected ? 1 : 0.6;
                    }

                    drawX += 26;
                }

                ctx.font = "bold 14px Roboto, sans-serif";
                ctx.fillStyle = fillStyle;
                ctx.fillText(c.title, drawX, headerHeight / 2 + 5);
                ctx.globalAlpha = 1;

                if (hovered && c.hasMenu === true) {
                    const fadeWidth = 35;
                    const fadeStart = x + c.width - fadeWidth;
                    const grad = ctx.createLinearGradient(fadeStart, 0, fadeStart + fadeWidth, 0);
                    grad.addColorStop(0, bgFillStyle + "00");
                    grad.addColorStop(0.3, bgFillStyle);
                    grad.addColorStop(1, bgFillStyle);
                    ctx.fillStyle = grad;
                    ctx.rect(fadeStart, 0, fadeWidth, headerHeight);
                    ctx.fill();

                    ctx.beginPath();
                    const triangleX = x + c.width - 20;
                    const triangleY = headerHeight / 2 - 3;
                    roundedPoly(
                        ctx,
                        [
                            {
                                x: triangleX,
                                y: triangleY,
                            },
                            {
                                x: triangleX + 11,
                                y: triangleY,
                            },
                            {
                                x: triangleX + 5.5,
                                y: triangleY + 6,
                            },
                        ],
                        1
                    );

                    ctx.fillStyle = fillStyle;
                    ctx.fill();
                }

                ctx.restore();

                x += c.width;
            }
        }

        // draw cell contents
        let row = cellYOffset;
        {
            let y = headerHeight;
            while (y < height) {
                let x = 0;
                const rh = getRowHeight(row);

                if (
                    drawRegion === undefined ||
                    (y >= drawRegion.y && y <= drawRegion.y + drawRegion.height) ||
                    (drawRegion.y >= y && drawRegion.y <= y + rh)
                ) {
                    const rowSelected = selectedRows?.includes(row);
                    for (const c of effectiveCols) {
                        const rowLocal = row;
                        if (
                            damage !== undefined &&
                            damage.find(d => d[0] === c.sourceIndex && d[1] === rowLocal) === undefined
                        ) {
                            x += c.width;
                            continue;
                        }

                        ctx.save();
                        const isFocused = selectedCell?.cell[0] === c.sourceIndex && selectedCell?.cell[1] === row;
                        let highlighted = rowSelected || selectedColumns?.includes(c.sourceIndex) || isFocused;

                        if (selectedCell?.range !== undefined) {
                            const { range } = selectedCell;
                            if (
                                c.sourceIndex >= range.x &&
                                c.sourceIndex < range.x + range.width &&
                                row >= range.y &&
                                row < range.y + range.height
                            ) {
                                highlighted = true;
                            }
                        }

                        if (highlighted) {
                            ctx.fillStyle = theme.dataViewer.bgSelected;
                            if (x === 0) {
                                ctx.fillRect(x, y + 1, c.width, rh - 1);
                            } else {
                                ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                            }
                        } else {
                            // eslint-disable-next-line no-loop-func
                            if (prelightCells?.find(pre => pre[0] === c.sourceIndex && pre[1] === row) !== undefined) {
                                ctx.fillStyle = theme.dataViewer.bgPrelight;
                                if (x === 0) {
                                    ctx.fillRect(x, y + 1, c.width, rh - 1);
                                } else {
                                    ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                                }
                            }
                        }

                        const cell: GridCell =
                            row < rows
                                ? getCellContent([c.sourceIndex, row])
                                : {
                                      kind: GridCellKind.Loading,
                                      allowOverlay: false,
                                  };

                        if (cell.style === "faded") {
                            ctx.globalAlpha = 0.6;
                        }

                        const drawn = drawCustomCell?.(ctx, cell, theme, x, y, c.width, rh) === true;
                        if (!drawn) {
                            if (
                                cell.kind === GridCellKind.Text ||
                                cell.kind === GridCellKind.Markdown ||
                                cell.kind === GridCellKind.Uri ||
                                cell.kind === GridCellKind.Number
                            ) {
                                drawTextCell(ctx, theme, cell.data, x, y, c.width, rh);
                            } else if (cell.kind === GridCellKind.Boolean) {
                                if (cell.checked || cell.showUnchecked) {
                                    drawBoolean(ctx, theme, cell.checked, x, y, c.width, rh, highlighted);
                                }
                            } else if (cell.kind === GridCellKind.Bubble) {
                                drawBubbles(ctx, theme, cell.data, x, y, c.width, rh, highlighted);
                            } else if (cell.kind === GridCellKind.Image && imageLoader.current !== undefined) {
                                drawImage(
                                    ctx,
                                    theme,
                                    cell.data,
                                    c.sourceIndex,
                                    row,
                                    x,
                                    y,
                                    c.width,
                                    rh,
                                    imageLoader.current
                                );
                            } else if (cell.kind === GridCellKind.RowID) {
                                drawTextCell(ctx, theme, cell.data, x, y, c.width, rh, theme.fgColorLight);
                            } else if (cell.kind === GridCellKind.Protected) {
                                drawProtectedCell(ctx, theme, x, y, c.width, rh, !highlighted);
                            }
                        }

                        ctx.globalAlpha = 1;

                        if (isFocused) {
                            ctx.beginPath();
                            ctx.rect(x + 1, y + 1, c.width - 1, rh - 1);
                            ctx.strokeStyle = theme.acceptColor;
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }

                        ctx.restore();

                        x += c.width;
                    }

                    if (x < width && rowSelected) {
                        ctx.beginPath();
                        ctx.fillStyle = theme.dataViewer.bgSelected;
                        ctx.fillRect(x + 1, y + 1, width - x, rh - 1);
                    }
                }

                y += rh;
                row++;
            }
        }

        imageLoader.current?.setWindow({
            x: cellXOffset,
            y: cellYOffset,
            width: effectiveCols.length,
            height: row - cellYOffset,
        });

        lastCellYOffset.current = cellYOffset;

        ctx.restore();
    }, [
        width,
        height,
        columns,
        cellXOffset,
        firstColSticky,
        dragAndDropState,
        theme,
        cellYOffset,
        rowHeight,
        headerHeight,
        selectedColumns,
        hoveredCol,
        selectedCell,
        selectedRows,
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
        cellXOffset,
        theme,
        headerHeight,
        rowHeight,
        rows,
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

    const headerHovered = hoveredItem?.[0] !== undefined && hoveredItem[1] === undefined;
    const canDrag = hoveredOnEdge ?? false;
    const style = React.useMemo(
        () => ({
            width,
            height,
            display: "block",
            cursor: canDrag ? "col-resize" : headerHovered ? "pointer" : "default",
        }),
        [width, height, headerHovered, canDrag]
    );

    const onMouseDownImpl = React.useCallback(
        (ev: MouseEvent) => {
            const canvas = ref.current;
            if (canvas === null || ev.target !== canvas) return;
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
        [getMouseArgsForPosition, onMouseDown, columns, getBoundsForItem, onHeaderMenuClick, hoveredOnEdge]
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
            if (args.kind !== "out-of-bounds") {
                setHoveredOnEdge(args.isEdge && allowResize);
            }

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
        (event: React.DragEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null || !isDraggable === true) return;

            let dragMime: string | undefined;
            let dragData: string | undefined;

            const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const setData = (mime: string, payload: string) => {
                dragMime = mime;
                dragData = payload;
            };

            onDragStart?.({
                ...args,
                setData,
            });
            if (dragMime !== undefined && dragData !== undefined) {
                event.dataTransfer.setData(dragMime, dragData);
                event.dataTransfer.effectAllowed = "link";
            } else {
                event.preventDefault();
            }
        },
        [isDraggable, getMouseArgsForPosition, onDragStart]
    );

    return (
        <canvas
            draggable={isDraggable === true}
            tabIndex={0}
            onKeyDown={onKeyDownImpl}
            onKeyUp={onKeyUpImpl}
            className={className}
            ref={refImpl}
            style={style}
            onDragStart={onDragStartImpl}
        />
    );
};

export default withTheme(DataGrid);
