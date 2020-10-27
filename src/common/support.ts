
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

// export function undefinedIfEmptyString(s: unknown): string | undefined {
//     if (s === undefined || s === "") return undefined;
//     return checkString(s);
// }

// export function undefinedIfEmptyOrWhitespaceString(s: unknown): string | undefined {
//     if (typeof s !== "string") return undefined;
//     if (s.trim() === "") return undefined;
//     return s;
// }

export function removeArrayItem<T>(arr: ReadonlyArray<T>, index: number): T[] {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// export function replaceArrayItem<T>(arr: ReadonlyArray<T>, index: number, newItem: T): T[] {
//     return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
// }

// export function updateDefined<T>(old: T, updates: Partial<T>): T {
//     const result: T = { ...old };
//     for (const key of Object.keys(updates)) {
//         const value = (updates as any)[key];
//         if (value === undefined) continue;
//         (result as any)[key] = value;
//     }
//     return result;
// }

// export function updateDeleteUndefined<T>(old: T, updates: Partial<T>): T {
//     const result: T = { ...old };
//     for (const key of Object.keys(updates)) {
//         const value = (updates as any)[key];
//         if (value !== undefined) {
//             (result as any)[key] = value;
//         } else {
//             delete (result as any)[key];
//         }
//     }
//     return result;
// }

// export function deleteUndefined<T>(o: T): T {
//     const result: Partial<T> = {};
//     for (const key of Object.keys(o)) {
//         const value = (o as any)[key];
//         if (value !== undefined) {
//             (result as any)[key] = value;
//         }
//     }
//     return result as T;
// }

// const extensionRegex = /^.+(\.[^./\\]+)$/;

// export function pathExtension(path: string): string | undefined {
//     const matches = path.match(extensionRegex);
//     if (matches === null) return undefined;
//     return matches[1];
// }

// export function isEmoji(str: string): boolean {
//     return getEmoji(str) !== undefined;
// }

// export function getEmoji(str: string): string | undefined {
//     const result = createEmojiRegExp().exec(str);
//     if (result === null || !str.trimLeft().startsWith(result[0])) {
//         return undefined;
//     }

//     // The Unicode Consortium considers [#*0-9] to be emoji in themselves.
//     // They definitely can be modified into Emoji with diacritics but we don't
//     // consider them alone to be emoji.
//     if (result[0].match(/^[#*0-9]+$/) !== null) return undefined;

//     return result[0];
// }

// // https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/simple/simple.jsx
// export function reorder<T>(list: ReadonlyArray<T>, startIndex: number, endIndex: number): Array<T> {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// }

// export function mapFilterUndefined<T, U>(iterable: Iterable<T>, f: (x: T, i: number) => U | undefined): U[] {
//     const result: U[] = [];
//     let i = 0;
//     for (const x of iterable) {
//         const y = f(x, i);
//         i += 1;
//         if (y === undefined) continue;
//         result.push(y);
//     }
//     return result;
// }

// export async function mapFilterUndefinedAsync<T, U>(
//     iterable: Iterable<T>,
//     f: (x: T, i: number) => Promise<U | undefined>
// ): Promise<U[]> {
//     const result: U[] = [];
//     let i = 0;
//     for (const x of iterable) {
//         const y = await f(x, i);
//         i += 1;
//         if (y === undefined) continue;
//         result.push(y);
//     }
//     return result;
// }

// export function removeUndefinedProperties(obj: { [k: string]: unknown }): { [k: string]: unknown } {
//     const result: any = {};
//     for (const k of Object.keys(obj)) {
//         const v = obj[k];
//         if (v === undefined) continue;
//         result[k] = v;
//     }
//     return result;
// }

// export function makeSingletonMap<K, V>(k: K, v: V): Map<K, V> {
//     const m = new Map<K, V>();
//     m.set(k, v);
//     return m;
// }

// // This is here in case we might want to change it at some point.
// export function nameStyle(s: string): string {
//     return s;
// }

// export function getCloudFunctionLocationForProject(
//     project: string,
//     locally: boolean = false,
//     localPort: number = 5000,
//     localHost: string = "localhost",
//     region?: string
// ): string {
//     if (region === undefined) {
//         region = "us-central1";
//     }
//     return locally
//         ? `http://${localHost}:${localPort}/${project}/${region}`
//         : `https://${region}-${project}.cloudfunctions.net`;
// }

// async function fetchGet(
//     basePath: string,
//     searchParams: { [key: string]: string },
//     headers: { [key: string]: string } = {}
// ): Promise<Response | undefined> {
//     const url = basePath + "?" + new URLSearchParams(searchParams).toString();
//     try {
//         return await fetch(url, { method: "GET", headers });
//     } catch (e) {
//         // FIXME: Appropriately handle exceptions here
//         logError(`In fetchGet: ${e}`);
//         return undefined;
//     }
// }

// export async function fetchPageMetadata(
//     target: string,
//     locally: boolean = false
// ): Promise<{ title: string } | undefined> {
//     const baseURL = locally
//         ? getCloudFunctionLocationForProject("glide-page-metadata", true, 5050) + "/fetchPageMetadata"
//         : "https://glide-page-metadata.firebaseapp.com/fetchPageMetadata";
//     const result = await fetchGet(baseURL, { url: target });
//     if (result === undefined || result.status !== 200) return undefined;
//     return await result.json();
// }

// const anonymousUserRegex = /^anonymous-user-(([0-9a-zA-Z]+)-)?([0-9a-zA-Z]+)$/;

// export function parseAnonymousUserID(uid: string): { appID: string; appUserID: string | undefined } | undefined {
//     const match = uid.match(anonymousUserRegex);
//     if (match === null) return undefined;
//     const appID = match[3];
//     let appUserID: string | undefined = match[2];
//     if (appUserID !== undefined && appUserID.length === 0) {
//         appUserID = undefined;
//     }
//     return { appID, appUserID };
// }

// export async function sleep(ms: number): Promise<void> {
//     return await new Promise<void>(async resolve => {
//         setTimeout(resolve, ms);
//     });
// }

// export function makeDateFromString(s: string, sanitize: boolean = false): Date | undefined {
//     s = s.trim();
//     if (s === "") return undefined;

//     if (sanitize) {
//         s = sanitizeDateTime(s);
//     }
//     let d = new Date(s);
//     if (!isNaN(d as any)) {
//         return d;
//     }
//     // This is how Google Sheets represents raw times
//     d = new Date("12/30/1899 " + s);
//     if (!isNaN(d as any)) {
//         return d;
//     }
//     return undefined;
// }

// export function convertDateToTimeZoneAgnostic(d: Date): Date {
//     return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
// }

// export function convertDateFromTimeZoneAgnostic(d: Date): Date {
//     // So, convertDateToTimeZoneAgnostic() properly coerces Dates to UTC.
//     // But coercion back to Time Zone Aware across a DST boundary breaks
//     // horribly.
//     //
//     // Consider this example, valid in any US timezone observing DST,
//     // happening on the time boundary of a transition into DST (You will
//     // have to explicitly set your clock to such a timezone to reproduce this):
//     //
//     // convertDateFromTimeZoneAgnostic(
//     //     convertDateToTimeZoneAgnostic(new Date("2020-03-08 3:00"))
//     // ).getHours() === 2 // We expected 3 here
//     //
//     // We want the UTC hours and UTC minutes of the UTC date to
//     // match the non-UTC hours and non-UTC minutes of the converted non-UTC
//     // date, but they cannot whenever the UTC offset conversion in
//     // convertDateToTimeZoneAgnostic switches time zones by aligning to UTC.
//     //
//     // What we do know is that whenever this happens, the UTC hours and minutes
//     // of the "UTC date" don't match up with the non-UTC hours and minutes of
//     // the non-UTC date. To correct for this, we
//     // 1. convert the wrong non-UTC date to a wrong UTC date
//     // 2. compute the difference between the right UTC date and the wrong UTC date
//     // 3. Add that difference to the wrong non-UTC date to get the right non-UTC date.
//     //
//     // This works because time zones are (currently) only granular in terms of hours
//     // and minutes. And we don't have to worry about wrapping around by days either,
//     // because worst-case timezone offsets are always less than 24 hours.
//     const basis = new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
//     if (basis.getHours() === d.getUTCHours() && basis.getMinutes() === d.getUTCMinutes()) {
//         return basis;
//     }
//     const basisAsUTC = Date.UTC(
//         basis.getFullYear(),
//         basis.getMonth(),
//         basis.getDate(),
//         basis.getHours(),
//         basis.getMinutes(),
//         basis.getSeconds()
//     );
//     return new Date(basis.getTime() + (d.getTime() - basisAsUTC));
// }

// export function getNowTimeZoneAgnostic(): Date {
//     return convertDateToTimeZoneAgnostic(new Date());
// }

// export function makeStartOfDay(d: Date): Date {
//     // This will give the start of day in the local timezone
//     return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
// }

// function getDateString(d: Date): string {
//     const asString = d.toISOString();
//     return asString.substring(0, asString.indexOf("T"));
// }

// export function getISODateString(d: Date): string {
//     return getDateString(makeStartOfDay(d));
// }

// // This assumes `d` is time-zone agnostic, and returns a time-zone
// // agnostic Date.
// export function makeStartOfDayTimeZoneAgnostic(d: Date): Date {
//     return convertDateToTimeZoneAgnostic(makeStartOfDay(d));
// }

// export function parseDateTimeZoneAgnostic(str: string): Date {
//     const d = makeDateFromString(str);
//     if (d === undefined) {
//         return getNowTimeZoneAgnostic();
//     }
//     return convertDateToTimeZoneAgnostic(d);
// }

// const dateTimeSeparatorRegexp = /(.+\d\d)T(\d\d.+)/;

// // This is a terrible hack.  We write date/times out to the sheet in
// // ISO format, with the GMT time zone, which means they look like this:
// //
// //   2019-11-20T10:00:12.636Z
// //
// // We need to not interpret the time zone, however, because we treat
// // everything as time-zone agnostic, but Chrono will interpret the time
// // zone in that format.  To make it not do that we have to remove the
// // "T" and the "Z".
// function sanitizeDateTime(str: string): string {
//     if (str.endsWith("Z")) {
//         str = str.substring(0, str.length - 1);
//     }
//     const match = str.match(dateTimeSeparatorRegexp);
//     if (match !== null) {
//         str = match[1] + " " + match[2];
//     }
//     return str;
// }

// let chrono: any;

// const parsedDates = new Map<string, Date | undefined>();

// export function parseUserDateTimeZoneAgnosticSync(str: string): Date | undefined {
//     if (chrono === undefined) {
//         return undefined;
//     }

//     if (parsedDates.has(str)) {
//         return parsedDates.get(str);
//     }

//     if (parsedDates.size > 10000) {
//         parsedDates.clear();
//     }

//     const sanitized = sanitizeDateTime(str);
//     const parsed = definedMap(nullToUndefined(chrono.en.parseDate(sanitized)), convertDateToTimeZoneAgnostic);

//     parsedDates.set(str, parsed);

//     return parsed;
// }

// export async function parseUserDateTimeZoneAgnostic(str: string): Promise<Date | undefined> {
//     if (chrono === undefined) {
//         // @ts-ignore
//         chrono = await import("chrono-node");
//     }

//     return parseUserDateTimeZoneAgnosticSync(str);
// }

// export function parseNumber(str: string): number | undefined {
//     try {
//         // Treat commas as decimal points, or remove them if there's
//         // already a decimal point.
//         if (str.includes(".")) {
//             str = str.replace(/,/g, "");
//         } else {
//             str = str.replace(/,/g, ".");
//         }
//         const n = numeral(str).value();
//         if (typeof n !== "number") return undefined;
//         if (isNaN(n)) return undefined;
//         return n;
//     } catch {
//         return undefined;
//     }
// }

// export function parseNumberDiligently(str: string): number | undefined {
//     const x = parseNumber(str);
//     if (x === undefined) return undefined;
//     if (x.toString() !== str) return undefined;
//     return x;
// }

// export function getFirstNameOfUsername(username: string): string {
//     return username.split(" ")[0];
// }

// export function parseURL(s: string): URL | undefined {
//     try {
//         return new URL(s);
//     } catch {
//         return undefined;
//     }
// }

// // We have to engage in generics because URL is already in the global
// // scope in browsers, but needs to be imported as a package in Node.
// export function liftURLAssumingHTTP<T>(possibleURL: string, urlConstructor: (p: string) => T): T | undefined {
//     try {
//         return urlConstructor(possibleURL);
//     } catch {
//         // Yuck, but... people do this.
//         try {
//             return urlConstructor(`http://${possibleURL}`);
//         } catch {
//             return undefined;
//         }
//     }
// }

// export function filterType<T, U extends T>(iterable: Iterable<T>, f: (t: T) => t is U): U[] {
//     const result: U[] = [];
//     for (const t of iterable) {
//         if (f(t)) {
//             result.push(t);
//         }
//     }
//     return result;
// }

// export function objectKeyForValue<T extends string, U>(
//     o: { [k in T]?: U },
//     v: U,
//     equal?: (a: U | undefined, b: U) => boolean
// ): T | undefined {
//     for (const k of Object.keys(o) as T[]) {
//         const ov = o[k];
//         const eq = equal !== undefined ? equal(ov, v) : ov === v;
//         if (eq) return k;
//     }
//     return undefined;
// }

// export function normalizeEmailAddress(s: string): string {
//     return s.toLowerCase().trim();
// }

// export interface ReadonlyDefaultMap<K, V> extends ReadonlyMap<K, V> {
//     get(k: K): V;
// }

// export class DefaultMap<K, V> extends Map<K, V> implements ReadonlyDefaultMap<K, V> {
//     constructor(private readonly _defaultFunc: (k: K) => V, initKVPs?: readonly (readonly [K, V])[]) {
//         super(initKVPs);
//     }

//     public get(k: K): V {
//         let v = super.get(k);
//         if (v === undefined) {
//             v = this._defaultFunc(k);
//             this.set(k, v);
//         }
//         return v;
//     }

//     public update(k: K, f: (v: V) => V): V {
//         const v = f(this.get(k));
//         this.set(k, v);
//         return v;
//     }
// }

// export function mapNewOrUpdate<K, V>(map: Map<K, V>, k: K, newValue: () => V, updateValue: (v: V) => V): V {
//     let v = map.get(k);
//     if (v === undefined) {
//         v = newValue();
//     } else {
//         v = updateValue(v);
//     }
//     map.set(k, v);
//     return v;
// }

// export function isResponseOK(r: Response | undefined): r is Response & { ok: true } {
//     return r !== undefined && r.ok;
// }

// export function escapeHtml(unsafe: string) {
//     return unsafe
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }

