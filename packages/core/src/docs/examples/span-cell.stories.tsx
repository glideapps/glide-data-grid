/* eslint-disable sonarjs/no-duplicate-string */
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
import type { Rectangle, CellArray, GridCell } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Spans"
                    description={
                        <Description>
                            By setting the <PropName>span</PropName> of a cell you can create spans in your grid. All
                            cells within a span must return consistent data for defined behavior.
                            <MoreInfo>
                                Spans will always be split if they span frozen and non-frozen columns. By default
                                selections are always expanded to include a span. This can be disabled using the{" "}
                                <PropName>spanRangeBehavior</PropName> prop.
                            </MoreInfo>
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const SpanCell: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100, true, true);

    const mangledGetCellContent = React.useCallback<typeof getCellContent>(
        cell => {
            const [col, row] = cell;
            if (col === 0 && row >= 2 && row <= 4) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: false,
                    data: "Row Span span",
                    rowSpan: [2, 4],
                    displayData: "we want to clip each cell individually rather than form a super clip region",
                };
            }
            if (row === 1 && col >= 3 && col <= 5) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: false,
                    data: "Span Cell that is very long and will go past the cell limits",
                    span: [3, 5],
                    displayData: "Span Cell that is very long and will go past the cell limits",
                };
            }
            return getCellContent(cell);
        },
        [getCellContent]
    );

    const getCellsForSelection = React.useCallback(
        (selection: Rectangle): CellArray => {
            const result: GridCell[][] = [];
            for (let y = selection.y; y < selection.y + selection.height; y++) {
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.x + selection.width; x++) {
                    row.push(mangledGetCellContent([x, y]));
                }
                result.push(row);
            }

            return result;
        },
        [mangledGetCellContent]
    );

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={mangledGetCellContent}
            getCellsForSelection={getCellsForSelection}
            columns={cols}
            freezeColumns={2}
            rows={300}
            rowMarkers="both"
        />
    );
};
