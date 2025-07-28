import { useColumnFilter } from "../src/use-column-filter.js";
import { renderHook } from "@testing-library/react-hooks";
import { GridCellKind, type GridCell } from "@glideapps/glide-data-grid";
import { expect, describe, test } from "vitest";

describe("use-column-filter", () => {
    test("multi column filter", () => {
        const columns = [
            { title: "A", id: "A" },
            { title: "B", id: "B" },
        ];
        const data = [
            ["2", "a"],
            ["1", "b"],
            ["2", "b"],
            ["1", "a"],
            ["3", "c"],
        ];

        const getCellContent = ([col, row]: readonly [number, number]): GridCell => ({
            kind: GridCellKind.Text,
            allowOverlay: false,
            data: data[row][col],
            displayData: data[row][col],
        });

        const { result } = renderHook(() =>
            useColumnFilter({
                columns,
                rows: data.length,
                getCellContent,
                filter: [
                    { column: columns[0], filterCallback: (v) => v !== "2" },
                    { column: columns[1], filterCallback: (v) => v !== "b" },
                ],
            })
        );

        const order = Array.from({ length: data.length }, (_, i) => result.current.getOriginalIndex(i));
        expect(order).toEqual([3, 4, undefined, undefined, undefined]);
    });
});
