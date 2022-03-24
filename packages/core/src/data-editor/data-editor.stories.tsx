import * as React from "react";

import { StoryFn, StoryContext, useState, useCallback, useMemo } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";

import {
    CompactSelection,
    EditableGridCell,
    GridCell,
    GridCellKind,
    GridColumn,
    GridSelection,
    Rectangle,
} from "../data-grid/data-grid-types";
import AutoSizer from "react-virtualized-auto-sizer";
import { DataEditor } from "./data-editor";
import DataEditorContainer from "../data-editor-container/data-grid-container";

export default {
    title: "Tests/TestCases",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <AutoSizer>
                {(props: { width?: number; height?: number }) => (
                    <BuilderThemeWrapper width={props.width ?? 1000} height={props.height ?? 800} context={context}>
                        <DataEditorContainer width={props.width ?? 1000} height={props.height ?? 800}>
                            {fn()}
                        </DataEditorContainer>
                    </BuilderThemeWrapper>
                )}
            </AutoSizer>
        ),
    ],
};

function getDummyData([col, row]: readonly [number, number]): GridCell {
    if (col === 0) {
        return {
            kind: GridCellKind.RowID,
            data: `RowID ${col}, ${row}`,
            allowOverlay: false,
        };
    }
    if (col === 1) {
        return {
            kind: GridCellKind.Bubble,
            data: [
                `Bub ${col}`,
                `Bub ${row}`,
                `Bub ${col}`,
                `Bub ${row}`,
                `Bub ${col}`,
                `Bub ${row}`,
                `Bub ${col}`,
                `Bub ${row}`,
                `Bub ${col}`,
                `Bub ${row}`,
            ],
            allowOverlay: true,
        };
    }
    if (col === 2) {
        return {
            kind: GridCellKind.Image,
            data: [
                "https://i.imgur.com/5J0BftG.jpg",
                "https://preview.redd.it/7jlqkp2cyap51.jpg?width=575&auto=webp&s=26fa9ed15b16fb450ee08ed1f2f0ccb5e0223581",
            ],
            allowOverlay: true,
            allowAdd: true,
        };
    }
    if (col === 3) {
        return {
            kind: GridCellKind.Markdown,
            data: `## Markdown has titles

And supports newline chars and automatic wrapping text that just needs to be long enough to trigger it.


[Google](https://google.com)

- with
- lists
- that
- can
- be
- pretty
- long
                    `,
            allowOverlay: true,
        };
    }
    if (col === 4) {
        return {
            kind: GridCellKind.Number,
            displayData: "$10,352",
            allowOverlay: true,
            data: 10352,
            readonly: true,
        };
    }
    if (col === 5) {
        return {
            kind: GridCellKind.Uri,
            data: "https://www.google.com",
            allowOverlay: true,
        };
    }
    if (col === 6) {
        return {
            kind: GridCellKind.Boolean,
            data: row % 3 === 0 || row % 5 === 0,
            showUnchecked: true,
            allowEdit: false,
            allowOverlay: false,
        };
    }
    if (col === 7) {
        return {
            kind: GridCellKind.Text,
            // RTL test
            displayData: `הרפתקה חדשה`,
            data: `הרפתקה חדשה`,
            allowOverlay: true,
            readonly: true,
        };
    }
    if (col === 8) {
        return {
            kind: GridCellKind.Drilldown,
            data: [
                {
                    text: "Test",
                    img:
                        "https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg",
                },
                { text: "No Image" },
            ],
            allowOverlay: true,
        };
    }
    return {
        kind: GridCellKind.Text,
        displayData: `${col}, ${row} 🦝`,
        data: `${col}, ${row} 🦝`,
        allowOverlay: true,
    };
}

function getDummyCols() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
        i =>
            ({
                title: i.toString() + " is the longest header in the world",
                width: 120 + (i % 4) * 10,
                icon: "headerString",
                hasMenu: true,
            } as GridColumn)
    );
}

export function Simplenotest() {
    const [cols, setColumns] = useState(getDummyCols);

    const onColumnResized = useCallback(
        (col: GridColumn, newSize: number) => {
            const index = cols.indexOf(col);
            const newCols = [...cols];
            newCols[index] = {
                ...newCols[index],
                width: newSize,
            };
            setColumns(newCols);
        },
        [cols]
    );

    const getCellsForSelection = useCallback((selection: Rectangle) => {
        const cells: GridCell[][] = [];
        for (let yCoord = selection.y; yCoord < selection.y + selection.height; yCoord++) {
            const rowCells: GridCell[] = [];
            for (let xCoord = selection.x; xCoord < selection.x + selection.width; xCoord++) {
                rowCells.push(getDummyData([xCoord, yCoord]));
            }
            cells.push(rowCells);
        }

        return cells;
    }, []);

    return (
        <DataEditor
            getCellContent={getDummyData}
            getCellsForSelection={getCellsForSelection}
            columns={cols}
            rows={1000}
            onColumnResized={onColumnResized}
        />
    );
}

