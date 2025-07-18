import type { Item, Rectangle, CellActiviationBehavior } from "./data-grid-types.js";

/** @category Types */
export interface BaseGridMouseEventArgs {
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly isTouch: boolean;
    readonly isLongTouch?: boolean;
    readonly isDoubleClick?: boolean;
    readonly isEdge: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly scrollEdge: readonly [xDir: -1 | 0 | 1, yDir: -1 | 0 | 1];
}

export interface PositionableMouseEventArgs {
    readonly localEventX: number;
    readonly localEventY: number;
}

/** @category Types */
export interface GridMouseCellEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "cell";
    readonly location: Item;
    readonly bounds: Rectangle;
    readonly isFillHandle: boolean;
}

/** @category Types */
export const headerKind = "header" as const;
/** @category Types */
export interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: typeof headerKind;
    readonly location: readonly [number, -1];
    readonly bounds: Rectangle;
    readonly group: string;
}

/** @category Types */
export const groupHeaderKind = "group-header" as const;
/** @category Types */
export interface GridMouseGroupHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: typeof groupHeaderKind;
    readonly location: readonly [number, -2];
    readonly bounds: Rectangle;
    readonly group: string;
}

/** @category Types */
export const outOfBoundsKind = "out-of-bounds" as const;
/** @category Types */

export enum OutOfBoundsRegionAxis {
    Start = -2,
    StartPadding = -1,
    Center = 0,
    EndPadding = 1,
    End = 2,
}

export interface GridMouseOutOfBoundsEventArgs extends BaseGridMouseEventArgs {
    readonly kind: typeof outOfBoundsKind;
    readonly location: Item;
    readonly isMaybeScrollbar: boolean;
    readonly region: readonly [OutOfBoundsRegionAxis, OutOfBoundsRegionAxis];
}

/** @category Types */
export interface GridKeyEventArgs {
    readonly bounds: Rectangle | undefined;
    readonly key: string;
    readonly keyCode: number;
    readonly altKey: boolean;
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly cancel: () => void;
    readonly stopPropagation: () => void;
    readonly preventDefault: () => void;
    readonly rawEvent: React.KeyboardEvent<HTMLElement> | undefined;
    readonly location: Item | undefined;
}

/** @category Types */
export type GridMouseEventArgs =
    | GridMouseCellEventArgs
    | GridMouseHeaderEventArgs
    | GridMouseOutOfBoundsEventArgs
    | GridMouseGroupHeaderEventArgs;

export interface PreventableEvent {
    preventDefault: () => void;
}
/** @category Types */
export interface CellClickedEventArgs extends GridMouseCellEventArgs, PreventableEvent {}

/** @category Types */
export interface HeaderClickedEventArgs extends GridMouseHeaderEventArgs, PreventableEvent {}

/** @category Types */
export interface GroupHeaderClickedEventArgs extends GridMouseGroupHeaderEventArgs, PreventableEvent {}

export interface BaseCellActivatedEvent {}

/** Keyboard-initiated activation */
export interface KeyboardCellActivatedEvent extends BaseCellActivatedEvent {
    readonly inputType: "keyboard";
    readonly key: string;
}

/** Pointer-initiated activation */
export interface PointerCellActivatedEvent extends BaseCellActivatedEvent {
    readonly inputType: "pointer";
    readonly pointerActivation: CellActiviationBehavior;
    readonly pointerType?: "mouse" | "touch" | "pen";
}

/** The public event type the grid emits */
export type CellActivatedEventArgs =
    | KeyboardCellActivatedEvent
    | PointerCellActivatedEvent;

export interface FillPatternEventArgs extends PreventableEvent {
    patternSource: Rectangle;
    fillDestination: Rectangle;
}

export interface DragHandler {
    readonly setData: (mime: string, payload: string) => void;
    readonly setDragImage: (image: Element, x: number, y: number) => void;
    readonly preventDefault: () => void;
    readonly defaultPrevented: () => boolean;
}

/** @category Types */
export type GridDragEventArgs = GridMouseEventArgs & DragHandler;

export function mouseEventArgsAreEqual(args: GridMouseEventArgs | undefined, other: GridMouseEventArgs | undefined) {
    if (args === other) return true;

    if (args?.kind === "out-of-bounds") {
        return (
            args?.kind === other?.kind &&
            args?.location[0] === other?.location[0] &&
            args?.location[1] === other?.location[1] &&
            args?.region[0] === other?.region[0] &&
            args?.region[1] === other?.region[1]
        );
    }

    return (
        args?.kind === other?.kind &&
        args?.location[0] === other?.location[0] &&
        args?.location[1] === other?.location[1]
    );
}
