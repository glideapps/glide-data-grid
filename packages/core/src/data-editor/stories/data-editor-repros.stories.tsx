import * as React from "react";

import { useState, useMemo } from "@storybook/addons";
import { BuilderThemeWrapper } from "../../stories/story-utils";

import { type GridCell, GridCellKind, type Item } from "../../data-grid/data-grid-types";
import { DataEditor } from "../data-editor";
import { styled } from "@linaria/react";

export default {
    title: "Tests/TestCases/Bugs",

    decorators: [
        (Story: React.ComponentType) => (
            <BuilderThemeWrapper width={1000} height={800}>
                <Story />
            </BuilderThemeWrapper>
        ),
    ],
};

const bug70Gen = ([, row]: Item): GridCell => ({
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
            <DataEditor
                width={500}
                height={500}
                rows={100}
                columns={cols}
                getCellContent={bug70Gen}
                onCellEdited={ignore}
            />
        </Bug70Style>
    );
}

const filterColumnsGen = ([col, row]: Item): GridCell => ({
    allowOverlay: true,
    kind: GridCellKind.Text,
    data: `${col} - ${row}`,
    displayData: `${col} - ${row}`,
});

const filteringColumns = [
    { title: "Col AAAA", width: 120 },
    { title: "Col AAA", width: 120 },
    { title: "Col AA", width: 120 },
    { title: "Col A", width: 120 },
    { title: "Col", width: 120 },
];

export function FilterColumns() {
    const [searchText, setSearchText] = useState("");

    const cols = useMemo(() => {
        if (searchText === "") {
            return filteringColumns;
        }

        return filteringColumns.filter(c => c.title.toLowerCase().includes(searchText.toLowerCase()));
    }, [searchText]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <div>
            <input value={searchText} onChange={onInputChange} />
            <DataEditor
                width={1000}
                height={500}
                rows={100}
                columns={cols}
                getCellContent={filterColumnsGen}
                smoothScrollX={true}
                smoothScrollY={true}
            />
        </div>
    );
}
