import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "jest-without-globals";
import { GridCellKind, isSizedGridColumn, TextCell } from "@glideapps/glide-data-grid";
import { useColumnSort } from ".";

const props = {
    columns: [
        {
            title: "A",
            width: 200,
        },
        {
            title: "B",
            width: 300,
        },
    ],
    freezeColumns: 0,
    getCellContent: ([col, row]: Item): TextCell => ({
        kind: GridCellKind.Text,
        allowOverlay: false,
        data: `${col}x${row}`,
        displayData: `${col}x${row}`,
    }),
    rows: 20,
    theme: {
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
        fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont",
        editorFontSize: "13px",
    },
};

const DataSourceMonkey = (p: typeof props) => {
    const columns = p.columns;
    const { getCellContent } = useColumnSort({
        columns: p.columns,
        getCellContent: p.getCellContent,
        rows: p.rows,
        sort: undefined,
    });

    return (
        <div>
            <ul data-testid="columns">
                {columns.map(c => (
                    <li key={c.title}>
                        Column {c.title} - {isSizedGridColumn(c) ? c.width : "dynamic"}
                    </li>
                ))}
            </ul>
            {columns.map((c, col) => (
                <div key={c.title} data-testid={`column-${col}`}>
                    {[...new Array(20).keys()].map(row => (
                        <div key={row} data-testid={`cell-${col}-${row}`}>
                            {(getCellContent([col, row]) as TextCell).data}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

describe("use-data-source", () => {
    test("Smoke test", async () => {
        render(<DataSourceMonkey {...props} />);

        const zeroZero = screen.getByTestId("cell-0-0");

        expect(zeroZero.textContent).toBe("Test fails");
    });
});
