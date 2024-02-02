"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[7671],{

/***/ "./packages/core/src/cells/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "m": () => (/* binding */ AllCellRenderers)
});

// EXTERNAL MODULE: ./packages/core/src/common/utils.tsx
var utils = __webpack_require__("./packages/core/src/common/utils.tsx");
// EXTERNAL MODULE: ./packages/core/src/data-editor/data-editor-fns.ts
var data_editor_fns = __webpack_require__("./packages/core/src/data-editor/data-editor-fns.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid-types.ts
var data_grid_types = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/render/draw-checkbox.ts
var draw_checkbox = __webpack_require__("./packages/core/src/internal/data-grid/render/draw-checkbox.ts");
;// CONCATENATED MODULE: ./packages/core/src/cells/boolean-cell.tsx




const defaultCellMaxSize = 20;
const booleanCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "false";
  },
  kind: data_grid_types/* GridCellKind.Boolean */.p6.Boolean,
  needsHover: true,
  useLabel: false,
  needsHoverPosition: true,
  measure: () => 50,
  draw: a => {
    var _a$cell$maxSize;
    return drawBoolean(a, a.cell.data, (0,data_grid_types/* booleanCellIsEditable */.kf)(a.cell), (_a$cell$maxSize = a.cell.maxSize) !== null && _a$cell$maxSize !== void 0 ? _a$cell$maxSize : defaultCellMaxSize);
  },
  onDelete: c => ({
    ...c,
    data: false
  }),
  onClick: e => {
    var _cell$maxSize, _cell$contentAlign;
    const {
      cell,
      posX: pointerX,
      posY: pointerY,
      bounds,
      theme
    } = e;
    const {
      width,
      height,
      x: cellX,
      y: cellY
    } = bounds;
    const maxWidth = (_cell$maxSize = cell.maxSize) !== null && _cell$maxSize !== void 0 ? _cell$maxSize : defaultCellMaxSize;
    const cellCenterY = Math.floor(bounds.y + height / 2);
    const checkBoxWidth = (0,utils/* getSquareWidth */.Qo)(maxWidth, height, theme.cellVerticalPadding);
    const posX = (0,utils/* getSquareXPosFromAlign */.XC)((_cell$contentAlign = cell.contentAlign) !== null && _cell$contentAlign !== void 0 ? _cell$contentAlign : "center", cellX, width, theme.cellHorizontalPadding, checkBoxWidth);
    const bb = (0,utils/* getSquareBB */.kq)(posX, cellCenterY, checkBoxWidth);
    const checkBoxClicked = (0,utils/* pointIsWithinBB */.qq)(cellX + pointerX, cellY + pointerY, bb);
    if ((0,data_grid_types/* booleanCellIsEditable */.kf)(cell) && checkBoxClicked) {
      return {
        ...cell,
        data: (0,data_editor_fns/* toggleBoolean */.D$)(cell.data)
      };
    }
    return undefined;
  },
  onPaste: (toPaste, cell) => {
    let newVal = data_grid_types/* BooleanEmpty */.qF;
    if (toPaste.toLowerCase() === "true") {
      newVal = true;
    } else if (toPaste.toLowerCase() === "false") {
      newVal = false;
    } else if (toPaste.toLowerCase() === "indeterminate") {
      newVal = data_grid_types/* BooleanIndeterminate */.sd;
    }
    return newVal === cell.data ? undefined : {
      ...cell,
      data: newVal
    };
  }
};
function drawBoolean(args, data, canEdit, maxSize) {
  if (!canEdit && data === data_grid_types/* BooleanEmpty */.qF) {
    return;
  }
  const {
    ctx,
    hoverAmount,
    theme,
    rect,
    highlighted,
    hoverX,
    hoverY,
    cell: {
      contentAlign
    }
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  const hoverEffect = 0.35;
  let alpha = canEdit ? 1 - hoverEffect + hoverEffect * hoverAmount : 0.4;
  if (data === data_grid_types/* BooleanEmpty */.qF) {
    alpha *= hoverAmount;
  }
  if (alpha === 0) {
    return;
  }
  ctx.globalAlpha = alpha;
  (0,draw_checkbox/* drawCheckbox */._)(ctx, theme, data, x, y, w, h, highlighted, hoverX, hoverY, maxSize, contentAlign);
  ctx.globalAlpha = 1;
}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx

const BubblesOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "BubblesOverlayEditorStyle",
  class: "bed7b9f",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx");
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor.tsx




const BubblesOverlayEditor = p => {
  const {
    bubbles
  } = p;
  return (0,jsx_runtime.jsxs)(BubblesOverlayEditorStyle, {
    children: [bubbles.map((b, i) => (0,jsx_runtime.jsx)("div", {
      className: "boe-bubble",
      children: b
    }, i)), (0,jsx_runtime.jsx)("textarea", {
      className: "gdg-input",
      autoFocus: true
    })]
  });
};
BubblesOverlayEditor.displayName = "BubblesOverlayEditor";
/* harmony default export */ const bubbles_overlay_editor = (BubblesOverlayEditor);
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/render/data-grid-lib.ts
var data_grid_lib = __webpack_require__("./packages/core/src/internal/data-grid/render/data-grid-lib.ts");
;// CONCATENATED MODULE: ./packages/core/src/cells/bubble-cell.tsx






const bubbleCellRenderer = {
  getAccessibilityString: c => (0,utils/* makeAccessibilityStringForArray */.jM)(c.data),
  kind: data_grid_types/* GridCellKind.Bubble */.p6.Bubble,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: (ctx, cell, t) => cell.data.reduce((acc, data) => ctx.measureText(data).width + acc + 20, 0) + 2 * t.cellHorizontalPadding - 4,
  draw: a => drawBubbles(a, a.cell.data),
  provideEditor: () => p => {
    const {
      value
    } = p;
    return (0,jsx_runtime.jsx)(bubbles_overlay_editor, {
      bubbles: value.data
    });
  },
  onPaste: () => undefined
};
const itemMargin = 4;
function drawBubbles(args, data) {
  const {
    rect,
    theme,
    ctx,
    highlighted
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  const bubbleHeight = 20;
  const bubblePad = 8;
  const bubbleMargin = itemMargin;
  let renderX = x + theme.cellHorizontalPadding;
  const renderBoxes = [];
  for (const s of data) {
    if (renderX > x + w) break;
    const textWidth = (0,data_grid_lib/* measureTextCached */.P7)(s, ctx, theme.baseFontFull).width;
    renderBoxes.push({
      x: renderX,
      width: textWidth
    });
    renderX += textWidth + bubblePad * 2 + bubbleMargin;
  }
  ctx.beginPath();
  for (const rectInfo of renderBoxes) {
    var _theme$roundingRadius;
    (0,data_grid_lib/* roundedRect */.NK)(ctx, rectInfo.x, y + (h - bubbleHeight) / 2, rectInfo.width + bubblePad * 2, bubbleHeight, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : bubbleHeight / 2);
  }
  ctx.fillStyle = highlighted ? theme.bgBubbleSelected : theme.bgBubble;
  ctx.fill();
  for (const [i, rectInfo] of renderBoxes.entries()) {
    ctx.beginPath();
    ctx.fillStyle = theme.textBubble;
    ctx.fillText(data[i], rectInfo.x + bubblePad, y + h / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme));
  }
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx




const DrilldownOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "DrilldownOverlayEditorStyle",
  class: "dy18k32",
  propsAsIs: false
});
const DrilldownOverlayEditor = p => {
  const {
    drilldowns
  } = p;
  return (0,jsx_runtime.jsx)(DrilldownOverlayEditorStyle, {
    children: drilldowns.map((d, i) => (0,jsx_runtime.jsxs)("div", {
      className: "doe-bubble",
      children: [d.img !== undefined && (0,jsx_runtime.jsx)("img", {
        src: d.img
      }), (0,jsx_runtime.jsx)("div", {
        children: d.text
      })]
    }, i))
  });
};
DrilldownOverlayEditor.displayName = "DrilldownOverlayEditor";
/* harmony default export */ const drilldown_overlay_editor = (DrilldownOverlayEditor);

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx");
;// CONCATENATED MODULE: ./packages/core/src/cells/drilldown-cell.tsx






const drilldownCellRenderer = {
  getAccessibilityString: c => (0,utils/* makeAccessibilityStringForArray */.jM)(c.data.map(d => d.text)),
  kind: data_grid_types/* GridCellKind.Drilldown */.p6.Drilldown,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: (ctx, cell, t) => cell.data.reduce((acc, data) => ctx.measureText(data.text).width + acc + 20 + (data.img !== undefined ? 18 : 0), 0) + 2 * t.cellHorizontalPadding - 4,
  draw: a => drawDrilldownCell(a, a.cell.data),
  provideEditor: () => p => {
    const {
      value
    } = p;
    return (0,jsx_runtime.jsx)(drilldown_overlay_editor, {
      drilldowns: value.data
    });
  },
  onPaste: () => undefined
};
const drilldown_cell_itemMargin = 4;
const drilldownCache = {};
function getAndCacheDrilldownBorder(bgCell, border, height, rounding) {
  const dpr = Math.ceil(window.devicePixelRatio);
  const shadowBlur = 5;
  const targetHeight = height - shadowBlur * 2;
  const middleWidth = 4;
  const innerHeight = height * dpr;
  const sideWidth = rounding + shadowBlur;
  const targetWidth = rounding * 3;
  const innerWidth = (targetWidth + shadowBlur * 2) * dpr;
  const key = `${bgCell},${border},${dpr},${height}`;
  if (drilldownCache[key] !== undefined) {
    return {
      el: drilldownCache[key],
      height: innerHeight,
      width: innerWidth,
      middleWidth: middleWidth * dpr,
      sideWidth: sideWidth * dpr,
      padding: shadowBlur * dpr,
      dpr
    };
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  ctx.scale(dpr, dpr);
  drilldownCache[key] = canvas;
  ctx.beginPath();
  (0,data_grid_lib/* roundedRect */.NK)(ctx, shadowBlur, shadowBlur, targetWidth, targetHeight, rounding);
  ctx.shadowColor = "rgba(24, 25, 34, 0.4)";
  ctx.shadowBlur = 1;
  ctx.fillStyle = bgCell;
  ctx.fill();
  ctx.shadowColor = "rgba(24, 25, 34, 0.3)";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 5;
  ctx.fillStyle = bgCell;
  ctx.fill();
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  (0,data_grid_lib/* roundedRect */.NK)(ctx, shadowBlur + 0.5, shadowBlur + 0.5, targetWidth, targetHeight, rounding);
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.stroke();
  return {
    el: canvas,
    height: innerHeight,
    width: innerWidth,
    sideWidth: sideWidth * dpr,
    middleWidth: rounding * dpr,
    padding: shadowBlur * dpr,
    dpr
  };
}
function drawDrilldownCell(args, data) {
  var _theme$roundingRadius;
  const {
    rect,
    theme,
    ctx,
    imageLoader,
    col,
    row
  } = args;
  const {
    x,
    width: w
  } = rect;
  const font = theme.baseFontFull;
  const emHeight = (0,data_grid_lib/* getEmHeight */.WA)(ctx, font);
  const h = Math.min(rect.height, Math.max(16, Math.ceil(emHeight * theme.lineHeight) * 2));
  const y = Math.floor(rect.y + (rect.height - h) / 2);
  const bubbleHeight = h - 10;
  const bubblePad = 8;
  const bubbleMargin = drilldown_cell_itemMargin;
  let renderX = x + theme.cellHorizontalPadding;
  const rounding = (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 6;
  const tileMap = getAndCacheDrilldownBorder(theme.bgCell, theme.drilldownBorder, h, rounding);
  const renderBoxes = [];
  for (const el of data) {
    if (renderX > x + w) break;
    const textMetrics = (0,data_grid_lib/* measureTextCached */.P7)(el.text, ctx, font);
    const textWidth = textMetrics.width;
    let imgWidth = 0;
    if (el.img !== undefined) {
      const img = imageLoader.loadOrGetImage(el.img, col, row);
      if (img !== undefined) {
        imgWidth = bubbleHeight - 8 + 4;
      }
    }
    const renderWidth = textWidth + imgWidth + bubblePad * 2;
    renderBoxes.push({
      x: renderX,
      width: renderWidth
    });
    renderX += renderWidth + bubbleMargin;
  }
  if (tileMap !== null) {
    const {
      el,
      height,
      middleWidth,
      sideWidth,
      width,
      dpr,
      padding
    } = tileMap;
    const outerSideWidth = sideWidth / dpr;
    const outerPadding = padding / dpr;
    for (const rectInfo of renderBoxes) {
      const rx = Math.floor(rectInfo.x);
      const rw = Math.floor(rectInfo.width);
      const outerMiddleWidth = rw - (outerSideWidth - outerPadding) * 2;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(el, 0, 0, sideWidth, height, rx - outerPadding, y, outerSideWidth, h);
      if (outerMiddleWidth > 0) ctx.drawImage(el, sideWidth, 0, middleWidth, height, rx + (outerSideWidth - outerPadding), y, outerMiddleWidth, h);
      ctx.drawImage(el, width - sideWidth, 0, sideWidth, height, rx + rw - (outerSideWidth - outerPadding), y, outerSideWidth, h);
      ctx.imageSmoothingEnabled = true;
    }
  }
  ctx.beginPath();
  for (const [i, rectInfo] of renderBoxes.entries()) {
    const d = data[i];
    let drawX = rectInfo.x + bubblePad;
    if (d.img !== undefined) {
      const img = imageLoader.loadOrGetImage(d.img, col, row);
      if (img !== undefined) {
        var _theme$roundingRadius2;
        const imgSize = bubbleHeight - 8;
        let srcX = 0;
        let srcY = 0;
        let srcWidth = img.width;
        let srcHeight = img.height;
        if (srcWidth > srcHeight) {
          srcX += (srcWidth - srcHeight) / 2;
          srcWidth = srcHeight;
        } else if (srcHeight > srcWidth) {
          srcY += (srcHeight - srcWidth) / 2;
          srcHeight = srcWidth;
        }
        ctx.beginPath();
        (0,data_grid_lib/* roundedRect */.NK)(ctx, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize, (_theme$roundingRadius2 = theme.roundingRadius) !== null && _theme$roundingRadius2 !== void 0 ? _theme$roundingRadius2 : 3);
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, drawX, y + h / 2 - imgSize / 2, imgSize, imgSize);
        ctx.restore();
        drawX += imgSize + 4;
      }
    }
    ctx.beginPath();
    ctx.fillStyle = theme.textBubble;
    ctx.fillText(d.text, drawX, y + h / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme));
  }
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx

const ImageOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "ImageOverlayEditorStyle",
  class: "i1f2fhaz",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx");
// EXTERNAL MODULE: ./node_modules/react-responsive-carousel/lib/js/index.js
var js = __webpack_require__("./node_modules/react-responsive-carousel/lib/js/index.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor.tsx






const ImageOverlayEditor = p => {
  const {
    urls,
    canWrite,
    onEditClick,
    renderImage
  } = p;
  const filtered = urls.filter(u => u !== "");
  if (filtered.length === 0) {
    return null;
  }
  const allowMove = filtered.length > 1;
  return (0,jsx_runtime.jsxs)(ImageOverlayEditorStyle, {
    "data-testid": "GDG-default-image-overlay-editor",
    children: [(0,jsx_runtime.jsx)(js/* Carousel */.lr, {
      showArrows: allowMove,
      showThumbs: false,
      swipeable: allowMove,
      emulateTouch: allowMove,
      infiniteLoop: allowMove,
      children: filtered.map(url => {
        var _renderImage;
        const innerContent = (_renderImage = renderImage === null || renderImage === void 0 ? void 0 : renderImage(url)) !== null && _renderImage !== void 0 ? _renderImage : (0,jsx_runtime.jsx)("img", {
          draggable: false,
          src: url
        });
        return (0,jsx_runtime.jsx)("div", {
          className: "gdg-centering-container",
          children: innerContent
        }, url);
      })
    }), canWrite && onEditClick && (0,jsx_runtime.jsx)("button", {
      className: "gdg-edit-icon",
      onClick: onEditClick,
      children: (0,jsx_runtime.jsx)(utils/* EditPencil */.Wy, {})
    })]
  });
};
ImageOverlayEditor.displayName = "ImageOverlayEditor";
;// CONCATENATED MODULE: ./packages/core/src/cells/image-cell.tsx





const imageCellRenderer = {
  getAccessibilityString: c => c.data.join(", "),
  kind: data_grid_types/* GridCellKind.Image */.p6.Image,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  draw: a => {
    var _a$cell$displayData, _ref, _a$cell$rounding;
    return drawImage(a, (_a$cell$displayData = a.cell.displayData) !== null && _a$cell$displayData !== void 0 ? _a$cell$displayData : a.cell.data, (_ref = (_a$cell$rounding = a.cell.rounding) !== null && _a$cell$rounding !== void 0 ? _a$cell$rounding : a.theme.roundingRadius) !== null && _ref !== void 0 ? _ref : 4, a.cell.contentAlign);
  },
  measure: (_ctx, cell) => cell.data.length * 50,
  onDelete: c => ({
    ...c,
    data: []
  }),
  provideEditor: () => p => {
    const {
      value,
      onFinishedEditing,
      imageEditorOverride
    } = p;
    const ImageEditor = imageEditorOverride !== null && imageEditorOverride !== void 0 ? imageEditorOverride : ImageOverlayEditor;
    return (0,jsx_runtime.jsx)(ImageEditor, {
      urls: value.data,
      canWrite: value.readonly !== false,
      onCancel: onFinishedEditing,
      onChange: newImage => {
        onFinishedEditing({
          ...value,
          data: [newImage]
        });
      }
    });
  },
  onPaste: (toPaste, cell) => {
    toPaste = toPaste.trim();
    const fragments = toPaste.split(",");
    const uris = fragments.map(f => {
      try {
        new URL(f);
        return f;
      } catch {
        return undefined;
      }
    }).filter(x => x !== undefined);
    if (uris.length === cell.data.length && uris.every((u, i) => u === cell.data[i])) return undefined;
    return {
      ...cell,
      data: uris
    };
  }
};
const image_cell_itemMargin = 4;
function drawImage(args, data, rounding, contentAlign) {
  const {
    rect,
    col,
    row,
    theme,
    ctx,
    imageLoader
  } = args;
  const {
    x,
    y,
    height: h,
    width: w
  } = rect;
  const imgHeight = h - theme.cellVerticalPadding * 2;
  const images = [];
  let totalWidth = 0;
  for (let index = 0; index < data.length; index++) {
    const i = data[index];
    if (i.length === 0) continue;
    const img = imageLoader.loadOrGetImage(i, col, row);
    if (img !== undefined) {
      images[index] = img;
      const imgWidth = img.width * (imgHeight / img.height);
      totalWidth += imgWidth + image_cell_itemMargin;
    }
  }
  if (totalWidth === 0) return;
  totalWidth -= image_cell_itemMargin;
  let drawX = x + theme.cellHorizontalPadding;
  if (contentAlign === "right") drawX = Math.floor(x + w - theme.cellHorizontalPadding - totalWidth);else if (contentAlign === "center") drawX = Math.floor(x + w / 2 - totalWidth / 2);
  for (const img of images) {
    if (img === undefined) continue;
    const imgWidth = img.width * (imgHeight / img.height);
    if (rounding > 0) {
      ctx.beginPath();
      (0,data_grid_lib/* roundedRect */.NK)(ctx, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight, rounding);
      ctx.save();
      ctx.clip();
    }
    ctx.drawImage(img, drawX, y + theme.cellVerticalPadding, imgWidth, imgHeight);
    if (rounding > 0) {
      ctx.restore();
    }
    drawX += imgWidth + image_cell_itemMargin;
  }
}
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/color-parser.ts
var color_parser = __webpack_require__("./packages/core/src/internal/data-grid/color-parser.ts");
;// CONCATENATED MODULE: ./packages/core/src/cells/loading-cell.tsx



function getRandomNumber(x, y) {
  let seed = x * 49632 + y * 325176;
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return seed / 0xffffffff * 2;
}
const loadingCellRenderer = {
  getAccessibilityString: () => "",
  kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
  needsHover: false,
  useLabel: false,
  needsHoverPosition: false,
  measure: () => 120,
  draw: a => {
    var _cell$skeletonHeight, _theme$roundingRadius;
    const {
      cell,
      col,
      row,
      ctx,
      rect,
      theme
    } = a;
    if (cell.skeletonWidth === undefined || cell.skeletonWidth === 0) {
      return;
    }
    let width = cell.skeletonWidth;
    if (cell.skeletonWidthVariability !== undefined && cell.skeletonWidthVariability > 0) {
      width += Math.round(getRandomNumber(col, row) * cell.skeletonWidthVariability);
    }
    const hpad = theme.cellHorizontalPadding;
    const rectHeight = (_cell$skeletonHeight = cell.skeletonHeight) !== null && _cell$skeletonHeight !== void 0 ? _cell$skeletonHeight : Math.min(18, rect.height - 2 * theme.cellVerticalPadding);
    (0,data_grid_lib/* roundedRect */.NK)(ctx, rect.x + hpad, rect.y + (rect.height - rectHeight) / 2, width, rectHeight, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 3);
    ctx.fillStyle = (0,color_parser/* withAlpha */.fG)(theme.textDark, 0.1);
    ctx.fill();
  },
  onPaste: () => undefined
};
// EXTERNAL MODULE: ./node_modules/marked/lib/marked.esm.js
var marked_esm = __webpack_require__("./node_modules/marked/lib/marked.esm.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/markdown-div/private/markdown-container.tsx

const MarkdownContainer = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "MarkdownContainer",
  class: "m1ec5h7p",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/markdown-div/private/markdown-container.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/markdown-div/private/markdown-container.tsx");
;// CONCATENATED MODULE: ./packages/core/src/internal/markdown-div/markdown-div.tsx




class MarkdownDiv extends react.PureComponent {
  constructor() {
    super(...arguments);
    this.targetElement = null;
    this.containerRefHook = element => {
      this.targetElement = element;
      this.renderMarkdownIntoDiv();
    };
  }
  renderMarkdownIntoDiv() {
    const {
      targetElement,
      props
    } = this;
    if (targetElement === null) return;
    const {
      contents,
      createNode
    } = props;
    const innerHTML = (0,marked_esm/* marked */.TU)(contents);
    const childRange = document.createRange();
    childRange.selectNodeContents(targetElement);
    childRange.deleteContents();
    let newChild = createNode === null || createNode === void 0 ? void 0 : createNode(innerHTML);
    if (newChild === undefined) {
      const childDoc = document.createElement("template");
      childDoc.innerHTML = innerHTML;
      newChild = childDoc.content;
    }
    targetElement.append(newChild);
    const tags = targetElement.getElementsByTagName("a");
    for (const tag of tags) {
      tag.target = "_blank";
      tag.rel = "noreferrer noopener";
    }
  }
  render() {
    this.renderMarkdownIntoDiv();
    return (0,jsx_runtime.jsx)(MarkdownContainer, {
      ref: this.containerRefHook
    });
  }
}
MarkdownDiv.displayName = "MarkdownDiv";
;// CONCATENATED MODULE: ./packages/core/src/internal/growing-entry/growing-entry-style.tsx

const InputBox = /*#__PURE__*/(0,dist/* styled */.z)('textarea')({
  name: "InputBox",
  class: "iotb8b8",
  propsAsIs: false
});
const ShadowBox = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "ShadowBox",
  class: "s1xtsfdl",
  propsAsIs: false
});
const GrowingEntryStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "GrowingEntryStyle",
  class: "g1d7u5bt",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/growing-entry/growing-entry-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/growing-entry/growing-entry-style.tsx");
// EXTERNAL MODULE: ./packages/core/src/common/support.ts
var support = __webpack_require__("./packages/core/src/common/support.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/growing-entry/growing-entry.tsx





let globalInputID = 0;
const GrowingEntry = props => {
  const {
    placeholder,
    value,
    onKeyDown,
    highlight,
    altNewline,
    validatedSelection,
    ...rest
  } = props;
  const {
    onChange,
    className
  } = rest;
  const inputRef = react.useRef(null);
  const useText = value !== null && value !== void 0 ? value : "";
  (0,support/* assert */.hu)(onChange !== undefined, "GrowingEntry must be a controlled input area");
  const [inputID] = react.useState(() => "input-box-" + (globalInputID = (globalInputID + 1) % 10000000));
  react.useEffect(() => {
    const ta = inputRef.current;
    if (ta === null) return;
    if (ta.disabled) return;
    const length = useText.toString().length;
    ta.focus();
    ta.setSelectionRange(highlight ? 0 : length, length);
  }, []);
  react.useLayoutEffect(() => {
    if (validatedSelection !== undefined) {
      var _inputRef$current;
      const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range[0], range[1]);
    }
  }, [validatedSelection]);
  const onKeyDownInner = react.useCallback(e => {
    if (e.key === "Enter" && e.shiftKey && altNewline === true) {
      return;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  }, [altNewline, onKeyDown]);
  return (0,jsx_runtime.jsxs)(GrowingEntryStyle, {
    className: "gdg-growing-entry",
    children: [(0,jsx_runtime.jsx)(ShadowBox, {
      className: className,
      children: useText + "\n"
    }), (0,jsx_runtime.jsx)(InputBox, {
      ...rest,
      className: (className !== null && className !== void 0 ? className : "") + " gdg-input",
      id: inputID,
      ref: inputRef,
      onKeyDown: onKeyDownInner,
      value: useText,
      placeholder: placeholder,
      dir: "auto"
    })]
  });
};
GrowingEntry.displayName = "GrowingEntry";
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx

const _exp = /*#__PURE__*/() => p => p.targetWidth;
const MarkdownOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "MarkdownOverlayEditorStyle",
  class: "mmv7gx6",
  propsAsIs: false,
  vars: {
    "mmv7gx6-0": [_exp(), "px"]
  }
});

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor.tsx








const MarkdownOverlayEditor = p => {
  const {
    value,
    onChange,
    forceEditMode,
    createNode,
    targetRect,
    onFinish,
    validatedSelection
  } = p;
  const markdown = value.data;
  const readonly = value.readonly === true;
  const [editMode, setEditMode] = react.useState(markdown === "" || forceEditMode);
  const onEditClick = react.useCallback(() => {
    setEditMode(e => !e);
  }, []);
  const addLeftPad = markdown ? "gdg-ml-6" : "";
  if (editMode) {
    return (0,jsx_runtime.jsxs)(MarkdownOverlayEditorStyle, {
      targetWidth: targetRect.width - 20,
      children: [(0,jsx_runtime.jsx)(GrowingEntry, {
        autoFocus: true,
        highlight: false,
        validatedSelection: validatedSelection,
        value: markdown,
        onKeyDown: e => {
          if (e.key === "Enter") e.stopPropagation();
        },
        onChange: onChange
      }), (0,jsx_runtime.jsx)("div", {
        className: `gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`,
        onClick: () => onFinish(value),
        children: (0,jsx_runtime.jsx)(utils/* Checkmark */.MC, {})
      })]
    });
  }
  return (0,jsx_runtime.jsxs)(MarkdownOverlayEditorStyle, {
    targetWidth: targetRect.width,
    children: [(0,jsx_runtime.jsx)(MarkdownDiv, {
      contents: markdown,
      createNode: createNode
    }), !readonly && (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [(0,jsx_runtime.jsx)("div", {
        className: "spacer"
      }), (0,jsx_runtime.jsx)("div", {
        className: `gdg-edit-icon gdg-edit-hover ${addLeftPad}`,
        onClick: onEditClick,
        children: (0,jsx_runtime.jsx)(utils/* EditPencil */.Wy, {})
      })]
    }), (0,jsx_runtime.jsx)("textarea", {
      className: "gdg-md-edit-textarea gdg-input",
      autoFocus: true
    })]
  });
};
MarkdownOverlayEditor.displayName = "MarkdownOverlayEditor";
;// CONCATENATED MODULE: ./packages/core/src/cells/markdown-cell.tsx





const markdownCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Markdown */.p6.Markdown,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  measure: (ctx, cell, t) => {
    const firstLine = cell.data.split("\n")[0];
    return ctx.measureText(firstLine).width + 2 * t.cellHorizontalPadding;
  },
  draw: a => (0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.data, a.cell.contentAlign),
  onDelete: c => ({
    ...c,
    data: ""
  }),
  provideEditor: () => p => {
    const {
      onChange,
      value,
      target,
      onFinishedEditing,
      markdownDivCreateNode,
      forceEditMode,
      validatedSelection
    } = p;
    return (0,jsx_runtime.jsx)(MarkdownOverlayEditor, {
      onFinish: onFinishedEditing,
      targetRect: target,
      value: value,
      validatedSelection: validatedSelection,
      onChange: e => onChange({
        ...value,
        data: e.target.value
      }),
      forceEditMode: forceEditMode,
      createNode: markdownDivCreateNode
    });
  },
  onPaste: (toPaste, cell) => toPaste === cell.data ? undefined : {
    ...cell,
    data: toPaste
  }
};
;// CONCATENATED MODULE: ./packages/core/src/cells/marker-cell.tsx



const markerCellRenderer = {
  getAccessibilityString: c => c.row.toString(),
  kind: data_grid_types/* InnerGridCellKind.Marker */.$o.Marker,
  needsHover: true,
  needsHoverPosition: false,
  drawPrep: prepMarkerRowCell,
  measure: () => 44,
  draw: a => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind, a.cell.drawHandle, a.cell.checkboxStyle),
  onClick: e => {
    const {
      bounds,
      cell,
      posX: x,
      posY: y
    } = e;
    const {
      width,
      height
    } = bounds;
    const centerX = cell.drawHandle ? 7 + (width - 7) / 2 : width / 2;
    const centerY = height / 2;
    if (Math.abs(x - centerX) <= 10 && Math.abs(y - centerY) <= 10) {
      return {
        ...cell,
        checked: !cell.checked
      };
    }
    return undefined;
  },
  onPaste: () => undefined
};
function prepMarkerRowCell(args, lastPrep) {
  const {
    ctx,
    theme
  } = args;
  const newFont = theme.markerFontFull;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepMarkerRowCell;
  ctx.textAlign = "center";
  return result;
}
function deprepMarkerRowCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawMarkerRowCell(args, index, checked, markerKind, drawHandle, style) {
  const {
    ctx,
    rect,
    hoverAmount,
    theme
  } = args;
  const {
    x,
    y,
    width,
    height
  } = rect;
  const checkedboxAlpha = checked ? 1 : markerKind === "checkbox-visible" ? 0.6 + 0.4 * hoverAmount : hoverAmount;
  if (markerKind !== "number" && checkedboxAlpha > 0) {
    ctx.globalAlpha = checkedboxAlpha;
    const offsetAmount = 7 * (checked ? hoverAmount : 1);
    (0,draw_checkbox/* drawCheckbox */._)(ctx, theme, checked, drawHandle ? x + offsetAmount : x, y, drawHandle ? width - offsetAmount : width, height, true, undefined, undefined, 18, "center", style);
    if (drawHandle) {
      ctx.globalAlpha = hoverAmount;
      ctx.beginPath();
      for (const xOffset of [3, 6]) {
        for (const yOffset of [-5, -1, 3]) {
          ctx.rect(x + xOffset, y + height / 2 + yOffset, 2, 2);
        }
      }
      ctx.fillStyle = theme.textLight;
      ctx.fill();
      ctx.beginPath();
    }
    ctx.globalAlpha = 1;
  }
  if (markerKind === "number" || markerKind === "both" && !checked) {
    const text = index.toString();
    const fontStyle = theme.markerFontFull;
    const start = x + width / 2;
    if (markerKind === "both" && hoverAmount !== 0) {
      ctx.globalAlpha = 1 - hoverAmount;
    }
    ctx.fillStyle = theme.textLight;
    ctx.font = fontStyle;
    ctx.fillText(text, start, y + height / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, fontStyle));
    if (hoverAmount !== 0) {
      ctx.globalAlpha = 1;
    }
  }
}
;// CONCATENATED MODULE: ./packages/core/src/cells/new-row-cell.tsx


