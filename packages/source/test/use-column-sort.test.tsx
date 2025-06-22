import { compareSmart, useColumnSort } from "../src/use-column-sort.js";
import { renderHook } from "@testing-library/react-hooks";
import { GridCellKind, type GridCell } from "@glideapps/glide-data-grid";
import { expect, describe, test } from "vitest";

describe("use-column-sort", () => {
    describe("compareSmart", function () {
        test("it does not parse date formats into numbers when sorting", function () {
            expect(["2022-02-01", "2023-01-01", "2024-01-01"].sort(compareSmart)).toEqual([
                "2022-02-01",
                "2023-01-01",
                "2024-01-01",
            ]);

            expect(["2024-12-01", "2022-12-01", "2023-12-01"].sort(compareSmart)).toEqual([
                "2022-12-01",
                "2023-12-01",
                "2024-12-01",
            ]);

            // This is where parseFloat() starts to fool us
            expect(["2022-12-03", "2022-12-01", "2022-12-02"].sort(compareSmart)).toEqual([
                "2022-12-01",
                "2022-12-02",
                "2022-12-03",
            ]);
        });
    });

    test("multi column sort", () => {
        const columns = [{ title: "A" }, { title: "B" }];
        const data = [
            ["2", "a"],
            ["1", "b"],
            ["2", "b"],
            ["1", "a"],
        ];

        const getCellContent = ([col, row]: [number, number]): GridCell => ({
            kind: GridCellKind.Text,
            allowOverlay: false,
            data: data[row][col],
            displayData: data[row][col],
        });

        const { result } = renderHook(() =>
            useColumnSort({
                columns,
                rows: data.length,
                getCellContent,
                sort: [
                    { column: columns[0], direction: "asc" },
                    { column: columns[1], direction: "asc" },
                ],
            })
        );

        const order = Array.from({ length: data.length }, (_, i) => result.current.getOriginalIndex(i));
        expect(order).toEqual([3, 1, 0, 2]);
    });
});
