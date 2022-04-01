import { styled } from "../common/styles";
import * as React from "react";

interface WrapperProps {
    width: number | string;
    height: number | string;
}

const Wrapper = styled.div`
    overflow: hidden;
    position: relative;

    min-width: 10px;
    min-height: 10px;

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
        <Wrapper style={{ width, height }} {...rest}>
            {children}
        </Wrapper>
    );
};
