import { styled } from '@linaria/react';

export const MarkdownContainer = styled.div`
  word-break: break-word;
  -webkit-touch-callout: default;
  padding-top: 6px;

  > * {
    margin: 0;
  }

  & *:last-child {
    margin-bottom: 0;
  }

  & p img {
    width: 100%;
  }
`;
