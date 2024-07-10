"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowGroupingForPath = exports.updateRowGroupingByPath = exports.useRowGrouping = void 0;
const react_1 = __importDefault(require("react"));
const row_grouping_js_1 = require("./row-grouping.js");
function useRowGrouping(options, rows) {
    const flattenedRowGroups = react_1.default.useMemo(() => (options === undefined ? undefined : (0, row_grouping_js_1.flattenRowGroups)(options, rows)), [options, rows]);
    return {
        getRowGroupingForPath,
        updateRowGroupingByPath,
        mapper: react_1.default.useCallback((itemOrRow) => {
            if (typeof itemOrRow === "number") {
                return (0, row_grouping_js_1.mapRowIndexToPath)(itemOrRow, flattenedRowGroups);
            }
            const r = (0, row_grouping_js_1.mapRowIndexToPath)(itemOrRow[1], flattenedRowGroups);
            return {
                ...r,
                originalIndex: [itemOrRow[0], r.originalIndex],
            }; // FIXME
        }, [flattenedRowGroups]),
    };
}
exports.useRowGrouping = useRowGrouping;
function updateRowGroupingByPath(rowGrouping, path, update) {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping.map((group, i) => (i === index ? { ...group, ...update } : group));
    }
    return rowGrouping.map((group, i) => i === index ? { ...group, subGroups: updateRowGroupingByPath(group.subGroups ?? [], rest, update) } : group);
}
exports.updateRowGroupingByPath = updateRowGroupingByPath;
function getRowGroupingForPath(rowGrouping, path) {
    const [index, ...rest] = path;
    if (rest[0] === -1) {
        return rowGrouping[index];
    }
    return getRowGroupingForPath(rowGrouping[index].subGroups ?? [], rest);
}
exports.getRowGroupingForPath = getRowGroupingForPath;
//# sourceMappingURL=row-grouping-api.js.map