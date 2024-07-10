export declare function proveType<T>(_val: T): void;
export declare function assert(fact: boolean, message?: string): asserts fact;
export declare function assertNever(_never: never, msg?: string): never;
export declare function maybe<T>(fn: () => T, defaultValue: T): T;
export declare function deepEqual(foo: any, bar: any): boolean;
/**
 * This is a type that takes a type and makes all of its properties required.
 * This is useful for forcing a an object to have all properties defined from the get go, which helps V8 optimize it.
 */
export type FullyDefined<T> = {
    [K in keyof Required<T>]: T[K];
};
//# sourceMappingURL=support.d.ts.map