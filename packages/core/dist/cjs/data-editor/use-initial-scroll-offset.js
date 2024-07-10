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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInitialScrollOffset = void 0;
const React = __importStar(require("react"));
const utils_js_1 = require("../common/utils.js");
// shamelessly stolen and modified from: https://github.com/theKashey/use-callback-ref
// MIT License https://github.com/theKashey/use-callback-ref/tree/master?tab=MIT-1-ov-file#readme
function useCallbackRef(initialValue, callback) {
    const [ref] = React.useState(() => ({
        value: initialValue,
        callback,
        facade: {
            get current() {
                return ref.value;
            },
            set current(value) {
                const last = ref.value;
                if (last !== value) {
                    ref.value = value;
                    ref.callback(value, last);
                }
            },
        },
    }));
    ref.callback = callback;
    return ref.facade;
}
function useInitialScrollOffset(scrollOffsetX, scrollOffsetY, rowHeight, visibleRegionRef, onDidScroll) {
    const [visibleRegionY, visibleRegionTy] = React.useMemo(() => {
        return [
            scrollOffsetY !== undefined && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0,
            scrollOffsetY !== undefined && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0,
        ];
    }, [scrollOffsetY, rowHeight]);
    const visibleRegionInput = React.useMemo(() => ({
        x: visibleRegionRef.current.x,
        y: visibleRegionY,
        width: visibleRegionRef.current.width ?? 1,
        height: visibleRegionRef.current.height ?? 1,
        // tx: 'TODO',
        ty: visibleRegionTy,
    }), [visibleRegionRef, visibleRegionTy, visibleRegionY]);
    const [visibleRegion, setVisibleRegion, empty] = (0, utils_js_1.useStateWithReactiveInput)(visibleRegionInput);
    const onDidScrollRef = React.useRef(onDidScroll);
    onDidScrollRef.current = onDidScroll;
    const scrollRef = useCallbackRef(null, newVal => {
        if (newVal !== null && scrollOffsetY !== undefined) {
            newVal.scrollTop = scrollOffsetY;
        }
        else if (newVal !== null && scrollOffsetX !== undefined) {
            newVal.scrollLeft = scrollOffsetX;
        }
    });
    const vScrollReady = (visibleRegion.height ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetY !== undefined && scrollRef.current !== null && vScrollReady) {
            if (scrollRef.current.scrollTop === scrollOffsetY)
                return;
            scrollRef.current.scrollTop = scrollOffsetY;
            if (scrollRef.current.scrollTop !== scrollOffsetY) {
                empty();
            }
            onDidScrollRef.current();
        }
    }, [scrollOffsetY, vScrollReady, empty, scrollRef]);
    const hScrollReady = (visibleRegion.width ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetX !== undefined && scrollRef.current !== null && hScrollReady) {
            if (scrollRef.current.scrollLeft === scrollOffsetX)
                return;
            scrollRef.current.scrollLeft = scrollOffsetX;
            if (scrollRef.current.scrollLeft !== scrollOffsetX) {
                empty();
            }
            onDidScrollRef.current();
        }
    }, [scrollOffsetX, hScrollReady, empty, scrollRef]);
    return {
        visibleRegion,
        setVisibleRegion,
        scrollRef,
    };
}
exports.useInitialScrollOffset = useInitialScrollOffset;
//# sourceMappingURL=use-initial-scroll-offset.js.map