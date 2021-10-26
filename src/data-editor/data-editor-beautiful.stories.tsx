import * as React from "react";

import {
    CompactSelection,
    GridCell,
    GridCellKind,
    GridColumn,
    GridColumnIcon,
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
import { useLayer } from "react-laag";
import { SpriteMap } from "data-grid/data-grid-sprites";
import { DataEditorRef, Theme } from "index";

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
            transform: translateZ(0);

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
        icon: GridColumnIcon.HeaderString,
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
            icon: GridColumnIcon.HeaderString,
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
            icon: GridColumnIcon.HeaderString,
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
            icon: GridColumnIcon.HeaderImage,
            hasMenu: false,
            getContent: () => {
                const n = Math.round(Math.random() * 100);
                return {
                    kind: GridCellKind.Image,
                    data: [`https://picsum.photos/id/${n}/900/900`],
                    displayData: [`https://picsum.photos/id/${n}/40/40`],
                    allowOverlay: true,
                    allowAdd: false,
                    readonly: true,
                };
            },
        },
        {
            title: "Email",
            width: 120,
            icon: GridColumnIcon.HeaderString,
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
            icon: GridColumnIcon.HeaderString,
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
            icon: GridColumnIcon.HeaderUri,
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
                if (!readonly) {
                    if (isTextEditableGridCell(val)) {
                        val = { ...val, readonly };
                    }
                }
                cache.current.set(col, row, val);
            }
            return val;
        },
        [colsMap, readonly]
    );

    const getCellsForSelection = React.useCallback(
        (selection: Rectangle): readonly (readonly GridCell[])[] => {
            const result: GridCell[][] = [];

            for (let y = selection.y; y < selection.y + selection.height; y++) {
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.x + selection.width; x++) {
                    row.push(getCellContent([x, y]));
                }
                result.push(row);
            }

            return result;
        },
        [getCellContent]
    );

    const setCellValueRaw = React.useCallback(([col, row]: readonly [number, number], val: GridCell): void => {
        cache.current.set(col, row, val);
    }, []);

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
                    displayData: typeof copied.data === "string" ? copied.data : (copied as any).displayData,
                } as any);
            }
        },
        [colsMap]
    );

    return { cols, getCellContent, onColumnResized, setCellValue, getCellsForSelection, setCellValueRaw };
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

    return (
        <BeautifulWrapper
            title="Add data"
            description={<Description>Data can be added by typing into the trailing row.</Description>}>
            <DataEditor
                {...defaultProps}
                smoothScrollY={false}
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
                    Data grid supports overlay editors for changing values. There are bespoke editors for numbers,
                    strings, images, booleans, markdown, and uri.
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
            icon: GridColumnIcon.HeaderRowID,
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
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

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
                    onColumnResized={onColumnResized}
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
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

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
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

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
                onCellEdited={setCellValue}
                onColumnResized={onColumnResized}
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
    const { cols, getCellContent, onColumnResized, setCellValue } = useAllMockedKinds();

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
                onColumnResized={onColumnResized}
                headerIcons={headerIcons}
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

export const RightElement: React.VFC = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(12, false);

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
            description={<Description>A DOM element may be added as a trailer to the grid.</Description>}>
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
    const { cols, getCellContent, setCellValueRaw } = useMockDataGenerator(100);

    const ref = React.useRef<DataEditorRef>(null);

    const countRef = React.useRef(0);
    const displayCountRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        let rafID = 0;

        const sendUpdate = () => {
            const cells: {
                cell: readonly [number, number];
            }[] = [];
            for (let x = 0; x < 10_000; x++) {
                const col = Math.max(10, rand() % 100);
                const row = rand() % 10_000;

                setCellValueRaw([col, row], {
                    kind: GridCellKind.Text,
                    data: countRef.current.toString(),
                    displayData: `${x}k`,
                    allowOverlay: true,
                });
                cells.push({ cell: [col, row] });
            }
            countRef.current += 10_000;
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

    const drawCustom = React.useCallback(
        (ctx: CanvasRenderingContext2D, cell: GridCell, _theme: Theme, rect: Rectangle) => {
            if (cell.kind !== GridCellKind.Text) return false;

            const { x, y, height } = rect;
            const data = cell.displayData;

            if (!cell.data.endsWith("0000")) return false;

            ctx.fillStyle = !data.endsWith("5k") ? "#0fc035" : "#e01e1e";
            ctx.fillText(data, x + 8 + 0.5, y + height / 2 + 4.5);

            return true;
        },
        []
    );

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
                drawCustomCell={drawCustom}
                getCellContent={getCellContent}
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
    const { cols, getCellContent, onColumnResized, setCellValue, getCellsForSelection } = useMockDataGenerator(10);

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
                onColumnResized={onColumnResized}
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
