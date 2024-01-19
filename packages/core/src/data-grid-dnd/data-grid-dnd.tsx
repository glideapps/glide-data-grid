/* eslint-disable unicorn/consistent-destructuring */
import clamp from 'lodash/clamp.js';
import * as React from 'react';
import DataGrid, { DataGridProps, DataGridRef } from '../data-grid/data-grid';
import type {
  GridColumn,
  GridMouseEventArgs,
  InnerGridColumn,
  Rectangle,
} from '../data-grid/data-grid-types';

type Props = Omit<
  DataGridProps,
  | 'dragAndDropState'
  | 'isResizing'
  | 'resizeCol'
  | 'isDragging'
  | 'onMouseMoveRaw'
  | 'allowResize'
  | 'resetDragAndDropState'
>;

export interface DataGridDndProps extends Props {
  /**
   * Called whenever a row re-order operation is completed. Setting the callback enables re-ordering by dragging the
   * first column of a row.
   * @group Drag and Drop
   */
  readonly onRowMoved?: (rowsIndex: number[], endIndex: number) => void;
  /**
   * Called when the user finishes moving a column. It should return a promise, and when the promise is resolved
   * with true, that means the move is confirmed. When the promise is rejected or resolved with false, that means
   * the move is canceled. `startIndex` is the index of the column that was moved, and
   * `endIndex` is the index at which it should end up. Note that you have to effect the move of the column, and pass
   * the reordered columns back in the `columns` property.
   * @group Drag and Drop
   */
  readonly onColumnMoved?: (startIndex: number, endIndex: number) => Promise<boolean>;

  /**
   * Called when the user is resizing a column. `newSize` is the new size of the column. Note that you have change
   * the size of the column in the `GridColumn` and pass it back to the grid in the `columns` property.
   * @group Drag and Drop
   * @param column The `GridColumn` being resized
   * @param newSize The new size of the grid column
   * @param colIndex The index of the column
   * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
   */
  readonly onColumnResize?: (
    column: GridColumn,
    newSize: number,
    colIndex: number,
    newSizeWithGrow: number
  ) => void;
  /**
   * Called when the user starts resizing a column. `newSize` is the new size of the column.
   * @group Drag and Drop
   * @param column The `GridColumn` being resized
   * @param newSize The new size of the grid column
   * @param colIndex The index of the column
   * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
   */
  readonly onColumnResizeStart?: (
    column: GridColumn,
    newSize: number,
    colIndex: number,
    newSizeWithGrow: number
  ) => void;
  /**
   * Called when the user finishes resizing a column. `newSize` is the new size of the column.
   * @group Drag and Drop
   * @param column The `GridColumn` being resized
   * @param newSize The new size of the grid column
   * @param colIndex The index of the column
   * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
   */
  readonly onColumnResizeEnd?: (
    column: GridColumn,
    newSize: number,
    colIndex: number,
    newSizeWithGrow: number
  ) => void;

  readonly gridRef?: React.MutableRefObject<DataGridRef | null>;
  readonly maxColumnWidth: number;
  readonly minColumnWidth: number;
  readonly lockColumns: number;
}

// Dear Past Jason,
// Wtf does this function do? If you remember in the future come back and add a comment
// -- Future-Past Jason
function offsetColumnSize(
  column: InnerGridColumn,
  width: number,
  min: number,
  max: number
): number {
  return clamp(Math.round(width - (column.growOffset ?? 0)), Math.ceil(min), Math.floor(max));
}

