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
exports.useStayOnScreen = void 0;
const React = __importStar(require("react"));
function useRefState() {
    const [refState, setRefState] = React.useState();
    return [refState ?? undefined, setRefState];
}
function useStayOnScreen() {
    const [ref, setRef] = useRefState();
    const [xOffset, setXOffset] = React.useState(0);
    const [isIntersecting, setIsIntersecting] = React.useState(true);
    React.useLayoutEffect(() => {
        if (ref === undefined)
            return;
        if (!("IntersectionObserver" in window))
            return;
        const observer = new IntersectionObserver(ents => {
            if (ents.length === 0)
                return;
            setIsIntersecting(ents[0].isIntersecting);
        }, { threshold: 1 });
        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref]);
    React.useEffect(() => {
        if (isIntersecting || ref === undefined)
            return;
        let rafHandle;
        const fn = () => {
            const { right: refRight } = ref.getBoundingClientRect();
            setXOffset(cv => Math.min(cv + window.innerWidth - refRight - 10, 0));
            rafHandle = requestAnimationFrame(fn);
        };
        rafHandle = requestAnimationFrame(fn);
        return () => {
            if (rafHandle !== undefined) {
                cancelAnimationFrame(rafHandle);
            }
        };
    }, [ref, isIntersecting]);
    const style = React.useMemo(() => {
        return { transform: `translateX(${xOffset}px)` };
    }, [xOffset]);
    return {
        ref: setRef,
        style,
    };
}
exports.useStayOnScreen = useStayOnScreen;
//# sourceMappingURL=use-stay-on-screen.js.map