import React from "react";
import { DataEditor, type DataEditorRef } from "../../data-editor/data-editor.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
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
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

export const AppendRowHandle: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const ref = React.useRef<DataEditorRef>(null);

    const onClick = React.useCallback(() => {
        void ref.current?.appendRow(3, false);
    }, [ref]);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    return (
        <BeautifulWrapper
            title="appendRow Ref"
            description={
                <>
                    <Description>
                        Adding data can also be triggered from outside of <PropName>DataEditor</PropName>
                    </Description>
                    <MoreInfo>
                        By calling <PropName>appendRow</PropName> on a <PropName>ref</PropName> to your grid, you can
                        trigger the append elsewhere, like this <KeyName onClick={onClick}>Append</KeyName> button
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                ref={ref}
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
        </BeautifulWrapper>
    );
};
