import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
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
                    title="Smooth scrolling"
                    description={
                        <Description>
                            You can enable smooth scrolling with the <PropName>smoothScrollX</PropName> and{" "}
                            <PropName>smoothScrollY</PropName> props. Disabling smooth scrolling can dramatically
                            increase performance and improve visual stability during rapid scrolling.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface SmoothScrollingGridProps {
    smoothScrollX: boolean;
    smoothScrollY: boolean;
}

export const SmoothScrollingGrid: React.FC<SmoothScrollingGridProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(30);

    return (
        <DataEditor
            {...defaultProps}
            smoothScrollX={p.smoothScrollX}
            smoothScrollY={p.smoothScrollY}
            getCellContent={getCellContent}
            columns={cols}
            rows={10_000}
        />
    );
};
(SmoothScrollingGrid as any).args = {
    smoothScrollX: false,
    smoothScrollY: false,
};