const newRowCellRenderer = {
  getAccessibilityString: () => "",
  kind: data_grid_types/* InnerGridCellKind.NewRow */.$o.NewRow,
  needsHover: true,
  needsHoverPosition: false,
  measure: () => 200,
  draw: a => drawNewRowCell(a, a.cell.hint, a.cell.icon),
  onPaste: () => undefined
};
function drawNewRowCell(args, data, icon) {
  const {
    ctx,
    rect,
    hoverAmount,
    theme,
    spriteManager
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  ctx.beginPath();
  ctx.globalAlpha = hoverAmount;
  ctx.rect(x + 1, y + 1, w, h - 2);
  ctx.fillStyle = theme.bgHeaderHovered;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  const alwaysShowIcon = data !== "";
  let textX = 0;
  if (icon !== undefined) {
    const padding = 8;
    const size = h - padding;
    const px = x + padding / 2;
    const py = y + padding / 2;
    spriteManager.drawSprite(icon, "normal", ctx, px, py, size, theme, alwaysShowIcon ? 1 : hoverAmount);
    textX = size;
  } else {
    textX = 24;
    const finalLineSize = 12;
    const lineSize = alwaysShowIcon ? finalLineSize : hoverAmount * finalLineSize;
    const xTranslate = alwaysShowIcon ? 0 : (1 - hoverAmount) * finalLineSize * 0.5;
    const padPlus = theme.cellHorizontalPadding + 4;
    if (lineSize > 0) {
      ctx.moveTo(x + padPlus + xTranslate, y + h / 2);
      ctx.lineTo(x + padPlus + xTranslate + lineSize, y + h / 2);
      ctx.moveTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 - lineSize * 0.5);
      ctx.lineTo(x + padPlus + xTranslate + lineSize * 0.5, y + h / 2 + lineSize * 0.5);
      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.bgIconHeader;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
  ctx.fillStyle = theme.textMedium;
  ctx.fillText(data, textX + x + theme.cellHorizontalPadding + 0.5, y + h / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme));
  ctx.beginPath();
}
;// CONCATENATED MODULE: ./packages/core/src/cells/number-cell.tsx




const NumberOverlayEditor = react.lazy(async () => await Promise.all(/* import() */[__webpack_require__.e(7333), __webpack_require__.e(215)]).then(__webpack_require__.bind(__webpack_require__, "./packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor.tsx")));
const numberCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Number */.p6.Number,
  needsHover: false,
  needsHoverPosition: false,
  useLabel: true,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  draw: a => (0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.displayData, a.cell.contentAlign),
  measure: (ctx, cell, theme) => ctx.measureText(cell.displayData).width + theme.cellHorizontalPadding * 2,
  onDelete: c => ({
    ...c,
    data: undefined
  }),
  provideEditor: () => p => {
    const {
      isHighlighted,
      onChange,
      value,
      validatedSelection
    } = p;
    return (0,jsx_runtime.jsx)(react.Suspense, {
      fallback: null,
      children: (0,jsx_runtime.jsx)(NumberOverlayEditor, {
        highlight: isHighlighted,
        disabled: value.readonly === true,
        value: value.data,
        fixedDecimals: value.fixedDecimals,
        allowNegative: value.allowNegative,
        thousandSeparator: value.thousandSeparator,
        decimalSeparator: value.decimalSeparator,
        validatedSelection: validatedSelection,
        onChange: x => {
          var _x$floatValue;
          return onChange({
            ...value,
            data: Number.isNaN((_x$floatValue = x.floatValue) !== null && _x$floatValue !== void 0 ? _x$floatValue : 0) ? 0 : x.floatValue
          });
        }
      })
    });
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    const newNumber = typeof details.rawValue === "number" ? details.rawValue : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
    if (Number.isNaN(newNumber) || cell.data === newNumber) return undefined;
    return {
      ...cell,
      data: newNumber,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
;// CONCATENATED MODULE: ./packages/core/src/cells/protected-cell.tsx


const protectedCellRenderer = {
  getAccessibilityString: () => "",
  measure: () => 108,
  kind: data_grid_types/* GridCellKind.Protected */.p6.Protected,
  needsHover: false,
  needsHoverPosition: false,
  draw: drawProtectedCell,
  onPaste: () => undefined
};
function drawProtectedCell(args) {
  const {
    ctx,
    theme,
    rect
  } = args;
  const {
    x,
    y,
    height: h
  } = rect;
  ctx.beginPath();
  const radius = 2.5;
  let xStart = x + theme.cellHorizontalPadding + radius;
  const center = y + h / 2;
  const p = Math.cos((0,utils/* degreesToRadians */.Ht)(30)) * radius;
  const q = Math.sin((0,utils/* degreesToRadians */.Ht)(30)) * radius;
  for (let i = 0; i < 12; i++) {
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
  ctx.strokeStyle = theme.textLight;
  ctx.stroke();
}
;// CONCATENATED MODULE: ./packages/core/src/cells/row-id-cell.tsx





const rowIDCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.RowID */.p6.RowID,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: (a, b) => (0,data_grid_lib/* prepTextCell */.k0)(a, b, a.theme.textLight),
  draw: a => (0,data_grid_lib/* drawTextCell */.uN)(a, a.cell.data, a.cell.contentAlign),
  measure: (ctx, cell, theme) => ctx.measureText(cell.data).width + theme.cellHorizontalPadding * 2,
  provideEditor: () => p => {
    const {
      isHighlighted,
      onChange,
      value,
      validatedSelection
    } = p;
    return (0,jsx_runtime.jsx)(GrowingEntry, {
      highlight: isHighlighted,
      autoFocus: value.readonly !== true,
      disabled: value.readonly !== false,
      value: value.data,
      validatedSelection: validatedSelection,
      onChange: e => onChange({
        ...value,
        data: e.target.value
      })
    });
  },
  onPaste: () => undefined
};
;// CONCATENATED MODULE: ./packages/core/src/cells/text-cell.tsx






const textCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Text */.p6.Text,
  needsHover: textCell => textCell.hoverEffect === true,
  needsHoverPosition: false,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  useLabel: true,
  draw: a => {
    const {
      cell,
      hoverAmount,
      hyperWrapping,
      ctx,
      rect,
      theme,
      overrideCursor
    } = a;
    const {
      displayData,
      contentAlign,
      hoverEffect,
      allowWrapping
    } = cell;
    if (hoverEffect === true && hoverAmount > 0) {
      var _theme$roundingRadius;
      ctx.textBaseline = "alphabetic";
      const padX = theme.cellHorizontalPadding;
      const padY = theme.cellVerticalPadding;
      const m = (0,data_grid_lib/* measureTextCached */.P7)(displayData, ctx, theme.baseFontFull, "alphabetic");
      const maxH = rect.height - padY;
      const h = Math.min(maxH, m.actualBoundingBoxAscent * 2.5);
      ctx.beginPath();
      (0,data_grid_lib/* roundedRect */.NK)(ctx, rect.x + padX / 2, rect.y + (rect.height - h) / 2 + 1, m.width + padX * 3, h - 1, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4);
      ctx.globalAlpha = hoverAmount;
      ctx.fillStyle = (0,color_parser/* withAlpha */.fG)(theme.textDark, 0.1);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = theme.textDark;
      ctx.textBaseline = "middle";
      overrideCursor === null || overrideCursor === void 0 || overrideCursor("text");
    }
    (0,data_grid_lib/* drawTextCell */.uN)(a, displayData, contentAlign, allowWrapping, hyperWrapping);
  },
  measure: (ctx, cell, t) => {
    const lines = cell.displayData.split("\n", cell.allowWrapping === true ? undefined : 1);
    let maxLineWidth = 0;
    for (const line of lines) {
      maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width);
    }
    return maxLineWidth + 2 * t.cellHorizontalPadding;
  },
  onDelete: c => ({
    ...c,
    data: ""
  }),
  provideEditor: cell => ({
    disablePadding: cell.allowWrapping === true,
    editor: p => {
      const {
        isHighlighted,
        onChange,
        value,
        validatedSelection
      } = p;
      return (0,jsx_runtime.jsx)(GrowingEntry, {
        style: cell.allowWrapping === true ? {
          padding: "3px 8.5px"
        } : undefined,
        highlight: isHighlighted,
        autoFocus: value.readonly !== true,
        disabled: value.readonly === true,
        altNewline: true,
        value: value.data,
        validatedSelection: validatedSelection,
        onChange: e => onChange({
          ...value,
          data: e.target.value
        })
      });
    }
  }),
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    return toPaste === cell.data ? undefined : {
      ...cell,
      data: toPaste,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx

const UriOverlayEditorStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "UriOverlayEditorStyle",
  class: "uwr6ffw",
  propsAsIs: false
});

__webpack_require__("./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor.tsx






const UriOverlayEditor = p => {
  const {
    uri,
    onChange,
    forceEditMode,
    readonly,
    validatedSelection,
    preview
  } = p;
  const [editMode, setEditMode] = react.useState(!readonly && (uri === "" || forceEditMode));
  const onEditClick = react.useCallback(() => {
    setEditMode(true);
  }, []);
  if (editMode) {
    return (0,jsx_runtime.jsx)(GrowingEntry, {
      validatedSelection: validatedSelection,
      highlight: true,
      autoFocus: true,
      value: uri,
      onChange: onChange
    });
  }
  return (0,jsx_runtime.jsxs)(UriOverlayEditorStyle, {
    children: [(0,jsx_runtime.jsx)("a", {
      className: "gdg-link-area",
      href: uri,
      target: "_blank",
      rel: "noopener noreferrer",
      children: preview
    }), !readonly && (0,jsx_runtime.jsx)("div", {
      className: "gdg-edit-icon",
      onClick: onEditClick,
      children: (0,jsx_runtime.jsx)(utils/* EditPencil */.Wy, {})
    }), (0,jsx_runtime.jsx)("textarea", {
      className: "gdg-input",
      autoFocus: true
    })]
  });
};
UriOverlayEditor.displayName = "UriOverlayEditor";
/* harmony default export */ const uri_overlay_editor = (UriOverlayEditor);
// EXTERNAL MODULE: ./packages/core/src/common/math.ts
var math = __webpack_require__("./packages/core/src/common/math.ts");
;// CONCATENATED MODULE: ./packages/core/src/cells/uri-cell.tsx






function getTextRect(metrics, rect, theme, contentAlign) {
  let x = theme.cellHorizontalPadding;
  const y = rect.height / 2 - metrics.actualBoundingBoxAscent / 2;
  const width = metrics.width;
  const height = metrics.actualBoundingBoxAscent;
  if (contentAlign === "right") {
    x = rect.width - width - theme.cellHorizontalPadding;
  } else if (contentAlign === "center") {
    x = rect.width / 2 - width / 2;
  }
  return {
    x,
    y,
    width,
    height
  };
}
const uriCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: data_grid_types/* GridCellKind.Uri */.p6.Uri,
  needsHover: uriCell => uriCell.hoverEffect === true,
  needsHoverPosition: true,
  useLabel: true,
  drawPrep: data_grid_lib/* prepTextCell */.k0,
  draw: a => {
    var _cell$displayData;
    const {
      cell,
      theme,
      overrideCursor,
      hoverX,
      hoverY,
      rect,
      ctx
    } = a;
    const txt = (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data;
    const isLinky = cell.hoverEffect === true;
    if (overrideCursor !== undefined && isLinky && hoverX !== undefined && hoverY !== undefined) {
      const m = (0,data_grid_lib/* measureTextCached */.P7)(txt, ctx, theme.baseFontFull);
      const textRect = getTextRect(m, rect, theme, cell.contentAlign);
      const {
        x,
        y,
        width: w,
        height: h
      } = textRect;
      if (hoverX >= x - 4 && hoverX <= x - 4 + w + 8 && hoverY >= y - 4 && hoverY <= y - 4 + h + 8) {
        const middleCenterBias = (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme.baseFontFull);
        overrideCursor("pointer");
        const underlineOffset = 5;
        const drawY = y - middleCenterBias;
        ctx.beginPath();
        ctx.moveTo(rect.x + x, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
        ctx.lineTo(rect.x + x + w, Math.floor(rect.y + drawY + h + underlineOffset) + 0.5);
        ctx.strokeStyle = theme.linkColor;
        ctx.stroke();
        ctx.save();
        ctx.fillStyle = a.cellFillColor;
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x - 1
          }
        }, txt, cell.contentAlign);
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x - 2
          }
        }, txt, cell.contentAlign);
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x + 1
          }
        }, txt, cell.contentAlign);
        (0,data_grid_lib/* drawTextCell */.uN)({
          ...a,
          rect: {
            ...rect,
            x: rect.x + 2
          }
        }, txt, cell.contentAlign);
        ctx.restore();
      }
    }
    ctx.fillStyle = isLinky ? theme.linkColor : theme.textDark;
    (0,data_grid_lib/* drawTextCell */.uN)(a, txt, cell.contentAlign);
  },
  onClick: a => {
    var _cell$displayData2;
    const {
      cell,
      bounds,
      posX,
      posY,
      theme
    } = a;
    const txt = (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data;
    if (cell.hoverEffect !== true || cell.onClickUri === undefined) return;
    const m = (0,data_grid_lib/* getMeasuredTextCache */._y)(txt, theme.baseFontFull);
    if (m === undefined) return;
    const textRect = getTextRect(m, bounds, theme, cell.contentAlign);
    const didClick = (0,math/* pointInRect */.qr)({
      x: textRect.x - 4,
      y: textRect.y - 4,
      width: textRect.width + 8,
      height: textRect.height + 8
    }, posX, posY);
    if (didClick) {
      cell.onClickUri(a);
    }
    return undefined;
  },
  measure: (ctx, cell, theme) => {
    var _cell$displayData3;
    return ctx.measureText((_cell$displayData3 = cell.displayData) !== null && _cell$displayData3 !== void 0 ? _cell$displayData3 : cell.data).width + theme.cellHorizontalPadding * 2;
  },
  onDelete: c => ({
    ...c,
    data: ""
  }),
  provideEditor: cell => p => {
    var _value$displayData;
    const {
      onChange,
      value,
      forceEditMode,
      validatedSelection
    } = p;
    return (0,jsx_runtime.jsx)(uri_overlay_editor, {
      forceEditMode: value.readonly !== true && (forceEditMode || cell.hoverEffect === true && cell.onClickUri !== undefined),
      uri: value.data,
      preview: (_value$displayData = value.displayData) !== null && _value$displayData !== void 0 ? _value$displayData : value.data,
      validatedSelection: validatedSelection,
      readonly: value.readonly === true,
      onChange: e => onChange({
        ...value,
        data: e.target.value
      })
    });
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    return toPaste === cell.data ? undefined : {
      ...cell,
      data: toPaste,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
;// CONCATENATED MODULE: ./packages/core/src/cells/index.ts













const AllCellRenderers = [markerCellRenderer, newRowCellRenderer, booleanCellRenderer, bubbleCellRenderer, drilldownCellRenderer, imageCellRenderer, loadingCellRenderer, markdownCellRenderer, numberCellRenderer, protectedCellRenderer, rowIDCellRenderer, textCellRenderer, uriCellRenderer];

/***/ }),

/***/ "./packages/core/src/common/browser-detect.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FR": () => (/* binding */ browserIsOSX),
/* harmony export */   "Pq": () => (/* binding */ browserIsSafari),
/* harmony export */   "uC": () => (/* binding */ browserIsFirefox)
/* harmony export */ });
class Lazy {
  constructor(fn) {
    this.fn = void 0;
    this.val = void 0;
    this.fn = fn;
  }
  get value() {
    var _this$val;
    return (_this$val = this.val) !== null && _this$val !== void 0 ? _this$val : this.val = this.fn();
  }
}
function lazy(fn) {
  return new Lazy(fn);
}
const browserIsFirefox = lazy(() => window.navigator.userAgent.includes("Firefox"));
const browserIsSafari = lazy(() => window.navigator.userAgent.includes("Mac OS") && window.navigator.userAgent.includes("Safari") && !window.navigator.userAgent.includes("Chrome"));
const browserIsOSX = lazy(() => window.navigator.platform.toLowerCase().startsWith("mac"));

/***/ }),

/***/ "./packages/core/src/common/image-window-loader.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _internal_data_grid_cell_set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/internal/data-grid/cell-set.ts");
/* harmony import */ var lodash_throttle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _render_state_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/src/common/render-state-provider.ts");



const imgPool = [];
class ImageWindowLoaderImpl extends _render_state_provider_js__WEBPACK_IMPORTED_MODULE_1__/* .WindowingTrackerBase */ .rN {
  constructor() {
    super(...arguments);
    this.imageLoaded = () => undefined;
    this.loadedLocations = [];
    this.cache = {};
    this.sendLoaded = lodash_throttle_js__WEBPACK_IMPORTED_MODULE_0___default()(() => {
      this.imageLoaded(new _internal_data_grid_cell_set_js__WEBPACK_IMPORTED_MODULE_2__/* .CellSet */ .$(this.loadedLocations));
      this.loadedLocations = [];
    }, 20);
    this.clearOutOfWindow = () => {
      const keys = Object.keys(this.cache);
      for (const key of keys) {
        const obj = this.cache[key];
        let keep = false;
        for (let j = 0; j < obj.cells.length; j++) {
          const packed = obj.cells[j];
          if (this.isInWindow(packed)) {
            keep = true;
            break;
          }
        }
        if (keep) {
          obj.cells = obj.cells.filter(this.isInWindow);
        } else {
          obj.cancel();
          delete this.cache[key];
        }
      }
    };
  }
  setCallback(imageLoaded) {
    this.imageLoaded = imageLoaded;
  }
  loadImage(url, col, row, key) {
    var _imgPool$pop;
    let loaded = false;
    const img = (_imgPool$pop = imgPool.pop()) !== null && _imgPool$pop !== void 0 ? _imgPool$pop : new Image();
    let canceled = false;
    const result = {
      img: undefined,
      cells: [(0,_render_state_provider_js__WEBPACK_IMPORTED_MODULE_1__/* .packColRowToNumber */ .gY)(col, row)],
      url,
      cancel: () => {
        if (canceled) return;
        canceled = true;
        if (imgPool.length < 12) {
          imgPool.unshift(img);
        } else if (!loaded) {
          img.src = "";
        }
      }
    };
    const loadPromise = new Promise(r => img.addEventListener("load", () => r(null)));
    requestAnimationFrame(async () => {
      try {
        img.src = url;
        await loadPromise;
        await img.decode();
        const toWrite = this.cache[key];
        if (toWrite !== undefined && !canceled) {
          toWrite.img = img;
          for (const packed of toWrite.cells) {
            this.loadedLocations.push((0,_render_state_provider_js__WEBPACK_IMPORTED_MODULE_1__/* .unpackNumberToColRow */ .kJ)(packed));
          }
          loaded = true;
          this.sendLoaded();
        }
      } catch {
        result.cancel();
      }
    });
    this.cache[key] = result;
  }
  loadOrGetImage(url, col, row) {
    const key = url;
    const current = this.cache[key];
    if (current !== undefined) {
      const packed = (0,_render_state_provider_js__WEBPACK_IMPORTED_MODULE_1__/* .packColRowToNumber */ .gY)(col, row);
      if (!current.cells.includes(packed)) {
        current.cells.push(packed);
      }
      return current.img;
    } else {
      this.loadImage(url, col, row, key);
    }
    return undefined;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageWindowLoaderImpl);

/***/ }),

/***/ "./packages/core/src/common/math.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$y": () => (/* binding */ hugRectToTarget),
/* harmony export */   "jd": () => (/* binding */ splitRectIntoRegions),
/* harmony export */   "qZ": () => (/* binding */ combineRects),
/* harmony export */   "qb": () => (/* binding */ intersectRect),
/* harmony export */   "qr": () => (/* binding */ pointInRect),
/* harmony export */   "tJ": () => (/* binding */ rectContains),
/* harmony export */   "vN": () => (/* binding */ getClosestRect)
/* harmony export */ });
/* harmony import */ var _internal_data_grid_render_data_grid_lib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./packages/core/src/internal/data-grid/render/data-grid-lib.ts");

function getClosestRect(rect, px, py, allowedDirections) {
  if (allowedDirections === "any") return combineRects(rect, {
    x: px,
    y: py,
    width: 1,
    height: 1
  });
  if (allowedDirections === "vertical") px = rect.x;
  if (allowedDirections === "horizontal") py = rect.y;
  if ((0,_internal_data_grid_render_data_grid_lib_js__WEBPACK_IMPORTED_MODULE_0__/* .itemIsInRect */ .X4)([px, py], rect)) {
    return undefined;
  }
  const distanceToLeft = px - rect.x;
  const distanceToRight = rect.x + rect.width - px;
  const distanceToTop = py - rect.y + 1;
  const distanceToBottom = rect.y + rect.height - py;
  const minDistance = Math.min(allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToLeft, allowedDirections === "vertical" ? Number.MAX_SAFE_INTEGER : distanceToRight, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToTop, allowedDirections === "horizontal" ? Number.MAX_SAFE_INTEGER : distanceToBottom);
  if (minDistance === distanceToBottom) {
    return {
      x: rect.x,
      y: rect.y + rect.height,
      width: rect.width,
      height: py - rect.y - rect.height + 1
    };
  } else if (minDistance === distanceToTop) {
    return {
      x: rect.x,
      y: py,
      width: rect.width,
      height: rect.y - py
    };
  } else if (minDistance === distanceToRight) {
    return {
      x: rect.x + rect.width,
      y: rect.y,
      width: px - rect.x - rect.width + 1,
      height: rect.height
    };
  } else {
    return {
      x: px,
      y: rect.y,
      width: rect.x - px,
      height: rect.height
    };
  }
}
function intersectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1;
}
function pointInRect(rect, x, y) {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
function combineRects(a, b) {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  const width = Math.max(a.x + a.width, b.x + b.width) - x;
  const height = Math.max(a.y + a.height, b.y + b.height) - y;
  return {
    x,
    y,
    width,
    height
  };
}
function rectContains(a, b) {
  return a.x <= b.x && a.y <= b.y && a.x + a.width >= b.x + b.width && a.y + a.height >= b.y + b.height;
}
function hugRectToTarget(rect, width, height, mod) {
  if (rect.x > width || rect.y > height || rect.x < 0 && rect.y < 0 && rect.x + rect.width > width && rect.y + rect.height > height) {
    return undefined;
  }
  if (rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= width && rect.y + rect.height <= height) {
    return rect;
  }
  const leftMax = -4;
  const topMax = -4;
  const rightMax = width + 4;
  const bottomMax = height + 4;
  const leftOverflow = leftMax - rect.x;
  const rightOverflow = rect.x + rect.width - rightMax;
  const topOverflow = topMax - rect.y;
  const bottomOverflow = rect.y + rect.height - bottomMax;
  const left = leftOverflow > 0 ? rect.x + Math.floor(leftOverflow / mod) * mod : rect.x;
  const right = rightOverflow > 0 ? rect.x + rect.width - Math.floor(rightOverflow / mod) * mod : rect.x + rect.width;
  const top = topOverflow > 0 ? rect.y + Math.floor(topOverflow / mod) * mod : rect.y;
  const bottom = bottomOverflow > 0 ? rect.y + rect.height - Math.floor(bottomOverflow / mod) * mod : rect.y + rect.height;
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
}
function splitRectIntoRegions(rect, splitIndicies, width, height, splitLocations) {
  const [lSplit, tSplit, rSplit, bSplit] = splitIndicies;
  const [lClip, tClip, rClip, bClip] = splitLocations;
  const {
    x: inX,
    y: inY,
    width: inW,
    height: inH
  } = rect;
  const result = [];
  if (inW <= 0 || inH <= 0) return result;
  const inRight = inX + inW;
  const inBottom = inY + inH;
  const isOverLeft = inX < lSplit;
  const isOverTop = inY < tSplit;
  const isOverRight = inX + inW > rSplit;
  const isOverBottom = inY + inH > bSplit;
  const isOverCenterVert = inX >= lSplit && inX < rSplit || inRight > lSplit && inRight <= rSplit || inX < lSplit && inRight > rSplit;
  const isOverCenterHoriz = inY >= tSplit && inY < bSplit || inBottom > tSplit && inBottom <= bSplit || inY < tSplit && inBottom > bSplit;
  const isOverCenter = isOverCenterVert && isOverCenterHoriz;
  if (isOverCenter) {
    const x = Math.max(inX, lSplit);
    const y = Math.max(inY, tSplit);
    const right = Math.min(inRight, rSplit);
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: tClip,
        width: rClip - lClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverLeft && isOverTop) {
    const x = inX;
    const y = inY;
    const right = Math.min(inRight, lSplit);
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: 0,
        width: lClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverTop && isOverCenterVert) {
    const x = Math.max(inX, lSplit);
    const y = inY;
    const right = Math.min(inRight, rSplit);
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: 0,
        width: rClip - lClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverTop && isOverRight) {
    const x = Math.max(inX, rSplit);
    const y = inY;
    const right = inRight;
    const bottom = Math.min(inBottom, tSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: 0,
        width: width - rClip + 1,
        height: tClip + 1
      }
    });
  }
  if (isOverLeft && isOverCenterHoriz) {
    const x = inX;
    const y = Math.max(inY, tSplit);
    const right = Math.min(inRight, lSplit);
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: tClip,
        width: lClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverRight && isOverCenterHoriz) {
    const x = Math.max(inX, rSplit);
    const y = Math.max(inY, tSplit);
    const right = inRight;
    const bottom = Math.min(inBottom, bSplit);
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: tClip,
        width: width - rClip + 1,
        height: bClip - tClip + 1
      }
    });
  }
  if (isOverLeft && isOverBottom) {
    const x = inX;
    const y = Math.max(inY, bSplit);
    const right = Math.min(inRight, lSplit);
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: 0,
        y: bClip,
        width: lClip + 1,
        height: height - bClip + 1
      }
    });
  }
  if (isOverBottom && isOverCenterVert) {
    const x = Math.max(inX, lSplit);
    const y = Math.max(inY, bSplit);
    const right = Math.min(inRight, rSplit);
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: lClip,
        y: bClip,
        width: rClip - lClip + 1,
        height: height - bClip + 1
      }
    });
  }
  if (isOverRight && isOverBottom) {
    const x = Math.max(inX, rSplit);
    const y = Math.max(inY, bSplit);
    const right = inRight;
    const bottom = inBottom;
    result.push({
      rect: {
        x,
        y,
        width: right - x,
        height: bottom - y
      },
      clip: {
        x: rClip,
        y: bClip,
        width: width - rClip + 1,
        height: height - bClip + 1
      }
    });
  }
  return result;
}

/***/ }),

/***/ "./packages/core/src/common/render-state-provider.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$d": () => (/* binding */ RenderStateProvider),
/* harmony export */   "Sl": () => (/* binding */ unpackRow),
/* harmony export */   "gY": () => (/* binding */ packColRowToNumber),
/* harmony export */   "kJ": () => (/* binding */ unpackNumberToColRow),
/* harmony export */   "rN": () => (/* binding */ WindowingTrackerBase)
/* harmony export */ });
/* unused harmony export unpackCol */
/* harmony import */ var _support_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./packages/core/src/common/support.ts");

const rowShift = 1 << 21;
function packColRowToNumber(col, row) {
  return (row + 2) * rowShift + col;
}
function unpackCol(packed) {
  return packed % rowShift;
}
function unpackRow(packed) {
  return Math.floor(packed / rowShift) - 2;
}
function unpackNumberToColRow(packed) {
  const col = unpackCol(packed);
  const row = unpackRow(packed);
  return [col, row];
}
class WindowingTrackerBase {
  constructor() {
    this.visibleWindow = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.freezeCols = 0;
    this.freezeRows = [];
    this.isInWindow = packed => {
      const col = unpackCol(packed);
      const row = unpackRow(packed);
      const w = this.visibleWindow;
      const colInWindow = col >= w.x && col <= w.x + w.width || col < this.freezeCols;
      const rowInWindow = row >= w.y && row <= w.y + w.height || this.freezeRows.includes(row);
      return colInWindow && rowInWindow;
    };
    this.clearOutOfWindow = void 0;
  }
  setWindow(newWindow, freezeCols, freezeRows) {
    if (this.visibleWindow.x === newWindow.x && this.visibleWindow.y === newWindow.y && this.visibleWindow.width === newWindow.width && this.visibleWindow.height === newWindow.height && this.freezeCols === freezeCols && (0,_support_js__WEBPACK_IMPORTED_MODULE_0__/* .deepEqual */ .vZ)(this.freezeRows, freezeRows)) return;
    this.visibleWindow = newWindow;
    this.freezeCols = freezeCols;
    this.freezeRows = freezeRows;
    this.clearOutOfWindow();
  }
}
class RenderStateProvider extends WindowingTrackerBase {
  constructor() {
    super(...arguments);
    this.cache = new Map();
    this.setValue = (location, state) => {
      this.cache.set(packColRowToNumber(location[0], location[1]), state);
    };
    this.getValue = location => {
      return this.cache.get(packColRowToNumber(location[0], location[1]));
    };
    this.clearOutOfWindow = () => {
      for (const [key] of this.cache.entries()) {
        if (!this.isInWindow(key)) {
          this.cache.delete(key);
        }
      }
    };
  }
}

/***/ }),

/***/ "./packages/core/src/common/styles.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ni": () => (/* binding */ ThemeContext),
/* harmony export */   "Zu": () => (/* binding */ getDataEditorTheme),
/* harmony export */   "be": () => (/* binding */ makeCSSStyle),
/* harmony export */   "yR": () => (/* binding */ mergeAndRealizeTheme)
/* harmony export */ });
/* unused harmony export useTheme */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_color_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/src/internal/data-grid/color-parser.ts");


function makeCSSStyle(theme) {
  var _theme$textGroupHeade, _theme$horizontalBord;
  return {
    "--gdg-accent-color": theme.accentColor,
    "--gdg-accent-fg": theme.accentFg,
    "--gdg-accent-light": theme.accentLight,
    "--gdg-text-dark": theme.textDark,
    "--gdg-text-medium": theme.textMedium,
    "--gdg-text-light": theme.textLight,
    "--gdg-text-bubble": theme.textBubble,
    "--gdg-bg-icon-header": theme.bgIconHeader,
    "--gdg-fg-icon-header": theme.fgIconHeader,
    "--gdg-text-header": theme.textHeader,
    "--gdg-text-group-header": (_theme$textGroupHeade = theme.textGroupHeader) !== null && _theme$textGroupHeade !== void 0 ? _theme$textGroupHeade : theme.textHeader,
    "--gdg-text-header-selected": theme.textHeaderSelected,
    "--gdg-bg-cell": theme.bgCell,
    "--gdg-bg-cell-medium": theme.bgCellMedium,
    "--gdg-bg-header": theme.bgHeader,
    "--gdg-bg-header-has-focus": theme.bgHeaderHasFocus,
    "--gdg-bg-header-hovered": theme.bgHeaderHovered,
    "--gdg-bg-bubble": theme.bgBubble,
    "--gdg-bg-bubble-selected": theme.bgBubbleSelected,
    "--gdg-bg-search-result": theme.bgSearchResult,
    "--gdg-border-color": theme.borderColor,
    "--gdg-horizontal-border-color": (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor,
    "--gdg-drilldown-border": theme.drilldownBorder,
    "--gdg-link-color": theme.linkColor,
    "--gdg-cell-horizontal-padding": `${theme.cellHorizontalPadding}px`,
    "--gdg-cell-vertical-padding": `${theme.cellVerticalPadding}px`,
    "--gdg-header-font-style": theme.headerFontStyle,
    "--gdg-base-font-style": theme.baseFontStyle,
    "--gdg-marker-font-style": theme.markerFontStyle,
    "--gdg-font-family": theme.fontFamily,
    "--gdg-editor-font-size": theme.editorFontSize,
    ...(theme.resizeIndicatorColor === undefined ? {} : {
      "--gdg-resize-indicator-color": theme.resizeIndicatorColor
    }),
    ...(theme.headerBottomBorderColor === undefined ? {} : {
      "--gdg-header-bottom-border-color": theme.headerBottomBorderColor
    }),
    ...(theme.roundingRadius === undefined ? {} : {
      "--gdg-rounding-radius": `${theme.roundingRadius}px`
    })
  };
}
const dataEditorBaseTheme = {
  accentColor: "#4F5DFF",
  accentFg: "#FFFFFF",
  accentLight: "rgba(62, 116, 253, 0.1)",
  textDark: "#313139",
  textMedium: "#737383",
  textLight: "#B2B2C0",
  textBubble: "#313139",
  bgIconHeader: "#737383",
  fgIconHeader: "#FFFFFF",
  textHeader: "#313139",
  textGroupHeader: "#313139BB",
  textHeaderSelected: "#FFFFFF",
  bgCell: "#FFFFFF",
  bgCellMedium: "#FAFAFB",
  bgHeader: "#F7F7F8",
  bgHeaderHasFocus: "#E9E9EB",
  bgHeaderHovered: "#EFEFF1",
  bgBubble: "#EDEDF3",
  bgBubbleSelected: "#FFFFFF",
  bgSearchResult: "#fff9e3",
  borderColor: "rgba(115, 116, 131, 0.16)",
  drilldownBorder: "rgba(0, 0, 0, 0)",
  linkColor: "#353fb5",
  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,
  headerIconSize: 18,
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  markerFontStyle: "9px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
  editorFontSize: "13px",
  lineHeight: 1.4
};
function getDataEditorTheme() {
  return dataEditorBaseTheme;
}
const ThemeContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(dataEditorBaseTheme);
function useTheme() {
  return React.useContext(ThemeContext);
}
function mergeAndRealizeTheme(theme) {
  const merged = {
    ...theme
  };
  for (var _len = arguments.length, overlays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    overlays[_key - 1] = arguments[_key];
  }
  for (const overlay of overlays) {
    if (overlay !== undefined) {
      for (const key in overlay) {
        if (overlay.hasOwnProperty(key)) {
          if (key === "bgCell") {
            merged[key] = (0,_internal_data_grid_color_parser_js__WEBPACK_IMPORTED_MODULE_1__/* .blend */ .NH)(overlay[key], merged[key]);
          } else {
            merged[key] = overlay[key];
          }
        }
      }
    }
  }
  if (merged.headerFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.headerFontStyle !== merged.headerFontStyle) {
    merged.headerFontFull = `${merged.headerFontStyle} ${merged.fontFamily}`;
  }
  if (merged.baseFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.baseFontStyle !== merged.baseFontStyle) {
    merged.baseFontFull = `${merged.baseFontStyle} ${merged.fontFamily}`;
  }
  if (merged.markerFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.markerFontStyle !== merged.markerFontStyle) {
    merged.markerFontFull = `${merged.markerFontStyle} ${merged.fontFamily}`;
  }
  return merged;
}

/***/ }),

/***/ "./packages/core/src/common/support.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NG": () => (/* binding */ proveType),
/* harmony export */   "hu": () => (/* binding */ assert),
/* harmony export */   "vE": () => (/* binding */ assertNever),
/* harmony export */   "vZ": () => (/* binding */ deepEqual),
/* harmony export */   "wY": () => (/* binding */ maybe)
/* harmony export */ });
function proveType(_val) {}
function panic() {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This should not happen";
  throw new Error(message);
}
function assert(fact) {
  let message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Assertion failed";
  if (fact) return;
  return panic(message);
}
function assertNever(_never, msg) {
  return panic(msg !== null && msg !== void 0 ? msg : "Hell froze over");
}
function maybe(fn, defaultValue) {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
const has = Object.prototype.hasOwnProperty;
function deepEqual(foo, bar) {
  let ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && deepEqual(foo[len], bar[len]));
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !deepEqual(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

/***/ }),

/***/ "./packages/core/src/common/utils.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ht": () => (/* binding */ degreesToRadians),
/* harmony export */   "Iz": () => (/* binding */ getScrollBarWidth),
/* harmony export */   "MC": () => (/* binding */ Checkmark),
/* harmony export */   "OR": () => (/* binding */ useEventListener),
/* harmony export */   "Qo": () => (/* binding */ getSquareWidth),
/* harmony export */   "Qy": () => (/* binding */ useDebouncedMemo),
/* harmony export */   "Wy": () => (/* binding */ EditPencil),
/* harmony export */   "XC": () => (/* binding */ getSquareXPosFromAlign),
/* harmony export */   "ig": () => (/* binding */ useStateWithReactiveInput),
/* harmony export */   "jM": () => (/* binding */ makeAccessibilityStringForArray),
/* harmony export */   "kq": () => (/* binding */ getSquareBB),
/* harmony export */   "o7": () => (/* binding */ direction),
/* harmony export */   "qJ": () => (/* binding */ whenDefined),
/* harmony export */   "qq": () => (/* binding */ pointIsWithinBB),
/* harmony export */   "vE": () => (/* binding */ useDeepMemo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _support_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/common/support.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-runtime.js");





function useEventListener(eventName, handler, element, passive) {
  let capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const savedHandler = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  savedHandler.current = handler;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (element === null || element.addEventListener === undefined) return;
    const el = element;
    const eventListener = event => {
      var _savedHandler$current;
      (_savedHandler$current = savedHandler.current) === null || _savedHandler$current === void 0 || _savedHandler$current.call(el, event);
    };
    el.addEventListener(eventName, eventListener, {
      passive,
      capture
    });
    return () => {
      el.removeEventListener(eventName, eventListener, {
        capture
      });
    };
  }, [eventName, element, passive, capture]);
}
function whenDefined(obj, result) {
  return obj === undefined ? undefined : result;
}
const PI = Math.PI;
function degreesToRadians(degrees) {
  return degrees * PI / 180;
}
const getSquareBB = (posX, posY, squareSideLength) => ({
  x1: posX - squareSideLength / 2,
  y1: posY - squareSideLength / 2,
  x2: posX + squareSideLength / 2,
  y2: posY + squareSideLength / 2
});
const getSquareXPosFromAlign = (alignment, containerX, containerWidth, horizontalPadding, squareWidth) => {
  switch (alignment) {
    case "left":
      return Math.floor(containerX) + horizontalPadding + squareWidth / 2;
    case "center":
      return Math.floor(containerX + containerWidth / 2);
    case "right":
      return Math.floor(containerX + containerWidth) - horizontalPadding - squareWidth / 2;
  }
};
const getSquareWidth = (maxSize, containerHeight, verticalPadding) => Math.min(maxSize, containerHeight - verticalPadding * 2);
const pointIsWithinBB = (x, y, bb) => bb.x1 <= x && x <= bb.x2 && bb.y1 <= y && y <= bb.y2;
const EditPencil = props => {
  var _props$fgColor;
  const fg = (_props$fgColor = props.fgColor) !== null && _props$fgColor !== void 0 ? _props$fgColor : "currentColor";
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
      d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929",
      stroke: fg,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      vectorEffect: "non-scaling-stroke"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
      d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z",
      stroke: fg,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      vectorEffect: "non-scaling-stroke"
    })]
  });
};
EditPencil.displayName = "EditPencil";
const Checkmark = props => {
  var _props$fgColor2;
  const fg = (_props$fgColor2 = props.fgColor) !== null && _props$fgColor2 !== void 0 ? _props$fgColor2 : "currentColor";
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
      d: "M19 6L10.3802 17L5.34071 11.8758",
      vectorEffect: "non-scaling-stroke",
      stroke: fg,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
};
Checkmark.displayName = "Checkmark";
function useDebouncedMemo(factory, deps, time) {
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(factory);
  const mountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => () => {
    mountedRef.current = false;
  }, []);
  const debouncedSetState = react__WEBPACK_IMPORTED_MODULE_0__.useRef(lodash_debounce_js__WEBPACK_IMPORTED_MODULE_1___default()(x => {
    if (mountedRef.current) {
      setState(x);
    }
  }, time));
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    if (mountedRef.current) {
      debouncedSetState.current(() => factory());
    }
  }, deps);
  return state;
}
const rtlRange = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
const ltrRange = "A-Za-z\u00C0-\u00D6\u00D8-\u00F6" + "\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C" + "\uFE00-\uFE6F\uFEFD-\uFFFF";
const rtl = new RegExp("^[^" + ltrRange + "]*[" + rtlRange + "]");
function direction(value) {
  return rtl.test(value) ? "rtl" : "not-rtl";
}
let scrollbarWidthCache = undefined;
function getScrollBarWidth() {
  if (typeof document === "undefined") return 0;
  if (scrollbarWidthCache !== undefined) return scrollbarWidthCache;
  const inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";
  const outer = document.createElement("div");
  outer.id = "testScrollbar";
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.append(inner);
  document.body.append(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  scrollbarWidthCache = w1 - w2;
  return scrollbarWidthCache;
}
const empty = Symbol();
function useStateWithReactiveInput(inputState) {
  const inputStateRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef([empty, inputState]);
  if (inputStateRef.current[1] !== inputState) {
    inputStateRef.current[0] = inputState;
  }
  inputStateRef.current[1] = inputState;
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(inputState);
  const [, forceRender] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const setStateOuter = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(nv => {
    const s = inputStateRef.current[0];
    if (s !== empty) {
      nv = typeof nv === "function" ? nv(s) : nv;
      if (nv === s) return;
    }
    if (s !== empty) forceRender({});
    setState(pv => {
      if (typeof nv === "function") {
        return nv(s === empty ? pv : s);
      }
      return nv;
    });
    inputStateRef.current[0] = empty;
  }, []);
  const onEmpty = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    inputStateRef.current[0] = empty;
    forceRender({});
  }, []);
  return [inputStateRef.current[0] === empty ? state : inputStateRef.current[0], setStateOuter, onEmpty];
}
function makeAccessibilityStringForArray(arr) {
  if (arr.length === 0) {
    return "";
  }
  let index = 0;
  let count = 0;
  for (const str of arr) {
    count += str.length;
    if (count > 10000) break;
    index++;
  }
  return arr.slice(0, index).join(", ");
}
function useDeepMemo(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
  if (!(0,_support_js__WEBPACK_IMPORTED_MODULE_3__/* .deepEqual */ .vZ)(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

/***/ }),

/***/ "./packages/core/src/data-editor/copy-paste.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ getCopyBufferContents),
/* harmony export */   "p": () => (/* binding */ decodeHTML)
/* harmony export */ });
/* harmony import */ var _common_support_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/src/common/support.ts");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");


