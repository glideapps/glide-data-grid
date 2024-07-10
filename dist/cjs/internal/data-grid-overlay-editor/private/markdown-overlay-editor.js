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
exports.MarkdownOverlayEditor = void 0;
const React = __importStar(require("react"));
const markdown_div_js_1 = __importDefault(require("../../markdown-div/markdown-div.js"));
const growing_entry_js_1 = require("../../growing-entry/growing-entry.js");
const markdown_overlay_editor_style_js_1 = require("./markdown-overlay-editor-style.js");
const utils_js_1 = require("../../../common/utils.js");
const MarkdownOverlayEditor = p => {
    const { value, onChange, forceEditMode, createNode, targetRect, onFinish, validatedSelection } = p;
    const markdown = value.data;
    const readonly = value.readonly === true;
    const [editMode, setEditMode] = React.useState(markdown === "" || forceEditMode);
    const onEditClick = React.useCallback(() => {
        setEditMode(e => !e);
    }, []);
    const addLeftPad = markdown ? "gdg-ml-6" : "";
    if (editMode) {
        return (React.createElement(markdown_overlay_editor_style_js_1.MarkdownOverlayEditorStyle, { targetWidth: targetRect.width - 20 },
            React.createElement(growing_entry_js_1.GrowingEntry, { autoFocus: true, highlight: false, validatedSelection: validatedSelection, value: markdown, onKeyDown: e => {
                    if (e.key === "Enter")
                        e.stopPropagation();
                }, onChange: onChange }),
            React.createElement("div", { className: `gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`, onClick: () => onFinish(value) },
                React.createElement(utils_js_1.Checkmark, null))));
    }
    return (React.createElement(markdown_overlay_editor_style_js_1.MarkdownOverlayEditorStyle, { targetWidth: targetRect.width },
        React.createElement(markdown_div_js_1.default, { contents: markdown, createNode: createNode }),
        !readonly && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "spacer" }),
            React.createElement("div", { className: `gdg-edit-icon gdg-edit-hover ${addLeftPad}`, onClick: onEditClick },
                React.createElement(utils_js_1.EditPencil, null)))),
        React.createElement("textarea", { className: "gdg-md-edit-textarea gdg-input", autoFocus: true })));
};
exports.MarkdownOverlayEditor = MarkdownOverlayEditor;
//# sourceMappingURL=markdown-overlay-editor.js.map