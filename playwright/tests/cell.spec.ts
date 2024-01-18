
import { Grid } from "../pages/Grid";
import { test, expect } from '@playwright/test';
import { isLinuxEnv, sleep } from "../utils/test-utills";

test.describe('Cell', () => {
    test('Fill handle', async ({ page }) => {
        const columnsWidth = isLinuxEnv() ? [32, 106, 111, 82, 202, 193, 215, 100] : [32, 108, 116, 83, 210, 202, 233, 103];
        const gridPage = new Grid(page, {columnsWidth});
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--fill-handle');

        await gridPage.fillHandle(6,2, 8,5);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot('fill-handle.png');
    });

    test('Tooltip', async ({ page }) => {
        const columnsWidth = isLinuxEnv() ? [106, 111] : [108, 116];
        const gridPage = new Grid(page, {columnsWidth});
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--tooltips');

        await gridPage.hoverOnCell(2, 2);
        await sleep(1000);
        await expect(await gridPage.tooltip).toContainText('Tooltip for 1, 1');
    });

    test('Highlight Cells', async ({ page }) => {
        const columnsWidth = isLinuxEnv() ? [106, 111, 82] : [108, 116, 83];
        const gridPage = new Grid(page, {columnsWidth});
        await gridPage.goToStory('glide-data-grid-dataeditor-demos--highlight-cells');

        await gridPage.clickOnCell(3, 3);
        expect(await gridPage.canvas.screenshot()).toMatchSnapshot('highlight-cells.png');
    });
})
