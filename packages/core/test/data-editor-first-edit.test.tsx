import * as React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import { DataEditor, type DataEditorProps, GridCellKind } from "../src/index.js";
import { basicProps, prep, sendClick, Context, standardBeforeEach, standardAfterEach } from "./test-utils.js";

// #1202: under React 19 a `React.lazy` editor suspends on the first edit and React
// holds its reveal for up to 300 ms, so the keys typed meanwhile are lost. These tests
// run in their own file because the editors' load state is module-level: an earlier
// test that opened an editor would hide the bug.

const loads = vi.hoisted(() => ({ numberEditor: 0, numberEditorDone: false }));

vi.mock("../src/internal/data-grid-overlay-editor/private/number-overlay-editor.js", async importOriginal => {
    loads.numberEditor++;
    const module = await importOriginal();
    loads.numberEditorDone = true;
    return module;
});

vi.mock("../src/common/resize-detector", () => {
    return {
        useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
    };
});

/**
 * Waits for the overlay editor chunk that `DataEditor` preloads on mount. Importing it
 * here doesn't make `React.lazy` resolve: without the preload the first edit still suspends.
 */
async function settleOverlayEditor() {
    await act(async () => {
        await import("../src/internal/data-grid-overlay-editor/data-grid-overlay-editor.js");
        await new Promise(resolve => window.setTimeout(resolve, 10));
    });
}

const textOnlyProps: DataEditorProps = {
    ...basicProps,
    getCellContent: ([col, row]) => ({
        kind: GridCellKind.Text,
        allowOverlay: true,
        data: `Data: ${col}, ${row}`,
        displayData: `${col}, ${row}`,
    }),
};

describe("first type-to-edit after load", () => {
    beforeEach(() => {
        standardBeforeEach();
    });

    afterEach(() => {
        standardAfterEach();
    });

    // Must run first: every later test draws number cells, which loads the number editor.
    test("a grid that draws no number cell doesn't load the number editor", async () => {
        vi.useFakeTimers();
        render(<DataEditor {...textOnlyProps} />, { wrapper: Context });
        prep();
        await act(async () => {
            await new Promise(resolve => window.setTimeout(resolve, 10));
        });

        expect(loads.numberEditor).toBe(0);
    });

    test("a Text cell's first keypress renders the overlay editor in the same act", async () => {
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} />, { wrapper: Context });
        prep();
        await settleOverlayEditor();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 300, // Col B
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });
        fireEvent.keyDown(canvas, { keyCode: 74, key: "j" });

        const overlay = screen.getByDisplayValue("j");
        expect(document.body.contains(overlay)).toBe(true);
    });

    test("drawing a number cell loads the number editor, so its first keypress renders it in the same act", async () => {
        vi.useFakeTimers();
        render(<DataEditor {...basicProps} />, { wrapper: Context });
        prep();
        // Don't import the number editor here: an import racing the preload's can load it twice.
        await vi.waitFor(() => expect(loads.numberEditorDone).toBe(true));
        await settleOverlayEditor();

        const canvas = screen.getByTestId("data-grid-canvas");
        sendClick(canvas, {
            clientX: 150 + 160 + 170 + 90, // Col D, a Number column
            clientY: 36 + 32 + 16, // Row 1 (0 indexed)
        });
        fireEvent.keyDown(canvas, { keyCode: 49, key: "1" });

        const overlay = screen.getByDisplayValue("1");
        expect(overlay.tagName).toBe("INPUT");
        expect(loads.numberEditor).toBe(1);
    });
});
