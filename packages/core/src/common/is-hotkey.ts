import { GridKeyEventArgs } from "../data-grid/data-grid-types";
import { browserIsOSX } from "./browser-detect";

// brain dead syntax, find your deps, and make buggy replacements with 5 times the effort
// all lower case
// ctrl+shift+alt+d or ctrl+x or shift+c or shift+Backspace or alt+_53
// you get it, last one is always event.key, nothing fancy
// special: primary === ctrl on windows, meta on mac
// no to lower, its a waste, we're the only consumer, don't use caps

// and before you ask, yes space is " ", e.g. "ctrl+alt+ ", whatacountry.gif
// load bearing whitespace, it's basically python
// if the char starts with a _ it is the event.keycode instead
export function isHotkey(hotkey: string, args: GridKeyEventArgs): boolean {
    if (hotkey.length === 0) return false;
    let wantCtrl = false;
    let wantShift = false;
    let wantAlt = false;
    let wantMeta = false;
    const split = hotkey.split("+");
    const key = split.pop();
    if (key === undefined) return false;
    if (key.length > 1 && key.startsWith("_")) {
        const keycode = Number.parseInt(key.substring(1));
        if (keycode !== args.keyCode) return false;
    } else {
        if (key !== args.key) return false;
    }
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
