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
const utils_js_1 = require("../../../common/utils.js");
const React = __importStar(require("react"));
const growing_entry_js_1 = require("../../growing-entry/growing-entry.js");
const uri_overlay_editor_style_js_1 = require("./uri-overlay-editor-style.js");
const UriOverlayEditor = p => {
    const { uri, onChange, forceEditMode, readonly, validatedSelection, preview } = p;
    const [editMode, setEditMode] = React.useState(!readonly && (uri === "" || forceEditMode));
    const onEditClick = React.useCallback(() => {
        setEditMode(true);
    }, []);
    if (editMode) {
        return (React.createElement(growing_entry_js_1.GrowingEntry, { validatedSelection: validatedSelection, highlight: true, autoFocus: true, value: uri, onChange: onChange }));
    }
    return (React.createElement(uri_overlay_editor_style_js_1.UriOverlayEditorStyle, null,
        React.createElement("a", { className: "gdg-link-area", href: uri, target: "_blank", rel: "noopener noreferrer" }, preview),
        !readonly && (React.createElement("div", { className: "gdg-edit-icon", onClick: onEditClick },
            React.createElement(utils_js_1.EditPencil, null))),
        React.createElement("textarea", { className: "gdg-input", autoFocus: true })));
};
exports.default = UriOverlayEditor;
//# sourceMappingURL=uri-overlay-editor.js.map