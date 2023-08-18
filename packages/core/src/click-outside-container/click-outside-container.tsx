import * as React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onClickOutside: () => void;
    isOutsideClick?: (event: MouseEvent | TouchEvent) => boolean;
}

export default class ClickOutsideContainer extends React.PureComponent<Props> {
    private wrapperRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        document.addEventListener("touchend", this.clickOutside, true);
        document.addEventListener("mousedown", this.clickOutside, true);
        document.addEventListener("contextmenu", this.clickOutside, true);
    }

    public componentWillUnmount() {
        document.removeEventListener("touchend", this.clickOutside, true);
        document.removeEventListener("mousedown", this.clickOutside, true);
        document.removeEventListener("contextmenu", this.clickOutside, true);
    }

    private clickOutside = (event: MouseEvent | TouchEvent) => {
        if (this.props.isOutsideClick && !this.props.isOutsideClick(event)) {
            return;
        }
        if (this.wrapperRef.current !== null && !this.wrapperRef.current.contains(event.target as Node | null)) {
            let node = event.target as Element | null;
            while (node !== null) {
                if (node.classList.contains("click-outside-ignore")) {
                    return;
                }

                node = node.parentElement;
            }
            this.props.onClickOutside();
        }
    };

    public render(): React.ReactNode {
        const { onClickOutside, isOutsideClick, ...rest } = this.props;
        return (
            <div {...rest} ref={this.wrapperRef}>
                {this.props.children}
            </div>
        );
    }
}
