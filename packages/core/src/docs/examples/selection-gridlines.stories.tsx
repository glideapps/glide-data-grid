import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
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
                    title="Column & Row Selection Grid Lines"
                    description={
                        <>
                            <Description>
                                Demonstrates the <code>columnSelectionGridLines</code> and
                                <code>rowSelectionGridLines</code> props which control whether accent-coloured grid
                                lines are drawn around selected columns and rows.
                            </Description>
                            <MoreInfo>
                                Use the story controls to toggle the behaviours on and off.
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface SelectionGridLineProps {
    columnSelectionGridLines: boolean;
    rowSelectionGridLines: boolean;
}

export const SelectionGridLine: React.FC<SelectionGridLineProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(10);
    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rows={1000}
            columnSelectionGridLines={p.columnSelectionGridLines}
            rowSelectionGridLines={p.rowSelectionGridLines}
            rowMarkers="both"
        />
    );
};

(SelectionGridLine as any).args = {
    columnSelectionGridLines: true,
    rowSelectionGridLines: true,
};

(SelectionGridLine as any).argTypes = {
    columnSelectionGridLines: {
        control: {
            type: "boolean",
        },
    },
    rowSelectionGridLines: {
        control: {
            type: "boolean",
        },
    },
}; 