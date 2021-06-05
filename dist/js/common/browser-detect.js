"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefox = exports.browserIsOSX = exports.browserIsSafari = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userAgent = window.navigator.userAgent;

var Lazy = /*#__PURE__*/function () {
  function Lazy(fn) {
    _classCallCheck(this, Lazy);

    _defineProperty(this, "fn", void 0);

    _defineProperty(this, "val", void 0);

    this.fn = fn;
  }

  _createClass(Lazy, [{
    key: "value",
    get: function get() {
      var _this$val;

      return (_this$val = this.val) !== null && _this$val !== void 0 ? _this$val : this.val = this.fn();
    }
  }]);

  return Lazy;
}();

function lazy(fn) {
  return new Lazy(fn);
}

var browserIsSafari = userAgent.indexOf("Mac OS") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 0; // next.js apps don't have window available at import time, so this will fail if its not lazy.

exports.browserIsSafari = browserIsSafari;
var browserIsOSX = lazy(function () {
  return window.navigator.platform.toLowerCase().startsWith("mac");
});
exports.browserIsOSX = browserIsOSX;
var isFirefox = userAgent.includes("Firefox");
exports.isFirefox = isFirefox;