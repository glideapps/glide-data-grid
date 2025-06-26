import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
    useMockDataGenerator,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { GridCellKind, type ProvideEditorCallback, type TextCell } from "../../index.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Provide Editor"
                    description={
                        <Description>
                            The <PropName>provideEditor</PropName> callback allows you to provide a custom editor for a
                            cell. In this example, cells in the first column get a custom editor.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

const CustomEditor: React.FC<any> = p => {
    const { value, onFinishedEditing } = p;
    const [text, setText] = React.useState(value.data);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <input
                style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    border: "2px solid #666",
                    background: "#333",
                    color: "white",
                    padding: "0 8px",
                }}
                value={text}
                onChange={e => setText(e.target.value)}
                onBlur={() =>
                    onFinishedEditing({
                        ...value,
                        data: text,
                    })
                }
            />
        </div>
    );
};
CustomEditor.displayName = "CustomEditor";

const provideEditor: ProvideEditorCallback<TextCell> = cell => {
    // You can get the location of the activated cell via cell.location:
    if (cell.location?.[0] === 0) {
        return p => <CustomEditor {...p} />;
    }
    return undefined;
};

export const ProvideEditor: React.VFC = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(10, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rows={20}
            onCellEdited={(cell, newValue) => {
                if (newValue.kind !== GridCellKind.Text) return;
                setCellValue(cell, newValue);
            }}
            provideEditor={provideEditor as ProvideEditorCallback<any>}
        />
    );
};
ProvideEditor.displayName = "ProvideEditor";
