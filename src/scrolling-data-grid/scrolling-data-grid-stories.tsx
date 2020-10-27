import * as React from "react";

import { withKnobs } from "@storybook/addon-knobs";
import { StoryFn, StoryContext } from "@storybook/addons";
import { StoryFnReactReturnType } from "@storybook/react/dist/client/preview/types";
import { BuilderThemeWrapper } from "../stories/story-utils";
import GridScroller from "./scrolling-data-grid";
import { styled } from "../common/styles";
import { GridCellKind, Rectangle } from "../data-grid/data-grid-types";

const InnerContainer = styled.div`
  width: 100%;
  height: 100px;

  > * {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export default {
  title: "Designer/DateViewer/ScrollingDataGrid",

  decorators: [
    withKnobs({
      escapeHTML: false,
    }),
    (fn: StoryFn<StoryFnReactReturnType>, context: StoryContext) => (
      <div>
        <BuilderThemeWrapper width={1500} height={1000} context={context}>
          <InnerContainer>{fn()}</InnerContainer>
        </BuilderThemeWrapper>
      </div>
    ),
  ],
};

export function Simplenotest() {
  let j = 0;

  const [x, setX] = React.useState<number>(0);
  const [y, setY] = React.useState<number>(0);

  const onVisibleRowsChanged = React.useCallback((range: Rectangle) => {
    setX(range.x);
    setY(range.y);
  }, []);

  return (
    <GridScroller
      rows={10000}
      cellXOffset={x}
      cellYOffset={y}
      headerHeight={44}
      allowResize={true}
      rowHeight={34}
      onVisibleRowsChanged={onVisibleRowsChanged}
      columns={[
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
      ].map((t) => ({
        title: t,
        width: 122 + (j += 10),
      }))}
      getCellContent={([col, row]) => ({
        kind: GridCellKind.Text,
        data: `${col},${row} Testing things that are way too long`,
        editData: `${col},${row} Testing things that are way too long`,
        allowOverlay: true,
      })}
      firstColSticky={false}
    />
  );
}