function convertCellToBuffer(cell) {
  var _cell$displayData, _cell$displayData2;
  if (cell.copyData !== undefined) {
    return {
      formatted: cell.copyData,
      rawValue: cell.copyData,
      format: "string"
    };
  }
  switch (cell.kind) {
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Boolean */ .p6.Boolean:
      return {
        formatted: cell.data === true ? "TRUE" : cell.data === false ? "FALSE" : cell.data === _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .BooleanIndeterminate */ .sd ? "INDETERMINATE" : "",
        rawValue: cell.data,
        format: "boolean"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Custom */ .p6.Custom:
      return {
        formatted: cell.copyData,
        rawValue: cell.copyData,
        format: "string"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Image */ .p6.Image:
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Bubble */ .p6.Bubble:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string-array"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Drilldown */ .p6.Drilldown:
      return {
        formatted: cell.data.map(x => x.text),
        rawValue: cell.data.map(x => x.text),
        format: "string-array"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Text */ .p6.Text:
      return {
        formatted: (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Uri */ .p6.Uri:
      return {
        formatted: (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data,
        rawValue: cell.data,
        format: "url"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Markdown */ .p6.Markdown:
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.RowID */ .p6.RowID:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Number */ .p6.Number:
      return {
        formatted: cell.displayData,
        rawValue: cell.data,
        format: "number"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Loading */ .p6.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_0__/* .GridCellKind.Protected */ .p6.Protected:
      return {
        formatted: "************",
        rawValue: "",
        format: "string"
      };
    default:
      (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNever */ .vE)(cell);
  }
}
function createBufferFromGridCells(cells, columnIndexes) {
  const copyBuffer = cells.map((row, index) => {
    const mappedIndex = columnIndexes[index];
    return row.map(cell => {
      if (cell.span !== undefined && cell.span[0] !== mappedIndex) return {
        formatted: "",
        rawValue: "",
        format: "string"
      };
      return convertCellToBuffer(cell);
    });
  });
  return copyBuffer;
}
function escapeIfNeeded(str, withComma) {
  if ((withComma ? /[\t\n",]/ : /[\t\n"]/).test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function createTextBuffer(copyBuffer) {
  const lines = [];
  for (const row of copyBuffer) {
    const line = [];
    for (const cell of row) {
      if (cell.format === "url") {
        var _cell$rawValue$toStri, _cell$rawValue;
        line.push((_cell$rawValue$toStri = (_cell$rawValue = cell.rawValue) === null || _cell$rawValue === void 0 ? void 0 : _cell$rawValue.toString()) !== null && _cell$rawValue$toStri !== void 0 ? _cell$rawValue$toStri : "");
      } else if (cell.format === "string-array") {
        line.push(cell.formatted.map(x => escapeIfNeeded(x, true)).join(","));
      } else {
        line.push(escapeIfNeeded(cell.formatted, false));
      }
    }
    lines.push(line.join("\t"));
  }
  return lines.join("\n");
}
function formatHtmlTextContent(text) {
  return text.replace(/\t/g, "    ").replace(/ {2,}/g, match => "<span> </span>".repeat(match.length));
}
function formatHtmlAttributeContent(attrText) {
  return '"' + attrText.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"';
}
function restoreHtmlEntities(str) {
  return str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function createHtmlBuffer(copyBuffer) {
  const lines = [];
  lines.push(`<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>`, "<table><tbody>");
  for (const row of copyBuffer) {
    lines.push("<tr>");
    for (const cell of row) {
      const formatStr = `gdg-format="${cell.format}"`;
      if (cell.format === "url") {
        lines.push(`<td ${formatStr}><a href="${cell.rawValue}">${formatHtmlTextContent(cell.formatted)}</a></td>`);
      } else {
        if (cell.format === "string-array") {
          lines.push(`<td ${formatStr}><ol>${cell.formatted.map((x, ind) => `<li gdg-raw-value=${formatHtmlAttributeContent(cell.rawValue[ind])}>` + formatHtmlTextContent(x) + "</li>").join("")}</ol></td>`);
        } else {
          var _cell$rawValue$toStri2, _cell$rawValue2;
          lines.push(`<td gdg-raw-value=${formatHtmlAttributeContent((_cell$rawValue$toStri2 = (_cell$rawValue2 = cell.rawValue) === null || _cell$rawValue2 === void 0 ? void 0 : _cell$rawValue2.toString()) !== null && _cell$rawValue$toStri2 !== void 0 ? _cell$rawValue$toStri2 : "")} ${formatStr}>${formatHtmlTextContent(cell.formatted)}</td>`);
        }
      }
    }
    lines.push("</tr>");
  }
  lines.push("</tbody></table>");
  return lines.join("");
}
function getCopyBufferContents(cells, columnIndexes) {
  const copyBuffer = createBufferFromGridCells(cells, columnIndexes);
  const textPlain = createTextBuffer(copyBuffer);
  const textHtml = createHtmlBuffer(copyBuffer);
  return {
    textPlain,
    textHtml
  };
}
function decodeHTML(html) {
  const fragment = document.createElement("html");
  fragment.innerHTML = html.replace(/&nbsp;/g, " ");
  const tableEl = fragment.querySelector("table");
  if (tableEl === null) return undefined;
  const walkEl = [tableEl];
  const result = [];
  let current;
  while (walkEl.length > 0) {
    const el = walkEl.pop();
    if (el === undefined) break;
    if (el instanceof HTMLTableElement || el.nodeName === "TBODY") {
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableRowElement) {
      if (current !== undefined) {
        result.push(current);
      }
      current = [];
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableCellElement) {
      var _clone$getAttribute;
      const clone = el.cloneNode(true);
      const firstTagIsPara = clone.children.length === 1 && clone.children[0].nodeName === "P";
      const para = firstTagIsPara ? clone.children[0] : null;
      const isAppleNumbers = (para === null || para === void 0 ? void 0 : para.children.length) === 1 && para.children[0].nodeName === "FONT";
      const brs = clone.querySelectorAll("br");
      for (const br of brs) {
        br.replaceWith("\n");
      }
      const attributeValue = clone.getAttribute("gdg-raw-value");
      const formatValue = (_clone$getAttribute = clone.getAttribute("gdg-format")) !== null && _clone$getAttribute !== void 0 ? _clone$getAttribute : "string";
      if (clone.querySelector("a") !== null) {
        var _current, _clone$querySelector$, _clone$querySelector, _clone$textContent;
        (_current = current) === null || _current === void 0 || _current.push({
          rawValue: (_clone$querySelector$ = (_clone$querySelector = clone.querySelector("a")) === null || _clone$querySelector === void 0 ? void 0 : _clone$querySelector.getAttribute("href")) !== null && _clone$querySelector$ !== void 0 ? _clone$querySelector$ : "",
          formatted: (_clone$textContent = clone.textContent) !== null && _clone$textContent !== void 0 ? _clone$textContent : "",
          format: formatValue
        });
      } else if (clone.querySelector("ol") !== null) {
        var _current2;
        const rawValues = clone.querySelectorAll("li");
        (_current2 = current) === null || _current2 === void 0 || _current2.push({
          rawValue: [...rawValues].map(x => {
            var _x$getAttribute;
            return (_x$getAttribute = x.getAttribute("gdg-raw-value")) !== null && _x$getAttribute !== void 0 ? _x$getAttribute : "";
          }),
          formatted: [...rawValues].map(x => {
            var _x$textContent;
            return (_x$textContent = x.textContent) !== null && _x$textContent !== void 0 ? _x$textContent : "";
          }),
          format: "string-array"
        });
      } else if (attributeValue !== null) {
        var _current3, _clone$textContent2;
        (_current3 = current) === null || _current3 === void 0 || _current3.push({
          rawValue: restoreHtmlEntities(attributeValue),
          formatted: (_clone$textContent2 = clone.textContent) !== null && _clone$textContent2 !== void 0 ? _clone$textContent2 : "",
          format: formatValue
        });
      } else {
        var _clone$textContent3, _current4, _textContent, _textContent2;
        let textContent = (_clone$textContent3 = clone.textContent) !== null && _clone$textContent3 !== void 0 ? _clone$textContent3 : "";
        if (isAppleNumbers) {
          textContent = textContent.replace(/\n(?!\n)/g, "");
        }
        (_current4 = current) === null || _current4 === void 0 || _current4.push({
          rawValue: (_textContent = textContent) !== null && _textContent !== void 0 ? _textContent : "",
          formatted: (_textContent2 = textContent) !== null && _textContent2 !== void 0 ? _textContent2 : "",
          format: formatValue
        });
      }
    }
  }
  if (current !== undefined) {
    result.push(current);
  }
  return result;
}

/***/ }),

/***/ "./packages/core/src/data-editor/data-editor-fns.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D$": () => (/* binding */ toggleBoolean),
/* harmony export */   "I8": () => (/* binding */ unquote),
/* harmony export */   "hb": () => (/* binding */ expandSelection),
/* harmony export */   "vQ": () => (/* binding */ copyToClipboard)
/* harmony export */ });
/* harmony import */ var _copy_paste_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./packages/core/src/data-editor/copy-paste.ts");

function expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortController) {
  const origVal = newVal;
  if (spanRangeBehavior === "allowPartial" || newVal.current === undefined || getCellsForSelection === undefined) return newVal;
  let isFilled = false;
  do {
    var _newVal, _newVal$current;
    if (((_newVal = newVal) === null || _newVal === void 0 ? void 0 : _newVal.current) === undefined) break;
    const r = (_newVal$current = newVal.current) === null || _newVal$current === void 0 ? void 0 : _newVal$current.range;
    const cells = [];
    if (r.width > 2) {
      const leftCells = getCellsForSelection({
        x: r.x,
        y: r.y,
        width: 1,
        height: r.height
      }, abortController.signal);
      if (typeof leftCells === "function") {
        return origVal;
      }
      cells.push(...leftCells);
      const rightCells = getCellsForSelection({
        x: r.x + r.width - 1,
        y: r.y,
        width: 1,
        height: r.height
      }, abortController.signal);
      if (typeof rightCells === "function") {
        return origVal;
      }
      cells.push(...rightCells);
    } else {
      const rCells = getCellsForSelection({
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height
      }, abortController.signal);
      if (typeof rCells === "function") {
        return origVal;
      }
      cells.push(...rCells);
    }
    let left = r.x - rowMarkerOffset;
    let right = r.x + r.width - 1 - rowMarkerOffset;
    for (const row of cells) {
      for (const cell of row) {
        if (cell.span === undefined) continue;
        left = Math.min(cell.span[0], left);
        right = Math.max(cell.span[1], right);
      }
    }
    if (left === r.x - rowMarkerOffset && right === r.x + r.width - 1 - rowMarkerOffset) {
      isFilled = true;
    } else {
      var _newVal$current$cell;
      newVal = {
        current: {
          cell: (_newVal$current$cell = newVal.current.cell) !== null && _newVal$current$cell !== void 0 ? _newVal$current$cell : [0, 0],
          range: {
            x: left + rowMarkerOffset,
            y: r.y,
            width: right - left + 1,
            height: r.height
          },
          rangeStack: newVal.current.rangeStack
        },
        columns: newVal.columns,
        rows: newVal.rows
      };
    }
  } while (!isFilled);
  return newVal;
}
function descape(s) {
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1).replace(/""/g, '"');
  }
  return s;
}
function unquote(str) {
  let State = function (State) {
    State[State["None"] = 0] = "None";
    State[State["inString"] = 1] = "inString";
    State[State["inStringPostQuote"] = 2] = "inStringPostQuote";
    return State;
  }({});
  const result = [];
  let current = [];
  let start = 0;
  let state = State.None;
  str = str.replace(/\r\n/g, "\n");
  let index = 0;
  for (const char of str) {
    switch (state) {
      case State.None:
        if (char === "\t" || char === "\n") {
          current.push(str.slice(start, index));
          start = index + 1;
          if (char === "\n") {
            result.push(current);
            current = [];
          }
        } else if (char === `"`) {
          state = State.inString;
        }
        break;
      case State.inString:
        if (char === `"`) {
          state = State.inStringPostQuote;
        }
        break;
      case State.inStringPostQuote:
        if (char === '"') {
          state = State.inString;
        } else if (char === "\t" || char === "\n") {
          current.push(descape(str.slice(start, index)));
          start = index + 1;
          if (char === "\n") {
            result.push(current);
            current = [];
          }
          state = State.None;
        } else {
          state = State.None;
        }
        break;
    }
    index++;
  }
  if (start < str.length) {
    current.push(descape(str.slice(start, str.length)));
  }
  result.push(current);
  return result.map(r => r.map(c => ({
    rawValue: c,
    formatted: c,
    format: "string"
  })));
}
function copyToClipboard(cells, columnIndexes, e) {
  var _window$navigator$cli3;
  const copyBuffer = (0,_copy_paste_js__WEBPACK_IMPORTED_MODULE_0__/* .getCopyBufferContents */ .I)(cells, columnIndexes);
  const copyWithWriteText = s => {
    var _window$navigator$cli;
    void ((_window$navigator$cli = window.navigator.clipboard) === null || _window$navigator$cli === void 0 ? void 0 : _window$navigator$cli.writeText(s));
  };
  const copyWithWrite = (s, html) => {
    var _window$navigator$cli2;
    if (((_window$navigator$cli2 = window.navigator.clipboard) === null || _window$navigator$cli2 === void 0 ? void 0 : _window$navigator$cli2.write) === undefined) return false;
    void window.navigator.clipboard.write([new ClipboardItem({
      "text/plain": new Blob([s], {
        type: "text/plain"
      }),
      "text/html": new Blob([html], {
        type: "text/html"
      })
    })]);
    return true;
  };
  const copyWithClipboardData = (s, html) => {
    try {
      var _e$clipboardData, _e$clipboardData2;
      if (e === undefined || e.clipboardData === null) throw new Error("No clipboard data");
      e === null || e === void 0 || (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 || _e$clipboardData.setData("text/plain", s);
      e === null || e === void 0 || (_e$clipboardData2 = e.clipboardData) === null || _e$clipboardData2 === void 0 || _e$clipboardData2.setData("text/html", html);
    } catch {
      if (!copyWithWrite(s, html)) {
        copyWithWriteText(s);
      }
    }
  };
  if (((_window$navigator$cli3 = window.navigator.clipboard) === null || _window$navigator$cli3 === void 0 ? void 0 : _window$navigator$cli3.write) !== undefined || (e === null || e === void 0 ? void 0 : e.clipboardData) !== undefined) {
    void copyWithClipboardData(copyBuffer.textPlain, copyBuffer.textHtml);
  } else {
    void copyWithWriteText(copyBuffer.textPlain);
  }
  e === null || e === void 0 || e.preventDefault();
}
function toggleBoolean(data) {
  return data !== true;
}

/***/ }),

/***/ "./packages/core/src/internal/data-grid/cell-set.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ CellSet)
/* harmony export */ });
/* harmony import */ var _common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./packages/core/src/common/render-state-provider.ts");

class CellSet {
  constructor() {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.cells = void 0;
    this.cells = new Set(items.map(x => (0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .packColRowToNumber */ .gY)(x[0], x[1])));
  }
  add(cell) {
    this.cells.add((0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .packColRowToNumber */ .gY)(cell[0], cell[1]));
  }
  has(cell) {
    if (cell === undefined) return false;
    return this.cells.has((0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .packColRowToNumber */ .gY)(cell[0], cell[1]));
  }
  remove(cell) {
    this.cells.delete((0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .packColRowToNumber */ .gY)(cell[0], cell[1]));
  }
  clear() {
    this.cells.clear();
  }
  get size() {
    return this.cells.size;
  }
  hasHeader() {
    for (const cellNumber of this.cells) {
      const row = (0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .unpackRow */ .Sl)(cellNumber);
      if (row < 0) return true;
    }
    return false;
  }
  hasItemInRectangle(rect) {
    for (let row = rect.y; row < rect.y + rect.height; row++) {
      for (let col = rect.x; col < rect.x + rect.width; col++) {
        if (this.cells.has((0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .packColRowToNumber */ .gY)(col, row))) {
          return true;
        }
      }
    }
    return false;
  }
  hasItemInRegion(rect) {
    for (const r of rect) {
      if (this.hasItemInRectangle(r)) {
        return true;
      }
    }
    return false;
  }
  *values() {
    for (const cellNumber of this.cells) {
      yield (0,_common_render_state_provider_js__WEBPACK_IMPORTED_MODULE_0__/* .unpackNumberToColRow */ .kJ)(cellNumber);
    }
  }
}

/***/ }),

/***/ "./packages/core/src/internal/data-grid/color-parser.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NH": () => (/* binding */ blend),
/* harmony export */   "fG": () => (/* binding */ withAlpha),
/* harmony export */   "mv": () => (/* binding */ blendCache)
/* harmony export */ });
/* unused harmony exports parseToRgba, interpolateColors, getLuminance */
const cache = {};
let div = null;
function createDiv() {
  const d = document.createElement("div");
  d.style.opacity = "0";
  d.style.pointerEvents = "none";
  d.style.position = "fixed";
  document.body.append(d);
  return d;
}
function parseToRgba(color) {
  const normalizedColor = color.toLowerCase().trim();
  if (cache[normalizedColor] !== undefined) return cache[normalizedColor];
  div = div || createDiv();
  div.style.color = "#000";
  div.style.color = normalizedColor;
  const control = getComputedStyle(div).color;
  div.style.color = "#fff";
  div.style.color = normalizedColor;
  const computedColor = getComputedStyle(div).color;
  if (computedColor !== control) return [0, 0, 0, 1];
  let result = computedColor.replace(/[^\d.,]/g, "").split(",").map(Number.parseFloat);
  if (result.length < 4) {
    result.push(1);
  }
  result = result.map(x => {
    const isNaN = Number.isNaN(x);
    if (false) {}
    return isNaN ? 0 : x;
  });
  cache[normalizedColor] = result;
  return result;
}
function withAlpha(color, alpha) {
  const [r, g, b] = parseToRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const blendResultCache = new Map();
function blendCache(color, background) {
  const cacheKey = `${color}-${background}`;
  const maybe = blendResultCache.get(cacheKey);
  if (maybe !== undefined) return maybe;
  const result = blend(color, background);
  blendResultCache.set(cacheKey, result);
  return result;
}
function blend(color, background) {
  if (background === undefined) return color;
  const [r, g, b, a] = parseToRgba(color);
  if (a === 1) return color;
  const [br, bg, bb, ba] = parseToRgba(background);
  const ao = a + ba * (1 - a);
  const ro = (a * r + ba * br * (1 - a)) / ao;
  const go = (a * g + ba * bg * (1 - a)) / ao;
  const bo = (a * b + ba * bb * (1 - a)) / ao;
  return `rgba(${ro}, ${go}, ${bo}, ${ao})`;
}
function interpolateColors(leftColor, rightColor, val) {
  if (val <= 0) return leftColor;
  if (val >= 1) return rightColor;
  const left = [...parseToRgba(leftColor)];
  left[0] = left[0] * left[3];
  left[1] = left[1] * left[3];
  left[2] = left[2] * left[3];
  const right = [...parseToRgba(rightColor)];
  right[0] = right[0] * right[3];
  right[1] = right[1] * right[3];
  right[2] = right[2] * right[3];
  const hScaler = val;
  const nScaler = 1 - val;
  const a = left[3] * nScaler + right[3] * hScaler;
  const r = Math.floor((left[0] * nScaler + right[0] * hScaler) / a);
  const g = Math.floor((left[1] * nScaler + right[1] * hScaler) / a);
  const b = Math.floor((left[2] * nScaler + right[2] * hScaler) / a);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function getLuminance(color) {
  if (color === "transparent") return 0;
  function f(x) {
    const channel = x / 255;
    return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }
  const [r, g, b] = parseToRgba(color);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/***/ }),

/***/ "./packages/core/src/internal/data-grid/data-grid-types.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$o": () => (/* binding */ InnerGridCellKind),
/* harmony export */   "DP": () => (/* binding */ isObjectEditorCallbackResult),
/* harmony export */   "EV": () => (/* binding */ CompactSelection),
/* harmony export */   "PE": () => (/* binding */ GridColumnIcon),
/* harmony export */   "Qo": () => (/* binding */ isReadWriteCell),
/* harmony export */   "Sq": () => (/* binding */ isSizedGridColumn),
/* harmony export */   "T9": () => (/* binding */ isEditableGridCell),
/* harmony export */   "f": () => (/* binding */ isTextEditableGridCell),
/* harmony export */   "kf": () => (/* binding */ booleanCellIsEditable),
/* harmony export */   "p6": () => (/* binding */ GridCellKind),
/* harmony export */   "pN": () => (/* binding */ GridColumnMenuIcon),
/* harmony export */   "qF": () => (/* binding */ BooleanEmpty),
/* harmony export */   "rL": () => (/* binding */ resolveCellsThunk),
/* harmony export */   "rs": () => (/* binding */ isInnerOnlyCell),
/* harmony export */   "sd": () => (/* binding */ BooleanIndeterminate)
/* harmony export */ });
/* unused harmony export isRectangleEqual */
/* harmony import */ var _common_support_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/src/common/support.ts");
/* harmony import */ var lodash_has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/has.js");
/* harmony import */ var lodash_has_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_has_js__WEBPACK_IMPORTED_MODULE_0__);
var _class;
let _Symbol$iterator;


const BooleanEmpty = null;
const BooleanIndeterminate = undefined;
let GridCellKind = function (GridCellKind) {
  GridCellKind["Uri"] = "uri";
  GridCellKind["Text"] = "text";
  GridCellKind["Image"] = "image";
  GridCellKind["RowID"] = "row-id";
  GridCellKind["Number"] = "number";
  GridCellKind["Bubble"] = "bubble";
  GridCellKind["Boolean"] = "boolean";
  GridCellKind["Loading"] = "loading";
  GridCellKind["Markdown"] = "markdown";
  GridCellKind["Drilldown"] = "drilldown";
  GridCellKind["Protected"] = "protected";
  GridCellKind["Custom"] = "custom";
  return GridCellKind;
}({});
let GridColumnIcon = function (GridColumnIcon) {
  GridColumnIcon["HeaderRowID"] = "headerRowID";
  GridColumnIcon["HeaderCode"] = "headerCode";
  GridColumnIcon["HeaderNumber"] = "headerNumber";
  GridColumnIcon["HeaderString"] = "headerString";
  GridColumnIcon["HeaderBoolean"] = "headerBoolean";
  GridColumnIcon["HeaderAudioUri"] = "headerAudioUri";
  GridColumnIcon["HeaderVideoUri"] = "headerVideoUri";
  GridColumnIcon["HeaderEmoji"] = "headerEmoji";
  GridColumnIcon["HeaderImage"] = "headerImage";
  GridColumnIcon["HeaderUri"] = "headerUri";
  GridColumnIcon["HeaderPhone"] = "headerPhone";
  GridColumnIcon["HeaderMarkdown"] = "headerMarkdown";
  GridColumnIcon["HeaderDate"] = "headerDate";
  GridColumnIcon["HeaderTime"] = "headerTime";
  GridColumnIcon["HeaderEmail"] = "headerEmail";
  GridColumnIcon["HeaderReference"] = "headerReference";
  GridColumnIcon["HeaderIfThenElse"] = "headerIfThenElse";
  GridColumnIcon["HeaderSingleValue"] = "headerSingleValue";
  GridColumnIcon["HeaderLookup"] = "headerLookup";
  GridColumnIcon["HeaderTextTemplate"] = "headerTextTemplate";
  GridColumnIcon["HeaderMath"] = "headerMath";
  GridColumnIcon["HeaderRollup"] = "headerRollup";
  GridColumnIcon["HeaderJoinStrings"] = "headerJoinStrings";
  GridColumnIcon["HeaderSplitString"] = "headerSplitString";
  GridColumnIcon["HeaderGeoDistance"] = "headerGeoDistance";
  GridColumnIcon["HeaderArray"] = "headerArray";
  GridColumnIcon["RowOwnerOverlay"] = "rowOwnerOverlay";
  GridColumnIcon["ProtectedColumnOverlay"] = "protectedColumnOverlay";
  return GridColumnIcon;
}({});
let GridColumnMenuIcon = function (GridColumnMenuIcon) {
  GridColumnMenuIcon["Triangle"] = "triangle";
  GridColumnMenuIcon["Dots"] = "dots";
  return GridColumnMenuIcon;
}({});
function isSizedGridColumn(c) {
  return "width" in c && typeof c.width === "number";
}
async function resolveCellsThunk(thunk) {
  if (typeof thunk === "object") return thunk;
  return await thunk();
}
function isEditableGridCell(cell) {
  if (cell.kind === GridCellKind.Loading || cell.kind === GridCellKind.Bubble || cell.kind === GridCellKind.RowID || cell.kind === GridCellKind.Protected || cell.kind === GridCellKind.Drilldown) {
    return false;
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .proveType */ .NG)(cell);
  return true;
}
function isTextEditableGridCell(cell) {
  if (cell.kind === GridCellKind.Loading || cell.kind === GridCellKind.Bubble || cell.kind === GridCellKind.RowID || cell.kind === GridCellKind.Protected || cell.kind === GridCellKind.Drilldown || cell.kind === GridCellKind.Boolean || cell.kind === GridCellKind.Image || cell.kind === GridCellKind.Custom) {
    return false;
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .proveType */ .NG)(cell);
  return true;
}
function isInnerOnlyCell(cell) {
  return cell.kind === InnerGridCellKind.Marker || cell.kind === InnerGridCellKind.NewRow;
}
function isReadWriteCell(cell) {
  if (!isEditableGridCell(cell) || cell.kind === GridCellKind.Image) return false;
  if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number || cell.kind === GridCellKind.Markdown || cell.kind === GridCellKind.Uri || cell.kind === GridCellKind.Custom || cell.kind === GridCellKind.Boolean) {
    return cell.readonly !== true;
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_1__/* .assertNever */ .vE)(cell, "A cell was passed with an invalid kind");
}
function isRectangleEqual(a, b) {
  if (a === b) return true;
  if (a === undefined || b === undefined) return false;
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function isObjectEditorCallbackResult(obj) {
  return lodash_has_js__WEBPACK_IMPORTED_MODULE_0___default()(obj, "editor");
}
function booleanCellIsEditable(cell) {
  var _cell$readonly;
  return !((_cell$readonly = cell.readonly) !== null && _cell$readonly !== void 0 ? _cell$readonly : false);
}
let InnerGridCellKind = function (InnerGridCellKind) {
  InnerGridCellKind["NewRow"] = "new-row";
  InnerGridCellKind["Marker"] = "marker";
  return InnerGridCellKind;
}({});
function mergeRanges(input) {
  if (input.length === 0) {
    return [];
  }
  const ranges = [...input];
  const stack = [];
  ranges.sort(function (a, b) {
    return a[0] - b[0];
  });
  stack.push([...ranges[0]]);
  for (const range of ranges.slice(1)) {
    const top = stack[stack.length - 1];
    if (top[1] < range[0]) {
      stack.push([...range]);
    } else if (top[1] < range[1]) {
      top[1] = range[1];
    }
  }
  return stack;
}
let emptyCompactSelection;
_Symbol$iterator = Symbol.iterator;
class CompactSelection {
  constructor(items) {
    this.items = items;
  }
  offset(amount) {
    if (amount === 0) return this;
    const newItems = this.items.map(x => [x[0] + amount, x[1] + amount]);
    return new CompactSelection(newItems);
  }
  add(selection) {
    const slice = typeof selection === "number" ? [selection, selection + 1] : selection;
    const newItems = mergeRanges([...this.items, slice]);
    return new CompactSelection(newItems);
  }
  remove(selection) {
    const items = [...this.items];
    const selMin = typeof selection === "number" ? selection : selection[0];
    const selMax = typeof selection === "number" ? selection + 1 : selection[1];
    for (const [i, slice] of items.entries()) {
      const [start, end] = slice;
      if (start <= selMax && selMin <= end) {
        const toAdd = [];
        if (start < selMin) {
          toAdd.push([start, selMin]);
        }
        if (selMax < end) {
          toAdd.push([selMax, end]);
        }
        items.splice(i, 1, ...toAdd);
      }
    }
    return new CompactSelection(items);
  }
  first() {
    if (this.items.length === 0) return undefined;
    return this.items[0][0];
  }
  last() {
    if (this.items.length === 0) return undefined;
    return this.items.slice(-1)[0][1] - 1;
  }
  hasIndex(index) {
    for (let i = 0; i < this.items.length; i++) {
      const [start, end] = this.items[i];
      if (index >= start && index < end) return true;
    }
    return false;
  }
  hasAll(index) {
    for (let x = index[0]; x < index[1]; x++) {
      if (!this.hasIndex(x)) return false;
    }
    return true;
  }
  some(predicate) {
    for (const i of this) {
      if (predicate(i)) return true;
    }
    return false;
  }
  equals(other) {
    if (other === this) return true;
    if (other.items.length !== this.items.length) return false;
    for (let i = 0; i < this.items.length; i++) {
      const left = other.items[i];
      const right = this.items[i];
      if (left[0] !== right[0] || left[1] !== right[1]) return false;
    }
    return true;
  }
  toArray() {
    const result = [];
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        result.push(x);
      }
    }
    return result;
  }
  get length() {
    let len = 0;
    for (const [start, end] of this.items) {
      len += end - start;
    }
    return len;
  }
  *[_Symbol$iterator]() {
    for (const [start, end] of this.items) {
      for (let x = start; x < end; x++) {
        yield x;
      }
    }
  }
}
_class = CompactSelection;
CompactSelection.empty = () => {
  var _emptyCompactSelectio;
  return (_emptyCompactSelectio = emptyCompactSelection) !== null && _emptyCompactSelectio !== void 0 ? _emptyCompactSelectio : emptyCompactSelection = new _class([]);
};
CompactSelection.fromSingleSelection = selection => {
  return _class.empty().add(selection);
};

/***/ }),

