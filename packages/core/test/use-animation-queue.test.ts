import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useAnimationQueue } from "../src/internal/data-grid/use-animation-queue.js";
import { vi, expect, describe, it, beforeEach, afterEach } from "vitest";

// const OG_RAF = window.requestAnimationFrame;
// const OG_CAF = window.cancelAnimationFrame;

describe("use-cell-sizer", () => {
    beforeEach(() => {
        // Mock rAF with setTimeout. Not perfect by any means, but at least it mocks the asynchronicity.
        vi.useFakeTimers();

        // window.requestAnimationFrame = f => {
        //     const timeoutID = setTimeout(() => {
        //         const timestamp = performance.now();
        //         f(timestamp);
        //     }, 0);
        //     return timeoutID as unknown as number;
        // };

        // window.cancelAnimationFrame = (rafID: number) => {
        //     clearTimeout(rafID);
        // };
    });
    afterEach(async () => {
        vi.useRealTimers();

        await cleanup();

        // window.requestAnimationFrame = OG_RAF;
        // window.cancelAnimationFrame = OG_CAF;
    });

    it("Draws when an item is enqueued", async () => {
        const draw = vi.fn();
        const { result } = renderHook(() => useAnimationQueue(draw));

        result.current([1, 2]);
        result.current([2, 3]);
        result.current([3, 4]);

        vi.runAllTimers();

        expect(draw).toHaveBeenCalledWith([
            [1, 2],
            [2, 3],
            [3, 4],
        ]);
    });
});
