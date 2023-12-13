import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useRemAdjuster } from "../src/data-editor/use-rem-adjuster.js";
import { expect, describe, it, afterEach } from "vitest";

describe("useDataEditorDimensions", () => {
    afterEach(async () => {
        await cleanup();
    });

    it("should return default dimensions when no props are passed", () => {
        const { result } = renderHook(() =>
            useRemAdjuster({
                remSize: 16,
                groupHeaderHeight: 30,
                headerHeight: 30,
                rowHeight: 30,
                scaleToRem: false,
            })
        );
        expect(result.current).toEqual({
            rowHeight: 30,
            headerHeight: 30,
            groupHeaderHeight: 30,
            theme: undefined,
            overscrollX: undefined,
            overscrollY: undefined,
        });
    });

    it("should scale dimensions to rem units when scaleToRem is true", () => {
        const { result } = renderHook(() =>
            useRemAdjuster({
                remSize: 20,
                groupHeaderHeight: 30,
                headerHeight: 30,
                rowHeight: 30,
                scaleToRem: true,
            })
        );
        expect(result.current).toEqual({
            rowHeight: 37.5,
            headerHeight: 38,
            groupHeaderHeight: 38,
            theme: {
                headerIconSize: 22.5,
                cellHorizontalPadding: 10,
                cellVerticalPadding: 3.75,
            },
            overscrollX: 0,
            overscrollY: 0,
        });
    });

    it("should preserve the sticky property of the columns", () => {
        const { result } = renderHook(() =>
            useRemAdjuster({
                scaleToRem: true,
                remSize: 20,
                theme: {
                    bgCell: "red",
                },
                groupHeaderHeight: 30,
                headerHeight: 30,
                rowHeight: 30,
            })
        );
        expect(result.current.theme?.bgCell).toBe("red");
    });
});
