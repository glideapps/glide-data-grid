import { STORY_RENDERED, STORIES_EXPAND_ALL } from "@storybook/core-events";
import { addons } from '@storybook/manager-api';

let hasExpanded = false;

addons.register("expand-all", api => {
    const emitter = addons.getChannel();

    emitter.on(STORY_RENDERED, () => {
        if (!hasExpanded) {
            setTimeout(api.emit(STORIES_EXPAND_ALL)); // Calling on the next tick after storyRendered seems to work reliably.
            hasExpanded = true;
        }
    });
});
