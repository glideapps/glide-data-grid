import * as React from "react";

import {
    EditableGridCell,
    GridCell,
    GridCellKind,
    GridColumn,
    GridColumnIcon,
    isEditableGridCell,
    isTextEditableGridCell,
    Rectangle,
} from "../../data-grid/data-grid-types";
import DataEditorContainer from "../../data-editor-container/data-grid-container";

import faker from "faker";
import styled from "styled-components";
import AutoSizer from "react-virtualized-auto-sizer";
import isArray from "lodash/isArray";
import { assertNever } from "../../common/support";
import { browserIsFirefox } from "../../common/browser-detect";

faker.seed(1337);

function isTruthy(x: any): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return x ? true : false;
}

/**
 * Attempts to copy data between grid cells of any kind.
 */
export function lossyCopyData<T extends EditableGridCell>(source: EditableGridCell, target: T): EditableGridCell {
    const sourceData = source.data;
    if (typeof sourceData === typeof target.data) {
        return {
            ...target,
            data: sourceData as any,
        };
    } else if (target.kind === GridCellKind.Uri) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: sourceData[0],
            };
        }
        return {
            ...target,
            data: sourceData?.toString() ?? "",
        };
    } else if (target.kind === GridCellKind.Boolean) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: sourceData[0] !== undefined,
            };
        }
        return {
            ...target,
            data: isTruthy(sourceData) ? true : false,
        };
    } else if (target.kind === GridCellKind.Image) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: [sourceData[0]],
            };
        }
        return {
            ...target,
            data: [sourceData?.toString() ?? ""],
        };
    } else if (target.kind === GridCellKind.Number) {
        return {
            ...target,
            data: 0,
        };
    } else if (target.kind === GridCellKind.Text || target.kind === GridCellKind.Markdown) {
        if (isArray(sourceData)) {
            return {
                ...target,
                data: sourceData[0].toString() ?? "",
            };
        }

        return {
            ...target,
            data: source.data?.toString() ?? "",
        };
    } else if (target.kind === GridCellKind.Custom) {
        return target;
    }
    assertNever(target);
}

export type GridColumnWithMockingInfo = GridColumn & {
    getContent(): GridCell;
};

export function getGridColumn(columnWithMock: GridColumnWithMockingInfo): GridColumn {
    const { getContent, ...rest } = columnWithMock;

    return rest;
}

const BeautifulStyle = styled.div`
    background-color: #2790b9;
    background: linear-gradient(90deg, #2790b9, #2070a9);
    color: white;

    padding: 32px 48px;

    display: flex;
    flex-direction: column;
    height: 100vh;

    font-family: sans-serif;

    &.double {
        height: 200vh;
    }

    & > h1 {
        font-size: 50px;
        font-weight: 600;
        flex-shrink: 0;
        margin: 0 0 12px 0;
    }

    .sizer {
        flex-grow: 1;

        background-color: white;

        border-radius: 12px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

        .sizer-clip {
            border-radius: 12px;
            overflow: hidden;
            transform: translateZ(0);

            height: 100%;
        }
    }

    &.firefox .sizer {
        border-radius: 0;
        box-shadow: unset;

        .sizer-clip {
            border-radius: 0;
        }
    }
`;

export const PropName = styled.span`
    font-family: monospace;
    font-weight: 500;
    color: #ffe394;
`;

export const Description = styled.p`
    font-size: 18px;
    flex-shrink: 0;
    margin: 0 0 20px 0;
`;

export const MoreInfo = styled.p`
    font-size: 14px;
    flex-shrink: 0;
    margin: 0 0 20px 0;

    button {
        background-color: #f4f4f4;
        color: #2b2b2b;
        padding: 2px 6px;
        font-family: monospace;
        font-size: 14px;
        border-radius: 4px;
        box-shadow: 0px 1px 2px #00000040;
        margin: 0 0.1em;
        border: none;
        cursor: pointer;
    }
`;

interface BeautifulProps {
    title: string;
    description?: React.ReactNode;
    className?: string;
}

export const BeautifulWrapper: React.FC<BeautifulProps> = p => {
    const { title, children, description, className } = p;
    return (
        <BeautifulStyle className={className + (browserIsFirefox ? " firefox" : "")}>
            <h1>{title}</h1>
            {description}
            <div className="sizer">
                <div className="sizer-clip">
                    <AutoSizer>
                        {(props: { width?: number; height?: number }) => (
                            <DataEditorContainer width={props.width ?? 100} height={props.height ?? 100}>
                                {children}
                            </DataEditorContainer>
                        )}
                    </AutoSizer>
                </div>
            </div>
        </BeautifulStyle>
    );
};

function createTextColumnInfo(index: number, group: boolean): GridColumnWithMockingInfo {
    return {
        title: `Column ${index}`,
        id: `Column ${index}`,
        group: group ? `Group ${Math.round(index / 3)}` : undefined,
        icon: GridColumnIcon.HeaderString,
        hasMenu: false,
        getContent: () => {
            const text = faker.lorem.word();

            return {
                kind: GridCellKind.Text,
                data: text,
                displayData: text,
                allowOverlay: true,
                readonly: true,
            };
        },
    };
}

