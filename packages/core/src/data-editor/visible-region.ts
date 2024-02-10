import { type Rectangle, type Item } from "../internal/data-grid/data-grid-types.js";

export type VisibleRegion = Rectangle & {
    /** value in px */
    tx?: number;
    /** value in px */
    ty?: number;
    extras?: {
        selected?: Item;
        /**
         * @deprecated
         */
        freezeRegion?: Rectangle;

        /**
         * All visible freeze regions
         */
        freezeRegions?: readonly Rectangle[];
    };
};
