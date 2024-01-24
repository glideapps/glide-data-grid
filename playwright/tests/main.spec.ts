import { test, expect } from "@playwright/test";
import { Grid } from "../pages/Grid";
const storiesJson = require("../stories.json") as {
    stories: { [key: string]: { name: string; kind: string } };
};

test.describe("Test all stories", () => {
    Object.entries(storiesJson.stories).forEach(([key, story]) => {
        if (
            ["Glide-Data-Grid/DataEditor Demos", "Extra Packages/Source", "Extra Packages/Cells"].includes(story.kind)
        ) {
            test(`testing ${story.name}`, async ({ page }) => {
                const gridPage = new Grid(page);
                await gridPage.goToStory(key);
                await page.waitForLoadState();
                expect(await gridPage.canvas.screenshot()).toMatchSnapshot(`${story.name}.png`);
            });
        }
    });
});