function getDummyRelationColumn(): GridColumn[] {
    return [
        {
            title: "Relation",
            width: 360,
            icon: "headerString",
            hasMenu: true,
        },
    ];
}

function getDummyRelationData([col, row]: readonly [number, number]): GridCell {
    return {
        kind: GridCellKind.Drilldown,
        data: [
            {
                text: `Image ${col}-${row}`,
                img:
                    "https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg",
            },
            { text: `Text ${col}-${row}` },
            { text: `More text ${col}-${row}` },
        ],
        allowOverlay: true,
    };
}

export function RelationColumn() {
    const [cols, setColumns] = useState(getDummyRelationColumn);

    const onColumnResized = useCallback(
        (col: GridColumn, newSize: number) => {
            const index = cols.indexOf(col);
            const newCols = [...cols];
            newCols[index] = {
                ...newCols[index],
                width: newSize,
            };
            setColumns(newCols);
        },
        [cols]
    );

    return (
        <DataEditor
            getCellContent={getDummyRelationData}
            columns={cols}
            rows={1000}
            onColumnResized={onColumnResized}
            smoothScrollX={true}
            smoothScrollY={true}
        />
    );
}

const columns: GridColumn[] = [
    { title: "Number", width: 100, icon: "headerArray", overlayIcon: "rowOwnerOverlay" },
    { title: "Square", width: 100 },
];

function getData([col, row]: readonly [number, number]): GridCell {
    const n = Math.pow(row, col + 1);

    return {
        kind: GridCellKind.Number,
        data: n,
        displayData: n.toString(),
        allowOverlay: false,
    };
}

export function Minimal() {
    return <DataEditor getCellContent={getData} columns={columns} rows={1000} />;
}

export function Smooth() {
    const [cols, setCols] = useState(getDummyCols);

    const onColumnResized = useCallback(
        (column: GridColumn, newSize: number) => {
            const index = cols.indexOf(column);
            if (index !== -1) {
                const newCol: GridColumn = {
                    ...column,
                    width: newSize,
                };

                const newCols = [...cols];
                newCols.splice(index, 1, newCol);

                setCols(newCols);
            }
        },
        [cols]
    );

    return (
        <DataEditor
            getCellContent={getDummyData}
            onColumnResized={onColumnResized}
            columns={cols}
            rows={1000}
            smoothScrollY={true}
            smoothScrollX={true}
        />
    );
}

export function ManualControl() {
    const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined);

    const cb = (newVal: GridSelection) => {
        if ((newVal.current?.cell[0] ?? 0) % 2 === 0) {
            setGridSelection(newVal);
        }
    };

    return (
        <DataEditor
            gridSelection={gridSelection}
            onGridSelectionChange={cb}
            getCellContent={getData}
            columns={columns}
            rows={1000}
        />
    );
}

export function Draggable() {
    return (
        <DataEditor
            isDraggable={true}
            onDragStart={args => {
                args.setData("text", "testing");
            }}
            getCellContent={getData}
            columns={columns}
            rows={1000}
        />
    );
}

export function IdealSize() {
    // trying to be 500x500
    const cols: GridColumn[] = [
        { title: "Number", width: 250 },
        { title: "Square", width: 250 },
    ];
    return (
        <div style={{ width: 500, height: 500, position: "relative" }}>
            <DataEditorContainer width={500} height={500}>
                <DataEditor
                    isDraggable={true}
                    onDragStart={args => {
                        args.setData("text", "testing");
                    }}
                    getCellContent={getData}
                    columns={cols}
                    smoothScrollX={true}
                    smoothScrollY={true}
                    rowHeight={50}
                    headerHeight={50}
                    rows={9}
                />
            </DataEditorContainer>
        </div>
    );
}

