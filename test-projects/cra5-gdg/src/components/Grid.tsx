import { useCallback, useState } from "react";
import _ from "lodash";
import "@glideapps/glide-data-grid/dist/index.css";

import { DataEditor, GridCell, GridCellKind, GridColumn, Item } from "@glideapps/glide-data-grid";

// Define the shape of the data
interface Person {
    firstName: string;
    lastName: string;
    id: number;
}

const data: Person[] = [
    {
        firstName: "John",
        lastName: "Doe",
        id: 100002,
    },
    {
        firstName: "Maria",
        lastName: "Garcia",
        id: 100002,
    },
    {
        firstName: "Nancy",
        lastName: "Jones",
        id: 100002,
    },
    {
        firstName: "James",
        lastName: "Smith",
        id: 100002,
    },
];

// Grid columns may also provide icon, overlayIcon, menu, style, and theme overrides
const columns: GridColumn[] = [
    { title: "First Name", width: 100, id: "firstName" },
    { title: "Last Name", width: 100, id: "lastName" },
    { title: "Id", width: 100, id: "id" },
];

export default function Grid() {
    const [rows, setRows] = useState<Person[]>(data);

    const onCellEdited = useCallback(
        (cell: readonly [number, number], newValue: GridCell) => {
            const [col_id, row_id] = cell;
            const column = _.get(columns, col_id, {}) as GridColumn; // Type assertion here
            // Check if newValue is of type GridCell and has a data property
            if (newValue.kind === GridCellKind.Text || newValue.kind === GridCellKind.Number) {
                const value = newValue.data;

                if (column.id && value !== undefined) {
                    const key = column.id as keyof Person; // Type assertion
                    rows[row_id][key] = value as never; // Use `as never` to bypass assignment restrictions
                    setRows([...rows]);
                }
            }
        },
        [rows]
    );

    const onCellData = useCallback(
        function getData([col, row]: Item): GridCell {
            const person = rows[row];

            if (col === 0) {
                return {
                    kind: GridCellKind.Text,
                    data: person.firstName,
                    allowOverlay: false,
                    readonly: false,
                    displayData: person.firstName,
                };
            } else if (col === 1) {
                return {
                    kind: GridCellKind.Text,
                    data: person.lastName,
                    allowOverlay: false,
                    displayData: person.lastName,
                    readonly: true,
                };
            } else if (col === 2) {
                return {
                    kind: GridCellKind.Number,
                    data: person.id,
                    allowOverlay: true,
                    displayData: person.id.toString(),
                    readonly: false,
                };
            } else {
                throw new Error("Invalid column index");
            }
        },
        [rows]
    );

    return <DataEditor columns={columns} onCellEdited={onCellEdited} getCellContent={onCellData} rows={rows.length} />;
}
