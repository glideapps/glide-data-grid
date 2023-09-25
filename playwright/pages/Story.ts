import type { Page } from '@playwright/test';
import { sleep } from '../utils/test-utills';

export class Story {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async ready() {
    await Promise.all([
      this.page.waitForLoadState(),
      this.page.evaluate(() => document.fonts.ready),
    ]);
  }

  async goToStory(story: string) {
    await this.page.goto(`/iframe.html?viewMode=story&id=${story}`);
    await this.ready();
    // waiting for canvas to render images.
    // at this point I can't think a better way to achieve this
    await sleep(1000);
  }
}