export function DynamicAddRemoveColumns({ columnCount }: { columnCount: number }) {
    // trying to be 500x500
    const cols: GridColumn[] = [
        { title: "Number", width: 250 },
        { title: "Square", width: 250 },
    ];

    for (let i = 2; i < columnCount; i++) {
        cols.push({
            title: "Foo",
            width: 250,
        });
    }

    return (
        <DataEditor
            isDraggable={true}
            getCellContent={getData}
            columns={cols}
            smoothScrollX={true}
            smoothScrollY={true}
            rowHeight={50}
            headerHeight={50}
            rows={9}
        />
    );
}
DynamicAddRemoveColumns.args = {
    columnCount: 2,
};

// export function RowSelectionStateLivesOutside() {
//     const [selected_rows, setSelectedRows] = useState<CompactSelection | undefined>(undefined);
//     const cb = (newRows: CompactSelection | undefined) => {
//         if (newRows !== undefined) {
//             setSelectedRows(newRows);
//         }
//     };

//     return (
//         <DataEditor
//             selectedRows={selected_rows}
//             onSelectedRowsChange={cb}
//             isDraggable={true}
//             onDragStart={args => {
//                 args.setData("text", "testing");
//             }}
//             getCellContent={getData}
//             columns={columns}
//             rows={1000}
//         />
//     );
// }

// export function ColSelectionStateLivesOutside() {
//     const [selected_cols, setSelectedCols] = useState<CompactSelection>(CompactSelection.empty());
//     const cb = (newRows: CompactSelection | undefined) => {
//         if (newRows !== undefined) {
//             setSelectedCols(newRows);
//         }
//     };

//     return (
//         <DataEditor
//             selectedColumns={selected_cols}
//             onSelectedColumnsChange={cb}
//             isDraggable={true}
//             onDragStart={args => {
//                 args.setData("text", "testing");
//             }}
//             getCellContent={getData}
//             columns={columns}
//             rows={1000}
//         />
//     );
// }

