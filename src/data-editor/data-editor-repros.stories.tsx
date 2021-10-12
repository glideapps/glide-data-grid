import * as React from "react";

import { StoryFn, StoryContext } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";

import { GridCell, GridCellKind } from "../data-grid/data-grid-types";
import AutoSizer from "react-virtualized-auto-sizer";
import DataEditor from "./data-editor";
import DataEditorContainer from "../data-editor-container/data-grid-container";
import styled from "styled-components";

export default {
    title: "DataEditor/TestCases/Bugs",

    decorators: [
        (fn: StoryFn<React.ReactElement | null>, context: StoryContext) => (
            <AutoSizer>
                {(props: { width?: number; height?: number }) => (
                    <BuilderThemeWrapper width={props.width ?? 1000} height={props.height ?? 800} context={context}>
                        <DataEditorContainer width={props.width ?? 1000} height={props.height ?? 800}>
                            {fn()}
                        </DataEditorContainer>
                    </BuilderThemeWrapper>
                )}
            </AutoSizer>
        ),
    ],
};

const bug70Gen = ([, row]: readonly [number, number]): GridCell => ({
    allowOverlay: true,
    kind: GridCellKind.Number,
    data: row,
    displayData: row.toString(),
});

const ignore = () => undefined;

const Bug70Style = styled.div`
    display: flex;
    flex-direction: column;

    > a {
        margin-bottom: 20px;
    }
`;

export function Bug70() {
    const cols = [
        { title: "Col1", width: 100 },
        { title: "Col2", width: 100 },
    ];

    return (
        <Bug70Style className="App">
            <p>To cause error: scroll down at least one row, edit a cell in Col2, and hit Tab</p>
            <a href="https://github.com/glideapps/glide-data-grid/issues/70" target="_blank" rel="noreferrer">
                Original report
            </a>
            <DataEditorContainer width={500} height={500}>
                <DataEditor
                    rows={100}
                    rowMarkers={false}
                    columns={cols}
                    getCellContent={bug70Gen}
                    onCellEdited={ignore}
                />
            </DataEditorContainer>
        </Bug70Style>
    );
}
