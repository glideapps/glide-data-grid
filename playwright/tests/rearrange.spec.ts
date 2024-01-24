import { Grid } from "../pages/Grid";
import { test, expect } from "@playwright/test";

test.describe("Rearrange rows, columns, resize", () => {
    test("reorder rows", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32, 150, 150] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--reorder-rows");

        await gridPage.dragCells(1, 1, 1, 6);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("moved-row-1-to-6.png");

        await gridPage.dragCells(1, 13, 1, 4);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("moved-row-13-to-4.png");
    });

    test("reorder columns", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32, 108, 116, 83, 210, 202, 233, 103] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--rearrange-columns");

        await gridPage.dragColumns(8, 3);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("moved-column-8-to-2.png");

        await gridPage.dragColumns(2, 6);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("moved-column-2-to-6.png");
    });

    test("resize columns", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [120, 120, 120, 120, 120, 120, 120] });
        await gridPage.goToStory("tests-testcases--resizable-columns");

        await gridPage.resizeColumn(5, 100);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("downsized-column-5.png");

        await gridPage.resizeColumn(5, 300);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("upsized-column-5.png");

        await gridPage.resizeColumn(2, 600);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("upsized-column-1.png");
    });
});
