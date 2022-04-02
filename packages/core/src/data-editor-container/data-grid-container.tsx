import { styled } from "../common/styles";
import * as React from "react";

interface WrapperProps {
    width: number | string;
    height: number | string;
}

function toCss(x: number | string) {
    if (typeof x === "string") return x;
    return `${x}px`;
}

const Wrapper = styled.div<{ innerWidth: string; innerHeight: string }>`
    overflow: hidden;
    position: relative;

    min-width: 10px;
    min-height: 10px;
    max-width: 100%;
    max-height: 100%;

    width: ${p => p.innerWidth};
    height: ${p => p.innerHeight};

    overflow: hidden;
    overflow: clip;

    contain: strict;

    > :first-child {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`;

interface Props extends WrapperProps, React.HTMLAttributes<HTMLDivElement> {}

export const DataEditorContainer: React.FunctionComponent<React.PropsWithChildren<Props>> = p => {
    const { width, height, children, ...rest } = p;
    return (
        <Wrapper innerHeight={toCss(height)} innerWidth={toCss(width)} {...rest}>
            {children}
        </Wrapper>
    );
};
