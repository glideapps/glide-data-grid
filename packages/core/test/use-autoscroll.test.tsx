import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useAutoscroll } from "../src/data-editor/use-autoscroll.js";
import { vi, expect, describe, it, afterEach } from "vitest";

describe("use-auto-scroll", () => {
    // beforeEach(() => {
    //     vi.spyOn(window, "requestAnimationFrame").mockImplementation(cb => window.setTimeout(cb, 16));
    // });

    afterEach(async () => {
        await cleanup();
    });

    it("No scroll test", async () => {
        const scrollBy = vi.fn();
        vi.useFakeTimers();
        renderHook(() =>
            useAutoscroll([0, 0], {
                current: {
                    scrollBy,
                },
            } as any)
        );

        vi.advanceTimersByTime(100);
        expect(scrollBy).not.toBeCalled();
    });

    it("Scroll left", async () => {
        const scrollBy = vi.fn();
        vi.useFakeTimers();
        renderHook(() =>
            useAutoscroll([-1, 0], {
                current: {
                    scrollBy,
                },
            } as any)
        );

        vi.runOnlyPendingTimers(); // the first one primes the pump
        vi.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBeLessThan(0);
        expect(yScroll).toBe(0);
    });

    it("Scroll right", async () => {
        const scrollBy = vi.fn();
        vi.useFakeTimers();
        renderHook(() =>
            useAutoscroll([1, 0], {
                current: {
                    scrollBy,
                },
            } as any)
        );

        vi.runOnlyPendingTimers(); // the first one primes the pump
        vi.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBeGreaterThan(0);
        expect(yScroll).toBe(0);
    });

    it("Scroll down", async () => {
        const scrollBy = vi.fn();
        vi.useFakeTimers();
        renderHook(() =>
            useAutoscroll([0, 1], {
                current: {
                    scrollBy,
                },
            } as any)
        );

        vi.runOnlyPendingTimers(); // the first one primes the pump
        vi.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBe(0);
        expect(yScroll).toBeGreaterThan(0);
    });

    it("Scroll up", async () => {
        const scrollBy = vi.fn();
        vi.useFakeTimers();
        renderHook(() =>
            useAutoscroll([0, -1], {
                current: {
                    scrollBy,
                },
            } as any)
        );

        vi.runOnlyPendingTimers(); // the first one primes the pump
        vi.runOnlyPendingTimers(); // the second one runs it
        expect(scrollBy).toHaveBeenCalledTimes(1);

        const [xScroll, yScroll] = scrollBy.mock.calls[0];
        expect(xScroll).toBe(0);
        expect(yScroll).toBeLessThan(0);
    });
});
