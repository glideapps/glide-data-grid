import * as React from "react";
import { type Theme } from "../../common/styles.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import { type EditableGridCell, type GridCell, type Item, type ProvideEditorCallback, type Rectangle, type ValidatedGridCell } from "../data-grid/data-grid-types.js";
import type { CellActivatedEventArgs } from "../data-grid/event-args.js";
import type { OverlayImageEditorProps } from "./private/image-overlay-editor.js";
type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;
interface DataGridOverlayEditorProps {
    readonly target: Rectangle;
    readonly cell: Item;
    readonly content: GridCell;
    readonly className?: string;
    readonly id: string;
    readonly initialValue?: string;
    readonly bloom?: readonly [number, number];
    readonly theme: Theme;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
    readonly highlight: boolean;
    readonly portalElementRef?: React.RefObject<HTMLElement>;
    readonly imageEditorOverride?: ImageEditorType;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly provideEditor?: ProvideEditorCallback<GridCell>;
    readonly activation: CellActivatedEventArgs;
    readonly validateCell?: (cell: Item, newValue: EditableGridCell, prevValue: GridCell) => boolean | ValidatedGridCell;
    readonly isOutsideClick?: (e: MouseEvent | TouchEvent) => boolean;
    readonly customEventTarget?: HTMLElement | Window | Document;
}
declare const DataGridOverlayEditor: React.FunctionComponent<DataGridOverlayEditorProps>;
export default DataGridOverlayEditor;
//# sourceMappingURL=data-grid-overlay-editor.d.ts.map