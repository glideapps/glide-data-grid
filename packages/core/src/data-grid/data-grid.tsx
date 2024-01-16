import * as React from 'react';
import type { Theme } from '../common/styles';
import ImageWindowLoaderImpl from '../common/image-window-loader';
import {
  computeBounds,
  getColumnIndexForX,
  getEffectiveColumns,
  getRowIndexForY,
  getStickyWidth,
  useMappedColumns,
} from './data-grid-lib';
import {
  booleanCellIsEditable,
  CellList,
  CompactSelection,
  DrawCustomCellCallback,
  DrawHeaderCallback,
  GridCellKind,
  GridDragEventArgs,
  GridKeyEventArgs,
  GridMouseEventArgs,
  GridMouseHeaderEventArgs,
  GridRow,
  GridRowKind,
  GridSelection,
  groupHeaderKind,
  headerKind,
  ImageWindowLoader,
  InnerGridCell,
  InnerGridCellKind,
  InnerGridColumn,
  isInnerOnlyCell,
  isReadWriteCell,
  Item,
  outOfBoundsKind,
  Rectangle,
  TrailingRowType,
} from './data-grid-types';
import { SpriteManager, SpriteMap } from './data-grid-sprites';
import { isColumnIconHovered, useDebouncedMemo, useEventListener } from '../common/utils';
import clamp from 'lodash/clamp.js';
import makeRange from 'lodash/range.js';
import {
  BlitData,
  drawGrid,
  DrawGridArg,
  getActionBoundsForGroup,
  getHeaderMenuBounds,
  GetRowThemeCallback,
  GroupDetailsCallback,
  Highlight,
  pointInRect,
} from './data-grid-render';
import { AnimationManager, StepCallback } from './animation-manager';
import { browserIsFirefox, browserIsSafari } from '../common/browser-detect';
import { useAnimationQueue } from './use-animation-queue';
import { assert } from '../common/support';
import type { CellRenderer, GetCellRendererCallback } from './cells/cell-types';
import useDragAndDrop from '../data-editor/use-drag-and-drop';

export interface DataGridProps {
  readonly width: number;
  readonly height: number;

  readonly cellXOffset: number;
  readonly cellYOffset: number;

  readonly translateX: number | undefined;
  readonly translateY: number | undefined;

  readonly accessibilityHeight: number;

  readonly freezeColumns: number;
  readonly trailingRowType: TrailingRowType;
  readonly firstColAccessible: boolean;

  /**
   * Enables or disables the overlay shadow when scrolling horizontally
   * @group Style
   */
  readonly fixedShadowX: boolean | undefined;
  /**
   * Enables or disables the overlay shadow when scrolling vertical
   * @group Style
   */
  readonly fixedShadowY: boolean | undefined;

  readonly allowResize: boolean | undefined;
  readonly isResizing: boolean;
  readonly isDragging: boolean;
  readonly isFilling: boolean;
  readonly isFocused: boolean;

  readonly columns: readonly InnerGridColumn[];
  /**
   * The number of rows in the grid.
   * @group Data
   */
  readonly rows: number;
  readonly resizeCol: number | undefined;
  readonly headerHeight: number;
  readonly groupHeaderHeight: number;
  readonly enableGroups: boolean;
  readonly rowHeight: number | ((index: number) => number);

  readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | undefined;

  readonly eventTargetRef: React.MutableRefObject<HTMLDivElement | null> | undefined;

  readonly getCellContent: (cell: Item) => InnerGridCell;
  /**
   * Provides additional details about rows, can be used to render groups and custom rows.
   * @group Data
   */
  readonly getGroupRowDetails: (row: number) => GridRow | undefined;
  /**
   * Provides additional details about groups to extend group functionality.
   * @group Data
   */
  readonly getGroupDetails: GroupDetailsCallback | undefined;
  /**
   * Provides per row theme overrides.
   * @group Style
   */
  readonly getRowThemeOverride: GetRowThemeCallback | undefined;
  /**
   * Emitted when a header menu disclosure indicator is clicked.
   * @group Events
   */
  readonly onHeaderMenuClick: ((col: number, screenPosition: Rectangle) => void) | undefined;

  readonly selection: GridSelection;
  readonly prelightCells: readonly Item[] | undefined;
  /**
   * Highlight regions provide hints to users about relations between cells and selections.
   * @group Selection
   */
  readonly highlightRegions: readonly Highlight[] | undefined;

  /**
   * Enabled/disables the fill handle.
   * @defaultValue false
   * @group Editing
   */
  readonly fillHandle: boolean | undefined;

  readonly disabledRows: CompactSelection | undefined;
  /**
   * Allows passing a custom image window loader.
   * @group Advanced
   */
  readonly imageWindowLoader: ImageWindowLoader | undefined;

  /**
   * Emitted when an item is hovered.
   * @group Events
   */
  readonly onItemHovered: (args: GridMouseEventArgs) => void;
  readonly onMouseMove: (args: GridMouseEventArgs) => void;
  readonly onMouseDown: (args: GridMouseEventArgs) => void;
  readonly onMouseUp: (
    args: GridMouseEventArgs,
    isOutside: boolean,
    isContextMenuClick: boolean,
    shouldIgnoreOutsideClick: boolean
  ) => void;
  readonly onContextMenu: (args: GridMouseEventArgs, preventDefault: () => void) => void;

  readonly onCanvasFocused: () => void;
  readonly onCanvasBlur: () => void;
  readonly onCellFocused: (args: Item) => void;

  readonly onMouseMoveRaw: (event: MouseEvent) => void;

  /**
   * Emitted when the canvas receives a key down event.
   * @group Events
   */
  readonly onKeyDown: (event: GridKeyEventArgs) => void;
  /**
   * Emitted when the canvas receives a key up event.
   * @group Events
   */
  readonly onKeyUp: ((event: GridKeyEventArgs) => void) | undefined;

  readonly verticalBorder: (col: number) => boolean;