/***/ "./packages/core/src/internal/data-grid/data-grid.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ data_grid)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/render/data-grid-lib.ts
var data_grid_lib = __webpack_require__("./packages/core/src/internal/data-grid/render/data-grid-lib.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/data-grid-types.ts
var data_grid_types = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/cell-set.ts
var cell_set = __webpack_require__("./packages/core/src/internal/data-grid/cell-set.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/data-grid-sprites.ts
function getColors(variant, theme) {
  if (variant === "normal") {
    return [theme.bgIconHeader, theme.fgIconHeader];
  } else if (variant === "selected") {
    return ["white", theme.accentColor];
  } else {
    return [theme.accentColor, theme.bgHeader];
  }
}
class SpriteManager {
  constructor(headerIcons, onSettled) {
    this.onSettled = onSettled;
    this.spriteMap = new Map();
    this.headerIcons = void 0;
    this.inFlight = 0;
    this.headerIcons = headerIcons !== null && headerIcons !== void 0 ? headerIcons : {};
  }
  drawSprite(sprite, variant, ctx, x, y, size, theme) {
    let alpha = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    const [bgColor, fgColor] = getColors(variant, theme);
    const rSize = size * Math.ceil(window.devicePixelRatio);
    const key = `${bgColor}_${fgColor}_${rSize}_${sprite}`;
    let spriteCanvas = this.spriteMap.get(key);
    if (spriteCanvas === undefined) {
      const spriteCb = this.headerIcons[sprite];
      if (spriteCb === undefined) return;
      spriteCanvas = document.createElement("canvas");
      const spriteCtx = spriteCanvas.getContext("2d");
      if (spriteCtx === null) return;
      const imgSource = new Image();
      imgSource.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(spriteCb({
        fgColor,
        bgColor
      }))}`;
      this.spriteMap.set(key, spriteCanvas);
      const promise = imgSource.decode();
      if (promise === undefined) return;
      this.inFlight++;
      promise.then(() => {
        spriteCtx.drawImage(imgSource, 0, 0, rSize, rSize);
      }).finally(() => {
        this.inFlight--;
        if (this.inFlight === 0) {
          this.onSettled();
        }
      });
    } else {
      if (alpha < 1) {
        ctx.globalAlpha = alpha;
      }
      ctx.drawImage(spriteCanvas, 0, 0, rSize, rSize, x, y, size, size);
      if (alpha < 1) {
        ctx.globalAlpha = 1;
      }
    }
  }
}
// EXTERNAL MODULE: ./packages/core/src/common/utils.tsx
var utils = __webpack_require__("./packages/core/src/common/utils.tsx");
// EXTERNAL MODULE: ./node_modules/lodash/clamp.js
var clamp = __webpack_require__("./node_modules/lodash/clamp.js");
var clamp_default = /*#__PURE__*/__webpack_require__.n(clamp);
// EXTERNAL MODULE: ./node_modules/lodash/range.js
var lodash_range = __webpack_require__("./node_modules/lodash/range.js");
var range_default = /*#__PURE__*/__webpack_require__.n(lodash_range);
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/color-parser.ts
var color_parser = __webpack_require__("./packages/core/src/internal/data-grid/color-parser.ts");
// EXTERNAL MODULE: ./packages/core/src/common/support.ts
var support = __webpack_require__("./packages/core/src/common/support.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid-render.walk.ts

function getSkipPoint(drawRegions) {
  if (drawRegions.length === 0) return undefined;
  let drawRegionsLowestY;
  for (const dr of drawRegions) {
    var _drawRegionsLowestY;
    drawRegionsLowestY = Math.min((_drawRegionsLowestY = drawRegionsLowestY) !== null && _drawRegionsLowestY !== void 0 ? _drawRegionsLowestY : dr.y, dr.y);
  }
}
function walkRowsInCol(startRow, drawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipToY, cb) {
  var _skipToY;
  skipToY = (_skipToY = skipToY) !== null && _skipToY !== void 0 ? _skipToY : drawY;
  let y = drawY;
  let row = startRow;
  const rowEnd = rows - freezeTrailingRows;
  let didBreak = false;
  while (y < height && row < rowEnd) {
    const rh = getRowHeight(row);
    if (y + rh > skipToY && cb(y, row, rh, false, hasAppendRow && row === rows - 1) === true) {
      didBreak = true;
      break;
    }
    y += rh;
    row++;
  }
  if (didBreak) return;
  y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    row = rows - 1 - fr;
    const rh = getRowHeight(row);
    y -= rh;
    cb(y, row, rh, true, hasAppendRow && row === rows - 1);
  }
}
function walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  const drawY = totalHeaderHeight + translateY;
  for (const c of effectiveCols) {
    const drawX = c.sticky ? clipX : x + translateX;
    if (cb(c, drawX, drawY, c.sticky ? 0 : clipX + 1, cellYOffset) === true) {
      break;
    }
    x += c.width;
    clipX += c.sticky ? c.width : 0;
  }
}
function walkGroups(effectiveCols, width, translateX, groupHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  for (let index = 0; index < effectiveCols.length; index++) {
    var _startCol$group;
    const startCol = effectiveCols[index];
    let end = index + 1;
    let boxWidth = startCol.width;
    if (startCol.sticky) {
      clipX += boxWidth;
    }
    while (end < effectiveCols.length && (0,data_grid_lib/* isGroupEqual */.PU)(effectiveCols[end].group, startCol.group) && effectiveCols[end].sticky === effectiveCols[index].sticky) {
      const endCol = effectiveCols[end];
      boxWidth += endCol.width;
      end++;
      index++;
      if (endCol.sticky) {
        clipX += endCol.width;
      }
    }
    const t = startCol.sticky ? 0 : translateX;
    const localX = x + t;
    const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
    const w = Math.min(boxWidth - delta, width - (localX + delta));
    cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], (_startCol$group = startCol.group) !== null && _startCol$group !== void 0 ? _startCol$group : "", localX + delta, 0, w, groupHeaderHeight);
    x += boxWidth;
  }
}
function getSpanBounds(span, cellX, cellY, cellW, cellH, column, allColumns) {
  var _allColumns$find$sour, _allColumns$find;
  const [startCol, endCol] = span;
  let frozenRect;
  let contentRect;
  const firstNonSticky = (_allColumns$find$sour = (_allColumns$find = allColumns.find(x => !x.sticky)) === null || _allColumns$find === void 0 ? void 0 : _allColumns$find.sourceIndex) !== null && _allColumns$find$sour !== void 0 ? _allColumns$find$sour : 0;
  if (endCol > firstNonSticky) {
    const renderFromCol = Math.max(startCol, firstNonSticky);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= renderFromCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= endCol; x++) {
      tempW += allColumns[x].width;
    }
    contentRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  if (firstNonSticky > startCol) {
    const renderToCol = Math.min(endCol, firstNonSticky - 1);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= startCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= renderToCol; x++) {
      tempW += allColumns[x].width;
    }
    frozenRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  return [frozenRect, contentRect];
}
// EXTERNAL MODULE: ./packages/core/src/common/styles.ts
var styles = __webpack_require__("./packages/core/src/common/styles.ts");
// EXTERNAL MODULE: ./packages/core/src/common/math.ts
var math = __webpack_require__("./packages/core/src/common/math.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid-render.cells.ts






const loadingCell = {
  kind: data_grid_types/* GridCellKind.Loading */.p6.Loading,
  allowOverlay: false
};
function drawCells(ctx, effectiveColumns, allColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, outerTheme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth) {
  var _damage$size;
  let toDraw = (_damage$size = damage === null || damage === void 0 ? void 0 : damage.size) !== null && _damage$size !== void 0 ? _damage$size : Number.MAX_SAFE_INTEGER;
  const frameTime = performance.now();
  let font = outerTheme.baseFontFull;
  ctx.font = font;
  const deprepArg = {
    ctx
  };
  const cellIndex = [0, 0];
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight) : 0;
  let result;
  let handledSpans = undefined;
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawStartY, clipX, startRow) => {
    var _c$group;
    const diff = Math.max(0, clipX - drawX);
    const colDrawX = drawX + diff;
    const colDrawY = totalHeaderHeight + 1;
    const colWidth = c.width - diff;
    const colHeight = height - totalHeaderHeight - 1;
    if (drawRegions.length > 0) {
      let found = false;
      for (let i = 0; i < drawRegions.length; i++) {
        const dr = drawRegions[i];
        if ((0,math/* intersectRect */.qb)(colDrawX, colDrawY, colWidth, colHeight, dr.x, dr.y, dr.width, dr.height)) {
          found = true;
          break;
        }
      }
      if (!found) return;
    }
    const reclip = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
      ctx.clip();
    };
    const colSelected = selection.columns.hasIndex(c.sourceIndex);
    const groupTheme = getGroupDetails((_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : "").overrideTheme;
    const colTheme = c.themeOverride === undefined && groupTheme === undefined ? outerTheme : (0,styles/* mergeAndRealizeTheme */.yR)(outerTheme, groupTheme, c.themeOverride);
    const colFont = colTheme.baseFontFull;
    if (colFont !== font) {
      font = colFont;
      ctx.font = colFont;
    }
    reclip();
    let prepResult = undefined;
    walkRowsInCol(startRow, colDrawStartY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky, isTrailingRow) => {
      var _c$trailingRowOptions, _c$trailingRowOptions2;
      if (row < 0) return;
      cellIndex[0] = c.sourceIndex;
      cellIndex[1] = row;
      if (damage !== undefined && !damage.has(cellIndex)) {
        return;
      }
      if (drawRegions.length > 0) {
        let found = false;
        for (let i = 0; i < drawRegions.length; i++) {
          const dr = drawRegions[i];
          if ((0,math/* intersectRect */.qb)(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height)) {
            found = true;
            break;
          }
        }
        if (!found) return;
      }
      const rowSelected = selection.rows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      const cell = row < rows ? getCellContent(cellIndex) : loadingCell;
      let cellX = drawX;
      let cellWidth = c.width;
      let drawingSpan = false;
      let skipContents = false;
      if (cell.span !== undefined) {
        const [startCol, endCol] = cell.span;
        const spanKey = `${row},${startCol},${endCol},${c.sticky}`;
        if (handledSpans === undefined) handledSpans = new Set();
        if (!handledSpans.has(spanKey)) {
          const areas = getSpanBounds(cell.span, drawX, drawY, c.width, rh, c, allColumns);
          const area = c.sticky ? areas[0] : areas[1];
          if (!c.sticky && areas[0] !== undefined) {
            skipContents = true;
          }
          if (area !== undefined) {
            cellX = area.x;
            cellWidth = area.width;
            handledSpans.add(spanKey);
            ctx.restore();
            prepResult = undefined;
            ctx.save();
            ctx.beginPath();
            const d = Math.max(0, clipX - area.x);
            ctx.rect(area.x + d, drawY, area.width - d, rh);
            if (result === undefined) {
              result = [];
            }
            result.push({
              x: area.x + d,
              y: drawY,
              width: area.width - d,
              height: rh
            });
            ctx.clip();
            drawingSpan = true;
          }
        } else {
          toDraw--;
          return;
        }
      }
      const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
      const trailingTheme = isTrailingRow && ((_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.themeOverride) !== undefined ? (_c$trailingRowOptions2 = c.trailingRowOptions) === null || _c$trailingRowOptions2 === void 0 ? void 0 : _c$trailingRowOptions2.themeOverride : undefined;
      const theme = cell.themeOverride === undefined && rowTheme === undefined && trailingTheme === undefined ? colTheme : (0,styles/* mergeAndRealizeTheme */.yR)(colTheme, rowTheme, trailingTheme, cell.themeOverride);
      ctx.beginPath();
      const isSelected = (0,data_grid_lib/* cellIsSelected */.Sb)(cellIndex, cell, selection);
      let accentCount = (0,data_grid_lib/* cellIsInRange */.H1)(cellIndex, cell, selection, drawFocus);
      const spanIsHighlighted = cell.span !== undefined && selection.columns.some(index => cell.span !== undefined && index >= cell.span[0] && index <= cell.span[1]);
      if (isSelected && !isFocused && drawFocus) {
        accentCount = 0;
      } else if (isSelected && drawFocus) {
        accentCount = Math.max(accentCount, 1);
      }
      if (spanIsHighlighted) {
        accentCount++;
      }
      if (!isSelected) {
        if (rowSelected) accentCount++;
        if (colSelected && !isTrailingRow) accentCount++;
      }
      const bgCell = cell.kind === data_grid_types/* GridCellKind.Protected */.p6.Protected ? theme.bgCellMedium : theme.bgCell;
      let fill;
      if (isSticky || bgCell !== outerTheme.bgCell) {
        fill = (0,color_parser/* blend */.NH)(bgCell, fill);
      }
      if (accentCount > 0 || rowDisabled) {
        if (rowDisabled) {
          fill = (0,color_parser/* blend */.NH)(theme.bgHeader, fill);
        }
        for (let i = 0; i < accentCount; i++) {
          fill = (0,color_parser/* blend */.NH)(theme.accentLight, fill);
        }
      } else if (prelightCells !== undefined) {
        for (const pre of prelightCells) {
          if (pre[0] === c.sourceIndex && pre[1] === row) {
            fill = (0,color_parser/* blend */.NH)(theme.bgSearchResult, fill);
            break;
          }
        }
      }
      if (highlightRegions !== undefined) {
        for (let i = 0; i < highlightRegions.length; i++) {
          const region = highlightRegions[i];
          const r = region.range;
          if (region.style !== "solid-outline" && r.x <= c.sourceIndex && c.sourceIndex < r.x + r.width && r.y <= row && row < r.y + r.height) {
            fill = (0,color_parser/* blend */.NH)(region.color, fill);
          }
        }
      }
      let didDamageClip = false;
      if (damage !== undefined) {
        const top = drawY + 1;
        const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - freezeTrailingRowsHeight);
        const h = bottom - top;
        if (h !== rh - 1 || cellX + 1 <= clipX) {
          didDamageClip = true;
          ctx.save();
          ctx.beginPath();
          ctx.rect(cellX + 1, top, cellWidth - 1, h);
          ctx.clip();
        }
        fill = fill === undefined ? theme.bgCell : (0,color_parser/* blend */.NH)(fill, theme.bgCell);
      }
      const isLastColumn = c.sourceIndex === allColumns.length - 1;
      const isLastRow = row === rows - 1;
      if (fill !== undefined) {
        ctx.fillStyle = fill;
        if (prepResult !== undefined) {
          prepResult.fillStyle = fill;
        }
        if (damage !== undefined) {
          ctx.fillRect(cellX + 1, drawY + 1, cellWidth - (isLastColumn ? 2 : 1), rh - (isLastRow ? 2 : 1));
        } else {
          ctx.fillRect(cellX, drawY, cellWidth, rh);
        }
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 0.6;
      }
      let hoverValue;
      for (let i = 0; i < hoverValues.length; i++) {
        const hv = hoverValues[i];
        if (hv.item[0] === c.sourceIndex && hv.item[1] === row) {
          hoverValue = hv;
          break;
        }
      }
      if (cellWidth > minimumCellWidth && !skipContents) {
        var _fill, _hoverValue$hoverAmou, _hoverValue;
        const cellFont = theme.baseFontFull;
        if (cellFont !== font) {
          ctx.font = cellFont;
          font = cellFont;
        }
        prepResult = drawCell(ctx, cell, c.sourceIndex, row, isLastColumn, isLastRow, cellX, drawY, cellWidth, rh, accentCount > 0, theme, (_fill = fill) !== null && _fill !== void 0 ? _fill : theme.bgCell, imageLoader, spriteManager, (_hoverValue$hoverAmou = (_hoverValue = hoverValue) === null || _hoverValue === void 0 ? void 0 : _hoverValue.hoverAmount) !== null && _hoverValue$hoverAmou !== void 0 ? _hoverValue$hoverAmou : 0, hoverInfo, hyperWrapping, frameTime, drawCellCallback, prepResult, enqueue, renderStateProvider, getCellRenderer, overrideCursor);
      }
      if (didDamageClip) {
        ctx.restore();
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 1;
      }
      toDraw--;
      if (drawingSpan) {
        var _prepResult, _prepResult$deprep;
        ctx.restore();
        (_prepResult = prepResult) === null || _prepResult === void 0 || (_prepResult$deprep = _prepResult.deprep) === null || _prepResult$deprep === void 0 || _prepResult$deprep.call(_prepResult, deprepArg);
        prepResult = undefined;
        reclip();
        font = colFont;
        ctx.font = colFont;
      }
      return toDraw <= 0;
    });
    ctx.restore();
    return toDraw <= 0;
  });
  return result;
}
const allocatedItem = [0, 0];
const reusableRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
const drawState = [undefined, () => undefined];
let animationFrameRequested = false;
function animRequest() {
  animationFrameRequested = true;
}
function drawCell(ctx, cell, col, row, isLastCol, isLastRow, x, y, w, h, highlighted, theme, finalCellFillColor, imageLoader, spriteManager, hoverAmount, hoverInfo, hyperWrapping, frameTime, drawCellCallback, lastPrep, enqueue, renderStateProvider, getCellRenderer, overrideCursor) {
  let hoverX;
  let hoverY;
  if (hoverInfo !== undefined && hoverInfo[0][0] === col && hoverInfo[0][1] === row) {
    hoverX = hoverInfo[1][0];
    hoverY = hoverInfo[1][1];
  }
  let result = undefined;
  allocatedItem[0] = col;
  allocatedItem[1] = row;
  reusableRect.x = x;
  reusableRect.y = y;
  reusableRect.width = w;
  reusableRect.height = h;
  drawState[0] = renderStateProvider.getValue(allocatedItem);
  drawState[1] = val => renderStateProvider.setValue(allocatedItem, val);
  animationFrameRequested = false;
  const args = {
    ctx,
    theme,
    col,
    row,
    cell,
    rect: reusableRect,
    highlighted,
    cellFillColor: finalCellFillColor,
    hoverAmount,
    frameTime,
    hoverX,
    drawState,
    hoverY,
    imageLoader,
    spriteManager,
    hyperWrapping,
    overrideCursor: hoverX !== undefined ? overrideCursor : undefined,
    requestAnimationFrame: animRequest
  };
  const needsAnim = (0,data_grid_lib/* drawLastUpdateUnderlay */.vr)(args, cell.lastUpdated, frameTime, lastPrep, isLastCol, isLastRow);
  const r = getCellRenderer(cell);
  if (r !== undefined) {
    var _lastPrep, _r$drawPrep;
    if (((_lastPrep = lastPrep) === null || _lastPrep === void 0 ? void 0 : _lastPrep.renderer) !== r) {
      var _lastPrep2, _lastPrep2$deprep;
      (_lastPrep2 = lastPrep) === null || _lastPrep2 === void 0 || (_lastPrep2$deprep = _lastPrep2.deprep) === null || _lastPrep2$deprep === void 0 || _lastPrep2$deprep.call(_lastPrep2, args);
      lastPrep = undefined;
    }
    const partialPrepResult = (_r$drawPrep = r.drawPrep) === null || _r$drawPrep === void 0 ? void 0 : _r$drawPrep.call(r, args, lastPrep);
    if (drawCellCallback !== undefined && !(0,data_grid_types/* isInnerOnlyCell */.rs)(args.cell)) {
      drawCellCallback(args, () => r.draw(args, cell));
    } else {
      r.draw(args, cell);
    }
    result = partialPrepResult === undefined ? undefined : {
      deprep: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.deprep,
      fillStyle: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.fillStyle,
      font: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.font,
      renderer: r
    };
  }
  if (needsAnim || animationFrameRequested) enqueue === null || enqueue === void 0 || enqueue(allocatedItem);
  return result;
}
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/render/draw-checkbox.ts
var draw_checkbox = __webpack_require__("./packages/core/src/internal/data-grid/render/draw-checkbox.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid-render.header.ts








function drawGridHeaders(ctx, effectiveCols, enableGroups, hovered, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode) {
  var _hovered$;
  const totalHeaderHeight = headerHeight + groupHeaderHeight;
  if (totalHeaderHeight <= 0) return;
  ctx.fillStyle = outerTheme.bgHeader;
  ctx.fillRect(0, 0, width, totalHeaderHeight);
  const [hCol, hRow] = (_hovered$ = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$ !== void 0 ? _hovered$ : [];
  const font = outerTheme.headerFontFull;
  ctx.font = font;
  walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
    var _c$group, _hoverValues$find$hov, _hoverValues$find;
    if (damage !== undefined && !damage.has([c.sourceIndex, -1])) return;
    const diff = Math.max(0, clipX - x);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + diff, groupHeaderHeight, c.width - diff, headerHeight);
    ctx.clip();
    const groupTheme = getGroupDetails((_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : "").overrideTheme;
    const theme = c.themeOverride === undefined && groupTheme === undefined ? outerTheme : (0,styles/* mergeAndRealizeTheme */.yR)(outerTheme, groupTheme, c.themeOverride);
    if (theme.bgHeader !== outerTheme.bgHeader) {
      ctx.fillStyle = theme.bgHeader;
      ctx.fill();
    }
    if (theme !== outerTheme) {
      ctx.font = theme.baseFontFull;
    }
    const selected = selection.columns.hasIndex(c.sourceIndex);
    const noHover = dragAndDropState !== undefined || isResizing;
    const hoveredBoolean = !noHover && hRow === -1 && hCol === c.sourceIndex;
    const hover = noHover ? 0 : (_hoverValues$find$hov = (_hoverValues$find = hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === -1)) === null || _hoverValues$find === void 0 ? void 0 : _hoverValues$find.hoverAmount) !== null && _hoverValues$find$hov !== void 0 ? _hoverValues$find$hov : 0;
    const hasSelectedCell = (selection === null || selection === void 0 ? void 0 : selection.current) !== undefined && selection.current.cell[0] === c.sourceIndex;
    const bgFillStyle = selected ? theme.accentColor : hasSelectedCell ? theme.bgHeaderHasFocus : theme.bgHeader;
    const y = enableGroups ? groupHeaderHeight : 0;
    const xOffset = c.sourceIndex === 0 ? 0 : 1;
    if (selected) {
      ctx.fillStyle = bgFillStyle;
      ctx.fillRect(x + xOffset, y, c.width - xOffset, headerHeight);
    } else if (hasSelectedCell || hover > 0) {
      ctx.beginPath();
      ctx.rect(x + xOffset, y, c.width - xOffset, headerHeight);
      if (hasSelectedCell) {
        ctx.fillStyle = theme.bgHeaderHasFocus;
        ctx.fill();
      }
      if (hover > 0) {
        ctx.globalAlpha = hover;
        ctx.fillStyle = theme.bgHeaderHovered;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    drawHeader(ctx, x, y, c.width, headerHeight, c, selected, theme, hoveredBoolean, hasSelectedCell, hover, spriteManager, drawHeaderCallback, touchMode);
    ctx.restore();
  });
  if (enableGroups) {
    drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage);
  }
}
function drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, theme, spriteManager, _hoverValues, verticalBorder, getGroupDetails, damage) {
  var _hovered$2;
  const xPad = 8;
  const [hCol, hRow] = (_hovered$2 = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$2 !== void 0 ? _hovered$2 : [];
  let finalX = 0;
  walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w, h) => {
    var _groupTheme$textGroup;
    if (damage !== undefined && !damage.hasItemInRectangle({
      x: span[0],
      y: -2,
      width: span[1] - span[0] + 1,
      height: 1
    })) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    const group = getGroupDetails(groupName);
    const groupTheme = (group === null || group === void 0 ? void 0 : group.overrideTheme) === undefined ? theme : (0,styles/* mergeAndRealizeTheme */.yR)(theme, group.overrideTheme);
    const isHovered = hRow === -2 && hCol !== undefined && hCol >= span[0] && hCol <= span[1];
    const fillColor = isHovered ? groupTheme.bgHeaderHovered : groupTheme.bgHeader;
    if (fillColor !== theme.bgHeader) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.fillStyle = (_groupTheme$textGroup = groupTheme.textGroupHeader) !== null && _groupTheme$textGroup !== void 0 ? _groupTheme$textGroup : groupTheme.textHeader;
    if (group !== undefined) {
      let drawX = x;
      if (group.icon !== undefined) {
        spriteManager.drawSprite(group.icon, "normal", ctx, drawX + xPad, (groupHeaderHeight - 20) / 2, 20, groupTheme);
        drawX += 26;
      }
      ctx.fillText(group.name, drawX + xPad, groupHeaderHeight / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme.headerFontFull));
      if (group.actions !== undefined && isHovered) {
        var _hovered$3;
        const actionBoxes = getActionBoundsForGroup({
          x,
          y,
          width: w,
          height: h
        }, group.actions);
        ctx.beginPath();
        const fadeStartX = actionBoxes[0].x - 10;
        const fadeWidth = x + w - fadeStartX;
        ctx.rect(fadeStartX, 0, fadeWidth, groupHeaderHeight);
        const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
        const trans = (0,color_parser/* withAlpha */.fG)(fillColor, 0);
        grad.addColorStop(0, trans);
        grad.addColorStop(10 / fadeWidth, fillColor);
        grad.addColorStop(1, fillColor);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 0.6;
        const [mouseX, mouseY] = (_hovered$3 = hovered === null || hovered === void 0 ? void 0 : hovered[1]) !== null && _hovered$3 !== void 0 ? _hovered$3 : [-1, -1];
        for (let i = 0; i < group.actions.length; i++) {
          const action = group.actions[i];
          const box = actionBoxes[i];
          const actionHovered = (0,math/* pointInRect */.qr)(box, mouseX + x, mouseY);
          if (actionHovered) {
            ctx.globalAlpha = 1;
          }
          spriteManager.drawSprite(action.icon, "normal", ctx, box.x + box.width / 2 - 10, box.y + box.height / 2 - 10, 20, groupTheme);
          if (actionHovered) {
            ctx.globalAlpha = 0.6;
          }
        }
        ctx.globalAlpha = 1;
      }
    }
    if (x !== 0 && verticalBorder(span[0])) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, groupHeaderHeight);
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
    finalX = x + w;
  });
  ctx.beginPath();
  ctx.moveTo(finalX + 0.5, 0);
  ctx.lineTo(finalX + 0.5, groupHeaderHeight);
  ctx.moveTo(0, groupHeaderHeight + 0.5);
  ctx.lineTo(width, groupHeaderHeight + 0.5);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1;
  ctx.stroke();
}
const menuButtonSize = 30;
function getHeaderMenuBounds(x, y, width, height, isRtl) {
  if (isRtl) return {
    x,
    y,
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
  return {
    x: x + width - menuButtonSize,
    y: Math.max(y, y + height / 2 - menuButtonSize / 2),
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
}
function getActionBoundsForGroup(box, actions) {
  const result = [];
  let x = box.x + box.width - 26 * actions.length;
  const y = box.y + box.height / 2 - 13;
  const height = 26;
  const width = 26;
  for (let i = 0; i < actions.length; i++) {
    result.push({
      x,
      y,
      width,
      height
    });
    x += 26;
  }
  return result;
}
function drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, hoverAmount, spriteManager, touchMode, isRtl, menuBounds) {
  if (c.rowMarker !== undefined) {
    const checked = c.rowMarkerChecked;
    if (checked !== true) {
      ctx.globalAlpha = hoverAmount;
    }
    (0,draw_checkbox/* drawCheckbox */._)(ctx, theme, checked, x, y, width, height, false, undefined, undefined, 18, "center", c.rowMarker);
    if (checked !== true) {
      ctx.globalAlpha = 1;
    }
    return;
  }
  const xPad = theme.cellHorizontalPadding;
  const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;
  const shouldDrawMenu = c.hasMenu === true && (isHovered || touchMode && selected);
  const dirScalar = isRtl ? -1 : 1;
  let drawX = isRtl ? x + width - xPad : x + xPad;
  if (c.icon !== undefined) {
    let variant = selected ? "selected" : "normal";
    if (c.style === "highlight") {
      variant = selected ? "selected" : "special";
    }
    const headerSize = theme.headerIconSize;
    spriteManager.drawSprite(c.icon, variant, ctx, isRtl ? drawX - headerSize : drawX, y + (height - headerSize) / 2, headerSize, theme);
    if (c.overlayIcon !== undefined) {
      spriteManager.drawSprite(c.overlayIcon, selected ? "selected" : "special", ctx, isRtl ? drawX - headerSize + 9 : drawX + 9, y + ((height - 18) / 2 + 6), 18, theme);
    }
    drawX += Math.ceil(headerSize * 1.3) * dirScalar;
  }
  if (shouldDrawMenu && c.hasMenu === true && width > 35) {
    const fadeWidth = 35;
    const fadeStart = isRtl ? fadeWidth : width - fadeWidth;
    const fadeEnd = isRtl ? fadeWidth * 0.7 : width - fadeWidth * 0.7;
    const fadeStartPercent = fadeStart / width;
    const fadeEndPercent = fadeEnd / width;
    const grad = ctx.createLinearGradient(x, 0, x + width, 0);
    const trans = (0,color_parser/* withAlpha */.fG)(fillStyle, 0);
    grad.addColorStop(isRtl ? 1 : 0, fillStyle);
    grad.addColorStop(fadeStartPercent, fillStyle);
    grad.addColorStop(fadeEndPercent, trans);
    grad.addColorStop(isRtl ? 0 : 1, trans);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = fillStyle;
  }
  if (isRtl) {
    ctx.textAlign = "right";
  }
  ctx.fillText(c.title, drawX, y + height / 2 + (0,data_grid_lib/* getMiddleCenterBias */.aX)(ctx, theme.headerFontFull));
  if (isRtl) {
    ctx.textAlign = "left";
  }
  if (shouldDrawMenu && c.hasMenu === true) {
    if (c.menuIcon === undefined || c.menuIcon === data_grid_types/* GridColumnMenuIcon.Triangle */.pN.Triangle) {
      ctx.beginPath();
      const triangleX = menuBounds.x + menuBounds.width / 2 - 5.5;
      const triangleY = menuBounds.y + menuBounds.height / 2 - 3;
      (0,data_grid_lib/* roundedPoly */.zu)(ctx, [{
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
    } else if (c.menuIcon === data_grid_types/* GridColumnMenuIcon.Dots */.pN.Dots) {
      ctx.beginPath();
      const dotsX = menuBounds.x + menuBounds.width / 2;
      const dotsY = menuBounds.y + menuBounds.height / 2;
      (0,data_grid_lib/* drawMenuDots */.Ld)(ctx, dotsX, dotsY);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else {
      const iconX = menuBounds.x + (menuBounds.width - theme.headerIconSize) / 2;
      const iconY = menuBounds.y + (menuBounds.height - theme.headerIconSize) / 2;
      spriteManager.drawSprite(c.menuIcon, "normal", ctx, iconX, iconY, theme.headerIconSize, theme);
    }
  }
}
function drawHeader(ctx, x, y, width, height, c, selected, theme, isHovered, hasSelectedCell, hoverAmount, spriteManager, drawHeaderCallback, touchMode) {
  const isRtl = (0,utils/* direction */.o7)(c.title) === "rtl";
  const menuBounds = getHeaderMenuBounds(x, y, width, height, isRtl);
  if (drawHeaderCallback !== undefined) {
    drawHeaderCallback({
      ctx,
      theme,
      rect: {
        x,
        y,
        width,
        height
      },
      column: c,
      columnIndex: c.sourceIndex,
      isSelected: selected,
      hoverAmount,
      isHovered,
      hasSelectedCell,
      spriteManager,
      menuBounds
    }, () => drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, hoverAmount, spriteManager, touchMode, isRtl, menuBounds));
  } else {
    drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, hoverAmount, spriteManager, touchMode, isRtl, menuBounds);
  }
}
// EXTERNAL MODULE: ./node_modules/lodash/groupBy.js
var groupBy = __webpack_require__("./node_modules/lodash/groupBy.js");
var groupBy_default = /*#__PURE__*/__webpack_require__.n(groupBy);
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid-render.lines.ts






function drawBlanks(ctx, effectiveColumns, allColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowTheme, selectedRows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme) {
  if (damage !== undefined || effectiveColumns[effectiveColumns.length - 1] !== allColumns[effectiveColumns.length - 1]) return;
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawY, clipX, startRow) => {
    if (c !== effectiveColumns[effectiveColumns.length - 1]) return;
    drawX += c.width;
    const x = Math.max(drawX, clipX);
    if (x > width) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, totalHeaderHeight + 1, 10000, height - totalHeaderHeight - 1);
    ctx.clip();
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky) => {
      if (!isSticky && drawRegions.length > 0 && !drawRegions.some(dr => (0,math/* intersectRect */.qb)(drawX, drawY, 10000, rh, dr.x, dr.y, dr.width, dr.height))) {
        return;
      }
      const rowSelected = selectedRows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      ctx.beginPath();
      const rowTheme = getRowTheme === null || getRowTheme === void 0 ? void 0 : getRowTheme(row);
      const blankTheme = rowTheme === undefined ? theme : (0,styles/* mergeAndRealizeTheme */.yR)(theme, rowTheme);
      if (blankTheme.bgCell !== theme.bgCell) {
        ctx.fillStyle = blankTheme.bgCell;
        ctx.fillRect(drawX, drawY, 10000, rh);
      }
      if (rowDisabled) {
        ctx.fillStyle = blankTheme.bgHeader;
        ctx.fillRect(drawX, drawY, 10000, rh);
      }
      if (rowSelected) {
        ctx.fillStyle = blankTheme.accentLight;
        ctx.fillRect(drawX, drawY, 10000, rh);
      }
    });
    ctx.restore();
  });
}
function overdrawStickyBoundaries(ctx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme) {
  var _theme$horizontalBord;
  let drawFreezeBorder = false;
  for (const c of effectiveCols) {
    if (c.sticky) continue;
    drawFreezeBorder = verticalBorder(c.sourceIndex);
    break;
  }
  const hColor = (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor;
  const vColor = theme.borderColor;
  const drawX = drawFreezeBorder ? (0,data_grid_lib/* getStickyWidth */.G6)(effectiveCols) : 0;
  let vStroke;
  if (drawX !== 0) {
    vStroke = (0,color_parser/* blendCache */.mv)(vColor, theme.bgCell);
    ctx.beginPath();
    ctx.moveTo(drawX + 0.5, 0);
    ctx.lineTo(drawX + 0.5, height);
    ctx.strokeStyle = vStroke;
    ctx.stroke();
  }
  if (freezeTrailingRows > 0) {
    const hStroke = vColor === hColor && vStroke !== undefined ? vStroke : (0,color_parser/* blendCache */.mv)(hColor, theme.bgCell);
    const h = (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight);
    ctx.beginPath();
    ctx.moveTo(0, height - h + 0.5);
    ctx.lineTo(width, height - h + 0.5);
    ctx.strokeStyle = hStroke;
    ctx.stroke();
  }
}
const getMinMaxXY = (drawRegions, width, height) => {
  let minX = 0;
  let maxX = width;
  let minY = 0;
  let maxY = height;
  if (drawRegions !== undefined && drawRegions.length > 0) {
    minX = Number.MAX_SAFE_INTEGER;
    minY = Number.MAX_SAFE_INTEGER;
    maxX = Number.MIN_SAFE_INTEGER;
    maxY = Number.MIN_SAFE_INTEGER;
    for (const r of drawRegions) {
      minX = Math.min(minX, r.x - 1);
      maxX = Math.max(maxX, r.x + r.width + 1);
      minY = Math.min(minY, r.y - 1);
      maxY = Math.max(maxY, r.y + r.height + 1);
    }
  }
  return {
    minX,
    maxX,
    minY,
    maxY
  };
};
function drawExtraRowThemes(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme) {
  const bgCell = theme.bgCell;
  const {
    minX,
    maxX,
    minY,
    maxY
  } = getMinMaxXY(drawRegions, width, height);
  const toDraw = [];
  const freezeY = height - (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight);
  let y = totalHeaderHeight;
  let row = cellYOffset;
  let extraRowsStartY = 0;
  while (y + translateY < freezeY) {
    const ty = y + translateY;
    const rh = getRowHeight(row);
    if (ty >= minY && ty <= maxY - 1) {
      const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
      const rowThemeBgCell = rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.bgCell;
      const needDraw = rowThemeBgCell !== undefined && rowThemeBgCell !== bgCell && row >= rows - freezeTrailingRows;
      if (needDraw) {
        toDraw.push({
          x: minX,
          y: ty,
          w: maxX - minX,
          h: rh,
          color: rowThemeBgCell
        });
      }
    }
    y += rh;
    if (row < rows - freezeTrailingRows) extraRowsStartY = y;
    row++;
  }
  let x = 0;
  const h = Math.min(freezeY, maxY) - extraRowsStartY;
  if (h > 0) {
    for (let index = 0; index < effectiveCols.length; index++) {
      var _c$themeOverride;
      const c = effectiveCols[index];
      if (c.width === 0) continue;
      const tx = c.sticky ? x : x + translateX;
      const colThemeBgCell = (_c$themeOverride = c.themeOverride) === null || _c$themeOverride === void 0 ? void 0 : _c$themeOverride.bgCell;
      if (colThemeBgCell !== undefined && colThemeBgCell !== bgCell && tx >= minX && tx <= maxX && verticalBorder(index + 1)) {
        toDraw.push({
          x: tx,
          y: extraRowsStartY,
          w: c.width,
          h,
          color: colThemeBgCell
        });
      }
      x += c.width;
    }
  }
  if (toDraw.length === 0) return;
  let color;
  ctx.beginPath();
  for (let i = toDraw.length - 1; i >= 0; i--) {
    const r = toDraw[i];
    if (color === undefined) {
      color = r.color;
    } else if (r.color !== color) {
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      color = r.color;
    }
    ctx.rect(r.x, r.y, r.w, r.h);
  }
  if (color !== undefined) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.beginPath();
}
function drawGridLines(ctx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme) {
  var _theme$horizontalBord2;
  let verticalOnly = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : false;
  if (spans !== undefined) {
    ctx.beginPath();
    ctx.save();
    ctx.rect(0, 0, width, height);
    for (const span of spans) {
      ctx.rect(span.x + 1, span.y + 1, span.width - 1, span.height - 1);
    }
    ctx.clip("evenodd");
  }
  const hColor = (_theme$horizontalBord2 = theme.horizontalBorderColor) !== null && _theme$horizontalBord2 !== void 0 ? _theme$horizontalBord2 : theme.borderColor;
  const vColor = theme.borderColor;
  const {
    minX,
    maxX,
    minY,
    maxY
  } = getMinMaxXY(drawRegions, width, height);
  const toDraw = [];
  ctx.beginPath();
  let x = 0.5;
  for (let index = 0; index < effectiveCols.length; index++) {
    const c = effectiveCols[index];
    if (c.width === 0) continue;
    x += c.width;
    const tx = c.sticky ? x : x + translateX;
    if (tx >= minX && tx <= maxX && verticalBorder(index + 1)) {
      toDraw.push({
        x1: tx,
        y1: Math.max(groupHeaderHeight, minY),
        x2: tx,
        y2: Math.min(height, maxY),
        color: vColor
      });
    }
  }
  let freezeY = height + 0.5;
  for (let i = rows - freezeTrailingRows; i < rows; i++) {
    const rh = getRowHeight(i);
    freezeY -= rh;
    toDraw.push({
      x1: minX,
      y1: freezeY,
      x2: maxX,
      y2: freezeY,
      color: hColor
    });
  }
  if (verticalOnly !== true) {
    let y = totalHeaderHeight + 0.5;
    let row = cellYOffset;
    const target = freezeY;
    while (y + translateY < target) {
      const ty = y + translateY;
      if (ty >= minY && ty <= maxY - 1) {
        var _ref, _rowTheme$horizontalB;
        const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
        toDraw.push({
          x1: minX,
          y1: ty,
          x2: maxX,
          y2: ty,
          color: (_ref = (_rowTheme$horizontalB = rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.horizontalBorderColor) !== null && _rowTheme$horizontalB !== void 0 ? _rowTheme$horizontalB : rowTheme === null || rowTheme === void 0 ? void 0 : rowTheme.borderColor) !== null && _ref !== void 0 ? _ref : hColor
        });
      }
      y += getRowHeight(row);
      row++;
    }
  }
  const groups = groupBy_default()(toDraw, line => line.color);
  for (const g of Object.keys(groups)) {
    ctx.strokeStyle = g;
    for (const line of groups[g]) {
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
    }
    ctx.stroke();
    ctx.beginPath();
  }
  if (spans !== undefined) {
    ctx.restore();
  }
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid-render.blit.ts



function blitLastFrame(ctx, blitSource, blitSourceScroll, targetScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, getRowHeight, doubleBuffer) {
  const drawRegions = [];
  ctx.imageSmoothingEnabled = false;
  const minY = Math.min(last.cellYOffset, cellYOffset);
  const maxY = Math.max(last.cellYOffset, cellYOffset);
  let deltaY = 0;
  if (typeof getRowHeight === "number") {
    deltaY += (maxY - minY) * getRowHeight;
  } else {
    for (let i = minY; i < maxY; i++) {
      deltaY += getRowHeight(i);
    }
  }
  if (cellYOffset > last.cellYOffset) {
    deltaY = -deltaY;
  }
  deltaY += translateY - last.translateY;
  const minX = Math.min(last.cellXOffset, cellXOffset);
  const maxX = Math.max(last.cellXOffset, cellXOffset);
  let deltaX = 0;
  for (let i = minX; i < maxX; i++) {
    deltaX += mappedColumns[i].width;
  }
  if (cellXOffset > last.cellXOffset) {
    deltaX = -deltaX;
  }
  deltaX += translateX - last.translateX;
  let stickyWidth = (0,data_grid_lib/* getStickyWidth */.G6)(effectiveCols);
  if (stickyWidth > 0) stickyWidth++;
  if (deltaX !== 0 && deltaY !== 0) {
    return {
      regions: []
    };
  }
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight) : 0;
  const blitWidth = width - stickyWidth - Math.abs(deltaX);
  const blitHeight = height - totalHeaderHeight - freezeTrailingRowsHeight - Math.abs(deltaY) - 1;
  if (blitWidth > 150 && blitHeight > 150) {
    const args = {
      sx: 0,
      sy: 0,
      sw: width * dpr,
      sh: height * dpr,
      dx: 0,
      dy: 0,
      dw: width * dpr,
      dh: height * dpr
    };
    if (deltaY > 0) {
      args.sy = (totalHeaderHeight + 1) * dpr;
      args.sh = blitHeight * dpr;
      args.dy = (deltaY + totalHeaderHeight + 1) * dpr;
      args.dh = blitHeight * dpr;
      drawRegions.push({
        x: 0,
        y: totalHeaderHeight,
        width: width,
        height: deltaY + 1
      });
    } else if (deltaY < 0) {
      args.sy = (-deltaY + totalHeaderHeight + 1) * dpr;
      args.sh = blitHeight * dpr;
      args.dy = (totalHeaderHeight + 1) * dpr;
      args.dh = blitHeight * dpr;
      drawRegions.push({
        x: 0,
        y: height + deltaY - freezeTrailingRowsHeight,
        width: width,
        height: -deltaY + freezeTrailingRowsHeight
      });
    }
    if (deltaX > 0) {
      args.sx = stickyWidth * dpr;
      args.sw = blitWidth * dpr;
      args.dx = (deltaX + stickyWidth) * dpr;
      args.dw = blitWidth * dpr;
      drawRegions.push({
        x: stickyWidth - 1,
        y: 0,
        width: deltaX + 2,
        height: height
      });
    } else if (deltaX < 0) {
      args.sx = (stickyWidth - deltaX) * dpr;
      args.sw = blitWidth * dpr;
      args.dx = stickyWidth * dpr;
      args.dw = blitWidth * dpr;
      drawRegions.push({
        x: width + deltaX,
        y: 0,
        width: -deltaX,
        height: height
      });
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (doubleBuffer) {
      if (stickyWidth > 0 && deltaX !== 0 && deltaY === 0 && (targetScroll === undefined || (blitSourceScroll === null || blitSourceScroll === void 0 ? void 0 : blitSourceScroll[1]) !== false)) {
        const w = stickyWidth * dpr;
        const h = height * dpr;
        ctx.drawImage(blitSource, 0, 0, w, h, 0, 0, w, h);
      }
      if (freezeTrailingRowsHeight > 0 && deltaX === 0 && deltaY !== 0 && (targetScroll === undefined || (blitSourceScroll === null || blitSourceScroll === void 0 ? void 0 : blitSourceScroll[0]) !== false)) {
        const y = (height - freezeTrailingRowsHeight) * dpr;
        const w = width * dpr;
        const h = freezeTrailingRowsHeight * dpr;
        ctx.drawImage(blitSource, 0, y, w, h, 0, y, w, h);
      }
    }
    ctx.drawImage(blitSource, args.sx, args.sy, args.sw, args.sh, args.dx, args.dy, args.dw, args.dh);
    ctx.scale(dpr, dpr);
  }
  ctx.imageSmoothingEnabled = true;
  return {
    regions: drawRegions
  };
}
function blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedIndex) {
  const drawRegions = [];
  if (cellXOffset !== last.cellXOffset || cellYOffset !== last.cellYOffset || translateX !== last.translateX || translateY !== last.translateY) {
    return drawRegions;
  }
  walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _drawY, clipX) => {
    if (c.sourceIndex === resizedIndex) {
      const x = Math.max(drawX, clipX) + 1;
      drawRegions.push({
        x,
        y: 0,
        width: width - x,
        height
      });
      return true;
    }
  });
  return drawRegions;
}
function computeCanBlit(current, last) {
  if (last === undefined) return false;
  if (current.width !== last.width || current.height !== last.height || current.theme !== last.theme || current.headerHeight !== last.headerHeight || current.rowHeight !== last.rowHeight || current.rows !== last.rows || current.freezeColumns !== last.freezeColumns || current.getRowThemeOverride !== last.getRowThemeOverride || current.isFocused !== last.isFocused || current.isResizing !== last.isResizing || current.verticalBorder !== last.verticalBorder || current.getCellContent !== last.getCellContent || current.highlightRegions !== last.highlightRegions || current.selection !== last.selection || current.dragAndDropState !== last.dragAndDropState || current.prelightCells !== last.prelightCells || current.touchMode !== last.touchMode || current.maxScaleFactor !== last.maxScaleFactor) {
    return false;
  }
  if (current.mappedColumns !== last.mappedColumns) {
    if (current.mappedColumns.length > 100 || current.mappedColumns.length !== last.mappedColumns.length) {
      return false;
    }
    let resized;
    for (let i = 0; i < current.mappedColumns.length; i++) {
      const curCol = current.mappedColumns[i];
      const lastCol = last.mappedColumns[i];
      if ((0,support/* deepEqual */.vZ)(curCol, lastCol)) continue;
      if (resized !== undefined) return false;
      if (curCol.width === lastCol.width) return false;
      const {
        width,
        ...curRest
      } = curCol;
      const {
        width: lastWidth,
        ...lastRest
      } = lastCol;
      if (!(0,support/* deepEqual */.vZ)(curRest, lastRest)) return false;
      resized = i;
    }
    if (resized === undefined) {
      return true;
    }
    return resized;
  }
  return true;
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid.render.rings.ts




function drawHighlightRings(ctx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, allHighlightRegions, theme) {
  const highlightRegions = allHighlightRegions === null || allHighlightRegions === void 0 ? void 0 : allHighlightRegions.filter(x => x.style !== "no-outline");
  if (highlightRegions === undefined || highlightRegions.length === 0) return undefined;
  const freezeLeft = (0,data_grid_lib/* getStickyWidth */.G6)(mappedColumns);
  const freezeBottom = (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, rowHeight);
  const splitIndicies = [freezeColumns, 0, mappedColumns.length, rows - freezeTrailingRows];
  const splitLocations = [freezeLeft, 0, width, height - freezeBottom];
  const drawRects = highlightRegions.map(h => {
    var _h$style;
    const r = h.range;
    const style = (_h$style = h.style) !== null && _h$style !== void 0 ? _h$style : "dashed";
    return (0,math/* splitRectIntoRegions */.jd)(r, splitIndicies, width, height, splitLocations).map(arg => {
      const rect = arg.rect;
      const topLeftBounds = (0,data_grid_lib/* computeBounds */.Ve)(rect.x, rect.y, width, height, groupHeaderHeight, headerHeight + groupHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight);
      const bottomRightBounds = rect.width === 1 && rect.height === 1 ? topLeftBounds : (0,data_grid_lib/* computeBounds */.Ve)(rect.x + rect.width - 1, rect.y + rect.height - 1, width, height, groupHeaderHeight, headerHeight + groupHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight);
      if (rect.x + rect.width >= mappedColumns.length) {
        bottomRightBounds.width -= 1;
      }
      if (rect.y + rect.height >= rows) {
        bottomRightBounds.height -= 1;
      }
      return {
        color: h.color,
        style,
        clip: arg.clip,
        rect: (0,math/* hugRectToTarget */.$y)({
          x: topLeftBounds.x,
          y: topLeftBounds.y,
          width: bottomRightBounds.x + bottomRightBounds.width - topLeftBounds.x,
          height: bottomRightBounds.y + bottomRightBounds.height - topLeftBounds.y
        }, width, height, 8)
      };
    });
  });
  const drawCb = () => {
    ctx.lineWidth = 1;
    let dashed = false;
    for (const dr of drawRects) {
      for (const s of dr) {
        if ((s === null || s === void 0 ? void 0 : s.rect) !== undefined && (0,math/* intersectRect */.qb)(0, 0, width, height, s.rect.x, s.rect.y, s.rect.width, s.rect.height)) {
          const wasDashed = dashed;
          const needsClip = !(0,math/* rectContains */.tJ)(s.clip, s.rect);
          if (needsClip) {
            ctx.save();
            ctx.rect(s.clip.x, s.clip.y, s.clip.width, s.clip.height);
            ctx.clip();
          }
          if (s.style === "dashed" && !dashed) {
            ctx.setLineDash([5, 3]);
            dashed = true;
          } else if ((s.style === "solid" || s.style === "solid-outline") && dashed) {
            ctx.setLineDash([]);
            dashed = false;
          }
          ctx.strokeStyle = s.style === "solid-outline" ? (0,color_parser/* blend */.NH)((0,color_parser/* blend */.NH)(s.color, theme.borderColor), theme.bgCell) : (0,color_parser/* withAlpha */.fG)(s.color, 1);
          ctx.strokeRect(s.rect.x + 0.5, s.rect.y + 0.5, s.rect.width - 1, s.rect.height - 1);
          if (needsClip) {
            ctx.restore();
            dashed = wasDashed;
          }
        }
      }
    }
    if (dashed) {
      ctx.setLineDash([]);
    }
  };
  drawCb();
  return drawCb;
}
function drawColumnResizeOutline(ctx, yOffset, xOffset, height, style) {
  ctx.beginPath();
  ctx.moveTo(yOffset, xOffset);
  ctx.lineTo(yOffset, height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = style;
  ctx.stroke();
  ctx.globalAlpha = 1;
}
function drawFocusRing(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, allColumns, theme, totalHeaderHeight, selectedCell, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) {
  var _cell$span;
  if (selectedCell.current === undefined) return undefined;
  const range = selectedCell.current.range;
  const currentItem = selectedCell.current.cell;
  const fillHandleTarget = [range.x + range.width - 1, range.y + range.height - 1];
  if (currentItem[1] >= rows && fillHandleTarget[1] >= rows) return undefined;
  const mustDraw = effectiveCols.some(c => c.sourceIndex === currentItem[0] || c.sourceIndex === fillHandleTarget[0]);
  if (!mustDraw) return undefined;
  const [targetCol, targetRow] = selectedCell.current.cell;
  const cell = getCellContent(selectedCell.current.cell);
  const targetColSpan = (_cell$span = cell.span) !== null && _cell$span !== void 0 ? _cell$span : [targetCol, targetCol];
  const isStickyRow = targetRow >= rows - freezeTrailingRows;
  const stickRowHeight = freezeTrailingRows > 0 && !isStickyRow ? (0,data_grid_lib/* getFreezeTrailingHeight */.YN)(rows, freezeTrailingRows, getRowHeight) - 1 : 0;
  const fillHandleRow = fillHandleTarget[1];
  let drawCb = undefined;
  let drawHandleCb = undefined;
  walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, (col, drawX, colDrawY, clipX, startRow) => {
    if (col.sticky && targetCol > col.sourceIndex) return;
    const isBeforeTarget = col.sourceIndex < targetColSpan[0];
    const isAfterTarget = col.sourceIndex > targetColSpan[1];
    const isFillHandleCol = col.sourceIndex === fillHandleTarget[0];
    if (!isFillHandleCol && (isBeforeTarget || isAfterTarget)) {
      return;
    }
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, undefined, (drawY, row, rh) => {
      if (row !== targetRow && row !== fillHandleRow) return;
      let cellX = drawX;
      let cellWidth = col.width;
      const isLastColumn = col.sourceIndex === allColumns.length - 1;
      const isLastRow = row === rows - 1;
      if (cell.span !== undefined) {
        const areas = getSpanBounds(cell.span, drawX, drawY, col.width, rh, col, allColumns);
        const area = col.sticky ? areas[0] : areas[1];
        if (area !== undefined) {
          cellX = area.x;
          cellWidth = area.width;
        }
      }
      const doHandle = row === fillHandleRow && isFillHandleCol && fillHandle;
      const doRing = row === targetRow && !isBeforeTarget && !isAfterTarget && drawCb === undefined;
      if (doHandle) {
        drawHandleCb = () => {
          var _col$themeOverride$ac, _col$themeOverride;
          if (clipX > cellX && !col.sticky && !doRing) {
            ctx.beginPath();
            ctx.rect(clipX, 0, width - clipX, height);
            ctx.clip();
          }
          ctx.beginPath();
          ctx.rect(cellX + cellWidth - 4, drawY + rh - 4, 4, 4);
          ctx.fillStyle = (_col$themeOverride$ac = (_col$themeOverride = col.themeOverride) === null || _col$themeOverride === void 0 ? void 0 : _col$themeOverride.accentColor) !== null && _col$themeOverride$ac !== void 0 ? _col$themeOverride$ac : theme.accentColor;
          ctx.fill();
        };
      }
      if (doRing) {
        drawCb = () => {
          var _col$themeOverride$ac2, _col$themeOverride2;
          if (clipX > cellX && !col.sticky) {
            ctx.beginPath();
            ctx.rect(clipX, 0, width - clipX, height);
            ctx.clip();
          }
          ctx.beginPath();
          ctx.rect(cellX + 0.5, drawY + 0.5, cellWidth - (isLastColumn ? 1 : 0), rh - (isLastRow ? 1 : 0));
          ctx.strokeStyle = (_col$themeOverride$ac2 = (_col$themeOverride2 = col.themeOverride) === null || _col$themeOverride2 === void 0 ? void 0 : _col$themeOverride2.accentColor) !== null && _col$themeOverride$ac2 !== void 0 ? _col$themeOverride$ac2 : theme.accentColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        };
      }
      return drawCb !== undefined && (fillHandle ? drawHandleCb !== undefined : true);
    });
    return drawCb !== undefined && (fillHandle ? drawHandleCb !== undefined : true);
  });
  if (drawCb === undefined && drawHandleCb === undefined) return undefined;
  const result = () => {
    var _drawCb, _drawHandleCb;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, totalHeaderHeight, width, height - totalHeaderHeight - stickRowHeight);
    ctx.clip();
    (_drawCb = drawCb) === null || _drawCb === void 0 || _drawCb();
    (_drawHandleCb = drawHandleCb) === null || _drawHandleCb === void 0 || _drawHandleCb();
    ctx.restore();
  };
  result();
  return result;
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/render/data-grid-render.ts









function clipHeaderDamage(ctx, effectiveColumns, width, groupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage) {
  if (damage === undefined || damage.size === 0) return;
  ctx.beginPath();
  walkGroups(effectiveColumns, width, translateX, groupHeaderHeight, (span, _group, x, y, w, h) => {
    const hasItemInSpan = damage.hasItemInRectangle({
      x: span[0],
      y: -2,
      width: span[1] - span[0] + 1,
      height: 1
    });
    if (hasItemInSpan) {
      ctx.rect(x, y, w, h);
    }
  });
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _colDrawY, clipX) => {
    const diff = Math.max(0, clipX - drawX);
    const finalX = drawX + diff + 1;
    const finalWidth = c.width - diff - 1;
    if (damage.has([c.sourceIndex, -1])) {
      ctx.rect(finalX, groupHeaderHeight, finalWidth, totalHeaderHeight - groupHeaderHeight);
    }
  });
  ctx.clip();
}
function getLastRow(effectiveColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow) {
  let result = 0;
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (_c, __drawX, colDrawY, _clipX, startRow) => {
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, undefined, (_drawY, row, _rh, isSticky) => {
      if (!isSticky) {
        result = Math.max(row, result);
      }
    });
    return true;
  });
  return result;
}
function drawGrid(arg, lastArg) {
  var _window$devicePixelRa, _selection$current;
  const {
    canvasCtx,
    headerCanvasCtx,
    width,
    height,
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mappedColumns,
    enableGroups,
    freezeColumns,
    dragAndDropState,
    theme,
    drawFocus,
    headerHeight,
    groupHeaderHeight,
    disabledRows,
    rowHeight,
    verticalBorder,
    overrideCursor,
    isResizing,
    selection,
    fillHandle,
    freezeTrailingRows,
    rows,
    getCellContent,
    getGroupDetails,
    getRowThemeOverride,
    isFocused,
    drawHeaderCallback,
    prelightCells,
    drawCellCallback,
    highlightRegions,
    resizeCol,
    imageLoader,
    lastBlitData,
    hoverValues,
    hyperWrapping,
    hoverInfo,
    spriteManager,
    maxScaleFactor,
    hasAppendRow,
    touchMode,
    enqueue,
    renderStateProvider,
    getCellRenderer,
    renderStrategy,
    bufferACtx,
    bufferBCtx,
    damage,
    minimumCellWidth
  } = arg;
  if (width === 0 || height === 0) return;
  const doubleBuffer = renderStrategy === "double-buffer";
  const dpr = Math.min(maxScaleFactor, Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1));
  const canBlit = renderStrategy !== "direct" && computeCanBlit(arg, lastArg);
  const canvas = canvasCtx.canvas;
  if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }
  const overlayCanvas = headerCanvasCtx.canvas;
  const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;
  const overlayHeight = totalHeaderHeight + 1;
  if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== overlayHeight * dpr) {
    overlayCanvas.width = width * dpr;
    overlayCanvas.height = overlayHeight * dpr;
    overlayCanvas.style.width = width + "px";
    overlayCanvas.style.height = overlayHeight + "px";
  }
  const bufferA = bufferACtx.canvas;
  const bufferB = bufferBCtx.canvas;
  if (doubleBuffer && (bufferA.width !== width * dpr || bufferA.height !== height * dpr)) {
    bufferA.width = width * dpr;
    bufferA.height = height * dpr;
    if (lastBlitData.current !== undefined) lastBlitData.current.aBufferScroll = undefined;
  }
  if (doubleBuffer && (bufferB.width !== width * dpr || bufferB.height !== height * dpr)) {
    bufferB.width = width * dpr;
    bufferB.height = height * dpr;
    if (lastBlitData.current !== undefined) lastBlitData.current.bBufferScroll = undefined;
  }
  const last = lastBlitData.current;
  if (canBlit === true && cellXOffset === (last === null || last === void 0 ? void 0 : last.cellXOffset) && cellYOffset === (last === null || last === void 0 ? void 0 : last.cellYOffset) && translateX === (last === null || last === void 0 ? void 0 : last.translateX) && translateY === (last === null || last === void 0 ? void 0 : last.translateY)) return;
  let mainCtx = null;
  if (doubleBuffer) {
    mainCtx = canvasCtx;
  }
  const overlayCtx = headerCanvasCtx;
  let targetCtx;
  if (!doubleBuffer) {
    targetCtx = canvasCtx;
  } else if (damage !== undefined) {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferBCtx : bufferACtx;
  } else {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferACtx : bufferBCtx;
  }
  const targetBuffer = targetCtx.canvas;
  const blitSource = doubleBuffer ? targetBuffer === bufferA ? bufferB : bufferA : canvas;
  const getRowHeight = typeof rowHeight === "number" ? () => rowHeight : rowHeight;
  overlayCtx.save();
  targetCtx.save();
  overlayCtx.beginPath();
  targetCtx.beginPath();
  overlayCtx.textBaseline = "middle";
  targetCtx.textBaseline = "middle";
  if (dpr !== 1) {
    overlayCtx.scale(dpr, dpr);
    targetCtx.scale(dpr, dpr);
  }
  const effectiveCols = (0,data_grid_lib/* getEffectiveColumns */.ih)(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
  let drawRegions = [];
  const mustDrawFocusOnHeader = drawFocus && ((_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell[1]) === cellYOffset && translateY === 0;
  let mustDrawHighlightRingsOnHeader = false;
  if (highlightRegions !== undefined) {
    for (const r of highlightRegions) {
      if (r.style !== "no-outline" && r.range.y === cellYOffset && translateY === 0) {
        mustDrawHighlightRingsOnHeader = true;
        break;
      }
    }
  }
  const drawHeaderTexture = () => {
    var _ref, _theme$headerBottomBo;
    drawGridHeaders(overlayCtx, effectiveCols, enableGroups, hoverInfo, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, theme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode);
    drawGridLines(overlayCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, undefined, undefined, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme, true);
    overlayCtx.beginPath();
    overlayCtx.moveTo(0, overlayHeight - 0.5);
    overlayCtx.lineTo(width, overlayHeight - 0.5);
    overlayCtx.strokeStyle = (0,color_parser/* blend */.NH)((_ref = (_theme$headerBottomBo = theme.headerBottomBorderColor) !== null && _theme$headerBottomBo !== void 0 ? _theme$headerBottomBo : theme.horizontalBorderColor) !== null && _ref !== void 0 ? _ref : theme.borderColor, theme.bgHeader);
    overlayCtx.stroke();
    if (mustDrawHighlightRingsOnHeader) {
      drawHighlightRings(overlayCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme);
    }
    if (mustDrawFocusOnHeader) {
      drawFocusRing(overlayCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
    }
  };
  if (damage !== undefined) {
    const viewRegionWidth = effectiveCols[effectiveCols.length - 1].sourceIndex + 1;
    const damageInView = damage.hasItemInRegion([{
      x: cellXOffset,
      y: -2,
      width: viewRegionWidth,
      height: 2
    }, {
      x: cellXOffset,
      y: cellYOffset,
      width: viewRegionWidth,
      height: 300
    }, {
      x: 0,
      y: cellYOffset,
      width: freezeColumns,
      height: 300
    }, {
      x: 0,
      y: -2,
      width: freezeColumns,
      height: 2
    }, {
      x: cellXOffset,
      y: rows - freezeTrailingRows,
      width: viewRegionWidth,
      height: freezeTrailingRows,
      when: freezeTrailingRows > 0
    }]);
    const doDamage = ctx => {
      drawCells(ctx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
      const selectionCurrent = selection.current;
      if (fillHandle && drawFocus && selectionCurrent !== undefined && damage.has((0,data_grid_lib/* rectBottomRight */.zU)(selectionCurrent.range))) {
        drawFocusRing(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
      }
    };
    if (damageInView) {
      doDamage(targetCtx);
      if (mainCtx !== null) {
        mainCtx.save();
        mainCtx.scale(dpr, dpr);
        mainCtx.textBaseline = "middle";
        doDamage(mainCtx);
        mainCtx.restore();
      }
      const doHeaders = damage.hasHeader();
      if (doHeaders) {
        clipHeaderDamage(overlayCtx, effectiveCols, width, groupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage);
        drawHeaderTexture();
      }
    }
    targetCtx.restore();
    overlayCtx.restore();
    return;
  }
  if (canBlit !== true || cellXOffset !== (last === null || last === void 0 ? void 0 : last.cellXOffset) || translateX !== (last === null || last === void 0 ? void 0 : last.translateX) || mustDrawFocusOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawFocusOnHeader) || mustDrawHighlightRingsOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawHighlightRingsOnHeader)) {
    drawHeaderTexture();
  }
  if (canBlit === true) {
    (0,support/* assert */.hu)(blitSource !== undefined && last !== undefined);
    const {
      regions
    } = blitLastFrame(targetCtx, blitSource, blitSource === bufferA ? last.aBufferScroll : last.bBufferScroll, blitSource === bufferA ? last.bBufferScroll : last.aBufferScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, rowHeight, doubleBuffer);
    drawRegions = regions;
  } else if (canBlit !== false) {
    (0,support/* assert */.hu)(last !== undefined);
    const resizedCol = canBlit;
    drawRegions = blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedCol);
  }
  overdrawStickyBoundaries(targetCtx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme);
  const highlightRedraw = drawHighlightRings(targetCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, groupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme);
  const focusRedraw = drawFocus ? drawFocusRing(targetCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) : undefined;
  targetCtx.fillStyle = theme.bgCell;
  if (drawRegions.length > 0) {
    targetCtx.beginPath();
    for (const r of drawRegions) {
      targetCtx.rect(r.x, r.y, r.width, r.height);
    }
    targetCtx.clip();
    targetCtx.fill();
    targetCtx.beginPath();
  } else {
    targetCtx.fillRect(0, 0, width, height);
  }
  const spans = drawCells(targetCtx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
  drawBlanks(targetCtx, effectiveCols, mappedColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowThemeOverride, selection.rows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme);
  drawExtraRowThemes(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  drawGridLines(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, groupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  highlightRedraw === null || highlightRedraw === void 0 || highlightRedraw();
  focusRedraw === null || focusRedraw === void 0 || focusRedraw();
  if (isResizing) {
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x) => {
      if (c.sourceIndex === resizeCol) {
        var _theme$resizeIndicato, _theme$resizeIndicato2;
        drawColumnResizeOutline(overlayCtx, x + c.width, 0, totalHeaderHeight + 1, (0,color_parser/* blend */.NH)((_theme$resizeIndicato = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato !== void 0 ? _theme$resizeIndicato : theme.accentLight, theme.bgHeader));
        drawColumnResizeOutline(targetCtx, x + c.width, totalHeaderHeight, height, (0,color_parser/* blend */.NH)((_theme$resizeIndicato2 = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato2 !== void 0 ? _theme$resizeIndicato2 : theme.accentLight, theme.bgCell));
        return true;
      }
      return false;
    });
  }
  if (mainCtx !== null) {
    mainCtx.fillStyle = theme.bgCell;
    mainCtx.fillRect(0, 0, width, height);
    mainCtx.drawImage(targetCtx.canvas, 0, 0);
  }
  const lastRowDrawn = getLastRow(effectiveCols, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow);
  imageLoader === null || imageLoader === void 0 || imageLoader.setWindow({
    x: cellXOffset,
    y: cellYOffset,
    width: effectiveCols.length,
    height: lastRowDrawn - cellYOffset
  }, freezeColumns, Array.from({
    length: freezeTrailingRows
  }, (_, i) => rows - 1 - i));
  const scrollX = last !== undefined && (cellXOffset !== last.cellXOffset || translateX !== last.translateX);
  const scrollY = last !== undefined && (cellYOffset !== last.cellYOffset || translateY !== last.translateY);
  lastBlitData.current = {
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mustDrawFocusOnHeader,
    mustDrawHighlightRingsOnHeader,
    lastBuffer: doubleBuffer ? targetBuffer === bufferA ? "a" : "b" : undefined,
    aBufferScroll: targetBuffer === bufferA ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.aBufferScroll,
    bBufferScroll: targetBuffer === bufferB ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.bBufferScroll
  };
  targetCtx.restore();
  overlayCtx.restore();
}
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/animation-manager.ts


const hoverTime = 80;
function easeOutCubic(x) {
  const x1 = x - 1;
  return x1 * x1 * x1 + 1;
}
class AnimationManager {
  constructor(callback) {
    this.callback = callback;
    this.currentHoveredItem = undefined;
    this.leavingItems = [];
    this.lastAnimationTime = void 0;
    this.addToLeavingItems = item => {
      const isAlreadyLeaving = this.leavingItems.some(i => (0,data_grid_lib/* itemsAreEqual */.pU)(i.item, item.item));
      if (isAlreadyLeaving) {
        return;
      }
      this.leavingItems.push(item);
    };
    this.removeFromLeavingItems = item => {
      var _leavingItem$hoverAmo;
      const leavingItem = this.leavingItems.find(e => (0,data_grid_lib/* itemsAreEqual */.pU)(e.item, item));
      this.leavingItems = this.leavingItems.filter(i => i !== leavingItem);
      return (_leavingItem$hoverAmo = leavingItem === null || leavingItem === void 0 ? void 0 : leavingItem.hoverAmount) !== null && _leavingItem$hoverAmo !== void 0 ? _leavingItem$hoverAmo : 0;
    };
    this.cleanUpLeavingElements = () => {
      this.leavingItems = this.leavingItems.filter(i => i.hoverAmount > 0);
    };
    this.shouldStep = () => {
      const hasLeavingItems = this.leavingItems.length > 0;
      const currentHoveredIsAnimating = this.currentHoveredItem !== undefined && this.currentHoveredItem.hoverAmount < 1;
      return hasLeavingItems || currentHoveredIsAnimating;
    };
    this.getAnimatingItems = () => {
      if (this.currentHoveredItem !== undefined) {
        return [...this.leavingItems, this.currentHoveredItem];
      }
      return this.leavingItems.map(x => ({
        ...x,
        hoverAmount: easeOutCubic(x.hoverAmount)
      }));
    };
    this.step = timestamp => {
      if (this.lastAnimationTime === undefined) {
        this.lastAnimationTime = timestamp;
      } else {
        const step = timestamp - this.lastAnimationTime;
        const delta = step / hoverTime;
        for (const item of this.leavingItems) {
          item.hoverAmount = clamp_default()(item.hoverAmount - delta, 0, 1);
        }
        if (this.currentHoveredItem !== undefined) {
          this.currentHoveredItem.hoverAmount = clamp_default()(this.currentHoveredItem.hoverAmount + delta, 0, 1);
        }
        const animating = this.getAnimatingItems();
        this.callback(animating);
        this.cleanUpLeavingElements();
      }
      if (this.shouldStep()) {
        this.lastAnimationTime = timestamp;
        window.requestAnimationFrame(this.step);
      } else {
        this.lastAnimationTime = undefined;
      }
    };
    this.setHovered = item => {
      var _this$currentHoveredI;
      if ((0,data_grid_lib/* itemsAreEqual */.pU)((_this$currentHoveredI = this.currentHoveredItem) === null || _this$currentHoveredI === void 0 ? void 0 : _this$currentHoveredI.item, item)) {
        return;
      }
      if (this.currentHoveredItem !== undefined) {
        this.addToLeavingItems(this.currentHoveredItem);
      }
      if (item !== undefined) {
        const hoverAmount = this.removeFromLeavingItems(item);
        this.currentHoveredItem = {
          item,
          hoverAmount
        };
      } else {
        this.currentHoveredItem = undefined;
      }
      if (this.lastAnimationTime === undefined) {
        window.requestAnimationFrame(this.step);
      }
    };
  }
}
// EXTERNAL MODULE: ./packages/core/src/common/render-state-provider.ts
var render_state_provider = __webpack_require__("./packages/core/src/common/render-state-provider.ts");
// EXTERNAL MODULE: ./packages/core/src/common/browser-detect.ts
var browser_detect = __webpack_require__("./packages/core/src/common/browser-detect.ts");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/use-animation-queue.ts



function useAnimationQueue(draw) {
  const queue = react.useRef([]);
  const seq = react.useRef(0);
  const drawRef = react.useRef(draw);
  drawRef.current = draw;
  const loop = react.useCallback(() => {
    const requeue = () => window.requestAnimationFrame(fn);
    const fn = () => {
      const toDraw = queue.current.map(render_state_provider/* unpackNumberToColRow */.kJ);
      queue.current = [];
      drawRef.current(new cell_set/* CellSet */.$(toDraw));
      if (queue.current.length > 0) {
        seq.current++;
      } else {
        seq.current = 0;
      }
    };
    window.requestAnimationFrame(seq.current > 600 ? requeue : fn);
  }, []);
  return react.useCallback(item => {
    if (queue.current.length === 0) loop();
    const packed = (0,render_state_provider/* packColRowToNumber */.gY)(item[0], item[1]);
    if (queue.current.includes(packed)) return;
    queue.current.push(packed);
  }, [loop]);
}
// EXTERNAL MODULE: ./packages/core/src/internal/data-grid/event-args.ts
var event_args = __webpack_require__("./packages/core/src/internal/data-grid/event-args.ts");
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/core/src/internal/data-grid/data-grid.tsx





















const fillHandleClickSize = 6;
const getRowData = (cell, getCellRenderer) => {
  var _r$getAccessibilitySt;
  if (cell.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom) return cell.copyData;
  const r = getCellRenderer === null || getCellRenderer === void 0 ? void 0 : getCellRenderer(cell);
  return (_r$getAccessibilitySt = r === null || r === void 0 ? void 0 : r.getAccessibilityString(cell)) !== null && _r$getAccessibilitySt !== void 0 ? _r$getAccessibilitySt : "";
};
const DataGrid = (p, forwardedRef) => {
  var _p$translateX, _p$translateY, _experimental$enableF, _experimental$enableS, _eventTargetRef$curre, _eventTargetRef$curre2, _eventTargetRef$curre3, _eventTargetRef$curre4, _eventTargetRef$curre5, _eventTargetRef$curre6;
  const {
    width,
    height,
    accessibilityHeight,
    columns,
    cellXOffset: cellXOffsetReal,
    cellYOffset,
    headerHeight,
    fillHandle = false,
    groupHeaderHeight,
    rowHeight,
    rows,
    getCellContent,
    getRowThemeOverride,
    onHeaderMenuClick,
    enableGroups,
    isFilling,
    onCanvasFocused,
    onCanvasBlur,
    isFocused,
    selection,
    freezeColumns,
    onContextMenu,
    freezeTrailingRows,
    fixedShadowX = true,
    fixedShadowY = true,
    drawFocusRing = true,
    onMouseDown,
    onMouseUp,
    onMouseMoveRaw,
    onMouseMove,
    onItemHovered,
    dragAndDropState,
    firstColAccessible,
    onKeyDown,
    onKeyUp,
    highlightRegions,
    canvasRef,
    onDragStart,
    onDragEnd,
    eventTargetRef,
    isResizing,
    resizeColumn: resizeCol,
    isDragging,
    isDraggable = false,
    allowResize,
    disabledRows,
    hasAppendRow,
    getGroupDetails,
    theme,
    prelightCells,
    headerIcons,
    verticalBorder,
    drawCell: drawCellCallback,
    drawHeader: drawHeaderCallback,
    onCellFocused,
    onDragOverCell,
    onDrop,
    onDragLeave,
    imageWindowLoader,
    smoothScrollX = false,
    smoothScrollY = false,
    experimental,
    getCellRenderer
  } = p;
  const translateX = (_p$translateX = p.translateX) !== null && _p$translateX !== void 0 ? _p$translateX : 0;
  const translateY = (_p$translateY = p.translateY) !== null && _p$translateY !== void 0 ? _p$translateY : 0;
  const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));
  const ref = react.useRef(null);
  const imageLoader = imageWindowLoader;
  const damageRegion = react.useRef();
  const [scrolling, setScrolling] = react.useState(false);
  const hoverValues = react.useRef([]);
  const lastBlitData = react.useRef();
  const [hoveredItemInfo, setHoveredItemInfo] = react.useState();
  const [hoveredOnEdge, setHoveredOnEdge] = react.useState();
  const overlayRef = react.useRef(null);
  const [drawCursorOverride, setDrawCursorOverride] = react.useState();
  const [lastWasTouch, setLastWasTouch] = react.useState(false);
  const lastWasTouchRef = react.useRef(lastWasTouch);
  lastWasTouchRef.current = lastWasTouch;
  const spriteManager = react.useMemo(() => new SpriteManager(headerIcons, () => {
    lastArgsRef.current = undefined;
    lastDrawRef.current();
  }), [headerIcons]);
  const totalHeaderHeight = enableGroups ? groupHeaderHeight + headerHeight : headerHeight;
  const scrollingStopRef = react.useRef(-1);
  const enableFirefoxRescaling = ((_experimental$enableF = experimental === null || experimental === void 0 ? void 0 : experimental.enableFirefoxRescaling) !== null && _experimental$enableF !== void 0 ? _experimental$enableF : false) && browser_detect/* browserIsFirefox.value */.uC.value;
  const enableSafariRescaling = ((_experimental$enableS = experimental === null || experimental === void 0 ? void 0 : experimental.enableSafariRescaling) !== null && _experimental$enableS !== void 0 ? _experimental$enableS : false) && browser_detect/* browserIsSafari.value */.Pq.value;
  react.useLayoutEffect(() => {
    if (window.devicePixelRatio === 1 || !enableFirefoxRescaling && !enableSafariRescaling) return;
    if (scrollingStopRef.current !== -1) {
      setScrolling(true);
    }
    window.clearTimeout(scrollingStopRef.current);
    scrollingStopRef.current = window.setTimeout(() => {
      setScrolling(false);
      scrollingStopRef.current = -1;
    }, 200);
  }, [cellYOffset, cellXOffset, translateX, translateY, enableFirefoxRescaling, enableSafariRescaling]);
  const mappedColumns = (0,data_grid_lib/* useMappedColumns */.NZ)(columns, freezeColumns);
  const stickyX = fixedShadowX ? (0,data_grid_lib/* getStickyWidth */.G6)(mappedColumns, dragAndDropState) : 0;
  const getBoundsForItem = react.useCallback((canvas, col, row) => {
    const rect = canvas.getBoundingClientRect();
    if (col >= mappedColumns.length || row >= rows) {
      return undefined;
    }
    const scale = rect.width / width;
    const result = (0,data_grid_lib/* computeBounds */.Ve)(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight);
    if (scale !== 1) {
      result.x *= scale;
      result.y *= scale;
      result.width *= scale;
      result.height *= scale;
    }
    result.x += rect.x;
    result.y += rect.y;
    return result;
  }, [width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight]);
  const getMouseArgsForPosition = react.useCallback((canvas, posX, posY, ev) => {
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / width;
    const x = (posX - rect.left) / scale;
    const y = (posY - rect.top) / scale;
    const edgeDetectionBuffer = 5;
    const effectiveCols = (0,data_grid_lib/* getEffectiveColumns */.ih)(mappedColumns, cellXOffset, width, undefined, translateX);
    let button = 0;
    let buttons = 0;
    if (ev instanceof MouseEvent) {
      button = ev.button;
      buttons = ev.buttons;
    }
    const col = (0,data_grid_lib/* getColumnIndexForX */.oK)(x, effectiveCols, translateX);
    const row = (0,data_grid_lib/* getRowIndexForY */.pV)(y, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows);
    const shiftKey = (ev === null || ev === void 0 ? void 0 : ev.shiftKey) === true;
    const ctrlKey = (ev === null || ev === void 0 ? void 0 : ev.ctrlKey) === true;
    const metaKey = (ev === null || ev === void 0 ? void 0 : ev.metaKey) === true;
    const isTouch = ev !== undefined && !(ev instanceof MouseEvent) || (ev === null || ev === void 0 ? void 0 : ev.pointerType) === "touch";
    const scrollEdge = [x < 0 ? -1 : width < x ? 1 : 0, y < totalHeaderHeight ? -1 : height < y ? 1 : 0];
    let result;
    if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
      const horizontal = x > width ? 1 : x < 0 ? -1 : 0;
      const vertical = y > height ? 1 : y < 0 ? -1 : 0;
      let innerHorizontal = horizontal * 2;
      let innerVertical = vertical * 2;
      if (horizontal === 0) innerHorizontal = col === -1 ? event_args/* OutOfBoundsRegionAxis.EndPadding */.W_.EndPadding : event_args/* OutOfBoundsRegionAxis.Center */.W_.Center;
      if (vertical === 0) innerVertical = row === undefined ? event_args/* OutOfBoundsRegionAxis.EndPadding */.W_.EndPadding : event_args/* OutOfBoundsRegionAxis.Center */.W_.Center;
      let isEdge = false;
      if (col === -1 && row === -1) {
        const b = getBoundsForItem(canvas, mappedColumns.length - 1, -1);
        (0,support/* assert */.hu)(b !== undefined);
        isEdge = posX < b.x + b.width + edgeDetectionBuffer;
      }
      const isMaybeScrollbar = x > width && x < width + (0,utils/* getScrollBarWidth */.Iz)() || y > height && y < height + (0,utils/* getScrollBarWidth */.Iz)();
      result = {
        kind: event_args/* outOfBoundsKind */.Xv,
        location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row !== null && row !== void 0 ? row : rows - 1],
        region: [innerHorizontal, innerVertical],
        shiftKey,
        ctrlKey,
        metaKey,
        isEdge,
        isTouch,
        button,
        buttons,
        scrollEdge,
        isMaybeScrollbar
      };
    } else if (row <= -1) {
      let bounds = getBoundsForItem(canvas, col, row);
      (0,support/* assert */.hu)(bounds !== undefined);
      let isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;
      const previousCol = col - 1;
      if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
        var _mappedColumns$previo;
        isEdge = true;
        bounds = getBoundsForItem(canvas, previousCol, row);
        (0,support/* assert */.hu)(bounds !== undefined);
        result = {
          kind: enableGroups && row === -2 ? event_args/* groupHeaderKind */.mr : event_args/* headerKind */.aZ,
          location: [previousCol, row],
          bounds: bounds,
          group: (_mappedColumns$previo = mappedColumns[previousCol].group) !== null && _mappedColumns$previo !== void 0 ? _mappedColumns$previo : "",
          isEdge,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      } else {
        var _mappedColumns$col$gr;
        result = {
          kind: enableGroups && row === -2 ? event_args/* groupHeaderKind */.mr : event_args/* headerKind */.aZ,
          group: (_mappedColumns$col$gr = mappedColumns[col].group) !== null && _mappedColumns$col$gr !== void 0 ? _mappedColumns$col$gr : "",
          location: [col, row],
          bounds: bounds,
          isEdge,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      }
    } else {
      const bounds = getBoundsForItem(canvas, col, row);
      (0,support/* assert */.hu)(bounds !== undefined);
      const isEdge = bounds !== undefined && bounds.x + bounds.width - posX < edgeDetectionBuffer;
      let isFillHandle = false;
      if (fillHandle && selection.current !== undefined) {
        const fillHandleLocation = (0,data_grid_lib/* rectBottomRight */.zU)(selection.current.range);
        const fillHandleCellBounds = getBoundsForItem(canvas, fillHandleLocation[0], fillHandleLocation[1]);
        if (fillHandleCellBounds !== undefined) {
          const handleLogicalCenterX = fillHandleCellBounds.x + fillHandleCellBounds.width - 2;
          const handleLogicalCenterY = fillHandleCellBounds.y + fillHandleCellBounds.height - 2;
          isFillHandle = Math.abs(handleLogicalCenterX - posX) < fillHandleClickSize && Math.abs(handleLogicalCenterY - posY) < fillHandleClickSize;
        }
      }
      result = {
        kind: "cell",
        location: [col, row],
        bounds: bounds,
        isEdge,
        shiftKey,
        ctrlKey,
        isFillHandle,
        metaKey,
        isTouch,
        localEventX: posX - bounds.x,
        localEventY: posY - bounds.y,
        button,
        buttons,
        scrollEdge
      };
    }
    return result;
  }, [width, mappedColumns, cellXOffset, translateX, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, getBoundsForItem, fillHandle, selection, totalHeaderHeight]);
  const [hoveredItem] = hoveredItemInfo !== null && hoveredItemInfo !== void 0 ? hoveredItemInfo : [];
  const enqueueRef = react.useRef(() => {});
  const hoverInfoRef = react.useRef(hoveredItemInfo);
  hoverInfoRef.current = hoveredItemInfo;
  const [bufferACtx, bufferBCtx] = react.useMemo(() => {
    const a = document.createElement("canvas");
    const b = document.createElement("canvas");
    a.style["display"] = "none";
    a.style["opacity"] = "0";
    a.style["position"] = "fixed";
    b.style["display"] = "none";
    b.style["opacity"] = "0";
    b.style["position"] = "fixed";
    return [a.getContext("2d", {
      alpha: false
    }), b.getContext("2d", {
      alpha: false
    })];
  }, []);
  react.useLayoutEffect(() => {
    if (bufferACtx === null || bufferBCtx === null) return;
    document.documentElement.append(bufferACtx.canvas);
    document.documentElement.append(bufferBCtx.canvas);
    return () => {
      bufferACtx.canvas.remove();
      bufferBCtx.canvas.remove();
    };
  }, [bufferACtx, bufferBCtx]);
  const renderStateProvider = react.useMemo(() => new render_state_provider/* RenderStateProvider */.$d(), []);
  const maxDPR = enableFirefoxRescaling && scrolling ? 1 : enableSafariRescaling && scrolling ? 2 : 5;
  const minimumCellWidth = (experimental === null || experimental === void 0 ? void 0 : experimental.disableMinimumCellWidth) === true ? 1 : 10;
  const lastArgsRef = react.useRef();
  const canvasCtx = react.useRef(null);
  const overlayCtx = react.useRef(null);
  const draw = react.useCallback(() => {
    var _experimental$hyperWr, _experimental$renderS, _hoverInfoRef$current;
    const canvas = ref.current;
    const overlay = overlayRef.current;
    if (canvas === null || overlay === null) return;
    if (canvasCtx.current === null) {
      canvasCtx.current = canvas.getContext("2d", {
        alpha: false
      });
      canvas.width = 0;
      canvas.height = 0;
    }
    if (overlayCtx.current === null) {
      overlayCtx.current = overlay.getContext("2d", {
        alpha: false
      });
      overlay.width = 0;
      overlay.height = 0;
    }
    if (canvasCtx.current === null || overlayCtx.current === null || bufferACtx === null || bufferBCtx === null) {
      return;
    }
    let didOverride = false;
    const overrideCursor = cursor => {
      didOverride = true;
      setDrawCursorOverride(cursor);
    };
    const last = lastArgsRef.current;
    const current = {
      headerCanvasCtx: overlayCtx.current,
      canvasCtx: canvasCtx.current,
      bufferACtx,
      bufferBCtx,
      width,
      height,
      cellXOffset,
      cellYOffset,
      translateX: Math.round(translateX),
      translateY: Math.round(translateY),
      mappedColumns,
      enableGroups,
      freezeColumns,
      dragAndDropState,
      theme,
      headerHeight,
      groupHeaderHeight,
      disabledRows: disabledRows !== null && disabledRows !== void 0 ? disabledRows : data_grid_types/* CompactSelection.empty */.EV.empty(),
      rowHeight,
      verticalBorder,
      isResizing,
      resizeCol,
      isFocused,
      selection,
      fillHandle,
      drawCellCallback,
      hasAppendRow,
      overrideCursor,
      maxScaleFactor: maxDPR,
      freezeTrailingRows,
      rows,
      drawFocus: drawFocusRing,
      getCellContent,
      getGroupDetails: getGroupDetails !== null && getGroupDetails !== void 0 ? getGroupDetails : name => ({
        name
      }),
      getRowThemeOverride,
      drawHeaderCallback,
      prelightCells,
      highlightRegions,
      imageLoader,
      lastBlitData,
      damage: damageRegion.current,
      hoverValues: hoverValues.current,
      hoverInfo: hoverInfoRef.current,
      spriteManager,
      scrolling,
      hyperWrapping: (_experimental$hyperWr = experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping) !== null && _experimental$hyperWr !== void 0 ? _experimental$hyperWr : false,
      touchMode: lastWasTouch,
      enqueue: enqueueRef.current,
      renderStateProvider,
      renderStrategy: (_experimental$renderS = experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy) !== null && _experimental$renderS !== void 0 ? _experimental$renderS : browser_detect/* browserIsSafari.value */.Pq.value ? "double-buffer" : "single-buffer",
      getCellRenderer,
      minimumCellWidth
    };
    if (current.damage === undefined) {
      lastArgsRef.current = current;
      drawGrid(current, last);
    } else {
      drawGrid(current, undefined);
    }
    if (!didOverride && (current.damage === undefined || current.damage.has(hoverInfoRef === null || hoverInfoRef === void 0 || (_hoverInfoRef$current = hoverInfoRef.current) === null || _hoverInfoRef$current === void 0 ? void 0 : _hoverInfoRef$current[0]))) {
      setDrawCursorOverride(undefined);
    }
  }, [bufferACtx, bufferBCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, enableGroups, freezeColumns, dragAndDropState, theme, headerHeight, groupHeaderHeight, disabledRows, rowHeight, verticalBorder, isResizing, hasAppendRow, resizeCol, isFocused, selection, fillHandle, freezeTrailingRows, rows, drawFocusRing, maxDPR, getCellContent, getGroupDetails, getRowThemeOverride, drawCellCallback, drawHeaderCallback, prelightCells, highlightRegions, imageLoader, spriteManager, scrolling, experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping, experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy, lastWasTouch, renderStateProvider, getCellRenderer, minimumCellWidth]);
  const lastDrawRef = react.useRef(draw);
  react.useLayoutEffect(() => {
    draw();
    lastDrawRef.current = draw;
  }, [draw]);
  react.useLayoutEffect(() => {
    const fn = async () => {
      var _document;
      if (((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === undefined) return;
      await document.fonts.ready;
      lastArgsRef.current = undefined;
      lastDrawRef.current();
    };
    void fn();
  }, []);
  const damageInternal = react.useCallback(locations => {
    damageRegion.current = locations;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);
  const enqueue = useAnimationQueue(damageInternal);
  enqueueRef.current = enqueue;
  const damage = react.useCallback(cells => {
    damageInternal(new cell_set/* CellSet */.$(cells.map(x => x.cell)));
  }, [damageInternal]);
  imageLoader.setCallback(damageInternal);
  const [overFill, setOverFill] = react.useState(false);
  const [hCol, hRow] = hoveredItem !== null && hoveredItem !== void 0 ? hoveredItem : [];
  const headerHovered = hCol !== undefined && hRow === -1;
  const groupHeaderHovered = hCol !== undefined && hRow === -2;
  let clickableInnerCellHovered = false;
  let editableBoolHovered = false;
  let cursorOverride = drawCursorOverride;
  if (cursorOverride === undefined && hCol !== undefined && hRow !== undefined && hRow > -1 && hRow < rows) {
    const cell = getCellContent([hCol, hRow], true);
    clickableInnerCellHovered = cell.kind === data_grid_types/* InnerGridCellKind.NewRow */.$o.NewRow || cell.kind === data_grid_types/* InnerGridCellKind.Marker */.$o.Marker && cell.markerKind !== "number";
    editableBoolHovered = cell.kind === data_grid_types/* GridCellKind.Boolean */.p6.Boolean && (0,data_grid_types/* booleanCellIsEditable */.kf)(cell);
    cursorOverride = cell.cursor;
  }
  const canDrag = hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false;
  const cursor = isDragging ? "grabbing" : canDrag || isResizing ? "col-resize" : overFill || isFilling ? "crosshair" : cursorOverride !== undefined ? cursorOverride : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered ? "pointer" : "default";
  const style = react.useMemo(() => ({
    contain: "strict",
    display: "block",
    cursor
  }), [cursor]);
  const lastSetCursor = react.useRef("default");
  const target = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
  if (target !== null && target !== undefined && lastSetCursor.current !== style.cursor) {
    target.style.cursor = lastSetCursor.current = style.cursor;
  }
  const groupHeaderActionForEvent = react.useCallback((group, bounds, localEventX, localEventY) => {
    if (getGroupDetails === undefined) return undefined;
    const groupDesc = getGroupDetails(group);
    if (groupDesc.actions !== undefined) {
      const boxes = getActionBoundsForGroup(bounds, groupDesc.actions);
      for (const [i, box] of boxes.entries()) {
        if ((0,math/* pointInRect */.qr)(box, localEventX + bounds.x, localEventY + box.y)) {
          return groupDesc.actions[i];
        }
      }
    }
    return undefined;
  }, [getGroupDetails]);
  const isOverHeaderMenu = react.useCallback((canvas, col, clientX, clientY) => {
    const header = columns[col];
    if (!isDragging && !isResizing && header.hasMenu === true && !(hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false)) {
      const headerBounds = getBoundsForItem(canvas, col, -1);
      (0,support/* assert */.hu)(headerBounds !== undefined);
      const menuBounds = getHeaderMenuBounds(headerBounds.x, headerBounds.y, headerBounds.width, headerBounds.height, (0,utils/* direction */.o7)(header.title) === "rtl");
      if (clientX > menuBounds.x && clientX < menuBounds.x + menuBounds.width && clientY > menuBounds.y && clientY < menuBounds.y + menuBounds.height) {
        return headerBounds;
      }
    }
    return undefined;
  }, [columns, getBoundsForItem, hoveredOnEdge, isDragging, isResizing]);
  const downTime = react.useRef(0);
  const downPosition = react.useRef();
  const mouseDown = react.useRef(false);
  const onMouseDownImpl = react.useCallback(ev => {
    const canvas = ref.current;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas === null || ev.target !== canvas && ev.target !== eventTarget) return;
    mouseDown.current = true;
    let clientX;
    let clientY;
    if (ev instanceof MouseEvent) {
      clientX = ev.clientX;
      clientY = ev.clientY;
    } else {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }
    if (ev.target === eventTarget && eventTarget !== null) {
      const bounds = eventTarget.getBoundingClientRect();
      if (clientX > bounds.right || clientY > bounds.bottom) return;
    }
    const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
    downPosition.current = args.location;
    if (args.isTouch) {
      downTime.current = Date.now();
    }
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (args.kind === event_args/* headerKind */.aZ && isOverHeaderMenu(canvas, args.location[0], clientX, clientY) !== undefined) {
      return;
    } else if (args.kind === event_args/* groupHeaderKind */.mr) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined) {
        return;
      }
    }
    onMouseDown === null || onMouseDown === void 0 || onMouseDown(args);
    if (!args.isTouch && isDraggable !== true && isDraggable !== args.kind && args.button < 3 && args.button !== 1) {
      ev.preventDefault();
    }
  }, [eventTargetRef, isDraggable, getMouseArgsForPosition, groupHeaderActionForEvent, isOverHeaderMenu, onMouseDown]);
  (0,utils/* useEventListener */.OR)("touchstart", onMouseDownImpl, window, false);
  (0,utils/* useEventListener */.OR)("mousedown", onMouseDownImpl, window, false);
  const lastUpTime = react.useRef(0);
  const onMouseUpImpl = react.useCallback(ev => {
    const lastUpTimeValue = lastUpTime.current;
    lastUpTime.current = Date.now();
    const canvas = ref.current;
    mouseDown.current = false;
    if (onMouseUp === undefined || canvas === null) return;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside = ev.target !== canvas && ev.target !== eventTarget;
    let clientX;
    let clientY;
    let canCancel = true;
    if (ev instanceof MouseEvent) {
      clientX = ev.clientX;
      clientY = ev.clientY;
      canCancel = ev.button < 3;
      if (ev.pointerType === "touch") {
        return;
      }
    } else {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }
    let args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
    if (args.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
      args = {
        ...args,
        isLongTouch: true
      };
    }
    if (lastUpTimeValue !== 0 && Date.now() - lastUpTimeValue < (args.isTouch ? 1000 : 500)) {
      args = {
        ...args,
        isDoubleClick: true
      };
    }
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (!isOutside && ev.cancelable && canCancel) {
      ev.preventDefault();
    }
    const [col] = args.location;
    const headerBounds = isOverHeaderMenu(canvas, col, clientX, clientY);
    if (args.kind === event_args/* headerKind */.aZ && headerBounds !== undefined) {
      var _downPosition$current, _downPosition$current2;
      if (args.button !== 0 || ((_downPosition$current = downPosition.current) === null || _downPosition$current === void 0 ? void 0 : _downPosition$current[0]) !== col || ((_downPosition$current2 = downPosition.current) === null || _downPosition$current2 === void 0 ? void 0 : _downPosition$current2[1]) !== -1) {
        onMouseUp(args, true);
      }
      return;
    } else if (args.kind === event_args/* groupHeaderKind */.mr) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined) {
        if (args.button === 0) {
          action.onClick(args);
        }
        return;
      }
    }
    onMouseUp(args, isOutside);
  }, [onMouseUp, eventTargetRef, getMouseArgsForPosition, isOverHeaderMenu, groupHeaderActionForEvent]);
  (0,utils/* useEventListener */.OR)("mouseup", onMouseUpImpl, window, false);
  (0,utils/* useEventListener */.OR)("touchend", onMouseUpImpl, window, false);
  const onClickImpl = react.useCallback(ev => {
    const canvas = ref.current;
    if (canvas === null) return;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside = ev.target !== canvas && ev.target !== eventTarget;
    let clientX;
    let clientY;
    let canCancel = true;
    if (ev instanceof MouseEvent) {
      clientX = ev.clientX;
      clientY = ev.clientY;
      canCancel = ev.button < 3;
    } else {
      clientX = ev.changedTouches[0].clientX;
      clientY = ev.changedTouches[0].clientY;
    }
    const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (!isOutside && ev.cancelable && canCancel) {
      ev.preventDefault();
    }
    const [col] = args.location;
    const headerBounds = isOverHeaderMenu(canvas, col, clientX, clientY);
    if (args.kind === event_args/* headerKind */.aZ && headerBounds !== undefined) {
      var _downPosition$current3, _downPosition$current4;
      if (args.button === 0 && ((_downPosition$current3 = downPosition.current) === null || _downPosition$current3 === void 0 ? void 0 : _downPosition$current3[0]) === col && ((_downPosition$current4 = downPosition.current) === null || _downPosition$current4 === void 0 ? void 0 : _downPosition$current4[1]) === -1) {
        onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col, headerBounds);
      }
    } else if (args.kind === event_args/* groupHeaderKind */.mr) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined && args.button === 0) {
        action.onClick(args);
      }
    }
  }, [eventTargetRef, getMouseArgsForPosition, isOverHeaderMenu, onHeaderMenuClick, groupHeaderActionForEvent]);
  (0,utils/* useEventListener */.OR)("click", onClickImpl, window, false);
  const onContextMenuImpl = react.useCallback(ev => {
    const canvas = ref.current;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas === null || ev.target !== canvas && ev.target !== eventTarget || onContextMenu === undefined) return;
    const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
    onContextMenu(args, () => {
      if (ev.cancelable) ev.preventDefault();
    });
  }, [eventTargetRef, getMouseArgsForPosition, onContextMenu]);
  (0,utils/* useEventListener */.OR)("contextmenu", onContextMenuImpl, (_eventTargetRef$curre = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre !== void 0 ? _eventTargetRef$curre : null, false);
  const onAnimationFrame = react.useCallback(values => {
    damageRegion.current = new cell_set/* CellSet */.$(values.map(x => x.item));
    hoverValues.current = values;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);
  const animManagerValue = react.useMemo(() => new AnimationManager(onAnimationFrame), [onAnimationFrame]);
  const animationManager = react.useRef(animManagerValue);
  animationManager.current = animManagerValue;
  react.useLayoutEffect(() => {
    const am = animationManager.current;
    if (hoveredItem === undefined || hoveredItem[1] < 0) {
      am.setHovered(hoveredItem);
      return;
    }
    const cell = getCellContent(hoveredItem, true);
    const r = getCellRenderer(cell);
    const cellNeedsHover = r === undefined && cell.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom || (r === null || r === void 0 ? void 0 : r.needsHover) !== undefined && (typeof r.needsHover === "boolean" ? r.needsHover : r.needsHover(cell));
    am.setHovered(cellNeedsHover ? hoveredItem : undefined);
  }, [getCellContent, getCellRenderer, hoveredItem]);
  const hoveredRef = react.useRef();
  const onMouseMoveImpl = react.useCallback(ev => {
    const canvas = ref.current;
    if (canvas === null) return;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isIndirect = ev.target !== canvas && ev.target !== eventTarget;
    const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
    if (args.kind !== "out-of-bounds" && isIndirect && !mouseDown.current && !args.isTouch) {
      return;
    }
    const maybeSetHoveredInfo = (newVal, needPosition) => {
      setHoveredItemInfo(cv => {
        if (cv === newVal) return cv;
        if ((cv === null || cv === void 0 ? void 0 : cv[0][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][0]) && (cv === null || cv === void 0 ? void 0 : cv[0][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][1]) && ((cv === null || cv === void 0 ? void 0 : cv[1][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][0]) && (cv === null || cv === void 0 ? void 0 : cv[1][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][1]) || !needPosition)) {
          return cv;
        }
        return newVal;
      });
    };
    if (!(0,event_args/* mouseEventArgsAreEqual */.PN)(args, hoveredRef.current)) {
      setDrawCursorOverride(undefined);
      onItemHovered === null || onItemHovered === void 0 || onItemHovered(args);
      maybeSetHoveredInfo(args.kind === event_args/* outOfBoundsKind */.Xv ? undefined : [args.location, [args.localEventX, args.localEventY]], true);
      hoveredRef.current = args;
    } else if (args.kind === "cell" || args.kind === event_args/* headerKind */.aZ || args.kind === event_args/* groupHeaderKind */.mr) {
      let needsDamageCell = false;
      let needsHoverPosition = true;
      if (args.kind === "cell") {
        var _getCellRenderer;
        const toCheck = getCellContent(args.location);
        const rendererNeeds = (_getCellRenderer = getCellRenderer(toCheck)) === null || _getCellRenderer === void 0 ? void 0 : _getCellRenderer.needsHoverPosition;
        needsHoverPosition = rendererNeeds !== null && rendererNeeds !== void 0 ? rendererNeeds : toCheck.kind === data_grid_types/* GridCellKind.Custom */.p6.Custom;
        needsDamageCell = needsHoverPosition;
      } else if (args.kind === event_args/* groupHeaderKind */.mr) {
        needsDamageCell = true;
      }
      const newInfo = [args.location, [args.localEventX, args.localEventY]];
      maybeSetHoveredInfo(newInfo, needsHoverPosition);
      hoverInfoRef.current = newInfo;
      if (needsDamageCell) {
        damageInternal(new cell_set/* CellSet */.$([args.location]));
      }
    }
    const notRowMarkerCol = args.location[0] >= (firstColAccessible ? 0 : 1);
    setHoveredOnEdge(args.kind === event_args/* headerKind */.aZ && args.isEdge && notRowMarkerCol && allowResize === true);
    setOverFill(args.kind === "cell" && args.isFillHandle);
    onMouseMoveRaw === null || onMouseMoveRaw === void 0 || onMouseMoveRaw(ev);
    onMouseMove(args);
  }, [eventTargetRef, getMouseArgsForPosition, firstColAccessible, allowResize, onMouseMoveRaw, onMouseMove, onItemHovered, getCellContent, getCellRenderer, damageInternal]);
  (0,utils/* useEventListener */.OR)("mousemove", onMouseMoveImpl, window, true);
  const onKeyDownImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null) return;
    let bounds;
    let location = undefined;
    if (selection.current !== undefined) {
      bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
      location = selection.current.cell;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown({
      bounds,
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      cancel: () => undefined,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location
    });
  }, [onKeyDown, selection, getBoundsForItem]);
  const onKeyUpImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null) return;
    let bounds;
    let location = undefined;
    if (selection.current !== undefined) {
      bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
      location = selection.current.cell;
    }
    onKeyUp === null || onKeyUp === void 0 || onKeyUp({
      bounds,
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      cancel: () => undefined,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location
    });
  }, [onKeyUp, selection, getBoundsForItem]);
  const refImpl = react.useCallback(instance => {
    ref.current = instance;
    if (canvasRef !== undefined) {
      canvasRef.current = instance;
    }
  }, [canvasRef]);
  const onDragStartImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null || isDraggable === false || isResizing) {
      event.preventDefault();
      return;
    }
    let dragMime;
    let dragData;
    const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);
    if (isDraggable !== true && args.kind !== isDraggable) {
      event.preventDefault();
      return;
    }
    const setData = (mime, payload) => {
      dragMime = mime;
      dragData = payload;
    };
    let dragImage;
    let dragImageX;
    let dragImageY;
    const setDragImage = (image, x, y) => {
      dragImage = image;
      dragImageX = x;
      dragImageY = y;
    };
    let prevented = false;
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args,
      setData,
      setDragImage,
      preventDefault: () => prevented = true,
      defaultPrevented: () => prevented
    });
    if (!prevented && dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
      event.dataTransfer.setData(dragMime, dragData);
      event.dataTransfer.effectAllowed = "copyLink";
      if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
        event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
      } else {
        const [col, row] = args.location;
        if (row !== undefined) {
          var _window$devicePixelRa;
          const offscreen = document.createElement("canvas");
          const boundsForDragTarget = getBoundsForItem(canvas, col, row);
          (0,support/* assert */.hu)(boundsForDragTarget !== undefined);
          const dpr = Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1);
          offscreen.width = boundsForDragTarget.width * dpr;
          offscreen.height = boundsForDragTarget.height * dpr;
          const ctx = offscreen.getContext("2d");
          if (ctx !== null) {
            ctx.scale(dpr, dpr);
            ctx.textBaseline = "middle";
            if (row === -1) {
              ctx.font = theme.headerFontFull;
              ctx.fillStyle = theme.bgHeader;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawHeader(ctx, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, mappedColumns[col], false, theme, false, false, 0, spriteManager, drawHeaderCallback, false);
            } else {
              ctx.font = theme.baseFontFull;
              ctx.fillStyle = theme.bgCell;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawCell(ctx, getCellContent([col, row]), 0, row, false, false, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, false, theme, theme.bgCell, imageLoader, spriteManager, 1, undefined, false, 0, undefined, undefined, undefined, renderStateProvider, getCellRenderer, () => undefined);
            }
          }
          offscreen.style.left = "-100%";
          offscreen.style.position = "absolute";
          offscreen.style.width = `${boundsForDragTarget.width}px`;
          offscreen.style.height = `${boundsForDragTarget.height}px`;
          document.body.append(offscreen);
          event.dataTransfer.setDragImage(offscreen, boundsForDragTarget.width / 2, boundsForDragTarget.height / 2);
          window.setTimeout(() => {
            offscreen.remove();
          }, 0);
        }
      }
    } else {
      event.preventDefault();
    }
  }, [isDraggable, isResizing, getMouseArgsForPosition, onDragStart, getBoundsForItem, theme, mappedColumns, spriteManager, drawHeaderCallback, getCellContent, imageLoader, renderStateProvider, getCellRenderer]);
  (0,utils/* useEventListener */.OR)("dragstart", onDragStartImpl, (_eventTargetRef$curre2 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre2 !== void 0 ? _eventTargetRef$curre2 : null, false, false);
  const activeDropTarget = react.useRef();
  const onDragOverImpl = react.useCallback(event => {
    var _activeDropTarget$cur;
    const canvas = ref.current;
    if (onDrop !== undefined) {
      event.preventDefault();
    }
    if (canvas === null || onDragOverCell === undefined) {
      return;
    }
    const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);
    const [rawCol, row] = args.location;
    const col = rawCol - (firstColAccessible ? 0 : 1);
    const [activeCol, activeRow] = (_activeDropTarget$cur = activeDropTarget.current) !== null && _activeDropTarget$cur !== void 0 ? _activeDropTarget$cur : [];
    if (activeCol !== col || activeRow !== row) {
      activeDropTarget.current = [col, row];
      onDragOverCell([col, row], event.dataTransfer);
    }
  }, [firstColAccessible, getMouseArgsForPosition, onDragOverCell, onDrop]);
  (0,utils/* useEventListener */.OR)("dragover", onDragOverImpl, (_eventTargetRef$curre3 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre3 !== void 0 ? _eventTargetRef$curre3 : null, false, false);
  const onDragEndImpl = react.useCallback(() => {
    activeDropTarget.current = undefined;
    onDragEnd === null || onDragEnd === void 0 || onDragEnd();
  }, [onDragEnd]);
  (0,utils/* useEventListener */.OR)("dragend", onDragEndImpl, (_eventTargetRef$curre4 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre4 !== void 0 ? _eventTargetRef$curre4 : null, false, false);
  const onDropImpl = react.useCallback(event => {
    const canvas = ref.current;
    if (canvas === null || onDrop === undefined) {
      return;
    }
    event.preventDefault();
    const args = getMouseArgsForPosition(canvas, event.clientX, event.clientY);
    const [rawCol, row] = args.location;
    const col = rawCol - (firstColAccessible ? 0 : 1);
    onDrop([col, row], event.dataTransfer);
  }, [firstColAccessible, getMouseArgsForPosition, onDrop]);
  (0,utils/* useEventListener */.OR)("drop", onDropImpl, (_eventTargetRef$curre5 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre5 !== void 0 ? _eventTargetRef$curre5 : null, false, false);
  const onDragLeaveImpl = react.useCallback(() => {
    onDragLeave === null || onDragLeave === void 0 || onDragLeave();
  }, [onDragLeave]);
  (0,utils/* useEventListener */.OR)("dragleave", onDragLeaveImpl, (_eventTargetRef$curre6 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre6 !== void 0 ? _eventTargetRef$curre6 : null, false, false);
  const selectionRef = react.useRef(selection);
  selectionRef.current = selection;
  const focusRef = react.useRef(null);
  const focusElement = react.useCallback(el => {
    if (ref.current === null || !ref.current.contains(document.activeElement)) return;
    if (el === null && selectionRef.current.current !== undefined) {
      var _canvasRef$current;
      canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 || _canvasRef$current.focus({
        preventScroll: true
      });
    } else if (el !== null) {
      el.focus({
        preventScroll: true
      });
    }
    focusRef.current = el;
  }, [canvasRef]);
  react.useImperativeHandle(forwardedRef, () => ({
    focus: () => {
      const el = focusRef.current;
      if (el === null || !document.contains(el)) {
        var _canvasRef$current2;
        canvasRef === null || canvasRef === void 0 || (_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 || _canvasRef$current2.focus({
          preventScroll: true
        });
      } else {
        el.focus({
          preventScroll: true
        });
      }
    },
    getBounds: (col, row) => {
      if (canvasRef === undefined || canvasRef.current === null) {
        return undefined;
      }
      return getBoundsForItem(canvasRef.current, col !== null && col !== void 0 ? col : 0, row !== null && row !== void 0 ? row : -1);
    },
    damage
  }), [canvasRef, damage, getBoundsForItem]);
  const lastFocusedSubdomNode = react.useRef();
  const accessibilityTree = (0,utils/* useDebouncedMemo */.Qy)(() => {
    var _effectiveCols$, _selection$current$ce, _selection$current, _selection$current2;
    if (width < 50 || (experimental === null || experimental === void 0 ? void 0 : experimental.disableAccessibilityTree) === true) return null;
    let effectiveCols = (0,data_grid_lib/* getEffectiveColumns */.ih)(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
    const colOffset = firstColAccessible ? 0 : -1;
    if (!firstColAccessible && ((_effectiveCols$ = effectiveCols[0]) === null || _effectiveCols$ === void 0 ? void 0 : _effectiveCols$.sourceIndex) === 0) {
      effectiveCols = effectiveCols.slice(1);
    }
    const [fCol, fRow] = (_selection$current$ce = (_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell) !== null && _selection$current$ce !== void 0 ? _selection$current$ce : [];
    const range = (_selection$current2 = selection.current) === null || _selection$current2 === void 0 ? void 0 : _selection$current2.range;
    const visibleCols = effectiveCols.map(c => c.sourceIndex);
    const visibleRows = range_default()(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight));
    if (fCol !== undefined && fRow !== undefined && !(visibleCols.includes(fCol) && visibleRows.includes(fRow))) {
      focusElement(null);
    }
    return (0,jsx_runtime.jsxs)("table", {
      role: "grid",
      "aria-rowcount": rows + 1,
      "aria-multiselectable": "true",
      "aria-colcount": mappedColumns.length + colOffset,
      children: [(0,jsx_runtime.jsx)("thead", {
        role: "rowgroup",
        children: (0,jsx_runtime.jsx)("tr", {
          role: "row",
          "aria-rowindex": 1,
          children: effectiveCols.map(c => (0,jsx_runtime.jsx)("th", {
            role: "columnheader",
            "aria-selected": selection.columns.hasIndex(c.sourceIndex),
            "aria-colindex": c.sourceIndex + 1 + colOffset,
            tabIndex: -1,
            onFocus: e => {
              if (e.target === focusRef.current) return;
              return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused([c.sourceIndex, -1]);
            },
            children: c.title
          }, c.sourceIndex))
        })
      }), (0,jsx_runtime.jsx)("tbody", {
        role: "rowgroup",
        children: visibleRows.map(row => (0,jsx_runtime.jsx)("tr", {
          role: "row",
          "aria-selected": selection.rows.hasIndex(row),
          "aria-rowindex": row + 2,
          children: effectiveCols.map(c => {
            const col = c.sourceIndex;
            const key = (0,render_state_provider/* packColRowToNumber */.gY)(col, row);
            const focused = fCol === col && fRow === row;
            const selected = range !== undefined && col >= range.x && col < range.x + range.width && row >= range.y && row < range.y + range.height;
            const id = `glide-cell-${col}-${row}`;
            const location = [col, row];
            const cellContent = getCellContent(location, true);
            return (0,jsx_runtime.jsx)("td", {
              role: "gridcell",
              "aria-colindex": col + 1 + colOffset,
              "aria-selected": selected,
              "aria-readonly": (0,data_grid_types/* isInnerOnlyCell */.rs)(cellContent) || !(0,data_grid_types/* isReadWriteCell */.Qo)(cellContent),
              id: id,
              "data-testid": id,
              onClick: () => {
                const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
                if (canvas === null || canvas === undefined) return;
                return onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown({
                  bounds: getBoundsForItem(canvas, col, row),
                  cancel: () => undefined,
                  preventDefault: () => undefined,
                  stopPropagation: () => undefined,
                  ctrlKey: false,
                  key: "Enter",
                  keyCode: 13,
                  metaKey: false,
                  shiftKey: false,
                  altKey: false,
                  rawEvent: undefined,
                  location
                });
              },
              onFocusCapture: e => {
                var _lastFocusedSubdomNod, _lastFocusedSubdomNod2;
                if (e.target === focusRef.current || ((_lastFocusedSubdomNod = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod === void 0 ? void 0 : _lastFocusedSubdomNod[0]) === col && ((_lastFocusedSubdomNod2 = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod2 === void 0 ? void 0 : _lastFocusedSubdomNod2[1]) === row) return;
                lastFocusedSubdomNode.current = location;
                return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused(location);
              },
              ref: focused ? focusElement : undefined,
              tabIndex: -1,
              children: getRowData(cellContent, getCellRenderer)
            }, key);
          })
        }, row))
      })]
    }, "access-tree");
  }, [width, mappedColumns, cellXOffset, dragAndDropState, translateX, rows, cellYOffset, accessibilityHeight, selection, focusElement, getCellContent, canvasRef, onKeyDown, getBoundsForItem, onCellFocused], 200);
  const opacityX = freezeColumns === 0 || !fixedShadowX ? 0 : cellXOffset > freezeColumns ? 1 : clamp_default()(-translateX / 100, 0, 1);
  const absoluteOffsetY = -cellYOffset * 32 + translateY;
  const opacityY = !fixedShadowY ? 0 : clamp_default()(-absoluteOffsetY / 100, 0, 1);
  const stickyShadow = react.useMemo(() => {
    if (!opacityX && !opacityY) {
      return null;
    }
    const styleX = {
      position: "absolute",
      top: 0,
      left: stickyX,
      width: width - stickyX,
      height: height,
      opacity: opacityX,
      pointerEvents: "none",
      transition: !smoothScrollX ? "opacity 0.2s" : undefined,
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    };
    const styleY = {
      position: "absolute",
      top: totalHeaderHeight,
      left: 0,
      width: width,
      height: height,
      opacity: opacityY,
      pointerEvents: "none",
      transition: !smoothScrollY ? "opacity 0.2s" : undefined,
      boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)"
    };
    return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [opacityX > 0 && (0,jsx_runtime.jsx)("div", {
        id: "shadow-x",
        style: styleX
      }), opacityY > 0 && (0,jsx_runtime.jsx)("div", {
        id: "shadow-y",
        style: styleY
      })]
    });
  }, [opacityX, opacityY, stickyX, width, smoothScrollX, totalHeaderHeight, height, smoothScrollY]);
  const overlayStyle = react.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0
  }), []);
  return (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [(0,jsx_runtime.jsx)("canvas", {
      "data-testid": "data-grid-canvas",
      tabIndex: 0,
      onKeyDown: onKeyDownImpl,
      onKeyUp: onKeyUpImpl,
      onFocus: onCanvasFocused,
      onBlur: onCanvasBlur,
      ref: refImpl,
      style: style,
      children: accessibilityTree
    }), (0,jsx_runtime.jsx)("canvas", {
      ref: overlayRef,
      style: overlayStyle
    }), stickyShadow]
  });
};
/* harmony default export */ const data_grid = (react.memo(react.forwardRef(DataGrid)));

/***/ }),

/***/ "./packages/core/src/internal/data-grid/event-args.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PN": () => (/* binding */ mouseEventArgsAreEqual),
/* harmony export */   "W_": () => (/* binding */ OutOfBoundsRegionAxis),
/* harmony export */   "Xv": () => (/* binding */ outOfBoundsKind),
/* harmony export */   "aZ": () => (/* binding */ headerKind),
/* harmony export */   "mr": () => (/* binding */ groupHeaderKind)
/* harmony export */ });
const headerKind = "header";
const groupHeaderKind = "group-header";
const outOfBoundsKind = "out-of-bounds";
let OutOfBoundsRegionAxis = function (OutOfBoundsRegionAxis) {
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Start"] = -2] = "Start";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["StartPadding"] = -1] = "StartPadding";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["Center"] = 0] = "Center";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["EndPadding"] = 1] = "EndPadding";
  OutOfBoundsRegionAxis[OutOfBoundsRegionAxis["End"] = 2] = "End";
  return OutOfBoundsRegionAxis;
}({});
function mouseEventArgsAreEqual(args, other) {
  if (args === other) return true;
  if ((args === null || args === void 0 ? void 0 : args.kind) === "out-of-bounds") {
    return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]) && (args === null || args === void 0 ? void 0 : args.region[0]) === (other === null || other === void 0 ? void 0 : other.region[0]) && (args === null || args === void 0 ? void 0 : args.region[1]) === (other === null || other === void 0 ? void 0 : other.region[1]);
  }
  return (args === null || args === void 0 ? void 0 : args.kind) === (other === null || other === void 0 ? void 0 : other.kind) && (args === null || args === void 0 ? void 0 : args.location[0]) === (other === null || other === void 0 ? void 0 : other.location[0]) && (args === null || args === void 0 ? void 0 : args.location[1]) === (other === null || other === void 0 ? void 0 : other.location[1]);
}

/***/ }),

/***/ "./packages/core/src/internal/data-grid/render/data-grid-lib.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G6": () => (/* binding */ getStickyWidth),
/* harmony export */   "H1": () => (/* binding */ cellIsInRange),
/* harmony export */   "Ld": () => (/* binding */ drawMenuDots),
/* harmony export */   "NK": () => (/* binding */ roundedRect),
/* harmony export */   "NZ": () => (/* binding */ useMappedColumns),
/* harmony export */   "P7": () => (/* binding */ measureTextCached),
/* harmony export */   "PU": () => (/* binding */ isGroupEqual),
/* harmony export */   "Sb": () => (/* binding */ cellIsSelected),
/* harmony export */   "Ve": () => (/* binding */ computeBounds),
/* harmony export */   "WA": () => (/* binding */ getEmHeight),
/* harmony export */   "X4": () => (/* binding */ itemIsInRect),
/* harmony export */   "YN": () => (/* binding */ getFreezeTrailingHeight),
/* harmony export */   "_y": () => (/* binding */ getMeasuredTextCache),
/* harmony export */   "aX": () => (/* binding */ getMiddleCenterBias),
/* harmony export */   "ih": () => (/* binding */ getEffectiveColumns),
/* harmony export */   "k0": () => (/* binding */ prepTextCell),
/* harmony export */   "oK": () => (/* binding */ getColumnIndexForX),
/* harmony export */   "pU": () => (/* binding */ itemsAreEqual),
/* harmony export */   "pV": () => (/* binding */ getRowIndexForY),
/* harmony export */   "pZ": () => (/* binding */ gridSelectionHasItem),
/* harmony export */   "uN": () => (/* binding */ drawTextCell),
/* harmony export */   "vr": () => (/* binding */ drawLastUpdateUnderlay),
/* harmony export */   "zU": () => (/* binding */ rectBottomRight),
/* harmony export */   "zu": () => (/* binding */ roundedPoly)
/* harmony export */ });
/* unused harmony exports remapForDnDState, drawTextCellExternal */
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/common/utils.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var canvas_hypertxt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/canvas-hypertxt/dist/js/index.js");



function useMappedColumns(columns, freezeColumns) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => columns.map((c, i) => ({
    group: c.group,
    grow: c.grow,
    hasMenu: c.hasMenu,
    icon: c.icon,
    id: c.id,
    menuIcon: c.menuIcon,
    overlayIcon: c.overlayIcon,
    sourceIndex: i,
    sticky: i < freezeColumns,
    style: c.style,
    themeOverride: c.themeOverride,
    title: c.title,
    trailingRowOptions: c.trailingRowOptions,
    width: c.width,
    growOffset: c.growOffset,
    rowMarker: c.rowMarker,
    rowMarkerChecked: c.rowMarkerChecked
  })), [columns, freezeColumns]);
}
function gridSelectionHasItem(sel, item) {
  const [col, row] = item;
  if (sel.columns.hasIndex(col) || sel.rows.hasIndex(row)) return true;
  if (sel.current !== undefined) {
    if (itemsAreEqual(sel.current.cell, item)) return true;
    const toCheck = [sel.current.range, ...sel.current.rangeStack];
    for (const r of toCheck) {
      if (col >= r.x && col < r.x + r.width && row >= r.y && row < r.y + r.height) return true;
    }
  }
  return false;
}
function isGroupEqual(left, right) {
  return (left !== null && left !== void 0 ? left : "") === (right !== null && right !== void 0 ? right : "");
}
function cellIsSelected(location, cell, selection) {
  if (selection.current === undefined) return false;
  if (location[1] !== selection.current.cell[1]) return false;
  if (cell.span === undefined) {
    return selection.current.cell[0] === location[0];
  }
  return selection.current.cell[0] >= cell.span[0] && selection.current.cell[0] <= cell.span[1];
}
function itemIsInRect(location, rect) {
  const [x, y] = location;
  return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}
function itemsAreEqual(a, b) {
  return (a === null || a === void 0 ? void 0 : a[0]) === (b === null || b === void 0 ? void 0 : b[0]) && (a === null || a === void 0 ? void 0 : a[1]) === (b === null || b === void 0 ? void 0 : b[1]);
}
function rectBottomRight(rect) {
  return [rect.x + rect.width - 1, rect.y + rect.height - 1];
}
function cellIsInRect(location, cell, rect) {
  const startX = rect.x;
  const endX = rect.x + rect.width - 1;
  const startY = rect.y;
  const endY = rect.y + rect.height - 1;
  const [cellCol, cellRow] = location;
  if (cellRow < startY || cellRow > endY) return false;
  if (cell.span === undefined) {
    return cellCol >= startX && cellCol <= endX;
  }
  const [spanStart, spanEnd] = cell.span;
  return spanStart >= startX && spanStart <= endX || spanEnd >= startX && spanStart <= endX || spanStart < startX && spanEnd > endX;
}
function cellIsInRange(location, cell, selection, includeSingleSelection) {
  let result = 0;
  if (selection.current === undefined) return result;
  const range = selection.current.range;
  if ((includeSingleSelection || range.height * range.width > 1) && cellIsInRect(location, cell, range)) {
    result++;
  }
  for (const r of selection.current.rangeStack) {
    if (cellIsInRect(location, cell, r)) {
      result++;
    }
  }
  return result;
}
function remapForDnDState(columns, dndState) {
  let mappedCols = columns;
  if (dndState !== undefined) {
    let writable = [...columns];
    const temp = mappedCols[dndState.src];
    if (dndState.src > dndState.dest) {
      writable.splice(dndState.src, 1);
      writable.splice(dndState.dest, 0, temp);
    } else {
      writable.splice(dndState.dest + 1, 0, temp);
      writable.splice(dndState.src, 1);
    }
    writable = writable.map((c, i) => ({
      ...c,
      sticky: columns[i].sticky
    }));
    mappedCols = writable;
  }
  return mappedCols;
}
function getStickyWidth(columns, dndState) {
  let result = 0;
  const remapped = remapForDnDState(columns, dndState);
  for (let i = 0; i < remapped.length; i++) {
    const c = remapped[i];
    if (c.sticky) result += c.width;else break;
  }
  return result;
}
function getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) {
  if (typeof getRowHeight === "number") {
    return freezeTrailingRows * getRowHeight;
  } else {
    let result = 0;
    for (let i = rows - freezeTrailingRows; i < rows; i++) {
      result += getRowHeight(i);
    }
    return result;
  }
}
function getEffectiveColumns(columns, cellXOffset, width, dndState, tx) {
  const mappedCols = remapForDnDState(columns, dndState);
  const sticky = [];
  for (const c of mappedCols) {
    if (c.sticky) {
      sticky.push(c);
    } else {
      break;
    }
  }
  if (sticky.length > 0) {
    for (const c of sticky) {
      width -= c.width;
    }
  }
  let endIndex = cellXOffset;
  let curX = tx !== null && tx !== void 0 ? tx : 0;
  while (curX <= width && endIndex < mappedCols.length) {
    curX += mappedCols[endIndex].width;
    endIndex++;
  }
  for (let i = cellXOffset; i < endIndex; i++) {
    const c = mappedCols[i];
    if (!c.sticky) {
      sticky.push(c);
    }
  }
  return sticky;
}
function getColumnIndexForX(targetX, effectiveColumns, translateX) {
  let x = 0;
  for (const c of effectiveColumns) {
    const cx = c.sticky ? x : x + (translateX !== null && translateX !== void 0 ? translateX : 0);
    if (targetX <= cx + c.width) {
      return c.sourceIndex;
    }
    x += c.width;
  }
  return -1;
}
function getRowIndexForY(targetY, height, hasGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows) {
  const totalHeaderHeight = headerHeight + groupHeaderHeight;
  if (hasGroups && targetY <= groupHeaderHeight) return -2;
  if (targetY <= totalHeaderHeight) return -1;
  let y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    const row = rows - 1 - fr;
    const rh = typeof rowHeight === "number" ? rowHeight : rowHeight(row);
    y -= rh;
    if (targetY >= y) {
      return row;
    }
  }
  const effectiveRows = rows - freezeTrailingRows;
  const ty = targetY - (translateY !== null && translateY !== void 0 ? translateY : 0);
  if (typeof rowHeight === "number") {
    const target = Math.floor((ty - totalHeaderHeight) / rowHeight) + cellYOffset;
    if (target >= effectiveRows) return undefined;
    return target;
  } else {
    let curY = totalHeaderHeight;
    for (let i = cellYOffset; i < effectiveRows; i++) {
      const rh = rowHeight(i);
      if (ty <= curY + rh) return i;
      curY += rh;
    }
    return undefined;
  }
}
let metricsSize = 0;
let metricsCache = {};
const isSSR = typeof window === "undefined";
async function clearCacheOnLoad() {
  var _document;
  if (isSSR || ((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === undefined) return;
  await document.fonts.ready;
  metricsSize = 0;
  metricsCache = {};
  (0,canvas_hypertxt__WEBPACK_IMPORTED_MODULE_1__/* .clearCache */ .L)();
}
void clearCacheOnLoad();
function makeCacheKey(s, ctx, baseline, font) {
  return `${s}_${font !== null && font !== void 0 ? font : ctx === null || ctx === void 0 ? void 0 : ctx.font}_${baseline}`;
}
function measureTextCached(s, ctx, font) {
  let baseline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "middle";
  const key = makeCacheKey(s, ctx, baseline, font);
  let metrics = metricsCache[key];
  if (metrics === undefined) {
    metrics = ctx.measureText(s);
    metricsCache[key] = metrics;
    metricsSize++;
  }
  if (metricsSize > 10000) {
    metricsCache = {};
    metricsSize = 0;
  }
  return metrics;
}
function getMeasuredTextCache(s, font) {
  const key = makeCacheKey(s, undefined, "middle", font);
  return metricsCache[key];
}
function getMiddleCenterBias(ctx, font) {
  if (typeof font !== "string") {
    font = font.baseFontFull;
  }
  return getMiddleCenterBiasInner(ctx, font);
}
function loadMetric(ctx, baseline) {
  const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ctx.save();
  ctx.textBaseline = baseline;
  const result = ctx.measureText(sample);
  ctx.restore();
  return result;
}
const biasCache = [];
function getMiddleCenterBiasInner(ctx, font) {
  for (const x of biasCache) {
    if (x.key === font) return x.val;
  }
  const alphabeticMetrics = loadMetric(ctx, "alphabetic");
  const middleMetrics = loadMetric(ctx, "middle");
  const bias = -(middleMetrics.actualBoundingBoxDescent - alphabeticMetrics.actualBoundingBoxDescent) + alphabeticMetrics.actualBoundingBoxAscent / 2;
  biasCache.push({
    key: font,
    val: bias
  });
  return bias;
}
function drawLastUpdateUnderlay(args, lastUpdate, frameTime, lastPrep, isLastCol, isLastRow) {
  const {
    ctx,
    rect,
    theme
  } = args;
  let progress = Number.MAX_SAFE_INTEGER;
  const animTime = 500;
  if (lastUpdate !== undefined) {
    progress = frameTime - lastUpdate;
    if (progress < animTime) {
      const fade = 1 - progress / animTime;
      ctx.globalAlpha = fade;
      ctx.fillStyle = theme.bgSearchResult;
      ctx.fillRect(rect.x + 1, rect.y + 1, rect.width - (isLastCol ? 2 : 1), rect.height - (isLastRow ? 2 : 1));
      ctx.globalAlpha = 1;
      if (lastPrep !== undefined) {
        lastPrep.fillStyle = theme.bgSearchResult;
      }
    }
  }
  return progress < animTime;
}
function prepTextCell(args, lastPrep, overrideColor) {
  const {
    ctx,
    theme
  } = args;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  const newFill = overrideColor !== null && overrideColor !== void 0 ? overrideColor : theme.textDark;
  if (newFill !== result.fillStyle) {
    ctx.fillStyle = newFill;
    result.fillStyle = newFill;
  }
  return result;
}
function drawTextCellExternal(args, data, contentAlign) {
  const {
    rect,
    ctx,
    theme
  } = args;
  ctx.fillStyle = theme.textDark;
  drawTextCell({
    ctx: ctx,
    rect,
    theme: theme
  }, data, contentAlign);
}
function drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign) {
  if (contentAlign === "right") {
    ctx.fillText(data, x + w - (theme.cellHorizontalPadding + 0.5), y + h / 2 + bias);
  } else if (contentAlign === "center") {
    ctx.fillText(data, x + w / 2, y + h / 2 + bias);
  } else {
    ctx.fillText(data, x + theme.cellHorizontalPadding + 0.5, y + h / 2 + bias);
  }
}
function getEmHeight(ctx, fontStyle) {
  const textMetrics = measureTextCached("ABCi09jgqpy", ctx, fontStyle);
  return textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
}
function truncateString(data, w) {
  if (data.includes("\n")) {
    data = data.split(/\r?\n/, 1)[0];
  }
  const max = w / 4;
  if (data.length > max) {
    data = data.slice(0, max);
  }
  return data;
}
function drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping) {
  const fontStyle = theme.baseFontFull;
  const split = (0,canvas_hypertxt__WEBPACK_IMPORTED_MODULE_1__/* .split */ .V)(ctx, data, fontStyle, w - theme.cellHorizontalPadding * 2, hyperWrapping !== null && hyperWrapping !== void 0 ? hyperWrapping : false);
  const emHeight = getEmHeight(ctx, fontStyle);
  const lineHeight = theme.lineHeight * emHeight;
  const actualHeight = emHeight + lineHeight * (split.length - 1);
  const mustClip = actualHeight + theme.cellVerticalPadding > h;
  if (mustClip) {
    ctx.save();
    ctx.rect(x, y, w, h);
    ctx.clip();
  }
  const optimalY = y + h / 2 - actualHeight / 2;
  let drawY = Math.max(y + theme.cellVerticalPadding, optimalY);
  for (const line of split) {
    drawSingleTextLine(ctx, line, x, drawY, w, emHeight, bias, theme, contentAlign);
    drawY += lineHeight;
    if (drawY > y + h) break;
  }
  if (mustClip) {
    ctx.restore();
  }
}
function drawTextCell(args, data, contentAlign, allowWrapping, hyperWrapping) {
  var _allowWrapping;
  const {
    ctx,
    rect,
    theme
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  allowWrapping = (_allowWrapping = allowWrapping) !== null && _allowWrapping !== void 0 ? _allowWrapping : false;
  if (!allowWrapping) {
    data = truncateString(data, w);
  }
  const bias = getMiddleCenterBias(ctx, theme);
  const isRtl = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .direction */ .o7)(data) === "rtl";
  if (contentAlign === undefined && isRtl) {
    contentAlign = "right";
  }
  if (isRtl) {
    ctx.direction = "rtl";
  }
  if (data.length > 0) {
    let changed = false;
    if (contentAlign === "right") {
      ctx.textAlign = "right";
      changed = true;
    } else if (contentAlign !== undefined && contentAlign !== "left") {
      ctx.textAlign = contentAlign;
      changed = true;
    }
    if (!allowWrapping) {
      drawSingleTextLine(ctx, data, x, y, w, h, bias, theme, contentAlign);
    } else {
      drawMultiLineText(ctx, data, x, y, w, h, bias, theme, contentAlign, hyperWrapping);
    }
    if (changed) {
      ctx.textAlign = "start";
    }
    if (isRtl) {
      ctx.direction = "inherit";
    }
  }
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
  radius = {
    tl: Math.max(0, Math.min(radius.tl, height / 2, width / 2)),
    tr: Math.max(0, Math.min(radius.tr, height / 2, width / 2)),
    bl: Math.max(0, Math.min(radius.bl, height / 2, width / 2)),
    br: Math.max(0, Math.min(radius.br, height / 2, width / 2))
  };
  ctx.moveTo(x + radius.tl, y);
  ctx.arcTo(x + width, y, x + width, y + radius.tr, radius.tr);
  ctx.arcTo(x + width, y + height, x + width - radius.br, y + height, radius.br);
  ctx.arcTo(x, y + height, x, y + height - radius.bl, radius.bl);
  ctx.arcTo(x, y, x + radius.tl, y, radius.tl);
}
function drawMenuDots(ctx, dotsX, dotsY) {
  const radius = 1.25;
  ctx.arc(dotsX, dotsY - radius * 3.5, radius, 0, 2 * Math.PI, false);
  ctx.arc(dotsX, dotsY, radius, 0, 2 * Math.PI, false);
  ctx.arc(dotsX, dotsY + radius * 3.5, radius, 0, 2 * Math.PI, false);
}
function roundedPoly(ctx, points, radiusAll) {
  const asVec = function (p, pp) {
    const vx = pp.x - p.x;
    const vy = pp.y - p.y;
    const vlen = Math.sqrt(vx * vx + vy * vy);
    const vnx = vx / vlen;
    const vny = vy / vlen;
    return {
      x: vx,
      y: pp.y - p.y,
      len: vlen,
      nx: vnx,
      ny: vny,
      ang: Math.atan2(vny, vnx)
    };
  };
  let radius;
  const len = points.length;
  let p1 = points[len - 1];
  for (let i = 0; i < len; i++) {
    let p2 = points[i % len];
    const p3 = points[(i + 1) % len];
    const v1 = asVec(p2, p1);
    const v2 = asVec(p2, p3);
    const sinA = v1.nx * v2.ny - v1.ny * v2.nx;
    const sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny;
    let angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA);
    let radDirection = 1;
    let drawDirection = false;
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
    radius = p2.radius !== undefined ? p2.radius : radiusAll;
    const halfAngle = angle / 2;
    let lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle));
    let cRadius;
    if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
      lenOut = Math.min(v1.len / 2, v2.len / 2);
      cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle));
    } else {
      cRadius = radius;
    }
    let x = p2.x + v2.nx * lenOut;
    let y = p2.y + v2.ny * lenOut;
    x += -v2.ny * cRadius * radDirection;
    y += v2.nx * cRadius * radDirection;
    ctx.arc(x, y, cRadius, v1.ang + Math.PI / 2 * radDirection, v2.ang - Math.PI / 2 * radDirection, drawDirection);
    p1 = p2;
    p2 = p3;
  }
  ctx.closePath();
}
function computeBounds(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight) {
  const result = {
    x: 0,
    y: totalHeaderHeight + translateY,
    width: 0,
    height: 0
  };
  if (col >= mappedColumns.length || row >= rows || row < -2 || col < 0) {
    return result;
  }
  const headerHeight = totalHeaderHeight - groupHeaderHeight;
  if (col >= freezeColumns) {
    const dir = cellXOffset > col ? -1 : 1;
    const freezeWidth = getStickyWidth(mappedColumns);
    result.x += freezeWidth + translateX;
    for (let i = cellXOffset; i !== col; i += dir) {
      result.x += mappedColumns[dir === 1 ? i : i - 1].width * dir;
    }
  } else {
    for (let i = 0; i < col; i++) {
      result.x += mappedColumns[i].width;
    }
  }
  result.width = mappedColumns[col].width + 1;
  if (row === -1) {
    result.y = groupHeaderHeight;
    result.height = headerHeight;
  } else if (row === -2) {
    result.y = 0;
    result.height = groupHeaderHeight;
    let start = col;
    const group = mappedColumns[col].group;
    const sticky = mappedColumns[col].sticky;
    while (start > 0 && isGroupEqual(mappedColumns[start - 1].group, group) && mappedColumns[start - 1].sticky === sticky) {
      const c = mappedColumns[start - 1];
      result.x -= c.width;
      result.width += c.width;
      start--;
    }
    let end = col;
    while (end + 1 < mappedColumns.length && isGroupEqual(mappedColumns[end + 1].group, group) && mappedColumns[end + 1].sticky === sticky) {
      const c = mappedColumns[end + 1];
      result.width += c.width;
      end++;
    }
    if (!sticky) {
      const freezeWidth = getStickyWidth(mappedColumns);
      const clip = result.x - freezeWidth;
      if (clip < 0) {
        result.x -= clip;
        result.width += clip;
      }
      if (result.x + result.width > width) {
        result.width = width - result.x;
      }
    }
  } else if (row >= rows - freezeTrailingRows) {
    let dy = rows - row;
    result.y = height;
    while (dy > 0) {
      const r = row + dy - 1;
      result.height = typeof rowHeight === "number" ? rowHeight : rowHeight(r);
      result.y -= result.height;
      dy--;
    }
    result.height += 1;
  } else {
    const dir = cellYOffset > row ? -1 : 1;
    if (typeof rowHeight === "number") {
      const delta = row - cellYOffset;
      result.y += delta * rowHeight;
    } else {
      for (let r = cellYOffset; r !== row; r += dir) {
        result.y += rowHeight(r) * dir;
      }
    }
    result.height = (typeof rowHeight === "number" ? rowHeight : rowHeight(row)) + 1;
  }
  return result;
}

/***/ }),

/***/ "./packages/core/src/internal/data-grid/render/draw-checkbox.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ drawCheckbox)
/* harmony export */ });
/* harmony import */ var _common_support_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./packages/core/src/common/support.ts");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./packages/core/src/common/utils.tsx");
/* harmony import */ var _data_grid_lib_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./packages/core/src/internal/data-grid/render/data-grid-lib.ts");
/* harmony import */ var _data_grid_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");




function drawCheckbox(ctx, theme, checked, x, y, width, height, highlighted) {
  var _theme$roundingRadius;
  let hoverX = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : -20;
  let hoverY = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : -20;
  let maxSize = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 32;
  let alignment = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "center";
  let style = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : "square";
  const centerY = Math.floor(y + height / 2);
  const rectBordRadius = style === "circle" ? 10000 : (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4;
  let checkBoxWidth = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSquareWidth */ .Qo)(maxSize, height, theme.cellVerticalPadding);
  let checkBoxHalfWidth = checkBoxWidth / 2;
  const posX = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSquareXPosFromAlign */ .XC)(alignment, x, width, theme.cellHorizontalPadding, checkBoxWidth);
  const bb = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getSquareBB */ .kq)(posX, centerY, checkBoxWidth);
  const hovered = (0,_common_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .pointIsWithinBB */ .qq)(x + hoverX, y + hoverY, bb);
  switch (checked) {
    case true:
      {
        ctx.beginPath();
        (0,_data_grid_lib_js__WEBPACK_IMPORTED_MODULE_1__/* .roundedRect */ .NK)(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
        if (style === "circle") {
          checkBoxHalfWidth *= 0.8;
          checkBoxWidth *= 0.8;
        }
        ctx.fillStyle = highlighted ? theme.accentColor : theme.textMedium;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(posX - checkBoxHalfWidth + checkBoxWidth / 4.23, centerY - checkBoxHalfWidth + checkBoxWidth / 1.97);
        ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 2.42, centerY - checkBoxHalfWidth + checkBoxWidth / 1.44);
        ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 1.29, centerY - checkBoxHalfWidth + checkBoxWidth / 3.25);
        ctx.strokeStyle = theme.bgCell;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
        break;
      }
    case _data_grid_types_js__WEBPACK_IMPORTED_MODULE_2__/* .BooleanEmpty */ .qF:
    case false:
      {
        ctx.beginPath();
        (0,_data_grid_lib_js__WEBPACK_IMPORTED_MODULE_1__/* .roundedRect */ .NK)(ctx, posX - checkBoxWidth / 2 + 0.5, centerY - checkBoxWidth / 2 + 0.5, checkBoxWidth - 1, checkBoxWidth - 1, rectBordRadius);
        ctx.lineWidth = 1;
        ctx.strokeStyle = hovered ? theme.textDark : theme.textMedium;
        ctx.stroke();
        break;
      }
    case _data_grid_types_js__WEBPACK_IMPORTED_MODULE_2__/* .BooleanIndeterminate */ .sd:
      {
        ctx.beginPath();
        (0,_data_grid_lib_js__WEBPACK_IMPORTED_MODULE_1__/* .roundedRect */ .NK)(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
        ctx.fillStyle = hovered ? theme.textMedium : theme.textLight;
        ctx.fill();
        if (style === "circle") {
          checkBoxHalfWidth *= 0.8;
          checkBoxWidth *= 0.8;
        }
        ctx.beginPath();
        ctx.moveTo(posX - checkBoxWidth / 3, centerY);
        ctx.lineTo(posX + checkBoxWidth / 3, centerY);
        ctx.strokeStyle = theme.bgCell;
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
        break;
      }
    default:
      (0,_common_support_js__WEBPACK_IMPORTED_MODULE_3__/* .assertNever */ .vE)(checked);
  }
}

/***/ }),

/***/ "./packages/core/src/stories/story-utils.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ SimpleThemeWrapper),
/* harmony export */   "j": () => (/* binding */ BuilderThemeWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-responsive-carousel/lib/styles/carousel.min.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react/jsx-runtime.js");






const _exp = /*#__PURE__*/() => p => p.width;
const _exp2 = /*#__PURE__*/() => p => p.height;
const BuilderWrapper = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_3__/* .styled */ .z)('div')({
  name: "BuilderWrapper",
  class: "bheiboo",
  propsAsIs: false,
  vars: {
    "bheiboo-0": [_exp(), "px"],
    "bheiboo-1": [_exp2(), "px"]
  }
});
const SimpleWrapper = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_3__/* .styled */ .z)('div')({
  name: "SimpleWrapper",
  class: "s15ez7jv",
  propsAsIs: false
});
class BuilderThemeWrapper extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  render() {
    const {
      context,
      children,
      ...rest
    } = this.props;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BuilderWrapper, {
        ...rest,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "content",
          children: children
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        id: "portal"
      })]
    });
  }
}
BuilderThemeWrapper.displayName = "BuilderThemeWrapper";
const SimpleThemeWrapper = p => {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SimpleWrapper, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "content",
      children: p.children
    })
  });
};
SimpleThemeWrapper.displayName = "SimpleThemeWrapper";

__webpack_require__("./packages/core/src/stories/story-utils.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/stories/story-utils.tsx");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".bed7b9f{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-top:auto;margin-bottom:auto;}.bed7b9f .boe-bubble{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:var(--gdg-rounding-radius,10px);padding:0 8px;height:20px;background-color:var(--gdg-bg-bubble);color:var(--gdg-text-dark);margin:2px;}.bed7b9f textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvYnViYmxlcy1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giXSwibmFtZXMiOlsiLmJlZDdiOWYiXSwibWFwcGluZ3MiOiJBQUV5Q0EiLCJmaWxlIjoiL2hvbWUvcnVubmVyL3dvcmsvZ2xpZGUtZGF0YS1ncmlkL2dsaWRlLWRhdGEtZ3JpZC9wYWNrYWdlcy9jb3JlL3NyYy9pbnRlcm5hbC9kYXRhLWdyaWQtb3ZlcmxheS1lZGl0b3IvcHJpdmF0ZS9idWJibGVzLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuY29uc3QgQlVCQkxFX0hFSUdIVCA9IDIwO1xuZXhwb3J0IGNvbnN0IEJ1YmJsZXNPdmVybGF5RWRpdG9yU3R5bGUgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcblxuICAgIC5ib2UtYnViYmxlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tZ2RnLXJvdW5kaW5nLXJhZGl1cywgJHtCVUJCTEVfSEVJR0hUIC8gMn1weCk7XG5cbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGhlaWdodDogJHtCVUJCTEVfSEVJR0hUfXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctYnViYmxlKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuICAgICAgICBtYXJnaW46IDJweDtcbiAgICB9XG5cbiAgICB0ZXh0YXJlYSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgd2lkdGg6IDBweDtcbiAgICAgICAgaGVpZ2h0OiAwcHg7XG5cbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5gOyJdfQ==*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx"],"names":[".bed7b9f"],"mappings":"AAEyCA,SAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,sBAAAA,CAAAA,kBAAAA,CAAAA,cAAAA,CAAAA,eAAAA,CAAAA,kBAAAA,CAAAA,CAAAA,qBAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,6CAAAA,CAAAA,aAAAA,CAAAA,WAAAA,CAAAA,qCAAAA,CAAAA,0BAAAA,CAAAA,UAAAA,CAAAA,CAAAA,kBAAAA,iBAAAA,CAAAA,OAAAA,CAAAA,QAAAA,CAAAA,SAAAA,CAAAA,UAAAA,CAAAA,SAAAA,CAAAA;ACDzC,uhDAAuhD","sourcesContent":["import { styled } from \"@linaria/react\";\nconst BUBBLE_HEIGHT = 20;\nexport const BubblesOverlayEditorStyle = styled.div`\n    display: flex;\n    flex-wrap: wrap;\n    margin-top: auto;\n    margin-bottom: auto;\n\n    .boe-bubble {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        border-radius: var(--gdg-rounding-radius, ${BUBBLE_HEIGHT / 2}px);\n\n        padding: 0 8px;\n        height: ${BUBBLE_HEIGHT}px;\n        background-color: var(--gdg-bg-bubble);\n        color: var(--gdg-text-dark);\n        margin: 2px;\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n`;",".bed7b9f{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-top:auto;margin-bottom:auto;}.bed7b9f .boe-bubble{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:var(--gdg-rounding-radius,10px);padding:0 8px;height:20px;background-color:var(--gdg-bg-bubble);color:var(--gdg-text-dark);margin:2px;}.bed7b9f textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvYnViYmxlcy1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giXSwibmFtZXMiOlsiLmJlZDdiOWYiXSwibWFwcGluZ3MiOiJBQUV5Q0EiLCJmaWxlIjoiL2hvbWUvcnVubmVyL3dvcmsvZ2xpZGUtZGF0YS1ncmlkL2dsaWRlLWRhdGEtZ3JpZC9wYWNrYWdlcy9jb3JlL3NyYy9pbnRlcm5hbC9kYXRhLWdyaWQtb3ZlcmxheS1lZGl0b3IvcHJpdmF0ZS9idWJibGVzLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuY29uc3QgQlVCQkxFX0hFSUdIVCA9IDIwO1xuZXhwb3J0IGNvbnN0IEJ1YmJsZXNPdmVybGF5RWRpdG9yU3R5bGUgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIG1hcmdpbi10b3A6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcblxuICAgIC5ib2UtYnViYmxlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tZ2RnLXJvdW5kaW5nLXJhZGl1cywgJHtCVUJCTEVfSEVJR0hUIC8gMn1weCk7XG5cbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGhlaWdodDogJHtCVUJCTEVfSEVJR0hUfXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYmctYnViYmxlKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuICAgICAgICBtYXJnaW46IDJweDtcbiAgICB9XG5cbiAgICB0ZXh0YXJlYSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgd2lkdGg6IDBweDtcbiAgICAgICAgaGVpZ2h0OiAwcHg7XG5cbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5gOyJdfQ==*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dy18k32{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}.dy18k32 .doe-bubble{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 8px;height:24px;background-color:var(--gdg-bg-cell);color:var(--gdg-text-dark);margin:2px;border-radius:var(--gdg-rounding-radius,6px);box-shadow: 0 0 1px rgba(62,65,86,0.4), 0 1px 3px rgba(62,65,86,0.4);}.dy18k32 .doe-bubble img{height:16px;object-fit:contain;margin-right:4px;}.dy18k32 textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvZHJpbGxkb3duLW92ZXJsYXktZWRpdG9yLnRzeCJdLCJuYW1lcyI6WyIuZHkxOGszMiJdLCJtYXBwaW5ncyI6IkFBSW9DQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL2RyaWxsZG93bi1vdmVybGF5LWVkaXRvci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERyaWxsZG93bk92ZXJsYXlFZGl0b3JTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG5cbiAgICAuZG9lLWJ1YmJsZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG5cbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2RnLWJnLWNlbGwpO1xuICAgICAgICBjb2xvcjogdmFyKC0tZ2RnLXRleHQtZGFyayk7XG4gICAgICAgIG1hcmdpbjogMnB4O1xuXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWdkZy1yb3VuZGluZy1yYWRpdXMsIDZweCk7XG5cbiAgICAgICAgYm94LXNoYWRvdzpcbiAgICAgICAgICAgIDAgMCAxcHggcmdiYSg2MiwgNjUsIDg2LCAwLjQpLFxuICAgICAgICAgICAgMCAxcHggM3B4IHJnYmEoNjIsIDY1LCA4NiwgMC40KTtcblxuICAgICAgICBpbWcge1xuICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcblxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXh0YXJlYSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgd2lkdGg6IDBweDtcbiAgICAgICAgaGVpZ2h0OiAwcHg7XG5cbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5gO1xuY29uc3QgRHJpbGxkb3duT3ZlcmxheUVkaXRvciA9IHAgPT4ge1xuICBjb25zdCB7XG4gICAgZHJpbGxkb3duc1xuICB9ID0gcDtcbiAgcmV0dXJuIF9qc3goRHJpbGxkb3duT3ZlcmxheUVkaXRvclN0eWxlLCB7XG4gICAgY2hpbGRyZW46IGRyaWxsZG93bnMubWFwKChkLCBpKSA9PiBfanN4cyhcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiZG9lLWJ1YmJsZVwiLFxuICAgICAgY2hpbGRyZW46IFtkLmltZyAhPT0gdW5kZWZpbmVkICYmIF9qc3goXCJpbWdcIiwge1xuICAgICAgICBzcmM6IGQuaW1nXG4gICAgICB9KSwgX2pzeChcImRpdlwiLCB7XG4gICAgICAgIGNoaWxkcmVuOiBkLnRleHRcbiAgICAgIH0pXVxuICAgIH0sIGkpKVxuICB9KTtcbn07XG5EcmlsbGRvd25PdmVybGF5RWRpdG9yLmRpc3BsYXlOYW1lID0gXCJEcmlsbGRvd25PdmVybGF5RWRpdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBEcmlsbGRvd25PdmVybGF5RWRpdG9yOyJdfQ==*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx"],"names":[".dy18k32"],"mappings":"AAIoCA,SAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,sBAAAA,CAAAA,kBAAAA,CAAAA,cAAAA,CAAAA,CAAAA,qBAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,aAAAA,CAAAA,WAAAA,CAAAA,mCAAAA,CAAAA,0BAAAA,CAAAA,UAAAA,CAAAA,4CAAAA,CAAAA,oEAAAA,CAAAA,CAAAA,yBAAAA,WAAAA,CAAAA,kBAAAA,CAAAA,gBAAAA,CAAAA,CAAAA,kBAAAA,iBAAAA,CAAAA,OAAAA,CAAAA,QAAAA,CAAAA,SAAAA,CAAAA,UAAAA,CAAAA,SAAAA,CAAAA;ACHpC,++EAA++E","sourcesContent":["import * as React from \"react\";\nimport { styled } from \"@linaria/react\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nimport { jsxs as _jsxs } from \"react/jsx-runtime\";\nconst DrilldownOverlayEditorStyle = styled.div`\n    display: flex;\n    flex-wrap: wrap;\n\n    .doe-bubble {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        padding: 0 8px;\n        height: 24px;\n\n        background-color: var(--gdg-bg-cell);\n        color: var(--gdg-text-dark);\n        margin: 2px;\n\n        border-radius: var(--gdg-rounding-radius, 6px);\n\n        box-shadow:\n            0 0 1px rgba(62, 65, 86, 0.4),\n            0 1px 3px rgba(62, 65, 86, 0.4);\n\n        img {\n            height: 16px;\n            object-fit: contain;\n\n            margin-right: 4px;\n        }\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n`;\nconst DrilldownOverlayEditor = p => {\n  const {\n    drilldowns\n  } = p;\n  return _jsx(DrilldownOverlayEditorStyle, {\n    children: drilldowns.map((d, i) => _jsxs(\"div\", {\n      className: \"doe-bubble\",\n      children: [d.img !== undefined && _jsx(\"img\", {\n        src: d.img\n      }), _jsx(\"div\", {\n        children: d.text\n      })]\n    }, i))\n  });\n};\nDrilldownOverlayEditor.displayName = \"DrilldownOverlayEditor\";\nexport default DrilldownOverlayEditor;",".dy18k32{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}.dy18k32 .doe-bubble{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 8px;height:24px;background-color:var(--gdg-bg-cell);color:var(--gdg-text-dark);margin:2px;border-radius:var(--gdg-rounding-radius,6px);box-shadow: 0 0 1px rgba(62,65,86,0.4), 0 1px 3px rgba(62,65,86,0.4);}.dy18k32 .doe-bubble img{height:16px;object-fit:contain;margin-right:4px;}.dy18k32 textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvZHJpbGxkb3duLW92ZXJsYXktZWRpdG9yLnRzeCJdLCJuYW1lcyI6WyIuZHkxOGszMiJdLCJtYXBwaW5ncyI6IkFBSW9DQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL2RyaWxsZG93bi1vdmVybGF5LWVkaXRvci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IERyaWxsZG93bk92ZXJsYXlFZGl0b3JTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG5cbiAgICAuZG9lLWJ1YmJsZSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG5cbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2RnLWJnLWNlbGwpO1xuICAgICAgICBjb2xvcjogdmFyKC0tZ2RnLXRleHQtZGFyayk7XG4gICAgICAgIG1hcmdpbjogMnB4O1xuXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWdkZy1yb3VuZGluZy1yYWRpdXMsIDZweCk7XG5cbiAgICAgICAgYm94LXNoYWRvdzpcbiAgICAgICAgICAgIDAgMCAxcHggcmdiYSg2MiwgNjUsIDg2LCAwLjQpLFxuICAgICAgICAgICAgMCAxcHggM3B4IHJnYmEoNjIsIDY1LCA4NiwgMC40KTtcblxuICAgICAgICBpbWcge1xuICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcblxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXh0YXJlYSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgd2lkdGg6IDBweDtcbiAgICAgICAgaGVpZ2h0OiAwcHg7XG5cbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG5gO1xuY29uc3QgRHJpbGxkb3duT3ZlcmxheUVkaXRvciA9IHAgPT4ge1xuICBjb25zdCB7XG4gICAgZHJpbGxkb3duc1xuICB9ID0gcDtcbiAgcmV0dXJuIF9qc3goRHJpbGxkb3duT3ZlcmxheUVkaXRvclN0eWxlLCB7XG4gICAgY2hpbGRyZW46IGRyaWxsZG93bnMubWFwKChkLCBpKSA9PiBfanN4cyhcImRpdlwiLCB7XG4gICAgICBjbGFzc05hbWU6IFwiZG9lLWJ1YmJsZVwiLFxuICAgICAgY2hpbGRyZW46IFtkLmltZyAhPT0gdW5kZWZpbmVkICYmIF9qc3goXCJpbWdcIiwge1xuICAgICAgICBzcmM6IGQuaW1nXG4gICAgICB9KSwgX2pzeChcImRpdlwiLCB7XG4gICAgICAgIGNoaWxkcmVuOiBkLnRleHRcbiAgICAgIH0pXVxuICAgIH0sIGkpKVxuICB9KTtcbn07XG5EcmlsbGRvd25PdmVybGF5RWRpdG9yLmRpc3BsYXlOYW1lID0gXCJEcmlsbGRvd25PdmVybGF5RWRpdG9yXCI7XG5leHBvcnQgZGVmYXVsdCBEcmlsbGRvd25PdmVybGF5RWRpdG9yOyJdfQ==*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".i1f2fhaz{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%;}.i1f2fhaz .gdg-centering-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;}.i1f2fhaz .gdg-centering-container img,.i1f2fhaz .gdg-centering-container canvas{max-height:calc(100vh - var(--overlay-top) - 20px);object-fit:contain;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.i1f2fhaz .gdg-centering-container canvas{max-width:380px;}.i1f2fhaz .gdg-edit-icon{position:absolute;top:12px;right:0;width:48px;height:48px;color:var(--gdg-accent-color);cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.i1f2fhaz .gdg-edit-icon > *{width:24px;height:24px;}.i1f2fhaz textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvaW1hZ2Utb3ZlcmxheS1lZGl0b3Itc3R5bGUudHN4Il0sIm5hbWVzIjpbIi5pMWYyZmhheiJdLCJtYXBwaW5ncyI6IkFBQ3VDQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL2ltYWdlLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuZXhwb3J0IGNvbnN0IEltYWdlT3ZlcmxheUVkaXRvclN0eWxlID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgLmdkZy1jZW50ZXJpbmctY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAgIGltZyxcbiAgICAgICAgY2FudmFzIHtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1vdmVybGF5LXRvcCkgLSAyMHB4KTtcbiAgICAgICAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbnZhcyB7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM4MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmdkZy1lZGl0LWljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMTJweDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWNvbG9yKTtcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgPiAqIHtcbiAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGV4dGFyZWEge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMHB4O1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgIHdpZHRoOiAwcHg7XG4gICAgICAgIGhlaWdodDogMHB4O1xuXG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuYDsiXX0=*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx"],"names":[".i1f2fhaz"],"mappings":"AACuCA,UAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,WAAAA,CAAAA,CAAAA,mCAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,WAAAA,CAAAA,CAAAA,iFAAAA,kDAAAA,CAAAA,kBAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,oBAAAA,CAAAA,gBAAAA,CAAAA,CAAAA,0CAAAA,eAAAA,CAAAA,CAAAA,yBAAAA,iBAAAA,CAAAA,QAAAA,CAAAA,OAAAA,CAAAA,UAAAA,CAAAA,WAAAA,CAAAA,6BAAAA,CAAAA,cAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,CAAAA,6BAAAA,UAAAA,CAAAA,WAAAA,CAAAA,CAAAA,mBAAAA,iBAAAA,CAAAA,OAAAA,CAAAA,QAAAA,CAAAA,SAAAA,CAAAA,UAAAA,CAAAA,SAAAA,CAAAA;ACAvC,28DAA28D","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const ImageOverlayEditorStyle = styled.div`\n    display: flex;\n\n    height: 100%;\n\n    .gdg-centering-container {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        height: 100%;\n\n        img,\n        canvas {\n            max-height: calc(100vh - var(--overlay-top) - 20px);\n            object-fit: contain;\n            user-select: none;\n        }\n\n        canvas {\n            max-width: 380px;\n        }\n    }\n\n    .gdg-edit-icon {\n        position: absolute;\n        top: 12px;\n        right: 0;\n        width: 48px;\n        height: 48px;\n        color: var(--gdg-accent-color);\n\n        cursor: pointer;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        > * {\n            width: 24px;\n            height: 24px;\n        }\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n`;",".i1f2fhaz{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100%;}.i1f2fhaz .gdg-centering-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;}.i1f2fhaz .gdg-centering-container img,.i1f2fhaz .gdg-centering-container canvas{max-height:calc(100vh - var(--overlay-top) - 20px);object-fit:contain;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.i1f2fhaz .gdg-centering-container canvas{max-width:380px;}.i1f2fhaz .gdg-edit-icon{position:absolute;top:12px;right:0;width:48px;height:48px;color:var(--gdg-accent-color);cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.i1f2fhaz .gdg-edit-icon > *{width:24px;height:24px;}.i1f2fhaz textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvaW1hZ2Utb3ZlcmxheS1lZGl0b3Itc3R5bGUudHN4Il0sIm5hbWVzIjpbIi5pMWYyZmhheiJdLCJtYXBwaW5ncyI6IkFBQ3VDQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL2ltYWdlLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuZXhwb3J0IGNvbnN0IEltYWdlT3ZlcmxheUVkaXRvclN0eWxlID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuXG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgLmdkZy1jZW50ZXJpbmctY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAgIGltZyxcbiAgICAgICAgY2FudmFzIHtcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1vdmVybGF5LXRvcCkgLSAyMHB4KTtcbiAgICAgICAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbnZhcyB7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM4MHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmdkZy1lZGl0LWljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMTJweDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWNvbG9yKTtcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgPiAqIHtcbiAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGV4dGFyZWEge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMHB4O1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgIHdpZHRoOiAwcHg7XG4gICAgICAgIGhlaWdodDogMHB4O1xuXG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuYDsiXX0=*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mmv7gx6{min-width:var(--mmv7gx6-0);width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;position:relative;color:var(--gdg-text-dark);}.mmv7gx6 .g1d7u5bt{-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;min-width:0;}.mmv7gx6 .gdg-spacer{-webkit-flex:1;-ms-flex:1;flex:1;}.mmv7gx6 .gdg-edit-icon{position:relative;cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--gdg-accent-color);padding:0;height:24px;width:24px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-transition:all \"0.125s ease\";transition:all \"0.125s ease\";border-radius:6px;}.mmv7gx6 .gdg-edit-icon > *{width:16px;height:16px;}.mmv7gx6 .gdg-edit-hover:hover{background-color:var(--gdg-accent-light);-webkit-transition:background-color 150ms;transition:background-color 150ms;}.mmv7gx6 .gdg-checkmark-hover:hover{color:#ffffff;background-color:var(--gdg-accent-color);}.mmv7gx6 .gdg-md-edit-textarea{position:relative;top:0px;left:0px;width:0px;height:0px;margin-top:25px;opacity:0;padding:0;}.mmv7gx6 .gdg-ml-6{margin-left:6px;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvbWFya2Rvd24tb3ZlcmxheS1lZGl0b3Itc3R5bGUudHN4Il0sIm5hbWVzIjpbIi5tbXY3Z3g2Il0sIm1hcHBpbmdzIjoiQUFFMENBIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvbWFya2Rvd24tb3ZlcmxheS1lZGl0b3Itc3R5bGUudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3Jvd2luZ0VudHJ5U3R5bGUgfSBmcm9tIFwiLi4vLi4vZ3Jvd2luZy1lbnRyeS9ncm93aW5nLWVudHJ5LXN0eWxlLmpzXCI7XG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBNYXJrZG93bk92ZXJsYXlFZGl0b3JTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgbWluLXdpZHRoOiAke3AgPT4gcC50YXJnZXRXaWR0aH1weDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuXG4gICAgJHtHcm93aW5nRW50cnlTdHlsZX0ge1xuICAgICAgICBmbGV4LXNocmluazogMTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgIH1cblxuICAgIC5nZGctc3BhY2VyIHtcbiAgICAgICAgZmxleDogMTtcbiAgICB9XG5cbiAgICAuZ2RnLWVkaXQtaWNvbiB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWNvbG9yKTtcblxuICAgICAgICBwYWRkaW5nOiAwO1xuXG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCBcIjAuMTI1cyBlYXNlXCI7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuXG4gICAgICAgID4gKiB7XG4gICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5nZGctZWRpdC1ob3ZlciB7XG4gICAgICAgIDpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWxpZ2h0KTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMTUwbXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuZ2RnLWNoZWNrbWFyay1ob3ZlciB7XG4gICAgICAgIDpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1hY2NlbnQtY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmdkZy1tZC1lZGl0LXRleHRhcmVhIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDBweDtcbiAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICB3aWR0aDogMHB4O1xuICAgICAgICBoZWlnaHQ6IDBweDtcbiAgICAgICAgbWFyZ2luLXRvcDogMjVweDtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG5cbiAgICAuZ2RnLW1sLTYge1xuICAgICAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgIH1cbmA7Il19*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx"],"names":[".mmv7gx6"],"mappings":"AAE0CA,SAAAA,0BAAAA,CAAAA,UAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,8BAAAA,CAAAA,4BAAAA,CAAAA,yBAAAA,CAAAA,sBAAAA,CAAAA,wBAAAA,CAAAA,qCAAAA,CAAAA,qBAAAA,CAAAA,6BAAAA,CAAAA,iBAAAA,CAAAA,0BAAAA,CAAAA,CAAAA,mBAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,WAAAA,CAAAA,CAAAA,qBAAAA,cAAAA,CAAAA,UAAAA,CAAAA,MAAAA,CAAAA,CAAAA,wBAAAA,iBAAAA,CAAAA,cAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,6BAAAA,CAAAA,SAAAA,CAAAA,WAAAA,CAAAA,UAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,oCAAAA,CAAAA,4BAAAA,CAAAA,iBAAAA,CAAAA,CAAAA,4BAAAA,UAAAA,CAAAA,WAAAA,CAAAA,CAAAA,+BAAAA,wCAAAA,CAAAA,yCAAAA,CAAAA,iCAAAA,CAAAA,CAAAA,oCAAAA,aAAAA,CAAAA,wCAAAA,CAAAA,CAAAA,+BAAAA,iBAAAA,CAAAA,OAAAA,CAAAA,QAAAA,CAAAA,SAAAA,CAAAA,UAAAA,CAAAA,eAAAA,CAAAA,SAAAA,CAAAA,SAAAA,CAAAA,CAAAA,mBAAAA,eAAAA,CAAAA;ACD1C,+mFAA+mF","sourcesContent":["import { GrowingEntryStyle } from \"../../growing-entry/growing-entry-style.js\";\nimport { styled } from \"@linaria/react\";\nexport const MarkdownOverlayEditorStyle = styled.div`\n    min-width: ${p => p.targetWidth}px;\n    width: 100%;\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    position: relative;\n    color: var(--gdg-text-dark);\n\n    ${GrowingEntryStyle} {\n        flex-shrink: 1;\n        min-width: 0;\n    }\n\n    .gdg-spacer {\n        flex: 1;\n    }\n\n    .gdg-edit-icon {\n        position: relative;\n        cursor: pointer;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        color: var(--gdg-accent-color);\n\n        padding: 0;\n\n        height: 24px;\n        width: 24px;\n        flex-shrink: 0;\n\n        transition: all \"0.125s ease\";\n\n        border-radius: 6px;\n\n        > * {\n            width: 16px;\n            height: 16px;\n        }\n    }\n\n    .gdg-edit-hover {\n        :hover {\n            background-color: var(--gdg-accent-light);\n            transition: background-color 150ms;\n        }\n    }\n\n    .gdg-checkmark-hover {\n        :hover {\n            color: #ffffff;\n            background-color: var(--gdg-accent-color);\n        }\n    }\n\n    .gdg-md-edit-textarea {\n        position: relative;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n        margin-top: 25px;\n        opacity: 0;\n        padding: 0;\n    }\n\n    .gdg-ml-6 {\n        margin-left: 6px;\n    }\n`;",".mmv7gx6{min-width:var(--mmv7gx6-0);width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;position:relative;color:var(--gdg-text-dark);}.mmv7gx6 .g1d7u5bt{-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;min-width:0;}.mmv7gx6 .gdg-spacer{-webkit-flex:1;-ms-flex:1;flex:1;}.mmv7gx6 .gdg-edit-icon{position:relative;cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--gdg-accent-color);padding:0;height:24px;width:24px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-transition:all \"0.125s ease\";transition:all \"0.125s ease\";border-radius:6px;}.mmv7gx6 .gdg-edit-icon > *{width:16px;height:16px;}.mmv7gx6 .gdg-edit-hover:hover{background-color:var(--gdg-accent-light);-webkit-transition:background-color 150ms;transition:background-color 150ms;}.mmv7gx6 .gdg-checkmark-hover:hover{color:#ffffff;background-color:var(--gdg-accent-color);}.mmv7gx6 .gdg-md-edit-textarea{position:relative;top:0px;left:0px;width:0px;height:0px;margin-top:25px;opacity:0;padding:0;}.mmv7gx6 .gdg-ml-6{margin-left:6px;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvbWFya2Rvd24tb3ZlcmxheS1lZGl0b3Itc3R5bGUudHN4Il0sIm5hbWVzIjpbIi5tbXY3Z3g2Il0sIm1hcHBpbmdzIjoiQUFFMENBIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvbWFya2Rvd24tb3ZlcmxheS1lZGl0b3Itc3R5bGUudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3Jvd2luZ0VudHJ5U3R5bGUgfSBmcm9tIFwiLi4vLi4vZ3Jvd2luZy1lbnRyeS9ncm93aW5nLWVudHJ5LXN0eWxlLmpzXCI7XG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBNYXJrZG93bk92ZXJsYXlFZGl0b3JTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgbWluLXdpZHRoOiAke3AgPT4gcC50YXJnZXRXaWR0aH1weDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuXG4gICAgJHtHcm93aW5nRW50cnlTdHlsZX0ge1xuICAgICAgICBmbGV4LXNocmluazogMTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgIH1cblxuICAgIC5nZGctc3BhY2VyIHtcbiAgICAgICAgZmxleDogMTtcbiAgICB9XG5cbiAgICAuZ2RnLWVkaXQtaWNvbiB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWNvbG9yKTtcblxuICAgICAgICBwYWRkaW5nOiAwO1xuXG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCBcIjAuMTI1cyBlYXNlXCI7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuXG4gICAgICAgID4gKiB7XG4gICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5nZGctZWRpdC1ob3ZlciB7XG4gICAgICAgIDpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWxpZ2h0KTtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMTUwbXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuZ2RnLWNoZWNrbWFyay1ob3ZlciB7XG4gICAgICAgIDpob3ZlciB7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdkZy1hY2NlbnQtY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmdkZy1tZC1lZGl0LXRleHRhcmVhIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDBweDtcbiAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICB3aWR0aDogMHB4O1xuICAgICAgICBoZWlnaHQ6IDBweDtcbiAgICAgICAgbWFyZ2luLXRvcDogMjVweDtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICB9XG5cbiAgICAuZ2RnLW1sLTYge1xuICAgICAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgIH1cbmA7Il19*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".uwr6ffw{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;min-height:21px;}.uwr6ffw .gdg-link-area{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;cursor:pointer;margin-right:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gdg-link-color);-webkit-text-decoration:underline !important;text-decoration:underline !important;}.uwr6ffw .gdg-edit-icon{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:32px;color:var(--gdg-accent-color);cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.uwr6ffw .gdg-edit-icon > *{width:24px;height:24px;}.uwr6ffw textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvdXJpLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIudXdyNmZmdyJdLCJtYXBwaW5ncyI6IkFBQ3FDQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL3VyaS1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBVcmlPdmVybGF5RWRpdG9yU3R5bGUgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgbWluLWhlaWdodDogMjFweDtcblxuICAgIC5nZGctbGluay1hcmVhIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBmbGV4LXNocmluazogMTtcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctbGluay1jb2xvcik7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmdkZy1lZGl0LWljb24ge1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWNvbG9yKTtcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgPiAqIHtcbiAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGV4dGFyZWEge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMHB4O1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgIHdpZHRoOiAwcHg7XG4gICAgICAgIGhlaWdodDogMHB4O1xuXG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuYDsiXX0=*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx","webpack://./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx"],"names":[".uwr6ffw"],"mappings":"AACqCA,SAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,eAAAA,CAAAA,CAAAA,wBAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,cAAAA,CAAAA,gBAAAA,CAAAA,eAAAA,CAAAA,sBAAAA,CAAAA,kBAAAA,CAAAA,2BAAAA,CAAAA,4CAAAA,CAAAA,oCAAAA,CAAAA,CAAAA,wBAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,UAAAA,CAAAA,6BAAAA,CAAAA,cAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,uBAAAA,CAAAA,8BAAAA,CAAAA,oBAAAA,CAAAA,sBAAAA,CAAAA,0BAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,kBAAAA,CAAAA,CAAAA,4BAAAA,UAAAA,CAAAA,WAAAA,CAAAA,CAAAA,kBAAAA,iBAAAA,CAAAA,OAAAA,CAAAA,QAAAA,CAAAA,SAAAA,CAAAA,UAAAA,CAAAA,SAAAA,CAAAA;ACArC,20DAA20D","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const UriOverlayEditorStyle = styled.div`\n    display: flex;\n\n    flex-grow: 1;\n\n    align-items: center;\n\n    min-height: 21px;\n\n    .gdg-link-area {\n        flex-grow: 1;\n        flex-shrink: 1;\n\n        cursor: pointer;\n\n        margin-right: 8px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n\n        color: var(--gdg-link-color);\n        text-decoration: underline !important;\n    }\n\n    .gdg-edit-icon {\n        flex-shrink: 0;\n        width: 32px;\n        color: var(--gdg-accent-color);\n\n        cursor: pointer;\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        > * {\n            width: 24px;\n            height: 24px;\n        }\n    }\n\n    textarea {\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: 0px;\n        height: 0px;\n\n        opacity: 0;\n    }\n`;",".uwr6ffw{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;min-height:21px;}.uwr6ffw .gdg-link-area{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;cursor:pointer;margin-right:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gdg-link-color);-webkit-text-decoration:underline !important;text-decoration:underline !important;}.uwr6ffw .gdg-edit-icon{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:32px;color:var(--gdg-accent-color);cursor:pointer;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.uwr6ffw .gdg-edit-icon > *{width:24px;height:24px;}.uwr6ffw textarea{position:absolute;top:0px;left:0px;width:0px;height:0px;opacity:0;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZGF0YS1ncmlkLW92ZXJsYXktZWRpdG9yL3ByaXZhdGUvdXJpLW92ZXJsYXktZWRpdG9yLXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIudXdyNmZmdyJdLCJtYXBwaW5ncyI6IkFBQ3FDQSIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVybmFsL2RhdGEtZ3JpZC1vdmVybGF5LWVkaXRvci9wcml2YXRlL3VyaS1vdmVybGF5LWVkaXRvci1zdHlsZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmV4cG9ydCBjb25zdCBVcmlPdmVybGF5RWRpdG9yU3R5bGUgPSBzdHlsZWQuZGl2YFxuICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgbWluLWhlaWdodDogMjFweDtcblxuICAgIC5nZGctbGluay1hcmVhIHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBmbGV4LXNocmluazogMTtcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctbGluay1jb2xvcik7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmdkZy1lZGl0LWljb24ge1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1nZGctYWNjZW50LWNvbG9yKTtcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgICAgPiAqIHtcbiAgICAgICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGV4dGFyZWEge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMHB4O1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgIHdpZHRoOiAwcHg7XG4gICAgICAgIGhlaWdodDogMHB4O1xuXG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuYDsiXX0=*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/growing-entry/growing-entry-style.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".iotb8b8{position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%;border-radius:0px;resize:none;white-space:pre-wrap;min-width:100%;overflow:hidden;border:0;background-color:transparent;font-size:var(--gdg-editor-font-size);line-height:16px;font-family:var(--gdg-font-family);-webkit-text-fill-color:var(--gdg-text-dark);color:var(--gdg-text-dark);padding:0;margin:0;}.iotb8b8::-webkit-input-placeholder{color:var(--gdg-text-light);}.iotb8b8::-moz-placeholder{color:var(--gdg-text-light);}.iotb8b8:-ms-input-placeholder{color:var(--gdg-text-light);}.iotb8b8::placeholder{color:var(--gdg-text-light);}.gdg-invalid .iotb8b8{-webkit-text-decoration:underline;text-decoration:underline;-webkit-text-decoration-color:#d60606;text-decoration-color:#d60606;}\n.s1xtsfdl{visibility:hidden;white-space:pre-wrap;word-wrap:break-word;width:-webkit-max-content;width:-moz-max-content;width:max-content;max-width:100%;min-width:100%;font-size:var(--gdg-editor-font-size);line-height:16px;font-family:var(--gdg-font-family);color:var(--gdg-text-dark);padding:0;margin:0;padding-bottom:2px;}\n.g1d7u5bt{position:relative;margin-top:6px;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZ3Jvd2luZy1lbnRyeS9ncm93aW5nLWVudHJ5LXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIuaW90YjhiOCIsIi5zMXh0c2ZkbCIsIi5nMWQ3dTVidCJdLCJtYXBwaW5ncyI6IkFBQ3dCQTtBQW1DQ0M7QUFtQlFDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZ3Jvd2luZy1lbnRyeS9ncm93aW5nLWVudHJ5LXN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuZXhwb3J0IGNvbnN0IElucHV0Qm94ID0gc3R5bGVkLnRleHRhcmVhYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgYm9yZGVyLXJhZGl1czogMHB4O1xuXG4gICAgcmVzaXplOiBub25lO1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXI6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgICA6OnBsYWNlaG9sZGVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWxpZ2h0KTtcbiAgICB9XG5cbiAgICBmb250LXNpemU6IHZhcigtLWdkZy1lZGl0b3ItZm9udC1zaXplKTtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdmFyKC0tZ2RnLXRleHQtZGFyayk7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwO1xuXG4gICAgLmdkZy1pbnZhbGlkICYge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiAjZDYwNjA2O1xuICAgIH1cbmA7XG5leHBvcnQgY29uc3QgU2hhZG93Qm94ID0gc3R5bGVkLmRpdmBcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcblxuICAgIHdpZHRoOiBtYXgtY29udGVudDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG5cbiAgICBtaW4td2lkdGg6IDEwMCU7XG5cbiAgICBmb250LXNpemU6IHZhcigtLWdkZy1lZGl0b3ItZm9udC1zaXplKTtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICBjb2xvcjogdmFyKC0tZ2RnLXRleHQtZGFyayk7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG5cbiAgICBwYWRkaW5nLWJvdHRvbTogMnB4O1xuYDtcbmV4cG9ydCBjb25zdCBHcm93aW5nRW50cnlTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi10b3A6IDZweDtcbmA7Il19*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/growing-entry/growing-entry-style.tsx","webpack://./packages/core/src/internal/growing-entry/growing-entry-style.tsx"],"names":[".iotb8b8",".s1xtsfdl",".g1d7u5bt"],"mappings":"AACwBA,SAAAA,iBAAAA,CAAAA,MAAAA,CAAAA,OAAAA,CAAAA,KAAAA,CAAAA,QAAAA,CAAAA,UAAAA,CAAAA,WAAAA,CAAAA,iBAAAA,CAAAA,WAAAA,CAAAA,oBAAAA,CAAAA,cAAAA,CAAAA,eAAAA,CAAAA,QAAAA,CAAAA,4BAAAA,CAAAA,qCAAAA,CAAAA,gBAAAA,CAAAA,kCAAAA,CAAAA,4CAAAA,CAAAA,0BAAAA,CAAAA,SAAAA,CAAAA,QAAAA,CAAAA,CAAAA,oCAAAA,2BAAAA,CAAAA,CAAAA,2BAAAA,2BAAAA,CAAAA,CAAAA,+BAAAA,2BAAAA,CAAAA,CAAAA,sBAAAA,2BAAAA,CAAAA,CAAAA,sBAAAA,iCAAAA,CAAAA,yBAAAA,CAAAA,qCAAAA,CAAAA,6BAAAA,CAAAA;AAmCCC,UAAAA,iBAAAA,CAAAA,oBAAAA,CAAAA,oBAAAA,CAAAA,yBAAAA,CAAAA,sBAAAA,CAAAA,iBAAAA,CAAAA,cAAAA,CAAAA,cAAAA,CAAAA,qCAAAA,CAAAA,gBAAAA,CAAAA,kCAAAA,CAAAA,0BAAAA,CAAAA,SAAAA,CAAAA,QAAAA,CAAAA,kBAAAA,CAAAA;AAmBQC,UAAAA,iBAAAA,CAAAA,cAAAA,CAAAA;ACpDjC,utEAAutE","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const InputBox = styled.textarea`\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n\n    border-radius: 0px;\n\n    resize: none;\n    white-space: pre-wrap;\n    min-width: 100%;\n    overflow: hidden;\n    border: 0;\n    background-color: transparent;\n\n    ::placeholder {\n        color: var(--gdg-text-light);\n    }\n\n    font-size: var(--gdg-editor-font-size);\n    line-height: 16px;\n    font-family: var(--gdg-font-family);\n    -webkit-text-fill-color: var(--gdg-text-dark);\n    color: var(--gdg-text-dark);\n    padding: 0;\n    margin: 0;\n\n    .gdg-invalid & {\n        text-decoration: underline;\n        text-decoration-color: #d60606;\n    }\n`;\nexport const ShadowBox = styled.div`\n    visibility: hidden;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n\n    width: max-content;\n    max-width: 100%;\n\n    min-width: 100%;\n\n    font-size: var(--gdg-editor-font-size);\n    line-height: 16px;\n    font-family: var(--gdg-font-family);\n    color: var(--gdg-text-dark);\n    padding: 0;\n    margin: 0;\n\n    padding-bottom: 2px;\n`;\nexport const GrowingEntryStyle = styled.div`\n    position: relative;\n    margin-top: 6px;\n`;",".iotb8b8{position:absolute;left:0;right:0;top:0;bottom:0;width:100%;height:100%;border-radius:0px;resize:none;white-space:pre-wrap;min-width:100%;overflow:hidden;border:0;background-color:transparent;font-size:var(--gdg-editor-font-size);line-height:16px;font-family:var(--gdg-font-family);-webkit-text-fill-color:var(--gdg-text-dark);color:var(--gdg-text-dark);padding:0;margin:0;}.iotb8b8::-webkit-input-placeholder{color:var(--gdg-text-light);}.iotb8b8::-moz-placeholder{color:var(--gdg-text-light);}.iotb8b8:-ms-input-placeholder{color:var(--gdg-text-light);}.iotb8b8::placeholder{color:var(--gdg-text-light);}.gdg-invalid .iotb8b8{-webkit-text-decoration:underline;text-decoration:underline;-webkit-text-decoration-color:#d60606;text-decoration-color:#d60606;}\n.s1xtsfdl{visibility:hidden;white-space:pre-wrap;word-wrap:break-word;width:-webkit-max-content;width:-moz-max-content;width:max-content;max-width:100%;min-width:100%;font-size:var(--gdg-editor-font-size);line-height:16px;font-family:var(--gdg-font-family);color:var(--gdg-text-dark);padding:0;margin:0;padding-bottom:2px;}\n.g1d7u5bt{position:relative;margin-top:6px;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZ3Jvd2luZy1lbnRyeS9ncm93aW5nLWVudHJ5LXN0eWxlLnRzeCJdLCJuYW1lcyI6WyIuaW90YjhiOCIsIi5zMXh0c2ZkbCIsIi5nMWQ3dTVidCJdLCJtYXBwaW5ncyI6IkFBQ3dCQTtBQW1DQ0M7QUFtQlFDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvZ3Jvd2luZy1lbnRyeS9ncm93aW5nLWVudHJ5LXN0eWxlLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuZXhwb3J0IGNvbnN0IElucHV0Qm94ID0gc3R5bGVkLnRleHRhcmVhYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgYm9yZGVyLXJhZGl1czogMHB4O1xuXG4gICAgcmVzaXplOiBub25lO1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXI6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cbiAgICA6OnBsYWNlaG9sZGVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWxpZ2h0KTtcbiAgICB9XG5cbiAgICBmb250LXNpemU6IHZhcigtLWdkZy1lZGl0b3ItZm9udC1zaXplKTtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdmFyKC0tZ2RnLXRleHQtZGFyayk7XG4gICAgY29sb3I6IHZhcigtLWdkZy10ZXh0LWRhcmspO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwO1xuXG4gICAgLmdkZy1pbnZhbGlkICYge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiAjZDYwNjA2O1xuICAgIH1cbmA7XG5leHBvcnQgY29uc3QgU2hhZG93Qm94ID0gc3R5bGVkLmRpdmBcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcblxuICAgIHdpZHRoOiBtYXgtY29udGVudDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG5cbiAgICBtaW4td2lkdGg6IDEwMCU7XG5cbiAgICBmb250LXNpemU6IHZhcigtLWdkZy1lZGl0b3ItZm9udC1zaXplKTtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tZ2RnLWZvbnQtZmFtaWx5KTtcbiAgICBjb2xvcjogdmFyKC0tZ2RnLXRleHQtZGFyayk7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG5cbiAgICBwYWRkaW5nLWJvdHRvbTogMnB4O1xuYDtcbmV4cG9ydCBjb25zdCBHcm93aW5nRW50cnlTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi10b3A6IDZweDtcbmA7Il19*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/markdown-div/private/markdown-container.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".m1ec5h7p{word-break:break-word;-webkit-touch-callout:default;padding-top:6px;}.m1ec5h7p > *{margin:0;}.m1ec5h7p *:last-child{margin-bottom:0;}.m1ec5h7p p img{width:100%;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvbWFya2Rvd24tZGl2L3ByaXZhdGUvbWFya2Rvd24tY29udGFpbmVyLnRzeCJdLCJuYW1lcyI6WyIubTFlYzVoN3AiXSwibWFwcGluZ3MiOiJBQUNpQ0EiLCJmaWxlIjoiL2hvbWUvcnVubmVyL3dvcmsvZ2xpZGUtZGF0YS1ncmlkL2dsaWRlLWRhdGEtZ3JpZC9wYWNrYWdlcy9jb3JlL3NyYy9pbnRlcm5hbC9tYXJrZG93bi1kaXYvcHJpdmF0ZS9tYXJrZG93bi1jb250YWluZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcIkBsaW5hcmlhL3JlYWN0XCI7XG5leHBvcnQgY29uc3QgTWFya2Rvd25Db250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBkZWZhdWx0O1xuICAgIHBhZGRpbmctdG9wOiA2cHg7XG5cbiAgICA+ICoge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgJiAqOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgICYgcCBpbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5gOyJdfQ==*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/internal/markdown-div/private/markdown-container.tsx","webpack://./packages/core/src/internal/markdown-div/private/markdown-container.tsx"],"names":[".m1ec5h7p"],"mappings":"AACiCA,UAAAA,qBAAAA,CAAAA,6BAAAA,CAAAA,eAAAA,CAAAA,CAAAA,cAAAA,QAAAA,CAAAA,CAAAA,uBAAAA,eAAAA,CAAAA,CAAAA,gBAAAA,UAAAA,CAAAA;ACAjC,+6BAA+6B","sourcesContent":["import { styled } from \"@linaria/react\";\nexport const MarkdownContainer = styled.div`\n    word-break: break-word;\n    -webkit-touch-callout: default;\n    padding-top: 6px;\n\n    > * {\n        margin: 0;\n    }\n\n    & *:last-child {\n        margin-bottom: 0;\n    }\n\n    & p img {\n        width: 100%;\n    }\n`;",".m1ec5h7p{word-break:break-word;-webkit-touch-callout:default;padding-top:6px;}.m1ec5h7p > *{margin:0;}.m1ec5h7p *:last-child{margin-bottom:0;}.m1ec5h7p p img{width:100%;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvaW50ZXJuYWwvbWFya2Rvd24tZGl2L3ByaXZhdGUvbWFya2Rvd24tY29udGFpbmVyLnRzeCJdLCJuYW1lcyI6WyIubTFlYzVoN3AiXSwibWFwcGluZ3MiOiJBQUNpQ0EiLCJmaWxlIjoiL2hvbWUvcnVubmVyL3dvcmsvZ2xpZGUtZGF0YS1ncmlkL2dsaWRlLWRhdGEtZ3JpZC9wYWNrYWdlcy9jb3JlL3NyYy9pbnRlcm5hbC9tYXJrZG93bi1kaXYvcHJpdmF0ZS9tYXJrZG93bi1jb250YWluZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcIkBsaW5hcmlhL3JlYWN0XCI7XG5leHBvcnQgY29uc3QgTWFya2Rvd25Db250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBkZWZhdWx0O1xuICAgIHBhZGRpbmctdG9wOiA2cHg7XG5cbiAgICA+ICoge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgJiAqOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgICYgcCBpbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5gOyJdfQ==*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/stories/story-utils.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".bheiboo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100vh;width:100vw;position:relative;}.bheiboo > .content{display:block;width:var(--bheiboo-0);height:var(--bheiboo-1);-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;}.bheiboo > .content *,.bheiboo > .content *::before,.bheiboo > .content *::after{box-sizing:inherit;}\n.s15ez7jv{box-sizing:border-box;}.s15ez7jv *,.s15ez7jv *::before,.s15ez7jv *::after{box-sizing:inherit;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvc3Rvcmllcy9zdG9yeS11dGlscy50c3giXSwibmFtZXMiOlsiLmJoZWlib28iLCIuczE1ZXo3anYiXSwibWFwcGluZ3MiOiJBQU11QkE7QUE0QkRDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvc3Rvcmllcy9zdG9yeS11dGlscy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0IFwicmVhY3QtcmVzcG9uc2l2ZS1jYXJvdXNlbC9saWIvc3R5bGVzL2Nhcm91c2VsLm1pbi5jc3NcIjtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEJ1aWxkZXJXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICYgPiAuY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgICAgIHdpZHRoOiAke3AgPT4gcC53aWR0aH1weDtcbiAgICAgICAgaGVpZ2h0OiAke3AgPT4gcC5oZWlnaHR9cHg7XG4gICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcblxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAgICAgKixcbiAgICAgICAgKjo6YmVmb3JlLFxuICAgICAgICAqOjphZnRlciB7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgfVxuYDtcbmNvbnN0IFNpbXBsZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAqLFxuICAgICo6OmJlZm9yZSxcbiAgICAqOjphZnRlciB7XG4gICAgICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gICAgfVxuYDtcbmV4cG9ydCBjbGFzcyBCdWlsZGVyVGhlbWVXcmFwcGVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0LFxuICAgICAgY2hpbGRyZW4sXG4gICAgICAuLi5yZXN0XG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIF9qc3hzKF9GcmFnbWVudCwge1xuICAgICAgY2hpbGRyZW46IFtfanN4KEJ1aWxkZXJXcmFwcGVyLCB7XG4gICAgICAgIC4uLnJlc3QsXG4gICAgICAgIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwiY29udGVudFwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgICAgICB9KVxuICAgICAgfSksIF9qc3goXCJkaXZcIiwge1xuICAgICAgICBpZDogXCJwb3J0YWxcIlxuICAgICAgfSldXG4gICAgfSk7XG4gIH1cbn1cbkJ1aWxkZXJUaGVtZVdyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkJ1aWxkZXJUaGVtZVdyYXBwZXJcIjtcbmV4cG9ydCBjb25zdCBTaW1wbGVUaGVtZVdyYXBwZXIgPSBwID0+IHtcbiAgcmV0dXJuIF9qc3goU2ltcGxlV3JhcHBlciwge1xuICAgIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJjb250ZW50XCIsXG4gICAgICBjaGlsZHJlbjogcC5jaGlsZHJlblxuICAgIH0pXG4gIH0pO1xufTtcblNpbXBsZVRoZW1lV3JhcHBlci5kaXNwbGF5TmFtZSA9IFwiU2ltcGxlVGhlbWVXcmFwcGVyXCI7Il19*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/stories/story-utils.tsx","webpack://./packages/core/src/stories/story-utils.tsx"],"names":[".bheiboo",".s15ez7jv"],"mappings":"AAMuBA,SAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,YAAAA,CAAAA,WAAAA,CAAAA,iBAAAA,CAAAA,CAAAA,oBAAAA,aAAAA,CAAAA,sBAAAA,CAAAA,uBAAAA,CAAAA,yBAAAA,CAAAA,0BAAAA,CAAAA,iBAAAA,CAAAA,iBAAAA,CAAAA,yCAAAA,CAAAA,wBAAAA,CAAAA,qBAAAA,CAAAA,oBAAAA,CAAAA,gBAAAA,CAAAA,qBAAAA,CAAAA,CAAAA,iFAAAA,kBAAAA,CAAAA;AA4BDC,UAAAA,qBAAAA,CAAAA,CAAAA,mDAAAA,kBAAAA,CAAAA;AChCtB,+sFAA+sF","sourcesContent":["import * as React from \"react\";\nimport { styled } from \"@linaria/react\";\nimport \"react-responsive-carousel/lib/styles/carousel.min.css\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nimport { Fragment as _Fragment } from \"react/jsx-runtime\";\nimport { jsxs as _jsxs } from \"react/jsx-runtime\";\nconst BuilderWrapper = styled.div`\n    display: flex;\n    height: 100vh;\n    width: 100vw;\n    position: relative;\n\n    & > .content {\n        display: block;\n\n        width: ${p => p.width}px;\n        height: ${p => p.height}px;\n        align-self: center;\n\n        position: relative;\n\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\n        user-select: none;\n\n        box-sizing: border-box;\n\n        *,\n        *::before,\n        *::after {\n            box-sizing: inherit;\n        }\n    }\n`;\nconst SimpleWrapper = styled.div`\n    box-sizing: border-box;\n\n    *,\n    *::before,\n    *::after {\n        box-sizing: inherit;\n    }\n`;\nexport class BuilderThemeWrapper extends React.PureComponent {\n  render() {\n    const {\n      context,\n      children,\n      ...rest\n    } = this.props;\n    return _jsxs(_Fragment, {\n      children: [_jsx(BuilderWrapper, {\n        ...rest,\n        children: _jsx(\"div\", {\n          className: \"content\",\n          children: children\n        })\n      }), _jsx(\"div\", {\n        id: \"portal\"\n      })]\n    });\n  }\n}\nBuilderThemeWrapper.displayName = \"BuilderThemeWrapper\";\nexport const SimpleThemeWrapper = p => {\n  return _jsx(SimpleWrapper, {\n    children: _jsx(\"div\", {\n      className: \"content\",\n      children: p.children\n    })\n  });\n};\nSimpleThemeWrapper.displayName = \"SimpleThemeWrapper\";",".bheiboo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:100vh;width:100vw;position:relative;}.bheiboo > .content{display:block;width:var(--bheiboo-0);height:var(--bheiboo-1);-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;box-sizing:border-box;}.bheiboo > .content *,.bheiboo > .content *::before,.bheiboo > .content *::after{box-sizing:inherit;}\n.s15ez7jv{box-sizing:border-box;}.s15ez7jv *,.s15ez7jv *::before,.s15ez7jv *::after{box-sizing:inherit;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvc3Rvcmllcy9zdG9yeS11dGlscy50c3giXSwibmFtZXMiOlsiLmJoZWlib28iLCIuczE1ZXo3anYiXSwibWFwcGluZ3MiOiJBQU11QkE7QUE0QkRDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvc3Rvcmllcy9zdG9yeS11dGlscy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gXCJAbGluYXJpYS9yZWFjdFwiO1xuaW1wb3J0IFwicmVhY3QtcmVzcG9uc2l2ZS1jYXJvdXNlbC9saWIvc3R5bGVzL2Nhcm91c2VsLm1pbi5jc3NcIjtcbmltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmNvbnN0IEJ1aWxkZXJXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICYgPiAuY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuXG4gICAgICAgIHdpZHRoOiAke3AgPT4gcC53aWR0aH1weDtcbiAgICAgICAgaGVpZ2h0OiAke3AgPT4gcC5oZWlnaHR9cHg7XG4gICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcblxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAgICAgKixcbiAgICAgICAgKjo6YmVmb3JlLFxuICAgICAgICAqOjphZnRlciB7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgfVxuYDtcbmNvbnN0IFNpbXBsZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAqLFxuICAgICo6OmJlZm9yZSxcbiAgICAqOjphZnRlciB7XG4gICAgICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gICAgfVxuYDtcbmV4cG9ydCBjbGFzcyBCdWlsZGVyVGhlbWVXcmFwcGVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb250ZXh0LFxuICAgICAgY2hpbGRyZW4sXG4gICAgICAuLi5yZXN0XG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIF9qc3hzKF9GcmFnbWVudCwge1xuICAgICAgY2hpbGRyZW46IFtfanN4KEJ1aWxkZXJXcmFwcGVyLCB7XG4gICAgICAgIC4uLnJlc3QsXG4gICAgICAgIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwiY29udGVudFwiLFxuICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgICAgICB9KVxuICAgICAgfSksIF9qc3goXCJkaXZcIiwge1xuICAgICAgICBpZDogXCJwb3J0YWxcIlxuICAgICAgfSldXG4gICAgfSk7XG4gIH1cbn1cbkJ1aWxkZXJUaGVtZVdyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkJ1aWxkZXJUaGVtZVdyYXBwZXJcIjtcbmV4cG9ydCBjb25zdCBTaW1wbGVUaGVtZVdyYXBwZXIgPSBwID0+IHtcbiAgcmV0dXJuIF9qc3goU2ltcGxlV3JhcHBlciwge1xuICAgIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJjb250ZW50XCIsXG4gICAgICBjaGlsZHJlbjogcC5jaGlsZHJlblxuICAgIH0pXG4gIH0pO1xufTtcblNpbXBsZVRoZW1lV3JhcHBlci5kaXNwbGF5TmFtZSA9IFwiU2ltcGxlVGhlbWVXcmFwcGVyXCI7Il19*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_bubbles_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_bubbles_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_bubbles_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_bubbles_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_bubbles_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_drilldown_overlay_editor_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/drilldown-overlay-editor.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_drilldown_overlay_editor_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_drilldown_overlay_editor_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_drilldown_overlay_editor_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_drilldown_overlay_editor_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_image_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/image-overlay-editor-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_image_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_image_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_image_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_image_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_uri_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/data-grid-overlay-editor/private/uri-overlay-editor-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_uri_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_uri_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_uri_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_uri_overlay_editor_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/growing-entry/growing-entry-style.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/growing-entry/growing-entry-style.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_growing_entry_style_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/growing-entry/growing-entry-style.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_growing_entry_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_growing_entry_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_growing_entry_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_growing_entry_style_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/internal/markdown-div/private/markdown-container.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/markdown-div/private/markdown-container.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_container_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/internal/markdown-div/private/markdown-container.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_markdown_container_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ }),

/***/ "./packages/core/src/stories/story-utils.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/stories/story-utils.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_story_utils_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/stories/story-utils.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_story_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_story_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_story_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_story_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=7671.6cbb3cc7.iframe.bundle.js.map