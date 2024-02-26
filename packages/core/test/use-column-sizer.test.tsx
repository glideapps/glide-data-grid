import { renderHook, cleanup } from "@testing-library/react-hooks";
import { type GridCell, GridCellKind, type GridColumn, type Rectangle } from "../src/index.js";
import { getDataEditorTheme, mergeAndRealizeTheme } from "../src/common/styles.js";
import type { DataGridSearchProps } from "../src/internal/data-grid-search/data-grid-search.js";
import { AllCellRenderers } from "../src/cells/index.js";
import type { GetCellRendererCallback } from "../src/cells/cell-types.js";
import type { CellArray, CustomCell } from "../src/internal/data-grid/data-grid-types.js";
import { useColumnSizer } from "../src/data-editor/use-column-sizer.js";
import { vi, expect, describe, it, beforeEach, afterEach } from "vitest";

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
    return (selection: Rectangle): CellArray => {
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
}

const getShortCellsForSelection = vi.fn(buildCellsForSelectionGetter((x, y) => `column ${x} row ${y}`) as any);
const getLongCellsForSelection = vi.fn(
    buildCellsForSelectionGetter((x, y) => `This cell is in column number ${x} and row number ${y}`) as any
);

const theme = getDataEditorTheme();

const abortController = new AbortController();

const SINGLE_COLUMN = [
    {
        title: "A",
        id: "ColumnA",
    },
];

const getCellRenderer: GetCellRendererCallback = cell => {
    if (cell.kind === GridCellKind.Custom) return undefined;
    return AllCellRenderers.find(x => x.kind === cell.kind) as any;
};

