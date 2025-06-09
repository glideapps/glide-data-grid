"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowIDCellRenderer = void 0;
const react_1 = __importDefault(require("react"));
const growing_entry_js_1 = require("../internal/growing-entry/growing-entry.js");
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
exports.rowIDCellRenderer = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: data_grid_types_js_1.GridCellKind.RowID,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: (a, b) => (0, data_grid_lib_js_1.prepTextCell)(a, b, a.theme.textLight),
    draw: a => (0, data_grid_lib_js_1.drawTextCell)(a, a.cell.data, a.cell.contentAlign),
    measure: (ctx, cell, theme) => (0, data_grid_lib_js_1.measureTextCached)(cell.data, ctx, theme.baseFontFull).width + theme.cellHorizontalPadding * 2,
    // eslint-disable-next-line react/display-name
    provideEditor: () => p => {
        const { isHighlighted, onChange, value, validatedSelection } = p;
        return (react_1.default.createElement(growing_entry_js_1.GrowingEntry, { highlight: isHighlighted, autoFocus: value.readonly !== true, disabled: value.readonly !== false, value: value.data, validatedSelection: validatedSelection, onChange: e => onChange({
                ...value,
                data: e.target.value,
            }) }));
    },
    onPaste: () => undefined,
};
//# sourceMappingURL=row-id-cell.js.map