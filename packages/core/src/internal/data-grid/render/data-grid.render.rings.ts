/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/no-for-loop */
import { type GridSelection, type InnerGridCell, type Item } from "../data-grid-types.js";
import { getStickyWidth, type MappedGridColumn, computeBounds, getFreezeTrailingHeight } from "./data-grid-lib.js";
import { type FullTheme } from "../../../common/styles.js";
import { blend, withAlpha } from "../color-parser.js";
import { hugRectToTarget, intersectRect, rectContains, splitRectIntoRegions } from "../../../common/math.js";
import { getSpanBounds, walkColumns, walkRowsInCol } from "./data-grid-render.walk.js";
import { type Highlight } from "./data-grid-render.cells.js";

export function drawHighlightRings(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    mappedColumns: readonly MappedGridColumn[],
    freezeColumns: number | [left: number, right: number],
    headerHeight: number,
    groupHeaderHeight: number,
    rowHeight: number | ((index: number) => number),
    freezeTrailingRows: number,
    rows: number,
    allHighlightRegions: readonly Highlight[] | undefined,
    theme: FullTheme
): (() => void) | undefined {
    const highlightRegions = allHighlightRegions?.filter(x => x.style !== "no-outline");
    const freezeLeftColumns = typeof freezeColumns === "number" ? freezeColumns : freezeColumns[0];
    const freezeRightColumns = typeof freezeColumns === "number" ? 0 : freezeColumns[1];

    if (highlightRegions === undefined || highlightRegions.length === 0) return undefined;

    const [freezeLeft, freezeRight] = getStickyWidth(mappedColumns);
    const freezeBottom = getFreezeTrailingHeight(rows, freezeTrailingRows, rowHeight);
    const splitIndices = [
        freezeLeftColumns,
        0,
        mappedColumns.length - freezeRightColumns,
        rows - freezeTrailingRows,
    ] as const;
    const splitLocations = [freezeLeft, 0, width - freezeRight, height - freezeBottom] as const;

    const drawRects = highlightRegions.map(h => {
        const r = h.range;
        const style = h.style ?? "dashed";

        return splitRectIntoRegions(r, splitIndices, width, height, splitLocations).map(arg => {
            const rect = arg.rect;
            const topLeftBounds = computeBounds(
                rect.x,
                rect.y,
                width,
                height,
                groupHeaderHeight,
                headerHeight + groupHeaderHeight,
                cellXOffset,
                cellYOffset,
                translateX,
                translateY,
                rows,
                freezeColumns,
                freezeTrailingRows,
                mappedColumns,
                rowHeight
            );
            const bottomRightBounds =
                rect.width === 1 && rect.height === 1
                    ? topLeftBounds
                    : computeBounds(
                          rect.x + rect.width - 1,
                          rect.y + rect.height - 1,
                          width,
                          height,
                          groupHeaderHeight,
                          headerHeight + groupHeaderHeight,
                          cellXOffset,
                          cellYOffset,
                          translateX,
                          translateY,
                          rows,
                          freezeColumns,
                          freezeTrailingRows,
                          mappedColumns,
                          rowHeight
                      );

            if (rect.x + rect.width >= mappedColumns.length) {
                bottomRightBounds.width -= 1;
            }
            if (rect.y + rect.height >= rows) {
                bottomRightBounds.height -= 1;
            }
            return {
                color: h.color,
                style,
                clip: arg.clip,
                rect: hugRectToTarget(
                    {
                        x: topLeftBounds.x,
                        y: topLeftBounds.y,
                        width: bottomRightBounds.x + bottomRightBounds.width - topLeftBounds.x,
                        height: bottomRightBounds.y + bottomRightBounds.height - topLeftBounds.y,
                    },
                    width,
                    height,
                    8
                ),
            };
        });
    });

    const drawCb = () => {
        ctx.lineWidth = 1;

        let dashed = false;

        for (const dr of drawRects) {
            for (const s of dr) {
                if (
                    s?.rect !== undefined &&
                    intersectRect(0, 0, width, height, s.rect.x, s.rect.y, s.rect.width, s.rect.height)
                ) {
                    const wasDashed: boolean = dashed;
                    const needsClip = !rectContains(s.clip, s.rect);
                    ctx.beginPath();
                    if (needsClip) {
                        ctx.save();
                        ctx.rect(s.clip.x, s.clip.y, s.clip.width, s.clip.height);
                        ctx.clip();
                    }
                    if (s.style === "dashed" && !dashed) {
                        ctx.setLineDash([5, 3]);
                        dashed = true;
                    } else if ((s.style === "solid" || s.style === "solid-outline") && dashed) {
                        ctx.setLineDash([]);
                        dashed = false;
                    }
                    ctx.strokeStyle =
                        s.style === "solid-outline"
                            ? blend(blend(s.color, theme.borderColor), theme.bgCell)
                            : withAlpha(s.color, 1);
                    ctx.closePath();
                    ctx.strokeRect(s.rect.x + 0.5, s.rect.y + 0.5, s.rect.width - 1, s.rect.height - 1);
                    if (needsClip) {
                        ctx.restore();
                        dashed = wasDashed;
                    }
                }
            }
        }

        if (dashed) {
            ctx.setLineDash([]);
        }
    };

    drawCb();
    return drawCb;
}

