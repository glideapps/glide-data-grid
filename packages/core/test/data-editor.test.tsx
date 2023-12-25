/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { render, fireEvent, screen, act, createEvent, cleanup } from "@testing-library/react";
import {
    CompactSelection,
    DataEditor,
    type DataEditorProps,
    type GridCell,
    GridCellKind,
    type GridSelection,
    isSizedGridColumn,
    type Item,
} from "../src/index.js";
import type { CustomCell, SizedGridColumn } from "../src/internal/data-grid/data-grid-types.js";
import type { DataEditorRef } from "../src/data-editor/data-editor.js";
import { assert } from "../src/common/support.js";
import { vi, type Mock, expect, describe, test, beforeEach, afterEach } from "vitest";
import type { GridKeyEventArgs } from "../src/internal/data-grid/event-args.js";

const BOOLEAN_DATA_LOOKUP: (boolean | null | undefined)[] = [true, false, undefined, null];
function getMockBooleanData(row: number): boolean | null | undefined {
    return BOOLEAN_DATA_LOOKUP[row % BOOLEAN_DATA_LOOKUP.length];
}

function sendClick(el: Element | Node | Document | Window, options?: any, runTimers?: boolean): void {
    fireEvent.mouseDown(el, options);
    if (runTimers === true) vi.runAllTimers();
    fireEvent.mouseUp(el, options);
    if (runTimers === true) vi.runAllTimers();
    fireEvent.click(el, options);
}

function sendTouchClick(el: Element | Node | Document | Window, options?: any): void {
    fireEvent.touchStart(el, options);
    fireEvent.touchEnd(el, {
        ...options,
        changedTouches: options.touches,
    });
    fireEvent.click(el, {
        clientX: options?.touches?.[0]?.clientX,
        clientY: options?.touches?.[0]?.clientY,
        pointerType: "touch",
        ...options,
    });
}

