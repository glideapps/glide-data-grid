import { Theme } from "../common/styles";
import {
    DrilldownCellData,
    Item,
    GridSelection,
    InnerGridCell,
    SizedGridColumn,
    Rectangle,
    BaseGridCell,
    BooleanEmpty,
    BooleanIndeterminate,
} from "./data-grid-types";
import { degreesToRadians, direction } from "../common/utils";
import React from "react";
import { BaseDrawArgs, PrepResult } from "./cells/cell-types";
import { assertNever } from "../common/support";
import { clearMultilineCache, splitMultilineText } from "./multi-line-layout";

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

function remapForDnDState(
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

async function clearCacheOnLoad() {
    if (document?.fonts?.ready === undefined) return;
    await document.fonts.ready;
    metricsSize = 0;
    metricsCache = {};
    clearMultilineCache();
}

void clearCacheOnLoad();

function makeCacheKey(s: string, ctx: CanvasRenderingContext2D, baseline: "alphabetic" | "middle", font?: string) {
    return `${s}_${font ?? ctx.font}_${baseline}`;
}

export function measureTextCached(s: string, ctx: CanvasRenderingContext2D, font?: string): TextMetrics {
    const key = makeCacheKey(s, ctx, "middle", font);
    let metrics = metricsCache[key];
    if (metrics === undefined) {
        metrics = ctx.measureText(s);
        metricsCache[key] = metrics;
        metricsSize++;
    }

    if (metricsSize > 10000) {
        metricsCache = {};
        metricsSize = 0;
    }

    return metrics;
}

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

export function drawWithLastUpdate(
    args: BaseDrawArgs,
    lastUpdate: number | undefined,
    frameTime: number,
    lastPrep: PrepResult | undefined,
    draw: () => void
) {
    const { ctx, x, y, w: width, h: height, theme } = args;
    let progress = Number.MAX_SAFE_INTEGER;
    const animTime = 500;
    if (lastUpdate !== undefined) {
        progress = frameTime - lastUpdate;

        if (progress < animTime) {
            const fade = 1 - progress / animTime;
            ctx.globalAlpha = fade;
            ctx.fillStyle = theme.bgSearchResult;
            ctx.fillRect(x, y, width, height);
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

export function drawTextCell(
    args: BaseDrawArgs,
    data: string,
    contentAlign?: BaseGridCell["contentAlign"],
    allowWrapping?: boolean
) {
    const { ctx, x, y, w, h, theme } = args;

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

    if (data.length > 0) {
        let changed = false;
        if (contentAlign === undefined && direction(data) === "rtl") {
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
            const split = splitMultilineText(ctx, data, fontStyle, w - theme.cellHorizontalPadding * 2);

            const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle); // do not question the magic string
            const emHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
            const lineHeight = theme.lineHeight * emHeight;

            const totalClipHeight = Math.max(1, lineHeight) * split.length;
            const mustClip = totalClipHeight + theme.cellVerticalPadding > h;

            if (mustClip) {
                // well now we have to clip because we might render outside the cell vertically
                ctx.save();
                ctx.rect(x, y, w, h);
                ctx.clip();
            }

            const optimalY = y + h / 2 - (lineHeight * split.length) / 2;
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
    }
}

export function drawNewRowCell(args: BaseDrawArgs, data: string, icon?: string) {
    const { ctx, x, y, w, h, hoverAmount, theme, spriteManager } = args;
    ctx.beginPath();
    ctx.globalAlpha = hoverAmount;
    ctx.rect(x, y, w, h);
    ctx.fillStyle = theme.bgHeaderHovered;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();

    const alwaysShowIcon = data !== "";

    if (icon !== undefined) {
        const padding = 8;
        const size = h - padding;
        const px = x + padding / 2;
        const py = y + padding / 2;

        spriteManager.drawSprite(icon, "normal", ctx, px, py, size, theme, alwaysShowIcon ? 1 : hoverAmount);
    } else {
        const finalLineSize = 12;
        const lineSize = alwaysShowIcon ? finalLineSize : hoverAmount * finalLineSize;
        const xTranslate = alwaysShowIcon ? 0 : (1 - hoverAmount) * finalLineSize * 0.5;

        const padPlus = theme.cellHorizontalPadding + 4;
        if (lineSize > 0) {
            ctx.moveTo(x + padPlus + xTranslate, y + h / 2);
            ctx.lineTo(x + padPlus + xTranslate + lineSize, y + h / 2);
            ctx.moveTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 - lineSize * 0.5);
            ctx.lineTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 + lineSize * 0.5);
            ctx.lineWidth = 2;
            ctx.strokeStyle = theme.bgIconHeader;
            ctx.lineCap = "round";
            ctx.stroke();
        }
    }

    ctx.fillStyle = theme.textMedium;
    ctx.fillText(data, 24 + x + theme.cellHorizontalPadding + 0.5, y + h / 2 + getMiddleCenterBias(ctx, theme));
    ctx.beginPath();
}

function drawCheckbox(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    checked: boolean | BooleanEmpty | BooleanIndeterminate,
    x: number,
    y: number,
    width: number,
    height: number,
    highlighted: boolean,
    hoverX: number = -20,
    hoverY: number = -20
) {
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const hovered = Math.abs(hoverX - width / 2) < 10 && Math.abs(hoverY - height / 2) < 10;

    switch (checked) {
        case true: {
            ctx.beginPath();
            roundedRect(ctx, centerX - 9, centerY - 9, 18, 18, 4);

            ctx.fillStyle = highlighted ? theme.accentColor : theme.textMedium;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX - 8 + 3.65005, centerY - 8 + 7.84995);
            ctx.lineTo(centerX - 8 + 6.37587, centerY - 8 + 10.7304);
            ctx.lineTo(centerX - 8 + 11.9999, centerY - 8 + 4.74995);

            ctx.strokeStyle = theme.bgCell;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = 1.9;
            ctx.stroke();
            break;
        }

        case BooleanEmpty:
        case false: {
            ctx.beginPath();
            roundedRect(ctx, centerX - 8.5, centerY - 8.5, 17, 17, 4);

            ctx.lineWidth = 1;
            ctx.strokeStyle = hovered ? theme.textDark : theme.textMedium;
            ctx.stroke();
            break;
        }

        case BooleanIndeterminate: {
            ctx.beginPath();
            roundedRect(ctx, centerX - 8.5, centerY - 8.5, 17, 17, 4);

            ctx.fillStyle = hovered ? theme.textMedium : theme.textLight;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX - 4, centerY);
            ctx.lineTo(centerX + 4, centerY);
            ctx.strokeStyle = theme.bgCell;
            ctx.lineCap = "round";
            ctx.lineWidth = 1.9;
            ctx.stroke();
            break;
        }

        default:
            assertNever(checked);
    }
}

