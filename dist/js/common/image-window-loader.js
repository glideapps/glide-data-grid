"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _support = require("./support");

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ImageWindowLoader = /*#__PURE__*/function () {
  function ImageWindowLoader() {
    var _this = this;

    _classCallCheck(this, ImageWindowLoader);

    _defineProperty(this, "imageLoaded", function () {
      return undefined;
    });

    _defineProperty(this, "loadedLocations", []);

    _defineProperty(this, "window", {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });

    _defineProperty(this, "cache", {});

    _defineProperty(this, "sendLoaded", (0, _throttle.default)(function () {
      _this.imageLoaded(_this.loadedLocations);

      _this.loadedLocations = [];
    }, 20));

    _defineProperty(this, "clearOutOfWindow", (0, _debounce.default)(function () {
      var old = _this.cache;
      _this.cache = {};
      Object.values(old).filter(function (v) {
        return _this.isInWindow(v.col, v.row);
      }).forEach(function (v) {
        _this.cache["".concat(v.url)] = v;
      });
    }, 600));
  }

  _createClass(ImageWindowLoader, [{
    key: "isInWindow",
    value: function isInWindow(col, row) {
      var w = this.window;
      return col >= w.x && col <= w.x + w.width && row >= w.y && row <= w.y + w.height;
    }
  }, {
    key: "setCallback",
    value: function setCallback(imageLoaded) {
      this.imageLoaded = imageLoaded;
    }
  }, {
    key: "setWindow",
    value: function setWindow(window) {
      if (this.window.x === window.x && this.window.y === window.y && this.window.width === window.width && this.window.height === window.height) return;
      this.window = window;
      this.clearOutOfWindow();
    }
  }, {
    key: "loadOrGetImage",
    value: function loadOrGetImage(url, col, row) {
      var _this2 = this;

      var key = "".concat(url);
      var current = this.cache[key];

      if (current !== undefined) {
        current.col = col;
        current.row = row;
        return current.img;
      } else {
        var img = new Image(); // FIXME
        // img.src =
        //     massageImageUrl(
        //         url,
        //         {
        //             height: 34,
        //             thumbnail: true,
        //         },
        //         undefined
        //     ) ?? url;

        img.src = url;
        var result = {
          img: undefined,
          col: col,
          row: row,
          url: url
        };

        var load = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var errored;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    errored = false;
                    _context.prev = 1;
                    _context.next = 4;
                    return img.decode();

                  case 4:
                    _context.next = 9;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](1);
                    errored = true;

                  case 9:
                    if (_this2.cache[key] !== undefined && !errored) {
                      result.img = img;

                      _this2.loadedLocations.push([col, row]);

                      _this2.sendLoaded();
                    }

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[1, 6]]);
          }));

          return function load() {
            return _ref.apply(this, arguments);
          };
        }();

        (0, _support.dontAwait)(load());
        this.cache[key] = result;
        return undefined;
      }
    }
  }]);

  return ImageWindowLoader;
}();

var _default = ImageWindowLoader;
exports.default = _default;