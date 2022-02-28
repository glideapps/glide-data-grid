import { renderHook } from "@testing-library/react-hooks";
import { DataEditorProps, GridCell, GridCellKind, GridColumn, Rectangle } from "..";
import { getDataEditorTheme } from "../common/styles";
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

const A_COPY_OF_COLUMNS_THAT_ALSO_HAS_A_NEW_COLUMN_TITLED_C_THAT_WE_WILL_MEASURE_SOON_ENOUGH = [
    ...COLUMNS,
    {
        title: "C",
        id: "ColumnC",
    },
];

type DataBuilder = (x: number, y: number) => string;

function buildCellsForSelectionGetter(dataBuilder: DataBuilder): DataEditorProps["getCellsForSelection"] {
    const getCellsForSelection = (selection: Rectangle): readonly (readonly GridCell[])[] => {
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

describe("use-cell-sizer", () => {
    it("Measures a simple cell", async () => {
        const { result } = renderHook(() => useCellSizer(COLUMNS, 1000, getShortCellsForSelection, theme));

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
            ({ getCellsForSelection, columns }) => useCellSizer(columns, 1000, getCellsForSelection, theme),
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
});
