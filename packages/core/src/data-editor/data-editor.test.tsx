import { describe, test, expect, beforeEach } from "jest-without-globals";
import * as React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { CompactSelection, DataEditor, DataEditorProps, GridCell, GridCellKind, GridSelection } from "..";

jest.mock("react-virtualized-auto-sizer", () => {
    return {
        __esModule: true,
        default: ({ children }: any) => children({ height: 1000, width: 1000 }),
        foo: "mocked foo",
    };
});

const makeCell = (cell: readonly [number, number]): GridCell => {
    const [col, row] = cell;
    if (col === 0) {
        return {
            kind: GridCellKind.RowID,
            allowOverlay: false,
            data: `Data: ${col}, ${row}`,
        };
    } else if (col === 3) {
        return {
            kind: GridCellKind.Number,
            allowOverlay: true,
            data: 10,
            displayData: `${row}`,
        };
    } else if (col === 4) {
        return {
            kind: GridCellKind.Drilldown,
            allowOverlay: false,
            data: [
                {
                    img: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
                    text: "Foobar",
                },
            ],
        };
    } else if (col === 5) {
        return {
            kind: GridCellKind.Protected,
            allowOverlay: false,
        };
    } else if (col === 6) {
        return {
            kind: GridCellKind.Bubble,
            allowOverlay: false,
            data: ["Foobar"],
        };
    } else if (col === 7) {
        return {
            kind: GridCellKind.Boolean,
            allowOverlay: false,
            data: row % 2 === 0,
            allowEdit: true,
            showUnchecked: true,
        };
    }
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        data: `Data: ${col}, ${row}`,
        displayData: `${col}, ${row}`,
    };
};
const basicProps: DataEditorProps = {
    columns: [
        {
            title: "A",
            width: 150,
            icon: "headerRowID",
        },
        {
            title: "B",
            width: 160,
            icon: "headerCode",
        },
        {
            title: "C",
            width: 170,
            icon: "headerNumber",
        },
        {
            title: "D",
            width: 180,
            icon: "headerString",
        },
        {
            title: "E",
            width: 40,
            icon: "headerBoolean",
        },
        {
            title: "F",
            width: 50,
            icon: "headerUri",
        },
        {
            title: "G",
            width: 60,
            icon: "headerVideoUri",
        },
        {
            title: "H",
            width: 70,
            icon: "headerEmoji",
        },
        {
            title: "I",
            width: 80,
            icon: "headerImage",
        },
        {
            title: "J",
            width: 90,
            icon: "headerPhone",
        },
    ],
    getCellContent: makeCell,
    getCellsForSelection: rect => {
        const result: GridCell[][] = [];
        for (let y = rect.y; y < rect.y + rect.height; y++) {
            const row: GridCell[] = [];
            for (let x = rect.x; x < rect.x + rect.width; x++) {
                row.push(makeCell([x, y]));
            }
            result.push(row);
        }
        return result;
    },
    groupHeaderHeight: 32,
    headerHeight: 36,
    rowHeight: 32,
    onRowAppended: () => undefined,
    trailingRowOptions: {
        hint: "New row",
        sticky: true,
        tint: true,
    },
    rows: 1000,
};

beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
    Object.assign(navigator, {
        clipboard: {
            writeText: jest.fn(() => Promise.resolve()),
            readText: jest.fn(() => Promise.resolve("1, 2\t2, 2")),
        },
    });
    Element.prototype.getBoundingClientRect = () => ({
        bottom: 1000,
        height: 1000,
        left: 0,
        right: 1000,
        top: 0,
        width: 1000,
        x: 0,
        y: 0,
        toJSON: () => "",
    });
    Image.prototype.decode = jest.fn();
});

function prep() {
    const scroller = document.getElementsByClassName("dvn-scroller").item(0);
    if (scroller !== null) {
        jest.spyOn(scroller, "clientWidth", "get").mockImplementation(() => 1000);
        jest.spyOn(scroller, "clientHeight", "get").mockImplementation(() => 1000);
    }

    act(() => {
        jest.runAllTimers();
    });
    jest.useRealTimers();
}

