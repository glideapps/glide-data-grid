import * as React from "react";
import DataEditor, { DataEditorProps, GridCellKind, GridColumn } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";

export default function Grid() {
    const getData = React.useCallback<DataEditorProps["getCellContent"]>(
        cell => ({
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: true,
            data: `${cell[0]},${cell[1]}`,
            displayData: `${cell[0]},${cell[1]}`,
        }),
        []
    );

    const cols = React.useMemo<GridColumn[]>(
        () => [
            {
                width: 100,
                title: "A",
            },
            {
                width: 100,
                title: "B",
            },
            {
                width: 100,
                title: "C",
            },
        ],
        []
    );

    return <DataEditor width={800} height={500} getCellContent={getData} columns={cols} rows={100} />;
}
