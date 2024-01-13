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
                    title="Overscroll"
                    description={
                        <>
                            <Description>
                                You can allocate extra space at the ends of the grid by setting the{" "}
                                <PropName>overscrollX</PropName> and <PropName>overscrollY</PropName> props
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface OverscrollProps {
    overscrollX: number;
    overscrollY: number;
}

export const Overscroll: React.VFC<OverscrollProps> = p => {
    const { overscrollX, overscrollY } = p;
    const { cols, getCellContent } = useMockDataGenerator(20);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            overscrollX={overscrollX}
            overscrollY={overscrollY}
            rows={50}
        />
    );
};
(Overscroll as any).argTypes = {
    overscrollX: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
    overscrollY: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
};
(Overscroll as any).args = {
    overscrollX: 200,
    overscrollY: 200,
};
