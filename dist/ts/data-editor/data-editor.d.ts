import * as React from "react";
import { Subtract } from "utility-types";
import { EditableGridCell, GridKeyEventArgs, GridMouseEventArgs, GridSelection, RowSelection, Rectangle, ColumnSelection } from "../data-grid/data-grid-types";
import { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor";
import { DataGridRef } from "data-grid/data-grid";
interface Handled {
    readonly firstColSticky: boolean;
    readonly headerHeight: number;
    readonly rowHeight: number | ((index: number) => number);
    readonly className?: string;
    readonly selectedColumns?: readonly number[];
    readonly selectedCell?: GridSelection;
    readonly onItemHovered?: (args: GridMouseEventArgs) => void;
    readonly onMouseDown?: (args: GridMouseEventArgs) => void;
    readonly onMouseUp?: (args: GridMouseEventArgs) => void;
    readonly onKeyDown?: (event: GridKeyEventArgs) => void;
    readonly onKeyUp?: (event: GridKeyEventArgs) => void;
    readonly onCellFocused?: (args: readonly [number, number]) => void;
    readonly canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
    readonly onSearchResultsChanged?: (results: readonly (readonly [number, number])[], navIndex: number) => void;
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
    readonly searchColOffset: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX?: number;
    readonly translateY?: number;
    readonly gridRef?: React.Ref<DataGridRef>;
}
declare type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;
export interface DataEditorProps extends Subtract<DataGridSearchProps, Handled> {
    readonly onDeleteRows?: (rows: readonly number[]) => void;
    readonly onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onRowAppended?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onCellClicked?: (cell: readonly [number, number]) => void;
    readonly rowMarkers?: boolean;
    readonly showTrailingBlankRow?: boolean;
    readonly headerHeight?: number;
    readonly rowHeight?: number;
    readonly rowMarkerWidth?: number;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly cellXOffset?: number;
    readonly cellYOffset?: number;
    readonly selectedRows?: RowSelection;
    readonly onSelectedRowsChange?: (newRows: RowSelection | undefined) => void;
    readonly onRowSelected?: (row: number | undefined) => void;
    readonly onRowDeselected?: (row: number | undefined) => void;
    readonly selectedColumns?: ColumnSelection;
    readonly onSelectedColumnsChange?: (newColumns: ColumnSelection | undefined) => void;
    readonly gridSelection?: GridSelection;
    readonly onGridSelectionChange?: (newSelection: GridSelection | undefined) => void;
    readonly onVisibleRegionChanged?: (range: Rectangle, tx?: number, ty?: number) => void;
}
declare const DataEditor: React.FunctionComponent<DataEditorProps>;
export default DataEditor;
//# sourceMappingURL=data-editor.d.ts.map