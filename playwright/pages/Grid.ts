import type { Locator, Page } from '@playwright/test';
import { Story } from './Story';
import { DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT } from '../constants/playwright';
import {
  CELL_HORIZONTAL_PADDING,
  COLUMN_CORNER_SAFE_OFFSET,
  HEADER_HEIGHT,
  ROW_HEIGHT,
  SCROLLBAR_WIDTH,
} from '../constants/grid';
import { getSystemCMDKey, sleep } from '../utils/test-utills';

interface ICellPosition {
  x: number;
  y: number;
}
export class Grid extends Story {
  readonly page: Page;
  readonly canvas: Locator;
  readonly scroller: Locator;
  readonly overlay: Locator;
  readonly searchInput: Locator;
  readonly minimap: Locator;
  readonly tooltip: Locator;
  readonly visibleRegionX: Locator;
  readonly visibleRegionY: Locator;
  readonly groupRenameInput: Locator;
  readonly headerMenu: Locator;
  readonly rowHeight: number;
  readonly headerHeight: number;
  private columnsWidth: number[];
  private columnGroups: number[][];

  constructor(
    page: Page,
    {
      rowHeight,
      headerHeight,
      columnsWidth,
      columnGroups,
    }: {
      rowHeight?: number;
      headerHeight?: number;
      rowMarkerWidth?: number;
      rows?: number;
      columnsWidth?: number[];
      columnGroups?: number[][];
    } = {}
  ) {
    super(page);
    this.page = page;
    this.canvas = page.getByTestId('data-grid-canvas');
    this.scroller = page.locator('.dvn-scroller');
    this.overlay = page.locator('#gdg-overlay-0');
    this.searchInput = page.getByTestId('search-input');
    this.minimap = page.getByTestId('minimap-container');
    this.visibleRegionX = page.getByTestId('visible-region-x');
    this.visibleRegionY = page.getByTestId('visible-region-y');
    this.groupRenameInput = page.getByTestId('group-rename-input');
    this.headerMenu = page.getByTestId('header-menu');
    this.tooltip = page.locator('#portal');

    this.rowHeight = rowHeight ?? ROW_HEIGHT;
    this.headerHeight = headerHeight ?? HEADER_HEIGHT;
    this.columnsWidth = columnsWidth ?? [];
    this.columnGroups = columnGroups ?? [];
  }

  private getColumnsRangeWidth(endColIndex: number): number {
    return this.columnsWidth.slice(0, endColIndex).reduce((acc, width) => acc + width, 0);
  }

  private getGroupWidth(groupIndex: number) {
    const group = this.columnGroups[groupIndex];
    return group.reduce((acc, colIndex) => acc + this.columnsWidth[colIndex], 0);
  }

  private async getScrollPosition(): Promise<{ scrollLeft: number; scrollTop: number }> {
    const { scrollLeft, scrollTop } = await this.scroller.evaluate((element) => ({
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    }));

    return { scrollLeft, scrollTop };
  }

  private getMergedPosition(
    originalPosition: ICellPosition,
    newPosition?: ICellPosition
  ): ICellPosition {
    return {
      x: originalPosition.x + (newPosition?.x ?? 0),
      y: originalPosition.y + (newPosition?.y ?? 0),
    };
  }

  public async getCellPosition(cell: number, row: number): Promise<ICellPosition> {
    const { scrollLeft, scrollTop } = await this.getScrollPosition();

    return {
      x: this.getColumnsRangeWidth(cell - 1) + 1 - scrollLeft,
      y: this.headerHeight + (row - 1) * this.rowHeight + 1 - scrollTop,
    };
  }

  public async getColumnPosition(column: number): Promise<ICellPosition> {
    const { scrollLeft } = await this.getScrollPosition();

    return {
      x: this.getColumnsRangeWidth(column - 1) + 1 - scrollLeft,
      y: 1,
    };
  }

  public async getColumnGroupPosition(group: number): Promise<ICellPosition> {
    const { scrollLeft } = await this.getScrollPosition();

    return {
      x: this.getColumnsRangeWidth(this.columnGroups[group][0]) + 1 - scrollLeft,
      y: 1,
    };
  }

  public async clickOnCell(
    cell: number,
    row: number,
    options?: Parameters<Locator['click']>[0],
    double?: boolean
  ) {
    const position = await this.getCellPosition(cell, row);
    const clickArgs = {
      ...options,
      position: this.getMergedPosition(position, options?.position),
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    };
    if (double) {
      return this.canvas.dblclick(clickArgs);
    }
    return this.canvas.click(clickArgs);
  }

