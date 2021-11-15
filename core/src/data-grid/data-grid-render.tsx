import ImageWindowLoader from "../common/image-window-loader";
import {
    GridSelection,
    isInnerOnlyCell,
    GridCellKind,
    GridColumn,
    InnerGridCell,
    Rectangle,
    CompactSelection,
    DrawCustomCellCallback,
} from "./data-grid-types";
import { HoverValues } from "./animation-manager";
import { getEffectiveColumns, getStickyWidth, MappedGridColumn, roundedPoly } from "./data-grid-lib";
import { SpriteManager, SpriteVariant } from "./data-grid-sprites";
import { Theme } from "../common/styles";
import { parseToRgba } from "./color-parser";
import { CellRenderers } from "./cells";

// Future optimization opportunities
// - Create a cache of a buffer used to render the full view of a partially displayed column so that when scrolling
//   horizontally you can simply blit the pre-drawn column instead of continually paying the draw cost as it slides
//   into view.
// - Blit headers on horizontal scroll
// - Don't redraw cells that are hovered if they don't respond to hover anyway
// - Draw at 1:1 during scroll and then present HiDPI after scrolling ends
// - Use webworker to load images, helpful with lots of large images
// - Sprite map currently wastes a lot of canvas texture space
// - It may be interesting to try creating "sufficient" canvases to just give each column its own canvas and compose
//   that way. There may be significant gaints to be had there. This would also allow for fluid column DnD.

type HoverInfo = readonly [readonly [number, number | undefined], readonly [number, number]];

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

type CellList = readonly (readonly [number, number | undefined])[];

export function drawCell(
    ctx: CanvasRenderingContext2D,
    row: number,
    cell: InnerGridCell,
    col: number,
    x: number,
    y: number,
    w: number,
    h: number,
    highlighted: boolean,
    theme: Theme,
    drawCustomCell: DrawCustomCellCallback | undefined,
    imageLoader: ImageWindowLoader,
    hoverAmount: number,
    hoverInfo: HoverInfo | undefined
) {
    let hoverX: number | undefined;
    let hoverY: number | undefined;
    if (hoverInfo !== undefined && hoverInfo[0][0] === col && hoverInfo[0][1] === row) {
        hoverX = hoverInfo[1][0];
        hoverY = hoverInfo[1][1];
    }
    const drawn = isInnerOnlyCell(cell)
        ? false
        : drawCustomCell?.({ ctx, cell, theme, rect: { x, y, width: w, height: h }, hoverAmount }) === true;
    if (!drawn && cell.kind !== GridCellKind.Custom) {
        const r = CellRenderers[cell.kind];
        r.render(ctx, theme, col, row, cell, x, y, w, h, highlighted, hoverAmount, hoverX, hoverY, imageLoader);
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

    let stickyWidth = getStickyWidth(effectiveCols);
    if (stickyWidth > 0) stickyWidth++;

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
            // pixels moving right
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
                width: deltaX + 2, // extra width to account for first col not drawing a left side border
                height: height,
            });
        } else if (deltaX < 0) {
            // pixels moving left
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
            ctx.beginPath();
        }

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
    verticalBorder: (col: number) => boolean,
    lastRowSticky: boolean,
    rows: number,
    theme: Theme,
    verticalOnly: boolean = false
) {
    ctx.beginPath();
    // we need to under-draw the header background on its line to improve its contrast.
    ctx.moveTo(0, headerHeight + 0.5);
    ctx.lineTo(width, headerHeight + 0.5);
    ctx.strokeStyle = theme.bgHeader;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();

    // vertical lines
    let x = 0.5;
    for (let index = 0; index < effectiveCols.length; index++) {
        const c = effectiveCols[index];
        x += c.width;
        const tx = c.sticky ? x : x + translateX;
        if (index === effectiveCols.length - 1 || verticalBorder(index + 1)) {
            ctx.moveTo(tx, 0);
            ctx.lineTo(tx, height);
        }
    }

    const stickyHeight = getRowHeight(rows - 1);
    const stickyRowY = height - stickyHeight + 0.5;
    if (lastRowSticky) {
        ctx.moveTo(0, stickyRowY);
        ctx.lineTo(width, stickyRowY);
    }

    if (verticalOnly !== true) {
        // horizontal lines
        let y = headerHeight + 0.5;
        let row = cellYOffset;
        let isHeader = true;
        const target = lastRowSticky ? height - stickyHeight : height;
        while (y + translateY <= target) {
            const ty = isHeader ? y : y + translateY;
            // This shouldn't be needed it seems like... yet it is. We're not sure why.
            if (!lastRowSticky || row !== rows - 1 || Math.abs(ty - stickyRowY) > 1) {
                ctx.moveTo(0, ty);
                ctx.lineTo(width, ty);
            }

            y += getRowHeight(row);
            isHeader = false;
            row++;
        }
    }

    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
}

