import { styled } from "@linaria/react";
import * as React from "react";
import { DataEditor, type DataEditorProps, GridCellKind, type BubbleCell } from "@glideapps/glide-data-grid";
import { DropdownCell as DropdownRenderer, MultiSelectCell as MultiSelectRenderer, allCells } from "./index.js";
import type { StarCell } from "./cells/star-cell.js";
import type { SparklineCell } from "./cells/sparkline-cell.js";
import range from "lodash/range.js";
import uniq from "lodash/uniq.js";
import type { TagsCell } from "./cells/tags-cell.js";
import type { UserProfileCell } from "./cells/user-profile-cell.js";
import type { DropdownCell } from "./cells/dropdown-cell.js";
import type { ArticleCell } from "./cells/article-cell-types.js";
import type { RangeCell } from "./cells/range-cell.js";
import type { SpinnerCell } from "./cells/spinner-cell.js";
import { useResizeDetector } from "react-resize-detector";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@glideapps/glide-data-grid/dist/index.css";
import type { DatePickerCell } from "./cells/date-picker-cell.js";
import type { LinksCell } from "./cells/links-cell.js";
import type { ButtonCell } from "./cells/button-cell.js";
import type { TreeViewCell } from "./cells/tree-view-cell.js";
import type { MultiSelectCell } from "./cells/multi-select-cell.js";

