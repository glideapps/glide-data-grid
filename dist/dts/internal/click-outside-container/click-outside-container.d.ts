import * as React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onClickOutside: () => void;
    isOutsideClick?: (event: MouseEvent | TouchEvent) => boolean;
}
export default class ClickOutsideContainer extends React.PureComponent<Props> {
    private wrapperRef;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private clickOutside;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=click-outside-container.d.ts.map