function drawGroups(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    height: number,
    translateX: number,
    headerHeight: number,
    theme: Theme,
    verticalBorder: (col: number) => boolean
) {
    const trueHeaderHeight = headerHeight / 2;
    const xPad = 8;
    let x = 0;
    let clipX = 0;
    for (let index = 0; index < effectiveCols.length; index++) {
        const startCol = effectiveCols[index];
        const group = startCol.group;

        let end = index + 1;
        let boxWidth = startCol.width;
        if (startCol.sticky) {
            clipX += boxWidth;
        }
        while (
            end < effectiveCols.length &&
            effectiveCols[end].group === group &&
            effectiveCols[end].sticky === effectiveCols[index].sticky
        ) {
            const endCol = effectiveCols[end];
            boxWidth += endCol.width;
            end++;
            index++;
            if (endCol.sticky) {
                clipX += endCol.width;
            }
        }

        const t = startCol.sticky ? 0 : translateX;
        const localX = x + t;

        ctx.save();
        ctx.beginPath();
        const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
        ctx.rect(localX + delta, 0, boxWidth - delta, height);
        ctx.clip();

        ctx.fillStyle = theme.textGroupHeader ?? theme.textHeader;
        if (group !== undefined) {
            ctx.fillText(group, localX + delta + xPad, trueHeaderHeight / 2 + 5);
        }

        if (verticalBorder(startCol.sourceIndex)) {
            ctx.beginPath();
            ctx.moveTo(localX + delta + 0.5, 0);
            ctx.lineTo(localX + delta + 0.5, trueHeaderHeight);
            ctx.strokeStyle = theme.borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();

        x += boxWidth;
    }

    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, trueHeaderHeight);

    ctx.moveTo(0, trueHeaderHeight + 0.5);
    ctx.lineTo(width, trueHeaderHeight + 0.5);
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    enableGroups: boolean,
    hoveredCol: number | undefined,
    width: number,
    height: number,
    translateX: number,
    headerHeight: number,
    selectedColumns: CompactSelection,
    dragAndDropState: DragAndDropState | undefined,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    outerTheme: Theme,
    spriteManager: SpriteManager,
    hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean
) {
    if (headerHeight === 0) return;
    // FIXME: This should respect the per-column theme
    ctx.fillStyle = outerTheme.bgHeader;
    ctx.fillRect(0, 0, width, headerHeight);

    const trueHeaderHeight = enableGroups ? headerHeight / 2 : headerHeight;

    const xPad = 8;
    const yPad = 2;

    let x = 0;
    let clipX = 0;
    let font = `${outerTheme.headerFontStyle} ${outerTheme.fontFamily}`;
    // Assinging the context font too much can be expensive, it can be worth it to minimze this
    ctx.font = font;
    for (const c of effectiveCols) {
        const theme = c.themeOverride === undefined ? outerTheme : { ...outerTheme, ...c.themeOverride };
        const f = `${theme.headerFontStyle} ${theme.fontFamily}`;
        if (font !== f) {
            ctx.font = f;
            font = f;
        }
        const selected = selectedColumns.hasIndex(c.sourceIndex);
        const noHover = dragAndDropState !== undefined || isResizing;
        const hoveredBoolean = !noHover && hoveredCol === c.sourceIndex;
        const hover = noHover
            ? 0
            : hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === undefined)?.hoverAmount ?? 0;

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

        const y = enableGroups ? headerHeight / 2 : 0;

        const xOffset = c.sourceIndex === 0 ? 0 : 1;
        if (selected) {
            ctx.fillStyle = bgFillStyle;
            ctx.fillRect(x + xOffset, y, c.width - xOffset, trueHeaderHeight);
        } else if (hasSelectedCell || hover > 0) {
            ctx.beginPath();
            ctx.rect(x + xOffset, y, c.width - xOffset, trueHeaderHeight);
            if (hasSelectedCell) {
                ctx.fillStyle = theme.bgHeaderHasFocus;
                ctx.fill();
            }
            if (hover > 0) {
                ctx.globalAlpha = hover;
                ctx.fillStyle = theme.bgHeaderHovered;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        ctx.beginPath();
        ctx.rect(x + xPad, yPad, c.width - xPad, headerHeight - yPad * 2);
        ctx.clip();

        let drawX = x + xPad;
        if (c.icon !== undefined) {
            let variant: SpriteVariant = selected ? "selected" : "normal";
            if (c.style === "highlight") {
                variant = selected ? "selected" : "special";
            }
            spriteManager.drawSprite(c.icon, variant, ctx, drawX, y + (trueHeaderHeight - 20) / 2, 20, theme);

            if (c.overlayIcon !== undefined) {
                spriteManager.drawSprite(
                    c.overlayIcon,
                    selected ? "selected" : "special",
                    ctx,
                    drawX + 9,
                    y + ((trueHeaderHeight - 18) / 2 + 6),
                    18,
                    theme
                );
            }

            drawX += 26;
        }

        if (hoveredBoolean && c.hasMenu === true) {
            const fadeWidth = 35;
            const fadeStart = c.width - fadeWidth;
            const fadeEnd = c.width - fadeWidth * 0.7;

            const fadeStartPercent = fadeStart / c.width;
            const fadeEndPercent = fadeEnd / c.width;

            const grad = ctx.createLinearGradient(x, 0, x + c.width, 0);
            const [r, g, b] = parseToRgba(fillStyle);

            grad.addColorStop(0, fillStyle);
            grad.addColorStop(fadeStartPercent, fillStyle);
            grad.addColorStop(fadeEndPercent, `rgba(${r}, ${g}, ${b}, 0)`);
            grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = grad;
        } else {
            ctx.fillStyle = fillStyle;
        }
        ctx.fillText(c.title, drawX, y + (trueHeaderHeight / 2 + 5));

        if (hoveredBoolean && c.hasMenu === true) {
            ctx.beginPath();
            const triangleX = x + c.width - 20;
            const triangleY = y + (trueHeaderHeight / 2 - 3);
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

    if (enableGroups) {
        drawGroups(ctx, effectiveCols, width, height, translateX, headerHeight, outerTheme, verticalBorder);
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

    const stickyRowHeight = lastRowSticky ? getRowHeight(rows - 1) : 0;

    ctx.beginPath();

    walkColumns(
        effectiveColumns,
        cellYOffset,
        translateX,
        translateY,
        headerHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            const diff = Math.max(0, clipX - drawX);
            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh, isSticky) => {
                const isDamaged = damage.some(d => d[0] === c.sourceIndex && d[1] === row);
                if (isDamaged) {
                    const top = drawY + 1;
                    // const isSticky = lastRowSticky && row === rows - 1;
                    const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - stickyRowHeight);
                    const x = drawX + diff + 1;
                    const y = top;
                    const w = c.width - diff - 1;
                    const h = bottom - top;

                    if (h > 0) {
                        ctx.rect(x, y, w, h);
                    }
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
    imageLoader: ImageWindowLoader,
    hoverValues: HoverValues,
    hoverInfo: HoverInfo | undefined,
    outerTheme: Theme
): void {
    let toDraw = damage?.length ?? Number.MAX_SAFE_INTEGER;
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
            ctx.rect(drawX + diff, headerHeight + 1, c.width - diff, height - headerHeight - 1);
            ctx.clip();

            const theme = c.themeOverride === undefined ? outerTheme : { ...outerTheme, ...c.themeOverride };
            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh, isSticky) => {
                if (damage !== undefined && !damage.some(d => d[0] === c.sourceIndex && d[1] === row)) {
                    return;
                }
                if (
                    drawRegions.length > 0 &&
                    !drawRegions.some(dr => intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height))
                ) {
                    return;
                }

                const rowSelected = selectedRows.hasIndex(row);
                const rowDisabled = disabledRows.hasIndex(row);

                ctx.beginPath();

                const isFocused = selectedCell?.cell[0] === c.sourceIndex && selectedCell?.cell[1] === row;
                let highlighted = isFocused || (!isSticky && (rowSelected || selectedColumns.hasIndex(c.sourceIndex)));

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

                if (isSticky) {
                    ctx.fillStyle = theme.bgCell;
                    if (drawX === 0) {
                        ctx.fillRect(drawX, drawY, c.width, rh);
                    } else {
                        ctx.fillRect(drawX, drawY, c.width, rh);
                    }
                }

                if (highlighted || rowDisabled) {
                    if (rowDisabled) {
                        ctx.fillStyle = theme.bgHeader;
                        if (drawX === 0) {
                            ctx.fillRect(drawX, drawY, c.width, rh);
                        } else {
                            ctx.fillRect(drawX, drawY, c.width, rh);
                        }
                    }
                    if (highlighted) {
                        ctx.fillStyle = theme.accentLight;
                        if (drawX === 0) {
                            ctx.fillRect(drawX, drawY, c.width, rh);
                        } else {
                            ctx.fillRect(drawX, drawY, c.width, rh);
                        }
                    }
                } else {
                    if (prelightCells?.find(pre => pre[0] === c.sourceIndex && pre[1] === row) !== undefined) {
                        ctx.fillStyle = theme.bgSearchResult;
                        if (drawX === 0) {
                            ctx.fillRect(drawX, drawY, c.width, rh);
                        } else {
                            ctx.fillRect(drawX, drawY, c.width, rh);
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
                    hoverValue?.hoverAmount ?? 0,
                    hoverInfo
                );

                ctx.globalAlpha = 1;
                toDraw--;
                return toDraw <= 0;
            });

            ctx.restore();
            return toDraw <= 0;
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
                    ctx.fillRect(drawX, drawY, 10000, rh);
                }
                if (rowSelected) {
                    ctx.fillStyle = theme.accentLight;
                    ctx.fillRect(drawX, drawY, 10000, rh);
                }
            });

            ctx.restore();
        }
    );
}

