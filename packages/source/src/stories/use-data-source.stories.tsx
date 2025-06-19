import { styled } from "@linaria/react";
import * as React from "react";
import { useResizeDetector } from "react-resize-detector";
import {
    DataEditor,
    type DataEditorProps,
    type DataEditorRef,
    GridCellKind,
    type GridColumn,
    type Theme,
} from "@glideapps/glide-data-grid";
import { faker } from "@faker-js/faker";
import { useCollapsingGroups, useColumnSort, useMoveableColumns } from "../index.js";
import { useUndoRedo } from "../use-undo-redo.js";
import { useMockDataGenerator } from "./utils.js";

faker.seed(1337);

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
    title: "Extra Packages/Source",

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

export const MoreInfo = styled.p`
    font-size: 14px;
    flex-shrink: 0;
    margin: 0 0 20px 0;

    button {
        background-color: #f4f4f4;
        color: #2b2b2b;
        padding: 2px 6px;
        font-family: monospace;
        font-size: 14px;
        border-radius: 4px;
        box-shadow: 0px 1px 2px #00000040;
        margin: 0 0.1em;
        border: none;
        cursor: pointer;
    }
`;

const defaultProps: Partial<DataEditorProps> = {
    smoothScrollX: true,
    smoothScrollY: true,
    isDraggable: false,
    rowMarkers: "none",
    width: "100%",
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
    bubbleHeight: 20,
    bubblePadding: 6,
    bubbleMargin: 4,

    headerIconSize: 20,
    markerFontStyle: "13px",

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
    lineHeight: 1.4,
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};

const cols: GridColumn[] = [
    {
        title: "A",
        width: 200,
        group: "Group 1",
    },
    {
        title: "B",
        width: 200,
        group: "Group 1",
    },
    {
        title: "C",
        width: 200,
        group: "Group 2",
    },
    {
        title: "D",
        width: 200,
        group: "Group 2",
    },
    {
        title: "E",
        width: 200,
        group: "Group 2",
    },
];

export const UseDataSource: React.VFC = () => {
    const cache = React.useRef<Record<string, string>>({});

    const rows = 100_000;

    const moveArgs = useMoveableColumns({
        columns: cols,
        getCellContent: React.useCallback(([col, row]) => {
            if (col === 0) {
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: true,
                    data: `${row}`,
                    displayData: `${row}`,
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
        }, []),
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
                      direction: "desc",
                      mode: "smart",
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
        <BeautifulWrapper title="Custom source extensions" description={<Description>Fixme.</Description>}>
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

export const UndoRedo: React.VFC = () => {
    const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(6);

    const gridRef = React.useRef<DataEditorRef>(null);

    const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(
        gridRef,
        getCellContent,
        setCellValue
    );

    return (
        <BeautifulWrapper
            title="Undo / Redo Support"
            description={
                <Description>
                    A simple undo/redo implementation
                    <MoreInfo>
                        Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:
                        <button onClick={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.4 }}>
                            Undo
                        </button>
                        <button onClick={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.4 }}>
                            Redo
                        </button>
                    </MoreInfo>
                    <MoreInfo>
                        It works by taking a snapshot of the content of a cell before it is edited and replaying any
                        edits back.
                    </MoreInfo>
                </Description>
            }>
            <DataEditor
                {...defaultProps}
                ref={gridRef}
                onCellEdited={onCellEdited}
                getCellContent={getCellContent}
                gridSelection={gridSelection ?? undefined}
                onGridSelectionChange={onGridSelectionChange}
                columns={columns}
                rows={1000}
            />
        </BeautifulWrapper>
    );
};
(UndoRedo as any).parameters = {
    options: {
        showPanel: false,
    },
};
