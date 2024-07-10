import * as React from "react";
import MarkdownDiv from "../../markdown-div/markdown-div.js";
import { GrowingEntry } from "../../growing-entry/growing-entry.js";
import { MarkdownOverlayEditorStyle } from "./markdown-overlay-editor-style.js";
import { EditPencil, Checkmark } from "../../../common/utils.js";
export const MarkdownOverlayEditor = p => {
    const { value, onChange, forceEditMode, createNode, targetRect, onFinish, validatedSelection } = p;
    const markdown = value.data;
    const readonly = value.readonly === true;
    const [editMode, setEditMode] = React.useState(markdown === "" || forceEditMode);
    const onEditClick = React.useCallback(() => {
        setEditMode(e => !e);
    }, []);
    const addLeftPad = markdown ? "gdg-ml-6" : "";
    if (editMode) {
        return (React.createElement(MarkdownOverlayEditorStyle, { targetWidth: targetRect.width - 20 },
            React.createElement(GrowingEntry, { autoFocus: true, highlight: false, validatedSelection: validatedSelection, value: markdown, onKeyDown: e => {
                    if (e.key === "Enter")
                        e.stopPropagation();
                }, onChange: onChange }),
            React.createElement("div", { className: `gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`, onClick: () => onFinish(value) },
                React.createElement(Checkmark, null))));
    }
    return (React.createElement(MarkdownOverlayEditorStyle, { targetWidth: targetRect.width },
        React.createElement(MarkdownDiv, { contents: markdown, createNode: createNode }),
        !readonly && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "spacer" }),
            React.createElement("div", { className: `gdg-edit-icon gdg-edit-hover ${addLeftPad}`, onClick: onEditClick },
                React.createElement(EditPencil, null)))),
        React.createElement("textarea", { className: "gdg-md-edit-textarea gdg-input", autoFocus: true })));
};
//# sourceMappingURL=markdown-overlay-editor.js.map