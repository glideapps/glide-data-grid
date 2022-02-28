import { renderHook } from "@testing-library/react-hooks";
import { useAnimationQueue } from "./use-animation-queue";

const OG_RAF = window.requestAnimationFrame;
const OG_CAF = window.cancelAnimationFrame;

describe("use-cell-sizer", () => {
    beforeEach(() => {
        // Mock rAF with setTimeout. Not perfect by any means, but at least it mocks the asynchronicity.
        jest.useFakeTimers();

        window.requestAnimationFrame = f => {
            const timeoutID = setTimeout(() => {
                const timestamp = performance.now();
                f(timestamp);
            }, 0);
            return (timeoutID as unknown) as number;
        };

        window.cancelAnimationFrame = (rafID: number) => {
            clearTimeout(rafID);
        };
    });
    afterEach(() => {
        jest.useRealTimers();

        window.requestAnimationFrame = OG_RAF;
        window.cancelAnimationFrame = OG_CAF;
    });

    it("Draws when an item is enqueued", async () => {
        const draw = jest.fn();
        const { result } = renderHook(() => useAnimationQueue(draw));

        result.current([1, 2]);
        result.current([2, 3]);
        result.current([3, 4]);

        jest.runAllTimers();

        expect(draw).toHaveBeenCalledWith([
            [1, 2],
            [2, 3],
            [3, 4],
        ]);
    });
});
