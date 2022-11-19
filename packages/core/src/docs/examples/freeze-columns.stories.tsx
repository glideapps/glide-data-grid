import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

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

export const FreezeColumns: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="both"
            freezeColumns={1}
            getCellContent={getCellContent}
            columns={cols}
            verticalBorder={c => c > 0}
            rows={1000}
        />
    );
};
