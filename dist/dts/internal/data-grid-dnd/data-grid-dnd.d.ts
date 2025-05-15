import * as React from "react";
import { type DataGridProps, type DataGridRef } from "../data-grid/data-grid.js";
import type { GridColumn } from "../data-grid/data-grid-types.js";
type Props = Omit<DataGridProps, "dragAndDropState" | "isResizing" | "isDragging" | "onMouseMoveRaw" | "allowResize" | "resizeColumn">;
export interface DataGridDndProps extends Props {
    /**
     * Called whenever a row re-order operation is completed. Setting the callback enables re-ordering by dragging the
     * first column of a row.
     * @group Drag and Drop
     */
    readonly onRowMoved?: (startIndex: number, endIndex: number) => void;
    /**
     * Called when the user finishes moving a column. `startIndex` is the index of the column that was moved, and
     * `endIndex` is the index at which it should end up. Note that you have to effect the move of the column, and pass
     * the reordered columns back in the `columns` property.
     * @group Drag and Drop
     */
    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;
    /**
     * Called when the user is dragging a column and proposes to move it to a new location. Return `false` to prevent
     * @param startIndex
     * @param endIndex
     * @group Drag and Drop
     */
    readonly onColumnProposeMove?: (startIndex: number, endIndex: number) => boolean;
    /**
     * Called when the user is resizing a column. `newSize` is the new size of the column. Note that you have change
     * the size of the column in the `GridColumn` and pass it back to the grid in the `columns` property.
     * @group Drag and Drop
     * @param column The `GridColumn` being resized
     * @param newSize The new size of the grid column
     * @param colIndex The index of the column
     * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
     */
    readonly onColumnResize?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    /**
     * Called when the user starts resizing a column. `newSize` is the new size of the column.
     * @group Drag and Drop
     * @param column The `GridColumn` being resized
     * @param newSize The new size of the grid column
     * @param colIndex The index of the column
     * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
     */
    readonly onColumnResizeStart?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    /**
     * Called when the user finishes resizing a column. `newSize` is the new size of the column.
     * @group Drag and Drop
     * @param column The `GridColumn` being resized
     * @param newSize The new size of the grid column
     * @param colIndex The index of the column
     * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
     */
    readonly onColumnResizeEnd?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    readonly gridRef?: React.MutableRefObject<DataGridRef | null>;
    readonly maxColumnWidth: number;
    readonly minColumnWidth: number;
    readonly lockColumns: number;
}
declare const DataGridDnd: React.FunctionComponent<DataGridDndProps>;
export default DataGridDnd;
//# sourceMappingURL=data-grid-dnd.d.ts.map