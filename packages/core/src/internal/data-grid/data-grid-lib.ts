/* eslint-disable unicorn/no-for-loop */
import type { Theme } from "../../common/styles.js";
import {
    type Item,
    type GridSelection,
    type InnerGridCell,
    type SizedGridColumn,
    type Rectangle,
    type BaseGridCell,
} from "./data-grid-types.js";
import { direction } from "../../common/utils.js";
import React from "react";
import type { BaseDrawArgs, PrepResult } from "../../cells/cell-types.js";
import { split as splitText, clearCache } from "canvas-hypertxt";

export interface MappedGridColumn extends SizedGridColumn {
    sourceIndex: number;
    sticky: boolean;
}

export function useMappedColumns(
    columns: readonly SizedGridColumn[],
    freezeColumns: number
): readonly MappedGridColumn[] {
    return React.useMemo(
        () =>
            columns.map((c, i) => ({
                ...c,
                sourceIndex: i,
                sticky: i < freezeColumns,
            })),
        [columns, freezeColumns]
    );
}

export function gridSelectionHasItem(sel: GridSelection, item: Item): boolean {
    const [col, row] = item;
    if (sel.columns.hasIndex(col) || sel.rows.hasIndex(row)) return true;
    if (sel.current !== undefined) {
        if (itemsAreEqual(sel.current.cell, item)) return true;
        const toCheck = [sel.current.range, ...sel.current.rangeStack];
        for (const r of toCheck) {
            if (col >= r.x && col < r.x + r.width && row >= r.y && row < r.y + r.height) return true;
        }
    }
    return false;
}

export function isGroupEqual(left: string | undefined, right: string | undefined): boolean {
    return (left ?? "") === (right ?? "");
}

export function cellIsSelected(location: Item, cell: InnerGridCell, selection: GridSelection): boolean {
    if (selection?.current === undefined) return false;

    const [col, row] = selection.current.cell;
    const [cellCol, cellRow] = location;
    if (cellRow !== row) return false;

    if (cell.span === undefined) {
        return col === cellCol;
    }

    return col >= cell.span[0] && col <= cell.span[1];
}

export function itemIsInRect(location: Item, rect: Rectangle): boolean {
    const [x, y] = location;

    return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}

export function itemsAreEqual(a: Item | undefined, b: Item | undefined): boolean {
    return a?.[0] === b?.[0] && a?.[1] === b?.[1];
}

export function rectBottomRight(rect: Rectangle): Item {
    return [rect.x + rect.width - 1, rect.y + rect.height - 1];
}

function cellIsInRect(location: Item, cell: InnerGridCell, rect: Rectangle): boolean {
    const startX = rect.x;
    const endX = rect.x + rect.width - 1;
    const startY = rect.y;
    const endY = rect.y + rect.height - 1;

    const [cellCol, cellRow] = location;
    if (cellRow < startY || cellRow > endY) return false;

    if (cell.span === undefined) {
        return cellCol >= startX && cellCol <= endX;
    }

    const [spanStart, spanEnd] = cell.span;
    return (
        (spanStart >= startX && spanStart <= endX) ||
        (spanEnd >= startX && spanStart <= endX) ||
        (spanStart < startX && spanEnd > endX)
    );
}

export function cellIsInRange(location: Item, cell: InnerGridCell, selection: GridSelection): number {
    let result = 0;
    if (selection.current === undefined) return result;

    if (cellIsInRect(location, cell, selection.current.range)) result++;
    for (const r of selection.current.rangeStack) {
        if (cellIsInRect(location, cell, r)) {
            result++;
        }
    }
    return result;
}

