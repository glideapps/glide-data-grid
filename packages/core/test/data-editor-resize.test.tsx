/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { CompactSelection } from "../src/index.js";
import type { DataEditorRef } from "../src/data-editor/data-editor.js";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import { EventedDataEditor, basicProps, prep, Context, standardBeforeEach, standardAfterEach } from "./test-utils.js";

describe("data-editor", () => {
    vi.mock("../src/common/resize-detector", () => {
        return {
            useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
        };
    });

    beforeEach(() => {
        standardBeforeEach();
    });

    afterEach(() => {
        standardAfterEach();
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
            buttons: 1,
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
            buttons: 1,
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
            buttons: 1,
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
            buttons: 1,
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
            buttons: 1,
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
});
