import * as React from "react";
import { GridColumn } from "@glideapps/glide-data-grid";
import orderBy from "lodash/orderBy";
import { Props } from "./types";

function colToKey(c: GridColumn) {
    return `${c.group ?? ""}/${c.title}`;
}

function looseCompareCol(a: GridColumn, b: GridColumn | string): boolean {
    if (typeof b === "string") {
        return colToKey(a) === b;
    }
    return colToKey(a) === colToKey(b);
}

function getSortIndexByKey(needle: GridColumn, current: readonly GridColumn[], keys: readonly string[]) {
    const index = current.indexOf(needle);
    if (index === -1) return Number.MAX_SAFE_INTEGER; // should never happen

    // if we can directly remap we will
    const remapped = keys.findIndex(key => looseCompareCol(needle, key));
    if (remapped !== -1) return remapped;

    // look for its nearlest lefthand neighbor we can remap, and give a partial index
    for (let n = index; n >= 0; n--) {
        const ind = keys.findIndex(key => looseCompareCol(current[n], key));
        if (ind !== -1) return ind + 0.5;
    }

    return -1;
}

export function useMoveableColumns(p: Props): Pick<Props, "columns" | "onColumnMoved"> {
    const [keys, setKeys] = React.useState(() => p.columns.map(colToKey));

    const columns = React.useMemo(() => {
        return orderBy(p.columns, c => getSortIndexByKey(c, p.columns, keys));
    }, [keys, p.columns]);

    const onColumnMovedRef = React.useRef(p.onColumnMoved);
    onColumnMovedRef.current = p.onColumnMoved;
    const onColumnMoved = React.useCallback((startIndex: number, endIndex: number) => {
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
            return orderBy(p.columns, x => getSortIndexByKey(x, p.columns, cv)).map(colToKey);
        });
    }, [p.columns]);

    return {
        columns,
        onColumnMoved: p.moveableColumns === true ? onColumnMoved : undefined,
    };
}
