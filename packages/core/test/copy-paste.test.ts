/* eslint-disable sonarjs/no-duplicate-string */
import { GridCellKind, type GridCell, BooleanIndeterminate } from "../src/index.js";
import { decodeHTML, getCopyBufferContents, type CellBuffer } from "../src/data-editor/copy-paste.js";
import { expect, describe, test } from "vitest";

function makeCellBuffer(
    rawValue: string | string[],
    formatted = rawValue,
    format: CellBuffer["format"] = "string"
): CellBuffer {
    return {
        rawValue,
        formatted,
        format,
    } as CellBuffer;
}

describe("copy-paste", () => {
    test("decode html", () => {
        const html = `
            <table>
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
            </table>
        `;

        const decoded = decodeHTML(html);

        expect(decoded).toEqual([
            [makeCellBuffer("1"), makeCellBuffer("2")],
            [makeCellBuffer("3"), makeCellBuffer("4")],
        ]);
    });

    test("decode html line breaks", () => {
        const html = `
            <table>
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
            </table>
        `;

        const decoded = decodeHTML(html);

        expect(decoded).toEqual([
            [makeCellBuffer("1\n1.1"), makeCellBuffer("2\n2.1")],
            [makeCellBuffer("3"), makeCellBuffer("4")],
        ]);
    });

    test("Simple text cell", () => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Text,
                    data: "Hello",
                    allowOverlay: true,
                    displayData: "Display Hello",
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe("Display Hello");
        expect(result.textHtml).toContain('<td gdg-raw-value="Hello" gdg-format="string">Display Hello</td>');
    });

    test("Simple text cell with multiple spaces", () => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Text,
                    data: "Hello",
                    allowOverlay: true,
                    displayData: "Display  Hello",
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe("Display  Hello");
        expect(result.textHtml).toContain(
            '<td gdg-raw-value="Hello" gdg-format="string">Display<span> </span><span> </span>Hello</td>'
        );
    });

    test("Simple text cell with special chars", () => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Text,
                    data: '"Hello"',
                    allowOverlay: true,
                    displayData: 'Display "Hello"',
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe('"Display ""Hello"""');
        expect(result.textHtml).toContain(
            '<td gdg-raw-value="&quot;Hello&quot;" gdg-format="string">Display "Hello"</td>'
        );
    });

    test("Bubble cell encoding", () => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Bubble,
                    data: ["Bubble1", "Bubble2"],
                    allowOverlay: true,
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe("Bubble1,Bubble2");
        expect(result.textHtml).toContain(
            '<td gdg-format="string-array"><ol><li gdg-raw-value="Bubble1">Bubble1</li><li gdg-raw-value="Bubble2">Bubble2</li></ol></td>'
        );
    });

    test("format empty bubble cell", () => {
        expect(
            getCopyBufferContents(
                [
                    [
                        {
                            kind: GridCellKind.Bubble,
                            allowOverlay: true,
                            data: [],
                        },
                    ],
                ],
                [0]
            ).textPlain
        ).toEqual("");
    });

    test("format url cell", () => {
        expect(
            getCopyBufferContents(
                [
                    [
                        {
                            kind: GridCellKind.Uri,
                            allowOverlay: true,
                            data: "https://www.google.com",
                        },
                    ],
                ],
                [0]
            ).textPlain
        ).toEqual("https://www.google.com");
    });

    test("format url cell with display value", () => {
        expect(
            getCopyBufferContents(
                [
                    [
                        {
                            kind: GridCellKind.Uri,
                            allowOverlay: true,
                            data: "https://www.google.com",
                            displayData: "Google",
                        },
                    ],
                ],
                [0]
            ).textPlain
        ).toEqual("https://www.google.com");
    });

    test("format empty bubble cell with comma", () => {
        expect(
            getCopyBufferContents(
                [
                    [
                        {
                            kind: GridCellKind.Bubble,
                            allowOverlay: true,
                            data: ["foo, bar", "baz"],
                        },
                    ],
                ],
                [0]
            ).textPlain
        ).toEqual('"foo, bar",baz');
    });

    test("format respects copyData", () => {
        expect(
            getCopyBufferContents(
                [
                    [
                        {
                            kind: GridCellKind.Bubble,
                            allowOverlay: true,
                            data: ["foo, bar", "baz"],
                            copyData: "override",
                        },
                    ],
                ],
                [0]
            ).textPlain
        ).toEqual("override");
    });

    test("Custom cell type", () => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Custom,
                    copyData: "CustomData",
                    allowOverlay: true,
                    data: "data",
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe("CustomData");
        expect(result.textHtml).toContain('<td gdg-raw-value="CustomData" gdg-format="string">CustomData</td>');
    });

    test.each([
        [true, "TRUE"],
        [false, "FALSE"],
        [BooleanIndeterminate, "INDETERMINATE"],
        [null, ""],
    ])("Boolean cell type %p", (data, expectedFormatted) => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Boolean,
                    data,
                    allowOverlay: false,
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe(expectedFormatted);
        expect(result.textHtml).toContain(
            `<td gdg-raw-value="${data ?? ""}" gdg-format="boolean">${expectedFormatted}</td>`
        );
    });

    test("Image cell type", () => {
        const cells: GridCell[][] = [
            [
                {
                    kind: GridCellKind.Image,
                    data: ["image1.jpg", "image2.jpg"],
                    allowOverlay: true,
                    allowAdd: true,
                },
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe("image1.jpg,image2.jpg");
        expect(result.textHtml).toContain(
            '<td gdg-format="string-array"><ol><li gdg-raw-value="image1.jpg">image1.jpg</li><li gdg-raw-value="image2.jpg">image2.jpg</li></ol></td>'
        );
    });

    test.each([
        [GridCellKind.Markdown, "markdownContent", "markdownContent", "string"],
        [GridCellKind.RowID, "row123", "row123", "string"],
        [GridCellKind.Number, 1234, "1234", "number"],
        [GridCellKind.Loading, undefined, "#LOADING", "string"],
        [GridCellKind.Protected, undefined, "************", "string"],
    ])("Special cell type %p", (kind, data, expectedFormatted, format) => {
        const cells: GridCell[][] = [
            [
                {
                    kind,
                    data,
                    displayData: data?.toString(),
                    allowOverlay: true,
                } as GridCell,
            ],
        ];
        const columnIndexes = [0];

        const result = getCopyBufferContents(cells, columnIndexes);

        expect(result.textPlain).toBe(expectedFormatted);
        expect(result.textHtml).toContain(
            `<td gdg-raw-value="${data ?? ""}" gdg-format="${format}">${expectedFormatted}</td>`
        );
    });

    test("decode html with URLs", () => {
        const html = `
            <table>
            <tbody>
                <tr>
                    <td gdg-format="url"><a href="https://example.com">Example Link</a></td>
                    <td><ol><li gdg-raw-value="item1">Item1</li><li gdg-raw-value="item2">Item2</li></ol></td>
                </tr>
            </tbody>
            </table>
        `;

        const decoded = decodeHTML(html);

        expect(decoded).toEqual([
            [
                makeCellBuffer("https://example.com", "Example Link", "url"),
                makeCellBuffer(["item1", "item2"], ["Item1", "Item2"], "string-array"),
            ],
        ]);
    });
});

