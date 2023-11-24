import { renderHook, cleanup } from "@testing-library/react-hooks";
import type { BaseDrawArgs } from "../src/cells/cell-types.js";
import { type CustomCell, GridCellKind } from "../src/internal/data-grid/data-grid-types.js";
import { useCustomCells } from "../src/data-editor/use-custom-cells.js";
import { expect, describe, it, afterEach } from "vitest";

type MyCustomCell = CustomCell<{ kind: "test"; pasted?: string }>;

describe("use-column-sizer", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("Set up cells", async () => {
        const { result } = renderHook(() =>
            useCustomCells([
                {
                    draw: (_args: BaseDrawArgs, _cell: MyCustomCell) => true,
                    isMatch: (c: CustomCell): c is MyCustomCell => (c.data as any).kind === "test",
                    provideEditor: () => undefined,
                    onPaste: (v, data) => ({ ...data, pasted: v }),
                },
            ])
        );

        expect(result.current.customRenderers[0].kind === GridCellKind.Custom).toBe(true);
    });
});
