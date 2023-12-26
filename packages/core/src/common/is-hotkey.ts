import type { GridKeyEventArgs } from "../internal/data-grid/event-args.js";
import { browserIsOSX } from "./browser-detect.js";

// brain dead syntax, find your deps, and make buggy replacements with 5 times the effort
// all lower case
// ctrl+shift+alt+d or ctrl+x or shift+c or shift+Backspace or alt+_53
// you get it, last one is always event.key, nothing fancy
// special: primary === ctrl on windows, meta on mac
// no to lower, its a waste, we're the only consumer, don't use caps

// and before you ask, yes space is " ", e.g. "ctrl+alt+ ", whatacountry.gif
// load bearing whitespace, it's basically python
// if the char starts with a _ it is the event.keycode instead
function checkKey(key: string | undefined, args: GridKeyEventArgs): boolean {
    if (key === undefined) return false;
    if (key.length > 1 && key.startsWith("_")) {
        const keycode = Number.parseInt(key.slice(1));
        if (keycode !== args.keyCode) return false;
    }
    return key.toLowerCase() === args.key.toLowerCase();
}

interface HotkeyResultDetails {
    didMatch: boolean;
}

export function isHotkey(hotkey: string, args: GridKeyEventArgs, details: HotkeyResultDetails): boolean {
    const result = isHotkeyInner(hotkey, args);
    if (result) details.didMatch = true;
    return result;
}

function isHotkeyInner(hotkey: string, args: GridKeyEventArgs): boolean {
    if (hotkey.length === 0) return false;

    if (hotkey.includes("|")) {
        const parts = hotkey.split("|");
        for (const part of parts) {
            if (isHotkeyInner(part, args)) return true;
        }
        return false;
    }

    let wantCtrl = false;
    let wantShift = false;
    let wantAlt = false;
    let wantMeta = false;

    const split = hotkey.split("+");
    const key = split.pop();

    if (!checkKey(key, args)) return false;
    if (split[0] === "any") return true;

    for (const accel of split) {
        switch (accel) {
            case "ctrl":
                wantCtrl = true;
                break;
            case "shift":
                wantShift = true;
                break;
            case "alt":
                wantAlt = true;
                break;
            case "meta":
                wantMeta = true;
                break;
            case "primary":
                if (browserIsOSX.value) {
                    wantMeta = true;
                } else {
                    wantCtrl = true;
                }
                break;
        }
    }

    return (
        args.altKey === wantAlt && args.ctrlKey === wantCtrl && args.shiftKey === wantShift && args.metaKey === wantMeta
    );
}
