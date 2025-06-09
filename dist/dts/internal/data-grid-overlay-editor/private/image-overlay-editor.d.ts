import * as React from "react";
/** @category Types */
export interface OverlayImageEditorProps {
    readonly urls: readonly string[];
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onEditClick?: () => void;
    readonly renderImage?: (url: string) => React.ReactNode;
}
/** @category Renderers */
export declare const ImageOverlayEditor: React.FunctionComponent<OverlayImageEditorProps>;
//# sourceMappingURL=image-overlay-editor.d.ts.map