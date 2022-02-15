import { styled } from "../common/styles";
import { css } from "styled-components";

const inputProps = css`
    font-size: ${p => p.theme.fontSize};
    line-height: 16px;
    font-family: ${p => p.theme.fontFamily};
    color: ${p => p.theme.textDark};
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
        color: ${p => p.theme.textLight};
    }

    ${inputProps}
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
