import React from "react";
import type { Item } from "../internal/data-grid/data-grid-types.js";
import { flattenRowGroups, type RowGroup, type RowGroupingOptions } from "./row-grouping.js";

type RowGroupingMapper = (itemOrRow: Item | number) => {
    path: readonly number[];
    sourceRow: number;
    isGroupHeader: boolean;
};

interface UseRowGroupingResult {
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
        mapper: React.useCallback(
            (itemOrRow: Item | number) => {
                itemOrRow = typeof itemOrRow === "number" ? itemOrRow : itemOrRow[1];
                if (flattenedRowGroups === undefined)
                    return {
                        path: [itemOrRow],
                        sourceRow: itemOrRow,
                        isGroupHeader: false,
                    };

                let toGo = itemOrRow;
                let sourceRow = 0;
                for (const group of flattenedRowGroups) {
                    if (toGo === 0)
                        return {
                            path: [...group.path, -1],
                            sourceRow,
                            isGroupHeader: true,
                        };
                    toGo--;
                    sourceRow++;
                    if (!group.isCollapsed) {
                        if (toGo < group.rows)
                            return {
                                path: [...group.path, toGo],
                                sourceRow: sourceRow + toGo,
                                isGroupHeader: false,
                            };
                        toGo -= group.rows;
                    }
                    sourceRow += group.rows;
                }
                // this shouldn't happen
                return {
                    path: [itemOrRow],
                    sourceRow: itemOrRow,
                    isGroupHeader: false,
                };
            },
            [flattenedRowGroups]
        ),
    };
}

function updateRowGroupingByPath(
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

function getRowGroupingForPath(rowGrouping: readonly RowGroup[], path: readonly number[]): RowGroup {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping[index];
    }
    return getRowGroupingForPath(rowGrouping[index].subGroups ?? [], rest);
}
