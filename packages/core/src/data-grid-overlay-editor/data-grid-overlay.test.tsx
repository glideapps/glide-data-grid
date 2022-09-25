import * as React from "react";
import { render } from "@testing-library/react";
import BubblesOverlayEditor from "./private/bubbles-overlay-editor";
import DrilldownOverlayEditor from "./private/drilldown-overlay-editor";
import { ImageOverlayEditor } from "..";
import { MarkdownOverlayEditor } from "./private/markdown-overlay-editor";
import NumberOverlayEditor from "./private/number-overlay-editor";
import UriOverlayEditor from "./private/uri-overlay-editor";

describe("data-grid-overlay", () => {
    test("Smoke test bubbles", async () => {
        render(<BubblesOverlayEditor bubbles={["A", "B"]} />);
    });

    test("Smoke test drilldown", async () => {
        render(<DrilldownOverlayEditor drilldowns={[{ text: "A" }, { text: "B" }]} />);
    });

    test("Smoke test image overlay", async () => {
        const spy = jest.fn();

        render(<ImageOverlayEditor canWrite={false} onCancel={spy} onChange={spy} urls={["https://www.google.com"]} />);
    });

    test("Smoke test markdown overlay", async () => {
        const spy = jest.fn();

        render(
            <MarkdownOverlayEditor
                forceEditMode={false}
                markdown="# Header"
                onChange={spy}
                onFinish={spy}
                readonly={false}
                targetRect={{ x: 0, y: 0, width: 200, height: 32 }}
            />
        );
    });

    test("Smoke test number overlay", async () => {
        const spy = jest.fn();

        render(<NumberOverlayEditor highlight={false} onChange={spy} value={35} />);
    });

    test("Smoke test uri overlay editor", async () => {
        const spy = jest.fn();

        render(<UriOverlayEditor forceEditMode={false} onChange={spy} readonly={false} uri={"https://google.com"} />);
    });
});
