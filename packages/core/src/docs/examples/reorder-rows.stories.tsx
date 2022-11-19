import { range } from "lodash";
import React from "react";
import { DataEditor, DataEditorProps } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
} from "../../data-editor/stories/utils";
import { type GridColumn, GridCellKind } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                        <BeautifulWrapper
            title="Reorder Rows"
            description={
                <>
                    <Description>
                        Rows can be re-arranged by using the <PropName>onRowMoved</PropName> callback. When set the
                        first row can be used to drag and drop.
                    </Description>
                </>
            }>

                <Story />
            </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ReorderRows: React.VFC = () => {
    const cols = React.useMemo<GridColumn[]>(
        () => [
            {
                title: "Col A",
                width: 150,
            },
            {
                title: "Col B",
                width: 150,
            },
        ],
        []
    );

    const [rowData, setRowData] = React.useState(() => {
        return range(0, 50).map(x => [`A: ${x}`, `B: ${x}`]);
    });

    const getCellContent = React.useCallback<DataEditorProps["getCellContent"]>(
        ([col, row]) => {
            return {
                kind: GridCellKind.Text,
                allowOverlay: false,
                data: rowData[row][col],
                displayData: rowData[row][col],
            };
        },
        [rowData]
    );

    const reorderRows = React.useCallback((from: number, to: number) => {
        setRowData(cv => {
            const d = [...cv];
            const removed = d.splice(from, 1);
            d.splice(to, 0, ...removed);
            return d;
        });
    }, []);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers={"both"}
            onRowMoved={reorderRows}
            getCellContent={getCellContent}
            columns={cols}
            rows={50}
        />
    );
};