const Context: React.FC = p => {
    return (
        <>
            {p.children}
            <div id="portal"></div>
        </>
    );
};

const EventedDataEditor: React.VFC<DataEditorProps> = p => {
    const [sel, setSel] = React.useState<GridSelection>();

    const onGridSelectionChange = React.useCallback(
        (s: GridSelection | undefined) => {
            setSel(s);
            p.onGridSelectionChange?.(s);
        },
        [p]
    );

    return <DataEditor {...p} gridSelection={sel} onGridSelectionChange={onGridSelectionChange} />;
};

describe("data-editor", () => {
    test("Emits cell click", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
    });

    test("Emits header click", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(1, expect.anything());
    });

    test("Rename group header shows", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                columns={basicProps.columns.map(c => ({ ...c, group: c.title }))}
                onGroupHeaderRenamed={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Group Header
        });

        await new Promise(r => window.setTimeout(r, 100));

        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Group Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Group Header
        });

        expect(spy).not.toHaveBeenCalled();
        const groupInput = screen.getByTestId("group-rename-input");
        expect(groupInput).toBeInTheDocument();

        fireEvent.change(groupInput, {
            target: {
                value: "Test",
            },
        });

        fireEvent.keyDown(groupInput, {
            key: "Enter",
        });

        expect(spy).toHaveBeenCalledWith("B", "Test");
    });

    test("Emits header menu click", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                columns={basicProps.columns.map(c => ({ ...c, hasMenu: true }))}
                onHeaderMenuClick={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        await new Promise(r => window.setTimeout(r, 100));

        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(1, expect.anything());
    });

    test("Emits item hover on correct location", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} rowMarkers="both" onItemHovered={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({ location: [1, 1] }));
    });

    test("Emits mouse move on correct location", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} rowMarkers="both" onMouseMove={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({ location: [1, 1] }));
    });

    test("Delete row", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                onDeleteRows={spy}
                selectedRows={CompactSelection.fromSingleSelection(2)}
                rowMarkers="both"
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.keyDown(canvas, {
            key: "Delete",
        });

        expect(spy).toHaveBeenCalled();
    });

    test("Open and close overlay", async () => {
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        const overlay = screen.getByDisplayValue("Data: 1, 1");
        expect(overlay).toBeInTheDocument();

        fireEvent.keyDown(canvas, {
            key: "Escape",
        });

        expect(overlay).not.toBeInTheDocument();
    });

    test("Open overlay with keypress", async () => {
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
        });

        fireEvent.keyUp(canvas, {
            keyCode: 74,
        });

        const overlay = screen.getByDisplayValue("j");
        expect(overlay).toBeInTheDocument();

        fireEvent.keyDown(canvas, {
            key: "Escape",
        });

        expect(overlay).not.toBeInTheDocument();
    });

    test("Arrow left", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowLeft",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [0, 1] }));
    });

    test("Arrow right", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [2, 1] }));
    });

    test("Tab navigation", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "Tab",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [2, 1] }));

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "Tab",
            shiftKey: true,
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [1, 1] }));
    });

    test("Arrow down", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [1, 2] }));
    });

    test("Arrow up", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowUp",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [1, 1] }));
    });

    test("Search close", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} showSearch={true} onSearchClose={spy} />, {
            wrapper: Context,
        });
        prep();

        const searchClose = screen.getByTestId("search-close-button");
        fireEvent.click(searchClose);
        expect(spy).toBeCalled();
    });

    test("Copy/paste", async () => {
        const spy = jest.fn();
        const pasteSpy = jest.fn((_target: any, _values: any) => true);
        jest.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} onGridSelectionChange={spy} onPaste={(...args) => pasteSpy(...args)} />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        jest.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
            shiftKey: true,
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({ cell: [1, 2], range: { x: 1, y: 2, width: 2, height: 1 } })
        );

        fireEvent.copy(window);
        expect(navigator.clipboard.writeText).toBeCalledWith("1, 2\t2, 2");

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ cell: [1, 3] }));

        fireEvent.paste(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(pasteSpy).toBeCalledWith([1, 3], [["1, 2", "2, 2"]]);
    });
});
