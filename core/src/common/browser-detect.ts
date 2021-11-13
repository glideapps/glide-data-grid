const { userAgent } = window.navigator;

class Lazy<T> {
    private fn: () => T;
    private val: T | undefined;
    constructor(fn: () => T) {
        this.fn = fn;
    }

    public get value() {
        return this.val ?? (this.val = this.fn());
    }
}

function lazy<T>(fn: () => T) {
    return new Lazy(fn);
}

export const browserIsFirefox = userAgent.includes("Firefox");
export const browserIsSafari =
    userAgent.indexOf("Mac OS") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 0;

// next.js apps don't have window available at import time, so this will fail if its not lazy.
export const browserIsOSX = lazy(() => window.navigator.platform.toLowerCase().startsWith("mac"));
