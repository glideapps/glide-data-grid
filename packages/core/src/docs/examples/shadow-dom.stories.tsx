import React from "react";

import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import ReactDOM from "react-dom";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Shadow DOM"
                    description={
                        <Description>
                            Columns in the data grid may be grouped by setting their <PropName>group</PropName>{" "}
                            property.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ShadowDOM: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(20, false, false);

    return (
        <ShadowDOMWrapper
            render={() => (
                <DataEditor
                    {...defaultProps}
                    getCellContent={getCellContent}
                    columns={cols}
                    rows={1000}
                    height={"100%"}
                    rowMarkers="both"
                />
            )}
        />
    );
};

const copyStylesToShadowRoot = (shadowRoot: ShadowRoot) => {
    const styleElement = document.createElement("style");
    for (const sheet of document.styleSheets) {
        try {
            if (sheet.cssRules !== undefined) {
                // Check if cssRules are accessible
                const rules = [...sheet.cssRules].map(rule => rule.cssText).join("\n");
                styleElement.append(document.createTextNode(rules));
            }
        } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.warn("Cannot access stylesheet rules due to CORS policy", error);
        }
    }
    shadowRoot.append(styleElement);
};

const ShadowDOMWrapper: React.FC<{
    className?: string;
    render: () => React.ReactElement;
}> = ({ className, render }) => {
    const hostRef = React.useRef<HTMLDivElement | null>(null);
    const didMountRef = React.useRef(true);

    React.useEffect(() => {
        if (hostRef.current === null || didMountRef.current) {
            didMountRef.current = false;
            return;
        }

        const host = hostRef.current;
        const shadowRoot = host.attachShadow({ mode: "open" });

        (window as any).glideShadowRoot = shadowRoot;

        copyStylesToShadowRoot(shadowRoot);

        // Create a div to serve as the react root container inside the shadow DOM
        const reactRootContainer = document.createElement("div");
        reactRootContainer.style.height = "100%";
        shadowRoot.append(reactRootContainer);
        shadowRoot.pare;

        // Create a React root and render the children inside it
        ReactDOM.render(<>{render()}</>, reactRootContainer);

        // Clean up when the component unmounts
        return () => {
            //   reactRoot.unmount()
            reactRootContainer.remove();
        };
    }, [render]);

    return <div ref={hostRef} className={className} style={{ height: "100%" }} />;
};
