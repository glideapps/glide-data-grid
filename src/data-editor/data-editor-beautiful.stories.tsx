import * as React from "react";

import { StoryFn, StoryContext } from "@storybook/addons";
import { BuilderThemeWrapper } from "../stories/story-utils";

import {
    ColumnSelection,
    EditableGridCell,
    GridCell,
    GridCellKind,
    GridColumn,
    GridSelection,
    Rectangle,
    RowSelection,
} from "../data-grid/data-grid-types";
import AutoSizer from "react-virtualized-auto-sizer";
import DataEditor from "./data-editor";
import DataEditorContainer from "../data-editor-container/data-grid-container";

import faker from "faker";
import styled from "styled-components";

faker.seed(46213);

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

export const OneMillionRows = () => {};

export const TenMillionCells = () => {};

// No idea if this will work
export const TenThousandColumns = () => {};

export const AddColumns = () => {};

/**
 * You can toggle smooth vs non-smooth scrolling with
 * smoothScrollX and smoothScrollY
 */
export const SmoothScrollingGrid = () => {};

export const SmallReadonlyGrid = () => {};

export const SmallEditableGrid = () => {};

export const ResizableColumns = () => {};
