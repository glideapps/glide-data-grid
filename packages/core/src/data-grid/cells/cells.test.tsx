import { render } from "@testing-library/react";
import { assert } from "../../common/support";
import { GridCellKind, ImageCell, ImageEditorType, isObjectEditorCallbackResult, Rectangle } from "../data-grid-types";
import { imageCellRenderer } from "./image-cell";
import * as React from "react";
import noop from "lodash/noop";
import { getDefaultTheme } from "../..";

function getMockEditorTarget(): Rectangle {
    return {
        x: 0,
        y: 0,
        width: 100,
        height: 32,
    };
}

function get2dContext(): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
        throw new Error("Cannot get a 2d context");
    }

    return ctx;
}

const getImgCell = (): ImageCell => {
    return {
        kind: GridCellKind.Image,
        data: ["img1.jpg", "img2.jpg"],
        allowAdd: true,
        allowOverlay: true,
    };
};

// TODO: We can test the editor _much_ more.
// Let's do that.
describe("Image cell", () => {
    it("Renders the right accessibilty string", async () => {
        const cell = getImgCell();
        const accessibilityString = imageCellRenderer.getAccessibilityString(cell);
        expect(accessibilityString).toBe("img1.jpg, img2.jpg");
    });

    it("Measures a reasonable size", async () => {
        const cell = getImgCell();
        const ctx = get2dContext();
        const autoSize = imageCellRenderer.measure?.(ctx, cell, getDefaultTheme());
        expect(autoSize).toBe(100);
    });

    it("Renders its editor (smoke test)", async () => {
        const cell = getImgCell();
        const Editor = imageCellRenderer.provideEditor?.(cell);
        const target = getMockEditorTarget();

        assert(!isObjectEditorCallbackResult(Editor));

        assert(Editor !== undefined);
        const result = render(
            <Editor
                onChange={noop}
                onKeyDown={noop}
                onFinishedEditing={noop}
                isHighlighted={false}
                value={cell}
                target={target}
                forceEditMode={false}
            />
        );

        // Check if the element is actually there
        await result.findByTestId("GDG-default-image-overlay-editor");
    });

    it("Renders a custom editor (smoke test)", async () => {
        const cell = getImgCell();
        const Editor = imageCellRenderer.provideEditor?.(cell);
        assert(Editor !== undefined);
        const target = getMockEditorTarget();

        assert(!isObjectEditorCallbackResult(Editor));

        const CustomEditor: ImageEditorType = () => {
            return (
                <div data-testid="GDG-custom-image-overlay-editor">
                    <p>I am an editor, trust me</p>
                </div>
            );
        };

        const result = render(
            <Editor
                imageEditorOverride={CustomEditor}
                onChange={noop}
                onKeyDown={noop}
                onFinishedEditing={noop}
                isHighlighted={false}
                value={cell}
                target={target}
                forceEditMode={false}
            />
        );

        // Check if the element is actually there
        await result.findByTestId("GDG-custom-image-overlay-editor");
    });
});