test("Drilldown cell conversion", () => {
    const cells: GridCell[][] = [
        [
            {
                kind: GridCellKind.Drilldown,
                data: [{ text: "Drill1" }, { text: "Drill2" }],
                allowOverlay: true,
            },
        ],
    ];
    const columnIndexes = [0];
    const result = getCopyBufferContents(cells, columnIndexes);
    expect(result.textPlain).toBe("Drill1,Drill2");
    expect(result.textHtml).toContain(
        '<td gdg-format="string-array"><ol><li gdg-raw-value="Drill1">Drill1</li><li gdg-raw-value="Drill2">Drill2</li></ol></td>'
    );
});

test("decode non-table HTML", () => {
    const html = `<div>Non-table content</div>`;
    const decoded = decodeHTML(html);
    expect(decoded).toBeUndefined();
});

test("handle cell span", () => {
    const cells: GridCell[][] = [
        [
            {
                kind: GridCellKind.Text,
                data: "Hello",
                displayData: "Display Hello",
                span: [0, 1],
                allowOverlay: true,
            },
        ],
    ];
    const columnIndexes = [1];
    const result = getCopyBufferContents(cells, columnIndexes);
    expect(result.textPlain).toBe(""); // It should be empty since span doesn't match
});

test("escape string with tab character", () => {
    const cells: GridCell[][] = [
        [
            {
                kind: GridCellKind.Text,
                data: "Hello\tWorld",
                displayData: "Hello\tWorld",
                allowOverlay: true,
            },
        ],
    ];
    const columnIndexes = [0];
    const result = getCopyBufferContents(cells, columnIndexes);
    expect(result.textPlain).toBe('"Hello\tWorld"');
});

