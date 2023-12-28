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
                    title="Add data"
                    description={
                        <>
                            <Description>Data can be added by clicking on the trailing row.</Description>
                            <MoreInfo>
                                Keyboard is also supported, just navigate past the last row and press{" "}
                                <KeyName>Enter</KeyName>
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const AddData: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        // our data source is a mock source that pre-fills data, so we are just clearing this here. You should not
        // need to do this.
        for (let c = 0; c < cols.length; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        // Tell the data grid there is another row
        setNumRows(cv => cv + 1);
    }, [cols.length, getCellContent, numRows, setCellValueRaw]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowGrouping={{
                height: 32,
                groups: [
                    {
                        headerIndex: 0,
                        isCollapsed: false,
                        subGroups: [
                            {
                                headerIndex: 1,
                                isCollapsed: false,
                                subGroups: [
                                    {
                                        headerIndex: 2,
                                        isCollapsed: true,
                                    },
                                    {
                                        headerIndex: 6,
                                        isCollapsed: false,
                                    },
                                ],
                            },
                            {
                                headerIndex: 10,
                                isCollapsed: false,
                            },
                        ],
                    },
                    {
                        headerIndex: 15,
                        isCollapsed: false,
                    },
                ],
            }}
            rowMarkers={"both"}
            onPaste={true} // we want to allow paste to just call onCellEdited
            onCellEdited={setCellValue} // Sets the mock cell content
            trailingRowOptions={{
                // How to get the trailing row to look right
                sticky: true,
                tint: true,
                hint: "New row...",
            }}
            rows={numRows}
            onRowAppended={onRowAppended}
        />
    );
};