const makeCell = (cell: Item): GridCell => {
    const [col, row] = cell;
    switch (col) {
        case 0: {
            return {
                kind: GridCellKind.RowID,
                allowOverlay: false,
                data: `Data: ${col}, ${row}`,
            };
        }
        case 3: {
            return {
                kind: GridCellKind.Number,
                allowOverlay: true,
                data: 10,
                displayData: `${row}`,
            };
        }
        case 4: {
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
        }
        case 5: {
            return {
                kind: GridCellKind.Protected,
                allowOverlay: false,
            };
        }
        case 6: {
            return {
                kind: GridCellKind.Bubble,
                allowOverlay: false,
                data: ["Foobar"],
            };
        }
        case 7: {
            return {
                kind: GridCellKind.Boolean,
                allowOverlay: false,
                data: getMockBooleanData(row),
                readonly: row === 5,
            };
        }
        case 8: {
            return {
                kind: GridCellKind.Text,
                allowOverlay: true,
                data: `Data: ${col}, ${row}`,
                displayData: `שלום ${col}, ${row}`,
            };
        }
        case 9: {
            return {
                kind: GridCellKind.Markdown,
                allowOverlay: true,
                data: `# Header: ${col}, ${row}`,
            };
        }
        case 10: {
            return {
                kind: GridCellKind.Uri,
                allowOverlay: true,
                data: `https://example.com/${col}/${row}`,
            };
        }
        // No default
    }
    if (col > 10) {
        throw new Error(`Unexpected column: ${col}`);
    }
    return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        data: `Data: ${col}, ${row}`,
        displayData: `${col}, ${row}`,
        allowWrapping: true,
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
        {
            title: "K",
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

function getCellCenterPositionForDefaultGrid(cell: Item): [number, number] {
    const [col, row] = cell;

    const xStart = basicProps.columns.slice(0, col).reduce((acc, curr) => acc + (curr as SizedGridColumn).width, 0);
    const xOffset = (basicProps.columns[col] as SizedGridColumn).width / 2;

    const yStart = (basicProps.headerHeight as number) + row * (basicProps.rowHeight as number);
    const yOffset = (basicProps.rowHeight as number) / 2;

    return [xStart + xOffset, yStart + yOffset];
}

function prep(resetTimers: boolean = true) {
    const scroller = document.getElementsByClassName("dvn-scroller").item(0);
    if (scroller !== null) {
        vi.spyOn(scroller, "clientWidth", "get").mockImplementation(() => 1000);
        vi.spyOn(scroller, "clientHeight", "get").mockImplementation(() => 1000);
        vi.spyOn(scroller, "offsetWidth" as any, "get").mockImplementation(() => 1000);
        vi.spyOn(scroller, "offsetHeight" as any, "get").mockImplementation(() => 1000);
    }

    act(() => {
        vi.runAllTimers();
    });
    if (resetTimers) {
        vi.useRealTimers();
    } else {
        act(() => {
            vi.runAllTimers();
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
        void p.onRowAppended?.();
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
    vi.mock("../src/common/resize-detector", () => {
        return {
            useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
        };
    });

    // beforeAll(() => {
    //     vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((callback: FrameRequestCallback) => {
    //         return setTimeout(callback, 10);
    //     });
    // });

    // afterAll(() => {
    //     vi.restoreAllMocks();
    // });

    beforeEach(() => {
        // delete (window as any).ResizeObserver;
        // window.ResizeObserver = vi.fn().mockImplementation(() => ({
        //     observe: vi.fn(),
        //     unobserve: vi.fn(),
        //     disconnect: vi.fn(),
        // }));

        Element.prototype.scrollTo = vi.fn() as any;
        Element.prototype.scrollBy = vi.fn() as any;
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn(() => Promise.resolve()),
                readText: vi.fn(() =>
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
        Object.defineProperties(HTMLElement.prototype, {
            offsetWidth: {
                get() {
                    return 1000;
                },
            },
        });
        Image.prototype.decode = vi.fn();
    });

    afterEach(() => {
        vi.clearAllTimers();
        cleanup();
    });

    test("Focus a11y cell", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep(false);

        const a11ycell = screen.getByTestId("glide-cell-0-5");
        fireEvent.click(a11ycell);
    });

    test("emits contextmenu for cell", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellContextMenu={spy} onGridSelectionChange={spySelection} />, {
            wrapper: Context,
        });
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
        expect(spySelection).toHaveBeenCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 1] }),
            })
        );
    });

    test("emits contextmenu for row marker", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                rowMarkers="both"
                onCellContextMenu={spy}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 10, // Row marker
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([-1, 1], expect.anything());
    });

    test("emits contextmenu for cell but does not change selection if already selected - rows", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.fromSingleSelection(1),
                }}
                onCellContextMenu={spy}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
        expect(spySelection).not.toHaveBeenCalled();
    });

    test("emits contextmenu for cell but does not change selection if already selected - cols", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.fromSingleSelection(1),
                    rows: CompactSelection.empty(),
                }}
                onCellContextMenu={spy}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
        expect(spySelection).not.toHaveBeenCalled();
    });

    test("middle click does not change selection", async () => {
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                }}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");

        screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            button: 1,
        });

        expect(spySelection).not.toHaveBeenCalled();
    });

    test("emits contextmenu for cell but does not change selection if already selected - current.cell", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                    current: {
                        cell: [1, 1],
                        range: { x: 1, y: 1, width: 1, height: 1 },
                        rangeStack: [],
                    },
                }}
                onCellContextMenu={spy}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
        expect(spySelection).not.toHaveBeenCalled();
    });

    test("emits contextmenu for cell but does not change selection if already selected - current.range", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                    current: {
                        cell: [0, 0],
                        range: { x: 0, y: 0, width: 2, height: 2 },
                        rangeStack: [],
                    },
                }}
                onCellContextMenu={spy}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
        expect(spySelection).not.toHaveBeenCalled();
    });

    test("emits contextmenu for cell row markers", async () => {
        const spy = vi.fn();
        const spySelection = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                rowMarkers={"both"}
                onCellContextMenu={spy}
                onGridSelectionChange={spySelection}
            />,
            {
                wrapper: Context,
            }
        );
        const scroller = prep();

        assert(scroller !== null);

        screen.getByTestId("data-grid-canvas");
        fireEvent.contextMenu(scroller, {
            clientX: 320, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
        expect(spySelection).toHaveBeenCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 1] }),
            })
        );
    });

    test("Emits cell click", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
    });

    test("Emits cell clicked with middle button", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            button: 1,
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
    });

    test("Does not emits cell clicked with back button", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            button: 4,
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Emits cell click with touch", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendTouchClick(canvas, {
            touches: [
                {
                    clientX: 300, // Col B
                    clientY: 36 + 32 + 16, // Row 1 (0 indexed)
                },
            ],
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
    });

    test("Emits activated event on double click", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1]);
    });

    describe("cellActivationBehavior", () => {
        test("double-click in time", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(<DataEditor {...basicProps} onCellActivated={spy} cellActivationBehavior="double-click" />, {
                wrapper: Context,
            });
            prep(false);

            const canvas = screen.getByTestId("data-grid-canvas");
            sendClick(canvas, {
                clientX: 300, // Col B
                clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            });

            vi.advanceTimersByTime(400);

            sendClick(canvas, {
                clientX: 300, // Col B
                clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            });

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith([1, 1]);
        });

        test("double-click miss", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(<DataEditor {...basicProps} onCellActivated={spy} cellActivationBehavior="double-click" />, {
                wrapper: Context,
            });
            prep(false);

            const canvas = screen.getByTestId("data-grid-canvas");
            sendClick(canvas, {
                clientX: 300, // Col B
                clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            });

            vi.advanceTimersByTime(600);

            sendClick(canvas, {
                clientX: 300, // Col B
                clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            });

            expect(spy).not.toHaveBeenCalled();
        });

        test("second-click", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(<DataEditor {...basicProps} onCellActivated={spy} cellActivationBehavior="second-click" />, {
                wrapper: Context,
            });
            prep(false);

            const canvas = screen.getByTestId("data-grid-canvas");
            sendClick(canvas, {
                clientX: 300, // Col B
                clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            });

            vi.advanceTimersByTime(1600);

            sendClick(canvas, {
                clientX: 300, // Col B
                clientY: 36 + 32 + 16, // Row 1 (0 indexed)
            });

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith([1, 1]);
        });

        test("single-click", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(<DataEditor {...basicProps} onCellActivated={spy} cellActivationBehavior="single-click" />, {
                wrapper: Context,
            });
            prep(false);

            const canvas = screen.getByTestId("data-grid-canvas");
            sendClick(
                canvas,
                {
                    clientX: 300, // Col B
                    clientY: 36 + 32 + 16, // Row 1 (0 indexed)
                },
                true
            );

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith([1, 1]);
        });
    });

    test("Does not emit activated event on double click with different buttons", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            button: 0,
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        sendClick(canvas, {
            button: 1,
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Emits activated event on Enter key", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            key: "Enter",
        });

        vi.runAllTimers();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1]);
    });

    test("Emits activated event on Space key", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellActivated={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            key: " ",
        });

        vi.runAllTimers();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1]);
    });

    test("keyDown and keyUp events include the cell location", async () => {
        let keyDownEvent: GridKeyEventArgs | undefined;
        let keyUpEvent: GridKeyEventArgs | undefined;
        const keyDown = (e: GridKeyEventArgs) => {
            keyDownEvent = e;
        };
        const keyUp = (e: GridKeyEventArgs) => {
            keyUpEvent = e;
        };

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onKeyDown={keyDown} onKeyUp={keyUp} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            key: " ",
        });

        fireEvent.keyUp(canvas, {
            key: " ",
        });

        vi.runAllTimers();

        expect(keyDownEvent?.location).toEqual([1, 1]);
        expect(keyUpEvent?.location).toEqual([1, 1]);
    });

    test("Doesn't emit cell click if mouseDown happened in a different cell", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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
        const spy = vi.fn();

        vi.useFakeTimers();
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
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellClicked={spy} rowHeight={r => (r % 2 === 0 ? 32 : 64)} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 64 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([1, 1], expect.anything());
    });

    test("Emits finished editing", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onFinishedEditing={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        await new Promise(r => window.setTimeout(r, 1000));

        const overlay = screen.getByDisplayValue("j");

        vi.useFakeTimers();
        fireEvent.keyDown(overlay, {
            key: "Enter",
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(spy).toBeCalledWith(
            { allowOverlay: true, allowWrapping: true, data: "j", displayData: "1, 1", kind: "text" },
            [0, 1]
        );
    });

    test("Does not edit when validation fails", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellEdited={spy} validateCell={() => false} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        await new Promise(r => window.setTimeout(r, 1000));

        const overlay = screen.getByDisplayValue("j");

        vi.useFakeTimers();
        fireEvent.keyDown(overlay, {
            key: "Enter",
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(spy).not.toBeCalled();
    });

    test("Emits header click", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(1, expect.anything());
    });

    test("Emits header click on touch", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onHeaderClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendTouchClick(canvas, {
            touches: [
                {
                    clientX: 300, // Col B
                    clientY: 16, // Header
                },
            ],
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(1, expect.anything());
    });

    test("Does emit header click on row marker column", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} rowMarkers="both" onHeaderClicked={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 10, // Col B
            clientY: 16, // Header
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Group header sections", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.fromSingleSelection([0, 11]),
            rows: CompactSelection.empty(),
        });

        spy.mockClear();

        sendClick(canvas, {
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

        sendClick(canvas, {
            ctrlKey: true,
            clientX: 300, // Col B
            clientY: 16, // GroupHeader
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({
            rows: CompactSelection.empty(),
            current: undefined,
            columns: CompactSelection.fromSingleSelection([0, 11]),
        });
    });

    test("Rename group header shows", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Group Header
        });

        expect(spy).not.toHaveBeenCalled();
        const groupInput = screen.getByTestId("group-rename-input");
        expect(document.body.contains(groupInput)).toBe(true);

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
        const spy = vi.fn();

        vi.useFakeTimers();
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

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(1, expect.anything());
    });

    test("Emits group header clicked on touch", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                columns={basicProps.columns.map(c => ({ ...c, group: "Main" }))}
                rowMarkers="both"
                onGroupHeaderClicked={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendTouchClick(canvas, {
            touches: [
                {
                    clientX: 300, // Col B
                    clientY: 16, // Group header
                },
            ],
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(1, expect.objectContaining({ location: [2, -2] }));
    });

    test("Emits item hover on correct location", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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
        const spy = vi.fn();

        vi.useFakeTimers();
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
        const spy = vi.fn();

        vi.useFakeTimers();
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
                range: {
                    x: 2,
                    y: 2,
                    height: 1,
                    width: 1,
                },
                rangeStack: [],
            },
        });
    });

    test("Delete cell callback result", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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

        expect(spy).toHaveBeenCalledWith([2, 2], expect.anything());
    });

    test("Delete custom", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                getCellContent={() => ({
                    kind: GridCellKind.Custom,
                    allowOverlay: true,
                    copyData: "fake",
                    data: "fake",
                })}
                customRenderers={[
                    {
                        draw: () => undefined,
                        isMatch: (c): c is CustomCell => c.kind === GridCellKind.Custom,
                        kind: GridCellKind.Custom,
                        onDelete: spy,
                    },
                ]}
                onDelete={sel => sel}
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

        expect(spy).toHaveBeenCalledWith({ allowOverlay: true, copyData: "fake", data: "fake", kind: "custom" });
    });

    test("Delete row", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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
        const spy = vi.fn();

        vi.useFakeTimers();
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
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        await new Promise(r => window.setTimeout(r, 1000));

        const overlay = screen.getByDisplayValue("Data: 1, 1");
        expect(document.body.contains(overlay)).toBe(true);

        vi.useFakeTimers();
        fireEvent.keyDown(canvas, {
            key: "Escape",
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Open markdown overlay", async () => {
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 980, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        sendClick(canvas, {
            clientX: 980, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        const overlay = screen.getByText("Header: 9, 1");
        expect(document.body.contains(overlay)).toBe(true);

        vi.useFakeTimers();
        fireEvent.keyDown(canvas, {
            key: "Escape",
        });
        act(() => {
            vi.runAllTimers();
        });

        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Open overlay with keypress", async () => {
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        fireEvent.keyUp(canvas, {
            keyCode: 74,
            key: "j",
        });

        const overlay = screen.getByDisplayValue("j");
        expect(document.body.contains(overlay)).toBe(true);

        vi.useFakeTimers();
        fireEvent.keyDown(overlay, {
            key: "Escape",
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Open overlay with keypress when prior is disabled", async () => {
        vi.useFakeTimers();
        render(
            <DataEditor
                {...basicProps}
                getCellContent={cell => {
                    const r = basicProps.getCellContent(cell);

                    if (cell[0] === 1 && cell[1] === 0)
                        return {
                            ...r,
                            allowOverlay: false,
                            readonly: true,
                        };

                    return r;
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        fireEvent.keyUp(canvas, {
            keyCode: 74,
            key: "j",
        });

        const overlay = screen.getByDisplayValue("j");
        expect(document.body.contains(overlay)).toBe(true);

        vi.useFakeTimers();
        fireEvent.keyDown(overlay, {
            key: "Escape",
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Send edit", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellEdited={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        fireEvent.keyUp(canvas, {
            keyCode: 74,
            key: "j",
        });

        act(() => {
            vi.runAllTimers();
        });

        const overlay = screen.getByDisplayValue("j");
        expect(document.body.contains(overlay)).toBe(true);

        fireEvent.keyDown(overlay, {
            key: "Enter",
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(spy).toBeCalledWith([1, 1], expect.objectContaining({ data: "j" }));
        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Send edit with click off", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellEdited={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        fireEvent.keyUp(canvas, {
            keyCode: 74,
            key: "j",
        });

        act(() => {
            vi.runAllTimers();
        });

        const overlay = screen.getByDisplayValue("j");
        expect(document.body.contains(overlay)).toBe(true);

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 5 + 16, // Row 1 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(spy).toBeCalledWith([1, 1], expect.objectContaining({ data: "j" }));
        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Send edit with touch off", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} onCellEdited={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.keyDown(canvas, {
            keyCode: 74,
            key: "j",
        });

        fireEvent.keyUp(canvas, {
            keyCode: 74,
            key: "j",
        });

        act(() => {
            vi.runAllTimers();
        });

        const overlay = screen.getByDisplayValue("j");
        expect(document.body.contains(overlay)).toBe(true);

        sendTouchClick(canvas, {
            touches: [
                {
                    clientX: 300, // Col B
                    clientY: 36 + 32 * 5 + 16, // Row 1 (0 indexed)}
                },
            ],
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(spy).toBeCalledWith([1, 1], expect.objectContaining({ data: "j" }));
        expect(document.body.contains(overlay)).toBe(false);
    });

    test("Directly toggle booleans", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");

        // We need to be focused on the grid for booleans to toggle automatically
        act(() => {
            ref.current?.focus();
        });
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();

        // [7, 0] is a checked boolean
        const [checkedX, checkedY] = getCellCenterPositionForDefaultGrid([7, 0]);

        sendClick(canvas, { clientX: checkedX, clientY: checkedY });

        expect(spy).toBeCalledWith([7, 0], expect.objectContaining({ data: false }));

        // [7, 1] is an unchecked boolean
        const [uncheckedX, uncheckedY] = getCellCenterPositionForDefaultGrid([7, 1]);

        sendClick(canvas, { clientX: uncheckedX, clientY: uncheckedY });

        expect(spy).toBeCalledWith([7, 1], expect.objectContaining({ data: true }));

        // [7, 2] is an indeterminate boolean
        const [indeterminateX, indeterminateY] = getCellCenterPositionForDefaultGrid([7, 2]);

        sendClick(canvas, { clientX: indeterminateX, clientY: indeterminateY });

        expect(spy).toBeCalledWith([7, 2], expect.objectContaining({ data: true }));

        // [7, 3] is an empty boolean
        const [emptyX, emptyY] = getCellCenterPositionForDefaultGrid([7, 3]);

        sendClick(canvas, { clientX: emptyX, clientY: emptyY });

        expect(spy).toBeCalledWith([7, 3], expect.objectContaining({ data: true }));
    });

    test("Directly toggle readonly booleans", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");

        // We need to be focused on the grid for booleans to toggle automatically
        act(() => {
            ref.current?.focus();
        });
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();

        // [7, 0] is a checked boolean readonly
        const [checkedX, checkedY] = getCellCenterPositionForDefaultGrid([7, 5]);

        sendClick(canvas, { clientX: checkedX, clientY: checkedY });

        expect(spy).not.toBeCalled();
    });

    test("Toggle readonly boolean with space", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");

        // We need to be focused on the grid for booleans to toggle automatically
        act(() => {
            ref.current?.focus();
        });
        act(() => {
            vi.runAllTimers();
        });

        // [7, 0] is a checked boolean readonly
        const [checkedX, checkedY] = getCellCenterPositionForDefaultGrid([7, 5]);

        sendClick(canvas, { clientX: checkedX + 20, clientY: checkedY });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.keyDown(canvas, {
            key: " ",
        });

        expect(spy).not.toBeCalled();
    });

    test("Ref getBounds", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<DataEditor {...basicProps} onCellEdited={spy} ref={ref} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            vi.runAllTimers();
        });

        const bounds = ref.current?.getBounds(4, 4);
        expect(bounds).toEqual({
            height: 33,
            width: 41,
            x: 696,
            y: 164,
        });
    });

    test("Arrow left", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} showSearch={true} onSearchClose={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const searchClose = screen.getByTestId("search-close-button");
        fireEvent.click(searchClose);
        act(() => {
            vi.runAllTimers();
        });
        expect(spy).toBeCalled();
    });

    test("Trigger search results", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} showSearch={true} onSearchClose={spy} />, {
            wrapper: Context,
        });
        prep();

        vi.useFakeTimers();
        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, {
            target: {
                value: "1, 2",
            },
        });
        act(() => {
            vi.advanceTimersByTime(1000);
            vi.runAllTimers();
        });

        const searchResult = screen.getByTestId("search-result-area");

        expect(searchResult.textContent).toBe("111 results");

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
            vi.runAllTimers();
        });

        expect(spy).toHaveBeenCalled();
    });

    test("Copy/paste", async () => {
        const spy = vi.fn();
        const pasteSpy = vi.fn((_target: any, _values: any) => true);
        vi.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} onGridSelectionChange={spy} onPaste={(...args) => pasteSpy(...args)} />,
            {
                wrapper: Context,
            }
        );
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
            shiftKey: true,
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                current: expect.objectContaining({ cell: [1, 2], range: { x: 1, y: 2, width: 2, height: 1 } }),
            })
        );

        fireEvent.copy(window);
        act(() => {
            vi.runAllTimers();
        });
        expect(navigator.clipboard.writeText).toBeCalledWith("1, 2\t2, 2");

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 3] }) }));

        fireEvent.paste(window);
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();
        await new Promise(r => window.setTimeout(r, 10));
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

    test("Paste out of range does not crash", async () => {
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onPaste={true} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
            ctrlKey: true,
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.paste(window);
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();
        await new Promise(r => window.setTimeout(r, 10));
    });

    test("Cut cell", async () => {
        const spy = vi.fn();
        const editSpy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} onCellsEdited={editSpy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.keyDown(canvas, {
            key: "ArrowRight",
            shiftKey: true,
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.cut(window);
        vi.useRealTimers();
        await new Promise(r => window.setTimeout(r, 10));
        expect(navigator.clipboard.writeText).toBeCalledWith("1, 2\t2, 2");
        expect(editSpy).toHaveBeenCalledWith([
            {
                location: [1, 2],
                value: expect.objectContaining({ data: "" }),
            },
            {
                location: [2, 2],
                value: expect.objectContaining({ data: "" }),
            },
        ]);
    });

    test("Paste custom cell does not crash", async () => {
        vi.useFakeTimers();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const alwaysCustomCell = (_cell: Item): GridCell => {
            return {
                kind: GridCellKind.Custom,
                allowOverlay: true,
                data: "custom-cell-data",
                copyData: "custom-cell-copy-data",
            };
        };

        const spy = vi.fn();

        render(
            <EventedDataEditor
                {...basicProps}
                getCellContent={alwaysCustomCell}
                customRenderers={[
                    {
                        kind: GridCellKind.Custom,
                        draw: () => true,
                        onPaste: spy,
                        isMatch: (_cell: CustomCell): _cell is CustomCell => true,
                    },
                ]}
            />,
            {
                wrapper: Context,
            }
        );
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.paste(window);
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();
        await new Promise(r => window.setTimeout(r, 10));

        expect(spy).toBeCalledWith(expect.anything(), "custom-cell-data");
    });

    test("CustomCell onClick", async () => {
        vi.useFakeTimers();

        const onClickSpy = vi.fn();

        // eslint-disable-next-line unicorn/consistent-function-scoping, sonarjs/no-identical-functions
        const alwaysCustomCell = (_cell: Item): GridCell => {
            return {
                kind: GridCellKind.Custom,
                allowOverlay: true,
                data: "custom-cell-data",
                copyData: "custom-cell-copy-data",
            };
        };

        render(
            <EventedDataEditor
                {...basicProps}
                getCellContent={alwaysCustomCell}
                customRenderers={[
                    {
                        kind: GridCellKind.Custom,
                        draw: () => true,
                        onClick: onClickSpy,
                        isMatch: (_cell: CustomCell): _cell is CustomCell => true,
                    },
                ]}
            />,
            {
                wrapper: Context,
            }
        );
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);

        // mouse down col b row 2
        fireEvent.mouseDown(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 2 + 16,
        });

        // mouse move col b row 3
        fireEvent.mouseMove(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 2 + 16,
        });

        // mouse up
        fireEvent.mouseUp(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 2 + 16,
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(onClickSpy).toBeCalled();
    });

    test("CustomCell onClick fires with same restriction as onCellClicked", async () => {
        vi.useFakeTimers();

        const onClickSpy = vi.fn();

        // eslint-disable-next-line unicorn/consistent-function-scoping, sonarjs/no-identical-functions
        const alwaysCustomCell = (_cell: Item): GridCell => {
            return {
                kind: GridCellKind.Custom,
                allowOverlay: true,
                data: "custom-cell-data",
                copyData: "custom-cell-copy-data",
            };
        };

        render(
            <EventedDataEditor
                {...basicProps}
                getCellContent={alwaysCustomCell}
                customRenderers={[
                    {
                        kind: GridCellKind.Custom,
                        draw: () => true,
                        onClick: onClickSpy,
                        isMatch: (_cell: CustomCell): _cell is CustomCell => true,
                    },
                ]}
            />,
            {
                wrapper: Context,
            }
        );
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);

        // mouse down col b row 2
        fireEvent.mouseDown(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 2 + 16,
        });

        // mouse move col b row 3
        fireEvent.mouseMove(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 3 + 16,
        });

        // mouse up
        fireEvent.mouseUp(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 3 + 16,
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(onClickSpy).not.toBeCalled();
    });

    test("onCellsEdited blocks onCellEdited", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} onCellsEdited={() => true} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
        });

        fireEvent.paste(window);
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();
        await new Promise(r => window.setTimeout(r, 10));
        expect(spy).not.toBeCalled();
    });

    test("Copy/paste with simple getCellsForSelection", async () => {
        const spy = vi.fn();
        const pasteSpy = vi.fn((_target: any, _values: any) => true);
        vi.useFakeTimers();
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
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        act(() => {
            vi.runAllTimers();
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
        act(() => {
            vi.runAllTimers();
        });
        expect(navigator.clipboard.writeText).toBeCalledWith("1, 2\t2, 2");

        spy.mockClear();
        fireEvent.keyDown(canvas, {
            key: "ArrowDown",
        });

        expect(spy).toBeCalledWith(expect.objectContaining({ current: expect.objectContaining({ cell: [1, 3] }) }));

        fireEvent.paste(window);
        act(() => {
            vi.runAllTimers();
        });
        vi.useRealTimers();
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
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rowMarkers="both"
                gridSelection={{
                    current: undefined,
                    rows: CompactSelection.fromSingleSelection([3, 4]),
                    columns: CompactSelection.empty(),
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);

        fireEvent.copy(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(navigator.clipboard.writeText).toBeCalledWith(
            "Data: 0, 3\t1, 3\t2, 3\t3\tFoobar\t************\tFoobar\t\tשלום 8, 3\t# Header: 9, 3\thttps://example.com/10/3"
        );
    });

    test("Copy cols", async () => {
        vi.useFakeTimers();
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
        vi.spyOn(document, "activeElement", "get").mockImplementation(() => canvas);

        fireEvent.copy(window);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(navigator.clipboard.writeText).toBeCalled();
    });

    test("Hover header does not fetch invalid cell", async () => {
        const spy = vi.fn(basicProps.getCellContent);

        vi.useFakeTimers();
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
        vi.useFakeTimers();
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
            vi.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
            );
            vi.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            vi.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            vi.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 55);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            vi.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
            );
            vi.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            vi.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            vi.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(document.body.contains(canvas)).toBe(true);
    });

    test("Blit does not crash horizontal scroll", async () => {
        vi.useFakeTimers();
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
            vi.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
            );
            vi.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            vi.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 55);
            vi.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        if (scroller !== null) {
            vi.spyOn(scroller, "scrollWidth", "get").mockImplementation(() =>
                basicProps.columns.map(c => (isSizedGridColumn(c) ? c.width : 150)).reduce((pv, cv) => pv + cv, 0)
            );
            vi.spyOn(scroller, "scrollHeight", "get").mockImplementation(() => 1000 * 32 + 36);
            vi.spyOn(scroller, "scrollLeft", "get").mockImplementation(() => 0);
            vi.spyOn(scroller, "scrollTop", "get").mockImplementation(() => 0);
            fireEvent.scroll(scroller);
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(document.body.contains(canvas)).toBe(true);
    });

    test("New row", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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

        vi.useFakeTimers();
        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 990, // Trailing row
        });

        expect(spy).toHaveBeenCalled();

        act(() => {
            vi.runAllTimers();
        });

        expect(Element.prototype.scrollTo).toHaveBeenCalled();
    });

    test("Click row marker", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();

        vi.useFakeTimers();
        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(2),
            current: undefined,
        });
    });

    test("Shift click row marker", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
            shiftKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection([2, 6]),
            current: undefined,
        });
    });

    test("Drag click row marker", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        fireEvent.mouseMove(canvas, {
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
            current: undefined,
        });
    });

    test("Shift click row marker - no multi-select", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} rowSelect={"single"} onGridSelectionChange={spy} rowMarkers="both" />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
            shiftKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(5),
            current: undefined,
        });
    });

    test("Ctrl click row marker", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} rowMarkers="both" />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(2).add(5),
            current: undefined,
        });

        spy.mockClear();

        sendClick(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(2),
            current: undefined,
        });
    });

    test("Ctrl click row marker - no multi", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} rowSelect={"single"} onGridSelectionChange={spy} rowMarkers="both" />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 10, // Row marker
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection(5),
            current: undefined,
        });

        spy.mockClear();

        sendClick(canvas, {
            ctrlKey: true,
            clientX: 10, // Row marker
            clientY: 36 + 32 * 5 + 16, // Row 2 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: undefined,
        });
    });

    test("Shift click grid selection", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
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
        const spy = vi.fn();
        const multiSpy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                keybindings={{
                    downFill: true,
                }}
                onCellsEdited={multiSpy}
                onCellEdited={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        sendClick(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 68,
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledTimes(8);
        expect(multiSpy).toHaveBeenCalled();
    });

    test("Fill right", async () => {
        const spy = vi.fn();
        const multiSpy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                keybindings={{ rightFill: true }}
                onCellEdited={spy}
                onCellsEdited={multiSpy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        sendClick(canvas, {
            shiftKey: true,
            clientX: 400, // Col C
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            keyCode: 82,
            ctrlKey: true,
        });

        expect(spy).toHaveBeenCalledTimes(5);
        expect(multiSpy).toHaveBeenCalled();
    });

    test("Clear selection", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
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
            current: undefined,
        });
    });

    test("Delete range", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor {...basicProps} columns={basicProps.columns.slice(0, 2)} onGridSelectionChange={spy} />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 100, // Col A
            clientY: 36 + 32 * 2 + 16, // Row 2 (0 indexed)
        });

        sendClick(canvas, {
            shiftKey: true,
            clientX: 200, // Col B
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        spy.mockClear();

        sendClick(canvas, {
            shiftKey: true,
            clientX: 700, // OOB
            clientY: 36 + 32 * 6 + 16, // Row 6 (0 indexed)
        });

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: undefined,
        });
    });

    test("Delete Column", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        fireEvent.keyDown(canvas, {
            key: "Delete",
        });

        expect(spy).toBeCalledTimes(1000);
    });

    test("DND Columns", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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

        fireEvent.click(canvas, {
            clientX: 100, // Col A
            clientY: 16, // Header
        });

        expect(spy).toBeCalledWith(1, 0);
    });

    test("Resize Column", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onColumnMoved={spy} onColumnResize={spy} />, {
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

        fireEvent.click(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 200, 1, 200);
    });

    test("Auto Resize Column", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onColumnResize={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        fireEvent.mouseDown(canvas, {
            clientX: 310, // Col B Right Edge
            clientY: 16, // Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 310,
            clientY: 16,
        });

        fireEvent.mouseDown(canvas, {
            clientX: 310, // Col B Right Edge
            clientY: 16, // Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 310,
            clientY: 16,
        });

        fireEvent.click(canvas, {
            clientX: 310,
            clientY: 16,
        });

        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 50, 1, 50);
    });

    test("Auto Resize Column Ref", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor {...basicProps} ref={ref} onColumnResize={spy} />, {
            wrapper: Context,
        });
        prep();

        ref.current?.remeasureColumns(CompactSelection.fromSingleSelection(1));

        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 50, 1, 50);
    });

    test("Resize Column End Called", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onColumnResize={vi.fn()} onColumnResizeEnd={spy} />, {
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

        fireEvent.click(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 200, 1, 200);
    });

    test("Resize column end called correct number of times", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                onColumnResize={vi.fn()}
                onColumnResizeEnd={spy}
                gridSelection={{
                    columns: CompactSelection.fromSingleSelection(3),
                    rows: CompactSelection.empty(),
                }}
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

        fireEvent.click(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 200, 1, 200);
    });

    test("Resize Multiple Column", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                gridSelection={{
                    columns: CompactSelection.fromSingleSelection([0, 5]),
                    rows: CompactSelection.empty(),
                    current: undefined,
                }}
                onColumnResize={spy}
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

        fireEvent.click(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toBeCalledTimes(5);
    });

    test("Resize Last Column", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                columns={basicProps.columns.slice(0, 2)}
                onColumnMoved={spy}
                onColumnResize={spy}
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

        fireEvent.click(canvas, {
            clientX: 350,
            clientY: 16,
        });

        expect(spy).toBeCalledWith({ icon: "headerCode", title: "B", width: 160 }, 200, 1, 200);
    });

    test("Drag reorder row", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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

        fireEvent.click(canvas, {
            clientX: 10,
            clientY: 400,
        });

        expect(spy).toBeCalledWith(8, 11);
    });

    test("Select range with mouse", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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

    test("Select range with mouse middle click fails", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            button: 0,
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2
        });

        fireEvent.mouseDown(canvas, {
            button: 1,
            clientX: 300, // Col B
            clientY: 36 + 32 * 2 + 16, // Row 2
        });

        spy.mockClear();
        fireEvent.mouseMove(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });

        expect(spy).not.toBeCalled();

        fireEvent.mouseUp(canvas, {
            clientX: 600, // Col B
            clientY: 36 + 32 * 12 + 16, // Row 2
        });
    });

    test("Select all", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                experimental={{ renderStrategy: "double-buffer" }}
                rowMarkers="both"
                onGridSelectionChange={spy}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 10,
            clientY: 10,
        });

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.fromSingleSelection([0, 1000]),
            current: undefined,
        });

        sendClick(canvas, {
            clientX: 10,
            clientY: 10,
        });

        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: undefined,
        });
    });

    test("Draggable", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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
            const mockDownEv = createEvent.mouseDown(scroller);
            fireEvent(scroller, mockDownEv);
            expect(mockDownEv.defaultPrevented).toBe(false);

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

    test("Click cell does not double-emit selectedrows/columns", async () => {
        const gridSelectionSpy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={gridSelectionSpy} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();

        const getCellContent: (typeof basicProps)["getCellContent"] = c => {
            const [col, row] = c;

            if (row === 3 && col >= 2 && col <= 3) {
                return {
                    ...basicProps.getCellContent([2, 3]),
                    span: [2, 3] as const,
                };
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
        sendClick(canvas, {
            clientX: 350, // Col C
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
        const spy = vi.fn();
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        act(() => {
            void ref.current?.emit("delete");
            void ref.current?.emit("fill-right");
            void ref.current?.emit("fill-down");
            void ref.current?.emit("copy");
            void ref.current?.emit("paste");

            ref.current?.scrollTo(5, 10);
            ref.current?.updateCells([{ cell: [0, 0] }]);
        });
    });

    test("Imperative scrollTo false fire", async () => {
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            ref.current?.scrollTo(5, 10);
        });
        act(() => {
            vi.runAllTimers();
        });
        expect(Element.prototype.scrollTo).not.toBeCalled();
    });

    test("Imperative scrollTo cell", async () => {
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            ref.current?.scrollTo(5, 500);
        });
        act(() => {
            vi.runAllTimers();
        });
        expect(Element.prototype.scrollTo).toBeCalledWith(0, 15_101);
    });

    test("Imperative scrollTo pixel", async () => {
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            ref.current?.scrollTo(5, {
                amount: 1500,
                unit: "px",
            });
        });
        act(() => {
            vi.runAllTimers();
        });
        expect(Element.prototype.scrollTo).toBeCalledWith(0, 533);
    });

    test("Imperative scrollTo pixel start", async () => {
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            ref.current?.scrollTo(
                5,
                {
                    amount: 1500,
                    unit: "px",
                },
                undefined,
                undefined,
                undefined,
                {
                    vAlign: "start",
                }
            );
        });
        act(() => {
            vi.runAllTimers();
        });
        expect(Element.prototype.scrollTo).toBeCalledWith(0, 1464);
    });

    test("Imperative scrollTo pixel center", async () => {
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            ref.current?.scrollTo(
                5,
                {
                    amount: 1500,
                    unit: "px",
                },
                undefined,
                undefined,
                undefined,
                {
                    vAlign: "center",
                }
            );
        });
        act(() => {
            vi.runAllTimers();
        });
        expect(Element.prototype.scrollTo).toBeCalledWith(0, 998.5);
    });

    test("Imperative scrollTo pixel end", async () => {
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rows={10_000} />, {
            wrapper: Context,
        });
        prep(false);

        act(() => {
            ref.current?.scrollTo(
                5,
                {
                    amount: 1500,
                    unit: "px",
                },
                undefined,
                undefined,
                undefined,
                {
                    vAlign: "end",
                }
            );
        });
        act(() => {
            vi.runAllTimers();
        });
        expect(Element.prototype.scrollTo).toBeCalledWith(0, 533);
    });

    test("Imperative damage gets right cell", async () => {
        const spy = vi.fn(basicProps.getCellContent);
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rowMarkers="number" getCellContent={spy} />, {
            wrapper: Context,
        });
        prep();

        spy.mockClear();
        act(() => {
            ref.current?.updateCells([{ cell: [1, 0] }]);
        });

        expect(spy).toBeCalledWith([1, 0]);
    });

    test("On-scroll does not spuriously fire on select", async () => {
        const spy = vi.fn(basicProps.getCellContent);
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rowMarkers="number" getCellContent={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 965,
        });

        act(() => {
            vi.runAllTimers();
        });

        expect(Element.prototype.scrollTo).not.toBeCalled();
    });

    test("Keyboard scroll with controlled selection does not double fire", async () => {
        const spy = vi.fn(basicProps.getCellContent);
        vi.useFakeTimers();
        const ref = React.createRef<DataEditorRef>();
        render(<EventedDataEditor ref={ref} {...basicProps} rowMarkers="number" getCellContent={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 965,
        });

        act(() => {
            vi.runAllTimers();
        });

        // make sure we clear the mock in case a spurios scroll was emitted (test above)
        (Element.prototype.scrollTo as Mock).mockClear();

        fireEvent.keyDown(canvas, { key: "ArrowDown" });
        fireEvent.keyUp(canvas, { key: "ArrowDown" });

        act(() => {
            vi.runAllTimers();
        });

        expect(Element.prototype.scrollTo).toBeCalledTimes(1);
    });

    test("Ctrl Arrow keys", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
    });

    test("Select range with mouse going out of bounds", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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

    test("Select all keybind", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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
                    width: 11,
                    height: 1000,
                },
                rangeStack: [],
            },
        });
    });

    test("Select column with blending", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
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
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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
        const spy = vi.fn();
        vi.useFakeTimers();
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

    test("Does not emits header menu click when move", async () => {
        const spy = vi.fn();

        vi.useFakeTimers();
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
            clientY: 16 + 200, // Not Header
        });

        await new Promise(r => window.setTimeout(r, 100));

        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16 + 200, // Not Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Dragging header disables vertical autoscroll", async () => {
        const spy = Element.prototype.scrollBy as Mock;
        spy.mockClear();

        vi.useFakeTimers();
        render(<DataEditor {...basicProps} />, {
            wrapper: Context,
        });
        prep();

        const canvas = screen.getByTestId("data-grid-canvas");
        fireEvent.mouseDown(canvas, {
            clientX: 300, // Col B
            clientY: 16, // Header
        });

        fireEvent.mouseMove(canvas, {
            clientX: 300, // Col B
            clientY: 0,
        });

        await new Promise(r => window.setTimeout(r, 100));

        fireEvent.mouseUp(canvas, {
            clientX: 300, // Col B
            clientY: 0,
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Use fill handle", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} fillHandle={true} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 290, // Col A
            clientY: 36 + 30, // Row 2
        });

        fireEvent.mouseDown(canvas, {
            clientX: 308, // Col A
            clientY: 36 + 30, // Row 2
        });

        fireEvent.mouseMove(canvas, {
            clientX: 308, // Col A
            clientY: 36 + 32 * 2 + 16, // Row 2
        });

        fireEvent.mouseUp(canvas, {
            clientX: 308, // Col A
            clientY: 36 + 32 * 2 + 16, // Row 2
        });

        fireEvent.click(canvas, {
            clientX: 308, // Col A
            clientY: 36 + 32 * 2 + 16, // Row 2
        });

        expect(spy).toBeCalledTimes(2);
    });

    test("Use fill handle diagonal", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} onCellEdited={spy} fillHandle={true} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 290, // Col A
            clientY: 36 + 30, // Row 2
        });

        fireEvent.mouseDown(canvas, {
            clientX: 308, // Col A
            clientY: 36 + 30, // Row 2
        });

        fireEvent.mouseMove(canvas, {
            clientX: 360,
            clientY: 36 + 32 * 5 + 16, // Row 5
        });

        fireEvent.mouseUp(canvas, {
            clientX: 360,
            clientY: 36 + 32 * 5 + 16, // Row 5
        });

        fireEvent.click(canvas, {
            clientX: 360,
            clientY: 36 + 32 * 5 + 16, // Row 5
        });

        expect(spy).toBeCalledTimes(5);
    });

    test("Use fill handle into blank", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(<EventedDataEditor {...basicProps} rows={3} onCellEdited={spy} fillHandle={true} />, {
            wrapper: Context,
        });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 290,
            clientY: 36 + 30,
        });

        fireEvent.mouseDown(canvas, {
            clientX: 308,
            clientY: 36 + 30,
        });

        fireEvent.mouseMove(canvas, {
            clientX: 308,
            clientY: 36 + 32 * 5 + 16,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 308,
            clientY: 36 + 32 * 5 + 16,
        });

        fireEvent.click(canvas, {
            clientX: 308,
            clientY: 36 + 32 * 5 + 16,
        });

        expect(spy).toBeCalledTimes(2);
    });

    test("Use fill handle into trailing row", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rows={3}
                onCellEdited={spy}
                fillHandle={true}
                onRowAppended={() => undefined}
                trailingRowOptions={{
                    sticky: true,
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");

        sendClick(canvas, {
            clientX: 290,
            clientY: 36 + 30,
        });

        fireEvent.mouseDown(canvas, {
            clientX: 308,
            clientY: 36 + 30,
        });

        fireEvent.mouseMove(canvas, {
            clientX: 308,
            clientY: 800,
        });

        fireEvent.mouseMove(canvas, {
            clientX: 308,
            clientY: 995,
        });

        fireEvent.mouseUp(canvas, {
            clientX: 308,
            clientY: 995,
        });

        fireEvent.click(canvas, {
            clientX: 308,
            clientY: 995,
        });

        expect(spy).toBeCalledTimes(2);
    });

    test("Close overlay with enter key", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
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
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.keyDown(canvas, {
            key: "Enter",
        });

        vi.runAllTimers();

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

    test("Clear selection when suddenly out of range", async () => {
        const spy = vi.fn();
        vi.useFakeTimers();
        const { rerender } = render(<EventedDataEditor {...basicProps} rows={10} onGridSelectionChange={spy} />, {
            wrapper: Context,
        });
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300,
            clientY: 36 + 32 * 5 + 16,
        });

        vi.runAllTimers();
        spy.mockClear();

        rerender(<EventedDataEditor {...basicProps} rows={1} onGridSelectionChange={spy} />);

        vi.runAllTimers();
        expect(spy).toBeCalledWith({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
            current: undefined,
        });
    });

    test("Enter key does not trigger disallowed row fetch", async () => {
        const spy = vi.fn(basicProps.getCellContent);
        vi.useFakeTimers();
        render(
            <EventedDataEditor
                {...basicProps}
                rows={2}
                getCellContent={spy}
                onRowAppended={vi.fn()}
                trailingRowOptions={{
                    sticky: true,
                    tint: true,
                }}
            />,
            {
                wrapper: Context,
            }
        );
        prep(false);

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
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

        vi.runAllTimers();
        expect(spy.mock.calls.findIndex(x => x[0][1] > 1)).toBe(-1);
    });
});
