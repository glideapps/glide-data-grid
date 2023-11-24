import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
    ColumnAddButton,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="New column button"
                    description={
                        <Description>
                            A new column button can be created using the <PropName>rightElement</PropName>.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const NewColumnButton: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(10, true);

    const columns = React.useMemo(() => cols.map(c => ({ ...c, grow: 1 })), [cols]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={columns}
            rightElement={
                <ColumnAddButton>
                    <button onClick={() => window.alert("Add a column!")}>+</button>
                </ColumnAddButton>
            }
            rightElementProps={{
                fill: false,
                sticky: false,
            }}
            rows={3000}
            rowMarkers="both"
        />
    );
};
