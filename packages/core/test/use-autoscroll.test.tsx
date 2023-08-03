import { renderHook } from "@testing-library/react-hooks";
import { useAutoscroll } from "../src/data-editor/use-autoscroll";

describe("use-auto-scroll", () => {
    // beforeEach(() => {
    //     jest.spyOn(window, "requestAnimationFrame").mockImplementation(cb => window.setTimeout(cb, 16));
    // });

    // afterEach(() => {
    //     (window.requestAnimationFrame as any).mockRestore();
    // });

    it("No scroll test", async () => {
        const scrollBy = jest.fn();
        jest.useFakeTimers();
        renderHook(() =>
            useAutoscroll(
                [0, 0],
                {
                    current: {
                        scrollBy,
                    },
                } as any,
                false
            )
        );

        jest.advanceTimersByTime(100);
        expect(scrollBy).not.toBeCalled();
    });

    it("Scroll left", async () => {
        const scrollBy = jest.fn();
        jest.useFakeTimers();
        renderHook(() =>
            useAutoscroll(
                [-1, 0],
                {
                    current: {
                        scrollBy,
                    },
                } as any,
                false
            )
        );

        jest.runOnlyPendingTimers(); // the first one primes the pump
        jest.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBeLessThan(0);
        expect(yScroll).toBe(0);
    });

    it("Scroll right", async () => {
        const scrollBy = jest.fn();
        jest.useFakeTimers();
        renderHook(() =>
            useAutoscroll(
                [1, 0],
                {
                    current: {
                        scrollBy,
                    },
                } as any,
                false
            )
        );

        jest.runOnlyPendingTimers(); // the first one primes the pump
        jest.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBeGreaterThan(0);
        expect(yScroll).toBe(0);
    });

    it("Scroll down", async () => {
        const scrollBy = jest.fn();
        jest.useFakeTimers();
        renderHook(() =>
            useAutoscroll(
                [0, 1],
                {
                    current: {
                        scrollBy,
                    },
                } as any,
                false
            )
        );

        jest.runOnlyPendingTimers(); // the first one primes the pump
        jest.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBe(0);
        expect(yScroll).toBeGreaterThan(0);
    });

    it("Scroll up", async () => {
        const scrollBy = jest.fn();
        jest.useFakeTimers();
        renderHook(() =>
            useAutoscroll(
                [0, -1],
                {
                    current: {
                        scrollBy,
                    },
                } as any,
                false
            )
        );

        jest.runOnlyPendingTimers(); // the first one primes the pump
        jest.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBe(0);
        expect(yScroll).toBeLessThan(0);
    });
});
