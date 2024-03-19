import * as React from "react";
import { BubblesOverlayEditorStyle } from "./bubbles-overlay-editor-style.js";

interface Props {
    readonly bubbles: readonly string[];
}

const BubblesOverlayEditor: React.FunctionComponent<Props> = p => {
    const { bubbles } = p;
    return (
        <BubblesOverlayEditorStyle>
            {bubbles.map((b, i) => (
                <div key={i} className="boe-bubble">
                    {b}
                </div>
            ))}
        </BubblesOverlayEditorStyle>
    );
};
export default BubblesOverlayEditor;
