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
exports.textCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const growing_entry_js_1 = require("../internal/growing-entry/growing-entry.js");
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
const draw_edit_hover_indicator_js_1 = require("../internal/data-grid/render/draw-edit-hover-indicator.js");
exports.textCellRenderer = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: data_grid_types_js_1.GridCellKind.Text,
    needsHover: textCell => textCell.hoverEffect === true,
    needsHoverPosition: false,
    drawPrep: data_grid_lib_js_1.prepTextCell,
    useLabel: true,
    draw: a => {
        const { cell, hoverAmount, hyperWrapping, ctx, rect, theme, overrideCursor } = a;
        const { displayData, contentAlign, hoverEffect, allowWrapping, hoverEffectTheme } = cell;
        if (hoverEffect === true && hoverAmount > 0) {
            (0, draw_edit_hover_indicator_js_1.drawEditHoverIndicator)(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
        }
        (0, data_grid_lib_js_1.drawTextCell)(a, displayData, contentAlign, allowWrapping, hyperWrapping);
    },
    measure: (ctx, cell, t) => {
        const lines = cell.displayData.split("\n", cell.allowWrapping === true ? undefined : 1);
        let maxLineWidth = 0;
        for (const line of lines) {
            maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
        }
        return maxLineWidth + 2 * t.cellHorizontalPadding;
    },
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: cell => ({
        disablePadding: cell.allowWrapping === true,
        editor: p => {
            const { isHighlighted, onChange, value, validatedSelection } = p;
            return (React.createElement(growing_entry_js_1.GrowingEntry, { style: cell.allowWrapping === true ? { padding: "3px 8.5px" } : undefined, highlight: isHighlighted, autoFocus: value.readonly !== true, disabled: value.readonly === true, altNewline: true, value: value.data, validatedSelection: validatedSelection, onChange: e => onChange({
                    ...value,
                    data: e.target.value,
                }) }));
        },
    }),
    onPaste: (toPaste, cell, details) => toPaste === cell.data
        ? undefined
        : { ...cell, data: toPaste, displayData: details.formattedString ?? cell.displayData },
};
//# sourceMappingURL=text-cell.js.map