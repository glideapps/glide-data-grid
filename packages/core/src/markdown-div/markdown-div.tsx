import React from "react";
import { MarkdownContainer } from "./private/markdown-container";

let markedFn: ((input: string) => string | undefined) | undefined;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ns = require("marked");
    if (typeof ns === "function") {
        markedFn = ns;
    } else if (typeof ns.marked === "function") {
        markedFn = ns.marked;
    }
} catch (er) {
    markedFn = undefined;
}

export interface MarkdownDivProps {
    contents: string;
    createNode?: (content: string) => DocumentFragment;
}

export default class MarkdownDiv<TProps extends MarkdownDivProps, TState> extends React.PureComponent<TProps, TState> {
    private targetElement: HTMLElement | null = null;

    private renderMarkdownIntoDiv() {
        const { targetElement } = this;
        if (targetElement === null) return;

        const { contents, createNode } = this.props;

        const innerHTML: string | undefined = markedFn?.(contents);
        if (innerHTML === undefined) return;

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

        const tags = targetElement.getElementsByTagName("a");
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            tag.target = "_blank";
            tag.rel = "noreferrer noopener";
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
