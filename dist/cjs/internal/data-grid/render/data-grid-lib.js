import { direction } from "../../../common/utils.js";
import React from "react";
import { split as splitText, clearCache } from "canvas-hypertxt";
export function useMappedColumns(columns, freezeColumns) {
    return React.useMemo(() => columns.map((c, i) => ({
        group: c.group,
        grow: c.grow,
        hasMenu: c.hasMenu,
        icon: c.icon,
        id: c.id,
        menuIcon: c.menuIcon,
        overlayIcon: c.overlayIcon,
        sourceIndex: i,
        sticky: i < freezeColumns,
        indicatorIcon: c.indicatorIcon,
        style: c.style,
        themeOverride: c.themeOverride,
        contentAlign: c.contentAlign,
        title: c.title,
        trailingRowOptions: c.trailingRowOptions,
        width: c.width,
        growOffset: c.growOffset,
        rowMarker: c.rowMarker,
        rowMarkerChecked: c.rowMarkerChecked,
        headerRowMarkerTheme: c.headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible: c.headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled: c.headerRowMarkerDisabled,
    })), [columns, freezeColumns]);
}
export function gridSelectionHasItem(sel, item) {
    const [col, row] = item;
    if (sel.columns.hasIndex(col) || sel.rows.hasIndex(row))
        return true;
    if (sel.current !== undefined) {
        if (itemsAreEqual(sel.current.cell, item))
            return true;
        const toCheck = [sel.current.range, ...sel.current.rangeStack]; // FIXME: pointless alloc
        for (const r of toCheck) {
            // dont we have a function for this?
            if (col >= r.x && col < r.x + r.width && row >= r.y && row < r.y + r.height)
                return true;
        }
    }
    return false;
}
export function isGroupEqual(left, right) {
    return (left ?? "") === (right ?? "");
}
export function cellIsSelected(location, cell, selection) {
    if (selection.current === undefined)
        return false;
    if (location[1] !== selection.current.cell[1])
        return false;
    if (cell.span === undefined) {
        return selection.current.cell[0] === location[0];
    }
    return selection.current.cell[0] >= cell.span[0] && selection.current.cell[0] <= cell.span[1];
}
export function itemIsInRect(location, rect) {
    const [x, y] = location;
    return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}
export function itemsAreEqual(a, b) {
    return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}
