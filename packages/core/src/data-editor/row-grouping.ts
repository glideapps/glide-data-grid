import React from "react";
import type { Theme } from "../common/styles.js";
import type { DataEditorProps } from "./data-editor.js";
import type { DataGridProps } from "../internal/data-grid/data-grid.js";
import { whenDefined } from "../common/utils.js";

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
    //readonly makeGroupHeadersSticky?: boolean;

    /**
     * The height of the group headers. All group headers must have the same height.
     */
    readonly height: number;

    /**
     * Enables or disables the drawing of borders inside of group headers.
     * @defaultValue true
     */
    //readonly verticalBorders?: boolean;

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

export function expandRowGroups(groups: readonly RowGroup[]): ExpandedRowGroup[] {
    function processGroup(group: RowGroup, depth: number, path: readonly number[]): ExpandedRowGroup {
        if (typeof group === "number") {
            return {
                headerIndex: group,
                isCollapsed: false,
                depth,
                path,
            };
        }

        const expandedGroup: ExpandedRowGroup = {
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

    const expanded: ExpandedRowGroup[] = groups.map((group, i) => processGroup(group, 0, [i]));

    // Sort the top-level expanded groups
    return expanded.sort((a, b) => a.headerIndex - b.headerIndex);
}

export interface FlattenedRowGroup {
    readonly headerIndex: number;
    readonly contentIndex: number; // the content index of the first row in the group
    readonly isCollapsed: boolean;
    readonly depth: number;
    readonly rows: number;
    readonly path: readonly number[];
}

interface SkippableFlattenedRowGroup extends FlattenedRowGroup {
    readonly skip: boolean;
}

export function flattenRowGroups(rowGrouping: RowGroupingOptions, rows: number): FlattenedRowGroup[] {
    const flattened: SkippableFlattenedRowGroup[] = [];

    function processGroup(
        group: ExpandedRowGroup,
        nextHeaderIndex: number | null,
        skipChildren: boolean = false
    ): void {
        let rowsInGroup = nextHeaderIndex !== null ? nextHeaderIndex - group.headerIndex : rows - group.headerIndex;
        if (group.subGroups !== undefined) {
            rowsInGroup = group.subGroups[0].headerIndex - group.headerIndex;
        }

        rowsInGroup--; // the header isn't in the group

        flattened.push({
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
                const nextSubHeaderIndex =
                    i < group.subGroups.length - 1 ? group.subGroups[i + 1].headerIndex : nextHeaderIndex;
                processGroup(group.subGroups[i], nextSubHeaderIndex, skipChildren || group.isCollapsed);
            }
        }
    }

    const expandedGroups = expandRowGroups(rowGrouping.groups);

    for (let i = 0; i < expandedGroups.length; i++) {
        const nextHeaderIndex = i < expandedGroups.length - 1 ? expandedGroups[i + 1].headerIndex : null;
        processGroup(expandedGroups[i], nextHeaderIndex);
    }

    let contentIndex = 0;
    for (const g of flattened) {
        (g as any).contentIndex = contentIndex;
        contentIndex += g.rows;
    }

    return flattened
        .filter(x => x.skip === false)
        .map(x => {
            const { skip, ...rest } = x;
            return rest;
        });
}

interface MapResult {
    readonly path: readonly number[];
    readonly isGroupHeader: boolean;
    readonly originalIndex: number;
    readonly groupIndex: number;
    readonly groupRows: number;
    readonly contentIndex: number;
}

// grid relative index to path and other details
export function mapRowIndexToPath(row: number, flattenedRowGroups?: readonly FlattenedRowGroup[]): MapResult {
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
        toGo--;
        if (!group.isCollapsed) {
            if (toGo < group.rows)
                return {
                    path: [...group.path, toGo],
                    originalIndex: group.headerIndex + toGo,
                    isGroupHeader: false,
                    groupIndex: toGo,
                    contentIndex: group.contentIndex + toGo,
                    groupRows: group.rows,
                };
            toGo -= group.rows;
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

export interface UseRowGroupingInnerResult {
    readonly rows: number;
    readonly rowNumberMapper: (row: number) => number | undefined;
    readonly rowHeight: NonNullable<DataEditorProps["rowHeight"]>;
    readonly getRowThemeOverride: DataGridProps["getRowThemeOverride"];
}

export function useRowGroupingInner(
    options: RowGroupingOptions | undefined,
    rows: number,
    rowHeightIn: NonNullable<DataEditorProps["rowHeight"]>,
    getRowThemeOverrideIn: DataEditorProps["getRowThemeOverride"]
): UseRowGroupingInnerResult {
    const flattenedRowGroups = React.useMemo(
        () => (options === undefined ? undefined : flattenRowGroups(options, rows)),
        [options, rows]
    );

    const effectiveRows = React.useMemo(() => {
        if (flattenedRowGroups === undefined) return rows;
        return flattenedRowGroups.reduce((acc, group) => acc + (group.isCollapsed ? 1 : group.rows + 1), 0);
    }, [flattenedRowGroups, rows]);

    const rowHeight = React.useMemo(() => {
        if (options === undefined) return rowHeightIn;
        if (typeof rowHeightIn === "number" && options.height === rowHeightIn) return rowHeightIn;
        return (rowIndex: number) => {
            const { isGroupHeader } = mapRowIndexToPath(rowIndex, flattenedRowGroups);
            if (isGroupHeader) return options.height;
            return typeof rowHeightIn === "number" ? rowHeightIn : rowHeightIn(rowIndex);
        };
    }, [flattenedRowGroups, options, rowHeightIn]);

    const rowNumberMapperOut = React.useCallback(
        (row: number): number | undefined => {
            if (flattenedRowGroups === undefined) return row;
            let toGo = row;

            for (const group of flattenedRowGroups) {
                if (toGo === 0) return undefined;
                toGo--;
                if (!group.isCollapsed) {
                    if (toGo < group.rows) return group.contentIndex + toGo;
                    toGo -= group.rows;
                }
            }

            return row;
        },
        [flattenedRowGroups]
    );

    const getRowThemeOverride = whenDefined(
        getRowThemeOverrideIn ?? options?.themeOverride,
        React.useCallback(
            (row: number): Partial<Theme> | undefined => {
                if (options === undefined) return getRowThemeOverrideIn?.(row, row, row);
                if (getRowThemeOverrideIn === undefined && options?.themeOverride === undefined) return undefined;
                const { isGroupHeader, contentIndex, groupIndex } = mapRowIndexToPath(row, flattenedRowGroups);
                if (isGroupHeader) return options.themeOverride;
                return getRowThemeOverrideIn?.(row, groupIndex, contentIndex);
            },
            [flattenedRowGroups, getRowThemeOverrideIn, options]
        )
    );

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
