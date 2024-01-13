import ImageWindowLoaderImpl from "../src/common/image-window-loader.js";
import { vi, expect, describe, it, beforeEach } from "vitest";
import { packColRowToNumber } from "../src/common/render-state-provider.js";

describe("ImageWindowLoaderImpl", () => {
    let loader: ImageWindowLoaderImpl;

    beforeEach(() => {
        loader = new ImageWindowLoaderImpl();
    });

    describe("setWindow()", () => {
        it("should set the new visible window and freezeCols", () => {
            const newWindow = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
            };
            const freezeCols = 5;

            loader.setWindow(newWindow, freezeCols, []);

            // Assuming you modify your class to expose `visibleWindow` and `freezeCols` for testing
            expect(loader.visibleWindow).toEqual(newWindow);
            expect(loader.freezeCols).toBe(freezeCols);
        });

        it("should call clearOutOfWindow() if the window or freezeCols changes", () => {
            const spyClearOutOfWindow = vi.spyOn(loader, "clearOutOfWindow" as any); // Private method, so using 'as any'

            const window1 = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
            };
            const window2 = {
                x: 15,
                y: 15,
                width: 100,
                height: 100,
            };
            const freezeCols1 = 5;
            const freezeCols2 = 10;

            loader.setWindow(window1, freezeCols1, []);
            expect(spyClearOutOfWindow).toHaveBeenCalledTimes(1);

            loader.setWindow(window2, freezeCols1, []);
            expect(spyClearOutOfWindow).toHaveBeenCalledTimes(2);

            loader.setWindow(window2, freezeCols2, []);
            expect(spyClearOutOfWindow).toHaveBeenCalledTimes(3);

            // Cleanup
            spyClearOutOfWindow.mockRestore();
        });

        it("should not call clearOutOfWindow() if the window and freezeCols stay the same", () => {
            const spyClearOutOfWindow = vi.spyOn(loader, "clearOutOfWindow" as any);

            const newWindow = {
                x: 10,
                y: 10,
                width: 100,
                height: 100,
            };
            const freezeCols = 5;

            loader.setWindow(newWindow, freezeCols, []);
            loader.setWindow(newWindow, freezeCols, []);

            expect(spyClearOutOfWindow).toHaveBeenCalledTimes(1);

            // Cleanup
            spyClearOutOfWindow.mockRestore();
        });
    });

    describe("loadOrGetImage()", () => {
        // Define image data that might be used across tests
        const url = "http://example.com/image.png";
        const col = 1;
        const row = 1;

        it("should return the image if it is in the cache", () => {
            // Setup: Mock the cache to contain the image
            const img = new Image();
            const key = url;
            (loader as any).cache[key] = {
                img,
                url,
                cells: [],
                cancel: vi.fn(),
            };

            // Act: Retrieve the image
            const result = loader.loadOrGetImage(url, col, row);

            // Assert: Ensure the returned image is what we expect
            expect(result).toBe(img);
        });

        it("should trigger image loading if the image is not in the cache", () => {
            // Setup: Spy on `loadImage` method and clear the cache
            const spyLoadImage = vi.spyOn(loader, "loadImage" as any);
            (loader as any).cache = {};

            // Act: Try to retrieve an image that's not in the cache
            loader.loadOrGetImage(url, col, row);

            // Assert: Ensure `loadImage` was called to fetch the image
            expect(spyLoadImage).toHaveBeenCalledWith(url, col, row, url);

            // Cleanup: Restore the spy
            spyLoadImage.mockRestore();
        });

        it("should not trigger image loading if the image is in the cache but not yet loaded", () => {
            // Setup: Mock the cache with a non-loaded image and spy on `loadImage` method
            const key = url;
            (loader as any).cache[key] = {
                img: undefined,
                url,
                cells: [],
                cancel: vi.fn(),
            };
            const spyLoadImage = vi.spyOn(loader, "loadImage" as any);

            // Act: Try to retrieve an image that's in the cache but not loaded
            const result = loader.loadOrGetImage(url, col, row);

            // Assert: Ensure the image isn't returned and `loadImage` wasn't called
            expect(result).toBeUndefined();
            expect(spyLoadImage).not.toHaveBeenCalled();

            // Cleanup: Restore the spy
            spyLoadImage.mockRestore();
        });
    });

    describe("loadImage()", () => {
        // Define image data that might be used across tests
        const url = "http://example.com/image.png";
        const col = 1;
        const row = 1;
        const key = url;

        it("should add a loading image to the cache", () => {
            // Act: Load an image
            (loader as any).loadImage(url, col, row, key);

            // Assert: Ensure the cache was updated with an entry for the loading image
            expect((loader as any).cache[key]).toBeDefined();
            expect((loader as any).cache[key].url).toBe(url);
            expect((loader as any).cache[key].img).toBeUndefined();
            expect((loader as any).cache[key].cells).toEqual([packColRowToNumber(col, row)]);
        });

        it("should handle image loading and decoding successfully", async () => {
            // Setup: Spy on `Image` constructor and `decode` method
            const img = new Image();
            img.addEventListener = vi.fn((_kind: string, cb: any) => cb());
            vi.useFakeTimers();

            const spyConstructor = vi.spyOn(window, "Image").mockImplementation(() => img);
            img.decode = vi.fn().mockResolvedValue(undefined);

            // Act: Load an image and simulate its successful loading
            (loader as any).loadImage(url, col, row, key);

            vi.runAllTimers();

            vi.useRealTimers();
            await new Promise(r => setTimeout(r, 100));

            // Assert: Ensure `decode` was called and the image data is updated in the cache
            expect(img.decode).toHaveBeenCalled();
            expect((loader as any).cache[key].img).toBe(img);

            // Cleanup: Restore the spies
            spyConstructor.mockRestore();
        });

        it("should handle image loading failure gracefully", async () => {
            // Setup: Spy on `Image` constructor and `decode` method
            const img = new Image();
            img.addEventListener = vi.fn((_kind: string, cb: any) => cb());
            vi.useFakeTimers();

            const spyConstructor = vi.spyOn(window, "Image").mockImplementation(() => img);
            img.decode = vi.fn().mockRejectedValue(new Error("Decoding failed"));

            // Act: Load an image and simulate its successful loading but decoding failure
            (loader as any).loadImage(url, col, row, key);

            vi.runAllTimers();

            vi.useRealTimers();
            await new Promise(r => setTimeout(r, 100));

            // Assert: Ensure `decode` was called and the image data remains undefined in the cache
            expect(img.decode).toHaveBeenCalled();
            expect((loader as any).cache[key].img).toBeUndefined();

            // Cleanup: Restore the spies
            spyConstructor.mockRestore();
        });
    });
});
