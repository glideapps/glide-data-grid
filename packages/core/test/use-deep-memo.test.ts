import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useDeepMemo } from "../src/common/utils.js";
import { expect, describe, it, afterEach } from "vitest";

describe("useDeepMemo", () => {
    afterEach(cleanup);

    it("returns the initial value", () => {
        const initialValue = { a: 1 };
        const { result } = renderHook(() => useDeepMemo(initialValue));
        expect(result.current).toEqual(initialValue);
    });

    it("updates the value on deep change", () => {
        const initialValue = { a: 1 };
        const changedValue = { a: 2 };
        const { result, rerender } = renderHook(({ value }) => useDeepMemo(value), {
            initialProps: { value: initialValue },
        });

        expect(result.current).toEqual(initialValue);

        // Change the value deeply
        rerender({ value: changedValue });
        expect(result.current).toEqual(changedValue);
    });

    it("does not update the value on shallow/no change", () => {
        const initialValue = { a: 1 };
        const sameValue = { a: 1 };
        const { result, rerender } = renderHook(({ value }) => useDeepMemo(value), {
            initialProps: { value: initialValue },
        });

        expect(result.current).toEqual(initialValue);

        // Re-render with the same value (shallow change)
        rerender({ value: sameValue });
        expect(result.current).toEqual(initialValue);
    });
});
