import React, { useState } from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { type Keybinds, type Keybind, keybindingDefaults } from "../../data-editor/data-editor-keybindings.js";

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

export const CustomKeybindings: React.VFC = () => {
    const { getCellContent, cols, setCellValue } = useMockDataGenerator(30, false);

    const keybindingStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridColumnGap: "32px",
        gridRowGap: "10px",
        marginBottom: "10px",
        marginTop: "20px",
        font: "13px sans-serif",
    };

    const controlGroupStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const { copy, cut, paste, pageDown, pageUp, first, last, ...rest } = keybindingDefaults;

    const [keybindings, setKeybindings] = useState<Partial<Keybinds>>(rest);

    const handleKeybindingChange = (key: keyof Keybinds, value: Keybind) => {
        setKeybindings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <BeautifulWrapper
            title="Custom Keybindings"
            description={
                <Description>
                    This demo showcases custom keybindings. Modify the keybindings using the controls below.
                    <div style={keybindingStyle}>
                        {Object.keys(rest).map(key => (
                            <div key={key} style={controlGroupStyle}>
                                <label>{key}: </label>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={keybindings[key as keyof Keybinds] === true}
                                        onChange={e =>
                                            handleKeybindingChange(
                                                key as keyof Keybinds,
                                                e.target.checked ? true : false
                                            )
                                        }
                                    />
                                    <input
                                        type="text"
                                        style={{ width: "100px" }}
                                        value={(keybindings[key as keyof Keybinds] as string) || ""}
                                        onChange={e => handleKeybindingChange(key as keyof Keybinds, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                onCellEdited={setCellValue}
                keybindings={keybindings}
                columns={cols}
                rangeSelect="multi-rect"
                rows={100}
                rowMarkers="both"
            />
        </BeautifulWrapper>
    );
};
