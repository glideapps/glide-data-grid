import { GridCellKind } from "../src";
import { decodeHTML, formatCell, formatHtmlForCopy } from "../src/data-editor/data-editor-fns";

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

    test("decode html line breaks", () => {
        const root = document.createElement("table");
        root.innerHTML = `
            <tbody>
                <tr>
                    <td>1<br>1.1</td>
                    <td>2<br/>2.1</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </tbody>
        `;

        const decoded = decodeHTML(root);

        expect(decoded).toEqual([
            ["1\n1.1", "2\n2.1"],
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
                [0],
                true
            )
        ).toEqual("");
    });

    test("format url cell", () => {
        expect(
            formatCell(
                {
                    kind: GridCellKind.Uri,
                    allowOverlay: true,
                    data: "https://www.google.com",
                },
                0,
                false,
                [0],
                true
            )
        ).toEqual("https://www.google.com");
    });

    test("formatHtmlForCopy", () => {
        expect(
            formatHtmlForCopy(
                `<tr><td><a href='https://www.google.com'>Google</a></td><td>This is  a test	tab</td></tr>`
            )
        ).toEqual(
            "<style type=\"text/css\"><!--br {mso-data-placement:same-cell;}--></style><table><tr><td><a href='https://www.google.com'>Google</a></td><td>This is<span>&nbsp;</span><span>&nbsp;</span>a test<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>tab</td></tr></table>"
        );
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
                [0],
                true
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
                [0],
                true
            )
        ).toEqual("override");
    });
});
