import React from "react";
import { styled } from "@linaria/react";
import { marked } from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import highlightStyle from "react-syntax-highlighter/dist/esm/styles/hljs/github";

export interface WrapperProps {
    height: number;
}

export const Wrapper = styled.div<WrapperProps>`
    overflow: hidden;
    position: relative;

    border-radius: 12px;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.4);

    width: 100%;
    height: ${p => p.height}px;

    margin: 24px 0;

    > :first-child {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

export const Highlight: React.VFC<{ children: string }> = p => {
    return (
        <SyntaxHighlighter
            style={highlightStyle}
            showLineNumbers={true}
            lineNumberStyle={{ opacity: 0.5 }}
            language="typescript">
            {p.children.trim()}
        </SyntaxHighlighter>
    );
};

export const Marked: React.VFC<{ children: string }> = p => {
    return (
        <div
            className="marked"
            dangerouslySetInnerHTML={{
                __html: marked(p.children),
            }}
        />
    );
};

const BeautifulStyle = styled.div`
    background: white;
    color: #222222;

    padding: 32px 48px;

    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;

    font-family: sans-serif;

    & .inner {
        position: relative;
        width: 900px;

        > pre {
            font-size: 14px;
            border-radius: 9px;
        }
    }

    .marked {
        font-family: Helvetica, arial, sans-serif;
        font-size: 18px;
        line-height: 1.6;

        > *:first-child {
            margin-top: 0 !important;
        }
        > *:last-child {
            margin-bottom: 0 !important;
        }

        a {
            color: #4183c4;
        }
        a.absent {
            color: #cc0000;
        }
        a.anchor {
            display: block;
            padding-left: 30px;
            margin-left: -30px;
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 20px 0 10px;
            padding: 0;
            font-weight: bold;
            -webkit-font-smoothing: antialiased;
            cursor: text;
            position: relative;
        }

        h1:hover a.anchor,
        h2:hover a.anchor,
        h3:hover a.anchor,
        h4:hover a.anchor,
        h5:hover a.anchor,
        h6:hover a.anchor {
            text-decoration: none;
        }

        h1 tt,
        h1 code {
            font-size: inherit;
        }

        h2 tt,
        h2 code {
            font-size: inherit;
        }

        h3 tt,
        h3 code {
            font-size: inherit;
        }

        h4 tt,
        h4 code {
            font-size: inherit;
        }

        h5 tt,
        h5 code {
            font-size: inherit;
        }

        h6 tt,
        h6 code {
            font-size: inherit;
        }

        h1 {
            font-size: 32px;
            color: black;
        }

        h2 {
            font-size: 28px;
            border-bottom: 1px solid #cccccc;
            color: black;
        }

        h3 {
            font-size: 22px;
        }

        h4 {
            font-size: 20px;
        }

        h5 {
            font-size: 18px;
        }

        h6 {
            color: #777777;
            font-size: 18px;
        }

        p,
        blockquote,
        ul,
        ol,
        dl,
        li,
        table,
        pre {
            margin: 20px 0;
        }

        hr {
            border: 0 none;
            color: #cccccc;
            height: 4px;
            padding: 0;
        }

        > h2:first-child {
            margin-top: 0;
            padding-top: 0;
        }
        > h1:first-child {
            margin-top: 0;
            padding-top: 0;
        }
        > h1:first-child + h2 {
            margin-top: 0;
            padding-top: 0;
        }
        > h3:first-child,
        > h4:first-child,
        > h5:first-child,
        > h6:first-child {
            margin-top: 0;
            padding-top: 0;
        }

        a:first-child h1,
        a:first-child h2,
        a:first-child h3,
        a:first-child h4,
        a:first-child h5,
        a:first-child h6 {
            margin-top: 0;
            padding-top: 0;
        }

        h1 p,
        h2 p,
        h3 p,
        h4 p,
        h5 p,
        h6 p {
            margin-top: 0;
        }

        li p.first {
            display: inline-block;
        }
        li {
            margin: 0;
        }
        ul,
        ol {
            padding-left: 30px;
        }

        ul :first-child,
        ol :first-child {
            margin-top: 0;
        }

        dl {
            padding: 0;
        }
        dl dt {
            font-size: 18px;
            font-weight: bold;
            font-style: italic;
            padding: 0;
            margin: 15px 0 5px;
        }
        dl dt:first-child {
            padding: 0;
        }
        dl dt > :first-child {
            margin-top: 0;
        }
        dl dt > :last-child {
            margin-bottom: 0;
        }
        dl dd {
            margin: 0 0 15px;
            padding: 0 15px;
        }
        dl dd > :first-child {
            margin-top: 0;
        }
        dl dd > :last-child {
            margin-bottom: 0;
        }

        blockquote {
            border-left: 4px solid #dddddd;
            padding: 0 15px;
            color: #777777;
        }
        blockquote > :first-child {
            margin-top: 0;
        }
        blockquote > :last-child {
            margin-bottom: 0;
        }

        table {
            font-size: 14px;
            padding: 0;
            border-collapse: collapse;
        }
        table tr {
            border-top: 1px solid #cccccc;
            background-color: white;
            margin: 0;
            padding: 0;
        }
        table tr:nth-child(2n) {
            background-color: #f8f8f8;
        }
        table tr th {
            font-weight: bold;
            border: 1px solid #cccccc;
            margin: 0;
            padding: 6px 13px;
        }
        table tr td {
            border: 1px solid #cccccc;
            margin: 0;
            padding: 6px 13px;
        }
        table tr th :first-child,
        table tr td :first-child {
            margin-top: 0;
        }
        table tr th :last-child,
        table tr td :last-child {
            margin-bottom: 0;
        }

        img {
            max-width: 100%;
        }

        span.frame {
            display: block;
            overflow: hidden;
        }
        span.frame > span {
            border: 1px solid #dddddd;
            display: block;
            float: left;
            overflow: hidden;
            margin: 13px 0 0;
            padding: 7px;
            width: auto;
        }
        span.frame span img {
            display: block;
            float: left;
        }
        span.frame span span {
            clear: both;
            color: #333333;
            display: block;
            padding: 5px 0 0;
        }
        span.align-center {
            display: block;
            overflow: hidden;
            clear: both;
        }
        span.align-center > span {
            display: block;
            overflow: hidden;
            margin: 13px auto 0;
            text-align: center;
        }
        span.align-center span img {
            margin: 0 auto;
            text-align: center;
        }
        span.align-right {
            display: block;
            overflow: hidden;
            clear: both;
        }
        span.align-right > span {
            display: block;
            overflow: hidden;
            margin: 13px 0 0;
            text-align: right;
        }
        span.align-right span img {
            margin: 0;
            text-align: right;
        }
        span.float-left {
            display: block;
            margin-right: 13px;
            overflow: hidden;
            float: left;
        }
        span.float-left span {
            margin: 13px 0 0;
        }
        span.float-right {
            display: block;
            margin-left: 13px;
            overflow: hidden;
            float: right;
        }
        span.float-right > span {
            display: block;
            overflow: hidden;
            margin: 13px auto 0;
            text-align: right;
        }

        code,
        tt {
            margin: 0 2px;
            padding: 0 5px;
            white-space: nowrap;
            border: 1px solid #eaeaea;
            background-color: #f8f8f8;
            border-radius: 3px;
        }

        pre code {
            margin: 0;
            padding: 0;
            white-space: pre;
            border: none;
            background: transparent;
        }

        .highlight pre {
            background-color: #f8f8f8;
            border: 1px solid #cccccc;
            font-size: 17px;
            line-height: 23px;
            overflow: auto;
            padding: 6px 10px;
            border-radius: 3px;
        }

        pre {
            background-color: #f8f8f8;
            border: 1px solid #cccccc;
            font-size: 17px;
            line-height: 23px;
            overflow: auto;
            padding: 6px 10px;
            border-radius: 3px;
        }
        pre code,
        pre tt {
            background-color: transparent;
            border: none;
        }

        sup {
            font-size: 0.83em;
            vertical-align: super;
            line-height: 0;
        }
        * {
            -webkit-print-color-adjust: exact;
        }
    }
`;

export const PropName = styled.span`
    font-family: monospace;
    font-weight: 500;
    color: #ffe394;
`;

export const Description = styled.p`
    font-size: 18px;
    flex-shrink: 0;
    margin: 0 0 20px 0;
`;

export const MoreInfo = styled.p`
    font-size: 14px;
    flex-shrink: 0;
    margin: 0 0 20px 0;

    button {
        background-color: #f4f4f4;
        color: #2b2b2b;
        padding: 2px 6px;
        font-family: monospace;
        font-size: 14px;
        border-radius: 4px;
        box-shadow: 0px 1px 2px #00000040;
        margin: 0 0.1em;
        border: none;
        cursor: pointer;
    }
`;

export const DocWrapper: React.FC = p => {
    const { children } = p;
    return (
        <BeautifulStyle>
            <div className="inner">{children}</div>
        </BeautifulStyle>
    );
};
