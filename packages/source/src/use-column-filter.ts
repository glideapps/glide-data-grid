import { type DataEditorProps, type GridCell, type GridColumn } from "@glideapps/glide-data-grid";
import range from "lodash/range.js";
import { useMemo, useCallback } from "react";

export type ColumnFilter = {
    column: GridColumn;
    filterCallback: (cellValue: any) => boolean;
};

type Props = Pick<DataEditorProps, "getCellContent" | "rows" | "columns"> & {
    filter?: ColumnFilter | ColumnFilter[];
};
type Result = Pick<DataEditorProps, "getCellContent" | "rows"> & {
    getOriginalIndex: (index: number) => number;
};

export function useColumnFilter(p: Props): Result {
    const { filter, rows, getCellContent: getCellContentIn } = p;

    const filters = useMemo(() => {
        if (filter === undefined) return [] as ColumnFilter[];
        return Array.isArray(filter) ? filter : [filter];
    }, [filter]);

    const filterCols = useMemo(() =>
        filters.map(s => {
            const c = p.columns.findIndex(col => s.column === col || (col.id !== undefined && s.column.id === col.id));
            return c === -1 ? undefined : c;
        }),
        [filters, p.columns]
    );

    const filterMap = useMemo(() => {
        const activeFilters = filters
            .map((s, i) => ({ filter: s, col: filterCols[i] }))
            .filter((v): v is { filter: ColumnFilter; col: number } => v.col !== undefined);

        if (activeFilters.length === 0) return undefined;

        const values = activeFilters.map(() => new Array<GridCell>(rows));
        for (let sIndex = 0; sIndex < activeFilters.length; sIndex++) {
            const { col } = activeFilters[sIndex];
            const index: [number, number] = [col, 0];
            for (let i = 0; i < rows; i++) {
                index[1] = i;
                values[sIndex][i] = getCellContentIn(index);
            }
        }

        return range(rows).filter((r) => {
            for (let sIndex = 0; sIndex < activeFilters.length; sIndex++) {
                const { filter: colFilter } = activeFilters[sIndex];
                const v = values[sIndex][r];
                if (!colFilter.filterCallback(v)) {
                    return false;                 
                }
            }
            return true;
        })
    }, [getCellContentIn, rows, filters, filterCols]);

    const getOriginalIndex = useCallback(
        (index: number): number => {
            if (filterMap === undefined) return index;
            return filterMap[index];
        },
        [filterMap]
    );

    const getCellContent = useCallback<typeof getCellContentIn>(
        ([col, row]) => {
            if (filterMap === undefined) return getCellContentIn([col, row]);
            row = filterMap[row];
            return getCellContentIn([col, row]);
        },
        [getCellContentIn, filterMap]
    );

    if (filterMap === undefined) {
        return { getCellContent: p.getCellContent, getOriginalIndex, rows: p.rows };
    }

    return {
        getOriginalIndex,
        getCellContent,
        rows: filterMap.length,
    };
}
