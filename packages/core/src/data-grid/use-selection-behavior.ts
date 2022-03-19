import React from "react";
import { CompactSelection, GridSelection, Slice } from "./data-grid-types";

type SetCallback = (newVal: GridSelection, expand: boolean) => void;

export type SelectionBehavior = "exclusive" | "inclusive";

export function useSelectionBehavior(
    gridSelection: GridSelection,
    setGridSelection: SetCallback,
    rangeBehavior: SelectionBehavior,
    columnBehavior: SelectionBehavior,
    rowBehavior: SelectionBehavior
) {
    // if append is true, the current range will be added to the rangeStack
    const setCurrent = React.useCallback(
        (
            current: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined,
            expand: boolean,
            append: boolean,
            allowInclusive: boolean
        ) => {
            let newVal: GridSelection;
            if ((rangeBehavior === "exclusive" || !allowInclusive) && current !== undefined) {
                newVal = {
                    current: {
                        ...current,
                        rangeStack: gridSelection.current?.rangeStack ?? [],
                    },
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                };
            } else {
                newVal = {
                    current:
                        current === undefined
                            ? undefined
                            : {
                                  ...current,
                                  rangeStack: gridSelection.current?.rangeStack ?? [],
                              },
                    columns: columnBehavior === "exclusive" ? CompactSelection.empty() : gridSelection.columns,
                    rows: rowBehavior === "exclusive" ? CompactSelection.empty() : gridSelection.rows,
                };
            }
            if (append && newVal.current !== undefined && gridSelection.current !== undefined) {
                newVal = {
                    ...newVal,
                    current: {
                        ...newVal.current,
                        rangeStack: [...gridSelection.current.rangeStack, gridSelection.current.range],
                    },
                };
            }
            setGridSelection(newVal, expand);
        },
        [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]
    );

    const setSelectedRows = React.useCallback(
        (newRows: CompactSelection | undefined, append: Slice | number | undefined, allowInclusive: boolean): void => {
            newRows = newRows ?? gridSelection.rows;
            allowInclusive = allowInclusive || gridSelection.current === undefined;
            if (append !== undefined) {
                newRows = newRows.add(append);
            }
            let newVal: GridSelection;
            if (rowBehavior === "exclusive" && newRows.length !== 0) {
                newVal = {
                    current: undefined,
                    columns: CompactSelection.empty(),
                    rows: newRows,
                };
            } else {
                const rangeInclusive = allowInclusive && rangeBehavior === "inclusive";
                const columnInclusive = allowInclusive && columnBehavior === "inclusive";
                let current = !rangeInclusive ? undefined : gridSelection.current;
                if (rangeInclusive && current === undefined && append !== undefined) {
                    const row = typeof append === "number" ? append : append[0];
                    current = {
                        cell: [1, row],
                        range: {
                            x: 1,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                        rangeStack: [],
                    };
                }
                newVal = {
                    current,
                    columns: columnInclusive ? gridSelection.columns : CompactSelection.empty(),
                    rows: newRows,
                };
            }
            setGridSelection(newVal, false);
        },
        [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]
    );

    const setSelectedColumns = React.useCallback(
        (newCols: CompactSelection | undefined, append: number | Slice | undefined, allowInclusive: boolean): void => {
            newCols = newCols ?? gridSelection.columns;
            allowInclusive = allowInclusive || gridSelection.current === undefined;
            if (append !== undefined) {
                newCols = newCols.add(append);
            }
            let newVal: GridSelection;
            if (columnBehavior === "exclusive" && newCols.length !== 0) {
                newVal = {
                    current: undefined,
                    rows: CompactSelection.empty(),
                    columns: newCols,
                };
            } else {
                const rangeInclusive = allowInclusive && rangeBehavior === "inclusive";
                const rowInclusive = allowInclusive && rowBehavior === "inclusive";
                let current = !rangeInclusive ? undefined : gridSelection.current;
                if (rangeInclusive && current === undefined && append !== undefined) {
                    const col = typeof append === "number" ? append : append[0];
                    current = {
                        cell: [col, 0],
                        range: {
                            x: col,
                            y: 0,
                            width: 1,
                            height: 1,
                        },
                        rangeStack: [],
                    };
                }
                newVal = {
                    current,
                    rows: rowInclusive ? gridSelection.rows : CompactSelection.empty(),
                    columns: newCols,
                };
            }
            setGridSelection(newVal, false);
        },
        [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]
    );

    return [setCurrent, setSelectedRows, setSelectedColumns] as const;
}
