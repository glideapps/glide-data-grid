import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    KeyName,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import type { Rectangle } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

export const ObserveVisibleRegion: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });

    return (
        <BeautifulWrapper
            title="Observe Visible Region"
            description={
                <>
                    <Description>
                        The visible region can be observed using <PropName>onVisibleRegionChanged</PropName>
                    </Description>
                    <MoreInfo>
                        Then current visible region is x:<KeyName>{visibleRegion.x}</KeyName> y:
                        <KeyName>{visibleRegion.y}</KeyName> width:
                        <KeyName>{visibleRegion.width}</KeyName> height:<KeyName>{visibleRegion.height}</KeyName>
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={1000}
                onVisibleRegionChanged={setVisibleRegion}
            />
        </BeautifulWrapper>
    );
};
