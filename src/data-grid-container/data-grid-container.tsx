import { styled } from "../common/styles";
import * as React from "react";

interface WrapperProps {
    width: number;
    height: number;
}

const Wrapper = styled.div<WrapperProps>`
    > :first-child {
        width: ${p => p.width}px;
        height: ${p => p.height}px;
    }
`;

interface Props extends WrapperProps, React.HTMLAttributes<HTMLDivElement> {}

const DataGridContainer: React.FunctionComponent<React.PropsWithChildren<Props>> = p => {
    const { width, height, children, ...rest } = p;
    return (
        <Wrapper width={width} height={height} {...rest}>
            {children}
        </Wrapper>
    );
};

export default DataGridContainer;
