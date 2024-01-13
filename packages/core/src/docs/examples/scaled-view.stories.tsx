import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Scaled view"
                    description={<Description>The data editor supports being scaled.</Description>}
                    scale="0.5">
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ScaledView: React.VFC = () => {
    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowMarkers="both"
            rows={500}
            onColumnResize={onColumnResize}
        />
    );
};
