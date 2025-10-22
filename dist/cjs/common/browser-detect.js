class Lazy {
    fn;
    val;
    constructor(fn) {
        this.fn = fn;
    }
    get value() {
        return this.val ?? (this.val = this.fn());
    }
}
function lazy(fn) {
    return new Lazy(fn);
}
// next.js apps don't have window available at import time, so this will fail if its not lazy.
export const browserIsFirefox = lazy(() => window.navigator.userAgent.includes("Firefox"));
export const browserIsSafari = lazy(() => window.navigator.userAgent.includes("Mac OS") &&
    window.navigator.userAgent.includes("Safari") &&
    !window.navigator.userAgent.includes("Chrome"));
export const browserIsOSX = lazy(() => window.navigator.platform.toLowerCase().startsWith("mac"));
//# sourceMappingURL=browser-detect.js.map