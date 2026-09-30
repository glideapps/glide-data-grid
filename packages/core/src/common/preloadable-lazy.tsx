import * as React from "react";

type Loader<P> = () => Promise<{ default: React.ComponentType<P> }>;

export interface PreloadableLazy<P> {
    /** Renders the loaded component, or a `React.lazy` wrapper that suspends until it loads. */
    readonly Component: React.FunctionComponent<P>;
    /**
     * Starts loading the component, once. Later calls return the same promise, which
     * settles with the load and never rejects. If this load fails, rendering `Component`
     * loads again and reports the error the way `React.lazy` does.
     */
    readonly preload: () => Promise<void>;
}

/**
 * Like `React.lazy`, but an instance that mounts after the component has loaded (after
 * `preload()` or an earlier render) renders it directly instead of suspending. React 19
 * holds a suspended boundary's content for up to 300 ms after its fallback appears, even
 * if the chunk arrives sooner, so a lazy editor that suspends on the first edit swallows
 * the keys typed in that time.
 *
 * Each instance picks the direct component or the `React.lazy` wrapper when it first
 * renders and keeps that choice, so its element type never changes and it is never
 * remounted because the module arrived. An instance that suspended and was never
 * committed picks again when React retries it.
 */
export function preloadableLazy<P extends object>(load: Loader<P>): PreloadableLazy<P> {
    let loaded: React.ComponentType<P> | undefined;
    let loading: Promise<{ default: React.ComponentType<P> }> | undefined;
    let preloading: Promise<void> | undefined;

    const start = () => {
        if (loading === undefined) {
            loading = load().then(
                module => {
                    loaded = module.default;
                    return module;
                },
                (error: unknown) => {
                    loading = undefined;
                    throw error;
                }
            );
        }
        return loading;
    };

    const preload = () => {
        if (preloading === undefined) {
            preloading = start().then(
                () => undefined,
                () => undefined
            );
        }
        return preloading;
    };

    // `any` because `LazyExoticComponent` adds ref props that a generic `P` can't be checked against.
    const Lazy: React.ComponentType<any> = React.lazy(start);

    const Component: React.FunctionComponent<P> = props => {
        const [type] = React.useState<React.ComponentType<P>>(() => loaded ?? Lazy);
        return React.createElement(type, props);
    };

    return { Component, preload };
}
