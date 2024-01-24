import { Grid } from "../pages/Grid";
import { test, expect } from "@playwright/test";
import { COLUMN_CORNER_SAFE_OFFSET } from "../constants/grid";
import { getSystemCMDKey } from "../utils/test-utills";
test.describe("Selection", () => {
    test("Select & delete row data", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--add-data");

        await gridPage.clickOnCell(1, 2);
        await page.keyboard.press("Delete");
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("second-row-deleted.png");
    });

    test("Select & delete multiple row data", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--add-data");

        await gridPage.clickOnCell(1, 2);
        await gridPage.clickOnCell(1, 3, { modifiers: [getSystemCMDKey()] });
        await gridPage.clickOnCell(1, 4, { modifiers: [getSystemCMDKey()] });
        await page.keyboard.press("Delete");
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("2-4-rows-deleted.png");
    });

    test("Selecct & delete multiple columns data", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32, 108, 116, 83, 210] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--add-data");

        const clickArgs = { position: { x: COLUMN_CORNER_SAFE_OFFSET, y: 0 } };
        await gridPage.clickOnColumn(2, clickArgs);
        await gridPage.clickOnColumn(3, { modifiers: [getSystemCMDKey()], ...clickArgs });
        await gridPage.clickOnColumn(5, { modifiers: [getSystemCMDKey()], ...clickArgs });

        await page.keyboard.press("Delete");
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("2-3-5-columns-deleted.png");
    });

    test("select cells range & delete", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32, 108, 116, 83, 210] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--add-data");

        await gridPage.dragCells(2, 2, 5, 5);
        await page.keyboard.press("Delete");
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("2x5-cells-deleted.png");
    });
});
