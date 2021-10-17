import * as React from "react";

import {
    CompactSelection,
    GridCell,
    GridCellKind,
    GridColumn,
    isEditableGridCell,
    isTextEditableGridCell,
    lossyCopyData,
    Rectangle,
} from "../data-grid/data-grid-types";
import { DataEditor, DataEditorProps } from "./data-editor";
import DataEditorContainer from "../data-editor-container/data-grid-container";

import faker from "faker";
import styled, { ThemeProvider } from "styled-components";
import AutoSizer from "react-virtualized-auto-sizer";
import { SimpleThemeWrapper } from "../stories/story-utils";
import { useEventListener } from "../common/utils";

faker.seed(1337);

export default {
    title: "DataEditor",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

interface GridColumnWithMockingInfo extends GridColumn {
    getContent(): GridCell;
}

function getGridColumn(columnWithMock: GridColumnWithMockingInfo): GridColumn {
    const { getContent, ...rest } = columnWithMock;

    return rest;
}

const BeautifulStyle = styled.div`
    background-color: #2790b9;
    background: linear-gradient(90deg, #2790b9, #2070a9);
    color: white;

    padding: 32px 48px;

    display: flex;
    flex-direction: column;
    height: 100vh;

    font-family: sans-serif;

    & > h1 {
        font-size: 50px;
        font-weight: 600;
        flex-shrink: 0;
        margin: 0 0 12px 0;
    }

    .sizer {
        flex-grow: 1;

        background-color: white;

        border-radius: 12px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

        .sizer-clip {
            border-radius: 12px;
            overflow: hidden;

            height: 100%;
        }
    }
`;

const PropName = styled.span`
    font-family: monospace;
    font-weight: 500;
    color: #ffe394;
`;

const Description = styled.p`
    font-size: 18px;
    flex-shrink: 0;
    margin: 0 0 20px 0;
`;

const MoreInfo = styled.p`
    font-size: 14px;
    flex-shrink: 0;
    margin: 0 0 20px 0;

    button {
        background-color: #f4f4f4;
        color: #2b2b2b;
        padding: 2px 6px;
        font-family: monospace;
        font-size: 14px;
        border-radius: 4px;
        box-shadow: 0px 1px 2px #00000040;
        margin: 0 0.1em;
        border: none;
        cursor: pointer;
    }
`;

interface BeautifulProps {
    title: string;
    description?: React.ReactNode;
}

const BeautifulWrapper: React.FC<BeautifulProps> = p => {
    const { title, children, description } = p;
    return (
        <BeautifulStyle>
            <h1>{title}</h1>
            {description}
            <div className="sizer">
                <div className="sizer-clip">
                    <AutoSizer>
                        {(props: { width?: number; height?: number }) => (
                            <DataEditorContainer width={props.width ?? 100} height={props.height ?? 100}>
                                {children}
                            </DataEditorContainer>
                        )}
                    </AutoSizer>
                </div>
            </div>
        </BeautifulStyle>
    );
};

function createTextColumnInfo(index: number): GridColumnWithMockingInfo {
    return {
        title: `Column ${index}`,
        width: 120,
        icon: "headerImage",
        hasMenu: false,
        getContent: () => {
            const text = faker.lorem.word();

            return {
                kind: GridCellKind.Text,
                data: text,
                displayData: text,
                allowOverlay: true,
                readonly: true,
            };
        },
    };
}

function getResizableColumns(amount: number): GridColumnWithMockingInfo[] {
    const defaultColumns: GridColumnWithMockingInfo[] = [
        {
            title: "First name",
            width: 120,
            icon: "headerString",
            hasMenu: false,
            getContent: () => {
                const firstName = faker.name.firstName();
                return {
                    kind: GridCellKind.Text,
                    displayData: firstName,
                    data: firstName,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "Last name",
            width: 120,
            icon: "headerString",
            hasMenu: false,
            getContent: () => {
                const lastName = faker.name.lastName();
                return {
                    kind: GridCellKind.Text,
                    displayData: lastName,
                    data: lastName,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "Avatar",
            width: 120,
            icon: "headerImage",
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Image,
                    data: [`${faker.image.people()}?random=${Math.round(Math.random() * 1000)}`],
                    allowOverlay: true,
                    allowAdd: false,
                    readonly: true,
                };
            },
        },
        {
            title: "Email",
            width: 120,
            icon: "headerString",
            hasMenu: false,
            getContent: () => {
                const email = faker.internet.email();
                return {
                    kind: GridCellKind.Text,
                    displayData: email,
                    data: email,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "Title",
            width: 120,
            icon: "headerString",
            hasMenu: false,
            getContent: () => {
                const company = faker.name.jobTitle();
                return {
                    kind: GridCellKind.Text,
                    displayData: company,
                    data: company,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "More Info",
            width: 120,
            icon: "headerUri",
            hasMenu: false,
            getContent: () => {
                const url = faker.internet.url();
                return {
                    kind: GridCellKind.Markdown,
                    displayData: url,
                    data: url,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
    ];

    if (amount < defaultColumns.length) {
        return defaultColumns.slice(0, amount);
    }

    const extraColumnsAmount = amount - defaultColumns.length;

    const extraColumns = [...new Array(extraColumnsAmount)].map((_, index) =>
        createTextColumnInfo(index + defaultColumns.length)
    );

    return [...defaultColumns, ...extraColumns];
}

class ContentCache {
    // column -> row -> value
    private cachedContent: Map<number, Map<number, GridCell>> = new Map();

    get(col: number, row: number) {
        const colCache = this.cachedContent.get(col);

        if (colCache === undefined) {
            return undefined;
        }

        return colCache.get(row);
    }

    set(col: number, row: number, value: GridCell) {
        if (this.cachedContent.get(col) === undefined) {
            this.cachedContent.set(col, new Map());
        }

        const rowCache = this.cachedContent.get(col) as Map<number, GridCell>;
        rowCache.set(row, value);
    }
}

function useMockDataGenerator(numCols: number, readonly: boolean = true) {
    const cache = React.useRef<ContentCache>(new ContentCache());

    const [colsMap, setColsMap] = React.useState(() => getResizableColumns(numCols));

    React.useEffect(() => {
        setColsMap(getResizableColumns(numCols));
    }, [numCols]);

    const onColumnResized = React.useCallback((column: GridColumn, newSize: number) => {
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

    const getCellContent = React.useCallback(
        ([col, row]: readonly [number, number]): GridCell => {
            let val = cache.current.get(col, row);
            if (val === undefined) {
                val = colsMap[col].getContent();
                cache.current.set(col, row, val);
            }
            if (!readonly) {
                if (isTextEditableGridCell(val)) {
                    val = { ...val, readonly };
                }
            }
            return val;
        },
        [colsMap, readonly]
    );

    const getCellsForSelection = React.useCallback(
        (selection: Rectangle): readonly (readonly GridCell[])[] => {
            const result: GridCell[][] = [];

            for (let y = selection.y; y < selection.height; y++) {
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.width; x++) {
                    row.push(getCellContent([x, y]));
                }
                result.push(row);
            }

            return result;
        },
        [getCellContent]
    );

    const setCellValue = React.useCallback(
        ([col, row]: readonly [number, number], val: GridCell): void => {
            let current = cache.current.get(col, row);
            if (current === undefined) {
                current = colsMap[col].getContent();
            }
            if (isEditableGridCell(val) && isEditableGridCell(current)) {
                const copied = lossyCopyData(val, current);
                cache.current.set(col, row, {
                    ...copied,
                    displayData: copied.data?.toString() ?? "",
                } as any);
            }
        },
        [colsMap]
    );

    return { cols, getCellContent, onColumnResized, setCellValue, getCellsForSelection };
}

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    rowMarkers: "none",
};

export const ResizableColumns: React.VFC = () => {
    const { cols, getCellContent, onColumnResized } = useMockDataGenerator(6);

    return (
        <BeautifulWrapper
            title="Resizable columns"
            description={
                <Description>
                    can resize columns by passing a <PropName>onColumnResized</PropName> prop
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={50}
                onColumnResized={onColumnResized}
            />
        </BeautifulWrapper>
    );
};
(ResizableColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const AddData: React.VFC = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

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
            title="Add data"
            description={<Description>Data can be added by typing into the trailing row.</Description>}>
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
(AddData as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const SmallEditableGrid = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(6, false);

    return (
        <BeautifulWrapper
            title="Editable Grid"
            description={
                <Description>
                    Data grid suDescriptionorts overlay editors for changing values. There are bespoke editors for
                    numbers, strings, images, booleans, markdown, and uri.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
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

export const ObserveVisibleRegion: React.VFC = () => {
    const { cols, getCellContent } = useMockDataGenerator(100);

    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });

    return (
        <BeautifulWrapper
            title="Observe Visible Region"
            description={
                <>
                    <Description>
                        The visiible region can be observed using <PropName>onVisibileRegionChanged</PropName>
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
    const { cols, getCellContent } = useMockDataGenerator(100000);

    return (
        <BeautifulWrapper
            title="One Hundred Thousand Columns"
            description={
                <Description>
                    Data grid supports way more columns than you will ever need. Also this is rendering 10 million cells
                    but that&apos;s not important.
                </Description>
            }>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />
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
                    performance with and improve visual stability during rapid scrolling.
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

interface AddColumnsProps {
    columnsCount: number;
}

export const AddColumns: React.FC<AddColumnsProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(p.columnsCount);

    return (
        <BeautifulWrapper
            title="Add and remove columns"
            description={<Description>You can add and remove columns at your disposal</Description>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10_000} />
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
            min: 6,
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

    const [selectedRows, setSelectedRows] = React.useState(CompactSelection.empty());

    return (
        <BeautifulWrapper
            title="Automatic Row Markers"
            description={
                <Description>
                    You can enable row markers with complex selection behavior using the <PropName>rowMarkers</PropName>{" "}
                    prop
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
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
(AutomaticRowMarkers as any).parameters = {
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
    const { cols, getCellContent } = useMockDataGenerator(6);

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
        ([col, row]: readonly [number, number]): GridCell => {
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
                    Columns can be rearranged by responding to the <PropName>onColumnMoved</PropName> callback.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContentMangled}
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
    const { cols, getCellContent } = useMockDataGenerator(6);

    const [selectedRows, setSelectedRows] = React.useState<CompactSelection>();

    return (
        <BeautifulWrapper
            title="Row and Header sizes"
            description={
                <Description>
                    The row size can be controlled with <PropName>rowHeight</PropName> and the header size with{" "}
                    <PropName>headerHeight</PropName>.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                rowHeight={p.rowHeight}
                headerHeight={p.headerHeight}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
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
    const { cols, getCellContent } = useMockDataGenerator(100);

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
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={100_000} />
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
            icon: "headerRowID",
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.RowID,
                    data: faker.datatype.uuid(),
                    allowOverlay: false,
                };
            },
        },
        {
            title: "Protected",
            width: 120,
            icon: "headerCode",
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
            icon: "headerString",
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
            icon: "headerCode",
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
            icon: "headerNumber",
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
            icon: "headerBoolean",
            hasMenu: false,
            getContent: () => {
                const checked = Math.random() > 0.5;
                // TODO: Make editable. UX looks bad by default.
                return {
                    kind: GridCellKind.Boolean,
                    data: checked,
                    allowOverlay: false,
                    showUnchecked: true,
                    allowEdit: true,
                };
            },
        },
        {
            title: "Image",
            width: 120,
            icon: "headerImage",
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
            icon: "headerUri",
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
            icon: "headerMarkdown",
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
            icon: "headerArray",
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
            icon: "headerArray",
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Drilldown,
                    data: [
                        {
                            text: faker.address.cityName(),
                            img: `${faker.image.nature()}?random=${faker.datatype.number(100000)}`,
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

    const onColumnResized = React.useCallback((column: GridColumn, newSize: number) => {
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

    const getCellContent = React.useCallback(
        ([col, row]: readonly [number, number]): GridCell => {
            let val = cache.current.get(col, row);
            if (val === undefined) {
                val = colsMap[col].getContent();
                cache.current.set(col, row, val);
            }

            return val;
        },
        [colsMap]
    );

    const setCellValue = React.useCallback(
        ([col, row]: readonly [number, number], val: GridCell): void => {
            let current = cache.current.get(col, row);
            if (current === undefined) {
                current = colsMap[col].getContent();
            }
            if (isEditableGridCell(val) && isEditableGridCell(current)) {
                const copied = lossyCopyData(val, current);
                cache.current.set(col, row, {
                    ...copied,
                    displayData: copied.data?.toString() ?? "",
                } as any);
            }
        },
        [colsMap]
    );

    return { cols, getCellContent, onColumnResized, setCellValue };
}

export const AllCellKinds: React.VFC = () => {
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

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
                onColumnResized={onColumnResized}
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
    overlayName: "LightTheme",

    accentColor: "#8c96ff",
    accentMedium: "#86a1ff7f",
    accentLight: "rgba(202, 206, 255, 0.253)",

    textDark: "#ffffff",
    textMedium: "#b8b8b8",
    textLight: "#a0a0a0",
    textHeader: "#a1a1a1",
    textHeaderSelected: "#000000",
    textBubble: "#ffffff",

    bgCell: "#16161b",
    bgCellMedium: "#202027",
    bgHeader: "#212121",
    bgHeaderHasFocus: "#474747",

    bgBubble: "#212121",
    bgBubbleSelected: "#000000",

    bgSearchResult: "#423c24",

    borderColor: "rgba(225,225,225,0.2)",
    borderDark: "rgba(225,225,225,0.4)",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

const hotdogStand = {
    overlayName: "LightTheme",

    accentColor: "#8c96ff",
    accentMedium: "#86a1ff7f",
    accentLight: "rgba(202, 206, 255, 0.253)",

    textDark: "#ffffff",
    textMedium: "rgba(255, 255, 255, 0.9)",
    textLight: "rgba(255, 255, 255, 0.7)",
    textHeader: "rgba(0, 0, 0, 0.9)",
    textHeaderSelected: "#000000",
    textBubble: "#000000",

    bgCell: "#ff0000",
    bgCellMedium: "#ff4d4d",
    bgHeader: "#f3f300",
    bgHeaderHasFocus: "#eeee00",

    bgBubble: "#ffff00",
    bgBubbleSelected: "#ffff00",

    bgSearchResult: "#423c24",

    borderColor: "#ffff00",
    borderDark: "#ffff00",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

export const ThemeSupport: React.VFC = () => {
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

    const [theme, setTheme] = React.useState({});

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
                    onCellEdited={setCellValue}
                    onColumnResized={onColumnResized}
                    rows={1_000}
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
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

    const realCols = React.useMemo(() => {
        const c = [...cols];
        c[3] = {
            ...c[3],
            themeOverride: {
                textDark: "#009CA6",
            },
            style: "highlight",
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
                onColumnResized={onColumnResized}
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

export const BuiltInSearch: React.VFC = () => {
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

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
                <Description>
                    Search for any data in your grid by setting <PropName>showSearch</PropName>.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                onCellEdited={setCellValue}
                onColumnResized={onColumnResized}
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
