import * as React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDebouncedMemo } from "../src/common/utils.js";

// Issue #1198: under React.StrictMode the mount effect runs, cleans up and runs again.
// The cleanup set mountedRef to false and nothing set it back, so the debounced value
// never updated and the accessibility tree never rendered.

const Probe: React.FC<{ readonly width: number }> = ({ width }) => {
    const value = useDebouncedMemo(() => width, [width], 50);
    return <div data-testid="probe">{value}</div>;
};

describe("useDebouncedMemo", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
    });

    test("updates after the debounce under StrictMode", () => {
        const { getByTestId, rerender } = render(
            <React.StrictMode>
                <Probe width={0} />
            </React.StrictMode>
        );
        rerender(
            <React.StrictMode>
                <Probe width={842} />
            </React.StrictMode>
        );
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(getByTestId("probe").textContent).toBe("842");
    });

    test("updates after the debounce without StrictMode", () => {
        const { getByTestId, rerender } = render(<Probe width={0} />);
        rerender(<Probe width={842} />);
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(getByTestId("probe").textContent).toBe("842");
    });

    test("does not update after unmount", () => {
        const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
        const { rerender, unmount } = render(<Probe width={0} />);
        rerender(<Probe width={842} />);
        unmount();
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(errors).not.toHaveBeenCalled();
        errors.mockRestore();
    });
});
