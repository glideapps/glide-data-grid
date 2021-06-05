"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEditCell = makeEditCell;
exports.getEffectiveColumns = getEffectiveColumns;
exports.getColumnIndexForX = getColumnIndexForX;
exports.getRowIndexForY = getRowIndexForY;
exports.drawTextCell = drawTextCell;
exports.drawProtectedCell = drawProtectedCell;
exports.drawBoolean = drawBoolean;
exports.drawBubbles = drawBubbles;
exports.drawDrilldownCell = drawDrilldownCell;
exports.drawImage = drawImage;
exports.roundedPoly = roundedPoly;

var _dataGridTypes = require("./data-grid-types");

var _direction = _interopRequireDefault(require("direction"));

var _utils = require("../common/utils");

var _support = require("../common/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function makeEditCell(cell) {
  var isEditable = (0, _dataGridTypes.isEditableGridCell)(cell);

  switch (cell.kind) {
    case _dataGridTypes.GridCellKind.Boolean:
      return _objectSpread(_objectSpread({}, cell), {}, {
        data: false
      });

    case _dataGridTypes.GridCellKind.Text:
      return _objectSpread(_objectSpread({}, cell), {}, {
        data: "",
        displayData: ""
      });

    case _dataGridTypes.GridCellKind.Markdown:
    case _dataGridTypes.GridCellKind.Uri:
    case _dataGridTypes.GridCellKind.RowID:
      return _objectSpread(_objectSpread({}, cell), {}, {
        data: "",
        allowOverlay: isEditable
      });

    case _dataGridTypes.GridCellKind.Protected:
    case _dataGridTypes.GridCellKind.Loading:
      return cell;

    case _dataGridTypes.GridCellKind.Image:
    case _dataGridTypes.GridCellKind.Bubble:
      return _objectSpread(_objectSpread({}, cell), {}, {
        data: [],
        allowOverlay: isEditable
      });

    case _dataGridTypes.GridCellKind.Number:
      return _objectSpread(_objectSpread({}, cell), {}, {
        data: undefined,
        displayData: ""
      });

    case _dataGridTypes.GridCellKind.Drilldown:
      return _objectSpread(_objectSpread({}, cell), {}, {
        data: []
      });

    default:
      (0, _support.assertNever)(cell);
  }
}

function getEffectiveColumns(columns, cellXOffset, width, firstColSticky, dndState, tx) {
  var mappedCols = columns.map(function (c, i) {
    return _objectSpread(_objectSpread({}, c), {}, {
      sourceIndex: i,
      sticky: firstColSticky && i === 0
    });
  });

  if (dndState !== undefined) {
    var temp = mappedCols[dndState.src];

    if (dndState.src > dndState.dest) {
      mappedCols.splice(dndState.src, 1);
      mappedCols.splice(dndState.dest, 0, temp);
    } else {
      mappedCols.splice(dndState.dest + 1, 0, temp);
      mappedCols.splice(dndState.src, 1);
    }
  }

  if (firstColSticky) {
    width -= mappedCols[0].width;
  }

  var endIndex = cellXOffset;
  var curX = tx !== null && tx !== void 0 ? tx : 0;

  while (curX <= width && endIndex < mappedCols.length) {
    curX += mappedCols[endIndex].width;
    endIndex++;
  }

  var effectiveCols = mappedCols.slice(cellXOffset, endIndex);

  if (firstColSticky && cellXOffset !== 0) {
    effectiveCols = [_objectSpread({}, mappedCols[0])].concat(_toConsumableArray(effectiveCols));
  }

  return effectiveCols;
}

function getColumnIndexForX(targetX, effectiveColumns, translateX) {
  var x = 0;

  var _iterator = _createForOfIteratorHelper(effectiveColumns),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;
      var cx = c.sticky ? x : x + (translateX !== null && translateX !== void 0 ? translateX : 0);

      if (targetX <= cx + c.width) {
        return c.sourceIndex;
      }

      x += c.width;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return -1;
}

function getRowIndexForY(targetY, headerHeight, rows, rowHeight, cellYOffset, translateY) {
  if (targetY <= headerHeight) return -1;
  var ty = targetY - (translateY !== null && translateY !== void 0 ? translateY : 0);

  if (typeof rowHeight === "number") {
    var target = Math.floor((ty - headerHeight) / rowHeight) + cellYOffset;
    if (target >= rows) return undefined;
    return target;
  } else {
    var curY = headerHeight;

    for (var i = cellYOffset; i < rows; i++) {
      var rh = rowHeight(i);
      if (ty <= curY + rh) return i;
      curY += rh;
    }

    return undefined;
  }
}

var cellXPad = 8;
var cellYPad = 3;
var textWidths = new Map();

function measureTextWidth(s, ctx) {
  // return ctx.measureText(s).width;
  var textWidth = textWidths.get(s);

  if (textWidth === undefined) {
    textWidth = ctx.measureText(s).width;
    textWidths.set(s, textWidth);
  }

  if (textWidths.size > 10000) {
    textWidths.clear();
  }

  return textWidth;
}

