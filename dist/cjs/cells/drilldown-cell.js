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
exports.drilldownCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const drilldown_overlay_editor_js_1 = __importDefault(require("../internal/data-grid-overlay-editor/private/drilldown-overlay-editor.js"));
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
const utils_js_1 = require("../common/utils.js");
exports.drilldownCellRenderer = {
    getAccessibilityString: c => (0, utils_js_1.makeAccessibilityStringForArray)(c.data.map(d => d.text)),
    kind: data_grid_types_js_1.GridCellKind.Drilldown,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) => cell.data.reduce((acc, data) => ctx.measureText(data.text).width + acc + 20 + (data.img !== undefined ? 18 : 0), 0) +
        2 * t.cellHorizontalPadding -
        4,
    draw: a => drawDrilldownCell(a, a.cell.data),
    provideEditor: () => p => {
        const { value } = p;
        return React.createElement(drilldown_overlay_editor_js_1.default, { drilldowns: value.data });
    },
    onPaste: () => undefined,
};
const itemMargin = 4;
const drilldownCache = {};
function getAndCacheDrilldownBorder(bgCell, border, height, rounding) {
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
    if (ctx === null)
        return null;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.scale(dpr, dpr);
    drilldownCache[key] = canvas;
    ctx.beginPath();
    (0, data_grid_lib_js_1.roundedRect)(ctx, shadowBlur, shadowBlur, targetWidth, targetHeight, rounding);
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
    (0, data_grid_lib_js_1.roundedRect)(ctx, shadowBlur + 0.5, shadowBlur + 0.5, targetWidth, targetHeight, rounding);
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
function drawDrilldownCell(args, data) {
    const { rect, theme, ctx, imageLoader, col, row } = args;
    const { x, width: w } = rect;
    const font = theme.baseFontFull;
    const emHeight = (0, data_grid_lib_js_1.getEmHeight)(ctx, font);
    const h = Math.min(rect.height, Math.max(16, Math.ceil(emHeight * theme.lineHeight) * 2));
    const y = Math.floor(rect.y + (rect.height - h) / 2);
    const bubbleHeight = h - 10;
    const bubblePad = 8;
    const bubbleMargin = itemMargin;
    let renderX = x + theme.cellHorizontalPadding;
    const rounding = theme.roundingRadius ?? 6;
    const tileMap = getAndCacheDrilldownBorder(theme.bgCell, theme.drilldownBorder, h, rounding);
    const renderBoxes = [];
    for (const el of data) {
        if (renderX > x + w)
            break;
        const textMetrics = (0, data_grid_lib_js_1.measureTextCached)(el.text, ctx, font);
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
                ctx.drawImage(el, sideWidth, 0, middleWidth, height, rx + (outerSideWidth - outerPadding), y, outerMiddleWidth, h);
            ctx.drawImage(el, width - sideWidth, 0, sideWidth, height, rx + rw - (outerSideWidth - outerPadding), y, outerSideWidth, h);
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
                }
                else if (srcHeight > srcWidth) {
                    //portrait
                    srcY += (srcHeight - srcWidth) / 2;
                    srcHeight = srcWidth;
                }
                ctx.beginPath();
                (0, data_grid_lib_js_1.roundedRect)(ctx, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize, theme.roundingRadius ?? 3);
                ctx.save();
                ctx.clip();
                ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize);
                ctx.restore();
                drawX += imgSize + 4;
            }
        }
        ctx.beginPath();
        ctx.fillStyle = theme.textBubble;
        ctx.fillText(d.text, drawX, y + h / 2 + (0, data_grid_lib_js_1.getMiddleCenterBias)(ctx, theme));
    }
}
//# sourceMappingURL=drilldown-cell.js.map