export function rectBottomRight(rect) {
    return [rect.x + rect.width - 1, rect.y + rect.height - 1];
}
function cellIsInRect(location, cell, rect) {
    const startX = rect.x;
    const endX = rect.x + rect.width - 1;
    const startY = rect.y;
    const endY = rect.y + rect.height - 1;
    const [cellCol, cellRow] = location;
    if (cellRow < startY || cellRow > endY)
        return false;
    if (cell.span === undefined) {
        return cellCol >= startX && cellCol <= endX;
    }
    const [spanStart, spanEnd] = cell.span;
    return ((spanStart >= startX && spanStart <= endX) ||
        (spanEnd >= startX && spanStart <= endX) ||
        (spanStart < startX && spanEnd > endX));
}
export function cellIsInRange(location, cell, selection, includeSingleSelection) {
    let result = 0;
    if (selection.current === undefined)
        return result;
    const range = selection.current.range;
    if ((includeSingleSelection || range.height * range.width > 1) && cellIsInRect(location, cell, range)) {
        result++;
    }
    for (const r of selection.current.rangeStack) {
        if (cellIsInRect(location, cell, r)) {
            result++;
        }
    }
    return result;
}
export function remapForDnDState(columns, dndState) {
    let mappedCols = columns;
    if (dndState !== undefined) {
        let writable = [...columns];
        const temp = mappedCols[dndState.src];
        if (dndState.src > dndState.dest) {
            writable.splice(dndState.src, 1);
            writable.splice(dndState.dest, 0, temp);
        }
        else {
            writable.splice(dndState.dest + 1, 0, temp);
            writable.splice(dndState.src, 1);
        }
        writable = writable.map((c, i) => ({
            ...c,
            sticky: columns[i].sticky,
        }));
        mappedCols = writable;
    }
    return mappedCols;
}
export function getStickyWidth(columns, dndState) {
    let result = 0;
    const remapped = remapForDnDState(columns, dndState);
    for (let i = 0; i < remapped.length; i++) {
        const c = remapped[i];
        if (c.sticky)
            result += c.width;
        else
            break;
    }
    return result;
}
export function getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) {
    if (typeof getRowHeight === "number") {
        return freezeTrailingRows * getRowHeight;
    }
    else {
        let result = 0;
        for (let i = rows - freezeTrailingRows; i < rows; i++) {
            result += getRowHeight(i);
        }
        return result;
    }
}
export function getEffectiveColumns(columns, cellXOffset, width, dndState, tx) {
    const mappedCols = remapForDnDState(columns, dndState);
    const sticky = [];
    for (const c of mappedCols) {
        if (c.sticky) {
            sticky.push(c);
        }
        else {
            break;
        }
    }
    if (sticky.length > 0) {
        for (const c of sticky) {
            width -= c.width;
        }
    }
    let endIndex = cellXOffset;
    let curX = tx ?? 0;
    while (curX <= width && endIndex < mappedCols.length) {
        curX += mappedCols[endIndex].width;
        endIndex++;
    }
    for (let i = cellXOffset; i < endIndex; i++) {
        const c = mappedCols[i];
        if (!c.sticky) {
            sticky.push(c);
        }
    }
    return sticky;
}
export function getColumnIndexForX(targetX, effectiveColumns, translateX) {
    let x = 0;
    for (const c of effectiveColumns) {
        const cx = c.sticky ? x : x + (translateX ?? 0);
        if (targetX <= cx + c.width) {
            return c.sourceIndex;
        }
        x += c.width;
    }
    return -1;
}
export function getRowIndexForY(targetY, height, hasGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows) {
    const totalHeaderHeight = headerHeight + groupHeaderHeight;
    if (hasGroups && targetY <= groupHeaderHeight)
        return -2;
    if (targetY <= totalHeaderHeight)
        return -1;
    let y = height;
    for (let fr = 0; fr < freezeTrailingRows; fr++) {
        const row = rows - 1 - fr;
        const rh = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
        y -= rh;
        if (targetY >= y) {
            return row;
        }
    }
    const effectiveRows = rows - freezeTrailingRows;
    const ty = targetY - (translateY ?? 0);
    if (typeof rowHeight === "number") {
        const target = Math.floor((ty - totalHeaderHeight) / rowHeight) + cellYOffset;
        if (target >= effectiveRows)
            return undefined;
        return target;
    }
    else {
        let curY = totalHeaderHeight;
        for (let i = cellYOffset; i < effectiveRows; i++) {
            const rh = rowHeight(i);
            if (ty <= curY + rh)
                return i;
            curY += rh;
        }
        return undefined;
    }
}
let metricsSize = 0;
let metricsCache = {};
const isSSR = typeof window === "undefined";
// Single reusable element for accurate text measurement (when safe to use)
let measurementElement = null;
let domMeasurementAvailable = false;
// Safari detection for measureText bug workaround
const isSafari = !isSSR && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
function initializeDOMMeasurement() {
    if (isSSR || domMeasurementAvailable)
        return;
    if (typeof document === "undefined")
        return;
    try {
        measurementElement = document.createElement("span");
        measurementElement.style.visibility = "hidden";
        measurementElement.style.position = "absolute";
        measurementElement.style.top = "-9999px";
        measurementElement.style.left = "-9999px";
        measurementElement.style.whiteSpace = "nowrap";
        measurementElement.style.padding = "0";
        measurementElement.style.margin = "0";
        measurementElement.style.border = "none";
        document.body.append(measurementElement);
        domMeasurementAvailable = true;
    }
    catch {
        // DOM measurement not available in this environment
        domMeasurementAvailable = false;
        measurementElement = null;
    }
}
async function clearCacheOnLoad() {
    if (isSSR || document?.fonts?.ready === undefined)
        return;
    await document.fonts.ready;
    metricsSize = 0;
    metricsCache = {};
    clearCache();
    // Try to initialize DOM measurement after fonts are ready
    initializeDOMMeasurement();
}
void clearCacheOnLoad();
// Try to initialize DOM measurement immediately if possible
if (!isSSR) {
    // Use setTimeout to ensure DOM is ready
    setTimeout(initializeDOMMeasurement, 0);
}
function makeCacheKey(s, ctx, baseline, font) {
    return `${s}_${font ?? ctx?.font}_${baseline}`;
}
/** @category Drawing */
export function measureTextCached(s, ctx, font, baseline = "middle") {
    const key = makeCacheKey(s, ctx, baseline, font);
    let metrics = metricsCache[key];
    if (metrics === undefined) {
        // Get base measurement from canvas
        metrics = ctx.measureText(s);
        // Safari-specific workaround: Safari's measureText can be inaccurate for longer text
        if (isSafari && s.length > 5 && domMeasurementAvailable && measurementElement) {
            try {
                measurementElement.style.font = font ?? ctx.font;
                measurementElement.textContent = s;
                const domWidth = measurementElement.getBoundingClientRect().width;
                // Use the more accurate DOM measurement for Safari
                // but preserve TextMetrics prototype to maintain click detection
                if (domWidth > metrics.width) {
                    Object.defineProperty(metrics, "width", {
                        value: domWidth,
                        writable: true,
                        enumerable: true,
                        configurable: true,
                    });
                }
            }
            catch {
                // Fallback to canvas measurement if DOM approach fails
            }
        }
        metricsCache[key] = metrics;
        metricsSize++;
    }
    if (metricsSize > 10_000) {
        metricsCache = {};
        metricsSize = 0;
    }
    return metrics;
}
export function getMeasuredTextCache(s, font) {
    const key = makeCacheKey(s, undefined, "middle", font);
    return metricsCache[key];
}
/** @category Drawing */
export function getMiddleCenterBias(ctx, font) {
    if (typeof font !== "string") {
        font = font.baseFontFull;
    }
    return getMiddleCenterBiasInner(ctx, font);
}
function loadMetric(ctx, baseline) {
    const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    ctx.save();
    ctx.textBaseline = baseline;
    const result = ctx.measureText(sample);
    ctx.restore();
    return result;
}
const biasCache = [];
function getMiddleCenterBiasInner(ctx, font) {
    for (const x of biasCache) {
        if (x.key === font)
            return x.val;
    }
    const alphabeticMetrics = loadMetric(ctx, "alphabetic");
    const middleMetrics = loadMetric(ctx, "middle");
    const bias = -(middleMetrics.actualBoundingBoxDescent - alphabeticMetrics.actualBoundingBoxDescent) +
        alphabeticMetrics.actualBoundingBoxAscent / 2;
    biasCache.push({
        key: font,
        val: bias,
    });
    return bias;
}
export function drawLastUpdateUnderlay(args, lastUpdate, frameTime, lastPrep, isLastCol, isLastRow) {
    const { ctx, rect, theme } = args;
    let progress = Number.MAX_SAFE_INTEGER;
    const animTime = 500;
    if (lastUpdate !== undefined) {
        progress = frameTime - lastUpdate;
        if (progress < animTime) {
            const fade = 1 - progress / animTime;
            ctx.globalAlpha = fade;
            ctx.fillStyle = theme.bgSearchResult;
            ctx.fillRect(rect.x + 1, rect.y + 1, rect.width - (isLastCol ? 2 : 1), rect.height - (isLastRow ? 2 : 1));
            ctx.globalAlpha = 1;
            if (lastPrep !== undefined) {
                lastPrep.fillStyle = theme.bgSearchResult;
            }
        }
    }
    return progress < animTime;
}
export function prepTextCell(args, lastPrep, overrideColor) {
    const { ctx, theme } = args;
    const result = lastPrep ?? {};
    const newFill = overrideColor ?? theme.textDark;
    if (newFill !== result.fillStyle) {
        ctx.fillStyle = newFill;
        result.fillStyle = newFill;
    }
    return result;
}
/** @category Drawing */
export function drawTextCellExternal(args, data, contentAlign, allowWrapping, hyperWrapping) {
    const { rect, ctx, theme } = args;
    ctx.fillStyle = theme.textDark;
    drawTextCell({
        ctx: ctx,
        rect,
        theme: theme,
    }, data, contentAlign, allowWrapping, hyperWrapping);
}
function drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign) {
    if (contentAlign === "right") {
        ctx.fillText(data, x + w - (theme.cellHorizontalPadding + 0.5), y + h / 2 + bias);
    }
    else if (contentAlign === "center") {
        ctx.fillText(data, x + w / 2, y + h / 2 + bias);
    }
    else {
        ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
    }
}
export function getEmHeight(ctx, fontStyle) {
    const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle); // do not question the magic string
    return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
}
function truncateString(data, w) {
    if (data.includes("\n")) {
        // new lines are rare and split is relatively expensive compared to the search
        // it pays off to not do the split contantly. More accurately... it pays off not to run the regex.
        // what even is the point of this? So what if there is a /r at the end of a line? It wont be drawn anyway.
        data = data.split(/\r?\n/, 1)[0];
    }
    const max = w / 4; // no need to round, slice will just truncate this
    if (data.length > max) {
        data = data.slice(0, max);
    }
    return data;
}
function drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping) {
    const fontStyle = theme.baseFontFull;
    const split = splitText(ctx, data, fontStyle, w - theme.cellHorizontalPadding * 2, hyperWrapping ?? false);
    const emHeight = getEmHeight(ctx, fontStyle);
    const lineHeight = theme.lineHeight * emHeight;
    const actualHeight = emHeight + lineHeight * (split.length - 1);
    const mustClip = actualHeight + theme.cellVerticalPadding > h;
    if (mustClip) {
        // well now we have to clip because we might render outside the cell vertically
        ctx.save();
        ctx.rect(x, y, w, h);
        ctx.clip();
    }
    const optimalY = y + h / 2 - actualHeight / 2;
    let drawY = Math.max(y + theme.cellVerticalPadding, optimalY);
    for (const line of split) {
        drawSingleTextLine(ctx, line, x, drawY, w, emHeight, bias, theme, contentAlign);
        drawY += lineHeight;
        if (drawY > y + h)
            break;
    }
    if (mustClip) {
        ctx.restore();
    }
}
/** @category Drawing */
export function drawTextCell(args, data, contentAlign, allowWrapping, hyperWrapping) {
    const { ctx, rect, theme } = args;
    const { x, y, width: w, height: h } = rect;
    allowWrapping = allowWrapping ?? false;
    if (!allowWrapping) {
        data = truncateString(data, w);
    }
    const bias = getMiddleCenterBias(ctx, theme);
    const isRtl = direction(data) === "rtl";
    if (contentAlign === undefined && isRtl) {
        contentAlign = "right";
    }
    if (isRtl) {
        ctx.direction = "rtl";
    }
    if (data.length > 0) {
        let changed = false;
        if (contentAlign === "right") {
            // Use right alignment as default for RTL text
            ctx.textAlign = "right";
            changed = true;
        }
        else if (contentAlign !== undefined && contentAlign !== "left") {
            // Since default is start (=left), only apply if alignment is center or right
            ctx.textAlign = contentAlign;
            changed = true;
        }
        if (!allowWrapping) {
            drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign);
        }
        else {
            drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping);
        }
        if (changed) {
            // Reset alignment to default
            ctx.textAlign = "start";
        }
        if (isRtl) {
            ctx.direction = "inherit";
        }
    }
}
export function roundedRect(ctx, x, y, width, height, radius) {
    if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    // restrict radius to a reasonable max
    radius = {
        tl: Math.max(0, Math.min(radius.tl, height / 2, width / 2)),
        tr: Math.max(0, Math.min(radius.tr, height / 2, width / 2)),
        bl: Math.max(0, Math.min(radius.bl, height / 2, width / 2)),
        br: Math.max(0, Math.min(radius.br, height / 2, width / 2)),
    };
    ctx.moveTo(x + radius.tl, y);
    ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
    ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
    ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
    ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}
