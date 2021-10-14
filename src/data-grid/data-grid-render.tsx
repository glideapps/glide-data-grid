import ImageWindowLoader from "common/image-window-loader";
import { GridSelection, Theme } from "index";
import {
    drawBoolean,
    drawBubbles,
    drawDrilldownCell,
    drawImage,
    drawProtectedCell,
    drawTextCell,
    getEffectiveColumns,
    MappedGridColumn,
    roundedPoly,
} from "./data-grid-lib";
import { drawSprite, SpriteVariant } from "./data-grid-sprites";
import { GridCell, GridCellKind, GridColumn, InnerGridCell, Rectangle } from "./data-grid-types";

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

type CellList = readonly (readonly [number, number])[];

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
    drawCustomCell:
        | ((ctx: CanvasRenderingContext2D, cell: GridCell, theme: Theme, rect: Rectangle) => boolean)
        | undefined,
    imageLoader: ImageWindowLoader | undefined
) {
    const drawn =
        cell.kind === "new-row" ? false : drawCustomCell?.(ctx, cell, theme, { x, y, width: w, height: h }) === true;
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
        } else if (cell.kind === GridCellKind.Image && imageLoader !== undefined) {
            drawImage(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, imageLoader);
        } else if (cell.kind === GridCellKind.RowID) {
            drawTextCell(ctx, theme, cell.data, x, y, w, h, theme.fgColorLight);
        } else if (cell.kind === GridCellKind.Protected) {
            drawProtectedCell(ctx, theme, x, y, w, h, !highlighted);
        } else if (cell.kind === GridCellKind.Drilldown && imageLoader !== undefined) {
            drawDrilldownCell(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, imageLoader);
        } else if (cell.kind === "new-row") {
            drawTextCell(ctx, theme, cell.hint, x, y, w, h);
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

    // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

    const stickyRowHeight = lastRowSticky ? getRowHeight(rows - 1) : 0;

    const blitWidth = width - stickyWidth - Math.abs(deltaX);
    const blitHeight = height - headerHeight - stickyRowHeight - Math.abs(deltaY) - 1;

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
                y: height + deltaY - stickyRowHeight,
                width: width,
                height: -deltaY + stickyRowHeight,
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
    while (y + translateY <= height) {
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

    if (lastRowSticky) {
        ctx.rect(0, 0, width, height - stickyHeight);
        ctx.rect(0, height - stickyHeight + 1, width, stickyHeight - 1);
        ctx.clip();
    }
    ctx.beginPath();
}

function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    height: number,
    translateX: number,
    headerHeight: number,
    selectedColumns: readonly number[] | undefined,
    hoveredCol: number | undefined,
    dragAndDropState: DragAndDropState | undefined,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    theme: Theme
) {
    const xPad = 8;
    const yPad = 2;

    let x = 0;
    let clipX = 0;
    for (const c of effectiveCols) {
        const selected = selectedColumns?.includes(c.sourceIndex);
        const hovered = hoveredCol === c.sourceIndex && dragAndDropState === undefined && !isResizing;

        const hasSelectedCell = selectedCell !== undefined && selectedCell.cell[0] === c.sourceIndex;

        const fillStyle = selected ? theme.dataViewer.columnHeader.fgSelected : theme.dataViewer.columnHeader.fgColor;

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

        ctx.font =
            "bold 14px Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif";
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

function drawColumnContent(
    ctx: CanvasRenderingContext2D,
    c: MappedGridColumn,
    headerHeight: number,
    x: number,
    width: number,
    height: number,
    clipX: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    selectedRows: readonly number[] | undefined,
    disabledRows: readonly number[] | undefined,
    lastRowSticky: boolean,
    drawRegions: readonly Rectangle[],
    damage: CellList | undefined,
    selectedCell: GridSelection | undefined,
    selectedColumns: readonly number[] | undefined,
    prelightCells: CellList | undefined,
    drawCustomCell: DrawCustomCellCallback | undefined,
    imageLoader: ImageWindowLoader | undefined,
    theme: Theme
): { lastRowDrawn: number; newClipX: number } {
    let y = headerHeight + translateY;
    let row = cellYOffset;
    let lastRowDrawn = row;

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

        const rowSelected = selectedRows?.includes(row);
        const rowDisabled = disabledRows?.includes(row) && !isMovedStickyRow;

        if (
            doingSticky ||
            drawRegions.length === 0 ||
            drawRegions.find(
                drawRegion =>
                    (y >= drawRegion.y && y <= drawRegion.y + drawRegion.height) ||
                    (drawRegion.y >= y && drawRegion.y <= y + rh)
            )
        ) {
            const rowLocal = row;
            if (
                doingSticky ||
                damage === undefined ||
                damage.find(d => d[0] === c.sourceIndex && d[1] === rowLocal) !== undefined
            ) {
                ctx.beginPath();

                const isFocused =
                    !isMovedStickyRow && selectedCell?.cell[0] === c.sourceIndex && selectedCell?.cell[1] === row;
                let highlighted =
                    (!isMovedStickyRow && (rowSelected || isFocused)) ||
                    selectedColumns?.includes(c.sourceIndex) === true;

                if (selectedCell?.range !== undefined && !isMovedStickyRow) {
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
                        ctx.fillStyle = theme.dataViewer.columnHeader.bgColor;
                        if (x === 0) {
                            ctx.fillRect(x, y + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                        }
                    }
                    if (highlighted) {
                        ctx.fillStyle = theme.dataViewer.bgSelected;
                        if (x === 0) {
                            ctx.fillRect(x, y + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                        }
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

                const cell: InnerGridCell =
                    !isMovedStickyRow && row < rows
                        ? getCellContent([c.sourceIndex, row])
                        : {
                              kind: GridCellKind.Loading,
                              allowOverlay: false,
                          };

                if (cell.style === "faded") {
                    ctx.globalAlpha = 0.6;
                }

                drawCell(
                    ctx,
                    row,
                    cell,
                    c.sourceIndex,
                    x,
                    y,
                    c.width,
                    rh,
                    highlighted,
                    theme,
                    drawCustomCell,
                    imageLoader
                );

                ctx.globalAlpha = 1;

                if (isFocused) {
                    // we want to UNSET the clip of the column so that we can reclip with the ability to draw
                    // over the borders
                    ctx.restore(); // we now have no column clip
                    ctx.save(); // save state without column clip

                    ctx.beginPath();
                    clipCol(1); // we are now clipped with bigger bounds

                    if (lastRowSticky && row !== rows - 1) {
                        ctx.beginPath();
                        const stickyHeight = getRowHeight(rows - 1);
                        ctx.rect(0, 0, width, height - stickyHeight);
                        ctx.clip();
                    }

                    ctx.beginPath();
                    ctx.rect(x + 1, y + 1, c.width - 1, rh - 1);
                    ctx.strokeStyle = theme.acceptColor;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    ctx.restore(); // we now have no column clip
                    ctx.save(); // save state without column clip
                    ctx.beginPath();
                    clipCol(0); // restore original clip
                }
            }
        }

        if (doingSticky) {
            break;
        }
        y += rh;
        row++;
        lastRowDrawn++;
    }

    return { lastRowDrawn, newClipX: clipX };
}

export function drawGrid(
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
    selectedRows: readonly number[] | undefined,
    disabledRows: readonly number[] | undefined,
    rowHeight: number | ((index: number) => number),
    selectedColumns: readonly number[] | undefined,
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
    canvas: HTMLCanvasElement,
    canBlit: boolean | undefined,
    damage: CellList | undefined
) {
    const dpr = Math.ceil(window.devicePixelRatio) ?? 1;

    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
    }

    const last = lastBlitData.current;
    if (
        canBlit === true &&
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

    const getRowHeight = (r: number) => (typeof rowHeight === "number" ? rowHeight : rowHeight(r));

    ctx.save();
    ctx.beginPath(); // clear any path in the ctx
    if (dpr !== 1) {
        ctx.scale(dpr, dpr);
    }

    let drawRegions: Rectangle[] = [];
    let blittedYOnly = false;

    const effectiveCols = getEffectiveColumns(
        mappedColumns,
        cellXOffset,
        width,
        firstColSticky,
        dragAndDropState,
        translateX
    );

    if (canBlit === true) {
        const { regions, yOnly } = blitLastFrame(
            ctx,
            canvas,
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
        blittedYOnly = yOnly;
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

    const drawHeaders = !blittedYOnly && damage === undefined;
    if (drawHeaders) {
        // draw header background
        ctx.fillStyle = theme.dataViewer.columnHeader.bgColor;
        ctx.fillRect(0, 0, width, headerHeight);
    }

    drawGridLines(
        ctx,
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

    if (drawHeaders) {
        drawGridHeaders(
            ctx,
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
            theme
        );
    }

    ctx.beginPath();
    ctx.rect(0, headerHeight + 1, width, height - headerHeight - 1);
    ctx.clip();
    ctx.beginPath();

    let x = 0;
    let clipX = 0;
    let row = 0;
    ctx.font =
        "13px Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif";
    for (const c of effectiveCols) {
        ctx.save();
        const { lastRowDrawn, newClipX } = drawColumnContent(
            ctx,
            c,
            headerHeight,
            x,
            width,
            height,
            clipX,
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
            theme
        );
        ctx.restore();

        row = Math.max(row, lastRowDrawn);
        clipX = newClipX;
        x += c.width;
    }

    // fill blank rows to the right
    if (
        (selectedRows !== undefined && selectedRows.length > 0) ||
        (disabledRows !== undefined && disabledRows.length > 0)
    ) {
        let y = headerHeight + translateY;
        row = cellYOffset;

        ctx.save();

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

            const rowSelected = selectedRows?.includes(row);
            const rowDisabled = disabledRows?.includes(row);

            if (!doSticky || row !== rows - 1) {
                if (
                    drawRegions.length === 0 ||
                    drawRegions.find(
                        drawRegion =>
                            (y >= drawRegion.y && y <= drawRegion.y + drawRegion.height) ||
                            (drawRegion.y >= y && drawRegion.y <= y + rh)
                    )
                ) {
                    ctx.beginPath();

                    if (rowDisabled) {
                        ctx.fillStyle = theme.dataViewer.columnHeader.bgColor;
                        ctx.fillRect(x + 1, y + 1, 100000 - 1, rh - 1);
                    }
                    if (rowSelected) {
                        ctx.fillStyle = theme.dataViewer.bgSelected;
                        ctx.fillRect(x + 1, y + 1, 100000 - 1, rh - 1);
                    }
                }
            }

            if (doingSticky) break;
            y += rh;
            row++;
        }

        ctx.restore();
    }

    imageLoader?.setWindow({
        x: cellXOffset,
        y: cellYOffset,
        width: effectiveCols.length,
        height: row - cellYOffset,
    });

    lastBlitData.current = { cellXOffset, cellYOffset, translateX, translateY };

    ctx.restore();
}
