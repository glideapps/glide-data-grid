import { Grid } from "../pages/Grid";
import { test, expect } from "@playwright/test";

test.describe("Layout", () => {
    test("CMD+F opens search", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32, 150, 150] });
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--built-in-search');

        await gridPage.search('https://');
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("search.png");
    });

    test("minimap", async ({ page }) => {
        const gridPage = new Grid(page);
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--minimap');

        await gridPage.clickOnMinimap(50, 50);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("minimap-50-50.png");

        await gridPage.clickOnMinimap(110, 70);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("minimap-110-70.png");
    });

    test("Freeze columns", async ({ page }) => {
        const gridPage = new Grid(page);
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--freeze-columns');
        await gridPage.scroll(200, 0);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("freeze-columns.png");
    });

    test("Observe Visible Region", async ({ page }) => {
        const gridPage = new Grid(page);
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--observe-visible-region');
        await gridPage.scroll(1000, 1000);
        await expect(await gridPage.visibleRegionX).toContainText('6');
        await expect(await gridPage.visibleRegionY).toContainText('29');
    });

    test("Overscroll", async ({ page }) => {
        const gridPage = new Grid(page);
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--overscroll');
        await gridPage.scroll(3000, 3000);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("overscroll.png");
    });
});