export function prepMarkerRowCell(args: BaseDrawArgs, lastPrep: PrepResult | undefined): Partial<PrepResult> {
    const { ctx, theme } = args;
    const newFont = `9px ${theme.fontFamily}`;
    const result: Partial<PrepResult> = lastPrep ?? {};
    if (result?.font !== newFont) {
        ctx.font = newFont;
        result.font = newFont;
    }
    ctx.textAlign = "center";
    return result;
}

export function deprepMarkerRowCell(args: Pick<BaseDrawArgs, "ctx">) {
    const { ctx } = args;
    ctx.textAlign = "start";
}

export function drawMarkerRowCell(
    args: BaseDrawArgs,
    index: number,
    checked: boolean,
    markerKind: "checkbox" | "both" | "number"
) {
    const { ctx, x, y, w: width, h: height, hoverAmount, theme } = args;
    const checkedboxAlpha = checked ? 1 : hoverAmount;
    if (markerKind !== "number" && checkedboxAlpha > 0) {
        ctx.globalAlpha = checkedboxAlpha;
        drawCheckbox(ctx, theme, checked, x, y, width, height, true);
        ctx.globalAlpha = 1;
    }
    if (markerKind === "number" || (markerKind === "both" && !checked)) {
        const text = index.toString();

        const start = x + width / 2;
        if (markerKind === "both" && hoverAmount !== 0) {
            ctx.globalAlpha = 1 - hoverAmount;
        }
        ctx.fillStyle = theme.textLight;
        ctx.fillText(text, start, y + height / 2 + getMiddleCenterBias(ctx, `9px ${theme.fontFamily}`));
        if (hoverAmount !== 0) {
            ctx.globalAlpha = 1;
        }
    }
}

