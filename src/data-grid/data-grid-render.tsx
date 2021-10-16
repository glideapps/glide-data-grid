import ImageWindowLoader from "common/image-window-loader";
import {
    GridSelection,
    isInnerOnlyCell,
    GridCell,
    GridCellKind,
    GridColumn,
    InnerGridCell,
    InnerGridCellKind,
    Rectangle,
    CompactSelection,
} from "./data-grid-types";
import { HoverValues } from "./animation-manager";
import {
    drawBoolean,
    drawBubbles,
    drawDrilldownCell,
    drawImage,
    drawMarkerRowCell,
    drawNewRowCell,
    drawProtectedCell,
    drawTextCell,
    getEffectiveColumns,
    MappedGridColumn,
    roundedPoly,
} from "./data-grid-lib";
import { SpriteManager, SpriteVariant } from "./data-grid-sprites";
import { Theme } from "common/styles";

interface BlitData {
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
}

interface DragAndDropState {
    src: number;
    dest: number;
}

type DrawCustomCellCallback = (ctx: CanvasRenderingContext2D, cell: GridCell, theme: Theme, rect: Rectangle) => boolean;

type CellList = readonly (readonly [number, number | undefined])[];

export function drawCell(
    ctx: CanvasRenderingContext2D,
    row: number,
    cell: InnerGridCell,
    sourceIndex: number,
    x: number,
    y: number,
    w: number,
    h: number,
    highlighted: boolean,
    theme: Theme,
    drawCustomCell: DrawCustomCellCallback | undefined,
    imageLoader: ImageWindowLoader | undefined,
    hoverAmount: number
) {
    const drawn = isInnerOnlyCell(cell)
        ? false
        : drawCustomCell?.(ctx, cell, theme, { x, y, width: w, height: h }) === true;
    if (!drawn) {
        if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number) {
            drawTextCell(ctx, theme, cell.displayData, x, y, w, h, hoverAmount);
        } else if (cell.kind === GridCellKind.Markdown || cell.kind === GridCellKind.Uri) {
            drawTextCell(ctx, theme, cell.data, x, y, w, h, hoverAmount);
        } else if (cell.kind === GridCellKind.Boolean) {
            if (cell.data || cell.showUnchecked) {
                drawBoolean(ctx, theme, cell.data, x, y, w, h, hoverAmount, highlighted, cell.allowEdit);
            }
        } else if (cell.kind === GridCellKind.Bubble) {
            drawBubbles(ctx, theme, cell.data, x, y, w, h, hoverAmount, highlighted);
        } else if (cell.kind === GridCellKind.Image && imageLoader !== undefined) {
            drawImage(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, hoverAmount, imageLoader);
        } else if (cell.kind === GridCellKind.RowID) {
            drawTextCell(ctx, theme, cell.data, x, y, w, h, hoverAmount, theme.textLight);
        } else if (cell.kind === GridCellKind.Protected) {
            drawProtectedCell(ctx, theme, x, y, w, h, hoverAmount, !highlighted);
        } else if (cell.kind === GridCellKind.Drilldown && imageLoader !== undefined) {
            drawDrilldownCell(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, hoverAmount, imageLoader);
        } else if (cell.kind === InnerGridCellKind.NewRow) {
            drawNewRowCell(ctx, theme, cell.hint, cell.isFirst, x, y, w, h, hoverAmount);
        } else if (cell.kind === InnerGridCellKind.Marker) {
            drawMarkerRowCell(ctx, theme, cell.row, cell.checked, cell.markerKind, x, y, w, h, hoverAmount);
        }
    }
}

