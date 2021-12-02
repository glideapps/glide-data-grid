import * as React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onClickOutside: () => void;
    stopPropagation?: boolean;
}

export default class ClickOutsideContainer extends React.PureComponent<Props> {
    private wrapperRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        document.addEventListener(this.props.stopPropagation === true ? "click" : "mousedown", this.clickOutside, true);
        document.addEventListener("contextmenu", this.clickOutside, true);
    }

    public componentWillUnmount() {
        document.removeEventListener(this.props.stopPropagation === true ? "click" : "mousedown", this.clickOutside);
        document.removeEventListener("contextmenu", this.clickOutside);
    }

    private clickOutside = (event: MouseEvent) => {
        if (this.wrapperRef.current !== null && !this.wrapperRef.current.contains(event.target as Node | null)) {
            let node = event.target as Element | null;
            while (node !== null) {
                if (node.classList.contains("click-outside-ignore")) {
                    return;
                }

                node = node.parentElement;
            }
            if (this.props.stopPropagation === true) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.props.onClickOutside();
        }
    };

    public render(): React.ReactNode {
        const { onClickOutside, stopPropagation, ...rest } = this.props;
        return (
            <div {...rest} ref={this.wrapperRef}>
                {this.props.children}
            </div>
        );
    }
}
