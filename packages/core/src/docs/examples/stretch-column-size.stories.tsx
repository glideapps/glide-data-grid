import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Column Grow"
                    description={
                        <Description>
                            Columns in the data grid may be set to grow to fill space by setting the{" "}
                            <PropName>grow</PropName> prop.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const StretchColumnSize: React.VFC = () => {
    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(5, true, true);

    const hasResized = React.useRef(new Set<number>());

    const columns = React.useMemo(() => {
        return cols.map((x, i) => ({ ...x, grow: hasResized.current.has(i) ? undefined : (5 + i) / 5 }));
    }, [cols]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={columns}
            rows={1000}
            onColumnResize={(col, _newSize, colIndex, newSizeWithGrow) => {
                hasResized.current.add(colIndex);
                onColumnResize(col, newSizeWithGrow);
            }}
            rowMarkers="both"
        />
    );
};
