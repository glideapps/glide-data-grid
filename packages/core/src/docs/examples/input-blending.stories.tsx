import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Input blending"
                    description={
                        <Description>
                            Input blending can be enabled or disable between row, column, and range selections.
                            Multi-selections can also be enabled or disabled with the same level of granularity.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface InputBlendingGridProps {
    rangeBlending: "mixed" | "exclusive" | "inclusive";
    columnBlending: "mixed" | "exclusive" | "inclusive";
    rowBlending: "mixed" | "exclusive" | "inclusive";
    rangeMultiSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    columnMultiSelect: "none" | "single" | "multi";
    rowMultiSelect: "none" | "single" | "multi";
}

export const InputBlending: React.FC<InputBlendingGridProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(30);

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers={p.rowMultiSelect === "none" ? "number" : "both"}
            keybindings={{
                clear: true,
                copy: true,
                downFill: true,
                rightFill: true,
                pageDown: true,
                pageUp: true,
                paste: true,
                search: true,
                selectAll: true,
                selectColumn: true,
                selectRow: true,
            }}
            getCellsForSelection={true}
            rangeSelect={p.rangeMultiSelect}
            columnSelect={p.columnMultiSelect}
            rowSelect={p.rowMultiSelect}
            rangeSelectionBlending={p.rangeBlending}
            columnSelectionBlending={p.columnBlending}
            rowSelectionBlending={p.rowBlending}
            getCellContent={getCellContent}
            columns={cols}
            rows={10_000}
        />
    );
};
(InputBlending as any).args = {
    rangeBlending: "mixed",
    columnBlending: "mixed",
    rowBlending: "mixed",
    rangeMultiSelect: "rect",
    columnMultiSelect: "multi",
    rowMultiSelect: "multi",
};
(InputBlending as any).argTypes = {
    rangeBlending: {
        control: { type: "select" },
        options: ["mixed", "exclusive", "inclusive"],
    },
    columnBlending: {
        control: { type: "select" },
        options: ["mixed", "exclusive", "inclusive"],
    },
    rowBlending: {
        control: { type: "select" },
        options: ["mixed", "exclusive", "inclusive"],
    },
    rangeMultiSelect: {
        control: { type: "select" },
        options: ["none", "cell", "rect", "multi-cell", "multi-rect"],
    },
    columnMultiSelect: {
        control: { type: "select" },
        options: ["none", "single", "multi"],
    },
    rowMultiSelect: {
        control: { type: "select" },
        options: ["none", "single", "multi"],
    },
};
