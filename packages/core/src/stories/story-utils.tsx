import * as React from "react";
import { styled } from "@linaria/react";
import type { StoryContext } from "@storybook/addons";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
    width: number;
    height: number;
    useMoreTopPadding?: boolean;
    figmaDoc?: string;
    context?: StoryContext;
}

const BuilderWrapper = styled.div<Pick<Props, "width" | "height">>`
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;

    & > .content {
        display: block;

        width: ${p => p.width}px;
        height: ${p => p.height}px;
        align-self: center;

        position: relative;

        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;

        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        user-select: none;

        box-sizing: border-box;

        *,
        *::before,
        *::after {
            box-sizing: inherit;
        }
    }
`;

const SimpleWrapper = styled.div`
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    box-sizing: border-box;

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
`;

export class BuilderThemeWrapper extends React.PureComponent<Props> {
    public render(): React.ReactNode {
        const { context, ...rest } = this.props;
        return (
            <>
                <BuilderWrapper {...rest}>
                    <div className="content">{this.props.children}</div>
                </BuilderWrapper>
                <div id="portal" />
            </>
        );
    }
}

export const SimpleThemeWrapper: React.FC = p => {
    return (
        <SimpleWrapper>
            <div className="content">{p.children}</div>
        </SimpleWrapper>
    );
};