describe("use-column-sizer", () => {
    beforeEach(() => {
        getShortCellsForSelection.mockClear();
        getLongCellsForSelection.mockClear();
    });

    afterEach(async () => {
        await cleanup();
    });

    it("Measures a simple cell", async () => {
        const { result } = renderHook(() =>
            useColumnSizer(
                COLUMNS,
                1000,
                getShortCellsForSelection,
                400,
                20,
                500,
                mergeAndRealizeTheme(theme),
                getCellRenderer,
                abortController
            )
        );

        const columnA = result.current.sizedColumns.find(col => col.title === "A");
        const columnB = result.current.sizedColumns.find(col => col.title === "B");

        expect(columnA).toBeDefined();
        expect(columnB).toBeDefined();

        // Keep in sync with the `displayData` up there.
        expect(columnA?.width).toBe(32);
        expect(columnB?.width).toBe(160);
    });

    //a test to see that it can measure a custom cell
    it("Measures a custom cell", async () => {
        const { result } = renderHook(() =>
            useColumnSizer(
                SINGLE_COLUMN,
                1000,
                (selection: Rectangle): CellArray => {
                    const r: GridCell[][] = [];

                    for (let y = selection.y; y < selection.y + selection.height; y++) {
                        const row: GridCell[] = [];
                        for (let x = selection.x; x < selection.x + selection.width; x++) {
                            const data = `${x} ${y}`;
                            row.push({
                                allowOverlay: false,
                                kind: GridCellKind.Custom,
                                data,
                                copyData: data,
                            });
                        }
                        r.push(row);
                    }

                    return r;
                },
                400,
                20,
                500,
                mergeAndRealizeTheme(theme),
                () => {
                    return {
                        draw: () => true,
                        kind: GridCellKind.Custom,
                        measure: () => 212,
                        isMatch: (_cell: CustomCell): _cell is CustomCell => true,
                    } as any;
                },
                abortController
            )
        );

        expect(result.current.sizedColumns[0].width).toBe(212);
    });

    it("Measures column width based on title if longer than data", async () => {
        const columns: GridColumn[] = [
            {
                title: "Some very very long title that exceeds displayData width",
                id: "ColumnA",
            },
            {
                title: "Short title",
                id: "ColumnB",
            },
        ];

        const { result } = renderHook(() =>
            useColumnSizer(
                columns,
                500,
                getShortCellsForSelection,
                400,
                20,
                500,
                mergeAndRealizeTheme(theme, {cellHorizontalPadding: 12}),
                getCellRenderer,
                abortController
            )
        );

        const columnA = result.current.sizedColumns.find(col => col.title === "Some very very long title that exceeds displayData width");
        const columnB = result.current.sizedColumns.find(col => col.title === "Short title");

        expect(columnA).toBeDefined();
        expect(columnB).toBeDefined();

        // Width of column title plus twice the cellHorizontalPadding
        expect(columnA?.width).toBe(80);
        // Maximum width of cell data
        expect(columnB?.width).toBe(40);
    });

    it("Measures the last row", async () => {
        // eslint-disable-next-line sonarjs/no-identical-functions
        renderHook(() =>
            useColumnSizer(
                COLUMNS,
                1000,
                getShortCellsForSelection,
                400,
                20,
                500,
                mergeAndRealizeTheme(theme),
                getCellRenderer,
                abortController
            )
        );

        expect(getShortCellsForSelection).toBeCalledTimes(2);
        expect(getShortCellsForSelection).toHaveBeenNthCalledWith(
            1,
            {
                x: 0,
                y: 0,
                width: 2,
                height: 9,
            },
            expect.anything()
        );
        expect(getShortCellsForSelection).toHaveBeenLastCalledWith(
            {
                x: 0,
                y: 999,
                width: 2,
                height: 1,
            },
            expect.anything()
        );
    });

    it("Measures new columns when they arrive, doesn't re-measure existing ones", async () => {
        const { result, rerender } = renderHook(
            ({ getCellsForSelection, columns }) =>
                useColumnSizer(
                    columns,
                    1000,
                    getCellsForSelection,
                    400,
                    20,
                    500,
                    mergeAndRealizeTheme(theme),
                    getCellRenderer,
                    abortController
                ),
            {
                initialProps: {
                    getCellsForSelection: getShortCellsForSelection,
                    columns: COLUMNS,
                },
            }
        );

        const shortColumnA = result.current.sizedColumns.find(col => col.title === "A");
        const shortColumnB = result.current.sizedColumns.find(col => col.title === "B");
        const shortColumnC = result.current.sizedColumns.find(col => col.title === "C");

        expect(shortColumnA).toBeDefined();
        expect(shortColumnB).toBeDefined();
        expect(shortColumnC).not.toBeDefined();

        // Keep in sync with getShortCellsForSelection up there.
        expect(shortColumnA?.width).toBe(32);
        expect(shortColumnB?.width).toBe(160);

        // Re render with longer text and a new column with title C
        rerender({
            getCellsForSelection: getLongCellsForSelection,
            columns: A_COPY_OF_COLUMNS_THAT_ALSO_HAS_A_NEW_COLUMN_TITLED_C_THAT_WE_WILL_MEASURE_SOON_ENOUGH, // I told you!
        });

        const longColumnA = result.current.sizedColumns.find(col => col.title === "A");
        const longColumnB = result.current.sizedColumns.find(col => col.title === "B");
        const longColumnC = result.current.sizedColumns.find(col => col.title === "C");

        expect(longColumnA).toBeDefined();
        expect(longColumnB).toBeDefined();
        expect(longColumnC).toBeDefined();

        // Keep in sync with getLongCellsForSelection up there.
        expect(longColumnA?.width).toBe(32);
        expect(longColumnB?.width).toBe(160);
        expect(longColumnC?.width).toBe(66);
    });

    it("Returns the default sizes if getCellsForSelection is not provided", async () => {
        const { result } = renderHook(() =>
            useColumnSizer(
                COLUMNS,
                1000,
                undefined,
                400,
                20,
                500,
                mergeAndRealizeTheme(theme),
                getCellRenderer,
                abortController
            )
        );

        const columnA = result.current.sizedColumns.find(col => col.title === "A");
        const columnB = result.current.sizedColumns.find(col => col.title === "B");

        expect(columnA).toBeDefined();
        expect(columnB).toBeDefined();

        // The default is 150, keep in sync with `defaultSize` in use-cell-sizer.ts
        expect(columnA?.width).toBe(150);
        expect(columnB?.width).toBe(160);
    });

    it("Does not measure anything if every column is sized", async () => {
        const { result } = renderHook(() =>
            useColumnSizer(
                A_BUNCH_OF_COLUMNS_THAT_ALREADY_HAVE_SIZES_WE_DONT_WANT_TO_MEASURE_THESE,
                1000,
                undefined,
                400,
                50,
                500,
                mergeAndRealizeTheme(theme),
                getCellRenderer,
                abortController
            )
        );

        expect(result.current.sizedColumns).toBe(
            A_BUNCH_OF_COLUMNS_THAT_ALREADY_HAVE_SIZES_WE_DONT_WANT_TO_MEASURE_THESE
        );
    });

    it("Removes the canvas from the DOM when unmounted", async () => {
        // eslint-disable-next-line sonarjs/no-identical-functions
        const { unmount } = renderHook(() =>
            useColumnSizer(
                COLUMNS,
                1000,
                getShortCellsForSelection,
                400,
                20,
                500,
                mergeAndRealizeTheme(theme),
                getCellRenderer,
                abortController
            )
        );

        expect(document.querySelector("canvas")).toBeDefined();

        unmount();

        expect(document.querySelector("canvas")).toBeNull();
    });

    it("Distributes extra width among columns if total column width is less than client width", async () => {
        // Setup columns with a known total width smaller than the clientWidth
        const SMALL_COLUMNS: GridColumn[] = [
            {
                title: "A",
                id: "ColumnA",
                width: 100,
            },
            {
                title: "B",
                id: "ColumnB",
                width: 150,
            },
            {
                title: "C",
                id: "ColumnC",
                grow: 1,
            },
        ];

        const { result } = renderHook(() =>
            useColumnSizer(
                SMALL_COLUMNS,
                500,
                getShortCellsForSelection,
                400,
                20,
                500,
                mergeAndRealizeTheme(theme),
                getCellRenderer,
                abortController
            )
        );

        const columnA = result.current.sizedColumns.find(col => col.title === "A");
        const columnB = result.current.sizedColumns.find(col => col.title === "B");
        const columnC = result.current.sizedColumns.find(col => col.title === "C");

        expect(columnA).toBeDefined();
        expect(columnB).toBeDefined();
        expect(columnC).toBeDefined();

        // The original widths
        expect(columnA?.width).toBe(100);
        expect(columnB?.width).toBe(150);
        expect(columnC?.width).toBe(150);
    });
});
