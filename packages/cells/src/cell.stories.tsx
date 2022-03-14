import styled from "styled-components";
import * as React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { DataEditor, DataEditorContainer, DataEditorProps, GridCellKind } from "@glideapps/glide-data-grid";
import { useExtraCells } from ".";
import { StarCell } from "./cells/star-cell";
import { SparklineCell } from "./cells/sparkline-cell";
import range from "lodash/range";
import uniq from "lodash/uniq";
import { TagsCell } from "./cells/tags-cell";
import { UserProfileCell } from "./cells/user-profile-cell";
import { DropdownCell } from "./cells/dropdown-cell";
import { ArticleCell } from "./cells/article-cell-types";

const SimpleWrapper = styled.div`
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    box-sizing: border-box;

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
`;

const SimpleThemeWrapper: React.FC = p => {
    return (
        <SimpleWrapper>
            <div className="content">{p.children}</div>
        </SimpleWrapper>
    );
};

export default {
    title: "Extra Cells",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

const BeautifulStyle = styled.div`
    background-color: #2790b9;
    background: linear-gradient(90deg, #2790b9, #2070a9);
    color: white;

    padding: 32px 48px;

    display: flex;
    flex-direction: column;
    height: 100vh;

    font-family: sans-serif;

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
`;

interface BeautifulProps {
    title: string;
    description?: React.ReactNode;
}

const BeautifulWrapper: React.FC<BeautifulProps> = p => {
    const { title, children, description } = p;
    return (
        <BeautifulStyle>
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

const Description = styled.p`
    font-size: 18px;
    flex-shrink: 0;
    margin: 0 0 20px 0;
`;

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    rowMarkers: "none",
};

let num: number = 1;
function rand(): number {
    return (num = (num * 16807) % 2147483647) / 2147483647;
}

const possibleTags = [
    {
        tag: "Bug",
        color: "#ff4d4d35",
    },
    {
        tag: "Feature",
        color: "#35f8ff35",
    },
    {
        tag: "Enhancement",
        color: "#48ff5735",
    },
    {
        tag: "First Issue",
        color: "#436fff35",
    },
    {
        tag: "PR",
        color: "#e0ff3235",
    },
    {
        tag: "Assigned",
        color: "#ff1eec35",
    },
];

export const CustomCells: React.VFC = () => {
    const { drawCell, provideEditor } = useExtraCells();

    return (
        <BeautifulWrapper title="Custom cells" description={<Description>Some of our extension cells.</Description>}>
            <DataEditor
                {...defaultProps}
                drawCell={drawCell}
                provideEditor={provideEditor}
                getCellContent={cell => {
                    const [col, row] = cell;
                    if (col === 0) {
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "star-cell",
                                label: "Test",
                                rating: 4,
                            },
                        } as StarCell;
                    } else if (col === 1) {
                        num = row + 1;
                        const values = range(0, 15).map(() => rand() * 100 - 50);
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: false,
                            copyData: "4",
                            data: {
                                kind: "sparkline-cell",
                                values,
                                displayValues: values.map(x => Math.round(x).toString()),
                                color: row % 2 === 0 ? "#77c4c4" : "#D98466",
                                yAxis: [-50, 50],
                            },
                        } as SparklineCell;
                    } else if (col === 2) {
                        num = row + 1;
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: false,
                            copyData: "4",
                            data: {
                                kind: "sparkline-cell",
                                values: range(0, 15).map(() => rand() * 100 - 50),
                                color: row % 2 === 0 ? "#77c4c4" : "#D98466",
                                graphKind: "bar",
                                yAxis: [-50, 50],
                            },
                        } as SparklineCell;
                    } else if (col === 3) {
                        num = row + 1;
                        rand();
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "tags-cell",
                                possibleTags: possibleTags,
                                readonly: row % 2 === 0,
                                tags: uniq([
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                ]),
                            },
                        } as TagsCell;
                    } else if (col === 4) {
                        num = row + 1;
                        rand();
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "user-profile-cell",
                                image: row % 2 ? undefined : "https://i.redd.it/aqc1hwhalsz71.jpg",
                                initial: "B",
                                tint: "#F1D86E",
                                name: row % 5 ? undefined : "Bee bb",
                            },
                        } as UserProfileCell;
                    } else if (col === 5) {
                        num = row + 1;
                        rand();
                        const d: DropdownCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "dropdown-cell",
                                allowedValues: ["Good", "Better", "Best"],
                                value: "Good",
                            },
                        };
                        return d;
                    } else if (col === 6) {
                        num = row + 1;
                        rand();
                        const d: ArticleCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "article-cell",
                                markdown: "## This is a test",
                            },
                        };
                        return d;
                    }
                    throw new Error("Fail");
                }}
                columns={[
                    {
                        title: "Stars",
                        width: 200,
                    },
                    {
                        title: "Sparkline",
                        width: 150,
                    },
                    {
                        title: "Sparkline (bars)",
                        width: 150,
                    },
                    {
                        title: "Tags",
                        width: 250,
                    },
                    {
                        title: "Profile",
                        width: 150,
                    },
                    {
                        title: "Dropdown",
                        width: 150,
                    },
                    {
                        title: "Article",
                        width: 150,
                    },
                ]}
                rows={500}
            />
        </BeautifulWrapper>
    );
};
(CustomCells as any).parameters = {
    options: {
        showPanel: false,
    },
};
