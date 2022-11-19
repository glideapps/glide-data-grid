import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils";
import { GridCellKind } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Right "
                    description={
                        <>
                            <Description>
                                The data editor automatically detects RTL in text cells and respects it.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const RightToLeft: React.VFC = () => {
    const { cols, getCellContent, setCellValue, onColumnResize } = useMockDataGenerator(60, false);

    const getCellContentMangled = React.useCallback<typeof getCellContent>(
        item => {
            const [col, _row] = item;
            if (col !== 0) return getCellContent(item);
            return {
                kind: GridCellKind.Text,
                allowOverlay: true,
                data: "אני גדעון, מומחה לאפליקציות גלייד.",
                displayData: "אני גדעון, מומחה לאפליקציות גלייד.",
                allowWrapping: true,
            };
        },
        [getCellContent]
    );

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContentMangled}
            columns={cols}
            onColumnResize={onColumnResize}
            getCellsForSelection={true}
            rowMarkers={"both"}
            onPaste={true}
            onCellEdited={setCellValue}
            rows={1000}
        />
    );
};
