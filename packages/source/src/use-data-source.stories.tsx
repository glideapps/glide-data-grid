import styled from "styled-components";
import * as React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {
    DataEditor,
    DataEditorContainer,
    DataEditorProps,
    GridCellKind,
    GridColumn,
    Theme,
} from "@glideapps/glide-data-grid";
import faker from "faker";
import { useCollapsingGroups, useColumnSort, useMoveableColumns } from ".";

faker.seed(1337);

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
    title: "useDataSource",

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

const testTheme: Theme = {
    accentColor: "#4F5DFF",
    accentFg: "#FFFFFF",
    accentLight: "rgba(62, 116, 253, 0.1)",

    textDark: "#313139",
    textMedium: "#737383",
    textLight: "#B2B2C0",
    textBubble: "#313139",

    bgIconHeader: "#737383",
    fgIconHeader: "#FFFFFF",
    textHeader: "#313139",
    textGroupHeader: "#313139BB",
    textHeaderSelected: "#FFFFFF",

    bgCell: "#FFFFFF",
    bgCellMedium: "#FAFAFB",
    bgHeader: "#F7F7F8",
    bgHeaderHasFocus: "#E9E9EB",
    bgHeaderHovered: "#EFEFF1",

    bgBubble: "#EDEDF3",
    bgBubbleSelected: "#FFFFFF",

    bgSearchResult: "#fff9e3",

    borderColor: "rgba(115, 116, 131, 0.16)",
    horizontalBorderColor: "rgba(115, 116, 131, 0.16)",
    drilldownBorder: "rgba(0, 0, 0, 0)",

    linkColor: "#4F5DFF",

    cellHorizontalPadding: 8,
    cellVerticalPadding: 3,

    headerFontStyle: "600 13px",
    baseFontStyle: "13px",
    editorFontSize: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

const cols: GridColumn[] = [
    {
        title: "A",
        width: 200,
    },
    {
        title: "B",
        width: 200,
    },
    {
        title: "C",
        width: 200,
    },
    {
        title: "D",
        width: 200,
    },
    {
        title: "E",
        width: 200,
    },
];

export const UseDataSource: React.VFC = () => {
    const cache = React.useRef<Record<string, string>>({});

    const rows = 100_000;

    const moveArgs = useMoveableColumns({
        columns: cols,
        getCellContent: ([col, row]) => {
            if (col === 0) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: true,
                    data: `${col} x ${row}`,
                    displayData: `${col} x ${row}`,
                };
            }

            const key = `${col},${row}`;
            if (cache.current[key] === undefined) {
                cache.current[key] = faker.name.firstName() + " " + faker.name.lastName();
            }
            const d = cache.current[key];

            return {
                kind: GridCellKind.Text,
                allowOverlay: true,
                data: d,
                displayData: d,
            };
        },
    });

    const [sort, setSort] = React.useState<number>();

    const sortArgs = useColumnSort({
        columns: moveArgs.columns,
        getCellContent: moveArgs.getCellContent,
        rows,
        sort:
            sort === undefined
                ? undefined
                : {
                      column: moveArgs.columns[sort],
                  },
    });

    const collapseArgs = useCollapsingGroups({
        columns: moveArgs.columns,
        theme: testTheme,
        freezeColumns: 0,
    });

    const onHeaderClick = React.useCallback((index: number) => {
        setSort(index);
    }, []);

    return (
        <BeautifulWrapper title="Custom cells" description={<Description>Some of our extension cells.</Description>}>
            <DataEditor
                {...defaultProps}
                {...moveArgs}
                {...sortArgs}
                {...collapseArgs}
                rows={rows}
                onColumnMoved={moveArgs.onColumnMoved}
                onHeaderClicked={onHeaderClick}
            />
        </BeautifulWrapper>
    );
};
(UseDataSource as any).parameters = {
    options: {
        showPanel: false,
    },
};
