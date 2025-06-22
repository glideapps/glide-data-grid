import { type DataEditorProps, type GridCell, GridCellKind, type GridColumn } from "@glideapps/glide-data-grid";
import range from "lodash/range.js";
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
        const x = Number(val);
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

export type ColumnSort = {
    column: GridColumn;
    mode?: "default" | "raw" | "smart";
    direction?: "asc" | "desc";
};

type Props = Pick<DataEditorProps, "getCellContent" | "rows" | "columns"> & {
    sort?: ColumnSort | ColumnSort[];
};
type Result = Pick<DataEditorProps, "getCellContent"> & {
    getOriginalIndex: (index: number) => number;
};

export function useColumnSort(p: Props): Result {
    const { sort, rows, getCellContent: getCellContentIn } = p;

    const sorts = React.useMemo(() => {
        if (sort === undefined) return [] as ColumnSort[];
        return Array.isArray(sort) ? sort : [sort];
    }, [sort]);

    const sortCols = React.useMemo(() =>
        sorts.map(s => {
            const c = p.columns.findIndex(col => s.column === col || (col.id !== undefined && s.column.id === col.id));
            return c === -1 ? undefined : c;
        }),
        [sorts, p.columns]
    );

    // This scales to about 100k rows. Beyond that things take a pretty noticeable amount of time
    // The performance "issue" from here on out seems to be the lookup to get the value. Not sure
    // what to do there. We need the indirection to produce the final sort map. Perhaps someone
    // more clever than me will wander in and save most of that time.
    const sortMap = React.useMemo(() => {
        const activeSorts = sorts
            .map((s, i) => ({ sort: s, col: sortCols[i] }))
            .filter((v): v is { sort: ColumnSort; col: number } => v.col !== undefined);

        if (activeSorts.length === 0) return undefined;

        const values = activeSorts.map(() => new Array<string>(rows));
        for (let sIndex = 0; sIndex < activeSorts.length; sIndex++) {
            const { col } = activeSorts[sIndex];
            const index: [number, number] = [col, 0];
            for (let i = 0; i < rows; i++) {
                index[1] = i;
                values[sIndex][i] = cellToSortData(getCellContentIn(index));
            }
        }

        return range(rows).sort((a, b) => {
            for (let sIndex = 0; sIndex < activeSorts.length; sIndex++) {
                const { sort: colSort } = activeSorts[sIndex];
                const va = values[sIndex][a];
                const vb = values[sIndex][b];
                let cmp: number;
                if (colSort.mode === "raw") {
                    cmp = compareRaw(va, vb);
                } else if (colSort.mode === "smart") {
                    cmp = compareSmart(va, vb);
                } else {
                    cmp = va.localeCompare(vb);
                }
                if (cmp !== 0) {
                    if ((colSort.direction ?? "asc") === "desc") cmp = -cmp;
                    return cmp;
                }
            }
            return 0;
        });
    }, [getCellContentIn, rows, sorts, sortCols]);

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
