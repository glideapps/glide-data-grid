import { test, expect } from '@playwright/test';
import { Story } from "../pages/Story";
const storiesJson = require('../stories.json') as { stories: { [key: string]: { name: string, kind: string } } };


test.describe('Test all stories', () => {
  Object.entries(storiesJson.stories).forEach(([key, story]) => {
    if(['Glide-Data-Grid/DataEditor Demos','Extra Packages/Source', 'Extra Packages/Cells'].includes(story.kind)) {
      test(`testing ${story.name}`, async ({page}) => {
        const storyPage = new Story(page);
        await storyPage.goToStory(key);
        await page.waitForLoadState();
        expect(await page.screenshot()).toMatchSnapshot(`${story.name}.png`);
      })
    }
  });
})
