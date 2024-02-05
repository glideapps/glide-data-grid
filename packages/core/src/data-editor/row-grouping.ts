import React from "react";
import type { Theme } from "../common/styles.js";
import type { GridCell, Item } from "../internal/data-grid/data-grid-types.js";
import type { DataEditorProps } from "./data-editor.js";

export type RowGroup = {
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
    readonly makeGroupHeadersSticky?: boolean;

    /**
     * The height of the group headers. All group headers must have the same height.
     */
    readonly height: number;

    /**
     * Enables or disables the drawing of borders inside of group headers.
     * @defaultValue true
     */
    readonly verticalBorders?: boolean;

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

function expandRowGroups(groups: readonly RowGroup[]): ExpandedRowGroup[] {
    const expanded: ExpandedRowGroup[] = [];

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
            expandedGroup.subGroups = group.subGroups.map((x, ind) => processGroup(x, depth + 1, [...path, ind]));
        }

        return expandedGroup;
    }

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        expanded.push(processGroup(group, 0, [i]));
    }

    return expanded;
}

export type FlattenedRowGroup = {
    readonly headerIndex: number;
    readonly isCollapsed: boolean;
    readonly depth: number;
    readonly rows: number;
    readonly path: readonly number[];
};

export function flattenRowGroups(rowGrouping: RowGroupingOptions, rows: number): FlattenedRowGroup[] {
    if (rowGrouping === undefined) return [];

    const flattened: FlattenedRowGroup[] = [];

    function processGroup(group: ExpandedRowGroup, nextHeaderIndex: number | null): void {
        let rowsInGroup = nextHeaderIndex !== null ? nextHeaderIndex - group.headerIndex : rows - group.headerIndex;
        if (!group.isCollapsed && group.subGroups !== undefined) {
            rowsInGroup = group.subGroups[0].headerIndex - group.headerIndex;
        }

        flattened.push({
            headerIndex: group.headerIndex,
            isCollapsed: group.isCollapsed,
            depth: group.depth,
            path: group.path,
            rows: rowsInGroup,
        });

        if (!group.isCollapsed && group.subGroups) {
            for (let i = 0; i < group.subGroups.length; i++) {
                const nextSubHeaderIndex =
                    i < group.subGroups.length - 1 ? group.subGroups[i + 1].headerIndex : nextHeaderIndex;
                processGroup(group.subGroups[i], nextSubHeaderIndex);
            }
        }
    }

    const expandedGroups = expandRowGroups(rowGrouping.groups);

    for (let i = 0; i < expandedGroups.length; i++) {
        const nextHeaderIndex = i < expandedGroups.length - 1 ? expandedGroups[i + 1].headerIndex : null;
        processGroup(expandedGroups[i], nextHeaderIndex);
    }

    return flattened;
}

export function mapRowIndexToPath(row: number, flattenedRowGroups?: readonly FlattenedRowGroup[]) {
    if (flattenedRowGroups === undefined)
        return {
            path: [row],
            sourceRow: row,
            isGroupHeader: false,
        };

    let toGo = row;
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
        path: [row],
        sourceRow: row,
        isGroupHeader: false,
    };
}

export interface UseRowGroupingInnerResult {
    readonly rows: number;
    readonly getCellContent: (cell: Item) => GridCell;
    readonly rowNumberMapper: (row: number) => number | undefined;
    readonly rowHeight: NonNullable<DataEditorProps["rowHeight"]>;
}

export function useRowGroupingInner(
    options: RowGroupingOptions | undefined,
    rows: number,
    getCellContentIn: DataEditorProps["getCellContent"],
    rowHeightIn: NonNullable<DataEditorProps["rowHeight"]>
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

    const rowNumberMapper = React.useCallback(
        (row: number): number => {
            if (flattenedRowGroups === undefined) return row;
            let resultRow = 0;
            let toGo = row;

            for (const group of flattenedRowGroups) {
                if (toGo === 0) resultRow;
                toGo--;
                resultRow++;
                if (!group.isCollapsed) {
                    if (toGo < group.rows) return resultRow + toGo;
                    toGo -= group.rows;
                    resultRow += group.rows;
                }
            }

            return row;
        },
        [flattenedRowGroups]
    );

    const rowNumberMapperOut = React.useCallback(
        (row: number): number | undefined => {
            if (flattenedRowGroups === undefined) return row;
            let resultRow = 0;
            let toGo = row;

            for (const group of flattenedRowGroups) {
                if (toGo === 0) return undefined;
                toGo--;
                if (!group.isCollapsed) {
                    if (toGo < group.rows) return resultRow + toGo;
                    toGo -= group.rows;
                }
                resultRow += group.rows;
            }

            return row;
        },
        [flattenedRowGroups]
    );

    const getCellContentOut = React.useCallback(
        (cell: Item) => {
            if (options === undefined) return getCellContentIn(cell);
            const mapped = rowNumberMapper(cell[1]);
            return getCellContentIn([cell[0], mapped]);
        },
        [getCellContentIn, options, rowNumberMapper]
    );

    if (options === undefined)
        return {
            rowHeight,
            getCellContent: getCellContentIn,
            rows: rows,
            rowNumberMapper: rowNumberMapperOut,
        };

    return {
        rowHeight,
        getCellContent: getCellContentOut,
        rows: effectiveRows,
        rowNumberMapper: rowNumberMapperOut,
    };
}
