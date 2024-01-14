import * as React from "react";
import { useQuery } from "@livestore/livestore/react";
import { querySQL, type LiveStoreSchema } from "@livestore/livestore";
import { GridCellKind, type DataEditorCoreProps, type GridColumn, type GridCell } from "@glideapps/glide-data-grid";

interface LivestoreSourceProps
    extends Pick<DataEditorCoreProps, "getCellContent" | "rows" | "columns" | "getCellsForSelection"> {
    readonly columns: GridColumn[];
    readonly rows: number;
}

type LivestoreColumn = GridColumn & {
    readonly type: GridCellKind;
    readonly id: string;
};

const typeMap = {
    integer: GridCellKind.Number,
    real: GridCellKind.Number,
    text: GridCellKind.Text,
    blob: GridCellKind.Loading,
};

export function useLivestoreSource(table: string, schema: LiveStoreSchema): LivestoreSourceProps {
    const tableDef = schema.tables.get(table);

    const allQuery = React.useMemo(() => querySQL<any>(`SELECT * FROM ${table}`), [table]);

    const query = useQuery(allQuery);

    const inColumns = tableDef?.schema.columns;
    const columns = React.useMemo((): LivestoreColumn[] => {
        if (inColumns === undefined) return [];

        const keys = Object.keys(inColumns);

        return keys.map(key => {
            const column = inColumns[key];
            column.columnType;
            return {
                title: key,
                id: key,
                type: typeMap[column.columnType],
            };
        });
    }, [inColumns]);

    const getCellContent: LivestoreSourceProps["getCellContent"] = React.useCallback(
        ([col, row]): GridCell => {
            if (query[row] === undefined) {
                return {
                    kind: GridCellKind.Loading,
                    allowOverlay: false,
                };
            }
            const column = columns[col];
            if (column.type === GridCellKind.Loading) {
                return {
                    kind: GridCellKind.Loading,
                    allowOverlay: false,
                };
            } else if (column.type === GridCellKind.Text) {
                const text = query[row][column.id];
                return {
                    kind: GridCellKind.Number,
                    data: text,
                    displayData: text,
                    allowOverlay: false,
                };
            } else if (column.type === GridCellKind.Number) {
                const number = query[row][column.id];
                return {
                    kind: GridCellKind.Number,
                    data: number,
                    displayData: number,
                    allowOverlay: false,
                };
            }
            return {
                kind: GridCellKind.Loading,
                allowOverlay: false,
            };
        },
        [columns, query]
    );

    return {
        columns,
        rows: query.length,
        getCellContent,
        getCellsForSelection: true,
    };
}
