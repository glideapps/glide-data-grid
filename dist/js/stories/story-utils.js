"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuilderThemeWrapper = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

require("react-responsive-carousel/lib/styles/carousel.min.css");

var _styles = require("../common/styles");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    height: 100vh;\n\n    & > .content {\n        display: block;\n\n        width: ", "px;\n        min-height: ", "px;\n        align-self: center;\n\n        position: relative;\n\n        text-rendering: optimizeLegibility;\n        -webkit-font-smoothing: antialiased;\n\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\n        user-select: none;\n\n        box-sizing: border-box;\n\n        *,\n        *::before,\n        *::after {\n            box-sizing: inherit;\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BuilderWrapper = _styledComponents.default.div(_templateObject(), function (p) {
  return p.width;
}, function (p) {
  return p.height;
});

var BuilderThemeWrapper = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(BuilderThemeWrapper, _React$PureComponent);

  var _super = _createSuper(BuilderThemeWrapper);

  function BuilderThemeWrapper() {
    var _this;

    _classCallCheck(this, BuilderThemeWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "builderTheme", (0, _styles.getBuilderTheme)());

    return _this;
  }

  _createClass(BuilderThemeWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          context = _this$props.context,
          rest = _objectWithoutProperties(_this$props, ["context"]);

      return /*#__PURE__*/React.createElement(_styledComponents.ThemeProvider, {
        theme: this.builderTheme
      }, /*#__PURE__*/React.createElement(BuilderWrapper, rest, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, this.props.children)), /*#__PURE__*/React.createElement("div", {
        id: "portal"
      }));
    }
  }]);

  return BuilderThemeWrapper;
}(React.PureComponent); // export function permuteAll(
//   allOptions: Record<string, any[]>,
//   combine: boolean = true
// ): any[] {
//   let result: any[] = [
//     {
//       name: "",
//     },
//   ];
//   const keys = Object.keys(allOptions);
//   keys.forEach((o) => {
//     result = reduceOption(allOptions[o], o, result, combine);
//   });
//   return result;
// }
// export function permuteSeparate(allOptions: Record<string, any[]>): any[] {
//   return permuteAll(allOptions, false);
// }
// export const loremIpsum =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
// const DummyAppEnv: AppEnvironment = ({
//   // If this gets used we are going to crash anyway
// } as unknown) as AppEnvironment;
// export const DummyRenderEnv: RenderEnvironment = new RenderEnvironment(
//   DummyAppEnv,
//   {
//     displayContext: "default",
//     sizeClass: "phone",
//     needsRerender: false,
//   }
// );


exports.BuilderThemeWrapper = BuilderThemeWrapper;