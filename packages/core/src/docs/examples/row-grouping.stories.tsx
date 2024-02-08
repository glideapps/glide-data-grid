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
import _ from "lodash";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Row Grouping"
                    description={
                        <Description>
                            The <PropName>rowGrouping</PropName> prop can be used to group and even fold rows.
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
        navigationBehavior: "block",
        selectionBehavior: "block-spanning",
        themeOverride: {
            bgCell: "rgba(0, 100, 255, 0.1)",
        },
    }));

    const { mapper, getRowGroupingForPath, updateRowGroupingByPath } = useRowGrouping(rowGrouping, rows);

    const onCellClicked = React.useCallback(
        (item: Item) => {
            const { path, isGroupHeader } = mapper(item);

            if (isGroupHeader && item[0] === 0) {
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
            const { path, isGroupHeader, originalIndex } = mapper(item);
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
                    // span: [1, cols.length - 1],
                };
            }

            return getCellContent(originalIndex);
        },
        [getCellContent, mapper]
    );

    return (
        <DataEditor
            {...defaultProps}
            rowGrouping={rowGrouping}
            height="100%"
            rowMarkers="both"
            freezeColumns={p.freezeColumns}
            getRowThemeOverride={(_row, groupRow, _contentRow) => {
                if (groupRow % 2 === 0) {
                    return {
                        bgCell: "rgba(0, 0, 0, 0.1)",
                    };
                }
                return undefined;
            }}
            onCellClicked={onCellClicked}
            getCellContent={getCellContentMangled}
            columns={cols}
            // verticalBorder={false}
            rows={rows}
        />
    );
};
