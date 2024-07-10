"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumnSort = exports.compareRaw = exports.compareSmart = void 0;
const glide_data_grid_1 = require("@glideapps/glide-data-grid");
const range_js_1 = __importDefault(require("lodash/range.js"));
const React = __importStar(require("react"));
function cellToSortData(c) {
    switch (c.kind) {
        case glide_data_grid_1.GridCellKind.Number:
            return c.data?.toString() ?? "";
        case glide_data_grid_1.GridCellKind.Boolean:
            return c.data?.toString() ?? "";
        case glide_data_grid_1.GridCellKind.Markdown:
        case glide_data_grid_1.GridCellKind.RowID:
        case glide_data_grid_1.GridCellKind.Text:
        case glide_data_grid_1.GridCellKind.Uri:
            return c.data ?? "";
        case glide_data_grid_1.GridCellKind.Bubble:
        case glide_data_grid_1.GridCellKind.Image:
            return c.data.join("");
        case glide_data_grid_1.GridCellKind.Drilldown:
            return c.data.map(x => x.text).join("");
        case glide_data_grid_1.GridCellKind.Protected:
        case glide_data_grid_1.GridCellKind.Loading:
            return "";
        case glide_data_grid_1.GridCellKind.Custom:
            return c.copyData;
    }
}
function tryParse(val) {
    if (typeof val === "number")
        return val;
    if (val.length > 0) {
        const x = Number(val);
        if (!isNaN(x)) {
            val = x;
        }
    }
    return val;
}
function compareSmart(a, b) {
    a = tryParse(a);
    b = tryParse(b);
    if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
    }
    else if (typeof a === "number" && typeof b === "number") {
        if (a === b)
            return 0;
        return a > b ? 1 : -1;
    }
    else if (a == b) {
        return 0;
    }
    return a > b ? 1 : -1;
}
exports.compareSmart = compareSmart;
function compareRaw(a, b) {
    if (a > b)
        return 1;
    if (a === b)
        return 0;
    return -1;
}
exports.compareRaw = compareRaw;
function useColumnSort(p) {
    const { sort, rows, getCellContent: getCellContentIn } = p;
    let sortCol = sort === undefined
        ? undefined
        : p.columns.findIndex(c => sort.column === c || (c.id !== undefined && sort.column.id === c.id));
    if (sortCol === -1)
        sortCol = undefined;
    // This scales to about 100k rows. Beyond that things take a pretty noticeable amount of time
    // The performance "issue" from here on out seems to be the lookup to get the value. Not sure
    // what to do there. We need the indirection to produce the final sort map. Perhaps someone
    // more clever than me will wander in and save most of that time.
    const dir = sort?.direction ?? "asc";
    const sortMap = React.useMemo(() => {
        if (sortCol === undefined)
            return undefined;
        const vals = new Array(rows);
        const index = [sortCol, 0];
        for (let i = 0; i < rows; i++) {
            index[1] = i;
            vals[i] = cellToSortData(getCellContentIn(index));
        }
        let result;
        if (sort?.mode === "raw") {
            result = (0, range_js_1.default)(rows).sort((a, b) => compareRaw(vals[a], vals[b]));
        }
        else if (sort?.mode === "smart") {
            result = (0, range_js_1.default)(rows).sort((a, b) => compareSmart(vals[a], vals[b]));
        }
        else {
            result = (0, range_js_1.default)(rows).sort((a, b) => vals[a].localeCompare(vals[b]));
        }
        if (dir === "desc") {
            result.reverse();
        }
        return result;
    }, [getCellContentIn, rows, sort?.mode, dir, sortCol]);
    const getOriginalIndex = React.useCallback((index) => {
        if (sortMap === undefined)
            return index;
        return sortMap[index];
    }, [sortMap]);
    const getCellContent = React.useCallback(([col, row]) => {
        if (sortMap === undefined)
            return getCellContentIn([col, row]);
        row = sortMap[row];
        return getCellContentIn([col, row]);
    }, [getCellContentIn, sortMap]);
    if (sortMap === undefined) {
        return { getCellContent: p.getCellContent, getOriginalIndex };
    }
    return {
        getOriginalIndex,
        getCellContent,
    };
}
exports.useColumnSort = useColumnSort;
//# sourceMappingURL=use-column-sort.js.map