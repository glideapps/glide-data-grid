import React from "react";
import type { DataEditorRef } from "../../data-editor/data-editor.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
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

export const GetMouseArgsForPosition: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);
    const ref = React.useRef<DataEditorRef>(null);
    const [info, setInfo] = React.useState<string>("Move the mouse over the grid");

    const onMouseMove = React.useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
        const args = ref.current?.getMouseArgsForPosition(ev.clientX, ev.clientY, ev);
        if (args === undefined) {
            setInfo("Outside grid");
        } else if (args.kind === "cell") {
            setInfo(`Cell ${args.location[0]}, ${args.location[1]}`);
        } else {
            setInfo(args.kind);
        }
    }, []);

    return (
        <BeautifulWrapper
            title="getMouseArgsForPosition"
            description={
                <Description>
                    Use <PropName>getMouseArgsForPosition</PropName> to translate
                    pointer coordinates into grid locations.
                </Description>
            }>
            <div onMouseMove={onMouseMove}>
                <DataEditor
                    {...defaultProps}
                    ref={ref}
                    columns={cols}
                    getCellContent={getCellContent}
                    rows={1000}
                />
            </div>
            <div style={{ marginTop: 8 }}>{info}</div>
        </BeautifulWrapper>
    );
};