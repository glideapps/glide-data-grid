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
                    title="Prevent Diagonal Scroll"
                    description={
                        <>
                            <Description>
                                Diagonal scrolling can be prevented by setting{" "}
                                <PropName>preventDiagonalScrolling</PropName>.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const PreventDiagonalScroll: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(200);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            preventDiagonalScrolling={true}
            rows={5000}
        />
    );
};
