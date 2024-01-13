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
                    title="Ten Million Cells"
                    description={<Description>Data grid supports over 10 million cells. Go nuts with it.</Description>}>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const TenMillionCells: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="number"
            getCellContent={getCellContent}
            columns={cols}
            rows={100_000}
        />
    );
};