export function drawMenuDots(ctx, dotsX, dotsY) {
    const radius = 1.25;
    ctx.arc(dotsX, dotsY - radius * 3.5, radius, 0, 2 * Math.PI, false);
    ctx.arc(dotsX, dotsY, radius, 0, 2 * Math.PI, false);
    ctx.arc(dotsX, dotsY + radius * 3.5, radius, 0, 2 * Math.PI, false);
}
export function roundedPoly(ctx, points, radiusAll) {
    // convert 2 points into vector form, polar form, and normalised
    const asVec = function (p, pp) {
        const vx = pp.x - p.x;
        const vy = pp.y - p.y;
        const vlen = Math.sqrt(vx * vx + vy * vy);
        const vnx = vx / vlen;
        const vny = vy / vlen;
        return {
            x: vx,
            y: pp.y - p.y,
            len: vlen,
            nx: vnx,
            ny: vny,
            ang: Math.atan2(vny, vnx),
        };
    };
    let radius;
    // const v1: Vector = {} as any;
    // const v2: Vector = {} as any;
    const len = points.length;
    let p1 = points[len - 1];
    // for each point
    for (let i = 0; i < len; i++) {
        let p2 = points[i % len];
        const p3 = points[(i + 1) % len];
        //-----------------------------------------
        // Part 1
        const v1 = asVec(p2, p1);
        const v2 = asVec(p2, p3);
        const sinA = v1.nx * v2.ny - v1.ny * v2.nx;
        const sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
        let angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);
        //-----------------------------------------
        let radDirection = 1;
        let drawDirection = false;
        if (sinA90 < 0) {
            if (angle < 0) {
                angle = Math.PI + angle;
            }
            else {
                angle = Math.PI - angle;
                radDirection = -1;
                drawDirection = true;
            }
        }
        else {
            if (angle > 0) {
                radDirection = -1;
                drawDirection = true;
            }
        }
        radius = p2.radius !== undefined ? p2.radius : radiusAll;
        //-----------------------------------------
        // Part 2
        const halfAngle = angle / 2;
        //-----------------------------------------
        //-----------------------------------------
        // Part 3
        let lenOut = Math.abs((Math.cos(halfAngle) * radius) / Math.sin(halfAngle));
        //-----------------------------------------
        //-----------------------------------------
        // Special part A
        let cRadius;
        if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
            lenOut = Math.min(v1.len / 2, v2.len / 2);
            cRadius = Math.abs((lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle));
        }
        else {
            cRadius = radius;
        }
        //-----------------------------------------
        // Part 4
        let x = p2.x + v2.nx * lenOut;
        let y = p2.y + v2.ny * lenOut;
        //-----------------------------------------
        // Part 5
        x += -v2.ny * cRadius * radDirection;
        y += v2.nx * cRadius * radDirection;
        //-----------------------------------------
        // Part 6
        ctx.arc(x, y, cRadius, v1.ang + (Math.PI / 2) * radDirection, v2.ang - (Math.PI / 2) * radDirection, drawDirection);
        //-----------------------------------------
        p1 = p2;
        p2 = p3;
    }
    ctx.closePath();
}
export function computeBounds(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight) {
    const result = {
        x: 0,
        y: totalHeaderHeight + translateY,
        width: 0,
        height: 0,
    };
    if (col >= mappedColumns.length || row >= rows || row < -2 || col < 0) {
        return result;
    }
    const headerHeight = totalHeaderHeight - groupHeaderHeight;
    if (col >= freezeColumns) {
        const dir = cellXOffset > col ? -1 : 1;
        const freezeWidth = getStickyWidth(mappedColumns);
        result.x += freezeWidth + translateX;
        for (let i = cellXOffset; i !== col; i += dir) {
            result.x += mappedColumns[dir === 1 ? i : i - 1].width * dir;
        }
    }
    else {
        for (let i = 0; i < col; i++) {
            result.x += mappedColumns[i].width;
        }
    }
    result.width = mappedColumns[col].width + 1;
    if (row === -1) {
        result.y = groupHeaderHeight;
        result.height = headerHeight;
    }
    else if (row === -2) {
        result.y = 0;
        result.height = groupHeaderHeight;
        let start = col;
        const group = mappedColumns[col].group;
        const sticky = mappedColumns[col].sticky;
        while (start > 0 &&
            isGroupEqual(mappedColumns[start - 1].group, group) &&
            mappedColumns[start - 1].sticky === sticky) {
            const c = mappedColumns[start - 1];
            result.x -= c.width;
            result.width += c.width;
            start--;
        }
        let end = col;
        while (end + 1 < mappedColumns.length &&
            isGroupEqual(mappedColumns[end + 1].group, group) &&
            mappedColumns[end + 1].sticky === sticky) {
            const c = mappedColumns[end + 1];
            result.width += c.width;
            end++;
        }
        if (!sticky) {
            const freezeWidth = getStickyWidth(mappedColumns);
            const clip = result.x - freezeWidth;
            if (clip < 0) {
                result.x -= clip;
                result.width += clip;
            }
            if (result.x + result.width > width) {
                result.width = width - result.x;
            }
        }
    }
    else if (row >= rows - freezeTrailingRows) {
        let dy = rows - row;
        result.y = height;
        while (dy > 0) {
            const r = row + dy - 1;
            result.height = typeof rowHeight === "number" ? rowHeight : rowHeight(r);
            result.y -= result.height;
            dy--;
        }
        result.height += 1;
    }
    else {
        const dir = cellYOffset > row ? -1 : 1;
        if (typeof rowHeight === "number") {
            const delta = row - cellYOffset;
            result.y += delta * rowHeight;
        }
        else {
            for (let r = cellYOffset; r !== row; r += dir) {
                result.y += rowHeight(r) * dir;
            }
        }
        result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
    }
    return result;
}
//# sourceMappingURL=data-grid-lib.js.map