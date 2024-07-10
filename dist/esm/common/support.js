export function proveType(_val) {
    // do nothing, just prove the compiler thinks the types match
}
function panic(message = "This should not happen") {
    throw new Error(message);
}
export function assert(fact, message = "Assertion failed") {
    if (fact)
        return;
    return panic(message);
}
export function assertNever(_never, msg) {
    return panic(msg ?? "Hell froze over");
}
export function maybe(fn, defaultValue) {
    try {
        return fn();
    }
    catch {
        return defaultValue;
    }
}
// The following code is licensed under the MIT license to Luke Edwards
// Original license and code can be found here: https://github.com/lukeed/dequal/blob/master/license
// I have merely "ported" it to be TS (any any any) and directly included it for convenience.
const has = Object.prototype.hasOwnProperty;
// eslint-disable-next-line sonarjs/cognitive-complexity
export function deepEqual(foo, bar) {
    let ctor, len;
    if (foo === bar)
        return true;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date)
            return foo.getTime() === bar.getTime();
        if (ctor === RegExp)
            return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while (len-- && deepEqual(foo[len], bar[len]))
                    ;
            }
            return len === -1;
        }
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!ctor || typeof foo === "object") {
            len = 0;
            // eslint-disable-next-line guard-for-in
            for (ctor in foo) {
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor))
                    return false;
                if (!(ctor in bar) || !deepEqual(foo[ctor], bar[ctor]))
                    return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}
//# sourceMappingURL=support.js.map