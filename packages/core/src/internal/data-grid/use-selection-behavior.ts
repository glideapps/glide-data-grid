import React from "react";
import { CompactSelection, type GridSelection, type Slice } from "./data-grid-types.js";

type SetCallback = (newVal: GridSelection, expand: boolean) => void;

/**
 * The type of selection blending to use:
 * - `exclusive`: Only one type of selection can be made at a time.
 * - `mixed`: Multiple types of selection can be made at a time, but only when a multi-key (e.g., Cmd/Ctrl) is held.
 * - `additive`: Multiple types of selection can be made at a time, and selections accumulate without a modifier.
 */
export type SelectionBlending = "exclusive" | "mixed" | "additive";

type SelectionTrigger = "click" | "drag" | "keyboard-nav" | "keyboard-select" | "edit";

export function useSelectionBehavior(
    gridSelection: GridSelection,
    setGridSelection: SetCallback,
    rangeBehavior: SelectionBlending,
    columnBehavior: SelectionBlending,
    rowBehavior: SelectionBlending,
    rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect",
    rangeSelectionColumnSpanning: boolean
) {
    // if append is true, the current range will be added to the rangeStack
    const setCurrent = React.useCallback(
        (
            value: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined,
            expand: boolean,
            append: boolean,
            trigger: SelectionTrigger
        ) => {
            if ((rangeSelect === "cell" || rangeSelect === "multi-cell") && value !== undefined) {
                value = {
                    ...value,
                    range: {
                        x: value.cell[0],
                        y: value.cell[1],
                        width: 1,
                        height: 1,
                    },
                };
            }

            if (!rangeSelectionColumnSpanning && value !== undefined && value.range.width > 1) {
                value = {
                    ...value,
                    range: {
                        ...value.range,
                        width: 1,
                        x: value.cell[0],
                    },
                };
            }

            const rangeMixable =
                (rangeBehavior === "mixed" && (append || trigger === "drag")) || rangeBehavior === "additive";
            const allowColumnCoSelect = (columnBehavior === "mixed" || columnBehavior === "additive") && rangeMixable;
            const allowRowCoSelect = (rowBehavior === "mixed" || rowBehavior === "additive") && rangeMixable;
            let newVal: GridSelection = {
                current:
                    value === undefined
                        ? undefined
                        : {
                              ...value,
                              rangeStack: trigger === "drag" ? (gridSelection.current?.rangeStack ?? []) : [],
                          },
                columns: allowColumnCoSelect ? gridSelection.columns : CompactSelection.empty(),
                rows: allowRowCoSelect ? gridSelection.rows : CompactSelection.empty(),
            };

            const addLastRange = append && (rangeSelect === "multi-rect" || rangeSelect === "multi-cell");
            if (addLastRange && newVal.current !== undefined && gridSelection.current !== undefined) {
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
        [
            columnBehavior,
            gridSelection,
            rangeBehavior,
            rangeSelect,
            rangeSelectionColumnSpanning,
            rowBehavior,
            setGridSelection,
        ]
    );

    const setSelectedRows = React.useCallback(
        (newRows: CompactSelection | undefined, append: Slice | number | undefined, allowMixed: boolean): void => {
            newRows = newRows ?? gridSelection.rows;
            if (append !== undefined) {
                newRows = newRows.add(append);
            }
            let newVal: GridSelection;
            if (rowBehavior === "exclusive" && newRows.length > 0) {
                newVal = {
                    current: undefined,
                    columns: CompactSelection.empty(),
                    rows: newRows,
                };
            } else {
                const rangeMixed = (allowMixed && rangeBehavior === "mixed") || rangeBehavior === "additive";
                const columnMixed = (allowMixed && columnBehavior === "mixed") || columnBehavior === "additive";
                const current = !rangeMixed ? undefined : gridSelection.current;
                newVal = {
                    current,
                    columns: columnMixed ? gridSelection.columns : CompactSelection.empty(),
                    rows: newRows,
                };
            }
            setGridSelection(newVal, false);
        },
        [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]
    );

    const setSelectedColumns = React.useCallback(
        (newCols: CompactSelection | undefined, append: number | Slice | undefined, allowMixed: boolean): void => {
            newCols = newCols ?? gridSelection.columns;
            if (append !== undefined) {
                newCols = newCols.add(append);
            }
            let newVal: GridSelection;
            if (columnBehavior === "exclusive" && newCols.length > 0) {
                newVal = {
                    current: undefined,
                    rows: CompactSelection.empty(),
                    columns: newCols,
                };
            } else {
                const rangeMixed = (allowMixed && rangeBehavior === "mixed") || rangeBehavior === "additive";
                const rowMixed = (allowMixed && rowBehavior === "mixed") || rowBehavior === "additive";
                const current = !rangeMixed ? undefined : gridSelection.current;
                newVal = {
                    current,
                    rows: rowMixed ? gridSelection.rows : CompactSelection.empty(),
                    columns: newCols,
                };
            }
            setGridSelection(newVal, false);
        },
        [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]
    );

    return [setCurrent, setSelectedRows, setSelectedColumns] as const;
}
