import { renderHook } from "@testing-library/react-hooks";
import { getDefaultTheme } from "..";
import ImageWindowLoader from "../common/image-window-loader";
import { CustomCell, GridCellKind } from "../data-grid/data-grid-types";
import { useCustomCells } from "./use-custom-cells";
import type { DrawArgs } from "./custom-cell-draw-args";

type MyCustomCell = CustomCell<{ kind: "test"; pasted?: string }>;

const testCell: MyCustomCell = {
    kind: GridCellKind.Custom,
    allowOverlay: false,
    copyData: "",
    data: {
        kind: "test",
    },
};

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

        expect(
            result.current.drawCell({
                cell: testCell,
                col: 5,
                ctx: {} as any,
                highlighted: false,
                hoverAmount: 0,
                hoverX: undefined,
                hoverY: undefined,
                imageLoader: new ImageWindowLoader(),
                rect: {
                    x: 10,
                    y: 10,
                    width: 200,
                    height: 30,
                },
                requestAnimationFrame: () => undefined,
                row: 5,
                theme: getDefaultTheme(),
            })
        ).toBe(true);

        expect(
            result.current.drawCell({
                cell: {
                    ...testCell,
                    data: {
                        kind: "not-test",
                    },
                },
                col: 5,
                ctx: {} as any,
                highlighted: false,
                hoverAmount: 0,
                hoverX: undefined,
                hoverY: undefined,
                imageLoader: new ImageWindowLoader(),
                rect: {
                    x: 10,
                    y: 10,
                    width: 200,
                    height: 30,
                },
                requestAnimationFrame: () => undefined,
                row: 5,
                theme: getDefaultTheme(),
            })
        ).toBe(false);

        expect(result.current.provideEditor(testCell)).toBeUndefined();
        expect(result.current.coercePasteValue("pasteVal", testCell)).toEqual({
            kind: GridCellKind.Custom,
            allowOverlay: false,
            copyData: "",
            data: {
                kind: "test",
                pasted: "pasteVal",
            },
        });
    });
});