  /**
   * Determines what can be dragged using HTML drag and drop
   * @group Drag and Drop
   */
  readonly isDraggable: boolean | 'cell' | 'header' | undefined;
  /**
   * If `isDraggable` is set, the grid becomes HTML draggable, and `onDragStart` will be called when dragging starts.
   * You can use this to build a UI where the user can drag the Grid around.
   * @group Drag and Drop
   */
  readonly onDragStart: (args: GridDragEventArgs) => void;
  readonly onDragEnd: () => void;

  /** @group Drag and Drop */
  readonly onDragOverCell: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
  /** @group Drag and Drop */
  readonly onDragLeave: (() => void) | undefined;

  /**
   * Called when a HTML Drag and Drop event is ended on the data grid.
   * @group Drag and Drop
   */
  readonly onDrop: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;

  readonly drawCustomCell: DrawCustomCellCallback | undefined;
  /**
   * Overrides the rendering of a header. The grid will call this for every header it needs to render. Header
   * rendering is not as well optimized because they do not redraw as often, but very heavy drawing methods can
   * negatively impact horizontal scrolling performance.
   *
   * It is possible to return `false` after rendering just a background and the regular foreground rendering
   * will happen.
   * @group Drawing
   * @returns `false` if default header rendering should still happen, `true` to cancel rendering.
   */
  readonly drawHeader: DrawHeaderCallback | undefined;
  /**
   * Controls the drawing of the focus ring.
   * @defaultValue true
   * @group Style
   */
  readonly drawFocusRing: boolean | undefined;

  readonly dragAndDropState:
    | {
        column?: {
          src: number;
          dest: number;
        };
        cell?: {
          src: number;
          dest: number;
        };
      }
    | undefined;

  /**
   * Experimental features
   * @group Advanced
   * @experimental
   */
  readonly experimental:
    | {
        readonly paddingRight?: number;
        readonly paddingBottom?: number;
        readonly enableFirefoxRescaling?: boolean;
        readonly isSubGrid?: boolean;
        readonly strict?: boolean;
        readonly scrollbarWidthOverride?: number;
        readonly hyperWrapping?: boolean;
        readonly renderStrategy?: 'single-buffer' | 'double-buffer' | 'direct';
      }
    | undefined;

  /**
   * Additional header icons for use by `GridColumn`.
   *
   * Providing custom header icons to the data grid must be done with a somewhat non-standard mechanism to allow
   * theming and scaling. The `headerIcons` property takes a dictionary which maps icon names to functions which can
   * take a foreground and background color and returns back a string representation of an svg. The svg should contain
   * a header similar to this `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">` and
   * interpolate the fg/bg colors into the string.
   *
   * We recognize this process is not fantastic from a graphics workflow standpoint, improvements are very welcome
   * here.
   *
   * @group Style
   */
  readonly headerIcons: SpriteMap | undefined;

  /** Controls smooth scrolling in the data grid. If smooth scrolling is not enabled the grid will always be cell
   * aligned.
   * @defaultValue `false`
   * @group Style
   */
  readonly smoothScrollX: boolean | undefined;
  /** Controls smooth scrolling in the data grid. If smooth scrolling is not enabled the grid will always be cell
   * aligned.
   * @defaultValue `false`
   * @group Style
   */
  readonly smoothScrollY: boolean | undefined;

  readonly theme: Theme;

  readonly getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;

  readonly lockColumns: number;

  readonly disabledDragColsAndRows?: {
    rows?: number[];
    cols?: number[];
  };

  readonly resetDragAndDropState: VoidFunction;
}

type DamageUpdateList = readonly {
  cell: Item;
  // newValue: GridCell,
}[];

export interface DataGridRef {
  focus: () => void;
  getBounds: (col: number, row?: number) => Rectangle | undefined;
  damage: (cells: DamageUpdateList) => void;
}

const getRowData = (
  cell: InnerGridCell,
  index: number,
  getCellRenderer?: GetCellRendererCallback
) => {
  if (cell.kind === GridCellKind.Custom) return cell.copyData;
  const r = getCellRenderer?.(cell);

  if (index !== 0 && cell.kind === 'group') {
    /**
     * We render group row by cells; repeating the same name in multiple cells causes readers to read it multiple times. Thus, we only render the name in the first cell, index 0, and skip the others.
     */
    return '';
  }
  return r?.getAccessibilityString(cell) ?? '';
};

