import * as React from "react";

import { StoryFn, StoryContext } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";
import GridScroller from "./scrolling-data-grid";
import { styled } from "../common/styles";
import { CompactSelection, GridCell, GridCellKind, Rectangle, Item } from "../data-grid/data-grid-types";

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
    title: "Subcomponents/ScrollingDataGrid",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <div>
                <BuilderThemeWrapper width={1500} height={1000} context={context}>
                    <InnerContainer>{fn()}</InnerContainer>
                </BuilderThemeWrapper>
            </div>
        ),
    ],
};

export function Simplenotest() {
    const [x, setX] = React.useState<number>(0);
    const [y, setY] = React.useState<number>(0);
    const [translateX, setTx] = React.useState<number | undefined>(0);
    const [translateY, setTy] = React.useState<number | undefined>(0);

    const onVisibleRegionChanged = React.useCallback((range: Rectangle, tx?: number, ty?: number) => {
        setX(range.x);
        setY(range.y);
        setTx(tx);
        setTy(ty);
    }, []);

    const columns = React.useMemo(() => {
        let j = 0;
        return ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"].map(t => ({
            title: t,
            width: 122 + (j += 50),
        }));
    }, []);

    const getCellContent = React.useCallback(
        ([col, row]: Item): GridCell => ({
            kind: GridCellKind.Text,
            displayData: `${col},${row} Testing things that are way too long`,
            data: `${col},${row} Testing things that are way too long`,
            allowOverlay: true,
        }),
        []
    );

    return (
        <GridScroller
            onMouseMove={() => undefined}
            rows={10000}
            enableGroups={false}
            clientSize={[1000, 1000]}
            cellXOffset={x}
            cellYOffset={y}
            minColumnWidth={50}
            isFocused={true}
            isFilling={false}
            maxColumnWidth={500}
            accessibilityHeight={50}
            translateX={translateX}
            translateY={translateY}
            lockColumns={0}
            selection={{
                current: undefined,
                rows: CompactSelection.empty(),
                columns: CompactSelection.empty(),
            }}
            firstColAccessible={true}
            groupHeaderHeight={34}
            headerHeight={44}
            lastRowSticky={false}
            rowHeight={34}
            onVisibleRegionChanged={onVisibleRegionChanged}
            columns={columns}
            getCellContent={getCellContent}
            freezeColumns={0}
            verticalBorder={() => true}
            smoothScrollX={true}
            smoothScrollY={true}
        />
    );
}
