import { Grid } from '../pages/Grid';
import { test, expect } from '@playwright/test';
import {
  CELL_HORIZONTAL_PADDING,
  COLUMN_CORNER_SAFE_OFFSET,
  HEADER_HEIGHT,
} from '../constants/grid';
import { isLinuxEnv } from '../utils/test-utills';

test.describe('Header', () => {
  test.beforeEach(({ page }) => {
    page.on('console', (msg) => {
      console.log(msg.text());
    });
  });
  test('Header Menu', async ({ page }) => {
    const columnWidth = 120;
    const gridPage = new Grid(page, { columnsWidth: [columnWidth, columnWidth] });
    await gridPage.goToStory('glide-data-grid-dataeditor-demos--header-menus');
    await gridPage.clickOnColumn(2, {
      position: { x: columnWidth - CELL_HORIZONTAL_PADDING, y: HEADER_HEIGHT / 2 },
    });
    await expect(await gridPage.headerMenu).toBeVisible();
  });

  test('highlight column group', async ({ page }) => {
    const columnsWidth = isLinuxEnv()
      ? [36, 106, 111, 82, 202, 193, 215, 100]
      : [36, 109, 117, 84, 210, 204, 237, 103];
    const gridPage = new Grid(page, {
      columnsWidth: columnsWidth,
      columnGroups: [
        [1, 2],
        [3, 4, 5, 6],
        [7, 8],
      ],
    });
    await gridPage.goToStory('glide-data-grid-dataeditor-demos--column-groups');
    await gridPage.clickOnColumnGroup(2, {
      position: { x: COLUMN_CORNER_SAFE_OFFSET, y: HEADER_HEIGHT / 2 },
    });

    expect(await gridPage.canvas.screenshot()).toMatchSnapshot('group-2-selected.png');
  });

  test('edit column group name', async ({ page }) => {
    const columnsWidth = isLinuxEnv()
      ? [36, 106, 111, 82, 202, 193, 215, 100]
      : [36, 109, 117, 84, 210, 204, 237, 103];
    const gridPage = new Grid(page, {
      columnsWidth: columnsWidth,
      columnGroups: [
        [1, 2],
        [3, 4, 5, 6],
        [7, 8],
      ],
    });

    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toContain('alert');
      expect(dialog.message()).toContain('Please rename group Info to New name');
      await dialog.accept();
    });

    await gridPage.goToStory('glide-data-grid-dataeditor-demos--column-groups');
    await gridPage.changeColumnGroupName(2, 'New name');
    await expect(await gridPage.canvas.screenshot()).toMatchSnapshot('column-group-edit.png');
    await page.keyboard.press('Enter');
  });

  test('collapse column group', async ({ page }) => {
    const columnsWidth = isLinuxEnv()
      ? [36, 106, 111, 82, 202, 193, 215, 100]
      : [36, 109, 117, 84, 210, 204, 237, 103];
    const gridPage = new Grid(page, {
      columnsWidth: columnsWidth,
      columnGroups: [
        [1, 2],
        [3, 4, 5, 6],
        [7, 8],
      ],
    });

    await gridPage.goToStory('glide-data-grid-dataeditor-demos--column-group-collapse');
    await gridPage.clickOnColumnGroup(2, {
      position: { x: COLUMN_CORNER_SAFE_OFFSET, y: HEADER_HEIGHT / 2 },
    });
    await expect(await gridPage.canvas.screenshot()).toMatchSnapshot('column-collapsed.png');
    await gridPage.clickOnColumnGroup(2, {
      position: { x: COLUMN_CORNER_SAFE_OFFSET, y: HEADER_HEIGHT / 2 },
    });
    await expect(await gridPage.canvas.screenshot()).toMatchSnapshot('column-expanded.png');
  });
});
