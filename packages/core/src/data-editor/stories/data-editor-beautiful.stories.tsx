import * as React from "react";

import {
    CellArray,
    CompactSelection,
    DrawHeaderCallback,
    GridCell,
    GridCellKind,
    GridColumn,
    GridColumnIcon,
    GridMouseEventArgs,
    GridSelection,
    GroupHeaderClickedEventArgs,
    isEditableGridCell,
    Item,
    Rectangle,
} from "../../data-grid/data-grid-types";
import { DataEditor, DataEditorProps } from "../data-editor";

import faker from "faker";
import styled, { ThemeProvider } from "styled-components";
import { SimpleThemeWrapper } from "../../stories/story-utils";
import { useEventListener } from "../../common/utils";
import { IBounds, useLayer } from "react-laag";
import { SpriteMap } from "../../data-grid/data-grid-sprites";
import { DataEditorRef, Theme } from "../..";
import range from "lodash/range";
import {
    useMockDataGenerator,
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    lossyCopyData,
    getGridColumn,
    GridColumnWithMockingInfo,
    ContentCache,
    BeautifulStyle,
} from "./utils";
import noop from "lodash/noop";

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

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    getCellsForSelection: true,
    rowMarkers: "none",
    width: "100%",
};

export const ResizableColumns: React.VFC = () => {
    const { cols, getCellContent, onColumnResize } = useMockDataGenerator(60);

    return (
        <BeautifulWrapper
            title="Resizable columns"
            description={
                <>
                    <Description>
                        You can resize columns by dragging their edges, as long as you respond to the{" "}
                        <PropName>onColumnResize</PropName> prop.
                    </Description>
                    <MoreInfo>
                        By setting the <PropName>overscrollX</PropName> property extra space can be allocated at the end
                        of the grid to allow for easier resizing of the final column. You can highlight multiple columns
                        to resize them all at once.
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                overscrollX={200}
                overscrollY={200}
                rows={50}
                onColumnResized={onColumnResize}
            />
        </BeautifulWrapper>
    );
};
(ResizableColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};

interface OverscrollProps {
    overscrollX: number;
    overscrollY: number;
}

export const Overscroll: React.VFC<OverscrollProps> = p => {
    const { overscrollX, overscrollY } = p;
    const { cols, getCellContent } = useMockDataGenerator(20);

    return (
        <BeautifulWrapper
            title="Overscroll"
            description={
                <>
                    <Description>
                        You can allocate extra space at the ends of the grid by setting the{" "}
                        <PropName>overscrollX</PropName> and <PropName>overscrollY</PropName> props
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                overscrollX={overscrollX}
                overscrollY={overscrollY}
                rows={50}
            />
        </BeautifulWrapper>
    );
};
(Overscroll as any).argTypes = {
    overscrollX: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
    overscrollY: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
};
(Overscroll as any).args = {
    overscrollX: 200,
    overscrollY: 200,
};
(Overscroll as any).parameters = {
    options: {
        showPanel: true,
    },
};

function clearCell(cell: GridCell): GridCell {
    switch (cell.kind) {
        case GridCellKind.Boolean: {
            return {
                ...cell,
                data: false,
            };
        }
        case GridCellKind.Image: {
            return {
                ...cell,
                data: [],
                displayData: [],
            };
        }
        case GridCellKind.Drilldown:
        case GridCellKind.Bubble: {
            return {
                ...cell,
                data: [],
            };
        }
        case GridCellKind.Uri:
        case GridCellKind.Markdown: {
            return {
                ...cell,
                data: "",
            };
        }
        case GridCellKind.Text: {
            return {
                ...cell,
                data: "",
                displayData: "",
            };
        }
        case GridCellKind.Number: {
            return {
                ...cell,
                data: 0,
                displayData: "",
            };
        }
    }
    return cell;
}

export const AddData: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue, getCellsForSelection } = useMockDataGenerator(
        60,
        false
    );

    const [numRows, setNumRows] = React.useState(50);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    return (
        <BeautifulWrapper
            title="Add data"
            description={
                <>
                    <Description>Data can be added by clicking on the trailing row.</Description>
                    <MoreInfo>
                        Keyboard is also supported, just navigate past the last row and press <KeyName>Enter</KeyName>
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                getCellsForSelection={getCellsForSelection}
                rowMarkers={"both"}
                onPaste={true}
                onCellEdited={setCellValue}
                trailingRowOptions={{
                    sticky: true,
                    tint: true,
                    hint: "New row...",
                }}
                rows={numRows}
                onRowAppended={onRowAppended}
            />
        </BeautifulWrapper>
    );
};
(AddData as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const ValidateData: React.VFC = () => {
    const { cols, getCellContent, setCellValue, getCellsForSelection } = useMockDataGenerator(60, false);

    return (
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
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                getCellsForSelection={getCellsForSelection}
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
                        };
                    }
                    return false;
                }}
            />
        </BeautifulWrapper>
    );
};
(ValidateData as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const FillHandle: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue, getCellsForSelection } = useMockDataGenerator(
        60,
        false
    );

    const [numRows, setNumRows] = React.useState(50);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    return (
        <BeautifulWrapper
            title="Add data"
            description={
                <>
                    <Description>Fill handles can be used to downfill data with the mouse.</Description>
                    <MoreInfo>
                        Just click and drag, the top row will be copied down. Enable using the{" "}
                        <PropName>fillHandle</PropName> prop.
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                getCellsForSelection={getCellsForSelection}
                rowMarkers={"both"}
                onPaste={true}
                fillHandle={true}
                onCellEdited={setCellValue}
                trailingRowOptions={{
                    sticky: true,
                    tint: true,
                    hint: "New row...",
                }}
                rows={numRows}
                onRowAppended={onRowAppended}
            />
        </BeautifulWrapper>
    );
};
(FillHandle as any).parameters = {
    options: {
        showPanel: false,
    },
};

const trailingRowOptionsColumnIndexesHint: Record<number, string> = {
    2: "Smol text",
    3: "Add",
    5: "New",
};

const trailingRowOptionsColumnIndexesIcon: Record<number, string> = {
    2: GridColumnIcon.HeaderArray,
    3: GridColumnIcon.HeaderEmoji,
    5: GridColumnIcon.HeaderNumber,
};

const trailingRowOptionsColumnIndexesTarget: Record<number, number> = {
    2: 0,
    3: 0,
    5: 0,
};

const trailingRowOptionsColumnIndexesDisabled: Record<number, boolean> = {
    3: true,
};

const trailingRowOptionsColumnIndexesTheme: Record<number, Partial<Theme>> = {
    2: {
        baseFontStyle: "10px",
    },
};

