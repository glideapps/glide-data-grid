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
                    title="Uneven Rows"
                    description={
                        <Description>
                            Rows can be made uneven by passing a callback to the <PropName>rowHeight</PropName> prop
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const UnevenRows: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <DataEditor
            {...defaultProps}
            rowHeight={r => (r % 3 === 0 ? 30 : r % 2 ? 50 : 60)}
            getCellContent={getCellContent}
            columns={cols}
            rows={1000}
        />
    );
};