export function drawProtectedCell(args: BaseDrawArgs) {
    const { ctx, theme, x, y, h } = args;

    ctx.beginPath();

    const radius = 2.5;
    let xStart = x + theme.cellHorizontalPadding + radius;
    const center = y + h / 2;
    const p = Math.cos(degreesToRadians(30)) * radius;
    const q = Math.sin(degreesToRadians(30)) * radius;

    for (let i = 0; i < 12; i++) {
        ctx.moveTo(xStart, center - radius);
        ctx.lineTo(xStart, center + radius);

        ctx.moveTo(xStart + p, center - q);
        ctx.lineTo(xStart - p, center + q);

        ctx.moveTo(xStart - p, center - q);
        ctx.lineTo(xStart + p, center + q);
        xStart += 8;
    }
    ctx.lineWidth = 1.1;
    ctx.lineCap = "square";
    ctx.strokeStyle = theme.textLight;
    ctx.stroke();
}

interface CornerRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}

function roundedRect(
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

    ctx.moveTo(x + radius.tl, y);
    ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
    ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
    ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
    ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}

export function drawBoolean(args: BaseDrawArgs, data: boolean | BooleanEmpty | BooleanIndeterminate, canEdit: boolean) {
    if (!canEdit && data === BooleanEmpty) {
        return;
    }

    const { ctx, hoverAmount, theme, x, y, w, h, highlighted, hoverX, hoverY } = args;

    const hoverEffect = 0.35;

    let alpha = canEdit ? 1 - hoverEffect + hoverEffect * hoverAmount : 0.4;
    if (data === BooleanEmpty) {
        alpha *= hoverAmount;
    }
    if (alpha === 0) {
        return;
    }
    ctx.globalAlpha = alpha;

    drawCheckbox(ctx, theme, data, x, y, w, h, highlighted, hoverX, hoverY);

    ctx.globalAlpha = 1;
}

const itemMargin = 4;

export function drawBubbles(args: BaseDrawArgs, data: readonly string[]) {
    const { x, y, w, h, theme, ctx, highlighted } = args;
    const bubbleHeight = 20;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + theme.cellHorizontalPadding;

    const renderBoxes: { x: number; width: number }[] = [];
    for (const s of data) {
        if (renderX > x + w) break;
        const textWidth = measureTextCached(s, ctx, `${theme.baseFontStyle} ${theme.fontFamily}`).width;
        renderBoxes.push({
            x: renderX,
            width: textWidth,
        });

        renderX += textWidth + bubblePad * 2 + bubbleMargin;
    }

    ctx.beginPath();
    renderBoxes.forEach(rectInfo => {
        roundedRect(
            ctx,
            rectInfo.x,
            y + (h - bubbleHeight) / 2,
            rectInfo.width + bubblePad * 2,
            bubbleHeight,
            bubbleHeight / 2
        );
    });
    ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
    ctx.fill();

    renderBoxes.forEach((rectInfo, i) => {
        ctx.beginPath();
        ctx.fillStyle = theme.textBubble;
        ctx.fillText(data[i], rectInfo.x + bubblePad, y + h / 2 + getMiddleCenterBias(ctx, theme));
    });
}

const drilldownCache: {
    [key: string]: HTMLCanvasElement;
} = {};

