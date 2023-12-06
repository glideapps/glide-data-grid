/* eslint-disable sonarjs/no-identical-functions */
import * as React from "react";

import { BuilderThemeWrapper } from "../../stories/story-utils.js";
import DataGrid from "./data-grid.js";
import { CompactSelection, GridCellKind, type GridSelection } from "./data-grid-types.js";
import { getDataEditorTheme } from "../../common/styles.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import { AllCellRenderers } from "../../cells/index.js";
import ImageWindowLoaderImpl from "../../common/image-window-loader.js";

export default {
    title: "Subcomponents/DataGrid",

    decorators: [
        (Story: React.ComponentType) => (
            <div>
                <BuilderThemeWrapper width={1800} height={1000}>
                    <div style={{ position: "relative" }}>
                        <Story />
                    </div>
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

const getCellRenderer: GetCellRendererCallback = cell => {
    if (cell.kind === GridCellKind.Custom) return undefined;
    return AllCellRenderers.find(x => x.kind === cell.kind) as any;
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
            getCellRenderer={getCellRenderer}
            width={1800}
            height={1000}
            cellXOffset={0}
            drawHeader={undefined}
            experimental={undefined}
            headerIcons={undefined}
            isDraggable={undefined}
            onCanvasBlur={() => undefined}
            onCanvasFocused={() => undefined}
            onCellFocused={() => undefined}
            onContextMenu={() => undefined}
            onDragEnd={() => undefined}
            onDragLeave={() => undefined}
            onDragOverCell={() => undefined}
            onDragStart={() => undefined}
            onDrop={() => undefined}
            onItemHovered={() => undefined}
            onKeyDown={() => undefined}
            onKeyUp={() => undefined}
            onMouseDown={() => undefined}
            onMouseMoveRaw={() => undefined}
            onMouseUp={() => undefined}
            resizeColumn={undefined}
            smoothScrollX={undefined}
            smoothScrollY={undefined}
            allowResize={undefined}
            canvasRef={undefined}
            disabledRows={undefined}
            eventTargetRef={undefined}
            fillHandle={undefined}
            fillHandleLocation="selected-cell"
            fixedShadowX={undefined}
            fixedShadowY={undefined}
            getGroupDetails={undefined}
            getRowThemeOverride={undefined}
            highlightRegions={undefined}
            imageWindowLoader={new ImageWindowLoaderImpl()}
            onHeaderMenuClick={undefined}
            prelightCells={undefined}
            translateX={undefined}
            translateY={undefined}
            dragAndDropState={undefined}
            drawCustomCell={undefined}
            drawFocusRing={undefined}
            isFocused={true}
            cellYOffset={y}
            isFilling={false}
            onMouseMove={() => undefined}
            groupHeaderHeight={0}
            accessibilityHeight={50}
            enableGroups={false}
            selection={emptyGridSelection}
            rows={100_000}
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
            getCellRenderer={getCellRenderer}
            width={1800}
            height={1000}
            cellXOffset={0}
            isFocused={true}
            drawHeader={undefined}
            experimental={undefined}
            headerIcons={undefined}
            isDraggable={undefined}
            onCanvasBlur={() => undefined}
            onCanvasFocused={() => undefined}
            onCellFocused={() => undefined}
            onContextMenu={() => undefined}
            onDragEnd={() => undefined}
            onDragLeave={() => undefined}
            onDragOverCell={() => undefined}
            onDragStart={() => undefined}
            onDrop={() => undefined}
            onItemHovered={() => undefined}
            onKeyDown={() => undefined}
            onKeyUp={() => undefined}
            onMouseDown={() => undefined}
            onMouseMoveRaw={() => undefined}
            onMouseUp={() => undefined}
            smoothScrollX={undefined}
            resizeColumn={undefined}
            smoothScrollY={undefined}
            allowResize={undefined}
            canvasRef={undefined}
            disabledRows={undefined}
            eventTargetRef={undefined}
            fillHandle={undefined}
            fillHandleLocation="selected-cell"
            fixedShadowX={undefined}
            fixedShadowY={undefined}
            getGroupDetails={undefined}
            getRowThemeOverride={undefined}
            highlightRegions={undefined}
            imageWindowLoader={new ImageWindowLoaderImpl()}
            onHeaderMenuClick={undefined}
            prelightCells={undefined}
            translateX={undefined}
            translateY={undefined}
            dragAndDropState={undefined}
            drawCustomCell={undefined}
            drawFocusRing={undefined}
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
            getCellRenderer={getCellRenderer}
            onMouseMove={() => undefined}
            width={1800}
            height={1000}
            cellXOffset={0}
            cellYOffset={0}
            isFocused={true}
            resizeColumn={undefined}
            drawHeader={undefined}
            experimental={undefined}
            headerIcons={undefined}
            isDraggable={undefined}
            onCanvasBlur={() => undefined}
            onCanvasFocused={() => undefined}
            onCellFocused={() => undefined}
            onContextMenu={() => undefined}
            onDragEnd={() => undefined}
            onDragLeave={() => undefined}
            onDragOverCell={() => undefined}
            onDragStart={() => undefined}
            onDrop={() => undefined}
            onItemHovered={() => undefined}
            onKeyDown={() => undefined}
            onKeyUp={() => undefined}
            onMouseDown={() => undefined}
            onMouseMoveRaw={() => undefined}
            onMouseUp={() => undefined}
            smoothScrollX={undefined}
            smoothScrollY={undefined}
            allowResize={undefined}
            canvasRef={undefined}
            disabledRows={undefined}
            eventTargetRef={undefined}
            fillHandle={undefined}
            fillHandleLocation="selected-cell"
            fixedShadowX={undefined}
            fixedShadowY={undefined}
            getGroupDetails={undefined}
            getRowThemeOverride={undefined}
            highlightRegions={undefined}
            imageWindowLoader={new ImageWindowLoaderImpl()}
            onHeaderMenuClick={undefined}
            prelightCells={undefined}
            translateX={undefined}
            translateY={undefined}
            dragAndDropState={undefined}
            drawCustomCell={undefined}
            drawFocusRing={undefined}
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
            getCellRenderer={getCellRenderer}
            onMouseMove={() => undefined}
            width={1800}
            height={1000}
            cellXOffset={0}
            cellYOffset={0}
            isFocused={true}
            resizeColumn={undefined}
            drawHeader={undefined}
            experimental={undefined}
            headerIcons={undefined}
            isDraggable={undefined}
            onCanvasBlur={() => undefined}
            onCanvasFocused={() => undefined}
            onCellFocused={() => undefined}
            onContextMenu={() => undefined}
            onDragEnd={() => undefined}
            onDragLeave={() => undefined}
            onDragOverCell={() => undefined}
            onDragStart={() => undefined}
            onDrop={() => undefined}
            onItemHovered={() => undefined}
            onKeyDown={() => undefined}
            onKeyUp={() => undefined}
            onMouseDown={() => undefined}
            onMouseMoveRaw={() => undefined}
            onMouseUp={() => undefined}
            smoothScrollX={undefined}
            smoothScrollY={undefined}
            allowResize={undefined}
            canvasRef={undefined}
            disabledRows={undefined}
            eventTargetRef={undefined}
            fillHandle={undefined}
            fillHandleLocation="selected-cell"
            fixedShadowX={undefined}
            fixedShadowY={undefined}
            getGroupDetails={undefined}
            getRowThemeOverride={undefined}
            highlightRegions={undefined}
            imageWindowLoader={new ImageWindowLoaderImpl()}
            onHeaderMenuClick={undefined}
            prelightCells={undefined}
            translateX={undefined}
            translateY={undefined}
            dragAndDropState={undefined}
            drawCustomCell={undefined}
            drawFocusRing={undefined}
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
