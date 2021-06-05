"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _imageWindowLoader = _interopRequireDefault(require("../common/image-window-loader"));

var _dataGridLib = require("./data-grid-lib");

var _dataGridTypes = require("./data-grid-types");

var _support = require("../common/support");

var _dataGridSprites = require("./data-grid-sprites");

var _utils = require("../common/utils");

var _range = _interopRequireDefault(require("lodash/range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DataGrid = function DataGrid(p, forwardedRef) {
  var _p$translateX, _p$translateY, _imageLoader$current2, _eventTargetRef$curre;

  var width = p.width,
      height = p.height,
      className = p.className,
      theme = p.theme,
      columns = p.columns,
      cellXOffsetReal = p.cellXOffset,
      cellYOffset = p.cellYOffset,
      headerHeight = p.headerHeight,
      rowHeight = p.rowHeight,
      rows = p.rows,
      getCellContent = p.getCellContent,
      onHeaderMenuClick = p.onHeaderMenuClick,
      selectedRows = p.selectedRows,
      selectedCell = p.selectedCell,
      selectedColumns = p.selectedColumns,
      firstColSticky = p.firstColSticky,
      onMouseDown = p.onMouseDown,
      onMouseUp = p.onMouseUp,
      onMouseMove = p.onMouseMove,
      onItemHovered = p.onItemHovered,
      dragAndDropState = p.dragAndDropState,
      onKeyDown = p.onKeyDown,
      onKeyUp = p.onKeyUp,
      canvasRef = p.canvasRef,
      onDragStart = p.onDragStart,
      eventTargetRef = p.eventTargetRef,
      isDraggable = p.isDraggable,
      allowResize = p.allowResize,
      prelightCells = p.prelightCells,
      drawCustomCell = p.drawCustomCell,
      onCellFocused = p.onCellFocused;
  var translateX = (_p$translateX = p.translateX) !== null && _p$translateX !== void 0 ? _p$translateX : 0;
  var translateY = (_p$translateY = p.translateY) !== null && _p$translateY !== void 0 ? _p$translateY : 0;
  var cellXOffset = Math.max(0, Math.min(columns.length - 1, cellXOffsetReal));
  var ref = React.useRef(null);
  var imageLoader = React.useRef();
  var canBlit = React.useRef();
  var damageRegion = React.useRef(undefined);
  var lastBlitData = React.useRef({
    cellXOffset: cellXOffset,
    cellYOffset: cellYOffset,
    translateX: translateX,
    translateY: translateY
  });

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hoveredItem = _React$useState2[0],
      setHoveredItem = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      hoveredOnEdge = _React$useState4[0],
      setHoveredOnEdge = _React$useState4[1];

  React.useEffect(function () {
    (0, _support.dontAwait)((0, _dataGridSprites.buildSpriteMap)(theme));
  }, [theme]);
  var getBoundsForItem = React.useCallback(function (canvas, col, row) {
    var rect = canvas.getBoundingClientRect();
    var result = {
      x: rect.x,
      y: rect.y + headerHeight + translateY,
      width: 0,
      height: 0
    };
    var effectiveCols = (0, _dataGridLib.getEffectiveColumns)(columns, cellXOffset, width, firstColSticky, undefined, translateX);

    var _iterator = _createForOfIteratorHelper(effectiveCols),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        result.width = c.width + 1;

        if (c.sourceIndex === col) {
          if (!c.sticky) result.x += translateX;
          break;
        }

        result.x += c.width;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (row === undefined) {
      result.y = rect.y;
      result.height = headerHeight;
    } else {
      for (var r = cellYOffset; r < row; r++) {
        result.y += typeof rowHeight === "number" ? rowHeight : rowHeight(r);
      }

      result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
    }

    return result;
  }, [cellXOffset, cellYOffset, columns, firstColSticky, headerHeight, rowHeight, width, translateX, translateY]);
  var getMouseArgsForPosition = React.useCallback(function (canvas, posX, posY, ev) {
    var rect = canvas.getBoundingClientRect();
    var x = posX - rect.left;
    var y = posY - rect.top;
    var edgeDetectionBuffer = 5;
    var effectiveCols = (0, _dataGridLib.getEffectiveColumns)(columns, cellXOffset, width, firstColSticky, undefined, translateX); // -1 === off right edge

    var col = (0, _dataGridLib.getColumnIndexForX)(x, effectiveCols, translateX); // -1: header or above
    // undefined: offbottom

    var row = (0, _dataGridLib.getRowIndexForY)(y, headerHeight, rows, rowHeight, cellYOffset, translateY);
    var shiftKey = (ev === null || ev === void 0 ? void 0 : ev.shiftKey) === true;
    var result;

    if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
      var horizontal = x > width ? -1 : x < 0 ? 1 : 0;
      var vertical = y > height ? 1 : y < 0 ? -1 : 0;
      result = {
        kind: "out-of-bounds",
        location: [col !== -1 ? col : x < 0 ? 0 : columns.length - 1, row !== null && row !== void 0 ? row : rows - 1],
        direction: [horizontal, vertical],
        shiftKey: shiftKey
      };
    } else if (row === -1) {
      var bounds = getBoundsForItem(canvas, col, undefined);
      var firstAllowed = firstColSticky ? 1 : 0;
      var isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer && col >= firstAllowed;
      var previousCol = col - 1;

      if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= firstAllowed) {
        isEdge = true;
        bounds = getBoundsForItem(canvas, previousCol, undefined);
        result = {
          kind: "header",
          location: [previousCol, undefined],
          bounds: bounds,
          isEdge: isEdge,
          shiftKey: shiftKey
        };
      } else {
        result = {
          kind: "header",
          location: [col, undefined],
          bounds: bounds,
          isEdge: isEdge,
          shiftKey: shiftKey
        };
      }
    } else {
      var _bounds = getBoundsForItem(canvas, col, row);

      var _isEdge = _bounds !== undefined && _bounds.x + _bounds.width - posX < edgeDetectionBuffer;

      result = {
        kind: "cell",
        location: [col, row],
        bounds: _bounds,
        isEdge: _isEdge,
        shiftKey: shiftKey
      };
    }

    return result;
  }, [cellXOffset, cellYOffset, columns, firstColSticky, getBoundsForItem, headerHeight, height, rowHeight, rows, width, translateX, translateY]);

  function isSameItem(item, other) {
    if (item === other) return true;
    return (item === null || item === void 0 ? void 0 : item.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (item === null || item === void 0 ? void 0 : item.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (item === null || item === void 0 ? void 0 : item.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]);
  }

  var hoveredCol;

  if ((hoveredItem === null || hoveredItem === void 0 ? void 0 : hoveredItem[0]) !== undefined && hoveredItem[1] === undefined) {
    hoveredCol = hoveredItem[0];
  }

  var drawCell = React.useCallback(function (ctx, row, cell, sourceIndex, x, y, w, h, highlighted) {
    var drawn = (drawCustomCell === null || drawCustomCell === void 0 ? void 0 : drawCustomCell(ctx, cell, theme, {
      x: x,
      y: y,
      width: w,
      height: h
    })) === true;

    if (!drawn) {
      if (cell.kind === _dataGridTypes.GridCellKind.Text || cell.kind === _dataGridTypes.GridCellKind.Number) {
        (0, _dataGridLib.drawTextCell)(ctx, theme, cell.displayData, x, y, w, h);
      } else if (cell.kind === _dataGridTypes.GridCellKind.Markdown || cell.kind === _dataGridTypes.GridCellKind.Uri) {
        (0, _dataGridLib.drawTextCell)(ctx, theme, cell.data, x, y, w, h);
      } else if (cell.kind === _dataGridTypes.GridCellKind.Boolean) {
        if (cell.data || cell.showUnchecked) {
          (0, _dataGridLib.drawBoolean)(ctx, theme, cell.data, x, y, w, h, highlighted);
        }
      } else if (cell.kind === _dataGridTypes.GridCellKind.Bubble) {
        (0, _dataGridLib.drawBubbles)(ctx, theme, cell.data, x, y, w, h, highlighted);
      } else if (cell.kind === _dataGridTypes.GridCellKind.Image && imageLoader.current !== undefined) {
        (0, _dataGridLib.drawImage)(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, imageLoader.current);
      } else if (cell.kind === _dataGridTypes.GridCellKind.RowID) {
        (0, _dataGridLib.drawTextCell)(ctx, theme, cell.data, x, y, w, h, theme.fgColorLight);
      } else if (cell.kind === _dataGridTypes.GridCellKind.Protected) {
        (0, _dataGridLib.drawProtectedCell)(ctx, theme, x, y, w, h, !highlighted);
      } else if (cell.kind === _dataGridTypes.GridCellKind.Drilldown && imageLoader.current !== undefined) {
        (0, _dataGridLib.drawDrilldownCell)(ctx, theme, cell.data, sourceIndex, row, x, y, w, h, imageLoader.current);
      }
    }
  }, [drawCustomCell, theme]);
  var timingValue = React.useRef({
    count: 0,
    time: 0
  });
  var draw = React.useCallback(function () {
    var _window$devicePixelRa, _imageLoader$current;

    var currentTime = timingValue.current;
    var canvas = ref.current;
    if (canvas === null) return;
    var dpr = (_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1;

    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    var last = lastBlitData.current;
    if (canBlit.current === true && cellXOffset === last.cellXOffset && cellYOffset === last.cellYOffset && translateX === last.translateX && translateY === last.translateY) return;
    var ctx = canvas.getContext("2d", {
      alpha: false
    });
    if (ctx === null) return;
    var start = window.performance.now();

    var getRowHeight = function getRowHeight(r) {
      return typeof rowHeight === "number" ? rowHeight : rowHeight(r);
    };

    ctx.save();
    ctx.beginPath(); // clear any path in the ctx

    if (dpr !== 1) {
      ctx.scale(dpr, dpr);
    }

    var damage = damageRegion.current;
    var drawRegions = [];
    var blittedYOnly = false;
    var effectiveCols = (0, _dataGridLib.getEffectiveColumns)(columns, cellXOffset, width, firstColSticky, dragAndDropState, translateX);

    if (canBlit.current === true) {
      var minY = Math.min(last.cellYOffset, cellYOffset);
      var maxY = Math.max(last.cellYOffset, cellYOffset);
      var deltaY = 0;

      for (var i = minY; i < maxY; i++) {
        deltaY += getRowHeight(i);
      }

      if (cellYOffset > last.cellYOffset) {
        deltaY = -deltaY;
      }

      deltaY += translateY - last.translateY;
      var minX = Math.min(last.cellXOffset, cellXOffset);
      var maxX = Math.max(last.cellXOffset, cellXOffset);
      var deltaX = 0;

      for (var _i2 = minX; _i2 < maxX; _i2++) {
        deltaX += columns[_i2].width;
      }

      if (cellXOffset > last.cellXOffset) {
        deltaX = -deltaX;
      }

      deltaX += translateX - last.translateX;
      var stickyWidth = 0;

      var _iterator2 = _createForOfIteratorHelper(effectiveCols),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;

          if (c.sticky) {
            stickyWidth += c.width + 1;
          } else {
            break;
          }
        } // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var blitWidth = width - stickyWidth - Math.abs(deltaX);
      var blitHeight = height - headerHeight - Math.abs(deltaY) - 1;

      if (blitWidth > 150 && blitHeight > 150) {
        blittedYOnly = deltaX === 0; // blit Y

        if (deltaY > 0) {
          // scrolling up
          ctx.drawImage(canvas, 0, (headerHeight + 1) * dpr, width * dpr, blitHeight * dpr, 0, deltaY + headerHeight + 1, width, blitHeight);
          drawRegions.push({
            x: 0,
            y: headerHeight,
            width: width,
            height: deltaY + 1
          });
        } else if (deltaY < 0) {
          // scrolling down
          ctx.drawImage(canvas, 0, (-deltaY + headerHeight + 1) * dpr, width * dpr, blitHeight * dpr, 0, headerHeight + 1, width, blitHeight);
          drawRegions.push({
            x: 0,
            y: height + deltaY,
            width: width,
            height: -deltaY
          });
        } // blit X


        if (deltaX > 0) {
          // scrolling right
          ctx.drawImage(canvas, stickyWidth * dpr, 0, blitWidth * dpr, height * dpr, deltaX + stickyWidth, 0, blitWidth, height);
          drawRegions.push({
            x: stickyWidth - 1,
            y: 0,
            width: deltaX + 1,
            height: height
          });
        } else if (deltaX < 0) {
          // scrolling left
          ctx.drawImage(canvas, (stickyWidth - deltaX) * dpr, 0, blitWidth * dpr, height * dpr, stickyWidth, 0, blitWidth, height);
          drawRegions.push({
            x: width + deltaX,
            y: 0,
            width: -deltaX,
            height: height
          });
        }

        if (drawRegions.length > 0) {
          var _iterator3 = _createForOfIteratorHelper(drawRegions),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var r = _step3.value;
              ctx.rect(r.x, r.y, r.width, r.height);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          ctx.clip();
          ctx.beginPath();
        }
      }
    }

    if (damage !== undefined) {
      var _row = cellYOffset;
      var y = headerHeight + translateY;
      ctx.beginPath();

      while (y < height) {
        var _x = 0;
        var rh = getRowHeight(_row);

        var _iterator4 = _createForOfIteratorHelper(effectiveCols),
            _step4;

        try {
          var _loop = function _loop() {
            var c = _step4.value;
            var rowLocal = _row;

            if (damage.find(function (d) {
              return d[0] === c.sourceIndex && d[1] === rowLocal;
            }) !== undefined) {
              var tx = c.sticky ? 0 : translateX;
              ctx.rect(_x + 1 + tx, y + 1, c.width - 1, rh - 1);
            }

            _x += c.width;
          };

          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        _row++;
        y += rh;
      }

      ctx.clip();
      ctx.beginPath();
    }

    ctx.fillStyle = theme.dataViewer.gridColor;
    ctx.fillRect(0, headerHeight, width, height - headerHeight);

    if (!blittedYOnly && damage === undefined) {
      // draw header background
      ctx.fillStyle = theme.dataViewer.columnHeader.bgColor;
      ctx.fillRect(0, 0, width, headerHeight);
    } // draw lines all at once


    {
      ctx.beginPath(); // vertical lines

      var _x2 = 0.5;
      effectiveCols.forEach(function (c) {
        _x2 += c.width;
        var tx = c.sticky ? _x2 : _x2 + translateX;
        ctx.moveTo(tx, 0);
        ctx.lineTo(tx, height);
      }); // horizontal lines

      var _y = headerHeight + 0.5;

      var _row2 = cellYOffset;
      var isHeader = true;

      while (_y + translateY <= height) {
        var ty = isHeader ? _y : _y + translateY;
        ctx.moveTo(0, ty);
        ctx.lineTo(width, ty);
        _y += getRowHeight(_row2);
        isHeader = false;
        _row2++;
      }

      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    var xPad = 8;
    var yPad = 2; // draw header contents

    if (!blittedYOnly && damage === undefined) {
      var _x3 = 0;
      var _clipX = 0;

      var _iterator5 = _createForOfIteratorHelper(effectiveCols),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _c = _step5.value;
          var selected = selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes(_c.sourceIndex);
          var hovered = hoveredCol === _c.sourceIndex && dragAndDropState === undefined;
          var hasSelectedCell = selectedCell !== undefined && selectedCell.cell[0] === _c.sourceIndex;
          var fillStyle = selected ? theme.dataViewer.columnHeader.fgSelected : theme.dataViewer.columnHeader.fgColor;
          var bgFillStyle = selected ? theme.dataViewer.columnHeader.bgSelected : hasSelectedCell ? theme.dataViewer.columnHeader.bgDark : theme.dataViewer.columnHeader.bgColor;
          ctx.save();

          if (_c.sticky) {
            _clipX = Math.max(_clipX, _x3 + _c.width);
          } else {
            ctx.beginPath();
            ctx.rect(_clipX, 0, width, height);
            ctx.clip();
            ctx.translate(translateX, 0);
          }

          if (selected) {
            ctx.fillStyle = bgFillStyle;
            ctx.fillRect(_x3 + 1, 0, _c.width - 1, headerHeight);
          } else if (hasSelectedCell) {
            ctx.fillStyle = theme.dataViewer.columnHeader.bgDark;
            ctx.fillRect(_x3 + 1, 0, _c.width - 1, headerHeight);
          }

          ctx.beginPath();
          ctx.rect(_x3 + xPad, yPad, _c.width - xPad, headerHeight - yPad * 2);
          ctx.clip();
          var drawX = _x3 + xPad;
          ctx.globalAlpha = hovered || selected ? 1 : 0.6;

          if (_c.icon !== undefined) {
            var variant = selected ? "selected" : "normal";

            if (_c.style === "highlight") {
              variant = selected ? "selected" : "special";
            }

            (0, _dataGridSprites.drawSprite)(_c.icon, variant, ctx, drawX, (headerHeight - 20) / 2, 20);

            if (_c.overlayIcon !== undefined) {
              ctx.globalAlpha = 1;
              (0, _dataGridSprites.drawSprite)(_c.overlayIcon, selected ? "selected" : "special", ctx, drawX + 9, (headerHeight - 18) / 2 + 6, 18);
              ctx.globalAlpha = hovered || selected ? 1 : 0.6;
            }

            drawX += 26;
          }

          ctx.font = "bold 14px Roboto, sans-serif";
          ctx.fillStyle = fillStyle;
          ctx.fillText(_c.title, drawX, headerHeight / 2 + 5);
          ctx.globalAlpha = 1;

          if (hovered && _c.hasMenu === true) {
            var fadeWidth = 35;
            var fadeStart = _x3 + _c.width - fadeWidth;
            var grad = ctx.createLinearGradient(fadeStart, 0, fadeStart + fadeWidth, 0);
            grad.addColorStop(0, bgFillStyle + "00");
            grad.addColorStop(0.3, bgFillStyle);
            grad.addColorStop(1, bgFillStyle);
            ctx.fillStyle = grad;
            ctx.rect(fadeStart, 0, fadeWidth, headerHeight);
            ctx.fill();
            ctx.beginPath();
            var triangleX = _x3 + _c.width - 20;
            var triangleY = headerHeight / 2 - 3;
            (0, _dataGridLib.roundedPoly)(ctx, [{
              x: triangleX,
              y: triangleY
            }, {
              x: triangleX + 11,
              y: triangleY
            }, {
              x: triangleX + 5.5,
              y: triangleY + 6
            }], 1);
            ctx.fillStyle = fillStyle;
            ctx.fill();
          }

          ctx.restore();
          _x3 += _c.width;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }

    ctx.beginPath();
    ctx.rect(0, headerHeight + 1, width, height - headerHeight - 1);
    ctx.clip();
    ctx.beginPath();
    var x = 0;
    var clipX = 0;
    var row = 0;
    ctx.font = "13px Roboto, sans-serif";

    var _iterator6 = _createForOfIteratorHelper(effectiveCols),
        _step6;

    try {
      var _loop2 = function _loop2() {
        var c = _step6.value;
        var y = headerHeight + translateY;
        row = cellYOffset;
        ctx.save();

        var clipCol = function clipCol(offset) {
          ctx.beginPath();

          if (c.sticky) {
            clipX = Math.max(clipX, x + c.width);
            ctx.rect(x, headerHeight + 1, c.width + offset, height - headerHeight - 1);
            ctx.clip();
          } else {
            var diff = Math.min(0, x + translateX - clipX);
            ctx.rect(Math.max(x + translateX, clipX), headerHeight + 1, c.width + diff + offset, height - headerHeight - 1);
            ctx.clip();
            ctx.translate(translateX, 0);
          }
        };

        clipCol(0);

        var _loop3 = function _loop3() {
          var rh = getRowHeight(row);
          var rowSelected = selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.includes(row);

          if (drawRegions.length === 0 || drawRegions.find(function (drawRegion) {
            return y >= drawRegion.y && y <= drawRegion.y + drawRegion.height || drawRegion.y >= y && drawRegion.y <= y + rh;
          })) {
            var rowLocal = row;

            if (damage === undefined || damage.find(function (d) {
              return d[0] === c.sourceIndex && d[1] === rowLocal;
            }) !== undefined) {
              ctx.beginPath();
              var isFocused = (selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.cell[0]) === c.sourceIndex && (selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.cell[1]) === row;
              var highlighted = rowSelected || (selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.includes(c.sourceIndex)) || isFocused;

              if ((selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.range) !== undefined) {
                var range = selectedCell.range;

                if (c.sourceIndex >= range.x && c.sourceIndex < range.x + range.width && row >= range.y && row < range.y + range.height) {
                  highlighted = true;
                }
              }

              if (highlighted || rowSelected) {
                ctx.fillStyle = theme.dataViewer.bgSelected;

                if (x === 0) {
                  ctx.fillRect(x, y + 1, c.width, rh - 1);
                } else {
                  ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                }
              } else {
                // eslint-disable-next-line no-loop-func
                if ((prelightCells === null || prelightCells === void 0 ? void 0 : prelightCells.find(function (pre) {
                  return pre[0] === c.sourceIndex && pre[1] === row;
                })) !== undefined) {
                  ctx.fillStyle = theme.dataViewer.bgPrelight;

                  if (x === 0) {
                    ctx.fillRect(x, y + 1, c.width, rh - 1);
                  } else {
                    ctx.fillRect(x + 1, y + 1, c.width - 1, rh - 1);
                  }
                }
              }

              var _cell = row < rows ? getCellContent([c.sourceIndex, row]) : {
                kind: _dataGridTypes.GridCellKind.Loading,
                allowOverlay: false
              };

              if (_cell.style === "faded") {
                ctx.globalAlpha = 0.6;
              }

              drawCell(ctx, row, _cell, c.sourceIndex, x, y, c.width, rh, highlighted);
              ctx.globalAlpha = 1;

              if (isFocused) {
                ctx.restore();
                ctx.save();
                ctx.beginPath();
                clipCol(1);
                ctx.beginPath();
                ctx.rect(x + 1, y + 1, c.width - 1, rh - 1);
                ctx.strokeStyle = theme.acceptColor;
                ctx.lineWidth = 2;
                ctx.stroke();
              }
            }
          }

          y += rh;
          row++;
        };

        while (y < height) {
          _loop3();
        }

        ctx.restore();
        x += c.width;
      };

      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    (_imageLoader$current = imageLoader.current) === null || _imageLoader$current === void 0 ? void 0 : _imageLoader$current.setWindow({
      x: cellXOffset,
      y: cellYOffset,
      width: effectiveCols.length,
      height: row - cellYOffset
    });
    lastBlitData.current = {
      cellXOffset: cellXOffset,
      cellYOffset: cellYOffset,
      translateX: translateX,
      translateY: translateY
    };
    ctx.restore();
    var end = window.performance.now();
    var elapsedMs = end - start;
    timingValue.current = {
      count: currentTime.count + 1,
      time: currentTime.time + elapsedMs
    }; // Do nothing with frame times for now, in the future we can use them to draw placeholders instead
    // when rapid scrolling is underway.
    // if (timingValue.current.count % 1000 === 0) {
    //     alert(`Average Frame Time: ${timingValue.current.time / timingValue.current.count}`);
    // }
  }, [width, height, columns, cellXOffset, firstColSticky, translateX, translateY, dragAndDropState, theme.dataViewer.gridColor, theme.dataViewer.columnHeader.bgColor, theme.dataViewer.columnHeader.fgSelected, theme.dataViewer.columnHeader.fgColor, theme.dataViewer.columnHeader.bgSelected, theme.dataViewer.columnHeader.bgDark, theme.dataViewer.bgSelected, theme.dataViewer.bgPrelight, theme.borderColor, theme.acceptColor, cellYOffset, rowHeight, headerHeight, selectedColumns, hoveredCol, selectedCell, selectedRows, rows, getCellContent, drawCell, prelightCells]);
  React.useEffect(function () {
    imageLoader.current = new _imageWindowLoader.default();
  }, []);
  canBlit.current = canBlit.current !== undefined;
  React.useEffect(function () {
    canBlit.current = false;
  }, [width, height, columns, theme, headerHeight, rowHeight, rows, getCellContent, selectedRows, selectedColumns, selectedCell, firstColSticky, dragAndDropState, hoveredCol, prelightCells]);
  React.useEffect(draw, [draw]);
  var imageLoaded = React.useCallback(function (locations) {
    canBlit.current = false;
    damageRegion.current = locations;
    draw();
    damageRegion.current = undefined;
  }, [draw]);
  (_imageLoader$current2 = imageLoader.current) === null || _imageLoader$current2 === void 0 ? void 0 : _imageLoader$current2.setCallback(imageLoaded);
  var headerHovered = (hoveredItem === null || hoveredItem === void 0 ? void 0 : hoveredItem[0]) !== undefined && hoveredItem[1] === undefined;
  var canDrag = hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false;
  var style = React.useMemo(function () {
    return {
      width: width,
      height: height,
      display: "block",
      cursor: canDrag ? "col-resize" : headerHovered ? "pointer" : "default"
    };
  }, [width, height, headerHovered, canDrag]);
  var target = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;

  if (target !== null && target !== undefined) {
    // because we have an event target we need to set its cursor instead.
    target.style.cursor = style.cursor;
  }

  var onMouseDownImpl = React.useCallback(function (ev) {
    var canvas = ref.current;
    var eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas === null || ev.target !== canvas && ev.target !== eventTarget) return;
    var args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);

    if (args.kind === "header") {
      var _args$location = _slicedToArray(args.location, 1),
          _col = _args$location[0];

      var header = columns[_col];

      if (header.hasMenu === true && !(hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false)) {
        var headerBounds = getBoundsForItem(canvas, _col, undefined);

        if (ev.clientX > headerBounds.x + headerBounds.width - 40) {
          onHeaderMenuClick === null || onHeaderMenuClick === void 0 ? void 0 : onHeaderMenuClick(_col, headerBounds);
          return;
        }
      }
    }

    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(args);
  }, [eventTargetRef, getMouseArgsForPosition, onMouseDown, columns, hoveredOnEdge, getBoundsForItem, onHeaderMenuClick]);
  (0, _utils.useEventListener)("mousedown", onMouseDownImpl, window, true);
  var onMouseUpImpl = React.useCallback(function (ev) {
    var canvas = ref.current;
    if (canvas === null || onMouseUp === undefined) return;
    onMouseUp(getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev));
  }, [getMouseArgsForPosition, onMouseUp]);
  (0, _utils.useEventListener)("mouseup", onMouseUpImpl, window, true);
  var hoveredRef = React.useRef();
  var onMouseMoveImpl = React.useCallback(function (ev) {
    var canvas = ref.current;
    if (canvas === null) return;
    var args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);

    if (!isSameItem(args, hoveredRef.current)) {
      onItemHovered === null || onItemHovered === void 0 ? void 0 : onItemHovered(args);
      setHoveredItem(args.kind === "out-of-bounds" ? undefined : args.location);
      hoveredRef.current = args;
    }

    if (args.kind !== "out-of-bounds") {
      setHoveredOnEdge(args.isEdge && allowResize === true);
    }

    onMouseMove === null || onMouseMove === void 0 ? void 0 : onMouseMove(ev);
  }, [getMouseArgsForPosition, onItemHovered, allowResize, onMouseMove]);
  (0, _utils.useEventListener)("mousemove", onMouseMoveImpl, window, true);
  var onKeyDownImpl = React.useCallback(function (event) {
    var canvas = ref.current;
    if (canvas === null) return;
    var bounds;

    if (selectedCell !== undefined) {
      bounds = getBoundsForItem(canvas, selectedCell.cell[0], selectedCell.cell[1]);
    }

    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown({
      bounds: bounds,
      cancel: function cancel() {
        event.stopPropagation();
        event.preventDefault();
      },
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      key: event.key,
      keyCode: event.keyCode
    });
  }, [onKeyDown, selectedCell, getBoundsForItem]);
  var onKeyUpImpl = React.useCallback(function (event) {
    var canvas = ref.current;
    if (canvas === null) return;
    var bounds;

    if (selectedCell !== undefined) {
      bounds = getBoundsForItem(canvas, selectedCell.cell[0], selectedCell.cell[1]);
    }

    onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp({
      bounds: bounds,
      cancel: function cancel() {
        event.stopPropagation();
        event.preventDefault();
      },
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      key: event.key,
      keyCode: event.keyCode
    });
  }, [onKeyUp, selectedCell, getBoundsForItem]);
  var refImpl = React.useCallback(function (instance) {
    ref.current = instance;

    if (canvasRef !== undefined) {
      canvasRef.current = instance;
    }
  }, [canvasRef]);
  var onDragStartImpl = React.useCallback(function (event) {
    var canvas = ref.current;
    if (canvas === null || !isDraggable === true) return;
    var dragMime;
    var dragData;
    var args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

    var setData = function setData(mime, payload) {
      dragMime = mime;
      dragData = payload;
    };

    var dragImage;
    var dragImageX;
    var dragImageY;

    var setDragImage = function setDragImage(image, x, y) {
      dragImage = image;
      dragImageX = x;
      dragImageY = y;
    };

    onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(_objectSpread(_objectSpread({}, args), {}, {
      setData: setData,
      setDragImage: setDragImage
    }));

    if (dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
      event.dataTransfer.setData(dragMime, dragData);
      event.dataTransfer.effectAllowed = "link";

      if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
        event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
      } else {
        var _args$location2 = _slicedToArray(args.location, 2),
            _col2 = _args$location2[0],
            row = _args$location2[1];

        if (row !== undefined) {
          var offscreen = document.createElement("canvas");
          var boundsForDragTarget = getBoundsForItem(canvas, _col2, row);
          offscreen.width = boundsForDragTarget.width;
          offscreen.height = boundsForDragTarget.height;

          var _ctx = offscreen.getContext("2d");

          if (_ctx !== null) {
            _ctx.fillStyle = theme.dataViewer.bgColor;

            _ctx.fillRect(0, 0, offscreen.width, offscreen.height);

            drawCell(_ctx, row, getCellContent([_col2, row]), 0, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, false);
          }

          offscreen.style.left = "-100%";
          offscreen.style.position = "absolute";
          document.body.appendChild(offscreen);
          event.dataTransfer.setDragImage(offscreen, boundsForDragTarget.width / 2, boundsForDragTarget.height / 2);
          window.setTimeout(function () {
            document.body.removeChild(offscreen);
          }, 0);
        }
      }
    } else {
      event.preventDefault();
    }
  }, [isDraggable, getMouseArgsForPosition, onDragStart, getBoundsForItem, theme.dataViewer.bgColor, drawCell, getCellContent]);
  (0, _utils.useEventListener)("dragstart", onDragStartImpl, (_eventTargetRef$curre = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre !== void 0 ? _eventTargetRef$curre : null, false, false);
  var focusRef = React.useRef(null);
  var focusElement = React.useCallback(function (el) {
    if (el === null) {
      window.requestAnimationFrame(function () {
        var _canvasRef$current;

        canvasRef === null || canvasRef === void 0 ? void 0 : (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.focus();
      });
    } else {
      window.requestAnimationFrame(function () {
        el.focus();
      });
    }

    focusRef.current = el;
  }, [canvasRef]);
  React.useImperativeHandle(forwardedRef, function () {
    return {
      focus: function focus() {
        var el = focusRef.current;

        if (el === null) {
          window.requestAnimationFrame(function () {
            var _canvasRef$current2;

            canvasRef === null || canvasRef === void 0 ? void 0 : (_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 ? void 0 : _canvasRef$current2.focus();
          });
        } else {
          window.requestAnimationFrame(function () {
            el.focus();
          });
        }
      }
    };
  }, [canvasRef]);
  var accessibilityTree = (0, _utils.useDebouncedMemo)(function () {
    var effectiveCols = (0, _dataGridLib.getEffectiveColumns)(columns, cellXOffset, width, firstColSticky, dragAndDropState, translateX);

    var getRowData = function getRowData(cell) {
      var _cell$data$toString, _cell$data;

      switch (cell.kind) {
        case _dataGridTypes.GridCellKind.Boolean:
        case _dataGridTypes.GridCellKind.Markdown:
        case _dataGridTypes.GridCellKind.Number:
        case _dataGridTypes.GridCellKind.RowID:
        case _dataGridTypes.GridCellKind.Text:
        case _dataGridTypes.GridCellKind.Uri:
          return (_cell$data$toString = (_cell$data = cell.data) === null || _cell$data === void 0 ? void 0 : _cell$data.toString()) !== null && _cell$data$toString !== void 0 ? _cell$data$toString : "";

        case _dataGridTypes.GridCellKind.Drilldown:
          return cell.data.map(function (d) {
            return d.text;
          }).join(", ");

        case _dataGridTypes.GridCellKind.Bubble:
          return cell.data.join(", ");

        case _dataGridTypes.GridCellKind.Image:
          return cell.data.map(function (i, index) {
            return /*#__PURE__*/React.createElement("img", {
              key: index,
              src: i
            });
          });
      }

      return "";
    };

    return /*#__PURE__*/React.createElement("div", {
      role: "grid",
      "aria-rowcount": rows,
      "aria-colcount": columns.length
    }, /*#__PURE__*/React.createElement("div", {
      role: "rowgroup"
    }, /*#__PURE__*/React.createElement("div", {
      role: "row",
      "aria-rowindex": 1,
      "row-index": 1
    }, effectiveCols.map(function (c) {
      return /*#__PURE__*/React.createElement("div", {
        role: "columnheader",
        "aria-colindex": c.sourceIndex + 1,
        key: c.sourceIndex
      }, c.title);
    }))), /*#__PURE__*/React.createElement("div", {
      role: "rowgroup"
    }, (0, _range.default)(cellYOffset, Math.min(rows, cellYOffset + 50)).map(function (row) {
      return /*#__PURE__*/React.createElement("div", {
        role: "row",
        key: row,
        "aria-rowindex": row + 2,
        "row-index": row + 2
      }, effectiveCols.map(function (c) {
        var _selectedCell$cell;

        var col = c.sourceIndex;
        var key = "".concat(col, ",").concat(row);

        var _ref = (_selectedCell$cell = selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.cell) !== null && _selectedCell$cell !== void 0 ? _selectedCell$cell : [],
            _ref2 = _slicedToArray(_ref, 2),
            fCol = _ref2[0],
            fRow = _ref2[1];

        var focused = fCol === col && fRow === row;
        return /*#__PURE__*/React.createElement("div", {
          key: key,
          role: "gridcell",
          "aria-colindex": col + 1,
          id: "glide-cell-".concat(col, "-").concat(row),
          onClick: function onClick() {
            var canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
            if (canvas === null || canvas === undefined) return;
            return onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown({
              bounds: getBoundsForItem(canvas, col, row),
              cancel: function cancel() {
                return undefined;
              },
              ctrlKey: false,
              key: "Enter",
              keyCode: 13,
              metaKey: false,
              shiftKey: false
            });
          },
          onFocusCapture: function onFocusCapture(e) {
            if (e.target === focusRef.current) return;
            return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused([col, row]);
          },
          ref: focused ? focusElement : undefined,
          tabIndex: -1
        }, getRowData(getCellContent([col, row])));
      }));
    })));
  }, [cellXOffset, cellYOffset, columns, dragAndDropState, firstColSticky, focusElement, getCellContent, selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.cell, translateX, width], 100);
  return /*#__PURE__*/React.createElement("canvas", {
    tabIndex: 0,
    onKeyDown: onKeyDownImpl,
    onKeyUp: onKeyUpImpl,
    className: className,
    ref: refImpl,
    style: style
  }, accessibilityTree);
};

var _default = /*#__PURE__*/React.memo((0, _styledComponents.withTheme)( /*#__PURE__*/React.forwardRef(DataGrid)));

exports.default = _default;