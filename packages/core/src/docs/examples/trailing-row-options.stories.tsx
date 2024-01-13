import React from "react";
import type { Theme } from "../../common/styles.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
    clearCell,
} from "../../data-editor/stories/utils.js";
import { GridColumnIcon, type GridColumn } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Trailing row options"
                    description={
                        <Description>
                            You can customize the trailing row in each column by setting a{" "}
                            <PropName>trailingRowOptions</PropName> in your columns.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

const trailingRowOptionsColumnIndexesHint: Record<number, string> = {
    2: "Smol text",
    3: "Add",
    5: "New",
};

const trailingRowOptionsColumnIndexesIcon: Record<number, string> = {
    2: GridColumnIcon.HeaderArray,
    3: GridColumnIcon.HeaderEmoji,
    5: GridColumnIcon.HeaderNumber,
};

const trailingRowOptionsColumnIndexesTarget: Record<number, number> = {
    2: 0,
    3: 0,
    5: 0,
};

const trailingRowOptionsColumnIndexesDisabled: Record<number, boolean> = {
    3: true,
};

const trailingRowOptionsColumnIndexesTheme: Record<number, Partial<Theme>> = {
    2: {
        baseFontStyle: "10px",
    },
};

export const TrailingRowOptions: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    const columnsWithRowOptions: GridColumn[] = React.useMemo(() => {
        return cols.map((c, idx) => ({
            ...c,
            trailingRowOptions: {
                hint: trailingRowOptionsColumnIndexesHint[idx],
                addIcon: trailingRowOptionsColumnIndexesIcon[idx],
                targetColumn: trailingRowOptionsColumnIndexesTarget[idx],
                disabled: trailingRowOptionsColumnIndexesDisabled[idx],
                themeOverride: trailingRowOptionsColumnIndexesTheme[idx],
            },
        }));
    }, [cols]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={columnsWithRowOptions}
            rowMarkers={"both"}
            onCellEdited={setCellValue}
            trailingRowOptions={{
                tint: true,
                sticky: true,
            }}
            rows={numRows}
            onRowAppended={onRowAppended}
        />
    );
};
