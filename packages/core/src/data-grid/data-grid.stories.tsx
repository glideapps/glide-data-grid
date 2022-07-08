/* eslint-disable sonarjs/no-identical-functions */
import * as React from "react";

import type { StoryFn, StoryContext } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";
import DataGrid from "./data-grid";
import { CompactSelection, GridCellKind, GridSelection } from "./data-grid-types";
import { getDataEditorTheme } from "../common/styles";

export default {
    title: "Subcomponents/DataGrid",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <div>
                <BuilderThemeWrapper width={1800} height={1000} context={context}>
                    <div style={{ position: "relative" }}>{fn()}</div>
                </BuilderThemeWrapper>
            </div>
        ),
    ],
};

const emptyGridSelection: GridSelection = {
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
    current: undefined,
};

export function Simplenotest() {
    let x = 0;

    const [y, setY] = React.useState(0);

    React.useEffect(() => {
        let handle = 0;
        const cb = () => {
            setY(cv => cv + 1);
            handle = window.requestAnimationFrame(cb);
        };

        cb();

        return () => window.cancelAnimationFrame(handle);
    }, []);

    return (
        <DataGrid
            width={1800}
            height={1000}
            cellXOffset={0}
            isFocused={true}
            cellYOffset={y}
            isFilling={false}
            onMouseMove={() => undefined}
            groupHeaderHeight={0}
            accessibilityHeight={50}
            enableGroups={false}
            selection={emptyGridSelection}
            rows={100000}
            headerHeight={44}
            rowHeight={34}
            columns={["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven"].map(
                t => ({
                    title: t,
                    width: 122 + (x += 10),
                })
            )}
            getCellContent={([col, row]) => ({
                kind: GridCellKind.Text,
                displayData: `${col},${row} Testing things that are way too long`,
                data: `${col},${row} Testing things that are way too long`,
                allowOverlay: false,
                owned: true,
            })}
            freezeColumns={0}
            firstColAccessible={true}
            verticalBorder={() => true}
            trailingRowType={"none"}
            isResizing={false}
            isDragging={false}
            theme={getDataEditorTheme()}
        />
    );
}

export function SelectedCellnotest() {
    let x = 0;
    return (
        <DataGrid
            width={1800}
            height={1000}
            cellXOffset={0}
            isFocused={true}
            onMouseMove={() => undefined}
            accessibilityHeight={50}
            isFilling={false}
            cellYOffset={0}
            groupHeaderHeight={34}
            enableGroups={false}
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
            selection={{
                current: {
                    cell: [2, 2],
                    range: { x: 2, y: 2, width: 1, height: 1 },
                    rangeStack: [],
                },
                columns: CompactSelection.empty(),
                rows: CompactSelection.empty(),
            }}
            freezeColumns={0}
            firstColAccessible={true}
            verticalBorder={() => true}
            trailingRowType={"none"}
            isResizing={false}
            isDragging={false}
            theme={getDataEditorTheme()}
        />
    );
}

export function SelectedRownotest() {
    let x = 0;
    return (
        <DataGrid
            onMouseMove={() => undefined}
            width={1800}
            height={1000}
            cellXOffset={0}
            cellYOffset={0}
            isFocused={true}
            groupHeaderHeight={34}
            accessibilityHeight={50}
            isFilling={false}
            enableGroups={false}
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
            selection={{
                current: undefined,
                rows: CompactSelection.fromSingleSelection([2, 4]),
                columns: CompactSelection.empty(),
            }}
            freezeColumns={0}
            firstColAccessible={true}
            verticalBorder={() => true}
            trailingRowType={"none"}
            isResizing={false}
            isDragging={false}
            theme={getDataEditorTheme()}
        />
    );
}

export const SelectedColumnnotest = () => {
    let x = 0;
    return (
        <DataGrid
            onMouseMove={() => undefined}
            width={1800}
            height={1000}
            cellXOffset={0}
            cellYOffset={0}
            isFocused={true}
            accessibilityHeight={50}
            isFilling={false}
            groupHeaderHeight={34}
            enableGroups={false}
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
            selection={{
                current: undefined,
                rows: CompactSelection.empty(),
                columns: CompactSelection.fromSingleSelection([2, 4]),
            }}
            freezeColumns={0}
            firstColAccessible={true}
            verticalBorder={() => true}
            trailingRowType={"none"}
            isResizing={false}
            isDragging={false}
            theme={getDataEditorTheme()}
        />
    );
};
