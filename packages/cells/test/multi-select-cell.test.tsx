import * as React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";

import { GridCellKind } from "@glideapps/glide-data-grid";
import renderer, { type MultiSelectCell, prepareOptions, resolveValues } from "../src/cells/multi-select-cell.js";
import { vi, expect, describe, it, afterEach } from "vitest";

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
                { value: "__value1__option1", label: "Option 1", color: "red" },
                { value: "__value2__option1", label: "Option 1", color: "red" },
                { value: "__value3__nonExistingOption", label: "nonExistingOption" },
            ],
        },
    ];

    it.each(testCases)("should resolve values correctly", ({ values, allowDuplicates, expected }) => {
        const result = resolveValues(values, options, allowDuplicates);
        expect(result).toEqual(expected);
    });
});
