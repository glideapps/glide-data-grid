import * as React from "react";
import { BeautifulStyle, Description, useMockDataGenerator } from "./utils";
import { DataEditor, DataEditorProps } from "../data-editor";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/Layout Integration",

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


export const LayoutIntegration: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    return (
        <BeautifulStyle>
            <h1>Layout Integration</h1>
            <Description>Trying the grid in different situations</Description>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={10}
                rowMarkers="both"
                height={200}
            />
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers="both" />
            <div style={{ display: "flex", height: "300px" }}>
                <DataEditor
                    {...defaultProps}
                    getCellContent={getCellContent}
                    columns={cols}
                    rows={10}
                    rowMarkers="both"
                />
                <div style={{ flexShrink: 0 }}>This is some text what happens here?</div>
            </div>
        </BeautifulStyle>
    );
};
(LayoutIntegration as any).parameters = {
    options: {
        showPanel: false,
    },
};
