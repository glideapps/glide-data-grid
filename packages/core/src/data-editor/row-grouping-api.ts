import React from "react";
import type { Item } from "../internal/data-grid/data-grid-types.js";
import { flattenRowGroups, mapRowIndexToPath, type FlattenedRowGroup, type RowGroup, type RowGroupingOptions } from "./row-grouping.js";

export interface RowGroupingMapperResult<T> {
    path: readonly number[];
    isGroupHeader: boolean;
    groupRows: number;
    originalIndex: T;
    readonly groupIndex: number;
    readonly contentIndex: number;
}

export type RowGroupingMapper = (itemOrRow: number | Item) => RowGroupingMapperResult<Item | number>;

export function rowGroupingMapper(itemOrRow: number, flattenedRowGroups?: readonly FlattenedRowGroup[] | undefined): RowGroupingMapperResult<number>;
export function rowGroupingMapper(itemOrRow: Item, flattenedRowGroups?: readonly FlattenedRowGroup[] | undefined): RowGroupingMapperResult<Item>;
export function rowGroupingMapper(itemOrRow: number | Item, flattenedRowGroups?: readonly FlattenedRowGroup[] | undefined): RowGroupingMapperResult<number> | RowGroupingMapperResult<Item>;
export function rowGroupingMapper(itemOrRow: number | Item, flattenedRowGroups?: readonly FlattenedRowGroup[] | undefined): RowGroupingMapperResult<number> | RowGroupingMapperResult<Item> {
    if (typeof itemOrRow === "number") {
        return mapRowIndexToPath(itemOrRow, flattenedRowGroups);
    }
    const r = mapRowIndexToPath(itemOrRow[1], flattenedRowGroups);
    return {
        ...r,
        originalIndex: [itemOrRow[0], r.originalIndex],
    } as RowGroupingMapperResult<Item>;
};

export interface UseRowGroupingResult {
    readonly mapper: RowGroupingMapper;
    readonly updateRowGroupingByPath: (
        rowGrouping: readonly RowGroup[],
        path: readonly number[],
        update: Partial<RowGroup>
    ) => readonly RowGroup[];
    readonly getRowGroupingForPath: (rowGrouping: readonly RowGroup[], path: readonly number[]) => RowGroup;
}

export function useRowGrouping(options: RowGroupingOptions | undefined, rows: number): UseRowGroupingResult {
    const flattenedRowGroups = React.useMemo(
        () => (options === undefined ? undefined : flattenRowGroups(options, rows)),
        [options, rows]
    );

    return {
        getRowGroupingForPath,
        updateRowGroupingByPath,
        mapper: React.useCallback<UseRowGroupingResult["mapper"]>(
            (itemOrRow: number | Item) => rowGroupingMapper(itemOrRow, flattenedRowGroups),
            [flattenedRowGroups]
        ),
    };
}

export function updateRowGroupingByPath(
    rowGrouping: readonly RowGroup[],
    path: readonly number[],
    update: Partial<RowGroup>
): readonly RowGroup[] {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping.map((group, i) => (i === index ? { ...group, ...update } : group));
    }
    return rowGrouping.map((group, i) =>
        i === index ? { ...group, subGroups: updateRowGroupingByPath(group.subGroups ?? [], rest, update) } : group
    );
}

export function getRowGroupingForPath(rowGrouping: readonly RowGroup[], path: readonly number[]): RowGroup {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping[index];
    }
    return getRowGroupingForPath(rowGrouping[index].subGroups ?? [], rest);
}