function blitLastFrame(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    last: BlitData,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    lastRowSticky: boolean,
    width: number,
    height: number,
    rows: number,
    headerHeight: number,
    dpr: number,
    columns: readonly GridColumn[],
    effectiveCols: readonly MappedGridColumn[],
    getRowHeight: (r: number) => number
) {
    const drawRegions: Rectangle[] = [];
    let blittedYOnly = false;

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

    if (deltaX !== 0 && deltaY !== 0) {
        return {
            regions: [],
            yOnly: false,
        };
    }

    const stickyRowHeight = lastRowSticky ? getRowHeight(rows - 1) : 0;

    const blitWidth = width - stickyWidth - Math.abs(deltaX);
    const blitHeight = height - headerHeight - stickyRowHeight - Math.abs(deltaY) - 1;

    if (blitWidth > 150 && blitHeight > 150) {
        blittedYOnly = deltaX === 0;

        let args = {
            sx: 0,
            sy: 0,
            sw: width * dpr,
            sh: height * dpr,
            dx: 0,
            dy: 0,
            dw: width,
            dh: height,
        };

        // blit Y
        if (deltaY > 0) {
            // scrolling up
            args = {
                ...args,
                sy: (headerHeight + 1) * dpr,
                sh: blitHeight * dpr,
                dy: deltaY + headerHeight + 1,
                dh: blitHeight,
            };
            drawRegions.push({
                x: 0,
                y: headerHeight,
                width: width,
                height: deltaY + 1,
            });
        } else if (deltaY < 0) {
            // scrolling down
            args = {
                ...args,
                sy: (-deltaY + headerHeight + 1) * dpr,
                sh: blitHeight * dpr,
                dy: headerHeight + 1,
                dh: blitHeight,
            };
            drawRegions.push({
                x: 0,
                y: height + deltaY - stickyRowHeight,
                width: width,
                height: -deltaY + stickyRowHeight,
            });
        }

        // blit X
        if (deltaX > 0) {
            // scrolling right
            args = {
                ...args,
                sx: stickyWidth * dpr,
                sw: blitWidth * dpr,
                dx: deltaX + stickyWidth,
                dw: blitWidth,
            };
            drawRegions.push({
                x: stickyWidth - 1,
                y: 0,
                width: deltaX + 1,
                height: height,
            });
        } else if (deltaX < 0) {
            // scrolling left
            args = {
                ...args,
                sx: (stickyWidth - deltaX) * dpr,
                sw: blitWidth * dpr,
                dx: stickyWidth,
                dw: blitWidth,
            };
            drawRegions.push({
                x: width + deltaX,
                y: 0,
                width: -deltaX,
                height: height,
            });
        }

        // console.log(args.sx, args.sy, args.sw, args.sh, args.dx, args.dy, args.dw, args.dh);
        ctx.drawImage(canvas, args.sx, args.sy, args.sw, args.sh, args.dx, args.dy, args.dw, args.dh);
    }
    ctx.imageSmoothingEnabled = true;

    return {
        regions: drawRegions,
        yOnly: blittedYOnly,
    };
}

function drawGridLines(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    cellYOffset: number,
    translateX: number,
    translateY: number,
    width: number,
    height: number,
    headerHeight: number,
    getRowHeight: (row: number) => number,
    lastRowSticky: boolean,
    rows: number,
    theme: Theme
) {
    ctx.beginPath();

    // vertical lines
    let x = 0.5;
    effectiveCols.forEach(c => {
        x += c.width;
        const tx = c.sticky ? x : x + translateX;
        ctx.moveTo(tx, 0);
        ctx.lineTo(tx, height);
    });

    const stickyHeight = getRowHeight(rows - 1);
    const stickyRowY = height - stickyHeight + 0.5;
    if (lastRowSticky) {
        ctx.moveTo(0, stickyRowY);
        ctx.lineTo(width, stickyRowY);
    }

    // horizontal lines
    let y = headerHeight + 0.5;
    let row = cellYOffset;
    let isHeader = true;
    const target = lastRowSticky ? height - stickyHeight : height;
    while (y + translateY <= target) {
        const ty = isHeader ? y : y + translateY;
        // This shouldn't be needed it seems like... yet it is. We're not sure why.
        if (!lastRowSticky || ty !== stickyRowY) {
            ctx.moveTo(0, ty);
            ctx.lineTo(width, ty);
        }

        y += getRowHeight(row);
        isHeader = false;
        row++;
    }

    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
}

