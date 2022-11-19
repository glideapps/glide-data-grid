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
                    title="Drag source"
                    description={
                        <>
                            <Description>
                                Setting the <PropName>isDraggable</PropName> prop can allow for more granular control
                                over what is draggable in the grid via HTML drag and drop.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const DragSource: React.VFC<{ isDraggable: boolean | "header" | "cell" }> = p => {
    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(200);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowMarkers="both"
            rows={5000}
            onRowMoved={(s, e) => window.alert(`Moved row ${s} to ${e}`)}
            onColumnMoved={(s, e) => window.alert(`Moved col ${s} to ${e}`)}
            onColumnResize={onColumnResize}
            isDraggable={p.isDraggable}
            onDragStart={e => {
                e.setData("text/plain", "Drag data here!");
            }}
        />
    );
};
(DragSource as any).argTypes = {
    isDraggable: {
        control: { type: "select", options: [true, false, "cell", "header"] },
    },
};
(DragSource as any).args = {
    isDraggable: false,
};
