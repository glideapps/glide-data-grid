"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[5174],{

/***/ "./packages/core/src/data-editor/stories/utils.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F9": () => (/* binding */ useMockDataGenerator),
/* harmony export */   "Gi": () => (/* binding */ PropName),
/* harmony export */   "MP": () => (/* binding */ clearCell),
/* harmony export */   "OX": () => (/* binding */ MoreInfo),
/* harmony export */   "YE": () => (/* binding */ ColumnAddButton),
/* harmony export */   "dk": () => (/* binding */ Description),
/* harmony export */   "et": () => (/* binding */ KeyName),
/* harmony export */   "fl": () => (/* binding */ useAllMockedKinds),
/* harmony export */   "lG": () => (/* binding */ defaultProps),
/* harmony export */   "m": () => (/* binding */ BeautifulWrapper),
/* harmony export */   "xl": () => (/* binding */ BeautifulStyle)
/* harmony export */ });
/* unused harmony exports lossyCopyData, getGridColumn, ContentCache */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./packages/core/src/internal/data-grid/data-grid-types.ts");
/* harmony import */ var _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/isArray.js");
/* harmony import */ var lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_support_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./packages/core/src/common/support.ts");
/* harmony import */ var _common_browser_detect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./packages/core/src/common/browser-detect.ts");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-resize-detector/build/index.esm.js");
/* harmony import */ var lodash_noop_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/noop.js");
/* harmony import */ var lodash_noop_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_noop_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react/jsx-runtime.js");











_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.seed */ .We.seed(1337);
function isTruthy(x) {
  return x ? true : false;
}
function lossyCopyData(source, target) {
  const sourceData = source.data;
  if (typeof sourceData === typeof target.data) {
    return {
      ...target,
      data: sourceData
    };
  } else switch (target.kind) {
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Uri */ .p6.Uri:
      {
        var _sourceData$toString;
        if (lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2___default()(sourceData)) {
          return {
            ...target,
            data: sourceData[0]
          };
        }
        return {
          ...target,
          data: (_sourceData$toString = sourceData === null || sourceData === void 0 ? void 0 : sourceData.toString()) !== null && _sourceData$toString !== void 0 ? _sourceData$toString : ""
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Boolean */ .p6.Boolean:
      {
        if (lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2___default()(sourceData)) {
          return {
            ...target,
            data: sourceData[0] !== undefined
          };
        } else if (source.kind === _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Boolean */ .p6.Boolean) {
          return {
            ...target,
            data: source.data
          };
        }
        return {
          ...target,
          data: isTruthy(sourceData) ? true : false
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Image */ .p6.Image:
      {
        var _sourceData$toString2;
        if (lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2___default()(sourceData)) {
          return {
            ...target,
            data: [sourceData[0]]
          };
        }
        return {
          ...target,
          data: [(_sourceData$toString2 = sourceData === null || sourceData === void 0 ? void 0 : sourceData.toString()) !== null && _sourceData$toString2 !== void 0 ? _sourceData$toString2 : ""]
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Number */ .p6.Number:
      {
        return {
          ...target,
          data: 0
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text:
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Markdown */ .p6.Markdown:
      {
        var _source$data$toString, _source$data;
        if (lodash_isArray_js__WEBPACK_IMPORTED_MODULE_2___default()(sourceData)) {
          var _sourceData$0$toStrin;
          return {
            ...target,
            data: (_sourceData$0$toStrin = sourceData[0].toString()) !== null && _sourceData$0$toStrin !== void 0 ? _sourceData$0$toStrin : ""
          };
        }
        return {
          ...target,
          data: (_source$data$toString = (_source$data = source.data) === null || _source$data === void 0 ? void 0 : _source$data.toString()) !== null && _source$data$toString !== void 0 ? _source$data$toString : ""
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Custom */ .p6.Custom:
      {
        return target;
      }
  }
  (0,_common_support_js__WEBPACK_IMPORTED_MODULE_6__/* .assertNever */ .vE)(target);
}
function getGridColumn(columnWithMock) {
  const {
    getContent,
    ...rest
  } = columnWithMock;
  return rest;
}
const ColumnAddButton = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__/* .styled */ .z)('div')({
  name: "ColumnAddButton",
  class: "c4uqbye",
  propsAsIs: false
});
const BeautifulStyle = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__/* .styled */ .z)('div')({
  name: "BeautifulStyle",
  class: "b1bsqg7n",
  propsAsIs: false
});
const PropName = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__/* .styled */ .z)('span')({
  name: "PropName",
  class: "piiq54i",
  propsAsIs: false
});
const Description = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__/* .styled */ .z)('p')({
  name: "Description",
  class: "d1k3yj19",
  propsAsIs: false
});
const MoreInfo = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__/* .styled */ .z)('p')({
  name: "MoreInfo",
  class: "m1j0dy02",
  propsAsIs: false
});
const BeautifulWrapper = p => {
  const {
    title,
    children,
    description,
    className,
    scale
  } = p;
  const {
    ref,
    width,
    height
  } = (0,react_resize_detector__WEBPACK_IMPORTED_MODULE_8__/* .useResizeDetector */ .NB)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(BeautifulStyle, {
    className: className + (_common_browser_detect_js__WEBPACK_IMPORTED_MODULE_9__/* .browserIsFirefox.value */ .uC.value ? " firefox" : ""),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
      children: title
    }), description, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      style: {
        scale
      },
      className: "sizer",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "sizer-clip",
        ref: ref,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          style: {
            position: "relative",
            width: width !== null && width !== void 0 ? width : 100,
            height: height !== null && height !== void 0 ? height : 100
          },
          children: children
        })
      })
    })]
  });
};
BeautifulWrapper.displayName = "BeautifulWrapper";
function createTextColumnInfo(index, group) {
  return {
    title: `Column ${index}`,
    id: `Column ${index}`,
    group: group ? `Group ${Math.round(index / 3)}` : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const text = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.lorem.word */ .We.lorem.word();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
        data: text,
        displayData: text,
        allowOverlay: true,
        readonly: true
      };
    }
  };
}
function getResizableColumns(amount, group) {
  const defaultColumns = [{
    title: "First name",
    id: "First name",
    group: group ? "Name" : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const firstName = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.name.firstName */ .We.name.firstName();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
        displayData: firstName,
        data: firstName,
        allowOverlay: true,
        readonly: true
      };
    }
  }, {
    title: "Last name",
    id: "Last name",
    group: group ? "Name" : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const lastName = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.name.lastName */ .We.name.lastName();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
        displayData: lastName,
        data: lastName,
        allowOverlay: true,
        readonly: true
      };
    }
  }, {
    title: "Avatar",
    id: "Avatar",
    group: group ? "Info" : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderImage */ .PE.HeaderImage,
    hasMenu: false,
    getContent: () => {
      const n = Math.round(Math.random() * 100);
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Image */ .p6.Image,
        data: [`https://picsum.photos/id/${n}/900/900`],
        displayData: [`https://picsum.photos/id/${n}/40/40`],
        allowOverlay: true,
        readonly: true
      };
    }
  }, {
    title: "Email",
    id: "Email",
    group: group ? "Info" : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const email = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.internet.email */ .We.internet.email();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
        displayData: email,
        data: email,
        allowOverlay: true,
        readonly: true
      };
    }
  }, {
    title: "Title",
    id: "Title",
    group: group ? "Info" : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const company = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.name.jobTitle */ .We.name.jobTitle();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
        displayData: company,
        data: company,
        allowOverlay: true,
        readonly: true
      };
    }
  }, {
    title: "More Info",
    id: "More Info",
    group: group ? "Info" : undefined,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderUri */ .PE.HeaderUri,
    hasMenu: false,
    getContent: () => {
      const url = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.internet.url */ .We.internet.url();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Uri */ .p6.Uri,
        displayData: url,
        data: url,
        hoverEffect: true,
        allowOverlay: true,
        readonly: true,
        onClickUri: a => {
          window.open(url, "_blank");
          a.preventDefault();
        }
      };
    }
  }];
  if (amount < defaultColumns.length) {
    return defaultColumns.slice(0, amount);
  }
  const extraColumnsAmount = amount - defaultColumns.length;
  const extraColumns = [...new Array(extraColumnsAmount)].map((_, index) => createTextColumnInfo(index + defaultColumns.length, group));
  return [...defaultColumns, ...extraColumns];
}
class ContentCache {
  constructor() {
    this.cachedContent = new Map();
  }
  get(col, row) {
    const colCache = this.cachedContent.get(col);
    if (colCache === undefined) {
      return undefined;
    }
    return colCache[row];
  }
  set(col, row, value) {
    let rowCache = this.cachedContent.get(col);
    if (rowCache === undefined) {
      this.cachedContent.set(col, rowCache = []);
    }
    rowCache[row] = value;
  }
}
function useMockDataGenerator(numCols) {
  let readonly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let group = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const cache = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new ContentCache());
  const [colsMap, setColsMap] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => getResizableColumns(numCols, group));
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    setColsMap(getResizableColumns(numCols, group));
  }, [group, numCols]);
  const onColumnResize = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((column, newSize) => {
    setColsMap(prevColsMap => {
      const index = prevColsMap.findIndex(ci => ci.title === column.title);
      const newArray = [...prevColsMap];
      newArray.splice(index, 1, {
        ...prevColsMap[index],
        width: newSize
      });
      return newArray;
    });
  }, []);
  const cols = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return colsMap.map(getGridColumn);
  }, [colsMap]);
  const colsMapRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(colsMap);
  colsMapRef.current = colsMap;
  const getCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(_ref => {
    let [col, row] = _ref;
    let val = cache.current.get(col, row);
    if (val === undefined) {
      val = colsMapRef.current[col].getContent();
      if (!readonly && (0,_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .isTextEditableGridCell */ .f)(val)) {
        val = {
          ...val,
          readonly
        };
      }
      cache.current.set(col, row, val);
    }
    return val;
  }, [readonly]);
  const setCellValueRaw = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((_ref2, val) => {
    let [col, row] = _ref2;
    cache.current.set(col, row, val);
  }, []);
  const setCellValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((_ref3, val) => {
    let [col, row] = _ref3;
    let current = cache.current.get(col, row);
    if (current === undefined) {
      current = colsMap[col].getContent();
    }
    if ((0,_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .isEditableGridCell */ .T9)(val) && (0,_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .isEditableGridCell */ .T9)(current)) {
      const copied = lossyCopyData(val, current);
      cache.current.set(col, row, {
        ...copied,
        displayData: typeof copied.data === "string" ? copied.data : copied.displayData,
        lastUpdated: performance.now()
      });
    }
  }, [colsMap]);
  return {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue,
    setCellValueRaw
  };
}
const KeyName = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__/* .styled */ .z)('kbd')({
  name: "KeyName",
  class: "kcvwzr4",
  propsAsIs: false
});
const defaultProps = {
  smoothScrollX: true,
  smoothScrollY: true,
  getCellsForSelection: true,
  width: "100%"
};
function clearCell(cell) {
  switch (cell.kind) {
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Boolean */ .p6.Boolean:
      {
        return {
          ...cell,
          data: false
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Image */ .p6.Image:
      {
        return {
          ...cell,
          data: [],
          displayData: []
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Drilldown */ .p6.Drilldown:
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Bubble */ .p6.Bubble:
      {
        return {
          ...cell,
          data: []
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Uri */ .p6.Uri:
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Markdown */ .p6.Markdown:
      {
        return {
          ...cell,
          data: ""
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text:
      {
        return {
          ...cell,
          data: "",
          displayData: ""
        };
      }
    case _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Number */ .p6.Number:
      {
        return {
          ...cell,
          data: 0,
          displayData: ""
        };
      }
  }
  return cell;
}
function getColumnsForCellTypes() {
  return [{
    title: "Row ID",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderRowID */ .PE.HeaderRowID,
    hasMenu: false,
    getContent: () => {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.RowID */ .p6.RowID,
        data: _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.datatype.uuid */ .We.datatype.uuid(),
        allowOverlay: true
      };
    }
  }, {
    title: "Protected",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderCode */ .PE.HeaderCode,
    hasMenu: false,
    getContent: () => {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Protected */ .p6.Protected,
        data: _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.finance.bitcoinAddress */ .We.finance.bitcoinAddress(),
        allowOverlay: false
      };
    }
  }, {
    title: "Loading",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderString */ .PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Loading */ .p6.Loading,
        allowOverlay: false,
        skeletonWidth: 70,
        skeletonWidthVariability: 25
      };
    }
  }, {
    title: "Text",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderCode */ .PE.HeaderCode,
    hasMenu: false,
    getContent: () => {
      const name = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.name.firstName */ .We.name.firstName();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Text */ .p6.Text,
        data: name,
        displayData: name,
        allowOverlay: true
      };
    }
  }, {
    title: "Number",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderNumber */ .PE.HeaderNumber,
    hasMenu: false,
    getContent: () => {
      const age = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.datatype.number */ .We.datatype.number(100);
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Number */ .p6.Number,
        data: age,
        displayData: `${age}`,
        allowOverlay: true
      };
    }
  }, {
    title: "Boolean",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderBoolean */ .PE.HeaderBoolean,
    hasMenu: false,
    getContent: () => {
      const roll = Math.random();
      const checked = roll < 0.1 ? undefined : roll < 0.2 ? null : roll < 0.6;
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Boolean */ .p6.Boolean,
        data: checked,
        allowOverlay: false,
        readonly: false
      };
    }
  }, {
    title: "Image",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderImage */ .PE.HeaderImage,
    hasMenu: false,
    getContent: () => {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Image */ .p6.Image,
        data: [`${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.image.animals */ .We.image.animals(40, 40)}?random=${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.datatype.number */ .We.datatype.number(100000)}`],
        allowOverlay: true,
        readonly: true
      };
    }
  }, {
    title: "Uri",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderUri */ .PE.HeaderUri,
    hasMenu: false,
    getContent: () => {
      const url = _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.internet.url */ .We.internet.url();
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Uri */ .p6.Uri,
        data: url,
        allowOverlay: true
      };
    }
  }, {
    title: "Markdown",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderMarkdown */ .PE.HeaderMarkdown,
    hasMenu: false,
    getContent: () => {
      const markdown = `# Title
Hello my name is *${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.name.firstName */ .We.name.firstName()}*

## TODO:
Try out [Glide](https://www.glideapps.com/)
`;
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Markdown */ .p6.Markdown,
        data: markdown,
        allowOverlay: true
      };
    }
  }, {
    title: "Bubble",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderArray */ .PE.HeaderArray,
    hasMenu: false,
    getContent: () => {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Bubble */ .p6.Bubble,
        data: [_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.lorem.word */ .We.lorem.word(), _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.lorem.word */ .We.lorem.word(), _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.lorem.word */ .We.lorem.word()],
        allowOverlay: true
      };
    }
  }, {
    title: "Drilldown",
    width: 120,
    icon: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridColumnIcon.HeaderArray */ .PE.HeaderArray,
    hasMenu: false,
    getContent: () => {
      return {
        kind: _internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .GridCellKind.Drilldown */ .p6.Drilldown,
        data: [{
          text: _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.address.cityName */ .We.address.cityName(),
          img: `${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.image.nature */ .We.image.nature(40, 40)}?random=${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.datatype.number */ .We.datatype.number(100000)}`
        }, {
          text: _faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.address.cityName */ .We.address.cityName(),
          img: `${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.image.nature */ .We.image.nature(40, 40)}?random=${_faker_js_faker__WEBPACK_IMPORTED_MODULE_1__/* .faker.datatype.number */ .We.datatype.number(100000)}`
        }],
        allowOverlay: true
      };
    }
  }];
}
function useAllMockedKinds() {
  const cache = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new ContentCache());
  const [colsMap, setColsMap] = react__WEBPACK_IMPORTED_MODULE_0__.useState(getColumnsForCellTypes);
  const onColumnResize = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((column, newSize) => {
    setColsMap(prevColsMap => {
      const index = prevColsMap.findIndex(ci => ci.title === column.title);
      const newArray = [...prevColsMap];
      newArray.splice(index, 1, {
        ...prevColsMap[index],
        width: newSize
      });
      return newArray;
    });
  }, []);
  const cols = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return colsMap.map(getGridColumn);
  }, [colsMap]);
  const [updateVersion, setUpdateVersion] = react__WEBPACK_IMPORTED_MODULE_0__.useState(0);
  const getCellContent = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(_ref4 => {
    let [col, row] = _ref4;
    lodash_noop_js__WEBPACK_IMPORTED_MODULE_3___default()(updateVersion);
    let val = cache.current.get(col, row);
    if (val === undefined) {
      val = colsMap[col].getContent();
      cache.current.set(col, row, val);
    }
    return val;
  }, [colsMap, updateVersion]);
  const setCellValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((_ref5, val, noDisplay, forceUpdate) => {
    let [col, row] = _ref5;
    let current = cache.current.get(col, row);
    if (current === undefined) {
      current = colsMap[col].getContent();
    }
    if ((0,_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .isEditableGridCell */ .T9)(val) && (0,_internal_data_grid_data_grid_types_js__WEBPACK_IMPORTED_MODULE_5__/* .isEditableGridCell */ .T9)(current)) {
      var _copied$data$toString, _copied$data;
      const copied = lossyCopyData(val, current);
      cache.current.set(col, row, {
        ...copied,
        displayData: noDisplay === true ? undefined : (_copied$data$toString = (_copied$data = copied.data) === null || _copied$data === void 0 ? void 0 : _copied$data.toString()) !== null && _copied$data$toString !== void 0 ? _copied$data$toString : ""
      });
      if (forceUpdate === true) {
        setUpdateVersion(v => v + 1);
      }
    }
  }, [colsMap]);
  return {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  };
}

