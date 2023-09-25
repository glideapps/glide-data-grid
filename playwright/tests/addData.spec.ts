import { Grid } from '../pages/Grid';
import { test, expect } from '@playwright/test';
test.describe('Add Data', () => {
  test('Add new row', async ({ page }) => {
    const gridPage = new Grid(page, { columnsWidth: [32, 108] });
    await gridPage.goToStory('glide-data-grid-dataeditor-demos--add-data');

    await gridPage.addRow();
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('new-row-overlay.png');
    await page.keyboard.type('John Doe');
    await page.keyboard.press('Enter');
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('added-new-row.png');
  });

  test('Edit a cell', async ({ page }) => {
    const gridPage = new Grid(page, { columnsWidth: [32, 108, 116, 83, 210, 202, 233, 103] });
    await gridPage.goToStory('glide-data-grid-dataeditor-demos--add-data');

    await gridPage.clickOnCell(3, 3);
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('edit-cell-3-3.png');
    await page.keyboard.type('John Doe');
    await page.keyboard.press('Enter');
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('edited-cell-3-3.png');

    await gridPage.clickOnCell(6, 9);
    await page.keyboard.type('John Doe');
    await gridPage.scroller.click({ force: true }); // clicking outside of cell to save
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('edited-cell-6-9.png');

    await gridPage.scroll(720, 1020);
    await gridPage.clickOnCell(8, 37);
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('edit-cell-8-37.png');
  });

  test('select checkbox cell', async ({ page }) => {
    const gridPage = new Grid(page, { columnsWidth: [120, 120, 120, 120, 120, 120] });
    await gridPage.goToStory('glide-data-grid-dataeditor-demos--all-cell-kinds');
    await gridPage.clickOnCell(6, 2, { position: { x: 62, y: 20 } });
    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('checkbox-checked.png');
  });
});
