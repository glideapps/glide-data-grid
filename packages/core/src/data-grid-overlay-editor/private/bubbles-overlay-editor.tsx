import * as React from "react";
import { BubblesOverlayEditorStyle } from "./bubbles-overlay-editor-style";

interface Props {
    readonly bubbles: readonly string[];
    readonly onKeyDown: (event: React.KeyboardEvent) => void;
}

const BubblesOverlayEditor: React.FunctionComponent<Props> = p => {
    const { bubbles, onKeyDown } = p;
    return (
        <BubblesOverlayEditorStyle>
            {bubbles.map((b, i) => (
                <div key={i} className="boe-bubble">
                    {b}
                </div>
            ))}
            <textarea className="gdg-input" autoFocus={true} onKeyDown={onKeyDown} />
        </BubblesOverlayEditorStyle>
    );
};
export default BubblesOverlayEditor;
