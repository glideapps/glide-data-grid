import { Grid } from "../pages/Grid";
import { test, expect } from "@playwright/test";

test.describe("Search", () => {
    test.beforeEach(({ page }) => {
        page.on("console", msg => {
            console.log(msg.text());
        });
    });
    test("matching cells background should turn orange while navigating on them", async ({ page }) => {
        const gridPage = new Grid(page, { columnsWidth: [32, 108] });
        await gridPage.goToStory("glide-data-grid-dataeditor-demos--external-search");
        await page.getByTestId("search-query-input").type("hay");

        await page.getByTestId("prev-search").click();

        expect(await gridPage.canvas.screenshot()).toMatchSnapshot("search.png");
    });
});
