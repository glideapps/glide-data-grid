import React from "react";
import { whenDefined } from "../common/utils.js";
export function expandRowGroups(groups) {
    function processGroup(group, depth, path) {
        if (typeof group === "number") {
            return {
                headerIndex: group,
                isCollapsed: false,
                depth,
                path,
            };
        }
        const expandedGroup = {
            headerIndex: group.headerIndex,
            isCollapsed: group.isCollapsed,
            depth,
            path,
        };
        if (group.subGroups !== undefined) {
            expandedGroup.subGroups = group.subGroups
                .map((x, ind) => processGroup(x, depth + 1, [...path, ind]))
                .sort((a, b) => a.headerIndex - b.headerIndex);
        }
        return expandedGroup;
    }
    const expanded = groups.map((group, i) => processGroup(group, 0, [i]));
    // Sort the top-level expanded groups
    return expanded.sort((a, b) => a.headerIndex - b.headerIndex);
}
export function flattenRowGroups(rowGrouping, rows) {
    const flattened = [];
    function processGroup(group, nextHeaderIndex, skipChildren = false) {
        let rowsInGroup = nextHeaderIndex !== null ? nextHeaderIndex - group.headerIndex : rows - group.headerIndex;
        if (group.subGroups !== undefined) {
            rowsInGroup = group.subGroups[0].headerIndex - group.headerIndex;
        }
        rowsInGroup--; // the header isn't in the group
        flattened.push({
            rowIndex: -1, // we will fill this in later
            headerIndex: group.headerIndex,
            contentIndex: -1, // we will fill this in later
            skip: skipChildren,
            isCollapsed: group.isCollapsed,
            depth: group.depth,
            path: group.path,
            rows: rowsInGroup,
        });
        if (group.subGroups) {
            for (let i = 0; i < group.subGroups.length; i++) {
                const nextSubHeaderIndex = i < group.subGroups.length - 1 ? group.subGroups[i + 1].headerIndex : nextHeaderIndex;
                processGroup(group.subGroups[i], nextSubHeaderIndex, skipChildren || group.isCollapsed);
            }
        }
    }
    const expandedGroups = expandRowGroups(rowGrouping.groups);
    for (let i = 0; i < expandedGroups.length; i++) {
        const nextHeaderIndex = i < expandedGroups.length - 1 ? expandedGroups[i + 1].headerIndex : null;
        processGroup(expandedGroups[i], nextHeaderIndex);
    }
    let rowIndex = 0;
    let contentIndex = 0;
    for (const g of flattened) {
        g.contentIndex = contentIndex;
        contentIndex += g.rows;
        g.rowIndex = rowIndex;
        rowIndex += g.isCollapsed ? 1 : g.rows + 1;
    }
    return flattened
        .filter(x => x.skip === false)
        .map(x => {
        const { skip, ...rest } = x;
        return rest;
    });
}
// grid relative index to path and other details
export function mapRowIndexToPath(row, flattenedRowGroups) {
    if (flattenedRowGroups === undefined || flattenRowGroups.length === 0)
        return {
            path: [row],
            originalIndex: row,
            isGroupHeader: false,
            groupIndex: row,
            contentIndex: row,
            groupRows: -1,
        };
    let toGo = row;
    for (const group of flattenedRowGroups) {
        if (toGo === 0)
            return {
                path: [...group.path, -1],
                originalIndex: group.headerIndex,
                isGroupHeader: true,
                groupIndex: -1,
                contentIndex: -1,
                groupRows: group.rows,
            };
        if (!group.isCollapsed) {
            if (toGo <= group.rows)
                return {
                    path: [...group.path, toGo - 1],
                    originalIndex: group.headerIndex + toGo,
                    isGroupHeader: false,
                    groupIndex: toGo - 1,
                    contentIndex: group.contentIndex + toGo - 1,
                    groupRows: group.rows,
                };
            toGo = toGo - group.rows - 1;
        }
        else {
            toGo--;
        }
    }
    // this shouldn't happen
    // this is a fucking awful code smell. Probably means the algorithm above is trash and can be done better.
    // I suppose to eliminate this, you can treat this case as part of the overflow of the last group.
    return {
        path: [row],
        originalIndex: row,
        isGroupHeader: false,
        groupIndex: row,
        contentIndex: row,
        groupRows: -1,
    };
}
export function useRowGroupingInner(options, rows, rowHeightIn, getRowThemeOverrideIn) {
    const flattenedRowGroups = React.useMemo(() => (options === undefined ? undefined : flattenRowGroups(options, rows)), [options, rows]);
    const flattenedRowGroupsMap = React.useMemo(() => {
        return flattenedRowGroups?.reduce((acc, group) => {
            acc[group.rowIndex] = group;
            return acc;
        }, {});
    }, [flattenedRowGroups]);
    const effectiveRows = React.useMemo(() => {
        if (flattenedRowGroups === undefined)
            return rows;
        return flattenedRowGroups.reduce((acc, group) => acc + (group.isCollapsed ? 1 : group.rows + 1), 0);
    }, [flattenedRowGroups, rows]);
    const rowHeight = React.useMemo(() => {
        if (options === undefined)
            return rowHeightIn;
        if (typeof rowHeightIn === "number" && options.height === rowHeightIn)
            return rowHeightIn;
        return (rowIndex) => {
            if (flattenedRowGroupsMap?.[rowIndex])
                return options.height;
            return typeof rowHeightIn === "number" ? rowHeightIn : rowHeightIn(rowIndex);
        };
    }, [flattenedRowGroupsMap, options, rowHeightIn]);
    const rowNumberMapperOut = React.useCallback((row) => {
        if (flattenedRowGroups === undefined)
            return row;
        let toGo = row;
        for (const group of flattenedRowGroups) {
            if (toGo === 0)
                return undefined;
            toGo--;
            if (!group.isCollapsed) {
                if (toGo < group.rows)
                    return group.contentIndex + toGo;
                toGo -= group.rows;
            }
        }
        return row;
    }, [flattenedRowGroups]);
    const getRowThemeOverride = whenDefined(getRowThemeOverrideIn ?? options?.themeOverride, React.useCallback((row) => {
        if (options === undefined)
            return getRowThemeOverrideIn?.(row, row, row);
        if (getRowThemeOverrideIn === undefined && options?.themeOverride === undefined)
            return undefined;
        const { isGroupHeader, contentIndex, groupIndex } = mapRowIndexToPath(row, flattenedRowGroups);
        if (isGroupHeader)
            return options.themeOverride;
        return getRowThemeOverrideIn?.(row, groupIndex, contentIndex);
    }, [flattenedRowGroups, getRowThemeOverrideIn, options]));
    if (options === undefined)
        return {
            rowHeight,
            rows: rows,
            rowNumberMapper: rowNumberMapperOut,
            getRowThemeOverride,
        };
    return {
        rowHeight,
        rows: effectiveRows,
        rowNumberMapper: rowNumberMapperOut,
        getRowThemeOverride,
    };
}
//# sourceMappingURL=row-grouping.js.map