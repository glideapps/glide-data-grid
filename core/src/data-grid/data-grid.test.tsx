import { describe, test, expect } from "jest-without-globals";
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DataGrid, { DataGridProps, DataGridRef } from "./data-grid";
import { GridCellKind } from "./data-grid-types";
import { ThemeProvider } from "styled-components";
import { getDataEditorTheme } from "../common/styles";

const basicProps: DataGridProps = {
    cellXOffset: 0,
    cellYOffset: 0,
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
    enableGroups: false,
    freezeColumns: 0,
    getCellContent: cell => ({
        kind: GridCellKind.Text,
        allowOverlay: false,
        data: `${cell[0]},${cell[1]}`,
        displayData: `${cell[0]},${cell[1]}`,
    }),
    groupHeaderHeight: 0,
    headerHeight: 36,
    height: 1000,
    width: 1000,
    isDragging: false,
    isResizing: false,
    lastRowSticky: false,
    rowHeight: 32,
    rows: 1000,
    verticalBorder: () => true,
};

describe("data-grid", () => {
    test("Emits mouse down", () => {
        const spy = jest.fn();
        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onMouseDown={spy} />
            </ThemeProvider>
        );

        fireEvent.mouseDown(screen.getByTestId("data-grid-canvas"), {
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
        const spy = jest.fn();
        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onMouseDown={spy} />
            </ThemeProvider>
        );

        fireEvent.mouseDown(screen.getByTestId("data-grid-canvas"), {
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
        const spy = jest.fn();
        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onMouseUp={spy} />
            </ThemeProvider>
        );

        fireEvent.mouseUp(screen.getByTestId("data-grid-canvas"), {
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
        const downSpy = jest.fn();
        const upSpy = jest.fn();

        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid
                    {...basicProps}
                    columns={basicProps.columns.map(c => ({ ...c, hasMenu: true }))}
                    onMouseUp={upSpy}
                    onMouseDown={downSpy}
                />
            </ThemeProvider>
        );

        const el = screen.getByTestId("data-grid-canvas");
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
        const spy = jest.fn();

        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onItemHovered={spy} />
            </ThemeProvider>
        );

        const el = screen.getByTestId("data-grid-canvas");
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

    test("Header hovered", () => {
        const spy = jest.fn();

        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onItemHovered={spy} />
            </ThemeProvider>
        );

        const el = screen.getByTestId("data-grid-canvas");
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

    test("Group header hovered", () => {
        const spy = jest.fn();

        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onItemHovered={spy} enableGroups={true} groupHeaderHeight={28} />
            </ThemeProvider>
        );

        const el = screen.getByTestId("data-grid-canvas");
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
        const spy = jest.fn(basicProps.getCellContent);
        const ref = React.createRef<DataGridRef>();

        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid ref={ref} {...basicProps} getCellContent={spy} enableGroups={true} groupHeaderHeight={28} />
            </ThemeProvider>
        );

        spy.mockClear();
        expect(spy).not.toBeCalled();
        ref.current?.damage([{ cell: [1, 1] }]);
        expect(spy).toBeCalled();
    });

    test("Out of bounds damage", () => {
        const spy = jest.fn(basicProps.getCellContent);
        const ref = React.createRef<DataGridRef>();

        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid ref={ref} {...basicProps} getCellContent={spy} enableGroups={true} groupHeaderHeight={28} />
            </ThemeProvider>
        );

        spy.mockClear();
        expect(spy).not.toBeCalled();
        ref.current?.damage([{ cell: [1, 900] }]);
        expect(spy).not.toBeCalled();
    });

    test("Freeze column simple check", () => {
        const spy = jest.fn();
        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} freezeColumns={1} cellXOffset={3} onMouseUp={spy} />
            </ThemeProvider>
        );

        fireEvent.mouseUp(screen.getByTestId("data-grid-canvas"), {
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
