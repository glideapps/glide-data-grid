import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils";
import { GridCellKind } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";
import range from "lodash/range.js";
import { faker } from "@faker-js/faker";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Wrapping Text"
                    description={
                        <Description>
                            Text cells can have wrapping text by setting the <PropName>allowWrapping</PropName> prop to
                            true.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const WrappingText: React.VFC<{
    alignment: "left" | "center" | "right";
    length: number;
    hyperWrapping: boolean;
}> = p => {
    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(6);

    const suffix = React.useMemo(() => {
        return range(0, 100).map(() => faker.lorem.sentence(p.length));
    }, [p.length]);

    const mangledGetCellContent = React.useCallback<typeof getCellContent>(
        i => {
            const [col, row] = i;

            if (col === 0) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: true,
                    displayData: `${row},\n${suffix[row % suffix.length]}`,
                    data: `${row}, \n${suffix}`,
                    allowWrapping: true,
                    contentAlign: p.alignment,
                };
            }
            return getCellContent(i);
        },
        [getCellContent, p.alignment, suffix]
    );

    return (
        <DataEditor
            {...defaultProps}
            rowHeight={80}
            getCellContent={mangledGetCellContent}
            columns={cols}
            rows={1000}
            onColumnResize={onColumnResize}
            experimental={{
                hyperWrapping: p.hyperWrapping,
            }}
        />
    );
};
(WrappingText as any).args = {
    alignment: "left",
    length: 20,
    hyperWrapping: false,
};
(WrappingText as any).argTypes = {
    alignment: {
        control: { type: "select", options: ["left", "center", "right"] },
    },
    length: {
        control: {
            type: "range",
            min: 2,
            max: 200,
        },
    },
};