function drawTextCell(ctx, theme, data, x, y, width, height, overrideColor) {
  data = data.split(/\r?\n/)[0].slice(0, Math.round(width / 4));
  var dir = (0, _direction.default)(data);
  ctx.fillStyle = overrideColor !== null && overrideColor !== void 0 ? overrideColor : theme.fgColorDark;

  if (dir === "rtl") {
    var textWidth = measureTextWidth(data, ctx);
    ctx.fillText(data, x + width - cellXPad - textWidth + 0.5, y + height / 2 + 4.5);
  } else {
    ctx.fillText(data, x + cellXPad + 0.5, y + height / 2 + 4.5);
  }
}

function drawProtectedCell(ctx, theme, x, y, width, height, drawBackground) {
  if (drawBackground) {
    ctx.beginPath();
    ctx.rect(x + 1, y + 1, width - 1, height - 1);
    ctx.fillStyle = theme.bgColorAltLight;
    ctx.fill();
  }

  ctx.beginPath();
  var radius = 2.5;
  var xStart = x + cellXPad + radius;
  var center = y + height / 2;
  var p = Math.cos((0, _utils.degreesToRadians)(30)) * radius;
  var q = Math.sin((0, _utils.degreesToRadians)(30)) * radius;

  for (var i = 0; i < 12; i++) {
    // ctx.arc(xStart, center, radius, 0, Math.PI * 2);
    ctx.moveTo(xStart, center - radius);
    ctx.lineTo(xStart, center + radius);
    ctx.moveTo(xStart + p, center - q);
    ctx.lineTo(xStart - p, center + q);
    ctx.moveTo(xStart - p, center - q);
    ctx.lineTo(xStart + p, center + q);
    xStart += 8;
  }

  ctx.lineWidth = 1.1;
  ctx.lineCap = "square";
  ctx.strokeStyle = theme.fgColorMedium + "DD";
  ctx.stroke();
}

function roundedRect(ctx, x, y, width, height, radius) {
  if (typeof radius === "number") {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  }

  ctx.moveTo(x + radius.tl, y);
  ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
  ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
  ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
  ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}

function drawBoolean(ctx, theme, data, x, y, width, height, highlighted) {
  var centerX = x + width / 2;
  var centerY = y + height / 2;

  if (data) {
    ctx.beginPath();
    roundedRect(ctx, centerX - 9, centerY - 9, 18, 18, 3);
    ctx.fillStyle = highlighted ? theme.acceptColor : theme.fgColorMedium;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX - 6, centerY - 0.5);
    ctx.lineTo(centerX - 2.5, centerY + 3);
    ctx.lineTo(centerX + 5, centerY - 4);
    ctx.strokeStyle = theme.bgColorLight;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 1.9;
    ctx.stroke();
  } else {
    ctx.beginPath();
    roundedRect(ctx, centerX - 8, centerY - 8, 16, 16, 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = theme.fgColorLight;
    ctx.stroke();
  }
}

var itemMargin = 4;

function drawBubbles(ctx, theme, data, x, y, width, height, highlighted) {
  var bubbleHeight = 20;
  var bubblePad = 8;
  var bubbleMargin = itemMargin;
  var renderX = x + cellXPad;
  var renderBoxes = [];

  var _iterator2 = _createForOfIteratorHelper(data),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var s = _step2.value;
      if (renderX > x + width) break;
      var textWidth = measureTextWidth(s, ctx);
      renderBoxes.push({
        x: renderX,
        width: textWidth
      });
      renderX += textWidth + bubblePad * 2 + bubbleMargin;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  ctx.beginPath();
  renderBoxes.forEach(function (rectInfo) {
    roundedRect(ctx, rectInfo.x, y + (height - bubbleHeight) / 2, rectInfo.width + bubblePad * 2, bubbleHeight, bubbleHeight / 2);
  });
  ctx.fillStyle = highlighted ? theme.dataViewer.bgBubbleSelected : theme.dataViewer.bgBubble;
  ctx.fill();
  renderBoxes.forEach(function (rectInfo, i) {
    ctx.beginPath();
    ctx.fillStyle = theme.fgColorDark;
    ctx.fillText(data[i], rectInfo.x + bubblePad, y + height / 2 + 4);
  });
}