export function GridSelectionOutOfRangeNoColumns() {
    const dummyCols = useMemo(
        () => getDummyCols().map(v => ({ ...v, width: 300, title: "Making column smaller used to crash!" })),
        []
    );

    const [selected, setSelected] = useState<GridSelection | undefined>({
        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const [cols, setCols] = useState(dummyCols);

    const onSelected = useCallback((newSel?: GridSelection) => {
        setSelected(newSel);
    }, []);

    return (
        <DataEditor
            getCellContent={getDummyData}
            columns={cols}
            rows={1000}
            onGridSelectionChange={onSelected}
            gridSelection={selected}
            onColumnResized={(_col, newSize) => {
                if (newSize > 300) {
                    setCols(dummyCols);
                } else {
                    setCols([]);
                }
            }}
        />
    );
}

type ResizableColumnsSizeMap = Record<string, number>;

function getResizableColumnsInitSize(): ResizableColumnsSizeMap {
    return {
        "resize me 0": 120,
        "resize me 1": 120,
        "resize me 2": 120,
        "resize me 3": 120,
        "resize me 4": 120,
        "resize me 5": 120,
        "resize me 6": 120,
        "resize me 7": 120,
    };
}

function getResizableColumns(sizeMap: ResizableColumnsSizeMap): GridColumn[] {
    return Object.entries(sizeMap).map(([title, width]) => ({
        title,
        width,
        icon: "headerString",
        hasMenu: true,
    }));
}

export function ResizableColumns() {
    const [colSizes, setColSizes] = useState(getResizableColumnsInitSize);

    const cols = useMemo(() => {
        return getResizableColumns(colSizes);
    }, [colSizes]);

    const onColumnResized = useCallback((column: GridColumn, newSize: number) => {
        setColSizes(prevColSizes => {
            return {
                ...prevColSizes,
                [column.title]: newSize,
            };
        });
    }, []);

    return (
        <DataEditor
            getCellContent={getDummyData}
            columns={cols}
            rows={20}
            isDraggable={false}
            smoothScrollX={true}
            smoothScrollY={true}
            onColumnResized={onColumnResized}
        />
    );
}

export function GridSelectionOutOfRangeLessColumnsThanSelection() {
    const dummyCols = useMemo(
        () => getDummyCols().map(v => ({ ...v, width: 300, title: "Making column smaller used to crash!" })),
        []
    );

    const [selected, setSelected] = useState<GridSelection | undefined>({
        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const [cols, setCols] = useState(dummyCols);

    const onSelected = useCallback((newSel?: GridSelection) => {
        setSelected(newSel);
    }, []);

    return (
        <DataEditor
            getCellContent={getDummyData}
            columns={cols}
            rows={1000}
            onGridSelectionChange={onSelected}
            gridSelection={selected}
            onColumnResized={(_col, newSize) => {
                if (newSize > 300) {
                    setCols(dummyCols);
                } else {
                    setCols([dummyCols[0]]);
                }
            }}
        />
    );
}

export function GridAddNewRows() {
    const cols = useMemo(getDummyCols, []);

    const [rowsCount, setRowsCount] = useState(10);

    const onRowAppended = useCallback(() => {
        setRowsCount(r => r + 1);
    }, []);

    const [selected, setSelected] = useState<GridSelection | undefined>(undefined);

    const onSelected = useCallback((newSel?: GridSelection) => {
        setSelected(newSel);
    }, []);

    return (
        <DataEditor
            getCellContent={getDummyData}
            columns={cols}
            rows={rowsCount}
            onRowAppended={onRowAppended}
            onGridSelectionChange={onSelected}
            gridSelection={selected}
        />
    );
}

export function GridNoTrailingBlankRow() {
    const cols = useMemo(getDummyCols, []);

    const [selected, setSelected] = useState<GridSelection | undefined>(undefined);

    const onSelected = useCallback((newSel?: GridSelection) => {
        setSelected(newSel);
    }, []);

    return (
        <DataEditor
            getCellContent={getDummyData}
            columns={cols}
            rows={100}
            onGridSelectionChange={onSelected}
            gridSelection={selected}
        />
    );
}

export function MarkdownEdits() {
    const dummyCols: GridColumn[] = useMemo(() => {
        return [
            {
                title: "MD short",
                width: 50,
            },
            {
                title: "MD long",
                width: 50,
            },
        ];
    }, []);

    const dummyCells = useCallback(([col, _row]: readonly [number, number]) => {
        if (col === 0) {
            const editable: EditableGridCell = {
                data: "text",
                allowOverlay: true,
                kind: GridCellKind.Markdown,
            };
            return editable;
        } else if (col === 1) {
            const editable: EditableGridCell = {
                data: `text really really really long
## H1

- this
- is
- a
- longer
- example
- to
- test
- scroll
- of
- preview
                `,
                allowOverlay: true,
                kind: GridCellKind.Markdown,
            };
            return editable;
        }
        const editable: EditableGridCell = {
            data: "text",
            allowOverlay: true,
            kind: GridCellKind.Markdown,
        };
        return editable;
    }, []);

    const [selected, setSelected] = useState<GridSelection | undefined>({
        current: { cell: [2, 8], range: { width: 1, height: 1, x: 2, y: 8 }, rangeStack: [] },
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const onSelected = useCallback((newSel?: GridSelection) => {
        setSelected(newSel);
    }, []);

    return (
        <DataEditor
            getCellContent={dummyCells}
            columns={dummyCols}
            rows={1000}
            onGridSelectionChange={onSelected}
            gridSelection={selected}
        />
    );
}

export const CanEditBoolean = () => {
    const [vals, setVals] = useState<[boolean, boolean]>([false, false]);
    return (
        <DataEditor
            columns={[
                {
                    title: "Editable",
                    width: 100,
                },
                {
                    title: "Readonly",
                    width: 100,
                },
            ]}
            rows={1}
            getCellContent={([col]) => {
                return {
                    kind: GridCellKind.Boolean,
                    allowEdit: col === 0,
                    allowOverlay: false,
                    data: vals[col],
                    showUnchecked: true,
                };
            }}
            onCellEdited={([col], newVal) => {
                if (newVal.kind === GridCellKind.Boolean) {
                    setVals(cv => {
                        const f = [...cv];
                        f.splice(col, 1, newVal.data);
                        return f as [boolean, boolean];
                    });
                }
            }}
        />
    );
};

export const SimpleEditable = () => {
    const [vals, setVals] = useState<[string, string][]>(() => {
        const result: [string, string][] = [];
        for (let i = 0; i < 2000; i++) {
            result.push(["Edit", "Me"]);
        }
        return result;
    });

    return (
        <DataEditor
            columns={[
                {
                    title: "Column A",
                    width: 250,
                },
                {
                    title: "Column B",
                    width: 250,
                },
            ]}
            rows={vals.length}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                allowOverlay: true,
                data: vals[row][col],
                displayData: vals[row][col],
            })}
            onCellEdited={([col, row], newVal) => {
                const newVals = [...vals];
                const newRow: [string, string] = [...newVals[row]];
                if (typeof newVal.data === "string") {
                    newRow[col] = newVal.data;
                }
                newVals[row] = newRow;
                setVals(newVals);
            }}
        />
    );
};
