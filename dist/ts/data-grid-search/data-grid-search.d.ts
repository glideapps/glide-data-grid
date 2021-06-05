import * as React from "react";
import { Subtract } from "utility-types";
import { GridCell, Rectangle } from "../data-grid/data-grid-types";
import { ScrollingDataGridProps } from "../scrolling-data-grid/scrolling-data-grid";
interface Handled {
    readonly prelightCells?: readonly (readonly [number, number])[];
}
export interface DataGridSearchProps extends Subtract<ScrollingDataGridProps, Handled> {
    readonly getCellsForSelection?: (selection: Rectangle) => readonly (readonly GridCell[])[];
    readonly onSearchResultsChanged?: (results: readonly (readonly [number, number])[], navIndex: number) => void;
    readonly searchColOffset: number;
}
declare const DataGridSearch: React.FunctionComponent<DataGridSearchProps>;
export default DataGridSearch;
//# sourceMappingURL=data-grid-search.d.ts.map