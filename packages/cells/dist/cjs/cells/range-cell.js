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
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const React = __importStar(require("react"));
const draw_fns_js_1 = require("../draw-fns.js");
const RANGE_HEIGHT = 6;
const inputStyle = {
    marginRight: 8,
};
const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
};
const renderer = {
    kind: glide_data_grid_1.GridCellKind.Custom,
    isMatch: (c) => c.data.kind === "range-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { min, max, value, label, measureLabel } = cell.data;
        const x = rect.x + theme.cellHorizontalPadding;
        const yMid = rect.y + rect.height / 2;
        const rangeSize = max - min;
        const fillRatio = (value - min) / rangeSize;
        ctx.save();
        let labelWidth = 0;
        if (label !== undefined) {
            ctx.font = `12px ${theme.fontFamily}`; // fixme this is slow
            labelWidth =
                (0, glide_data_grid_1.measureTextCached)(measureLabel ?? label, ctx, `12px ${theme.fontFamily}`).width +
                    theme.cellHorizontalPadding;
        }
        const rangeWidth = rect.width - theme.cellHorizontalPadding * 2 - labelWidth;
        if (rangeWidth >= RANGE_HEIGHT) {
            const gradient = ctx.createLinearGradient(x, yMid, x + rangeWidth, yMid);
            gradient.addColorStop(0, theme.accentColor);
            gradient.addColorStop(fillRatio, theme.accentColor);
            gradient.addColorStop(fillRatio, theme.bgBubble);
            gradient.addColorStop(1, theme.bgBubble);
            ctx.beginPath();
            ctx.fillStyle = gradient;
            (0, draw_fns_js_1.roundedRect)(ctx, x, yMid - RANGE_HEIGHT / 2, rangeWidth, RANGE_HEIGHT, RANGE_HEIGHT / 2);
            ctx.fill();
            ctx.beginPath();
            (0, draw_fns_js_1.roundedRect)(ctx, x + 0.5, yMid - RANGE_HEIGHT / 2 + 0.5, rangeWidth - 1, RANGE_HEIGHT - 1, (RANGE_HEIGHT - 1) / 2);
            ctx.strokeStyle = theme.accentLight;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        if (label !== undefined) {
            ctx.textAlign = "right";
            ctx.fillStyle = theme.textDark;
            ctx.fillText(label, rect.x + rect.width - theme.cellHorizontalPadding, yMid + (0, glide_data_grid_1.getMiddleCenterBias)(ctx, `12px ${theme.fontFamily}`));
        }
        ctx.restore();
        return true;
    },
    provideEditor: () => {
        // eslint-disable-next-line react/display-name
        return p => {
            const { data, readonly } = p.value;
            const strValue = data.value.toString();
            const strMin = data.min.toString();
            const strMax = data.max.toString();
            const strStep = data.step.toString();
            const onChange = (e) => {
                p.onChange({
                    ...p.value,
                    data: {
                        ...data,
                        value: Number(e.target.value),
                    },
                });
            };
            return (React.createElement("label", { style: wrapperStyle },
                React.createElement("input", { style: inputStyle, type: "range", value: strValue, min: strMin, max: strMax, step: strStep, onChange: onChange, disabled: readonly }),
                strValue));
        };
    },
    onPaste: (v, d) => {
        let num = Number.parseFloat(v);
        num = Number.isNaN(num) ? d.value : Math.max(d.min, Math.min(d.max, num));
        return {
            ...d,
            value: num,
        };
    },
};
exports.default = renderer;
//# sourceMappingURL=range-cell.js.map