  public async hoverOnCell(cell: number, row: number, options?: Parameters<Locator['hover']>[0]) {
    const position = await this.getCellPosition(cell, row);
    const hoverArgs = {
      ...options,
      position: this.getMergedPosition(position, options?.position),
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    };

    return this.canvas.hover(hoverArgs);
  }

  public async clickOnColumn(column: number, options?: Parameters<Locator['click']>[0]) {
    const position = await this.getColumnPosition(column);

    return this.canvas.click({
      ...options,
      position: this.getMergedPosition(position, options?.position),
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    });
  }

  public async scroll(x: number, y: number): Promise<void> {
    await this.scroller.evaluate(
      (on, position) => {
        on.scrollBy(position.x, position.y);
      },
      { x, y }
    );
  }

  public async addRow(): Promise<void> {
    const canvasPosition = await this.canvas.boundingBox();
    if (!canvasPosition) {
      throw new Error('Unable to get the grid position');
    }
    await this.canvas.click({
      position: {
        x: this.getColumnsRangeWidth(2) / 2,
        y: canvasPosition.height - SCROLLBAR_WIDTH - this.rowHeight / 2,
      },
      force: true,
    });
  }

  public async dragCells(
    sourceCell: number,
    sourceRow: number,
    targetCell: number,
    targetRow: number,
    options?: Parameters<Locator['dragTo']>[1]
  ) {
    const sourcePosition = await this.getCellPosition(sourceCell, sourceRow);
    const targetPosition = await this.getCellPosition(targetCell, targetRow);

    return this.canvas.dragTo(this.canvas, {
      ...options,
      sourcePosition: this.getMergedPosition(sourcePosition, options?.sourcePosition),
      targetPosition: this.getMergedPosition(targetPosition, options?.targetPosition),
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    });
  }

  public async dragColumns(sourceColumn: number, targetColumn: number) {
    const sourcePosition = await this.getColumnPosition(sourceColumn);
    const targetPosition = await this.getColumnPosition(targetColumn);

    const sourceColumnWidth = this.columnsWidth[sourceColumn - 1];
    this.columnsWidth[sourceColumn - 1] = this.columnsWidth[targetColumn - 1];
    this.columnsWidth[targetColumn - 1] = sourceColumnWidth;

    return this.canvas.dragTo(this.canvas, {
      sourcePosition: this.getMergedPosition(sourcePosition, {
        x: COLUMN_CORNER_SAFE_OFFSET,
        y: 0,
      }),
      targetPosition: this.getMergedPosition(targetPosition, {
        x: COLUMN_CORNER_SAFE_OFFSET,
        y: 0,
      }),
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    });
  }

  public async resizeColumn(column: number, targetedSize: number) {
    const sourcePosition = await this.getColumnPosition(column + 1);
    const targetPosition = {
      x: sourcePosition.x + targetedSize - this.columnsWidth[column - 1],
      y: sourcePosition.y,
    };

    this.columnsWidth[column - 1] = targetedSize;

    await this.canvas.dragTo(this.canvas, {
      sourcePosition,
      targetPosition,
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    });

    // it appears that resize state takes some time to be applied
    await sleep(200);
  }
  public async search(text: string) {
    await this.canvas.focus();
    await this.page.keyboard.press(`${getSystemCMDKey()}+F`);
    await this.page.keyboard.type(text);
    await sleep(2000);
  }

  public async clickOnMinimap(x: number, y: number) {
    await this.minimap.click({
      position: {
        x: x,
        y: y,
      },
    });

    await sleep(1500);
  }

  public async fillHandle(
    sourceCol: number,
    sourceRow: number,
    targetCol: number,
    targetRow: number
  ) {
    const sourcePosition = await this.getCellPosition(sourceCol, sourceRow);
    const targetPosition = await this.getCellPosition(targetCol, targetRow);

    const sourceColumnWidth = this.columnsWidth[sourceCol - 1];

    await this.canvas.dragTo(this.canvas, {
      sourcePosition: this.getMergedPosition(sourcePosition, {
        x: sourceColumnWidth - 1,
        y: this.rowHeight - 2,
      }),
      targetPosition,
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    });
  }

  public async clickOnColumnGroup(group: number, options?: Parameters<Locator['click']>[0]) {
    const position = await this.getColumnGroupPosition(group - 1);

    return this.canvas.click({
      ...options,
      position: this.getMergedPosition(position, options?.position),
      timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
      force: true,
    });
  }

  public changeColumnGroupName = async (groupIndex: number, newName: string) => {
    const groupWidth = this.getGroupWidth(groupIndex - 1);
    await this.clickOnColumnGroup(groupIndex, {
      position: { x: groupWidth - CELL_HORIZONTAL_PADDING, y: HEADER_HEIGHT / 2 },
    });
    await this.groupRenameInput.fill(newName);
  };
}
