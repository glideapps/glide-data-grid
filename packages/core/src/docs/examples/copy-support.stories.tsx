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
                    title="Copy support"
                    description={
                        <>
                            <Description>
                                Large amounts of data can be copied and customized using{" "}
                                <PropName>getCellsForSelection</PropName>.
                            </Description>
                            <MoreInfo>
                                The data is copied into a format ready to be pasted into Excel or Google Sheets
                            </MoreInfo>
                            <textarea
                                placeholder="Copy something below and paste it here..."
                                style={{
                                    width: "100%",
                                    marginBottom: 20,
                                    borderRadius: 9,
                                    minHeight: 200,
                                    padding: 10,
                                }}
                            />
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const CopySupport: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(10, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            rowMarkers="both"
            columns={cols}
            onCellEdited={setCellValue}
            onColumnResize={onColumnResize}
            rows={400}
        />
    );
};
