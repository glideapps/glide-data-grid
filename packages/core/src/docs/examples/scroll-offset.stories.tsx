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
import _ from "lodash";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Scroll Offset"
                    description={
                        <Description>
                            The <PropName>rowGrouping</PropName> prop can be used to group and even fold rows.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ScrollOffset: React.VFC<any> = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);
    const rows = 1000;

    return (
        <DataEditor
            {...defaultProps}
            height="100%"
            rowMarkers="both"
            scrollOffsetY={400}
            getCellContent={getCellContent}
            columns={cols}
            // verticalBorder={false}
            rows={rows}
        />
    );
};
