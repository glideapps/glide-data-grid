import { renderHook } from "@testing-library/react-hooks";
import { CustomCell, GridCellKind } from "../data-grid/data-grid-types";
import { useCustomCells } from "./use-custom-cells";
import type { DrawArgs } from "./custom-cell-draw-args";

type MyCustomCell = CustomCell<{ kind: "test"; pasted?: string }>;

describe("use-column-sizer", () => {
    it("Set up cells", async () => {
        const { result } = renderHook(() =>
            useCustomCells([
                {
                    draw: (_args: DrawArgs, _cell: MyCustomCell) => true,
                    isMatch: (c: CustomCell): c is MyCustomCell => (c.data as any).kind === "test",
                    provideEditor: () => undefined,
                    onPaste: (v, data) => ({ ...data, pasted: v }),
                },
            ])
        );

        expect(result.current.additionalRenderers[0].kind === GridCellKind.Custom).toBe(true);
    });
});
