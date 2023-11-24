import * as React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import DataGrid, { type DataGridProps, type DataGridRef } from "../src/internal/data-grid/data-grid.js";
import { CompactSelection, GridCellKind } from "../src/internal/data-grid/data-grid-types.js";
import { getDefaultTheme } from "../src/index.js";
import { CellRenderers } from "../src/cells/index.js";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";

const basicProps: DataGridProps = {
    cellXOffset: 0,
    cellYOffset: 0,
    headerIcons: undefined,
    isDraggable: undefined,
    onCanvasBlur: () => undefined,
    onCanvasFocused: () => undefined,
    onCellFocused: () => undefined,
    onContextMenu: () => undefined,
    onDragEnd: () => undefined,
    onDragLeave: () => undefined,
    onDragOverCell: () => undefined,
    onDragStart: () => undefined,
    onDrop: () => undefined,
    onItemHovered: () => undefined,
    onKeyDown: () => undefined,
    onKeyUp: () => undefined,
    onMouseDown: () => undefined,
    onMouseMoveRaw: () => undefined,
    onMouseUp: () => undefined,
    smoothScrollX: undefined,
    smoothScrollY: undefined,
    allowResize: undefined,
    canvasRef: undefined,
    disabledRows: undefined,
    eventTargetRef: undefined,
    fillHandle: undefined,
    fixedShadowX: undefined,
    fixedShadowY: undefined,
    getGroupDetails: undefined,
    getRowThemeOverride: undefined,
    highlightRegions: undefined,
    imageWindowLoader: undefined,
    onHeaderMenuClick: undefined,
    prelightCells: undefined,
    translateX: undefined,
    translateY: undefined,
    dragAndDropState: undefined,
    drawCustomCell: undefined,
    drawFocusRing: undefined,
    drawHeader: undefined,
    isFocused: true,
    experimental: undefined,
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
    isFilling: false,
    enableGroups: false,
    theme: getDefaultTheme(),
    freezeColumns: 0,
    selection: {
        current: undefined,
        rows: CompactSelection.empty(),
        columns: CompactSelection.empty(),
    },
    firstColAccessible: true,
    onMouseMove: () => undefined,
    getCellContent: cell => ({
        kind: GridCellKind.Text,
        allowOverlay: false,
        data: `${cell[0]},${cell[1]}`,
        displayData: `${cell[0]},${cell[1]}`,
    }),
    groupHeaderHeight: 0,
    headerHeight: 36,
    accessibilityHeight: 50,
    height: 1000,
    width: 1000,
    isDragging: false,
    isResizing: false,
    trailingRowType: "none",
    rowHeight: 32,
    rows: 1000,
    verticalBorder: () => true,
    getCellRenderer: cell => {
        if (cell.kind === GridCellKind.Custom) return undefined;
        return CellRenderers[cell.kind] as any;
    },
};

