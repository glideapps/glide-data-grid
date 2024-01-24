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

    const realCols = React.useMemo(() => {
        const c = [...cols];
        c[3] = {
            ...c[3],
            themeOverride: {
                bgCell: "#d6fafd",
            },
        };
        return c;
    }, [cols]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={realCols}
            height="100%"
            // trailingRowOptions={{
            //     sticky: true,
            //     tint: true,
            // }}
            // onRowAppended={() => undefined}
            getRowThemeOverride={i =>
                i % 2 === 0
                    ? undefined
                    : {
                          bgCell: "#e0f0ff88",
                          //   borderColor: "#3f90e0",
                      }
            }
            onCellEdited={setCellValue}
            onColumnResize={onColumnResize}
            rows={10}
        />
    );
};
