import React from "react";
import type { Theme } from "../common/styles.js";
import type { GridCell, Item } from "../internal/data-grid/data-grid-types.js";
import type { DataEditorCoreProps } from "../index.js";

export type RowGroup =
    | {
          readonly headerIndex: number;
          readonly isCollapsed: boolean;
          readonly subGroups?: readonly RowGroup[];
      }
    | number;

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
    subGroups?: readonly ExpandedRowGroup[];
};

function expandRowGroups(groups: readonly RowGroup[]): ExpandedRowGroup[] {
    const expanded: ExpandedRowGroup[] = [];

    function processGroup(group: RowGroup, depth: number): ExpandedRowGroup {
        if (typeof group === "number") {
            return {
                headerIndex: group,
                isCollapsed: false,
                depth,
            };
        }

        const expandedGroup: ExpandedRowGroup = {
            headerIndex: group.headerIndex,
            isCollapsed: group.isCollapsed,
            depth,
        };

        if (group.subGroups !== undefined) {
            expandedGroup.subGroups = group.subGroups.map(x => processGroup(x, depth + 1));
        }

        return expandedGroup;
    }

    for (const group of groups) {
        expanded.push(processGroup(group, 0));
    }

    return expanded;
}

export type FlattenedRowGroup = {
    readonly headerIndex: number;
    readonly isCollapsed: boolean;
    readonly depth: number;
    readonly rows: number;
};

function flattenRowGroups(rowGrouping: RowGroupingOptions, rows: number): FlattenedRowGroup[] {
    if (rowGrouping === undefined) return [];

    const flattened: FlattenedRowGroup[] = [];

    function processGroup(group: ExpandedRowGroup, nextHeaderIndex: number | null): void {
        const rowsInGroup = nextHeaderIndex !== null ? nextHeaderIndex - group.headerIndex : rows - group.headerIndex;
        flattened.push({
            headerIndex: group.headerIndex,
            isCollapsed: group.isCollapsed,
            depth: group.depth,
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

export interface UseRowGroupingResult {
    readonly effectiveRows: number;
    readonly rowNumberMapper: (row: number) => {
        readonly displayNumber: number | undefined;
        readonly rowIndex: number;
    };
    readonly getCellContent: (cell: Item) => GridCell;
}

interface MappedRow {
    displayNumber: number | undefined;
    rowIndex: number;
    sourceIndex: number;
}

// this is obviously a bad idea and should be replaced with something that doesn't need to preallocate the entire array
function fullyMap(rowGroups: FlattenedRowGroup[]): MappedRow[] {
    const result: MappedRow[] = [];
    let sourceIndex = 0;
    for (const group of rowGroups) {
        result.push({ displayNumber: undefined, rowIndex: group.headerIndex, sourceIndex: sourceIndex++ });
        if (group.isCollapsed === true) {
            for (let i = 0; i < group.rows; i++) {
                result.push({ displayNumber: i, rowIndex: group.headerIndex + i, sourceIndex: sourceIndex++ });
            }
        }
    }
    return result;
}

export function useRowGrouping(
    options: RowGroupingOptions,
    rows: number,
    getCellContent: DataEditorCoreProps["getCellContent"]
): UseRowGroupingResult {
    const flattenedRowGroups = React.useMemo(() => flattenRowGroups(options, rows), [options, rows]);
    const fullMap = React.useMemo(() => fullyMap(flattenedRowGroups), [flattenedRowGroups]);

    const rowNumberMapper = React.useCallback(
        (row: number) => {
            return fullMap[row];
        },
        [fullMap]
    );

    const getCellContentOut = React.useCallback(
        (cell: Item) => {
            const mapped = rowNumberMapper(cell[1]);
            return getCellContent([cell[0], mapped.sourceIndex]);
        },
        [getCellContent, rowNumberMapper]
    );

    return {
        rowNumberMapper,
        getCellContent: getCellContentOut,
        effectiveRows: fullMap.length,
    };
}
