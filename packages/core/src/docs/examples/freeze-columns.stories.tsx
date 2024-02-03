import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Freeze columns"
                    description={
                        <Description>
                            Columns at the start of your grid can be frozen in place by settings{" "}
                            <PropName>freezeColumns</PropName> to a number greater than 0.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const FreezeColumns: React.VFC<any> = (p: { freezeColumns: number }) => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="both"
            freezeColumns={p.freezeColumns}
            getCellContent={getCellContent}
            columns={cols}
            verticalBorder={false}
            rows={1000}
        />
    );
};
(FreezeColumns as any).argTypes = {
    freezeColumns: {
        control: {
            type: "range",
            min: 0,
            max: 10,
        },
    },
};
(FreezeColumns as any).args = {
    freezeColumns: 1,
};
