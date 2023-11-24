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
                    title="Content Alignment"
                    description={
                        <Description>
                            You can customize the content alignment by setting <PropName>contentAlign</PropName> of a
                            cell to <PropName>left</PropName>, <PropName>right</PropName> or <PropName>center</PropName>
                            .
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ContentAlignment: React.VFC = () => {
    const { cols, getCellContent } = useAllMockedKinds();

    const mangledGetCellContent = React.useCallback<typeof getCellContent>(
        cell => {
            const [col, _row] = cell;
            if (col === 3) {
                return {
                    ...getCellContent(cell),
                    contentAlign: "center",
                };
            }
            if (col === 4) {
                return {
                    ...getCellContent(cell),
                    contentAlign: "right",
                };
            }
            if (col === 5) {
                return {
                    ...getCellContent(cell),
                    contentAlign: "left",
                };
            }
            return getCellContent(cell);
        },
        [getCellContent]
    );

    return <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} columns={cols} rows={300} />;
};
