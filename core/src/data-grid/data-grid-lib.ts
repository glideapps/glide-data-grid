import { Theme } from "../common/styles";
import { DrilldownCellData, GridColumn } from "./data-grid-types";
import { degreesToRadians, direction } from "../common/utils";
import React from "react";
import { BaseDrawArgs } from "./cells/cell-types";

export interface MappedGridColumn extends GridColumn {
    sourceIndex: number;
    sticky: boolean;
}

export function useMappedColumns(columns: readonly GridColumn[], freezeColumns: number): readonly MappedGridColumn[] {
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

export function getStickyWidth(columns: readonly MappedGridColumn[]): number {
    let result = 0;
    for (const c of columns) {
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
    let mappedCols = columns;
    if (dndState !== undefined) {
        const writable = [...columns];
        const temp = mappedCols[dndState.src];
        if (dndState.src > dndState.dest) {
            writable.splice(dndState.src, 1);
            writable.splice(dndState.dest, 0, temp);
        } else {
            writable.splice(dndState.dest + 1, 0, temp);
            writable.splice(dndState.src, 1);
        }
        mappedCols = writable;
    }

    const sticky: MappedGridColumn[] = [];
    for (const c of columns) {
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

    const effectiveCols = [...sticky, ...mappedCols.slice(cellXOffset, endIndex).filter(c => !c.sticky)];

    return effectiveCols;
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
    headerHeight: number,
    rows: number,
    rowHeight: number | ((index: number) => number),
    cellYOffset: number,
    translateY: number,
    lastRowSticky: boolean
): number | undefined {
    if (targetY <= headerHeight / 2) return -2;
    if (targetY <= headerHeight) return -1;

    const lastRowHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(rows - 1);
    if (lastRowSticky && targetY > height - lastRowHeight) {
        return rows - 1;
    }

    const effectiveRows = rows - (lastRowSticky ? 1 : 0);

    const ty = targetY - (translateY ?? 0);
    if (typeof rowHeight === "number") {
        const target = Math.floor((ty - headerHeight) / rowHeight) + cellYOffset;
        if (target >= effectiveRows) return undefined;
        return target;
    } else {
        let curY = headerHeight;
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
    await document.fonts.ready;
    metricsSize = 0;
    metricsCache = {};
}

void clearCacheOnLoad();

export function measureTextCached(s: string, ctx: CanvasRenderingContext2D): TextMetrics {
    // return ctx.measureText(s).width;
    const key = `${s}_${ctx.font}`;
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

export function drawWithLastUpdate(
    args: BaseDrawArgs,
    lastUpdate: number | undefined,
    frameTime: number,
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
        }
    }

    draw();

    return progress < animTime;
}

export function drawTextCell(args: BaseDrawArgs, data: string, overrideColor?: string) {
    const { ctx, x, y, w, h, theme } = args;
    data = data.split(/\r?\n/)[0].slice(0, Math.round(w / 4));

    const dir = direction(data);

    ctx.textBaseline = "middle";
    ctx.fillStyle = overrideColor ?? theme.textDark;
    if (dir === "rtl") {
        const textWidth = measureTextCached(data, ctx).width;
        ctx.fillText(data, x + w - theme.cellHorizontalPadding - textWidth + 0.5, y + h / 2);
    } else {
        ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2);
    }
    ctx.textBaseline = "alphabetic";
}

export function drawNewRowCell(args: BaseDrawArgs, data: string, isFirst: boolean) {
    const { ctx, x, y, w, h, hoverAmount, theme } = args;
    ctx.beginPath();
    ctx.globalAlpha = hoverAmount;
    ctx.rect(x, y, w, h);
    ctx.fillStyle = theme.bgHeaderHovered;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();

    const finalLineSize = 12;
    const lineSize = isFirst ? finalLineSize : hoverAmount * finalLineSize;
    const xTranslate = isFirst ? 0 : (1 - hoverAmount) * finalLineSize * 0.5;

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

    ctx.fillStyle = theme.textMedium;
    ctx.textBaseline = "middle";
    ctx.fillText(data, 24 + x + theme.cellHorizontalPadding + 0.5, y + h / 2);
    ctx.textBaseline = "alphabetic";
    ctx.beginPath();
}

function drawCheckbox(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    checked: boolean,
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

    if (checked) {
        ctx.beginPath();
        roundedRect(ctx, centerX - 9, centerY - 9, 18, 18, 4);

        ctx.fillStyle = highlighted ? theme.accentColor : theme.textLight;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(centerX - 8 + 3.65005, centerY - 8 + 7.84995);
        ctx.lineTo(centerX - 8 + 6.37587, centerY - 8 + 10.7304);
        ctx.lineTo(centerX - 8 + 11.9999, centerY - 8 + 4.74995);

        ctx.strokeStyle = theme.accentFg;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
    } else {
        ctx.beginPath();
        roundedRect(ctx, centerX - 8.5, centerY - 8.5, 17, 17, 4);

        ctx.lineWidth = 1;
        ctx.strokeStyle = hovered ? theme.textMedium : theme.textLight;
        ctx.stroke();
    }
}

export function drawMarkerRowCell(
    args: BaseDrawArgs,
    index: number,
    checked: boolean,
    markerKind: "checkbox" | "both" | "number"
) {
    const { ctx, x, y, w: width, h: height, hoverAmount, theme } = args;
    if (markerKind !== "number") {
        ctx.globalAlpha = checked ? 1 : hoverAmount;
        drawCheckbox(ctx, theme, checked, x, y, width, height, true);
        ctx.globalAlpha = 1;
    }
    if (markerKind === "number" || (markerKind === "both" && !checked)) {
        const text = (index + 1).toString();
        ctx.font = `9px ${theme.fontFamily}`;
        const w = measureTextCached(text, ctx).width;

        const start = x + (width - w) / 2;
        if (markerKind === "both") {
            ctx.globalAlpha = 1 - hoverAmount;
        }
        ctx.fillStyle = theme.textLight;
        ctx.textBaseline = "middle";
        ctx.fillText(text, start, y + height / 2);
        ctx.textBaseline = "alphabetic";
        ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 1;
}

export function drawProtectedCell(args: BaseDrawArgs) {
    const { ctx, theme, x, y, w, h, highlighted } = args;
    if (!highlighted) {
        ctx.beginPath();
        ctx.rect(x + 1, y + 1, w - 1, h - 1);
        ctx.fillStyle = theme.bgCellMedium;
        ctx.fill();
    }

    ctx.beginPath();

    const radius = 2.5;
    let xStart = x + theme.cellHorizontalPadding + radius;
    const center = y + h / 2;
    const p = Math.cos(degreesToRadians(30)) * radius;
    const q = Math.sin(degreesToRadians(30)) * radius;

    for (let i = 0; i < 12; i++) {
        // ctx.arc(xStart, center, radius, 0, Math.PI * 2);
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

export function drawBoolean(args: BaseDrawArgs, data: boolean, canEdit: boolean) {
    const { ctx, hoverAmount, theme, x, y, w, h, highlighted, hoverX, hoverY } = args;
    const hoverEffect = 0.35;

    ctx.globalAlpha = canEdit ? 1 - hoverEffect + hoverEffect * hoverAmount : 0.4;

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
        const textWidth = measureTextCached(s, ctx).width;
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
        ctx.textBaseline = "middle";
        ctx.fillText(data[i], rectInfo.x + bubblePad, y + h / 2);
        ctx.textBaseline = "alphabetic";
    });
}

export function drawDrilldownCell(args: BaseDrawArgs, data: readonly DrilldownCellData[]) {
    const { x, y, w, h, theme, ctx, imageLoader, col, row } = args;
    const bubbleHeight = 24;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + theme.cellHorizontalPadding;

    const renderBoxes: { x: number; width: number }[] = [];
    for (const el of data) {
        if (renderX > x + w) break;
        const textWidth = measureTextCached(el.text, ctx).width;
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

    ctx.beginPath();
    renderBoxes.forEach(rectInfo => {
        roundedRect(
            ctx,
            Math.floor(rectInfo.x),
            y + (h - bubbleHeight) / 2,
            Math.floor(rectInfo.width),
            bubbleHeight,
            6
        );
    });

    ctx.shadowColor = "rgba(24, 25, 34, 0.4)";
    ctx.shadowBlur = 1;
    ctx.fillStyle = theme.bgCell;
    ctx.fill();

    ctx.shadowColor = "rgba(24, 25, 34, 0.2)";
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 5;
    ctx.fillStyle = theme.bgCell;
    ctx.fill();

    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowBlur = 0;

    ctx.beginPath();
    renderBoxes.forEach(rectInfo => {
        roundedRect(
            ctx,
            Math.floor(rectInfo.x) + 0.5,
            Math.floor(y + (h - bubbleHeight) / 2) + 0.5,
            Math.round(rectInfo.width),
            bubbleHeight,
            6
        );
    });

    ctx.strokeStyle = theme.drilldownBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

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
        ctx.textBaseline = "middle";
        ctx.fillText(d.text, drawX, y + h / 2);
        ctx.textBaseline = "alphabetic";
    });
}

export function drawImage(args: BaseDrawArgs, data: readonly string[]) {
    const { x, y, h, col, row, theme, ctx, imageLoader } = args;
    let drawX = x + theme.cellHorizontalPadding;
    data.filter(s => s.length > 0).forEach(i => {
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
        // }
    });
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
    let radius = radiusAll;
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
