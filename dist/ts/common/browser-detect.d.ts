declare class Lazy<T> {
    private fn;
    private val;
    constructor(fn: () => T);
    get value(): T;
}
export declare const browserIsSafari: boolean;
export declare const browserIsOSX: Lazy<boolean>;
export declare const isFirefox: boolean;
export {};
//# sourceMappingURL=browser-detect.d.ts.map