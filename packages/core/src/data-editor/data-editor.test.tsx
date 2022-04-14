import { describe, test, expect, beforeEach } from "jest-without-globals";
import * as React from "react";
import { render, fireEvent, screen, act, createEvent } from "@testing-library/react";
import {
    CompactSelection,
    DataEditor,
    DataEditorProps,
    GridCell,
    GridCellKind,
    GridSelection,
    isSizedGridColumn,
    Item,
} from "..";
import { DataEditorRef } from "./data-editor";

jest.mock("react-virtualized-auto-sizer", () => {
    return {
        __esModule: true,
        default: ({ children }: any) => children({ height: 1000, width: 1000 }),
        foo: "mocked foo",
    };
});

const makeCell = (cell: Item): GridCell => {
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
    getCellsForSelection: true,
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
            readText: jest.fn(() =>
                Promise.resolve(`Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`)
            ),
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

function prep(resetTimers: boolean = true) {
    const scroller = document.getElementsByClassName("dvn-scroller").item(0);
    if (scroller !== null) {
        jest.spyOn(scroller, "clientWidth", "get").mockImplementation(() => 1000);
        jest.spyOn(scroller, "clientHeight", "get").mockImplementation(() => 1000);
    }

    act(() => {
        jest.runAllTimers();
    });
    if (resetTimers) {
        jest.useRealTimers();
    } else {
        act(() => {
            jest.runAllTimers();
        });
    }

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

// eslint-disable-next-line react/display-name
const EventedDataEditor = React.forwardRef<DataEditorRef, DataEditorProps>((p, ref) => {
    const [sel, setSel] = React.useState<GridSelection | undefined>(p.gridSelection);
    const [extraRows, setExtraRows] = React.useState(0);

    const onGridSelectionChange = React.useCallback(
        (s: GridSelection) => {
            setSel(s);
            p.onGridSelectionChange?.(s);
        },
        [p]
    );

    const onRowAppened = React.useCallback(() => {
        setExtraRows(cv => cv + 1);
        p.onRowAppended?.();
    }, [p]);

    return (
        <DataEditor
            {...p}
            ref={ref}
            gridSelection={sel}
            onGridSelectionChange={onGridSelectionChange}
            rows={p.rows + extraRows}
            onRowAppended={p.onRowAppended === undefined ? undefined : onRowAppened}
        />
    );
});

describe("data-editor", () => {
    test("Focus a11y cell", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const a11ycell = screen.getByTestId("glide-cell-0-5");
        fireEvent.focus(a11ycell);

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [0, 5] }),
            })
        );
    });

    test("Click a11y cell", async () => {
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep(false);

        const a11ycell = screen.getByTestId("glide-cell-0-5");
        fireEvent.click(a11ycell);
    });

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

    test("Emits activated event on double click", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
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

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1]);
    });

    test("Emits activated event on Enter key", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
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
            key: "Enter",
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1]);
    });

    test("Emits activated event on Space key", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
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
            key: " ",
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1]);
    });

    test("Doesn't emit cell click if mouseDown happened in a different cell", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B, ends at x = 310
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 320, // Col C, started at x = 310
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Doesn't emit header click if mouseDown happened in a different cell", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B, ends at x = 310
            clientY: 16, // Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 320, // Col C, started at x = 310
            clientY: 16, // Header
        });

        expect(spy).not.toHaveBeenCalled();
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

    test("Emits finished editing", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<DataEditor {...basicProps} onFinishedEditing={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
        });

        const overlay = screen.getByDisplayValue("j");

        fireEvent.keyDown(overlay, {
            key: "Enter",
        });

        expect(spy).toBeCalledWith({ allowOverlay: true, data: "j", displayData: "1, 1", kind: "text" }, [0, 1]);
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
            <EventedDataEditor
                {...basicProps}
                getGroupDetails={g => ({
                    name: g,
                    icon: "headerCode",
                })}
                columns={basicProps.columns.map(c => ({ ...c, group: "A" }))}
                onGridSelectionChange={spy}
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

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.fromSingleSelection([0, 10]),
            rows: CompactSelection.empty(),
        });

        spy.mockClear();

        fireEvent.mouseDown(canvas, {
            ctrlKey: true,
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        fireEvent.mouseUp(canvas, {
            ctrlKey: true,
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        });

        spy.mockClear();

        fireEvent.mouseDown(canvas, {
            ctrlKey: true,
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        fireEvent.mouseUp(canvas, {
            ctrlKey: true,
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
            rows: CompactSelection.empty(),
            columns: CompactSelection.fromSingleSelection([0, 10]),
        });
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

    test("Delete cell", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                onDelete={spy}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                    current: {
                        cell: [2, 2],
                        range: {
                            x: 2,
                            y: 2, 
                            height: 1,
                            width: 1,
                        },
                        rangeStack: []
                    },
                }}
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: {
                cell: [2, 2],
                range: {
                    x: 2,
                    y: 2, 
                    height: 1,
                    width: 1,
                },
                rangeStack: []
            },
        });
    });

    test("Delete cell callback result", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                onDelete={sel => sel}
                onCellEdited={spy}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                    current: {
                        cell: [2, 2],
                        range: {
                            x: 2,
                            y: 2, 
                            height: 1,
                            width: 1,
                        },
                        rangeStack: []
                    },
                }}
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

        expect(spy).toHaveBeenCalledWith([2, 2], expect.anything());
    });

    test("Delete row", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                onDelete={spy}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.fromSingleSelection(2),
                    current: undefined,
                }}
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

    test("Delete range", async () => {
        const spy = jest.fn();

        jest.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                onDelete={spy}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                    current: {
                        cell: [2, 2],
                        range: { x: 2, y: 2, width: 4, height: 10 },
                        rangeStack: [],
                    },
                }}
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: {
                cell: [2, 2],
                range: { x: 2, y: 2, width: 4, height: 10 },
                rangeStack: [],
            },
        });
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

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [0, 1] }) }));
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

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 1], range: { x: 0, y: 1, width: 2, height: 1 } }),
            })
        );
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

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [2, 1] }) }));
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

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 1], range: { x: 1, y: 1, width: 2, height: 1 } }),
            })
        );
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

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [2, 1] }) }));

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "Tab",
            shiftKey: true,
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 1] }) }));
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

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 2] }) }));
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

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 1] }) }));
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
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 2], range: { x: 1, y: 2, width: 2, height: 1 } }),
            })
        );

        fireEvent.copy(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(navigator.clipboard.writeText).toBeCalledWith("1, 2\t2, 2");

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 3] }) }));

        fireEvent.paste(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(pasteSpy).toBeCalledWith(
            [1, 3],
            [
                ["Sunday", "Dogs", "https://google.com"],
                ["Monday", "Cats", "https://google.com"],
                ["Tuesday", "Turtles", "https://google.com"],
                ["Wednesday", "Bears", "https://google.com"],
                ["Thursday", "L  ions", "https://google.com"],
                ["Friday", "Pigs", "https://google.com"],
                [
                    "Saturday",
                    'Turkeys and some "quotes" and\na new line char "more quotes" plus a tab  .',
                    "https://google.com",
                ],
            ]
        );
    });

    test("Copy/paste with simple getCellsForSelection", async () => {
        const spy = jest.fn();
        const pasteSpy = jest.fn((_target: any, _values: any) => true);
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                getCellsForSelection={true}
                onGridSelectionChange={spy}
                onPaste={(...args) => pasteSpy(...args)}
            />,
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
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 2], range: { x: 1, y: 2, width: 2, height: 1 } }),
            })
        );

        fireEvent.copy(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(navigator.clipboard.writeText).toBeCalledWith("1, 2\t2, 2");

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 3] }) }));

        fireEvent.paste(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(pasteSpy).toBeCalledWith(
            [1, 3],
            [
                ["Sunday", "Dogs", "https://google.com"],
                ["Monday", "Cats", "https://google.com"],
                ["Tuesday", "Turtles", "https://google.com"],
                ["Wednesday", "Bears", "https://google.com"],
                ["Thursday", "L  ions", "https://google.com"],
                ["Friday", "Pigs", "https://google.com"],
                [
                    "Saturday",
                    'Turkeys and some "quotes" and\na new line char "more quotes" plus a tab  .',
                    "https://google.com",
                ],
            ]
        );
    });

    test("Copy rows", async () => {
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                gridSelection={{
                    current: undefined,
                    rows: CompactSelection.fromSingleSelection([3, 6]),
                    columns: CompactSelection.empty(),
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        jest.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);

        fireEvent.copy(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(navigator.clipboard.writeText).toBeCalled();
    });

    test("Copy cols", async () => {
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.fromSingleSelection([3, 6]),
                    rows: CompactSelection.empty(),
                    current: undefined,
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        jest.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);

        fireEvent.copy(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(navigator.clipboard.writeText).toBeCalled();
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
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
            );
            jest.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            jest.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            jest.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 55);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
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
        render(
            <DataEditor
                highlightRegions={[
                    {
                        color: "#12345623",
                        range: {
                            x: 2,
                            y: 2,
                            width: 3,
                            height: 10,
                        },
                    },
                ]}
                {...basicProps}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
            );
            jest.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            jest.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 55);
            jest.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            jest.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
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

        expect(Element.prototype.scrollTo).toHaveBeenCalled();
    });

    test("Click row marker", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(2),
        });
    });

    test("Shift click row marker", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection([2, 6]),
        });
    });

    test("Shift click row marker - no multi-select", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} rowSelect={"single"} onGridSelectionChange={spy} rowMarkers="both" />,
            {
                wrapper: Context,
            }
        );
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(5),
        });
    });

    test("Ctrl click row marker", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(2).add(5),
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(2),
        });
    });

    test("Ctrl click row marker - no multi", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} rowSelect={"single"} onGridSelectionChange={spy} rowMarkers="both" />,
            {
                wrapper: Context,
            }
        );
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(5),
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

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        });
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

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                current: {
                    cell: [1, 2],
                    range: {
                        x: 1,
                        y: 2,
                        width: 2,
                        height: 5,
                    },
                    rangeStack: [],
                },
            })
        );
    });

    test("Fill down", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                keybindings={{
                    downFill: true,
                }}
                onCellEdited={spy}
            />,
            {
                wrapper: Context,
            }
        );
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

    test("Fill right", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} keybindings={{ rightFill: true }} onCellEdited={spy} />, {
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
            keyCode: 82,
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledTimes(5);
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

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        });
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

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        });
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

    test("Resize Column", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onColumnMoved={spy} onColumnResized={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 310, // Col B Right Edge
            clientY: 16, // Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 350,
            clientY: 16,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 200);
    });

    test("Resize Multiple Column", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.fromSingleSelection([0, 5]),
                    rows: CompactSelection.empty(),
                    current: undefined,
                }}
                onColumnResized={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 310, // Col B Right Edge
            clientY: 16, // Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 350,
            clientY: 16,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toBeCalledTimes(5);
    });

    test("Resize Last Column", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                columns={basicProps.columns.slice(0, 2)}
                onColumnMoved={spy}
                onColumnResized={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 314, // Col B Right Edge
            clientY: 16, // Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 350,
            clientY: 16,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 200);
    });

    test("Drag reorder row", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} rowMarkers="number" onRowMoved={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 10, // Col B Right Edge
            clientY: 300, // Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 10,
            clientY: 400,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10,
            clientY: 400,
        });

        expect(spy).toBeCalledWith(8, 11);
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

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: { cell: [1, 2], range: { height: 11, width: 3, x: 1, y: 2 }, rangeStack: [] },
            })
        );

        fireEvent.mouseUp(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });
    });

    test("Select all", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} rowMarkers="both" onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
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

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection([0, 1000]),
        });

        fireEvent.mouseDown(canvas, {
            clientX: 10,
            clientY: 10,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 10,
            clientY: 10,
        });

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        });
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

    test("Click cell does not double-emit selectedrows/columns", async () => {
        const gridSelectionSpy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={gridSelectionSpy} />, {
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

        expect(gridSelectionSpy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 2], range: { height: 1, width: 1, x: 1, y: 2 } }),
            })
        );
        gridSelectionSpy.mockClear();

        fireEvent.keyDown(canvas, {
            key: "Escape",
        });

        expect(gridSelectionSpy).toBeCalledWith({
            rows: CompactSelection.empty(),
            columns: CompactSelection.empty(),
        });
    });

    test("Span expansion", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();

        const getCellContent: typeof basicProps["getCellContent"] = c => {
            const [col, row] = c;

            if (row === 3 && col >= 2 && col <= 3) {
                const cell = {
                    ...basicProps.getCellContent([2, 3]),
                    span: [2, 3] as const,
                };
                return cell;
            }

            return basicProps.getCellContent(c);
        };

        render(
            <EventedDataEditor
                {...basicProps}
                getCellContent={getCellContent}
                getCellsForSelection={true}
                onGridSelectionChange={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 350, // Col C
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            shiftKey: true,
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [2, 2], range: { x: 2, y: 2, width: 2, height: 2 } }),
            })
        );

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [2, 3], range: { x: 2, y: 3, width: 2, height: 1 } }),
            })
        );
    });

    test("Imperative Handle works", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        act(() => {
            ref.current?.emit("delete");
            ref.current?.emit("fill-right");
            ref.current?.emit("fill-down");
            ref.current?.emit("copy");
            ref.current?.emit("paste");

            ref.current?.scrollTo(5, 10);
            ref.current?.updateCells([{ cell: [0, 0] }]);
        });
    });

    test("Ctrl Arrow keys", async () => {
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
            ctrlKey: true,
        });

        const cols = basicProps.columns.length;

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 999] }) }));

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
            ctrlKey: true,
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({ current: expect.objectContaining({ cell: [cols - 1, 999] }) })
        );

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowUp",
            ctrlKey: true,
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({ current: expect.objectContaining({ cell: [cols - 1, 0] }) })
        );

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowLeft",
            ctrlKey: true,
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [0, 0] }) }));

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
            ctrlKey: true,
            shiftKey: true,
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [0, 0], range: { x: 0, y: 0, width: 1, height: 1000 } }),
            })
        );

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
            ctrlKey: true,
            shiftKey: true,
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [0, 0], range: { x: 0, y: 0, width: cols, height: 1000 } }),
            })
        );

        // spy.mockClear();
        // fireEvent.keyDown(canvas, {
        //     key: "ArrowUp",
        //     ctrlKey: true,
        //     shiftKey: true,
        // });

        // expect(spy).toBeCalledWith(
        //     expect.objectContaining({ cell: [0, 0], range: { x: 0, y: 0, width: cols, height: 1 } })
        // );

        // spy.mockClear();
        // fireEvent.keyDown(canvas, {
        //     key: "ArrowLeft",
        //     ctrlKey: true,
        //     shiftKey: true,
        // });

        // expect(spy).toBeCalledWith(
        //     expect.objectContaining({ cell: [0, 0], range: { x: 0, y: 0, width: 1, height: 1 } })
        // );
    });

    test("Select range with mouse going out of bounds", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        const columns = basicProps.columns.slice(0, 2);
        render(<EventedDataEditor {...basicProps} columns={columns} onGridSelectionChange={spy} />, {
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

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 2], range: { height: 11, width: 1, x: 1, y: 2 } }),
            })
        );

        fireEvent.mouseUp(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });
    });

    test("Select all", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(<EventedDataEditor {...basicProps} keybindings={{ selectAll: true }} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.keyDown(canvas, {
            key: "a",
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: {
                cell: [0, 0],
                range: {
                    x: 0,
                    y: 0,
                    width: 10,
                    height: 1000,
                },
                rangeStack: [],
            },
        });
    });

    test("Select column with blending", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rowSelectionBlending="mixed"
                columnSelectionBlending="mixed"
                rangeSelectionBlending="mixed"
                onGridSelectionChange={spy}
            />,
            {
                wrapper: Context,
            }
        );
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
            key: " ",
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.fromSingleSelection(1),
            rows: CompactSelection.empty(),
            current: {
                cell: [1, 1],
                range: {
                    x: 1,
                    y: 1,
                    width: 1,
                    height: 1,
                },
                rangeStack: [],
            },
        });
    });

    test("Select column", async () => {
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
            key: " ",
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.fromSingleSelection(1),
            rows: CompactSelection.empty(),
            current: undefined,
        });
    });

    test("Select row with blending", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rowSelectionBlending="mixed"
                columnSelectionBlending="mixed"
                rangeSelectionBlending="mixed"
                onGridSelectionChange={spy}
            />,
            {
                wrapper: Context,
            }
        );
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
            key: " ",
            shiftKey: true,
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(1),
            current: {
                cell: [1, 1],
                range: {
                    x: 1,
                    y: 1,
                    width: 1,
                    height: 1,
                },
                rangeStack: [],
            },
        });
    });

    test("Select row", async () => {
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
            key: " ",
            shiftKey: true,
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(1),
            current: undefined,
        });
    });

    test("Select range with mouse then permissive move", async () => {
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

        fireEvent.mouseMove(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });

        fireEvent.mouseUp(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });

        spy.mockClear();

        fireEvent.keyDown(canvas, {
            key: "ArrowLeft",
            altKey: true,
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: {
                    cell: [0, 2],
                    range: { height: 1, width: 1, x: 0, y: 2 },
                    rangeStack: [{ height: 11, width: 3, x: 1, y: 2 }],
                },
            })
        );
    });

    test("Close overlay with enter key", async () => {
        const spy = jest.fn();
        jest.useFakeTimers();
        render(
            <EventedDataEditor
                experimental={{
                    strict: true,
                }}
                {...basicProps}
                onGridSelectionChange={spy}
            />,
            {
                wrapper: Context,
            }
        );
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
            key: "Enter",
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "Enter",
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: {
                cell: [1, 2],
                range: {
                    x: 1,
                    y: 2,
                    width: 1,
                    height: 1,
                },
                rangeStack: [],
            },
        });
    });
});