function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    height: number,
    translateX: number,
    headerHeight: number,
    selectedColumns: CompactSelection,
    hoveredCol: number | undefined,
    dragAndDropState: DragAndDropState | undefined,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    outerTheme: Theme,
    spriteManager: SpriteManager
) {
    // FIXME: This should respect the per-column theme
    ctx.fillStyle = outerTheme.bgHeader;
    ctx.fillRect(0, 0, width, headerHeight);

    const xPad = 8;
    const yPad = 2;

    let x = 0;
    let clipX = 0;
    for (const c of effectiveCols) {
        const theme = c.themeOverride === undefined ? outerTheme : { ...outerTheme, ...c.themeOverride };
        const selected = selectedColumns.hasIndex(c.sourceIndex);
        const hovered = hoveredCol === c.sourceIndex && dragAndDropState === undefined && !isResizing;

        const hasSelectedCell = selectedCell !== undefined && selectedCell.cell[0] === c.sourceIndex;

        const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;

        const bgFillStyle = selected ? theme.accentColor : hasSelectedCell ? theme.bgHeaderHasFocus : theme.bgHeader;

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
            ctx.fillStyle = theme.bgHeaderHasFocus;
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
            spriteManager.drawSprite(c.icon, variant, ctx, drawX, (headerHeight - 20) / 2, 20, theme);

            if (c.overlayIcon !== undefined) {
                ctx.globalAlpha = 1;
                spriteManager.drawSprite(
                    c.overlayIcon,
                    selected ? "selected" : "special",
                    ctx,
                    drawX + 9,
                    (headerHeight - 18) / 2 + 6,
                    18,
                    theme
                );
                ctx.globalAlpha = hovered || selected ? 1 : 0.6;
            }

            drawX += 26;
        }

        ctx.font = `${theme.headerFontStyle} ${theme.fontFamily}`;
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

function intersectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
    return x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1;
}

function clipDamage(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    height: number,
    headerHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    lastRowSticky: boolean,
    damage: CellList | undefined
): void {
    if (damage === undefined || damage.length === 0) return;
    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        headerHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            const diff = Math.max(0, clipX - drawX);
            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh) => {
                const isDamaged = damage.some(d => d[0] === c.sourceIndex && d[1] === row);
                if (isDamaged) {
                    ctx.rect(drawX + diff + 1, drawY + 1, c.width - diff - 1, rh - 1);
                }
            });
        }
    );
    ctx.clip();
}

