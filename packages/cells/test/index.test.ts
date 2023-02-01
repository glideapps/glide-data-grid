import { useExtraCells } from "../src/index";
import { renderHook } from "@testing-library/react-hooks";

describe("useExtraCells", () => {
    it("should work", () => {
        const { result } = renderHook(() => useExtraCells());
        expect(result).toBeTruthy();
    });
});
