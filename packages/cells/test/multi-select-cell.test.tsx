import * as React from "react";

import {
    getByText,
    queryByText,
    getByRole,
    findByText,
    fireEvent,
    render,
    cleanup,
    queryByRole,
} from "@testing-library/react";
import { vi, expect, describe, it, afterEach } from "vitest";

import { GridCellKind } from "glide-data-grid-fork";
import renderer, { type MultiSelectCell, prepareOptions, resolveValues } from "../src/cells/multi-select-cell.js";

describe("prepareOptions", () => {
    const testCases = [
        {
            input: ["option1", "option2"],
            expected: [
                { value: "option1", label: "option1", color: undefined },
                { value: "option2", label: "option2", color: undefined },
            ],
        },
        {
            input: [{ value: "value1", label: "Label 1", color: "red" }],
            expected: [{ value: "value1", label: "Label 1", color: "red" }],
        },
        {
            input: ["option3", { value: "value2", color: "blue" }],
            expected: [
                { value: "option3", label: "option3", color: undefined },
                { value: "value2", label: "value2", color: "blue" },
            ],
        },
        {
            input: [null, { value: "value3" }],
            expected: [
                { value: null, label: "", color: undefined },
                { value: "value3", label: "value3", color: undefined },
            ],
        },
        {
            input: [],
            expected: [],
        },
        {
            input: [undefined, null],
            expected: [
                { value: undefined, label: "", color: undefined },
                { value: null, label: "", color: undefined },
            ],
        },
        {
            input: ["option4", null, { value: "value4" }, undefined],
            expected: [
                { value: "option4", label: "option4", color: undefined },
                { value: null, label: "", color: undefined },
                { value: "value4", label: "value4", color: undefined },
                { value: undefined, label: "", color: undefined },
            ],
        },
        {
            input: [{ value: "value5" }],
            expected: [{ value: "value5", label: "value5", color: undefined }],
        },
        {
            input: ["123", "456"],
            expected: [
                { value: "123", label: "123", color: undefined },
                { value: "456", label: "456", color: undefined },
            ],
        },
        {
            input: ["hello world", "special@char#"],
            expected: [
                { value: "hello world", label: "hello world", color: undefined },
                { value: "special@char#", label: "special@char#", color: undefined },
            ],
        },
    ];

    it.each(testCases)("should correctly prepare options for react-select", testCase => {
        const result = prepareOptions(testCase.input as any);
        expect(result).toEqual(testCase.expected);
    });
});

describe("resolveValues", () => {
    const options = [
        { value: "option1", label: "Option 1", color: "red" },
        { value: "option2", label: "Option 2", color: "blue" },
    ];

    const testCases = [
        // Empty values array
        {
            values: [],
            allowDuplicates: false,
            expected: [],
        },
        // Null values
        {
            values: null,
            allowDuplicates: false,
            expected: [],
        },
        // Undefined values
        {
            values: undefined,
            allowDuplicates: false,
            expected: [],
        },
        // Unique values without duplicates
        {
            values: ["option1", "nonExistingOption"],
            allowDuplicates: false,
            expected: [
                { value: "option1", label: "Option 1", color: "red" },
                { value: "nonExistingOption", label: "nonExistingOption" },
            ],
        },
        // Values with duplicates, allowDuplicates = false
        {
            values: ["option1", "option1", "nonExistingOption"],
            allowDuplicates: false,
            expected: [
                { value: "option1", label: "Option 1", color: "red" },
                { value: "option1", label: "Option 1", color: "red" },
                { value: "nonExistingOption", label: "nonExistingOption" },
            ],
        },
        // Values with duplicates, allowDuplicates = true
        {
            values: ["option1", "option1", "nonExistingOption"],
            allowDuplicates: true,
            expected: [
                { value: "__value0__option1", label: "Option 1", color: "red" },
                { value: "__value1__option1", label: "Option 1", color: "red" },
                { value: "__value2__nonExistingOption", label: "nonExistingOption" },
            ],
        },
    ];

    it.each(testCases)("should resolve values correctly", ({ values, allowDuplicates, expected }) => {
        const result = resolveValues(values, options, allowDuplicates);
        expect(result).toEqual(expected);
    });
});

