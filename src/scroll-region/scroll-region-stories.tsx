import * as React from "react";

import { withKnobs } from "@storybook/addon-knobs";
import { StoryFn, StoryContext } from "@storybook/addons";
import { StoryFnReactReturnType } from "@storybook/react/dist/client/preview/types";
import { BuilderThemeWrapper } from "../stories/story-utils";
import ScrollRegion from "./scroll-region";

export default {
  title: "Designer/DateViewer/ScrollRegion",

  decorators: [
    withKnobs({
      escapeHTML: false,
    }),
    (fn: StoryFn<StoryFnReactReturnType>, context: StoryContext) => (
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
      update={() => undefined}
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      test
    </ScrollRegion>
  );
}
