import * as React from "react";
export default class ClickOutsideContainer extends React.PureComponent {
    wrapperRef = React.createRef();
    componentDidMount() {
        const eventTarget = this.props.customEventTarget ?? document;
        eventTarget.addEventListener("pointerdown", this.clickOutside, true);
        eventTarget.addEventListener("contextmenu", this.clickOutside, true);
    }
    componentWillUnmount() {
        const eventTarget = this.props.customEventTarget ?? document;
        eventTarget.removeEventListener("pointerdown", this.clickOutside, true);
        eventTarget.removeEventListener("contextmenu", this.clickOutside, true);
    }
    clickOutside = (event) => {
        if (this.props.isOutsideClick && !this.props.isOutsideClick(event)) {
            return;
        }
        if (this.wrapperRef.current !== null && !this.wrapperRef.current.contains(event.target)) {
            let node = event.target;
            while (node !== null) {
                if (node.classList.contains("click-outside-ignore")) {
                    return;
                }
                node = node.parentElement;
            }
            this.props.onClickOutside();
        }
    };
    render() {
        const { onClickOutside, isOutsideClick, customEventTarget, ...rest } = this.props;
        return (React.createElement("div", { ...rest, ref: this.wrapperRef }, this.props.children));
    }
}
//# sourceMappingURL=click-outside-container.js.map