function drawCells(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    height: number,
    headerHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    lastRowSticky: boolean,
    drawRegions: readonly Rectangle[],
    damage: CellList | undefined,
    selectedCell: GridSelection | undefined,
    selectedColumns: CompactSelection,
    prelightCells: CellList | undefined,
    drawCustomCell: DrawCustomCellCallback | undefined,
    imageLoader: ImageWindowLoader | undefined,
    hoverValues: HoverValues,
    outerTheme: Theme
): void {
    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        headerHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            const diff = Math.max(0, clipX - drawX);
            ctx.save();
            ctx.beginPath();
            ctx.rect(Math.max(drawX, clipX), headerHeight + 1, c.width - diff, height - headerHeight - 1);
            ctx.clip();

            const theme = c.themeOverride === undefined ? outerTheme : { ...outerTheme, ...c.themeOverride };
            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh, isSticky) => {
                if (!isSticky && damage !== undefined && !damage.some(d => d[0] === c.sourceIndex && d[1] === row)) {
                    return;
                }
                if (
                    !isSticky &&
                    drawRegions.length > 0 &&
                    !drawRegions.some(dr => intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height))
                ) {
                    return;
                }

                const rowSelected = selectedRows.hasIndex(row);
                const rowDisabled = disabledRows.hasIndex(row);

                ctx.beginPath();

                const isFocused = selectedCell?.cell[0] === c.sourceIndex && selectedCell?.cell[1] === row;
                let highlighted = rowSelected || isFocused || selectedColumns.hasIndex(c.sourceIndex);

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

                if (highlighted || rowDisabled) {
                    if (rowDisabled) {
                        ctx.fillStyle = theme.bgHeader;
                        if (drawX === 0) {
                            ctx.fillRect(drawX, drawY + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(drawX + 1, drawY + 1, c.width - 1, rh - 1);
                        }
                    }
                    if (highlighted) {
                        ctx.fillStyle = theme.accentLight;
                        if (drawX === 0) {
                            ctx.fillRect(drawX, drawY + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(drawX + 1, drawY + 1, c.width - 1, rh - 1);
                        }
                    }
                } else {
                    if (prelightCells?.find(pre => pre[0] === c.sourceIndex && pre[1] === row) !== undefined) {
                        ctx.fillStyle = theme.bgSearchResult;
                        if (drawX === 0) {
                            ctx.fillRect(drawX, drawY + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(drawX + 1, drawY + 1, c.width - 1, rh - 1);
                        }
                    }
                }

                const cell: InnerGridCell =
                    row < rows
                        ? getCellContent([c.sourceIndex, row])
                        : {
                              kind: GridCellKind.Loading,
                              allowOverlay: false,
                          };

                if (cell.style === "faded") {
                    ctx.globalAlpha = 0.6;
                }

                const hoverValue = hoverValues.find(hv => hv.item[0] === c.sourceIndex && hv.item[1] === row);

                drawCell(
                    ctx,
                    row,
                    cell,
                    c.sourceIndex,
                    drawX,
                    drawY,
                    c.width,
                    rh,
                    highlighted,
                    theme,
                    drawCustomCell,
                    imageLoader,
                    hoverValue?.hoverAmount ?? 0
                );

                ctx.globalAlpha = 1;
            });

            ctx.restore();
        }
    );
}

function drawBlanks(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    height: number,
    headerHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    lastRowSticky: boolean,
    drawRegions: readonly Rectangle[],
    damage: CellList | undefined,
    theme: Theme
): void {
    if (damage !== undefined) return;
    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        headerHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            if (c !== effectiveColumns.slice(-1)[0]) return;
            ctx.save();
            ctx.beginPath();
            drawX += c.width;
            ctx.rect(Math.max(drawX, clipX), headerHeight + 1, 10000, height - headerHeight - 1);
            ctx.clip();

            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh, isSticky) => {
                if (
                    !isSticky &&
                    drawRegions.length > 0 &&
                    !drawRegions.some(dr => intersectRect(drawX, drawY, 10000, rh, dr.x, dr.y, dr.width, dr.height))
                ) {
                    return;
                }

                const rowSelected = selectedRows.hasIndex(row);
                const rowDisabled = disabledRows.hasIndex(row);

                ctx.beginPath();

                if (rowDisabled) {
                    ctx.fillStyle = theme.bgHeader;
                    ctx.fillRect(drawX + 1, drawY + 1, 10000 - 1, rh - 1);
                }
                if (rowSelected) {
                    ctx.fillStyle = theme.accentLight;
                    ctx.fillRect(drawX + 1, drawY + 1, 10000 - 1, rh - 1);
                }
            });

            ctx.restore();
        }
    );
}