__webpack_require__("./packages/core/src/data-editor/stories/utils.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/stories/utils.tsx");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/stories/utils.tsx":
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
___CSS_LOADER_EXPORT___.push([module.id, ".c4uqbye{width:120px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:#f1f1f1;height:100%;}.c4uqbye button{border:none;outline:none;height:37px;width:120px;font-size:20px;background-color:#f7f7f8;color:#000000dd;border-bottom:1px solid #e1e2e5;-webkit-transition:background-color 200ms;transition:background-color 200ms;cursor:pointer;}.c4uqbye button:hover{background-color:#efeff1;}\n.b1bsqg7n{background-color:#2790b9;background:linear-gradient(90deg,#2790b9,#2070a9);color:white;padding:32px 48px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100vh;font-family:sans-serif;}.b1bsqg7n.double{height:200vh;}.b1bsqg7n > h1{font-size:50px;font-weight:600;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 12px 0;}.b1bsqg7n .sizer{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;background-color:white;border-radius:12px;box-shadow: rgba(9,30,66,0.25) 0px 4px 8px -2px, rgba(9,30,66,0.08) 0px 0px 0px 1px;}.b1bsqg7n .sizer .sizer-clip{border-radius:12px;overflow:hidden;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);height:100%;}.b1bsqg7n.firefox .sizer{border-radius:0;box-shadow:unset;}.b1bsqg7n.firefox .sizer .sizer-clip{border-radius:0;}.b1bsqg7n .white{background-color:white;}\n.piiq54i{font-family:monospace;font-weight:500;color:#ffe394;}\n.d1k3yj19{font-size:18px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}\n.m1j0dy02{font-size:14px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}.m1j0dy02 button{background-color:#f4f4f4;color:#2b2b2b;padding:2px 6px;font-family:monospace;font-size:14px;border-radius:4px;box-shadow:0px 1px 2px #00000040;margin:0 0.1em;border:none;cursor:pointer;}\n.kcvwzr4{background-color:#f4f4f4;color:#2b2b2b;padding:2px 6px;font-family:monospace;font-size:14px;border-radius:4px;box-shadow:0px 1px 2px #00000040;margin:0 0.1em;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvZGF0YS1lZGl0b3Ivc3Rvcmllcy91dGlscy50c3giXSwibmFtZXMiOlsiLmM0dXFieWUiLCIuYjFic3FnN24iLCIucGlpcTU0aSIsIi5kMWszeWoxOSIsIi5tMWowZHkwMiIsIi5rY3Z3enI0Il0sIm1hcHBpbmdzIjoiQUEwRytCQTtBQXdCREM7QUF3RE5DO0FBS0dDO0FBS0hDO0FBOFFEQyIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2RhdGEtZWRpdG9yL3N0b3JpZXMvdXRpbHMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBHcmlkQ2VsbEtpbmQsIEdyaWRDb2x1bW5JY29uLCBpc0VkaXRhYmxlR3JpZENlbGwsIGlzVGV4dEVkaXRhYmxlR3JpZENlbGwgfSBmcm9tIFwiLi4vLi4vaW50ZXJuYWwvZGF0YS1ncmlkL2RhdGEtZ3JpZC10eXBlcy5qc1wiO1xuaW1wb3J0IHsgZmFrZXIgfSBmcm9tIFwiQGZha2VyLWpzL2Zha2VyXCI7XG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmltcG9ydCBpc0FycmF5IGZyb20gXCJsb2Rhc2gvaXNBcnJheS5qc1wiO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N1cHBvcnQuanNcIjtcbmltcG9ydCB7IGJyb3dzZXJJc0ZpcmVmb3ggfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Jyb3dzZXItZGV0ZWN0LmpzXCI7XG5pbXBvcnQgeyB1c2VSZXNpemVEZXRlY3RvciB9IGZyb20gXCJyZWFjdC1yZXNpemUtZGV0ZWN0b3JcIjtcbmltcG9ydCBub29wIGZyb20gXCJsb2Rhc2gvbm9vcC5qc1wiO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZha2VyLnNlZWQoMTMzNyk7XG5mdW5jdGlvbiBpc1RydXRoeSh4KSB7XG4gIHJldHVybiB4ID8gdHJ1ZSA6IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxvc3N5Q29weURhdGEoc291cmNlLCB0YXJnZXQpIHtcbiAgY29uc3Qgc291cmNlRGF0YSA9IHNvdXJjZS5kYXRhO1xuICBpZiAodHlwZW9mIHNvdXJjZURhdGEgPT09IHR5cGVvZiB0YXJnZXQuZGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50YXJnZXQsXG4gICAgICBkYXRhOiBzb3VyY2VEYXRhXG4gICAgfTtcbiAgfSBlbHNlIHN3aXRjaCAodGFyZ2V0LmtpbmQpIHtcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5Vcmk6XG4gICAgICB7XG4gICAgICAgIHZhciBfc291cmNlRGF0YSR0b1N0cmluZztcbiAgICAgICAgaWYgKGlzQXJyYXkoc291cmNlRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGFyZ2V0LFxuICAgICAgICAgICAgZGF0YTogc291cmNlRGF0YVswXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgZGF0YTogKF9zb3VyY2VEYXRhJHRvU3RyaW5nID0gc291cmNlRGF0YSA9PT0gbnVsbCB8fCBzb3VyY2VEYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2VEYXRhLnRvU3RyaW5nKCkpICE9PSBudWxsICYmIF9zb3VyY2VEYXRhJHRvU3RyaW5nICE9PSB2b2lkIDAgPyBfc291cmNlRGF0YSR0b1N0cmluZyA6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5Cb29sZWFuOlxuICAgICAge1xuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2VEYXRhKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgICBkYXRhOiBzb3VyY2VEYXRhWzBdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5raW5kID09PSBHcmlkQ2VsbEtpbmQuQm9vbGVhbikge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgICBkYXRhOiBzb3VyY2UuZGF0YVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgZGF0YTogaXNUcnV0aHkoc291cmNlRGF0YSkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5JbWFnZTpcbiAgICAgIHtcbiAgICAgICAgdmFyIF9zb3VyY2VEYXRhJHRvU3RyaW5nMjtcbiAgICAgICAgaWYgKGlzQXJyYXkoc291cmNlRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGFyZ2V0LFxuICAgICAgICAgICAgZGF0YTogW3NvdXJjZURhdGFbMF1dXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgICBkYXRhOiBbKF9zb3VyY2VEYXRhJHRvU3RyaW5nMiA9IHNvdXJjZURhdGEgPT09IG51bGwgfHwgc291cmNlRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlRGF0YS50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfc291cmNlRGF0YSR0b1N0cmluZzIgIT09IHZvaWQgMCA/IF9zb3VyY2VEYXRhJHRvU3RyaW5nMiA6IFwiXCJdXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBHcmlkQ2VsbEtpbmQuTnVtYmVyOlxuICAgICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgICBkYXRhOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBHcmlkQ2VsbEtpbmQuVGV4dDpcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5NYXJrZG93bjpcbiAgICAgIHtcbiAgICAgICAgdmFyIF9zb3VyY2UkZGF0YSR0b1N0cmluZywgX3NvdXJjZSRkYXRhO1xuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2VEYXRhKSkge1xuICAgICAgICAgIHZhciBfc291cmNlRGF0YSQwJHRvU3RyaW47XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgICAgIGRhdGE6IChfc291cmNlRGF0YSQwJHRvU3RyaW4gPSBzb3VyY2VEYXRhWzBdLnRvU3RyaW5nKCkpICE9PSBudWxsICYmIF9zb3VyY2VEYXRhJDAkdG9TdHJpbiAhPT0gdm9pZCAwID8gX3NvdXJjZURhdGEkMCR0b1N0cmluIDogXCJcIlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgZGF0YTogKF9zb3VyY2UkZGF0YSR0b1N0cmluZyA9IChfc291cmNlJGRhdGEgPSBzb3VyY2UuZGF0YSkgPT09IG51bGwgfHwgX3NvdXJjZSRkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc291cmNlJGRhdGEudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX3NvdXJjZSRkYXRhJHRvU3RyaW5nICE9PSB2b2lkIDAgPyBfc291cmNlJGRhdGEkdG9TdHJpbmcgOiBcIlwiXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBHcmlkQ2VsbEtpbmQuQ3VzdG9tOlxuICAgICAge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICB9XG4gIGFzc2VydE5ldmVyKHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JpZENvbHVtbihjb2x1bW5XaXRoTW9jaykge1xuICBjb25zdCB7XG4gICAgZ2V0Q29udGVudCxcbiAgICAuLi5yZXN0XG4gIH0gPSBjb2x1bW5XaXRoTW9jaztcbiAgcmV0dXJuIHJlc3Q7XG59XG5leHBvcnQgY29uc3QgQ29sdW1uQWRkQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgICB3aWR0aDogMTIwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJ1dHRvbiB7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgaGVpZ2h0OiAzN3B4O1xuICAgICAgICB3aWR0aDogMTIwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmODtcbiAgICAgICAgY29sb3I6ICMwMDAwMDBkZDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMWUyZTU7XG5cbiAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAyMDBtcztcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIDpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmYxO1xuICAgICAgICB9XG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCBCZWF1dGlmdWxTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI3OTBiOTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMyNzkwYjksICMyMDcwYTkpO1xuICAgIGNvbG9yOiB3aGl0ZTtcblxuICAgIHBhZGRpbmc6IDMycHggNDhweDtcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG5cbiAgICAmLmRvdWJsZSB7XG4gICAgICAgIGhlaWdodDogMjAwdmg7XG4gICAgfVxuXG4gICAgJiA+IGgxIHtcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgbWFyZ2luOiAwIDAgMTJweCAwO1xuICAgIH1cblxuICAgIC5zaXplciB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcblxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcblxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICBib3gtc2hhZG93OlxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMjUpIDBweCA0cHggOHB4IC0ycHgsXG4gICAgICAgICAgICByZ2JhKDksIDMwLCA2NiwgMC4wOCkgMHB4IDBweCAwcHggMXB4O1xuXG4gICAgICAgIC5zaXplci1jbGlwIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xuXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAmLmZpcmVmb3ggLnNpemVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgYm94LXNoYWRvdzogdW5zZXQ7XG5cbiAgICAgICAgLnNpemVyLWNsaXAge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC53aGl0ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbmA7XG5leHBvcnQgY29uc3QgUHJvcE5hbWUgPSBzdHlsZWQuc3BhbmBcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY29sb3I6ICNmZmUzOTQ7XG5gO1xuZXhwb3J0IGNvbnN0IERlc2NyaXB0aW9uID0gc3R5bGVkLnBgXG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbmA7XG5leHBvcnQgY29uc3QgTW9yZUluZm8gPSBzdHlsZWQucGBcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICAgICAgY29sb3I6ICMyYjJiMmI7XG4gICAgICAgIHBhZGRpbmc6IDJweCA2cHg7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XG4gICAgICAgIG1hcmdpbjogMCAwLjFlbTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCBCZWF1dGlmdWxXcmFwcGVyID0gcCA9PiB7XG4gIGNvbnN0IHtcbiAgICB0aXRsZSxcbiAgICBjaGlsZHJlbixcbiAgICBkZXNjcmlwdGlvbixcbiAgICBjbGFzc05hbWUsXG4gICAgc2NhbGVcbiAgfSA9IHA7XG4gIGNvbnN0IHtcbiAgICByZWYsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0XG4gIH0gPSB1c2VSZXNpemVEZXRlY3RvcigpO1xuICByZXR1cm4gX2pzeHMoQmVhdXRpZnVsU3R5bGUsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSArIChicm93c2VySXNGaXJlZm94LnZhbHVlID8gXCIgZmlyZWZveFwiIDogXCJcIiksXG4gICAgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwge1xuICAgICAgY2hpbGRyZW46IHRpdGxlXG4gICAgfSksIGRlc2NyaXB0aW9uLCBfanN4KFwiZGl2XCIsIHtcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHNjYWxlXG4gICAgICB9LFxuICAgICAgY2xhc3NOYW1lOiBcInNpemVyXCIsXG4gICAgICBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJzaXplci1jbGlwXCIsXG4gICAgICAgIHJlZjogcmVmLFxuICAgICAgICBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7XG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGggIT09IG51bGwgJiYgd2lkdGggIT09IHZvaWQgMCA/IHdpZHRoIDogMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgIT09IG51bGwgJiYgaGVpZ2h0ICE9PSB2b2lkIDAgPyBoZWlnaHQgOiAxMDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KV1cbiAgfSk7XG59O1xuQmVhdXRpZnVsV3JhcHBlci5kaXNwbGF5TmFtZSA9IFwiQmVhdXRpZnVsV3JhcHBlclwiO1xuZnVuY3Rpb24gY3JlYXRlVGV4dENvbHVtbkluZm8oaW5kZXgsIGdyb3VwKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IGBDb2x1bW4gJHtpbmRleH1gLFxuICAgIGlkOiBgQ29sdW1uICR7aW5kZXh9YCxcbiAgICBncm91cDogZ3JvdXAgPyBgR3JvdXAgJHtNYXRoLnJvdW5kKGluZGV4IC8gMyl9YCA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJTdHJpbmcsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGZha2VyLmxvcmVtLndvcmQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkYXRhOiB0ZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogdGV4dCxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxuICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBnZXRSZXNpemFibGVDb2x1bW5zKGFtb3VudCwgZ3JvdXApIHtcbiAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSBbe1xuICAgIHRpdGxlOiBcIkZpcnN0IG5hbWVcIixcbiAgICBpZDogXCJGaXJzdCBuYW1lXCIsXG4gICAgZ3JvdXA6IGdyb3VwID8gXCJOYW1lXCIgOiB1bmRlZmluZWQsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyU3RyaW5nLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGZha2VyLm5hbWUuZmlyc3ROYW1lKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuVGV4dCxcbiAgICAgICAgZGlzcGxheURhdGE6IGZpcnN0TmFtZSxcbiAgICAgICAgZGF0YTogZmlyc3ROYW1lLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkxhc3QgbmFtZVwiLFxuICAgIGlkOiBcIkxhc3QgbmFtZVwiLFxuICAgIGdyb3VwOiBncm91cCA/IFwiTmFtZVwiIDogdW5kZWZpbmVkLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlclN0cmluZyxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0TmFtZSA9IGZha2VyLm5hbWUubGFzdE5hbWUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogbGFzdE5hbWUsXG4gICAgICAgIGRhdGE6IGxhc3ROYW1lLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkF2YXRhclwiLFxuICAgIGlkOiBcIkF2YXRhclwiLFxuICAgIGdyb3VwOiBncm91cCA/IFwiSW5mb1wiIDogdW5kZWZpbmVkLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlckltYWdlLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IG4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLkltYWdlLFxuICAgICAgICBkYXRhOiBbYGh0dHBzOi8vcGljc3VtLnBob3Rvcy9pZC8ke259LzkwMC85MDBgXSxcbiAgICAgICAgZGlzcGxheURhdGE6IFtgaHR0cHM6Ly9waWNzdW0ucGhvdG9zL2lkLyR7bn0vNDAvNDBgXSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxuICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJFbWFpbFwiLFxuICAgIGlkOiBcIkVtYWlsXCIsXG4gICAgZ3JvdXA6IGdyb3VwID8gXCJJbmZvXCIgOiB1bmRlZmluZWQsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyU3RyaW5nLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGVtYWlsID0gZmFrZXIuaW50ZXJuZXQuZW1haWwoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogZW1haWwsXG4gICAgICAgIGRhdGE6IGVtYWlsLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIlRpdGxlXCIsXG4gICAgaWQ6IFwiVGl0bGVcIixcbiAgICBncm91cDogZ3JvdXAgPyBcIkluZm9cIiA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJTdHJpbmcsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgY29uc3QgY29tcGFueSA9IGZha2VyLm5hbWUuam9iVGl0bGUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogY29tcGFueSxcbiAgICAgICAgZGF0YTogY29tcGFueSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxuICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJNb3JlIEluZm9cIixcbiAgICBpZDogXCJNb3JlIEluZm9cIixcbiAgICBncm91cDogZ3JvdXAgPyBcIkluZm9cIiA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJVcmksXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gZmFrZXIuaW50ZXJuZXQudXJsKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuVXJpLFxuICAgICAgICBkaXNwbGF5RGF0YTogdXJsLFxuICAgICAgICBkYXRhOiB1cmwsXG4gICAgICAgIGhvdmVyRWZmZWN0OiB0cnVlLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICBvbkNsaWNrVXJpOiBhID0+IHtcbiAgICAgICAgICB3aW5kb3cub3Blbih1cmwsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgIGEucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1dO1xuICBpZiAoYW1vdW50IDwgZGVmYXVsdENvbHVtbnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRDb2x1bW5zLnNsaWNlKDAsIGFtb3VudCk7XG4gIH1cbiAgY29uc3QgZXh0cmFDb2x1bW5zQW1vdW50ID0gYW1vdW50IC0gZGVmYXVsdENvbHVtbnMubGVuZ3RoO1xuICBjb25zdCBleHRyYUNvbHVtbnMgPSBbLi4ubmV3IEFycmF5KGV4dHJhQ29sdW1uc0Ftb3VudCldLm1hcCgoXywgaW5kZXgpID0+IGNyZWF0ZVRleHRDb2x1bW5JbmZvKGluZGV4ICsgZGVmYXVsdENvbHVtbnMubGVuZ3RoLCBncm91cCkpO1xuICByZXR1cm4gWy4uLmRlZmF1bHRDb2x1bW5zLCAuLi5leHRyYUNvbHVtbnNdO1xufVxuZXhwb3J0IGNsYXNzIENvbnRlbnRDYWNoZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FjaGVkQ29udGVudCA9IG5ldyBNYXAoKTtcbiAgfVxuICBnZXQoY29sLCByb3cpIHtcbiAgICBjb25zdCBjb2xDYWNoZSA9IHRoaXMuY2FjaGVkQ29udGVudC5nZXQoY29sKTtcbiAgICBpZiAoY29sQ2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbENhY2hlW3Jvd107XG4gIH1cbiAgc2V0KGNvbCwgcm93LCB2YWx1ZSkge1xuICAgIGxldCByb3dDYWNoZSA9IHRoaXMuY2FjaGVkQ29udGVudC5nZXQoY29sKTtcbiAgICBpZiAocm93Q2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jYWNoZWRDb250ZW50LnNldChjb2wsIHJvd0NhY2hlID0gW10pO1xuICAgIH1cbiAgICByb3dDYWNoZVtyb3ddID0gdmFsdWU7XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb2NrRGF0YUdlbmVyYXRvcihudW1Db2xzKSB7XG4gIGxldCByZWFkb25seSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcbiAgbGV0IGdyb3VwID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgY29uc3QgY2FjaGUgPSBSZWFjdC51c2VSZWYobmV3IENvbnRlbnRDYWNoZSgpKTtcbiAgY29uc3QgW2NvbHNNYXAsIHNldENvbHNNYXBdID0gUmVhY3QudXNlU3RhdGUoKCkgPT4gZ2V0UmVzaXphYmxlQ29sdW1ucyhudW1Db2xzLCBncm91cCkpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldENvbHNNYXAoZ2V0UmVzaXphYmxlQ29sdW1ucyhudW1Db2xzLCBncm91cCkpO1xuICB9LCBbZ3JvdXAsIG51bUNvbHNdKTtcbiAgY29uc3Qgb25Db2x1bW5SZXNpemUgPSBSZWFjdC51c2VDYWxsYmFjaygoY29sdW1uLCBuZXdTaXplKSA9PiB7XG4gICAgc2V0Q29sc01hcChwcmV2Q29sc01hcCA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHByZXZDb2xzTWFwLmZpbmRJbmRleChjaSA9PiBjaS50aXRsZSA9PT0gY29sdW1uLnRpdGxlKTtcbiAgICAgIGNvbnN0IG5ld0FycmF5ID0gWy4uLnByZXZDb2xzTWFwXTtcbiAgICAgIG5ld0FycmF5LnNwbGljZShpbmRleCwgMSwge1xuICAgICAgICAuLi5wcmV2Q29sc01hcFtpbmRleF0sXG4gICAgICAgIHdpZHRoOiBuZXdTaXplXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBjb2xzID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGNvbHNNYXAubWFwKGdldEdyaWRDb2x1bW4pO1xuICB9LCBbY29sc01hcF0pO1xuICBjb25zdCBjb2xzTWFwUmVmID0gUmVhY3QudXNlUmVmKGNvbHNNYXApO1xuICBjb2xzTWFwUmVmLmN1cnJlbnQgPSBjb2xzTWFwO1xuICBjb25zdCBnZXRDZWxsQ29udGVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKF9yZWYgPT4ge1xuICAgIGxldCBbY29sLCByb3ddID0gX3JlZjtcbiAgICBsZXQgdmFsID0gY2FjaGUuY3VycmVudC5nZXQoY29sLCByb3cpO1xuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsID0gY29sc01hcFJlZi5jdXJyZW50W2NvbF0uZ2V0Q29udGVudCgpO1xuICAgICAgaWYgKCFyZWFkb25seSAmJiBpc1RleHRFZGl0YWJsZUdyaWRDZWxsKHZhbCkpIHtcbiAgICAgICAgdmFsID0ge1xuICAgICAgICAgIC4uLnZhbCxcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY2FjaGUuY3VycmVudC5zZXQoY29sLCByb3csIHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH0sIFtyZWFkb25seV0pO1xuICBjb25zdCBzZXRDZWxsVmFsdWVSYXcgPSBSZWFjdC51c2VDYWxsYmFjaygoX3JlZjIsIHZhbCkgPT4ge1xuICAgIGxldCBbY29sLCByb3ddID0gX3JlZjI7XG4gICAgY2FjaGUuY3VycmVudC5zZXQoY29sLCByb3csIHZhbCk7XG4gIH0sIFtdKTtcbiAgY29uc3Qgc2V0Q2VsbFZhbHVlID0gUmVhY3QudXNlQ2FsbGJhY2soKF9yZWYzLCB2YWwpID0+IHtcbiAgICBsZXQgW2NvbCwgcm93XSA9IF9yZWYzO1xuICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudC5nZXQoY29sLCByb3cpO1xuICAgIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnQgPSBjb2xzTWFwW2NvbF0uZ2V0Q29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoaXNFZGl0YWJsZUdyaWRDZWxsKHZhbCkgJiYgaXNFZGl0YWJsZUdyaWRDZWxsKGN1cnJlbnQpKSB7XG4gICAgICBjb25zdCBjb3BpZWQgPSBsb3NzeUNvcHlEYXRhKHZhbCwgY3VycmVudCk7XG4gICAgICBjYWNoZS5jdXJyZW50LnNldChjb2wsIHJvdywge1xuICAgICAgICAuLi5jb3BpZWQsXG4gICAgICAgIGRpc3BsYXlEYXRhOiB0eXBlb2YgY29waWVkLmRhdGEgPT09IFwic3RyaW5nXCIgPyBjb3BpZWQuZGF0YSA6IGNvcGllZC5kaXNwbGF5RGF0YSxcbiAgICAgICAgbGFzdFVwZGF0ZWQ6IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFtjb2xzTWFwXSk7XG4gIHJldHVybiB7XG4gICAgY29scyxcbiAgICBnZXRDZWxsQ29udGVudCxcbiAgICBvbkNvbHVtblJlc2l6ZSxcbiAgICBzZXRDZWxsVmFsdWUsXG4gICAgc2V0Q2VsbFZhbHVlUmF3XG4gIH07XG59XG5leHBvcnQgY29uc3QgS2V5TmFtZSA9IHN0eWxlZC5rYmRgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICBjb2xvcjogIzJiMmIyYjtcbiAgICBwYWRkaW5nOiAycHggNnB4O1xuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XG4gICAgbWFyZ2luOiAwIDAuMWVtO1xuYDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIHNtb290aFNjcm9sbFg6IHRydWUsXG4gIHNtb290aFNjcm9sbFk6IHRydWUsXG4gIGdldENlbGxzRm9yU2VsZWN0aW9uOiB0cnVlLFxuICB3aWR0aDogXCIxMDAlXCJcbn07XG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDZWxsKGNlbGwpIHtcbiAgc3dpdGNoIChjZWxsLmtpbmQpIHtcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5Cb29sZWFuOlxuICAgICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmNlbGwsXG4gICAgICAgICAgZGF0YTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5JbWFnZTpcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jZWxsLFxuICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgIGRpc3BsYXlEYXRhOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIGNhc2UgR3JpZENlbGxLaW5kLkRyaWxsZG93bjpcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5CdWJibGU6XG4gICAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY2VsbCxcbiAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIGNhc2UgR3JpZENlbGxLaW5kLlVyaTpcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5NYXJrZG93bjpcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jZWxsLFxuICAgICAgICAgIGRhdGE6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5UZXh0OlxuICAgICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmNlbGwsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgICBkaXNwbGF5RGF0YTogXCJcIlxuICAgICAgICB9O1xuICAgICAgfVxuICAgIGNhc2UgR3JpZENlbGxLaW5kLk51bWJlcjpcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jZWxsLFxuICAgICAgICAgIGRhdGE6IDAsXG4gICAgICAgICAgZGlzcGxheURhdGE6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbDtcbn1cbmZ1bmN0aW9uIGdldENvbHVtbnNGb3JDZWxsVHlwZXMoKSB7XG4gIHJldHVybiBbe1xuICAgIHRpdGxlOiBcIlJvdyBJRFwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyUm93SUQsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlJvd0lELFxuICAgICAgICBkYXRhOiBmYWtlci5kYXRhdHlwZS51dWlkKCksXG4gICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJQcm90ZWN0ZWRcIixcbiAgICB3aWR0aDogMTIwLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlckNvZGUsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlByb3RlY3RlZCxcbiAgICAgICAgZGF0YTogZmFrZXIuZmluYW5jZS5iaXRjb2luQWRkcmVzcygpLFxuICAgICAgICBhbGxvd092ZXJsYXk6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkxvYWRpbmdcIixcbiAgICB3aWR0aDogMTIwLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlclN0cmluZyxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuTG9hZGluZyxcbiAgICAgICAgYWxsb3dPdmVybGF5OiBmYWxzZSxcbiAgICAgICAgc2tlbGV0b25XaWR0aDogNzAsXG4gICAgICAgIHNrZWxldG9uV2lkdGhWYXJpYWJpbGl0eTogMjVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAgdGl0bGU6IFwiVGV4dFwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyQ29kZSxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gZmFrZXIubmFtZS5maXJzdE5hbWUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkYXRhOiBuYW1lLFxuICAgICAgICBkaXNwbGF5RGF0YTogbmFtZSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIk51bWJlclwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyTnVtYmVyLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGFnZSA9IGZha2VyLmRhdGF0eXBlLm51bWJlcigxMDApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLk51bWJlcixcbiAgICAgICAgZGF0YTogYWdlLFxuICAgICAgICBkaXNwbGF5RGF0YTogYCR7YWdlfWAsXG4gICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJCb29sZWFuXCIsXG4gICAgd2lkdGg6IDEyMCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJCb29sZWFuLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IHJvbGwgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3QgY2hlY2tlZCA9IHJvbGwgPCAwLjEgPyB1bmRlZmluZWQgOiByb2xsIDwgMC4yID8gbnVsbCA6IHJvbGwgPCAwLjY7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuQm9vbGVhbixcbiAgICAgICAgZGF0YTogY2hlY2tlZCxcbiAgICAgICAgYWxsb3dPdmVybGF5OiBmYWxzZSxcbiAgICAgICAgcmVhZG9ubHk6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkltYWdlXCIsXG4gICAgd2lkdGg6IDEyMCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJJbWFnZSxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuSW1hZ2UsXG4gICAgICAgIGRhdGE6IFtgJHtmYWtlci5pbWFnZS5hbmltYWxzKDQwLCA0MCl9P3JhbmRvbT0ke2Zha2VyLmRhdGF0eXBlLm51bWJlcigxMDAwMDApfWBdLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIlVyaVwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyVXJpLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IGZha2VyLmludGVybmV0LnVybCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlVyaSxcbiAgICAgICAgZGF0YTogdXJsLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAgdGl0bGU6IFwiTWFya2Rvd25cIixcbiAgICB3aWR0aDogMTIwLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlck1hcmtkb3duLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IG1hcmtkb3duID0gYCMgVGl0bGVcbkhlbGxvIG15IG5hbWUgaXMgKiR7ZmFrZXIubmFtZS5maXJzdE5hbWUoKX0qXG5cbiMjIFRPRE86XG5Ucnkgb3V0IFtHbGlkZV0oaHR0cHM6Ly93d3cuZ2xpZGVhcHBzLmNvbS8pXG5gO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLk1hcmtkb3duLFxuICAgICAgICBkYXRhOiBtYXJrZG93bixcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkJ1YmJsZVwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyQXJyYXksXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLkJ1YmJsZSxcbiAgICAgICAgZGF0YTogW2Zha2VyLmxvcmVtLndvcmQoKSwgZmFrZXIubG9yZW0ud29yZCgpLCBmYWtlci5sb3JlbS53b3JkKCldLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAgdGl0bGU6IFwiRHJpbGxkb3duXCIsXG4gICAgd2lkdGg6IDEyMCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJBcnJheSxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuRHJpbGxkb3duLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIHRleHQ6IGZha2VyLmFkZHJlc3MuY2l0eU5hbWUoKSxcbiAgICAgICAgICBpbWc6IGAke2Zha2VyLmltYWdlLm5hdHVyZSg0MCwgNDApfT9yYW5kb209JHtmYWtlci5kYXRhdHlwZS5udW1iZXIoMTAwMDAwKX1gXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0ZXh0OiBmYWtlci5hZGRyZXNzLmNpdHlOYW1lKCksXG4gICAgICAgICAgaW1nOiBgJHtmYWtlci5pbWFnZS5uYXR1cmUoNDAsIDQwKX0/cmFuZG9tPSR7ZmFrZXIuZGF0YXR5cGUubnVtYmVyKDEwMDAwMCl9YFxuICAgICAgICB9XSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfV07XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlQWxsTW9ja2VkS2luZHMoKSB7XG4gIGNvbnN0IGNhY2hlID0gUmVhY3QudXNlUmVmKG5ldyBDb250ZW50Q2FjaGUoKSk7XG4gIGNvbnN0IFtjb2xzTWFwLCBzZXRDb2xzTWFwXSA9IFJlYWN0LnVzZVN0YXRlKGdldENvbHVtbnNGb3JDZWxsVHlwZXMpO1xuICBjb25zdCBvbkNvbHVtblJlc2l6ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKChjb2x1bW4sIG5ld1NpemUpID0+IHtcbiAgICBzZXRDb2xzTWFwKHByZXZDb2xzTWFwID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gcHJldkNvbHNNYXAuZmluZEluZGV4KGNpID0+IGNpLnRpdGxlID09PSBjb2x1bW4udGl0bGUpO1xuICAgICAgY29uc3QgbmV3QXJyYXkgPSBbLi4ucHJldkNvbHNNYXBdO1xuICAgICAgbmV3QXJyYXkuc3BsaWNlKGluZGV4LCAxLCB7XG4gICAgICAgIC4uLnByZXZDb2xzTWFwW2luZGV4XSxcbiAgICAgICAgd2lkdGg6IG5ld1NpemVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH0pO1xuICB9LCBbXSk7XG4gIGNvbnN0IGNvbHMgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gY29sc01hcC5tYXAoZ2V0R3JpZENvbHVtbik7XG4gIH0sIFtjb2xzTWFwXSk7XG4gIGNvbnN0IFt1cGRhdGVWZXJzaW9uLCBzZXRVcGRhdGVWZXJzaW9uXSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuICBjb25zdCBnZXRDZWxsQ29udGVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKF9yZWY0ID0+IHtcbiAgICBsZXQgW2NvbCwgcm93XSA9IF9yZWY0O1xuICAgIG5vb3AodXBkYXRlVmVyc2lvbik7XG4gICAgbGV0IHZhbCA9IGNhY2hlLmN1cnJlbnQuZ2V0KGNvbCwgcm93KTtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbCA9IGNvbHNNYXBbY29sXS5nZXRDb250ZW50KCk7XG4gICAgICBjYWNoZS5jdXJyZW50LnNldChjb2wsIHJvdywgdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfSwgW2NvbHNNYXAsIHVwZGF0ZVZlcnNpb25dKTtcbiAgY29uc3Qgc2V0Q2VsbFZhbHVlID0gUmVhY3QudXNlQ2FsbGJhY2soKF9yZWY1LCB2YWwsIG5vRGlzcGxheSwgZm9yY2VVcGRhdGUpID0+IHtcbiAgICBsZXQgW2NvbCwgcm93XSA9IF9yZWY1O1xuICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudC5nZXQoY29sLCByb3cpO1xuICAgIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnQgPSBjb2xzTWFwW2NvbF0uZ2V0Q29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoaXNFZGl0YWJsZUdyaWRDZWxsKHZhbCkgJiYgaXNFZGl0YWJsZUdyaWRDZWxsKGN1cnJlbnQpKSB7XG4gICAgICB2YXIgX2NvcGllZCRkYXRhJHRvU3RyaW5nLCBfY29waWVkJGRhdGE7XG4gICAgICBjb25zdCBjb3BpZWQgPSBsb3NzeUNvcHlEYXRhKHZhbCwgY3VycmVudCk7XG4gICAgICBjYWNoZS5jdXJyZW50LnNldChjb2wsIHJvdywge1xuICAgICAgICAuLi5jb3BpZWQsXG4gICAgICAgIGRpc3BsYXlEYXRhOiBub0Rpc3BsYXkgPT09IHRydWUgPyB1bmRlZmluZWQgOiAoX2NvcGllZCRkYXRhJHRvU3RyaW5nID0gKF9jb3BpZWQkZGF0YSA9IGNvcGllZC5kYXRhKSA9PT0gbnVsbCB8fCBfY29waWVkJGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jb3BpZWQkZGF0YS50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfY29waWVkJGRhdGEkdG9TdHJpbmcgIT09IHZvaWQgMCA/IF9jb3BpZWQkZGF0YSR0b1N0cmluZyA6IFwiXCJcbiAgICAgIH0pO1xuICAgICAgaWYgKGZvcmNlVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICAgIHNldFVwZGF0ZVZlcnNpb24odiA9PiB2ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbY29sc01hcF0pO1xuICByZXR1cm4ge1xuICAgIGNvbHMsXG4gICAgZ2V0Q2VsbENvbnRlbnQsXG4gICAgb25Db2x1bW5SZXNpemUsXG4gICAgc2V0Q2VsbFZhbHVlXG4gIH07XG59Il19*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/core/src/data-editor/stories/utils.tsx","webpack://./packages/core/src/data-editor/stories/utils.tsx"],"names":[".c4uqbye",".b1bsqg7n",".piiq54i",".d1k3yj19",".m1j0dy02",".kcvwzr4"],"mappings":"AA0G+BA,SAAAA,WAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,6BAAAA,CAAAA,yBAAAA,CAAAA,qBAAAA,CAAAA,wBAAAA,CAAAA,WAAAA,CAAAA,CAAAA,gBAAAA,WAAAA,CAAAA,YAAAA,CAAAA,WAAAA,CAAAA,WAAAA,CAAAA,cAAAA,CAAAA,wBAAAA,CAAAA,eAAAA,CAAAA,+BAAAA,CAAAA,yCAAAA,CAAAA,iCAAAA,CAAAA,cAAAA,CAAAA,CAAAA,sBAAAA,wBAAAA,CAAAA;AAwBDC,UAAAA,wBAAAA,CAAAA,iDAAAA,CAAAA,WAAAA,CAAAA,iBAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,6BAAAA,CAAAA,yBAAAA,CAAAA,qBAAAA,CAAAA,YAAAA,CAAAA,sBAAAA,CAAAA,CAAAA,iBAAAA,YAAAA,CAAAA,CAAAA,eAAAA,cAAAA,CAAAA,eAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,iBAAAA,CAAAA,CAAAA,iBAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,sBAAAA,CAAAA,kBAAAA,CAAAA,mFAAAA,CAAAA,CAAAA,6BAAAA,kBAAAA,CAAAA,eAAAA,CAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,uBAAAA,CAAAA,WAAAA,CAAAA,CAAAA,yBAAAA,eAAAA,CAAAA,gBAAAA,CAAAA,CAAAA,qCAAAA,eAAAA,CAAAA,CAAAA,iBAAAA,sBAAAA,CAAAA;AAwDNC,SAAAA,qBAAAA,CAAAA,eAAAA,CAAAA,aAAAA,CAAAA;AAKGC,UAAAA,cAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,iBAAAA,CAAAA;AAKHC,UAAAA,cAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,iBAAAA,CAAAA,CAAAA,iBAAAA,wBAAAA,CAAAA,aAAAA,CAAAA,eAAAA,CAAAA,qBAAAA,CAAAA,cAAAA,CAAAA,iBAAAA,CAAAA,gCAAAA,CAAAA,cAAAA,CAAAA,WAAAA,CAAAA,cAAAA,CAAAA;AA8QDC,SAAAA,wBAAAA,CAAAA,aAAAA,CAAAA,eAAAA,CAAAA,qBAAAA,CAAAA,cAAAA,CAAAA,iBAAAA,CAAAA,gCAAAA,CAAAA,cAAAA,CAAAA;AC5cvB,2m1BAA2m1B","sourcesContent":["import * as React from \"react\";\nimport { GridCellKind, GridColumnIcon, isEditableGridCell, isTextEditableGridCell } from \"../../internal/data-grid/data-grid-types.js\";\nimport { faker } from \"@faker-js/faker\";\nimport { styled } from \"@linaria/react\";\nimport isArray from \"lodash/isArray.js\";\nimport { assertNever } from \"../../common/support.js\";\nimport { browserIsFirefox } from \"../../common/browser-detect.js\";\nimport { useResizeDetector } from \"react-resize-detector\";\nimport noop from \"lodash/noop.js\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nimport { jsxs as _jsxs } from \"react/jsx-runtime\";\nfaker.seed(1337);\nfunction isTruthy(x) {\n  return x ? true : false;\n}\nexport function lossyCopyData(source, target) {\n  const sourceData = source.data;\n  if (typeof sourceData === typeof target.data) {\n    return {\n      ...target,\n      data: sourceData\n    };\n  } else switch (target.kind) {\n    case GridCellKind.Uri:\n      {\n        var _sourceData$toString;\n        if (isArray(sourceData)) {\n          return {\n            ...target,\n            data: sourceData[0]\n          };\n        }\n        return {\n          ...target,\n          data: (_sourceData$toString = sourceData === null || sourceData === void 0 ? void 0 : sourceData.toString()) !== null && _sourceData$toString !== void 0 ? _sourceData$toString : \"\"\n        };\n      }\n    case GridCellKind.Boolean:\n      {\n        if (isArray(sourceData)) {\n          return {\n            ...target,\n            data: sourceData[0] !== undefined\n          };\n        } else if (source.kind === GridCellKind.Boolean) {\n          return {\n            ...target,\n            data: source.data\n          };\n        }\n        return {\n          ...target,\n          data: isTruthy(sourceData) ? true : false\n        };\n      }\n    case GridCellKind.Image:\n      {\n        var _sourceData$toString2;\n        if (isArray(sourceData)) {\n          return {\n            ...target,\n            data: [sourceData[0]]\n          };\n        }\n        return {\n          ...target,\n          data: [(_sourceData$toString2 = sourceData === null || sourceData === void 0 ? void 0 : sourceData.toString()) !== null && _sourceData$toString2 !== void 0 ? _sourceData$toString2 : \"\"]\n        };\n      }\n    case GridCellKind.Number:\n      {\n        return {\n          ...target,\n          data: 0\n        };\n      }\n    case GridCellKind.Text:\n    case GridCellKind.Markdown:\n      {\n        var _source$data$toString, _source$data;\n        if (isArray(sourceData)) {\n          var _sourceData$0$toStrin;\n          return {\n            ...target,\n            data: (_sourceData$0$toStrin = sourceData[0].toString()) !== null && _sourceData$0$toStrin !== void 0 ? _sourceData$0$toStrin : \"\"\n          };\n        }\n        return {\n          ...target,\n          data: (_source$data$toString = (_source$data = source.data) === null || _source$data === void 0 ? void 0 : _source$data.toString()) !== null && _source$data$toString !== void 0 ? _source$data$toString : \"\"\n        };\n      }\n    case GridCellKind.Custom:\n      {\n        return target;\n      }\n  }\n  assertNever(target);\n}\nexport function getGridColumn(columnWithMock) {\n  const {\n    getContent,\n    ...rest\n  } = columnWithMock;\n  return rest;\n}\nexport const ColumnAddButton = styled.div`\n    width: 120px;\n    display: flex;\n    flex-direction: column;\n    background-color: #f1f1f1;\n    height: 100%;\n    button {\n        border: none;\n        outline: none;\n        height: 37px;\n        width: 120px;\n        font-size: 20px;\n        background-color: #f7f7f8;\n        color: #000000dd;\n        border-bottom: 1px solid #e1e2e5;\n\n        transition: background-color 200ms;\n\n        cursor: pointer;\n        :hover {\n            background-color: #efeff1;\n        }\n    }\n`;\nexport const BeautifulStyle = styled.div`\n    background-color: #2790b9;\n    background: linear-gradient(90deg, #2790b9, #2070a9);\n    color: white;\n\n    padding: 32px 48px;\n\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n\n    font-family: sans-serif;\n\n    &.double {\n        height: 200vh;\n    }\n\n    & > h1 {\n        font-size: 50px;\n        font-weight: 600;\n        flex-shrink: 0;\n        margin: 0 0 12px 0;\n    }\n\n    .sizer {\n        flex-grow: 1;\n\n        background-color: white;\n\n        border-radius: 12px;\n        box-shadow:\n            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,\n            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;\n\n        .sizer-clip {\n            border-radius: 12px;\n            overflow: hidden;\n            transform: translateZ(0);\n\n            height: 100%;\n        }\n    }\n\n    &.firefox .sizer {\n        border-radius: 0;\n        box-shadow: unset;\n\n        .sizer-clip {\n            border-radius: 0;\n        }\n    }\n\n    .white {\n        background-color: white;\n    }\n`;\nexport const PropName = styled.span`\n    font-family: monospace;\n    font-weight: 500;\n    color: #ffe394;\n`;\nexport const Description = styled.p`\n    font-size: 18px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n`;\nexport const MoreInfo = styled.p`\n    font-size: 14px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n\n    button {\n        background-color: #f4f4f4;\n        color: #2b2b2b;\n        padding: 2px 6px;\n        font-family: monospace;\n        font-size: 14px;\n        border-radius: 4px;\n        box-shadow: 0px 1px 2px #00000040;\n        margin: 0 0.1em;\n        border: none;\n        cursor: pointer;\n    }\n`;\nexport const BeautifulWrapper = p => {\n  const {\n    title,\n    children,\n    description,\n    className,\n    scale\n  } = p;\n  const {\n    ref,\n    width,\n    height\n  } = useResizeDetector();\n  return _jsxs(BeautifulStyle, {\n    className: className + (browserIsFirefox.value ? \" firefox\" : \"\"),\n    children: [_jsx(\"h1\", {\n      children: title\n    }), description, _jsx(\"div\", {\n      style: {\n        scale\n      },\n      className: \"sizer\",\n      children: _jsx(\"div\", {\n        className: \"sizer-clip\",\n        ref: ref,\n        children: _jsx(\"div\", {\n          style: {\n            position: \"relative\",\n            width: width !== null && width !== void 0 ? width : 100,\n            height: height !== null && height !== void 0 ? height : 100\n          },\n          children: children\n        })\n      })\n    })]\n  });\n};\nBeautifulWrapper.displayName = \"BeautifulWrapper\";\nfunction createTextColumnInfo(index, group) {\n  return {\n    title: `Column ${index}`,\n    id: `Column ${index}`,\n    group: group ? `Group ${Math.round(index / 3)}` : undefined,\n    icon: GridColumnIcon.HeaderString,\n    hasMenu: false,\n    getContent: () => {\n      const text = faker.lorem.word();\n      return {\n        kind: GridCellKind.Text,\n        data: text,\n        displayData: text,\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  };\n}\nfunction getResizableColumns(amount, group) {\n  const defaultColumns = [{\n    title: \"First name\",\n    id: \"First name\",\n    group: group ? \"Name\" : undefined,\n    icon: GridColumnIcon.HeaderString,\n    hasMenu: false,\n    getContent: () => {\n      const firstName = faker.name.firstName();\n      return {\n        kind: GridCellKind.Text,\n        displayData: firstName,\n        data: firstName,\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  }, {\n    title: \"Last name\",\n    id: \"Last name\",\n    group: group ? \"Name\" : undefined,\n    icon: GridColumnIcon.HeaderString,\n    hasMenu: false,\n    getContent: () => {\n      const lastName = faker.name.lastName();\n      return {\n        kind: GridCellKind.Text,\n        displayData: lastName,\n        data: lastName,\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  }, {\n    title: \"Avatar\",\n    id: \"Avatar\",\n    group: group ? \"Info\" : undefined,\n    icon: GridColumnIcon.HeaderImage,\n    hasMenu: false,\n    getContent: () => {\n      const n = Math.round(Math.random() * 100);\n      return {\n        kind: GridCellKind.Image,\n        data: [`https://picsum.photos/id/${n}/900/900`],\n        displayData: [`https://picsum.photos/id/${n}/40/40`],\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  }, {\n    title: \"Email\",\n    id: \"Email\",\n    group: group ? \"Info\" : undefined,\n    icon: GridColumnIcon.HeaderString,\n    hasMenu: false,\n    getContent: () => {\n      const email = faker.internet.email();\n      return {\n        kind: GridCellKind.Text,\n        displayData: email,\n        data: email,\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  }, {\n    title: \"Title\",\n    id: \"Title\",\n    group: group ? \"Info\" : undefined,\n    icon: GridColumnIcon.HeaderString,\n    hasMenu: false,\n    getContent: () => {\n      const company = faker.name.jobTitle();\n      return {\n        kind: GridCellKind.Text,\n        displayData: company,\n        data: company,\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  }, {\n    title: \"More Info\",\n    id: \"More Info\",\n    group: group ? \"Info\" : undefined,\n    icon: GridColumnIcon.HeaderUri,\n    hasMenu: false,\n    getContent: () => {\n      const url = faker.internet.url();\n      return {\n        kind: GridCellKind.Uri,\n        displayData: url,\n        data: url,\n        hoverEffect: true,\n        allowOverlay: true,\n        readonly: true,\n        onClickUri: a => {\n          window.open(url, \"_blank\");\n          a.preventDefault();\n        }\n      };\n    }\n  }];\n  if (amount < defaultColumns.length) {\n    return defaultColumns.slice(0, amount);\n  }\n  const extraColumnsAmount = amount - defaultColumns.length;\n  const extraColumns = [...new Array(extraColumnsAmount)].map((_, index) => createTextColumnInfo(index + defaultColumns.length, group));\n  return [...defaultColumns, ...extraColumns];\n}\nexport class ContentCache {\n  constructor() {\n    this.cachedContent = new Map();\n  }\n  get(col, row) {\n    const colCache = this.cachedContent.get(col);\n    if (colCache === undefined) {\n      return undefined;\n    }\n    return colCache[row];\n  }\n  set(col, row, value) {\n    let rowCache = this.cachedContent.get(col);\n    if (rowCache === undefined) {\n      this.cachedContent.set(col, rowCache = []);\n    }\n    rowCache[row] = value;\n  }\n}\nexport function useMockDataGenerator(numCols) {\n  let readonly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  let group = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  const cache = React.useRef(new ContentCache());\n  const [colsMap, setColsMap] = React.useState(() => getResizableColumns(numCols, group));\n  React.useEffect(() => {\n    setColsMap(getResizableColumns(numCols, group));\n  }, [group, numCols]);\n  const onColumnResize = React.useCallback((column, newSize) => {\n    setColsMap(prevColsMap => {\n      const index = prevColsMap.findIndex(ci => ci.title === column.title);\n      const newArray = [...prevColsMap];\n      newArray.splice(index, 1, {\n        ...prevColsMap[index],\n        width: newSize\n      });\n      return newArray;\n    });\n  }, []);\n  const cols = React.useMemo(() => {\n    return colsMap.map(getGridColumn);\n  }, [colsMap]);\n  const colsMapRef = React.useRef(colsMap);\n  colsMapRef.current = colsMap;\n  const getCellContent = React.useCallback(_ref => {\n    let [col, row] = _ref;\n    let val = cache.current.get(col, row);\n    if (val === undefined) {\n      val = colsMapRef.current[col].getContent();\n      if (!readonly && isTextEditableGridCell(val)) {\n        val = {\n          ...val,\n          readonly\n        };\n      }\n      cache.current.set(col, row, val);\n    }\n    return val;\n  }, [readonly]);\n  const setCellValueRaw = React.useCallback((_ref2, val) => {\n    let [col, row] = _ref2;\n    cache.current.set(col, row, val);\n  }, []);\n  const setCellValue = React.useCallback((_ref3, val) => {\n    let [col, row] = _ref3;\n    let current = cache.current.get(col, row);\n    if (current === undefined) {\n      current = colsMap[col].getContent();\n    }\n    if (isEditableGridCell(val) && isEditableGridCell(current)) {\n      const copied = lossyCopyData(val, current);\n      cache.current.set(col, row, {\n        ...copied,\n        displayData: typeof copied.data === \"string\" ? copied.data : copied.displayData,\n        lastUpdated: performance.now()\n      });\n    }\n  }, [colsMap]);\n  return {\n    cols,\n    getCellContent,\n    onColumnResize,\n    setCellValue,\n    setCellValueRaw\n  };\n}\nexport const KeyName = styled.kbd`\n    background-color: #f4f4f4;\n    color: #2b2b2b;\n    padding: 2px 6px;\n    font-family: monospace;\n    font-size: 14px;\n    border-radius: 4px;\n    box-shadow: 0px 1px 2px #00000040;\n    margin: 0 0.1em;\n`;\nexport const defaultProps = {\n  smoothScrollX: true,\n  smoothScrollY: true,\n  getCellsForSelection: true,\n  width: \"100%\"\n};\nexport function clearCell(cell) {\n  switch (cell.kind) {\n    case GridCellKind.Boolean:\n      {\n        return {\n          ...cell,\n          data: false\n        };\n      }\n    case GridCellKind.Image:\n      {\n        return {\n          ...cell,\n          data: [],\n          displayData: []\n        };\n      }\n    case GridCellKind.Drilldown:\n    case GridCellKind.Bubble:\n      {\n        return {\n          ...cell,\n          data: []\n        };\n      }\n    case GridCellKind.Uri:\n    case GridCellKind.Markdown:\n      {\n        return {\n          ...cell,\n          data: \"\"\n        };\n      }\n    case GridCellKind.Text:\n      {\n        return {\n          ...cell,\n          data: \"\",\n          displayData: \"\"\n        };\n      }\n    case GridCellKind.Number:\n      {\n        return {\n          ...cell,\n          data: 0,\n          displayData: \"\"\n        };\n      }\n  }\n  return cell;\n}\nfunction getColumnsForCellTypes() {\n  return [{\n    title: \"Row ID\",\n    width: 120,\n    icon: GridColumnIcon.HeaderRowID,\n    hasMenu: false,\n    getContent: () => {\n      return {\n        kind: GridCellKind.RowID,\n        data: faker.datatype.uuid(),\n        allowOverlay: true\n      };\n    }\n  }, {\n    title: \"Protected\",\n    width: 120,\n    icon: GridColumnIcon.HeaderCode,\n    hasMenu: false,\n    getContent: () => {\n      return {\n        kind: GridCellKind.Protected,\n        data: faker.finance.bitcoinAddress(),\n        allowOverlay: false\n      };\n    }\n  }, {\n    title: \"Loading\",\n    width: 120,\n    icon: GridColumnIcon.HeaderString,\n    hasMenu: false,\n    getContent: () => {\n      return {\n        kind: GridCellKind.Loading,\n        allowOverlay: false,\n        skeletonWidth: 70,\n        skeletonWidthVariability: 25\n      };\n    }\n  }, {\n    title: \"Text\",\n    width: 120,\n    icon: GridColumnIcon.HeaderCode,\n    hasMenu: false,\n    getContent: () => {\n      const name = faker.name.firstName();\n      return {\n        kind: GridCellKind.Text,\n        data: name,\n        displayData: name,\n        allowOverlay: true\n      };\n    }\n  }, {\n    title: \"Number\",\n    width: 120,\n    icon: GridColumnIcon.HeaderNumber,\n    hasMenu: false,\n    getContent: () => {\n      const age = faker.datatype.number(100);\n      return {\n        kind: GridCellKind.Number,\n        data: age,\n        displayData: `${age}`,\n        allowOverlay: true\n      };\n    }\n  }, {\n    title: \"Boolean\",\n    width: 120,\n    icon: GridColumnIcon.HeaderBoolean,\n    hasMenu: false,\n    getContent: () => {\n      const roll = Math.random();\n      const checked = roll < 0.1 ? undefined : roll < 0.2 ? null : roll < 0.6;\n      return {\n        kind: GridCellKind.Boolean,\n        data: checked,\n        allowOverlay: false,\n        readonly: false\n      };\n    }\n  }, {\n    title: \"Image\",\n    width: 120,\n    icon: GridColumnIcon.HeaderImage,\n    hasMenu: false,\n    getContent: () => {\n      return {\n        kind: GridCellKind.Image,\n        data: [`${faker.image.animals(40, 40)}?random=${faker.datatype.number(100000)}`],\n        allowOverlay: true,\n        readonly: true\n      };\n    }\n  }, {\n    title: \"Uri\",\n    width: 120,\n    icon: GridColumnIcon.HeaderUri,\n    hasMenu: false,\n    getContent: () => {\n      const url = faker.internet.url();\n      return {\n        kind: GridCellKind.Uri,\n        data: url,\n        allowOverlay: true\n      };\n    }\n  }, {\n    title: \"Markdown\",\n    width: 120,\n    icon: GridColumnIcon.HeaderMarkdown,\n    hasMenu: false,\n    getContent: () => {\n      const markdown = `# Title\nHello my name is *${faker.name.firstName()}*\n\n## TODO:\nTry out [Glide](https://www.glideapps.com/)\n`;\n      return {\n        kind: GridCellKind.Markdown,\n        data: markdown,\n        allowOverlay: true\n      };\n    }\n  }, {\n    title: \"Bubble\",\n    width: 120,\n    icon: GridColumnIcon.HeaderArray,\n    hasMenu: false,\n    getContent: () => {\n      return {\n        kind: GridCellKind.Bubble,\n        data: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],\n        allowOverlay: true\n      };\n    }\n  }, {\n    title: \"Drilldown\",\n    width: 120,\n    icon: GridColumnIcon.HeaderArray,\n    hasMenu: false,\n    getContent: () => {\n      return {\n        kind: GridCellKind.Drilldown,\n        data: [{\n          text: faker.address.cityName(),\n          img: `${faker.image.nature(40, 40)}?random=${faker.datatype.number(100000)}`\n        }, {\n          text: faker.address.cityName(),\n          img: `${faker.image.nature(40, 40)}?random=${faker.datatype.number(100000)}`\n        }],\n        allowOverlay: true\n      };\n    }\n  }];\n}\nexport function useAllMockedKinds() {\n  const cache = React.useRef(new ContentCache());\n  const [colsMap, setColsMap] = React.useState(getColumnsForCellTypes);\n  const onColumnResize = React.useCallback((column, newSize) => {\n    setColsMap(prevColsMap => {\n      const index = prevColsMap.findIndex(ci => ci.title === column.title);\n      const newArray = [...prevColsMap];\n      newArray.splice(index, 1, {\n        ...prevColsMap[index],\n        width: newSize\n      });\n      return newArray;\n    });\n  }, []);\n  const cols = React.useMemo(() => {\n    return colsMap.map(getGridColumn);\n  }, [colsMap]);\n  const [updateVersion, setUpdateVersion] = React.useState(0);\n  const getCellContent = React.useCallback(_ref4 => {\n    let [col, row] = _ref4;\n    noop(updateVersion);\n    let val = cache.current.get(col, row);\n    if (val === undefined) {\n      val = colsMap[col].getContent();\n      cache.current.set(col, row, val);\n    }\n    return val;\n  }, [colsMap, updateVersion]);\n  const setCellValue = React.useCallback((_ref5, val, noDisplay, forceUpdate) => {\n    let [col, row] = _ref5;\n    let current = cache.current.get(col, row);\n    if (current === undefined) {\n      current = colsMap[col].getContent();\n    }\n    if (isEditableGridCell(val) && isEditableGridCell(current)) {\n      var _copied$data$toString, _copied$data;\n      const copied = lossyCopyData(val, current);\n      cache.current.set(col, row, {\n        ...copied,\n        displayData: noDisplay === true ? undefined : (_copied$data$toString = (_copied$data = copied.data) === null || _copied$data === void 0 ? void 0 : _copied$data.toString()) !== null && _copied$data$toString !== void 0 ? _copied$data$toString : \"\"\n      });\n      if (forceUpdate === true) {\n        setUpdateVersion(v => v + 1);\n      }\n    }\n  }, [colsMap]);\n  return {\n    cols,\n    getCellContent,\n    onColumnResize,\n    setCellValue\n  };\n}",".c4uqbye{width:120px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:#f1f1f1;height:100%;}.c4uqbye button{border:none;outline:none;height:37px;width:120px;font-size:20px;background-color:#f7f7f8;color:#000000dd;border-bottom:1px solid #e1e2e5;-webkit-transition:background-color 200ms;transition:background-color 200ms;cursor:pointer;}.c4uqbye button:hover{background-color:#efeff1;}\n.b1bsqg7n{background-color:#2790b9;background:linear-gradient(90deg,#2790b9,#2070a9);color:white;padding:32px 48px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100vh;font-family:sans-serif;}.b1bsqg7n.double{height:200vh;}.b1bsqg7n > h1{font-size:50px;font-weight:600;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 12px 0;}.b1bsqg7n .sizer{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;background-color:white;border-radius:12px;box-shadow: rgba(9,30,66,0.25) 0px 4px 8px -2px, rgba(9,30,66,0.08) 0px 0px 0px 1px;}.b1bsqg7n .sizer .sizer-clip{border-radius:12px;overflow:hidden;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);height:100%;}.b1bsqg7n.firefox .sizer{border-radius:0;box-shadow:unset;}.b1bsqg7n.firefox .sizer .sizer-clip{border-radius:0;}.b1bsqg7n .white{background-color:white;}\n.piiq54i{font-family:monospace;font-weight:500;color:#ffe394;}\n.d1k3yj19{font-size:18px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}\n.m1j0dy02{font-size:14px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}.m1j0dy02 button{background-color:#f4f4f4;color:#2b2b2b;padding:2px 6px;font-family:monospace;font-size:14px;border-radius:4px;box-shadow:0px 1px 2px #00000040;margin:0 0.1em;border:none;cursor:pointer;}\n.kcvwzr4{background-color:#f4f4f4;color:#2b2b2b;padding:2px 6px;font-family:monospace;font-size:14px;border-radius:4px;box-shadow:0px 1px 2px #00000040;margin:0 0.1em;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvY29yZS9zcmMvZGF0YS1lZGl0b3Ivc3Rvcmllcy91dGlscy50c3giXSwibmFtZXMiOlsiLmM0dXFieWUiLCIuYjFic3FnN24iLCIucGlpcTU0aSIsIi5kMWszeWoxOSIsIi5tMWowZHkwMiIsIi5rY3Z3enI0Il0sIm1hcHBpbmdzIjoiQUEwRytCQTtBQXdCREM7QUF3RE5DO0FBS0dDO0FBS0hDO0FBOFFEQyIsImZpbGUiOiIvaG9tZS9ydW5uZXIvd29yay9nbGlkZS1kYXRhLWdyaWQvZ2xpZGUtZGF0YS1ncmlkL3BhY2thZ2VzL2NvcmUvc3JjL2RhdGEtZWRpdG9yL3N0b3JpZXMvdXRpbHMudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBHcmlkQ2VsbEtpbmQsIEdyaWRDb2x1bW5JY29uLCBpc0VkaXRhYmxlR3JpZENlbGwsIGlzVGV4dEVkaXRhYmxlR3JpZENlbGwgfSBmcm9tIFwiLi4vLi4vaW50ZXJuYWwvZGF0YS1ncmlkL2RhdGEtZ3JpZC10eXBlcy5qc1wiO1xuaW1wb3J0IHsgZmFrZXIgfSBmcm9tIFwiQGZha2VyLWpzL2Zha2VyXCI7XG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tIFwiQGxpbmFyaWEvcmVhY3RcIjtcbmltcG9ydCBpc0FycmF5IGZyb20gXCJsb2Rhc2gvaXNBcnJheS5qc1wiO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3N1cHBvcnQuanNcIjtcbmltcG9ydCB7IGJyb3dzZXJJc0ZpcmVmb3ggfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Jyb3dzZXItZGV0ZWN0LmpzXCI7XG5pbXBvcnQgeyB1c2VSZXNpemVEZXRlY3RvciB9IGZyb20gXCJyZWFjdC1yZXNpemUtZGV0ZWN0b3JcIjtcbmltcG9ydCBub29wIGZyb20gXCJsb2Rhc2gvbm9vcC5qc1wiO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZha2VyLnNlZWQoMTMzNyk7XG5mdW5jdGlvbiBpc1RydXRoeSh4KSB7XG4gIHJldHVybiB4ID8gdHJ1ZSA6IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxvc3N5Q29weURhdGEoc291cmNlLCB0YXJnZXQpIHtcbiAgY29uc3Qgc291cmNlRGF0YSA9IHNvdXJjZS5kYXRhO1xuICBpZiAodHlwZW9mIHNvdXJjZURhdGEgPT09IHR5cGVvZiB0YXJnZXQuZGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50YXJnZXQsXG4gICAgICBkYXRhOiBzb3VyY2VEYXRhXG4gICAgfTtcbiAgfSBlbHNlIHN3aXRjaCAodGFyZ2V0LmtpbmQpIHtcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5Vcmk6XG4gICAgICB7XG4gICAgICAgIHZhciBfc291cmNlRGF0YSR0b1N0cmluZztcbiAgICAgICAgaWYgKGlzQXJyYXkoc291cmNlRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGFyZ2V0LFxuICAgICAgICAgICAgZGF0YTogc291cmNlRGF0YVswXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgZGF0YTogKF9zb3VyY2VEYXRhJHRvU3RyaW5nID0gc291cmNlRGF0YSA9PT0gbnVsbCB8fCBzb3VyY2VEYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzb3VyY2VEYXRhLnRvU3RyaW5nKCkpICE9PSBudWxsICYmIF9zb3VyY2VEYXRhJHRvU3RyaW5nICE9PSB2b2lkIDAgPyBfc291cmNlRGF0YSR0b1N0cmluZyA6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5Cb29sZWFuOlxuICAgICAge1xuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2VEYXRhKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgICBkYXRhOiBzb3VyY2VEYXRhWzBdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5raW5kID09PSBHcmlkQ2VsbEtpbmQuQm9vbGVhbikge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgICBkYXRhOiBzb3VyY2UuZGF0YVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgZGF0YTogaXNUcnV0aHkoc291cmNlRGF0YSkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5JbWFnZTpcbiAgICAgIHtcbiAgICAgICAgdmFyIF9zb3VyY2VEYXRhJHRvU3RyaW5nMjtcbiAgICAgICAgaWYgKGlzQXJyYXkoc291cmNlRGF0YSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGFyZ2V0LFxuICAgICAgICAgICAgZGF0YTogW3NvdXJjZURhdGFbMF1dXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgICBkYXRhOiBbKF9zb3VyY2VEYXRhJHRvU3RyaW5nMiA9IHNvdXJjZURhdGEgPT09IG51bGwgfHwgc291cmNlRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc291cmNlRGF0YS50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfc291cmNlRGF0YSR0b1N0cmluZzIgIT09IHZvaWQgMCA/IF9zb3VyY2VEYXRhJHRvU3RyaW5nMiA6IFwiXCJdXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBHcmlkQ2VsbEtpbmQuTnVtYmVyOlxuICAgICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgICBkYXRhOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBHcmlkQ2VsbEtpbmQuVGV4dDpcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5NYXJrZG93bjpcbiAgICAgIHtcbiAgICAgICAgdmFyIF9zb3VyY2UkZGF0YSR0b1N0cmluZywgX3NvdXJjZSRkYXRhO1xuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2VEYXRhKSkge1xuICAgICAgICAgIHZhciBfc291cmNlRGF0YSQwJHRvU3RyaW47XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgICAgIGRhdGE6IChfc291cmNlRGF0YSQwJHRvU3RyaW4gPSBzb3VyY2VEYXRhWzBdLnRvU3RyaW5nKCkpICE9PSBudWxsICYmIF9zb3VyY2VEYXRhJDAkdG9TdHJpbiAhPT0gdm9pZCAwID8gX3NvdXJjZURhdGEkMCR0b1N0cmluIDogXCJcIlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50YXJnZXQsXG4gICAgICAgICAgZGF0YTogKF9zb3VyY2UkZGF0YSR0b1N0cmluZyA9IChfc291cmNlJGRhdGEgPSBzb3VyY2UuZGF0YSkgPT09IG51bGwgfHwgX3NvdXJjZSRkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc291cmNlJGRhdGEudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX3NvdXJjZSRkYXRhJHRvU3RyaW5nICE9PSB2b2lkIDAgPyBfc291cmNlJGRhdGEkdG9TdHJpbmcgOiBcIlwiXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgY2FzZSBHcmlkQ2VsbEtpbmQuQ3VzdG9tOlxuICAgICAge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICB9XG4gIGFzc2VydE5ldmVyKHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JpZENvbHVtbihjb2x1bW5XaXRoTW9jaykge1xuICBjb25zdCB7XG4gICAgZ2V0Q29udGVudCxcbiAgICAuLi5yZXN0XG4gIH0gPSBjb2x1bW5XaXRoTW9jaztcbiAgcmV0dXJuIHJlc3Q7XG59XG5leHBvcnQgY29uc3QgQ29sdW1uQWRkQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgICB3aWR0aDogMTIwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJ1dHRvbiB7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgaGVpZ2h0OiAzN3B4O1xuICAgICAgICB3aWR0aDogMTIwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmODtcbiAgICAgICAgY29sb3I6ICMwMDAwMDBkZDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMWUyZTU7XG5cbiAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAyMDBtcztcblxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIDpob3ZlciB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmYxO1xuICAgICAgICB9XG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCBCZWF1dGlmdWxTdHlsZSA9IHN0eWxlZC5kaXZgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI3OTBiOTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMyNzkwYjksICMyMDcwYTkpO1xuICAgIGNvbG9yOiB3aGl0ZTtcblxuICAgIHBhZGRpbmc6IDMycHggNDhweDtcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG5cbiAgICAmLmRvdWJsZSB7XG4gICAgICAgIGhlaWdodDogMjAwdmg7XG4gICAgfVxuXG4gICAgJiA+IGgxIHtcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgbWFyZ2luOiAwIDAgMTJweCAwO1xuICAgIH1cblxuICAgIC5zaXplciB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcblxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcblxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICBib3gtc2hhZG93OlxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMjUpIDBweCA0cHggOHB4IC0ycHgsXG4gICAgICAgICAgICByZ2JhKDksIDMwLCA2NiwgMC4wOCkgMHB4IDBweCAwcHggMXB4O1xuXG4gICAgICAgIC5zaXplci1jbGlwIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xuXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAmLmZpcmVmb3ggLnNpemVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgYm94LXNoYWRvdzogdW5zZXQ7XG5cbiAgICAgICAgLnNpemVyLWNsaXAge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC53aGl0ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbmA7XG5leHBvcnQgY29uc3QgUHJvcE5hbWUgPSBzdHlsZWQuc3BhbmBcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgY29sb3I6ICNmZmUzOTQ7XG5gO1xuZXhwb3J0IGNvbnN0IERlc2NyaXB0aW9uID0gc3R5bGVkLnBgXG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbmA7XG5leHBvcnQgY29uc3QgTW9yZUluZm8gPSBzdHlsZWQucGBcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICAgICAgY29sb3I6ICMyYjJiMmI7XG4gICAgICAgIHBhZGRpbmc6IDJweCA2cHg7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XG4gICAgICAgIG1hcmdpbjogMCAwLjFlbTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuYDtcbmV4cG9ydCBjb25zdCBCZWF1dGlmdWxXcmFwcGVyID0gcCA9PiB7XG4gIGNvbnN0IHtcbiAgICB0aXRsZSxcbiAgICBjaGlsZHJlbixcbiAgICBkZXNjcmlwdGlvbixcbiAgICBjbGFzc05hbWUsXG4gICAgc2NhbGVcbiAgfSA9IHA7XG4gIGNvbnN0IHtcbiAgICByZWYsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0XG4gIH0gPSB1c2VSZXNpemVEZXRlY3RvcigpO1xuICByZXR1cm4gX2pzeHMoQmVhdXRpZnVsU3R5bGUsIHtcbiAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSArIChicm93c2VySXNGaXJlZm94LnZhbHVlID8gXCIgZmlyZWZveFwiIDogXCJcIiksXG4gICAgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwge1xuICAgICAgY2hpbGRyZW46IHRpdGxlXG4gICAgfSksIGRlc2NyaXB0aW9uLCBfanN4KFwiZGl2XCIsIHtcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHNjYWxlXG4gICAgICB9LFxuICAgICAgY2xhc3NOYW1lOiBcInNpemVyXCIsXG4gICAgICBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7XG4gICAgICAgIGNsYXNzTmFtZTogXCJzaXplci1jbGlwXCIsXG4gICAgICAgIHJlZjogcmVmLFxuICAgICAgICBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7XG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGggIT09IG51bGwgJiYgd2lkdGggIT09IHZvaWQgMCA/IHdpZHRoIDogMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgIT09IG51bGwgJiYgaGVpZ2h0ICE9PSB2b2lkIDAgPyBoZWlnaHQgOiAxMDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KV1cbiAgfSk7XG59O1xuQmVhdXRpZnVsV3JhcHBlci5kaXNwbGF5TmFtZSA9IFwiQmVhdXRpZnVsV3JhcHBlclwiO1xuZnVuY3Rpb24gY3JlYXRlVGV4dENvbHVtbkluZm8oaW5kZXgsIGdyb3VwKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IGBDb2x1bW4gJHtpbmRleH1gLFxuICAgIGlkOiBgQ29sdW1uICR7aW5kZXh9YCxcbiAgICBncm91cDogZ3JvdXAgPyBgR3JvdXAgJHtNYXRoLnJvdW5kKGluZGV4IC8gMyl9YCA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJTdHJpbmcsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGZha2VyLmxvcmVtLndvcmQoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkYXRhOiB0ZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogdGV4dCxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxuICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBnZXRSZXNpemFibGVDb2x1bW5zKGFtb3VudCwgZ3JvdXApIHtcbiAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSBbe1xuICAgIHRpdGxlOiBcIkZpcnN0IG5hbWVcIixcbiAgICBpZDogXCJGaXJzdCBuYW1lXCIsXG4gICAgZ3JvdXA6IGdyb3VwID8gXCJOYW1lXCIgOiB1bmRlZmluZWQsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyU3RyaW5nLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGZha2VyLm5hbWUuZmlyc3ROYW1lKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuVGV4dCxcbiAgICAgICAgZGlzcGxheURhdGE6IGZpcnN0TmFtZSxcbiAgICAgICAgZGF0YTogZmlyc3ROYW1lLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkxhc3QgbmFtZVwiLFxuICAgIGlkOiBcIkxhc3QgbmFtZVwiLFxuICAgIGdyb3VwOiBncm91cCA/IFwiTmFtZVwiIDogdW5kZWZpbmVkLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlclN0cmluZyxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0TmFtZSA9IGZha2VyLm5hbWUubGFzdE5hbWUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogbGFzdE5hbWUsXG4gICAgICAgIGRhdGE6IGxhc3ROYW1lLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkF2YXRhclwiLFxuICAgIGlkOiBcIkF2YXRhclwiLFxuICAgIGdyb3VwOiBncm91cCA/IFwiSW5mb1wiIDogdW5kZWZpbmVkLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlckltYWdlLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IG4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLkltYWdlLFxuICAgICAgICBkYXRhOiBbYGh0dHBzOi8vcGljc3VtLnBob3Rvcy9pZC8ke259LzkwMC85MDBgXSxcbiAgICAgICAgZGlzcGxheURhdGE6IFtgaHR0cHM6Ly9waWNzdW0ucGhvdG9zL2lkLyR7bn0vNDAvNDBgXSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxuICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJFbWFpbFwiLFxuICAgIGlkOiBcIkVtYWlsXCIsXG4gICAgZ3JvdXA6IGdyb3VwID8gXCJJbmZvXCIgOiB1bmRlZmluZWQsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyU3RyaW5nLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGVtYWlsID0gZmFrZXIuaW50ZXJuZXQuZW1haWwoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogZW1haWwsXG4gICAgICAgIGRhdGE6IGVtYWlsLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIlRpdGxlXCIsXG4gICAgaWQ6IFwiVGl0bGVcIixcbiAgICBncm91cDogZ3JvdXAgPyBcIkluZm9cIiA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJTdHJpbmcsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgY29uc3QgY29tcGFueSA9IGZha2VyLm5hbWUuam9iVGl0bGUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkaXNwbGF5RGF0YTogY29tcGFueSxcbiAgICAgICAgZGF0YTogY29tcGFueSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxuICAgICAgICByZWFkb25seTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJNb3JlIEluZm9cIixcbiAgICBpZDogXCJNb3JlIEluZm9cIixcbiAgICBncm91cDogZ3JvdXAgPyBcIkluZm9cIiA6IHVuZGVmaW5lZCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJVcmksXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gZmFrZXIuaW50ZXJuZXQudXJsKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuVXJpLFxuICAgICAgICBkaXNwbGF5RGF0YTogdXJsLFxuICAgICAgICBkYXRhOiB1cmwsXG4gICAgICAgIGhvdmVyRWZmZWN0OiB0cnVlLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICBvbkNsaWNrVXJpOiBhID0+IHtcbiAgICAgICAgICB3aW5kb3cub3Blbih1cmwsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgIGEucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1dO1xuICBpZiAoYW1vdW50IDwgZGVmYXVsdENvbHVtbnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRDb2x1bW5zLnNsaWNlKDAsIGFtb3VudCk7XG4gIH1cbiAgY29uc3QgZXh0cmFDb2x1bW5zQW1vdW50ID0gYW1vdW50IC0gZGVmYXVsdENvbHVtbnMubGVuZ3RoO1xuICBjb25zdCBleHRyYUNvbHVtbnMgPSBbLi4ubmV3IEFycmF5KGV4dHJhQ29sdW1uc0Ftb3VudCldLm1hcCgoXywgaW5kZXgpID0+IGNyZWF0ZVRleHRDb2x1bW5JbmZvKGluZGV4ICsgZGVmYXVsdENvbHVtbnMubGVuZ3RoLCBncm91cCkpO1xuICByZXR1cm4gWy4uLmRlZmF1bHRDb2x1bW5zLCAuLi5leHRyYUNvbHVtbnNdO1xufVxuZXhwb3J0IGNsYXNzIENvbnRlbnRDYWNoZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FjaGVkQ29udGVudCA9IG5ldyBNYXAoKTtcbiAgfVxuICBnZXQoY29sLCByb3cpIHtcbiAgICBjb25zdCBjb2xDYWNoZSA9IHRoaXMuY2FjaGVkQ29udGVudC5nZXQoY29sKTtcbiAgICBpZiAoY29sQ2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbENhY2hlW3Jvd107XG4gIH1cbiAgc2V0KGNvbCwgcm93LCB2YWx1ZSkge1xuICAgIGxldCByb3dDYWNoZSA9IHRoaXMuY2FjaGVkQ29udGVudC5nZXQoY29sKTtcbiAgICBpZiAocm93Q2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jYWNoZWRDb250ZW50LnNldChjb2wsIHJvd0NhY2hlID0gW10pO1xuICAgIH1cbiAgICByb3dDYWNoZVtyb3ddID0gdmFsdWU7XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb2NrRGF0YUdlbmVyYXRvcihudW1Db2xzKSB7XG4gIGxldCByZWFkb25seSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcbiAgbGV0IGdyb3VwID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgY29uc3QgY2FjaGUgPSBSZWFjdC51c2VSZWYobmV3IENvbnRlbnRDYWNoZSgpKTtcbiAgY29uc3QgW2NvbHNNYXAsIHNldENvbHNNYXBdID0gUmVhY3QudXNlU3RhdGUoKCkgPT4gZ2V0UmVzaXphYmxlQ29sdW1ucyhudW1Db2xzLCBncm91cCkpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldENvbHNNYXAoZ2V0UmVzaXphYmxlQ29sdW1ucyhudW1Db2xzLCBncm91cCkpO1xuICB9LCBbZ3JvdXAsIG51bUNvbHNdKTtcbiAgY29uc3Qgb25Db2x1bW5SZXNpemUgPSBSZWFjdC51c2VDYWxsYmFjaygoY29sdW1uLCBuZXdTaXplKSA9PiB7XG4gICAgc2V0Q29sc01hcChwcmV2Q29sc01hcCA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHByZXZDb2xzTWFwLmZpbmRJbmRleChjaSA9PiBjaS50aXRsZSA9PT0gY29sdW1uLnRpdGxlKTtcbiAgICAgIGNvbnN0IG5ld0FycmF5ID0gWy4uLnByZXZDb2xzTWFwXTtcbiAgICAgIG5ld0FycmF5LnNwbGljZShpbmRleCwgMSwge1xuICAgICAgICAuLi5wcmV2Q29sc01hcFtpbmRleF0sXG4gICAgICAgIHdpZHRoOiBuZXdTaXplXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9KTtcbiAgfSwgW10pO1xuICBjb25zdCBjb2xzID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGNvbHNNYXAubWFwKGdldEdyaWRDb2x1bW4pO1xuICB9LCBbY29sc01hcF0pO1xuICBjb25zdCBjb2xzTWFwUmVmID0gUmVhY3QudXNlUmVmKGNvbHNNYXApO1xuICBjb2xzTWFwUmVmLmN1cnJlbnQgPSBjb2xzTWFwO1xuICBjb25zdCBnZXRDZWxsQ29udGVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKF9yZWYgPT4ge1xuICAgIGxldCBbY29sLCByb3ddID0gX3JlZjtcbiAgICBsZXQgdmFsID0gY2FjaGUuY3VycmVudC5nZXQoY29sLCByb3cpO1xuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsID0gY29sc01hcFJlZi5jdXJyZW50W2NvbF0uZ2V0Q29udGVudCgpO1xuICAgICAgaWYgKCFyZWFkb25seSAmJiBpc1RleHRFZGl0YWJsZUdyaWRDZWxsKHZhbCkpIHtcbiAgICAgICAgdmFsID0ge1xuICAgICAgICAgIC4uLnZhbCxcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY2FjaGUuY3VycmVudC5zZXQoY29sLCByb3csIHZhbCk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG4gIH0sIFtyZWFkb25seV0pO1xuICBjb25zdCBzZXRDZWxsVmFsdWVSYXcgPSBSZWFjdC51c2VDYWxsYmFjaygoX3JlZjIsIHZhbCkgPT4ge1xuICAgIGxldCBbY29sLCByb3ddID0gX3JlZjI7XG4gICAgY2FjaGUuY3VycmVudC5zZXQoY29sLCByb3csIHZhbCk7XG4gIH0sIFtdKTtcbiAgY29uc3Qgc2V0Q2VsbFZhbHVlID0gUmVhY3QudXNlQ2FsbGJhY2soKF9yZWYzLCB2YWwpID0+IHtcbiAgICBsZXQgW2NvbCwgcm93XSA9IF9yZWYzO1xuICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudC5nZXQoY29sLCByb3cpO1xuICAgIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnQgPSBjb2xzTWFwW2NvbF0uZ2V0Q29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoaXNFZGl0YWJsZUdyaWRDZWxsKHZhbCkgJiYgaXNFZGl0YWJsZUdyaWRDZWxsKGN1cnJlbnQpKSB7XG4gICAgICBjb25zdCBjb3BpZWQgPSBsb3NzeUNvcHlEYXRhKHZhbCwgY3VycmVudCk7XG4gICAgICBjYWNoZS5jdXJyZW50LnNldChjb2wsIHJvdywge1xuICAgICAgICAuLi5jb3BpZWQsXG4gICAgICAgIGRpc3BsYXlEYXRhOiB0eXBlb2YgY29waWVkLmRhdGEgPT09IFwic3RyaW5nXCIgPyBjb3BpZWQuZGF0YSA6IGNvcGllZC5kaXNwbGF5RGF0YSxcbiAgICAgICAgbGFzdFVwZGF0ZWQ6IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFtjb2xzTWFwXSk7XG4gIHJldHVybiB7XG4gICAgY29scyxcbiAgICBnZXRDZWxsQ29udGVudCxcbiAgICBvbkNvbHVtblJlc2l6ZSxcbiAgICBzZXRDZWxsVmFsdWUsXG4gICAgc2V0Q2VsbFZhbHVlUmF3XG4gIH07XG59XG5leHBvcnQgY29uc3QgS2V5TmFtZSA9IHN0eWxlZC5rYmRgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICBjb2xvcjogIzJiMmIyYjtcbiAgICBwYWRkaW5nOiAycHggNnB4O1xuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XG4gICAgbWFyZ2luOiAwIDAuMWVtO1xuYDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIHNtb290aFNjcm9sbFg6IHRydWUsXG4gIHNtb290aFNjcm9sbFk6IHRydWUsXG4gIGdldENlbGxzRm9yU2VsZWN0aW9uOiB0cnVlLFxuICB3aWR0aDogXCIxMDAlXCJcbn07XG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDZWxsKGNlbGwpIHtcbiAgc3dpdGNoIChjZWxsLmtpbmQpIHtcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5Cb29sZWFuOlxuICAgICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmNlbGwsXG4gICAgICAgICAgZGF0YTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5JbWFnZTpcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jZWxsLFxuICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgIGRpc3BsYXlEYXRhOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIGNhc2UgR3JpZENlbGxLaW5kLkRyaWxsZG93bjpcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5CdWJibGU6XG4gICAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uY2VsbCxcbiAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIGNhc2UgR3JpZENlbGxLaW5kLlVyaTpcbiAgICBjYXNlIEdyaWRDZWxsS2luZC5NYXJrZG93bjpcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jZWxsLFxuICAgICAgICAgIGRhdGE6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICBjYXNlIEdyaWRDZWxsS2luZC5UZXh0OlxuICAgICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmNlbGwsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgICBkaXNwbGF5RGF0YTogXCJcIlxuICAgICAgICB9O1xuICAgICAgfVxuICAgIGNhc2UgR3JpZENlbGxLaW5kLk51bWJlcjpcbiAgICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5jZWxsLFxuICAgICAgICAgIGRhdGE6IDAsXG4gICAgICAgICAgZGlzcGxheURhdGE6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbDtcbn1cbmZ1bmN0aW9uIGdldENvbHVtbnNGb3JDZWxsVHlwZXMoKSB7XG4gIHJldHVybiBbe1xuICAgIHRpdGxlOiBcIlJvdyBJRFwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyUm93SUQsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlJvd0lELFxuICAgICAgICBkYXRhOiBmYWtlci5kYXRhdHlwZS51dWlkKCksXG4gICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJQcm90ZWN0ZWRcIixcbiAgICB3aWR0aDogMTIwLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlckNvZGUsXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlByb3RlY3RlZCxcbiAgICAgICAgZGF0YTogZmFrZXIuZmluYW5jZS5iaXRjb2luQWRkcmVzcygpLFxuICAgICAgICBhbGxvd092ZXJsYXk6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkxvYWRpbmdcIixcbiAgICB3aWR0aDogMTIwLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlclN0cmluZyxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuTG9hZGluZyxcbiAgICAgICAgYWxsb3dPdmVybGF5OiBmYWxzZSxcbiAgICAgICAgc2tlbGV0b25XaWR0aDogNzAsXG4gICAgICAgIHNrZWxldG9uV2lkdGhWYXJpYWJpbGl0eTogMjVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAgdGl0bGU6IFwiVGV4dFwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyQ29kZSxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gZmFrZXIubmFtZS5maXJzdE5hbWUoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICBkYXRhOiBuYW1lLFxuICAgICAgICBkaXNwbGF5RGF0YTogbmFtZSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIk51bWJlclwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyTnVtYmVyLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGFnZSA9IGZha2VyLmRhdGF0eXBlLm51bWJlcigxMDApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLk51bWJlcixcbiAgICAgICAgZGF0YTogYWdlLFxuICAgICAgICBkaXNwbGF5RGF0YTogYCR7YWdlfWAsXG4gICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICB0aXRsZTogXCJCb29sZWFuXCIsXG4gICAgd2lkdGg6IDEyMCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJCb29sZWFuLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IHJvbGwgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3QgY2hlY2tlZCA9IHJvbGwgPCAwLjEgPyB1bmRlZmluZWQgOiByb2xsIDwgMC4yID8gbnVsbCA6IHJvbGwgPCAwLjY7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuQm9vbGVhbixcbiAgICAgICAgZGF0YTogY2hlY2tlZCxcbiAgICAgICAgYWxsb3dPdmVybGF5OiBmYWxzZSxcbiAgICAgICAgcmVhZG9ubHk6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkltYWdlXCIsXG4gICAgd2lkdGg6IDEyMCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJJbWFnZSxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuSW1hZ2UsXG4gICAgICAgIGRhdGE6IFtgJHtmYWtlci5pbWFnZS5hbmltYWxzKDQwLCA0MCl9P3JhbmRvbT0ke2Zha2VyLmRhdGF0eXBlLm51bWJlcigxMDAwMDApfWBdLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIlVyaVwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyVXJpLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IGZha2VyLmludGVybmV0LnVybCgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlVyaSxcbiAgICAgICAgZGF0YTogdXJsLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAgdGl0bGU6IFwiTWFya2Rvd25cIixcbiAgICB3aWR0aDogMTIwLFxuICAgIGljb246IEdyaWRDb2x1bW5JY29uLkhlYWRlck1hcmtkb3duLFxuICAgIGhhc01lbnU6IGZhbHNlLFxuICAgIGdldENvbnRlbnQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IG1hcmtkb3duID0gYCMgVGl0bGVcbkhlbGxvIG15IG5hbWUgaXMgKiR7ZmFrZXIubmFtZS5maXJzdE5hbWUoKX0qXG5cbiMjIFRPRE86XG5Ucnkgb3V0IFtHbGlkZV0oaHR0cHM6Ly93d3cuZ2xpZGVhcHBzLmNvbS8pXG5gO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLk1hcmtkb3duLFxuICAgICAgICBkYXRhOiBtYXJrZG93bixcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfSwge1xuICAgIHRpdGxlOiBcIkJ1YmJsZVwiLFxuICAgIHdpZHRoOiAxMjAsXG4gICAgaWNvbjogR3JpZENvbHVtbkljb24uSGVhZGVyQXJyYXksXG4gICAgaGFzTWVudTogZmFsc2UsXG4gICAgZ2V0Q29udGVudDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLkJ1YmJsZSxcbiAgICAgICAgZGF0YTogW2Zha2VyLmxvcmVtLndvcmQoKSwgZmFrZXIubG9yZW0ud29yZCgpLCBmYWtlci5sb3JlbS53b3JkKCldLFxuICAgICAgICBhbGxvd092ZXJsYXk6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAgdGl0bGU6IFwiRHJpbGxkb3duXCIsXG4gICAgd2lkdGg6IDEyMCxcbiAgICBpY29uOiBHcmlkQ29sdW1uSWNvbi5IZWFkZXJBcnJheSxcbiAgICBoYXNNZW51OiBmYWxzZSxcbiAgICBnZXRDb250ZW50OiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuRHJpbGxkb3duLFxuICAgICAgICBkYXRhOiBbe1xuICAgICAgICAgIHRleHQ6IGZha2VyLmFkZHJlc3MuY2l0eU5hbWUoKSxcbiAgICAgICAgICBpbWc6IGAke2Zha2VyLmltYWdlLm5hdHVyZSg0MCwgNDApfT9yYW5kb209JHtmYWtlci5kYXRhdHlwZS5udW1iZXIoMTAwMDAwKX1gXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB0ZXh0OiBmYWtlci5hZGRyZXNzLmNpdHlOYW1lKCksXG4gICAgICAgICAgaW1nOiBgJHtmYWtlci5pbWFnZS5uYXR1cmUoNDAsIDQwKX0/cmFuZG9tPSR7ZmFrZXIuZGF0YXR5cGUubnVtYmVyKDEwMDAwMCl9YFxuICAgICAgICB9XSxcbiAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfV07XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlQWxsTW9ja2VkS2luZHMoKSB7XG4gIGNvbnN0IGNhY2hlID0gUmVhY3QudXNlUmVmKG5ldyBDb250ZW50Q2FjaGUoKSk7XG4gIGNvbnN0IFtjb2xzTWFwLCBzZXRDb2xzTWFwXSA9IFJlYWN0LnVzZVN0YXRlKGdldENvbHVtbnNGb3JDZWxsVHlwZXMpO1xuICBjb25zdCBvbkNvbHVtblJlc2l6ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKChjb2x1bW4sIG5ld1NpemUpID0+IHtcbiAgICBzZXRDb2xzTWFwKHByZXZDb2xzTWFwID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gcHJldkNvbHNNYXAuZmluZEluZGV4KGNpID0+IGNpLnRpdGxlID09PSBjb2x1bW4udGl0bGUpO1xuICAgICAgY29uc3QgbmV3QXJyYXkgPSBbLi4ucHJldkNvbHNNYXBdO1xuICAgICAgbmV3QXJyYXkuc3BsaWNlKGluZGV4LCAxLCB7XG4gICAgICAgIC4uLnByZXZDb2xzTWFwW2luZGV4XSxcbiAgICAgICAgd2lkdGg6IG5ld1NpemVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH0pO1xuICB9LCBbXSk7XG4gIGNvbnN0IGNvbHMgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gY29sc01hcC5tYXAoZ2V0R3JpZENvbHVtbik7XG4gIH0sIFtjb2xzTWFwXSk7XG4gIGNvbnN0IFt1cGRhdGVWZXJzaW9uLCBzZXRVcGRhdGVWZXJzaW9uXSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuICBjb25zdCBnZXRDZWxsQ29udGVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKF9yZWY0ID0+IHtcbiAgICBsZXQgW2NvbCwgcm93XSA9IF9yZWY0O1xuICAgIG5vb3AodXBkYXRlVmVyc2lvbik7XG4gICAgbGV0IHZhbCA9IGNhY2hlLmN1cnJlbnQuZ2V0KGNvbCwgcm93KTtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbCA9IGNvbHNNYXBbY29sXS5nZXRDb250ZW50KCk7XG4gICAgICBjYWNoZS5jdXJyZW50LnNldChjb2wsIHJvdywgdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbiAgfSwgW2NvbHNNYXAsIHVwZGF0ZVZlcnNpb25dKTtcbiAgY29uc3Qgc2V0Q2VsbFZhbHVlID0gUmVhY3QudXNlQ2FsbGJhY2soKF9yZWY1LCB2YWwsIG5vRGlzcGxheSwgZm9yY2VVcGRhdGUpID0+IHtcbiAgICBsZXQgW2NvbCwgcm93XSA9IF9yZWY1O1xuICAgIGxldCBjdXJyZW50ID0gY2FjaGUuY3VycmVudC5nZXQoY29sLCByb3cpO1xuICAgIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnQgPSBjb2xzTWFwW2NvbF0uZ2V0Q29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoaXNFZGl0YWJsZUdyaWRDZWxsKHZhbCkgJiYgaXNFZGl0YWJsZUdyaWRDZWxsKGN1cnJlbnQpKSB7XG4gICAgICB2YXIgX2NvcGllZCRkYXRhJHRvU3RyaW5nLCBfY29waWVkJGRhdGE7XG4gICAgICBjb25zdCBjb3BpZWQgPSBsb3NzeUNvcHlEYXRhKHZhbCwgY3VycmVudCk7XG4gICAgICBjYWNoZS5jdXJyZW50LnNldChjb2wsIHJvdywge1xuICAgICAgICAuLi5jb3BpZWQsXG4gICAgICAgIGRpc3BsYXlEYXRhOiBub0Rpc3BsYXkgPT09IHRydWUgPyB1bmRlZmluZWQgOiAoX2NvcGllZCRkYXRhJHRvU3RyaW5nID0gKF9jb3BpZWQkZGF0YSA9IGNvcGllZC5kYXRhKSA9PT0gbnVsbCB8fCBfY29waWVkJGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jb3BpZWQkZGF0YS50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfY29waWVkJGRhdGEkdG9TdHJpbmcgIT09IHZvaWQgMCA/IF9jb3BpZWQkZGF0YSR0b1N0cmluZyA6IFwiXCJcbiAgICAgIH0pO1xuICAgICAgaWYgKGZvcmNlVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICAgIHNldFVwZGF0ZVZlcnNpb24odiA9PiB2ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbY29sc01hcF0pO1xuICByZXR1cm4ge1xuICAgIGNvbHMsXG4gICAgZ2V0Q2VsbENvbnRlbnQsXG4gICAgb25Db2x1bW5SZXNpemUsXG4gICAgc2V0Q2VsbFZhbHVlXG4gIH07XG59Il19*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./packages/core/src/data-editor/stories/utils.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/stories/utils.tsx":
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_utils_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/core/src/data-editor/stories/utils.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_utils_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=5174.3dbc9502.iframe.bundle.js.map