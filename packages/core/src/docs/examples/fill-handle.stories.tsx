import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    defaultProps,
    clearCell,
} from "../../data-editor/stories/utils.js";
import { GridCellKind } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Fill handle"
                    description={
                        <>
                            <Description>Fill handles can be used to downfill data with the mouse.</Description>
                            <MoreInfo>
                                Just click and drag, the top row will be copied down. Enable using the{" "}
                                <PropName>fillHandle</PropName> prop.
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const FillHandle: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const getCellContentMangled = React.useCallback<typeof getCellContent>(
        i => {
            let val = getCellContent(i);
            if (i[0] === 1 && val.kind === GridCellKind.Text) {
                val = {
                    ...val,
                    readonly: true,
                };
            }

            return val;
        },
        [getCellContent]
    );

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContentMangled}
            columns={cols}
            rowMarkers={"both"}
            onPaste={true}
            fillHandle={true}
            keybindings={{ downFill: true, rightFill: true }}
            onCellEdited={setCellValue}
            trailingRowOptions={{
                sticky: true,
                tint: true,
                hint: "New row...",
            }}
            rows={numRows}
            onRowAppended={onRowAppended}
        />
    );
};
