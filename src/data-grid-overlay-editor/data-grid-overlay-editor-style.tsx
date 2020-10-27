import { styled } from "../common/styles";
import { Rectangle } from "../data-grid/data-grid-types";
import { GrowingEntryStyle } from "../growing-entry/growing-entry-style";

interface Props {
  targetRect: Rectangle;
}
export const DataGridOverlayEditorStyle = styled.div<Props>`
  position: absolute;

  --overlay-top: ${(p) => p.targetRect.y}px;

  left: ${(p) => p.targetRect.x}px;
  top: ${(p) => p.targetRect.y}px;
  min-width: ${(p) => p.targetRect.width}px;
  min-height: ${(p) => p.targetRect.height}px;
  max-width: 400px;
  max-height: calc(100vh - ${(p) => p.targetRect.y + 10}px);

  border: 2px solid ${(p) => p.theme.acceptColor};
  background-color: ${(p) => p.theme.dataViewer.gridColor};

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);

  font-family: Roboto, sans-serif;
  font-size: 13px;

  padding: 3px 6.5px 2px;

  display: flex;

  overflow-y: auto;
  overflow-x: hidden;

  input {
    width: 100%;
  }

  ${GrowingEntryStyle} {
    height: 100%;
  }
`;
