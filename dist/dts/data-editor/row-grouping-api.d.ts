import type { Item } from "../internal/data-grid/data-grid-types.js";
import { type RowGroup, type RowGroupingOptions } from "./row-grouping.js";
export type RowGroupingMapperResult<T> = {
    path: readonly number[];
    originalIndex: T;
    isGroupHeader: boolean;
    groupRows: number;
};
export type RowGroupingMapper = {
    (itemOrRow: number): RowGroupingMapperResult<number>;
    (itemOrRow: Item): RowGroupingMapperResult<Item>;
};
export interface UseRowGroupingResult {
    readonly mapper: RowGroupingMapper;
    readonly updateRowGroupingByPath: (rowGrouping: readonly RowGroup[], path: readonly number[], update: Partial<RowGroup>) => readonly RowGroup[];
    readonly getRowGroupingForPath: (rowGrouping: readonly RowGroup[], path: readonly number[]) => RowGroup;
}
export declare function useRowGrouping(options: RowGroupingOptions | undefined, rows: number): UseRowGroupingResult;
export declare function updateRowGroupingByPath(rowGrouping: readonly RowGroup[], path: readonly number[], update: Partial<RowGroup>): readonly RowGroup[];
export declare function getRowGroupingForPath(rowGrouping: readonly RowGroup[], path: readonly number[]): RowGroup;
//# sourceMappingURL=row-grouping-api.d.ts.map