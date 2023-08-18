import { render } from "@testing-library/react";
import * as React from "react";
import userEvent from "@testing-library/user-event";
import ClickOutsideContainer from "../src/click-outside-container/click-outside-container";

describe("click-outside-container", () => {
    it("Triggers onClose when clicking outside", async () => {
        const onClickOutside = jest.fn();

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
        const onClickOutside = jest.fn();
        const isOutsideClick = jest.fn();

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
