import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import BubblesOverlayEditor from "../src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor.js";
import DrilldownOverlayEditor from "../src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.js";
import { GridCellKind, ImageOverlayEditor } from "../src/index.js";
import { MarkdownOverlayEditor } from "../src/internal/data-grid-overlay-editor/private/markdown-overlay-editor.js";
import NumberOverlayEditor from "../src/internal/data-grid-overlay-editor/private/number-overlay-editor.js";
import UriOverlayEditor from "../src/internal/data-grid-overlay-editor/private/uri-overlay-editor.js";
import { vi, describe, test, afterEach } from "vitest";

describe("data-grid-overlay", () => {
    afterEach(() => {
        cleanup();
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
});
