import * as React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import BubblesOverlayEditor from "../src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js";
import DrilldownOverlayEditor from "../src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.js";
import { getDefaultTheme, GridCellKind, ImageOverlayEditor, type TextCell } from "../src/index.js";
import { MarkdownOverlayEditor } from "../src/internal/data-grid-overlay-editor/private/markdown-overlay-editor.js";
import NumberOverlayEditor from "../src/internal/data-grid-overlay-editor/private/number-overlay-editor.js";
import UriOverlayEditor from "../src/internal/data-grid-overlay-editor/private/uri-overlay-editor.js";
import DataGridOverlayEditor from "../src/internal/data-grid-overlay-editor/data-grid-overlay-editor.js";
import { textCellRenderer } from "../src/cells/text-cell.js";
import { vi, expect, describe, test, afterEach } from "vitest";

describe("data-grid-overlay", () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    test("Smoke test bubbles", async () => {
        render(<BubblesOverlayEditor bubbles={["A", "B"]} />);
    });

    test("Smoke test drilldown", async () => {
        render(<DrilldownOverlayEditor drilldowns={[{ text: "A" }, { text: "B" }]} />);
    });

    test("Smoke test image overlay", async () => {
        const spy = vi.fn();

        render(<ImageOverlayEditor canWrite={false} onCancel={spy} onChange={spy} urls={["https://www.google.com"]} />);
    });

    test("Smoke test markdown overlay", async () => {
        const spy = vi.fn();

        render(
            <MarkdownOverlayEditor
                forceEditMode={false}
                value={{
                    kind: GridCellKind.Markdown,
                    allowOverlay: true,
                    data: "# Header",
                }}
                onChange={spy}
                onFinish={spy}
                targetRect={{ x: 0, y: 0, width: 200, height: 32 }}
            />
        );
    });

    test("Smoke test number overlay", async () => {
        const spy = vi.fn();

        render(<NumberOverlayEditor highlight={false} onChange={spy} value={35} />);
    });

    test("Smoke test uri overlay editor", async () => {
        const spy = vi.fn();

        render(
            <UriOverlayEditor
                forceEditMode={false}
                onChange={spy}
                readonly={false}
                uri={"https://google.com"}
                preview={"https://google.com"}
            />
        );
    });

    describe("scrolling", () => {
        const content: TextCell = {
            kind: GridCellKind.Text,
            allowOverlay: true,
            data: "original",
            displayData: "original",
        };

        function renderOverlay(
            props: Partial<
                Pick<React.ComponentProps<typeof DataGridOverlayEditor>, "validateCell" | "forceEditMode">
            > = {}
        ) {
            const scrollRef = React.createRef<HTMLDivElement>();
            const elements = render(
                <>
                    <div data-testid="ancestor">
                        <div ref={scrollRef} data-testid="grid" />
                        <div data-testid="unrelated" />
                    </div>
                    <div id="portal" />
                    <div data-testid="menu" className="click-outside-ignore" />
                </>
            );
            const onFinishEditing = vi.fn();
            const overlay = render(
                <DataGridOverlayEditor
                    target={{ x: 0, y: 0, width: 200, height: 32 }}
                    cell={[0, 0]}
                    content={content}
                    id="cell-editor"
                    theme={getDefaultTheme()}
                    onFinishEditing={onFinishEditing}
                    forceEditMode={false}
                    highlight={false}
                    getCellRenderer={vi.fn().mockReturnValue(textCellRenderer)}
                    activation={{ inputType: "keyboard", key: "Enter" }}
                    scrollRef={scrollRef}
                    {...props}
                />
            );

            return {
                ...overlay,
                onFinishEditing,
                editor: overlay.getByRole("textbox"),
                grid: elements.getByTestId("grid"),
                ancestor: elements.getByTestId("ancestor"),
                menu: elements.getByTestId("menu"),
                unrelated: elements.getByTestId("unrelated"),
            };
        }

        test.each(["grid", "ancestor", "document"] as const)("%s scrolling finishes the latest draft", source => {
            const overlay = renderOverlay();
            fireEvent.change(overlay.editor, { target: { value: "first draft" } });
            fireEvent.change(overlay.editor, { target: { value: "latest draft" } });

            fireEvent.scroll(source === "document" ? document : overlay[source], { bubbles: false });

            expect(overlay.onFinishEditing).toHaveBeenCalledTimes(1);
            expect(overlay.onFinishEditing).toHaveBeenCalledWith({ ...content, data: "latest draft" }, [0, 0]);
        });

        test.each(["editor", "menu", "unrelated", "window"] as const)("%s scrolling leaves the edit open", source => {
            const overlay = renderOverlay();
            fireEvent.change(overlay.editor, { target: { value: "draft" } });

            fireEvent.scroll(source === "window" ? window : overlay[source], { bubbles: false });

            expect(overlay.onFinishEditing).not.toHaveBeenCalled();
            fireEvent.scroll(overlay.grid);
            expect(overlay.onFinishEditing).toHaveBeenCalledWith({ ...content, data: "draft" }, [0, 0]);
        });

        test.each([false, true])("preserves unchanged draft handling with forceEditMode=%s", forceEditMode => {
            const overlay = renderOverlay({ forceEditMode });

            fireEvent.scroll(overlay.grid);

            expect(overlay.onFinishEditing).toHaveBeenCalledWith(forceEditMode ? content : undefined, [0, 0]);
        });

        test("discards the latest draft when validation rejects it", () => {
            const overlay = renderOverlay({
                validateCell: (_cell, newValue) => newValue.data !== "invalid",
            });
            fireEvent.change(overlay.editor, { target: { value: "valid" } });
            fireEvent.change(overlay.editor, { target: { value: "invalid" } });

            fireEvent.scroll(overlay.grid);

            expect(overlay.onFinishEditing).toHaveBeenCalledWith(undefined, [0, 0]);
        });

        test("commits a valid draft after an invalid draft", () => {
            const overlay = renderOverlay({
                validateCell: (_cell, newValue) => newValue.data !== "invalid",
            });
            fireEvent.change(overlay.editor, { target: { value: "invalid" } });
            fireEvent.change(overlay.editor, { target: { value: "valid" } });

            fireEvent.scroll(overlay.grid);

            expect(overlay.onFinishEditing).toHaveBeenCalledWith({ ...content, data: "valid" }, [0, 0]);
        });

        test("commits the value returned by validation", () => {
            const overlay = renderOverlay({
                validateCell: (_cell, newValue) =>
                    newValue.kind === GridCellKind.Text ? { ...newValue, data: newValue.data.trim() } : true,
            });
            fireEvent.change(overlay.editor, { target: { value: " draft " } });

            fireEvent.scroll(overlay.grid);

            expect(overlay.onFinishEditing).toHaveBeenCalledWith({ ...content, data: "draft" }, [0, 0]);
        });

        test("repeated scroll events finish the edit only once", () => {
            const overlay = renderOverlay();
            fireEvent.change(overlay.editor, { target: { value: "draft" } });

            fireEvent.scroll(overlay.grid);
            fireEvent.scroll(overlay.ancestor);
            fireEvent.scroll(document);

            expect(overlay.onFinishEditing).toHaveBeenCalledTimes(1);
        });

        test("ignores scrolling after keyboard editing has finished", async () => {
            const overlay = renderOverlay();
            fireEvent.change(overlay.editor, { target: { value: "draft" } });
            fireEvent.keyDown(overlay.editor, { key: "Enter" });
            await waitFor(() => expect(overlay.onFinishEditing).toHaveBeenCalledTimes(1));

            fireEvent.scroll(overlay.grid);

            expect(overlay.onFinishEditing).toHaveBeenCalledTimes(1);
            expect(overlay.onFinishEditing).toHaveBeenCalledWith({ ...content, data: "draft" }, [0, 1]);
        });

        test("unmounting removes the capture-phase scroll listener", () => {
            const addListener = vi.spyOn(window, "addEventListener");
            const removeListener = vi.spyOn(window, "removeEventListener");
            const overlay = renderOverlay();
            const scrollListener = addListener.mock.calls.find(([type]) => type === "scroll");
            expect(scrollListener).toBeDefined();
            expect(scrollListener?.[2]).toBe(true);

            overlay.unmount();

            expect(removeListener).toHaveBeenCalledWith("scroll", scrollListener?.[1], true);
            fireEvent.scroll(overlay.grid);
            expect(overlay.onFinishEditing).not.toHaveBeenCalled();
        });
    });
});
