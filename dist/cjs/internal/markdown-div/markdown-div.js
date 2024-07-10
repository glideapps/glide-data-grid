"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const marked_1 = require("marked");
const markdown_container_js_1 = require("./private/markdown-container.js");
/** @category Renderers */
class MarkdownDiv extends react_1.default.PureComponent {
    targetElement = null;
    renderMarkdownIntoDiv() {
        const { targetElement, props } = this;
        if (targetElement === null)
            return;
        const { contents, createNode } = props;
        const innerHTML = marked_1.marked(contents);
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
        return react_1.default.createElement(markdown_container_js_1.MarkdownContainer, { ref: this.containerRefHook });
    }
}
exports.default = MarkdownDiv;
//# sourceMappingURL=markdown-div.js.map