// // https://makandracards.com/makandra/15879-javascript-how-to-generate-a-regular-expression-from-a-string
// export function escapeStringAsRegexp(string: string): string {
//     return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
// }

// export function isOlderThan(date: Date, ms: number): boolean {
//     const timeout = new Date(date.getTime() + ms);
//     const now = new Date();
//     return now > timeout;
// }

// export function isWithinWindowFromNow(date: Date, windowMS: number): boolean {
//     const now = new Date();
//     const future = new Date(now.getTime() + windowMS);
//     // If the date is in the past, it is not within a future window
//     if (date < now) {
//         return false;
//     }
//     return date < future;
// }

// export function makeGoogleSheetURL(fileID: string): string {
//     return `https://docs.google.com/spreadsheets/d/${fileID}`;
// }

// export function getBrowserLanguage(): string | undefined {
//     try {
//         return checkString(navigator.language);
//     } catch {
//         return undefined;
//     }
// }

// export async function maybeAsync<T>(fn: () => Promise<T>, defaultValue: T) {
//     try {
//         const result = await fn();
//         return result;
//     } catch {
//         return defaultValue;
//     }
// }

export function maybe<T>(fn: () => T, defaultValue: T) {
    try {
        const result = fn();
        return result;
    } catch {
        return defaultValue;
    }
}

