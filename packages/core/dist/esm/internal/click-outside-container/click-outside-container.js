import * as React from "react";
export default class ClickOutsideContainer extends React.PureComponent {
    wrapperRef = React.createRef();
    componentDidMount() {
        document.addEventListener("touchend", this.clickOutside, true);
        document.addEventListener("mousedown", this.clickOutside, true);
        document.addEventListener("contextmenu", this.clickOutside, true);
    }
    componentWillUnmount() {
        document.removeEventListener("touchend", this.clickOutside, true);
        document.removeEventListener("mousedown", this.clickOutside, true);
        document.removeEventListener("contextmenu", this.clickOutside, true);
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
        const { onClickOutside, isOutsideClick, ...rest } = this.props;
        return (React.createElement("div", { ...rest, ref: this.wrapperRef }, this.props.children));
    }
}
//# sourceMappingURL=click-outside-container.js.map