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
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawImage = exports.imageCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const image_overlay_editor_js_1 = require("../internal/data-grid-overlay-editor/private/image-overlay-editor.js");
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
exports.imageCellRenderer = {
    getAccessibilityString: c => c.data.join(", "),
    kind: data_grid_types_js_1.GridCellKind.Image,
    needsHover: false,
    useLabel: false,
    needsHoverPosition: false,
    draw: a => drawImage(a, a.cell.displayData ?? a.cell.data, a.cell.rounding ?? a.theme.roundingRadius ?? 4, a.cell.contentAlign),
    measure: (_ctx, cell) => cell.data.length * 50,
    onDelete: c => ({
        ...c,
        data: [],
    }),
    provideEditor: () => p => {
        const { value, onFinishedEditing, imageEditorOverride } = p;
        const ImageEditor = imageEditorOverride ?? image_overlay_editor_js_1.ImageOverlayEditor;
        return (React.createElement(ImageEditor, { urls: value.data, canWrite: value.readonly !== true, onCancel: onFinishedEditing, onChange: newImage => {
                onFinishedEditing({
                    ...value,
                    data: [newImage],
                });
            } }));
    },
    onPaste: (toPaste, cell) => {
        toPaste = toPaste.trim();
        const fragments = toPaste.split(",");
        const uris = fragments
            .map(f => {
            try {
                new URL(f);
                return f;
            }
            catch {
                return undefined;
            }
        })
            .filter(x => x !== undefined);
        if (uris.length === cell.data.length && uris.every((u, i) => u === cell.data[i]))
            return undefined;
        return {
            ...cell,
            data: uris,
        };
    },
};
const itemMargin = 4;
function drawImage(args, data, rounding, contentAlign) {
    const { rect, col, row, theme, ctx, imageLoader } = args;
    const { x, y, height: h, width: w } = rect;
    const imgHeight = h - theme.cellVerticalPadding * 2;
    const images = [];
    let totalWidth = 0;
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < data.length; index++) {
        const i = data[index];
        if (i.length === 0)
            continue;
        const img = imageLoader.loadOrGetImage(i, col, row);
        if (img !== undefined) {
            images[index] = img;
            const imgWidth = img.width * (imgHeight / img.height);
            totalWidth += imgWidth + itemMargin;
        }
    }
    if (totalWidth === 0)
        return;
    totalWidth -= itemMargin;
    let drawX = x + theme.cellHorizontalPadding;
    if (contentAlign === "right")
        drawX = Math.floor(x + w - theme.cellHorizontalPadding - totalWidth);
    else if (contentAlign === "center")
        drawX = Math.floor(x + w / 2 - totalWidth / 2);
    for (const img of images) {
        if (img === undefined)
            continue; //array is sparse
        const imgWidth = img.width * (imgHeight / img.height);
        if (rounding > 0) {
            ctx.beginPath();
            (0, data_grid_lib_js_1.roundedRect)(ctx, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight, rounding);
            ctx.save();
            ctx.clip();
        }
        ctx.drawImage(img, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight);
        if (rounding > 0) {
            ctx.restore();
        }
        drawX += imgWidth + itemMargin;
    }
}
exports.drawImage = drawImage;
//# sourceMappingURL=image-cell.js.map