// const charCodeA = "A".charCodeAt(0);

// function lettersFromInteger(i: number): string {
//     if (i < 26) {
//         return String.fromCharCode(charCodeA + i);
//     } else {
//         const x = i % 26;
//         const y = (i - x) / 26;
//         return lettersFromInteger(y - 1) + lettersFromInteger(x);
//     }
// }

// export function makeNameUnique(name: string, nameExists: (n: string) => boolean): string {
//     if (!nameExists(name)) {
//         return name;
//     }

//     let index = 0;
//     for (;;) {
//         const withIndex = name + " " + lettersFromInteger(index);
//         if (!nameExists(withIndex)) {
//             return withIndex;
//         }
//         index++;
//     }
// }

// const urlSchemaRegex = /^[a-zA-Z][a-zA-Z0-9+.-]+:/;

// // s: string | undefined to simplify some usages.
// // See ListItem.ts as an example: href is an optional prop; if we just pass
// // in the `undefined` we expect from a non-passed prop then the logic for
// // checking whether to make the item clickable is still valid.
// export function safeURL(s: string | null | undefined): string | undefined {
//     if (s === null || s === undefined) return undefined;
//     s = s.trim();
//     if (s === "") return undefined;

//     if (s.match(urlSchemaRegex) === null) {
//         const emoji = getEmoji(s);
//         if (emoji !== undefined) {
//             s = `https://emojipedia.org/${emoji}`;
//         } else {
//             s = "https://" + s;
//         }
//     }

