import * as React from "react";
interface Props {
    readonly markdown: string;
    readonly onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
    createNode?: (content: string) => DocumentFragment;
}
declare const MarkdownOverlayEditor: React.FunctionComponent<Props>;
export default MarkdownOverlayEditor;
//# sourceMappingURL=markdown-overlay-editor.d.ts.map