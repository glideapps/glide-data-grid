import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import type { GridColumn } from "../../internal/data-grid/data-grid-types.js";
import { CompactSelection } from "../../internal/data-grid/data-grid-types.js";
import { getColumnGroupName } from "../../internal/data-grid/render/data-grid-lib.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { GroupHeaderClickedEventArgs } from "../../internal/data-grid/event-args.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Group collapse"
                    description={
                        <>
                            <Description>
                                Through clever usage of <PropName>onGroupHeaderClicked</PropName> you can implement
                                group collapsing. This is a very basic version however it is possible to go much
                                further.
                            </Description>
                            <MoreInfo>
                                Cells under a certain size will not attempt to render to save some frames.
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

function useCollapsableColumnGroups(cols: readonly GridColumn[]) {
    const [collapsed, setCollapsed] = React.useState<readonly string[]>([]);

    const onGroupHeaderClicked = React.useCallback(
        (_colIndex: number, args: GroupHeaderClickedEventArgs) => {
            const group = args.group;
            setCollapsed(cv => (cv.includes(group) ? cv.filter(g => g !== group) : [...cv, group]));
            args.preventDefault();
        },
        []
    );

    const [selectedColumns, setSelectedColumns] = React.useState<CompactSelection>(CompactSelection.empty());

    const setCols = React.useCallback((newVal: CompactSelection, trigger: string) => {
        if (trigger === "group") return;

        setSelectedColumns(newVal);
    }, []);

    const columns = React.useMemo(() => {
        return cols.map(c => {
            if (!collapsed.includes(getColumnGroupName(c.group, 0) ?? ""))
                return {
                    ...c,
                    hasMenu: true,
                };
            return {
                ...c,
                width: 8,
                hasMenu: true,
            };
        });
    }, [collapsed, cols]);

    return {
        columns,
        onGroupHeaderClicked,
        selectedColumns,
        onSelectedColumnsChange: setCols,
    };
}

export const ColumnGroupCollapse: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100, true, true);

    const groupHeaderArgs = useCollapsableColumnGroups(cols);

    return (
        <DataEditor
            {...defaultProps}
            {...groupHeaderArgs}
            getCellContent={getCellContent}
            groupHeaderHeight={24}
            rows={1000}
            rowMarkers="both"
        />
    );
};