export function drawGrid(
    canvas: HTMLCanvasElement,
    bufferCanvas: HTMLCanvasElement,
    overlayCanvas: HTMLCanvasElement,
    width: number,
    height: number,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    columns: readonly GridColumn[],
    mappedColumns: readonly MappedGridColumn[],
    firstColSticky: boolean,
    dragAndDropState: DragAndDropState | undefined,
    theme: Theme,
    headerHeight: number,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    rowHeight: number | ((index: number) => number),
    selectedColumns: CompactSelection,
    hoveredCol: number | undefined,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    lastRowSticky: boolean,
    rows: number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    drawCustomCell: DrawCustomCellCallback | undefined,
    prelightCells: CellList | undefined,
    imageLoader: ImageWindowLoader | undefined,
    lastBlitData: React.MutableRefObject<BlitData>,
    canBlit: boolean | undefined,
    damage: CellList | undefined,
    hoverValues: HoverValues,
    spriteManager: SpriteManager
) {
    const dpr = Math.ceil(window.devicePixelRatio) ?? 1;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
    }

    if (bufferCanvas.width !== width * dpr || bufferCanvas.height !== height * dpr) {
        bufferCanvas.width = width * dpr;
        bufferCanvas.height = height * dpr;
    }

    overlayCanvas.width = width * dpr;
    overlayCanvas.height = height * dpr;
    // if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== height * dpr) {
    // }

    const last = lastBlitData.current;
    if (
        canBlit === true &&
        cellXOffset === last.cellXOffset &&
        cellYOffset === last.cellYOffset &&
        translateX === last.translateX &&
        translateY === last.translateY
    )
        return;

    const targetCtx = canvas.getContext("2d", {
        alpha: false,
    });
    const overlayCtx = overlayCanvas.getContext("2d");
    const bufferCtx = bufferCanvas.getContext("2d", {
        alpha: false,
    });
    if (bufferCtx === null || overlayCtx === null || targetCtx === null) return;

    const getRowHeight = (r: number) => (typeof rowHeight === "number" ? rowHeight : rowHeight(r));

    bufferCtx.save();
    bufferCtx.beginPath();
    overlayCtx.save();
    overlayCtx.beginPath();
    targetCtx.save();
    targetCtx.beginPath(); // clear any path in the ctx
    if (dpr !== 1) {
        bufferCtx.scale(dpr, dpr);
        overlayCtx.scale(dpr, dpr);
        targetCtx.scale(dpr, dpr);
    }

    let drawRegions: Rectangle[] = [];

    const effectiveCols = getEffectiveColumns(
        mappedColumns,
        cellXOffset,
        width,
        firstColSticky,
        dragAndDropState,
        translateX
    );

    if (canBlit === true) {
        const { regions } = blitLastFrame(
            bufferCtx,
            bufferCanvas,
            last,
            cellXOffset,
            cellYOffset,
            translateX,
            translateY,
            lastRowSticky,
            width,
            height,
            rows,
            headerHeight,
            dpr,
            columns,
            effectiveCols,
            getRowHeight
        );
        drawRegions = regions;
    }

    clipDamage(
        bufferCtx,
        effectiveCols,
        height,
        headerHeight,
        translateX,
        translateY,
        cellYOffset,
        rows,
        getRowHeight,
        lastRowSticky,
        damage
    );

    drawGridHeaders(
        overlayCtx,
        effectiveCols,
        width,
        height,
        translateX,
        headerHeight,
        selectedColumns,
        hoveredCol,
        dragAndDropState,
        isResizing,
        selectedCell,
        theme,
        spriteManager
    );

    if (drawRegions.length > 0) {
        bufferCtx.beginPath();
        for (const r of drawRegions) {
            bufferCtx.rect(r.x, r.y, r.width, r.height);
        }
        bufferCtx.clip();
        bufferCtx.beginPath();
    }

    bufferCtx.fillStyle = theme.bgCell;
    bufferCtx.fillRect(0, headerHeight, width, height - headerHeight);

    bufferCtx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    overlayCtx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;

    drawCells(
        bufferCtx,
        effectiveCols,
        height,
        headerHeight,
        translateX,
        translateY,
        cellYOffset,
        rows,
        getRowHeight,
        getCellContent,
        selectedRows,
        disabledRows,
        lastRowSticky,
        drawRegions,
        damage,
        selectedCell,
        selectedColumns,
        prelightCells,
        drawCustomCell,
        imageLoader,
        hoverValues,
        theme
    );

    drawBlanks(
        bufferCtx,
        effectiveCols,
        height,
        headerHeight,
        translateX,
        translateY,
        cellYOffset,
        rows,
        getRowHeight,
        selectedRows,
        disabledRows,
        lastRowSticky,
        drawRegions,
        damage,
        theme
    );

    // Draw our overlay buffer
    drawGridLines(
        overlayCtx,
        effectiveCols,
        cellYOffset,
        translateX,
        translateY,
        width,
        height,
        headerHeight,
        getRowHeight,
        lastRowSticky,
        rows,
        theme
    );

    drawFocusRing(
        overlayCtx,
        height,
        cellYOffset,
        translateX,
        translateY,
        effectiveCols,
        theme,
        headerHeight,
        selectedCell,
        getRowHeight,
        lastRowSticky,
        rows
    );

    imageLoader?.setWindow({
        x: cellXOffset,
        y: cellYOffset,
        width: effectiveCols.length,
        height: 100, // FIXME: row - cellYOffset,
    });

    lastBlitData.current = { cellXOffset, cellYOffset, translateX, translateY };
    targetCtx.beginPath();

    targetCtx.fillStyle = theme.bgCell;
    targetCtx.fillRect(0, 0, width, height);

    targetCtx.drawImage(bufferCanvas, 0, 0);
    targetCtx.drawImage(overlayCanvas, 0, 0);

    bufferCtx.restore();
    targetCtx.restore();
    overlayCtx.restore();
}