function overdrawStickyBoundaries(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    height: number,
    headerHeight: number,
    lastRowSticky: boolean,
    rows: number,
    getRowHeight: (row: number) => number,
    theme: Theme
) {
    let drawX = 0;
    for (const c of effectiveCols) {
        if (c.sticky) {
            drawX += c.width;
        } else {
            break;
        }
    }

    ctx.beginPath();
    ctx.moveTo(0, headerHeight + 0.5);
    ctx.lineTo(width, headerHeight + 0.5);

    ctx.strokeStyle = theme.bgHeader;
    ctx.stroke();

    ctx.strokeStyle = theme.borderColor;
    ctx.stroke();

    ctx.beginPath();

    if (drawX !== 0) {
        ctx.moveTo(drawX + 0.5, 0);
        ctx.lineTo(drawX + 0.5, height);
    }

    if (lastRowSticky) {
        const h = getRowHeight(rows - 1);
        ctx.moveTo(0, height - h + 0.5);
        ctx.lineTo(width, height - h + 0.5);
    }

    ctx.strokeStyle = theme.bgCell;
    ctx.stroke();

    ctx.strokeStyle = theme.borderColor;
    ctx.stroke();
}

function drawFocusRing(
    ctx: CanvasRenderingContext2D,
    width: number,
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

    const isStickyRow = lastRowSticky && targetRow === rows - 1;
    const stickRowHeight = lastRowSticky && !isStickyRow ? getRowHeight(rows - 1) - 1 : 0;

    ctx.beginPath();
    ctx.rect(0, headerHeight, width, height - headerHeight - stickRowHeight);
    ctx.clip();

    walkColumns(
        effectiveCols,
        cellYOffset,
        translateX,
        translateY,
        headerHeight,
        (col, drawX, colDrawY, clipX, startRow) => {
            if (col.sourceIndex !== targetCol) {
                return;
            }

            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, lastRowSticky, (drawY, row, rh) => {
                if (row !== targetRow) return;

                ctx.save();
                if (clipX > drawX) {
                    const diff = Math.max(0, clipX - drawX);
                    ctx.beginPath();
                    ctx.rect(drawX + diff, drawY, col.width - diff + 1, rh + 1);
                    ctx.clip();
                }
                ctx.beginPath();
                ctx.rect(drawX + 0.5, drawY + 0.5, col.width, rh);
                ctx.strokeStyle = col.themeOverride?.accentColor ?? theme.accentColor;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            });
        }
    );
}

