export function proveType<T>(_val: T) {
    // do nothing, just prove the compiler thinks the types match
}

function panic(message: string = "This should not happen"): never {
    throw new Error(message);
}

export function assert(fact: boolean, message: string = "Assertion failed"): asserts fact {
    if (fact) return;
    return panic(message);
}

export function assertNever(_never: never): never {
    return panic("Hell froze over");
}
export function maybe<T>(fn: () => T, defaultValue: T) {
    try {
        const result = fn();
        return result;
    } catch {
        return defaultValue;
    }
}
