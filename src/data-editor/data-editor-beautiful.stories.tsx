import * as React from "react";

import { StoryFn, StoryContext, useRef, useState, useCallback, useMemo } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";

import { GridCell, GridCellKind, GridColumn } from "../data-grid/data-grid-types";
import AutoSizer from "react-virtualized-auto-sizer";
import DataEditor from "./data-editor";
import DataEditorContainer from "../data-editor-container/data-grid-container";

import faker from "faker";
import styled from "styled-components";

faker.seed(1337);

export default {
    title: "DataEditor",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <AutoSizer>
                {(props: { width?: number; height?: number }) => (
                    <BuilderThemeWrapper width={props.width ?? 1000} height={props.height ?? 800} context={context}>
                        {fn()}
                    </BuilderThemeWrapper>
                )}
            </AutoSizer>
        ),
    ],
};

interface GridColumnWithMockingInfo extends GridColumn {
    getContent(): GridCell;
}

function getGridColumn(columnWithMock: GridColumnWithMockingInfo): GridColumn {
    const { getContent, ...rest } = columnWithMock;

    return rest;
}

const BeautifulStyle = styled.div`
    background-color: "#93e0ff";
    color: "white";

    > h1 {
        font-size: 50px;
        font-weight: 600;
    }

    > p {
        font-size: 18px;
    }
`;
interface BeautifulProps {
    title: string;
    description?: string;
}

const BeautifulWrapper: React.FC<BeautifulProps> = p => {
    const { title, children, description } = p;
    return (
        <BeautifulStyle>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {children}
        </BeautifulStyle>
    );
};

// export const OneMillionRows = () => {};

// export const TenMillionCells = () => {};

// // No idea if this will work
// export const TenThousandColumns = () => {};

// export const AddColumns = () => {};

// /**
//  * You can toggle smooth vs non-smooth scrolling with
//  * smoothScrollX and smoothScrollY
//  */
// export const SmoothScrollingGrid = () => {};

// export const SmallReadonlyGrid = () => {};

// export const SmallEditableGrid = () => {};

// Returns a map from column titles to a their corresponding column data
function getResizableColumns(): Record<string, GridColumnWithMockingInfo> {
    return {
        Avatar: {
            title: "Avatar",
            width: 120,
            icon: "headerImage",
            hasMenu: true,
            getContent: () => {
                return {
                    kind: GridCellKind.Image,
                    data: [faker.image.people()],
                    allowOverlay: true,
                    allowAdd: false,
                    readonly: true,
                };
            },
        },
        "First name": {
            title: "First name",
            width: 120,
            icon: "headerString",
            hasMenu: true,
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
        "Last name": {
            title: "Last name",
            width: 120,
            icon: "headerString",
            hasMenu: true,
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
        Email: {
            title: "Email",
            width: 120,
            icon: "headerString",
            hasMenu: true,
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
        Company: {
            title: "Company",
            width: 120,
            icon: "headerString",
            hasMenu: true,
            getContent: () => {
                const company = faker.company.companyName();
                return {
                    kind: GridCellKind.Text,
                    displayData: company,
                    data: company,
                    allowOverlay: true,
                    readonly: true,
                };
            },
        },
    };
}

class ContentCache {
    // column -> row -> value
    private cachedContent: Map<number, Map<number, any>> = new Map();

    get(col: number, row: number) {
        const colCache = this.cachedContent.get(col);

        if (colCache === undefined) {
            return undefined;
        }

        return colCache.get(row);
    }

    set(col: number, row: number, value: any) {
        if (this.cachedContent.get(col) === undefined) {
            this.cachedContent.set(col, new Map());
        }

        const rowCache = this.cachedContent.get(col) as Map<number, any>;
        rowCache.set(row, value);
    }
}

export const ResizableColumns: React.VFC = () => {
    const cache = useRef<ContentCache>(new ContentCache());

    const [colsMap, setColsMap] = useState(getResizableColumns);

    const onColumnResized = useCallback((column: GridColumn, newSize: number) => {
        setColsMap(prevColsMap => {
            return {
                ...prevColsMap,
                [column.title]: {
                    ...prevColsMap[column.title],
                    width: newSize,
                },
            };
        });
    }, []);

    const cols = useMemo(() => {
        return Object.values(colsMap).map(getGridColumn);
    }, [colsMap]);

    const getCellContent = useCallback(
        ([col, row]: readonly [number, number]): GridCell => {
            if (cache.current.get(col, row) === undefined) {
                cache.current.set(col, row, Object.values(colsMap)[col].getContent());
            }

            return cache.current.get(col, row);
        },
        [colsMap]
    );

    return (
        <BeautifulWrapper
            title="Resizable columns"
            description="You can resize columns by passing a `onColumnResized` prop">
            <DataEditorContainer width={1000} height={500}>
                <DataEditor
                    getCellContent={getCellContent}
                    columns={cols}
                    rows={50}
                    isDraggable={false}
                    smoothScrollX={true}
                    smoothScrollY={true}
                    allowResize={true}
                    onColumnResized={onColumnResized}
                />
            </DataEditorContainer>
        </BeautifulWrapper>
    );
};
