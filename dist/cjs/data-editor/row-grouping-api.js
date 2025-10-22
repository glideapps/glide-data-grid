import React from "react";
import { flattenRowGroups, mapRowIndexToPath } from "./row-grouping.js";
export function useRowGrouping(options, rows) {
    const flattenedRowGroups = React.useMemo(() => (options === undefined ? undefined : flattenRowGroups(options, rows)), [options, rows]);
    return {
        getRowGroupingForPath,
        updateRowGroupingByPath,
        mapper: React.useCallback((itemOrRow) => {
            if (typeof itemOrRow === "number") {
                return mapRowIndexToPath(itemOrRow, flattenedRowGroups);
            }
            const r = mapRowIndexToPath(itemOrRow[1], flattenedRowGroups);
            return {
                ...r,
                originalIndex: [itemOrRow[0], r.originalIndex],
            }; // FIXME
        }, [flattenedRowGroups]),
    };
}
export function updateRowGroupingByPath(rowGrouping, path, update) {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping.map((group, i) => (i === index ? { ...group, ...update } : group));
    }
    return rowGrouping.map((group, i) => i === index ? { ...group, subGroups: updateRowGroupingByPath(group.subGroups ?? [], rest, update) } : group);
}
export function getRowGroupingForPath(rowGrouping, path) {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping[index];
    }
    return getRowGroupingForPath(rowGrouping[index].subGroups ?? [], rest);
}
//# sourceMappingURL=row-grouping-api.js.map