export const TrailingRowOptions: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, newRow]);
            setCellValueRaw([c, newRow], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
    }, [getCellContent, numRows, setCellValueRaw]);

    const columnsWithRowOptions: GridColumn[] = React.useMemo(() => {
        return cols.map((c, idx) => ({
            ...c,
            trailingRowOptions: {
                hint: trailingRowOptionsColumnIndexesHint[idx],
                addIcon: trailingRowOptionsColumnIndexesIcon[idx],
                targetColumn: trailingRowOptionsColumnIndexesTarget[idx],
                disabled: trailingRowOptionsColumnIndexesDisabled[idx],
                themeOverride: trailingRowOptionsColumnIndexesTheme[idx],
            },
        }));
    }, [cols]);

    return (
        <BeautifulWrapper
            title="Trailing row options"
            description={
                <Description>
                    You can customize the trailing row in each column by setting a{" "}
                    <PropName>trailingRowOptions</PropName> in your columns.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={columnsWithRowOptions}
                rowMarkers={"both"}
                onCellEdited={setCellValue}
                trailingRowOptions={{
                    tint: true,
                    sticky: true,
                }}
                rows={numRows}
                onRowAppended={onRowAppended}
            />
        </BeautifulWrapper>
    );
};
(TrailingRowOptions as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const AddDataToTop: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const onRowAppended = React.useCallback(async () => {
        // shift all of the existing cells down
        for (let y = numRows; y > 0; y--) {
            for (let x = 0; x < 6; x++) {
                setCellValueRaw([x, y], getCellContent([x, y - 1]));
            }
        }
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, 0]);
            setCellValueRaw([c, 0], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
        return "top" as const;
    }, [getCellContent, numRows, setCellValueRaw]);

    return (
        <BeautifulWrapper
            title="Add data"
            description={
                <>
                    <Description>
                        You can return a different location to have the new row append take place.
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rowMarkers={"both"}
                onCellEdited={setCellValue}
                trailingRowOptions={{
                    hint: "New row...",
                    sticky: true,
                    tint: true,
                }}
                rows={numRows}
                onRowAppended={onRowAppended}
            />
        </BeautifulWrapper>
    );
};
(AddDataToTop as any).parameters = {
    options: {
        showPanel: false,
    },
};