const dataGridCanvasId = "data-grid-canvas";
describe("data-grid", () => {
    beforeEach(() => {
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
        Image.prototype.decode = vi.fn();
    });

    afterEach(() => {
        cleanup();
    });

    test("Emits mouse down", () => {
        const spy = vi.fn();
        render(<DataGrid {...basicProps} onMouseDown={spy} />);

        fireEvent.mouseDown(screen.getByTestId(dataGridCanvasId), {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.mouseUp(screen.getByTestId(dataGridCanvasId), {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        fireEvent.click(screen.getByTestId(dataGridCanvasId), {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                location: [1, 1],
                kind: "cell",
            })
        );
    });

    test("OOB mouse down", () => {
        const spy = vi.fn();
        render(<DataGrid {...basicProps} onMouseDown={spy} />);

        fireEvent.mouseDown(screen.getByTestId(dataGridCanvasId), {
            clientX: 990, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                kind: "out-of-bounds",
            })
        );
    });

    test("Emits mouse up", () => {
        const spy = vi.fn();
        render(<DataGrid {...basicProps} onMouseUp={spy} />);

        fireEvent.mouseDown(screen.getByTestId(dataGridCanvasId), {
            clientX: 300, // Col B
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        fireEvent.mouseUp(screen.getByTestId(dataGridCanvasId), {
            clientX: 300, // Col B
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        fireEvent.click(screen.getByTestId(dataGridCanvasId), {
            clientX: 300, // Col B
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                location: [1, 5],
                kind: "cell",
                localEventX: 150,
                localEventY: 16,
            }),
            false
        );
    });

    test("Does not emit mousedown/up over header menu", () => {
        const downSpy = vi.fn();
        const upSpy = vi.fn();

        render(
            <DataGrid
                {...basicProps}
                columns={basicProps.columns.map(c => ({ ...c, hasMenu: true }))}
                onMouseUp={upSpy}
                onMouseDown={downSpy}
            />
        );

        const el = screen.getByTestId(dataGridCanvasId);
        fireEvent.mouseDown(el, {
            clientX: 140,
            clientY: 18,
        });

        fireEvent.mouseUp(el, {
            clientX: 140,
            clientY: 18,
        });

        expect(downSpy).not.toBeCalled();
        expect(upSpy).not.toBeCalled();
    });

    test("Cell hovered", () => {
        const spy = vi.fn();

        render(<DataGrid {...basicProps} onItemHovered={spy} />);

        const el = screen.getByTestId(dataGridCanvasId);
        fireEvent.mouseMove(el, {
            clientX: 350, // Col C
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                kind: "cell",
                location: [2, 5],
            })
        );
    });

    test("Cell is not hovered when target is not data grid", () => {
        const spy = vi.fn();

        render(
            <>
                <DataGrid {...basicProps} onItemHovered={spy} />
                <div
                    data-testid="outside-element"
                    style={{
                        position: "absolute",
                        width: "100vh",
                        height: "100vh",
                    }}
                />
            </>
        );

        const outsideElement = screen.getByTestId("outside-element");
        fireEvent.mouseMove(outsideElement, {
            clientX: 350, // Col C
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        expect(spy).not.toHaveBeenCalled();
    });

    test("Header hovered", () => {
        const spy = vi.fn();

        render(<DataGrid {...basicProps} onItemHovered={spy} />);

        const el = screen.getByTestId(dataGridCanvasId);
        fireEvent.mouseMove(el, {
            clientX: 350, // Col C
            clientY: 16, // Header
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                kind: "header",
                location: [2, -1],
            })
        );
    });

    test("Header hovered when scrolled", () => {
        const spy = vi.fn();

        render(
            <DataGrid {...basicProps} groupHeaderHeight={32} enableGroups={true} cellYOffset={10} onItemHovered={spy} />
        );

        const el = screen.getByTestId(dataGridCanvasId);
        fireEvent.mouseMove(el, {
            clientX: 350, // Col C
            clientY: 46, // Header
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                kind: "header",
                location: [2, -1],
            })
        );
    });

    test("Group header hovered", () => {
        const spy = vi.fn();

        render(<DataGrid {...basicProps} onItemHovered={spy} enableGroups={true} groupHeaderHeight={28} />);

        const el = screen.getByTestId(dataGridCanvasId);
        fireEvent.mouseMove(el, {
            clientX: 350, // Col C
            clientY: 14, // Header
        });

        expect(spy).toBeCalledWith(
            expect.objectContaining({
                kind: "group-header",
                location: [2, -2],
            })
        );
    });

    test("Simple damage", () => {
        const spy = vi.fn(basicProps.getCellContent);
        const ref = React.createRef<DataGridRef>();

        render(<DataGrid ref={ref} {...basicProps} getCellContent={spy} enableGroups={true} groupHeaderHeight={28} />);

        spy.mockClear();
        expect(spy).not.toBeCalled();
        ref.current?.damage([{ cell: [1, 1] }]);
        expect(spy).toBeCalled();
    });

    test("Out of bounds damage", () => {
        const spy = vi.fn(basicProps.getCellContent);
        const ref = React.createRef<DataGridRef>();

        render(<DataGrid ref={ref} {...basicProps} getCellContent={spy} enableGroups={true} groupHeaderHeight={28} />);

        spy.mockClear();
        expect(spy).not.toBeCalled();
        ref.current?.damage([{ cell: [1, 900] }]);
        expect(spy).not.toBeCalled();
    });

    test("Freeze column simple check", () => {
        const spy = vi.fn();
        render(<DataGrid {...basicProps} freezeColumns={1} cellXOffset={3} onMouseUp={spy} />);

        fireEvent.mouseDown(screen.getByTestId(dataGridCanvasId), {
            clientX: 50, // Col A
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        fireEvent.mouseUp(screen.getByTestId(dataGridCanvasId), {
            clientX: 50, // Col A
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        fireEvent.click(screen.getByTestId(dataGridCanvasId), {
            clientX: 50, // Col A
            clientY: 36 + 32 * 5 + 16, // Row 5 (0 indexed)
        });

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                location: [0, 5],
                kind: "cell",
                localEventX: 50,
                localEventY: 16,
            }),
            false
        );
    });
});
