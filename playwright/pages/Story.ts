import type { Page } from "@playwright/test";

export class Story {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToStory(story: string) {
        await this.page.goto(`/iframe.html?viewMode=story&id=${story}`);
    }
}
