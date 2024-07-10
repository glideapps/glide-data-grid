import type { FullTheme } from "../common/styles.js";
import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import type { GetCellRendererCallback } from "../cells/cell-types.js";
import { type CellArray, type GridColumn, type InnerGridColumn, type SizedGridColumn } from "../internal/data-grid/data-grid-types.js";
export declare function measureColumn(ctx: CanvasRenderingContext2D, theme: FullTheme, c: GridColumn, colIndex: number, selectedData: CellArray, minColumnWidth: number, maxColumnWidth: number, removeOutliers: boolean, getCellRenderer: GetCellRendererCallback): SizedGridColumn;
/** @category Hooks */
export declare function useColumnSizer(columns: readonly GridColumn[], rows: number, getCellsForSelection: DataGridSearchProps["getCellsForSelection"], clientWidth: number, minColumnWidth: number, maxColumnWidth: number, theme: FullTheme, getCellRenderer: GetCellRendererCallback, abortController: AbortController): {
    readonly sizedColumns: readonly InnerGridColumn[];
    readonly nonGrowWidth: number;
};
//# sourceMappingURL=use-column-sizer.d.ts.map