//     const parsed = parseURL(s);
//     if (parsed === undefined) return undefined;

//     // FIXME: What other schemes do we not want?
//     // eslint-disable-next-line
//     if (parsed.protocol === "javascript:") return undefined;

//     return s;
// }

// export function objectWithUndefinedProperties(keys: readonly string[]): JSONObject {
//     const o: JSONObject = {};
//     for (const c of keys) {
//         o[c] = undefined;
//     }
//     return o;
// }

// export function keyValuePairs<K extends keyof any, V>(obj: Record<K, V>): [K, V][] {
//     return entries(obj) as [K, V][];
// }

// export function makeRandomPassword(): string {
//     // FIXME: // use the cute haiku thing
//     return Math.round(Math.random() * 100000).toString();
// }

// export function getCurrentTimestampInMilliseconds(): number {
//     try {
//         if (window.performance !== undefined && window.performance.now !== undefined) {
//             return window.performance.now();
//         }
//     } catch {
//         // nothing to do
//     }
//     return Date.now();
// }

// export function reduceTwo<T>(a: T | undefined, b: T | undefined, f: (a: T, b: T) => T): T | undefined {
//     if (a === undefined) return b;
//     if (b === undefined) return a;
//     return f(a, b);
// }

// // FIXME: Move to collection-utils.
// export class EqualitySet<K> {
//     private readonly _map = new Map<number, K>();

//     public add(k: K): void {
//         let h = hashCodeOf(k) | 0;
//         for (;;) {
//             const inMap = this._map.get(h);
//             if (inMap === undefined) {
//                 this._map.set(h, k);
//                 return;
//             }
//             if (areEqual(k, inMap)) {
//                 return;
//             }
//             h = (h + 1) | 0;
//         }
//     }

//     public has(k: K): boolean {
//         let h = hashCodeOf(k) | 0;
//         for (;;) {
//             const inMap = this._map.get(h);
//             if (inMap === undefined) {
//                 return false;
//             }
//             if (areEqual(k, inMap)) {
//                 return true;
//             }
//             h = (h + 1) | 0;
//         }
//     }

//     values(): IterableIterator<K> {
//         return this._map.values();
//     }
// }
