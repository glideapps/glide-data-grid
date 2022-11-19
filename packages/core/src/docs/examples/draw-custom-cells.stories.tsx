import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils";
import { GridCellKind } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Draw custom cells"
                    description={
                        <Description>
                            You can draw custom cell contents however you want using the{" "}
                            <PropName>drawCustomCell</PropName> prop
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const DrawCustomCells: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            drawCell={args => {
                const { cell, rect, ctx } = args;
                if (cell.kind !== GridCellKind.Text) return false;

                const hasX = cell.displayData.toLowerCase().includes("x"); // all my x's live in texas

                ctx.save();
                const { x, y, width, height } = rect;
                const data = cell.displayData;

                ctx.fillStyle = hasX ? "#bfffcd" : "#ffe6e6";
                ctx.fillRect(x + 1, y + 1, width - 1, height - 1);

                ctx.fillStyle = hasX ? "#0fc035" : "#e01e1e";
                ctx.font = "bold 14px sans-serif";
                ctx.fillText(data, x + 8 + 0.5, y + height / 2 + 4.5);
                ctx.restore();

                return true;
            }}
            rows={1000}
        />
    );
};
