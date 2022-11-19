import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Editable Grid"
                    description={
                        <Description>
                            Data grid supports overlay editors for changing values. There are bespoke editors for
                            numbers, strings, images, booleans, markdown, and uri.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const SmallEditableGrid = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(6, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            rowMarkers="both"
            columns={cols}
            rows={20}
            onCellEdited={setCellValue}
        />
    );
};
