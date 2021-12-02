import { describe, test, expect, beforeEach } from "jest-without-globals";
import * as React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { DataEditor, DataEditorProps, GridCell, GridCellKind, GridSelection } from "..";

jest.mock("react-virtualized-auto-sizer", () => {
    return {
        __esModule: true,
        default: ({ children }: any) => children({ height: 1000, width: 1000 }),
        foo: "mocked foo",
    };
});

const makeCell = (cell: readonly [number, number]): GridCell => ({
    kind: GridCellKind.Text,
    allowOverlay: true,
    data: `Data: ${cell[0]}, ${cell[1]}`,
    displayData: `${cell[0]}, ${cell[1]}`,
});
const basicProps: DataEditorProps = {
    columns: [
        {
            title: "A",
            width: 150,
        },
        {
            title: "B",
            width: 160,
        },
        {
            title: "C",
            width: 170,
        },
        {
            title: "D",
            width: 180,
        },
        {
            title: "E",
            width: 190,
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
        expect(spy).toHaveBeenCalledWith([1, 1]);
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