export function drawFocusRing(
    ctx: CanvasRenderingContext2D,
    height: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    effectiveCols: readonly MappedGridColumn[],
    theme: Theme,
    headerHeight: number,
    selectedCell: GridSelection | undefined,
    getRowHeight: (row: number) => number,
    lastRowSticky: boolean,
    rows: number
) {
    if (selectedCell === undefined || effectiveCols.find(c => (c.sourceIndex === selectedCell.cell[0]) === undefined))
        return;
    const [targetCol, targetRow] = selectedCell.cell;

    walkColumns(
        effectiveCols,
        cellYOffset,
        translateX,
        translateY,
        headerHeight,
        (col, drawX, colDrawY, clipX, startRow) => {
            if (col.sourceIndex !== targetCol) return;

            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh) => {
                if (row !== targetRow) return;

                ctx.save();
                if (clipX > drawX) {
                    ctx.beginPath();
                    ctx.fill();
                    ctx.clip();
                }
                ctx.beginPath();
                ctx.rect(drawX + 0.5, drawY + 0.5, col.width, rh);
                ctx.strokeStyle = theme.accentColor;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            });
        }
    );
}

type WalkRowsCallback = (drawY: number, row: number, rowHeight: number, isSticky: boolean) => void;

export function walkRowsInCol(
    startRow: number,
    drawY: number,
    height: number,
    rows: number,
    getRowHeight: (row: number) => number,
    lastRowSticky: boolean,
    cb: WalkRowsCallback
): void {
    let y = drawY;
    let row = startRow;
    let doSticky = lastRowSticky;
    while (y < height || doSticky) {
        const doingSticky = doSticky && y >= height;
        if (doingSticky) {
            doSticky = false;
            row = rows - 1;
        }
        const rh = getRowHeight(row);

        if (doingSticky) {
            y = height - rh;
        }

        const isMovedStickyRow = doSticky && row === rows - 1;

        if (!isMovedStickyRow) {
            cb(y, row, rh, doingSticky);
        }

        if (doingSticky) {
            break;
        }
        y += rh;
        row++;
    }
}

type WalkColsCallback = (col: MappedGridColumn, drawX: number, drawY: number, clipX: number, startRow: number) => void;

export function walkColumns(
    effectiveCols: readonly MappedGridColumn[],
    cellYOffset: number,
    translateX: number,
    translateY: number,
    headerHeight: number,
    cb: WalkColsCallback
): void {
    let x = 0;
    let clipX = 0; // this tracks the total width of sticky cols
    const drawY = headerHeight + translateY;
    for (const c of effectiveCols) {
        let drawX: number;
        if (c.sticky) {
            drawX = clipX;
        } else {
            drawX = x + translateX;
        }

        cb(c, drawX, drawY, clipX, cellYOffset);

        x += c.width;
        clipX += c.sticky ? c.width : 0;
    }
}
