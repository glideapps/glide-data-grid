import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { StoryContext } from "@storybook/addons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getBuilderTheme } from "../common/styles";

interface Props {
    width: number;
    height: number;
    useMoreTopPadding?: boolean;
    figmaDoc?: string;
    context?: StoryContext;
}

const BuilderWrapper = styled.div<Props>`
    display: flex;
    height: 100vh;

    & > .content {
        display: block;

        width: ${p => p.width}px;
        min-height: ${p => p.height}px;
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
    private builderTheme = getBuilderTheme();

    public render(): React.ReactNode {
        const { context, ...rest } = this.props;
        return (
            <ThemeProvider theme={this.builderTheme}>
                <BuilderWrapper {...rest}>
                    <div className="content">{this.props.children}</div>
                </BuilderWrapper>
                <div id="portal" />
            </ThemeProvider>
        );
    }
}

export const SimpleThemeWrapper: React.FC = p => {
    const [builderTheme] = React.useState(getBuilderTheme);
    return (
        <ThemeProvider theme={builderTheme}>
            <SimpleWrapper>
                <div className="content">{p.children}</div>
            </SimpleWrapper>
        </ThemeProvider>
    );
};

// export function permuteAll(
//   allOptions: Record<string, any[]>,
//   combine: boolean = true
// ): any[] {
//   let result: any[] = [
//     {
//       name: "",
//     },
//   ];
//   const keys = Object.keys(allOptions);
//   keys.forEach((o) => {
//     result = reduceOption(allOptions[o], o, result, combine);
//   });

//   return result;
// }

// export function permuteSeparate(allOptions: Record<string, any[]>): any[] {
//   return permuteAll(allOptions, false);
// }

// export const loremIpsum =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

// const DummyAppEnv: AppEnvironment = ({
//   // If this gets used we are going to crash anyway
// } as unknown) as AppEnvironment;
// export const DummyRenderEnv: RenderEnvironment = new RenderEnvironment(
//   DummyAppEnv,
//   {
//     displayContext: "default",
//     sizeClass: "phone",
//     needsRerender: false,
//   }
// );