test("decode ordered list", () => {
    const html = `
        <table>
        <tbody>
            <tr>
                <td gdg-format="string-array">
                    <ol>
                        <li gdg-raw-value="test1">Test1</li>
                        <li gdg-raw-value="test2">Test2</li>
                    </ol
                </td>
            </tr>
        </tbody>
        </table>
    `;
    const decoded = decodeHTML(html);
    expect(decoded).toEqual([
        [
            {
                rawValue: ["test1", "test2"],
                formatted: ["Test1", "Test2"],
                format: "string-array",
            },
        ],
    ]);
});

test("decode apple numbers", () => {
    const html = `
<table cellspacing="0" cellpadding="0" style="border-collapse: collapse">
<tbody>
<tr>
<td valign="top" style="width: 89.0px; height: 11.0px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 4.0px 4.0px 4.0px 4.0px">
<p style="margin: 0.0px 0.0px 0.0px 0.0px"><font face="Helvetica Neue" size="2" color="#000000" style="font: 10.0px 'Helvetica Neue'; font-variant-ligatures: common-ligatures; color: #000000">Test</font></p>
</td>
<td valign="top" style="width: 89.0px; height: 11.0px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 4.0px 4.0px 4.0px 4.0px">
<p style="margin: 0.0px 0.0px 0.0px 0.0px"><font face="Helvetica Neue" size="2" color="#000000" style="font: 10.0px 'Helvetica Neue'; font-variant-ligatures: common-ligatures; color: #000000">This</font></p>
</td>
</tr>
<tr>
<td valign="top" style="width: 89.0px; height: 23.0px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 4.0px 4.0px 4.0px 4.0px">
<p style="margin: 0.0px 0.0px 0.0px 0.0px"><font face="Helvetica Neue" size="2" color="#000000" style="font: 10.0px 'Helvetica Neue'; font-variant-ligatures: common-ligatures; color: #000000">Out</font></p>
</td>
<td valign="top" style="width: 89.0px; height: 23.0px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 4.0px 4.0px 4.0px 4.0px">
<p style="margin: 0.0px 0.0px 0.0px 0.0px"><font face="Helvetica Neue" size="2" color="#000000" style="font: 10.0px 'Helvetica Neue'; font-variant-ligatures: common-ligatures; color: #000000">With a<br>
newline and such</font></p>
</td>
</tr>
</tbody>
</table>    
    `;
    const decoded = decodeHTML(html);
    expect(decoded).toEqual([
        [makeCellBuffer("Test"), makeCellBuffer("This")],
        [makeCellBuffer("Out"), makeCellBuffer("With a\nnewline and such")],
    ]);
});

test("decode html attributes", () => {
    const html = `
        <table>
        <tbody>
            <tr>
                <td gdg-raw-value="&quot;Hello&quot;">Hello</td>
            </tr>
        </tbody>
        </table>
    `;
    const decoded = decodeHTML(html);
    expect(decoded).toEqual([
        [
            {
                rawValue: '"Hello"',
                formatted: "Hello",
                format: "string",
            },
        ],
    ]);
});
