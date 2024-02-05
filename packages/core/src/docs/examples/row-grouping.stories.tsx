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
import { GridCellKind } from "../../internal/data-grid/data-grid-types.js";

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

    const getCellContentMangled = React.useCallback<DataEditorAllProps["getCellContent"]>(
        (item, path) => {
            if (item[0] === 0) {
                return {
                    kind: GridCellKind.Text,
                    data: `Row ${JSON.stringify(path)}`,
                    displayData: `Row ${JSON.stringify(path)}`,
                    allowOverlay: false,
                };
            }
            return getCellContent(item);
        },
        [getCellContent]
    );

    return (
        <DataEditor
            {...defaultProps}
            rowGrouping={{
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
            }}
            rowMarkers="both"
            freezeColumns={p.freezeColumns}
            getCellContent={getCellContentMangled}
            columns={cols}
            verticalBorder={false}
            rows={1000}
        />
    );
};
