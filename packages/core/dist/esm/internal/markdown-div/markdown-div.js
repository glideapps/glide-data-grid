import React from "react";
import { marked } from "marked";
import { MarkdownContainer } from "./private/markdown-container.js";
/** @category Renderers */
export default class MarkdownDiv extends React.PureComponent {
    targetElement = null;
    renderMarkdownIntoDiv() {
        const { targetElement, props } = this;
        if (targetElement === null)
            return;
        const { contents, createNode } = props;
        const innerHTML = marked(contents);
        const childRange = document.createRange();
        childRange.selectNodeContents(targetElement);
        childRange.deleteContents();
        let newChild = createNode?.(innerHTML);
        if (newChild === undefined) {
            const childDoc = document.createElement("template");
            childDoc.innerHTML = innerHTML;
            newChild = childDoc.content;
        }
        targetElement.append(newChild);
        const tags = targetElement.getElementsByTagName("a");
        for (const tag of tags) {
            tag.target = "_blank";
            tag.rel = "noreferrer noopener";
        }
    }
    containerRefHook = (element) => {
        this.targetElement = element;
        this.renderMarkdownIntoDiv();
    };
    render() {
        // Doing this in the ref hook works great when we first render, but never again.
        // This only works great after the first render, but not in the first render.
        // Putting the two together makes the full solution.
        this.renderMarkdownIntoDiv();
        return React.createElement(MarkdownContainer, { ref: this.containerRefHook });
    }
}
//# sourceMappingURL=markdown-div.js.map