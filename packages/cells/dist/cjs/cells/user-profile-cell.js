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
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const renderer = {
    kind: glide_data_grid_1.GridCellKind.Custom,
    isMatch: (cell) => cell.data.kind === "user-profile-cell",
    draw: (args, cell) => {
        const { ctx, rect, theme, imageLoader, col, row } = args;
        const { image, name, initial, tint } = cell.data;
        const xPad = theme.cellHorizontalPadding;
        const radius = Math.min(12, rect.height / 2 - theme.cellVerticalPadding);
        const drawX = rect.x + xPad;
        const imageResult = imageLoader.loadOrGetImage(image, col, row);
        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX + radius, rect.y + rect.height / 2, radius, 0, Math.PI * 2);
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = tint;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.font = `600 16px ${theme.fontFamily}`;
        const metrics = (0, glide_data_grid_1.measureTextCached)(initial[0], ctx);
        ctx.fillText(initial[0], drawX + radius - metrics.width / 2, rect.y + rect.height / 2 + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, `600 16px ${theme.fontFamily}`));
        if (imageResult !== undefined) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(drawX + radius, rect.y + rect.height / 2, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(imageResult, drawX, rect.y + rect.height / 2 - radius, radius * 2, radius * 2);
            ctx.restore();
        }
        if (name !== undefined) {
            ctx.font = theme.baseFontFull;
            ctx.fillStyle = theme.textDark;
            ctx.fillText(name, drawX + radius * 2 + xPad, rect.y + rect.height / 2 + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, theme));
        }
        ctx.restore();
        return true;
    },
    provideEditor: () => p => {
        const { isHighlighted, onChange, value } = p;
        return (React.createElement(glide_data_grid_1.TextCellEntry, { highlight: isHighlighted, autoFocus: true, value: value.data.name ?? "", disabled: value.readonly ?? false, onChange: e => onChange({
                ...value,
                data: {
                    ...value.data,
                    name: e.target.value,
                },
            }) }));
    },
    onPaste: (v, d) => ({
        ...d,
        name: v,
    }),
};
exports.default = renderer;
//# sourceMappingURL=user-profile-cell.js.map