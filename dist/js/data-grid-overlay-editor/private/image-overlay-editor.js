"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _imageOverlayEditorStyle = require("./image-overlay-editor-style");

var _reactResponsiveCarousel = require("react-responsive-carousel");

var _utils = require("../../common/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import "react-responsive-carousel/lib/styles/carousel.min.css";
var ImageOverlayEditor = function ImageOverlayEditor(p) {
  var urls = p.urls,
      canWrite = p.canWrite,
      onKeyDown = p.onKeyDown,
      onEditClick = p.onEditClick,
      renderImage = p.renderImage;
  var filtered = urls.filter(function (u) {
    return u !== "";
  });

  if (filtered.length === 0) {
    return null;
  }

  var allowMove = filtered.length > 1;
  return /*#__PURE__*/React.createElement(_imageOverlayEditorStyle.ImageOverlayEditorStyle, {
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(_reactResponsiveCarousel.Carousel, {
    showArrows: allowMove,
    showThumbs: false,
    swipeable: allowMove,
    emulateTouch: allowMove,
    infiniteLoop: allowMove
  }, filtered.map(function (url) {
    var _renderImage;

    var innerContent = (_renderImage = renderImage === null || renderImage === void 0 ? void 0 : renderImage(url)) !== null && _renderImage !== void 0 ? _renderImage : /*#__PURE__*/React.createElement("img", {
      draggable: false,
      src: url
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "centering-container",
      key: url
    }, innerContent);
  })), canWrite && onEditClick && /*#__PURE__*/React.createElement("button", {
    className: "edit-icon",
    onClick: onEditClick
  }, /*#__PURE__*/React.createElement(_utils.EditPencil, null)), /*#__PURE__*/React.createElement("textarea", {
    autoFocus: true,
    onKeyDown: onKeyDown
  }));
};

var _default = ImageOverlayEditor;
exports.default = _default;