const SimpleWrapper = styled.div`
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
        box-shadow:
            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

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
    return (
        <BeautifulWrapper title="Custom cells" description={<Description>Some of our extension cells.</Description>}>
            <DataEditor
                {...defaultProps}
                customRenderers={allCells}
                onPaste={true}
                theme={{
                    roundingRadius: 100,
                }}
                //     accentColor: "#8c96ff",
                //     accentLight: "rgba(202, 206, 255, 0.253)",

                //     textDark: "#ffffff",
                //     textMedium: "#b8b8b8",
                //     textLight: "#a0a0a0",
                //     textBubble: "#ffffff",

                //     bgIconHeader: "#b8b8b8",
                //     fgIconHeader: "#000000",
                //     textHeader: "#a1a1a1",
                //     textHeaderSelected: "#000000",

                //     bgCell: "#16161b",
                //     bgCellMedium: "#202027",
                //     bgHeader: "#212121",
                //     bgHeaderHasFocus: "#474747",
                //     bgHeaderHovered: "#404040",

                //     bgBubble: "#212121",
                //     bgBubbleSelected: "#000000",

                //     bgSearchResult: "#423c24",

                //     borderColor: "rgba(225,225,225,0.2)",
                //     drilldownBorder: "rgba(225,225,225,0.4)",

                //     linkColor: "#4F5DFF",

                //     headerFontStyle: "bold 14px",
                //     baseFontStyle: "13px",
                //     fontFamily:
                //         "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
                // }}
                // rowHeight={50}
                // eslint-disable-next-line no-console
                onCellEdited={(...args) => console.log("Edit Cell", ...args)}
                getCellsForSelection={true}
                getCellContent={cell => {
                    const [col, row] = cell;
                    if (col === 0) {
                        const t: MultiSelectCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            themeOverride: {
                                roundingRadius: 4,
                            },
                            data: {
                                // color: "#FF4B4B",
                                kind: "multi-select-cell",
                                values: ["glide", "data", "grid", "foo", "bar"],
                                allowDuplicates: true,
                                options: [
                                    // "glide",
                                    // "data",
                                    // "grid",
                                    { value: "glide", color: "#ffc38a" },
                                    { value: "data", color: "#ebfdea" },
                                    { value: "grid", color: "teal" },
                                    "foo",
                                    "bar",
                                ],
                                allowCreation: true,
                            },
                        };
                        return t;
                        // return {
                        //     kind: GridCellKind.Custom,
                        //     allowOverlay: true,
                        //     copyData: "4",
                        //     data: {
                        //         kind: "star-cell",
                        //         label: "Test",
                        //         rating: 4,
                        //     },
                        // } as StarCell;
                    } else if (col === 1) {
                        num = row + 1;
                        return {
                            kind: GridCellKind.Bubble,
                            // allowOverlay: false,
                            copyData: "4",
                            data: ["foo", "bar", "baz", "qux", "quux", "corge", "grault", "garply", "waldo", "fred"],
                        } as BubbleCell;

                        // const values = range(0, 15).map(() => rand() * 100 - 50);
                        // return {
                        //     kind: GridCellKind.Custom,
                        //     allowOverlay: false,
                        //     copyData: "4",
                        //     data: {
                        //         kind: "sparkline-cell",
                        //         values,
                        //         displayValues: values.map(x => Math.round(x).toString()),
                        //         color: row % 2 === 0 ? "#77c4c4" : "#D98466",
                        //         yAxis: [-50, 50],
                        //     },
                        // } as SparklineCell;
                    } else if (col === 2) {
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
                                graphKind: "line",
                                hideAxis: true,
                                yAxis: [-50, 50],
                            },
                        } as SparklineCell;
                    } else if (col === 3) {
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
                    } else if (col === 4) {
                        num = row + 1;
                        rand();
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "tags-cell",
                                possibleTags: possibleTags,
                                tags: uniq([
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                    possibleTags[Math.round(rand() * 1000) % possibleTags.length].tag,
                                ]),
                            },
                        } as TagsCell;
                    } else if (col === 5) {
                        num = row + 1;
                        rand();
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "user-profile-cell",
                                image: row % 2 ? undefined : "https://i.redd.it/aqc1hwhalsz71.jpg",
                                initial: "B",
                                tint: "#F1D86E",
                                name: row % 5 ? undefined : "Bee bb",
                            },
                        } as UserProfileCell;
                    } else if (col === 6) {
                        num = row + 1;
                        rand();
                        const d: DropdownCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "dropdown-cell",
                                allowedValues: [
                                    null,
                                    "Good",
                                    "Better",
                                    {
                                        value: "best",
                                        label: "Best",
                                    },
                                ],
                                value: "Good",
                            },
                        };
                        return d;
                    } else if (col === 7) {
                        num = row + 1;
                        rand();
                        const v = rand();
                        const d: RangeCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
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
                    } else if (col === 8) {
                        num = row + 1;
                        rand();
                        const d: ArticleCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "article-cell",
                                markdown: "## This is a test",
                            },
                        };
                        return d;
                    } else if (col === 9) {
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
                    } else if (col === 10) {
                        num = row + 1;
                        rand();
                        const d: DatePickerCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "date-picker-cell",
                                date: new Date(),
                                displayDate: new Date().toISOString(),
                                format: "datetime-local",
                            },
                        };
                        return d;
                    } else if (col === 11) {
                        num = row + 1;
                        rand();
                        const d: DatePickerCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "date-picker-cell",
                                date: new Date(),
                                displayDate: new Date().toISOString().split("T")[0],
                                format: "date",
                            },
                        };
                        return d;
                    } else if (col === 12) {
                        num = row + 1;
                        rand();
                        const d: DatePickerCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "date-picker-cell",
                                date: new Date(),
                                displayDate: new Date().toISOString().split("T")[1].replace("Z", ""),
                                format: "time",
                            },
                        };
                        return d;
                    } else if (col === 13) {
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
                    } else if (col === 14) {
                        num = row + 1;
                        rand();
                        const d: ButtonCell = {
                            kind: GridCellKind.Custom,
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
                    } else if (col === 15) {
                        const t: TreeViewCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: false,
                            copyData: "4",
                            data: {
                                canOpen: true,
                                depth: row % 3,
                                isOpen: row % 7 === 0,
                                kind: "tree-view-cell",
                                text: "Row " + row,
                            },
                            readonly: true,
                        };
                        return t;
                    } else if (col === 16) {
                        const t: MultiSelectCell = {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: "4",
                            readonly: row % 2 === 0,
                            data: {
                                kind: "multi-select-cell",
                                values: ["A", "B", "C"],
                                options: [
                                    { value: "A", label: "whooooop", color: "red" },
                                    { value: "B", color: "blue" },
                                    "C",
                                    "D",
                                    "E",
                                    "F",
                                    "G",
                                    "H",
                                    "I",
                                    "J",
                                ],
                                allowCreation: false,
                            },
                        };
                        return t;
                    }
                    throw new Error("Fail");
                }}
                columns={[
                    {
                        id: "stars",
                        title: "Stars",
                    },
                    {
                        title: "Sparkline (area)",
                        width: 150,
                    },
                    {
                        title: "Sparkline (line)",
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
                        id: "dropdown",
                        title: "Dropdown",
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
                        id: "datetime-picker",
                        title: "Datetime Picker",
                    },
                    {
                        id: "date-picker",
                        title: "Date Picker",
                    },
                    {
                        id: "time-picker",
                        title: "Time Picker",
                    },
                    {
                        title: "Links",
                        width: 150,
                    },
                    {
                        title: "Button",
                        width: 120,
                    },
                    {
                        title: "TreeView",
                        width: 200,
                    },
                    {
                        id: "multiselect",
                        title: "Multiselect",
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
    const data = React.useRef<any[][]>([[]]);

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
                customRenderers={allCells}
                onPaste={true}
                fillHandle={true}
                onCellEdited={(cell, newVal) => {
                    const [col, row] = cell;
                    if (newVal.kind !== GridCellKind.Custom) return;
                    if (data.current?.[col] == null) {
                        data.current[col] = [];
                    }
                    if (DropdownRenderer.isMatch(newVal) && col === 0) {
                        data.current[col][row] = newVal.data.value ?? "";
                    } else if (MultiSelectRenderer.isMatch(newVal) && col === 1) {
                        data.current[col][row] = newVal.data.values ?? [];
                    }
                    return;
                }}
                getCellsForSelection={true}
                getCellContent={cell => {
                    const [col, row] = cell;
                    if (col === 0) {
                        const val = data.current?.[col]?.[row] ?? "A";
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
                    } else if (col === 1) {
                        const val = data.current?.[col]?.[row] ?? ["glide"];
                        return {
                            kind: GridCellKind.Custom,
                            allowOverlay: true,
                            copyData: val?.join(","),
                            data: {
                                kind: "multi-select-cell",
                                values: val,
                                options: [
                                    { value: "glide", color: "#ffc38a", label: "Glide" },
                                    { value: "data", color: "#ebfdea", label: "Data" },
                                    { value: "grid", color: "teal", label: "Grid" },
                                ],
                                allowDuplicates: false,
                                allowCreation: false,
                            },
                        } as MultiSelectCell;
                    }
                    throw new Error("Fail");
                }}
                columns={[
                    {
                        title: "Dropdown",
                        width: 150,
                    },
                    {
                        title: "Multi Select",
                        width: 150,
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
