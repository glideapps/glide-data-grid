import React from "react";
export interface MarkdownDivProps {
    contents: string;
    linkOnClick?: (url: string) => void;
    createNode?: (content: string) => DocumentFragment;
}
export default class MarkdownDiv<TProps extends MarkdownDivProps, TState> extends React.PureComponent<TProps, TState> {
    private targetElement;
    private renderMarkdownIntoDiv;
    private containerRefHook;
    render(): JSX.Element;
}
//# sourceMappingURL=markdown-div.d.ts.map