import React from "react";
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
                    title="Freeze columns"
                    description={
                        <Description>
                            Columns at the start of your grid can be frozen in place by settings{" "}
                            <PropName>freezeColumns</PropName> to a number greater than 0. Cells are editable - try
                            clicking on them!
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const FreezeColumns: React.FC<{ freezeColumns: number }> = p => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(100, false);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="both"
            freezeColumns={p.freezeColumns}
            getCellContent={getCellContent}
            columns={cols}
            verticalBorder={false}
            rows={1000}
            onCellEdited={setCellValue}
        />
    );
};
(FreezeColumns as any).argTypes = {
    freezeColumns: {
        control: {
            type: "range",
            min: 0,
            max: 10,
        },
    },
};
(FreezeColumns as any).args = {
    freezeColumns: 1,
};

export const EditableFreezeColumns: React.FC<{ freezeColumns: number }> = p => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(100, false);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="both"
            freezeColumns={p.freezeColumns}
            getCellContent={getCellContent}
            columns={cols}
            verticalBorder={false}
            rows={1000}
            onCellEdited={setCellValue}
        />
    );
};
(EditableFreezeColumns as any).argTypes = {
    freezeColumns: {
        control: {
            type: "range",
            min: 0,
            max: 10,
        },
    },
};
(EditableFreezeColumns as any).args = {
    freezeColumns: 2,
};
