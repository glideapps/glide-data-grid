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
                    title="Minimap"
                    description={
                        <Description>
                            A minimap can be enabled by setting the <PropName>showMinimap</PropName> property.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const Minimap: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            showMinimap={true}
            rows={3000}
            rowMarkers="both"
        />
    );
};
