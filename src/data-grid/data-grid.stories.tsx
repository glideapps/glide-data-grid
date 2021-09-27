import * as React from "react";

import { StoryFn, StoryContext } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";
import DataGrid from "./data-grid";
import { GridCellKind } from "./data-grid-types";

export default {
    title: "Designer/DateViewer/DataGrid",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <div>
                <BuilderThemeWrapper width={600} height={0} context={context}>
                    {fn()}
                </BuilderThemeWrapper>
            </div>
        ),
    ],
};

export function Simplenotest() {
    let x = 0;
    return (
        <DataGrid
            allowResize={true}
            width={600}
            height={500}
            cellXOffset={0}
            cellYOffset={0}
            rows={1000}
            headerHeight={44}
            rowHeight={34}
            columns={["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(t => ({
                title: t,
                width: 122 + (x += 10),
            }))}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                displayData: `${col},${row} Testing things that are way too long`,
                data: `${col},${row} Testing things that are way too long`,
                allowOverlay: false,
                owned: true,
            })}
            firstColSticky={false}
        />
    );
}

export function SelectedCellnotest() {
    let x = 0;
    return (
        <DataGrid
            allowResize={true}
            width={600}
            height={500}
            cellXOffset={0}
            cellYOffset={0}
            rows={1000}
            headerHeight={44}
            rowHeight={34}
            columns={["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(t => ({
                title: t,
                width: 122 + (x += 10),
            }))}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                displayData: `${col},${row} Testing things that are way too long`,
                data: `${col},${row} Testing things that are way too long`,
                allowOverlay: false,
                owned: true,
            })}
            selectedCell={{ cell: [2, 2], range: { x: 2, y: 2, width: 1, height: 1 } }}
            firstColSticky={false}
        />
    );
}

export function SelectedRownotest() {
    let x = 0;
    return (
        <DataGrid
            allowResize={true}
            width={600}
            height={500}
            cellXOffset={0}
            cellYOffset={0}
            rows={1000}
            headerHeight={44}
            rowHeight={34}
            columns={["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(t => ({
                title: t,
                width: 122 + (x += 10),
            }))}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                displayData: `${col},${row} Testing things that are way too long`,
                data: `${col},${row} Testing things that are way too long`,
                allowOverlay: false,
                owned: true,
            })}
            selectedRows={[2, 4]}
            firstColSticky={false}
        />
    );
}

export const SelectedColumnnotest = () => {
    let x = 0;
    return (
        <DataGrid
            allowResize={true}
            width={600}
            height={500}
            cellXOffset={0}
            cellYOffset={0}
            rows={1000}
            headerHeight={44}
            rowHeight={34}
            columns={["One", "Two", "Three", "Four", "Five", "Six", "Seven"].map(t => ({
                title: t,
                width: 122 + (x += 10),
            }))}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                displayData: `${col},${row} Testing things that are way too long`,
                data: `${col},${row} Testing things that are way too long`,
                allowOverlay: false,
                owned: true,
            })}
            selectedColumns={[2, 4]}
            firstColSticky={false}
        />
    );
};
