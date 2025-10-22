import { EditPencil } from "../../../common/utils.js";
import * as React from "react";
import { GrowingEntry } from "../../growing-entry/growing-entry.js";
import { UriOverlayEditorStyle } from "./uri-overlay-editor-style.js";
const UriOverlayEditor = p => {
    const { uri, onChange, forceEditMode, readonly, validatedSelection, preview } = p;
    const [editMode, setEditMode] = React.useState(!readonly && (uri === "" || forceEditMode));
    const onEditClick = React.useCallback(() => {
        setEditMode(true);
    }, []);
    if (editMode) {
        return (React.createElement(GrowingEntry, { validatedSelection: validatedSelection, highlight: true, autoFocus: true, value: uri, onChange: onChange }));
    }
    return (React.createElement(UriOverlayEditorStyle, null,
        React.createElement("a", { className: "gdg-link-area", href: uri, target: "_blank", rel: "noopener noreferrer" }, preview),
        !readonly && (React.createElement("div", { className: "gdg-edit-icon", onClick: onEditClick },
            React.createElement(EditPencil, null))),
        React.createElement("textarea", { className: "gdg-input", autoFocus: true })));
};
export default UriOverlayEditor;
//# sourceMappingURL=uri-overlay-editor.js.map