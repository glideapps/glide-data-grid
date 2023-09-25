import { STORY_RENDERED } from '@storybook/core-events';
import { addons } from '@storybook/addons';

let hasExpanded = false;

addons.register('expand-all', (api) => {
  const emitter = addons.getChannel();

  emitter.on(STORY_RENDERED, () => {
    if (!hasExpanded) {
      setTimeout(api.expandAll); // Calling on the next tick after storyRendered seems to work reliably.
      hasExpanded = true;
    }
  });
});
