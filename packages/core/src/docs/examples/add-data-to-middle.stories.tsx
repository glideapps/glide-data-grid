import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    useMockDataGenerator,
    KeyName,
    defaultProps,
    clearCell,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Add data to middle"
                    description={
                        <>
                            <Description>
                                You can return a different location to have the new row append take place.
                            </Description>
                            <MoreInfo>
                                Note that <KeyName>insertIndex</KeyName> is zero-based while the number column on the
                                left side of the grid is one-based, so inserting at index &quot;4&quot; creates a new
                                row at &quot;5&quot;
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface AddDataToMiddleProps {
    insertIndex: number;
}
export const AddDataToMiddle: React.FC<AddDataToMiddleProps> = p => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const index = p.insertIndex;
    const onRowAppended = React.useCallback(async () => {
        // shift rows below index down
        for (let y = numRows; y > index; y--) {
            for (let x = 0; x < 6; x++) {
                setCellValueRaw([x, y], getCellContent([x, y - 1]));
            }
        }
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, index]);
            setCellValueRaw([c, index], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
        return index;
    }, [getCellContent, numRows, setCellValueRaw, index]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowMarkers={"both"}
            onCellEdited={setCellValue}
            trailingRowOptions={{
                hint: "New row...",
                sticky: true,
                tint: true,
            }}
            rows={numRows}
            onRowAppended={onRowAppended}
        />
    );
};
(AddDataToMiddle as any).args = {
    insertIndex: 10,
};
(AddDataToMiddle as any).argTypes = {
    insertIndex: {
        control: {
            type: "range",
            min: 1,
            max: 48,
        },
    },
};
