import { render } from "@testing-library/react";
import * as React from "react";
import ClickOutsideContainer from "./click-outside-container";
import userEvent from "@testing-library/user-event";

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
});
