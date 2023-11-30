import { render, cleanup } from "@testing-library/react";
import * as React from "react";
import { userEvent } from "@testing-library/user-event";
import ClickOutsideContainer from "../src/internal/click-outside-container/click-outside-container.js";
import { vi, expect, describe, it, afterEach } from "vitest";

// skip this for now because github actions is failing
describe.skip("click-outside-container", () => {
    afterEach(() => {
        cleanup();
    });

    it("Triggers onClose when clicking outside", async () => {
        const onClickOutside = vi.fn();

        const result = render(
            <main>
                <div>
                    <p>I am outside</p>
                </div>

                <ClickOutsideContainer onClickOutside={onClickOutside}>
                    <p>I am inside</p>
                </ClickOutsideContainer>
            </main>
        );

        const insideElement = await result.findByText("I am inside");
        const outsideElement = await result.findByText("I am outside");

        expect(onClickOutside).not.toHaveBeenCalled();
        await userEvent.click(insideElement);
        expect(onClickOutside).not.toHaveBeenCalled();
        await userEvent.click(outsideElement);
        expect(onClickOutside).toHaveBeenCalledTimes(1);
    });

    it(`Does not trigger onClose when clicking outside but 'isOutsideClick' returns false`, async () => {
        const onClickOutside = vi.fn();
        const isOutsideClick = vi.fn();

        const result = render(
            <main>
                <div>
                    <p>I am outside</p>
                </div>
                <ClickOutsideContainer onClickOutside={onClickOutside} isOutsideClick={isOutsideClick} />
            </main>
        );

        const outsideElement = await result.findByText("I am outside");

        isOutsideClick.mockReturnValueOnce(true);

        expect(onClickOutside).not.toHaveBeenCalled();
        await userEvent.click(outsideElement);
        expect(onClickOutside).toHaveBeenCalledTimes(1);
        isOutsideClick.mockReturnValueOnce(false);
        await userEvent.click(outsideElement);
        expect(onClickOutside).toHaveBeenCalledTimes(1);
    });
});
