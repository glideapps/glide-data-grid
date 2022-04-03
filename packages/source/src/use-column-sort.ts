import { DataEditorProps, GridCell, GridCellKind, GridColumn } from "@glideapps/glide-data-grid";
import range from "lodash/range";
import * as React from "react";

function cellToSortData(c: GridCell): string {
    switch (c.kind) {
        case GridCellKind.Number:
            return c.data?.toString() ?? "";
        case GridCellKind.Boolean:
            return c.data?.toString() ?? "";
        case GridCellKind.Markdown:
        case GridCellKind.RowID:
        case GridCellKind.Text:
        case GridCellKind.Uri:
            return c.data ?? "";
        case GridCellKind.Bubble:
        case GridCellKind.Image:
            return c.data.join("");
        case GridCellKind.Drilldown:
            return c.data.map(x => x.text).join("");
        case GridCellKind.Protected:
        case GridCellKind.Loading:
            return "";
        case GridCellKind.Custom:
            return c.copyData;
    }
}

function tryParse(val: string | number): number | string {
    if (typeof val === "number") return val;
    if (val.length > 0) {
        const x = parseFloat(val);
        if (!isNaN(x)) {
            val = x;
        }
    }
    return val;
}

export function compareSmart(a: string | number, b: string | number): number {
    a = tryParse(a);
    b = tryParse(b);
    if (typeof a === "string" && typeof b === "string") {
        return a.localeCompare(b);
    } else if (typeof a === "number" && typeof b === "number") {
        if (a === b) return 0;
        return a > b ? 1 : -1;
    } else if (a == b) {
        return 0;
    }
    return a > b ? 1 : -1;
}

export function compareRaw(a: string | number, b: string | number) {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
}

type Props = Pick<DataEditorProps, "getCellContent" | "rows" | "columns"> & {
    sort?: {
        column: GridColumn;
        mode?: "default" | "raw" | "smart";
        direction?: "asc" | "desc";
    };
};
type Result = Pick<DataEditorProps, "getCellContent"> & {
    getOriginalIndex: (index: number) => number;
};

export function useColumnSort(p: Props): Result {
    const { sort, rows, getCellContent: getCellContentIn } = p;

    let sortCol =
        sort === undefined
            ? undefined
            : p.columns.findIndex(c => sort.column === c || (c.id !== undefined && sort.column.id === c.id));
    if (sortCol === -1) sortCol = undefined;

    // This scales to about 100k rows. Beyond that things take a pretty noticeable amount of time
    // The performance "issue" from here on out seems to be the lookup to get the value. Not sure
    // what to do there. We need the indirection to produce the final sort map. Perhaps someone
    // more clever than me will wander in and save most of that time.
    const dir = sort?.direction ?? "asc";
    const sortMap = React.useMemo(() => {
        if (sortCol === undefined) return undefined;
        const vals: string[] = new Array(rows);

        const index: [number, number] = [sortCol, 0];
        for (let i = 0; i < rows; i++) {
            index[1] = i;
            vals[i] = cellToSortData(getCellContentIn(index));
        }

        let result: number[];
        if (sort?.mode === "raw") {
            result = range(rows).sort((a, b) => compareRaw(vals[a], vals[b]));
        } else if (sort?.mode === "smart") {
            result = range(rows).sort((a, b) => compareSmart(vals[a], vals[b]));
        } else {
            result = range(rows).sort((a, b) => vals[a].localeCompare(vals[b]));
        }
        if (dir === "desc") {
            result.reverse();
        }
        return result;
    }, [getCellContentIn, rows, sort?.mode, dir, sortCol]);

    const getOriginalIndex = React.useCallback(
        (index: number): number => {
            if (sortMap === undefined) return index;
            return sortMap[index];
        },
        [sortMap]
    );

    const getCellContent = React.useCallback<typeof getCellContentIn>(
        ([col, row]) => {
            if (sortMap === undefined) return getCellContentIn([col, row]);
            row = sortMap[row];
            return getCellContentIn([col, row]);
        },
        [getCellContentIn, sortMap]
    );

    if (sortMap === undefined) {
        return { getCellContent: p.getCellContent, getOriginalIndex };
    }

    return {
        getOriginalIndex,
        getCellContent,
    };
}
