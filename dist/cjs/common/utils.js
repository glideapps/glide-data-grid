"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeepMemo = exports.makeAccessibilityStringForArray = exports.useStateWithReactiveInput = exports.getScrollBarWidth = exports.direction = exports.useDebouncedMemo = exports.Checkmark = exports.EditPencil = exports.pointIsWithinBB = exports.getSquareWidth = exports.getSquareXPosFromAlign = exports.getSquareBB = exports.degreesToRadians = exports.whenDefined = exports.useEventListener = void 0;
const React = __importStar(require("react"));
const debounce_js_1 = __importDefault(require("lodash/debounce.js"));
const support_js_1 = require("./support.js");
function useEventListener(eventName, handler, element, passive, capture = false) {
    // Create a ref that stores handler
    const savedHandler = React.useRef();
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    savedHandler.current = handler;
    React.useEffect(() => {
        // Make sure element supports addEventListener
        if (element === null || element.addEventListener === undefined)
            return;
        const el = element;
        // Create event listener that calls handler function stored in ref
        const eventListener = (event) => {
            savedHandler.current?.call(el, event);
        };
        el.addEventListener(eventName, eventListener, { passive, capture });
        // Remove event listener on cleanup
        return () => {
            el.removeEventListener(eventName, eventListener, { capture });
        };
    }, [eventName, element, passive, capture] // Re-run if eventName or element changes
    );
}
exports.useEventListener = useEventListener;
function whenDefined(obj, result) {
    return obj === undefined ? undefined : result;
}
exports.whenDefined = whenDefined;
const PI = Math.PI;
function degreesToRadians(degrees) {
    return (degrees * PI) / 180;
}
exports.degreesToRadians = degreesToRadians;
const getSquareBB = (posX, posY, squareSideLength) => ({
    x1: posX - squareSideLength / 2,
    y1: posY - squareSideLength / 2,
    x2: posX + squareSideLength / 2,
    y2: posY + squareSideLength / 2,
});
exports.getSquareBB = getSquareBB;
const getSquareXPosFromAlign = (alignment, containerX, containerWidth, horizontalPadding, squareWidth) => {
    switch (alignment) {
        case "left":
            return Math.floor(containerX) + horizontalPadding + squareWidth / 2;
        case "center":
            return Math.floor(containerX + containerWidth / 2);
        case "right":
            return Math.floor(containerX + containerWidth) - horizontalPadding - squareWidth / 2;
    }
};
exports.getSquareXPosFromAlign = getSquareXPosFromAlign;
const getSquareWidth = (maxSize, containerHeight, verticalPadding) => Math.min(maxSize, containerHeight - verticalPadding * 2);
exports.getSquareWidth = getSquareWidth;
const pointIsWithinBB = (x, y, bb) => bb.x1 <= x && x <= bb.x2 && bb.y1 <= y && y <= bb.y2;
exports.pointIsWithinBB = pointIsWithinBB;
const EditPencil = (props) => {
    const fg = props.fgColor ?? "currentColor";
    return (React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929", stroke: fg, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" }),
        React.createElement("path", { d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z", stroke: fg, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" })));
};
exports.EditPencil = EditPencil;
const Checkmark = (props) => {
    const fg = props.fgColor ?? "currentColor";
    return (React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M19 6L10.3802 17L5.34071 11.8758", vectorEffect: "non-scaling-stroke", stroke: fg, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })));
};
exports.Checkmark = Checkmark;
function useDebouncedMemo(factory, deps, time) {
    const [state, setState] = React.useState(factory);
    const mountedRef = React.useRef(true);
    React.useEffect(() => () => {
        mountedRef.current = false;
    }, []);
    const debouncedSetState = React.useRef((0, debounce_js_1.default)(x => {
        if (mountedRef.current) {
            setState(x);
        }
    }, time));
    React.useLayoutEffect(() => {
        if (mountedRef.current) {
            debouncedSetState.current(() => factory());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return state;
}
exports.useDebouncedMemo = useDebouncedMemo;
// Shamelessly inline direction to avoid conflicts with 1.0 and 2.0.
const rtlRange = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
const ltrRange = "A-Za-z\u00C0-\u00D6\u00D8-\u00F6" +
    "\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C" +
    "\uFE00-\uFE6F\uFEFD-\uFFFF";
/* eslint-disable no-misleading-character-class */
const rtl = new RegExp("^[^" + ltrRange + "]*[" + rtlRange + "]");
/* eslint-enable no-misleading-character-class */
function direction(value) {
    return rtl.test(value) ? "rtl" : "not-rtl";
}
exports.direction = direction;
let scrollbarWidthCache = undefined;
function getScrollBarWidth() {
    if (typeof document === "undefined")
        return 0;
    if (scrollbarWidthCache !== undefined)
        return scrollbarWidthCache;
    const inner = document.createElement("p");
    inner.style.width = "100%";
    inner.style.height = "200px";
    const outer = document.createElement("div");
    outer.id = "testScrollbar";
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.append(inner);
    document.body.append(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
        w2 = outer.clientWidth;
    }
    outer.remove();
    scrollbarWidthCache = w1 - w2;
    return scrollbarWidthCache;
}
exports.getScrollBarWidth = getScrollBarWidth;
// Dear future reader,
// This dumb hook is to make sure if the inputState changes, that effectively behaves like an instant "setState" call.
// This is useful in a wide variety of situations. I'm too dumb to know if this is a good idea or a really dumb one.
// I can't tell. It's like poes law but for code.
//
// I'm sorry.
const empty = Symbol();
function useStateWithReactiveInput(inputState) {
    // When [0] is not empty we will return it, [1] is always the last value we saw
    const inputStateRef = React.useRef([empty, inputState]);
    if (inputStateRef.current[1] !== inputState) {
        // it changed, we must use thee!
        inputStateRef.current[0] = inputState;
    }
    inputStateRef.current[1] = inputState;
    const [state, setState] = React.useState(inputState);
    // crimes against humanity here
    const [, forceRender] = React.useState();
    const setStateOuter = React.useCallback(nv => {
        // this takes care of the case where the inputState was set, then setState gets called again but back to what
        // the state was before the inputState changed. Since the useState effect wont trigger a render in this case
        // we need to be very naughty and force it to see the change. Technically this may not be needed some chunk of
        // the time (in fact most of it) but checking for it is likely to be more expensive than just over-doing it
        const s = inputStateRef.current[0];
        if (s !== empty) {
            nv = typeof nv === "function" ? nv(s) : nv;
            if (nv === s)
                return; // they are setting it to what the inputState is anyway so we can just do nothing
        }
        if (s !== empty)
            forceRender({});
        setState(pv => {
            if (typeof nv === "function") {
                return nv(s === empty ? pv : s);
            }
            return nv;
        });
        inputStateRef.current[0] = empty;
    }, []);
    const onEmpty = React.useCallback(() => {
        inputStateRef.current[0] = empty;
        forceRender({});
    }, []);
    return [inputStateRef.current[0] === empty ? state : inputStateRef.current[0], setStateOuter, onEmpty];
}
exports.useStateWithReactiveInput = useStateWithReactiveInput;
function makeAccessibilityStringForArray(arr) {
    // this is basically just .join(", ") but checks to make sure it is not going to allocate
    // a string that is so large it might crash the browser
    if (arr.length === 0) {
        return "";
    }
    let index = 0;
    let count = 0;
    for (const str of arr) {
        count += str.length;
        if (count > 10000)
            break;
        index++;
    }
    return arr.slice(0, index).join(", ");
}
exports.makeAccessibilityStringForArray = makeAccessibilityStringForArray;
function useDeepMemo(value) {
    const ref = React.useRef(value);
    if (!(0, support_js_1.deepEqual)(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}
exports.useDeepMemo = useDeepMemo;
//# sourceMappingURL=utils.js.map