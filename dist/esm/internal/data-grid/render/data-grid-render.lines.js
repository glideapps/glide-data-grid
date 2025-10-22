/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/no-for-loop */
import { CompactSelection } from "../data-grid-types.js";
import { CellSet } from "../cell-set.js";
import groupBy from "lodash/groupBy.js";
import { getStickyWidth, getFreezeTrailingHeight } from "./data-grid-lib.js";
import { mergeAndRealizeTheme } from "../../../common/styles.js";
import { blendCache } from "../color-parser.js";
import { intersectRect } from "../../../common/math.js";
import { getSkipPoint, walkColumns, walkRowsInCol } from "./data-grid-render.walk.js";
import {} from "./data-grid-render.cells.js";
export function drawBlanks(ctx, effectiveColumns, allColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowTheme, selectedRows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme) {
    if (damage !== undefined ||
        effectiveColumns[effectiveColumns.length - 1] !== allColumns[effectiveColumns.length - 1])
        return;
    const skipPoint = getSkipPoint(drawRegions);
    walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawY, clipX, startRow) => {
        if (c !== effectiveColumns[effectiveColumns.length - 1])
            return;
        drawX += c.width;
        const x = Math.max(drawX, clipX);
        if (x > width)
            return;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, totalHeaderHeight + 1, 10_000, height - totalHeaderHeight - 1);
        ctx.clip();
        walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky) => {
            if (!isSticky &&
                drawRegions.length > 0 &&
                !drawRegions.some(dr => intersectRect(drawX, drawY, 10_000, rh, dr.x, dr.y, dr.width, dr.height))) {
                return;
            }
            const rowSelected = selectedRows.hasIndex(row);
            const rowDisabled = disabledRows.hasIndex(row);
            ctx.beginPath();
            const rowTheme = getRowTheme?.(row);
            const blankTheme = rowTheme === undefined ? theme : mergeAndRealizeTheme(theme, rowTheme);
            if (blankTheme.bgCell !== theme.bgCell) {
                ctx.fillStyle = blankTheme.bgCell;
                ctx.fillRect(drawX, drawY, 10_000, rh);
            }
            if (rowDisabled) {
                ctx.fillStyle = blankTheme.bgHeader;
                ctx.fillRect(drawX, drawY, 10_000, rh);
            }
            if (rowSelected) {
                ctx.fillStyle = blankTheme.accentLight;
                ctx.fillRect(drawX, drawY, 10_000, rh);
            }
        });
        ctx.restore();
    });
}
export function overdrawStickyBoundaries(ctx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme) {
    let drawFreezeBorder = false;
    for (const c of effectiveCols) {
        if (c.sticky)
            continue;
        drawFreezeBorder = verticalBorder(c.sourceIndex);
        break;
    }
    const hColor = theme.horizontalBorderColor ?? theme.borderColor;
    const vColor = theme.borderColor;
    const drawX = drawFreezeBorder ? getStickyWidth(effectiveCols) : 0;
    let vStroke;
    if (drawX !== 0) {
        vStroke = blendCache(vColor, theme.bgCell);
        ctx.beginPath();
        ctx.moveTo(drawX + 0.5, 0);
        ctx.lineTo(drawX + 0.5, height);
        ctx.strokeStyle = vStroke;
        ctx.stroke();
    }
    if (freezeTrailingRows > 0) {
        const hStroke = vColor === hColor && vStroke !== undefined ? vStroke : blendCache(hColor, theme.bgCell);
        const h = getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight);
        ctx.beginPath();
        ctx.moveTo(0, height - h + 0.5);
        ctx.lineTo(width, height - h + 0.5);
        ctx.strokeStyle = hStroke;
        ctx.stroke();
    }
}
const getMinMaxXY = (drawRegions, width, height) => {
    let minX = 0;
    let maxX = width;
    let minY = 0;
    let maxY = height;
    if (drawRegions !== undefined && drawRegions.length > 0) {
        minX = Number.MAX_SAFE_INTEGER;
        minY = Number.MAX_SAFE_INTEGER;
        maxX = Number.MIN_SAFE_INTEGER;
        maxY = Number.MIN_SAFE_INTEGER;
        for (const r of drawRegions) {
            minX = Math.min(minX, r.x - 1);
            maxX = Math.max(maxX, r.x + r.width + 1);
            minY = Math.min(minY, r.y - 1);
            maxY = Math.max(maxY, r.y + r.height + 1);
        }
    }
    return { minX, maxX, minY, maxY };
};
export function drawExtraRowThemes(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme) {
    const bgCell = theme.bgCell;
    const { minX, maxX, minY, maxY } = getMinMaxXY(drawRegions, width, height);
    const toDraw = [];
    const freezeY = height - getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight);
    // row overflow
    let y = totalHeaderHeight;
    let row = cellYOffset;
    let extraRowsStartY = 0;
    while (y + translateY < freezeY) {
        const ty = y + translateY;
        const rh = getRowHeight(row);
        if (ty >= minY && ty <= maxY - 1) {
            const rowTheme = getRowThemeOverride?.(row);
            const rowThemeBgCell = rowTheme?.bgCell;
            const needDraw = rowThemeBgCell !== undefined && rowThemeBgCell !== bgCell && row >= rows - freezeTrailingRows;
            if (needDraw) {
                toDraw.push({
                    x: minX,
                    y: ty,
                    w: maxX - minX,
                    h: rh,
                    color: rowThemeBgCell,
                });
            }
        }
        y += rh;
        if (row < rows - freezeTrailingRows)
            extraRowsStartY = y;
        row++;
    }
    // column overflow
    let x = 0;
    const h = Math.min(freezeY, maxY) - extraRowsStartY;
    if (h > 0) {
        for (let index = 0; index < effectiveCols.length; index++) {
            const c = effectiveCols[index];
            if (c.width === 0)
                continue;
            const tx = c.sticky ? x : x + translateX;
            const colThemeBgCell = c.themeOverride?.bgCell;
            if (colThemeBgCell !== undefined &&
                colThemeBgCell !== bgCell &&
                tx >= minX &&
                tx <= maxX &&
                verticalBorder(index + 1)) {
                toDraw.push({
                    x: tx,
                    y: extraRowsStartY,
                    w: c.width,
                    h,
                    color: colThemeBgCell,
                });
            }
            x += c.width;
        }
    }
    if (toDraw.length === 0)
        return;
    let color;
    ctx.beginPath();
    // render in reverse order because we computed and added the columns last, but they should actually be lower
    // priority than the rows.
    for (let i = toDraw.length - 1; i >= 0; i--) {
        const r = toDraw[i];
        if (color === undefined) {
            color = r.color;
        }
        else if (r.color !== color) {
            ctx.fillStyle = color;
            ctx.fill();
            ctx.beginPath();
            color = r.color;
        }
        ctx.rect(r.x, r.y, r.w, r.h);
    }
    if (color !== undefined) {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.beginPath();
}
// lines are effectively drawn on the top left edge of a cell.
export function drawGridLines(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme, verticalOnly = false) {
    if (spans !== undefined) {
        ctx.beginPath();
        ctx.save();
        ctx.rect(0, 0, width, height);
        for (const span of spans) {
            ctx.rect(span.x + 1, span.y + 1, span.width - 1, span.height - 1);
        }
        ctx.clip("evenodd");
    }
    const hColor = theme.horizontalBorderColor ?? theme.borderColor;
    const vColor = theme.borderColor;
    const { minX, maxX, minY, maxY } = getMinMaxXY(drawRegions, width, height);
    const toDraw = [];
    ctx.beginPath();
    // vertical lines
    let x = 0.5;
    for (let index = 0; index < effectiveCols.length; index++) {
        const c = effectiveCols[index];
        if (c.width === 0)
            continue;
        x += c.width;
        const tx = c.sticky ? x : x + translateX;
        if (tx >= minX && tx <= maxX && verticalBorder(index + 1)) {
            toDraw.push({
                x1: tx,
                y1: Math.max(groupHeaderHeight, minY),
                x2: tx,
                y2: Math.min(height, maxY),
                color: vColor,
            });
        }
    }
    let freezeY = height + 0.5;
    for (let i = rows - freezeTrailingRows; i < rows; i++) {
        const rh = getRowHeight(i);
        freezeY -= rh;
        toDraw.push({ x1: minX, y1: freezeY, x2: maxX, y2: freezeY, color: hColor });
    }
    if (verticalOnly !== true) {
        // horizontal lines
        let y = totalHeaderHeight + 0.5;
        let row = cellYOffset;
        const target = freezeY;
        while (y + translateY < target) {
            const ty = y + translateY;
            if (ty >= minY && ty <= maxY - 1) {
                const rowTheme = getRowThemeOverride?.(row);
                toDraw.push({
                    x1: minX,
                    y1: ty,
                    x2: maxX,
                    y2: ty,
                    color: rowTheme?.horizontalBorderColor ?? rowTheme?.borderColor ?? hColor,
                });
            }
            y += getRowHeight(row);
            row++;
        }
    }
    const groups = groupBy(toDraw, line => line.color);
    for (const g of Object.keys(groups)) {
        ctx.strokeStyle = g;
        for (const line of groups[g]) {
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
        }
        ctx.stroke();
        ctx.beginPath();
    }
    if (spans !== undefined) {
        ctx.restore();
    }
}
//# sourceMappingURL=data-grid-render.lines.js.map