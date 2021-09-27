import styled from "styled-components";

export const MarkdownContainer = styled.div`
    word-break: break-word;
    -webkit-touch-callout: default;

    padding-right: 26px;

    & *:last-child {
        margin-bottom: 0;
    }

    & p img {
        width: 100%;
    }
`;
