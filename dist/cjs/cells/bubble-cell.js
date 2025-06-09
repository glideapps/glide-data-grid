"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const bubbles_overlay_editor_js_1 = __importDefault(require("../internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js"));
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
const utils_js_1 = require("../common/utils.js");
exports.bubbleCellRenderer = {
    getAccessibilityString: c => (0, utils_js_1.makeAccessibilityStringForArray)(c.data),
    kind: data_grid_types_js_1.GridCellKind.Bubble,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) => cell.data.reduce((acc, data) => (0, data_grid_lib_js_1.measureTextCached)(data, ctx, t.baseFontFull).width + acc + 20, 0) +
        2 * t.cellHorizontalPadding -
        4,
    draw: a => drawBubbles(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return React.createElement(bubbles_overlay_editor_js_1.default, { bubbles: value.data });
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
        const textWidth = (0, data_grid_lib_js_1.measureTextCached)(s, ctx, theme.baseFontFull).width;
        renderBoxes.push({
            x: renderX,
            width: textWidth,
        });
        renderX += textWidth + bubblePad * 2 + bubbleMargin;
    }
    ctx.beginPath();
    for (const rectInfo of renderBoxes) {
        (0, data_grid_lib_js_1.roundedRect)(ctx, rectInfo.x, y + (h - bubbleHeight) / 2, rectInfo.width + bubblePad * 2, bubbleHeight, theme.roundingRadius ?? bubbleHeight / 2);
    }
    ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
    ctx.fill();
    for (const [i, rectInfo] of renderBoxes.entries()) {
        ctx.beginPath();
        ctx.fillStyle = theme.textBubble;
        ctx.fillText(data[i], rectInfo.x + bubblePad, y + h / 2 + (0, data_grid_lib_js_1.getMiddleCenterBias)(ctx, theme));
    }
}
//# sourceMappingURL=bubble-cell.js.map