/* eslint-disable react/display-name */
import * as React from "react";
import BubblesOverlayEditor from "../internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js";
import { getMiddleCenterBias, measureTextCached, roundedRect } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind } from "../internal/data-grid/data-grid-types.js";
import { makeAccessibilityStringForArray } from "../common/utils.js";
export const bubbleCellRenderer = {
    getAccessibilityString: c => makeAccessibilityStringForArray(c.data),
    kind: GridCellKind.Bubble,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) => cell.data.reduce((acc, data) => measureTextCached(data, ctx, t.baseFontFull).width + acc + 20, 0) +
        2 * t.cellHorizontalPadding -
        4,
    draw: a => drawBubbles(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return React.createElement(BubblesOverlayEditor, { bubbles: value.data });
    },
    onPaste: () => undefined,
};
const itemMargin = 4;
function drawBubbles(args, data) {
    const { rect, theme, ctx, highlighted } = args;
    const { x, y, width: w, height: h } = rect;
    const bubbleHeight = 20;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + theme.cellHorizontalPadding;
    const renderBoxes = [];
    for (const s of data) {
        if (renderX > x + w)
            break;
        const textWidth = measureTextCached(s, ctx, theme.baseFontFull).width;
        renderBoxes.push({
            x: renderX,
            width: textWidth,
        });
        renderX += textWidth + bubblePad * 2 + bubbleMargin;
    }
    ctx.beginPath();
    for (const rectInfo of renderBoxes) {
        roundedRect(ctx, rectInfo.x, y + (h - bubbleHeight) / 2, rectInfo.width + bubblePad * 2, bubbleHeight, theme.roundingRadius ?? bubbleHeight / 2);
    }
    ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
    ctx.fill();
    for (const [i, rectInfo] of renderBoxes.entries()) {
        ctx.beginPath();
        ctx.fillStyle = theme.textBubble;
        ctx.fillText(data[i], rectInfo.x + bubblePad, y + h / 2 + getMiddleCenterBias(ctx, theme));
    }
}
//# sourceMappingURL=bubble-cell.js.map