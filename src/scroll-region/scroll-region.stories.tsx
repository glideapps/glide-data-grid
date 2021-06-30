import * as React from "react";

import { StoryFn, StoryContext } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";
import ScrollRegion from "./scroll-region";

export default {
    title: "Designer/DateViewer/ScrollRegion",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <div>
                <BuilderThemeWrapper width={600} height={0} context={context}>
                    {fn()}
                </BuilderThemeWrapper>
            </div>
        ),
    ],
};

export function Simplenotest() {
    return (
        <ScrollRegion
            scrollWidth={1000}
            scrollHeight={5500}
            draggable={true}
            update={() => undefined}
            style={{
                width: "100%",
                height: "500px",
            }}>
            test
        </ScrollRegion>
    );
}
