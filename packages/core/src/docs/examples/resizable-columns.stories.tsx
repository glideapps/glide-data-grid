import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
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
                    title="Resizable columns"
                    description={
                        <>
                            <Description>
                                You can resize columns by dragging their edges, as long as you respond to the{" "}
                                <PropName>onColumnResize</PropName> prop.
                            </Description>
                            <MoreInfo>
                                By setting the <PropName>overscrollX</PropName> property extra space can be allocated at
                                the end of the grid to allow for easier resizing of the final column. You can highlight
                                multiple columns to resize them all at once.
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ResizableColumns: React.VFC = () => {
    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowMarkers="both"
            overscrollX={200}
            overscrollY={200}
            maxColumnAutoWidth={500}
            maxColumnWidth={2000}
            rows={50}
            scaleToRem={true}
            theme={{
                baseFontStyle: "0.8125rem",
                headerFontStyle: "600 0.8125rem",
                editorFontSize: "0.8125rem",
            }}
            onColumnResize={onColumnResize}
        />
    );
};
