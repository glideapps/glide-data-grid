// import AppIcon from "common/app-icon";
import * as React from "react";
import { Subtract } from "utility-types";
import { useEventListener } from "../common/utils";
import { GridCell, GridCellKind, GridKeyEventArgs, GridSelection } from "../data-grid/data-grid-types";
import ScrollingDataGrid, { ScrollingDataGridProps } from "../scrolling-data-grid/scrolling-data-grid";
import { SearchWrapper } from "./data-grid-search-style";

// icons
const UpArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="button-icon">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M112 244l144-144 144 144M256 120v292"
        />
    </svg>
);
const DownArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M112 268l144 144 144-144M256 392V100"
        />
    </svg>
);

const CloseX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" viewBox="0 0 512 512">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M368 368L144 144M368 144L144 368"
        />
    </svg>
);

interface Handled {
    readonly prelightCells?: readonly (readonly [number, number])[];
}

export interface DataGridSearchProps extends Subtract<ScrollingDataGridProps, Handled> {
    readonly getCellsForSelection?: (selection: GridSelection) => readonly (readonly GridCell[])[];
    readonly onSearchResultsChanged?: (results: readonly (readonly [number, number])[], navIndex: number) => void;
    readonly searchColOffset: number;
}

const targetSearchTimeMS = 10;

