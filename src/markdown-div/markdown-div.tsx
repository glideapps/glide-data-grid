import React from "react";
import createDOMPurify from "dompurify";
import marked from "marked";

import { MarkdownContainer } from "./private/markdown-container";

const htmlWhitelist = [
  "a",
  "abbr",
  "acronym",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "br",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "content",
  "data",
  "dd",
  "decorator",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "font",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "i",
  "img",
  "ins",
  "legend",
  "li",
  "map",
  "mark",
  "marquee",
  "meter",
  "nav",
  "nobr",
  "ol",
  "output",
  "p",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "section",
  "select",
  "shadow",
  "small",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
];

interface Props {
  contents: string;
  linkOnClick?: (url: string) => void;
}

export default class MarkdownDiv<
  TProps extends Props,
  TState
> extends React.PureComponent<TProps, TState> {
  private targetElement: HTMLElement | null = null;

  private renderMarkdownIntoDiv() {
    const { targetElement } = this;
    if (targetElement === null) return;

    const { contents, linkOnClick } = this.props;
    const DOMPurify = createDOMPurify(window);
    DOMPurify.addHook("afterSanitizeAttributes", (currentNode: Element) => {
      if (currentNode.tagName !== "A") return;
      currentNode.setAttribute("target", "_blank");
      currentNode.setAttribute("rel", "noopener");
    });

    const innerHTML: string = (marked as any)(contents);

    // UNFIXME: This precludes anyone from running JavaScript in their HTML.
    // If people complain, depending on how many complaints, we might have to make
    // insecure script injection optional.
    // FIXME: We shouldn't even allow HTML injection.

    // This is peeking, but... internally DOMPurify creates actual DocumentFragments
    // instead of trying to roll its own SGML-ish parser. Since we're able to get them
    // directly anyway, we can elide more SGML-ish parsing on the part of the browser
    // by straight shoving them in the appropriate <div>.

    // ALLOW_UNKNOWN_PROTOCOLS: true preserves link behavior for URLs that don't have the
    // ftp/s, http/s, mailto, tel, callto, cid, or xmpp schemes. We're still protected from
    // javascript: and data: scheme injection here.
    const newChild = DOMPurify.sanitize(innerHTML, {
      RETURN_DOM_FRAGMENT: true,
      RETURN_DOM_IMPORT: true,
      ALLOW_UNKNOWN_PROTOCOLS: true,
      ALLOWED_TAGS: htmlWhitelist,
    });

    // Unfortunately, `newChild: DocumentFragment`, which means that by the time it gets to the DOM,
    // it's not a `DocumentFragment` anymore. This means that we have to clear out the existing children
    // by their actual identity on the target element.
    const childRange = document.createRange();
    childRange.selectNodeContents(targetElement);
    childRange.deleteContents();

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
