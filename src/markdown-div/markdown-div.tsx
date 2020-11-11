import React from "react";
import marked from "marked";

import { MarkdownContainer } from "./private/markdown-container";

export interface MarkdownDivProps {
    contents: string;
    linkOnClick?: (url: string) => void;
    createNode?: (content: string) => DocumentFragment;
}

export default class MarkdownDiv<TProps extends MarkdownDivProps, TState> extends React.PureComponent<TProps, TState> {
    private targetElement: HTMLElement | null = null;

    private renderMarkdownIntoDiv() {
        const { targetElement } = this;
        if (targetElement === null) return;

        const { contents, linkOnClick, createNode } = this.props;

        const innerHTML: string = (marked as any)(contents);

        const childRange = document.createRange();
        childRange.selectNodeContents(targetElement);
        childRange.deleteContents();

        let newChild: DocumentFragment | undefined = createNode?.(innerHTML);
        if (newChild === undefined) {
            const childDoc = document.createElement("template");
            childDoc.innerHTML = innerHTML;
            newChild = childDoc.content;
        }
        targetElement.appendChild(newChild);

        if (linkOnClick !== undefined) {
            const tags = targetElement.getElementsByTagName("a");
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                tag.onclick = () => {
                    linkOnClick(tag.href);
                };
            }
        }
    }

    private containerRefHook = (element: HTMLElement | null) => {
        this.targetElement = element;
        this.renderMarkdownIntoDiv();
    };

    public render() {
        // Doing this in the ref hook works great when we first render, but never again.
        // This only works great after the first render, but not in the first render.
        // Putting the two together makes the full solution.
        this.renderMarkdownIntoDiv();
        return <MarkdownContainer ref={this.containerRefHook as any} />;
    }
}