const DataGridSearch: React.FunctionComponent<DataGridSearchProps> = p => {
    const { onKeyDown, getCellsForSelection, onSearchResultsChanged, searchColOffset, ...rest } = p;
    const { canvasRef, cellYOffset, rows, columns, getCellContent } = p;

    const [searchString, setSearchString] = React.useState("");
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchStatus, setSearchStatus] = React.useState<{
        rowsSearched: number;
        results: number;
        selectedIndex: number;
    }>();

    const searchStatusRef = React.useRef(searchStatus);
    searchStatusRef.current = searchStatus;

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const searchHandle = React.useRef<number>();
    const [searchResults, setSearchResults] = React.useState<readonly (readonly [number, number])[]>([]);

    const cancelSearch = React.useCallback(() => {
        if (searchHandle.current !== undefined) {
            window.cancelAnimationFrame(searchHandle.current);
            searchHandle.current = undefined;
        }
    }, []);

    const getCellsForSelectionMangled = React.useCallback(
        (selection: GridSelection): readonly (readonly GridCell[])[] => {
            if (getCellsForSelection !== undefined) return getCellsForSelection(selection);

            if (selection.range === undefined) return [[getCellContent(selection.cell)]];

            const range = selection.range;

            const result: GridCell[][] = [];
            for (let row = range.y; row < range.y + range.height; row++) {
                const inner: GridCell[] = [];
                for (let col = range.x; col < range.x + range.width; col++) {
                    inner.push(getCellContent([col, row]));
                }

                result.push(inner);
            }

            return result;
        },
        [getCellContent, getCellsForSelection]
    );

    const beginSearch = React.useCallback(
        (str: string) => {
            const regex = new RegExp(str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i");

            let startY = cellYOffset;

            // Lets assume we can do 10 rows at a time
            // This is usually very safe and limits the damage for bad
            // performing sheets.
            let searchStride = Math.min(10, rows);

            let i = 0;

            setSearchStatus(undefined);
            setSearchResults([]);

            const runningResult: [number, number][] = [];

            const tick = () => {
                const tStart = performance.now();
                const data = getCellsForSelectionMangled({
                    cell: [0, 0],
                    range: {
                        x: 0,
                        y: startY,
                        width: columns.length - searchColOffset,
                        height: Math.min(searchStride, rows - i),
                    },
                });

                let added = false;
                data.forEach((d, row) =>
                    d.forEach((cell, col) => {
                        let testString: string | undefined;
                        switch (cell.kind) {
                            case GridCellKind.Text:
                            case GridCellKind.Number:
                            case GridCellKind.Uri:
                            case GridCellKind.Markdown:
                                testString = cell.data;
                                break;
                            case GridCellKind.Boolean:
                                testString = cell.checked.toString();
                                break;
                            case GridCellKind.Image:
                            case GridCellKind.Bubble:
                                // I know its lazy, but unless someone is actually
                                // searching for the whale emoji, this is pretty side effect
                                // free. And ya know... it's nice and easy to do...
                                testString = cell.data.join("🐳");
                                break;
                        }

                        if (testString !== undefined && regex.test(testString)) {
                            runningResult.push([col + searchColOffset, row + startY]);
                            added = true;
                        }
                    })
                );
                const tEnd = performance.now();

                if (added) {
                    setSearchResults([...runningResult]);
                }

                i += Math.min(searchStride, rows - i);

                const selectedIndex = searchStatusRef.current?.selectedIndex ?? -1;
                setSearchStatus({
                    results: runningResult.length,
                    rowsSearched: i,
                    selectedIndex,
                });
                onSearchResultsChanged?.(runningResult, selectedIndex);

                if (startY + searchStride >= rows) {
                    startY = 0;
                } else {
                    startY += searchStride;
                }

                const tElapsed = tEnd - tStart;
                const rounded = Math.max(tElapsed, 1);

                const scalar = targetSearchTimeMS / rounded;
                searchStride = Math.ceil(searchStride * scalar);

                if (i < rows) {
                    searchHandle.current = window.requestAnimationFrame(tick);
                }
            };

            cancelSearch();
            searchHandle.current = window.requestAnimationFrame(tick);
        },
        [
            cancelSearch,
            cellYOffset,
            columns.length,
            getCellsForSelectionMangled,
            onSearchResultsChanged,
            rows,
            searchColOffset,
        ]
    );

    const cancelEvent = React.useCallback((ev: React.MouseEvent) => {
        ev.stopPropagation();
    }, []);

    const onKeyDownImpl = React.useCallback(
        (event: GridKeyEventArgs) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "f") {
                if (!showSearch) {
                    setShowSearch(true);
                    setSearchString("");
                }
                setTimeout(() => inputRef.current?.focus(), 150);
                event.cancel();
            } else {
                onKeyDown?.(event);
            }
        },
        [onKeyDown, showSearch]
    );

    useEventListener(
        "keydown",
        React.useCallback(
            event => {
                if ((event.ctrlKey || event.metaKey) && event.key === "f") {
                    if (!showSearch) {
                        setShowSearch(true);
                        setSearchString("");
                    }
                    setTimeout(() => inputRef.current?.focus(), 150);
                    event.stopPropagation();
                    event.preventDefault();
                }
            },
            [showSearch]
        ),
        window,
        false,
        true
    );

    const onClose = React.useCallback(() => {
        setShowSearch(false);
        setSearchStatus(undefined);
        setSearchResults([]);
        onSearchResultsChanged?.([], -1);
        cancelSearch();
        canvasRef?.current?.focus();
    }, [cancelSearch, canvasRef, onSearchResultsChanged]);

    const onSearchChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(event.target.value);
            if (event.target.value === "") {
                setSearchStatus(undefined);
                setSearchResults([]);
                cancelSearch();
            } else {
                beginSearch(event.target.value);
            }
        },
        [beginSearch, cancelSearch]
    );

    const onNext = React.useCallback(
        (ev?: React.MouseEvent) => {
            ev?.stopPropagation?.();
            if (searchStatus === undefined) return;
            const newIndex = (searchStatus.selectedIndex + 1) % searchStatus.results;
            setSearchStatus({
                ...searchStatus,
                selectedIndex: newIndex,
            });
            onSearchResultsChanged?.(searchResults, newIndex);
        },
        [searchStatus, onSearchResultsChanged, searchResults]
    );

    const onPrev = React.useCallback(
        (ev?: React.MouseEvent) => {
            ev?.stopPropagation?.();
            if (searchStatus === undefined) return;
            let newIndex = (searchStatus.selectedIndex - 1) % searchStatus.results;
            if (newIndex < 0) newIndex += searchStatus.results;
            setSearchStatus({
                ...searchStatus,
                selectedIndex: newIndex,
            });
            onSearchResultsChanged?.(searchResults, newIndex);
        },
        [onSearchResultsChanged, searchResults, searchStatus]
    );

    const onSearchKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (((event.ctrlKey || event.metaKey) && event.key === "f") || event.key === "Escape") {
                onClose();
                event.stopPropagation();
                event.preventDefault();
            } else if (event.key === "Enter") {
                if (event.shiftKey) {
                    onPrev();
                } else {
                    onNext();
                }
            }
        },
        [onClose, onNext, onPrev]
    );

    const rowsSearchedProgress = Math.floor(((searchStatus?.rowsSearched ?? 0) / rows) * 100);
    const progressStyle: React.CSSProperties = React.useMemo(() => {
        return {
            width: `${rowsSearchedProgress}%`,
        };
    }, [rowsSearchedProgress]);

    // cancel search if the component is unmounted
    React.useEffect(() => {
        return () => {
            cancelSearch();
        };
    }, [cancelSearch]);

    let resultString: string | undefined;
    if (searchStatus !== undefined) {
        resultString = `${searchStatus.results} result${searchStatus.results !== 1 && "s"}`;
        if (searchStatus.selectedIndex >= 0) {
            resultString = `${searchStatus.selectedIndex + 1} / ${resultString}`;
        }
    }

    return (
        <>
            <ScrollingDataGrid {...rest} onKeyDown={onKeyDownImpl} prelightCells={searchResults} />
            <SearchWrapper
                showSearch={showSearch}
                onMouseDown={cancelEvent}
                onMouseMove={cancelEvent}
                onMouseUp={cancelEvent}
                onClick={cancelEvent}>
                <div className="search-bar-inner">
                    <input
                        ref={inputRef}
                        onChange={onSearchChange}
                        value={searchString}
                        onKeyDownCapture={onSearchKeyDown}
                    />
                    <button onClick={onPrev} disabled={(searchStatus?.results ?? 0) === 0}>
                        <UpArrow />
                    </button>
                    <button onClick={onNext} disabled={(searchStatus?.results ?? 0) === 0}>
                        <DownArrow />
                    </button>
                    <button onClick={onClose}>
                        <CloseX />
                    </button>
                </div>
                {searchStatus !== undefined && (
                    <>
                        <div className="search-status">
                            <div>{resultString}</div>
                        </div>
                        <div className="search-progress" style={progressStyle} />
                    </>
                )}
            </SearchWrapper>
        </>
    );
};

export default DataGridSearch;
