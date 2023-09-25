import { copyToClipboard, decodeHTML } from "../src/data-editor/data-editor-fns";
import { GridCell, GridCellKind } from "../src";
import mocked = jest.mocked;

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

    describe("copy to clipboard", () => {
        const getCellRenderer = jest.fn().mockName("getCellRenderer");
        afterEach(() => {
            jest.resetAllMocks();
        });
        test("call the onCopy if the function is defined in the cell renderer", () => {
            const onCopyCallbackSpy = jest
                .fn()
                .mockName("onCopy")
                .mockImplementation((tableCell, cell) => {
                    const a = document.createElement("a");
                    a.innerText = cell.copyData;
                    a.setAttribute("href", "https://example.com");
                    tableCell.append(a);
                });
            const cells: GridCell[][] = [
                [{ copyData: "foo", kind: GridCellKind.Custom, allowOverlay: false, data: {} }],
            ];
            getCellRenderer.mockReturnValue({
                onCopy: onCopyCallbackSpy,
            });
            copyToClipboard(cells, [0], getCellRenderer);
            expect(onCopyCallbackSpy).toHaveBeenCalledWith(expect.any(HTMLTableCellElement), cells[0][0]);
            expect(window.Blob).toHaveBeenCalledTimes(2);
            const htmlStr = mocked(window.Blob).mock.calls[1][0]?.[0];
            expect(htmlStr).toMatchInlineSnapshot(
                `"<table><tbody><tr><td><a href=\\"https://example.com\\">foo</a></td></tr></tbody></table>"`
            );
        });
        test("copy the formatted string value if onCopy is not defined", () => {
            const cells: GridCell[][] = [
                [{ copyData: "foo", kind: GridCellKind.Custom, allowOverlay: false, data: {} }],
            ];
            getCellRenderer.mockReturnValue({});
            copyToClipboard(cells, [0], getCellRenderer);
            expect(window.Blob).toHaveBeenCalledTimes(2);
            const htmlStr = mocked(window.Blob).mock.calls[1][0]?.[0];
            expect(htmlStr).toMatchInlineSnapshot(`"<table><tbody><tr><td>foo</td></tr></tbody></table>"`);
        });
    });
});
