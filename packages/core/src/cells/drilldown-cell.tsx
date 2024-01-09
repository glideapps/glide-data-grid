/* eslint-disable react/display-name */
import * as React from "react";
import DrilldownOverlayEditor from "../internal/data-grid-overlay-editor/private/drilldown-overlay-editor.js";
import {
    getEmHeight,
    getMiddleCenterBias,
    measureTextCached,
    roundedRect,
} from "../internal/data-grid/data-grid-lib.js";
import { GridCellKind, type DrilldownCell, type DrilldownCellData } from "../internal/data-grid/data-grid-types.js";
import type { BaseDrawArgs, InternalCellRenderer } from "./cell-types.js";
import { makeAccessibilityStringForArray } from "../common/utils.js";

export const drilldownCellRenderer: InternalCellRenderer<DrilldownCell> = {
    getAccessibilityString: c => makeAccessibilityStringForArray(c.data.map(d => d.text)),
    kind: GridCellKind.Drilldown,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) =>
        cell.data.reduce(
            (acc, data) => ctx.measureText(data.text).width + acc + 20 + (data.img !== undefined ? 18 : 0),
            0
        ) +
        2 * t.cellHorizontalPadding -
        4,
    draw: a => drawDrilldownCell(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return <DrilldownOverlayEditor drilldowns={value.data} />;
    },
    onPaste: () => undefined,
};

const itemMargin = 4;

const drilldownCache: {
    [key: string]: HTMLCanvasElement;
} = {};

function getAndCacheDrilldownBorder(
    bgCell: string,
    border: string,
    height: number,
    rounding: number
): {
    el: HTMLCanvasElement;
    height: number;
    width: number;
    middleWidth: number;
    sideWidth: number;
    dpr: number;
    padding: number;
} | null {
    const dpr = Math.ceil(window.devicePixelRatio);
    const shadowBlur = 5;
    const targetHeight = height - shadowBlur * 2;
    const middleWidth = 4;

    const innerHeight = height * dpr;
    const sideWidth = rounding + shadowBlur;
    const targetWidth = rounding * 3;
    const innerWidth = (targetWidth + shadowBlur * 2) * dpr;

    const key = `${bgCell},${border},${dpr},${height}`;
    if (drilldownCache[key] !== undefined) {
        return {
            el: drilldownCache[key],
            height: innerHeight,
            width: innerWidth,
            middleWidth: middleWidth * dpr,
            sideWidth: sideWidth * dpr,
            padding: shadowBlur * dpr,
            dpr,
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
    roundedRect(ctx, shadowBlur, shadowBlur, targetWidth, targetHeight, rounding);

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
    roundedRect(ctx, shadowBlur + 0.5, shadowBlur + 0.5, targetWidth, targetHeight, rounding);

    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.stroke();

    return {
        el: canvas,
        height: innerHeight,
        width: innerWidth,
        sideWidth: sideWidth * dpr,
        middleWidth: rounding * dpr,
        padding: shadowBlur * dpr,
        dpr,
    };
}

function drawDrilldownCell(args: BaseDrawArgs, data: readonly DrilldownCellData[]) {
    const { rect, theme, ctx, imageLoader, col, row } = args;
    const { x, width: w } = rect;

    const font = theme.baseFontFull;
    const emHeight = getEmHeight(ctx, font);
    const h = Math.min(rect.height, Math.max(16, Math.ceil(emHeight * theme.lineHeight) * 2));
    const y = Math.floor(rect.y + (rect.height - h) / 2);

    const bubbleHeight = h - 10;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + theme.cellHorizontalPadding;
    const rounding = theme.roundingRadius ?? 6;

    const tileMap = getAndCacheDrilldownBorder(theme.bgCell, theme.drilldownBorder, h, rounding);

    const renderBoxes: { x: number; width: number }[] = [];
    for (const el of data) {
        if (renderX > x + w) break;
        const textMetrics = measureTextCached(el.text, ctx, font);
        const textWidth = textMetrics.width;
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
        const { el, height, middleWidth, sideWidth, width, dpr, padding } = tileMap;
        const outerSideWidth = sideWidth / dpr;
        const outerPadding = padding / dpr;
        for (const rectInfo of renderBoxes) {
            const rx = Math.floor(rectInfo.x);
            const rw = Math.floor(rectInfo.width);
            const outerMiddleWidth = rw - (outerSideWidth - outerPadding) * 2;
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(el, 0, 0, sideWidth, height, rx - outerPadding, y, outerSideWidth, h);
            if (outerMiddleWidth > 0)
                ctx.drawImage(
                    el,
                    sideWidth,
                    0,
                    middleWidth,
                    height,
                    rx + (outerSideWidth - outerPadding),
                    y,
                    outerMiddleWidth,
                    h
                );
            ctx.drawImage(
                el,
                width - sideWidth,
                0,
                sideWidth,
                height,
                rx + rw - (outerSideWidth - outerPadding),
                y,
                outerSideWidth,
                h
            );
            ctx.imageSmoothingEnabled = true;
        }
    }

    ctx.beginPath();

    for (const [i, rectInfo] of renderBoxes.entries()) {
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
                roundedRect(ctx, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize, theme.roundingRadius ?? 3);
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
    }
}
