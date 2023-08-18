/* eslint-disable no-console */
import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Obscured Data Grid"
                    description={
                        <>
                            <Description>The data grid should respect being obscured by other elements</Description>
                            <MoreInfo>This is mostly a test area because its hard to test with unit tests.</MoreInfo>
                        </>
                    }>
                    <Story />
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            width: "50%",
                            height: "100%",
                            background: "rgba(0,0,0,0.5)",
                            zIndex: 100,
                        }}
                    />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ObscuredDataGrid: React.VFC = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            onItemHovered={x => console.log("onItemHovered", x)}
            onCellClicked={x => console.log("onCellClicked", x)}
            onHeaderClicked={x => console.log("onHeaderClicked", x)}
            onCellContextMenu={x => console.log("onCellContextMenu", x)}
            onHeaderContextMenu={x => console.log("onHeaderContextMenu", x)}
            columns={cols}
            rowMarkers={"both"}
            onPaste={true} // we want to allow paste to just call onCellEdited
            onCellEdited={setCellValue} // Sets the mock cell content
            trailingRowOptions={{
                // How to get the trailing row to look right
                sticky: true,
                tint: true,
                hint: "New row...",
            }}
            rows={10_000}
        />
    );
};
