import { GridCell, GridCellKind } from "@glideapps/glide-data-grid";
import range from "lodash/range";
import * as React from "react";
import { Props } from "./types";

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

export function compareRaw(a: string, b: string) {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
}

export function useColumnSort(p: Props): Pick<Props, "getCellContent"> {
    const { sort, rows, getCellContent: getCellContentIn } = p;

    const sortCol = sort === undefined ? undefined : p.columns.indexOf(sort.column);

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
        } else {
            result = range(rows).sort((a, b) => vals[a].localeCompare(vals[b]));
        }
        return result;
    }, [getCellContentIn, rows, sort?.mode, sortCol]);

    const getCellContent = React.useCallback<typeof getCellContentIn>(
        ([col, row]) => {
            if (sortMap === undefined) return getCellContentIn([col, row]);
            row = sortMap[row];
            return getCellContentIn([col, row]);
        },
        [getCellContentIn, sortMap]
    );

    if (sortMap === undefined) {
        return { getCellContent: p.getCellContent };
    }

    return {
        getCellContent,
    };
}
