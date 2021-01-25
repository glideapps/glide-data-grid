export type JSONData = unknown;
export type JSONObject = Record<string, JSONData>;

export const digitsAndLetters = Array.from("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
    .sort()
    .join("");

/* eslint-disable */
export const emailDomainRegexp = /^@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const emailAddressRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

export function isValidEmailAddress(s: string): boolean {
    return emailAddressRegexp.test(s);
}

// FIXME: This doesn't belong here
export const MaxPinLifeMins = 15;

// This exists purely to prevent buggy autocomplete from putting postal codes in tab names.
//
// It would be real neat if Chrome supported actual web standards.
// You're supposed to be able to say `autocomplete="off"` as an attribute to disable it,
// but Chrome adamantly refuses to support this (see https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164)
// What they recommend we do instead is "set a semantic tag". So here's the semantic meaning of _this_ attribute:
// stop autocompleting, you jerks.
//
// This works in Chrome and Firefox, but not Safari. Right now, Safari autocomplete
// hasn't done anything catastrophic so we may just have to live with this.
export const disableBrowserAutocompleteToken = "browsers-should-never-autocomplete-this";

export function checkBoolean(x: unknown): boolean {
    if (typeof x === "boolean") return x;
    return panic(`Value should be a boolean: ${x}`);
}

export function checkString(x: unknown): string {
    if (typeof x === "string") return x;
    return panic(`Value should be a string: ${x}`);
}

export function checkNumber(x: unknown): number {
    if (typeof x === "number") return x;
    return panic(`Value should be a number: ${x}`);
}

export function isArray<T, U>(x: readonly T[] | U): x is readonly T[];
export function isArray<T, U>(x: T[] | U): x is T[];
export function isArray<T, U>(x: readonly T[] | U): x is readonly T[] {
    return Array.isArray(x);
}

export function checkArray<T, U>(x: T[] | U, checkItem?: (item: unknown) => T): T[] {
    if (!Array.isArray(x)) {
        return panic(`Value should be an array: ${x}`);
    }
    if (checkItem !== undefined) {
        x.forEach(checkItem);
    }
    return x;
}

export function proveType<T>(_val: T) {
    // do nothing, just prove the compiler thinks the types match
}

export function proveNever<T>(_never: never, _message: string, result: T): never {
    return result as never;
}

export function panic(message: string = "This should not happen"): never {
    throw new Error(message);
}

export function assert(fact: boolean, message: string = "Assertion failed"): asserts fact {
    if (fact) return;
    return panic(message);
}

export function assertNever(_never: never): never {
    return panic("Hell froze over");
}

export function defined<T>(v: T | undefined, reason?: string): T {
    if (v === undefined)
        return panic(
            "Value was undefined but should be defined" +
                (reason !== undefined ? `, expected to be defined because: ${reason}` : "")
        );
    return v;
}

export function nonNull<T>(v: T | null): T {
    if (v === null) return panic("Value was null but should be non-null");
    return v;
}

export function isUndefinedish<T>(v: T | null | undefined): v is null | undefined {
    return v === null || v === undefined;
}

export function isEmptyOrUndefined(v: string | undefined): v is undefined {
    return v === undefined || v.length === 0;
}

export function isEmptyOrUndefinedish(v: string | undefined | null): boolean {
    return v === undefined || v === null || v.length === 0;
}

export function nullToUndefined<T>(v: T | null): T | undefined {
    if (v === null) return undefined;
    return v;
}

export function definedMapWithDefault<T, U>(v: T | undefined, defaultValue: U, f: (v: T) => U): U {
    if (v === undefined) {
        return defaultValue;
    }
    return f(v);
}

export function definedishMapWithDefault<T, U>(v: T | null | undefined, defaultValue: U, f: (v: T) => U): U {
    if (isUndefinedish(v)) {
        return defaultValue;
    }
    return f(v);
}

export function truthify(x: unknown): boolean {
    return !!(x as boolean);
}

// This makes it type-safe
export function fillArray<T>(length: number, value: T): T[] {
    return new Array(length).fill(value);
}

export function dontAwait(p: Promise<unknown>): void {
    p.catch(e => {
        throw e;
    });
}

export function removeArrayItem<T>(arr: ReadonlyArray<T>, index: number): T[] {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function maybe<T>(fn: () => T, defaultValue: T) {
    try {
        const result = fn();
        return result;
    } catch {
        return defaultValue;
    }
}
