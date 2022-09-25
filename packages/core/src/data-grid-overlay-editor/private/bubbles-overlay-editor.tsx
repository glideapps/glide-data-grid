import * as React from "react";
import { BubblesOverlayEditorStyle } from "./bubbles-overlay-editor-style";

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
            <textarea className="gdg-input" autoFocus={true} />
        </BubblesOverlayEditorStyle>
    );
};
export default BubblesOverlayEditor;
