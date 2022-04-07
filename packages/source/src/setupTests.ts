import "@testing-library/jest-dom";

jest.mock("styled-components", () => {
    const actual = jest.requireActual("styled-components") as typeof import("styled-components");
    const styled = actual.default;

    return Object.assign(styled, actual);
});