describe("onPaste", () => {
    const options = [{ value: "option1", label: "Option 1" }, { value: "option2", color: "blue" }, "option3"];

    const testCases = [
        // Test case: Empty input string
        {
            input: "",
            cellProps: { kind: "multi-select-cell", values: [], options },
            expected: { kind: "multi-select-cell", options, values: [] },
        },
        // Test case: Input string with duplicates, allowDuplicates is false
        {
            input: "option1,option1,option2",
            cellProps: { kind: "multi-select-cell", values: [], options, allowDuplicates: false },
            expected: { kind: "multi-select-cell", options, values: ["option1", "option2"], allowDuplicates: false },
        },
        // Test case: Input string with values not in options, allowCreation is false
        {
            input: "option1,unknownOption",
            cellProps: { kind: "multi-select-cell", values: [], options, allowCreation: false },
            expected: { kind: "multi-select-cell", options, values: ["option1"], allowCreation: false },
        },
        // Test case: Input string with all values not in options, allowCreation is false
        {
            input: "unknownOption1,unknownOption2",
            cellProps: { kind: "multi-select-cell", values: [], options, allowCreation: false },
            expected: undefined,
        },
        // Test case: Input with spaces around values
        {
            input: " option1 , option2 ",
            cellProps: { kind: "multi-select-cell", values: [], options },
            expected: { kind: "multi-select-cell", options, values: ["option1", "option2"] },
        },
        // Test case: Input with special characters
        {
            input: "special@char,option2",
            cellProps: { kind: "multi-select-cell", values: [], options, allowCreation: true },
            expected: { kind: "multi-select-cell", options, values: ["special@char", "option2"], allowCreation: true },
        },
        // Test case: Input string with duplicates, allowDuplicates is true
        {
            input: "option1,option1,option2",
            cellProps: { kind: "multi-select-cell", values: [], options, allowDuplicates: true },
            expected: {
                kind: "multi-select-cell",
                options,
                values: ["option1", "option1", "option2"],
                allowDuplicates: true,
            },
        },
        // Test case: Input string with values not in options, allowCreation is true
        {
            input: "option1,unknownOption",
            cellProps: { kind: "multi-select-cell", values: [], options, allowCreation: true },
            expected: { kind: "multi-select-cell", options, values: ["option1", "unknownOption"], allowCreation: true },
        },
        // Test case: All values filtered out
        {
            input: "unknownOption1,unknownOption2",
            cellProps: { kind: "multi-select-cell", values: [], options, allowCreation: false },
            expected: undefined,
        },
    ];

    testCases.forEach(({ input, cellProps, expected }) => {
        it(`should correctly handle pasting "${input}"`, () => {
            // @ts-ignore
            const result = renderer.onPaste(input, cellProps);
            expect(result).toEqual(expected);
        });
    });
});

const keyDownEvent = {
    key: "ArrowDown",
};

export async function selectOption(container: HTMLElement, optionText: string) {
    const inputElement = getByRole(container, "combobox");
    fireEvent.keyDown(inputElement, keyDownEvent);
    const listBox = getByRole(container, "listbox");
    await findByText(listBox, optionText);
    fireEvent.click(getByText(listBox, optionText));
}

export function hasOption(container: HTMLElement, optionText: string): boolean {
    const inputElement = getByRole(container, "combobox");
    fireEvent.keyDown(inputElement, keyDownEvent);
    const listBox = getByRole(container, "listbox");
    return queryByText(listBox, optionText) !== null;
}

