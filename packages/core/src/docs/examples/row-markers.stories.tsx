import React from "react";
import { type DataEditorProps } from "../../data-editor/data-editor.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Row markers"
                    description={
                        <>
                            <Description>
                                Row Markers can be controlled by setting the <PropName>rowMarkers</PropName> prop.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface RowMarkersProps {
    markers: DataEditorProps["rowMarkers"];
}

export const RowMarkers: React.VFC<RowMarkersProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(10, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            rowMarkers={p.markers}
            columns={cols}
            rows={400}
        />
    );
};
(RowMarkers as any).args = {
    markers: "both",
};
(RowMarkers as any).argTypes = {
    markers: {
        control: { type: "select" },
        options: ["both", "checkbox", "number", "none", "clickable-number"],
    },
};
