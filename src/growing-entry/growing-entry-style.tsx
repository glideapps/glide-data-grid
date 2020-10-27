import { styled } from "../common/styles";
import { css } from "styled-components";

const inputProps = css`
  font-size: 13px;
  line-height: 16px;
  font-family: Roboto, sans-serif;
  color: ${(p) => p.theme.fgColorDark};
  padding: 0;
  margin: 0;
`;

export const InputBox = styled.textarea`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  border-radius: 0px;

  resize: none;
  white-space: normal;
  width: 100%;
  overflow: hidden;
  border: 0;
  background-color: transparent;

  ::placeholder {
    color: ${(p) => p.theme.fgColorLight};
  }

  ${inputProps}
`;

export const ShadowBox = styled.div`
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;

  width: 100%;

  ${inputProps}
`;

export const GrowingEntryStyle = styled.div`
  position: relative;
  margin-top: 5px;

  min-width: 100%;
`;
