import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    KeyName,
    defaultProps,
} from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Multi select columns"
                    description={
                        <>
                            <Description>
                                You can select multiple columns by using the <PropName>selectedColumns</PropName> and{" "}
                                <PropName>onSelectedColumnsChange</PropName> props
                            </Description>
                            <MoreInfo>
                                Here you can multi select columns by using <KeyName>Ctrl</KeyName> (on Windows) or{" "}
                                <KeyName>⌘</KeyName> (on Mac)
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const MultiSelectColumns: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    return (
        <DataEditor {...defaultProps} getCellContent={getCellContent} rowMarkers="both" columns={cols} rows={100_000} />
    );
};
