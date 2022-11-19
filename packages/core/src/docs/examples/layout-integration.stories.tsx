import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import { Description, useMockDataGenerator, defaultProps, BeautifulStyle } from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulStyle>
                    <h1>Layout Integration</h1>
                    <Description>Trying the grid in different situations</Description>
                    <Story />
                </BeautifulStyle>
            </SimpleThemeWrapper>
        ),
    ],
};

export const LayoutIntegration: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    return (
        <>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={10}
                rowMarkers="both"
                height={200}
            />
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers="both" />
            <div style={{ display: "flex", height: "300px" }}>
                <DataEditor
                    {...defaultProps}
                    getCellContent={getCellContent}
                    columns={cols}
                    rows={10}
                    rowMarkers="both"
                />
                <div style={{ flexShrink: 0 }}>This is some text what happens here?</div>
            </div>
        </>
    );
};
