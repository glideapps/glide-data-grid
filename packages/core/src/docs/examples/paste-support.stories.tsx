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
                    title="Paste support"
                    description={
                        <>
                            <Description>
                                The data grid can handle paste automatically by returning true from{" "}
                                <PropName>onPaste</PropName>. You can also return false and handle paste yourself. If
                                paste is undefined the DataEditor will do its best to paste to the current cell.
                            </Description>
                            <MoreInfo>
                                Paste supports the copy format of Google Sheets and Excel. Below is an example of data
                                copied from excel with some escaped text.
                            </MoreInfo>
                            <textarea
                                value={`Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`}
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

export const PasteSupport: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(50, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            rowMarkers="both"
            columns={cols}
            onCellEdited={setCellValue}
            onColumnResize={onColumnResize}
            onPaste={true}
            rows={400}
        />
    );
};
