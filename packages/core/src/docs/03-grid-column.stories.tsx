import * as React from "react";

import { GridCell, GridCellKind, GridColumnIcon } from "../data-grid/data-grid-types";
import { DataEditor } from "../data-editor/data-editor";

import { SimpleThemeWrapper } from "../stories/story-utils";
import { DocWrapper, Highlight, Marked, Wrapper } from "./doc-wrapper";

export default {
    title: "Glide-Data-Grid/Docs",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

export const GridColumns: React.VFC = () => {
    const basicGetCellContent = React.useCallback((cell: readonly [number, number]): GridCell => {
        return {
            kind: GridCellKind.Text,
            allowOverlay: false,
            displayData: cell.toString(),
            data: cell.toString(),
        };
    }, []);

    const cols = React.useMemo(() => {
        return [
            {
                title: "First",
                width: 150,
            },
            {
                title: "Second",
                width: 150,
            },
        ];
    }, []);

    return (
        <DocWrapper>
            <Marked>
                {`
# Basic usage

> The \`GridColumn[]\` passed to the \`DataEditor\` in the \`columns\` property should be memoized to avoid excessive re-rendering. These samples may not do this for the sake of brevity.

There are only two mandatory properties for each \`GridColumn\`: \`title\` and \`id\`. The id should be a stable id and not the index of the column. Additionally a \`width\` property can be provided which represents the width of the column in pixels. If a width is provided the id may be omited. This may change in a future version.`}
            </Marked>
            <Highlight>
                {`
const columns: GridColumn[] = [
    { title: "First", id: "first", width: 150 },
    { title: "Second", id: "second", width: 150 }
];

<DataEditor {...rest} columns={columns} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={basicGetCellContent} columns={cols} rows={50} />
            </Wrapper>

            <Marked>
                {`
# Header icons

Default header icons are available. They can also be reaplced by passing a new map to the \`headerIcons\` property.`}
            </Marked>
            <Highlight>
                {`
const columns: GridColumn[] = [
    { title: "Name", id: "name", width: 250, icon: GridColumnIcon.HeaderString, 
      overlayIcon: GridColumnIcon.RowOwnerOverlay 
    },
    { title: "Age", id: "age", width: 100, icon: GridColumnIcon.HeaderNumber },
    { title: "Avatar", id: "avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    getCellContent={basicGetCellContent}
                    columns={[
                        {
                            title: "Name",
                            width: 250,
                            icon: GridColumnIcon.HeaderString,
                            overlayIcon: GridColumnIcon.RowOwnerOverlay,
                        },
                        { title: "Age", width: 120, icon: GridColumnIcon.HeaderNumber },
                        { title: "Avatar", width: 100, icon: GridColumnIcon.HeaderImage },
                    ]}
                    rows={50}
                />
            </Wrapper>

            <Marked>
                {`
# Header theming

Headers can be provided with individual theme overrides which themes both the header and its column cells.`}
            </Marked>
            <Highlight>
                {`
const columns: GridColumn[] = [
    { title: "Name", id="name", width: 250, icon: GridColumnIcon.HeaderString },
    { title: "Age", id="age", width: 100, icon: GridColumnIcon.HeaderNumber, themeOverride: {
        bgIconHeader: "#00967d",
        textDark: "#00c5a4",
        textHeader: "#00c5a4",
    } },
    { title: "Avatar", id="avatar", width: 80, icon: GridColumnIcon.HeaderImage },
];

<DataEditor {...rest} columns={columns} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor
                    getCellContent={basicGetCellContent}
                    columns={[
                        { title: "Name", width: 250, icon: GridColumnIcon.HeaderString },
                        {
                            title: "Age",
                            width: 100,
                            icon: GridColumnIcon.HeaderNumber,
                            themeOverride: {
                                bgIconHeader: "#00967d",
                                textDark: "#00c5a4",
                                textHeader: "#00c5a4",
                            },
                        },
                        { title: "Avatar", width: 80, icon: GridColumnIcon.HeaderImage },
                    ]}
                    rows={50}
                />
            </Wrapper>
        </DocWrapper>
    );
};
(GridColumns as any).storyName = "03. Grid Columns";
(GridColumns as any).parameters = {
    options: {
        showPanel: false,
    },
};
