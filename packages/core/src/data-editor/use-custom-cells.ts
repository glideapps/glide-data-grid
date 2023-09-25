import * as React from 'react';
import type { CustomRenderer } from '../data-grid/cells/cell-types';
import { CustomCell, GridCellKind } from '../data-grid/data-grid-types';
import type { DataEditorProps } from './data-editor';

/**
 * @category Renderers
 * @deprecated use CustomRenderer instead
 */
export type CustomCellRenderer<T extends CustomCell> = Omit<CustomRenderer<T>, 'kind'>;

function inflate<T extends CustomCell>(input: CustomCellRenderer<T>): CustomRenderer<T> {
  return {
    ...input,
    kind: GridCellKind.Custom,
  };
}

/**
 * @category Hooks
 * @deprecated use customRenderers instead.
 * @param cells
 * @returns an object intended to be spread on the DataEditor.
 */
export function useCustomCells(cells: readonly CustomCellRenderer<any>[]): {
  customRenderers: NonNullable<DataEditorProps['customRenderers']>;
} {
  return { customRenderers: React.useMemo(() => cells.map(inflate), [cells]) };
}
