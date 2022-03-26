import { renderHook } from "@testing-library/react-hooks";
import { GridCell, GridCellKind, GridColumn, Rectangle } from "..";
import { getDataEditorTheme } from "../common/styles";
import { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { CellArray } from "../data-grid/data-grid-types";
import { useCellSizer } from "./use-cell-sizer";

const COLUMNS: GridColumn[] = [
    {
        title: "A",
        id: "ColumnA",
    },
    {
        title: "B",
        width: 160,
        icon: "headerCode",
    },
];

const A_COPY_OF_COLUMNS_THAT_ALSO_HAS_A_NEW_COLUMN_TITLED_C_THAT_WE_WILL_MEASURE_SOON_ENOUGH: GridColumn[] = [
    ...COLUMNS,
    {
        title: "C",
        id: "ColumnC",
    },
];

const A_BUNCH_OF_COLUMNS_THAT_ALREADY_HAVE_SIZES_WE_DONT_WANT_TO_MEASURE_THESE: GridColumn[] = [
    {
        title: "A",
        width: 120,
    },
    {
        title: "B",
        width: 160,
        icon: "headerCode",
    },
];

type DataBuilder = (x: number, y: number) => string;

function buildCellsForSelectionGetter(dataBuilder: DataBuilder): DataGridSearchProps["getCellsForSelection"] {
    const getCellsForSelection = (selection: Rectangle): CellArray => {
        const result: GridCell[][] = [];

        for (let y = selection.y; y < selection.y + selection.height; y++) {
            const row: GridCell[] = [];
            for (let x = selection.x; x < selection.x + selection.width; x++) {
                const data = dataBuilder(x, y);
                row.push({
                    allowOverlay: false,
                    kind: GridCellKind.Text,
                    displayData: data,
                    data,
                });
            }
            result.push(row);
        }

        return result;
    };

    return getCellsForSelection;
}

const getShortCellsForSelection = buildCellsForSelectionGetter((x, y) => `column ${x} row ${y}`);
const getLongCellsForSelection = buildCellsForSelectionGetter(
    (x, y) => `This cell is in column number ${x} and row number ${y}`
);

const theme = getDataEditorTheme();

const abortController = new AbortController();

describe("use-cell-sizer", () => {
    it("Measures a simple cell", async () => {
        const { result } = renderHook(() =>
            useCellSizer(COLUMNS, 1000, getShortCellsForSelection, theme, abortController)
        );

        const columnA = result.current.find(col => col.title === "A");
        const columnB = result.current.find(col => col.title === "B");

        expect(columnA).toBeDefined();
        expect(columnB).toBeDefined();

        // Keep in sync with the `displayData` up there.
        expect(columnA?.width).toBe(30);
        expect(columnB?.width).toBe(160);
    });

    it("Measures new columns when they arrive, doesn't re-measure existing ones", async () => {
        const { result, rerender } = renderHook(
            ({ getCellsForSelection, columns }) =>
                useCellSizer(columns, 1000, getCellsForSelection, theme, abortController),
            {
                initialProps: {
                    getCellsForSelection: getShortCellsForSelection,
                    columns: COLUMNS,
                },
            }
        );

        const shortColumnA = result.current.find(col => col.title === "A");
        const shortColumnB = result.current.find(col => col.title === "B");
        const shortColumnC = result.current.find(col => col.title === "C");

        expect(shortColumnA).toBeDefined();
        expect(shortColumnB).toBeDefined();
        expect(shortColumnC).not.toBeDefined();

        // Keep in sync with getShortCellsForSelection up there.
        expect(shortColumnA?.width).toBe(30);
        expect(shortColumnB?.width).toBe(160);

        // Re render with longer text and a new column with title C
        rerender({
            getCellsForSelection: getLongCellsForSelection,
            columns: A_COPY_OF_COLUMNS_THAT_ALSO_HAS_A_NEW_COLUMN_TITLED_C_THAT_WE_WILL_MEASURE_SOON_ENOUGH, // I told you!
        });

        const longColumnA = result.current.find(col => col.title === "A");
        const longColumnB = result.current.find(col => col.title === "B");
        const longColumnC = result.current.find(col => col.title === "C");

        expect(longColumnA).toBeDefined();
        expect(longColumnB).toBeDefined();
        expect(longColumnC).toBeDefined();

        // Keep in sync with getLongCellsForSelection up there.
        expect(longColumnA?.width).toBe(30);
        expect(longColumnB?.width).toBe(160);
        expect(longColumnC?.width).toBe(64);
    });

    it("Returns the default sizes if getCellsForSelection is not provided", async () => {
        const { result } = renderHook(() => useCellSizer(COLUMNS, 1000, undefined, theme, abortController));

        const columnA = result.current.find(col => col.title === "A");
        const columnB = result.current.find(col => col.title === "B");

        expect(columnA).toBeDefined();
        expect(columnB).toBeDefined();

        // The default is 150, keep in sync with `defaultSize` in use-cell-sizer.ts
        expect(columnA?.width).toBe(150);
        expect(columnB?.width).toBe(160);
    });

    it("Does not measure anything if every column is sized", async () => {
        const { result } = renderHook(() =>
            useCellSizer(
                A_BUNCH_OF_COLUMNS_THAT_ALREADY_HAVE_SIZES_WE_DONT_WANT_TO_MEASURE_THESE,
                1000,
                undefined,
                theme,
                abortController
            )
        );

        expect(result.current).toBe(A_BUNCH_OF_COLUMNS_THAT_ALREADY_HAVE_SIZES_WE_DONT_WANT_TO_MEASURE_THESE);
    });
});
