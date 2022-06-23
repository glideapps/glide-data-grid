import * as React from "react";
import { render, screen } from "@testing-library/react";
import { splitMultilineText } from "./multi-line-layout";

// 1 char === 1 px according to the testing library. This is not realistic but nice for testing.

describe("multi-line-layout", () => {
    beforeEach(() => {
        CanvasRenderingContext2D.prototype.measureText = jest.fn((str: string) => {
            let width = 0;
            for (const char of str) {
                width += char.charCodeAt(0) / 12;
            }
            return {
                width,
                actualBoundingBoxAscent: 1,
                actualBoundingBoxDescent: 1,
                actualBoundingBoxLeft: 1,
                actualBoundingBoxRight: width,
                fontBoundingBoxAscent: 1,
                fontBoundingBoxDescent: 1,
            };
        });
    });

    test("short-sentence", () => {
        render(<canvas data-testid="canvas" />);

        const canvas = screen.getByTestId("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d", {
            alpha: false,
        });

        expect(ctx).not.toBeNull();

        if (ctx === null) {
            throw new Error();
        }

        const spanned = splitMultilineText(ctx, "Test this short string", "12px bold", 400, false);
        expect(spanned[0]).toEqual("Test this short string");
    });

    test("long-sentence", () => {
        render(<canvas data-testid="canvas" />);

        const canvas = screen.getByTestId("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d", {
            alpha: false,
        });

        expect(ctx).not.toBeNull();

        if (ctx === null) {
            throw new Error();
        }

        const spanned = splitMultilineText(
            ctx,
            "This is a quite long string that will need to wrap at least a couple times in order to fit on the screen. Who knows how many times?",
            "12px bold",
            400,
            false
        );
        expect(spanned).toEqual([
            "This is a quite long string that will need to wrap",
            "at least a couple times in order to fit on the",
            "screen. Who knows how many times?",
        ]);
    });

    test("newlines", () => {
        render(<canvas data-testid="canvas" />);

        const canvas = screen.getByTestId("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d", {
            alpha: false,
        });

        expect(ctx).not.toBeNull();

        if (ctx === null) {
            throw new Error();
        }

        const spanned = splitMultilineText(
            ctx,
            "This is a quite long string \nthat will need to wrap at least a \ncouple times in order to \nfit on the screen. Who knows how many times?",
            "12px bold",
            400,
            false
        );
        expect(spanned).toEqual([
            "This is a quite long string",
            "that will need to wrap at least a",
            "couple times in order to",
            "fit on the screen. Who knows how many times?",
        ]);
    });
});
