import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import {
    BeautifulWrapper,
    Description,
    PropName,
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
                    title="Theme per row"
                    description={
                        <>
                            <Description>
                                Each row can provide theme overrides for rendering that row using the{" "}
                                <PropName>getRowThemeOverride</PropName> callback.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ThemePerRow: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useMockDataGenerator(5);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            trailingRowOptions={{
                sticky: true,
                tint: true,
            }}
            onRowAppended={() => undefined}
            getRowThemeOverride={i =>
                i % 2 === 0
                    ? undefined
                    : {
                          bgCell: "#f0f8ff",
                          borderColor: "#3f90e0",
                      }
            }
            onCellEdited={setCellValue}
            onColumnResize={onColumnResize}
            rows={1_000_000}
        />
    );
};
