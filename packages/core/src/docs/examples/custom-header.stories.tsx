import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils";
import type { DrawHeaderCallback } from "../../data-grid/data-grid-types";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Custom Header"
                    description={<Description>Make it as fancy as you like.</Description>}>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const CustomHeader: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    const drawHeader: DrawHeaderCallback = React.useCallback(args => {
        const { ctx, rect } = args;
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        const lg = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.height);
        lg.addColorStop(0, "#ff00d934");
        lg.addColorStop(1, "#00a2ff34");
        ctx.fillStyle = lg;
        ctx.fill();
        return false;
    }, []);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            drawHeader={drawHeader}
            rows={3000}
            rowMarkers="both"
        />
    );
};
