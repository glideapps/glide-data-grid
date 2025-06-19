import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { type RowMarkerOptions } from "../../data-editor/data-editor.js";
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
                <BeautifulWrapper
                    title="Row selections"
                    description={
                        <Description>
                            You can enable row selections by setting <PropName>rowSelect</PropName> prop to{" "}
                            <PropName>multi</PropName> for multi-selection or <PropName>single</PropName> for
                            single-selection. The row marker behavior and appearance can be controlled via the{" "}
                            <PropName>rowMarkers</PropName> prop.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface RowSelectionsProps {
    rowSelect: "none" | "single" | "multi";
    rowSelectionMode: "auto" | "multi";
    rowMarkersKind: RowMarkerOptions["kind"];
    rowMarkersCheckboxStyle: RowMarkerOptions["checkboxStyle"];
}

export const RowSelections: React.FC<RowSelectionsProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(30);

    return (
        <DataEditor
            {...defaultProps}
            rowSelect={p.rowSelect}
            rowSelectionMode={p.rowSelectionMode}
            getCellContent={getCellContent}
            rowMarkers={{
                kind: p.rowMarkersKind,
                checkboxStyle: p.rowMarkersCheckboxStyle,
            }}
            columns={cols}
            rows={400}
        />
    );
};
(RowSelections as any).args = {
    rowSelect: "single",
    rowSelectionMode: "auto",
    rowMarkersKind: "checkbox-visible",
    rowMarkersCheckboxStyle: "circle",
};
(RowSelections as any).argTypes = {
    rowSelect: {
        control: { type: "select" },
        options: ["none", "single", "multi"],
    },
    rowSelectionMode: {
        control: { type: "select" },
        options: ["auto", "multi"],
    },
    rowMarkersKind: {
        control: { type: "select" },
        options: ["both", "checkbox", "number", "none", "clickable-number", "checkbox-visible"],
    },
    rowMarkersCheckboxStyle: {
        control: { type: "select" },
        options: ["square", "circle"],
    },
};
