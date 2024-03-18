import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Lotsa cell kinds"
                    description={
                        <Description>
                            Data grid supports plenty cell kinds. Anything under <PropName>GridCellKind</PropName>.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const AllCellKinds: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            onCellEdited={setCellValue}
            onPaste={true}
            rowHeight={44}
            onColumnResize={onColumnResize}
            highlightRegions={[
                {
                    color: "#ff00ff33",
                    range: {
                        x: 1,
                        y: 1,
                        width: 3,
                        height: 3,
                    },
                },
            ]}
            cellActivationBehavior="single-click"
            editorBloom={[-4, -4]}
            drawFocusRing={false}
            rows={1000}
        />
    );
};
