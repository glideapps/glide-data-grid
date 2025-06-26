import * as React from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    onClickOutside: () => void;
    isOutsideClick?: (event: MouseEvent | TouchEvent) => boolean;
    // If provided, it will use the provided element as the event target
    // instead of document.
    customEventTarget?: HTMLElement | Window | Document;
}

export default class ClickOutsideContainer extends React.PureComponent<Props> {
    private wrapperRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        const eventTarget = this.props.customEventTarget ?? document;
        eventTarget.addEventListener("touchend", this.clickOutside, true);
        eventTarget.addEventListener("mousedown", this.clickOutside, true);
        eventTarget.addEventListener("contextmenu", this.clickOutside, true);
    }

    public componentWillUnmount() {
        const eventTarget = this.props.customEventTarget ?? document;
        eventTarget.removeEventListener("touchend", this.clickOutside, true);
        eventTarget.removeEventListener("mousedown", this.clickOutside, true);
        eventTarget.removeEventListener("contextmenu", this.clickOutside, true);
    }

    private clickOutside = (event: Event) => {
        if (this.props.isOutsideClick && !this.props.isOutsideClick(event as MouseEvent | TouchEvent)) {
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
        const { onClickOutside, isOutsideClick, customEventTarget, ...rest } = this.props;
        return (
            <div {...rest} ref={this.wrapperRef}>
                {this.props.children}
            </div>
        );
    }
}
