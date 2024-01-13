import { renderHook, act } from "@testing-library/react-hooks";
import useKineticScroll from "../src/internal/scrolling-data-grid/use-kinetic-scroll.js";
import { vi, expect, describe, it, afterEach, beforeEach } from "vitest";
import { fireEvent } from "@testing-library/react";

describe("useKineticScroll", () => {
    let targetScroller: { current: HTMLDivElement };
    let callback: () => void;

    beforeEach(() => {
        targetScroller = { current: document.createElement("div") };
        callback = vi.fn();

        vi.spyOn(targetScroller.current, "addEventListener");
        vi.spyOn(targetScroller.current, "removeEventListener");
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it("registers and unregisters event listeners based on isEnabled", () => {
        const { rerender } = renderHook(({ isEnabled }) => useKineticScroll(isEnabled, callback, targetScroller), {
            initialProps: { isEnabled: false },
        });

        expect(targetScroller.current.addEventListener).not.toHaveBeenCalled();
        expect(targetScroller.current.removeEventListener).not.toHaveBeenCalled();

        rerender({ isEnabled: true });

        expect(targetScroller.current.addEventListener).toHaveBeenCalledTimes(2);
        expect(targetScroller.current.removeEventListener).not.toHaveBeenCalled();

        rerender({ isEnabled: false });

        expect(targetScroller.current.removeEventListener).toHaveBeenCalledTimes(2);
    });

    it("handles scroll events and triggers callback", () => {
        renderHook(() => useKineticScroll(true, callback, targetScroller));

        act(() => {
            targetScroller.current.dispatchEvent(new Event("touchstart"));
            vi.advanceTimersByTime(1000);
            fireEvent.touchEnd(targetScroller.current, {
                touches: [],
            });
            vi.advanceTimersByTime(1000 / 120);
        });

        expect(callback).toHaveBeenCalled();
    });
});