function getResizableColumns(amount: number, group: boolean): GridColumnWithMockingInfo[] {
    const defaultColumns: GridColumnWithMockingInfo[] = [
        {
            title: "First name",
            id: "First name",
            group: group ? "Name" : undefined,
            icon: GridColumnIcon.HeaderString,
            hasMenu: false,
            getContent: () => {
                const firstName = faker.name.firstName();
                return {
                    kind: GridCellKind.Text,
                    displayData: firstName,
                    data: firstName,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "Last name",
            id: "Last name",
            group: group ? "Name" : undefined,
            icon: GridColumnIcon.HeaderString,
            hasMenu: false,
            getContent: () => {
                const lastName = faker.name.lastName();
                return {
                    kind: GridCellKind.Text,
                    displayData: lastName,
                    data: lastName,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "Avatar",
            id: "Avatar",
            group: group ? "Info" : undefined,
            icon: GridColumnIcon.HeaderImage,
            hasMenu: false,
            getContent: () => {
                const n = Math.round(Math.random() * 100);
                return {
                    kind: GridCellKind.Image,
                    data: [`https://picsum.photos/id/${n}/900/900`],
                    displayData: [`https://picsum.photos/id/${n}/40/40`],
                    allowOverlay: true,
                    allowAdd: false,
                    readonly: true,
                };
            },
        },
        {
            title: "Email",
            id: "Email",
            group: group ? "Info" : undefined,
            icon: GridColumnIcon.HeaderString,
            hasMenu: false,
            getContent: () => {
                const email = faker.internet.email();
                return {
                    kind: GridCellKind.Text,
                    displayData: email,
                    data: email,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "Title",
            id: "Title",
            group: group ? "Info" : undefined,
            icon: GridColumnIcon.HeaderString,
            hasMenu: false,
            getContent: () => {
                const company = faker.name.jobTitle();
                return {
                    kind: GridCellKind.Text,
                    displayData: company,
                    data: company,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
        {
            title: "More Info",
            id: "More Info",
            group: group ? "Info" : undefined,
            icon: GridColumnIcon.HeaderUri,
            hasMenu: false,
            getContent: () => {
                const url = faker.internet.url();
                return {
                    kind: GridCellKind.Uri,
                    displayData: url,
                    data: url,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
    ];

    if (amount < defaultColumns.length) {
        return defaultColumns.slice(0, amount);
    }

    const extraColumnsAmount = amount - defaultColumns.length;

    const extraColumns = [...new Array(extraColumnsAmount)].map((_, index) =>
        createTextColumnInfo(index + defaultColumns.length, group)
    );

    return [...defaultColumns, ...extraColumns];
}

export class ContentCache {
    // column -> row -> value
    private cachedContent: Map<number, Map<number, GridCell>> = new Map();

    get(col: number, row: number) {
        const colCache = this.cachedContent.get(col);

        if (colCache === undefined) {
            return undefined;
        }

        return colCache.get(row);
    }

    set(col: number, row: number, value: GridCell) {
        if (this.cachedContent.get(col) === undefined) {
            this.cachedContent.set(col, new Map());
        }

        const rowCache = this.cachedContent.get(col) as Map<number, GridCell>;
        rowCache.set(row, value);
    }
}

export function useMockDataGenerator(numCols: number, readonly: boolean = true, group: boolean = false) {
    const cache = React.useRef<ContentCache>(new ContentCache());

    const [colsMap, setColsMap] = React.useState(() => getResizableColumns(numCols, group));

    React.useEffect(() => {
        setColsMap(getResizableColumns(numCols, group));
    }, [group, numCols]);

    const onColumnResized = React.useCallback((column: GridColumn, newSize: number) => {
        setColsMap(prevColsMap => {
            const index = prevColsMap.findIndex(ci => ci.title === column.title);
            const newArray = [...prevColsMap];
            newArray.splice(index, 1, {
                ...prevColsMap[index],
                width: newSize,
            });
            return newArray;
        });
    }, []);

    const cols = React.useMemo(() => {
        return colsMap.map(getGridColumn);
    }, [colsMap]);

    const getCellContent = React.useCallback(
        ([col, row]: readonly [number, number]): GridCell => {
            let val = cache.current.get(col, row);
            if (val === undefined) {
                val = colsMap[col].getContent();
                if (!readonly) {
                    if (isTextEditableGridCell(val)) {
                        val = { ...val, readonly };
                    }
                }
                cache.current.set(col, row, val);
            }
            return val;
        },
        [colsMap, readonly]
    );

    const getCellsForSelection = React.useCallback(
        (selection: Rectangle): readonly (readonly GridCell[])[] => {
            const result: GridCell[][] = [];

            for (let y = selection.y; y < selection.y + selection.height; y++) {
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.x + selection.width; x++) {
                    row.push(getCellContent([x, y]));
                }
                result.push(row);
            }

            return result;
        },
        [getCellContent]
    );

    const setCellValueRaw = React.useCallback(([col, row]: readonly [number, number], val: GridCell): void => {
        cache.current.set(col, row, val);
    }, []);

    const setCellValue = React.useCallback(
        ([col, row]: readonly [number, number], val: GridCell): void => {
            let current = cache.current.get(col, row);
            if (current === undefined) {
                current = colsMap[col].getContent();
            }
            if (isEditableGridCell(val) && isEditableGridCell(current)) {
                const copied = lossyCopyData(val, current);
                cache.current.set(col, row, {
                    ...copied,
                    displayData: typeof copied.data === "string" ? copied.data : (copied as any).displayData,
                    lastUpdated: performance.now(),
                } as any);
            }
        },
        [colsMap]
    );

    return { cols, getCellContent, onColumnResized, setCellValue, getCellsForSelection, setCellValueRaw };
}
