import { GridCellKind, InnerGridCellKind } from '../data-grid-types';
import { booleanCellRenderer } from './boolean-cell';
import { bubbleCellRenderer } from './bubble-cell';
import { drilldownCellRenderer } from './drilldown-cell';
import { imageCellRenderer } from './image-cell';
import { loadingCellRenderer } from './loading-cell';
import { markdownCellRenderer } from './markdown-cell';
import { markerCellRenderer } from './marker-cell';
import { newRowCellRenderer } from './new-row-cell';
import { numberCellRenderer } from './number-cell';
import { protectedCellRenderer } from './protected-cell';
import { rowIDCellRenderer } from './row-id-cell';
import { textCellRenderer } from './text-cell';
import { uriCellRenderer } from './uri-cell';
import { groupRenderer } from './group-cell';

export const CellRenderers = {
  [InnerGridCellKind.Marker]: markerCellRenderer,
  [InnerGridCellKind.NewRow]: newRowCellRenderer,
  [InnerGridCellKind.Group]: groupRenderer,
  [GridCellKind.Boolean]: booleanCellRenderer,
  [GridCellKind.Bubble]: bubbleCellRenderer,
  [GridCellKind.Drilldown]: drilldownCellRenderer,
  [GridCellKind.Image]: imageCellRenderer,
  [GridCellKind.Loading]: loadingCellRenderer,
  [GridCellKind.Markdown]: markdownCellRenderer,
  [GridCellKind.Number]: numberCellRenderer,
  [GridCellKind.Protected]: protectedCellRenderer,
  [GridCellKind.RowID]: rowIDCellRenderer,
  [GridCellKind.Text]: textCellRenderer,
  [GridCellKind.Uri]: uriCellRenderer,
};
