import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { GridCellKind, type GridCell, type GridSelection, type Item } from "../src/index.js";
import { beforeEach, afterEach, expect, test, vi } from "vitest";
import { EventedDataEditor, Context, prep, sendClick, standardBeforeEach, standardAfterEach } from "./test-utils.js";

vi.mock("../src/common/resize-detector", () => ({
    useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
}));

beforeEach(standardBeforeEach);
afterEach(() => {
    standardAfterEach();
    vi.useRealTimers();
});

const text = (data: string): GridCell => ({ kind: GridCellKind.Text, allowOverlay: true, data, displayData: data });
const day = text("Day");
const night = text("Night");
const noon = text("Noon");
const numberCell: GridCell = { kind: GridCellKind.Number, allowOverlay: true, data: 7, displayData: "7" };
const booleanCell: GridCell = { kind: GridCellKind.Boolean, allowOverlay: false, data: true };
const uriCell: GridCell = { kind: GridCellKind.Uri, allowOverlay: true, data: "https://example.com" };

interface Scenario {
    name: string;
    direction: "vertical" | "horizontal" | "any";
    source: GridCell[][];
    target: Item;
    destination: { x: number; y: number; width: number; height: number };
    edits: Array<[number, number, GridCell]>;
    cancel?: boolean;
    fallback?: boolean;
}

// These literal continuations describe the selected values across their source boundary.
const scenarios: Scenario[] = [
    {
        name: "upward by three rows",
        direction: "vertical",
        source: [[day], [night]],
        target: [4, 1],
        destination: { x: 4, y: 1, width: 1, height: 5 },
        edits: [
            [4, 1, night],
            [4, 2, day],
            [4, 3, night],
        ],
    },
    {
        name: "leftward by three columns",
        direction: "horizontal",
        source: [[day, night]],
        target: [1, 4],
        destination: { x: 1, y: 4, width: 5, height: 1 },
        edits: [
            [1, 4, night],
            [2, 4, day],
            [3, 4, night],
        ],
    },
    {
        name: "downward by three rows",
        direction: "vertical",
        source: [[day], [night]],
        target: [4, 8],
        destination: { x: 4, y: 4, width: 1, height: 5 },
        edits: [
            [4, 6, day],
            [4, 7, night],
            [4, 8, day],
        ],
    },
    {
        name: "rightward by three columns",
        direction: "horizontal",
        source: [[day, night]],
        target: [8, 4],
        destination: { x: 4, y: 4, width: 5, height: 1 },
        edits: [
            [6, 4, day],
            [7, 4, night],
            [8, 4, day],
        ],
    },
    {
        name: "upward by a whole period",
        direction: "vertical",
        source: [[day], [night]],
        target: [4, 2],
        destination: { x: 4, y: 2, width: 1, height: 4 },
        edits: [
            [4, 2, day],
            [4, 3, night],
        ],
    },
    {
        name: "leftward by a whole period",
        direction: "horizontal",
        source: [[day, night]],
        target: [2, 4],
        destination: { x: 2, y: 4, width: 4, height: 1 },
        edits: [
            [2, 4, day],
            [3, 4, night],
        ],
    },
    {
        name: "upward past a three-cell period",
        direction: "vertical",
        source: [[day], [noon], [night]],
        target: [4, 0],
        destination: { x: 4, y: 0, width: 1, height: 7 },
        edits: [
            [4, 0, night],
            [4, 1, day],
            [4, 2, noon],
            [4, 3, night],
        ],
    },
    {
        name: "leftward past a three-cell period",
        direction: "horizontal",
        source: [[day, noon, night]],
        target: [0, 4],
        destination: { x: 0, y: 4, width: 7, height: 1 },
        edits: [
            [0, 4, night],
            [1, 4, day],
            [2, 4, noon],
            [3, 4, night],
        ],
    },
    {
        name: "upward and leftward with mixed cell kinds",
        direction: "any",
        source: [
            [day, numberCell],
            [booleanCell, uriCell],
        ],
        target: [3, 3],
        destination: { x: 3, y: 3, width: 3, height: 3 },
        edits: [
            [3, 3, uriCell],
            [3, 4, numberCell],
            [3, 5, uriCell],
            [4, 3, booleanCell],
            [5, 3, uriCell],
        ],
    },
    {
        name: "a canceled fill",
        direction: "vertical",
        source: [[day], [night]],
        target: [4, 1],
        destination: { x: 4, y: 1, width: 1, height: 5 },
        edits: [],
        cancel: true,
    },
    {
        name: "per-cell editing callbacks",
        direction: "horizontal",
        source: [[day, numberCell]],
        target: [1, 4],
        destination: { x: 1, y: 4, width: 5, height: 1 },
        edits: [
            [1, 4, numberCell],
            [2, 4, day],
            [3, 4, numberCell],
        ],
        fallback: true,
    },
];

