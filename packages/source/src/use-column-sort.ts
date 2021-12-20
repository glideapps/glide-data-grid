import { GridCell, GridCellKind } from "@glideapps/glide-data-grid";
import orderBy from "lodash/orderBy";
import * as React from "react";
import { Props } from "./types";

function cellToSortData(c: GridCell): string | boolean | number {
    switch (c.kind) {
        case GridCellKind.Boolean:
        case GridCellKind.Markdown:
        case GridCellKind.Number:
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

export function useColumnSort(p: Props): Pick<Props, "getCellContent"> {
    const { sort, rows, getCellContent: getCellContentIn } = p;

    const sortCol = sort === undefined ? undefined : p.columns.indexOf(sort.column);

    const sortMap = React.useMemo(() => {
        if (sortCol === undefined) return undefined;
        const cells: GridCell[] = new Array(rows);

        for (let i = 0; i < rows; i++) {
            cells[i] = getCellContentIn([sortCol, i]);
        }

        const sorted = orderBy(cells, cellToSortData);

        const result: number[] = new Array(rows);
        for (let i = 0; i < rows; i++) {
            result[i] = cells.indexOf(sorted[i]);
        }
        return result;
    }, [getCellContentIn, rows, sortCol]);

    const getCellContent = React.useCallback<typeof getCellContentIn>(
        ([col, row]) => {
            if (sortMap === undefined) return getCellContentIn([col, row]);
            col = sortMap[col];
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
