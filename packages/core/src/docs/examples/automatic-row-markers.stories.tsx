import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    KeyName,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

export const AutomaticRowMarkers: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    const dataEditor = (
        <DataEditor
            {...defaultProps}
            rowMarkers={"checkbox-visible"}
            getCellContent={getCellContent}
            columns={cols}
            rows={1000}
        />
    );

    return (
        <BeautifulWrapper
            title="Automatic Row Markers"
            description={
                <>
                    <Description>
                        You can enable row markers with rich selection behavior using the{" "}
                        <PropName>rowMarkers</PropName> prop.
                    </Description>
                    <MoreInfo>
                        Use <KeyName>⇧</KeyName> + click to make range selections, and <KeyName>Ctrl</KeyName> (
                        <KeyName>⌘</KeyName> on Mac) + click to add/remove individual rows.
                    </MoreInfo>
                </>
            }>
            {dataEditor}
        </BeautifulWrapper>
    );
};
