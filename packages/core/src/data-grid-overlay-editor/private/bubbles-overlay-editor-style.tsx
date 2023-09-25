import { styled } from '@linaria/react';

export const BubblesOverlayEditorStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  .boe-bubble {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 100px;

    padding: 0 8px;
    height: 20px;

    background-color: var(--gdg-bg-bubble);
    color: var(--gdg-text-dark);
    margin: 2px;
  }

  textarea {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0px;
    height: 0px;

    opacity: 0;
  }
`;
