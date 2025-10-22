import * as React from "react";
function useRefState() {
    const [refState, setRefState] = React.useState();
    return [refState ?? undefined, setRefState];
}
export function useStayOnScreen() {
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
//# sourceMappingURL=use-stay-on-screen.js.map