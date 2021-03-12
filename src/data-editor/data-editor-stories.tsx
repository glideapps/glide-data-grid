import * as React from "react";

import { withKnobs } from "@storybook/addon-knobs";
import { StoryFn, StoryContext, useState, useCallback } from "@storybook/addons";
import { StoryFnReactReturnType } from "@storybook/react/dist/client/preview/types";
import { BuilderThemeWrapper } from "../stories/story-utils";
// import { styled } from "../common/styles";
import {
    GridCell,
    GridCellKind,
    GridColumn,
    GridSelection,
    Rectangle,
    RowSelection,
} from "../data-grid/data-grid-types";
import AutoSizer from "react-virtualized-auto-sizer";
import DataEditor from "./data-editor";
import DataEditorContainer from "../data-editor-container/data-grid-container";

// const InnerContainer = styled.div`
//     width: 100%;
//     height: 100px;

//     > :first-child {
//         position: absolute;
//         width: 100%;
//         height: 100%;
//     }
// `;

export default {
    title: "Designer/DateViewer/DataEditor",

    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
        (fn: StoryFn<StoryFnReactReturnType>, context: StoryContext) => (
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

    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const onVisibleRegionChanged = useCallback((range: Rectangle) => {
        setX(range.x);
        setY(range.y);
    }, []);

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
            cellXOffset={x}
            cellYOffset={y}
            getCellContent={getDummyData}
            columns={cols}
            rows={1000}
            allowResize={true}
            onVisibleRegionChanged={onVisibleRegionChanged}
            onColumnResized={onColumnResized}
        />
    );
}

const columns: GridColumn[] = [
    { title: "Number", width: 100 },
    { title: "Square", width: 100 },
];

function getData([col, row]: readonly [number, number]): GridCell {
    let n: number;
    if (col === 0) {
        n = row;
    } else if (col === 1) {
        n = row * row;
    } else {
        throw new Error("This should not happen");
    }
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
            allowResize={true}
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

    const cb = (newVal: GridSelection | undefined) => {
        if ((newVal?.cell[0] ?? 0) % 2 === 0) {
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
        <DataEditor
            isDraggable={true}
            onDragStart={args => {
                args.setData("text", "testing");
            }}
            getCellContent={getData}
            columns={cols}
            rowHeight={50}
            headerHeight={50}
            showTrailingBlankRow={false}
            rowMarkers={false}
            rows={9}
        />
    );
}

export function RowSelectionStateLivesOutside() {
    const cols: GridColumn[] = [
        { title: "Number", width: 250 },
        { title: "Square", width: 250 },
    ];

    const [selected_rows, setSelectedRows] = React.useState<RowSelection>([]);
    const cb = (newRows: RowSelection | undefined) => {
        if (newRows != undefined) {
            setSelectedRows(newRows);
        }
    };

    return (
        <DataEditor
            selectedRows={selected_rows}
            onSelectedRowsChange={cb}
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
