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
import { usePathMapper } from "../../index.js";

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

    const [rowGrouping, setRowGrouping] = React.useState(() => ({
        groups: [
            {
                headerIndex: 0,
                isCollapsed: false,
            },
            {
                headerIndex: 10,
                isCollapsed: true,
            },
            {
                headerIndex: 20,
                isCollapsed: false,
            },
        ],
        height: 32,
    }));

    const pathMapper = usePathMapper(rowGrouping, rows);

    const onCellClicked = React.useCallback(
        (item: Item) => {
            const { path } = pathMapper(item[1]);

            if (item[0] === 0 && path[1] === -1) {
                const groupIndex = path[0];
                setRowGrouping(prev => {
                    const groups = [...prev.groups];
                    groups[groupIndex] = {
                        ...groups[groupIndex],
                        isCollapsed: !groups[groupIndex].isCollapsed,
                    };
                    return {
                        ...prev,
                        groups,
                    };
                });
            }
        },
        [pathMapper]
    );

    const getCellContentMangled = React.useCallback<DataEditorAllProps["getCellContent"]>(
        item => {
            const { path, sourceRow } = pathMapper(item[1]);
            if (item[0] === 0) {
                return {
                    kind: GridCellKind.Text,
                    data: `Row ${JSON.stringify(path)}`,
                    displayData: `Row ${JSON.stringify(path)}`,
                    allowOverlay: false,
                };
            } else if (path[1] === -1) {
                return {
                    kind: GridCellKind.Loading,
                    allowOverlay: false,
                    span: [1, cols.length - 1],
                };
            }

            return getCellContent([item[0], sourceRow]);
        },
        [cols.length, getCellContent, pathMapper]
    );

    return (
        <DataEditor
            {...defaultProps}
            rowGrouping={rowGrouping}
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
