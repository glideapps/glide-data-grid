import * as React from "react";
import { Theme } from "../common/styles";
import { withTheme } from "styled-components";
import ImageWindowLoader from "../common/image-window-loader";
import {
    drawBoolean,
    drawBubbles,
    drawDrilldownCell,
    drawImage,
    drawProtectedCell,
    drawTextCell,
    getColumnIndexForX,
    getEffectiveColumns,
    getRowIndexForY,
    roundedPoly,
    useMappedColumns,
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
import { useDebouncedMemo, useEventListener } from "../common/utils";
import makeRange from "lodash/range";

export interface DataGridProps {
    readonly width: number;
    readonly height: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly translateX?: number;
    readonly translateY?: number;

    readonly firstColSticky: boolean;
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

    readonly getCellContent: (cell: readonly [number, number]) => GridCell;
    readonly onHeaderMenuClick?: (col: number, screenPosition: Rectangle) => void;

    readonly selectedRows?: readonly number[];
    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;
    readonly prelightCells?: readonly (readonly [number, number])[];

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
            rowHeight,
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
            const row = getRowIndexForY(y, headerHeight, rows, rowHeight, cellYOffset, translateY);

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
            cellXOffset,
            cellYOffset,
            mappedColumns,
            firstColSticky,
            getBoundsForItem,
            headerHeight,
            height,
            rowHeight,
            rows,
            width,
            translateX,
            translateY,
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

    const drawCell = React.useCallback(
        (
            ctx: CanvasRenderingContext2D,
            row: number,
            cell: GridCell,
            sourceIndex: number,
            x: number,
            y: number,
            w: number,
            h: number,
            highlighted: boolean
        ) => {
            const drawn = drawCustomCell?.(ctx, cell, theme, { x, y, width: w, height: h }) === true;
            if (!drawn) {
                if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number) {
                    drawTextCell(ctx, theme, cell.displayData, x, y, w, h);
                } else if (cell.kind === GridCellKind.Markdown || cell.kind === GridCellKind.Uri) {
                    drawTextCell(ctx, theme, cell.data, x, y, w, h);
                } else if (cell.kind === GridCellKind.Boolean) {
                    if (cell.data || cell.showUnchecked) {
                        drawBoolean(ctx, theme, cell.data, x, y, w, h, highlighted, cell.allowEdit);
                    }
                } else if (cell.kind === GridCellKind.Bubble) {
                    drawBubbles(ctx, theme, cell.data, x, y, w, h, highlighted);
                } else if (cell.kind === GridCellKind.Image && imageLoader.current !== undefined) {
                    drawImage(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, imageLoader.current);
                } else if (cell.kind === GridCellKind.RowID) {
                    drawTextCell(ctx, theme, cell.data, x, y, w, h, theme.fgColorLight);
                } else if (cell.kind === GridCellKind.Protected) {
                    drawProtectedCell(ctx, theme, x, y, w, h, !highlighted);
                } else if (cell.kind === GridCellKind.Drilldown && imageLoader.current !== undefined) {
                    drawDrilldownCell(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, imageLoader.current);
                }
            }
        },
        [drawCustomCell, theme]
    );

    const timingValue = React.useRef({
        count: 0,
        time: 0,
    });

    const draw = React.useCallback(() => {
        const currentTime = timingValue.current;
        const canvas = ref.current;
        if (canvas === null) return;

        const dpr = Math.ceil(window.devicePixelRatio) ?? 1;

        if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
        }

        const last = lastBlitData.current;
        if (
            canBlit.current === true &&
            cellXOffset === last.cellXOffset &&
            cellYOffset === last.cellYOffset &&
            translateX === last.translateX &&
            translateY === last.translateY
        )
            return;

        const ctx = canvas.getContext("2d", {
            alpha: false,
        });
        if (ctx === null) return;

        const start = window.performance.now();

        const getRowHeight = (r: number) => (typeof rowHeight === "number" ? rowHeight : rowHeight(r));

        ctx.save();
        ctx.beginPath(); // clear any path in the ctx
        if (dpr !== 1) {
            ctx.scale(dpr, dpr);
        }

        const damage = damageRegion.current;
        const drawRegions: Rectangle[] = [];
        let blittedYOnly = false;

        const effectiveCols = getEffectiveColumns(
            mappedColumns,
            cellXOffset,
            width,
            firstColSticky,
            dragAndDropState,
            translateX
        );

        if (canBlit.current === true) {
            ctx.imageSmoothingEnabled = false;
            const minY = Math.min(last.cellYOffset, cellYOffset);
            const maxY = Math.max(last.cellYOffset, cellYOffset);
            let deltaY = 0;
            for (let i = minY; i < maxY; i++) {
                deltaY += getRowHeight(i);
            }
            if (cellYOffset > last.cellYOffset) {
                deltaY = -deltaY;
            }
            deltaY += translateY - last.translateY;

            const minX = Math.min(last.cellXOffset, cellXOffset);
            const maxX = Math.max(last.cellXOffset, cellXOffset);
            let deltaX = 0;
            for (let i = minX; i < maxX; i++) {
                deltaX += columns[i].width;
            }
            if (cellXOffset > last.cellXOffset) {
                deltaX = -deltaX;
            }
            deltaX += translateX - last.translateX;

            let stickyWidth = 0;
            for (const c of effectiveCols) {
                if (c.sticky) {
                    stickyWidth += c.width + 1;
                } else {
                    break;
                }
            }

            // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

            const blitWidth = width - stickyWidth - Math.abs(deltaX);
            const blitHeight = height - headerHeight - Math.abs(deltaY) - 1;

            if (blitWidth > 150 && blitHeight > 150) {
                blittedYOnly = deltaX === 0;

                // blit Y
                if (deltaY > 0) {
                    // scrolling up
                    ctx.drawImage(
                        canvas,
                        0,
                        (headerHeight + 1) * dpr,
                        width * dpr,
                        blitHeight * dpr,
                        0,
                        deltaY + headerHeight + 1,
                        width,
                        blitHeight
                    );
                    drawRegions.push({
                        x: 0,
                        y: headerHeight,
                        width: width,
                        height: deltaY + 1,
                    });
                } else if (deltaY < 0) {
                    // scrolling down
                    ctx.drawImage(
                        canvas,
                        0,
                        (-deltaY + headerHeight + 1) * dpr,
                        width * dpr,
                        blitHeight * dpr,
                        0,
                        headerHeight + 1,
                        width,
                        blitHeight
                    );
                    drawRegions.push({
                        x: 0,
                        y: height + deltaY,
                        width: width,
                        height: -deltaY,
                    });
                }

                // blit X
                if (deltaX > 0) {
                    // scrolling right
                    ctx.drawImage(
                        canvas,
                        stickyWidth * dpr,
                        0,
                        blitWidth * dpr,
                        height * dpr,
                        deltaX + stickyWidth,
                        0,
                        blitWidth,
                        height
                    );
                    drawRegions.push({
                        x: stickyWidth - 1,
                        y: 0,
                        width: deltaX + 1,
                        height: height,
                    });
                } else if (deltaX < 0) {
                    // scrolling left
                    ctx.drawImage(
                        canvas,
                        (stickyWidth - deltaX) * dpr,
                        0,
                        blitWidth * dpr,
                        height * dpr,
                        stickyWidth,
                        0,
                        blitWidth,
                        height
                    );
                    drawRegions.push({
                        x: width + deltaX,
                        y: 0,
                        width: -deltaX,
                        height: height,
                    });
                }

                if (drawRegions.length > 0) {
                    for (const r of drawRegions) {
                        ctx.rect(r.x, r.y, r.width, r.height);
                    }
                    ctx.clip();
                    ctx.beginPath();
                }
            }
            ctx.imageSmoothingEnabled = true;
        }

        if (damage !== undefined) {
            let row = cellYOffset;
            let y = headerHeight + translateY;
            ctx.beginPath();
            while (y < height) {
                let x = 0;
                const rh = getRowHeight(row);

                for (const c of effectiveCols) {
                    const rowLocal = row;
                    if (damage.find(d => d[0] === c.sourceIndex && d[1] === rowLocal) !== undefined) {
                        const tx = c.sticky ? 0 : translateX;
                        ctx.rect(x + 1 + tx, y + 1, c.width - 1, rh - 1);
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
        ctx.fillRect(0, headerHeight, width, height - headerHeight);

        if (!blittedYOnly && damage === undefined) {
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
                const tx = c.sticky ? x : x + translateX;
                ctx.moveTo(tx, 0);
                ctx.lineTo(tx, height);
            });

            // horizontal lines
            let y = headerHeight + 0.5;
            let row = cellYOffset;
            let isHeader = true;
            while (y + translateY <= height) {
                const ty = isHeader ? y : y + translateY;
                ctx.moveTo(0, ty);
                ctx.lineTo(width, ty);

                y += getRowHeight(row);
                isHeader = false;
                row++;
            }

            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        const xPad = 8;
        const yPad = 2;

        // draw header contents
        if (!blittedYOnly && damage === undefined) {
            let x = 0;
            let clipX = 0;
            for (const c of effectiveCols) {
                const selected = selectedColumns?.includes(c.sourceIndex);
                const hovered = hoveredCol === c.sourceIndex && dragAndDropState === undefined && !isResizing;

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
                if (c.sticky) {
                    clipX = Math.max(clipX, x + c.width);
                } else {
                    ctx.beginPath();
                    ctx.rect(clipX, 0, width, height);
                    ctx.clip();
                    ctx.translate(translateX, 0);
                }

                if (selected) {
                    ctx.fillStyle = bgFillStyle;
                    ctx.fillRect(x + 1, 0, c.width - 1, headerHeight);
                } else if (hasSelectedCell) {
                    ctx.fillStyle = theme.dataViewer.columnHeader.bgDark;
                    ctx.fillRect(x + 1, 0, c.width - 1, headerHeight);
                }

                ctx.beginPath();
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

        ctx.beginPath();
        ctx.rect(0, headerHeight + 1, width, height - headerHeight - 1);
        ctx.clip();
        ctx.beginPath();

        let x = 0;
        let clipX = 0;
        let row = 0;
        ctx.font = "13px Roboto, sans-serif";
        for (const c of effectiveCols) {
            let y = headerHeight + translateY;
            row = cellYOffset;

            ctx.save();

            const clipCol = (offset: number) => {
                ctx.beginPath();
                if (c.sticky) {
                    clipX = Math.max(clipX, x + c.width);
                    ctx.rect(x, headerHeight + 1, c.width + offset, height - headerHeight - 1);
                    ctx.clip();
                } else {
                    const diff = Math.min(0, x + translateX - clipX);
                    ctx.rect(
                        Math.max(x + translateX, clipX),
                        headerHeight + 1,
                        c.width + diff + offset,
                        height - headerHeight - 1
                    );
                    ctx.clip();
                    ctx.translate(translateX, 0);
                }
            };
            clipCol(0);

            while (y < height) {
                const rh = getRowHeight(row);
                const rowSelected = selectedRows?.includes(row);

                if (
                    drawRegions.length === 0 ||
                    drawRegions.find(
                        drawRegion =>
                            (y >= drawRegion.y && y <= drawRegion.y + drawRegion.height) ||
                            (drawRegion.y >= y && drawRegion.y <= y + rh)
                    )
                ) {
                    const rowLocal = row;
                    if (
                        damage === undefined ||
                        damage.find(d => d[0] === c.sourceIndex && d[1] === rowLocal) !== undefined
                    ) {
                        ctx.beginPath();

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

                        if (highlighted || rowSelected) {
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

                        drawCell(ctx, row, cell, c.sourceIndex, x, y, c.width, rh, highlighted);

                        ctx.globalAlpha = 1;

                        if (isFocused) {
                            ctx.restore();
                            ctx.save();

                            ctx.beginPath();
                            clipCol(1);

                            ctx.beginPath();
                            ctx.rect(x + 1, y + 1, c.width - 1, rh - 1);
                            ctx.strokeStyle = theme.acceptColor;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            ctx.restore();
                            ctx.save();
                            ctx.beginPath();
                            clipCol(0);
                        }
                    }
                }

                y += rh;
                row++;
            }

            ctx.restore();
            x += c.width;
        }

        imageLoader.current?.setWindow({
            x: cellXOffset,
            y: cellYOffset,
            width: effectiveCols.length,
            height: row - cellYOffset,
        });

        lastBlitData.current = { cellXOffset, cellYOffset, translateX, translateY };

        ctx.restore();

        const end = window.performance.now();
        const elapsedMs = end - start;
        timingValue.current = {
            count: currentTime.count + 1,
            time: currentTime.time + elapsedMs,
        };

        // Do nothing with frame times for now, in the future we can use them to draw placeholders instead
        // when rapid scrolling is underway.
        // if (timingValue.current.count % 1000 === 0) {
        //     alert(`Average Frame Time: ${timingValue.current.time / timingValue.current.count}`);
        // }
    }, [
        width,
        height,
        columns,
        cellXOffset,
        firstColSticky,
        translateX,
        translateY,
        dragAndDropState,
        theme.dataViewer.gridColor,
        theme.dataViewer.columnHeader.bgColor,
        theme.dataViewer.columnHeader.fgSelected,
        theme.dataViewer.columnHeader.fgColor,
        theme.dataViewer.columnHeader.bgSelected,
        theme.dataViewer.columnHeader.bgDark,
        theme.dataViewer.bgSelected,
        theme.dataViewer.bgPrelight,
        theme.borderColor,
        theme.acceptColor,
        cellYOffset,
        mappedColumns,
        rowHeight,
        headerHeight,
        selectedColumns,
        hoveredCol,
        isResizing,
        selectedCell,
        selectedRows,
        rows,
        getCellContent,
        drawCell,
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

    const headerHovered = hoveredItem?.[0] !== undefined && hoveredItem[1] === undefined;
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
                : headerHovered
                ? "pointer"
                : "default",
        }),
        [width, height, canDrag, isResizing, isDragging, headerHovered]
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
                                false
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
        [
            isDraggable,
            getMouseArgsForPosition,
            onDragStart,
            getBoundsForItem,
            theme.dataViewer.bgColor,
            drawCell,
            getCellContent,
        ]
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

            const getRowData = (cell: GridCell) => {
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
