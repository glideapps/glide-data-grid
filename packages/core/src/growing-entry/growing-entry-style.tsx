import { styled } from "../common/styles";
import { css } from "styled-components";

const inputProps = css`
    font-size: var(--gdg-editor-font-size);
    line-height: 16px;
    font-family: var(--gdg-font-family);
    color: var(--gdg-text-dark);
    padding: 0;
    margin: 0;
`;

export const InputBox = styled.textarea`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    border-radius: 0px;

    resize: none;
    white-space: pre-wrap;
    min-width: 100%;
    overflow: hidden;
    border: 0;
    background-color: transparent;

    ::placeholder {
        color: var(--gdg-text-light);
    }

    ${inputProps}

    .invalid & {
        text-decoration: underline;
        text-decoration-color: #d60606;
    }
`;

export const ShadowBox = styled.div`
    visibility: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;

    width: max-content;
    max-width: 100%;

    min-width: 100%;

    ${inputProps}

    padding-bottom: 2px;
`;

export const GrowingEntryStyle = styled.div`
    position: relative;
    margin-top: 6px;
`;
