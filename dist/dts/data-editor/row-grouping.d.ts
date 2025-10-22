import type { Theme } from "../common/styles.js";
import type { DataEditorProps } from "./data-editor.js";
import type { DataGridProps } from "../internal/data-grid/data-grid.js";
export type RowGroup = {
    /**
     * The index of the header if the groups are all flattened and expanded
     */
    readonly headerIndex: number;
    readonly isCollapsed: boolean;
    readonly subGroups?: readonly RowGroup[];
};
export interface RowGroupingOptions {
    /**
     * The indexes of the rows of the grid which are group headers and their collapse state. If a number is provided
     * instead of an object, the group header will not be collapsed.
     */
    readonly groups: readonly RowGroup[];
    /**
     * Causes the group headers to collect at the top of the grid. Each replacing the last.
     */
    /**
     * The height of the group headers. All group headers must have the same height.
     */
    readonly height: number;
    /**
     * Enables or disables the drawing of borders inside of group headers.
     * @defaultValue true
     */
    /**
     * Overrides the default theme of the group headers.
     */
    readonly themeOverride?: Partial<Theme>;
    /**
     * Controls the navigation behavior of the grid. If `skip` is provided the grid will skip over the group headers
     * when the user selects a new cell. If `skip-up` or `skip-down` is provided the grid will skip over the group
     * headers when the user navigates up or down.
     *
     * If a group header is marked block, it will act like skip, but clicking on it will also not result in selection
     *  a cell when clicked.
     */
    readonly navigationBehavior?: "normal" | "skip" | "skip-up" | "skip-down" | "block";
    /**
     * Controls the selection behavior of the grid. If spanning is allowed group headers act like any other cells. If
     * spanning is not allowed selections will be unable to span group headers.
     */
    readonly selectionBehavior?: "allow-spanning" | "block-spanning";
}
export type ExpandedRowGroup = {
    readonly headerIndex: number;
    readonly isCollapsed: boolean;
    readonly depth: number;
    readonly path: readonly number[];
    subGroups?: readonly ExpandedRowGroup[];
};
export declare function expandRowGroups(groups: readonly RowGroup[]): ExpandedRowGroup[];
export interface FlattenedRowGroup {
    readonly rowIndex: number;
    readonly headerIndex: number;
    readonly contentIndex: number;
    readonly isCollapsed: boolean;
    readonly depth: number;
    readonly rows: number;
    readonly path: readonly number[];
}
export declare function flattenRowGroups(rowGrouping: RowGroupingOptions, rows: number): FlattenedRowGroup[];
export interface MapResult {
    readonly path: readonly number[];
    readonly isGroupHeader: boolean;
    readonly originalIndex: number;
    readonly groupIndex: number;
    readonly groupRows: number;
    readonly contentIndex: number;
}
export declare function mapRowIndexToPath(row: number, flattenedRowGroups?: readonly FlattenedRowGroup[]): MapResult;
export interface UseRowGroupingInnerResult {
    readonly rows: number;
    readonly rowNumberMapper: (row: number) => number | undefined;
    readonly rowHeight: NonNullable<DataEditorProps["rowHeight"]>;
    readonly getRowThemeOverride: DataGridProps["getRowThemeOverride"];
}
export declare function useRowGroupingInner(options: RowGroupingOptions | undefined, rows: number, rowHeightIn: NonNullable<DataEditorProps["rowHeight"]>, getRowThemeOverrideIn: DataEditorProps["getRowThemeOverride"]): UseRowGroupingInnerResult;
//# sourceMappingURL=row-grouping.d.ts.map