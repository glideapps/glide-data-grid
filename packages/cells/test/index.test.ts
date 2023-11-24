import { useExtraCells } from "../src/index.js";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { expect, describe, it, afterEach } from "vitest";

describe("useExtraCells", () => {
    afterEach(cleanup);
    it("should work", () => {
        const { result } = renderHook(() => useExtraCells());
        expect(result).toBeTruthy();
    });
});
