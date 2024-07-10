import * as React from "react";
import { BubblesOverlayEditorStyle } from "./bubbles-overlay-editor-style.js";
const BubblesOverlayEditor = p => {
    const { bubbles } = p;
    return (React.createElement(BubblesOverlayEditorStyle, null,
        bubbles.map((b, i) => (React.createElement("div", { key: i, className: "boe-bubble" }, b))),
        React.createElement("textarea", { className: "gdg-input", autoFocus: true })));
};
export default BubblesOverlayEditor;
//# sourceMappingURL=bubbles-overlay-editor.js.map