export function drawColumnResizeOutline(
    ctx: CanvasRenderingContext2D,
    yOffset: number,
    xOffset: number,
    height: number,
    style: string
) {
    ctx.beginPath();
    ctx.moveTo(yOffset, xOffset);
    ctx.lineTo(yOffset, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = style;

    ctx.stroke();

    ctx.globalAlpha = 1;
}

export function drawFillHandle(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    effectiveCols: readonly MappedGridColumn[],
    allColumns: readonly MappedGridColumn[],
    theme: FullTheme,
    totalHeaderHeight: number,
    selectedCell: GridSelection,
    getRowHeight: (row: number) => number,
    getCellContent: (cell: Item) => InnerGridCell,
    freezeTrailingRows: number,
    freezeTrailingColumns: number,
    hasAppendRow: boolean,
    fillHandle: boolean,
    rows: number
): (() => void) | undefined {
    if (selectedCell.current === undefined) return undefined;

    const range = selectedCell.current.range;
    const currentItem = selectedCell.current.cell;
    const fillHandleTarget = [range.x + range.width - 1, range.y + range.height - 1];

    // if the currentItem row greater than rows and the fill handle row is greater than rows, we dont need to draw
    if (currentItem[1] >= rows && fillHandleTarget[1] >= rows) return undefined;

    const mustDraw = effectiveCols.some(c => c.sourceIndex === currentItem[0] || c.sourceIndex === fillHandleTarget[0]);
    if (!mustDraw) return undefined;
    const [targetCol, targetRow] = selectedCell.current.cell;
    const cell = getCellContent(selectedCell.current.cell);
    const targetColSpan = cell.span ?? [targetCol, targetCol];

    const isStickyRow = targetRow >= rows - freezeTrailingRows;
    const stickRowHeight =
        freezeTrailingRows > 0 && !isStickyRow
            ? getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) - 1
            : 0;

    const fillHandleRow = fillHandleTarget[1];

    let drawHandleCb: (() => void) | undefined = undefined;

    walkColumns(
        effectiveCols,
        width,
        cellYOffset,
        translateX,
        translateY,
        totalHeaderHeight,
        freezeTrailingColumns,
        (col, drawX, colDrawY, clipX, startRow) => {
            clipX;
            if (col.sticky && targetCol > col.sourceIndex) return;

            const isBeforeTarget = col.sourceIndex < targetColSpan[0];
            const isAfterTarget = col.sourceIndex > targetColSpan[1];

            const isFillHandleCol = col.sourceIndex === fillHandleTarget[0];

            if (!isFillHandleCol && (isBeforeTarget || isAfterTarget)) {
                // we dont need to do any drawing on this column but may yet need to draw
                return;
            }

            walkRowsInCol(
                startRow,
                colDrawY,
                height,
                rows,
                getRowHeight,
                freezeTrailingRows,
                hasAppendRow,
                undefined,
                (drawY, row, rh) => {
                    if (row !== targetRow && row !== fillHandleRow) return;

                    let cellX = drawX;
                    let cellWidth = col.width;

                    if (cell.span !== undefined) {
                        const areas = getSpanBounds(cell.span, drawX, drawY, col.width, rh, col, allColumns);
                        const area = col.sticky ? areas[0] : areas[1];

                        if (area !== undefined) {
                            cellX = area.x;
                            cellWidth = area.width;
                        }
                    }

                    const doHandle = row === fillHandleRow && isFillHandleCol && fillHandle;

                    if (doHandle) {
                        drawHandleCb = () => {
                            if (clipX > cellX && !col.sticky) {
                                ctx.beginPath();
                                ctx.rect(clipX, 0, width - clipX, height);
                                ctx.clip();
                            }
                            ctx.beginPath();
                            ctx.rect(cellX + cellWidth - 4, drawY + rh - 4, 4, 4);
                            ctx.fillStyle = col.themeOverride?.accentColor ?? theme.accentColor;
                            ctx.fill();
                        };
                    }
                    return drawHandleCb !== undefined;
                }
            );

            return drawHandleCb !== undefined;
        }
    );

    if (drawHandleCb === undefined) return undefined;

    const result = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, totalHeaderHeight, width, height - totalHeaderHeight - stickRowHeight);
        ctx.clip();

        drawHandleCb?.();

        ctx.restore();
    };

    result();

    return result;
}
