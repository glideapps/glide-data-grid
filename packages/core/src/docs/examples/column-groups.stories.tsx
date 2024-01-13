import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { GridColumnIcon } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Column Grouping"
                    description={
                        <Description>
                            Columns in the data grid may be grouped by setting their <PropName>group</PropName>{" "}
                            property.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ColumnGroups: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(20, true, true);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            onGroupHeaderRenamed={(x, y) => window.alert(`Please rename group ${x} to ${y}`)}
            columns={cols}
            rows={1000}
            getGroupDetails={g => ({
                name: g,
                icon: g === "" ? undefined : GridColumnIcon.HeaderCode,
            })}
            rowMarkers="both"
        />
    );
};
