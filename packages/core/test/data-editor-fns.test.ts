import { GridCellKind } from "../src";
import { decodeHTML, formatCell } from "../src/data-editor/data-editor-fns";

describe("data-editor-fns", () => {
    test("decode html", () => {
        const root = document.createElement("table");
        root.innerHTML = `
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </tbody>
        `;

        const decoded = decodeHTML(root);

        expect(decoded).toEqual([
            ["1", "2"],
            ["3", "4"],
        ]);
    });

    test("format empty bubble cell", () => {
        expect(
            formatCell(
                {
                    kind: GridCellKind.Bubble,
                    allowOverlay: true,
                    data: [],
                },
                0,
                false,
                [0]
            )
        ).toEqual("");
    });

    test("format empty bubble cell with comma", () => {
        expect(
            formatCell(
                {
                    kind: GridCellKind.Bubble,
                    allowOverlay: true,
                    data: ["foo, bar", "baz"],
                },
                0,
                false,
                [0]
            )
        ).toEqual('"foo, bar",baz');
    });

    test("format respects copyData", () => {
        expect(
            formatCell(
                {
                    kind: GridCellKind.Bubble,
                    allowOverlay: true,
                    data: ["foo, bar", "baz"],
                    copyData: "override",
                },
                0,
                false,
                [0]
            )
        ).toEqual("override");
    });
});
