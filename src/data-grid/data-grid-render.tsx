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

    if (deltaX !== 0 && deltaY !== 0)
        return {
            regions: [],
            yOnly: false,
        };

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
): { lastRowDrawn: number; newClipX: number; drawFocusRing?: () => void } {
    const theme = c.themeOverride === undefined ? outerTheme : { ...outerTheme, ...c.themeOverride };

    let y = headerHeight + translateY;
    let row = cellYOffset;
    let lastRowDrawn = row;
    let drawFocusRing: (() => void) | undefined;

    // clip out the column just to make sure we dont clobby other columns
    ctx.beginPath();
    if (c.sticky) {
        clipX = Math.max(clipX, x + c.width);
        ctx.rect(x, headerHeight + 1, c.width, height - headerHeight - 1);
        ctx.clip();
    } else {
        const diff = Math.min(0, x + translateX - clipX);
        ctx.rect(Math.max(x + translateX, clipX), headerHeight + 1, c.width + diff, height - headerHeight - 1);
        ctx.clip();
        ctx.translate(translateX, 0);
    }

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

        const rowSelected = selectedRows.hasIndex(row);
        const rowDisabled = disabledRows.hasIndex(row) && !isMovedStickyRow;

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
                    (!isMovedStickyRow && (rowSelected || isFocused)) || selectedColumns.hasIndex(c.sourceIndex);

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
                        ctx.fillStyle = theme.bgHeader;
                        if (x === 0) {
                            ctx.fillRect(x, y + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                        }
                    }
                    if (highlighted) {
                        ctx.fillStyle = theme.accentLight;
                        if (x === 0) {
                            ctx.fillRect(x, y + 1, c.width, rh - 1);
                        } else {
                            ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                        }
                    }
                } else {
                    // eslint-disable-next-line no-loop-func
                    if (prelightCells?.find(pre => pre[0] === c.sourceIndex && pre[1] === row) !== undefined) {
                        ctx.fillStyle = theme.bgSearchResult;
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

                const hoverValue = hoverValues.find(hv => hv.item[0] === c.sourceIndex && hv.item[1] === row);

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
                    imageLoader,
                    hoverValue?.hoverAmount ?? 0
                );

                ctx.globalAlpha = 1;

                if (isFocused) {
                    const localX = x;
                    const localY = y;
                    const localRowHeight = rh;
                    const localRow = row;
                    const localColWidth = c.width;
                    const localTranslateX = c.sticky ? 0 : translateX;
                    drawFocusRing = () => {
                        ctx.translate(localTranslateX, 0);
                        if (lastRowSticky && localRow !== rows - 1) {
                            ctx.beginPath();
                            const stickyHeight = getRowHeight(rows - 1);
                            ctx.rect(0, 0, width, height - stickyHeight);
                            ctx.clip();
                        }

                        ctx.beginPath();
                        ctx.rect(localX + 0.5, localY + 0.5, localColWidth, localRowHeight);
                        ctx.strokeStyle = theme.accentColor;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    };
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

    return { lastRowDrawn, newClipX: clipX, drawFocusRing };
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
    canvas: HTMLCanvasElement,
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
        let doSticky = lastRowSticky;
        while (y < height || doSticky) {
            const doingSticky = doSticky && y >= height;
            if (doingSticky) {
                doSticky = false;
                row = rows - 1;
            }
            let x = 0;
            const rh = getRowHeight(row);

            for (const c of effectiveCols) {
                const rowLocal = row;
                if (damage.find(d => d[0] === c.sourceIndex && d[1] === rowLocal) !== undefined) {
                    const tx = c.sticky ? 0 : translateX;
                    if (rowLocal === rows - 1 && lastRowSticky) {
                        ctx.rect(x + 1 + tx, height - rh + 1, c.width - 1, rh - 1);
                    } else {
                        ctx.rect(x + 1 + tx, y + 1, c.width - 1, rh - 1);
                    }
                }
                x += c.width;
            }

            if (doingSticky) break;
            row++;
            y += rh;
        }

        ctx.clip();
        ctx.beginPath();
    }

    ctx.fillStyle = theme.bgCell;
    ctx.fillRect(0, headerHeight, width, height - headerHeight);

    const drawHeaders = !blittedYOnly && damage === undefined;
    if (drawHeaders) {
        // draw header background
        ctx.fillStyle = theme.bgHeader;
        ctx.fillRect(0, 0, width, headerHeight);
    }

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
            theme,
            spriteManager
        );
    }

    // clip the headers
    ctx.beginPath();
    ctx.save();
    ctx.rect(0, headerHeight + 1, width, height - headerHeight - 1);
    ctx.clip();
    ctx.beginPath();

    let x = 0;
    let clipX = 0;
    let row = 0;
    ctx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    let drawFocus: (() => void) | undefined;
    for (const c of effectiveCols) {
        ctx.save();
        const { lastRowDrawn, newClipX, drawFocusRing } = drawColumnContent(
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
            hoverValues,
            theme
        );
        ctx.restore();

        drawFocus = drawFocus ?? drawFocusRing;
        row = Math.max(row, lastRowDrawn);
        clipX = newClipX;
        x += c.width;
    }

    // fill blank rows to the right
    if (selectedRows.length > 0 || disabledRows.length > 0) {
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

            const rowSelected = selectedRows.hasIndex(row);
            const rowDisabled = disabledRows.hasIndex(row);

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
                        ctx.fillStyle = theme.bgHeader;
                        ctx.fillRect(x + 1, y + 1, 100000 - 1, rh - 1);
                    }
                    if (rowSelected) {
                        ctx.fillStyle = theme.accentLight;
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

    ctx.restore();
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

    if (drawFocus !== undefined) {
        // clip the headers but the borders
        ctx.beginPath();
        ctx.save();
        ctx.rect(0, headerHeight, width, height - headerHeight);
        ctx.clip();

        ctx.beginPath();
        drawFocus();

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
