import * as React from "react";
import { StoryContext } from "@storybook/addons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface Props {
    width: number;
    height: number;
    useMoreTopPadding?: boolean;
    figmaDoc?: string;
    context?: StoryContext;
}
export declare class BuilderThemeWrapper extends React.PureComponent<Props> {
    private builderTheme;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=story-utils.d.ts.map