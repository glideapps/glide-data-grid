import * as React from "react";
import { BeautifulWrapper, Description, useMockDataGenerator } from "./utils";
import { DataEditor, DataEditorProps } from "../data-editor";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/Large Data",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    getCellsForSelection: true,
    rowMarkers: "none",
    width: "100%",
};

export const OneHundredThousandCols: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(100_000);

    return (
        <BeautifulWrapper
            title="One Hundred Thousand Columns"
            description={
                <Description>
                    Data grid supports way more columns than you will ever need. Also this is rendering 10 million cells
                    but that&apos;s not important.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellsForSelection={getCellsForSelection}
                getCellContent={getCellContent}
                columns={cols}
                rows={1000}
            />
        </BeautifulWrapper>
    );
};
(OneHundredThousandCols as any).parameters = {
    options: {
        showPanel: false,
    },
};
