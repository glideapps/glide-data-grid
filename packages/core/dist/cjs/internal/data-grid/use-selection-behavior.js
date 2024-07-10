"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelectionBehavior = void 0;
const react_1 = __importDefault(require("react"));
const data_grid_types_js_1 = require("./data-grid-types.js");
function useSelectionBehavior(gridSelection, setGridSelection, rangeBehavior, columnBehavior, rowBehavior, rangeSelect, rangeSelectionColumnSpanning) {
    // if append is true, the current range will be added to the rangeStack
    const setCurrent = react_1.default.useCallback((value, expand, append, trigger) => {
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
        const rangeMixable = rangeBehavior === "mixed" && (append || trigger === "drag");
        const allowColumnCoSelect = columnBehavior === "mixed" && rangeMixable;
        const allowRowCoSelect = rowBehavior === "mixed" && rangeMixable;
        let newVal = {
            current: value === undefined
                ? undefined
                : {
                    ...value,
                    rangeStack: trigger === "drag" ? gridSelection.current?.rangeStack ?? [] : [],
                },
            columns: allowColumnCoSelect ? gridSelection.columns : data_grid_types_js_1.CompactSelection.empty(),
            rows: allowRowCoSelect ? gridSelection.rows : data_grid_types_js_1.CompactSelection.empty(),
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
    }, [
        columnBehavior,
        gridSelection,
        rangeBehavior,
        rangeSelect,
        rangeSelectionColumnSpanning,
        rowBehavior,
        setGridSelection,
    ]);
    const setSelectedRows = react_1.default.useCallback((newRows, append, allowMixed) => {
        newRows = newRows ?? gridSelection.rows;
        if (append !== undefined) {
            newRows = newRows.add(append);
        }
        let newVal;
        if (rowBehavior === "exclusive" && newRows.length > 0) {
            newVal = {
                current: undefined,
                columns: data_grid_types_js_1.CompactSelection.empty(),
                rows: newRows,
            };
        }
        else {
            const rangeMixed = allowMixed && rangeBehavior === "mixed";
            const columnMixed = allowMixed && columnBehavior === "mixed";
            const current = !rangeMixed ? undefined : gridSelection.current;
            newVal = {
                current,
                columns: columnMixed ? gridSelection.columns : data_grid_types_js_1.CompactSelection.empty(),
                rows: newRows,
            };
        }
        setGridSelection(newVal, false);
    }, [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]);
    const setSelectedColumns = react_1.default.useCallback((newCols, append, allowMixed) => {
        newCols = newCols ?? gridSelection.columns;
        if (append !== undefined) {
            newCols = newCols.add(append);
        }
        let newVal;
        if (columnBehavior === "exclusive" && newCols.length > 0) {
            newVal = {
                current: undefined,
                rows: data_grid_types_js_1.CompactSelection.empty(),
                columns: newCols,
            };
        }
        else {
            const rangeMixed = allowMixed && rangeBehavior === "mixed";
            const rowMixed = allowMixed && rowBehavior === "mixed";
            const current = !rangeMixed ? undefined : gridSelection.current;
            newVal = {
                current,
                rows: rowMixed ? gridSelection.rows : data_grid_types_js_1.CompactSelection.empty(),
                columns: newCols,
            };
        }
        setGridSelection(newVal, false);
    }, [columnBehavior, gridSelection, rangeBehavior, rowBehavior, setGridSelection]);
    return [setCurrent, setSelectedRows, setSelectedColumns];
}
exports.useSelectionBehavior = useSelectionBehavior;
//# sourceMappingURL=use-selection-behavior.js.map