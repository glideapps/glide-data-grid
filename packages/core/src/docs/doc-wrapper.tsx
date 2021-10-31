import React from "react";
import { styled } from "../common/styles";
import marked from "marked";
import SyntaxHighlighter from "react-syntax-highlighter";
import highlightStyle from "react-syntax-highlighter/dist/esm/styles/hljs/monokai-sublime";

export interface WrapperProps {
    height: number;
}

export const Wrapper = styled.div<WrapperProps>`
    overflow: hidden;
    position: relative;

    border-radius: 12px;

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
    background-color: #2790b9;
    background: linear-gradient(90deg, #2790b9, #2070a9);
    color: white;

    padding: 32px 48px;

    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;

    font-family: sans-serif;

    & .inner {
        position: relative;
        max-width: 900px;

        > pre {
            font-size: 18px;
            border-radius: 9px;
            background: rgba(25, 26, 23, 0.8) !important;
        }
    }

    .marked {
        font-size: 16px;
        blockquote {
            margin: 0;
            padding: 1px 16px;

            border-radius: 9px;
            background-color: rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.5);
        }

        code {
            color: #ffcc80;
        }

        h1 {
            font-size: 32px;
            font-weight: 600;
            padding-bottom: 12px;
            margin-top: 40px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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
