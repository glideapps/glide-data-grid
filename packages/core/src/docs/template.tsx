import * as React from "react";

import { type GridCell, GridCellKind, type Item } from "../internal/data-grid/data-grid-types.js";
import { DataEditorAll as DataEditor } from "../data-editor-all.js";
import { SimpleThemeWrapper } from "../stories/story-utils.js";
import { DocWrapper, Highlight, Marked, Wrapper } from "./doc-wrapper.js";

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

export const Template: React.VFC = () => {
    const basicGetCellContent = React.useCallback((cell: Item): GridCell => {
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
# Section Title

> A nice little callout block

Tell me what you're going to tell me.`}
            </Marked>
            <Highlight>
                {`
// Put the example code here
const columns: GridColumn[] = [
    { title: "First", width: 150 },
    { title: "Second", width: 150 }
];

<DataEditor {...rest} columns={columns} />
`}
            </Highlight>
            <Wrapper height={200}>
                <DataEditor getCellContent={basicGetCellContent} columns={cols} rows={50} />
            </Wrapper>
        </DocWrapper>
    );
};
(Template as any).storyName = "00. Template";
