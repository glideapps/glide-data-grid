import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import type { GridColumn, Item, TextCell } from "../../internal/data-grid/data-grid-types.js";
import { GridCellKind } from "../../internal/data-grid/data-grid-types.js";
import { BeautifulWrapper, Description, defaultProps } from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Custom Event Target"
                    description={
                        <Description>
                            This example demonstrates using a custom event target for the data grid. All window events
                            are blocked, but the grid still works because it&apos;s using the container div as its event
                            target instead of window.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const CustomEventTarget: React.VFC = () => {
    // Create columns
    const [cols] = React.useState<GridColumn[]>(() => {
        return [
            {
                title: "Column A",
                id: "a",
                width: 150,
            },
            {
                title: "Column B",
                id: "b",
                width: 150,
            },
            {
                title: "Column C",
                id: "c",
                width: 150,
            },
        ];
    });

    // Create data
    const getCellContent = React.useCallback((cell: Item): TextCell => {
        const [col, row] = cell;
        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            displayData: `${col}, ${row}`,
            data: `${col}, ${row}`,
        };
    }, []);

    // Create a ref for our custom event target container
    const containerRef = React.useRef<HTMLDivElement>(null);

    // State to track if the container is mounted
    const [containerMounted, setContainerMounted] = React.useState(false);

    // State to track window click attempts
    const [windowClickAttempts, setWindowClickAttempts] = React.useState(0);

    // Update containerMounted state after the component mounts
    React.useEffect(() => {
        if (containerRef.current !== null) {
            setContainerMounted(true);
        }
    }, []);

    // Block all window events
    React.useEffect(() => {
        const blockEvent = (e: Event) => {
            // Don't block events if they're inside our container
            if (containerRef.current && e.target instanceof Node && containerRef.current.contains(e.target)) {
                return;
            }

            e.stopPropagation();
            e.stopImmediatePropagation();
            if (e.cancelable) {
                e.preventDefault();
            }

            // Count click attempts outside the grid
            if (e.type === "click") {
                setWindowClickAttempts(prev => prev + 1);
            }
        };

        // Block all mouse and touch events on window
        const events = ["mousedown", "mouseup", "mousemove", "click", "touchstart", "touchend", "touchmove"];

        // Add event blockers to window
        for (const event of events) {
            window.addEventListener(event, blockEvent, true);
        }

        return () => {
            // Clean up event blockers
            for (const event of events) {
                window.removeEventListener(event, blockEvent, true);
            }
        };
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ marginBottom: 10, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#666" }}>Window click attempts blocked: {windowClickAttempts}</span>
                    <button
                        onClick={() => alert("This button should not work if window events are blocked!")}
                        style={{ padding: "5px 10px" }}>
                        Try clicking me (should not work)
                    </button>
                </div>
                <div style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
                    Try clicking outside the grid or on the button above - these clicks should be blocked. But the grid
                    below should still be fully interactive!
                </div>
            </div>

            <div
                ref={containerRef}
                style={{
                    flex: 1,
                    position: "relative",
                    border: "2px solid #3c78d8",
                    borderRadius: 4,
                    padding: 10,
                }}>
                {containerMounted && (
                    <DataEditor
                        {...defaultProps}
                        width="100%"
                        height="100%"
                        rows={1000}
                        columns={cols}
                        getCellContent={getCellContent}
                        experimental={{
                            customWindowEventTarget: containerRef.current as HTMLElement,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
