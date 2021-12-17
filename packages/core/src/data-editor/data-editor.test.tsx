import { describe, test, expect, beforeEach } from "jest-without-globals";
import * as React from "react";
import { render, fireEvent, screen, act, createEvent } from "@testing-library/react";
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
    } else if (col === 8) {
        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            data: `Data: ${col}, ${row}`,
            displayData: `שלום ${col}, ${row}`,
        };
    } else if (col === 9) {
        return {
            kind: GridCellKind.Markdown,
            allowOverlay: true,
            data: `# Header: ${col}, ${row}`,
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
    Element.prototype.scrollBy = jest.fn();
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

    return scroller;
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
    const [extraRows, setExtraRows] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState(p.selectedRows ?? CompactSelection.empty());

    const onGridSelectionChange = React.useCallback(
        (s: GridSelection | undefined) => {
            setSel(s);
            p.onGridSelectionChange?.(s);
        },
        [p]
    );

    const onRowAppened = React.useCallback(() => {
        setExtraRows(cv => cv + 1);
        p.onRowAppended?.();
    }, [p]);

    const onSelectedRowsChange = React.useCallback(
        (newVal: CompactSelection) => {
            setSelectedRows(newVal);
            p.onSelectedRowsChange?.(newVal);
        },
        [p]
    );

    return (
        <DataEditor
            {...p}
            gridSelection={sel}
            selectedRows={selectedRows}
            onGridSelectionChange={onGridSelectionChange}
            onSelectedRowsChange={onSelectedRowsChange}
            rows={p.rows + extraRows}
            onRowAppended={p.onRowAppended === undefined ? undefined : onRowAppened}
        />
    );
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

    test("Uneven rows cell click", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} rowHeight={r => (r % 2 === 0 ? 32 : 64)} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 64 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 64 + 16, // Row 1 (0 indexed)
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

    test("Group header sections", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                getGroupDetails={g => ({
                    name: g,
                    icon: "headerCode",
                })}
                columns={basicProps.columns.map(c => ({ ...c, group: "A" }))}
                onSelectedColumnsChange={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(CompactSelection.fromSingleSelection([0, 10]), expect.anything());
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

    test("Open markdown overlay", async () => {
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 980, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 980, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseDown(canvas, {
            clientX: 980, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 980, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        const overlay = screen.getByText("Header: 9, 1");
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

    test("Send edit", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellEdited={spy} />, {
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

        fireEvent.keyDown(overlay, {
            key: "Enter",
        });

        expect(spy).toBeCalledWith([1, 1], expect.objectContaining({ data: "j" }));
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

    test("Arrow shift left", async () => {
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
            shiftKey: true,
            key: "ArrowLeft",
        });

        expect(spy).toBeCalledWith({ cell: [1, 1], range: { x: 0, y: 1, width: 2, height: 1 } });
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

    test("Arrow shift right", async () => {
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
            shiftKey: true,
            key: "ArrowRight",
        });

        expect(spy).toBeCalledWith({ cell: [1, 1], range: { x: 1, y: 1, width: 2, height: 1 } });
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

    test("Trigger search results", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} showSearch={true} onSearchClose={spy} />, {
            wrapper: Context,
        });
        prep();

        jest.useFakeTimers();
        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, {
            target: {
                value: "1, 2",
            },
        });
        act(() => {
            jest.runAllTimers();
        });

        const searchResult = screen.getByTestId("search-result-area");

        expect(searchResult).toHaveTextContent("111 results");

        fireEvent.keyDown(searchInput, {
            key: "Enter",
        });
        fireEvent.keyDown(searchInput, {
            shiftKey: true,
            key: "Enter",
        });
        fireEvent.keyDown(searchInput, {
            key: "Escape",
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(spy).toHaveBeenCalled();
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

    test("Hover header does not fetch invalid cell", async () => {
        const spy = jest.fn(basicProps.getCellContent);

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} rowMarkers="both" getCellContent={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");

        spy.mockClear();

        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Blit does not crash vertical scroll", async () => {
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        const scroller = prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => c.width).reduce((pv, cv) => pv + cv, 0)
            );
            jest.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            jest.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            jest.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 55);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => c.width).reduce((pv, cv) => pv + cv, 0)
            );
            jest.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            jest.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            jest.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(canvas).toBeInTheDocument();
    });

    test("Blit does not crash horizontal scroll", async () => {
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        const scroller = prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => c.width).reduce((pv, cv) => pv + cv, 0)
            );
            jest.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            jest.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 55);
            jest.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => c.width).reduce((pv, cv) => pv + cv, 0)
            );
            jest.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            jest.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            jest.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(canvas).toBeInTheDocument();
    });

    test("New row", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                onRowAppended={spy}
                trailingRowOptions={{
                    hint: "New Row",
                    sticky: true,
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        jest.useFakeTimers();
        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 990, // Trailing row
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 990, // Trailing row
        });

        expect(spy).toHaveBeenCalled();

        act(() => {
            jest.runAllTimers();
        });

        expect(Element.prototype.scrollBy).toHaveBeenCalled();
    });

    test("Click row marker", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onSelectedRowsChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();

        jest.useFakeTimers();
        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith(CompactSelection.fromSingleSelection(2));
    });

    test("Shift click row marker", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onSelectedRowsChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith(CompactSelection.fromSingleSelection([2, 6]));
    });

    test("Ctrl click row marker", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onSelectedRowsChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        fireEvent.mouseDown(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith(CompactSelection.fromSingleSelection(2).add(5));

        spy.mockClear();

        fireEvent.mouseDown(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith(CompactSelection.fromSingleSelection(2));
    });

    test("Shift click grid selection", async () => {
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

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            cell: [1, 2],
            range: {
                x: 1,
                y: 2,
                width: 2,
                height: 5,
            },
        });
    });

    test("Fill down", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} enableDownfill={true} onCellEdited={spy} />, {
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

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 68,
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledTimes(8);
    });

    test("Clear selection", async () => {
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

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        spy.mockClear();

        fireEvent.keyDown(canvas, {
            key: "Escape",
        });

        expect(spy).toBeCalledWith(undefined);
    });

    test("Delete range", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} />, {
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

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            key: "Delete",
        });

        expect(spy).toBeCalledTimes(10);
    });

    test("Click out of bounds", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} columns={basicProps.columns.slice(0, 2)} onGridSelectionChange={spy} />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 100, // Col A
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 100, // Col A
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 200, // Col B
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 200, // Col B
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        spy.mockClear();

        fireEvent.mouseDown(canvas, {
            shiftKey: true,
            clientX: 700, // OOB
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            shiftKey: true,
            clientX: 700, // OOB
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        expect(spy).toBeCalledWith(undefined);
    });

    test("Delete Column", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} />, {
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

        fireEvent.keyDown(canvas, {
            key: "Delete",
        });

        expect(spy).toBeCalledTimes(1000);
    });

    test("DND Columns", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onColumnMoved={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 250,
            clientY: 16,
        });

        fireEvent.mouseMove(canvas, {
            clientX: 200,
            clientY: 16,
        });

        fireEvent.mouseMove(canvas, {
            clientX: 150,
            clientY: 16,
        });

        fireEvent.mouseMove(canvas, {
            clientX: 100,
            clientY: 16,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 100, // Col A
            clientY: 16, // Header
        });

        expect(spy).toBeCalledWith(1, 0);
    });

    test("Select range with mouse", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2
        });

        spy.mockClear();
        fireEvent.mouseMove(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });

        expect(spy).toBeCalledWith({ cell: [1, 2], range: { height: 11, width: 3, x: 1, y: 2 } });

        fireEvent.mouseUp(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });
    });

    test("Select all", async () => {
        const spy = jest.fn();
        const rowsSpy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rowMarkers="both"
                onGridSelectionChange={spy}
                onSelectedRowsChange={rowsSpy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 10,
            clientY: 10,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10,
            clientY: 10,
        });

        expect(spy).toBeCalledWith(undefined);
        expect(rowsSpy).toBeCalledWith(CompactSelection.fromSingleSelection([0, 1000]));

        fireEvent.mouseDown(canvas, {
            clientX: 10,
            clientY: 10,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10,
            clientY: 10,
        });

        spy.mockClear();
        expect(rowsSpy).toBeCalledWith(CompactSelection.empty());
    });

    test("Draggable", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rowMarkers="both"
                onDragStart={e => {
                    spy(e);
                    e.setData("text/plain", "payload");
                }}
                isDraggable={true}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();
        // const canvas = screen.getByTestId("data-grid-canvas");

        if (scroller !== null) {
            const mockEv = createEvent.dragStart(scroller);
            Object.assign(mockEv, {
                clientX: 100,
                clientY: 100,
                dataTransfer: {
                    setData: () => undefined,
                    setDragImage: () => undefined,
                    effectAllowed: null,
                },
            });
            fireEvent(scroller, mockEv);
        }

        expect(spy).toHaveBeenCalled();
    });

    test("Minimap issues scroll", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} rowMarkers="both" showMinimap={true} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const minimap = screen.getByTestId("minimap-container");

        fireEvent.mouseDown(minimap, {
            clientX: 940,
            clientY: 940,
        });

        fireEvent.mouseMove(minimap, {
            buttons: 1,
            clientX: 941,
            clientY: 941,
        });

        fireEvent.mouseUp(minimap, {
            clientX: 940,
            clientY: 940,
        });

        expect(Element.prototype.scrollTo).toBeCalled();
    });
});