const DataGrid: React.ForwardRefRenderFunction<DataGridRef, DataGridProps> = (p, forwardedRef) => {
  const {
    width,
    height,
    accessibilityHeight,
    columns,
    cellXOffset: cellXOffsetReal,
    cellYOffset,
    headerHeight,
    fillHandle = false,
    groupHeaderHeight,
    rowHeight,
    rows,
    resizeCol,
    getCellContent,
    getRowThemeOverride,
    onHeaderMenuClick,
    enableGroups,
    isFilling,
    onCanvasFocused,
    onCanvasBlur,
    isFocused,
    selection,
    freezeColumns,
    onContextMenu,
    trailingRowType: trailingRowType,
    fixedShadowX = true,
    fixedShadowY = true,
    drawFocusRing = true,
    onMouseDown,
    onMouseUp,
    onMouseMoveRaw,
    onMouseMove,
    onItemHovered,
    dragAndDropState,
    firstColAccessible,
    onKeyDown,
    onKeyUp,
    highlightRegions,
    canvasRef,
    onDragStart,
    onDragEnd,
    eventTargetRef,
    isResizing,
    isDragging,
    isDraggable = false,
    allowResize,
    disabledRows,
    getGroupDetails,
    theme,
    prelightCells,
    headerIcons,
    verticalBorder,
    drawHeader: drawHeaderCallback,
    drawCustomCell,
    onCellFocused,
    onDragOverCell,
    onDrop,
    onDragLeave,
    imageWindowLoader,
    smoothScrollX = false,
    smoothScrollY = false,
    experimental,
    getCellRenderer,
    lockColumns,
    disabledDragColsAndRows,
    getGroupRowDetails,
    resetDragAndDropState,
  } = p;
  const translateX = p.translateX ?? 0;
  const translateY = p.translateY ?? 0;
  const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));

  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const imageWindowLoaderInternal = React.useMemo<ImageWindowLoader>(
    () => new ImageWindowLoaderImpl(),
    []
  );
  const imageLoader = imageWindowLoader ?? imageWindowLoaderInternal;
  const damageRegion = React.useRef<readonly Item[] | undefined>();
  const [scrolling, setScrolling] = React.useState<boolean>(false);
  const hoverValues = React.useRef<readonly { item: Item; hoverAmount: number }[]>([]);
  const lastBlitData = React.useRef<BlitData | undefined>();
  const [hoveredItemInfo, setHoveredItemInfo] =
    React.useState<[Item, readonly [number, number]] | undefined>();
  const [hoveredOnEdge, setHoveredOnEdge] = React.useState<boolean>();
  const overlayRef = React.useRef<HTMLCanvasElement | null>(null);

  const [lastWasTouch, setLastWasTouch] = React.useState(false);
  const lastWasTouchRef = React.useRef(lastWasTouch);
  lastWasTouchRef.current = lastWasTouch;

  const spriteManager = React.useMemo(
    () =>
      new SpriteManager(headerIcons, () => {
        lastArgsRef.current = undefined;
        lastDrawRef.current();
      }),
    [headerIcons]
  );
  const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;

  const scrollingStopRef = React.useRef(-1);
  const disableFirefoxRescaling = experimental?.enableFirefoxRescaling !== true;
  React.useLayoutEffect(() => {
    if (!browserIsFirefox.value || window.devicePixelRatio === 1 || disableFirefoxRescaling) return;
    // We don't want to go into scroll mode for a single repaint
    if (scrollingStopRef.current !== -1) {
      setScrolling(true);
    }
    window.clearTimeout(scrollingStopRef.current);
    scrollingStopRef.current = window.setTimeout(() => {
      setScrolling(false);
      scrollingStopRef.current = -1;
    }, 200);
  }, [cellYOffset, cellXOffset, translateX, translateY, disableFirefoxRescaling]);

  const mappedColumns = useMappedColumns(columns, freezeColumns);

  // row: -1 === columnHeader, -2 === groupHeader
  const getBoundsForItem = React.useCallback(
    (canvas: HTMLCanvasElement, col: number, row: number): Rectangle | undefined => {
      const rect = canvas.getBoundingClientRect();

      if (col >= mappedColumns.length || row >= rows) {
        return undefined;
      }

      const scale = rect.width / width;

      const result = computeBounds(
        col,
        row,
        width,
        height,
        groupHeaderHeight,
        totalHeaderHeight,
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        rows,
        freezeColumns,
        trailingRowType === 'sticky',
        mappedColumns,
        rowHeight
      );

      if (scale !== 1) {
        result.x *= scale;
        result.y *= scale;
        result.width *= scale;
        result.height *= scale;
      }

      result.x += rect.x;
      result.y += rect.y;

      return result;
    },
    [
      width,
      height,
      groupHeaderHeight,
      totalHeaderHeight,
      cellXOffset,
      cellYOffset,
      translateX,
      translateY,
      rows,
      freezeColumns,
      trailingRowType,
      mappedColumns,
      rowHeight,
    ]
  );

  const getMouseArgsForPosition = React.useCallback(
    (
      canvas: HTMLCanvasElement,
      posX: number,
      posY: number,
      ev?: MouseEvent | TouchEvent
    ): GridMouseEventArgs => {
      const rect = canvas.getBoundingClientRect();
      const scale = rect.width / width;
      const x = (posX - rect.left) / scale;
      const y = (posY - rect.top) / scale;
      const edgeDetectionBuffer = 5;

      const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, translateX);

      let button = 0;
      if (ev instanceof MouseEvent) {
        button = ev.button;
      }

      // -1 === off right edge
      const col = getColumnIndexForX(x, effectiveCols, translateX);

      // -1: header or above
      // undefined: offbottom
      const row = getRowIndexForY(
        y,
        height,
        enableGroups,
        headerHeight,
        groupHeaderHeight,
        rows,
        rowHeight,
        cellYOffset,
        translateY,
        trailingRowType === 'sticky'
      );

      const shiftKey = ev?.shiftKey === true;
      const ctrlKey = ev?.ctrlKey === true;
      const metaKey = ev?.metaKey === true;
      const isTouch = ev !== undefined && !(ev instanceof MouseEvent);

      const edgeSize = 20;
      const scrollEdge: GridMouseEventArgs['scrollEdge'] = [
        Math.abs(x) < edgeSize ? -1 : Math.abs(rect.width - x) < edgeSize ? 1 : 0,
        Math.abs(y) < edgeSize ? -1 : Math.abs(rect.height - y) < edgeSize ? 1 : 0,
      ];

      let result: GridMouseEventArgs;
      if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
        const horizontal = x > width ? -1 : x < 0 ? 1 : 0;
        const vertical = y > height ? 1 : y < 0 ? -1 : 0;

        let isEdge = false;
        if (col === -1 && row === -1) {
          const b = getBoundsForItem(canvas, mappedColumns.length - 1, -1);
          assert(b !== undefined);
          isEdge = posX < b.x + b.width + edgeDetectionBuffer;
        }

        result = {
          kind: outOfBoundsKind,
          location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row ?? rows - 1],
          direction: [horizontal, vertical],
          shiftKey,
          ctrlKey,
          metaKey,
          isEdge,
          isTouch,
          button,
          scrollEdge,
        };
      } else if (row <= -1) {
        let bounds = getBoundsForItem(canvas, col, row);
        assert(bounds !== undefined);
        let isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;

        const previousCol = col - 1;
        if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
          isEdge = true;
          bounds = getBoundsForItem(canvas, previousCol, row);
          assert(bounds !== undefined);
          result = {
            kind: enableGroups && row === -2 ? groupHeaderKind : headerKind,
            location: [previousCol, row] as any,
            bounds: bounds,
            group: mappedColumns[previousCol].group ?? '',
            isEdge,
            shiftKey,
            ctrlKey,
            metaKey,
            isTouch,
            localEventX: posX - bounds.x,
            localEventY: posY - bounds.y,
            button,
            scrollEdge,
          };
        } else {
          result = {
            kind: enableGroups && row === -2 ? groupHeaderKind : headerKind,
            group: mappedColumns[col].group ?? '',
            location: [col, row] as any,
            bounds: bounds,
            isEdge,
            shiftKey,
            ctrlKey,
            metaKey,
            isTouch,
            localEventX: posX - bounds.x,
            localEventY: posY - bounds.y,
            button,
            scrollEdge,
          };
        }
      } else {
        const bounds = getBoundsForItem(canvas, col, row);
        assert(bounds !== undefined);
        const isEdge = bounds !== undefined && bounds.x + bounds.width - posX < edgeDetectionBuffer;
        const isFillHandle =
          fillHandle &&
          bounds !== undefined &&
          bounds.x + bounds.width - posX < 6 &&
          bounds.y + bounds.height - posY < 6;
        result = {
          kind: 'cell',
          location: [col, row],
          bounds: bounds,
          isEdge,
          shiftKey,
          ctrlKey,
          isFillHandle,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          scrollEdge,
        };
      }
      return result;
    },
    [
      mappedColumns,
      cellXOffset,
      width,
      translateX,
      height,
      enableGroups,
      headerHeight,
      groupHeaderHeight,
      rows,
      rowHeight,
      cellYOffset,
      translateY,
      trailingRowType,
      getBoundsForItem,
      fillHandle,
    ]
  );

  function isSameItem(item: GridMouseEventArgs | undefined, other: GridMouseEventArgs | undefined) {
    if (item === other) return true;
    return (
      item?.kind === other?.kind &&
      item?.location[0] === other?.location[0] &&
      item?.location[1] === other?.location[1]
    );
  }

  const isSpectrumDialogClick = React.useCallback((event: MouseEvent | TouchEvent): boolean => {
    let node = event.target as HTMLElement | null;
    while (node !== null) {
      if (
        node.classList.value.includes('spectrum-Dialog') ||
        node.classList.value.includes('spectrum-Underlay')
      ) {
        return true;
      }

      node = node.parentElement;
    }
    return false;
  }, []);

  const [hoveredItem] = hoveredItemInfo ?? [];

  const enqueueRef = React.useRef((_item: Item) => {
    // do nothing
  });
  const hoverInfoRef = React.useRef(hoveredItemInfo);
  hoverInfoRef.current = hoveredItemInfo;

  const [bufferA, bufferB] = React.useMemo(() => {
    const a = document.createElement('canvas');
    const b = document.createElement('canvas');
    a.style['display'] = 'none';
    a.style['opacity'] = '0';
    a.style['position'] = 'fixed';
    b.style['display'] = 'none';
    b.style['opacity'] = '0';
    b.style['position'] = 'fixed';
    return [a, b];
  }, []);

  React.useLayoutEffect(() => {
    document.documentElement.append(bufferA);
    document.documentElement.append(bufferB);
    return () => {
      bufferA.remove();
      bufferB.remove();
    };
  }, [bufferA, bufferB]);

  const lastArgsRef = React.useRef<DrawGridArg>();
  const draw = React.useCallback(() => {
    const canvas = ref.current;
    const overlay = overlayRef.current;
    if (canvas === null || overlay === null) return;

    const last = lastArgsRef.current;
    const current = {
      canvas,
      bufferA,
      bufferB,
      headerCanvas: overlay,
      width,
      height,
      cellXOffset,
      cellYOffset,
      translateX: Math.round(translateX),
      translateY: Math.round(translateY),
      mappedColumns,
      enableGroups,
      freezeColumns,
      dragAndDropState,
      theme,
      headerHeight,
      groupHeaderHeight,
      disabledRows: disabledRows ?? CompactSelection.empty(),
      rowHeight,
      verticalBorder,
      isResizing,
      isFocused,
      selection,
      fillHandle,
      lastRowSticky: trailingRowType,
      rows,
      resizeCol,
      drawFocus: drawFocusRing,
      getCellContent,
      getGroupDetails: getGroupDetails ?? ((name) => ({ name })),
      getRowThemeOverride,
      drawCustomCell,
      drawHeaderCallback,
      prelightCells,
      highlightRegions,
      imageLoader,
      lastBlitData,
      damage: damageRegion.current,
      hoverValues: hoverValues.current,
      hoverInfo: hoverInfoRef.current,
      spriteManager,
      scrolling,
      hyperWrapping: experimental?.hyperWrapping ?? false,
      touchMode: lastWasTouch,
      enqueue: enqueueRef.current,
      renderStrategy:
        experimental?.renderStrategy ?? (browserIsSafari.value ? 'double-buffer' : 'single-buffer'),
      getCellRenderer,
      disabledDragColsAndRows,
      getGroupRowDetails,
    };

    // This confusing bit of code due to some poor design. Long story short, the damage property is only used
    // with what is effectively the "last args" for the last normal draw anyway. We don't want the drawing code
    // to look at this and go "shit dawg, nothing changed" so we force it to draw frash, but the damage restricts
    // the draw anyway.
    //
    // Dear future Jason, I'm sorry. It was expedient, it worked, and had almost zero perf overhead. THe universe
    // basically made me do it. What choice did I have?
    if (current.damage === undefined) {
      lastArgsRef.current = current;
      drawGrid(current, last);
    } else {
      drawGrid(current, undefined);
    }
  }, [
    bufferA,
    bufferB,
    cellXOffset,
    cellYOffset,
    disabledDragColsAndRows,
    disabledRows,
    dragAndDropState,
    drawCustomCell,
    drawFocusRing,
    drawHeaderCallback,
    enableGroups,
    experimental?.hyperWrapping,
    experimental?.renderStrategy,
    fillHandle,
    freezeColumns,
    getCellContent,
    getCellRenderer,
    getGroupDetails,
    getGroupRowDetails,
    getRowThemeOverride,
    groupHeaderHeight,
    headerHeight,
    height,
    highlightRegions,
    imageLoader,
    isFocused,
    isResizing,
    lastWasTouch,
    mappedColumns,
    prelightCells,
    resizeCol,
    rowHeight,
    rows,
    scrolling,
    selection,
    spriteManager,
    theme,
    trailingRowType,
    translateX,
    translateY,
    verticalBorder,
    width,
  ]);

  const lastDrawRef = React.useRef(draw);
  React.useLayoutEffect(() => {
    draw();
    lastDrawRef.current = draw;
  }, [draw]);

  React.useLayoutEffect(() => {
    const fn = async () => {
      if (document?.fonts?.ready === undefined) return;
      await document.fonts.ready;
      lastArgsRef.current = undefined;
      lastDrawRef.current();
    };
    void fn();
  }, []);

  const damageInternal = React.useCallback((locations: CellList) => {
    damageRegion.current = locations;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);

  const enqueue = useAnimationQueue(damageInternal);
  enqueueRef.current = enqueue;

  const damage = React.useCallback(
    (cells: DamageUpdateList) => {
      damageInternal(cells.map((x) => x.cell));
    },
    [damageInternal]
  );

  imageLoader.setCallback(damageInternal);

  const [overFill, setOverFill] = React.useState(false);

  const [hCol, hRow] = hoveredItem ?? [];
  const headerHovered = hCol !== undefined && hRow === -1;
  const groupHeaderHovered = hCol !== undefined && hRow === -2;
  let clickableInnerCellHovered = false;
  let editableBoolHovered = false;
  let cursorOverride: React.CSSProperties['cursor'] | undefined;
  if (hCol !== undefined && hRow !== undefined && hRow > -1) {
    const cell = getCellContent([hCol, hRow]);
    clickableInnerCellHovered =
      cell.kind === InnerGridCellKind.NewRow ||
      cell.kind === GridRowKind.Group ||
      (cell.kind === InnerGridCellKind.Marker && cell.markerKind !== 'number');
    editableBoolHovered = cell.kind === GridCellKind.Boolean && booleanCellIsEditable(cell);
    cursorOverride = cell.cursor;
  }
  const canDrag = hoveredOnEdge ?? false;
  const cursor = isDragging
    ? 'grabbing'
    : canDrag || isResizing
    ? 'col-resize'
    : overFill || isFilling
    ? 'crosshair'
    : cursorOverride !== undefined
    ? cursorOverride
    : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered
    ? 'pointer'
    : 'default';
  const style = React.useMemo(
    () => ({
      // width,
      // height,
      contain: 'strict',
      display: 'block',
      cursor,
    }),
    [cursor]
  );

  const lastSetCursor = React.useRef<typeof cursor>('default');

  const target = eventTargetRef?.current;
  if (target !== null && target !== undefined && lastSetCursor.current !== style.cursor) {
    // because we have an event target we need to set its cursor instead.
    target.style.cursor = lastSetCursor.current = style.cursor;
  }

  const groupHeaderActionForEvent = React.useCallback(
    (group: string, bounds: Rectangle, localEventX: number, localEventY: number) => {
      if (getGroupDetails === undefined) return undefined;
      const groupDesc = getGroupDetails(group);
      if (groupDesc.actions !== undefined) {
        const boxes = getActionBoundsForGroup(bounds, groupDesc.actions);
        for (const [i, box] of boxes.entries()) {
          if (pointInRect(box, localEventX + bounds.x, localEventY + box.y)) {
            return groupDesc.actions[i];
          }
        }
      }
      return undefined;
    },
    [getGroupDetails]
  );

  const isOverHeaderMenu = React.useCallback(
    (canvas: HTMLCanvasElement, col: number, clientX: number, clientY: number) => {
      const header = columns[col];

      if (!isDragging && !isResizing && header.hasMenu === true && !(hoveredOnEdge ?? false)) {
        const headerBounds = getBoundsForItem(canvas, col, -1);
        assert(headerBounds !== undefined);
        const menuBounds = getHeaderMenuBounds(
          headerBounds.x,
          headerBounds.y,
          headerBounds.width,
          headerBounds.height
        );
        if (
          clientX > menuBounds.x &&
          clientX < menuBounds.x + menuBounds.width &&
          clientY > menuBounds.y &&
          clientY < menuBounds.y + menuBounds.height
        ) {
          return headerBounds;
        }
      }
      return undefined;
    },
    [columns, getBoundsForItem, hoveredOnEdge, isDragging, isResizing]
  );

  const downTime = React.useRef(0);
  const downPosition = React.useRef<Item>();
  const onMouseDownImpl = React.useCallback(
    (ev: MouseEvent | TouchEvent) => {
      const canvas = ref.current;
      const eventTarget = eventTargetRef?.current;
      const scrollerContainsTarget = eventTarget?.contains(ev.target as Node) ?? false;

      if (
        canvas === null ||
        (ev.target !== canvas && ev.target !== eventTarget && !scrollerContainsTarget)
      )
        return;

      let clientX: number;
      let clientY: number;
      if (ev instanceof MouseEvent) {
        clientX = ev.clientX;
        clientY = ev.clientY;
      } else {
        clientX = ev.touches[0].clientX;
        clientY = ev.touches[0].clientY;
      }
      if (ev.target === eventTarget && eventTarget !== null) {
        const bounds = eventTarget.getBoundingClientRect();
        if (clientX > bounds.left + eventTarget.clientWidth) return;
        if (clientY > bounds.top + eventTarget.clientHeight) return;
      }

      const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
      downPosition.current = args.location;

      if (args.isTouch) {
        downTime.current = Date.now();
      }
      if (lastWasTouchRef.current !== args.isTouch) {
        setLastWasTouch(args.isTouch);
      }

      if (
        args.kind === headerKind &&
        isOverHeaderMenu(canvas, args.location[0], clientX, clientY) !== undefined
      ) {
        return;
      } else if (args.kind === groupHeaderKind) {
        const action = groupHeaderActionForEvent(
          args.group,
          args.bounds,
          args.localEventX,
          args.localEventY
        );
        if (action !== undefined) {
          return;
        }
      }

      onMouseDown?.(args);
      if (!args.isTouch && isDraggable !== true && isDraggable !== args.kind) {
        // preventing default in touch events stops scroll
        ev.preventDefault();
      }
    },
    [
      eventTargetRef,
      isDraggable,
      getMouseArgsForPosition,
      groupHeaderActionForEvent,
      isOverHeaderMenu,
      onMouseDown,
    ]
  );
  useEventListener('touchstart', onMouseDownImpl, window, false);
  useEventListener('mousedown', onMouseDownImpl, window, false);

  const onMouseUpImpl = React.useCallback(
    (ev: MouseEvent | TouchEvent) => {
      const canvas = ref.current;
      if (onMouseUp === undefined || canvas === null) return;
      const eventTarget = eventTargetRef?.current;

      const isOutside = ev.target !== canvas && ev.target !== eventTarget;

      let clientX: number;
      let clientY: number;
      if (ev instanceof MouseEvent) {
        clientX = ev.clientX;
        clientY = ev.clientY;
      } else {
        clientX = ev.changedTouches[0].clientX;
        clientY = ev.changedTouches[0].clientY;
      }

      let args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
      if (args.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
        args = {
          ...args,
          isLongTouch: true,
        };
      }

      if (lastWasTouchRef.current !== args.isTouch) {
        setLastWasTouch(args.isTouch);
      }

      if (!isOutside && ev.cancelable) {
        ev.preventDefault();
      }

      if (
        args.kind === headerKind &&
        isOverHeaderMenu(canvas, args.location[0], clientX, clientY)
      ) {
        const [col] = args.location;
        const headerBounds = isOverHeaderMenu(canvas, col, clientX, clientY);
        if (headerBounds !== undefined) {
          if (
            args.button === 0 &&
            downPosition.current?.[0] === col &&
            downPosition.current?.[1] === -1
          ) {
            onHeaderMenuClick?.(col, headerBounds);
          } else {
            // force outside so that click will not process
            onMouseUp(args, true, false, false);
          }
          return;
        }
      } else if (args.kind === groupHeaderKind) {
        const action = groupHeaderActionForEvent(
          args.group,
          args.bounds,
          args.localEventX,
          args.localEventY
        );
        if (action !== undefined) {
          if (args.button === 0) {
            action.onClick(args);
          }
          return;
        }
      }

      const evTarget = ev.target as HTMLElement;
      const shouldIgnoreOutsideClick =
        evTarget.closest('.click-outside-ignore') !== null || isSpectrumDialogClick(ev);

      onMouseUp(args, isOutside, args.button === 2, shouldIgnoreOutsideClick);
    },
    [
      onMouseUp,
      eventTargetRef,
      getMouseArgsForPosition,
      isOverHeaderMenu,
      onHeaderMenuClick,
      groupHeaderActionForEvent,
    ]
  );
  useEventListener('mouseup', onMouseUpImpl, window, false);
  useEventListener('touchend', onMouseUpImpl, window, false);

  const onContextMenuImpl = React.useCallback(
    (ev: MouseEvent) => {
      const canvas = ref.current;
      if (canvas === null || onContextMenu === undefined) return;
      const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
      onContextMenu(args, () => {
        if (ev.cancelable) ev.preventDefault();
      });
    },
    [getMouseArgsForPosition, onContextMenu]
  );
  useEventListener('contextmenu', onContextMenuImpl, eventTargetRef?.current ?? null, false);

  const onAnimationFrame = React.useCallback<StepCallback>((values) => {
    damageRegion.current = values.map((x) => x.item);
    hoverValues.current = values;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);

  const animManagerValue = React.useMemo(
    () => new AnimationManager(onAnimationFrame),
    [onAnimationFrame]
  );
  const animationManager = React.useRef(animManagerValue);
  animationManager.current = animManagerValue;
  React.useLayoutEffect(() => {
    const am = animationManager.current;
    if (hoveredItem === undefined || hoveredItem[1] < 0) {
      am.setHovered(hoveredItem);
      return;
    }
    const cell = getCellContent(hoveredItem as [number, number]);
    const r = getCellRenderer(cell);
    am.setHovered(
      (r === undefined && cell.kind === GridCellKind.Custom) || r?.needsHover === true
        ? hoveredItem
        : undefined
    );
  }, [getCellContent, getCellRenderer, hoveredItem]);

  const hoveredRef = React.useRef<GridMouseEventArgs>();
  const isAlertIconHoveredRef = React.useRef<boolean>();
  const isInfoIconHoveredRef = React.useRef<boolean>();
  const onMouseMoveImpl = React.useCallback(
    (ev: MouseEvent) => {
      const canvas = ref.current;
      const eventTarget = eventTargetRef?.current;

      if (canvas === null) {
        return;
      }

      const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);

      // when the cursor is in the grid area, but it's on a overlay element like a popup which is not part of the grid
      if (args.kind !== outOfBoundsKind && ev.target !== canvas && ev.target !== eventTarget) {
        return;
      }

      if (!isSameItem(args, hoveredRef.current)) {
        onItemHovered?.(args);
        setHoveredItemInfo(
          args.kind === outOfBoundsKind
            ? undefined
            : [args.location, [args.localEventX, args.localEventY]]
        );
        hoveredRef.current = args;
        isAlertIconHoveredRef.current = undefined;
        isInfoIconHoveredRef.current = undefined;
      } else if (
        args.kind === 'cell' ||
        args.kind === headerKind ||
        args.kind === groupHeaderKind
      ) {
        const newInfo: typeof hoverInfoRef.current = [
          args.location,
          [args.localEventX, args.localEventY],
        ];
        setHoveredItemInfo(newInfo);
        hoverInfoRef.current = newInfo;

        switch (args.kind) {
          case 'cell': {
            const toCheck = getCellContent(args.location);
            if (
              toCheck.kind === GridCellKind.Custom ||
              getCellRenderer(toCheck)?.needsHoverPosition === true
            ) {
              damageInternal([args.location]);
            }

            break;
          }
          case groupHeaderKind: {
            damageInternal([args.location]);

            break;
          }
          case 'header': {
            const column = mappedColumns[args.location[0]];

            const hasAlertIcon = Boolean(column.alertIcon);
            const hasInfoIcon = Boolean(column.infoIcon);

            if (!(hasAlertIcon || hasInfoIcon)) break;

            const FIRST_ICON_LEFT_BOUND = 30;
            const FIRST_ICON_RIGHT_BOUND = 50;
            const SECOND_ICON_LEFT_BOUND = 50;
            const SECOND_ICON_RIGHT_BOUND = 70;

            const isAlertIconHovered = (columnArgs: GridMouseHeaderEventArgs): boolean => {
              if (!hasAlertIcon) return false;
              const hoverBounds = hasInfoIcon
                ? [SECOND_ICON_LEFT_BOUND, SECOND_ICON_RIGHT_BOUND]
                : [FIRST_ICON_LEFT_BOUND, FIRST_ICON_RIGHT_BOUND];
              return isColumnIconHovered(columnArgs, hoverBounds[0], hoverBounds[1]);
            };

            const isInfoIconHovered = (columnArgs: GridMouseHeaderEventArgs): boolean => {
              if (!hasInfoIcon) return false;
              return isColumnIconHovered(columnArgs, FIRST_ICON_LEFT_BOUND, FIRST_ICON_RIGHT_BOUND);
            };

            const isAlertHovered = isAlertIconHovered(args);
            const isInfoHovered = isInfoIconHovered(args);

            if (
              isAlertHovered !== isAlertIconHoveredRef.current ||
              isInfoHovered !== isInfoIconHoveredRef.current
            ) {
              onItemHovered?.({
                ...args,
                isAlertIconHovered: isAlertHovered,
                isInfoIconHovered: isInfoHovered,
              });

              // Update the previous hover states
              isAlertIconHoveredRef.current = isAlertHovered;
              isInfoIconHoveredRef.current = isInfoHovered;
            }
            break;
          }
        }
      }

      setHoveredOnEdge(args.kind === headerKind && args.isEdge && allowResize === true);

      if (fillHandle && selection.current !== undefined) {
        const [col, row] = selection.current.cell;
        const sb = getBoundsForItem(canvas, col, row);
        const x = ev.clientX;
        const y = ev.clientY;
        assert(sb !== undefined);
        setOverFill(
          x >= sb.x + sb.width - 6 &&
            x <= sb.x + sb.width &&
            y >= sb.y + sb.height - 6 &&
            y <= sb.y + sb.height
        );
      } else {
        setOverFill(false);
      }

      onMouseMoveRaw?.(ev);
      onMouseMove(args);
    },
    [
      eventTargetRef,
      getMouseArgsForPosition,
      allowResize,
      fillHandle,
      selection,
      onMouseMoveRaw,
      onMouseMove,
      onItemHovered,
      getCellContent,
      getCellRenderer,
      damageInternal,
      getBoundsForItem,
      mappedColumns,
    ]
  );
  useEventListener('mousemove', onMouseMoveImpl, window, true);

  const onKeyDownImpl = React.useCallback(
    (event: React.KeyboardEvent<HTMLCanvasElement>) => {
      const canvas = ref.current;
      if (canvas === null) return;

      let bounds: Rectangle | undefined;
      const location: { col?: number; row?: number } = {};
      if (selection.current !== undefined) {
        bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
        location.col = selection.current.cell[0];
        location.row = selection.current.cell[1];
      }

      onKeyDown?.({
        bounds,
        stopPropagation: () => event.stopPropagation(),
        preventDefault: () => event.preventDefault(),
        cancel: () => undefined,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        key: event.key,
        keyCode: event.keyCode,
        rawEvent: event,
        location,
      });
    },
    [onKeyDown, selection, getBoundsForItem]
  );

  const onKeyUpImpl = React.useCallback(
    (event: React.KeyboardEvent<HTMLCanvasElement>) => {
      const canvas = ref.current;
      if (canvas === null) return;

      let bounds: Rectangle | undefined;
      const location: { col?: number; row?: number } = {};
      if (selection.current !== undefined) {
        bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
        location.col = selection.current.cell[0];
        location.row = selection.current.cell[1];
      }

      onKeyUp?.({
        bounds,
        stopPropagation: () => event.stopPropagation(),
        preventDefault: () => event.preventDefault(),
        cancel: () => undefined,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        key: event.key,
        keyCode: event.keyCode,
        rawEvent: event,
        location,
      });
    },
    [onKeyUp, selection, getBoundsForItem]
  );

  const refImpl = React.useCallback(
    (instance: HTMLCanvasElement | null) => {
      ref.current = instance;
      if (canvasRef !== undefined) {
        canvasRef.current = instance;
      }
    },
    [canvasRef]
  );

  useDragAndDrop({
    canvasRef: ref,
    isDraggable,
    isResizing,
    getMouseArgsForPosition,
    disabledDragColsAndRows,
    lockColumns,
    onDragStart,
    getBoundsForItem,
    theme,
    mappedColumns,
    spriteManager,
    drawHeaderCallback,
    getCellContent,
    drawCustomCell,
    imageLoader,
    getCellRenderer,
    freezeColumns,
    firstColAccessible,
    onDragOverCell,
    onDrop,
    onDragEnd,
    onDragLeave,
    width,
    eventTargetRef,
    selection,
    resetDragAndDropState,
  });

  const selectionRef = React.useRef(selection);
  selectionRef.current = selection;
  const focusRef = React.useRef<HTMLElement | null>(null);
  const focusElement = React.useCallback(
    (el: HTMLElement | null) => {
      // We don't want to steal the focus if we don't currently own the focus.
      if (ref.current === null || !ref.current.contains(document.activeElement)) return;
      if (el === null && selectionRef.current.current !== undefined) {
        canvasRef?.current?.focus({
          preventScroll: true,
        });
      } else if (el !== null) {
        if (el.dataset.group === 'true') {
          el.parentElement?.focus({
            preventScroll: true,
          });
        } else {
          el.focus({
            preventScroll: true,
          });
        }
      }
      focusRef.current = el;
    },
    [canvasRef]
  );

  React.useImperativeHandle(
    forwardedRef,
    () => ({
      focus: () => {
        const el = focusRef.current;
        // The element in the ref may have been removed however our callback method ref
        // won't see the removal so bad things happen. Checking to see if the element is
        // no longer attached is enough to resolve the problem. In the future this
        // should be replaced with something much more robust.
        if (el === null || !document.contains(el)) {
          canvasRef?.current?.focus({
            preventScroll: true,
          });
        } else {
          el.focus({
            preventScroll: true,
          });
        }
      },
      getBounds: (col: number, row?: number) => {
        if (canvasRef === undefined || canvasRef.current === null) {
          return undefined;
        }

        return getBoundsForItem(canvasRef.current, col, row ?? -1);
      },
      damage,
    }),
    [canvasRef, damage, getBoundsForItem]
  );

  const lastFocusedSubdomNode = React.useRef<Item>();

  const accessibilityTree = useDebouncedMemo(
    () => {
      if (width < 50) return null;
      let effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, translateX);
      const colOffset = firstColAccessible ? 0 : -1;
      if (!firstColAccessible && effectiveCols[0]?.sourceIndex === 0) {
        effectiveCols = effectiveCols.slice(1);
      }

      const [fCol, fRow] = selection.current?.cell ?? [];
      const range = selection.current?.range;

      const visibleCols = effectiveCols.map((c) => c.sourceIndex);
      const visibleRows = makeRange(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight));

      // Maintain focus within grid if we own it but focused cell is outside visible viewport
      // and not rendered.
      if (
        fCol !== undefined &&
        fRow !== undefined &&
        !(visibleCols.includes(fCol) && visibleRows.includes(fRow))
      ) {
        focusElement(null);
      }

      return (
        <table
          key="access-tree"
          role="treegrid"
          aria-rowcount={rows + 1}
          aria-multiselectable="true"
          aria-colcount={mappedColumns.length + colOffset}
        >
          <thead>
            <tr role="row" aria-rowindex={1}>
              {effectiveCols.map((c) => (
                <th
                  role="columnheader"
                  aria-selected={selection.columns.hasIndex(c.sourceIndex)}
                  aria-colindex={c.sourceIndex + 1 + colOffset}
                  tabIndex={-1}
                  onFocus={(e) => {
                    if (e.target === focusRef.current) return;
                    return onCellFocused?.([c.sourceIndex, -1]);
                  }}
                  key={c.sourceIndex}
                >
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup">
            {visibleRows.map((row) => {
              const ariaElements: React.AriaAttributes = {};
              const rowDetails = getGroupRowDetails(row);

              if (rowDetails?.kind === GridRowKind.Group) {
                ariaElements['aria-expanded'] = rowDetails.expanded;
                ariaElements['aria-level'] = rowDetails.level;
              }
              return (
                <tr
                  role="row"
                  aria-selected={selection.rows.hasIndex(row)}
                  key={row}
                  aria-rowindex={row + 2}
                  id={`row-${row}`}
                  tabIndex={0}
                  {...ariaElements}
                >
                  {effectiveCols.map((c, index) => {
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
                        aria-readonly={
                          isInnerOnlyCell(cellContent) || !isReadWriteCell(cellContent)
                        }
                        id={id}
                        data-testid={id}
                        data-group={cellContent.kind === 'group' ? 'true' : undefined}
                        onClick={() => {
                          const canvas = canvasRef?.current;
                          if (canvas === null || canvas === undefined) return;
                          return onKeyDown?.({
                            bounds: getBoundsForItem(canvas, col, row),
                            cancel: () => undefined,
                            preventDefault: () => undefined,
                            stopPropagation: () => undefined,
                            ctrlKey: false,
                            key: 'Enter',
                            keyCode: 13,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: { col, row },
                          });
                        }}
                        onFocusCapture={(e) => {
                          if (
                            e.target === focusRef.current ||
                            (lastFocusedSubdomNode.current?.[0] === col &&
                              lastFocusedSubdomNode.current?.[1] === row)
                          )
                            return;
                          lastFocusedSubdomNode.current = [col, row];
                          return onCellFocused?.([col, row]);
                        }}
                        ref={focused ? focusElement : undefined}
                        tabIndex={cellContent.kind === 'group' ? 0 : -1}
                      >
                        {getRowData(cellContent, index, getCellRenderer)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    },
    [
      width,
      mappedColumns,
      cellXOffset,
      dragAndDropState,
      translateX,
      rows,
      cellYOffset,
      accessibilityHeight,
      selection,
      focusElement,
      getCellContent,
      canvasRef,
      onKeyDown,
      getBoundsForItem,
      onCellFocused,
    ],
    200
  );

  const stickyX = fixedShadowX ? getStickyWidth(mappedColumns) : 0;
  const opacityX =
    freezeColumns === 0 || !fixedShadowX
      ? 0
      : cellXOffset > freezeColumns
      ? 1
      : clamp(-translateX / 100, 0, 1);

  const absoluteOffsetY = -cellYOffset * 32 + translateY;
  const opacityY = !fixedShadowY ? 0 : clamp(-absoluteOffsetY / 100, 0, 1);

  const stickyShadow = React.useMemo(() => {
    if (!opacityX && !opacityY) {
      return null;
    }

    const styleX: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: stickyX,
      width: width - stickyX,
      height: height,
      opacity: opacityX,
      pointerEvents: 'none',
      transition: !smoothScrollX ? 'opacity 0.2s' : undefined,
      boxShadow: 'inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)',
    };

    const styleY: React.CSSProperties = {
      position: 'absolute',
      top: totalHeaderHeight,
      left: 0,
      width: width,
      height: height,
      opacity: opacityY,
      pointerEvents: 'none',
      transition: !smoothScrollY ? 'opacity 0.2s' : undefined,
      boxShadow: 'inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)',
    };

    return (
      <>
        {opacityX > 0 && <div id="shadow-x" style={styleX} />}
        {opacityY > 0 && <div id="shadow-y" style={styleY} />}
      </>
    );
  }, [opacityX, opacityY, stickyX, width, smoothScrollX, totalHeaderHeight, height, smoothScrollY]);

  const overlayStyle = React.useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      top: 0,
      left: 0,
    }),
    []
  );

  return (
    <>
      <canvas
        data-testid="data-grid-canvas"
        tabIndex={0}
        onKeyDown={onKeyDownImpl}
        onKeyUp={onKeyUpImpl}
        onFocus={onCanvasFocused}
        onBlur={onCanvasBlur}
        ref={refImpl}
        style={style}
      >
        {accessibilityTree}
      </canvas>
      <canvas ref={overlayRef} style={overlayStyle} />
      {stickyShadow}
    </>
  );
};

export default React.memo(React.forwardRef(DataGrid));
