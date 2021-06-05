import * as React from "react";
import { Subtract } from "utility-types";
import { DataGridProps, DataGridRef } from "../data-grid/data-grid";
import { GridColumn } from "../data-grid/data-grid-types";
interface Handled {
    readonly dragAndDropState?: {
        src: number;
        dest: number;
    };
    readonly onMouseMove?: (event: MouseEvent) => void;
}
export interface DataGridDndProps extends Subtract<DataGridProps, Handled> {
    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;
    readonly onColumnResized?: (column: GridColumn, newSize: number) => void;
    readonly gridRef?: React.Ref<DataGridRef>;
    readonly maxColumnWidth?: number;
}
declare const DataGridDnd: React.FunctionComponent<DataGridDndProps>;
export default DataGridDnd;
//# sourceMappingURL=data-grid-dnd.d.ts.map