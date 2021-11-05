import { maybe } from "./support";
import "jest";

describe("maybe", () => {
    test("Returns when not crashing", () => {
        const result = maybe(() => "success", "fail");

        expect(result).toBe("success");
    });

    test("Returns default value on error", () => {
        const result = maybe(() => {
            throw Error();
        }, "fail");

        expect(result).toBe("fail");
    });
});
