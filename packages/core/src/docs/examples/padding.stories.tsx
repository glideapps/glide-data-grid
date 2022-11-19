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
                    title="Padding"
                    description={
                        <>
                            <Description>
                                You can add padding at the ends of the grid by setting the{" "}
                                <PropName>paddingRight</PropName> and <PropName>paddingBottom</PropName> props
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface PaddingProps {
    paddingRight: number;
    paddingBottom: number;
}

export const Padding: React.VFC<PaddingProps> = p => {
    const { paddingRight, paddingBottom } = p;
    const { cols, getCellContent } = useMockDataGenerator(20);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowMarkers={"both"}
            experimental={{ paddingRight, paddingBottom }}
            rows={50}
        />
    );
};
(Padding as any).argTypes = {
    paddingRight: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
    paddingBottom: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
};
(Padding as any).args = {
    paddingRight: 200,
    paddingBottom: 200,
};
