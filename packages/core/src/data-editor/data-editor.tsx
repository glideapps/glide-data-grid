import * as React from "react";
import { assertNever, maybe } from "../common/support";
import clamp from "lodash/clamp";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import range from "lodash/range";
import DataGridOverlayEditor from "../data-grid-overlay-editor/data-grid-overlay-editor";
import {
    EditableGridCell,
    GridCell,
    GridCellKind,
    GridDragEventArgs,
    GridKeyEventArgs,
    GridMouseEventArgs,
    GridSelection,
    isEditableGridCell,
    Rectangle,
    isReadWriteCell,
    InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    Slice,
    isInnerOnlyCell,
    ProvideEditorCallback,
    DrawCustomCellCallback,
    GridMouseCellEventArgs,
    GridColumn,
    isObjectEditorCallbackResult,
    GroupHeaderClickedEventArgs,
    HeaderClickedEventArgs,
    CellClickedEventArgs,
} from "../data-grid/data-grid-types";
import DataGridSearch, { DataGridSearchProps } from "../data-grid-search/data-grid-search";
import { browserIsOSX } from "../common/browser-detect";
import { OverlayImageEditorProps } from "../data-grid-overlay-editor/private/image-overlay-editor";
import { ThemeProvider, useTheme } from "styled-components";
import { getDataEditorTheme, Theme } from "../common/styles";
import { DataGridRef } from "../data-grid/data-grid";
import { useEventListener } from "../common/utils";
import { CellRenderers } from "../data-grid/cells";
import { isGroupEqual } from "../data-grid/data-grid-lib";
import { GroupRename } from "./group-rename";
import { useCellSizer } from "./use-cell-sizer";
import { isHotkey } from "../common/is-hotkey";
import { SelectionBlending, useSelectionBehavior } from "../data-grid/use-selection-behavior";
import { useCellsForSelection } from "./use-cells-for-selection";

interface MouseState {
    readonly previousSelection?: GridSelection;
}

type Props = Omit<
    DataGridSearchProps,
    | "accessibilityHeight"
    | "canvasRef"
    | "cellXOffset"
    | "cellYOffset"
    | "className"
    | "columns"
    | "disabledRows"
    | "drawCustomCell"
    | "enableGroups"
    | "firstColSticky"
    | "getCellContent"
    | "gridRef"
    | "headerHeight"
    | "groupHeaderHeight"
    | "lastRowSticky"
    | "lockColumns"
    | "firstColAccessible"
    | "getCellsForSelection"
    | "onCellFocused"
    | "onKeyDown"
    | "onKeyUp"
    | "onMouseDown"
    | "onMouseUp"
    | "onMouseMove"
    | "freezeColumns"
    | "onSearchResultsChanged"
    | "onVisibleRegionChanged"
    | "rowHeight"
    | "verticalBorder"
    | "scrollRef"
    | "searchColOffset"
    | "selection"
    | "selectedColumns"
    | "translateX"
    | "translateY"
>;

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;

type EmitEvents = "copy" | "paste" | "delete" | "fill-right" | "fill-down";

function getSpanStops(cells: readonly (readonly GridCell[])[]): number[] {
    const disallowed = uniq(
        flatten(
            flatten(cells)
                .filter(c => c.span !== undefined)
                .map(c => range((c.span?.[0] ?? 0) + 1, (c.span?.[1] ?? 0) + 1))
        )
    );
    return disallowed;
}

function shiftSelection(input: GridSelection, offset: number): GridSelection {
    if (input === undefined || offset === 0 || (input.columns.length === 0 && input.current === undefined))
        return input;

    return {
        current:
            input.current === undefined
                ? undefined
                : {
                      cell: [input.current.cell[0] + offset, input.current.cell[1]],
                      range: {
                          ...input.current.range,
                          x: input.current.range.x + offset,
                      },
                      rangeStack: input.current.rangeStack.map(r => ({
                          ...r,
                          x: r.x + offset,
                      })),
                  },
        rows: input.rows,
        columns: input.columns.offset(offset),
    };
}

interface Keybinds {
    readonly selectAll: boolean;
    readonly selectRow: boolean;
    readonly selectColumn: boolean;
    readonly downFill: boolean;
    readonly rightFill: boolean;
    readonly pageUp: boolean;
    readonly pageDown: boolean;
    readonly clear: boolean;
    readonly copy: boolean;
    readonly paste: boolean;
    readonly search: boolean;
    readonly first: boolean;
    readonly last: boolean;
}

const keybindingDefaults: Keybinds = {
    selectAll: true,
    selectRow: true,
    selectColumn: true,
    downFill: false,
    rightFill: false,
    pageUp: false,
    pageDown: false,
    clear: true,
    copy: true,
    paste: true,
    search: false,
    first: true,
    last: true,
};

export interface DataEditorProps extends Props {
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    readonly onCellEdited?: (cell: readonly [number, number], newValue: EditableGridCell) => void;
    readonly onRowAppended?: () => Promise<"top" | "bottom" | number | undefined> | void;
    readonly onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onGroupHeaderRenamed?: (groupName: string, newVal: string) => void;
    readonly onCellClicked?: (cell: readonly [number, number], event: CellClickedEventArgs) => void;
    readonly onFinishedEditing?: (newValue: GridCell | undefined, movement: readonly [number, number]) => void;
    readonly onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onCellContextMenu?: (cell: readonly [number, number], event: CellClickedEventArgs) => void;

    readonly columns: readonly GridColumn[];

    readonly trailingRowOptions?: {
        readonly tint?: boolean;
        readonly hint?: string;
        readonly sticky?: boolean;
        readonly addIcon?: string;
        readonly targetColumn?: number | GridColumn;
    };
    readonly headerHeight?: number;
    readonly groupHeaderHeight?: number;

    readonly rowMarkers?: "checkbox" | "number" | "both" | "none";
    readonly rowMarkerWidth?: number;

    readonly spanRangeBehavior?: "default" | "allowPartial";

    readonly rangeSelectionBlending?: SelectionBlending;
    readonly columnSelectionBlending?: SelectionBlending;
    readonly rowSelectionBlending?: SelectionBlending;
    readonly rangeMultiSelect?: boolean;
    readonly columnMultiSelect?: boolean;
    readonly rowMultiSelect?: boolean;

    readonly rowHeight?: DataGridSearchProps["rowHeight"];
    readonly onMouseMove?: DataGridSearchProps["onMouseMove"];

    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;

    readonly provideEditor?: ProvideEditorCallback<GridCell>;

    readonly onSelectionCleared?: () => void;

    /**
     * @deprecated Use drawCell instead. This will be removed in a future version.
     */
    readonly drawCustomCell?: (
        ctx: CanvasRenderingContext2D,
        cell: GridCell,
        theme: Theme,
        rect: Rectangle,
        hoverAmount: number
    ) => boolean;

    readonly drawCell?: DrawCustomCellCallback;

    readonly gridSelection?: GridSelection;
    readonly onGridSelectionChange?: (newSelection: GridSelection) => void;
    readonly onVisibleRegionChanged?: (
        range: Rectangle,
        tx?: number,
        ty?: number,
        extras?: {
            selected?: readonly [number, number];
            freezeRegion?: Rectangle;
        }
    ) => void;

    readonly getCellContent: ReplaceReturnType<DataGridSearchProps["getCellContent"], GridCell>;
    readonly rowSelectionMode?: "auto" | "multi";

    readonly keybindings?: Partial<Keybinds>;

    readonly getCellsForSelection?: DataGridSearchProps["getCellsForSelection"] | true;

    readonly freezeColumns?: DataGridSearchProps["freezeColumns"];

    readonly verticalBorder?: DataGridSearchProps["verticalBorder"] | boolean;

    readonly onPaste?:
        | ((target: readonly [number, number], values: readonly (readonly string[])[]) => boolean)
        | boolean;
}

export interface DataEditorRef {
    updateCells: DataGridRef["damage"];
    getBounds: DataGridRef["getBounds"];
    emit: (eventName: EmitEvents) => Promise<void>;
    scrollTo: (
        col: number,
        row: number,
        dir?: "horizontal" | "vertical" | "both",
        paddingX?: number,
        paddingY?: number
    ) => void;
}

const loadingCell: GridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false,
};

const emptyGridSelection: GridSelection = {
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
    current: undefined,
};

const DataEditorImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorProps> = (p, forwardedRef) => {
    const [gridSelectionInner, setGridSelectionInner] = React.useState<GridSelection>(emptyGridSelection);
    const [overlay, setOverlay] = React.useState<{
        target: Rectangle;
        content: GridCell;
        initialValue: string | undefined;
        cell: readonly [number, number];
        highlight: boolean;
        forceEditMode: boolean;
    }>();
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const mouseState = React.useRef<MouseState>();
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const scrollTimer = React.useRef<number>();
    const lastSent = React.useRef<[number, number]>();

    const {
        isDraggable = false,
        rowMarkers = "none",
        rowHeight = 34,
        headerHeight = 36,
        rowMarkerWidth: rowMarkerWidthRaw,
        imageEditorOverride,
        markdownDivCreateNode,
    } = p;

    const {
        columns: columnsIn,
        rows,
        getCellContent,
        onCellClicked,
        onFinishedEditing,
        onHeaderClicked,
        spanRangeBehavior = "default",
        onGroupHeaderClicked,
        onCellContextMenu,
        onHeaderContextMenu,
        getCellsForSelection: getCellsForSelectionIn,
        onGroupHeaderContextMenu,
        onGroupHeaderRenamed,
        onCellEdited,
        keybindings: keybindingsIn,
        onRowAppended,
        onColumnMoved,
        highlightRegions: highlightRegionsIn,
        drawCell,
        drawCustomCell,
        rangeMultiSelect = false,
        columnMultiSelect = true,
        rowMultiSelect = true,
        rangeSelectionBlending = "exclusive",
        columnSelectionBlending = "exclusive",
        rowSelectionBlending = "exclusive",
        onDelete: onDeleteIn,
        onDragStart,
        onMouseMove,
        onPaste,
        groupHeaderHeight = headerHeight,
        freezeColumns = 0,
        rowSelectionMode = "auto",
        onHeaderMenuClick,
        getGroupDetails,
        onSearchClose: onSearchCloseIn,
        onItemHovered,
        onSelectionCleared,
        showSearch: showSearchIn,
        onVisibleRegionChanged,
        gridSelection: gridSelectionOuter,
        onGridSelectionChange,
        provideEditor,
        trailingRowOptions,
        verticalBorder,
        ...rest
    } = p;

    const keybindings = React.useMemo(() => {
        return keybindingsIn === undefined
            ? keybindingDefaults
            : {
                  ...keybindingDefaults,
                  ...keybindingsIn,
              };
    }, [keybindingsIn]);

    const rowMarkerWidth = rowMarkerWidthRaw ?? (rows > 10000 ? 48 : rows > 1000 ? 44 : rows > 100 ? 36 : 32);
    const hasRowMarkers = rowMarkers !== "none";
    const rowMarkerOffset = hasRowMarkers ? 1 : 0;
    const showTrailingBlankRow = onRowAppended !== undefined;
    const lastRowSticky = trailingRowOptions?.sticky === true;

    const [showSearchInner, setShowSearchInner] = React.useState(false);
    const showSearch = showSearchIn ?? showSearchInner;

    const onSearchClose = React.useCallback(() => {
        if (onSearchCloseIn !== undefined) {
            onSearchCloseIn();
        } else {
            setShowSearchInner(false);
        }
    }, [onSearchCloseIn]);

    const gridSelectionOuterMangled: GridSelection | undefined = React.useMemo((): GridSelection | undefined => {
        return gridSelectionOuter === undefined ? undefined : shiftSelection(gridSelectionOuter, rowMarkerOffset);
    }, [gridSelectionOuter, rowMarkerOffset]);
    const gridSelection = gridSelectionOuterMangled ?? gridSelectionInner;

    const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(
        getCellsForSelectionIn,
        getCellContent,
        rowMarkerOffset
    );

    const expandSelection = React.useCallback(
        (newVal: GridSelection): GridSelection => {
            if (spanRangeBehavior === "allowPartial" || newVal.current === undefined) return newVal;
            if (getCellsForSelection !== undefined) {
                let isFilled = false;
                do {
                    if (newVal?.current === undefined) break;
                    const r: Rectangle = newVal.current?.range;
                    const cells: (readonly GridCell[])[] = [];
                    if (r.width > 2) {
                        const leftCells = getCellsForSelection({
                            x: r.x,
                            y: r.y,
                            width: 1,
                            height: r.height,
                        });

                        cells.push(...leftCells);

                        const rightCells = getCellsForSelection({
                            x: r.x + r.width - 1,
                            y: r.y,
                            width: 1,
                            height: r.height,
                        });

                        cells.push(...rightCells);
                    } else {
                        cells.push(
                            ...getCellsForSelection({
                                x: r.x,
                                y: r.y,
                                width: r.width,
                                height: r.height,
                            })
                        );
                    }

                    let left = r.x - rowMarkerOffset;
                    let right = r.x + r.width - 1 - rowMarkerOffset;
                    cells.forEach(row =>
                        row.forEach(cell => {
                            if (cell.span === undefined) return;
                            left = Math.min(cell.span[0], left);
                            right = Math.max(cell.span[1], right);
                        })
                    );
                    if (left === r.x - rowMarkerOffset && right === r.x + r.width - 1 - rowMarkerOffset) {
                        isFilled = true;
                    } else {
                        newVal = {
                            current: {
                                cell: newVal.current.cell ?? [0, 0],
                                range: {
                                    x: left + rowMarkerOffset,
                                    y: r.y,
                                    width: right - left + 1,
                                    height: r.height,
                                },
                                rangeStack: newVal.current.rangeStack,
                            },
                            columns: newVal.columns,
                            rows: newVal.rows,
                        };
                    }
                } while (!isFilled);
            }
            return newVal;
        },
        [getCellsForSelection, rowMarkerOffset, spanRangeBehavior]
    );

    const setGridSelection = React.useCallback(
        (newVal: GridSelection, expand: boolean): void => {
            if (expand) {
                newVal = expandSelection(newVal);
            }
            if (onGridSelectionChange !== undefined) {
                onGridSelectionChange(shiftSelection(newVal, -rowMarkerOffset));
            } else {
                setGridSelectionInner(newVal);
            }
        },
        [onGridSelectionChange, rowMarkerOffset, expandSelection]
    );

    const onDelete = React.useCallback<NonNullable<DataEditorProps["onDelete"]>>(
        sel => {
            if (onDeleteIn !== undefined) {
                return onDeleteIn(shiftSelection(sel, -rowMarkerOffset));
            }
            return true;
        },
        [onDeleteIn, rowMarkerOffset]
    );

    const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(
        gridSelection,
        setGridSelection,
        rangeSelectionBlending,
        columnSelectionBlending,
        rowSelectionBlending,
        rangeMultiSelect
    );

    const theme = useTheme();
    const mergedTheme = React.useMemo(() => {
        return { ...getDataEditorTheme(), ...theme };
    }, [theme]);

    const columns = useCellSizer(columnsIn, rows, getCellsForSeletionDirect, mergedTheme);

    const highlightRegions = React.useMemo(() => {
        if (highlightRegionsIn === undefined) return undefined;
        if (rowMarkerOffset === 0) return highlightRegionsIn;
        return highlightRegionsIn.map(r => ({
            color: r.color,
            range: {
                ...r.range,
                x: r.range.x + rowMarkerOffset,
            },
        }));
    }, [highlightRegionsIn, rowMarkerOffset]);

    const enableGroups = React.useMemo(() => {
        return columns.some(c => c.group !== undefined);
    }, [columns]);

    const totalHeaderHeight = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;

    const [visibleRegion, setVisibleRegion] = React.useState<
        Rectangle & {
            tx?: number;
            ty?: number;
            extras?: {
                selected?: readonly [number, number];
                freezeRegion?: Rectangle;
            };
        }
    >({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
    });

    const cellXOffset = visibleRegion.x + rowMarkerOffset;
    const cellYOffset = visibleRegion.y;

    const gridRef = React.useRef<DataGridRef | null>(null);

    const focus = React.useCallback((immediate?: boolean) => {
        if (immediate === true) {
            gridRef.current?.focus();
        } else {
            window.requestAnimationFrame(() => {
                gridRef.current?.focus();
            });
        }
    }, []);

    const mangledRows = showTrailingBlankRow ? rows + 1 : rows;

    const mangledOnCellEdited = React.useCallback(
        (cell: readonly [number, number], newValue: EditableGridCell) => {
            onCellEdited?.([cell[0] - rowMarkerOffset, cell[1]], newValue);
        },
        [onCellEdited, rowMarkerOffset]
    );

    const mangledCols = React.useMemo(() => {
        if (rowMarkers === "none") return columns;
        return [
            {
                title: "",
                width: rowMarkerWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
            },
            ...columns,
        ];
    }, [columns, rowMarkerWidth, rowMarkers]);

    const visibleRegionRef = React.useRef(visibleRegion);
    const getMangedCellContent = React.useCallback(
        ([col, row]: readonly [number, number]): InnerGridCell => {
            const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
            const isRowMarkerCol = col === 0 && hasRowMarkers;
            if (isRowMarkerCol) {
                if (isTrailing) {
                    return loadingCell;
                }
                return {
                    kind: InnerGridCellKind.Marker,
                    allowOverlay: false,
                    checked: gridSelection?.rows.hasIndex(row) === true,
                    markerKind: rowMarkers,
                    row,
                };
            } else if (isTrailing) {
                //If the grid is empty, we will return text
                const isFirst = col === rowMarkerOffset;

                const maybeFirstColumnHint = isFirst ? trailingRowOptions?.hint ?? "" : "";
                const hint = columns[col]?.trailingRowOptions?.hint ?? maybeFirstColumnHint;

                const icon = columns[col]?.trailingRowOptions?.addIcon ?? trailingRowOptions?.addIcon;

                return {
                    kind: InnerGridCellKind.NewRow,
                    hint,
                    allowOverlay: false,
                    icon,
                };
            } else {
                const outerCol = col - rowMarkerOffset;
                if (p.experimental?.strict === true) {
                    const vr = visibleRegionRef.current;
                    const isOutsideMainArea =
                        vr.x > outerCol || outerCol > vr.x + vr.width || vr.y > row || row > vr.y + vr.height;
                    const isSelected = outerCol === vr.extras?.selected?.[0] && row === vr.extras?.selected[1];
                    const isOutsideFreezeArea =
                        vr.extras?.freezeRegion === undefined ||
                        vr.extras.freezeRegion.x > outerCol ||
                        outerCol > vr.extras.freezeRegion.x + vr.extras.freezeRegion.width ||
                        vr.extras.freezeRegion.y > row ||
                        row > vr.extras.freezeRegion.y + vr.extras.freezeRegion.height;
                    if (isOutsideMainArea && !isSelected && isOutsideFreezeArea) {
                        return {
                            kind: GridCellKind.Loading,
                            allowOverlay: false,
                        };
                    }
                }
                let result = getCellContent([outerCol, row]);
                if (rowMarkerOffset !== 0 && result.span !== undefined) {
                    result = {
                        ...result,
                        span: [result.span[0] + rowMarkerOffset, result.span[1] + rowMarkerOffset],
                    };
                }
                return result;
            }
        },
        [
            showTrailingBlankRow,
            mangledRows,
            hasRowMarkers,
            gridSelection?.rows,
            rowMarkers,
            rowMarkerOffset,
            trailingRowOptions?.hint,
            trailingRowOptions?.addIcon,
            columns,
            p.experimental?.strict,
            getCellContent,
        ]
    );

    const reselect = React.useCallback(
        (bounds: Rectangle, fromKeyboard: boolean, initialValue?: string) => {
            if (gridSelection.current === undefined) return;

            const [col, row] = gridSelection.current.cell;
            const c = getMangedCellContent([col, row]);
            if (c.kind !== GridCellKind.Boolean && c.allowOverlay) {
                let content = c;
                if (initialValue !== undefined) {
                    switch (content.kind) {
                        case GridCellKind.Text:
                            content = {
                                ...content,
                                data: initialValue,
                            };
                            break;
                        case GridCellKind.Number:
                            content = {
                                ...content,
                                data: maybe(() => Number.parseFloat(initialValue), 0),
                            };
                            break;
                        case GridCellKind.Markdown:
                        case GridCellKind.Uri:
                            content = {
                                ...content,
                                data: initialValue,
                            };
                            break;
                    }
                }
                setOverlay({
                    target: bounds,
                    content,
                    initialValue,
                    cell: [col, row],
                    highlight: initialValue === undefined,
                    forceEditMode: initialValue !== undefined,
                });
            } else if (c.kind === GridCellKind.Boolean && fromKeyboard) {
                mangledOnCellEdited(gridSelection.current.cell, {
                    ...c,
                    data: !c.data,
                });
                gridRef.current?.damage([{ cell: gridSelection.current.cell }]);
            }
        },
        [getMangedCellContent, gridSelection, mangledOnCellEdited]
    );

    const focusOnRowFromTrailingBlankRow = React.useCallback(
        (col: number, row: number) => {
            const bounds = gridRef.current?.getBounds(col, row);
            if (bounds === undefined || scrollRef.current === null) {
                return;
            }

            let content = getMangedCellContent([col, row]);
            if (!content.allowOverlay) {
                return;
            }
            switch (content.kind) {
                case GridCellKind.Text:
                    content = {
                        ...content,
                        data: "",
                    };
                    break;
                case GridCellKind.Number:
                    content = {
                        ...content,
                        data: undefined,
                    };
                    break;
                case GridCellKind.Markdown:
                case GridCellKind.Uri:
                    content = {
                        ...content,
                        data: "",
                    };
                    break;
            }

            setOverlay({
                target: bounds,
                content,
                initialValue: undefined,
                highlight: true,
                cell: [col, row],
                forceEditMode: true,
            });
        },
        [getMangedCellContent]
    );

    const scrollTo = React.useCallback(
        (
            col: number,
            row: number,
            dir: "horizontal" | "vertical" | "both" = "both",
            paddingX: number = 0,
            paddingY: number = 0
        ): void => {
            if (scrollRef.current !== null) {
                const grid = gridRef.current;
                const canvas = canvasRef.current;
                if (grid !== null && canvas !== null) {
                    const rawBounds = grid.getBounds(col + rowMarkerOffset, row);

                    const scrollBounds = canvas.getBoundingClientRect();

                    if (rawBounds !== undefined) {
                        const bounds = {
                            x: rawBounds.x - paddingX,
                            y: rawBounds.y - paddingY,
                            width: rawBounds.width + 2 * paddingX,
                            height: rawBounds.height + 2 * paddingY,
                        };

                        let scrollX = 0;
                        let scrollY = 0;

                        let frozenWidth = 0;
                        for (let i = 0; i < freezeColumns; i++) {
                            frozenWidth += columns[i].width;
                        }
                        const sLeft = frozenWidth + scrollBounds.left + rowMarkerOffset * rowMarkerWidth;
                        const sRight = scrollBounds.right;
                        const sTop = scrollBounds.top + totalHeaderHeight;
                        let trailingRowHeight = 0;
                        if (lastRowSticky) {
                            trailingRowHeight = typeof rowHeight === "number" ? rowHeight : rowHeight(rows);
                        }
                        const sBottom = scrollBounds.bottom - trailingRowHeight;

                        if (sLeft > bounds.x) {
                            scrollX = bounds.x - sLeft;
                        } else if (sRight < bounds.x + bounds.width) {
                            scrollX = bounds.x + bounds.width - sRight;
                        }

                        if (sTop > bounds.y) {
                            scrollY = bounds.y - sTop;
                        } else if (sBottom < bounds.y + bounds.height) {
                            scrollY = bounds.y + bounds.height - sBottom;
                        }

                        if (dir === "vertical" || col < freezeColumns) {
                            scrollX = 0;
                        } else if (dir === "horizontal") {
                            scrollY = 0;
                        }

                        if (scrollX !== 0 || scrollY !== 0) {
                            scrollRef.current.scrollTo(
                                scrollX + scrollRef.current.scrollLeft,
                                scrollY + scrollRef.current.scrollTop
                            );
                        }
                    }
                }
            }
        },
        [rowMarkerOffset, rowMarkerWidth, totalHeaderHeight, lastRowSticky, freezeColumns, columns, rowHeight, rows]
    );

    const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
    const getCellContentRef = React.useRef(getCellContent);
    const rowsRef = React.useRef(rows);
    focusCallback.current = focusOnRowFromTrailingBlankRow;
    getCellContentRef.current = getCellContent;
    rowsRef.current = rows;
    const appendRow = React.useCallback(
        async (col: number) => {
            // FIXME: Maybe this should optionally return a promise that we can await?
            const appendResult = onRowAppended?.();

            let r: "top" | "bottom" | number | undefined = undefined;
            let bottom = true;
            if (appendResult !== undefined) {
                r = await appendResult;
                if (r === "top") bottom = false;
                if (typeof r === "number") bottom = false;
            }

            let backoff = 0;
            const doFocus = () => {
                if (rowsRef.current <= rows) {
                    if (backoff < 500) {
                        window.setTimeout(doFocus, backoff);
                    }
                    backoff = 50 + backoff * 2;
                    return;
                }

                const row = typeof r === "number" ? r : bottom ? rows : 0;
                scrollTo(col, row);
                setCurrent(
                    {
                        cell: [col, row],
                        range: {
                            x: col,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                    },
                    false,
                    false,
                    "edit"
                );

                const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
                if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
                    // wait for scroll to have a chance to process
                    window.setTimeout(() => {
                        focusCallback.current(col, row);
                    }, 0);
                }
            };
            // Queue up to allow the consumer to react to the event and let us check if they did
            doFocus();
        },
        [onRowAppended, rowMarkerOffset, rows, scrollTo, setCurrent]
    );

    const getCustomNewRowTargetColumn = React.useCallback(
        (col: number): number | undefined => {
            const customTargetColumn =
                columns[col]?.trailingRowOptions?.targetColumn ?? trailingRowOptions?.targetColumn;

            if (typeof customTargetColumn === "number") {
                const customTargetOffset = hasRowMarkers ? 1 : 0;
                return customTargetColumn + customTargetOffset;
            }

            if (typeof customTargetColumn === "object") {
                const maybeIndex = columnsIn.indexOf(customTargetColumn);
                if (maybeIndex >= 0) {
                    const customTargetOffset = hasRowMarkers ? 1 : 0;
                    return maybeIndex + customTargetOffset;
                }
            }

            return undefined;
        },
        [columns, columnsIn, hasRowMarkers, trailingRowOptions?.targetColumn]
    );

    const lastSelectedRowRef = React.useRef<number>();
    const lastSelectedColRef = React.useRef<number>();

    const handleSelect = React.useCallback(
        (args: GridMouseEventArgs) => {
            const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
            const isMultiRow = isMultiKey && rowMultiSelect;
            const isMultiCol = isMultiKey && columnMultiSelect;
            const [col, row] = args.location;
            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;
            const [cellCol, cellRow] = gridSelection.current?.cell ?? [];
            if (args.kind === "cell") {
                lastSelectedColRef.current = undefined;

                lastMouseDownCellLocation.current = [col, row];

                if (col === 0 && hasRowMarkers) {
                    if ((showTrailingBlankRow === true && row === rows) || rowMarkers === "number") return;
                    setOverlay(undefined);
                    focus();
                    const isSelected = selectedRows.hasIndex(row);

                    const lastHighlighted = lastSelectedRowRef.current;
                    if (
                        rowMultiSelect &&
                        (args.shiftKey || args.isLongTouch === true) &&
                        lastHighlighted !== undefined &&
                        selectedRows.hasIndex(lastHighlighted)
                    ) {
                        const newSlice: Slice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];

                        if (isMultiRow || rowSelectionMode === "multi") {
                            setSelectedRows(undefined, newSlice, true);
                        } else {
                            setSelectedRows(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiRow);
                        }
                    } else if (isMultiRow || args.isTouch || rowSelectionMode === "multi") {
                        if (isSelected) {
                            setSelectedRows(selectedRows.remove(row), undefined, true);
                        } else {
                            setSelectedRows(undefined, row, true);
                            lastSelectedRowRef.current = row;
                        }
                    } else if (isSelected && selectedRows.length === 1) {
                        setSelectedRows(CompactSelection.empty(), undefined, false);
                    } else {
                        setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, false);
                        lastSelectedRowRef.current = row;
                    }
                } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
                    const customTargetColumn = getCustomNewRowTargetColumn(col);
                    void appendRow(customTargetColumn ?? col);
                } else {
                    if (cellCol !== col || cellRow !== row) {
                        const isLastStickyRow = lastRowSticky && row === rows;

                        const startedFromLastSticky =
                            lastRowSticky && gridSelection !== undefined && gridSelection.current?.cell[1] === rows;

                        if (
                            (args.shiftKey || args.isLongTouch === true) &&
                            cellCol !== undefined &&
                            cellRow !== undefined &&
                            gridSelection.current !== undefined &&
                            !startedFromLastSticky
                        ) {
                            if (isLastStickyRow) {
                                // If we're making a selection and shift click in to the last sticky row,
                                // just drop the event. Don't kill the selection.
                                return;
                            }

                            const left = Math.min(col, cellCol);
                            const right = Math.max(col, cellCol);
                            const top = Math.min(row, cellRow);
                            const bottom = Math.max(row, cellRow);
                            setCurrent(
                                {
                                    ...gridSelection.current,
                                    range: {
                                        x: left,
                                        y: top,
                                        width: right - left + 1,
                                        height: bottom - top + 1,
                                    },
                                },
                                true,
                                isMultiKey,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            focus();
                        } else {
                            setCurrent(
                                {
                                    cell: [col, row],
                                    range: { x: col, y: row, width: 1, height: 1 },
                                },
                                true,
                                isMultiKey,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            setOverlay(undefined);
                            focus();
                        }
                    }
                }
            } else if (args.kind === "header") {
                lastMouseDownCellLocation.current = [col, row];
                setOverlay(undefined);
                if (hasRowMarkers && col === 0) {
                    lastSelectedRowRef.current = undefined;
                    lastSelectedColRef.current = undefined;
                    if (rowMultiSelect) {
                        if (selectedRows.length !== rows) {
                            setSelectedRows(CompactSelection.fromSingleSelection([0, rows]), undefined, isMultiKey);
                        } else {
                            setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                        }
                        focus();
                    }
                } else {
                    const lastCol = lastSelectedColRef.current;
                    if (
                        columnMultiSelect &&
                        (args.shiftKey || args.isLongTouch === true) &&
                        lastCol !== undefined &&
                        selectedColumns.hasIndex(lastCol)
                    ) {
                        const newSlice: Slice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];

                        if (isMultiCol) {
                            setSelectedColumns(undefined, newSlice, isMultiCol);
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiCol);
                        }
                    } else if (isMultiCol) {
                        if (selectedColumns.hasIndex(col)) {
                            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiCol);
                        } else {
                            setSelectedColumns(undefined, col, isMultiCol);
                        }
                        lastSelectedColRef.current = col;
                    } else {
                        setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, isMultiCol);
                        lastSelectedColRef.current = col;
                    }
                    lastSelectedRowRef.current = undefined;
                    focus();
                }
            } else if (args.kind === "group-header") {
                lastMouseDownCellLocation.current = [col, row];
            } else if (args.kind === "out-of-bounds") {
                setGridSelection(emptyGridSelection, false);
                setOverlay(undefined);
                focus();
                onSelectionCleared?.();
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
            }
        },
        [
            appendRow,
            columnMultiSelect,
            focus,
            getCustomNewRowTargetColumn,
            gridSelection,
            hasRowMarkers,
            lastRowSticky,
            onSelectionCleared,
            rowMarkerOffset,
            rowMarkers,
            rowMultiSelect,
            rowSelectionMode,
            rows,
            setCurrent,
            setGridSelection,
            setSelectedColumns,
            setSelectedRows,
            showTrailingBlankRow,
        ]
    );

    const lastMouseDownCellLocation = React.useRef<[number, number]>();
    const touchDownArgs = React.useRef(visibleRegion);
    const onMouseDown = React.useCallback(
        (args: GridMouseEventArgs) => {
            touchDownArgs.current = visibleRegionRef.current;
            if (args.button !== 0) {
                return;
            }
            mouseState.current = {
                previousSelection: gridSelection,
            };

            lastMouseDownCellLocation.current = undefined;

            if (!args.isTouch) {
                handleSelect(args);
            }
        },
        [gridSelection, handleSelect]
    );

    const [renameGroup, setRenameGroup] = React.useState<{
        group: string;
        bounds: Rectangle;
    }>();

    const handleGroupHeaderSelection = React.useCallback(
        (args: GridMouseEventArgs) => {
            if (args.kind !== "group-header" || !columnMultiSelect) {
                return;
            }
            const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
            const [col] = args.location;
            const selectedColumns = gridSelection.columns;

            if (col < rowMarkerOffset) return;

            const needle = mangledCols[col];
            let start = col;
            let end = col;
            for (let i = col - 1; i >= rowMarkerOffset; i--) {
                if (!isGroupEqual(needle.group, mangledCols[i].group)) break;
                start--;
            }

            for (let i = col + 1; i < mangledCols.length; i++) {
                if (!isGroupEqual(needle.group, mangledCols[i].group)) break;
                end++;
            }

            focus();

            if (isMultiKey) {
                if (selectedColumns.hasAll([start, end + 1])) {
                    let newVal = selectedColumns;
                    for (let index = start; index <= end; index++) {
                        newVal = newVal.remove(index);
                    }
                    setSelectedColumns(newVal, undefined, isMultiKey);
                } else {
                    setSelectedColumns(undefined, [start, end + 1], isMultiKey);
                }
            } else {
                setSelectedColumns(CompactSelection.fromSingleSelection([start, end + 1]), undefined, isMultiKey);
            }
        },
        [columnMultiSelect, focus, gridSelection.columns, mangledCols, rowMarkerOffset, setSelectedColumns]
    );

    const onMouseUp = React.useCallback(
        (args: GridMouseEventArgs, isOutside: boolean) => {
            const mouse = mouseState.current;
            mouseState.current = undefined;

            if (scrollTimer.current !== undefined) {
                window.clearInterval(scrollTimer.current);
            }
            if (isOutside) return;

            const [col, row] = args.location;
            const [lastMouseDownCol, lastMouseDownRow] = lastMouseDownCellLocation.current ?? [];

            let prevented = false;
            const preventDefault = () => {
                prevented = true;
            };

            const handleMaybeClick = (a: GridMouseCellEventArgs): boolean => {
                if (lastMouseDownCol === col && lastMouseDownRow === row) {
                    onCellClicked?.([col - rowMarkerOffset, row], {
                        ...a,
                        preventDefault,
                    });
                }
                if (
                    gridSelection.current !== undefined &&
                    mouse?.previousSelection?.current?.cell !== undefined &&
                    !prevented
                ) {
                    const [selectedCol, selectedRow] = gridSelection.current.cell;
                    const [prevCol, prevRow] = mouse.previousSelection.current.cell;
                    const c = getMangedCellContent([col, row]);
                    const r = c.kind === GridCellKind.Custom ? undefined : CellRenderers[c.kind];
                    if (r !== undefined && r.onClick !== undefined) {
                        const newVal = r.onClick(c, a.localEventX, a.localEventY, a.bounds);
                        if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                            mangledOnCellEdited(a.location, newVal);
                            gridRef.current?.damage([
                                {
                                    cell: a.location,
                                },
                            ]);
                        }
                    }
                    if (col === selectedCol && col === prevCol && row === selectedRow && row === prevRow) {
                        reselect(a.bounds, false);
                        return true;
                    }
                }
                return false;
            };

            if (args.isTouch) {
                const vr = visibleRegionRef.current;
                const touchVr = touchDownArgs.current;
                if (vr.x !== touchVr.x || vr.y !== touchVr.y) {
                    // we scrolled, abort
                    return;
                }
                // take care of context menus first if long pressed item is already selected
                if (args.isLongTouch === true) {
                    if (
                        args.kind === "cell" &&
                        gridSelection?.current?.cell[0] === col &&
                        gridSelection?.current?.cell[1] === row
                    ) {
                        onCellContextMenu?.([args.location[0] - rowMarkerOffset, args.location[1]], {
                            ...args,
                            preventDefault,
                        });
                        return;
                    } else if (args.kind === "header" && gridSelection.columns.hasIndex(col)) {
                        onHeaderContextMenu?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
                        return;
                    } else if (args.kind === "group-header") {
                        onGroupHeaderContextMenu?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
                        return;
                    }
                }
                if (args.kind === "cell") {
                    // click that cell
                    if (!handleMaybeClick(args)) {
                        handleSelect(args);
                    }
                } else {
                    handleSelect(args);
                }
                return;
            }

            if (args.kind === "header") {
                if (args.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
                    onHeaderClicked?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
                } else if (args.button === 2) {
                    onHeaderContextMenu?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
                }
            }

            if (args.kind === "group-header") {
                if (args.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
                    onGroupHeaderClicked?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
                    if (!prevented) {
                        handleGroupHeaderSelection(args);
                    }
                } else if (args.button === 2) {
                    onGroupHeaderContextMenu?.(args.location[0] - rowMarkerOffset, { ...args, preventDefault });
                }
            }

            if (args.kind === "cell") {
                if (args.button === 0) {
                    handleMaybeClick(args);
                } else if (args.button === 2) {
                    onCellContextMenu?.([args.location[0] - rowMarkerOffset, args.location[1]], {
                        ...args,
                        preventDefault,
                    });
                }
            }
        },
        [
            getMangedCellContent,
            gridSelection,
            handleGroupHeaderSelection,
            handleSelect,
            mangledOnCellEdited,
            onCellClicked,
            onCellContextMenu,
            onGroupHeaderClicked,
            onGroupHeaderContextMenu,
            onHeaderClicked,
            onHeaderContextMenu,
            reselect,
            rowMarkerOffset,
        ]
    );

    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const currentCell = gridSelection?.current?.cell;
    const onVisibleRegionChangedImpl = React.useCallback(
        (region: Rectangle, tx?: number, ty?: number) => {
            let selected = currentCell;
            if (selected !== undefined) {
                selected = [selected[0] - rowMarkerOffset, selected[1]];
            }
            const newRegion = {
                ...region,
                x: region.x - rowMarkerOffset,
                height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
                tx,
                ty,
                extras: {
                    selected,
                    freezeRegion:
                        freezeColumns === 0
                            ? undefined
                            : {
                                  x: 0,
                                  y: region.y,
                                  width: freezeColumns,
                                  height: region.height,
                              },
                },
            };
            setVisibleRegion(newRegion);
            visibleRegionRef.current = newRegion;
            onVisibleRegionChanged?.(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
        },
        [freezeColumns, currentCell, onVisibleRegionChanged, rowMarkerOffset, rows, showTrailingBlankRow]
    );

    const onColumnMovedImpl = React.useCallback(
        (startIndex: number, endIndex: number) => {
            onColumnMoved?.(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
            setSelectedColumns(CompactSelection.fromSingleSelection(endIndex), undefined, true);
        },
        [onColumnMoved, rowMarkerOffset, setSelectedColumns]
    );

    const onDragStartImpl = React.useCallback(
        (args: GridDragEventArgs) => {
            onDragStart?.({
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            });
        },
        [onDragStart, rowMarkerOffset]
    );

    const onMouseMoveImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            const a: GridMouseEventArgs = {
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            };
            onMouseMove?.(a);
        },
        [onMouseMove, rowMarkerOffset]
    );

    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            if (mouseState.current !== undefined && gridSelection.current !== undefined && !isDraggable) {
                const [selectedCol, selectedRow] = gridSelection.current.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = args.location;

                const landedOnLastStickyRow = lastRowSticky && row === rows;
                const startedFromLastStickyRow = lastRowSticky && selectedRow === rows;
                if (landedOnLastStickyRow || startedFromLastStickyRow) return;

                if (col === 0 && hasRowMarkers) {
                    col = 1;
                }

                const deltaX = col - selectedCol;
                const deltaY = (row ?? 0) - selectedRow;

                const newRange: Rectangle = {
                    x: deltaX >= 0 ? selectedCol : col,
                    y: deltaY >= 0 ? selectedRow : row ?? 0,
                    width: Math.abs(deltaX) + 1,
                    height: Math.abs(deltaY) + 1,
                };

                setCurrent(
                    {
                        ...gridSelection.current,
                        range: newRange,
                    },
                    true,
                    false,
                    "drag"
                );

                if (args.kind === "out-of-bounds" && scrollRef.current !== null) {
                    const [horizontal, vertical] = args.direction;
                    let scrollX = 0;
                    let scrollY = 0;
                    if (horizontal === -1) {
                        scrollX = columns[columns.length - 1].width;
                    } else if (horizontal === 1) {
                        scrollX = -columns[0].width;
                    }
                    if (vertical !== 0) {
                        if (typeof rowHeight === "number") {
                            scrollY = rowHeight * vertical;
                        } else {
                            scrollY = rowHeight(row ?? 0) * vertical;
                        }
                    }

                    if (scrollTimer.current !== undefined) {
                        window.clearInterval(scrollTimer.current);
                    }
                    scrollTimer.current = window.setInterval(() => {
                        scrollRef.current?.scrollBy(-100 * horizontal, scrollY);
                    }, 200);
                    scrollRef.current.scrollBy(scrollX, scrollY);
                } else {
                    if (scrollTimer.current !== undefined) {
                        window.clearInterval(scrollTimer.current);
                    }
                }
            }

            onItemHovered?.({ ...args, location: [args.location[0] - rowMarkerOffset, args.location[1]] as any });
        },
        [
            gridSelection,
            isDraggable,
            onItemHovered,
            rowMarkerOffset,
            lastRowSticky,
            rows,
            hasRowMarkers,
            setCurrent,
            columns,
            rowHeight,
        ]
    );

    const copyToClipboard = React.useCallback(
        (cells: readonly (readonly GridCell[])[], columnIndexes: readonly number[]) => {
            function escape(str: string): string {
                if (/\n|"|\t/.test(str)) {
                    str = `"${str.replace(/"/g, `""`)}"`;
                }
                return str;
            }

            const formatCell = (cell: GridCell, index: number): string => {
                const colIndex = columnIndexes[index];
                if (cell.span !== undefined && cell.span[0] !== colIndex) return "";
                switch (cell.kind) {
                    case GridCellKind.Text:
                    case GridCellKind.Number:
                        return escape(cell.displayData);
                    case GridCellKind.Markdown:
                    case GridCellKind.RowID:
                    case GridCellKind.Uri:
                        return escape(cell.data);
                    case GridCellKind.Image:
                    case GridCellKind.Bubble:
                        return cell.data.reduce((pv, cv) => `${escape(pv)},${escape(cv)}`);
                    case GridCellKind.Boolean:
                        return cell.data ? "TRUE" : "FALSE";
                    case GridCellKind.Loading:
                        return "#LOADING";
                    case GridCellKind.Protected:
                        return "************";
                    case GridCellKind.Drilldown:
                        return cell.data.map(i => i.text).reduce((pv, cv) => `${escape(pv)},${escape(cv)}`);
                    case GridCellKind.Custom:
                        return escape(cell.copyData);
                    default:
                        assertNever(cell);
                }
            };

            const str = cells.map(row => row.map(formatCell).join("\t")).join("\n");
            void window.navigator.clipboard.writeText(str);
        },
        []
    );

    // 1 === move one
    // 2 === move to end
    const adjustSelection = React.useCallback(
        (direction: [0 | 1 | -1 | 2 | -2, 0 | 1 | -1 | 2 | -2]) => {
            if (gridSelection.current === undefined) return;

            const [x, y] = direction;
            const [col, row] = gridSelection.current.cell;
            const old = gridSelection.current.range;
            let left = old.x;
            let right = old.x + old.width;
            let top = old.y;
            let bottom = old.y + old.height;

            // take care of vertical first in case new spans come in
            if (y !== 0) {
                if (y === 2) {
                    // go to end
                    bottom = rows;
                    top = row;
                    scrollTo(0, bottom, "vertical");
                } else if (y === -2) {
                    // go to start
                    top = 0;
                    bottom = row + 1;
                    scrollTo(0, top, "vertical");
                } else if (y === 1) {
                    // motion down
                    if (top < row) {
                        top++;
                        scrollTo(0, top, "vertical");
                    } else {
                        bottom = Math.min(rows, bottom + 1);
                        scrollTo(0, bottom, "vertical");
                    }
                } else if (y === -1) {
                    // motion up
                    if (bottom > row + 1) {
                        bottom--;
                        scrollTo(0, bottom, "vertical");
                    } else {
                        top = Math.max(0, top - 1);
                        scrollTo(0, top, "vertical");
                    }
                } else {
                    assertNever(y);
                }
            }

            if (x !== 0) {
                if (x === 2) {
                    right = mangledCols.length;
                    left = col;
                    scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                } else if (x === -2) {
                    left = rowMarkerOffset;
                    right = col + 1;
                    scrollTo(left - rowMarkerOffset, 0, "horizontal");
                } else {
                    const disallowed =
                        getCellsForSelection !== undefined
                            ? getSpanStops(
                                  getCellsForSelection({
                                      x: left,
                                      y: top,
                                      width: right - left - rowMarkerOffset,
                                      height: bottom - top,
                                  })
                              )
                            : [];
                    if (x === 1) {
                        // motion right
                        let done = false;
                        if (left < col) {
                            if (disallowed.length > 0) {
                                const target = range(left + 1, col + 1).find(
                                    n => !disallowed.includes(n - rowMarkerOffset)
                                );
                                if (target !== undefined) {
                                    left = target;
                                    done = true;
                                }
                            } else {
                                left++;
                                done = true;
                            }
                            if (done) scrollTo(left, 0, "horizontal");
                        }
                        if (!done) {
                            right = Math.min(mangledCols.length, right + 1);
                            scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                        }
                    } else if (x === -1) {
                        // motion left
                        let done = false;
                        if (right > col + 1) {
                            if (disallowed.length > 0) {
                                const target = range(right - 1, col, -1).find(
                                    n => !disallowed.includes(n - rowMarkerOffset)
                                );
                                if (target !== undefined) {
                                    right = target;
                                    done = true;
                                }
                            } else {
                                right--;
                                done = true;
                            }
                            if (done) scrollTo(right - rowMarkerOffset, 0, "horizontal");
                        } else {
                            left = Math.max(rowMarkerOffset, left - 1);
                            scrollTo(left - rowMarkerOffset, 0, "horizontal");
                        }
                    } else {
                        assertNever(x);
                    }
                }
            }

            setCurrent(
                {
                    cell: gridSelection.current.cell,
                    range: {
                        x: left,
                        y: top,
                        width: right - left,
                        height: bottom - top,
                    },
                },
                true,
                false,
                "keyboard-select"
            );
        },
        [getCellsForSelection, gridSelection, mangledCols.length, rowMarkerOffset, rows, scrollTo, setCurrent]
    );

    const updateSelectedCell = React.useCallback(
        (col: number, row: number, fromEditingTrailingRow: boolean, freeMove: boolean): boolean => {
            const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
            col = clamp(col, rowMarkerOffset, columns.length - 1 + rowMarkerOffset);
            row = clamp(row, 0, rowMax);

            if (col === currentCell?.[0] && row === currentCell?.[1]) return false;
            if (freeMove && gridSelection.current !== undefined) {
                const newStack = [...gridSelection.current.rangeStack];
                if (gridSelection.current.range.width > 1 || gridSelection.current.range.height > 1) {
                    newStack.push(gridSelection.current.range);
                }
                setGridSelection(
                    {
                        ...gridSelection,
                        current: {
                            cell: [col, row],
                            range: { x: col, y: row, width: 1, height: 1 },
                            rangeStack: newStack,
                        },
                    },
                    true
                );
            } else {
                setCurrent(
                    {
                        cell: [col, row],
                        range: { x: col, y: row, width: 1, height: 1 },
                    },
                    true,
                    false,
                    "keyboard-nav"
                );
            }

            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                lastSent.current = undefined;
            }

            scrollTo(col - rowMarkerOffset, row);

            return true;
        },
        [
            mangledRows,
            rowMarkerOffset,
            columns.length,
            currentCell,
            gridSelection,
            scrollTo,
            setGridSelection,
            setCurrent,
        ]
    );

    const onFinishEditing = React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            if (overlay?.cell !== undefined && newValue !== undefined) {
                // Fixme, this cast is dangerous
                mangledOnCellEdited?.(overlay.cell, newValue as EditableGridCell);
                window.requestAnimationFrame(() => {
                    gridRef.current?.damage([
                        {
                            cell: overlay.cell,
                        },
                    ]);
                });
            }
            focus(true);
            setOverlay(undefined);

            const [movX, movY] = movement;
            if (gridSelection.current !== undefined && (movX !== 0 || movY !== 0)) {
                const isEditingTrailingRow =
                    gridSelection.current.cell[1] === mangledRows - 1 && newValue !== undefined;
                updateSelectedCell(
                    gridSelection.current.cell[0] + movX,
                    gridSelection.current.cell[1] + movY,
                    isEditingTrailingRow,
                    false
                );
            }
            onFinishedEditing?.(newValue, movement);
        },
        [overlay?.cell, focus, gridSelection, onFinishedEditing, mangledOnCellEdited, mangledRows, updateSelectedCell]
    );

    const [selCol, selRow] = currentCell ?? [];
    const onCellFocused = React.useCallback(
        (cell: readonly [number, number]) => {
            if (selCol === cell[0] && selRow === cell[1]) return;
            setCurrent(
                {
                    cell,
                    range: { x: cell[0], y: cell[1], width: 1, height: 1 },
                },
                true,
                false,
                "keyboard-nav"
            );
        },
        [selCol, selRow, setCurrent]
    );

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            const fn = async () => {
                const overlayOpen = overlay !== undefined;
                const { altKey, shiftKey } = event;
                const isOSX = browserIsOSX.value;
                const isPrimaryKey = isOSX ? event.metaKey : event.ctrlKey;
                const isDeleteKey = event.key === "Delete" || (isOSX && event.key === "Backspace");
                const vr = visibleRegionRef.current;
                const selectedColumns = gridSelection.columns;
                const selectedRows = gridSelection.rows;

                if (event.key === "Escape") {
                    if (overlayOpen) {
                        setOverlay(undefined);
                    } else if (keybindings.clear) {
                        setGridSelection(emptyGridSelection, false);
                        onSelectionCleared?.();
                    }
                    return;
                } else if (isHotkey("primary+a", event) && keybindings.selectAll) {
                    setGridSelection(
                        {
                            columns: CompactSelection.empty(),
                            rows: CompactSelection.empty(),
                            current: {
                                cell: gridSelection.current?.cell ?? [rowMarkerOffset, 0],
                                range: {
                                    x: rowMarkerOffset,
                                    y: 0,
                                    width: columnsIn.length,
                                    height: rows,
                                },
                                rangeStack: [],
                            },
                        },
                        false
                    );
                    event.cancel();
                    return;
                } else if (isHotkey("primary+f", event) && keybindings.search) {
                    event.cancel();
                    setShowSearchInner(true);
                }

                function deleteRange(r: Rectangle) {
                    focus();
                    const damaged: [number, number][] = [];
                    for (let x = r.x; x < r.x + r.width; x++) {
                        for (let y = r.y; y < r.y + r.height; y++) {
                            const cellValue = getCellContent([x - rowMarkerOffset, y]);
                            let newVal: InnerGridCell | undefined = undefined;
                            if (cellValue.kind === GridCellKind.Custom) {
                                const editor = provideEditor?.(cellValue);
                                if (isObjectEditorCallbackResult(editor)) {
                                    newVal = editor?.deletedValue?.(cellValue);
                                }
                            } else if (
                                (isEditableGridCell(cellValue) && cellValue.allowOverlay) ||
                                cellValue.kind === GridCellKind.Boolean
                            ) {
                                const toDelete = CellRenderers[cellValue.kind];
                                newVal = toDelete.onDelete?.(cellValue);
                            }
                            if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                                mangledOnCellEdited([x, y], newVal);
                                damaged.push([x, y]);
                            }
                        }
                    }
                    gridRef.current?.damage(damaged.map(x => ({ cell: x })));
                }

                if (isDeleteKey) {
                    const callbackResult = onDelete?.(gridSelection) ?? true;
                    event.cancel();
                    if (callbackResult !== false) {
                        const toDelete = callbackResult === true ? gridSelection : callbackResult;

                        // delete order:
                        // 1) primary range
                        // 2) secondary ranges
                        // 3) columns
                        // 4) rows

                        if (toDelete.current !== undefined) {
                            deleteRange(toDelete.current.range);
                            for (const r of toDelete.current.rangeStack) {
                                deleteRange(r);
                            }
                        }

                        for (const r of toDelete.rows) {
                            deleteRange({
                                x: rowMarkerOffset,
                                y: r,
                                width: mangledCols.length - rowMarkerOffset,
                                height: 1,
                            });
                        }

                        for (const col of toDelete.columns) {
                            deleteRange({
                                x: col,
                                y: 0,
                                width: 1,
                                height: rows,
                            });
                        }
                    }
                    return;
                }

                if (gridSelection.current === undefined) return;
                let [col, row] = gridSelection.current.cell;
                let freeMove = false;

                if (keybindings.selectColumn && isHotkey("primary+ ", event)) {
                    if (selectedColumns.hasIndex(col)) {
                        setSelectedColumns(selectedColumns.remove(col), undefined, true);
                    } else {
                        setSelectedColumns(undefined, col, true);
                    }
                } else if (keybindings.selectRow && isHotkey("shift+ ", event)) {
                    if (selectedRows.hasIndex(row)) {
                        setSelectedRows(selectedRows.remove(row), undefined, true);
                    } else {
                        setSelectedRows(undefined, row, true);
                    }
                } else if (
                    (isHotkey("Enter", event) || isHotkey(" ", event) || isHotkey("shift+Enter", event)) &&
                    event.bounds !== undefined
                ) {
                    if (overlayOpen) {
                        setOverlay(undefined);
                        if (isHotkey("Enter", event)) {
                            row++;
                        } else if (isHotkey("shift+Enter", event)) {
                            row--;
                        }
                    } else if (row === rows && showTrailingBlankRow) {
                        window.setTimeout(() => {
                            const customTargetColumn = getCustomNewRowTargetColumn(col);
                            void appendRow(customTargetColumn ?? col);
                        }, 0);
                    } else {
                        reselect(event.bounds, true);
                        event.cancel();
                    }
                } else if (
                    keybindings.downFill &&
                    isHotkey("primary+_68", event) &&
                    gridSelection.current.range.height > 1
                ) {
                    // ctrl/cmd + d
                    const damage: (readonly [number, number])[] = [];
                    const r = gridSelection.current.range;
                    for (let x = 0; x < r.width; x++) {
                        const fillCol = x + r.x;
                        const fillVal = getMangedCellContent([fillCol, r.y]);
                        if (isInnerOnlyCell(fillVal) || !isEditableGridCell(fillVal)) continue;
                        for (let y = 1; y < r.height; y++) {
                            const fillRow = y + r.y;
                            const target = [fillCol, fillRow] as const;
                            damage.push(target);
                            mangledOnCellEdited?.(target, {
                                ...fillVal,
                            });
                        }
                    }

                    gridRef.current?.damage(
                        damage.map(c => ({
                            cell: c,
                        }))
                    );
                    event.cancel();
                } else if (
                    keybindings.rightFill &&
                    isHotkey("primary+_82", event) &&
                    gridSelection.current.range.width > 1
                ) {
                    // ctrl/cmd + r
                    const damage: (readonly [number, number])[] = [];
                    const r = gridSelection.current.range;
                    for (let y = 0; y < r.height; y++) {
                        const fillRow = y + r.y;
                        const fillVal = getMangedCellContent([r.x, fillRow]);
                        if (isInnerOnlyCell(fillVal) || !isEditableGridCell(fillVal)) continue;
                        for (let x = 1; x < r.width; x++) {
                            const fillCol = x + r.x;
                            const target = [fillCol, fillRow] as const;
                            damage.push(target);
                            mangledOnCellEdited?.(target, {
                                ...fillVal,
                            });
                        }
                    }

                    gridRef.current?.damage(
                        damage.map(c => ({
                            cell: c,
                        }))
                    );
                    event.cancel();
                } else if (keybindings.pageDown && isHotkey("PageDown", event)) {
                    row += Math.max(1, visibleRegionRef.current.height - 4); // partial cell accounting
                    event.cancel();
                } else if (keybindings.pageUp && isHotkey("PageUp", event)) {
                    row -= Math.max(1, visibleRegionRef.current.height - 4); // partial cell accounting
                    event.cancel();
                } else if (keybindings.first && isHotkey("primary+Home", event)) {
                    setOverlay(undefined);
                    row = 0;
                    col = 0;
                } else if (keybindings.last && isHotkey("primary+End", event)) {
                    setOverlay(undefined);
                    row = Number.MAX_SAFE_INTEGER;
                    col = Number.MAX_SAFE_INTEGER;
                } else if (keybindings.first && isHotkey("primary+shift+Home", event)) {
                    setOverlay(undefined);
                    adjustSelection([-2, -2]);
                } else if (keybindings.last && isHotkey("primary+shift+End", event)) {
                    setOverlay(undefined);
                    adjustSelection([2, 2]);
                } else if (event.key === "ArrowDown") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([0, isPrimaryKey && !altKey ? 2 : 1]);
                    } else {
                        if (altKey && !isPrimaryKey) {
                            freeMove = true;
                        }
                        if (isPrimaryKey && !altKey) {
                            row = rows - 1;
                        } else {
                            row += 1;
                        }
                    }
                } else if (event.key === "ArrowUp" || event.key === "Home") {
                    const asPrimary = event.key === "Home" || isPrimaryKey;
                    setOverlay(undefined);
                    if (shiftKey) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([0, asPrimary && !altKey ? -2 : -1]);
                    } else {
                        if (altKey && !asPrimary) {
                            freeMove = true;
                        }
                        row += asPrimary && !altKey ? Number.MIN_SAFE_INTEGER : -1;
                    }
                } else if (event.key === "ArrowRight" || event.key === "End") {
                    const asPrimary = event.key === "End" || isPrimaryKey;
                    setOverlay(undefined);
                    if (shiftKey) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([asPrimary && !altKey ? 2 : 1, 0]);
                    } else {
                        if (altKey && !asPrimary) {
                            freeMove = true;
                        }
                        col += asPrimary && !altKey ? Number.MAX_SAFE_INTEGER : 1;
                    }
                } else if (event.key === "ArrowLeft") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        // ctrl + alt is used as a screen reader command, let's not nuke it.
                        adjustSelection([isPrimaryKey && !altKey ? -2 : -1, 0]);
                    } else {
                        if (altKey && !isPrimaryKey) {
                            freeMove = true;
                        }
                        col += isPrimaryKey && !altKey ? Number.MIN_SAFE_INTEGER : -1;
                    }
                } else if (event.key === "Tab") {
                    setOverlay(undefined);
                    if (shiftKey) {
                        col--;
                    } else {
                        col++;
                    }
                } else if (
                    !event.metaKey &&
                    !event.ctrlKey &&
                    String.fromCharCode(event.keyCode).match(/(\w|\s)/g) &&
                    event.bounds !== undefined &&
                    isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, row - 1)]))
                ) {
                    if (
                        (!lastRowSticky || row !== rows) &&
                        (vr.y > row || row > vr.y + vr.height || vr.x > col || col > vr.x + vr.width)
                    ) {
                        return;
                    }
                    let key = String.fromCharCode(event.keyCode);
                    if (!event.shiftKey) {
                        key = key.toLowerCase();
                    }
                    reselect(event.bounds, true, key);
                    event.cancel();
                }

                const moved = updateSelectedCell(col, row, false, freeMove);
                if (moved) {
                    event.cancel();
                }
            };
            void fn();
        },
        [
            overlay,
            gridSelection,
            keybindings.selectAll,
            keybindings.search,
            keybindings.selectColumn,
            keybindings.selectRow,
            keybindings.downFill,
            keybindings.rightFill,
            keybindings.pageDown,
            keybindings.pageUp,
            keybindings.first,
            keybindings.last,
            keybindings.clear,
            getCellContent,
            rowMarkerOffset,
            updateSelectedCell,
            setGridSelection,
            onSelectionCleared,
            columnsIn.length,
            rows,
            focus,
            provideEditor,
            mangledOnCellEdited,
            onDelete,
            mangledCols.length,
            setSelectedColumns,
            setSelectedRows,
            showTrailingBlankRow,
            getCustomNewRowTargetColumn,
            appendRow,
            reselect,
            getMangedCellContent,
            adjustSelection,
            lastRowSticky,
        ]
    );

    function unquote(str: string): string[][] {
        function descape(s: string): string {
            if (s.startsWith('"') && s.endsWith('"')) {
                s = s.slice(1, -1).replace(/""/g, '"');
            }
            return s;
        }

        const enum State {
            None,
            inString,
            inStringPostQuote,
        }

        const result: string[][] = [];
        let current: string[] = [];

        let start = 0;
        let state = State.None;
        str = str.trim().replace(/\r\n/g, "\n");
        let index = 0;
        for (const char of str) {
            switch (state) {
                case State.None:
                    if (char === "\t" || char === "\n") {
                        current.push(str.slice(start, index));
                        start = index + 1;

                        if (char === "\n") {
                            result.push(current);
                            current = [];
                        }
                    } else if (char === `"`) {
                        state = State.inString;
                    }
                    break;
                case State.inString:
                    if (char === `"`) {
                        state = State.inStringPostQuote;
                    }
                    break;
                case State.inStringPostQuote:
                    if (char === '"') {
                        state = State.inString;
                    } else if (char === "\t" || char === "\n") {
                        current.push(descape(str.slice(start, index)));
                        start = index + 1;

                        if (char === "\n") {
                            result.push(current);
                            current = [];
                        }
                        state = State.None;
                    } else {
                        state = State.None;
                    }
                    break;
            }

            index++;
        }
        if (start < str.length) {
            current.push(descape(str.slice(start, str.length)));
        }
        result.push(current);
        return result;
    }

    const onPasteInternal = React.useCallback(async () => {
        if (!keybindings.paste) return;
        function pasteToCell(inner: InnerGridCell, target: readonly [number, number], toPaste: string): boolean {
            if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
                switch (inner.kind) {
                    case GridCellKind.Text:
                    case GridCellKind.Markdown:
                    case GridCellKind.Uri: {
                        mangledOnCellEdited?.(target, {
                            ...inner,
                            data: toPaste,
                        });
                        return true;
                    }
                    case GridCellKind.Number: {
                        const newNumber = Number.parseFloat(toPaste);
                        if (!Number.isNaN(newNumber)) {
                            mangledOnCellEdited?.(target, {
                                ...inner,
                                data: newNumber,
                            });
                            return true;
                        }
                        return false;
                    }
                    default:
                        assertNever(inner);
                }
            }
            return false;
        }

        const selectedColumns = gridSelection.columns;
        const selectedRows = gridSelection.rows;
        const focused =
            scrollRef.current?.contains(document.activeElement) === true ||
            canvasRef.current?.contains(document.activeElement) === true;

        let target = gridSelection.current?.cell;
        if (target === undefined && selectedColumns.length === 1) {
            target = [selectedColumns.first() ?? 0, 0];
        }
        if (target === undefined && selectedRows.length === 1) {
            target = [rowMarkerOffset, selectedRows.first() ?? 0];
        }

        if (focused && target !== undefined) {
            const text = await navigator.clipboard.readText();

            const [gridCol, gridRow] = target;

            if (onPaste === undefined) {
                const cellData = getMangedCellContent(target);
                pasteToCell(cellData, target, text);
                return;
            }

            const data = unquote(text);

            if (onPaste === false || (typeof onPaste === "function" && onPaste?.(target, data) !== true)) {
                return;
            }

            const damage: (readonly [number, number])[] = [];
            for (let row = 0; row < data.length; row++) {
                const dataRow = data[row];
                if (row + gridRow >= rows) break;
                for (let col = 0; col < dataRow.length; col++) {
                    const dataItem = dataRow[col];
                    const index = [col + gridCol, row + gridRow] as const;
                    const cellData = getMangedCellContent(index);
                    if (pasteToCell(cellData, index, dataItem)) {
                        damage.push(index);
                    }
                }
            }
            gridRef.current?.damage(
                damage.map(c => ({
                    cell: c,
                }))
            );
        }
    }, [getMangedCellContent, gridSelection, keybindings.paste, mangledOnCellEdited, onPaste, rowMarkerOffset, rows]);

    useEventListener("paste", onPasteInternal, window, false, true);

    const onCopy = React.useCallback(() => {
        if (!keybindings.copy) return;
        const focused =
            scrollRef.current?.contains(document.activeElement) === true ||
            canvasRef.current?.contains(document.activeElement) === true;

        const selectedColumns = gridSelection.columns;
        const selectedRows = gridSelection.rows;

        if (focused && getCellsForSelection !== undefined) {
            if (gridSelection.current !== undefined) {
                copyToClipboard(
                    getCellsForSelection(gridSelection.current.range),
                    range(
                        gridSelection.current.range.x - rowMarkerOffset,
                        gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset
                    )
                );
            } else if (selectedRows !== undefined && selectedRows.length > 0) {
                const toCopy = Array.from(selectedRows);
                const cells = toCopy.map(
                    rowIndex =>
                        getCellsForSelection({
                            x: rowMarkerOffset,
                            y: rowIndex,
                            width: columnsIn.length - rowMarkerOffset,
                            height: 1,
                        })[0]
                );
                copyToClipboard(cells, range(columnsIn.length));
            } else if (selectedColumns.length >= 1) {
                const results: (readonly (readonly GridCell[])[])[] = [];
                const cols: number[] = [];
                for (const col of selectedColumns) {
                    results.push(
                        getCellsForSelection({
                            x: col,
                            y: 0,
                            width: 1,
                            height: rows,
                        })
                    );
                    cols.push(col - rowMarkerOffset);
                }
                if (results.length === 1) {
                    copyToClipboard(results[0], cols);
                }
                // FIXME: this is dumb
                const toCopy = results.reduce((pv, cv) => pv.map((row, index) => [...row, ...cv[index]]));

                copyToClipboard(toCopy, cols);
            }
        }
    }, [
        columnsIn.length,
        copyToClipboard,
        getCellsForSelection,
        gridSelection,
        keybindings.copy,
        rowMarkerOffset,
        rows,
    ]);

    useEventListener("copy", onCopy, window, true, false);

    const onSearchResultsChanged = React.useCallback(
        (results: readonly (readonly [number, number])[], navIndex: number) => {
            if (results.length === 0 || navIndex === -1) return;

            const [col, row] = results[navIndex];
            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                return;
            }
            lastSent.current = [col, row];
            updateSelectedCell(col, row, false, false);
        },
        [updateSelectedCell]
    );

    React.useEffect(() => {
        if (gridSelection.current === undefined) return;
        const [col, row] = gridSelection.current.cell;

        // Check that the grid selection is in range before updating the selected cell
        const selectionColInRange = mangledCols[col];
        if (selectionColInRange === undefined) return;

        updateSelectedCell(col, row, false, false);
    }, [mangledCols, rows, gridSelection, updateSelectedCell]);

    const disabledRows = React.useMemo(() => {
        if (showTrailingBlankRow === true && trailingRowOptions?.tint === true) {
            return CompactSelection.fromSingleSelection(mangledRows - 1);
        }
        return CompactSelection.empty();
    }, [mangledRows, showTrailingBlankRow, trailingRowOptions?.tint]);

    const mangledVerticalBorder = React.useCallback(
        (col: number) => {
            return typeof verticalBorder === "boolean"
                ? verticalBorder
                : verticalBorder?.(col - rowMarkerOffset) ?? true;
        },
        [rowMarkerOffset, verticalBorder]
    );

    const mangledGetGroupDetails = React.useCallback<NonNullable<DataEditorProps["getGroupDetails"]>>(
        group => {
            let result = getGroupDetails?.(group) ?? { name: group };
            if (onGroupHeaderRenamed !== undefined && group !== "") {
                result = {
                    icon: result.icon,
                    name: result.name,
                    overrideTheme: result.overrideTheme,
                    actions: [
                        ...(result.actions ?? []),
                        {
                            title: "Rename",
                            icon: "renameIcon",
                            onClick: e =>
                                setRenameGroup({
                                    group: result.name,
                                    bounds: e.bounds,
                                }),
                        },
                    ],
                };
            }
            return result;
        },
        [getGroupDetails, onGroupHeaderRenamed]
    );

    const drawCustomCellMangled: typeof drawCell = React.useMemo(() => {
        if (drawCell !== undefined) {
            return drawCell;
        } else if (drawCustomCell !== undefined) {
            return a => drawCustomCell(a.ctx, a.cell, a.theme, a.rect, a.hoverAmount);
        }

        return undefined;
    }, [drawCell, drawCustomCell]);

    const renameGroupNode = React.useMemo(() => {
        if (renameGroup === undefined || canvasRef.current === null) return null;
        const { bounds, group } = renameGroup;
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        return (
            <GroupRename
                bounds={bounds}
                group={group}
                canvasBounds={canvasBounds}
                onClose={() => setRenameGroup(undefined)}
                onFinish={newVal => {
                    setRenameGroup(undefined);
                    onGroupHeaderRenamed?.(group, newVal);
                }}
            />
        );
    }, [onGroupHeaderRenamed, renameGroup]);

    const mangledFreezeColumns = Math.min(mangledCols.length, freezeColumns + (hasRowMarkers ? 1 : 0));

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            updateCells: (...args) => gridRef.current?.damage(...args),
            getBounds: (...args) => gridRef.current?.getBounds(...args),
            emit: async e => {
                switch (e) {
                    case "delete":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            ctrlKey: false,
                            key: "Delete",
                            keyCode: 46,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                        });
                        break;
                    case "fill-right":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            ctrlKey: true,
                            key: "r",
                            keyCode: 82,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                        });
                        break;
                    case "fill-down":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            ctrlKey: true,
                            key: "d",
                            keyCode: 68,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                        });
                        break;
                    case "copy":
                        onCopy();
                        break;
                    case "paste":
                        await onPasteInternal();
                        break;
                }
            },
            scrollTo,
        }),
        [onCopy, onKeyDown, onPasteInternal, scrollTo]
    );

    return (
        <ThemeProvider theme={mergedTheme}>
            <DataGridSearch
                {...rest}
                enableGroups={enableGroups}
                canvasRef={canvasRef}
                cellXOffset={cellXOffset}
                cellYOffset={cellYOffset}
                accessibilityHeight={visibleRegion.height}
                columns={mangledCols}
                drawCustomCell={drawCustomCellMangled}
                disabledRows={disabledRows}
                freezeColumns={mangledFreezeColumns}
                lockColumns={rowMarkerOffset}
                firstColAccessible={rowMarkerOffset === 0}
                getCellContent={getMangedCellContent}
                showSearch={showSearch}
                onSearchClose={onSearchClose}
                highlightRegions={highlightRegions}
                getCellsForSelection={getCellsForSelection}
                getGroupDetails={mangledGetGroupDetails}
                headerHeight={headerHeight}
                groupHeaderHeight={enableGroups ? groupHeaderHeight : 0}
                lastRowSticky={lastRowSticky}
                onCellFocused={onCellFocused}
                onColumnMoved={onColumnMoved === undefined ? undefined : onColumnMovedImpl}
                onDragStart={onDragStartImpl}
                onHeaderMenuClick={onHeaderMenuClickInner}
                onItemHovered={onItemHoveredImpl}
                onMouseMove={onMouseMoveImpl}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onSearchResultsChanged={onSearchResultsChanged}
                onVisibleRegionChanged={onVisibleRegionChangedImpl}
                rowHeight={rowHeight}
                rows={mangledRows}
                scrollRef={scrollRef}
                selection={gridSelection}
                translateX={visibleRegion.tx}
                translateY={visibleRegion.ty}
                verticalBorder={mangledVerticalBorder}
                gridRef={gridRef}
            />
            {renameGroupNode}
            {overlay !== undefined && (
                <DataGridOverlayEditor
                    {...overlay}
                    className={p.experimental?.isSubGrid === true ? "click-outside-ignore" : undefined}
                    provideEditor={provideEditor}
                    imageEditorOverride={imageEditorOverride}
                    onFinishEditing={onFinishEditing}
                    markdownDivCreateNode={markdownDivCreateNode}
                />
            )}
        </ThemeProvider>
    );
};

export const DataEditor = React.forwardRef(DataEditorImpl);
