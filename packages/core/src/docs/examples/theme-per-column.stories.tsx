import React from "react";
import { DataEditor } from "../../data-editor/data-editor";
import { BeautifulWrapper, Description, defaultProps, useAllMockedKinds } from "../../data-editor/stories/utils";
import { SimpleThemeWrapper } from "../../stories/story-utils";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Theme per column"
                    description={
                        <>
                            <Description>
                                Each column can provide theme overrides for rendering that column.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ThemePerColumn: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const realCols = React.useMemo(() => {
        const c = [...cols];
        c[3] = {
            ...c[3],
            themeOverride: {
                textDark: "#009CA6",
                bgIconHeader: "#009CA6",
                accentColor: "#009CA6",
                accentLight: "#009CA620",
                fgIconHeader: "#FFFFFF",
                baseFontStyle: "600 13px",
            },
        };
        c[4] = {
            ...c[4],
            themeOverride: {
                textDark: "#009CA6",
                bgIconHeader: "#009CA6",
                accentColor: "#009CA6",
                accentLight: "#009CA620",
                fgIconHeader: "#FFFFFF",
                baseFontStyle: "600 13px",
            },
        };
        c[9] = {
            ...c[9],
            themeOverride: {
                textDark: "#009CA6",
                bgIconHeader: "#009CA6",
                accentColor: "#009CA6",
                accentLight: "#009CA620",
                fgIconHeader: "#FFFFFF",
            },
        };
        c[10] = {
            ...c[10],
            themeOverride: {
                textDark: "#009CA6",
                bgIconHeader: "#009CA6",
                accentColor: "#009CA6",
                accentLight: "#009CA620",
                fgIconHeader: "#FFFFFF",
            },
        };
        return c;
    }, [cols]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={realCols}
            onCellEdited={setCellValue}
            onColumnResize={onColumnResize}
            rows={1000}
        />
    );
};
