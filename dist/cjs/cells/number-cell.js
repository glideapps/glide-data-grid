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
exports.numberCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
const draw_edit_hover_indicator_js_1 = require("../internal/data-grid/render/draw-edit-hover-indicator.js");
const NumberOverlayEditor = React.lazy(async () => await import("../internal/data-grid-overlay-editor/private/number-overlay-editor.js"));
exports.numberCellRenderer = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: data_grid_types_js_1.GridCellKind.Number,
    needsHover: cell => cell.hoverEffect === true,
    needsHoverPosition: false,
    useLabel: true,
    drawPrep: data_grid_lib_js_1.prepTextCell,
    draw: a => {
        const { hoverAmount, cell, ctx, theme, rect, overrideCursor } = a;
        const { hoverEffect, displayData, hoverEffectTheme } = cell;
        if (hoverEffect === true && hoverAmount > 0) {
            (0, draw_edit_hover_indicator_js_1.drawEditHoverIndicator)(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
        }
        (0, data_grid_lib_js_1.drawTextCell)(a, a.cell.displayData, a.cell.contentAlign);
    },
    measure: (ctx, cell, theme) => ctx.measureText(cell.displayData).width + theme.cellHorizontalPadding * 2,
    onDelete: c => ({
        ...c,
        data: undefined,
    }),
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection } = p;
        return (React.createElement(React.Suspense, { fallback: null },
            React.createElement(NumberOverlayEditor, { highlight: isHighlighted, disabled: value.readonly === true, value: value.data, fixedDecimals: value.fixedDecimals, allowNegative: value.allowNegative, thousandSeparator: value.thousandSeparator, decimalSeparator: value.decimalSeparator, validatedSelection: validatedSelection, onChange: x => onChange({
                    ...value,
                    data: Number.isNaN(x.floatValue ?? 0) ? 0 : x.floatValue,
                }) })));
    },
    onPaste: (toPaste, cell, details) => {
        const newNumber = typeof details.rawValue === "number"
            ? details.rawValue
            : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
        if (Number.isNaN(newNumber) || cell.data === newNumber)
            return undefined;
        return { ...cell, data: newNumber, displayData: details.formattedString ?? cell.displayData };
    },
};
//# sourceMappingURL=number-cell.js.map