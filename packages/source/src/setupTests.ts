import "@testing-library/jest-dom";
import { jest } from "jest-without-globals";

jest.mock("styled-components", () => {
    const actual = jest.requireActual("styled-components") as typeof import("styled-components");
    const styled = actual.default;

    return Object.assign(styled, actual);
});
