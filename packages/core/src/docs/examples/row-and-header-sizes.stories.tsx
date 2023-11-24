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
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Row and Header sizes"
                    description={
                        <>
                            <Description>
                                The row size can be controlled with <PropName>rowHeight</PropName> and the header size
                                with <PropName>headerHeight</PropName>.
                            </Description>
                            <MoreInfo>Use the story&apos;s controls to resize them</MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface RowAndHeaderSizesProps {
    rowHeight: number;
    headerHeight: number;
}
export const RowAndHeaderSizes: React.VFC<RowAndHeaderSizesProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <DataEditor
            {...defaultProps}
            rowHeight={p.rowHeight}
            headerHeight={p.headerHeight}
            rowMarkers={"number"}
            getCellContent={getCellContent}
            columns={cols}
            rows={1000}
        />
    );
};
(RowAndHeaderSizes as any).args = {
    rowHeight: 34,
    headerHeight: 34,
};
(RowAndHeaderSizes as any).argTypes = {
    rowHeight: {
        control: {
            type: "range",
            min: 20,
            max: 200,
        },
    },
    headerHeight: {
        control: {
            type: "range",
            min: 20,
            max: 200,
        },
    },
};