export function drawGrid(
    canvas: HTMLCanvasElement,
    buffers: Buffers,
    width: number,
    height: number,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    columns: readonly GridColumn[],
    mappedColumns: readonly MappedGridColumn[],
    enableGroups: boolean,
    freezeColumns: number,
    dragAndDropState: DragAndDropState | undefined,
    theme: Theme,
    headerHeight: number,
    selectedRows: CompactSelection,
    disabledRows: CompactSelection,
    rowHeight: number | ((index: number) => number),
    verticalBorder: (col: number) => boolean,
    selectedColumns: CompactSelection,
    hoveredCol: number | undefined,
    isResizing: boolean,
    selectedCell: GridSelection | undefined,
    lastRowSticky: boolean,
    rows: number,
    getCellContent: (cell: readonly [number, number]) => InnerGridCell,
    drawCustomCell: DrawCustomCellCallback | undefined,
    prelightCells: CellList | undefined,
    imageLoader: ImageWindowLoader,
    lastBlitData: React.MutableRefObject<BlitData>,
    canBlit: boolean | undefined,
    damage: CellList | undefined,
    hoverValues: HoverValues,
    hoverInfo: HoverInfo | undefined,
    spriteManager: SpriteManager,
    scrolling: boolean
) {
    if (width === 0 || height === 0) return;
    const dpr = scrolling ? 1 : Math.ceil(window.devicePixelRatio ?? 1);

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
    }

    const overlayCanvas = buffers.overlay;

    if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== headerHeight * dpr) {
        overlayCanvas.width = width * dpr;
        overlayCanvas.height = headerHeight * dpr;
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

    const targetCtx = canvas.getContext("2d", {
        alpha: false,
    });
    const overlayCtx = overlayCanvas.getContext("2d", {
        alpha: false,
    });
    if (overlayCtx === null || targetCtx === null) return;

    const getRowHeight = (r: number) => (typeof rowHeight === "number" ? rowHeight : rowHeight(r));

    overlayCtx.save();
    overlayCtx.beginPath();
    targetCtx.save();
    targetCtx.beginPath(); // clear any path in the ctx

    targetCtx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    overlayCtx.font = `${theme.baseFontStyle} ${theme.fontFamily}`;
    if (dpr !== 1) {
        overlayCtx.scale(dpr, dpr);
        targetCtx.scale(dpr, dpr);
    }

    const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);

    let drawRegions: Rectangle[] = [];

    const drawHeaderTexture = () => {
        drawGridHeaders(
            overlayCtx,
            effectiveCols,
            enableGroups,
            hoveredCol,
            width,
            height,
            translateX,
            headerHeight,
            selectedColumns,
            dragAndDropState,
            isResizing,
            selectedCell,
            theme,
            spriteManager,
            hoverValues,
            verticalBorder
        );

        if (enableGroups) {
            overlayCtx.save();
            overlayCtx.rect(0, headerHeight / 2, width, headerHeight / 2);
            overlayCtx.clip();
        }
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
            verticalBorder,
            lastRowSticky,
            rows,
            theme,
            true
        );

        if (enableGroups) {
            overlayCtx.restore();
        }
    };

    // handle damage updates by directly drawing to the target to avoid large blits
    if (damage !== undefined) {
        damage = damage.filter(
            x =>
                x[1] === undefined ||
                intersectRect(cellXOffset, cellYOffset, effectiveCols.length, 300, x[0], x[1], 1, 1) ||
                intersectRect(0, cellYOffset, freezeColumns, 300, x[0], x[1], 1, 1)
        );

        if (damage.length > 0) {
            clipDamage(
                targetCtx,
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

            targetCtx.fillStyle = theme.bgCell;
            targetCtx.fillRect(0, headerHeight + 1, width, height - headerHeight - 1);

            drawCells(
                targetCtx,
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
                hoverInfo,
                theme
            );
        }

        const doHeaders = damage.some(d => d[1] === undefined);

        if (doHeaders) {
            drawHeaderTexture();
        }
        targetCtx.restore();
        overlayCtx.restore();

        if (doHeaders) {
            targetCtx.imageSmoothingEnabled = false;
            targetCtx.drawImage(overlayCanvas, 0, 0);
            targetCtx.imageSmoothingEnabled = false;
        }
        return;
    }

    if (canBlit === true) {
        const { regions } = blitLastFrame(
            targetCtx,
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
    }

    overdrawStickyBoundaries(
        targetCtx,
        effectiveCols,
        width,
        height,
        headerHeight,
        lastRowSticky,
        rows,
        getRowHeight,
        theme
    );

    if (selectedCell !== undefined && selectedCell.cell[0] === freezeColumns - 1) {
        // the overdraw may have nuked out our focus ring right edge.
        drawFocusRing(
            targetCtx,
            width,
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
    }

    if (drawRegions.length > 0) {
        targetCtx.beginPath();
        for (const r of drawRegions) {
            targetCtx.rect(r.x, r.y, r.width, r.height);
        }
        targetCtx.clip();
        targetCtx.beginPath();
    }

    targetCtx.fillStyle = theme.bgCell;
    targetCtx.fillRect(0, headerHeight, width, height - headerHeight);

    drawCells(
        targetCtx,
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
        hoverInfo,
        theme
    );

    drawBlanks(
        targetCtx,
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

    drawGridLines(
        targetCtx,
        effectiveCols,
        cellYOffset,
        translateX,
        translateY,
        width,
        height,
        headerHeight,
        getRowHeight,
        verticalBorder,
        lastRowSticky,
        rows,
        theme
    );

    drawFocusRing(
        targetCtx,
        width,
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

    if (!canBlit || cellXOffset !== last.cellXOffset || translateX !== last.translateX) {
        drawHeaderTexture();
    }

    imageLoader?.setWindow({
        x: cellXOffset,
        y: cellYOffset,
        width: effectiveCols.length,
        height: 100, // FIXME: row - cellYOffset,
    });

    lastBlitData.current = { cellXOffset, cellYOffset, translateX, translateY };

    // remove scale for blit
    targetCtx.restore();
    overlayCtx.restore();

    if (headerHeight > 0) {
        targetCtx.imageSmoothingEnabled = false;
        targetCtx.drawImage(overlayCanvas, 0, 0);
        targetCtx.imageSmoothingEnabled = true;
    }
}

type WalkRowsCallback = (drawY: number, row: number, rowHeight: number, isSticky: boolean) => boolean | void;

function walkRowsInCol(
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
            if (cb(y, row, rh, doingSticky) === true) {
                break;
            }
        }

        if (doingSticky) {
            break;
        }
        y += rh;
        row++;
    }
}

type WalkColsCallback = (
    col: MappedGridColumn,
    drawX: number,
    drawY: number,
    clipX: number,
    startRow: number
) => boolean | void;

function walkColumns(
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

        if (cb(c, drawX, drawY, clipX, cellYOffset) === true) {
            break;
        }

        x += c.width;
        clipX += c.sticky ? c.width : 0;
    }
}

interface Buffers {
    // backbuffer: HTMLCanvasElement;
    overlay: HTMLCanvasElement;
}

export function makeBuffers(): Buffers {
    return {
        // backbuffer: document.createElement("canvas"),
        overlay: document.createElement("canvas"),
    };
}