const DataGridDnd: React.FunctionComponent<DataGridDndProps> = (p) => {
  const [resizeColStartX, setResizeColStartX] = React.useState<number>();
  const [resizeCol, setResizeCol] = React.useState<number>();

  const [dragCol, setDragCol] = React.useState<number>();
  const [dropCol, setDropCol] = React.useState<number>();
  const [dragColActive, setDragColActive] = React.useState(false);
  const [dragStartX, setDragStartX] = React.useState<number>();

  const [dragRow, setDragRow] = React.useState<number>();
  const [dropRow, setDropRow] = React.useState<number>();
  const [dragRowActive, setDragRowActive] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState<number>();
  const {
    onHeaderMenuClick,
    onColumnMoved,
    onColumnResize,
    onColumnResizeStart,
    onColumnResizeEnd,
    gridRef,
    maxColumnWidth,
    minColumnWidth,
    onRowMoved,
    lockColumns,
    onMouseDown,
    onMouseUp,
    onItemHovered,
    onDragStart,
    getGroupRowDetails,
    onDragOverCell,
    onDrop,
  } = p;

  const canResize = (onColumnResize ?? onColumnResizeEnd ?? onColumnResizeStart) !== undefined;

  const { columns, selection } = p;
  const selectedColumns = selection.columns;

  const onItemHoveredImpl = React.useCallback(
    (args: GridMouseEventArgs) => {
      const [col, row] = args.location;
      if (dragCol !== undefined && dropCol !== col && col >= lockColumns) {
        setDragColActive(true);
        setDropCol(col);
      } else if (dragRow !== undefined && row !== undefined) {
        setDragRowActive(true);
        setDropRow(Math.max(0, row));
      } else {
        onItemHovered?.(args);
      }
    },
    [dragCol, dragRow, dropCol, onItemHovered, lockColumns]
  );

  const onMouseDownImpl = React.useCallback(
    (args: GridMouseEventArgs) => {
      if (args.button === 0) {
        const [col] = args.location;
        if (args.kind === 'out-of-bounds' && args.isEdge && canResize) {
          const bounds = gridRef?.current?.getBounds(columns.length - 1, -1);
          if (bounds !== undefined) {
            setResizeColStartX(bounds.x);
            setResizeCol(columns.length - 1);
          }
        } else if (args.kind === 'header' && col >= lockColumns && args.isEdge && canResize) {
          setResizeColStartX(args.bounds.x);
          setResizeCol(col);
          onColumnResizeStart?.(
            columns[col],
            args.bounds.width,
            col,
            args.bounds.width + (columns[col].growOffset ?? 0)
          );
        }
      }
      onMouseDown?.(args);
    },
    [canResize, columns, gridRef, lockColumns, onColumnResizeStart, onMouseDown]
  );

  const onHeaderMenuClickMangled = React.useCallback(
    (col: number, screenPosition: Rectangle) => {
      if (dragColActive || dragRowActive) return;
      onHeaderMenuClick?.(col, screenPosition);
    },
    [dragColActive, dragRowActive, onHeaderMenuClick]
  );

  const lastResizeWidthRef = React.useRef(-1);

  const clearAll = React.useCallback(() => {
    lastResizeWidthRef.current = -1;
    setDragRow(undefined);
    setDropRow(undefined);
    setDragStartY(undefined);
    setDragRowActive(false);
    setDragCol(undefined);
    setDropCol(undefined);
    setDragStartX(undefined);
    setDragColActive(false);
    setResizeCol(undefined);
    setResizeColStartX(undefined);
  }, []);

  const onMouseUpImpl = React.useCallback(
    (
      args: GridMouseEventArgs,
      isOutside: boolean,
      isContextMenuClick: boolean,
      ignoreOutsideClick: boolean
    ) => {
      if (args.button === 0) {
        if (resizeCol !== undefined) {
          // if the column is in selection, the selection may contain extra cols, so lets just re-send the last
          // resize event to all those columns.
          if (selectedColumns?.hasIndex(resizeCol) === true) {
            for (const c of selectedColumns) {
              if (c === resizeCol) continue;
              const col = columns[c];
              const newSize = offsetColumnSize(
                col,
                lastResizeWidthRef.current,
                minColumnWidth,
                maxColumnWidth
              );
              onColumnResize?.(col, newSize, c, newSize + (col.growOffset ?? 0));
            }
          }

          const ns = offsetColumnSize(
            columns[resizeCol],
            lastResizeWidthRef.current,
            minColumnWidth,
            maxColumnWidth
          );
          onColumnResizeEnd?.(
            columns[resizeCol],
            ns,
            resizeCol,
            ns + (columns[resizeCol].growOffset ?? 0)
          );
          for (const c of selectedColumns) {
            if (c === resizeCol) continue;
            const col = columns[c];
            const s = offsetColumnSize(
              col,
              lastResizeWidthRef.current,
              minColumnWidth,
              maxColumnWidth
            );
            onColumnResizeEnd?.(col, s, c, s + (col.growOffset ?? 0));
          }
        }

        clearAll();
      }

      onMouseUp?.(args, isOutside, isContextMenuClick, ignoreOutsideClick);
    },
    [
      clearAll,
      columns,
      maxColumnWidth,
      minColumnWidth,
      onColumnResize,
      onColumnResizeEnd,
      onMouseUp,
      resizeCol,
      selectedColumns,
    ]
  );

  const dragOffset = React.useMemo(() => {
    if (dragCol !== undefined && dropCol !== undefined && dragCol !== dropCol) {
      return {
        column: {
          src: dragCol,
          dest: dropCol,
        },
      };
    }

    if (dragRow !== undefined && dropRow !== undefined && dragRow !== dropRow) {
      return {
        cell: {
          src: dragRow,
          dest: dropRow,
        },
      };
    }
  }, [dragCol, dragRow, dropCol, dropRow]);

  const onMouseMove = React.useCallback(
    (event: MouseEvent) => {
      if (dragCol !== undefined && dragStartX !== undefined) {
        const diff = Math.abs(event.clientX - dragStartX);
        if (diff > 20) {
          setDragColActive(true);
        }
      } else if (dragRow !== undefined && dragStartY !== undefined) {
        const diff = Math.abs(event.clientY - dragStartY);
        if (diff > 20) {
          setDragRowActive(true);
        }
      } else if (resizeCol !== undefined && resizeColStartX !== undefined) {
        const column = columns[resizeCol];
        const newWidth = event.clientX - resizeColStartX;
        const ns = offsetColumnSize(column, newWidth, minColumnWidth, maxColumnWidth);
        onColumnResize?.(column, ns, resizeCol, ns + (column.growOffset ?? 0));
        lastResizeWidthRef.current = newWidth;

        if (selectedColumns?.first() === resizeCol) {
          for (const c of selectedColumns) {
            if (c === resizeCol) continue;
            const col = columns[c];
            const s = offsetColumnSize(
              col,
              lastResizeWidthRef.current,
              minColumnWidth,
              maxColumnWidth
            );
            onColumnResize?.(col, s, c, s + (col.growOffset ?? 0));
          }
        }
      }
    },
    [
      dragCol,
      dragStartX,
      dragRow,
      dragStartY,
      resizeCol,
      resizeColStartX,
      columns,
      minColumnWidth,
      maxColumnWidth,
      onColumnResize,
      selectedColumns,
    ]
  );

  const onDragStartImpl = React.useCallback<NonNullable<DataGridDndProps['onDragStart']>>(
    (args) => {
      onDragStart?.(args);
      if (!args.defaultPrevented()) {
        clearAll();
      }
      if (args.kind === 'header') {
        setDragColActive(true);
        setDragCol(args.location[0]);
      } else if (args.kind === 'cell') {
        setDragRowActive(true);
        setDragRow(args.location[1] ?? 0);
      }
    },
    [clearAll, onDragStart]
  );

  const onDragOverCellImpl = React.useCallback<NonNullable<DataGridDndProps['onDragOverCell']>>(
    (args, data) => {
      const row = args[1];
      onDragOverCell?.(args, data);
      setDropCol(args[0]);
      if (!selection.rows.hasIndex(row)) {
        setDropRow(row);
      } else {
        setDropRow(undefined);
      }
    },
    [onDragOverCell, selection.rows]
  );

  const onDropImpl = React.useCallback<NonNullable<DataGridDndProps['onDrop']>>(
    async (args, data) => {
      let isConfirmed = true;
      clearAll();
      if (dragCol !== args[0] && dragCol !== undefined) {
        const targetCol = args[0];
        isConfirmed = (await onColumnMoved?.(dragCol, targetCol)) ?? true;
      }
      if (dragRow !== undefined && dropRow !== undefined) {
        const targetRow = args[1];
        const hasIndex = p.selection.rows.hasIndex(dragRow);
        if (hasIndex) {
          onRowMoved?.(p.selection.rows.toArray(), targetRow);
        } else {
          onRowMoved?.([dragRow], targetRow);
        }
      }
      if (isConfirmed) {
        onDrop?.(args, data);
      }
    },
    [clearAll, dragCol, dragRow, dropRow, onColumnMoved, onDrop, onRowMoved, p.selection.rows]
  );

  return (
    <DataGrid
      accessibilityHeight={p.accessibilityHeight}
      canvasRef={p.canvasRef}
      cellXOffset={p.cellXOffset}
      cellYOffset={p.cellYOffset}
      columns={p.columns}
      disabledRows={p.disabledRows}
      drawCustomCell={p.drawCustomCell}
      drawFocusRing={p.drawFocusRing}
      drawHeader={p.drawHeader}
      enableGroups={p.enableGroups}
      eventTargetRef={p.eventTargetRef}
      experimental={p.experimental}
      fillHandle={p.fillHandle}
      firstColAccessible={p.firstColAccessible}
      fixedShadowX={p.fixedShadowX}
      fixedShadowY={p.fixedShadowY}
      freezeColumns={p.freezeColumns}
      getCellRenderer={p.getCellRenderer}
      getGroupDetails={p.getGroupDetails}
      getRowThemeOverride={p.getRowThemeOverride}
      groupHeaderHeight={p.groupHeaderHeight}
      headerHeight={p.headerHeight}
      headerIcons={p.headerIcons}
      height={p.height}
      highlightRegions={p.highlightRegions}
      imageWindowLoader={p.imageWindowLoader}
      isDraggable={p.isDraggable}
      isFilling={p.isFilling}
      isFocused={p.isFocused}
      isOutsideClick={p.isOutsideClick}
      onCanvasBlur={p.onCanvasBlur}
      onCanvasFocused={p.onCanvasFocused}
      onCellFocused={p.onCellFocused}
      onContextMenu={p.onContextMenu}
      onDragEnd={p.onDragEnd}
      onDragLeave={p.onDragLeave}
      onDragOverCell={onDragOverCellImpl}
      onDrop={onDropImpl}
      onKeyDown={p.onKeyDown}
      onKeyUp={p.onKeyUp}
      onMouseMove={p.onMouseMove}
      prelightCells={p.prelightCells}
      rowHeight={p.rowHeight}
      rows={p.rows}
      resizeCol={resizeCol}
      selection={p.selection}
      smoothScrollX={p.smoothScrollX}
      smoothScrollY={p.smoothScrollY}
      theme={p.theme}
      trailingRowType={p.trailingRowType}
      translateX={p.translateX}
      translateY={p.translateY}
      verticalBorder={p.verticalBorder}
      width={p.width}
      getCellContent={p.getCellContent}
      isResizing={resizeCol !== undefined}
      onHeaderMenuClick={onHeaderMenuClickMangled}
      isDragging={dragColActive}
      onItemHovered={onItemHoveredImpl}
      onDragStart={onDragStartImpl}
      onMouseDown={onMouseDownImpl}
      allowResize={canResize}
      onMouseUp={onMouseUpImpl}
      dragAndDropState={dragOffset}
      onMouseMoveRaw={onMouseMove}
      ref={gridRef}
      lockColumns={lockColumns}
      disabledDragColsAndRows={p.disabledDragColsAndRows}
      getGroupRowDetails={getGroupRowDetails}
      resetDragAndDropState={clearAll}
    />
  );
};

export default DataGridDnd;
