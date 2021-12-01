import { describe, test, expect } from "jest-without-globals";
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DataGrid, { DataGridProps } from "./data-grid";
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

    test("Emits mouse up", () => {
        const spy = jest.fn();
        render(
            <ThemeProvider theme={getDataEditorTheme()}>
                <DataGrid {...basicProps} onMouseUp={spy} />
            </ThemeProvider>
        );

        fireEvent.mouseUp(screen.getByTestId("data-grid-canvas"), {
            clientX: 300, // Col B
            clientY: 36 + 32 * 5 + 16, // Row 1 (0 indexed)
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
});
