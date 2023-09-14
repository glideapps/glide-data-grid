import { BeautifulWrapper, Description, useGroupMockDataGenerator, useMockDataGenerator } from "./utils";
import React from "react";
import { DataEditor, DataEditorProps } from "../data-editor";
import { SimpleThemeWrapper } from "../../stories/story-utils";

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    getCellsForSelection: true,
    rowMarkers: "none",
    width: "100%",
};

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
    const { groups, toggleGroup } = useGroupMockDataGenerator(100, 5);

    const colsWithWidths = React.useMemo(() => {
        const c = [...cols];
        c[0] = {
            ...c[0],
            width: 250,
        };
        return c;
    }, [cols]);

    const mangledGetCellContent = React.useCallback(
        cellLocation => {
            return getCellContent(cellLocation);
        },
        [getCellContent]
    );
    const mangledEditCell = React.useCallback(
        (cellLocation, cell) => setCellValue(cellLocation, cell),
        [setCellValue]
    );

    const onRowAppended = React.useCallback(
        async (row?: number, groupId?: string) => {
            console.log('append row', { row, groupId })
            return undefined
        }
    ,[])

    return (
        <BeautifulWrapper
            title="Row Grouping"
            description={<Description>Row grouping description goes here</Description>}>
            <DataEditor
                {...defaultProps}
                getCellContent={mangledGetCellContent}
                columns={colsWithWidths}
                rows={100}
                verticalBorder={false}
                rowMarkers="both"
                onCellEdited={mangledEditCell}
                groups={groups}
                onGroupToggle={toggleGroup}
                freezeColumns={1}
                onRowAppended={onRowAppended}
                trailingRowOptions={{
                    sticky: true,
                    tint: true,
                    hint: "New row...",
                    inEachGroup: true,
                }}
            />
        </BeautifulWrapper>
    );
};
(RowGroups as any).parameters = {
    options: {
        showPanel: false,
    },
};
