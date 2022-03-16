import * as React from "react";

import { GridCell, GridCellKind } from "../data-grid/data-grid-types";
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

export const Template: React.VFC = () => {
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
(Template as any).parameters = {
    options: {
        showPanel: false,
    },
};
