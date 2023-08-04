import { BeautifulWrapper, Description, useGroupMockDataGenerator, useMockDataGenerator } from "./utils";
import React from "react";
import { DataEditor, DataEditorProps } from "../data-editor";
import { SimpleThemeWrapper } from "../../stories/story-utils";
import { useGroups } from "../use-groups";
import type { CellRenderer } from "../../data-grid/cells/cell-types";
import {
    CellArray,
    CustomCell,
    CustomRow,
    GridCell,
    GridCellKind,
    GridRowKind,
    Rectangle,
} from "../../data-grid/data-grid-types";
import { getMiddleCenterBias } from "../../data-grid/data-grid-lib";
import { useMemo } from "@storybook/addons";

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    getCellsForSelection: true,
    rowMarkers: "none",
    width: "100%",
};

const ADD_ROW = 'AddRow'
type AddRowCell = CustomCell<{kind: typeof ADD_ROW}>;

const addRowRenderer: CellRenderer<AddRowCell> = {
    kind: GridCellKind.Custom,
    isMatch(cell: CustomCell): cell is AddRowCell {
        return (cell.data as AddRowCell['data']).kind === "AddRow";
    },
    draw: (args) => {
        const {ctx , rect, theme} = args;
        const drawX = rect.x + theme.cellHorizontalPadding
        ctx.fillStyle = theme.textDark;
        ctx.fillText(
            "+ New Campaign",
            drawX+ 10,
            rect.y + rect.height / 2 + getMiddleCenterBias(ctx, `${theme.headerFontStyle} ${theme.fontFamily}`)
        );
    }
}
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

export const RowGroups: React.VFC = () => {
    const { setCellValue, getCellContent, cols } = useMockDataGenerator(20, false, false);
    const { groups, toggleGroup } = useGroupMockDataGenerator(10, 30);


    const colsWithWidths = React.useMemo(() => {
        const c = [...cols];
        c[0] = {
            ...c[0],
            width: 250,
        };
        return c;
    }, [cols]);

    const addRecordRow: CustomRow = useMemo(()=> ({
        kind: GridRowKind.Custom,
        data: {
            kind: ADD_ROW,
        },
        themeOverride: {
            bgCell: '#F7F7F8'
        },
    }),[])

    const { getRowDetails, onRowDetailsUpdated, rowsCount, getCellLocation } = useGroups(groups, toggleGroup, addRecordRow);

    const mangledGetCellContent = React.useCallback(
        cellLocation => {
            return getCellContent(getCellLocation(cellLocation));
        },
        [getCellContent, getCellLocation]
    );
    const mangledEditCell = React.useCallback(
        (cellLocation, cell) => setCellValue(getCellLocation(cellLocation), cell),
        [getCellLocation, setCellValue]
    );

    const getCellsForSelection = React.useCallback(
        (selection: Rectangle): CellArray => {
            const result: GridCell[][] = [];
            for (let y = selection.y; y < selection.y + selection.height; y++) {
                const rowDetails = getRowDetails(y)
                if(rowDetails.kind !== GridRowKind.GroupContent) {
                    continue;
                }
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.x + selection.width; x++) {
                    row.push(mangledGetCellContent([x,y]));
                }



                result.push(row);
            }
            return result;
        },
        [getCellContent, getCellLocation]
    );

    return (
        <BeautifulWrapper
            title="Row Grouping"
            description={<Description>Row grouping description goes here</Description>}>
            <DataEditor
                {...defaultProps}
                getCellContent={mangledGetCellContent}
                columns={colsWithWidths}
                rows={rowsCount}
                verticalBorder={false}
                rowMarkers="both"
                onCellEdited={mangledEditCell}
                getCellsForSelection={getCellsForSelection}
                onRowDetailsUpdated={onRowDetailsUpdated}
                getRowDetails={getRowDetails}
                customRenderers={[addRowRenderer]}
                freezeColumns={1}
            />
        </BeautifulWrapper>
    );
};
(RowGroups as any).parameters = {
    options: {
        showPanel: false,
    },
};