for (const scenario of scenarios) {
    test(`Fill preserves source phase: ${scenario.name}`, () => {
        vi.useFakeTimers();
        const source = { x: 4, y: 4, width: scenario.source[0].length, height: scenario.source.length };
        const initial = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => text("unfilled")));
        for (let r = 0; r < source.height; r++) {
            for (let c = 0; c < source.width; c++) initial[4 + r][4 + c] = scenario.source[r][c];
        }
        const emitted: Array<[number, number, GridCell]> = [];
        const fills: unknown[] = [];
        const onCellEdited = vi.fn();
        let selection: GridSelection | undefined;

        function SavedGrid() {
            const [saved, setSaved] = React.useState(initial);
            return (
                <>
                    <pre data-testid="saved-grid">{JSON.stringify(saved)}</pre>
                    <EventedDataEditor
                        width={1000}
                        height={1000}
                        columns={Array.from({ length: 10 }, (_, c) => ({ title: `Shift ${c}`, width: 80 }))}
                        rows={10}
                        headerHeight={36}
                        rowHeight={32}
                        fillHandle={true}
                        allowedFillDirections={scenario.direction}
                        getCellsForSelection={true}
                        getCellContent={([c, r]) => saved[r][c]}
                        onGridSelectionChange={next => {
                            selection = next;
                        }}
                        onFillPattern={event => {
                            fills.push({ patternSource: event.patternSource, fillDestination: event.fillDestination });
                            if (scenario.cancel === true) event.preventDefault();
                        }}
                        onCellEdited={onCellEdited}
                        onCellsEdited={edits => {
                            const next = saved.map(row => [...row]);
                            for (const {
                                location: [c, r],
                                value,
                            } of edits) {
                                emitted.push([c, r, value]);
                                next[r][c] = value;
                            }
                            setSaved(next);
                            return scenario.fallback !== true;
                        }}
                    />
                </>
            );
        }

        render(<SavedGrid />, { wrapper: Context });
        prep();
        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, { clientX: 360, clientY: 180 });
        sendClick(canvas, {
            clientX: (4 + source.width) * 80 - 40,
            clientY: 36 + (4 + source.height) * 32 - 16,
            shiftKey: true,
        });
        expect(selection?.current?.range).toEqual(source);
        expect(emitted).toEqual([]);
        fireEvent.pointerDown(canvas, {
            clientX: (4 + source.width) * 80 - 3.5,
            clientY: 36 + (4 + source.height) * 32 - 3.5,
        });
        const point = { clientX: scenario.target[0] * 80 + 40, clientY: 36 + scenario.target[1] * 32 + 16 };
        fireEvent.pointerMove(canvas, { ...point, buttons: 1 });
        fireEvent.pointerUp(canvas, point);
        fireEvent.click(canvas, point);
        expect(fills).toEqual([{ patternSource: source, fillDestination: scenario.destination }]);
        expect(selection?.current?.range).toEqual(scenario.destination);
        expect(emitted).toEqual(scenario.edits);
        const expected = initial.map(row => [...row]);
        for (const [c, r, value] of scenario.edits) expected[r][c] = value;
        expect(JSON.parse(screen.getByTestId("saved-grid").textContent!)).toEqual(expected);
        expect(onCellEdited.mock.calls).toEqual(
            scenario.fallback === true ? scenario.edits.map(([c, r, value]) => [[c, r], value]) : []
        );
    });
}
