import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils.js";
import type { GetRowThemeCallback } from "../../internal/data-grid/data-grid-render.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { GridMouseEventArgs } from "../../internal/data-grid/event-args.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Row Hover Effect"
                    description={
                        <Description>
                            Through careful usage of the <PropName>onItemHovered</PropName> callback it is possible to
                            easily create a row hover effect.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const RowHover: React.VFC = () => {
    const { cols, getCellContent } = useAllMockedKinds();

    const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);

    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
        const [_, row] = args.location;
        setHoverRow(args.kind !== "cell" ? undefined : row);
    }, []);

    const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(
        row => {
            if (row !== hoverRow) return undefined;
            return {
                bgCell: "#f7f7f7",
                bgCellMedium: "#f0f0f0",
            };
        },
        [hoverRow]
    );

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="both"
            onItemHovered={onItemHovered}
            getCellContent={getCellContent}
            getRowThemeOverride={getRowThemeOverride}
            columns={cols}
            rows={300}
        />
    );
};
