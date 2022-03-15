import { DataEditorProps, GridCell, GridCellKind, GridColumn } from "@glideapps/glide-data-grid";
import range from "lodash/range";
import * as React from "react";

function cellToSortData(c: GridCell): string | number {
    switch (c.kind) {
        case GridCellKind.Number:
            return c.data ?? "";
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

export function compareRaw(a: string | number, b: string | number) {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
}

type Props = Pick<DataEditorProps, "getCellContent" | "rows" | "columns"> & {
    sort?: {
        column: GridColumn;
        mode?: "default" | "raw";
        direction?: "asc" | "desc";
    };
};
type Result = Pick<DataEditorProps, "getCellContent"> & {
    getOriginalIndex: (index: number) => number;
};

export function useColumnSort(p: Props): Result {
    const { sort, rows, getCellContent: getCellContentIn } = p;

    const sortCol = sort === undefined ? undefined : p.columns.indexOf(sort.column);

    // This scales to about 100k rows. Beyond that things take a pretty noticeable amount of time
    // The performance "issue" from here on out seems to be the lookup to get the value. Not sure
    // what to do there. We need the indirection to produce the final sort map. Perhaps someone
    // more clever than me will wander in and save most of that time.
    const dir = sort?.direction ?? "asc";
    const sortMap = React.useMemo(() => {
        if (sortCol === undefined) return undefined;
        const vals: any[] = new Array(rows);

        const index: [number, number] = [sortCol, 0];
        for (let i = 0; i < rows; i++) {
            index[1] = i;
            vals[i] = cellToSortData(getCellContentIn(index));
        }

        let result: number[];
        if (sort?.mode === "raw") {
            result = range(rows).sort((a, b) => compareRaw(vals[a], vals[b]));
        } else {
            result = range(rows).sort((a, b) =>
                vals[a].data?.toString().localeCompare(vals[b].data?.toString(), undefined, { numeric: true })
            );
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