describe("Multi Select Editor", () => {
    afterEach(cleanup);

    function getMockCell(props: Partial<MultiSelectCell> = {}): MultiSelectCell {
        return {
            kind: GridCellKind.Custom,
            allowOverlay: true,
            copyData: "option1",
            readonly: false,
            ...props,
            data: {
                kind: "multi-select-cell",
                options: [
                    { value: "option1", label: "Option 1", color: "red" },
                    { value: "option2", label: "Option 2", color: "blue" },
                ],
                values: [],
                ...(props?.data ?? {}),
            },
        };
    }

    it("renders into the dom with correct value", async () => {
        // @ts-ignore
        const Editor = renderer.provideEditor?.(getMockCell()).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const mockCellOnChange = vi.fn();
        const result = render(<Editor isHighlighted={false} value={getMockCell()} onChange={mockCellOnChange} />);
        // Check if the element is actually there
        const cellEditor = result.getByTestId("multi-select-cell");
        expect(cellEditor).toBeDefined();

        const input = cellEditor.getElementsByClassName("gdg-multi-select")[0];
        expect(input).toBeDefined();
    });

    it("allows to select values", async () => {
        const mockCell = getMockCell();
        // @ts-ignore
        const Editor = renderer.provideEditor?.(mockCell).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const mockCellOnChange = vi.fn();
        const result = render(<Editor isHighlighted={false} value={mockCell} onChange={mockCellOnChange} />);
        // Check if the element is actually there
        const cellEditor = result.getByTestId("multi-select-cell");
        expect(cellEditor).toBeDefined();

        await selectOption(cellEditor, "Option 1");
        expect(mockCellOnChange).toHaveBeenCalledTimes(1);
        expect(mockCellOnChange).toBeCalledWith({ ...mockCell, data: { ...mockCell.data, values: ["option1"] } });

        expect(hasOption(cellEditor, "Option 2")).toBeTruthy();

        await selectOption(cellEditor, "Option 2");
        expect(mockCellOnChange).toHaveBeenCalledTimes(2);
        expect(mockCellOnChange).toBeCalledWith({
            ...mockCell,
            data: { ...mockCell.data, values: ["option1", "option2"] },
        });

        // Option 1 and 2 should not be available anymore
        expect(hasOption(cellEditor, "Option 1")).toBeFalsy();
        expect(hasOption(cellEditor, "Option 2")).toBeFalsy();
    });

    it("is disabled if readonly", async () => {
        const mockCell = getMockCell({ readonly: true });
        // @ts-ignore
        const Editor = renderer.provideEditor?.(mockCell).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const mockCellOnChange = vi.fn();
        const result = render(<Editor isHighlighted={false} value={mockCell} onChange={mockCellOnChange} />);
        // Check if the element is actually there
        const cellEditor = result.getByTestId("multi-select-cell");
        expect(cellEditor).toBeDefined();
        // Combo box should not be accessible:
        expect(queryByRole(cellEditor, "combobox")).toBeNull();
    });

    it("allowDuplicates allows to select values multiple times", async () => {
        const mockCell = getMockCell({ data: { allowDuplicates: true } } as any);
        // @ts-ignore
        const Editor = renderer.provideEditor?.(mockCell).editor;
        if (Editor === undefined) {
            throw new Error("Editor is invalid");
        }

        const mockCellOnChange = vi.fn();
        const result = render(<Editor isHighlighted={false} value={mockCell} onChange={mockCellOnChange} />);
        // Check if the element is actually there
        const cellEditor = result.getByTestId("multi-select-cell");
        expect(cellEditor).toBeDefined();

        await selectOption(cellEditor, "Option 1");
        expect(mockCellOnChange).toHaveBeenCalledTimes(1);
        expect(mockCellOnChange).toBeCalledWith({ ...mockCell, data: { ...mockCell.data, values: ["option1"] } });

        await selectOption(cellEditor, "Option 2");
        expect(mockCellOnChange).toHaveBeenCalledTimes(2);
        expect(mockCellOnChange).toBeCalledWith({
            ...mockCell,
            data: { ...mockCell.data, values: ["option1", "option2"] },
        });

        await selectOption(cellEditor, "Option 1");
        expect(mockCellOnChange).toHaveBeenCalledTimes(3);
        expect(mockCellOnChange).toBeCalledWith({
            ...mockCell,
            data: { ...mockCell.data, values: ["option1", "option2", "option1"] },
        });
    });

    // TODO: Add test for creating new options
});
