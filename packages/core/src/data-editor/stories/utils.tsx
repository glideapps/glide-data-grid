/* eslint-disable sonarjs/no-identical-functions */
import * as React from "react";

import {
    EditableGridCell,
    GridCell,
    GridCellKind,
    GridColumn,
    GridColumnIcon,
    isEditableGridCell,
    isTextEditableGridCell,
    Item,
} from "../../data-grid/data-grid-types";

import { faker } from "@faker-js/faker";
import { styled } from "@linaria/react";
import isArray from "lodash/isArray.js";
import { assertNever } from "../../common/support";
import { browserIsFirefox } from "../../common/browser-detect";
import { useResizeDetector } from "react-resize-detector";
import type { DataEditorProps } from "../data-editor";
import noop from "lodash/noop.js";

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
    } else
        switch (target.kind) {
            case GridCellKind.Uri: {
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
            }
            case GridCellKind.Boolean: {
                if (isArray(sourceData)) {
                    return {
                        ...target,
                        data: sourceData[0] !== undefined,
                    };
                } else if (source.kind === GridCellKind.Boolean) {
                    return {
                        ...target,
                        data: source.data,
                    };
                }
                return {
                    ...target,
                    data: isTruthy(sourceData) ? true : false,
                };
            }
            case GridCellKind.Image: {
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
            }
            case GridCellKind.Number: {
                return {
                    ...target,
                    data: 0,
                };
            }
            case GridCellKind.Text:
            case GridCellKind.Markdown: {
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
            }
            case GridCellKind.Custom: {
                return target;
            }
            // No default
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

export const ColumnAddButton = styled.div`
    width: 120px;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    height: 100%;
    button {
        border: none;
        outline: none;
        height: 37px;
        width: 120px;
        font-size: 20px;
        background-color: #f7f7f8;
        color: #000000dd;
        border-bottom: 1px solid #e1e2e5;

        transition: background-color 200ms;

        cursor: pointer;
        :hover {
            background-color: #efeff1;
        }
    }
`;

export const BeautifulStyle = styled.div`
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

    .white {
        background-color: white;
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
    scale?: string;
}

export const BeautifulWrapper: React.FC<BeautifulProps> = p => {
    const { title, children, description, className, scale } = p;

    const { ref, width, height } = useResizeDetector();

    return (
        <BeautifulStyle className={className + (browserIsFirefox.value ? " firefox" : "")}>
            <h1>{title}</h1>
            {description}
            <div style={{ scale }} className="sizer">
                <div className="sizer-clip" ref={ref}>
                    <div
                        style={{
                            position: "relative",
                            width: width ?? 100,
                            height: height ?? 100,
                        }}>
                        {children}
                    </div>
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

    // eslint-disable-next-line unicorn/no-new-array
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

    const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
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

    const colsMapRef = React.useRef(colsMap);
    colsMapRef.current = colsMap;
    const getCellContent = React.useCallback(
        ([col, row]: Item): GridCell => {
            let val = cache.current.get(col, row);
            if (val === undefined) {
                val = colsMapRef.current[col].getContent();
                if (!readonly && isTextEditableGridCell(val)) {
                    val = { ...val, readonly };
                }
                cache.current.set(col, row, val);
            }
            return val;
        },
        [readonly]
    );

    const setCellValueRaw = React.useCallback(([col, row]: Item, val: GridCell): void => {
        cache.current.set(col, row, val);
    }, []);

    const setCellValue = React.useCallback(
        ([col, row]: Item, val: GridCell): void => {
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

    return { cols, getCellContent, onColumnResize, setCellValue, setCellValueRaw };
}

export const KeyName = styled.kbd`
    background-color: #f4f4f4;
    color: #2b2b2b;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px #00000040;
    margin: 0 0.1em;
`;

export const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    getCellsForSelection: true,
    width: "100%",
};

export function clearCell(cell: GridCell): GridCell {
    switch (cell.kind) {
        case GridCellKind.Boolean: {
            return {
                ...cell,
                data: false,
            };
        }
        case GridCellKind.Image: {
            return {
                ...cell,
                data: [],
                displayData: [],
            };
        }
        case GridCellKind.Drilldown:
        case GridCellKind.Bubble: {
            return {
                ...cell,
                data: [],
            };
        }
        case GridCellKind.Uri:
        case GridCellKind.Markdown: {
            return {
                ...cell,
                data: "",
            };
        }
        case GridCellKind.Text: {
            return {
                ...cell,
                data: "",
                displayData: "",
            };
        }
        case GridCellKind.Number: {
            return {
                ...cell,
                data: 0,
                displayData: "",
            };
        }
    }
    return cell;
}

function getColumnsForCellTypes(): GridColumnWithMockingInfo[] {
    return [
        {
            title: "Row ID",
            width: 120,
            icon: GridColumnIcon.HeaderRowID,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.RowID,
                    data: faker.datatype.uuid(),
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Protected",
            width: 120,
            icon: GridColumnIcon.HeaderCode,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Protected,
                    data: faker.finance.bitcoinAddress(),
                    allowOverlay: false,
                };
            },
        },
        {
            title: "Loading",
            width: 120,
            icon: GridColumnIcon.HeaderString,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Loading,
                    allowOverlay: false,
                };
            },
        },
        {
            title: "Text",
            width: 120,
            icon: GridColumnIcon.HeaderCode,
            hasMenu: false,
            getContent: () => {
                const name = faker.name.firstName();
                return {
                    kind: GridCellKind.Text,
                    data: name,
                    displayData: name,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Number",
            width: 120,
            icon: GridColumnIcon.HeaderNumber,
            hasMenu: false,
            getContent: () => {
                const age = faker.datatype.number(100);
                return {
                    kind: GridCellKind.Number,
                    data: age,
                    displayData: `${age}`,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Boolean",
            width: 120,
            icon: GridColumnIcon.HeaderBoolean,
            hasMenu: false,
            getContent: () => {
                const roll = Math.random();
                const checked = roll < 0.1 ? undefined : roll < 0.2 ? null : roll < 0.6;
                // TODO: Make editable. UX looks bad by default.
                return {
                    kind: GridCellKind.Boolean,
                    data: checked,
                    allowOverlay: false,
                    readonly: false,
                };
            },
        },
        {
            title: "Image",
            width: 120,
            icon: GridColumnIcon.HeaderImage,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Image,
                    data: [`${faker.image.animals(40, 40)}?random=${faker.datatype.number(100_000)}`],
                    allowOverlay: true,
                    allowAdd: false,
                    readonly: true,
                };
            },
        },
        {
            title: "Uri",
            width: 120,
            icon: GridColumnIcon.HeaderUri,
            hasMenu: false,
            getContent: () => {
                const url = faker.internet.url();
                return {
                    kind: GridCellKind.Uri,
                    data: url,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Markdown",
            width: 120,
            icon: GridColumnIcon.HeaderMarkdown,
            hasMenu: false,
            getContent: () => {
                const markdown = `# Title
Hello my name is *${faker.name.firstName()}*

## TODO:
Try out [Glide](https://www.glideapps.com/)
`;
                return {
                    kind: GridCellKind.Markdown,
                    data: markdown,
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Bubble",
            width: 120,
            icon: GridColumnIcon.HeaderArray,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Bubble,
                    data: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                    allowOverlay: true,
                };
            },
        },
        {
            title: "Drilldown",
            width: 120,
            icon: GridColumnIcon.HeaderArray,
            hasMenu: false,
            getContent: () => {
                return {
                    kind: GridCellKind.Drilldown,
                    data: [
                        {
                            text: faker.address.cityName(),
                            img: `${faker.image.nature(40, 40)}?random=${faker.datatype.number(100_000)}`,
                        },
                        {
                            text: faker.address.cityName(),
                            img: `${faker.image.nature(40, 40)}?random=${faker.datatype.number(100_000)}`,
                        },
                    ],
                    allowOverlay: true,
                };
            },
        },
    ];
}

export function useAllMockedKinds() {
    const cache = React.useRef<ContentCache>(new ContentCache());

    const [colsMap, setColsMap] = React.useState(getColumnsForCellTypes);

    const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
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

    const [updateVersion, setUpdateVersion] = React.useState(0);
    const getCellContent = React.useCallback(
        ([col, row]: Item): GridCell => {
            // Terrible hack to force update when setCellValue requests it
            noop(updateVersion);
            let val = cache.current.get(col, row);
            if (val === undefined) {
                val = colsMap[col].getContent();
                cache.current.set(col, row, val);
            }

            return val;
        },
        [colsMap, updateVersion]
    );

    const setCellValue = React.useCallback(
        ([col, row]: Item, val: GridCell, noDisplay?: boolean, forceUpdate?: boolean): void => {
            let current = cache.current.get(col, row);
            if (current === undefined) {
                current = colsMap[col].getContent();
            }
            if (isEditableGridCell(val) && isEditableGridCell(current)) {
                const copied = lossyCopyData(val, current);
                cache.current.set(col, row, {
                    ...copied,
                    displayData: noDisplay === true ? undefined : copied.data?.toString() ?? "",
                } as any);

                if (forceUpdate === true) {
                    setUpdateVersion(v => v + 1);
                }
            }
        },
        [colsMap]
    );

    return { cols, getCellContent, onColumnResize, setCellValue };
}
