import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { GridCellKind } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Validate data"
                    description={
                        <>
                            <Description>
                                Data can be validated using the <PropName>validateCell</PropName> callback
                            </Description>
                            <MoreInfo>This example only allows the word &quot;Valid&quot; inside text cells.</MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ValidateData: React.VFC = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rowMarkers={"both"}
            onPaste={true}
            onCellEdited={setCellValue}
            rows={100}
            validateCell={(_cell, newValue) => {
                if (newValue.kind !== GridCellKind.Text) return true;
                if (newValue.data === "Valid") return true;
                if (newValue.data.toLowerCase() === "valid") {
                    return {
                        ...newValue,
                        data: "Valid",
                        selectionRange: [0, 3],
                    };
                }
                return false;
            }}
        />
    );
};
