import React from "react";
import { DataEditorAll as DataEditor, type DataEditorAllProps } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { GridCellKind, type Item } from "../../internal/data-grid/data-grid-types.js";
import { type RowGroupingOptions } from "../../data-editor/row-grouping.js";
import { useRowGrouping } from "../../data-editor/row-grouping-api.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Row Grouping"
                    description={
                        <Description>
                            Columns at the start of your grid can be frozen in place by settings{" "}
                            <PropName>freezeColumns</PropName> to a number greater than 0.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const RowGrouping: React.VFC<any> = (p: { freezeColumns: number }) => {
    const { cols, getCellContent } = useMockDataGenerator(100);
    const rows = 1000;

    const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
        groups: [
            {
                headerIndex: 0,
                isCollapsed: false,
            },
            {
                headerIndex: 10,
                isCollapsed: true,
                subGroups: [
                    {
                        headerIndex: 15,
                        isCollapsed: false,
                    },
                    {
                        headerIndex: 20,
                        isCollapsed: false,
                    },
                ],
            },
            {
                headerIndex: 30,
                isCollapsed: false,
            },
        ],
        height: 55,
    }));

    const { mapper, getRowGroupingForPath, updateRowGroupingByPath } = useRowGrouping(rowGrouping, rows);

    const onCellClicked = React.useCallback(
        (item: Item) => {
            const { path, isGroupHeader } = mapper(item);

            if (isGroupHeader) {
                const group = getRowGroupingForPath(rowGrouping.groups, path);

                setRowGrouping(prev => {
                    const result: RowGroupingOptions = {
                        ...prev,
                        groups: updateRowGroupingByPath(prev.groups, path, { isCollapsed: !group.isCollapsed }),
                    };

                    return result;
                });
            }
        },
        [getRowGroupingForPath, mapper, rowGrouping.groups, updateRowGroupingByPath]
    );

    const getCellContentMangled = React.useCallback<DataEditorAllProps["getCellContent"]>(
        item => {
            const { path, originalIndex, isGroupHeader } = mapper(item);
            if (item[0] === 0) {
                return {
                    kind: GridCellKind.Text,
                    data: `Row ${JSON.stringify(path)}`,
                    displayData: `Row ${JSON.stringify(path)}`,
                    allowOverlay: false,
                };
            } else if (isGroupHeader) {
                return {
                    kind: GridCellKind.Loading,
                    allowOverlay: false,
                    span: [1, cols.length - 1],
                };
            }

            return getCellContent([item[0], originalIndex]);
        },
        [cols.length, getCellContent, mapper]
    );

    return (
        <DataEditor
            {...defaultProps}
            rowGrouping={rowGrouping}
            height="100%"
            rowMarkers="both"
            freezeColumns={p.freezeColumns}
            onCellClicked={onCellClicked}
            getCellContent={getCellContentMangled}
            columns={cols}
            verticalBorder={false}
            rows={rows}
        />
    );
};
