import * as React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getDefaultTheme, GridCellKind, isObjectEditorCallbackResult } from "@glideapps/glide-data-grid";
import renderer, { type DropdownCell } from "../src/cells/dropdown-cell.js";

describe("Dropdown Editor", () => {
    afterEach(cleanup);

    it("preserves the menu element and scroll position when the editor rerenders", () => {
        const cell: DropdownCell = {
            kind: GridCellKind.Custom,
            allowOverlay: true,
            copyData: "Option 1",
            data: {
                kind: "dropdown-cell",
                value: "Option 1",
                allowedValues: Array.from({ length: 100 }, (_, index) => `Option ${index + 1}`),
            },
        };
        const editor = renderer.provideEditor?.(cell);
        if (editor === undefined || !isObjectEditorCallbackResult(editor)) {
            throw new Error("Editor is invalid");
        }
        const Editor = editor.editor;
        const props: React.ComponentProps<typeof Editor> = {
            value: cell,
            onChange: vi.fn(),
            onFinishedEditing: vi.fn(),
            isHighlighted: false,
            target: { x: 0, y: 0, width: 200, height: 34 },
            forceEditMode: false,
            theme: getDefaultTheme(),
        };
        const { getByRole, rerender } = render(<Editor {...props} />);
        fireEvent.keyDown(getByRole("combobox"), { key: "ArrowDown" });

        const menu = getByRole("listbox");
        menu.scrollTop = 200;
        expect(menu.scrollTop).toBe(200);

        rerender(<Editor {...props} />);

        const menuAfterRerender = getByRole("listbox");
        expect(menuAfterRerender.scrollTop).toBe(200);
        expect(menuAfterRerender).toBe(menu);
    });
});
