"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _browserDetect = require("../common/browser-detect");

var React = _interopRequireWildcard(require("react"));

var _scrollRegionStyle = require("./scroll-region-style");

var _reactVirtualizedAutoSizer = _interopRequireDefault(require("react-virtualized-auto-sizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScrollRegion = function ScrollRegion(p) {
  var className = p.className,
      scrollWidth = p.scrollWidth,
      scrollHeight = p.scrollHeight,
      style = p.style,
      children = p.children,
      update = p.update,
      scrollToEnd = p.scrollToEnd,
      scrollRef = p.scrollRef,
      draggable = p.draggable;
  var innerStyle = React.useMemo(function () {
    return {
      width: scrollWidth,
      height: scrollHeight,
      contain: "size paint layout"
    };
  }, [scrollWidth, scrollHeight]);
  var scroller = React.useRef(null);
  var onScroll = React.useCallback(function () {
    var el = scroller.current;
    if (el === null) return;
    update({
      clientHeight: el.clientHeight - (_browserDetect.isFirefox ? 4 : 0),
      clientWidth: el.clientWidth,
      scrollLeft: Math.max(0, el.scrollLeft),
      scrollTop: Math.max(0, el.scrollTop)
    });
  }, [update]);
  React.useEffect(function () {
    var el = scroller.current;
    if (el === null || scrollToEnd !== true) return;
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [scrollToEnd]);
  var setRefs = React.useCallback(function (instance) {
    scroller.current = instance;

    if (scrollRef !== undefined) {
      scrollRef.current = instance;
    }
  }, [scrollRef]);
  var lastProps = React.useRef();
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(_reactVirtualizedAutoSizer.default, null, function (props) {
    var _lastProps$current, _lastProps$current2;

    if (props.width === 0 || props.height === 0) return null;

    if (((_lastProps$current = lastProps.current) === null || _lastProps$current === void 0 ? void 0 : _lastProps$current.height) !== props.height || ((_lastProps$current2 = lastProps.current) === null || _lastProps$current2 === void 0 ? void 0 : _lastProps$current2.width) !== props.width) {
      window.setTimeout(onScroll, 0);
      lastProps.current = props;
    }

    return /*#__PURE__*/React.createElement(_scrollRegionStyle.ScrollRegionStyle, null, /*#__PURE__*/React.createElement("div", {
      className: "dvn-underlay"
    }, children), /*#__PURE__*/React.createElement("div", {
      ref: setRefs,
      style: props,
      draggable: draggable,
      className: "dvn-scroller " + className,
      onScroll: onScroll
    }, /*#__PURE__*/React.createElement("div", {
      className: "dvn-scroll-inner",
      style: innerStyle
    })));
  }));
};

var _default = ScrollRegion;
exports.default = _default;