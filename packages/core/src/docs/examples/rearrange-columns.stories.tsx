import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import type { Item, GridCell } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Rearrange Columns"
                    description={
                        <Description>
                            Columns can be rearranged by drag and dropping, as long as you respond to the{" "}
                            <PropName>onColumnMoved</PropName> callback.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const RearrangeColumns: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(60);

    // This is a dirty hack because the mock generator doesn't really support changing this. In a real data source
    // you should track indexes properly
    const [sortableCols, setSortableCols] = React.useState(cols);

    const onColMoved = React.useCallback((startIndex: number, endIndex: number): void => {
        setSortableCols(old => {
            const newCols = [...old];
            const [toMove] = newCols.splice(startIndex, 1);
            newCols.splice(endIndex, 0, toMove);
            return newCols;
        });
    }, []);

    const getCellContentMangled = React.useCallback(
        ([col, row]: Item): GridCell => {
            const remappedCol = cols.findIndex(c => c.title === sortableCols[col].title);
            return getCellContent([remappedCol, row]);
        },
        [cols, getCellContent, sortableCols]
    );

    return (
        <DataEditor
            {...defaultProps}
            freezeColumns={1}
            rowMarkers="both"
            getCellContent={getCellContentMangled}
            columns={sortableCols}
            onColumnMoved={onColMoved}
            rows={1000}
        />
    );
};
