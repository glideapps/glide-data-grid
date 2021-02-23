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
    const [tx, setTx] = React.useState<number | undefined>(0);
    const [ty, setTy] = React.useState<number | undefined>(0);

    const onVisibleRegionChanged = React.useCallback((range: Rectangle, tx?: number, ty?: number) => {
        setX(range.x);
        setY(range.y);
        setTx(tx);
        setTy(ty);
    }, []);

    return (
        <GridScroller
            rows={10000}
            cellXOffset={x}
            cellYOffset={y}
            translateX={tx}
            translateY={ty}
            headerHeight={44}
            allowResize={true}
            rowHeight={34}
            onVisibleRegionChanged={onVisibleRegionChanged}
            columns={["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"].map(t => ({
                title: t,
                width: 122 + (j += 50),
            }))}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                displayData: `${col},${row} Testing things that are way too long`,
                data: `${col},${row} Testing things that are way too long`,
                allowOverlay: true,
            })}
            firstColSticky={false}
            smoothScrollX={false}
            smoothScrollY={false}
        />
    );
}