interface AddDataToMiddleProps {
    insertIndex: number;
}
export const AddDataToMiddle: React.FC<AddDataToMiddleProps> = p => {
    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    const index = p.insertIndex;
    const onRowAppended = React.useCallback(async () => {
        // shift rows below index down
        for (let y = numRows; y > index; y--) {
            for (let x = 0; x < 6; x++) {
                setCellValueRaw([x, y], getCellContent([x, y - 1]));
            }
        }
        for (let c = 0; c < 6; c++) {
            const cell = getCellContent([c, index]);
            setCellValueRaw([c, index], clearCell(cell));
        }
        setNumRows(cv => cv + 1);
        return index;
    }, [getCellContent, numRows, setCellValueRaw, index]);

    return (
        <BeautifulWrapper
            title="Add data to middle"
            description={
                <>
                    <Description>
                        You can return a different location to have the new row append take place.
                    </Description>
                    <MoreInfo>
                        Note that <KeyName>insertIndex</KeyName> is zero-based while the number column on the left side
                        of the grid is one-based, so inserting at index &quot;4&quot; creates a new row at &quot;5&quot;
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rowMarkers={"both"}
                onCellEdited={setCellValue}
                trailingRowOptions={{
                    hint: "New row...",
                    sticky: true,
                    tint: true,
                }}
                rows={numRows}
                onRowAppended={onRowAppended}
            />
        </BeautifulWrapper>
    );
};
(AddDataToMiddle as any).args = {
    insertIndex: 10,
};
(AddDataToMiddle as any).argTypes = {
    insertIndex: {
        control: {
            type: "range",
            min: 1,
            max: 48,
        },
    },
};
(AddDataToMiddle as any).parameters = {
    options: {
        showPanel: true,
    },
};

export const SmallEditableGrid = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(6, false);

    return (
        <BeautifulWrapper
            title="Editable Grid"
            description={
                <Description>
                    Data grid supports overlay editors for changing values. There are bespoke editors for numbers,
                    strings, images, booleans, markdown, and uri.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                rowMarkers="both"
                columns={cols}
                rows={20}
                onCellEdited={setCellValue}
            />
        </BeautifulWrapper>
    );
};
(SmallEditableGrid as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const OneMillionRows: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="One Million Rows"
            description={<Description>Data grid supports over 1 million rows. Your limit is mostly RAM.</Description>}>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                rowHeight={31}
                rows={1_000_000}
                rowMarkers="number"
            />
        </BeautifulWrapper>
    );
};
(OneMillionRows as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const SillyNumbers: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="100 Million Rows"
            description={
                <Description>
                    100 million rows is silly. Once we cross about 33 million pixels in height we can no longer trust
                    the browser to scroll accurately.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                rowHeight={31}
                rows={100_000_000}
                rowMarkers="number"
            />
        </BeautifulWrapper>
    );
};
(SillyNumbers as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const ObserveVisibleRegion: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });

    return (
        <BeautifulWrapper
            title="Observe Visible Region"
            description={
                <>
                    <Description>
                        The visible region can be observed using <PropName>onVisibleRegionChanged</PropName>
                    </Description>
                    <MoreInfo>
                        Then current visible region is x:<KeyName>{visibleRegion.x}</KeyName> y:
                        <KeyName>{visibleRegion.y}</KeyName> width:
                        <KeyName>{visibleRegion.width}</KeyName> height:<KeyName>{visibleRegion.height}</KeyName>
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={1_000}
                onVisibleRegionChanged={setVisibleRegion}
            />
        </BeautifulWrapper>
    );
};
(OneMillionRows as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const OneHundredThousandCols: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(100000);

    return (
        <BeautifulWrapper
            title="One Hundred Thousand Columns"
            description={
                <Description>
                    Data grid supports way more columns than you will ever need. Also this is rendering 10 million cells
                    but that&apos;s not important.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellsForSelection={getCellsForSelection}
                getCellContent={getCellContent}
                columns={cols}
                rows={1000}
            />
        </BeautifulWrapper>
    );
};
(OneHundredThousandCols as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const TenMillionCells: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    return (
        <BeautifulWrapper
            title="Ten Million Cells"
            description={<Description>Data grid supports over 10 million cells. Go nuts with it.</Description>}>
            <DataEditor
                {...defaultProps}
                rowMarkers="number"
                getCellContent={getCellContent}
                columns={cols}
                rows={100_000}
            />
        </BeautifulWrapper>
    );
};
(TenMillionCells as any).parameters = {
    options: {
        showPanel: false,
    },
};

interface SmoothScrollingGridProps {
    smoothScrollX: boolean;
    smoothScrollY: boolean;
}

export const SmoothScrollingGrid: React.FC<SmoothScrollingGridProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(30);

    return (
        <BeautifulWrapper
            title="Smooth scrolling"
            description={
                <Description>
                    You can enable smooth scrolling with the <PropName>smoothScrollX</PropName> and{" "}
                    <PropName>smoothScrollY</PropName> props. Disabling smooth scrolling can dramatically increase
                    performance and improve visual stability during rapid scrolling.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                smoothScrollX={p.smoothScrollX}
                smoothScrollY={p.smoothScrollY}
                getCellContent={getCellContent}
                columns={cols}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(SmoothScrollingGrid as any).args = {
    smoothScrollX: false,
    smoothScrollY: false,
};
(SmoothScrollingGrid as any).parameters = {
    options: {
        showPanel: true,
    },
};

interface InputBlendingGridProps {
    rangeBlending: "mixed" | "exclusive";
    columnBlending: "mixed" | "exclusive";
    rowBlending: "mixed" | "exclusive";
    rangeMultiSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    columnMultiSelect: "none" | "single" | "multi";
    rowMultiSelect: "none" | "single" | "multi";
}

export const InputBlending: React.FC<InputBlendingGridProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(30);

    return (
        <BeautifulWrapper
            title="Input blending"
            description={
                <Description>
                    Input blending can be enabled or disable between row, column, and range selections. Multi-selections
                    can also be enabled or disabled with the same level of granularity.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                rowMarkers={p.rowMultiSelect === "none" ? "number" : "both"}
                keybindings={{
                    clear: true,
                    copy: true,
                    downFill: true,
                    rightFill: true,
                    pageDown: true,
                    pageUp: true,
                    paste: true,
                    search: true,
                    selectAll: true,
                    selectColumn: true,
                    selectRow: true,
                }}
                getCellsForSelection={true}
                rangeSelect={p.rangeMultiSelect}
                columnSelect={p.columnMultiSelect}
                rowSelect={p.rowMultiSelect}
                rangeSelectionBlending={p.rangeBlending}
                columnSelectionBlending={p.columnBlending}
                rowSelectionBlending={p.rowBlending}
                getCellContent={getCellContent}
                columns={cols}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(InputBlending as any).args = {
    rangeBlending: "mixed",
    columnBlending: "mixed",
    rowBlending: "mixed",
    rangeMultiSelect: "rect",
    columnMultiSelect: "multi",
    rowMultiSelect: "multi",
};
(InputBlending as any).argTypes = {
    rangeBlending: {
        control: { type: "select", options: ["mixed", "exclusive"] },
    },
    columnBlending: {
        control: { type: "select", options: ["mixed", "exclusive"] },
    },
    rowBlending: {
        control: { type: "select", options: ["mixed", "exclusive"] },
    },
    rangeMultiSelect: {
        control: { type: "select", options: ["none", "cell", "rect", "multi-cell", "multi-rect"] },
    },
    columnMultiSelect: {
        control: { type: "select", options: ["none", "single", "multi"] },
    },
    rowMultiSelect: {
        control: { type: "select", options: ["none", "single", "multi"] },
    },
};
(InputBlending as any).parameters = {
    options: {
        showPanel: true,
    },
};

interface AddColumnsProps {
    columnsCount: number;
}

export const AddColumns: React.FC<AddColumnsProps> = p => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(p.columnsCount);

    return (
        <BeautifulWrapper
            title="Add and remove columns"
            description={
                <>
                    <Description>You can add and remove columns at your disposal</Description>
                    <MoreInfo>Use the story&apos;s controls to change the number of columns</MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                rowMarkers="number"
                getCellsForSelection={getCellsForSelection}
                getCellContent={getCellContent}
                columns={cols}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(AddColumns as any).args = {
    columnsCount: 10,
};
(AddColumns as any).argTypes = {
    columnsCount: {
        control: {
            type: "range",
            min: 2,
            max: 200,
        },
    },
};
(AddColumns as any).parameters = {
    options: {
        showPanel: true,
    },
};

export const AutomaticRowMarkers: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="Automatic Row Markers"
            description={
                <>
                    <Description>
                        You can enable row markers with rich selection behavior using the{" "}
                        <PropName>rowMarkers</PropName> prop.
                    </Description>
                    <MoreInfo>
                        Use <KeyName>⇧</KeyName> + click to make range selections, and <KeyName>Ctrl</KeyName> (
                        <KeyName>⌘</KeyName> on Mac) + click to add/remove individual rows.
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                rowMarkers={"both"}
                getCellContent={getCellContent}
                columns={cols}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(AutomaticRowMarkers as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const WrappingText: React.VFC<{
    alignment: "left" | "center" | "right";
    length: number;
    hyperWrapping: boolean;
}> = p => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    const suffix = React.useMemo(() => {
        return range(0, 100).map(() => faker.lorem.sentence(p.length));
    }, [p.length]);

    const mangledGetCellContent = React.useCallback<typeof getCellContent>(
        i => {
            const [col, row] = i;

            if (col === 0) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: true,
                    displayData: `${row},\n${suffix[row % suffix.length]}`,
                    data: `${row}, ${suffix}`,
                    allowWrapping: true,
                    contentAlign: p.alignment,
                };
            }
            return getCellContent(i);
        },
        [getCellContent, p.alignment, suffix]
    );

    return (
        <BeautifulWrapper
            title="Wrapping Text"
            description={
                <Description>
                    Text cells can have wrapping text by setting the <PropName>allowWrapping</PropName> prop to true.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                rowHeight={80}
                getCellContent={mangledGetCellContent}
                columns={cols}
                rows={1_000}
                experimental={{
                    hyperWrapping: p.hyperWrapping,
                }}
            />
        </BeautifulWrapper>
    );
};
(WrappingText as any).args = {
    alignment: "left",
    length: 20,
    hyperWrapping: false,
};
(WrappingText as any).argTypes = {
    alignment: {
        control: { type: "select", options: ["left", "center", "right"] },
    },
    length: {
        control: {
            type: "range",
            min: 2,
            max: 200,
        },
    },
};
(WrappingText as any).parameters = {
    options: {
        showPanel: true,
    },
};

export const UnevenRows: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="Uneven Rows"
            description={
                <Description>
                    Rows can be made uneven by passing a callback to the <PropName>rowHeight</PropName> prop
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                rowHeight={r => (r % 3 === 0 ? 30 : r % 2 ? 50 : 60)}
                getCellContent={getCellContent}
                columns={cols}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(UnevenRows as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const DrawCustomCells: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="Draw custom cells"
            description={
                <Description>
                    You can draw custom cell contents however you want using the <PropName>drawCustomCell</PropName>{" "}
                    prop
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                drawCustomCell={(ctx, cell, _theme, rect) => {
                    if (cell.kind !== GridCellKind.Text) return false;

                    const hasX = cell.displayData.toLowerCase().includes("x"); // all my x's live in texas

                    ctx.save();
                    const { x, y, width, height } = rect;
                    const data = cell.displayData;

                    ctx.fillStyle = hasX ? "#bfffcd" : "#ffe6e6";
                    ctx.fillRect(x + 1, y + 1, width - 1, height - 1);

                    ctx.fillStyle = hasX ? "#0fc035" : "#e01e1e";
                    ctx.font = "bold 14px sans-serif";
                    ctx.fillText(data, x + 8 + 0.5, y + height / 2 + 4.5);
                    ctx.restore();

                    return true;
                }}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(DrawCustomCells as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const RearrangeColumns: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(60);

    // This is a dirty hack because the mock generator doesn't really support changing this. In a real data source
    // you should track indexes properly
    const [sortableCols, setSortableCols] = React.useState(cols);

    const onColMoved = React.useCallback((startIndex: number, endIndex: number): void => {
        setSortableCols(old => {
            const newCols = [...old];
            const [toMove] = newCols.splice(startIndex, 1);
            newCols.splice(endIndex, 0, toMove);
            return newCols;
        });
    }, []);

    const getCellContentMangled = React.useCallback(
        ([col, row]: Item): GridCell => {
            const remappedCol = cols.findIndex(c => c.title === sortableCols[col].title);
            return getCellContent([remappedCol, row]);
        },
        [cols, getCellContent, sortableCols]
    );

    return (
        <BeautifulWrapper
            title="Rearrange Columns"
            description={
                <Description>
                    Columns can be rearranged by drag and dropping, as long as you respond to the{" "}
                    <PropName>onColumnMoved</PropName> callback.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                freezeColumns={1}
                rowMarkers="both"
                getCellContent={getCellContentMangled}
                getCellsForSelection={getCellsForSelection}
                columns={sortableCols}
                onColumnMoved={onColMoved}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(RearrangeColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};

interface RowAndHeaderSizesProps {
    rowHeight: number;
    headerHeight: number;
}
export const RowAndHeaderSizes: React.VFC<RowAndHeaderSizesProps> = p => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="Row and Header sizes"
            description={
                <>
                    <Description>
                        The row size can be controlled with <PropName>rowHeight</PropName> and the header size with{" "}
                        <PropName>headerHeight</PropName>.
                    </Description>
                    <MoreInfo>Use the story&apos;s controls to resize them</MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                rowHeight={p.rowHeight}
                headerHeight={p.headerHeight}
                getCellsForSelection={getCellsForSelection}
                rowMarkers={"number"}
                getCellContent={getCellContent}
                columns={cols}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(RowAndHeaderSizes as any).args = {
    rowHeight: 34,
    headerHeight: 34,
};
(RowAndHeaderSizes as any).argTypes = {
    rowHeight: {
        control: {
            type: "range",
            min: 20,
            max: 200,
        },
    },
    headerHeight: {
        control: {
            type: "range",
            min: 20,
            max: 200,
        },
    },
};
(RowAndHeaderSizes as any).parameters = {
    options: {
        showPanel: true,
    },
};

const KeyName = styled.kbd`
    background-color: #f4f4f4;
    color: #2b2b2b;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px #00000040;
    margin: 0 0.1em;
`;

export const MultiSelectColumns: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(100);

    return (
        <BeautifulWrapper
            title="Multi select columns"
            description={
                <>
                    <Description>
                        You can select multiple columns by using the <PropName>selectedColumns</PropName> and{" "}
                        <PropName>onSelectedColumnsChange</PropName> props
                    </Description>
                    <MoreInfo>
                        Here you can multi select columns by using <KeyName>Ctrl</KeyName> (on Windows) or{" "}
                        <KeyName>⌘</KeyName> (on Mac)
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                rowMarkers="both"
                columns={cols}
                rows={100_000}
            />
        </BeautifulWrapper>
    );
};
(MultiSelectColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};

function getColumnsForCellTypes(): GridColumnWithMockingInfo[] {
    return [
        {
            title: "Row ID",
            width: 120,
            icon: GridColumnIcon.HeaderRowID,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.RowID,
                    data: faker.datatype.uuid(),
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Protected",
            width: 120,
            icon: GridColumnIcon.HeaderCode,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Protected,
                    data: faker.finance.bitcoinAddress(),
                    allowOverlay: false,
                };
            },
        },
        {
            title: "Loading",
            width: 120,
            icon: GridColumnIcon.HeaderString,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Loading,
                    allowOverlay: false,
                };
            },
        },
        {
            title: "Text",
            width: 120,
            icon: GridColumnIcon.HeaderCode,
            hasMenu: false,
            getContent: () => {
                const name = faker.name.firstName();
                return {
                    kind: GridCellKind.Text,
                    data: name,
                    displayData: name,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Number",
            width: 120,
            icon: GridColumnIcon.HeaderNumber,
            hasMenu: false,
            getContent: () => {
                const age = faker.datatype.number(100);
                return {
                    kind: GridCellKind.Number,
                    data: age,
                    displayData: `${age}`,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Boolean",
            width: 120,
            icon: GridColumnIcon.HeaderBoolean,
            hasMenu: false,
            getContent: () => {
                const roll = Math.random();
                const checked = roll < 0.1 ? undefined : roll < 0.2 ? null : roll < 0.6;
                // TODO: Make editable. UX looks bad by default.
                return {
                    kind: GridCellKind.Boolean,
                    data: checked,
                    allowOverlay: false,
                    readonly: false,
                };
            },
        },
        {
            title: "Image",
            width: 120,
            icon: GridColumnIcon.HeaderImage,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Image,
                    data: [`${faker.image.animals(40, 40)}?random=${faker.datatype.number(100000)}`],
                    allowOverlay: true,
                    allowAdd: false,
                    readonly: true,
                };
            },
        },
        {
            title: "Uri",
            width: 120,
            icon: GridColumnIcon.HeaderUri,
            hasMenu: false,
            getContent: () => {
                const url = faker.internet.url();
                return {
                    kind: GridCellKind.Uri,
                    data: url,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Markdown",
            width: 120,
            icon: GridColumnIcon.HeaderMarkdown,
            hasMenu: false,
            getContent: () => {
                const markdown = `# Title
Hello my name is *${faker.name.firstName()}*

## TODO:
Try out [Glide](https://www.glideapps.com/)
`;
                return {
                    kind: GridCellKind.Markdown,
                    data: markdown,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Bubble",
            width: 120,
            icon: GridColumnIcon.HeaderArray,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Bubble,
                    data: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Drilldown",
            width: 120,
            icon: GridColumnIcon.HeaderArray,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Drilldown,
                    data: [
                        {
                            text: faker.address.cityName(),
                            img: `${faker.image.nature(40, 40)}?random=${faker.datatype.number(100000)}`,
                        },
                        {
                            text: faker.address.cityName(),
                            img: `${faker.image.nature(40, 40)}?random=${faker.datatype.number(100000)}`,
                        },
                    ],
                    allowOverlay: true,
                };
            },
        },
    ];
}

function useAllMockedKinds() {
    const cache = React.useRef<ContentCache>(new ContentCache());

    const [colsMap, setColsMap] = React.useState(getColumnsForCellTypes);

    const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
        setColsMap(prevColsMap => {
            const index = prevColsMap.findIndex(ci => ci.title === column.title);
            const newArray = [...prevColsMap];
            newArray.splice(index, 1, {
                ...prevColsMap[index],
                width: newSize,
            });
            return newArray;
        });
    }, []);

    const cols = React.useMemo(() => {
        return colsMap.map(getGridColumn);
    }, [colsMap]);

    const [updateVersion, setUpdateVersion] = React.useState(0);
    const getCellContent = React.useCallback(
        ([col, row]: Item): GridCell => {
            // Terrible hack to force update when setCellValue requests it
            noop(updateVersion);
            let val = cache.current.get(col, row);
            if (val === undefined) {
                val = colsMap[col].getContent();
                cache.current.set(col, row, val);
            }

            return val;
        },
        [colsMap, updateVersion]
    );

    const setCellValue = React.useCallback(
        ([col, row]: Item, val: GridCell, noDisplay?: boolean, forceUpdate?: boolean): void => {
            let current = cache.current.get(col, row);
            if (current === undefined) {
                current = colsMap[col].getContent();
            }
            if (isEditableGridCell(val) && isEditableGridCell(current)) {
                const copied = lossyCopyData(val, current);
                cache.current.set(col, row, {
                    ...copied,
                    displayData: noDisplay === true ? undefined : copied.data?.toString() ?? "",
                } as any);

                if (forceUpdate === true) {
                    setUpdateVersion(v => v + 1);
                }
            }
        },
        [colsMap]
    );

    return { cols, getCellContent, onColumnResize, setCellValue };
}

export const AllCellKinds: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    return (
        <BeautifulWrapper
            title="Lotsa cell kinds"
            description={
                <Description>
                    Data grid supports plenty cell kinds. Anything under <PropName>GridCellKind</PropName>.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                highlightRegions={[
                    {
                        color: "#ff00ff33",
                        range: {
                            x: 1,
                            y: 1,
                            width: 3,
                            height: 3,
                        },
                    },
                ]}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(AllCellKinds as any).parameters = {
    options: {
        showPanel: false,
    },
};

const darkTheme = {
    accentColor: "#8c96ff",
    accentLight: "rgba(202, 206, 255, 0.253)",

    textDark: "#ffffff",
    textMedium: "#b8b8b8",
    textLight: "#a0a0a0",
    textBubble: "#ffffff",

    bgIconHeader: "#b8b8b8",
    fgIconHeader: "#000000",
    textHeader: "#a1a1a1",
    textHeaderSelected: "#000000",

    bgCell: "#16161b",
    bgCellMedium: "#202027",
    bgHeader: "#212121",
    bgHeaderHasFocus: "#474747",
    bgHeaderHovered: "#404040",

    bgBubble: "#212121",
    bgBubbleSelected: "#000000",

    bgSearchResult: "#423c24",

    borderColor: "rgba(225,225,225,0.2)",
    drilldownBorder: "rgba(225,225,225,0.4)",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

const hotdogStand = {
    accentColor: "#8c96ff",
    accentLight: "rgba(202, 206, 255, 0.253)",

    textDark: "#ffffff",
    textMedium: "rgba(255, 255, 255, 0.9)",
    textLight: "rgba(255, 255, 255, 0.7)",
    textBubble: "#000000",

    bgIconHeader: "#880000",
    fgIconHeader: "#ff5555",
    textHeader: "rgba(0, 0, 0, 0.9)",
    textHeaderSelected: "#000000",

    bgCell: "#ff0000",
    bgCellMedium: "#ff4d4d",
    bgHeader: "#f3f300",
    bgHeaderHasFocus: "#eeee00",
    bgHeaderHovered: "#e0e000",

    bgBubble: "#ffff00",
    bgBubbleSelected: "#ffff00",

    bgSearchResult: "#423c24",

    borderColor: "#ffff00",
    drilldownBorder: "#ffff00",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

export const ThemeSupport: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [theme, setTheme] = React.useState({});

    const [numRows, setNumRows] = React.useState(1000);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        setNumRows(cv => cv + 1);
        for (let c = 0; c < 6; c++) {
            setCellValue([c, newRow], {
                displayData: "",
                data: "",
            } as any);
        }
    }, [numRows, setCellValue]);

    return (
        <ThemeProvider theme={theme}>
            <BeautifulWrapper
                title="Theme support"
                description={
                    <>
                        <Description>
                            DataGrid respects the theme provided by styled-components theme provider.
                        </Description>
                        <MoreInfo>
                            <button onClick={() => setTheme({})}>Light</button> or{" "}
                            <button onClick={() => setTheme(darkTheme)}>Dark</button> even{" "}
                            <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>
                        </MoreInfo>
                    </>
                }>
                <DataEditor
                    {...defaultProps}
                    getCellContent={getCellContent}
                    columns={cols}
                    onRowAppended={onRowAppended}
                    trailingRowOptions={{
                        tint: true,
                        sticky: true,
                    }}
                    onCellEdited={setCellValue}
                    onColumnResize={onColumnResize}
                    rows={numRows}
                />
            </BeautifulWrapper>
        </ThemeProvider>
    );
};
(ThemeSupport as any).parameters = {
    options: {
        showPanel: false,
    },
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
        <BeautifulWrapper
            title="Theme per column"
            description={
                <>
                    <Description>Each column can provide theme overrides for rendering that column.</Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={realCols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(ThemePerColumn as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const ThemePerRow: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue, getCellsForSelection } = useMockDataGenerator(5);

    return (
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
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                trailingRowOptions={{
                    sticky: true,
                    tint: true,
                }}
                onRowAppended={() => undefined}
                getCellsForSelection={getCellsForSelection}
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
        </BeautifulWrapper>
    );
};
(ThemePerRow as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const CellActivatedEvent: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [lastActivated, setLastActivated] = React.useState<Item | undefined>(undefined);

    const onCellActivated = React.useCallback((cell: Item) => {
        setLastActivated(cell);
    }, []);

    return (
        <BeautifulWrapper
            title="Cell Activated event"
            description={
                <>
                    <Description>
                        When you tap <KeyName>Enter</KeyName>, <KeyName>Space</KeyName> or double click a cell, that
                        cell is activated. You can track this with <PropName>onCellActivated</PropName>.
                    </Description>
                    <MoreInfo>
                        Last activated cell:{" "}
                        {lastActivated === undefined ? "none" : `(${lastActivated[0]}, ${lastActivated[1]})`}
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                getCellsForSelection={true}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                onCellActivated={onCellActivated}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(CellActivatedEvent as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const BuiltInSearch: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [showSearch, setShowSearch] = React.useState(false);

    useEventListener(
        "keydown",
        React.useCallback(event => {
            if ((event.ctrlKey || event.metaKey) && event.key === "f") {
                setShowSearch(cv => !cv);
                event.stopPropagation();
                event.preventDefault();
            }
        }, []),
        window,
        false,
        true
    );

    return (
        <BeautifulWrapper
            title="Search is easy"
            description={
                <>
                    <Description>
                        Search for any data in your grid by setting <PropName>showSearch</PropName>.
                    </Description>
                    <MoreInfo>
                        In this story, <KeyName>Ctrl</KeyName> (<KeyName>⌘</KeyName> on Mac) + <KeyName>f</KeyName>{" "}
                        toggles the search bar. Make sure you&apos;re focused on the Data Grid!
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                getCellsForSelection={true}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                showSearch={showSearch}
                onSearchClose={() => setShowSearch(false)}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(BuiltInSearch as any).parameters = {
    options: {
        showPanel: false,
    },
};

interface ImperativeScrollProps {
    paddingY: number;
}

export const ImperativeScroll: React.VFC<ImperativeScrollProps> = p => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const ref = React.useRef<DataEditorRef>(null);

    const onClick = () => {
        ref.current?.scrollTo(4, 100, "both", 0, p.paddingY);
    };

    return (
        <BeautifulWrapper
            title="Imperative scrolling"
            description={
                <>
                    <Description>
                        You can imperatively scroll to a cell by calling <PropName>scrollTo</PropName> on a DataEditor
                        ref.
                    </Description>
                    <MoreInfo>
                        Click <button onClick={onClick}>Here</button> to scroll to column 4 row 100
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                ref={ref}
                rowMarkers="number"
                getCellContent={getCellContent}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(ImperativeScroll as any).args = {
    paddingY: 0,
};
(ImperativeScroll as any).parameters = {
    options: {
        showPanel: true,
    },
};

const SimpleMenu = styled.div`
    width: 175px;
    padding: 8px 0;
    border-radius: 6px;
    box-shadow: 0px 0px 1px rgba(62, 65, 86, 0.7), 0px 6px 12px rgba(62, 65, 86, 0.35);

    display: flex;
    flex-direction: column;

    background-color: white;
    font-size: 13px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;

    .danger {
        color: rgba(255, 40, 40, 0.8);
        :hover {
            color: rgba(255, 40, 40, 1);
        }
    }

    > div {
        padding: 6px 8px;
        color: rgba(0, 0, 0, 0.7);
        :hover {
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0, 0, 0, 0.9);
        }
        transition: background-color 100ms;
        cursor: pointer;
    }
`;

export const HeaderMenus: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const realCols = React.useMemo(() => {
        return cols.map(c => ({
            ...c,
            hasMenu: true,
        }));
    }, [cols]);

    const [menu, setMenu] = React.useState<{
        col: number;
        bounds: Rectangle;
    }>();

    const isOpen = menu !== undefined;

    const { layerProps, renderLayer } = useLayer({
        isOpen,
        auto: true,
        placement: "bottom-end",
        triggerOffset: 2,
        onOutsideClick: () => setMenu(undefined),
        trigger: {
            getBounds: () => ({
                left: menu?.bounds.x ?? 0,
                top: menu?.bounds.y ?? 0,
                width: menu?.bounds.width ?? 0,
                height: menu?.bounds.height ?? 0,
                right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
                bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0),
            }),
        },
    });

    const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
        setMenu({ col, bounds });
    }, []);

    const onHeaderClicked = React.useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("Header clicked");
    }, []);

    return (
        <BeautifulWrapper
            title="Header menus"
            description={
                <>
                    <Description>
                        Headers on the data grid can be configured to support menus. We provide the events and the
                        triangle, you provide the menu.
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                onHeaderMenuClick={onHeaderMenuClick}
                onHeaderClicked={onHeaderClicked}
                columns={realCols}
                onCellContextMenu={(_, e) => e.preventDefault()}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={1_000}
            />
            {isOpen &&
                renderLayer(
                    <SimpleMenu {...layerProps}>
                        <div onClick={() => setMenu(undefined)}>These do nothing</div>
                        <div onClick={() => setMenu(undefined)}>Add column right</div>
                        <div onClick={() => setMenu(undefined)}>Add column left</div>
                        <div className="danger" onClick={() => setMenu(undefined)}>
                            Delete
                        </div>
                    </SimpleMenu>
                )}
        </BeautifulWrapper>
    );
};
(HeaderMenus as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const CustomHeaderIcons: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const realCols = React.useMemo(() => {
        const c = [...cols];
        c[3] = {
            ...c[3],
            title: "CUSTOM ICON",
            icon: "custom",
            width: 200,
        };
        return c;
    }, [cols]);

    const headerIcons = React.useMemo<SpriteMap>(() => {
        return {
            custom: p => `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.00015" y="2" width="16" height="16" rx="4" fill="${p.bgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z" fill="${p.fgColor}"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z" fill="${p.fgColor}"/>
                <path d="M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z" fill="${p.fgColor}"/>
                <path d="M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z" fill="${p.fgColor}"/>
            </svg>`,
        };
    }, []);

    return (
        <BeautifulWrapper
            title="Custom header icons"
            description={
                <>
                    <Description>
                        You can provide overrides for the default icons by passing the <PropName>headerIcons</PropName>{" "}
                        prop.
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={realCols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                headerIcons={headerIcons}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(CustomHeaderIcons as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const RightElement: React.VFC = () => {
    const { cols, getCellContent, setCellValue, getCellsForSelection } = useMockDataGenerator(12, false);

    const [numRows, setNumRows] = React.useState(30);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;
        setNumRows(cv => cv + 1);
        for (let c = 0; c < 6; c++) {
            setCellValue([c, newRow], {
                displayData: "",
                data: "",
            } as any);
        }
    }, [numRows, setCellValue]);

    return (
        <BeautifulWrapper
            title="Right Element"
            description={
                <Description>
                    A DOM element may be added as a trailer to the grid by using the <PropName>rightElement</PropName>{" "}
                    prop.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                getCellsForSelection={getCellsForSelection}
                rowMarkers={"both"}
                onCellEdited={setCellValue}
                trailingRowOptions={{
                    hint: "New row...",
                    sticky: true,
                    tint: true,
                }}
                rows={numRows}
                onRowAppended={onRowAppended}
                rightElementSticky={true}
                rightElement={
                    <div
                        style={{
                            height: "100%",
                            padding: "20px 20px 40px 20px",
                            width: 200,
                            color: "black",
                            whiteSpace: "pre-wrap",
                            backgroundColor: "rgba(240, 240, 250, 0.2)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
                            backdropFilter: "blur(12px)",
                        }}>
                        This is a real DOM element. You can put whatever you want here. You can also size it as big as
                        you want. {"\n\n"}It also does not have to be sticky.
                    </div>
                }
            />
        </BeautifulWrapper>
    );
};
(RightElement as any).parameters = {
    options: {
        showPanel: false,
    },
};

let num: number = 1;
function rand(): number {
    return (num = (num * 16807) % 2147483647);
}

export const RapidUpdates: React.VFC = () => {
    const { cols, getCellContent, setCellValueRaw, getCellsForSelection } = useMockDataGenerator(100);

    const ref = React.useRef<DataEditorRef>(null);

    const countRef = React.useRef(0);
    const displayCountRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        let rafID = 0;

        const sendUpdate = () => {
            const cells: {
                cell: Item;
            }[] = [];
            const now = performance.now();
            for (let x = 0; x < 5_000; x++) {
                const col = Math.max(10, rand() % 100);
                const row = rand() % 10_000;

                setCellValueRaw([col, row], {
                    kind: GridCellKind.Text,
                    data: x.toString(),
                    displayData: `${x}k`,
                    themeOverride:
                        x % 5 !== 0
                            ? {
                                  bgCell: "#f2fff4",
                                  textDark: "#00d41c",
                              }
                            : {
                                  bgCell: "#fff6f6",
                                  textDark: "#d40000",
                              },
                    allowOverlay: true,
                    lastUpdated: now,
                });
                cells.push({ cell: [col, row] });
            }
            countRef.current += 5_000;
            if (displayCountRef.current !== null) {
                displayCountRef.current.textContent = `${countRef.current}`;
            }

            ref.current?.updateCells(cells);

            rafID = window.requestAnimationFrame(sendUpdate);
        };

        sendUpdate();

        return () => {
            cancelAnimationFrame(rafID);
        };
    }, [setCellValueRaw]);

    return (
        <BeautifulWrapper
            title="Rapid updating"
            description={
                <>
                    <Description>
                        Data grid can support many thousands of updates per seconds. The data grid can easily update
                        data faster than a human can read it, more importantly the faster the data grid can update, the
                        more time your code can spend doing more valuable work.
                    </Description>
                    <MoreInfo>
                        Updates processed: <KeyName ref={displayCountRef} /> We could do this faster but we wrote a
                        really crappy data store for this demo which is actually slowing down the data grid.
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                ref={ref}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                rows={10_000}
            />
        </BeautifulWrapper>
    );
};
(RapidUpdates as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const CopySupport: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue, getCellsForSelection } = useMockDataGenerator(
        10,
        false
    );

    return (
        <BeautifulWrapper
            title="Copy support"
            description={
                <>
                    <Description>
                        Large amounts of data can be copied and customized using{" "}
                        <PropName>getCellsForSelection</PropName>.
                    </Description>
                    <MoreInfo>The data is copied into a format ready to be pasted into Excel or Google Sheets</MoreInfo>
                    <textarea
                        placeholder="Copy something below and paste it here..."
                        style={{ width: "100%", marginBottom: 20, borderRadius: 9, minHeight: 200, padding: 10 }}
                    />
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                rowMarkers="both"
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={400}
            />
        </BeautifulWrapper>
    );
};
(CopySupport as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const PasteSupport: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue, getCellsForSelection } = useMockDataGenerator(
        50,
        false
    );

    return (
        <BeautifulWrapper
            title="Paste support"
            description={
                <>
                    <Description>
                        The data grid can handle paste automatically by returning true from <PropName>onPaste</PropName>
                        . You can also return false and handle paste yourself. If paste is undefined the DataEditor will
                        do its best to paste to the current cell.
                    </Description>
                    <MoreInfo>
                        Paste supports the copy format of Google Sheets and Excel. Below is an example of data copied
                        from excel with some escaped text.
                    </MoreInfo>
                    <textarea
                        value={`Sunday	Dogs	https://google.com
Monday	Cats	https://google.com
Tuesday	Turtles	https://google.com
Wednesday	Bears	https://google.com
Thursday	"L  ions"	https://google.com
Friday	Pigs	https://google.com
Saturday	"Turkeys and some ""quotes"" and
a new line char ""more quotes"" plus a tab  ."	https://google.com`}
                        style={{ width: "100%", marginBottom: 20, borderRadius: 9, minHeight: 200, padding: 10 }}
                    />
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                rowMarkers="both"
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                onPaste={true}
                rows={400}
            />
        </BeautifulWrapper>
    );
};
(PasteSupport as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const FreezeColumns: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(100);

    return (
        <BeautifulWrapper
            title="Freeze columns"
            description={
                <Description>
                    Columns at the start of your grid can be frozen in place by settings{" "}
                    <PropName>freezeColumns</PropName> to a number greater than 0.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                rowMarkers="both"
                freezeColumns={1}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                verticalBorder={c => c > 0}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(FreezeColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const ReorderRows: React.VFC = () => {
    const cols = React.useMemo<GridColumn[]>(
        () => [
            {
                title: "Col A",
                width: 150,
            },
            {
                title: "Col B",
                width: 150,
            },
        ],
        []
    );

    const [rowData, setRowData] = React.useState(() => {
        return range(0, 50).map(x => [`A: ${x}`, `B: ${x}`]);
    });

    const getCellContent = React.useCallback<DataEditorProps["getCellContent"]>(
        ([col, row]) => {
            return {
                kind: GridCellKind.Text,
                allowOverlay: false,
                data: rowData[row][col],
                displayData: rowData[row][col],
            };
        },
        [rowData]
    );

    const reorderRows = React.useCallback((from: number, to: number) => {
        setRowData(cv => {
            const d = [...cv];
            const removed = d.splice(from, 1);
            d.splice(to, 0, ...removed);
            return d;
        });
    }, []);

    return (
        <BeautifulWrapper
            title="Reorder Rows"
            description={
                <>
                    <Description>
                        Rows can be re-arranged by using the <PropName>onRowMoved</PropName> callback. When set the
                        first row can be used to drag and drop.
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                rowMarkers={"both"}
                onRowMoved={reorderRows}
                getCellContent={getCellContent}
                columns={cols}
                rows={50}
            />
        </BeautifulWrapper>
    );
};
(ReorderRows as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const ColumnGroups: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(20, true, true);

    return (
        <BeautifulWrapper
            title="Column Grouping"
            description={
                <Description>
                    Columns in the data grid may be grouped by setting their <PropName>group</PropName> property.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                onGroupHeaderRenamed={(x, y) => window.alert(`Please rename group ${x} to ${y}`)}
                columns={cols}
                getCellsForSelection={getCellsForSelection}
                rows={1000}
                getGroupDetails={g => ({
                    name: g,
                    icon: g === "" ? undefined : GridColumnIcon.HeaderCode,
                })}
                rowMarkers="both"
            />
        </BeautifulWrapper>
    );
};
(ColumnGroups as any).parameters = {
    options: {
        showPanel: false,
    },
};

function useCollapsableColumnGroups(cols: readonly GridColumn[]) {
    const [collapsed, setCollapsed] = React.useState<readonly string[]>([]);

    const onGroupHeaderClicked = React.useCallback(
        (colIndex: number, args: GroupHeaderClickedEventArgs) => {
            const group = cols[colIndex].group ?? "";
            setCollapsed(cv => (cv.includes(group) ? cv.filter(g => g !== group) : [...cv, group]));
            args.preventDefault();
        },
        [cols]
    );

    const [selectedColumns, setSelectedColumns] = React.useState<CompactSelection>(CompactSelection.empty());

    const setCols = React.useCallback((newVal: CompactSelection, trigger: string) => {
        if (trigger === "group") return;

        setSelectedColumns(newVal);
    }, []);

    const columns = React.useMemo(() => {
        return cols.map(c => {
            if (!collapsed.includes(c.group ?? ""))
                return {
                    ...c,
                    hasMenu: true,
                };
            return {
                ...c,
                width: 8,
                hasMenu: true,
            };
        });
    }, [collapsed, cols]);

    return {
        columns,
        onGroupHeaderClicked,
        selectedColumns,
        onSelectedColumnsChange: setCols,
    };
}

export const ColumnGroupCollapse: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100, true, true);

    const groupHeaderArgs = useCollapsableColumnGroups(cols);

    return (
        <BeautifulWrapper
            title="Group collapse"
            description={
                <>
                    <Description>
                        Through clever usage of <PropName>onGroupHeaderClicked</PropName> you can implement group
                        collapsing. This is a very basic version however it is possible to go much further.
                    </Description>
                    <MoreInfo>Cells under a certain size will not attempt to render to save some frames.</MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                {...groupHeaderArgs}
                getCellContent={getCellContent}
                groupHeaderHeight={24}
                rows={1000}
                rowMarkers="both"
            />
        </BeautifulWrapper>
    );
};
(ColumnGroupCollapse as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const Minimap: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    return (
        <BeautifulWrapper
            title="Minimap"
            description={
                <Description>
                    A minimap can be enabled by setting the <PropName>showMinimap</PropName> property.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                showMinimap={true}
                rows={3000}
                rowMarkers="both"
            />
        </BeautifulWrapper>
    );
};
(Minimap as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const ContentAlignment: React.VFC = () => {
    const { cols, getCellContent } = useAllMockedKinds();

    const mangledGetCellContent = React.useCallback<typeof getCellContent>(
        cell => {
            const [col, _row] = cell;
            if (col === 3) {
                return {
                    ...getCellContent(cell),
                    contentAlign: "center",
                };
            }
            if (col === 4) {
                return {
                    ...getCellContent(cell),
                    contentAlign: "right",
                };
            }
            return getCellContent(cell);
        },
        [getCellContent]
    );

    return (
        <BeautifulWrapper
            title="Content Alignment"
            description={
                <Description>
                    You can customize the content alignment by setting <PropName>contentAlign</PropName> of a cell to{" "}
                    <PropName>left</PropName>, <PropName>right</PropName> or <PropName>center</PropName>.
                </Description>
            }>
            <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} columns={cols} rows={300} />
        </BeautifulWrapper>
    );
};

export const SpanCell: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100, true, true);

    const mangledGetCellContent = React.useCallback<typeof getCellContent>(
        cell => {
            const [col, row] = cell;
            if (row === 6 && col >= 3 && col <= 4) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: false,
                    data: "Span Cell that is very long and will go past the cell limits",
                    span: [3, 4],
                    displayData: "Span Cell that is very long and will go past the cell limits",
                };
            }
            if (row === 5) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: false,
                    data: "Span Cell that is very long and will go past the cell limits",
                    span: [0, 99],
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
        <BeautifulWrapper
            title="Spans"
            description={
                <Description>
                    By setting the <PropName>span</PropName> of a cell you can create spans in your grid. All cells
                    within a span must return consistent data for defined behavior.
                    <MoreInfo>
                        Spans will always be split if they span frozen and non-frozen columns. By default selections are
                        always expanded to include a span. This can be disabled using the{" "}
                        <PropName>spanRangeBehavior</PropName> prop.
                    </MoreInfo>
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={mangledGetCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                freezeColumns={2}
                rows={300}
                rowMarkers="both"
            />
        </BeautifulWrapper>
    );
};
(SpanCell as any).parameters = {
    options: {
        showPanel: false,
    },
};

const zeroBounds = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
};

export const Tooltips: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(6);

    const [tooltip, setTooltip] = React.useState<{ val: string; bounds: IBounds } | undefined>();

    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
        if (args.kind === "cell") {
            setTooltip({
                val: `Tooltip for ${args.location[0]}, ${args.location[1]}`,
                bounds: {
                    // translate to react-laag types
                    left: args.bounds.x,
                    top: args.bounds.y,
                    width: args.bounds.width,
                    height: args.bounds.height,
                    right: args.bounds.x + args.bounds.width,
                    bottom: args.bounds.y + args.bounds.height,
                },
            });
        } else {
            setTooltip(undefined);
        }
    }, []);

    const isOpen = tooltip !== undefined;
    const { renderLayer, layerProps } = useLayer({
        isOpen,
        triggerOffset: 4,
        auto: true,
        container: "portal",
        trigger: {
            getBounds: () => tooltip?.bounds ?? zeroBounds,
        },
    });

    return (
        <>
            <BeautifulWrapper
                title="Tooltips"
                className="double"
                description={
                    <Description>
                        Using the <PropName>onItemHovered</PropName> event makes it easy to create tooltips. This story
                        is intentionally forced to scroll vertically so layout in scrolling documents can be confirmed.
                    </Description>
                }>
                <DataEditor
                    {...defaultProps}
                    onItemHovered={onItemHovered}
                    getCellContent={getCellContent}
                    columns={cols}
                    rows={1_000}
                />
            </BeautifulWrapper>
            {isOpen &&
                renderLayer(
                    <div
                        {...layerProps}
                        style={{
                            ...layerProps.style,
                            padding: "8px 12px",
                            color: "white",
                            font: "500 13px Inter",
                            backgroundColor: "rgba(0, 0, 0, 0.85)",
                            borderRadius: 9,
                        }}>
                        {tooltip.val}
                    </div>
                )}
        </>
    );
};
(Tooltips as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const CustomHeader: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    const drawHeader: DrawHeaderCallback = React.useCallback(args => {
        const { ctx, rect } = args;
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        const lg = ctx.createLinearGradient(0, rect.y, 0, rect.y + rect.height);
        lg.addColorStop(0, "#ff00d934");
        lg.addColorStop(1, "#00a2ff34");
        ctx.fillStyle = lg;
        ctx.fill();
        return false;
    }, []);

    return (
        <BeautifulWrapper title="Custom Header" description={<Description>Make it as fancy as you like.</Description>}>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                drawHeader={drawHeader}
                rows={3000}
                rowMarkers="both"
            />
        </BeautifulWrapper>
    );
};
(CustomHeader as any).parameters = {
    options: {
        showPanel: false,
    },
};

interface PaddingProps {
    paddingRight: number;
    paddingBottom: number;
}

export const Padding: React.VFC<PaddingProps> = p => {
    const { paddingRight, paddingBottom } = p;
    const { cols, getCellContent } = useMockDataGenerator(20);

    return (
        <BeautifulWrapper
            title="Padding"
            description={
                <>
                    <Description>
                        You can add padding at the ends of the grid by setting the <PropName>paddingRight</PropName> and{" "}
                        <PropName>paddingBottom</PropName> props
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                experimental={{ paddingRight, paddingBottom }}
                rows={50}
            />
        </BeautifulWrapper>
    );
};
(Padding as any).argTypes = {
    paddingRight: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
    paddingBottom: {
        control: {
            type: "range",
            min: 0,
            max: 600,
        },
    },
};
(Padding as any).args = {
    paddingRight: 200,
    paddingBottom: 200,
};
(Padding as any).parameters = {
    options: {
        showPanel: true,
    },
};

export const HighlightCells: React.VFC = () => {
    const { cols, getCellContent, getCellsForSelection } = useMockDataGenerator(100);

    const [gridSelection, setGridSelection] = React.useState<GridSelection>({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const highlights = React.useMemo<DataEditorProps["highlightRegions"]>(() => {
        if (gridSelection.current === undefined) return undefined;
        const [col, row] = gridSelection.current.cell;
        return [
            {
                color: "#44BB0022",
                range: {
                    x: col + 2,
                    y: row,
                    width: 10,
                    height: 10,
                },
                style: "solid",
            },
            {
                color: "#b000b021",
                range: {
                    x: col,
                    y: row + 2,
                    width: 1,
                    height: 1,
                },
            },
        ];
    }, [gridSelection]);

    return (
        <BeautifulWrapper
            title="HighlightCells"
            description={
                <Description>
                    The <PropName>highlightRegions</PropName> prop can be set to provide additional hinting or context
                    for the current selection.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                rowMarkers="both"
                freezeColumns={1}
                highlightRegions={highlights}
                gridSelection={gridSelection}
                onGridSelectionChange={setGridSelection}
                getCellContent={getCellContent}
                getCellsForSelection={getCellsForSelection}
                columns={cols}
                verticalBorder={c => c > 0}
                rows={1_000}
            />
        </BeautifulWrapper>
    );
};
(HighlightCells as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const LayoutIntegration: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(1000, true, true);

    return (
        <BeautifulStyle>
            <h1>Layout Integration</h1>
            <Description>Trying the grid in different situations</Description>
            <DataEditor
                {...defaultProps}
                className="white"
                getCellContent={getCellContent}
                columns={cols}
                rows={10}
                rowMarkers="both"
                height={200}
            />
            <DataEditor
                {...defaultProps}
                className="white"
                getCellContent={getCellContent}
                columns={cols}
                rows={10}
                rowMarkers="both"
            />
            <div style={{ display: "flex", height: "300px" }}>
                <DataEditor
                    {...defaultProps}
                    className="white"
                    getCellContent={getCellContent}
                    columns={cols}
                    rows={10}
                    rowMarkers="both"
                />
                <div style={{ flexShrink: 0 }}>This is some text what happens here?</div>
            </div>
        </BeautifulStyle>
    );
};
(LayoutIntegration as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const PreventDiagonalScroll: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(200);

    return (
        <BeautifulWrapper
            title="Prevent Diagonal Scroll"
            description={
                <>
                    <Description>
                        Diagonal scrolling can be prevented by setting <PropName>preventDiagonalScrolling</PropName>.
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                preventDiagonalScrolling={true}
                rows={5000}
            />
        </BeautifulWrapper>
    );
};
(PreventDiagonalScroll as any).parameters = {
    options: {
        showPanel: false,
    },
};

// A few supported mime types for drag and drop into cells.
const SUPPORTED_IMAGE_TYPES = ["image/png", "image/gif", "image/bmp", "image/jpeg"];

export const DropEvents: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const [highlights, setHighlights] = React.useState<DataEditorProps["highlightRegions"]>([]);

    const [lastDropCell, setLastDropCell] = React.useState<Item | undefined>();

    const onDrop = React.useCallback(
        (cell: Item, dataTransfer: DataTransfer | null) => {
            setHighlights([]);

            if (dataTransfer === null) {
                return;
            }

            const { files } = dataTransfer;
            // This only supports one image, for simplicity.
            if (files.length !== 1) {
                return;
            }

            const [file] = files;
            if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
                return;
            }

            const imgUrl = URL.createObjectURL(file);

            setCellValue(
                cell,
                {
                    kind: GridCellKind.Image,
                    data: [imgUrl],
                    allowOverlay: true,
                    allowAdd: false,
                },
                true,
                true
            );

            setLastDropCell(cell);
        },
        [setCellValue]
    );

    const onDragOverCell = React.useCallback(
        (cell: Item, dataTransfer: DataTransfer | null) => {
            if (dataTransfer === null) {
                return;
            }

            const { items } = dataTransfer;
            // This only supports one image, for simplicity.
            if (items.length !== 1) {
                return;
            }

            const [item] = items;
            if (!SUPPORTED_IMAGE_TYPES.includes(item.type)) {
                return;
            }

            const [col, row] = cell;
            if (getCellContent(cell).kind === GridCellKind.Image) {
                setHighlights([
                    {
                        color: "#44BB0022",
                        range: {
                            x: col,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                    },
                ]);
            } else {
                setHighlights([]);
            }
        },
        [getCellContent]
    );

    const onDragLeave = React.useCallback(() => {
        setHighlights([]);
    }, []);

    return (
        <BeautifulWrapper
            title="Drop events"
            description={
                <>
                    <Description>
                        You can drag and drop into cells by using <PropName>onDragOverCell</PropName> and{" "}
                        <PropName>onDrop</PropName>.
                    </Description>

                    <div>
                        {lastDropCell === undefined ? (
                            <MoreInfo>Nothing dropped, yet</MoreInfo>
                        ) : (
                            <>
                                <MoreInfo>
                                    You last dropped in cell <PropName>{JSON.stringify(lastDropCell)}</PropName>
                                </MoreInfo>
                            </>
                        )}
                    </div>
                </>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={1_000}
                onDrop={onDrop}
                onDragOverCell={onDragOverCell}
                onDragLeave={onDragLeave}
                highlightRegions={highlights}
                rowMarkers="none"
            />
        </BeautifulWrapper>
    );
};
(DropEvents as any).parameters = {
    options: {
        showPanel: false,
    },
};
