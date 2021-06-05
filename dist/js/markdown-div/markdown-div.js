"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _marked = _interopRequireDefault(require("marked"));

var _markdownContainer = require("./private/markdown-container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var MarkdownDiv = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MarkdownDiv, _React$PureComponent);

  var _super = _createSuper(MarkdownDiv);

  function MarkdownDiv() {
    var _this;

    _classCallCheck(this, MarkdownDiv);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "targetElement", null);

    _defineProperty(_assertThisInitialized(_this), "containerRefHook", function (element) {
      _this.targetElement = element;

      _this.renderMarkdownIntoDiv();
    });

    return _this;
  }

  _createClass(MarkdownDiv, [{
    key: "renderMarkdownIntoDiv",
    value: function renderMarkdownIntoDiv() {
      var targetElement = this.targetElement;
      if (targetElement === null) return;
      var _this$props = this.props,
          contents = _this$props.contents,
          linkOnClick = _this$props.linkOnClick,
          createNode = _this$props.createNode;
      var innerHTML = (0, _marked.default)(contents);
      var childRange = document.createRange();
      childRange.selectNodeContents(targetElement);
      childRange.deleteContents();
      var newChild = createNode === null || createNode === void 0 ? void 0 : createNode(innerHTML);

      if (newChild === undefined) {
        var childDoc = document.createElement("template");
        childDoc.innerHTML = innerHTML;
        newChild = childDoc.content;
      }

      targetElement.appendChild(newChild);

      if (linkOnClick !== undefined) {
        var tags = targetElement.getElementsByTagName("a");

        var _loop = function _loop(i) {
          var tag = tags[i];

          tag.onclick = function () {
            linkOnClick(tag.href);
          };
        };

        for (var i = 0; i < tags.length; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      // Doing this in the ref hook works great when we first render, but never again.
      // This only works great after the first render, but not in the first render.
      // Putting the two together makes the full solution.
      this.renderMarkdownIntoDiv();
      return /*#__PURE__*/_react.default.createElement(_markdownContainer.MarkdownContainer, {
        ref: this.containerRefHook
      });
    }
  }]);

  return MarkdownDiv;
}(_react.default.PureComponent);

exports.default = MarkdownDiv;