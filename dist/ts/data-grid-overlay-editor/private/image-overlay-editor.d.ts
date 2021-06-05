import * as React from "react";
export interface OverlayImageEditorProps {
    readonly urls: readonly string[];
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onKeyDown: (event: React.KeyboardEvent) => void;
    readonly onEditClick?: () => void;
    readonly renderImage?: (url: string) => React.ReactNode;
}
declare const ImageOverlayEditor: React.FunctionComponent<OverlayImageEditorProps>;
export default ImageOverlayEditor;
//# sourceMappingURL=image-overlay-editor.d.ts.map