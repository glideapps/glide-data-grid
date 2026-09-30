import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import { vi, expect, describe, test, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { preloadableLazy } from "../src/common/preloadable-lazy.js";

interface Props {
    readonly label: string;
}

function deferredModule() {
    let resolve: (module: { default: React.ComponentType<Props> }) => void = () => undefined;
    let reject: (error: unknown) => void = () => undefined;
    const promise = new Promise<{ default: React.ComponentType<Props> }>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

const Label: React.FC<Props> = p => <span>{p.label}</span>;

const Fallback = () => <span>loading</span>;

describe("preloadableLazy", () => {
    afterEach(() => {
        cleanup();
    });

    test("once preloaded, it renders in the same act without suspending", async () => {
        const { Component, preload } = preloadableLazy<Props>(async () => ({ default: Label }));
        await preload();

        render(
            <React.Suspense fallback={<Fallback />}>
                <Component label="ready" />
            </React.Suspense>
        );

        expect(screen.getByText("ready")).toBeTruthy();
        expect(screen.queryByText("loading")).toBeNull();
    });

    test("preload loads once and returns the same promise", async () => {
        const load = vi.fn(async () => ({ default: Label }));
        const { preload } = preloadableLazy<Props>(load);

        const first = preload();
        expect(preload()).toBe(first);
        await first;
        expect(preload()).toBe(first);
        expect(load).toHaveBeenCalledTimes(1);
    });

    test("StrictMode's doubled effects start one load", async () => {
        const load = vi.fn(async () => ({ default: Label }));
        const { Component, preload } = preloadableLazy<Props>(load);
        const Host = () => {
            React.useEffect(() => {
                void preload();
            }, []);
            return null;
        };

        render(
            <React.StrictMode>
                <Host />
            </React.StrictMode>
        );
        await act(async () => {
            await preload();
        });
        expect(load).toHaveBeenCalledTimes(1);

        render(
            <React.StrictMode>
                <React.Suspense fallback={<Fallback />}>
                    <Component label="strict" />
                </React.Suspense>
            </React.StrictMode>
        );
        expect(screen.getByText("strict")).toBeTruthy();
        expect(load).toHaveBeenCalledTimes(1);
    });

    test("without a preload it suspends like React.lazy, then renders", async () => {
        const module = deferredModule();
        const { Component } = preloadableLazy<Props>(() => module.promise);

        render(
            <React.Suspense fallback={<Fallback />}>
                <Component label="late" />
            </React.Suspense>
        );
        expect(screen.getByText("loading")).toBeTruthy();

        await act(async () => {
            module.resolve({ default: Label });
            await module.promise;
        });
        expect(await screen.findByText("late")).toBeTruthy();
    });

    test("a mount that suspended isn't remounted after the module arrives", async () => {
        const module = deferredModule();
        const { Component } = preloadableLazy<Props>(() => module.promise);
        let mounts = 0;
        const Stateful: React.FC<Props> = p => {
            const [initial] = React.useState(p.label);
            React.useEffect(() => {
                mounts++;
            }, []);
            return (
                <span>
                    {initial}/{p.label}
                </span>
            );
        };

        // The boundary is already mounted when the component first suspends.
        const App = (p: { label?: string }) => (
            <React.Suspense fallback={<Fallback />}>
                {p.label === undefined ? null : <Component label={p.label} />}
            </React.Suspense>
        );
        const { rerender } = render(<App />);
        rerender(<App label="a" />);
        expect(screen.getByText("loading")).toBeTruthy();
        await act(async () => {
            module.resolve({ default: Stateful });
            await module.promise;
        });
        expect(await screen.findByText("a/a")).toBeTruthy();

        // A remount here would lose what was typed into an editor.
        rerender(<App label="b" />);
        expect(screen.getByText("a/b")).toBeTruthy();
        expect(mounts).toBe(1);
    });

    // React 19.2+ can suspend a transition on a lazy component, yield, and then, if the module
    // has arrived, render just the lazy component again, keeping what its parent already rendered.
    // This runs on React's real scheduler: `act` doesn't yield, so it never takes that path.
    test("a mount that suspended in a transition isn't remounted after the module arrives", async () => {
        let mounts = 0;
        const Stateful: React.FC<Props> = p => {
            const [initial] = React.useState(p.label);
            React.useEffect(() => {
                mounts++;
            }, []);
            return (
                <span>
                    {initial}/{p.label}
                </span>
            );
        };
        // Not preloaded: the module arrives a microtask after the first render asks for it.
        const { Component } = preloadableLazy<Props>(async () => ({ default: Stateful }));

        let setLabel: (label: string) => void = () => undefined;
        const App = () => {
            const [label, set] = React.useState<string | undefined>(undefined);
            setLabel = set;
            return (
                <React.Suspense fallback={<Fallback />}>
                    {label === undefined ? null : <Component label={label} />}
                </React.Suspense>
            );
        };

        const g = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
        const wasActEnvironment = g.IS_REACT_ACT_ENVIRONMENT;
        g.IS_REACT_ACT_ENVIRONMENT = false;
        const container = document.createElement("div");
        document.body.append(container);
        const root = createRoot(container);
        const settle = async () => await new Promise(resolve => window.setTimeout(resolve, 50));
        try {
            root.render(<App />);
            await settle();

            React.startTransition(() => setLabel("a"));
            await settle();
            expect(container.textContent).toBe("a/a");

            // A remount here would lose what was typed into an editor.
            setLabel("b");
            await settle();
            expect(container.textContent).toBe("a/b");
            expect(mounts).toBe(1);
        } finally {
            root.unmount();
            container.remove();
            g.IS_REACT_ACT_ENVIRONMENT = wasActEnvironment;
        }
    });

    test("a failed preload doesn't reject, and rendering loads again", async () => {
        const load = vi
            .fn<[], Promise<{ default: React.ComponentType<Props> }>>()
            .mockRejectedValueOnce(new Error("chunk failed"))
            .mockResolvedValue({ default: Label });
        const { Component, preload } = preloadableLazy<Props>(load);

        await expect(preload()).resolves.toBeUndefined();
        expect(load).toHaveBeenCalledTimes(1);

        render(
            <React.Suspense fallback={<Fallback />}>
                <Component label="retried" />
            </React.Suspense>
        );
        expect(await screen.findByText("retried")).toBeTruthy();
        expect(load).toHaveBeenCalledTimes(2);
    });

    test("a failed load while rendering reaches the error boundary", async () => {
        const { Component } = preloadableLazy<Props>(async () => {
            throw new Error("chunk failed");
        });
        class Boundary extends React.Component<React.PropsWithChildren, { error?: string }> {
            state: { error?: string } = {};
            static getDerivedStateFromError(error: Error) {
                return { error: error.message };
            }
            render() {
                return this.state.error === undefined ? this.props.children : <span>{this.state.error}</span>;
            }
        }
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

        render(
            <Boundary>
                <React.Suspense fallback={<Fallback />}>
                    <Component label="never" />
                </React.Suspense>
            </Boundary>
        );
        expect(await screen.findByText("chunk failed")).toBeTruthy();
        consoleError.mockRestore();
    });
});
