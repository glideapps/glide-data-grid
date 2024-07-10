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
exports.useMoveableColumns = void 0;
const React = __importStar(require("react"));
const orderBy_js_1 = __importDefault(require("lodash/orderBy.js"));
function colToKey(c) {
    return c.id ?? `${c.group ?? ""}/${c.title}`;
}
function looseCompareCol(a, b) {
    if (typeof b === "string") {
        return colToKey(a) === b;
    }
    return colToKey(a) === colToKey(b);
}
function getSortIndexByKey(needle, current, keys) {
    const index = current.indexOf(needle);
    if (index === -1)
        return Number.MAX_SAFE_INTEGER; // should never happen
    // if we can directly remap we will
    const remapped = keys.findIndex(key => looseCompareCol(needle, key));
    if (remapped !== -1)
        return remapped;
    // look for its nearlest lefthand neighbor we can remap, and give a partial index
    for (let n = index; n >= 0; n--) {
        const ind = keys.findIndex(key => looseCompareCol(current[n], key));
        if (ind !== -1)
            return ind + 0.5;
    }
    return -1;
}
// this cannot actually be made transparent to the user. Doing so would break things like
// selection rnages being rectangular. The mangled columns need to actually be returned to the
// user so they can be referenced and understood correctly in other callbacks they may provide
// Darn
function useMoveableColumns(p) {
    const { columns: columnsIn, getCellContent: getCellContentIn, onColumnMoved: onColumnMovedIn } = p;
    const [keys, setKeys] = React.useState(() => columnsIn.map(colToKey));
    const columns = React.useMemo(() => {
        return (0, orderBy_js_1.default)(columnsIn, c => getSortIndexByKey(c, columnsIn, keys));
    }, [keys, columnsIn]);
    const onColumnMovedRef = React.useRef(onColumnMovedIn);
    onColumnMovedRef.current = onColumnMovedIn;
    const onColumnMoved = React.useCallback((startIndex, endIndex) => {
        setKeys(old => {
            const newCols = [...old];
            const [toMove] = newCols.splice(startIndex, 1);
            newCols.splice(endIndex, 0, toMove);
            return newCols;
        });
        onColumnMovedRef.current?.(startIndex, endIndex);
    }, []);
    React.useEffect(() => {
        setKeys(cv => {
            return (0, orderBy_js_1.default)(columnsIn, x => getSortIndexByKey(x, columnsIn, cv)).map(colToKey);
        });
    }, [columnsIn]);
    const getCellContent = React.useCallback(cell => {
        const [col, row] = cell;
        const needle = columns[col];
        const index = columnsIn.indexOf(needle);
        return getCellContentIn([index, row]);
    }, [columns, columnsIn, getCellContentIn]);
    return {
        columns,
        onColumnMoved,
        getCellContent,
    };
}
exports.useMoveableColumns = useMoveableColumns;
//# sourceMappingURL=use-movable-columns.js.map