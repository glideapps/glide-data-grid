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
                    title="One Hundred Thousand Columns"
                    description={
                        <Description>
                            Data grid supports way more columns than you will ever need. Also this is rendering 10
                            million cells but that&apos;s not important.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const OneHundredThousandCols: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100_000);

    return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />;
};
