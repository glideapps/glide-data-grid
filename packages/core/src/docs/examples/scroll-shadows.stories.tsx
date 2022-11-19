import React from "react";
import type { Theme } from "../../common/styles";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils";
import { type GridSelection, CompactSelection } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
            title="Scroll Shadows"
            description={
                <>
                    <Description>You can enable and disable the horizontal/vertical scroll shadows.</Description>
                </>
            }>

                <Story />
            </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ScrollShadows: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    const [selection, setSelection] = React.useState<GridSelection>({
        rows: CompactSelection.empty(),
        columns: CompactSelection.empty(),
    });

    const onSelectionChange = React.useCallback((newSel: GridSelection) => {
        let newRows = CompactSelection.empty();
        if (newSel.current !== undefined) {
            newRows = newRows.add([newSel.current.range.y, newSel.current.range.y + newSel.current.range.height]);
        }
        for (const b of newSel.current?.rangeStack ?? []) {
            newRows = newRows.add([b.y, b.y + b.height]);
        }
        setSelection({
            ...newSel,
            rows: newRows,
        });
    }, []);

    const theme = React.useMemo<Partial<Theme>>(
        () => ({
            accentLight: "#b1f6ff",
            horizontalBorderColor: "transparent",
            headerBottomBorderColor: "rgba(115, 116, 131, 0.16)",
        }),
        []
    );

    const getRowThemeOverride = React.useCallback(row => (row % 2 === 0 ? undefined : { bgCell: "#f5f5f6" }), []);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers={"number"}
            gridSelection={selection}
            onGridSelectionChange={onSelectionChange}
            fixedShadowX={false}
            headerHeight={26}
            drawFocusRing={false}
            rowHeight={22}
            fixedShadowY={false}
            getRowThemeOverride={getRowThemeOverride}
            verticalBorder={false}
            getCellContent={getCellContent}
            columns={cols}
            rows={1000}
            theme={theme}
        />
    );
};
