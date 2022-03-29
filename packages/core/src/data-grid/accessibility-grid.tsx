import React from "react";
import { CellRenderers } from "./cells";
import { getEffectiveColumns, MappedGridColumn } from "./data-grid-lib";
import makeRange from "lodash/range";
import {
    GridCellKind,
    GridKeyEventArgs,
    GridSelection,
    InnerGridCell,
    isInnerOnlyCell,
    isReadWriteCell,
    Item,
    Rectangle,
} from "./data-grid-types";

interface Props {
    selection: GridSelection;
    width: number;
    mappedColumns: readonly MappedGridColumn[];
    cellXOffset: number;
    translateX: number;
    cellYOffset: number;
    rows: number;
    accessibilityHeight: number;
    firstColAccessible: boolean;
    dragAndDropState:
        | {
              src: number;
              dest: number;
          }
        | undefined;
    focusRef: React.MutableRefObject<HTMLElement | null>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | undefined;
    getCellContent: (cell: Item) => InnerGridCell;
    getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle;
    focusElement: (el: HTMLElement | null) => void;
    onCellFocused: ((args: Item) => void) | undefined;
    onKeyDown: ((event: GridKeyEventArgs) => void) | undefined;
}

export const AccessibilityGrid: React.VFC<Props> = p => {
    const {
        accessibilityHeight,
        canvasRef,
        cellXOffset,
        cellYOffset,
        dragAndDropState,
        firstColAccessible,
        focusElement,
        focusRef,
        getBoundsForItem,
        getCellContent,
        mappedColumns,
        onCellFocused,
        onKeyDown,
        rows,
        selection,
        translateX,
        width,
    } = p;
    if (width < 50) return null;
    let effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
    const colOffset = firstColAccessible ? 0 : -1;
    if (!firstColAccessible && effectiveCols[0]?.sourceIndex === 0) {
        effectiveCols = effectiveCols.slice(1);
    }

    const getRowData = (cell: InnerGridCell) => {
        if (cell.kind === GridCellKind.Custom) {
            return cell.copyData;
        } else {
            return CellRenderers[cell.kind].getAccessibilityString(cell);
        }
    };
    const [fCol, fRow] = selection.current?.cell ?? [];
    const range = selection.current?.range;

    return (
        <table
            key="access-tree"
            role="grid"
            aria-rowcount={rows + 1}
            aria-multiselectable="true"
            aria-colcount={mappedColumns.length + colOffset}>
            <thead role="rowgroup">
                <tr role="row" aria-rowindex={1} row-index={1}>
                    {effectiveCols.map(c => (
                        <th
                            role="columnheader"
                            aria-selected={selection.columns.hasIndex(c.sourceIndex)}
                            aria-colindex={c.sourceIndex + 1 + colOffset}
                            tabIndex={-1}
                            onFocus={e => {
                                if (e.target === focusRef.current) return;
                                return onCellFocused?.([c.sourceIndex, -1]);
                            }}
                            key={c.sourceIndex}>
                            {c.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody role="rowgroup">
                {makeRange(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight)).map(row => (
                    <tr
                        role="row"
                        aria-selected={selection.rows.hasIndex(row)}
                        key={row}
                        aria-rowindex={row + 2}
                        row-index={row + 2}>
                        {effectiveCols.map(c => {
                            const col = c.sourceIndex;
                            const key = `${col},${row}`;
                            const focused = fCol === col && fRow === row;
                            const selected =
                                range !== undefined &&
                                col >= range.x &&
                                col < range.x + range.width &&
                                row >= range.y &&
                                row < range.y + range.height;
                            const id = `glide-cell-${col}-${row}`;
                            const cellContent = getCellContent([col, row]);
                            return (
                                <td
                                    key={key}
                                    role="gridcell"
                                    aria-colindex={col + 1 + colOffset}
                                    aria-selected={selected}
                                    aria-readonly={isInnerOnlyCell(cellContent) || !isReadWriteCell(cellContent)}
                                    id={id}
                                    data-testid={id}
                                    onClick={() => {
                                        const canvas = canvasRef?.current;
                                        if (canvas === null || canvas === undefined) return;
                                        return onKeyDown?.({
                                            bounds: getBoundsForItem(canvas, col, row),
                                            cancel: () => undefined,
                                            ctrlKey: false,
                                            key: "Enter",
                                            keyCode: 13,
                                            metaKey: false,
                                            shiftKey: false,
                                            altKey: false,
                                        });
                                    }}
                                    onFocusCapture={e => {
                                        if (e.target === focusRef.current) return;
                                        return onCellFocused?.([col, row]);
                                    }}
                                    ref={focused ? focusElement : undefined}
                                    tabIndex={-1}>
                                    {getRowData(cellContent)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
