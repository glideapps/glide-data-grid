import { styled } from "@linaria/react";
import * as React from "react";
import { DataEditor, DataEditorProps, GridCell, GridCellKind, GridColumn } from "@glideapps/glide-data-grid";
import { DropdownCell as DropdownRenderer, useExtraCells } from ".";
import type { StarCell } from "./cells/star-cell";
import type { SparklineCell } from "./cells/sparkline-cell";
import range from "lodash/range.js";
import uniq from "lodash/uniq.js";
import type { TagsCell } from "./cells/tags-cell";
import type { UserProfileCell } from "./cells/user-profile-cell";
import type { DropdownCell } from "./cells/dropdown-cell";
import type { ArticleCell } from "./cells/article-cell-types";
import type { RangeCell } from "./cells/range-cell";
import type { SpinnerCell } from "./cells/spinner-cell";
import type { TreeNode } from "./cells/tree-cell";
import { useResizeDetector } from "react-resize-detector";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@glideapps/glide-data-grid/dist/index.css";
import type { DatePickerCell } from "./cells/date-picker-cell";
import type { LinksCell } from "./cells/links-cell";
import type { ButtonCell } from "./cells/button-cell";

import { createSampleTree, useCollapsingTreeRows } from "@glideapps/glide-data-grid-source"

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
    title: "Extra Packages/Cells",

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

    const { ref, width, height } = useResizeDetector();

    return (
        <BeautifulStyle>
            <h1>{title}</h1>
            {description}
            <div className="sizer">
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
    width: "100%",
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
    const cellProps = useExtraCells();

    return (
        <BeautifulWrapper title="Custom cells" description={<Description>Some of our extension cells.</Description>}>
            <DataEditor
                {...defaultProps}
                {...cellProps}
                onPaste={true}
                // eslint-disable-next-line no-console
                onCellEdited={(...args) => console.log("Edit Cell", ...args)}
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
                        const v = rand();
                        const d: RangeCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "range-cell",
                                min: 10,
                                max: 30,
                                value: 10 + Math.round(v * 20),
                                step: 1,
                                label: `${Math.round(v * 100)}%`,
                                measureLabel: "100%",
                            },
                        };
                        return d;
                    } else if (col === 7) {
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
                    } else if (col === 8) {
                        num = row + 1;
                        rand();
                        const d: SpinnerCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "spinner-cell",
                            },
                        };
                        return d;
                    } else if (col === 9) {
                        num = row + 1;
                        rand();
                        const d: DatePickerCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "date-picker-cell",
                                date: new Date(),
                                displayDate: new Date().toISOString(),
                                format: "date",
                            },
                        };
                        return d;
                    } else if (col === 10) {
                        num = row + 1;
                        rand();
                        const d: LinksCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            data: {
                                kind: "links-cell",
                                underlineOffset: 6,
                                links: [
                                    {
                                        title: "Linky phone",
                                        onClick: () => alert("Click 1"),
                                    },
                                    {
                                        title: "Click the linky dinky",
                                        onClick: () => alert("Click 2"),
                                    },
                                ],
                            },
                        };
                        return d;
                    } else if (col === 11) {
                        num = row + 1;
                        rand();
                        const d: ButtonCell = {
                            kind: GridCellKind.Custom,
                            cursor: "pointer",
                            allowOverlay: true,
                            copyData: "4",
                            readonly: true,
                            data: {
                                kind: "button-cell",
                                backgroundColor: ["transparent", "#6572ffee"],
                                color: ["accentColor", "accentFg"],
                                borderColor: "#6572ffa0",
                                borderRadius: 9,
                                title: "View Details",
                                onClick: () => window.alert("Button clicked"),
                            },
                            themeOverride: {
                                baseFontStyle: "700 12px",
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
                        title: "Range",
                        width: 150,
                    },
                    {
                        title: "Article",
                        width: 150,
                    },
                    {
                        title: "Spinner",
                        width: 150,
                    },
                    {
                        title: "Date Picker",
                        width: 150,
                    },
                    {
                        title: "Links",
                        width: 150,
                    },
                    {
                        title: "Button",
                        width: 120,
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

export const CustomCellEditing: React.VFC = () => {
    const cellProps = useExtraCells();

    const data = React.useRef<string[]>([]);

    return (
        <BeautifulWrapper
            title="Custom cell editing"
            description={
                <Description>
                    Cells can be edited and responding to copy/paste using the copyData attribute.
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                {...cellProps}
                onPaste={true}
                onCellEdited={(cell, newVal) => {
                    if (newVal.kind !== GridCellKind.Custom) return;
                    if (DropdownRenderer.isMatch(newVal)) {
                        data.current[cell[1]] = newVal.data.value;
                    }
                }}
                getCellsForSelection={true}
                getCellContent={cell => {
                    const [, row] = cell;
                    const val = data.current[row] ?? "A";
                    return {
                        kind: GridCellKind.Custom,
                        allowOverlay: true,
                        copyData: val,
                        data: {
                            kind: "dropdown-cell",
                            allowedValues: ["A", "B", "C"],
                            value: val,
                        },
                    } as DropdownCell;
                }}
                columns={[
                    {
                        title: "Dropdown",
                        width: 200,
                    },
                ]}
                rows={500}
            />
        </BeautifulWrapper>
    );
};
(CustomCellEditing as any).parameters = {
    options: {
        showPanel: false,
    },
};

export const CustomTreeCell: React.VFC = () => {
    const [root, setRoot] = React.useState(() => createSampleTree());

    const rows = useCollapsingTreeRows(root);

    const columns = React.useMemo<GridColumn[]>(() => [
        {
            title: "Name",
            width: 250,
            themeOverride: {
                baseFontStyle: 'bold 13px'
            }
        },
        { title: "Depth", width: 55 },
        { title: "Children", width: 70 },
        { title: "Collapsed", width: 80 },
    ], []);

    const getCellContent = React.useCallback(
        ([col, row]: readonly [number, number]): GridCell => {
            const node = rows[row];
            const field = columns[col].title;

            const { name, depth, children: { length }, collapsed } = node;


            const collapsedString = node.children.length > 0 ? (collapsed ? "YES" : "NO") : "N/A";

            switch (field) {
                case "Name":
                    return {
                        kind: GridCellKind.Custom,
                        data: {
                            kind: "tree-cell",
                            node,
                        },
                        allowOverlay: false,
                        copyData: name,
                    };

                case "Depth":
                    return {
                        kind: GridCellKind.Number,
                        data: depth,
                        displayData: `${depth}`,
                        allowOverlay: false,
                    };

                case "Children":
                    return {
                        kind: GridCellKind.Number,
                        data: length,
                        displayData: `${length}`,
                        allowOverlay: false,
                    };

                case "Collapsed":
                    return {
                        kind: GridCellKind.Text,
                        displayData: collapsedString,
                        data: collapsedString,
                        allowOverlay: false,
                    };

                default:
                    return {
                        kind: GridCellKind.Text,
                        displayData: "<unknown>",
                        data: "",
                        allowOverlay: false,
                    };
            }
        },
        [columns, rows]
    );

    // const { drawCell, onCellClicked } = useCustomCells([CustomTreeCellRenderer]);

    const cellProps = useExtraCells();

    return (
        <BeautifulWrapper
            title="Expandable tree"
            description={
                <>
                    <Description>
                        An example of an expandable nested tree by implementing a custom cell renderer,
                        shifting text based on depth, and filtering out the children of collapsed items.
                    </Description>
                </>
            }>
            <DataEditor
                {...defaultProps}
                {...cellProps}
                getCellContent={getCellContent}
                onCellEdited={(_, item) => {
                    if (item.kind !== GridCellKind.Custom) return
                    if (item.data.kind !== 'tree-cell') return
                    setRoot({...root})
                }}
                columns={columns}
                rowMarkers={"none"}
                rows={rows.length}
            />
        </BeautifulWrapper>
    );
};
(CustomTreeCell as any).parameters = {
    options: {
        showPanel: false,
    },
};