function getAndCacheDrilldownBorder(
    bgCell: string,
    border: string
): {
    el: HTMLCanvasElement;
    height: number;
    width: number;
    middleWidth: number;
    sideWidth: number;
} | null {
    const dpr = Math.ceil(window.devicePixelRatio);
    const targetHeight = 24;
    const shadowBlur = 5;
    const middleWidth = 4;

    const innerHeight = (targetHeight + shadowBlur * 2) * dpr; // 68
    const innerWidth = innerHeight + middleWidth * dpr; // 76
    const sideWidth = innerHeight / 2;

    const key = `${bgCell},${border},${dpr}`;
    if (drilldownCache[key] !== undefined) {
        return {
            el: drilldownCache[key],
            height: innerHeight,
            width: innerWidth,
            middleWidth: middleWidth * dpr,
            sideWidth,
        };
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d"); // alpha needed

    if (ctx === null) return null;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    ctx.scale(dpr, dpr);

    drilldownCache[key] = canvas;

    ctx.beginPath();
    roundedRect(ctx, shadowBlur, shadowBlur, targetHeight + middleWidth, targetHeight, 6);

    ctx.shadowColor = "rgba(24, 25, 34, 0.4)";
    ctx.shadowBlur = 1;
    ctx.fillStyle = bgCell;
    ctx.fill();

    ctx.shadowColor = "rgba(24, 25, 34, 0.3)";
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 5;
    ctx.fillStyle = bgCell;
    ctx.fill();

    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowBlur = 0;

    ctx.beginPath();
    roundedRect(ctx, shadowBlur + 0.5, shadowBlur + 0.5, targetHeight + middleWidth, targetHeight, 6);

    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.stroke();

    return { el: canvas, height: innerHeight, width: innerWidth, sideWidth, middleWidth: middleWidth * dpr };
}

export function drawDrilldownCell(args: BaseDrawArgs, data: readonly DrilldownCellData[]) {
    const { x, y, w, h, theme, ctx, imageLoader, col, row } = args;
    const bubbleHeight = 24;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + theme.cellHorizontalPadding;

    const tileMap = getAndCacheDrilldownBorder(theme.bgCell, theme.drilldownBorder);

    const renderBoxes: { x: number; width: number }[] = [];
    for (const el of data) {
        if (renderX > x + w) break;
        const textWidth = measureTextCached(el.text, ctx, `${theme.baseFontStyle} ${theme.fontFamily}`).width;
        let imgWidth = 0;
        if (el.img !== undefined) {
            const img = imageLoader.loadOrGetImage(el.img, col, row);
            if (img !== undefined) {
                imgWidth = bubbleHeight - 8 + 4;
            }
        }
        const renderWidth = textWidth + imgWidth + bubblePad * 2;
        renderBoxes.push({
            x: renderX,
            width: renderWidth,
        });

        renderX += renderWidth + bubbleMargin;
    }

    if (tileMap !== null) {
        const { el, height, middleWidth, sideWidth, width } = tileMap;
        renderBoxes.forEach(rectInfo => {
            const rx = Math.floor(rectInfo.x);
            const rw = Math.floor(rectInfo.width);
            ctx.imageSmoothingEnabled = false;
            const maxSideWidth = Math.min(17, rw / 2 + 5);
            ctx.drawImage(el, 0, 0, sideWidth, height, rx - 5, y + h / 2 - 17, maxSideWidth, 34);
            if (rectInfo.width > 24)
                ctx.drawImage(el, sideWidth, 0, middleWidth, height, rx + 12, y + h / 2 - 17, rw - 24, 34);
            ctx.drawImage(
                el,
                width - sideWidth,
                0,
                sideWidth,
                height,
                rx + rw - (maxSideWidth - 5),
                y + h / 2 - 17,
                maxSideWidth,
                34
            );
            ctx.imageSmoothingEnabled = true;
        });
    }

    ctx.beginPath();

    renderBoxes.forEach((rectInfo, i) => {
        const d = data[i];
        let drawX = rectInfo.x + bubblePad;

        if (d.img !== undefined) {
            const img = imageLoader.loadOrGetImage(d.img, col, row);
            if (img !== undefined) {
                const imgSize = bubbleHeight - 8;
                let srcX = 0;
                let srcY = 0;
                let srcWidth = img.width;
                let srcHeight = img.height;

                if (srcWidth > srcHeight) {
                    // landscape
                    srcX += (srcWidth - srcHeight) / 2;
                    srcWidth = srcHeight;
                } else if (srcHeight > srcWidth) {
                    //portrait
                    srcY += (srcHeight - srcWidth) / 2;
                    srcHeight = srcWidth;
                }
                ctx.beginPath();
                roundedRect(ctx, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize, 3);
                ctx.save();
                ctx.clip();
                ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize);
                ctx.restore();

                drawX += imgSize + 4;
            }
        }

        ctx.beginPath();
        ctx.fillStyle = theme.textBubble;
        ctx.fillText(d.text, drawX, y + h / 2 + getMiddleCenterBias(ctx, theme));
    });
}

export function drawImage(args: BaseDrawArgs, data: readonly string[]) {
    const { x, y, h, col, row, theme, ctx, imageLoader } = args;
    let drawX = x + theme.cellHorizontalPadding;
    for (const i of data) {
        if (i.length === 0) continue;
        const img = imageLoader.loadOrGetImage(i, col, row);

        if (img !== undefined) {
            const imgHeight = h - theme.cellVerticalPadding * 2;
            const imgWidth = img.width * (imgHeight / img.height);
            roundedRect(ctx, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight, 4);
            ctx.save();
            ctx.clip();
            ctx.drawImage(img, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight);
            ctx.restore();

            drawX += imgWidth + itemMargin;
        }
    }
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
        if (p2.radius !== undefined) {
            radius = p2.radius;
        } else {
            radius = radiusAll;
        }
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