function drawDrilldownCell(ctx, theme, data, col, row, x, y, width, height, imageLoader) {
  var bubbleHeight = 24;
  var bubblePad = 8;
  var bubbleMargin = itemMargin;
  var renderX = x + cellXPad;
  var centerY = y + height / 2;
  var renderBoxes = [];

  var _iterator3 = _createForOfIteratorHelper(data),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var el = _step3.value;
      if (renderX > x + width) break;
      var textWidth = measureTextWidth(el.text, ctx);
      var imgWidth = el.img === undefined ? 0 : bubbleHeight - 8 + 4;
      var renderWidth = 8 + textWidth + imgWidth + bubblePad * 2;
      renderBoxes.push({
        x: renderX,
        width: renderWidth
      });
      renderX += renderWidth + bubbleMargin;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  ctx.beginPath();
  renderBoxes.forEach(function (rectInfo) {
    roundedRect(ctx, rectInfo.x, y + (height - bubbleHeight) / 2, rectInfo.width, bubbleHeight, 6);
  });
  ctx.shadowColor = "rgba(62, 65, 86, 0.4)";
  ctx.shadowBlur = 1;
  ctx.fillStyle = theme.dataViewer.gridColor;
  ctx.fill();
  ctx.shadowColor = "rgba(62, 65, 86, 0.15)";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 3;
  ctx.fillStyle = theme.dataViewer.gridColor;
  ctx.fill();
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.shadowBlur = 0;
  renderBoxes.forEach(function (rectInfo, i) {
    var d = data[i];
    var drawX = rectInfo.x + bubblePad;
    ctx.beginPath();
    roundedPoly(ctx, [{
      x: drawX + -3,
      y: centerY - 5
    }, {
      x: drawX + -3,
      y: centerY + 5
    }, {
      x: drawX + 2,
      y: centerY
    }], 1);
    ctx.fillStyle = theme.fgColorMedium;
    ctx.fill();
    drawX += 8;

    if (d.img !== undefined) {
      var img = imageLoader.loadOrGetImage(d.img, col, row);

      if (img !== undefined) {
        var imgSize = bubbleHeight - 8;
        var srcX = 0;
        var srcY = 0;
        var srcWidth = img.naturalWidth;
        var srcHeight = img.naturalHeight;

        if (srcWidth > srcHeight) {
          // landscape
          srcX += (srcWidth - srcHeight) / 2;
          srcWidth = srcHeight;
        } else if (srcHeight > srcWidth) {
          //portrait
          srcY += (srcHeight - srcWidth) / 2;
          srcHeight = srcWidth;
        }

        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, drawX, y + height / 2 - imgSize / 2, imgSize, imgSize);
        drawX += imgSize + 4;
      }
    }

    ctx.beginPath();
    ctx.fillStyle = theme.fgColorDark;
    ctx.fillText(d.text, drawX, y + height / 2 + 4);
  });
}

function drawImage(ctx, _theme, data, col, row, x, y, _width, height, imageLoader) {
  var drawX = x + cellXPad;
  data.filter(function (s) {
    return s.length > 0;
  }).forEach(function (i) {
    var img = imageLoader.loadOrGetImage(i, col, row);

    if (img !== undefined) {
      var imgHeight = height - cellYPad * 2;
      var imgWidth = img.naturalWidth * (imgHeight / img.naturalHeight);
      ctx.drawImage(img, drawX, y + cellYPad, imgWidth, imgHeight);
      drawX += imgWidth + itemMargin;
    } // }

  });
}

function roundedPoly(ctx, points, radiusAll) {
  // convert 2 points into vector form, polar form, and normalised
  var asVec = function asVec(p, pp) {
    var vx = pp.x - p.x;
    var vy = pp.y - p.y;
    var vlen = Math.sqrt(vx * vx + vy * vy);
    var vnx = vx / vlen;
    var vny = vy / vlen;
    return {
      x: vx,
      y: pp.y - p.y,
      len: vlen,
      nx: vnx,
      ny: vny,
      ang: Math.atan2(vny, vnx)
    };
  };

  var radius = radiusAll; // const v1: Vector = {} as any;
  // const v2: Vector = {} as any;

  var len = points.length;
  var p1 = points[len - 1]; // for each point

  for (var i = 0; i < len; i++) {
    var p2 = points[i % len];
    var p3 = points[(i + 1) % len]; //-----------------------------------------
    // Part 1

    var v1 = asVec(p2, p1);
    var v2 = asVec(p2, p3);
    var sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    var sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    var angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA); //-----------------------------------------

    var radDirection = 1;
    var drawDirection = false;

    if (sinA90 < 0) {
      if (angle < 0) {
        angle = Math.PI + angle;
      } else {
        angle = Math.PI - angle;
        radDirection = -1;
        drawDirection = true;
      }
    } else {
      if (angle > 0) {
        radDirection = -1;
        drawDirection = true;
      }
    }

    if (p2.radius !== undefined) {
      radius = p2.radius;
    } else {
      radius = radiusAll;
    } //-----------------------------------------
    // Part 2


    var halfAngle = angle / 2; //-----------------------------------------
    //-----------------------------------------
    // Part 3

    var lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle)); //-----------------------------------------
    //-----------------------------------------
    // Special part A

    var cRadius = void 0;

    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    } //-----------------------------------------
    // Part 4


    var x = p2.x + v2.nx * lenOut;
    var y = p2.y + v2.ny * lenOut; //-----------------------------------------
    // Part 5

    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection; //-----------------------------------------
    // Part 6

    ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection); //-----------------------------------------

    p1 = p2;
    p2 = p3;
  }

  ctx.closePath();
}