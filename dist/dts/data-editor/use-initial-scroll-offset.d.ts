import * as React from "react";
import type { VisibleRegion } from "./visible-region.js";
import type { DataEditorCoreProps } from "../index.js";
export declare function useInitialScrollOffset(scrollOffsetX: number | undefined, scrollOffsetY: number | undefined, rowHeight: NonNullable<DataEditorCoreProps["rowHeight"]>, visibleRegionRef: React.MutableRefObject<VisibleRegion>, onDidScroll: () => void): {
    visibleRegion: VisibleRegion;
    setVisibleRegion: React.Dispatch<React.SetStateAction<VisibleRegion>>;
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
};
