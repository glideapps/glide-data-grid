import * as React from "react";
interface Props {
    readonly uri: string;
    readonly onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readonly forceEditMode: boolean;
}
declare const UriOverlayEditor: React.FunctionComponent<Props>;
export default UriOverlayEditor;
//# sourceMappingURL=uri-overlay-editor.d.ts.map