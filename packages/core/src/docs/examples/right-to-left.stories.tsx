import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils.js";
import { GridCellKind } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Right to Left support"
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

    const realCols = React.useMemo(() => {
        const result = [...cols];

        result[0] = {
            ...result[0],
            title: "גלייד",
            hasMenu: true,
        };

        return result;
    }, [cols]);

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
            columns={realCols}
            onColumnResize={onColumnResize}
            getCellsForSelection={true}
            rowMarkers={"both"}
            onHeaderMenuClick={() => alert("menu click")}
            onPaste={true}
            onCellEdited={setCellValue}
            rows={1000}
        />
    );
};