export function remapForDnDState(
    columns: readonly MappedGridColumn[],
    dndState?: {
        src: number;
        dest: number;
    }
) {
    let mappedCols = columns;
    if (dndState !== undefined) {
        let writable = [...columns];
        const temp = mappedCols[dndState.src];
        if (dndState.src > dndState.dest) {
            writable.splice(dndState.src, 1);
            writable.splice(dndState.dest, 0, temp);
        } else {
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

export function getStickyWidth(
    columns: readonly MappedGridColumn[],
    dndState?: {
        src: number;
        dest: number;
    }
): number {
    let result = 0;
    const remapped = remapForDnDState(columns, dndState);
    for (let i = 0; i < remapped.length; i++) {
        const c = remapped[i];
        if (c.sticky) result += c.width;
        else break;
    }

    return result;
}

export function getEffectiveColumns(
    columns: readonly MappedGridColumn[],
    cellXOffset: number,
    width: number,
    dndState?: {
        src: number;
        dest: number;
    },
    tx?: number
): readonly MappedGridColumn[] {
    const mappedCols = remapForDnDState(columns, dndState);

    const sticky: MappedGridColumn[] = [];
    for (const c of mappedCols) {
        if (c.sticky) {
            sticky.push(c);
        } else {
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

export function getColumnIndexForX(
    targetX: number,
    effectiveColumns: readonly MappedGridColumn[],
    translateX?: number
): number {
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

export function getRowIndexForY(
    targetY: number,
    height: number,
    hasGroups: boolean,
    headerHeight: number,
    groupHeaderHeight: number,
    rows: number,
    rowHeight: number | ((index: number) => number),
    cellYOffset: number,
    translateY: number,
    lastRowSticky: boolean
): number | undefined {
    const totalHeaderHeight = headerHeight + groupHeaderHeight;
    if (hasGroups && targetY <= groupHeaderHeight) return -2;
    if (targetY <= totalHeaderHeight) return -1;

    const lastRowHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(rows - 1);
    if (lastRowSticky && targetY > height - lastRowHeight) {
        return rows - 1;
    }

    const effectiveRows = rows - (lastRowSticky ? 1 : 0);

    const ty = targetY - (translateY ?? 0);
    if (typeof rowHeight === "number") {
        const target = Math.floor((ty - totalHeaderHeight) / rowHeight) + cellYOffset;
        if (target >= effectiveRows) return undefined;
        return target;
    } else {
        let curY = totalHeaderHeight;
        for (let i = cellYOffset; i < effectiveRows; i++) {
            const rh = rowHeight(i);
            if (ty <= curY + rh) return i;
            curY += rh;
        }
        return undefined;
    }
}

let metricsSize = 0;
let metricsCache: Record<string, TextMetrics | undefined> = {};
const isSSR = typeof window === "undefined";

async function clearCacheOnLoad() {
    if (isSSR || document?.fonts?.ready === undefined) return;
    await document.fonts.ready;
    metricsSize = 0;
    metricsCache = {};
    clearCache();
}

void clearCacheOnLoad();

function makeCacheKey(s: string, ctx: CanvasRenderingContext2D, baseline: "alphabetic" | "middle", font?: string) {
    return `${s}_${font ?? ctx.font}_${baseline}`;
}

/** @category Drawing */
export function measureTextCached(s: string, ctx: CanvasRenderingContext2D, font?: string): TextMetrics {
    const key = makeCacheKey(s, ctx, "middle", font);
    let metrics = metricsCache[key];
    if (metrics === undefined) {
        metrics = ctx.measureText(s);
        metricsCache[key] = metrics;
        metricsSize++;
    }

    if (metricsSize > 10_000) {
        metricsCache = {};
        metricsSize = 0;
    }

    return metrics;
}

/** @category Drawing */
export function getMiddleCenterBias(ctx: CanvasRenderingContext2D, font: string | Theme): number {
    if (typeof font !== "string") {
        font = `${font.baseFontStyle} ${font.fontFamily}`;
    }
    return getMiddleCenterBiasInner(ctx, font);
}

function loadMetric(ctx: CanvasRenderingContext2D, baseline: "alphabetic" | "middle") {
    const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    ctx.save();
    ctx.textBaseline = baseline;
    const result = ctx.measureText(sample);

    ctx.restore();

    return result;
}

const biasCache: { key: string; val: number }[] = [];

function getMiddleCenterBiasInner(ctx: CanvasRenderingContext2D, font: string): number {
    for (const x of biasCache) {
        if (x.key === font) return x.val;
    }

    const alphabeticMetrics = loadMetric(ctx, "alphabetic");
    const middleMetrics = loadMetric(ctx, "middle");

    const bias =
        -(middleMetrics.actualBoundingBoxDescent - alphabeticMetrics.actualBoundingBoxDescent) +
        alphabeticMetrics.actualBoundingBoxAscent / 2;

    biasCache.push({
        key: font,
        val: bias,
    });

    return bias;
}

/** @category Drawing */
export function drawWithLastUpdate(
    args: BaseDrawArgs,
    lastUpdate: number | undefined,
    frameTime: number,
    lastPrep: PrepResult | undefined,
    draw: () => void
) {
    const { ctx, rect, theme } = args;
    let progress = Number.MAX_SAFE_INTEGER;
    const animTime = 500;
    if (lastUpdate !== undefined) {
        progress = frameTime - lastUpdate;

        if (progress < animTime) {
            const fade = 1 - progress / animTime;
            ctx.globalAlpha = fade;
            ctx.fillStyle = theme.bgSearchResult;
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            ctx.globalAlpha = 1;
            if (lastPrep !== undefined) {
                lastPrep.fillStyle = theme.bgSearchResult;
            }
        }
    }

    draw();

    return progress < animTime;
}

export function prepTextCell(
    args: BaseDrawArgs,
    lastPrep: PrepResult | undefined,
    overrideColor?: string
): Partial<PrepResult> {
    const { ctx, theme } = args;
    const result: Partial<PrepResult> = lastPrep ?? {};

    const newFill = overrideColor ?? theme.textDark;
    if (newFill !== result.fillStyle) {
        ctx.fillStyle = newFill;
        result.fillStyle = newFill;
    }
    return result;
}

/** @category Drawing */
export function drawTextCellExternal(args: BaseDrawArgs, data: string, contentAlign?: BaseGridCell["contentAlign"]) {
    const { rect, ctx, theme } = args;

    ctx.fillStyle = theme.textDark;
    drawTextCell(
        {
            ctx: ctx,
            rect,
            theme: theme,
        },
        data,
        contentAlign
    );
}

function drawSingleTextLine(
    ctx: CanvasRenderingContext2D,
    data: string,
    x: number,
    y: number,
    w: number,
    h: number,
    bias: number,
    theme: Theme,
    contentAlign?: BaseGridCell["contentAlign"]
) {
    if (contentAlign === "right") {
        ctx.fillText(data, x + w - (theme.cellHorizontalPadding + 0.5), y + h / 2 + bias);
    } else if (contentAlign === "center") {
        ctx.fillText(data, x + w / 2, y + h / 2 + bias);
    } else {
        ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
    }
}

export function getEmHeight(ctx: CanvasRenderingContext2D, fontStyle: string): number {
    const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle); // do not question the magic string
    return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
}

/** @category Drawing */
export function drawTextCell(
    args: Pick<BaseDrawArgs, "rect" | "ctx" | "theme">,
    data: string,
    contentAlign?: BaseGridCell["contentAlign"],
    allowWrapping?: boolean,
    hyperWrapping?: boolean
) {
    const { ctx, rect, theme } = args;

    const { x, y, width: w, height: h } = rect;

    allowWrapping = allowWrapping ?? false;

    if (!allowWrapping) {
        if (data.includes("\n")) {
            // new lines are rare and split is relatively expensive compared to the search
            // it pays off to not do the split contantly.
            data = data.split(/\r?\n/)[0];
        }
        const max = w / 4; // no need to round, slice will just truncate this
        if (data.length > max) {
            data = data.slice(0, max);
        }
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
        } else if (contentAlign !== undefined && contentAlign !== "left") {
            // Since default is start (=left), only apply if alignment is center or right
            ctx.textAlign = contentAlign;
            changed = true;
        }

        if (!allowWrapping) {
            drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign);
        } else {
            const fontStyle = `${theme.fontFamily} ${theme.baseFontStyle}`;
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
                if (drawY > y + h) break;
            }
            if (mustClip) {
                ctx.restore();
            }
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

interface CornerRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}

export function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | CornerRadius
) {
    if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }

    // restrict radius to a reasonable max
    radius = {
        tl: Math.min(radius.tl, height / 2, width / 2),
        tr: Math.min(radius.tr, height / 2, width / 2),
        bl: Math.min(radius.bl, height / 2, width / 2),
        br: Math.min(radius.br, height / 2, width / 2),
    };

    ctx.moveTo(x + radius.tl, y);
    ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
    ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
    ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
    ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}

interface Point {
    x: number;
    y: number;
    radius?: number;
}

interface Vector {
    nx: number;
    ny: number;
    len: number;
    x: number;
    y: number;
    ang: number;
}

export function roundedPoly(ctx: CanvasRenderingContext2D, points: Point[], radiusAll: number) {
    // convert 2 points into vector form, polar form, and normalised
    const asVec = function (p: Point, pp: Point): Vector {
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
    let radius: number;
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
            } else {
                angle = Math.PI - angle;
                radDirection = -1;
                drawDirection = true;
            }
        } else {
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
        let cRadius: number;
        if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
            lenOut = Math.min(v1.len / 2, v2.len / 2);
            cRadius = Math.abs((lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle));
        } else {
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
        ctx.arc(
            x,
            y,
            cRadius,
            v1.ang + (Math.PI / 2) * radDirection,
            v2.ang - (Math.PI / 2) * radDirection,
            drawDirection
        );
        //-----------------------------------------
        p1 = p2;
        p2 = p3;
    }
    ctx.closePath();
}

export function computeBounds(
    col: number,
    row: number,
    width: number,
    height: number,
    groupHeaderHeight: number,
    totalHeaderHeight: number,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    rows: number,
    freezeColumns: number,
    lastRowSticky: boolean,
    mappedColumns: readonly MappedGridColumn[],
    rowHeight: number | ((index: number) => number)
): Rectangle {
    const result: Rectangle = {
        x: 0,
        y: totalHeaderHeight + translateY,
        width: 0,
        height: 0,
    };

    const headerHeight = totalHeaderHeight - groupHeaderHeight;

    if (col >= freezeColumns) {
        const dir = cellXOffset > col ? -1 : 1;
        const freezeWidth = getStickyWidth(mappedColumns);
        result.x += freezeWidth + translateX;
        for (let i = cellXOffset; i !== col; i += dir) {
            result.x += mappedColumns[dir === 1 ? i : i - 1].width * dir;
        }
    } else {
        for (let i = 0; i < col; i++) {
            result.x += mappedColumns[i].width;
        }
    }
    result.width = mappedColumns[col].width + 1;

    if (row === -1) {
        result.y = groupHeaderHeight;
        result.height = headerHeight;
    } else if (row === -2) {
        result.y = 0;
        result.height = groupHeaderHeight;

        let start = col;
        const group = mappedColumns[col].group;
        const sticky = mappedColumns[col].sticky;
        while (
            start > 0 &&
            isGroupEqual(mappedColumns[start - 1].group, group) &&
            mappedColumns[start - 1].sticky === sticky
        ) {
            const c = mappedColumns[start - 1];
            result.x -= c.width;
            result.width += c.width;
            start--;
        }

        let end = col;
        while (
            end + 1 < mappedColumns.length &&
            isGroupEqual(mappedColumns[end + 1].group, group) &&
            mappedColumns[end + 1].sticky === sticky
        ) {
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
    } else if (lastRowSticky && row === rows - 1) {
        const stickyHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
        result.y = height - stickyHeight;
        result.height = stickyHeight;
    } else {
        const dir = cellYOffset > row ? -1 : 1;
        if (typeof rowHeight === "number") {
            const delta = row - cellYOffset;
            result.y += delta * rowHeight;
        } else {
            for (let r = cellYOffset; r !== row; r += dir) {
                result.y += rowHeight(r) * dir;
            }
        }
        result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
    }

    return result;
}
