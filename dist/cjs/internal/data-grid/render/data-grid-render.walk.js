import { isGroupEqual } from "./data-grid-lib.js";
export function getSkipPoint(drawRegions) {
    if (drawRegions.length === 0)
        return undefined;
    let drawRegionsLowestY;
    for (const dr of drawRegions) {
        drawRegionsLowestY = Math.min(drawRegionsLowestY ?? dr.y, dr.y);
    }
    return drawRegionsLowestY;
}
export function walkRowsInCol(startRow, drawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipToY, cb) {
    skipToY = skipToY ?? drawY;
    let y = drawY;
    let row = startRow;
    const rowEnd = rows - freezeTrailingRows;
    let didBreak = false;
    while (y < height && row < rowEnd) {
        const rh = getRowHeight(row);
        if (y + rh > skipToY && cb(y, row, rh, false, hasAppendRow && row === rows - 1) === true) {
            didBreak = true;
            break;
        }
        y += rh;
        row++;
    }
    if (didBreak)
        return;
    y = height;
    for (let fr = 0; fr < freezeTrailingRows; fr++) {
        row = rows - 1 - fr;
        const rh = getRowHeight(row);
        y -= rh;
        cb(y, row, rh, true, hasAppendRow && row === rows - 1);
    }
}
export function walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, cb) {
    let x = 0;
    let clipX = 0; // this tracks the total width of sticky cols
    const drawY = totalHeaderHeight + translateY;
    for (const c of effectiveCols) {
        const drawX = c.sticky ? clipX : x + translateX;
        if (cb(c, drawX, drawY, c.sticky ? 0 : clipX, cellYOffset) === true) {
            break;
        }
        x += c.width;
        clipX += c.sticky ? c.width : 0;
    }
}
export function walkGroups(effectiveCols, width, translateX, groupHeaderHeight, cb) {
    let x = 0;
    let clipX = 0;
    for (let index = 0; index < effectiveCols.length; index++) {
        const startCol = effectiveCols[index];
        let end = index + 1;
        let boxWidth = startCol.width;
        if (startCol.sticky) {
            clipX += boxWidth;
        }
        while (end < effectiveCols.length &&
            isGroupEqual(effectiveCols[end].group, startCol.group) &&
            effectiveCols[end].sticky === effectiveCols[index].sticky) {
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
        const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
        const w = Math.min(boxWidth - delta, width - (localX + delta));
        cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], startCol.group ?? "", localX + delta, 0, w, groupHeaderHeight);
        x += boxWidth;
    }
}
export function getSpanBounds(span, cellX, cellY, cellW, cellH, column, allColumns) {
    const [startCol, endCol] = span;
    let frozenRect;
    let contentRect;
    const firstNonSticky = allColumns.find(x => !x.sticky)?.sourceIndex ?? 0;
    if (endCol > firstNonSticky) {
        const renderFromCol = Math.max(startCol, firstNonSticky);
        let tempX = cellX;
        let tempW = cellW;
        for (let x = column.sourceIndex - 1; x >= renderFromCol; x--) {
            tempX -= allColumns[x].width;
            tempW += allColumns[x].width;
        }
        for (let x = column.sourceIndex + 1; x <= endCol; x++) {
            tempW += allColumns[x].width;
        }
        contentRect = {
            x: tempX,
            y: cellY,
            width: tempW,
            height: cellH,
        };
    }
    if (firstNonSticky > startCol) {
        const renderToCol = Math.min(endCol, firstNonSticky - 1);
        let tempX = cellX;
        let tempW = cellW;
        for (let x = column.sourceIndex - 1; x >= startCol; x--) {
            tempX -= allColumns[x].width;
            tempW += allColumns[x].width;
        }
        for (let x = column.sourceIndex + 1; x <= renderToCol; x++) {
            tempW += allColumns[x].width;
        }
        frozenRect = {
            x: tempX,
            y: cellY,
            width: tempW,
            height: cellH,
        };
    }
    return [frozenRect, contentRect];
}
//# sourceMappingURL=data-grid-render.walk.js.map