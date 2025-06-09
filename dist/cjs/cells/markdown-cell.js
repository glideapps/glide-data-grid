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
exports.markdownCellRenderer = void 0;
/* eslint-disable react/display-name */
const React = __importStar(require("react"));
const markdown_overlay_editor_js_1 = require("../internal/data-grid-overlay-editor/private/markdown-overlay-editor.js");
const data_grid_lib_js_1 = require("../internal/data-grid/render/data-grid-lib.js");
const data_grid_types_js_1 = require("../internal/data-grid/data-grid-types.js");
exports.markdownCellRenderer = {
    getAccessibilityString: c => c.data?.toString() ?? "",
    kind: data_grid_types_js_1.GridCellKind.Markdown,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: data_grid_lib_js_1.prepTextCell,
    measure: (ctx, cell, t) => {
        const firstLine = cell.data.split("\n")[0];
        return (0, data_grid_lib_js_1.measureTextCached)(firstLine, ctx, t.baseFontFull).width + 2 * t.cellHorizontalPadding;
    },
    draw: a => (0, data_grid_lib_js_1.drawTextCell)(a, a.cell.data, a.cell.contentAlign),
    onDelete: c => ({
        ...c,
        data: "",
    }),
    provideEditor: () => p => {
        const { onChange, value, target, onFinishedEditing, markdownDivCreateNode, forceEditMode, validatedSelection } = p;
        return (React.createElement(markdown_overlay_editor_js_1.MarkdownOverlayEditor, { onFinish: onFinishedEditing, targetRect: target, value: value, validatedSelection: validatedSelection, onChange: e => onChange({
                ...value,
                data: e.target.value,
            }), forceEditMode: forceEditMode, createNode: markdownDivCreateNode }));
    },
    onPaste: (toPaste, cell) => (toPaste === cell.data ? undefined : { ...cell, data: toPaste }),
};
//# sourceMappingURL=markdown-cell.js.map