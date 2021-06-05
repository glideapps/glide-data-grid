import * as React from "react";
import { GridCell, Rectangle } from "../data-grid/data-grid-types";
import { OverlayImageEditorProps } from "./private/image-overlay-editor";
declare type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;
interface Props {
    readonly target: Rectangle;
    readonly content: GridCell;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
}
declare const DataGridOverlayEditor: React.FunctionComponent<Props>;
export default DataGridOverlayEditor;
//# sourceMappingURL=data-grid-overlay-editor.d.ts.map