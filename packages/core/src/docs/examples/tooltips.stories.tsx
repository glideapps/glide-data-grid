import React from "react";
import type { IBounds } from "react-laag";
import { useLayer } from "react-laag";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { GridMouseEventArgs } from "../../internal/data-grid/event-args.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Tooltips"
                    className="double"
                    description={
                        <Description>
                            Using the <PropName>onItemHovered</PropName> event makes it easy to create tooltips. This
                            story is intentionally forced to scroll vertically so layout in scrolling documents can be
                            confirmed.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

const zeroBounds = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
};

export const Tooltips: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    const [tooltip, setTooltip] = React.useState<{ val: string; bounds: IBounds } | undefined>();

    const timeoutRef = React.useRef(0);

    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
        if (args.kind === "cell") {
            window.clearTimeout(timeoutRef.current);
            setTooltip(undefined);
            timeoutRef.current = window.setTimeout(() => {
                setTooltip({
                    val: `Tooltip for ${args.location[0]}, ${args.location[1]}`,
                    bounds: {
                        // translate to react-laag types
                        left: args.bounds.x,
                        top: args.bounds.y,
                        width: args.bounds.width,
                        height: args.bounds.height,
                        right: args.bounds.x + args.bounds.width,
                        bottom: args.bounds.y + args.bounds.height,
                    },
                });
            }, 1000);
        } else {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = 0;
            setTooltip(undefined);
        }
    }, []);

    React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

    const isOpen = tooltip !== undefined;
    const { renderLayer, layerProps } = useLayer({
        isOpen,
        triggerOffset: 4,
        auto: true,
        container: "portal",
        trigger: {
            getBounds: () => tooltip?.bounds ?? zeroBounds,
        },
    });

    return (
        <>
            <DataEditor
                {...defaultProps}
                onItemHovered={onItemHovered}
                getCellContent={getCellContent}
                columns={cols}
                rowMarkers="both"
                rows={1000}
            />
            {isOpen &&
                renderLayer(
                    <div
                        {...layerProps}
                        style={{
                            ...layerProps.style,
                            padding: "8px 12px",
                            color: "white",
                            font: "500 13px Inter",
                            backgroundColor: "rgba(0, 0, 0, 0.85)",
                            borderRadius: 9,
                        }}>
                        {tooltip.val}
                    </div>
                )}
        </>
    );
};
