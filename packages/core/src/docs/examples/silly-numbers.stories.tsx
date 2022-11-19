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
                    title="100 Million Rows"
                    description={
                        <Description>
                            100 million rows is silly. Once we cross about 33 million pixels in height we can no longer
                            trust the browser to scroll accurately.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const SillyNumbers: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowHeight={31}
            rows={100_000_000}
            rowMarkers="number"
        />
    );
};
