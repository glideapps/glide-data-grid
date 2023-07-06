import type { Locator, Page } from "@playwright/test";
import { Story } from "./Story";
import { DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT } from "../constants/playwright";
import { SCROLLBAR_WIDTH } from "../constants/grid";

interface ICellPosition {
    x: number;
    y: number;
}
export class Grid extends Story {
    readonly page: Page;
    readonly canvas: Locator;
    readonly scroller: Locator;
    readonly overlay: Locator;
    readonly rowHeight: number;
    readonly headerHeight: number;
    private columnsWidth: number[];

    constructor(
        page: Page,
        {
            rowHeight,
            headerHeight,
            columnsWidth,
        }: {
            rowHeight?: number;
            headerHeight?: number;
            rowMarkerWidth?: number;
            rows?: number;
            columnsWidth?: number[];
        } = {}
    ) {
        super(page);
        this.page = page;
        this.canvas = page.getByTestId("data-grid-canvas");
        this.scroller = page.locator(".dvn-scroller");
        this.overlay = page.locator("#gdg-overlay-0");

        this.rowHeight = rowHeight ?? 34;
        this.headerHeight = headerHeight ?? 36;
        this.columnsWidth = columnsWidth ?? [];
    }

    private getColumnsRangeWidth(endColIndex: number): number {
        return this.columnsWidth.slice(0, endColIndex).reduce((acc, width) => acc + width, 0);
    }

    private async getScrollPosition(): Promise<{ scrollLeft: number; scrollTop: number }> {
        const { scrollLeft, scrollTop } = await this.scroller.evaluate(element => ({
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop,
        }));

        return { scrollLeft, scrollTop };
    }

    async getCellPosition(cell: number, row: number): Promise<ICellPosition> {
        const { scrollLeft, scrollTop } = await this.getScrollPosition()

        return {
            x: this.getColumnsRangeWidth(cell-1) + 1 - scrollLeft,
            y: this.headerHeight + (row - 1) * this.rowHeight + 1 - scrollTop,
        };
    }

    async getColumnPosition(column: number): Promise<ICellPosition> {
        const { scrollLeft} = await this.getScrollPosition()

        return {
            x: this.getColumnsRangeWidth(column-1) + 1 - scrollLeft,
            y: 1,
        };
    }

    async clickOnCell(cell: number, row: number, options?: Parameters<Locator['click']>[0], double?: boolean) {
        const position = await this.getCellPosition(cell, row);
        const clickArgs = {
            ...options,
            position: { x: position.x + (options?.position?.x ?? 0), y: position.y + (options?.position?.y ?? 0) },
            timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
            force: true,
        }
        if (double) {
            return this.canvas.dblclick(clickArgs);
        }
        return this.canvas.click(clickArgs);
    }

    async clickOnColumn(column: number, options?: Parameters<Locator['click']>[0],) {
        const position = await this.getColumnPosition(column);

        return this.canvas.click({
            ...options,
            position: { x: position.x + (options?.position?.x ?? 0), y: position.y + (options?.position?.y ?? 0) },
            timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
            force: true,
        });
    }

    async scroll(x: number, y: number): Promise<void> {
        await this.scroller.evaluate(
            (on, position) => {
                on.scrollBy(position.x, position.y);
            },
            { x, y }
        );
    }

    async addRow(): Promise<void> {
        const canvasPosition = await this.canvas.boundingBox();
        if (!canvasPosition) {
            throw new Error("Unable to get the grid position");
        }
        await this.canvas.click({
            position: {
                x: this.getColumnsRangeWidth(2) / 2,
                y: canvasPosition.height - SCROLLBAR_WIDTH - this.rowHeight / 2,
            },
            force: true,
        });
    }

    async rangeSelect(sourceCell: number, sourceRow: number, targetCell: number, targetRow: number, options?: Parameters<Locator['dragTo']>[1],) {
        const sourcePosition = await this.getCellPosition(sourceCell, sourceRow);
        const targetPosition = await this.getCellPosition(targetCell, targetRow);

        return this.canvas.dragTo(this.canvas, {
            ...options,
            sourcePosition: { x: sourcePosition.x + (options?.sourcePosition?.x ?? 0), y: sourcePosition.y + (options?.sourcePosition?.y ?? 0) },
            targetPosition: { x: targetPosition.x + (options?.targetPosition?.x ?? 0), y: targetPosition.y + (options?.targetPosition?.y ?? 0) },
            timeout: DEFAULT_PLAYWRIGHT_CLICK_TIMEOUT,
            force: true,
        });
    }
}
