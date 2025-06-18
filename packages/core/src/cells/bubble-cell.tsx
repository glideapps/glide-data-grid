/* eslint-disable react/display-name */
import * as React from "react";
import BubblesOverlayEditor from "../internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js";
import { getMiddleCenterBias, measureTextCached, roundedRect } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind, type BubbleCell } from "../internal/data-grid/data-grid-types.js";
import type { BaseDrawArgs, InternalCellRenderer } from "./cell-types.js";
import { makeAccessibilityStringForArray } from "../common/utils.js";

export const bubbleCellRenderer: InternalCellRenderer<BubbleCell> = {
    getAccessibilityString: c => makeAccessibilityStringForArray(c.data),
    kind: GridCellKind.Bubble,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, theme) => {
        const bubblesWidth = cell.data.reduce(
            (acc, data) => ctx.measureText(data).width + acc + theme.bubblePadding * 2 + theme.bubbleMargin,
            0
        );
        if (cell.data.length === 0) return theme.cellHorizontalPadding * 2;
        return bubblesWidth + 2 * theme.cellHorizontalPadding - theme.bubbleMargin;
    },
    draw: a => drawBubbles(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return <BubblesOverlayEditor bubbles={value.data} />;
    },
    onPaste: () => undefined,
};

function drawBubbles(args: BaseDrawArgs, data: readonly string[]) {
    const { rect, theme, ctx, highlighted } = args;
    const { x, y, width: w, height: h } = rect;

    let renderX = x + theme.cellHorizontalPadding;

    const renderBoxes: { x: number; width: number }[] = [];
    for (const s of data) {
        if (renderX > x + w) break;
        const textWidth = measureTextCached(s, ctx, theme.baseFontFull).width;
        renderBoxes.push({
            x: renderX,
            width: textWidth,
        });

        renderX += textWidth + theme.bubblePadding * 2 + theme.bubbleMargin;
    }

    ctx.beginPath();
    for (const rectInfo of renderBoxes) {
        roundedRect(
            ctx,
            rectInfo.x,
            y + (h - theme.bubbleHeight) / 2,
            rectInfo.width + theme.bubblePadding * 2,
            theme.bubbleHeight,
            theme.roundingRadius ?? theme.bubbleHeight / 2
        );
    }
    ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
    ctx.fill();

    for (const [i, rectInfo] of renderBoxes.entries()) {
        ctx.beginPath();
        ctx.fillStyle = theme.textBubble;
        ctx.fillText(data[i], rectInfo.x + theme.bubblePadding, y + h / 2 + getMiddleCenterBias(ctx, theme));
    }
}
