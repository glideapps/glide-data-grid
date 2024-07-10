"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
class ClickOutsideContainer extends React.PureComponent {
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
exports.default = ClickOutsideContainer;
//# sourceMappingURL=click-outside-container.js.map