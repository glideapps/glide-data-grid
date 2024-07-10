import * as React from "react";
import orderBy from "lodash/orderBy.js";
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
export function useMoveableColumns(p) {
    const { columns: columnsIn, getCellContent: getCellContentIn, onColumnMoved: onColumnMovedIn } = p;
    const [keys, setKeys] = React.useState(() => columnsIn.map(colToKey));
    const columns = React.useMemo(() => {
        return orderBy(columnsIn, c => getSortIndexByKey(c, columnsIn, keys));
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
            return orderBy(columnsIn, x => getSortIndexByKey(x, columnsIn, cv)).map(colToKey);
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
//# sourceMappingURL=use-movable-columns.js.map