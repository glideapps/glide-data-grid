import * as React from "react";

function useRefState(): [HTMLElement | undefined, React.RefCallback<HTMLElement | null>] {
    const [refState, setRefState] = React.useState<HTMLElement | undefined>();
    const refFunc = (el: null) => {
        if (el === null) {
            setRefState(undefined);
        } else {
            setRefState(el);
        }
    };
    return [refState, refFunc];
}

interface StayOnScreen {
    ref: React.RefCallback<HTMLElement | null>;
    style: React.CSSProperties;
}

export function useStayOnScreen(): StayOnScreen {
    const [ref, setRef] = useRefState();
    const [xOffset, setXOffset] = React.useState(0);
    const [isIntersecting, setIsIntersecting] = React.useState(true);

    React.useLayoutEffect(() => {
        if (ref === undefined) return;
        if (!("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            ents => {
                if (ents.length < 1) return;
                const { isIntersecting } = ents[0];
                setIsIntersecting(isIntersecting);
            },
            { threshold: 1 }
        );
        observer.observe(ref);

        return () => observer.disconnect();
    }, [ref]);

    React.useEffect(() => {
        if (isIntersecting || ref === undefined) return;

        let rafHandle: number | undefined;
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
