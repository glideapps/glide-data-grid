import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="One Million Rows"
                    description={
                        <Description>Data grid supports over 1 million rows. Your limit is mostly RAM.</Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const OneMillionRows: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    const [rows, setRows] = React.useState(1_000_000);

    React.useEffect(() => {
        window.setTimeout(() => setRows(5), 3000);
    }, []);

    return (
        <DataEditor
            {...defaultProps}
            height="100%"
            getCellContent={getCellContent}
            columns={cols}
            rowHeight={31}
            rows={rows}
            rowMarkers="number"
        />
    );
};
