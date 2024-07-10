declare class Lazy<T> {
    private fn;
    private val;
    constructor(fn: () => T);
    get value(): T;
}
export declare const browserIsFirefox: Lazy<boolean>;
export declare const browserIsSafari: Lazy<boolean>;
export declare const browserIsOSX: Lazy<boolean>;
export {};
