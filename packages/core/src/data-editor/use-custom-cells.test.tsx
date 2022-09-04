import { renderHook } from "@testing-library/react-hooks";
import type { BaseDrawArgs } from "../data-grid/cells/cell-types";
import { CustomCell, GridCellKind } from "../data-grid/data-grid-types";
import { useCustomCells } from "./use-custom-cells";

type MyCustomCell = CustomCell<{ kind: "test"; pasted?: string }>;

describe("use-column-sizer", () => {
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
