(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[4805],{

/***/ "./packages/source/src/stories/use-data-source.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "MoreInfo": () => (/* binding */ MoreInfo),
  "UndoRedo": () => (/* binding */ UndoRedo),
  "UseDataSource": () => (/* binding */ UseDataSource),
  "__namedExportsOrder": () => (/* binding */ __namedExportsOrder),
  "default": () => (/* binding */ use_data_source_stories)
});

// EXTERNAL MODULE: ./node_modules/@linaria/react/dist/index.mjs + 2 modules
var dist = __webpack_require__("./node_modules/@linaria/react/dist/index.mjs");
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/react-resize-detector/build/index.esm.js
var index_esm = __webpack_require__("./node_modules/react-resize-detector/build/index.esm.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/internal/data-grid/data-grid-types.js
var data_grid_types = __webpack_require__("./packages/core/dist/esm/internal/data-grid/data-grid-types.js");
// EXTERNAL MODULE: ./packages/core/dist/esm/data-editor-all.js + 63 modules
var data_editor_all = __webpack_require__("./packages/core/dist/esm/data-editor-all.js");
// EXTERNAL MODULE: ./node_modules/@faker-js/faker/dist/esm/index.mjs + 57 modules
var esm = __webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs");
// EXTERNAL MODULE: ./node_modules/lodash/orderBy.js
var orderBy = __webpack_require__("./node_modules/lodash/orderBy.js");
var orderBy_default = /*#__PURE__*/__webpack_require__.n(orderBy);
;// CONCATENATED MODULE: ./packages/source/src/use-movable-columns.ts


function colToKey(c) {
  var _c$id, _c$group;
  return (_c$id = c.id) !== null && _c$id !== void 0 ? _c$id : `${(_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : ""}/${c.title}`;
}
function looseCompareCol(a, b) {
  if (typeof b === "string") {
    return colToKey(a) === b;
  }
  return colToKey(a) === colToKey(b);
}
function getSortIndexByKey(needle, current, keys) {
  const index = current.indexOf(needle);
  if (index === -1) return Number.MAX_SAFE_INTEGER;
  const remapped = keys.findIndex(key => looseCompareCol(needle, key));
  if (remapped !== -1) return remapped;
  for (let n = index; n >= 0; n--) {
    const ind = keys.findIndex(key => looseCompareCol(current[n], key));
    if (ind !== -1) return ind + 0.5;
  }
  return -1;
}
function useMoveableColumns(p) {
  const {
    columns: columnsIn,
    getCellContent: getCellContentIn,
    onColumnMoved: onColumnMovedIn
  } = p;
  const [keys, setKeys] = react.useState(() => columnsIn.map(colToKey));
  const columns = react.useMemo(() => {
    return orderBy_default()(columnsIn, c => getSortIndexByKey(c, columnsIn, keys));
  }, [keys, columnsIn]);
  const onColumnMovedRef = react.useRef(onColumnMovedIn);
  onColumnMovedRef.current = onColumnMovedIn;
  const onColumnMoved = react.useCallback((startIndex, endIndex) => {
    var _onColumnMovedRef$cur;
    setKeys(old => {
      const newCols = [...old];
      const [toMove] = newCols.splice(startIndex, 1);
      newCols.splice(endIndex, 0, toMove);
      return newCols;
    });
    (_onColumnMovedRef$cur = onColumnMovedRef.current) === null || _onColumnMovedRef$cur === void 0 || _onColumnMovedRef$cur.call(onColumnMovedRef, startIndex, endIndex);
  }, []);
  react.useEffect(() => {
    setKeys(cv => {
      return orderBy_default()(columnsIn, x => getSortIndexByKey(x, columnsIn, cv)).map(colToKey);
    });
  }, [columnsIn]);
  const getCellContent = react.useCallback(cell => {
    const [col, row] = cell;
    const needle = columns[col];
    const index = columnsIn.indexOf(needle);
    return getCellContentIn([index, row]);
  }, [columns, columnsIn, getCellContentIn]);
  return {
    columns,
    onColumnMoved,
    getCellContent
  };
}
// EXTERNAL MODULE: ./node_modules/lodash/range.js
var range = __webpack_require__("./node_modules/lodash/range.js");
var range_default = /*#__PURE__*/__webpack_require__.n(range);
;// CONCATENATED MODULE: ./packages/source/src/use-column-sort.ts



function cellToSortData(c) {
  var _c$data$toString, _c$data, _c$data$toString2, _c$data2, _c$data3;
  switch (c.kind) {
    case data_grid_types/* GridCellKind.Number */.p6.Number:
      return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
    case data_grid_types/* GridCellKind.Boolean */.p6.Boolean:
      return (_c$data$toString2 = (_c$data2 = c.data) === null || _c$data2 === void 0 ? void 0 : _c$data2.toString()) !== null && _c$data$toString2 !== void 0 ? _c$data$toString2 : "";
    case data_grid_types/* GridCellKind.Markdown */.p6.Markdown:
    case data_grid_types/* GridCellKind.RowID */.p6.RowID:
    case data_grid_types/* GridCellKind.Text */.p6.Text:
    case data_grid_types/* GridCellKind.Uri */.p6.Uri:
      return (_c$data3 = c.data) !== null && _c$data3 !== void 0 ? _c$data3 : "";
    case data_grid_types/* GridCellKind.Bubble */.p6.Bubble:
    case data_grid_types/* GridCellKind.Image */.p6.Image:
      return c.data.join("");
    case data_grid_types/* GridCellKind.Drilldown */.p6.Drilldown:
      return c.data.map(x => x.text).join("");
    case data_grid_types/* GridCellKind.Protected */.p6.Protected:
    case data_grid_types/* GridCellKind.Loading */.p6.Loading:
      return "";
    case data_grid_types/* GridCellKind.Custom */.p6.Custom:
      return c.copyData;
  }
}
function tryParse(val) {
  if (typeof val === "number") return val;
  if (val.length > 0) {
    const x = Number(val);
    if (!isNaN(x)) {
      val = x;
    }
  }
  return val;
}
function compareSmart(a, b) {
  a = tryParse(a);
  b = tryParse(b);
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  } else if (typeof a === "number" && typeof b === "number") {
    if (a === b) return 0;
    return a > b ? 1 : -1;
  } else if (a == b) {
    return 0;
  }
  return a > b ? 1 : -1;
}
function compareRaw(a, b) {
  if (a > b) return 1;
  if (a === b) return 0;
  return -1;
}
function useColumnSort(p) {
  var _sort$direction;
  const {
    sort,
    rows,
    getCellContent: getCellContentIn
  } = p;
  let sortCol = sort === undefined ? undefined : p.columns.findIndex(c => sort.column === c || c.id !== undefined && sort.column.id === c.id);
  if (sortCol === -1) sortCol = undefined;
  const dir = (_sort$direction = sort === null || sort === void 0 ? void 0 : sort.direction) !== null && _sort$direction !== void 0 ? _sort$direction : "asc";
  const sortMap = react.useMemo(() => {
    if (sortCol === undefined) return undefined;
    const vals = new Array(rows);
    const index = [sortCol, 0];
    for (let i = 0; i < rows; i++) {
      index[1] = i;
      vals[i] = cellToSortData(getCellContentIn(index));
    }
    let result;
    if ((sort === null || sort === void 0 ? void 0 : sort.mode) === "raw") {
      result = range_default()(rows).sort((a, b) => compareRaw(vals[a], vals[b]));
    } else if ((sort === null || sort === void 0 ? void 0 : sort.mode) === "smart") {
      result = range_default()(rows).sort((a, b) => compareSmart(vals[a], vals[b]));
    } else {
      result = range_default()(rows).sort((a, b) => vals[a].localeCompare(vals[b]));
    }
    if (dir === "desc") {
      result.reverse();
    }
    return result;
  }, [getCellContentIn, rows, sort === null || sort === void 0 ? void 0 : sort.mode, dir, sortCol]);
  const getOriginalIndex = react.useCallback(index => {
    if (sortMap === undefined) return index;
    return sortMap[index];
  }, [sortMap]);
  const getCellContent = react.useCallback(_ref => {
    let [col, row] = _ref;
    if (sortMap === undefined) return getCellContentIn([col, row]);
    row = sortMap[row];
    return getCellContentIn([col, row]);
  }, [getCellContentIn, sortMap]);
  if (sortMap === undefined) {
    return {
      getCellContent: p.getCellContent,
      getOriginalIndex
    };
  }
  return {
    getOriginalIndex,
    getCellContent
  };
}
;// CONCATENATED MODULE: ./packages/source/src/use-collapsing-groups.ts

function useCollapsingGroups(props) {
  const [collapsed, setCollapsed] = react.useState([]);
  const [gridSelectionInner, setGridSelectionsInner] = react.useState(undefined);
  const {
    columns: columnsIn,
    onGroupHeaderClicked: onGroupHeaderClickedIn,
    onGridSelectionChange: onGridSelectionChangeIn,
    getGroupDetails: getGroupDetailsIn,
    gridSelection: gridSelectionIn,
    freezeColumns = 0,
    theme
  } = props;
  const gridSelection = gridSelectionIn !== null && gridSelectionIn !== void 0 ? gridSelectionIn : gridSelectionInner;
  const spans = react.useMemo(() => {
    const result = [];
    let current = [-1, -1];
    let lastGroup;
    for (let i = freezeColumns; i < columnsIn.length; i++) {
      var _c$group;
      const c = columnsIn[i];
      const group = (_c$group = c.group) !== null && _c$group !== void 0 ? _c$group : "";
      const isCollapsed = collapsed.includes(group);
      if (lastGroup !== group && current[0] !== -1) {
        result.push(current);
        current = [-1, -1];
      }
      if (isCollapsed && current[0] !== -1) {
        current[1] += 1;
      } else if (isCollapsed) {
        current = [i, 1];
      } else if (current[0] !== -1) {
        result.push(current);
        current = [-1, -1];
      }
      lastGroup = group;
    }
    if (current[0] !== -1) result.push(current);
    return result;
  }, [collapsed, columnsIn, freezeColumns]);
  const columns = react.useMemo(() => {
    if (spans.length === 0) return columnsIn;
    return columnsIn.map((c, index) => {
      for (const [start, length] of spans) {
        if (index >= start && index < start + length) {
          let width = 8;
          if (index === start + length - 1) {
            width = 36;
          }
          return {
            ...c,
            width,
            themeOverride: {
              bgCell: theme.bgCellMedium
            }
          };
        }
      }
      return c;
    });
  }, [columnsIn, spans, theme.bgCellMedium]);
  const onGroupHeaderClicked = react.useCallback((index, a) => {
    var _columns$index$group, _columns$index;
    onGroupHeaderClickedIn === null || onGroupHeaderClickedIn === void 0 || onGroupHeaderClickedIn(index, a);
    const group = (_columns$index$group = (_columns$index = columns[index]) === null || _columns$index === void 0 ? void 0 : _columns$index.group) !== null && _columns$index$group !== void 0 ? _columns$index$group : "";
    if (group === "") return;
    a.preventDefault();
    setCollapsed(cv => cv.includes(group) ? cv.filter(x => x !== group) : [...cv, group]);
  }, [columns, onGroupHeaderClickedIn]);
  const onGridSelectionChange = react.useCallback(s => {
    if (s.current !== undefined) {
      const col = s.current.cell[0];
      const column = columns[col];
      setCollapsed(cv => {
        var _column$group;
        if (cv.includes((_column$group = column === null || column === void 0 ? void 0 : column.group) !== null && _column$group !== void 0 ? _column$group : "")) {
          return cv.filter(g => g !== column.group);
        }
        return cv;
      });
    }
    if (onGridSelectionChangeIn !== undefined) {
      onGridSelectionChangeIn(s);
    } else {
      setGridSelectionsInner(s);
    }
  }, [columns, onGridSelectionChangeIn]);
  const getGroupDetails = react.useCallback(group => {
    const result = getGroupDetailsIn === null || getGroupDetailsIn === void 0 ? void 0 : getGroupDetailsIn(group);
    return {
      ...result,
      name: group,
      overrideTheme: collapsed.includes(group !== null && group !== void 0 ? group : "") ? {
        bgHeader: theme.bgHeaderHasFocus
      } : undefined
    };
  }, [collapsed, getGroupDetailsIn, theme.bgHeaderHasFocus]);
  return {
    columns,
    onGroupHeaderClicked,
    onGridSelectionChange,
    getGroupDetails,
    gridSelection
  };
}
;// CONCATENATED MODULE: ./packages/source/src/use-undo-redo.ts

const initialState = {
  undoHistory: [],
  redoHistory: [],
  canUndo: false,
  canRedo: false,
  isApplyingUndo: false,
  isApplyingRedo: false
};
function reducer(state, action) {
  const newState = {
    ...state
  };
  switch (action.type) {
    case "undo":
      if (state.canUndo) {
        newState.undoHistory = [...state.undoHistory];
        const operation = newState.undoHistory.pop();
        newState.operation = operation;
        newState.canUndo = newState.undoHistory.length > 0;
        newState.isApplyingUndo = true;
        return newState;
      }
      return state;
    case "redo":
      if (state.canRedo) {
        newState.redoHistory = [...state.redoHistory];
        const operation = newState.redoHistory.pop();
        newState.operation = operation;
        newState.canRedo = newState.redoHistory.length > 0;
        newState.isApplyingRedo = true;
        return newState;
      }
      return state;
    case "operationApplied":
      newState.operation = undefined;
      newState.isApplyingRedo = false;
      newState.isApplyingUndo = false;
      return newState;
    case "edit":
      if (!state.isApplyingRedo && !state.isApplyingUndo) {
        newState.undoHistory = [...state.undoHistory, action.batch];
        newState.redoHistory = [];
        newState.canUndo = true;
        newState.canRedo = false;
      }
      if (state.isApplyingUndo) {
        newState.redoHistory = [...state.redoHistory, action.batch];
        newState.canRedo = true;
      }
      if (state.isApplyingRedo) {
        newState.undoHistory = [...state.undoHistory, action.batch];
        newState.canUndo = true;
      }
      return newState;
    default:
      throw new Error("Invalid action");
  }
}
function useUndoRedo(gridRef, getCellContent, onCellEdited, onGridSelectionChange) {
  const [state, dispatch] = (0,react.useReducer)(reducer, initialState);
  const currentBatch = (0,react.useRef)(null);
  const timeout = (0,react.useRef)(null);
  const isApplyingUndoRef = (0,react.useRef)(false);
  const isApplyingRedoRef = (0,react.useRef)(false);
  (0,react.useEffect)(() => {
    isApplyingUndoRef.current = state.isApplyingUndo;
    isApplyingRedoRef.current = state.isApplyingRedo;
  }, [state.isApplyingUndo, state.isApplyingRedo]);
  const [gridSelection, setGridSelection] = (0,react.useState)(null);
  const gridSelectionRef = (0,react.useRef)(null);
  const onGridSelectionChangedEdited = (0,react.useCallback)(newVal => {
    if (onGridSelectionChange) {
      onGridSelectionChange(newVal);
    }
    setGridSelection(newVal);
    gridSelectionRef.current = newVal;
  }, [onGridSelectionChange]);
  const wrappedOnCellEdited = (0,react.useCallback)((cell, newValue) => {
    const isApplyingUpdate = isApplyingUndoRef.current || isApplyingRedoRef.current;
    if (!isApplyingUpdate && gridSelectionRef.current) {
      clearTimeout(timeout.current);
      const previousValue = getCellContent(cell);
      if (currentBatch.current === null) {
        currentBatch.current = {
          edits: [],
          selection: gridSelectionRef.current
        };
      }
      currentBatch.current.edits.push({
        cell,
        newValue: previousValue
      });
      timeout.current = setTimeout(() => {
        if (currentBatch.current) {
          dispatch({
            type: "edit",
            batch: currentBatch.current
          });
          currentBatch.current = null;
        }
      }, 0);
    }
    onCellEdited(cell, newValue);
  }, [onCellEdited, getCellContent]);
  const undo = (0,react.useCallback)(() => {
    dispatch({
      type: "undo"
    });
  }, [dispatch]);
  const redo = (0,react.useCallback)(() => {
    dispatch({
      type: "redo"
    });
  }, [dispatch]);
  (0,react.useEffect)(() => {
    if (state.operation && gridSelectionRef.current && gridRef.current) {
      const cells = [];
      const previousState = {
        edits: [],
        selection: gridSelectionRef.current
      };
      for (const edit of state.operation.edits) {
        const prevValue = getCellContent(edit.cell);
        previousState.edits.push({
          cell: edit.cell,
          newValue: prevValue
        });
        onCellEdited(edit.cell, edit.newValue);
        cells.push({
          cell: edit.cell
        });
      }
      setGridSelection(state.operation.selection);
      gridSelectionRef.current = state.operation.selection;
      gridRef.current.updateCells(cells);
      dispatch({
        type: "edit",
        batch: previousState
      });
      dispatch({
        type: "operationApplied"
      });
    }
  }, [state.operation, gridRef, onCellEdited, setGridSelection, getCellContent]);
  (0,react.useEffect)(() => {
    const onKeyDown = e => {
      if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if (e.key === "y" && (e.metaKey || e.ctrlKey)) {
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [undo, redo]);
  return (0,react.useMemo)(() => {
    return {
      undo,
      redo,
      canUndo: state.canUndo,
      canRedo: state.canRedo,
      onCellEdited: wrappedOnCellEdited,
      onGridSelectionChange: onGridSelectionChangedEdited,
      gridSelection
    };
  }, [undo, redo, wrappedOnCellEdited, state.canUndo, state.canRedo, onGridSelectionChangedEdited, gridSelection]);
}
// EXTERNAL MODULE: ./node_modules/lodash/isArray.js
var isArray = __webpack_require__("./node_modules/lodash/isArray.js");
var isArray_default = /*#__PURE__*/__webpack_require__.n(isArray);
;// CONCATENATED MODULE: ./packages/source/src/stories/utils.tsx




esm/* faker.seed */.We.seed(1337);
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
    case data_grid_types/* GridCellKind.Uri */.p6.Uri:
      {
        var _sourceData$toString;
        if (isArray_default()(sourceData)) {
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
    case data_grid_types/* GridCellKind.Boolean */.p6.Boolean:
      {
        if (isArray_default()(sourceData)) {
          return {
            ...target,
            data: sourceData[0] !== undefined
          };
        } else if (source.kind === data_grid_types/* GridCellKind.Boolean */.p6.Boolean) {
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
    case data_grid_types/* GridCellKind.Image */.p6.Image:
      {
        var _sourceData$toString2;
        if (isArray_default()(sourceData)) {
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
    case data_grid_types/* GridCellKind.Number */.p6.Number:
      {
        return {
          ...target,
          data: 0
        };
      }
    case data_grid_types/* GridCellKind.Text */.p6.Text:
    case data_grid_types/* GridCellKind.Markdown */.p6.Markdown:
      {
        var _source$data$toString, _source$data;
        if (isArray_default()(sourceData)) {
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
    case data_grid_types/* GridCellKind.Custom */.p6.Custom:
      {
        return target;
      }
  }
  assertNever(target);
}
function getGridColumn(columnWithMock) {
  const {
    getContent,
    ...rest
  } = columnWithMock;
  return rest;
}
function getResizableColumns(amount, group) {
  const defaultColumns = [{
    title: "First name",
    id: "First name",
    group: group ? "Name" : undefined,
    icon: data_grid_types/* GridColumnIcon.HeaderString */.PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const firstName = esm/* faker.name.firstName */.We.name.firstName();
      return {
        kind: data_grid_types/* GridCellKind.Text */.p6.Text,
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
    icon: data_grid_types/* GridColumnIcon.HeaderString */.PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const lastName = esm/* faker.name.lastName */.We.name.lastName();
      return {
        kind: data_grid_types/* GridCellKind.Text */.p6.Text,
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
    icon: data_grid_types/* GridColumnIcon.HeaderImage */.PE.HeaderImage,
    hasMenu: false,
    getContent: () => {
      const n = Math.round(Math.random() * 100);
      return {
        kind: data_grid_types/* GridCellKind.Image */.p6.Image,
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
    icon: data_grid_types/* GridColumnIcon.HeaderString */.PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const email = esm/* faker.internet.email */.We.internet.email();
      return {
        kind: data_grid_types/* GridCellKind.Text */.p6.Text,
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
    icon: data_grid_types/* GridColumnIcon.HeaderString */.PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const company = esm/* faker.name.jobTitle */.We.name.jobTitle();
      return {
        kind: data_grid_types/* GridCellKind.Text */.p6.Text,
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
    icon: data_grid_types/* GridColumnIcon.HeaderUri */.PE.HeaderUri,
    hasMenu: false,
    getContent: () => {
      const url = esm/* faker.internet.url */.We.internet.url();
      return {
        kind: data_grid_types/* GridCellKind.Uri */.p6.Uri,
        displayData: url,
        data: url,
        allowOverlay: true,
        readonly: true
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
function createTextColumnInfo(index, group) {
  return {
    title: `Column ${index}`,
    id: `Column ${index}`,
    group: group ? `Group ${Math.round(index / 3)}` : undefined,
    icon: data_grid_types/* GridColumnIcon.HeaderString */.PE.HeaderString,
    hasMenu: false,
    getContent: () => {
      const text = esm/* faker.lorem.word */.We.lorem.word();
      return {
        kind: data_grid_types/* GridCellKind.Text */.p6.Text,
        data: text,
        displayData: text,
        allowOverlay: true,
        readonly: true
      };
    }
  };
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
  const cache = react.useRef(new ContentCache());
  const [colsMap, setColsMap] = react.useState(() => getResizableColumns(numCols, group));
  react.useEffect(() => {
    setColsMap(getResizableColumns(numCols, group));
  }, [group, numCols]);
  const onColumnResize = react.useCallback((column, newSize) => {
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
  const cols = react.useMemo(() => {
    return colsMap.map(getGridColumn);
  }, [colsMap]);
  const colsMapRef = react.useRef(colsMap);
  colsMapRef.current = colsMap;
  const getCellContent = react.useCallback(_ref => {
    let [col, row] = _ref;
    let val = cache.current.get(col, row);
    if (val === undefined) {
      val = colsMapRef.current[col].getContent();
      if (!readonly && (0,data_grid_types/* isTextEditableGridCell */.f)(val)) {
        val = {
          ...val,
          readonly
        };
      }
      cache.current.set(col, row, val);
    }
    return val;
  }, [readonly]);
  const getCellsForSelection = react.useCallback(selection => {
    const result = [];
    for (let y = selection.y; y < selection.y + selection.height; y++) {
      const row = [];
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        row.push(getCellContent([x, y]));
      }
      result.push(row);
    }
    return result;
  }, [getCellContent]);
  const setCellValueRaw = react.useCallback((_ref2, val) => {
    let [col, row] = _ref2;
    cache.current.set(col, row, val);
  }, []);
  const setCellValue = react.useCallback((_ref3, val) => {
    let [col, row] = _ref3;
    let current = cache.current.get(col, row);
    if (current === undefined) {
      current = colsMap[col].getContent();
    }
    if ((0,data_grid_types/* isEditableGridCell */.T9)(val) && (0,data_grid_types/* isEditableGridCell */.T9)(current)) {
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
    getCellsForSelection,
    setCellValueRaw
  };
}
function panic() {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This should not happen";
  throw new Error(message);
}
function assertNever(_never) {
  return panic("Hell froze over");
}
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js");
;// CONCATENATED MODULE: ./packages/source/src/stories/use-data-source.stories.tsx
var __STORY__ = "import { styled } from \"@linaria/react\";\nimport * as React from \"react\";\nimport { useResizeDetector } from \"react-resize-detector\";\nimport {\n    DataEditor,\n    type DataEditorProps,\n    type DataEditorRef,\n    GridCellKind,\n    type GridColumn,\n    type Theme,\n} from \"@glideapps/glide-data-grid\";\nimport { faker } from \"@faker-js/faker\";\nimport { useCollapsingGroups, useColumnSort, useMoveableColumns } from \"../index.js\";\nimport { useUndoRedo } from \"../use-undo-redo.js\";\nimport { useMockDataGenerator } from \"./utils.js\";\n\nfaker.seed(1337);\n\nconst SimpleWrapper = styled.div`\n    box-sizing: border-box;\n\n    *,\n    *::before,\n    *::after {\n        box-sizing: inherit;\n    }\n`;\n\nconst SimpleThemeWrapper: React.FC = p => {\n    return (\n        <SimpleWrapper>\n            <div className=\"content\">{p.children}</div>\n        </SimpleWrapper>\n    );\n};\n\nexport default {\n    title: \"Extra Packages/Source\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst BeautifulStyle = styled.div`\n    background-color: #2790b9;\n    background: linear-gradient(90deg, #2790b9, #2070a9);\n    color: white;\n\n    padding: 32px 48px;\n\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n\n    font-family: sans-serif;\n\n    & > h1 {\n        font-size: 50px;\n        font-weight: 600;\n        flex-shrink: 0;\n        margin: 0 0 12px 0;\n    }\n\n    .sizer {\n        flex-grow: 1;\n\n        background-color: white;\n\n        border-radius: 12px;\n        box-shadow:\n            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,\n            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;\n\n        .sizer-clip {\n            border-radius: 12px;\n            overflow: hidden;\n            transform: translateZ(0);\n\n            height: 100%;\n        }\n    }\n`;\n\ninterface BeautifulProps {\n    title: string;\n    description?: React.ReactNode;\n}\n\nconst BeautifulWrapper: React.FC<BeautifulProps> = p => {\n    const { title, children, description } = p;\n\n    const { ref, width, height } = useResizeDetector();\n\n    return (\n        <BeautifulStyle>\n            <h1>{title}</h1>\n            {description}\n            <div className=\"sizer\">\n                <div className=\"sizer-clip\" ref={ref}>\n                    <div\n                        style={{\n                            position: \"relative\",\n                            width: width ?? 100,\n                            height: height ?? 100,\n                        }}>\n                        {children}\n                    </div>\n                </div>\n            </div>\n        </BeautifulStyle>\n    );\n};\n\nconst Description = styled.p`\n    font-size: 18px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n`;\n\nexport const MoreInfo = styled.p`\n    font-size: 14px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n\n    button {\n        background-color: #f4f4f4;\n        color: #2b2b2b;\n        padding: 2px 6px;\n        font-family: monospace;\n        font-size: 14px;\n        border-radius: 4px;\n        box-shadow: 0px 1px 2px #00000040;\n        margin: 0 0.1em;\n        border: none;\n        cursor: pointer;\n    }\n`;\n\nconst defaultProps: Partial<DataEditorProps> = {\n    smoothScrollX: true,\n    smoothScrollY: true,\n    isDraggable: false,\n    rowMarkers: \"none\",\n    width: \"100%\",\n};\n\nconst testTheme: Theme = {\n    accentColor: \"#4F5DFF\",\n    accentFg: \"#FFFFFF\",\n    accentLight: \"rgba(62, 116, 253, 0.1)\",\n\n    textDark: \"#313139\",\n    textMedium: \"#737383\",\n    textLight: \"#B2B2C0\",\n    textBubble: \"#313139\",\n\n    bgIconHeader: \"#737383\",\n    fgIconHeader: \"#FFFFFF\",\n    textHeader: \"#313139\",\n    textGroupHeader: \"#313139BB\",\n    textHeaderSelected: \"#FFFFFF\",\n\n    bgCell: \"#FFFFFF\",\n    bgCellMedium: \"#FAFAFB\",\n    bgHeader: \"#F7F7F8\",\n    bgHeaderHasFocus: \"#E9E9EB\",\n    bgHeaderHovered: \"#EFEFF1\",\n\n    bgBubble: \"#EDEDF3\",\n    bgBubbleSelected: \"#FFFFFF\",\n\n    headerIconSize: 20,\n    markerFontStyle: \"13px\",\n\n    bgSearchResult: \"#fff9e3\",\n\n    borderColor: \"rgba(115, 116, 131, 0.16)\",\n    horizontalBorderColor: \"rgba(115, 116, 131, 0.16)\",\n    drilldownBorder: \"rgba(0, 0, 0, 0)\",\n\n    linkColor: \"#4F5DFF\",\n\n    cellHorizontalPadding: 8,\n    cellVerticalPadding: 3,\n\n    headerFontStyle: \"600 13px\",\n    baseFontStyle: \"13px\",\n    editorFontSize: \"13px\",\n    lineHeight: 1.4,\n    fontFamily:\n        \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\",\n};\n\nconst cols: GridColumn[] = [\n    {\n        title: \"A\",\n        width: 200,\n        group: \"Group 1\",\n    },\n    {\n        title: \"B\",\n        width: 200,\n        group: \"Group 1\",\n    },\n    {\n        title: \"C\",\n        width: 200,\n        group: \"Group 2\",\n    },\n    {\n        title: \"D\",\n        width: 200,\n        group: \"Group 2\",\n    },\n    {\n        title: \"E\",\n        width: 200,\n        group: \"Group 2\",\n    },\n];\n\nexport const UseDataSource: React.VFC = () => {\n    const cache = React.useRef<Record<string, string>>({});\n\n    const rows = 100_000;\n\n    const moveArgs = useMoveableColumns({\n        columns: cols,\n        getCellContent: React.useCallback(([col, row]) => {\n            if (col === 0) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: true,\n                    data: `${row}`,\n                    displayData: `${row}`,\n                };\n            }\n\n            const key = `${col},${row}`;\n            if (cache.current[key] === undefined) {\n                cache.current[key] = faker.name.firstName() + \" \" + faker.name.lastName();\n            }\n            const d = cache.current[key];\n\n            return {\n                kind: GridCellKind.Text,\n                allowOverlay: true,\n                data: d,\n                displayData: d,\n            };\n        }, []),\n    });\n\n    const [sort, setSort] = React.useState<number>();\n\n    const sortArgs = useColumnSort({\n        columns: moveArgs.columns,\n        getCellContent: moveArgs.getCellContent,\n        rows,\n        sort:\n            sort === undefined\n                ? undefined\n                : {\n                      column: moveArgs.columns[sort],\n                      direction: \"desc\",\n                      mode: \"smart\",\n                  },\n    });\n\n    const collapseArgs = useCollapsingGroups({\n        columns: moveArgs.columns,\n        theme: testTheme,\n        freezeColumns: 0,\n    });\n\n    const onHeaderClick = React.useCallback((index: number) => {\n        setSort(index);\n    }, []);\n\n    return (\n        <BeautifulWrapper title=\"Custom source extensions\" description={<Description>Fixme.</Description>}>\n            <DataEditor\n                {...defaultProps}\n                {...moveArgs}\n                {...sortArgs}\n                {...collapseArgs}\n                rows={rows}\n                onColumnMoved={moveArgs.onColumnMoved}\n                onHeaderClicked={onHeaderClick}\n            />\n        </BeautifulWrapper>\n    );\n};\n(UseDataSource as any).parameters = {\n    options: {\n        showPanel: false,\n    },\n};\n\nexport const UndoRedo: React.VFC = () => {\n    const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(6);\n\n    const gridRef = React.useRef<DataEditorRef>(null);\n\n    const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(\n        gridRef,\n        getCellContent,\n        setCellValue\n    );\n\n    return (\n        <BeautifulWrapper\n            title=\"Undo / Redo Support\"\n            description={\n                <Description>\n                    A simple undo/redo implementation\n                    <MoreInfo>\n                        Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:\n                        <button onClick={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.4 }}>\n                            Undo\n                        </button>\n                        <button onClick={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.4 }}>\n                            Redo\n                        </button>\n                    </MoreInfo>\n                    <MoreInfo>\n                        It works by taking a snapshot of the content of a cell before it is edited and replaying any\n                        edits back.\n                    </MoreInfo>\n                </Description>\n            }>\n            <DataEditor\n                {...defaultProps}\n                ref={gridRef}\n                onCellEdited={onCellEdited}\n                getCellContent={getCellContent}\n                gridSelection={gridSelection ?? undefined}\n                onGridSelectionChange={onGridSelectionChange}\n                columns={columns}\n                rows={1000}\n            />\n        </BeautifulWrapper>\n    );\n};\n(UndoRedo as any).parameters = {\n    options: {\n        showPanel: false,\n    },\n};\n";
var __LOCATIONS_MAP__ = {
  "UseDataSource": {
    "startLoc": {
      "col": 40,
      "line": 227
    },
    "endLoc": {
      "col": 1,
      "line": 298
    },
    "startBody": {
      "col": 40,
      "line": 227
    },
    "endBody": {
      "col": 1,
      "line": 298
    }
  },
  "UndoRedo": {
    "startLoc": {
      "col": 35,
      "line": 305
    },
    "endLoc": {
      "col": 1,
      "line": 349
    },
    "startBody": {
      "col": 35,
      "line": 305
    },
    "endBody": {
      "col": 1,
      "line": 349
    }
  }
};










esm/* faker.seed */.We.seed(1337);
const SimpleWrapper = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "SimpleWrapper",
  class: "ss4kmn3",
  propsAsIs: false
});
const SimpleThemeWrapper = p => {
  return (0,jsx_runtime.jsx)(SimpleWrapper, {
    children: (0,jsx_runtime.jsx)("div", {
      className: "content",
      children: p.children
    })
  });
};
SimpleThemeWrapper.displayName = "SimpleThemeWrapper";
/* harmony default export */ const use_data_source_stories = ({
  parameters: {
    "storySource": {
      "source": "import { styled } from \"@linaria/react\";\nimport * as React from \"react\";\nimport { useResizeDetector } from \"react-resize-detector\";\nimport {\n    DataEditor,\n    type DataEditorProps,\n    type DataEditorRef,\n    GridCellKind,\n    type GridColumn,\n    type Theme,\n} from \"@glideapps/glide-data-grid\";\nimport { faker } from \"@faker-js/faker\";\nimport { useCollapsingGroups, useColumnSort, useMoveableColumns } from \"../index.js\";\nimport { useUndoRedo } from \"../use-undo-redo.js\";\nimport { useMockDataGenerator } from \"./utils.js\";\n\nfaker.seed(1337);\n\nconst SimpleWrapper = styled.div`\n    box-sizing: border-box;\n\n    *,\n    *::before,\n    *::after {\n        box-sizing: inherit;\n    }\n`;\n\nconst SimpleThemeWrapper: React.FC = p => {\n    return (\n        <SimpleWrapper>\n            <div className=\"content\">{p.children}</div>\n        </SimpleWrapper>\n    );\n};\n\nexport default {\n    title: \"Extra Packages/Source\",\n\n    decorators: [\n        (Story: React.ComponentType) => (\n            <SimpleThemeWrapper>\n                <Story />\n            </SimpleThemeWrapper>\n        ),\n    ],\n};\n\nconst BeautifulStyle = styled.div`\n    background-color: #2790b9;\n    background: linear-gradient(90deg, #2790b9, #2070a9);\n    color: white;\n\n    padding: 32px 48px;\n\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n\n    font-family: sans-serif;\n\n    & > h1 {\n        font-size: 50px;\n        font-weight: 600;\n        flex-shrink: 0;\n        margin: 0 0 12px 0;\n    }\n\n    .sizer {\n        flex-grow: 1;\n\n        background-color: white;\n\n        border-radius: 12px;\n        box-shadow:\n            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,\n            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;\n\n        .sizer-clip {\n            border-radius: 12px;\n            overflow: hidden;\n            transform: translateZ(0);\n\n            height: 100%;\n        }\n    }\n`;\n\ninterface BeautifulProps {\n    title: string;\n    description?: React.ReactNode;\n}\n\nconst BeautifulWrapper: React.FC<BeautifulProps> = p => {\n    const { title, children, description } = p;\n\n    const { ref, width, height } = useResizeDetector();\n\n    return (\n        <BeautifulStyle>\n            <h1>{title}</h1>\n            {description}\n            <div className=\"sizer\">\n                <div className=\"sizer-clip\" ref={ref}>\n                    <div\n                        style={{\n                            position: \"relative\",\n                            width: width ?? 100,\n                            height: height ?? 100,\n                        }}>\n                        {children}\n                    </div>\n                </div>\n            </div>\n        </BeautifulStyle>\n    );\n};\n\nconst Description = styled.p`\n    font-size: 18px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n`;\n\nexport const MoreInfo = styled.p`\n    font-size: 14px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n\n    button {\n        background-color: #f4f4f4;\n        color: #2b2b2b;\n        padding: 2px 6px;\n        font-family: monospace;\n        font-size: 14px;\n        border-radius: 4px;\n        box-shadow: 0px 1px 2px #00000040;\n        margin: 0 0.1em;\n        border: none;\n        cursor: pointer;\n    }\n`;\n\nconst defaultProps: Partial<DataEditorProps> = {\n    smoothScrollX: true,\n    smoothScrollY: true,\n    isDraggable: false,\n    rowMarkers: \"none\",\n    width: \"100%\",\n};\n\nconst testTheme: Theme = {\n    accentColor: \"#4F5DFF\",\n    accentFg: \"#FFFFFF\",\n    accentLight: \"rgba(62, 116, 253, 0.1)\",\n\n    textDark: \"#313139\",\n    textMedium: \"#737383\",\n    textLight: \"#B2B2C0\",\n    textBubble: \"#313139\",\n\n    bgIconHeader: \"#737383\",\n    fgIconHeader: \"#FFFFFF\",\n    textHeader: \"#313139\",\n    textGroupHeader: \"#313139BB\",\n    textHeaderSelected: \"#FFFFFF\",\n\n    bgCell: \"#FFFFFF\",\n    bgCellMedium: \"#FAFAFB\",\n    bgHeader: \"#F7F7F8\",\n    bgHeaderHasFocus: \"#E9E9EB\",\n    bgHeaderHovered: \"#EFEFF1\",\n\n    bgBubble: \"#EDEDF3\",\n    bgBubbleSelected: \"#FFFFFF\",\n\n    headerIconSize: 20,\n    markerFontStyle: \"13px\",\n\n    bgSearchResult: \"#fff9e3\",\n\n    borderColor: \"rgba(115, 116, 131, 0.16)\",\n    horizontalBorderColor: \"rgba(115, 116, 131, 0.16)\",\n    drilldownBorder: \"rgba(0, 0, 0, 0)\",\n\n    linkColor: \"#4F5DFF\",\n\n    cellHorizontalPadding: 8,\n    cellVerticalPadding: 3,\n\n    headerFontStyle: \"600 13px\",\n    baseFontStyle: \"13px\",\n    editorFontSize: \"13px\",\n    lineHeight: 1.4,\n    fontFamily:\n        \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\",\n};\n\nconst cols: GridColumn[] = [\n    {\n        title: \"A\",\n        width: 200,\n        group: \"Group 1\",\n    },\n    {\n        title: \"B\",\n        width: 200,\n        group: \"Group 1\",\n    },\n    {\n        title: \"C\",\n        width: 200,\n        group: \"Group 2\",\n    },\n    {\n        title: \"D\",\n        width: 200,\n        group: \"Group 2\",\n    },\n    {\n        title: \"E\",\n        width: 200,\n        group: \"Group 2\",\n    },\n];\n\nexport const UseDataSource: React.VFC = () => {\n    const cache = React.useRef<Record<string, string>>({});\n\n    const rows = 100_000;\n\n    const moveArgs = useMoveableColumns({\n        columns: cols,\n        getCellContent: React.useCallback(([col, row]) => {\n            if (col === 0) {\n                return {\n                    kind: GridCellKind.Text,\n                    allowOverlay: true,\n                    data: `${row}`,\n                    displayData: `${row}`,\n                };\n            }\n\n            const key = `${col},${row}`;\n            if (cache.current[key] === undefined) {\n                cache.current[key] = faker.name.firstName() + \" \" + faker.name.lastName();\n            }\n            const d = cache.current[key];\n\n            return {\n                kind: GridCellKind.Text,\n                allowOverlay: true,\n                data: d,\n                displayData: d,\n            };\n        }, []),\n    });\n\n    const [sort, setSort] = React.useState<number>();\n\n    const sortArgs = useColumnSort({\n        columns: moveArgs.columns,\n        getCellContent: moveArgs.getCellContent,\n        rows,\n        sort:\n            sort === undefined\n                ? undefined\n                : {\n                      column: moveArgs.columns[sort],\n                      direction: \"desc\",\n                      mode: \"smart\",\n                  },\n    });\n\n    const collapseArgs = useCollapsingGroups({\n        columns: moveArgs.columns,\n        theme: testTheme,\n        freezeColumns: 0,\n    });\n\n    const onHeaderClick = React.useCallback((index: number) => {\n        setSort(index);\n    }, []);\n\n    return (\n        <BeautifulWrapper title=\"Custom source extensions\" description={<Description>Fixme.</Description>}>\n            <DataEditor\n                {...defaultProps}\n                {...moveArgs}\n                {...sortArgs}\n                {...collapseArgs}\n                rows={rows}\n                onColumnMoved={moveArgs.onColumnMoved}\n                onHeaderClicked={onHeaderClick}\n            />\n        </BeautifulWrapper>\n    );\n};\n(UseDataSource as any).parameters = {\n    options: {\n        showPanel: false,\n    },\n};\n\nexport const UndoRedo: React.VFC = () => {\n    const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(6);\n\n    const gridRef = React.useRef<DataEditorRef>(null);\n\n    const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(\n        gridRef,\n        getCellContent,\n        setCellValue\n    );\n\n    return (\n        <BeautifulWrapper\n            title=\"Undo / Redo Support\"\n            description={\n                <Description>\n                    A simple undo/redo implementation\n                    <MoreInfo>\n                        Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:\n                        <button onClick={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.4 }}>\n                            Undo\n                        </button>\n                        <button onClick={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.4 }}>\n                            Redo\n                        </button>\n                    </MoreInfo>\n                    <MoreInfo>\n                        It works by taking a snapshot of the content of a cell before it is edited and replaying any\n                        edits back.\n                    </MoreInfo>\n                </Description>\n            }>\n            <DataEditor\n                {...defaultProps}\n                ref={gridRef}\n                onCellEdited={onCellEdited}\n                getCellContent={getCellContent}\n                gridSelection={gridSelection ?? undefined}\n                onGridSelectionChange={onGridSelectionChange}\n                columns={columns}\n                rows={1000}\n            />\n        </BeautifulWrapper>\n    );\n};\n(UndoRedo as any).parameters = {\n    options: {\n        showPanel: false,\n    },\n};\n",
      "locationsMap": {
        "use-data-source": {
          "startLoc": {
            "col": 40,
            "line": 227
          },
          "endLoc": {
            "col": 1,
            "line": 298
          },
          "startBody": {
            "col": 40,
            "line": 227
          },
          "endBody": {
            "col": 1,
            "line": 298
          }
        },
        "undo-redo": {
          "startLoc": {
            "col": 35,
            "line": 305
          },
          "endLoc": {
            "col": 1,
            "line": 349
          },
          "startBody": {
            "col": 35,
            "line": 305
          },
          "endBody": {
            "col": 1,
            "line": 349
          }
        }
      }
    }
  },
  title: "Extra Packages/Source",
  decorators: [Story => (0,jsx_runtime.jsx)(SimpleThemeWrapper, {
    children: (0,jsx_runtime.jsx)(Story, {})
  })]
});
const BeautifulStyle = /*#__PURE__*/(0,dist/* styled */.z)('div')({
  name: "BeautifulStyle",
  class: "bkh67gx",
  propsAsIs: false
});
const BeautifulWrapper = p => {
  const {
    title,
    children,
    description
  } = p;
  const {
    ref,
    width,
    height
  } = (0,index_esm/* useResizeDetector */.NB)();
  return (0,jsx_runtime.jsxs)(BeautifulStyle, {
    children: [(0,jsx_runtime.jsx)("h1", {
      children: title
    }), description, (0,jsx_runtime.jsx)("div", {
      className: "sizer",
      children: (0,jsx_runtime.jsx)("div", {
        className: "sizer-clip",
        ref: ref,
        children: (0,jsx_runtime.jsx)("div", {
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
const Description = /*#__PURE__*/(0,dist/* styled */.z)('p')({
  name: "Description",
  class: "d1deot3s",
  propsAsIs: false
});
const MoreInfo = /*#__PURE__*/(0,dist/* styled */.z)('p')({
  name: "MoreInfo",
  class: "m1ml0sw1",
  propsAsIs: false
});
const defaultProps = {
  smoothScrollX: true,
  smoothScrollY: true,
  isDraggable: false,
  rowMarkers: "none",
  width: "100%"
};
const testTheme = {
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
  headerIconSize: 20,
  markerFontStyle: "13px",
  bgSearchResult: "#fff9e3",
  borderColor: "rgba(115, 116, 131, 0.16)",
  horizontalBorderColor: "rgba(115, 116, 131, 0.16)",
  drilldownBorder: "rgba(0, 0, 0, 0)",
  linkColor: "#4F5DFF",
  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  editorFontSize: "13px",
  lineHeight: 1.4,
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"
};
const cols = [{
  title: "A",
  width: 200,
  group: "Group 1"
}, {
  title: "B",
  width: 200,
  group: "Group 1"
}, {
  title: "C",
  width: 200,
  group: "Group 2"
}, {
  title: "D",
  width: 200,
  group: "Group 2"
}, {
  title: "E",
  width: 200,
  group: "Group 2"
}];
const UseDataSource = () => {
  const cache = react.useRef({});
  const rows = 100000;
  const moveArgs = useMoveableColumns({
    columns: cols,
    getCellContent: react.useCallback(_ref => {
      let [col, row] = _ref;
      if (col === 0) {
        return {
          kind: data_grid_types/* GridCellKind.Text */.p6.Text,
          allowOverlay: true,
          data: `${row}`,
          displayData: `${row}`
        };
      }
      const key = `${col},${row}`;
      if (cache.current[key] === undefined) {
        cache.current[key] = esm/* faker.name.firstName */.We.name.firstName() + " " + esm/* faker.name.lastName */.We.name.lastName();
      }
      const d = cache.current[key];
      return {
        kind: data_grid_types/* GridCellKind.Text */.p6.Text,
        allowOverlay: true,
        data: d,
        displayData: d
      };
    }, [])
  });
  const [sort, setSort] = react.useState();
  const sortArgs = useColumnSort({
    columns: moveArgs.columns,
    getCellContent: moveArgs.getCellContent,
    rows,
    sort: sort === undefined ? undefined : {
      column: moveArgs.columns[sort],
      direction: "desc",
      mode: "smart"
    }
  });
  const collapseArgs = useCollapsingGroups({
    columns: moveArgs.columns,
    theme: testTheme,
    freezeColumns: 0
  });
  const onHeaderClick = react.useCallback(index => {
    setSort(index);
  }, []);
  return (0,jsx_runtime.jsx)(BeautifulWrapper, {
    title: "Custom source extensions",
    description: (0,jsx_runtime.jsx)(Description, {
      children: "Fixme."
    }),
    children: (0,jsx_runtime.jsx)(data_editor_all/* DataEditorAll */.F, {
      ...defaultProps,
      ...moveArgs,
      ...sortArgs,
      ...collapseArgs,
      rows: rows,
      onColumnMoved: moveArgs.onColumnMoved,
      onHeaderClicked: onHeaderClick
    })
  });
};
UseDataSource.displayName = "UseDataSource";
;
UseDataSource.parameters = {
  options: {
    showPanel: false
  }
};
const UndoRedo = () => {
  const {
    cols: columns,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6);
  const gridRef = react.useRef(null);
  const {
    gridSelection,
    onCellEdited,
    onGridSelectionChange,
    undo,
    canRedo,
    canUndo,
    redo
  } = useUndoRedo(gridRef, getCellContent, setCellValue);
  return (0,jsx_runtime.jsx)(BeautifulWrapper, {
    title: "Undo / Redo Support",
    description: (0,jsx_runtime.jsxs)(Description, {
      children: ["A simple undo/redo implementation", (0,jsx_runtime.jsxs)(MoreInfo, {
        children: ["Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:", (0,jsx_runtime.jsx)("button", {
          onClick: undo,
          disabled: !canUndo,
          style: {
            opacity: canUndo ? 1 : 0.4
          },
          children: "Undo"
        }), (0,jsx_runtime.jsx)("button", {
          onClick: redo,
          disabled: !canRedo,
          style: {
            opacity: canRedo ? 1 : 0.4
          },
          children: "Redo"
        })]
      }), (0,jsx_runtime.jsx)(MoreInfo, {
        children: "It works by taking a snapshot of the content of a cell before it is edited and replaying any edits back."
      })]
    }),
    children: (0,jsx_runtime.jsx)(data_editor_all/* DataEditorAll */.F, {
      ...defaultProps,
      ref: gridRef,
      onCellEdited: onCellEdited,
      getCellContent: getCellContent,
      gridSelection: gridSelection !== null && gridSelection !== void 0 ? gridSelection : undefined,
      onGridSelectionChange: onGridSelectionChange,
      columns: columns,
      rows: 1000
    })
  });
};
UndoRedo.displayName = "UndoRedo";
UndoRedo.parameters = {
  options: {
    showPanel: false
  }
};

__webpack_require__("./packages/source/src/stories/use-data-source.stories.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/source/src/stories/use-data-source.stories.tsx");;const __namedExportsOrder = ["MoreInfo","UseDataSource","UndoRedo"];

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/source/src/stories/use-data-source.stories.tsx":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, ".ss4kmn3{box-sizing:border-box;}.ss4kmn3 *,.ss4kmn3 *::before,.ss4kmn3 *::after{box-sizing:inherit;}\n.bkh67gx{background-color:#2790b9;background:linear-gradient(90deg,#2790b9,#2070a9);color:white;padding:32px 48px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100vh;font-family:sans-serif;}.bkh67gx > h1{font-size:50px;font-weight:600;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 12px 0;}.bkh67gx .sizer{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;background-color:white;border-radius:12px;box-shadow: rgba(9,30,66,0.25) 0px 4px 8px -2px, rgba(9,30,66,0.08) 0px 0px 0px 1px;}.bkh67gx .sizer .sizer-clip{border-radius:12px;overflow:hidden;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);height:100%;}\n.d1deot3s{font-size:18px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}\n.m1ml0sw1{font-size:14px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}.m1ml0sw1 button{background-color:#f4f4f4;color:#2b2b2b;padding:2px 6px;font-family:monospace;font-size:14px;border-radius:4px;box-shadow:0px 1px 2px #00000040;margin:0 0.1em;border:none;cursor:pointer;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvc291cmNlL3NyYy9zdG9yaWVzL3VzZS1kYXRhLXNvdXJjZS5zdG9yaWVzLnRzeCJdLCJuYW1lcyI6WyIuc3M0a21uMyIsIi5ia2g2N2d4IiwiLmQxZGVvdDNzIiwiLm0xbWwwc3cxIl0sIm1hcHBpbmdzIjoiQUFrRHNCQTtBQW1FQ0M7QUF1RUhDO0FBS0lDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvc291cmNlL3NyYy9zdG9yaWVzL3VzZS1kYXRhLXNvdXJjZS5zdG9yaWVzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX1NUT1JZX18gPSBcImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXFxcIkBsaW5hcmlhL3JlYWN0XFxcIjtcXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFxcXCJyZWFjdFxcXCI7XFxuaW1wb3J0IHsgdXNlUmVzaXplRGV0ZWN0b3IgfSBmcm9tIFxcXCJyZWFjdC1yZXNpemUtZGV0ZWN0b3JcXFwiO1xcbmltcG9ydCB7XFxuICAgIERhdGFFZGl0b3IsXFxuICAgIHR5cGUgRGF0YUVkaXRvclByb3BzLFxcbiAgICB0eXBlIERhdGFFZGl0b3JSZWYsXFxuICAgIEdyaWRDZWxsS2luZCxcXG4gICAgdHlwZSBHcmlkQ29sdW1uLFxcbiAgICB0eXBlIFRoZW1lLFxcbn0gZnJvbSBcXFwiQGdsaWRlYXBwcy9nbGlkZS1kYXRhLWdyaWRcXFwiO1xcbmltcG9ydCB7IGZha2VyIH0gZnJvbSBcXFwiQGZha2VyLWpzL2Zha2VyXFxcIjtcXG5pbXBvcnQgeyB1c2VDb2xsYXBzaW5nR3JvdXBzLCB1c2VDb2x1bW5Tb3J0LCB1c2VNb3ZlYWJsZUNvbHVtbnMgfSBmcm9tIFxcXCIuLi9pbmRleC5qc1xcXCI7XFxuaW1wb3J0IHsgdXNlVW5kb1JlZG8gfSBmcm9tIFxcXCIuLi91c2UtdW5kby1yZWRvLmpzXFxcIjtcXG5pbXBvcnQgeyB1c2VNb2NrRGF0YUdlbmVyYXRvciB9IGZyb20gXFxcIi4vdXRpbHMuanNcXFwiO1xcblxcbmZha2VyLnNlZWQoMTMzNyk7XFxuXFxuY29uc3QgU2ltcGxlV3JhcHBlciA9IHN0eWxlZC5kaXZgXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFxuICAgICosXFxuICAgICo6OmJlZm9yZSxcXG4gICAgKjo6YWZ0ZXIge1xcbiAgICAgICAgYm94LXNpemluZzogaW5oZXJpdDtcXG4gICAgfVxcbmA7XFxuXFxuY29uc3QgU2ltcGxlVGhlbWVXcmFwcGVyOiBSZWFjdC5GQyA9IHAgPT4ge1xcbiAgICByZXR1cm4gKFxcbiAgICAgICAgPFNpbXBsZVdyYXBwZXI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XFxcImNvbnRlbnRcXFwiPntwLmNoaWxkcmVufTwvZGl2PlxcbiAgICAgICAgPC9TaW1wbGVXcmFwcGVyPlxcbiAgICApO1xcbn07XFxuXFxuZXhwb3J0IGRlZmF1bHQge1xcbiAgICB0aXRsZTogXFxcIkV4dHJhIFBhY2thZ2VzL1NvdXJjZVxcXCIsXFxuXFxuICAgIGRlY29yYXRvcnM6IFtcXG4gICAgICAgIChTdG9yeTogUmVhY3QuQ29tcG9uZW50VHlwZSkgPT4gKFxcbiAgICAgICAgICAgIDxTaW1wbGVUaGVtZVdyYXBwZXI+XFxuICAgICAgICAgICAgICAgIDxTdG9yeSAvPlxcbiAgICAgICAgICAgIDwvU2ltcGxlVGhlbWVXcmFwcGVyPlxcbiAgICAgICAgKSxcXG4gICAgXSxcXG59O1xcblxcbmNvbnN0IEJlYXV0aWZ1bFN0eWxlID0gc3R5bGVkLmRpdmBcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI3OTBiOTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMjc5MGI5LCAjMjA3MGE5KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcblxcbiAgICBwYWRkaW5nOiAzMnB4IDQ4cHg7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTAwdmg7XFxuXFxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcblxcbiAgICAmID4gaDEge1xcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMTJweCAwO1xcbiAgICB9XFxuXFxuICAgIC5zaXplciB7XFxuICAgICAgICBmbGV4LWdyb3c6IDE7XFxuXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG5cXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XFxuICAgICAgICBib3gtc2hhZG93OlxcbiAgICAgICAgICAgIHJnYmEoOSwgMzAsIDY2LCAwLjI1KSAwcHggNHB4IDhweCAtMnB4LFxcbiAgICAgICAgICAgIHJnYmEoOSwgMzAsIDY2LCAwLjA4KSAwcHggMHB4IDBweCAxcHg7XFxuXFxuICAgICAgICAuc2l6ZXItY2xpcCB7XFxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG5cXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICB9XFxuICAgIH1cXG5gO1xcblxcbmludGVyZmFjZSBCZWF1dGlmdWxQcm9wcyB7XFxuICAgIHRpdGxlOiBzdHJpbmc7XFxuICAgIGRlc2NyaXB0aW9uPzogUmVhY3QuUmVhY3ROb2RlO1xcbn1cXG5cXG5jb25zdCBCZWF1dGlmdWxXcmFwcGVyOiBSZWFjdC5GQzxCZWF1dGlmdWxQcm9wcz4gPSBwID0+IHtcXG4gICAgY29uc3QgeyB0aXRsZSwgY2hpbGRyZW4sIGRlc2NyaXB0aW9uIH0gPSBwO1xcblxcbiAgICBjb25zdCB7IHJlZiwgd2lkdGgsIGhlaWdodCB9ID0gdXNlUmVzaXplRGV0ZWN0b3IoKTtcXG5cXG4gICAgcmV0dXJuIChcXG4gICAgICAgIDxCZWF1dGlmdWxTdHlsZT5cXG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XFxuICAgICAgICAgICAge2Rlc2NyaXB0aW9ufVxcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVxcXCJzaXplclxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVxcXCJzaXplci1jbGlwXFxcIiByZWY9e3JlZn0+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFxcXCJyZWxhdGl2ZVxcXCIsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCA/PyAxMDAsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ID8/IDEwMCxcXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L0JlYXV0aWZ1bFN0eWxlPlxcbiAgICApO1xcbn07XFxuXFxuY29uc3QgRGVzY3JpcHRpb24gPSBzdHlsZWQucGBcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xcbmA7XFxuXFxuZXhwb3J0IGNvbnN0IE1vcmVJbmZvID0gc3R5bGVkLnBgXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZmxleC1zaHJpbms6IDA7XFxuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcXG5cXG4gICAgYnV0dG9uIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNGY0ZjQ7XFxuICAgICAgICBjb2xvcjogIzJiMmIyYjtcXG4gICAgICAgIHBhZGRpbmc6IDJweCA2cHg7XFxuICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggIzAwMDAwMDQwO1xcbiAgICAgICAgbWFyZ2luOiAwIDAuMWVtO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB9XFxuYDtcXG5cXG5jb25zdCBkZWZhdWx0UHJvcHM6IFBhcnRpYWw8RGF0YUVkaXRvclByb3BzPiA9IHtcXG4gICAgc21vb3RoU2Nyb2xsWDogdHJ1ZSxcXG4gICAgc21vb3RoU2Nyb2xsWTogdHJ1ZSxcXG4gICAgaXNEcmFnZ2FibGU6IGZhbHNlLFxcbiAgICByb3dNYXJrZXJzOiBcXFwibm9uZVxcXCIsXFxuICAgIHdpZHRoOiBcXFwiMTAwJVxcXCIsXFxufTtcXG5cXG5jb25zdCB0ZXN0VGhlbWU6IFRoZW1lID0ge1xcbiAgICBhY2NlbnRDb2xvcjogXFxcIiM0RjVERkZcXFwiLFxcbiAgICBhY2NlbnRGZzogXFxcIiNGRkZGRkZcXFwiLFxcbiAgICBhY2NlbnRMaWdodDogXFxcInJnYmEoNjIsIDExNiwgMjUzLCAwLjEpXFxcIixcXG5cXG4gICAgdGV4dERhcms6IFxcXCIjMzEzMTM5XFxcIixcXG4gICAgdGV4dE1lZGl1bTogXFxcIiM3MzczODNcXFwiLFxcbiAgICB0ZXh0TGlnaHQ6IFxcXCIjQjJCMkMwXFxcIixcXG4gICAgdGV4dEJ1YmJsZTogXFxcIiMzMTMxMzlcXFwiLFxcblxcbiAgICBiZ0ljb25IZWFkZXI6IFxcXCIjNzM3MzgzXFxcIixcXG4gICAgZmdJY29uSGVhZGVyOiBcXFwiI0ZGRkZGRlxcXCIsXFxuICAgIHRleHRIZWFkZXI6IFxcXCIjMzEzMTM5XFxcIixcXG4gICAgdGV4dEdyb3VwSGVhZGVyOiBcXFwiIzMxMzEzOUJCXFxcIixcXG4gICAgdGV4dEhlYWRlclNlbGVjdGVkOiBcXFwiI0ZGRkZGRlxcXCIsXFxuXFxuICAgIGJnQ2VsbDogXFxcIiNGRkZGRkZcXFwiLFxcbiAgICBiZ0NlbGxNZWRpdW06IFxcXCIjRkFGQUZCXFxcIixcXG4gICAgYmdIZWFkZXI6IFxcXCIjRjdGN0Y4XFxcIixcXG4gICAgYmdIZWFkZXJIYXNGb2N1czogXFxcIiNFOUU5RUJcXFwiLFxcbiAgICBiZ0hlYWRlckhvdmVyZWQ6IFxcXCIjRUZFRkYxXFxcIixcXG5cXG4gICAgYmdCdWJibGU6IFxcXCIjRURFREYzXFxcIixcXG4gICAgYmdCdWJibGVTZWxlY3RlZDogXFxcIiNGRkZGRkZcXFwiLFxcblxcbiAgICBoZWFkZXJJY29uU2l6ZTogMjAsXFxuICAgIG1hcmtlckZvbnRTdHlsZTogXFxcIjEzcHhcXFwiLFxcblxcbiAgICBiZ1NlYXJjaFJlc3VsdDogXFxcIiNmZmY5ZTNcXFwiLFxcblxcbiAgICBib3JkZXJDb2xvcjogXFxcInJnYmEoMTE1LCAxMTYsIDEzMSwgMC4xNilcXFwiLFxcbiAgICBob3Jpem9udGFsQm9yZGVyQ29sb3I6IFxcXCJyZ2JhKDExNSwgMTE2LCAxMzEsIDAuMTYpXFxcIixcXG4gICAgZHJpbGxkb3duQm9yZGVyOiBcXFwicmdiYSgwLCAwLCAwLCAwKVxcXCIsXFxuXFxuICAgIGxpbmtDb2xvcjogXFxcIiM0RjVERkZcXFwiLFxcblxcbiAgICBjZWxsSG9yaXpvbnRhbFBhZGRpbmc6IDgsXFxuICAgIGNlbGxWZXJ0aWNhbFBhZGRpbmc6IDMsXFxuXFxuICAgIGhlYWRlckZvbnRTdHlsZTogXFxcIjYwMCAxM3B4XFxcIixcXG4gICAgYmFzZUZvbnRTdHlsZTogXFxcIjEzcHhcXFwiLFxcbiAgICBlZGl0b3JGb250U2l6ZTogXFxcIjEzcHhcXFwiLFxcbiAgICBsaW5lSGVpZ2h0OiAxLjQsXFxuICAgIGZvbnRGYW1pbHk6XFxuICAgICAgICBcXFwiSW50ZXIsIFJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBhdmVuaXIgbmV4dCwgYXZlbmlyLCBzZWdvZSB1aSwgaGVsdmV0aWNhIG5ldWUsIGhlbHZldGljYSwgVWJ1bnR1LCBub3RvLCBhcmlhbCwgc2Fucy1zZXJpZlxcXCIsXFxufTtcXG5cXG5jb25zdCBjb2xzOiBHcmlkQ29sdW1uW10gPSBbXFxuICAgIHtcXG4gICAgICAgIHRpdGxlOiBcXFwiQVxcXCIsXFxuICAgICAgICB3aWR0aDogMjAwLFxcbiAgICAgICAgZ3JvdXA6IFxcXCJHcm91cCAxXFxcIixcXG4gICAgfSxcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJCXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDFcXFwiLFxcbiAgICB9LFxcbiAgICB7XFxuICAgICAgICB0aXRsZTogXFxcIkNcXFwiLFxcbiAgICAgICAgd2lkdGg6IDIwMCxcXG4gICAgICAgIGdyb3VwOiBcXFwiR3JvdXAgMlxcXCIsXFxuICAgIH0sXFxuICAgIHtcXG4gICAgICAgIHRpdGxlOiBcXFwiRFxcXCIsXFxuICAgICAgICB3aWR0aDogMjAwLFxcbiAgICAgICAgZ3JvdXA6IFxcXCJHcm91cCAyXFxcIixcXG4gICAgfSxcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJFXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDJcXFwiLFxcbiAgICB9LFxcbl07XFxuXFxuZXhwb3J0IGNvbnN0IFVzZURhdGFTb3VyY2U6IFJlYWN0LlZGQyA9ICgpID0+IHtcXG4gICAgY29uc3QgY2FjaGUgPSBSZWFjdC51c2VSZWY8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pO1xcblxcbiAgICBjb25zdCByb3dzID0gMTAwXzAwMDtcXG5cXG4gICAgY29uc3QgbW92ZUFyZ3MgPSB1c2VNb3ZlYWJsZUNvbHVtbnMoe1xcbiAgICAgICAgY29sdW1uczogY29scyxcXG4gICAgICAgIGdldENlbGxDb250ZW50OiBSZWFjdC51c2VDYWxsYmFjaygoW2NvbCwgcm93XSkgPT4ge1xcbiAgICAgICAgICAgIGlmIChjb2wgPT09IDApIHtcXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogYCR7cm93fWAsXFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YTogYCR7cm93fWAsXFxuICAgICAgICAgICAgICAgIH07XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2NvbH0sJHtyb3d9YDtcXG4gICAgICAgICAgICBpZiAoY2FjaGUuY3VycmVudFtrZXldID09PSB1bmRlZmluZWQpIHtcXG4gICAgICAgICAgICAgICAgY2FjaGUuY3VycmVudFtrZXldID0gZmFrZXIubmFtZS5maXJzdE5hbWUoKSArIFxcXCIgXFxcIiArIGZha2VyLm5hbWUubGFzdE5hbWUoKTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgY29uc3QgZCA9IGNhY2hlLmN1cnJlbnRba2V5XTtcXG5cXG4gICAgICAgICAgICByZXR1cm4ge1xcbiAgICAgICAgICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuVGV4dCxcXG4gICAgICAgICAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxcbiAgICAgICAgICAgICAgICBkYXRhOiBkLFxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YTogZCxcXG4gICAgICAgICAgICB9O1xcbiAgICAgICAgfSwgW10pLFxcbiAgICB9KTtcXG5cXG4gICAgY29uc3QgW3NvcnQsIHNldFNvcnRdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPigpO1xcblxcbiAgICBjb25zdCBzb3J0QXJncyA9IHVzZUNvbHVtblNvcnQoe1xcbiAgICAgICAgY29sdW1uczogbW92ZUFyZ3MuY29sdW1ucyxcXG4gICAgICAgIGdldENlbGxDb250ZW50OiBtb3ZlQXJncy5nZXRDZWxsQ29udGVudCxcXG4gICAgICAgIHJvd3MsXFxuICAgICAgICBzb3J0OlxcbiAgICAgICAgICAgIHNvcnQgPT09IHVuZGVmaW5lZFxcbiAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxcbiAgICAgICAgICAgICAgICA6IHtcXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtb3ZlQXJncy5jb2x1bW5zW3NvcnRdLFxcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IFxcXCJkZXNjXFxcIixcXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZTogXFxcInNtYXJ0XFxcIixcXG4gICAgICAgICAgICAgICAgICB9LFxcbiAgICB9KTtcXG5cXG4gICAgY29uc3QgY29sbGFwc2VBcmdzID0gdXNlQ29sbGFwc2luZ0dyb3Vwcyh7XFxuICAgICAgICBjb2x1bW5zOiBtb3ZlQXJncy5jb2x1bW5zLFxcbiAgICAgICAgdGhlbWU6IHRlc3RUaGVtZSxcXG4gICAgICAgIGZyZWV6ZUNvbHVtbnM6IDAsXFxuICAgIH0pO1xcblxcbiAgICBjb25zdCBvbkhlYWRlckNsaWNrID0gUmVhY3QudXNlQ2FsbGJhY2soKGluZGV4OiBudW1iZXIpID0+IHtcXG4gICAgICAgIHNldFNvcnQoaW5kZXgpO1xcbiAgICB9LCBbXSk7XFxuXFxuICAgIHJldHVybiAoXFxuICAgICAgICA8QmVhdXRpZnVsV3JhcHBlciB0aXRsZT1cXFwiQ3VzdG9tIHNvdXJjZSBleHRlbnNpb25zXFxcIiBkZXNjcmlwdGlvbj17PERlc2NyaXB0aW9uPkZpeG1lLjwvRGVzY3JpcHRpb24+fT5cXG4gICAgICAgICAgICA8RGF0YUVkaXRvclxcbiAgICAgICAgICAgICAgICB7Li4uZGVmYXVsdFByb3BzfVxcbiAgICAgICAgICAgICAgICB7Li4ubW92ZUFyZ3N9XFxuICAgICAgICAgICAgICAgIHsuLi5zb3J0QXJnc31cXG4gICAgICAgICAgICAgICAgey4uLmNvbGxhcHNlQXJnc31cXG4gICAgICAgICAgICAgICAgcm93cz17cm93c31cXG4gICAgICAgICAgICAgICAgb25Db2x1bW5Nb3ZlZD17bW92ZUFyZ3Mub25Db2x1bW5Nb3ZlZH1cXG4gICAgICAgICAgICAgICAgb25IZWFkZXJDbGlja2VkPXtvbkhlYWRlckNsaWNrfVxcbiAgICAgICAgICAgIC8+XFxuICAgICAgICA8L0JlYXV0aWZ1bFdyYXBwZXI+XFxuICAgICk7XFxufTtcXG4oVXNlRGF0YVNvdXJjZSBhcyBhbnkpLnBhcmFtZXRlcnMgPSB7XFxuICAgIG9wdGlvbnM6IHtcXG4gICAgICAgIHNob3dQYW5lbDogZmFsc2UsXFxuICAgIH0sXFxufTtcXG5cXG5leHBvcnQgY29uc3QgVW5kb1JlZG86IFJlYWN0LlZGQyA9ICgpID0+IHtcXG4gICAgY29uc3QgeyBjb2xzOiBjb2x1bW5zLCBnZXRDZWxsQ29udGVudCwgc2V0Q2VsbFZhbHVlIH0gPSB1c2VNb2NrRGF0YUdlbmVyYXRvcig2KTtcXG5cXG4gICAgY29uc3QgZ3JpZFJlZiA9IFJlYWN0LnVzZVJlZjxEYXRhRWRpdG9yUmVmPihudWxsKTtcXG5cXG4gICAgY29uc3QgeyBncmlkU2VsZWN0aW9uLCBvbkNlbGxFZGl0ZWQsIG9uR3JpZFNlbGVjdGlvbkNoYW5nZSwgdW5kbywgY2FuUmVkbywgY2FuVW5kbywgcmVkbyB9ID0gdXNlVW5kb1JlZG8oXFxuICAgICAgICBncmlkUmVmLFxcbiAgICAgICAgZ2V0Q2VsbENvbnRlbnQsXFxuICAgICAgICBzZXRDZWxsVmFsdWVcXG4gICAgKTtcXG5cXG4gICAgcmV0dXJuIChcXG4gICAgICAgIDxCZWF1dGlmdWxXcmFwcGVyXFxuICAgICAgICAgICAgdGl0bGU9XFxcIlVuZG8gLyBSZWRvIFN1cHBvcnRcXFwiXFxuICAgICAgICAgICAgZGVzY3JpcHRpb249e1xcbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb24+XFxuICAgICAgICAgICAgICAgICAgICBBIHNpbXBsZSB1bmRvL3JlZG8gaW1wbGVtZW50YXRpb25cXG4gICAgICAgICAgICAgICAgICAgIDxNb3JlSW5mbz5cXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2Uga2V5Ym9hcmQgc2hvcnRjdXRzIENNRCtaIGFuZCBDTUQrU0hJRlQrWiAvIENUUkwrWiBhbmQgQ1RSTCtZLiBPciBjbGljayB0aGVzZSBidXR0b25zOlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dW5kb30gZGlzYWJsZWQ9eyFjYW5VbmRvfSBzdHlsZT17eyBvcGFjaXR5OiBjYW5VbmRvID8gMSA6IDAuNCB9fT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5kb1xcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17cmVkb30gZGlzYWJsZWQ9eyFjYW5SZWRvfSBzdHlsZT17eyBvcGFjaXR5OiBjYW5SZWRvID8gMSA6IDAuNCB9fT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVkb1xcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9Nb3JlSW5mbz5cXG4gICAgICAgICAgICAgICAgICAgIDxNb3JlSW5mbz5cXG4gICAgICAgICAgICAgICAgICAgICAgICBJdCB3b3JrcyBieSB0YWtpbmcgYSBzbmFwc2hvdCBvZiB0aGUgY29udGVudCBvZiBhIGNlbGwgYmVmb3JlIGl0IGlzIGVkaXRlZCBhbmQgcmVwbGF5aW5nIGFueVxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRzIGJhY2suXFxuICAgICAgICAgICAgICAgICAgICA8L01vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxcbiAgICAgICAgICAgIH0+XFxuICAgICAgICAgICAgPERhdGFFZGl0b3JcXG4gICAgICAgICAgICAgICAgey4uLmRlZmF1bHRQcm9wc31cXG4gICAgICAgICAgICAgICAgcmVmPXtncmlkUmVmfVxcbiAgICAgICAgICAgICAgICBvbkNlbGxFZGl0ZWQ9e29uQ2VsbEVkaXRlZH1cXG4gICAgICAgICAgICAgICAgZ2V0Q2VsbENvbnRlbnQ9e2dldENlbGxDb250ZW50fVxcbiAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uPXtncmlkU2VsZWN0aW9uID8/IHVuZGVmaW5lZH1cXG4gICAgICAgICAgICAgICAgb25HcmlkU2VsZWN0aW9uQ2hhbmdlPXtvbkdyaWRTZWxlY3Rpb25DaGFuZ2V9XFxuICAgICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XFxuICAgICAgICAgICAgICAgIHJvd3M9ezEwMDB9XFxuICAgICAgICAgICAgLz5cXG4gICAgICAgIDwvQmVhdXRpZnVsV3JhcHBlcj5cXG4gICAgKTtcXG59O1xcbihVbmRvUmVkbyBhcyBhbnkpLnBhcmFtZXRlcnMgPSB7XFxuICAgIG9wdGlvbnM6IHtcXG4gICAgICAgIHNob3dQYW5lbDogZmFsc2UsXFxuICAgIH0sXFxufTtcXG5cIjtcbnZhciBfX0xPQ0FUSU9OU19NQVBfXyA9IHtcbiAgXCJVc2VEYXRhU291cmNlXCI6IHtcbiAgICBcInN0YXJ0TG9jXCI6IHtcbiAgICAgIFwiY29sXCI6IDQwLFxuICAgICAgXCJsaW5lXCI6IDIyN1xuICAgIH0sXG4gICAgXCJlbmRMb2NcIjoge1xuICAgICAgXCJjb2xcIjogMSxcbiAgICAgIFwibGluZVwiOiAyOThcbiAgICB9LFxuICAgIFwic3RhcnRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDQwLFxuICAgICAgXCJsaW5lXCI6IDIyN1xuICAgIH0sXG4gICAgXCJlbmRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDEsXG4gICAgICBcImxpbmVcIjogMjk4XG4gICAgfVxuICB9LFxuICBcIlVuZG9SZWRvXCI6IHtcbiAgICBcInN0YXJ0TG9jXCI6IHtcbiAgICAgIFwiY29sXCI6IDM1LFxuICAgICAgXCJsaW5lXCI6IDMwNVxuICAgIH0sXG4gICAgXCJlbmRMb2NcIjoge1xuICAgICAgXCJjb2xcIjogMSxcbiAgICAgIFwibGluZVwiOiAzNDlcbiAgICB9LFxuICAgIFwic3RhcnRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDM1LFxuICAgICAgXCJsaW5lXCI6IDMwNVxuICAgIH0sXG4gICAgXCJlbmRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDEsXG4gICAgICBcImxpbmVcIjogMzQ5XG4gICAgfVxuICB9XG59O1xuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcIkBsaW5hcmlhL3JlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJlc2l6ZURldGVjdG9yIH0gZnJvbSBcInJlYWN0LXJlc2l6ZS1kZXRlY3RvclwiO1xuaW1wb3J0IHsgRGF0YUVkaXRvciwgR3JpZENlbGxLaW5kIH0gZnJvbSBcIkBnbGlkZWFwcHMvZ2xpZGUtZGF0YS1ncmlkXCI7XG5pbXBvcnQgeyBmYWtlciB9IGZyb20gXCJAZmFrZXItanMvZmFrZXJcIjtcbmltcG9ydCB7IHVzZUNvbGxhcHNpbmdHcm91cHMsIHVzZUNvbHVtblNvcnQsIHVzZU1vdmVhYmxlQ29sdW1ucyB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgdXNlVW5kb1JlZG8gfSBmcm9tIFwiLi4vdXNlLXVuZG8tcmVkby5qc1wiO1xuaW1wb3J0IHsgdXNlTW9ja0RhdGFHZW5lcmF0b3IgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZha2VyLnNlZWQoMTMzNyk7XG5jb25zdCBTaW1wbGVXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgKixcbiAgICAqOjpiZWZvcmUsXG4gICAgKjo6YWZ0ZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICAgIH1cbmA7XG5jb25zdCBTaW1wbGVUaGVtZVdyYXBwZXIgPSBwID0+IHtcbiAgcmV0dXJuIF9qc3goU2ltcGxlV3JhcHBlciwge1xuICAgIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJjb250ZW50XCIsXG4gICAgICBjaGlsZHJlbjogcC5jaGlsZHJlblxuICAgIH0pXG4gIH0pO1xufTtcblNpbXBsZVRoZW1lV3JhcHBlci5kaXNwbGF5TmFtZSA9IFwiU2ltcGxlVGhlbWVXcmFwcGVyXCI7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHBhcmFtZXRlcnM6IHtcbiAgICBcInN0b3J5U291cmNlXCI6IHtcbiAgICAgIFwic291cmNlXCI6IFwiaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcXFwiQGxpbmFyaWEvcmVhY3RcXFwiO1xcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXFxcInJlYWN0XFxcIjtcXG5pbXBvcnQgeyB1c2VSZXNpemVEZXRlY3RvciB9IGZyb20gXFxcInJlYWN0LXJlc2l6ZS1kZXRlY3RvclxcXCI7XFxuaW1wb3J0IHtcXG4gICAgRGF0YUVkaXRvcixcXG4gICAgdHlwZSBEYXRhRWRpdG9yUHJvcHMsXFxuICAgIHR5cGUgRGF0YUVkaXRvclJlZixcXG4gICAgR3JpZENlbGxLaW5kLFxcbiAgICB0eXBlIEdyaWRDb2x1bW4sXFxuICAgIHR5cGUgVGhlbWUsXFxufSBmcm9tIFxcXCJAZ2xpZGVhcHBzL2dsaWRlLWRhdGEtZ3JpZFxcXCI7XFxuaW1wb3J0IHsgZmFrZXIgfSBmcm9tIFxcXCJAZmFrZXItanMvZmFrZXJcXFwiO1xcbmltcG9ydCB7IHVzZUNvbGxhcHNpbmdHcm91cHMsIHVzZUNvbHVtblNvcnQsIHVzZU1vdmVhYmxlQ29sdW1ucyB9IGZyb20gXFxcIi4uL2luZGV4LmpzXFxcIjtcXG5pbXBvcnQgeyB1c2VVbmRvUmVkbyB9IGZyb20gXFxcIi4uL3VzZS11bmRvLXJlZG8uanNcXFwiO1xcbmltcG9ydCB7IHVzZU1vY2tEYXRhR2VuZXJhdG9yIH0gZnJvbSBcXFwiLi91dGlscy5qc1xcXCI7XFxuXFxuZmFrZXIuc2VlZCgxMzM3KTtcXG5cXG5jb25zdCBTaW1wbGVXcmFwcGVyID0gc3R5bGVkLmRpdmBcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXG4gICAgKixcXG4gICAgKjo6YmVmb3JlLFxcbiAgICAqOjphZnRlciB7XFxuICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbiAgICB9XFxuYDtcXG5cXG5jb25zdCBTaW1wbGVUaGVtZVdyYXBwZXI6IFJlYWN0LkZDID0gcCA9PiB7XFxuICAgIHJldHVybiAoXFxuICAgICAgICA8U2ltcGxlV3JhcHBlcj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cXFwiY29udGVudFxcXCI+e3AuY2hpbGRyZW59PC9kaXY+XFxuICAgICAgICA8L1NpbXBsZVdyYXBwZXI+XFxuICAgICk7XFxufTtcXG5cXG5leHBvcnQgZGVmYXVsdCB7XFxuICAgIHRpdGxlOiBcXFwiRXh0cmEgUGFja2FnZXMvU291cmNlXFxcIixcXG5cXG4gICAgZGVjb3JhdG9yczogW1xcbiAgICAgICAgKFN0b3J5OiBSZWFjdC5Db21wb25lbnRUeXBlKSA9PiAoXFxuICAgICAgICAgICAgPFNpbXBsZVRoZW1lV3JhcHBlcj5cXG4gICAgICAgICAgICAgICAgPFN0b3J5IC8+XFxuICAgICAgICAgICAgPC9TaW1wbGVUaGVtZVdyYXBwZXI+XFxuICAgICAgICApLFxcbiAgICBdLFxcbn07XFxuXFxuY29uc3QgQmVhdXRpZnVsU3R5bGUgPSBzdHlsZWQuZGl2YFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjc5MGI5O1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMyNzkwYjksICMyMDcwYTkpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuXFxuICAgIHBhZGRpbmc6IDMycHggNDhweDtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG5cXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuXFxuICAgICYgPiBoMSB7XFxuICAgICAgICBmb250LXNpemU6IDUwcHg7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAgICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XFxuICAgIH1cXG5cXG4gICAgLnNpemVyIHtcXG4gICAgICAgIGZsZXgtZ3JvdzogMTtcXG5cXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcblxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gICAgICAgIGJveC1zaGFkb3c6XFxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMjUpIDBweCA0cHggOHB4IC0ycHgsXFxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMDgpIDBweCAwcHggMHB4IDFweDtcXG5cXG4gICAgICAgIC5zaXplci1jbGlwIHtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcblxcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgIH1cXG4gICAgfVxcbmA7XFxuXFxuaW50ZXJmYWNlIEJlYXV0aWZ1bFByb3BzIHtcXG4gICAgdGl0bGU6IHN0cmluZztcXG4gICAgZGVzY3JpcHRpb24/OiBSZWFjdC5SZWFjdE5vZGU7XFxufVxcblxcbmNvbnN0IEJlYXV0aWZ1bFdyYXBwZXI6IFJlYWN0LkZDPEJlYXV0aWZ1bFByb3BzPiA9IHAgPT4ge1xcbiAgICBjb25zdCB7IHRpdGxlLCBjaGlsZHJlbiwgZGVzY3JpcHRpb24gfSA9IHA7XFxuXFxuICAgIGNvbnN0IHsgcmVmLCB3aWR0aCwgaGVpZ2h0IH0gPSB1c2VSZXNpemVEZXRlY3RvcigpO1xcblxcbiAgICByZXR1cm4gKFxcbiAgICAgICAgPEJlYXV0aWZ1bFN0eWxlPlxcbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cXG4gICAgICAgICAgICB7ZGVzY3JpcHRpb259XFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XFxcInNpemVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XFxcInNpemVyLWNsaXBcXFwiIHJlZj17cmVmfT5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXFxcInJlbGF0aXZlXFxcIixcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoID8/IDEwMCxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgPz8gMTAwLFxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvQmVhdXRpZnVsU3R5bGU+XFxuICAgICk7XFxufTtcXG5cXG5jb25zdCBEZXNjcmlwdGlvbiA9IHN0eWxlZC5wYFxcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgICBtYXJnaW46IDAgMCAyMHB4IDA7XFxuYDtcXG5cXG5leHBvcnQgY29uc3QgTW9yZUluZm8gPSBzdHlsZWQucGBcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xcblxcbiAgICBidXR0b24ge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcXG4gICAgICAgIGNvbG9yOiAjMmIyYjJiO1xcbiAgICAgICAgcGFkZGluZzogMnB4IDZweDtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XFxuICAgICAgICBtYXJnaW46IDAgMC4xZW07XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIH1cXG5gO1xcblxcbmNvbnN0IGRlZmF1bHRQcm9wczogUGFydGlhbDxEYXRhRWRpdG9yUHJvcHM+ID0ge1xcbiAgICBzbW9vdGhTY3JvbGxYOiB0cnVlLFxcbiAgICBzbW9vdGhTY3JvbGxZOiB0cnVlLFxcbiAgICBpc0RyYWdnYWJsZTogZmFsc2UsXFxuICAgIHJvd01hcmtlcnM6IFxcXCJub25lXFxcIixcXG4gICAgd2lkdGg6IFxcXCIxMDAlXFxcIixcXG59O1xcblxcbmNvbnN0IHRlc3RUaGVtZTogVGhlbWUgPSB7XFxuICAgIGFjY2VudENvbG9yOiBcXFwiIzRGNURGRlxcXCIsXFxuICAgIGFjY2VudEZnOiBcXFwiI0ZGRkZGRlxcXCIsXFxuICAgIGFjY2VudExpZ2h0OiBcXFwicmdiYSg2MiwgMTE2LCAyNTMsIDAuMSlcXFwiLFxcblxcbiAgICB0ZXh0RGFyazogXFxcIiMzMTMxMzlcXFwiLFxcbiAgICB0ZXh0TWVkaXVtOiBcXFwiIzczNzM4M1xcXCIsXFxuICAgIHRleHRMaWdodDogXFxcIiNCMkIyQzBcXFwiLFxcbiAgICB0ZXh0QnViYmxlOiBcXFwiIzMxMzEzOVxcXCIsXFxuXFxuICAgIGJnSWNvbkhlYWRlcjogXFxcIiM3MzczODNcXFwiLFxcbiAgICBmZ0ljb25IZWFkZXI6IFxcXCIjRkZGRkZGXFxcIixcXG4gICAgdGV4dEhlYWRlcjogXFxcIiMzMTMxMzlcXFwiLFxcbiAgICB0ZXh0R3JvdXBIZWFkZXI6IFxcXCIjMzEzMTM5QkJcXFwiLFxcbiAgICB0ZXh0SGVhZGVyU2VsZWN0ZWQ6IFxcXCIjRkZGRkZGXFxcIixcXG5cXG4gICAgYmdDZWxsOiBcXFwiI0ZGRkZGRlxcXCIsXFxuICAgIGJnQ2VsbE1lZGl1bTogXFxcIiNGQUZBRkJcXFwiLFxcbiAgICBiZ0hlYWRlcjogXFxcIiNGN0Y3RjhcXFwiLFxcbiAgICBiZ0hlYWRlckhhc0ZvY3VzOiBcXFwiI0U5RTlFQlxcXCIsXFxuICAgIGJnSGVhZGVySG92ZXJlZDogXFxcIiNFRkVGRjFcXFwiLFxcblxcbiAgICBiZ0J1YmJsZTogXFxcIiNFREVERjNcXFwiLFxcbiAgICBiZ0J1YmJsZVNlbGVjdGVkOiBcXFwiI0ZGRkZGRlxcXCIsXFxuXFxuICAgIGhlYWRlckljb25TaXplOiAyMCxcXG4gICAgbWFya2VyRm9udFN0eWxlOiBcXFwiMTNweFxcXCIsXFxuXFxuICAgIGJnU2VhcmNoUmVzdWx0OiBcXFwiI2ZmZjllM1xcXCIsXFxuXFxuICAgIGJvcmRlckNvbG9yOiBcXFwicmdiYSgxMTUsIDExNiwgMTMxLCAwLjE2KVxcXCIsXFxuICAgIGhvcml6b250YWxCb3JkZXJDb2xvcjogXFxcInJnYmEoMTE1LCAxMTYsIDEzMSwgMC4xNilcXFwiLFxcbiAgICBkcmlsbGRvd25Cb3JkZXI6IFxcXCJyZ2JhKDAsIDAsIDAsIDApXFxcIixcXG5cXG4gICAgbGlua0NvbG9yOiBcXFwiIzRGNURGRlxcXCIsXFxuXFxuICAgIGNlbGxIb3Jpem9udGFsUGFkZGluZzogOCxcXG4gICAgY2VsbFZlcnRpY2FsUGFkZGluZzogMyxcXG5cXG4gICAgaGVhZGVyRm9udFN0eWxlOiBcXFwiNjAwIDEzcHhcXFwiLFxcbiAgICBiYXNlRm9udFN0eWxlOiBcXFwiMTNweFxcXCIsXFxuICAgIGVkaXRvckZvbnRTaXplOiBcXFwiMTNweFxcXCIsXFxuICAgIGxpbmVIZWlnaHQ6IDEuNCxcXG4gICAgZm9udEZhbWlseTpcXG4gICAgICAgIFxcXCJJbnRlciwgUm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIGF2ZW5pciBuZXh0LCBhdmVuaXIsIHNlZ29lIHVpLCBoZWx2ZXRpY2EgbmV1ZSwgaGVsdmV0aWNhLCBVYnVudHUsIG5vdG8sIGFyaWFsLCBzYW5zLXNlcmlmXFxcIixcXG59O1xcblxcbmNvbnN0IGNvbHM6IEdyaWRDb2x1bW5bXSA9IFtcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJBXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDFcXFwiLFxcbiAgICB9LFxcbiAgICB7XFxuICAgICAgICB0aXRsZTogXFxcIkJcXFwiLFxcbiAgICAgICAgd2lkdGg6IDIwMCxcXG4gICAgICAgIGdyb3VwOiBcXFwiR3JvdXAgMVxcXCIsXFxuICAgIH0sXFxuICAgIHtcXG4gICAgICAgIHRpdGxlOiBcXFwiQ1xcXCIsXFxuICAgICAgICB3aWR0aDogMjAwLFxcbiAgICAgICAgZ3JvdXA6IFxcXCJHcm91cCAyXFxcIixcXG4gICAgfSxcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJEXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDJcXFwiLFxcbiAgICB9LFxcbiAgICB7XFxuICAgICAgICB0aXRsZTogXFxcIkVcXFwiLFxcbiAgICAgICAgd2lkdGg6IDIwMCxcXG4gICAgICAgIGdyb3VwOiBcXFwiR3JvdXAgMlxcXCIsXFxuICAgIH0sXFxuXTtcXG5cXG5leHBvcnQgY29uc3QgVXNlRGF0YVNvdXJjZTogUmVhY3QuVkZDID0gKCkgPT4ge1xcbiAgICBjb25zdCBjYWNoZSA9IFJlYWN0LnVzZVJlZjxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pih7fSk7XFxuXFxuICAgIGNvbnN0IHJvd3MgPSAxMDBfMDAwO1xcblxcbiAgICBjb25zdCBtb3ZlQXJncyA9IHVzZU1vdmVhYmxlQ29sdW1ucyh7XFxuICAgICAgICBjb2x1bW5zOiBjb2xzLFxcbiAgICAgICAgZ2V0Q2VsbENvbnRlbnQ6IFJlYWN0LnVzZUNhbGxiYWNrKChbY29sLCByb3ddKSA9PiB7XFxuICAgICAgICAgICAgaWYgKGNvbCA9PT0gMCkge1xcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xcbiAgICAgICAgICAgICAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlRleHQsXFxuICAgICAgICAgICAgICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBgJHtyb3d9YCxcXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhOiBgJHtyb3d9YCxcXG4gICAgICAgICAgICAgICAgfTtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7Y29sfSwke3Jvd31gO1xcbiAgICAgICAgICAgIGlmIChjYWNoZS5jdXJyZW50W2tleV0gPT09IHVuZGVmaW5lZCkge1xcbiAgICAgICAgICAgICAgICBjYWNoZS5jdXJyZW50W2tleV0gPSBmYWtlci5uYW1lLmZpcnN0TmFtZSgpICsgXFxcIiBcXFwiICsgZmFrZXIubmFtZS5sYXN0TmFtZSgpO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICBjb25zdCBkID0gY2FjaGUuY3VycmVudFtrZXldO1xcblxcbiAgICAgICAgICAgIHJldHVybiB7XFxuICAgICAgICAgICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxcbiAgICAgICAgICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXFxuICAgICAgICAgICAgICAgIGRhdGE6IGQsXFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhOiBkLFxcbiAgICAgICAgICAgIH07XFxuICAgICAgICB9LCBbXSksXFxuICAgIH0pO1xcblxcbiAgICBjb25zdCBbc29ydCwgc2V0U29ydF0gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KCk7XFxuXFxuICAgIGNvbnN0IHNvcnRBcmdzID0gdXNlQ29sdW1uU29ydCh7XFxuICAgICAgICBjb2x1bW5zOiBtb3ZlQXJncy5jb2x1bW5zLFxcbiAgICAgICAgZ2V0Q2VsbENvbnRlbnQ6IG1vdmVBcmdzLmdldENlbGxDb250ZW50LFxcbiAgICAgICAgcm93cyxcXG4gICAgICAgIHNvcnQ6XFxuICAgICAgICAgICAgc29ydCA9PT0gdW5kZWZpbmVkXFxuICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXFxuICAgICAgICAgICAgICAgIDoge1xcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1vdmVBcmdzLmNvbHVtbnNbc29ydF0sXFxuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXFxcImRlc2NcXFwiLFxcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcXFwic21hcnRcXFwiLFxcbiAgICAgICAgICAgICAgICAgIH0sXFxuICAgIH0pO1xcblxcbiAgICBjb25zdCBjb2xsYXBzZUFyZ3MgPSB1c2VDb2xsYXBzaW5nR3JvdXBzKHtcXG4gICAgICAgIGNvbHVtbnM6IG1vdmVBcmdzLmNvbHVtbnMsXFxuICAgICAgICB0aGVtZTogdGVzdFRoZW1lLFxcbiAgICAgICAgZnJlZXplQ29sdW1uczogMCxcXG4gICAgfSk7XFxuXFxuICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2sgPSBSZWFjdC51c2VDYWxsYmFjaygoaW5kZXg6IG51bWJlcikgPT4ge1xcbiAgICAgICAgc2V0U29ydChpbmRleCk7XFxuICAgIH0sIFtdKTtcXG5cXG4gICAgcmV0dXJuIChcXG4gICAgICAgIDxCZWF1dGlmdWxXcmFwcGVyIHRpdGxlPVxcXCJDdXN0b20gc291cmNlIGV4dGVuc2lvbnNcXFwiIGRlc2NyaXB0aW9uPXs8RGVzY3JpcHRpb24+Rml4bWUuPC9EZXNjcmlwdGlvbj59PlxcbiAgICAgICAgICAgIDxEYXRhRWRpdG9yXFxuICAgICAgICAgICAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XFxuICAgICAgICAgICAgICAgIHsuLi5tb3ZlQXJnc31cXG4gICAgICAgICAgICAgICAgey4uLnNvcnRBcmdzfVxcbiAgICAgICAgICAgICAgICB7Li4uY29sbGFwc2VBcmdzfVxcbiAgICAgICAgICAgICAgICByb3dzPXtyb3dzfVxcbiAgICAgICAgICAgICAgICBvbkNvbHVtbk1vdmVkPXttb3ZlQXJncy5vbkNvbHVtbk1vdmVkfVxcbiAgICAgICAgICAgICAgICBvbkhlYWRlckNsaWNrZWQ9e29uSGVhZGVyQ2xpY2t9XFxuICAgICAgICAgICAgLz5cXG4gICAgICAgIDwvQmVhdXRpZnVsV3JhcHBlcj5cXG4gICAgKTtcXG59O1xcbihVc2VEYXRhU291cmNlIGFzIGFueSkucGFyYW1ldGVycyA9IHtcXG4gICAgb3B0aW9uczoge1xcbiAgICAgICAgc2hvd1BhbmVsOiBmYWxzZSxcXG4gICAgfSxcXG59O1xcblxcbmV4cG9ydCBjb25zdCBVbmRvUmVkbzogUmVhY3QuVkZDID0gKCkgPT4ge1xcbiAgICBjb25zdCB7IGNvbHM6IGNvbHVtbnMsIGdldENlbGxDb250ZW50LCBzZXRDZWxsVmFsdWUgfSA9IHVzZU1vY2tEYXRhR2VuZXJhdG9yKDYpO1xcblxcbiAgICBjb25zdCBncmlkUmVmID0gUmVhY3QudXNlUmVmPERhdGFFZGl0b3JSZWY+KG51bGwpO1xcblxcbiAgICBjb25zdCB7IGdyaWRTZWxlY3Rpb24sIG9uQ2VsbEVkaXRlZCwgb25HcmlkU2VsZWN0aW9uQ2hhbmdlLCB1bmRvLCBjYW5SZWRvLCBjYW5VbmRvLCByZWRvIH0gPSB1c2VVbmRvUmVkbyhcXG4gICAgICAgIGdyaWRSZWYsXFxuICAgICAgICBnZXRDZWxsQ29udGVudCxcXG4gICAgICAgIHNldENlbGxWYWx1ZVxcbiAgICApO1xcblxcbiAgICByZXR1cm4gKFxcbiAgICAgICAgPEJlYXV0aWZ1bFdyYXBwZXJcXG4gICAgICAgICAgICB0aXRsZT1cXFwiVW5kbyAvIFJlZG8gU3VwcG9ydFxcXCJcXG4gICAgICAgICAgICBkZXNjcmlwdGlvbj17XFxuICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIEEgc2ltcGxlIHVuZG8vcmVkbyBpbXBsZW1lbnRhdGlvblxcbiAgICAgICAgICAgICAgICAgICAgPE1vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZSBrZXlib2FyZCBzaG9ydGN1dHMgQ01EK1ogYW5kIENNRCtTSElGVCtaIC8gQ1RSTCtaIGFuZCBDVFJMK1kuIE9yIGNsaWNrIHRoZXNlIGJ1dHRvbnM6XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt1bmRvfSBkaXNhYmxlZD17IWNhblVuZG99IHN0eWxlPXt7IG9wYWNpdHk6IGNhblVuZG8gPyAxIDogMC40IH19PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmRvXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtyZWRvfSBkaXNhYmxlZD17IWNhblJlZG99IHN0eWxlPXt7IG9wYWNpdHk6IGNhblJlZG8gPyAxIDogMC40IH19PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWRvXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICA8L01vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICAgICAgPE1vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEl0IHdvcmtzIGJ5IHRha2luZyBhIHNuYXBzaG90IG9mIHRoZSBjb250ZW50IG9mIGEgY2VsbCBiZWZvcmUgaXQgaXMgZWRpdGVkIGFuZCByZXBsYXlpbmcgYW55XFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdHMgYmFjay5cXG4gICAgICAgICAgICAgICAgICAgIDwvTW9yZUluZm8+XFxuICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XFxuICAgICAgICAgICAgfT5cXG4gICAgICAgICAgICA8RGF0YUVkaXRvclxcbiAgICAgICAgICAgICAgICB7Li4uZGVmYXVsdFByb3BzfVxcbiAgICAgICAgICAgICAgICByZWY9e2dyaWRSZWZ9XFxuICAgICAgICAgICAgICAgIG9uQ2VsbEVkaXRlZD17b25DZWxsRWRpdGVkfVxcbiAgICAgICAgICAgICAgICBnZXRDZWxsQ29udGVudD17Z2V0Q2VsbENvbnRlbnR9XFxuICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb249e2dyaWRTZWxlY3Rpb24gPz8gdW5kZWZpbmVkfVxcbiAgICAgICAgICAgICAgICBvbkdyaWRTZWxlY3Rpb25DaGFuZ2U9e29uR3JpZFNlbGVjdGlvbkNoYW5nZX1cXG4gICAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cXG4gICAgICAgICAgICAgICAgcm93cz17MTAwMH1cXG4gICAgICAgICAgICAvPlxcbiAgICAgICAgPC9CZWF1dGlmdWxXcmFwcGVyPlxcbiAgICApO1xcbn07XFxuKFVuZG9SZWRvIGFzIGFueSkucGFyYW1ldGVycyA9IHtcXG4gICAgb3B0aW9uczoge1xcbiAgICAgICAgc2hvd1BhbmVsOiBmYWxzZSxcXG4gICAgfSxcXG59O1xcblwiLFxuICAgICAgXCJsb2NhdGlvbnNNYXBcIjoge1xuICAgICAgICBcInVzZS1kYXRhLXNvdXJjZVwiOiB7XG4gICAgICAgICAgXCJzdGFydExvY1wiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiA0MCxcbiAgICAgICAgICAgIFwibGluZVwiOiAyMjdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5kTG9jXCI6IHtcbiAgICAgICAgICAgIFwiY29sXCI6IDEsXG4gICAgICAgICAgICBcImxpbmVcIjogMjk4XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0YXJ0Qm9keVwiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiA0MCxcbiAgICAgICAgICAgIFwibGluZVwiOiAyMjdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5kQm9keVwiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiAxLFxuICAgICAgICAgICAgXCJsaW5lXCI6IDI5OFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ1bmRvLXJlZG9cIjoge1xuICAgICAgICAgIFwic3RhcnRMb2NcIjoge1xuICAgICAgICAgICAgXCJjb2xcIjogMzUsXG4gICAgICAgICAgICBcImxpbmVcIjogMzA1XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuZExvY1wiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiAxLFxuICAgICAgICAgICAgXCJsaW5lXCI6IDM0OVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdGFydEJvZHlcIjoge1xuICAgICAgICAgICAgXCJjb2xcIjogMzUsXG4gICAgICAgICAgICBcImxpbmVcIjogMzA1XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuZEJvZHlcIjoge1xuICAgICAgICAgICAgXCJjb2xcIjogMSxcbiAgICAgICAgICAgIFwibGluZVwiOiAzNDlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHRpdGxlOiBcIkV4dHJhIFBhY2thZ2VzL1NvdXJjZVwiLFxuICBkZWNvcmF0b3JzOiBbU3RvcnkgPT4gX2pzeChTaW1wbGVUaGVtZVdyYXBwZXIsIHtcbiAgICBjaGlsZHJlbjogX2pzeChTdG9yeSwge30pXG4gIH0pXVxufTtcbmNvbnN0IEJlYXV0aWZ1bFN0eWxlID0gc3R5bGVkLmRpdmBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjc5MGI5O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzI3OTBiOSwgIzIwNzBhOSk7XG4gICAgY29sb3I6IHdoaXRlO1xuXG4gICAgcGFkZGluZzogMzJweCA0OHB4O1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGhlaWdodDogMTAwdmg7XG5cbiAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcblxuICAgICYgPiBoMSB7XG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIG1hcmdpbjogMCAwIDEycHggMDtcbiAgICB9XG5cbiAgICAuc2l6ZXIge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgYm94LXNoYWRvdzpcbiAgICAgICAgICAgIHJnYmEoOSwgMzAsIDY2LCAwLjI1KSAwcHggNHB4IDhweCAtMnB4LFxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMDgpIDBweCAwcHggMHB4IDFweDtcblxuICAgICAgICAuc2l6ZXItY2xpcCB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcblxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxuYDtcbmNvbnN0IEJlYXV0aWZ1bFdyYXBwZXIgPSBwID0+IHtcbiAgY29uc3Qge1xuICAgIHRpdGxlLFxuICAgIGNoaWxkcmVuLFxuICAgIGRlc2NyaXB0aW9uXG4gIH0gPSBwO1xuICBjb25zdCB7XG4gICAgcmVmLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodFxuICB9ID0gdXNlUmVzaXplRGV0ZWN0b3IoKTtcbiAgcmV0dXJuIF9qc3hzKEJlYXV0aWZ1bFN0eWxlLCB7XG4gICAgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwge1xuICAgICAgY2hpbGRyZW46IHRpdGxlXG4gICAgfSksIGRlc2NyaXB0aW9uLCBfanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJzaXplclwiLFxuICAgICAgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwge1xuICAgICAgICBjbGFzc05hbWU6IFwic2l6ZXItY2xpcFwiLFxuICAgICAgICByZWY6IHJlZixcbiAgICAgICAgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwge1xuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoICE9PSBudWxsICYmIHdpZHRoICE9PSB2b2lkIDAgPyB3aWR0aCA6IDEwMCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICE9PSBudWxsICYmIGhlaWdodCAhPT0gdm9pZCAwID8gaGVpZ2h0IDogMTAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSldXG4gIH0pO1xufTtcbkJlYXV0aWZ1bFdyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkJlYXV0aWZ1bFdyYXBwZXJcIjtcbmNvbnN0IERlc2NyaXB0aW9uID0gc3R5bGVkLnBgXG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbmA7XG5leHBvcnQgY29uc3QgTW9yZUluZm8gPSBzdHlsZWQucGBcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICAgICAgY29sb3I6ICMyYjJiMmI7XG4gICAgICAgIHBhZGRpbmc6IDJweCA2cHg7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XG4gICAgICAgIG1hcmdpbjogMCAwLjFlbTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuYDtcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgc21vb3RoU2Nyb2xsWDogdHJ1ZSxcbiAgc21vb3RoU2Nyb2xsWTogdHJ1ZSxcbiAgaXNEcmFnZ2FibGU6IGZhbHNlLFxuICByb3dNYXJrZXJzOiBcIm5vbmVcIixcbiAgd2lkdGg6IFwiMTAwJVwiXG59O1xuY29uc3QgdGVzdFRoZW1lID0ge1xuICBhY2NlbnRDb2xvcjogXCIjNEY1REZGXCIsXG4gIGFjY2VudEZnOiBcIiNGRkZGRkZcIixcbiAgYWNjZW50TGlnaHQ6IFwicmdiYSg2MiwgMTE2LCAyNTMsIDAuMSlcIixcbiAgdGV4dERhcms6IFwiIzMxMzEzOVwiLFxuICB0ZXh0TWVkaXVtOiBcIiM3MzczODNcIixcbiAgdGV4dExpZ2h0OiBcIiNCMkIyQzBcIixcbiAgdGV4dEJ1YmJsZTogXCIjMzEzMTM5XCIsXG4gIGJnSWNvbkhlYWRlcjogXCIjNzM3MzgzXCIsXG4gIGZnSWNvbkhlYWRlcjogXCIjRkZGRkZGXCIsXG4gIHRleHRIZWFkZXI6IFwiIzMxMzEzOVwiLFxuICB0ZXh0R3JvdXBIZWFkZXI6IFwiIzMxMzEzOUJCXCIsXG4gIHRleHRIZWFkZXJTZWxlY3RlZDogXCIjRkZGRkZGXCIsXG4gIGJnQ2VsbDogXCIjRkZGRkZGXCIsXG4gIGJnQ2VsbE1lZGl1bTogXCIjRkFGQUZCXCIsXG4gIGJnSGVhZGVyOiBcIiNGN0Y3RjhcIixcbiAgYmdIZWFkZXJIYXNGb2N1czogXCIjRTlFOUVCXCIsXG4gIGJnSGVhZGVySG92ZXJlZDogXCIjRUZFRkYxXCIsXG4gIGJnQnViYmxlOiBcIiNFREVERjNcIixcbiAgYmdCdWJibGVTZWxlY3RlZDogXCIjRkZGRkZGXCIsXG4gIGhlYWRlckljb25TaXplOiAyMCxcbiAgbWFya2VyRm9udFN0eWxlOiBcIjEzcHhcIixcbiAgYmdTZWFyY2hSZXN1bHQ6IFwiI2ZmZjllM1wiLFxuICBib3JkZXJDb2xvcjogXCJyZ2JhKDExNSwgMTE2LCAxMzEsIDAuMTYpXCIsXG4gIGhvcml6b250YWxCb3JkZXJDb2xvcjogXCJyZ2JhKDExNSwgMTE2LCAxMzEsIDAuMTYpXCIsXG4gIGRyaWxsZG93bkJvcmRlcjogXCJyZ2JhKDAsIDAsIDAsIDApXCIsXG4gIGxpbmtDb2xvcjogXCIjNEY1REZGXCIsXG4gIGNlbGxIb3Jpem9udGFsUGFkZGluZzogOCxcbiAgY2VsbFZlcnRpY2FsUGFkZGluZzogMyxcbiAgaGVhZGVyRm9udFN0eWxlOiBcIjYwMCAxM3B4XCIsXG4gIGJhc2VGb250U3R5bGU6IFwiMTNweFwiLFxuICBlZGl0b3JGb250U2l6ZTogXCIxM3B4XCIsXG4gIGxpbmVIZWlnaHQ6IDEuNCxcbiAgZm9udEZhbWlseTogXCJJbnRlciwgUm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIGF2ZW5pciBuZXh0LCBhdmVuaXIsIHNlZ29lIHVpLCBoZWx2ZXRpY2EgbmV1ZSwgaGVsdmV0aWNhLCBVYnVudHUsIG5vdG8sIGFyaWFsLCBzYW5zLXNlcmlmXCJcbn07XG5jb25zdCBjb2xzID0gW3tcbiAgdGl0bGU6IFwiQVwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAxXCJcbn0sIHtcbiAgdGl0bGU6IFwiQlwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAxXCJcbn0sIHtcbiAgdGl0bGU6IFwiQ1wiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAyXCJcbn0sIHtcbiAgdGl0bGU6IFwiRFwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAyXCJcbn0sIHtcbiAgdGl0bGU6IFwiRVwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAyXCJcbn1dO1xuZXhwb3J0IGNvbnN0IFVzZURhdGFTb3VyY2UgPSAoKSA9PiB7XG4gIGNvbnN0IGNhY2hlID0gUmVhY3QudXNlUmVmKHt9KTtcbiAgY29uc3Qgcm93cyA9IDEwMDAwMDtcbiAgY29uc3QgbW92ZUFyZ3MgPSB1c2VNb3ZlYWJsZUNvbHVtbnMoe1xuICAgIGNvbHVtbnM6IGNvbHMsXG4gICAgZ2V0Q2VsbENvbnRlbnQ6IFJlYWN0LnVzZUNhbGxiYWNrKF9yZWYgPT4ge1xuICAgICAgbGV0IFtjb2wsIHJvd10gPSBfcmVmO1xuICAgICAgaWYgKGNvbCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgICBkYXRhOiBgJHtyb3d9YCxcbiAgICAgICAgICBkaXNwbGF5RGF0YTogYCR7cm93fWBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleSA9IGAke2NvbH0sJHtyb3d9YDtcbiAgICAgIGlmIChjYWNoZS5jdXJyZW50W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYWNoZS5jdXJyZW50W2tleV0gPSBmYWtlci5uYW1lLmZpcnN0TmFtZSgpICsgXCIgXCIgKyBmYWtlci5uYW1lLmxhc3ROYW1lKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBkID0gY2FjaGUuY3VycmVudFtrZXldO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlRleHQsXG4gICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgZGF0YTogZCxcbiAgICAgICAgZGlzcGxheURhdGE6IGRcbiAgICAgIH07XG4gICAgfSwgW10pXG4gIH0pO1xuICBjb25zdCBbc29ydCwgc2V0U29ydF0gPSBSZWFjdC51c2VTdGF0ZSgpO1xuICBjb25zdCBzb3J0QXJncyA9IHVzZUNvbHVtblNvcnQoe1xuICAgIGNvbHVtbnM6IG1vdmVBcmdzLmNvbHVtbnMsXG4gICAgZ2V0Q2VsbENvbnRlbnQ6IG1vdmVBcmdzLmdldENlbGxDb250ZW50LFxuICAgIHJvd3MsXG4gICAgc29ydDogc29ydCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDoge1xuICAgICAgY29sdW1uOiBtb3ZlQXJncy5jb2x1bW5zW3NvcnRdLFxuICAgICAgZGlyZWN0aW9uOiBcImRlc2NcIixcbiAgICAgIG1vZGU6IFwic21hcnRcIlxuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGNvbGxhcHNlQXJncyA9IHVzZUNvbGxhcHNpbmdHcm91cHMoe1xuICAgIGNvbHVtbnM6IG1vdmVBcmdzLmNvbHVtbnMsXG4gICAgdGhlbWU6IHRlc3RUaGVtZSxcbiAgICBmcmVlemVDb2x1bW5zOiAwXG4gIH0pO1xuICBjb25zdCBvbkhlYWRlckNsaWNrID0gUmVhY3QudXNlQ2FsbGJhY2soaW5kZXggPT4ge1xuICAgIHNldFNvcnQoaW5kZXgpO1xuICB9LCBbXSk7XG4gIHJldHVybiBfanN4KEJlYXV0aWZ1bFdyYXBwZXIsIHtcbiAgICB0aXRsZTogXCJDdXN0b20gc291cmNlIGV4dGVuc2lvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogX2pzeChEZXNjcmlwdGlvbiwge1xuICAgICAgY2hpbGRyZW46IFwiRml4bWUuXCJcbiAgICB9KSxcbiAgICBjaGlsZHJlbjogX2pzeChEYXRhRWRpdG9yLCB7XG4gICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAuLi5tb3ZlQXJncyxcbiAgICAgIC4uLnNvcnRBcmdzLFxuICAgICAgLi4uY29sbGFwc2VBcmdzLFxuICAgICAgcm93czogcm93cyxcbiAgICAgIG9uQ29sdW1uTW92ZWQ6IG1vdmVBcmdzLm9uQ29sdW1uTW92ZWQsXG4gICAgICBvbkhlYWRlckNsaWNrZWQ6IG9uSGVhZGVyQ2xpY2tcbiAgICB9KVxuICB9KTtcbn07XG5Vc2VEYXRhU291cmNlLmRpc3BsYXlOYW1lID0gXCJVc2VEYXRhU291cmNlXCI7XG47XG5Vc2VEYXRhU291cmNlLnBhcmFtZXRlcnMgPSB7XG4gIG9wdGlvbnM6IHtcbiAgICBzaG93UGFuZWw6IGZhbHNlXG4gIH1cbn07XG5leHBvcnQgY29uc3QgVW5kb1JlZG8gPSAoKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb2xzOiBjb2x1bW5zLFxuICAgIGdldENlbGxDb250ZW50LFxuICAgIHNldENlbGxWYWx1ZVxuICB9ID0gdXNlTW9ja0RhdGFHZW5lcmF0b3IoNik7XG4gIGNvbnN0IGdyaWRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IHtcbiAgICBncmlkU2VsZWN0aW9uLFxuICAgIG9uQ2VsbEVkaXRlZCxcbiAgICBvbkdyaWRTZWxlY3Rpb25DaGFuZ2UsXG4gICAgdW5kbyxcbiAgICBjYW5SZWRvLFxuICAgIGNhblVuZG8sXG4gICAgcmVkb1xuICB9ID0gdXNlVW5kb1JlZG8oZ3JpZFJlZiwgZ2V0Q2VsbENvbnRlbnQsIHNldENlbGxWYWx1ZSk7XG4gIHJldHVybiBfanN4KEJlYXV0aWZ1bFdyYXBwZXIsIHtcbiAgICB0aXRsZTogXCJVbmRvIC8gUmVkbyBTdXBwb3J0XCIsXG4gICAgZGVzY3JpcHRpb246IF9qc3hzKERlc2NyaXB0aW9uLCB7XG4gICAgICBjaGlsZHJlbjogW1wiQSBzaW1wbGUgdW5kby9yZWRvIGltcGxlbWVudGF0aW9uXCIsIF9qc3hzKE1vcmVJbmZvLCB7XG4gICAgICAgIGNoaWxkcmVuOiBbXCJVc2Uga2V5Ym9hcmQgc2hvcnRjdXRzIENNRCtaIGFuZCBDTUQrU0hJRlQrWiAvIENUUkwrWiBhbmQgQ1RSTCtZLiBPciBjbGljayB0aGVzZSBidXR0b25zOlwiLCBfanN4KFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICBvbkNsaWNrOiB1bmRvLFxuICAgICAgICAgIGRpc2FibGVkOiAhY2FuVW5kbyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2FuVW5kbyA/IDEgOiAwLjRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBcIlVuZG9cIlxuICAgICAgICB9KSwgX2pzeChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgb25DbGljazogcmVkbyxcbiAgICAgICAgICBkaXNhYmxlZDogIWNhblJlZG8sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNhblJlZG8gPyAxIDogMC40XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGlsZHJlbjogXCJSZWRvXCJcbiAgICAgICAgfSldXG4gICAgICB9KSwgX2pzeChNb3JlSW5mbywge1xuICAgICAgICBjaGlsZHJlbjogXCJJdCB3b3JrcyBieSB0YWtpbmcgYSBzbmFwc2hvdCBvZiB0aGUgY29udGVudCBvZiBhIGNlbGwgYmVmb3JlIGl0IGlzIGVkaXRlZCBhbmQgcmVwbGF5aW5nIGFueSBlZGl0cyBiYWNrLlwiXG4gICAgICB9KV1cbiAgICB9KSxcbiAgICBjaGlsZHJlbjogX2pzeChEYXRhRWRpdG9yLCB7XG4gICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICByZWY6IGdyaWRSZWYsXG4gICAgICBvbkNlbGxFZGl0ZWQ6IG9uQ2VsbEVkaXRlZCxcbiAgICAgIGdldENlbGxDb250ZW50OiBnZXRDZWxsQ29udGVudCxcbiAgICAgIGdyaWRTZWxlY3Rpb246IGdyaWRTZWxlY3Rpb24gIT09IG51bGwgJiYgZ3JpZFNlbGVjdGlvbiAhPT0gdm9pZCAwID8gZ3JpZFNlbGVjdGlvbiA6IHVuZGVmaW5lZCxcbiAgICAgIG9uR3JpZFNlbGVjdGlvbkNoYW5nZTogb25HcmlkU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgY29sdW1uczogY29sdW1ucyxcbiAgICAgIHJvd3M6IDEwMDBcbiAgICB9KVxuICB9KTtcbn07XG5VbmRvUmVkby5kaXNwbGF5TmFtZSA9IFwiVW5kb1JlZG9cIjtcblVuZG9SZWRvLnBhcmFtZXRlcnMgPSB7XG4gIG9wdGlvbnM6IHtcbiAgICBzaG93UGFuZWw6IGZhbHNlXG4gIH1cbn07Il19*/", "",{"version":3,"sources":["/home/runner/work/glide-data-grid/glide-data-grid/packages/source/src/stories/use-data-source.stories.tsx","webpack://./packages/source/src/stories/use-data-source.stories.tsx"],"names":[".ss4kmn3",".bkh67gx",".d1deot3s",".m1ml0sw1"],"mappings":"AAkDsBA,SAAAA,qBAAAA,CAAAA,CAAAA,gDAAAA,kBAAAA,CAAAA;AAmECC,SAAAA,wBAAAA,CAAAA,iDAAAA,CAAAA,WAAAA,CAAAA,iBAAAA,CAAAA,mBAAAA,CAAAA,oBAAAA,CAAAA,mBAAAA,CAAAA,YAAAA,CAAAA,6BAAAA,CAAAA,yBAAAA,CAAAA,qBAAAA,CAAAA,YAAAA,CAAAA,sBAAAA,CAAAA,CAAAA,cAAAA,cAAAA,CAAAA,eAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,iBAAAA,CAAAA,CAAAA,gBAAAA,kBAAAA,CAAAA,mBAAAA,CAAAA,mBAAAA,CAAAA,WAAAA,CAAAA,sBAAAA,CAAAA,kBAAAA,CAAAA,mFAAAA,CAAAA,CAAAA,4BAAAA,kBAAAA,CAAAA,eAAAA,CAAAA,+BAAAA,CAAAA,2BAAAA,CAAAA,uBAAAA,CAAAA,WAAAA,CAAAA;AAuEHC,UAAAA,cAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,iBAAAA,CAAAA;AAKIC,UAAAA,cAAAA,CAAAA,qBAAAA,CAAAA,mBAAAA,CAAAA,aAAAA,CAAAA,iBAAAA,CAAAA,CAAAA,iBAAAA,wBAAAA,CAAAA,aAAAA,CAAAA,eAAAA,CAAAA,qBAAAA,CAAAA,cAAAA,CAAAA,iBAAAA,CAAAA,gCAAAA,CAAAA,cAAAA,CAAAA,WAAAA,CAAAA,cAAAA,CAAAA;AC7LxB,myvCAAmyvC","sourcesContent":["var __STORY__ = \"import { styled } from \\\"@linaria/react\\\";\\nimport * as React from \\\"react\\\";\\nimport { useResizeDetector } from \\\"react-resize-detector\\\";\\nimport {\\n    DataEditor,\\n    type DataEditorProps,\\n    type DataEditorRef,\\n    GridCellKind,\\n    type GridColumn,\\n    type Theme,\\n} from \\\"@glideapps/glide-data-grid\\\";\\nimport { faker } from \\\"@faker-js/faker\\\";\\nimport { useCollapsingGroups, useColumnSort, useMoveableColumns } from \\\"../index.js\\\";\\nimport { useUndoRedo } from \\\"../use-undo-redo.js\\\";\\nimport { useMockDataGenerator } from \\\"./utils.js\\\";\\n\\nfaker.seed(1337);\\n\\nconst SimpleWrapper = styled.div`\\n    box-sizing: border-box;\\n\\n    *,\\n    *::before,\\n    *::after {\\n        box-sizing: inherit;\\n    }\\n`;\\n\\nconst SimpleThemeWrapper: React.FC = p => {\\n    return (\\n        <SimpleWrapper>\\n            <div className=\\\"content\\\">{p.children}</div>\\n        </SimpleWrapper>\\n    );\\n};\\n\\nexport default {\\n    title: \\\"Extra Packages/Source\\\",\\n\\n    decorators: [\\n        (Story: React.ComponentType) => (\\n            <SimpleThemeWrapper>\\n                <Story />\\n            </SimpleThemeWrapper>\\n        ),\\n    ],\\n};\\n\\nconst BeautifulStyle = styled.div`\\n    background-color: #2790b9;\\n    background: linear-gradient(90deg, #2790b9, #2070a9);\\n    color: white;\\n\\n    padding: 32px 48px;\\n\\n    display: flex;\\n    flex-direction: column;\\n    height: 100vh;\\n\\n    font-family: sans-serif;\\n\\n    & > h1 {\\n        font-size: 50px;\\n        font-weight: 600;\\n        flex-shrink: 0;\\n        margin: 0 0 12px 0;\\n    }\\n\\n    .sizer {\\n        flex-grow: 1;\\n\\n        background-color: white;\\n\\n        border-radius: 12px;\\n        box-shadow:\\n            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,\\n            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;\\n\\n        .sizer-clip {\\n            border-radius: 12px;\\n            overflow: hidden;\\n            transform: translateZ(0);\\n\\n            height: 100%;\\n        }\\n    }\\n`;\\n\\ninterface BeautifulProps {\\n    title: string;\\n    description?: React.ReactNode;\\n}\\n\\nconst BeautifulWrapper: React.FC<BeautifulProps> = p => {\\n    const { title, children, description } = p;\\n\\n    const { ref, width, height } = useResizeDetector();\\n\\n    return (\\n        <BeautifulStyle>\\n            <h1>{title}</h1>\\n            {description}\\n            <div className=\\\"sizer\\\">\\n                <div className=\\\"sizer-clip\\\" ref={ref}>\\n                    <div\\n                        style={{\\n                            position: \\\"relative\\\",\\n                            width: width ?? 100,\\n                            height: height ?? 100,\\n                        }}>\\n                        {children}\\n                    </div>\\n                </div>\\n            </div>\\n        </BeautifulStyle>\\n    );\\n};\\n\\nconst Description = styled.p`\\n    font-size: 18px;\\n    flex-shrink: 0;\\n    margin: 0 0 20px 0;\\n`;\\n\\nexport const MoreInfo = styled.p`\\n    font-size: 14px;\\n    flex-shrink: 0;\\n    margin: 0 0 20px 0;\\n\\n    button {\\n        background-color: #f4f4f4;\\n        color: #2b2b2b;\\n        padding: 2px 6px;\\n        font-family: monospace;\\n        font-size: 14px;\\n        border-radius: 4px;\\n        box-shadow: 0px 1px 2px #00000040;\\n        margin: 0 0.1em;\\n        border: none;\\n        cursor: pointer;\\n    }\\n`;\\n\\nconst defaultProps: Partial<DataEditorProps> = {\\n    smoothScrollX: true,\\n    smoothScrollY: true,\\n    isDraggable: false,\\n    rowMarkers: \\\"none\\\",\\n    width: \\\"100%\\\",\\n};\\n\\nconst testTheme: Theme = {\\n    accentColor: \\\"#4F5DFF\\\",\\n    accentFg: \\\"#FFFFFF\\\",\\n    accentLight: \\\"rgba(62, 116, 253, 0.1)\\\",\\n\\n    textDark: \\\"#313139\\\",\\n    textMedium: \\\"#737383\\\",\\n    textLight: \\\"#B2B2C0\\\",\\n    textBubble: \\\"#313139\\\",\\n\\n    bgIconHeader: \\\"#737383\\\",\\n    fgIconHeader: \\\"#FFFFFF\\\",\\n    textHeader: \\\"#313139\\\",\\n    textGroupHeader: \\\"#313139BB\\\",\\n    textHeaderSelected: \\\"#FFFFFF\\\",\\n\\n    bgCell: \\\"#FFFFFF\\\",\\n    bgCellMedium: \\\"#FAFAFB\\\",\\n    bgHeader: \\\"#F7F7F8\\\",\\n    bgHeaderHasFocus: \\\"#E9E9EB\\\",\\n    bgHeaderHovered: \\\"#EFEFF1\\\",\\n\\n    bgBubble: \\\"#EDEDF3\\\",\\n    bgBubbleSelected: \\\"#FFFFFF\\\",\\n\\n    headerIconSize: 20,\\n    markerFontStyle: \\\"13px\\\",\\n\\n    bgSearchResult: \\\"#fff9e3\\\",\\n\\n    borderColor: \\\"rgba(115, 116, 131, 0.16)\\\",\\n    horizontalBorderColor: \\\"rgba(115, 116, 131, 0.16)\\\",\\n    drilldownBorder: \\\"rgba(0, 0, 0, 0)\\\",\\n\\n    linkColor: \\\"#4F5DFF\\\",\\n\\n    cellHorizontalPadding: 8,\\n    cellVerticalPadding: 3,\\n\\n    headerFontStyle: \\\"600 13px\\\",\\n    baseFontStyle: \\\"13px\\\",\\n    editorFontSize: \\\"13px\\\",\\n    lineHeight: 1.4,\\n    fontFamily:\\n        \\\"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\\\",\\n};\\n\\nconst cols: GridColumn[] = [\\n    {\\n        title: \\\"A\\\",\\n        width: 200,\\n        group: \\\"Group 1\\\",\\n    },\\n    {\\n        title: \\\"B\\\",\\n        width: 200,\\n        group: \\\"Group 1\\\",\\n    },\\n    {\\n        title: \\\"C\\\",\\n        width: 200,\\n        group: \\\"Group 2\\\",\\n    },\\n    {\\n        title: \\\"D\\\",\\n        width: 200,\\n        group: \\\"Group 2\\\",\\n    },\\n    {\\n        title: \\\"E\\\",\\n        width: 200,\\n        group: \\\"Group 2\\\",\\n    },\\n];\\n\\nexport const UseDataSource: React.VFC = () => {\\n    const cache = React.useRef<Record<string, string>>({});\\n\\n    const rows = 100_000;\\n\\n    const moveArgs = useMoveableColumns({\\n        columns: cols,\\n        getCellContent: React.useCallback(([col, row]) => {\\n            if (col === 0) {\\n                return {\\n                    kind: GridCellKind.Text,\\n                    allowOverlay: true,\\n                    data: `${row}`,\\n                    displayData: `${row}`,\\n                };\\n            }\\n\\n            const key = `${col},${row}`;\\n            if (cache.current[key] === undefined) {\\n                cache.current[key] = faker.name.firstName() + \\\" \\\" + faker.name.lastName();\\n            }\\n            const d = cache.current[key];\\n\\n            return {\\n                kind: GridCellKind.Text,\\n                allowOverlay: true,\\n                data: d,\\n                displayData: d,\\n            };\\n        }, []),\\n    });\\n\\n    const [sort, setSort] = React.useState<number>();\\n\\n    const sortArgs = useColumnSort({\\n        columns: moveArgs.columns,\\n        getCellContent: moveArgs.getCellContent,\\n        rows,\\n        sort:\\n            sort === undefined\\n                ? undefined\\n                : {\\n                      column: moveArgs.columns[sort],\\n                      direction: \\\"desc\\\",\\n                      mode: \\\"smart\\\",\\n                  },\\n    });\\n\\n    const collapseArgs = useCollapsingGroups({\\n        columns: moveArgs.columns,\\n        theme: testTheme,\\n        freezeColumns: 0,\\n    });\\n\\n    const onHeaderClick = React.useCallback((index: number) => {\\n        setSort(index);\\n    }, []);\\n\\n    return (\\n        <BeautifulWrapper title=\\\"Custom source extensions\\\" description={<Description>Fixme.</Description>}>\\n            <DataEditor\\n                {...defaultProps}\\n                {...moveArgs}\\n                {...sortArgs}\\n                {...collapseArgs}\\n                rows={rows}\\n                onColumnMoved={moveArgs.onColumnMoved}\\n                onHeaderClicked={onHeaderClick}\\n            />\\n        </BeautifulWrapper>\\n    );\\n};\\n(UseDataSource as any).parameters = {\\n    options: {\\n        showPanel: false,\\n    },\\n};\\n\\nexport const UndoRedo: React.VFC = () => {\\n    const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(6);\\n\\n    const gridRef = React.useRef<DataEditorRef>(null);\\n\\n    const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(\\n        gridRef,\\n        getCellContent,\\n        setCellValue\\n    );\\n\\n    return (\\n        <BeautifulWrapper\\n            title=\\\"Undo / Redo Support\\\"\\n            description={\\n                <Description>\\n                    A simple undo/redo implementation\\n                    <MoreInfo>\\n                        Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:\\n                        <button onClick={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.4 }}>\\n                            Undo\\n                        </button>\\n                        <button onClick={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.4 }}>\\n                            Redo\\n                        </button>\\n                    </MoreInfo>\\n                    <MoreInfo>\\n                        It works by taking a snapshot of the content of a cell before it is edited and replaying any\\n                        edits back.\\n                    </MoreInfo>\\n                </Description>\\n            }>\\n            <DataEditor\\n                {...defaultProps}\\n                ref={gridRef}\\n                onCellEdited={onCellEdited}\\n                getCellContent={getCellContent}\\n                gridSelection={gridSelection ?? undefined}\\n                onGridSelectionChange={onGridSelectionChange}\\n                columns={columns}\\n                rows={1000}\\n            />\\n        </BeautifulWrapper>\\n    );\\n};\\n(UndoRedo as any).parameters = {\\n    options: {\\n        showPanel: false,\\n    },\\n};\\n\";\nvar __LOCATIONS_MAP__ = {\n  \"UseDataSource\": {\n    \"startLoc\": {\n      \"col\": 40,\n      \"line\": 227\n    },\n    \"endLoc\": {\n      \"col\": 1,\n      \"line\": 298\n    },\n    \"startBody\": {\n      \"col\": 40,\n      \"line\": 227\n    },\n    \"endBody\": {\n      \"col\": 1,\n      \"line\": 298\n    }\n  },\n  \"UndoRedo\": {\n    \"startLoc\": {\n      \"col\": 35,\n      \"line\": 305\n    },\n    \"endLoc\": {\n      \"col\": 1,\n      \"line\": 349\n    },\n    \"startBody\": {\n      \"col\": 35,\n      \"line\": 305\n    },\n    \"endBody\": {\n      \"col\": 1,\n      \"line\": 349\n    }\n  }\n};\nimport { styled } from \"@linaria/react\";\nimport * as React from \"react\";\nimport { useResizeDetector } from \"react-resize-detector\";\nimport { DataEditor, GridCellKind } from \"@glideapps/glide-data-grid\";\nimport { faker } from \"@faker-js/faker\";\nimport { useCollapsingGroups, useColumnSort, useMoveableColumns } from \"../index.js\";\nimport { useUndoRedo } from \"../use-undo-redo.js\";\nimport { useMockDataGenerator } from \"./utils.js\";\nimport { jsx as _jsx } from \"react/jsx-runtime\";\nimport { jsxs as _jsxs } from \"react/jsx-runtime\";\nfaker.seed(1337);\nconst SimpleWrapper = styled.div`\n    box-sizing: border-box;\n\n    *,\n    *::before,\n    *::after {\n        box-sizing: inherit;\n    }\n`;\nconst SimpleThemeWrapper = p => {\n  return _jsx(SimpleWrapper, {\n    children: _jsx(\"div\", {\n      className: \"content\",\n      children: p.children\n    })\n  });\n};\nSimpleThemeWrapper.displayName = \"SimpleThemeWrapper\";\nexport default {\n  parameters: {\n    \"storySource\": {\n      \"source\": \"import { styled } from \\\"@linaria/react\\\";\\nimport * as React from \\\"react\\\";\\nimport { useResizeDetector } from \\\"react-resize-detector\\\";\\nimport {\\n    DataEditor,\\n    type DataEditorProps,\\n    type DataEditorRef,\\n    GridCellKind,\\n    type GridColumn,\\n    type Theme,\\n} from \\\"@glideapps/glide-data-grid\\\";\\nimport { faker } from \\\"@faker-js/faker\\\";\\nimport { useCollapsingGroups, useColumnSort, useMoveableColumns } from \\\"../index.js\\\";\\nimport { useUndoRedo } from \\\"../use-undo-redo.js\\\";\\nimport { useMockDataGenerator } from \\\"./utils.js\\\";\\n\\nfaker.seed(1337);\\n\\nconst SimpleWrapper = styled.div`\\n    box-sizing: border-box;\\n\\n    *,\\n    *::before,\\n    *::after {\\n        box-sizing: inherit;\\n    }\\n`;\\n\\nconst SimpleThemeWrapper: React.FC = p => {\\n    return (\\n        <SimpleWrapper>\\n            <div className=\\\"content\\\">{p.children}</div>\\n        </SimpleWrapper>\\n    );\\n};\\n\\nexport default {\\n    title: \\\"Extra Packages/Source\\\",\\n\\n    decorators: [\\n        (Story: React.ComponentType) => (\\n            <SimpleThemeWrapper>\\n                <Story />\\n            </SimpleThemeWrapper>\\n        ),\\n    ],\\n};\\n\\nconst BeautifulStyle = styled.div`\\n    background-color: #2790b9;\\n    background: linear-gradient(90deg, #2790b9, #2070a9);\\n    color: white;\\n\\n    padding: 32px 48px;\\n\\n    display: flex;\\n    flex-direction: column;\\n    height: 100vh;\\n\\n    font-family: sans-serif;\\n\\n    & > h1 {\\n        font-size: 50px;\\n        font-weight: 600;\\n        flex-shrink: 0;\\n        margin: 0 0 12px 0;\\n    }\\n\\n    .sizer {\\n        flex-grow: 1;\\n\\n        background-color: white;\\n\\n        border-radius: 12px;\\n        box-shadow:\\n            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,\\n            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;\\n\\n        .sizer-clip {\\n            border-radius: 12px;\\n            overflow: hidden;\\n            transform: translateZ(0);\\n\\n            height: 100%;\\n        }\\n    }\\n`;\\n\\ninterface BeautifulProps {\\n    title: string;\\n    description?: React.ReactNode;\\n}\\n\\nconst BeautifulWrapper: React.FC<BeautifulProps> = p => {\\n    const { title, children, description } = p;\\n\\n    const { ref, width, height } = useResizeDetector();\\n\\n    return (\\n        <BeautifulStyle>\\n            <h1>{title}</h1>\\n            {description}\\n            <div className=\\\"sizer\\\">\\n                <div className=\\\"sizer-clip\\\" ref={ref}>\\n                    <div\\n                        style={{\\n                            position: \\\"relative\\\",\\n                            width: width ?? 100,\\n                            height: height ?? 100,\\n                        }}>\\n                        {children}\\n                    </div>\\n                </div>\\n            </div>\\n        </BeautifulStyle>\\n    );\\n};\\n\\nconst Description = styled.p`\\n    font-size: 18px;\\n    flex-shrink: 0;\\n    margin: 0 0 20px 0;\\n`;\\n\\nexport const MoreInfo = styled.p`\\n    font-size: 14px;\\n    flex-shrink: 0;\\n    margin: 0 0 20px 0;\\n\\n    button {\\n        background-color: #f4f4f4;\\n        color: #2b2b2b;\\n        padding: 2px 6px;\\n        font-family: monospace;\\n        font-size: 14px;\\n        border-radius: 4px;\\n        box-shadow: 0px 1px 2px #00000040;\\n        margin: 0 0.1em;\\n        border: none;\\n        cursor: pointer;\\n    }\\n`;\\n\\nconst defaultProps: Partial<DataEditorProps> = {\\n    smoothScrollX: true,\\n    smoothScrollY: true,\\n    isDraggable: false,\\n    rowMarkers: \\\"none\\\",\\n    width: \\\"100%\\\",\\n};\\n\\nconst testTheme: Theme = {\\n    accentColor: \\\"#4F5DFF\\\",\\n    accentFg: \\\"#FFFFFF\\\",\\n    accentLight: \\\"rgba(62, 116, 253, 0.1)\\\",\\n\\n    textDark: \\\"#313139\\\",\\n    textMedium: \\\"#737383\\\",\\n    textLight: \\\"#B2B2C0\\\",\\n    textBubble: \\\"#313139\\\",\\n\\n    bgIconHeader: \\\"#737383\\\",\\n    fgIconHeader: \\\"#FFFFFF\\\",\\n    textHeader: \\\"#313139\\\",\\n    textGroupHeader: \\\"#313139BB\\\",\\n    textHeaderSelected: \\\"#FFFFFF\\\",\\n\\n    bgCell: \\\"#FFFFFF\\\",\\n    bgCellMedium: \\\"#FAFAFB\\\",\\n    bgHeader: \\\"#F7F7F8\\\",\\n    bgHeaderHasFocus: \\\"#E9E9EB\\\",\\n    bgHeaderHovered: \\\"#EFEFF1\\\",\\n\\n    bgBubble: \\\"#EDEDF3\\\",\\n    bgBubbleSelected: \\\"#FFFFFF\\\",\\n\\n    headerIconSize: 20,\\n    markerFontStyle: \\\"13px\\\",\\n\\n    bgSearchResult: \\\"#fff9e3\\\",\\n\\n    borderColor: \\\"rgba(115, 116, 131, 0.16)\\\",\\n    horizontalBorderColor: \\\"rgba(115, 116, 131, 0.16)\\\",\\n    drilldownBorder: \\\"rgba(0, 0, 0, 0)\\\",\\n\\n    linkColor: \\\"#4F5DFF\\\",\\n\\n    cellHorizontalPadding: 8,\\n    cellVerticalPadding: 3,\\n\\n    headerFontStyle: \\\"600 13px\\\",\\n    baseFontStyle: \\\"13px\\\",\\n    editorFontSize: \\\"13px\\\",\\n    lineHeight: 1.4,\\n    fontFamily:\\n        \\\"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\\\",\\n};\\n\\nconst cols: GridColumn[] = [\\n    {\\n        title: \\\"A\\\",\\n        width: 200,\\n        group: \\\"Group 1\\\",\\n    },\\n    {\\n        title: \\\"B\\\",\\n        width: 200,\\n        group: \\\"Group 1\\\",\\n    },\\n    {\\n        title: \\\"C\\\",\\n        width: 200,\\n        group: \\\"Group 2\\\",\\n    },\\n    {\\n        title: \\\"D\\\",\\n        width: 200,\\n        group: \\\"Group 2\\\",\\n    },\\n    {\\n        title: \\\"E\\\",\\n        width: 200,\\n        group: \\\"Group 2\\\",\\n    },\\n];\\n\\nexport const UseDataSource: React.VFC = () => {\\n    const cache = React.useRef<Record<string, string>>({});\\n\\n    const rows = 100_000;\\n\\n    const moveArgs = useMoveableColumns({\\n        columns: cols,\\n        getCellContent: React.useCallback(([col, row]) => {\\n            if (col === 0) {\\n                return {\\n                    kind: GridCellKind.Text,\\n                    allowOverlay: true,\\n                    data: `${row}`,\\n                    displayData: `${row}`,\\n                };\\n            }\\n\\n            const key = `${col},${row}`;\\n            if (cache.current[key] === undefined) {\\n                cache.current[key] = faker.name.firstName() + \\\" \\\" + faker.name.lastName();\\n            }\\n            const d = cache.current[key];\\n\\n            return {\\n                kind: GridCellKind.Text,\\n                allowOverlay: true,\\n                data: d,\\n                displayData: d,\\n            };\\n        }, []),\\n    });\\n\\n    const [sort, setSort] = React.useState<number>();\\n\\n    const sortArgs = useColumnSort({\\n        columns: moveArgs.columns,\\n        getCellContent: moveArgs.getCellContent,\\n        rows,\\n        sort:\\n            sort === undefined\\n                ? undefined\\n                : {\\n                      column: moveArgs.columns[sort],\\n                      direction: \\\"desc\\\",\\n                      mode: \\\"smart\\\",\\n                  },\\n    });\\n\\n    const collapseArgs = useCollapsingGroups({\\n        columns: moveArgs.columns,\\n        theme: testTheme,\\n        freezeColumns: 0,\\n    });\\n\\n    const onHeaderClick = React.useCallback((index: number) => {\\n        setSort(index);\\n    }, []);\\n\\n    return (\\n        <BeautifulWrapper title=\\\"Custom source extensions\\\" description={<Description>Fixme.</Description>}>\\n            <DataEditor\\n                {...defaultProps}\\n                {...moveArgs}\\n                {...sortArgs}\\n                {...collapseArgs}\\n                rows={rows}\\n                onColumnMoved={moveArgs.onColumnMoved}\\n                onHeaderClicked={onHeaderClick}\\n            />\\n        </BeautifulWrapper>\\n    );\\n};\\n(UseDataSource as any).parameters = {\\n    options: {\\n        showPanel: false,\\n    },\\n};\\n\\nexport const UndoRedo: React.VFC = () => {\\n    const { cols: columns, getCellContent, setCellValue } = useMockDataGenerator(6);\\n\\n    const gridRef = React.useRef<DataEditorRef>(null);\\n\\n    const { gridSelection, onCellEdited, onGridSelectionChange, undo, canRedo, canUndo, redo } = useUndoRedo(\\n        gridRef,\\n        getCellContent,\\n        setCellValue\\n    );\\n\\n    return (\\n        <BeautifulWrapper\\n            title=\\\"Undo / Redo Support\\\"\\n            description={\\n                <Description>\\n                    A simple undo/redo implementation\\n                    <MoreInfo>\\n                        Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:\\n                        <button onClick={undo} disabled={!canUndo} style={{ opacity: canUndo ? 1 : 0.4 }}>\\n                            Undo\\n                        </button>\\n                        <button onClick={redo} disabled={!canRedo} style={{ opacity: canRedo ? 1 : 0.4 }}>\\n                            Redo\\n                        </button>\\n                    </MoreInfo>\\n                    <MoreInfo>\\n                        It works by taking a snapshot of the content of a cell before it is edited and replaying any\\n                        edits back.\\n                    </MoreInfo>\\n                </Description>\\n            }>\\n            <DataEditor\\n                {...defaultProps}\\n                ref={gridRef}\\n                onCellEdited={onCellEdited}\\n                getCellContent={getCellContent}\\n                gridSelection={gridSelection ?? undefined}\\n                onGridSelectionChange={onGridSelectionChange}\\n                columns={columns}\\n                rows={1000}\\n            />\\n        </BeautifulWrapper>\\n    );\\n};\\n(UndoRedo as any).parameters = {\\n    options: {\\n        showPanel: false,\\n    },\\n};\\n\",\n      \"locationsMap\": {\n        \"use-data-source\": {\n          \"startLoc\": {\n            \"col\": 40,\n            \"line\": 227\n          },\n          \"endLoc\": {\n            \"col\": 1,\n            \"line\": 298\n          },\n          \"startBody\": {\n            \"col\": 40,\n            \"line\": 227\n          },\n          \"endBody\": {\n            \"col\": 1,\n            \"line\": 298\n          }\n        },\n        \"undo-redo\": {\n          \"startLoc\": {\n            \"col\": 35,\n            \"line\": 305\n          },\n          \"endLoc\": {\n            \"col\": 1,\n            \"line\": 349\n          },\n          \"startBody\": {\n            \"col\": 35,\n            \"line\": 305\n          },\n          \"endBody\": {\n            \"col\": 1,\n            \"line\": 349\n          }\n        }\n      }\n    }\n  },\n  title: \"Extra Packages/Source\",\n  decorators: [Story => _jsx(SimpleThemeWrapper, {\n    children: _jsx(Story, {})\n  })]\n};\nconst BeautifulStyle = styled.div`\n    background-color: #2790b9;\n    background: linear-gradient(90deg, #2790b9, #2070a9);\n    color: white;\n\n    padding: 32px 48px;\n\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n\n    font-family: sans-serif;\n\n    & > h1 {\n        font-size: 50px;\n        font-weight: 600;\n        flex-shrink: 0;\n        margin: 0 0 12px 0;\n    }\n\n    .sizer {\n        flex-grow: 1;\n\n        background-color: white;\n\n        border-radius: 12px;\n        box-shadow:\n            rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,\n            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;\n\n        .sizer-clip {\n            border-radius: 12px;\n            overflow: hidden;\n            transform: translateZ(0);\n\n            height: 100%;\n        }\n    }\n`;\nconst BeautifulWrapper = p => {\n  const {\n    title,\n    children,\n    description\n  } = p;\n  const {\n    ref,\n    width,\n    height\n  } = useResizeDetector();\n  return _jsxs(BeautifulStyle, {\n    children: [_jsx(\"h1\", {\n      children: title\n    }), description, _jsx(\"div\", {\n      className: \"sizer\",\n      children: _jsx(\"div\", {\n        className: \"sizer-clip\",\n        ref: ref,\n        children: _jsx(\"div\", {\n          style: {\n            position: \"relative\",\n            width: width !== null && width !== void 0 ? width : 100,\n            height: height !== null && height !== void 0 ? height : 100\n          },\n          children: children\n        })\n      })\n    })]\n  });\n};\nBeautifulWrapper.displayName = \"BeautifulWrapper\";\nconst Description = styled.p`\n    font-size: 18px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n`;\nexport const MoreInfo = styled.p`\n    font-size: 14px;\n    flex-shrink: 0;\n    margin: 0 0 20px 0;\n\n    button {\n        background-color: #f4f4f4;\n        color: #2b2b2b;\n        padding: 2px 6px;\n        font-family: monospace;\n        font-size: 14px;\n        border-radius: 4px;\n        box-shadow: 0px 1px 2px #00000040;\n        margin: 0 0.1em;\n        border: none;\n        cursor: pointer;\n    }\n`;\nconst defaultProps = {\n  smoothScrollX: true,\n  smoothScrollY: true,\n  isDraggable: false,\n  rowMarkers: \"none\",\n  width: \"100%\"\n};\nconst testTheme = {\n  accentColor: \"#4F5DFF\",\n  accentFg: \"#FFFFFF\",\n  accentLight: \"rgba(62, 116, 253, 0.1)\",\n  textDark: \"#313139\",\n  textMedium: \"#737383\",\n  textLight: \"#B2B2C0\",\n  textBubble: \"#313139\",\n  bgIconHeader: \"#737383\",\n  fgIconHeader: \"#FFFFFF\",\n  textHeader: \"#313139\",\n  textGroupHeader: \"#313139BB\",\n  textHeaderSelected: \"#FFFFFF\",\n  bgCell: \"#FFFFFF\",\n  bgCellMedium: \"#FAFAFB\",\n  bgHeader: \"#F7F7F8\",\n  bgHeaderHasFocus: \"#E9E9EB\",\n  bgHeaderHovered: \"#EFEFF1\",\n  bgBubble: \"#EDEDF3\",\n  bgBubbleSelected: \"#FFFFFF\",\n  headerIconSize: 20,\n  markerFontStyle: \"13px\",\n  bgSearchResult: \"#fff9e3\",\n  borderColor: \"rgba(115, 116, 131, 0.16)\",\n  horizontalBorderColor: \"rgba(115, 116, 131, 0.16)\",\n  drilldownBorder: \"rgba(0, 0, 0, 0)\",\n  linkColor: \"#4F5DFF\",\n  cellHorizontalPadding: 8,\n  cellVerticalPadding: 3,\n  headerFontStyle: \"600 13px\",\n  baseFontStyle: \"13px\",\n  editorFontSize: \"13px\",\n  lineHeight: 1.4,\n  fontFamily: \"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif\"\n};\nconst cols = [{\n  title: \"A\",\n  width: 200,\n  group: \"Group 1\"\n}, {\n  title: \"B\",\n  width: 200,\n  group: \"Group 1\"\n}, {\n  title: \"C\",\n  width: 200,\n  group: \"Group 2\"\n}, {\n  title: \"D\",\n  width: 200,\n  group: \"Group 2\"\n}, {\n  title: \"E\",\n  width: 200,\n  group: \"Group 2\"\n}];\nexport const UseDataSource = () => {\n  const cache = React.useRef({});\n  const rows = 100000;\n  const moveArgs = useMoveableColumns({\n    columns: cols,\n    getCellContent: React.useCallback(_ref => {\n      let [col, row] = _ref;\n      if (col === 0) {\n        return {\n          kind: GridCellKind.Text,\n          allowOverlay: true,\n          data: `${row}`,\n          displayData: `${row}`\n        };\n      }\n      const key = `${col},${row}`;\n      if (cache.current[key] === undefined) {\n        cache.current[key] = faker.name.firstName() + \" \" + faker.name.lastName();\n      }\n      const d = cache.current[key];\n      return {\n        kind: GridCellKind.Text,\n        allowOverlay: true,\n        data: d,\n        displayData: d\n      };\n    }, [])\n  });\n  const [sort, setSort] = React.useState();\n  const sortArgs = useColumnSort({\n    columns: moveArgs.columns,\n    getCellContent: moveArgs.getCellContent,\n    rows,\n    sort: sort === undefined ? undefined : {\n      column: moveArgs.columns[sort],\n      direction: \"desc\",\n      mode: \"smart\"\n    }\n  });\n  const collapseArgs = useCollapsingGroups({\n    columns: moveArgs.columns,\n    theme: testTheme,\n    freezeColumns: 0\n  });\n  const onHeaderClick = React.useCallback(index => {\n    setSort(index);\n  }, []);\n  return _jsx(BeautifulWrapper, {\n    title: \"Custom source extensions\",\n    description: _jsx(Description, {\n      children: \"Fixme.\"\n    }),\n    children: _jsx(DataEditor, {\n      ...defaultProps,\n      ...moveArgs,\n      ...sortArgs,\n      ...collapseArgs,\n      rows: rows,\n      onColumnMoved: moveArgs.onColumnMoved,\n      onHeaderClicked: onHeaderClick\n    })\n  });\n};\nUseDataSource.displayName = \"UseDataSource\";\n;\nUseDataSource.parameters = {\n  options: {\n    showPanel: false\n  }\n};\nexport const UndoRedo = () => {\n  const {\n    cols: columns,\n    getCellContent,\n    setCellValue\n  } = useMockDataGenerator(6);\n  const gridRef = React.useRef(null);\n  const {\n    gridSelection,\n    onCellEdited,\n    onGridSelectionChange,\n    undo,\n    canRedo,\n    canUndo,\n    redo\n  } = useUndoRedo(gridRef, getCellContent, setCellValue);\n  return _jsx(BeautifulWrapper, {\n    title: \"Undo / Redo Support\",\n    description: _jsxs(Description, {\n      children: [\"A simple undo/redo implementation\", _jsxs(MoreInfo, {\n        children: [\"Use keyboard shortcuts CMD+Z and CMD+SHIFT+Z / CTRL+Z and CTRL+Y. Or click these buttons:\", _jsx(\"button\", {\n          onClick: undo,\n          disabled: !canUndo,\n          style: {\n            opacity: canUndo ? 1 : 0.4\n          },\n          children: \"Undo\"\n        }), _jsx(\"button\", {\n          onClick: redo,\n          disabled: !canRedo,\n          style: {\n            opacity: canRedo ? 1 : 0.4\n          },\n          children: \"Redo\"\n        })]\n      }), _jsx(MoreInfo, {\n        children: \"It works by taking a snapshot of the content of a cell before it is edited and replaying any edits back.\"\n      })]\n    }),\n    children: _jsx(DataEditor, {\n      ...defaultProps,\n      ref: gridRef,\n      onCellEdited: onCellEdited,\n      getCellContent: getCellContent,\n      gridSelection: gridSelection !== null && gridSelection !== void 0 ? gridSelection : undefined,\n      onGridSelectionChange: onGridSelectionChange,\n      columns: columns,\n      rows: 1000\n    })\n  });\n};\nUndoRedo.displayName = \"UndoRedo\";\nUndoRedo.parameters = {\n  options: {\n    showPanel: false\n  }\n};",".ss4kmn3{box-sizing:border-box;}.ss4kmn3 *,.ss4kmn3 *::before,.ss4kmn3 *::after{box-sizing:inherit;}\n.bkh67gx{background-color:#2790b9;background:linear-gradient(90deg,#2790b9,#2070a9);color:white;padding:32px 48px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100vh;font-family:sans-serif;}.bkh67gx > h1{font-size:50px;font-weight:600;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 12px 0;}.bkh67gx .sizer{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;background-color:white;border-radius:12px;box-shadow: rgba(9,30,66,0.25) 0px 4px 8px -2px, rgba(9,30,66,0.08) 0px 0px 0px 1px;}.bkh67gx .sizer .sizer-clip{border-radius:12px;overflow:hidden;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);height:100%;}\n.d1deot3s{font-size:18px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}\n.m1ml0sw1{font-size:14px;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin:0 0 20px 0;}.m1ml0sw1 button{background-color:#f4f4f4;color:#2b2b2b;padding:2px 6px;font-family:monospace;font-size:14px;border-radius:4px;box-shadow:0px 1px 2px #00000040;margin:0 0.1em;border:none;cursor:pointer;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvc291cmNlL3NyYy9zdG9yaWVzL3VzZS1kYXRhLXNvdXJjZS5zdG9yaWVzLnRzeCJdLCJuYW1lcyI6WyIuc3M0a21uMyIsIi5ia2g2N2d4IiwiLmQxZGVvdDNzIiwiLm0xbWwwc3cxIl0sIm1hcHBpbmdzIjoiQUFrRHNCQTtBQW1FQ0M7QUF1RUhDO0FBS0lDIiwiZmlsZSI6Ii9ob21lL3J1bm5lci93b3JrL2dsaWRlLWRhdGEtZ3JpZC9nbGlkZS1kYXRhLWdyaWQvcGFja2FnZXMvc291cmNlL3NyYy9zdG9yaWVzL3VzZS1kYXRhLXNvdXJjZS5zdG9yaWVzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX1NUT1JZX18gPSBcImltcG9ydCB7IHN0eWxlZCB9IGZyb20gXFxcIkBsaW5hcmlhL3JlYWN0XFxcIjtcXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFxcXCJyZWFjdFxcXCI7XFxuaW1wb3J0IHsgdXNlUmVzaXplRGV0ZWN0b3IgfSBmcm9tIFxcXCJyZWFjdC1yZXNpemUtZGV0ZWN0b3JcXFwiO1xcbmltcG9ydCB7XFxuICAgIERhdGFFZGl0b3IsXFxuICAgIHR5cGUgRGF0YUVkaXRvclByb3BzLFxcbiAgICB0eXBlIERhdGFFZGl0b3JSZWYsXFxuICAgIEdyaWRDZWxsS2luZCxcXG4gICAgdHlwZSBHcmlkQ29sdW1uLFxcbiAgICB0eXBlIFRoZW1lLFxcbn0gZnJvbSBcXFwiQGdsaWRlYXBwcy9nbGlkZS1kYXRhLWdyaWRcXFwiO1xcbmltcG9ydCB7IGZha2VyIH0gZnJvbSBcXFwiQGZha2VyLWpzL2Zha2VyXFxcIjtcXG5pbXBvcnQgeyB1c2VDb2xsYXBzaW5nR3JvdXBzLCB1c2VDb2x1bW5Tb3J0LCB1c2VNb3ZlYWJsZUNvbHVtbnMgfSBmcm9tIFxcXCIuLi9pbmRleC5qc1xcXCI7XFxuaW1wb3J0IHsgdXNlVW5kb1JlZG8gfSBmcm9tIFxcXCIuLi91c2UtdW5kby1yZWRvLmpzXFxcIjtcXG5pbXBvcnQgeyB1c2VNb2NrRGF0YUdlbmVyYXRvciB9IGZyb20gXFxcIi4vdXRpbHMuanNcXFwiO1xcblxcbmZha2VyLnNlZWQoMTMzNyk7XFxuXFxuY29uc3QgU2ltcGxlV3JhcHBlciA9IHN0eWxlZC5kaXZgXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFxuICAgICosXFxuICAgICo6OmJlZm9yZSxcXG4gICAgKjo6YWZ0ZXIge1xcbiAgICAgICAgYm94LXNpemluZzogaW5oZXJpdDtcXG4gICAgfVxcbmA7XFxuXFxuY29uc3QgU2ltcGxlVGhlbWVXcmFwcGVyOiBSZWFjdC5GQyA9IHAgPT4ge1xcbiAgICByZXR1cm4gKFxcbiAgICAgICAgPFNpbXBsZVdyYXBwZXI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XFxcImNvbnRlbnRcXFwiPntwLmNoaWxkcmVufTwvZGl2PlxcbiAgICAgICAgPC9TaW1wbGVXcmFwcGVyPlxcbiAgICApO1xcbn07XFxuXFxuZXhwb3J0IGRlZmF1bHQge1xcbiAgICB0aXRsZTogXFxcIkV4dHJhIFBhY2thZ2VzL1NvdXJjZVxcXCIsXFxuXFxuICAgIGRlY29yYXRvcnM6IFtcXG4gICAgICAgIChTdG9yeTogUmVhY3QuQ29tcG9uZW50VHlwZSkgPT4gKFxcbiAgICAgICAgICAgIDxTaW1wbGVUaGVtZVdyYXBwZXI+XFxuICAgICAgICAgICAgICAgIDxTdG9yeSAvPlxcbiAgICAgICAgICAgIDwvU2ltcGxlVGhlbWVXcmFwcGVyPlxcbiAgICAgICAgKSxcXG4gICAgXSxcXG59O1xcblxcbmNvbnN0IEJlYXV0aWZ1bFN0eWxlID0gc3R5bGVkLmRpdmBcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI3OTBiOTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMjc5MGI5LCAjMjA3MGE5KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcblxcbiAgICBwYWRkaW5nOiAzMnB4IDQ4cHg7XFxuXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTAwdmg7XFxuXFxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcblxcbiAgICAmID4gaDEge1xcbiAgICAgICAgZm9udC1zaXplOiA1MHB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMTJweCAwO1xcbiAgICB9XFxuXFxuICAgIC5zaXplciB7XFxuICAgICAgICBmbGV4LWdyb3c6IDE7XFxuXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG5cXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XFxuICAgICAgICBib3gtc2hhZG93OlxcbiAgICAgICAgICAgIHJnYmEoOSwgMzAsIDY2LCAwLjI1KSAwcHggNHB4IDhweCAtMnB4LFxcbiAgICAgICAgICAgIHJnYmEoOSwgMzAsIDY2LCAwLjA4KSAwcHggMHB4IDBweCAxcHg7XFxuXFxuICAgICAgICAuc2l6ZXItY2xpcCB7XFxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG5cXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICB9XFxuICAgIH1cXG5gO1xcblxcbmludGVyZmFjZSBCZWF1dGlmdWxQcm9wcyB7XFxuICAgIHRpdGxlOiBzdHJpbmc7XFxuICAgIGRlc2NyaXB0aW9uPzogUmVhY3QuUmVhY3ROb2RlO1xcbn1cXG5cXG5jb25zdCBCZWF1dGlmdWxXcmFwcGVyOiBSZWFjdC5GQzxCZWF1dGlmdWxQcm9wcz4gPSBwID0+IHtcXG4gICAgY29uc3QgeyB0aXRsZSwgY2hpbGRyZW4sIGRlc2NyaXB0aW9uIH0gPSBwO1xcblxcbiAgICBjb25zdCB7IHJlZiwgd2lkdGgsIGhlaWdodCB9ID0gdXNlUmVzaXplRGV0ZWN0b3IoKTtcXG5cXG4gICAgcmV0dXJuIChcXG4gICAgICAgIDxCZWF1dGlmdWxTdHlsZT5cXG4gICAgICAgICAgICA8aDE+e3RpdGxlfTwvaDE+XFxuICAgICAgICAgICAge2Rlc2NyaXB0aW9ufVxcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVxcXCJzaXplclxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVxcXCJzaXplci1jbGlwXFxcIiByZWY9e3JlZn0+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFxcXCJyZWxhdGl2ZVxcXCIsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCA/PyAxMDAsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ID8/IDEwMCxcXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L0JlYXV0aWZ1bFN0eWxlPlxcbiAgICApO1xcbn07XFxuXFxuY29uc3QgRGVzY3JpcHRpb24gPSBzdHlsZWQucGBcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xcbmA7XFxuXFxuZXhwb3J0IGNvbnN0IE1vcmVJbmZvID0gc3R5bGVkLnBgXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgZmxleC1zaHJpbms6IDA7XFxuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcXG5cXG4gICAgYnV0dG9uIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNGY0ZjQ7XFxuICAgICAgICBjb2xvcjogIzJiMmIyYjtcXG4gICAgICAgIHBhZGRpbmc6IDJweCA2cHg7XFxuICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDFweCAycHggIzAwMDAwMDQwO1xcbiAgICAgICAgbWFyZ2luOiAwIDAuMWVtO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB9XFxuYDtcXG5cXG5jb25zdCBkZWZhdWx0UHJvcHM6IFBhcnRpYWw8RGF0YUVkaXRvclByb3BzPiA9IHtcXG4gICAgc21vb3RoU2Nyb2xsWDogdHJ1ZSxcXG4gICAgc21vb3RoU2Nyb2xsWTogdHJ1ZSxcXG4gICAgaXNEcmFnZ2FibGU6IGZhbHNlLFxcbiAgICByb3dNYXJrZXJzOiBcXFwibm9uZVxcXCIsXFxuICAgIHdpZHRoOiBcXFwiMTAwJVxcXCIsXFxufTtcXG5cXG5jb25zdCB0ZXN0VGhlbWU6IFRoZW1lID0ge1xcbiAgICBhY2NlbnRDb2xvcjogXFxcIiM0RjVERkZcXFwiLFxcbiAgICBhY2NlbnRGZzogXFxcIiNGRkZGRkZcXFwiLFxcbiAgICBhY2NlbnRMaWdodDogXFxcInJnYmEoNjIsIDExNiwgMjUzLCAwLjEpXFxcIixcXG5cXG4gICAgdGV4dERhcms6IFxcXCIjMzEzMTM5XFxcIixcXG4gICAgdGV4dE1lZGl1bTogXFxcIiM3MzczODNcXFwiLFxcbiAgICB0ZXh0TGlnaHQ6IFxcXCIjQjJCMkMwXFxcIixcXG4gICAgdGV4dEJ1YmJsZTogXFxcIiMzMTMxMzlcXFwiLFxcblxcbiAgICBiZ0ljb25IZWFkZXI6IFxcXCIjNzM3MzgzXFxcIixcXG4gICAgZmdJY29uSGVhZGVyOiBcXFwiI0ZGRkZGRlxcXCIsXFxuICAgIHRleHRIZWFkZXI6IFxcXCIjMzEzMTM5XFxcIixcXG4gICAgdGV4dEdyb3VwSGVhZGVyOiBcXFwiIzMxMzEzOUJCXFxcIixcXG4gICAgdGV4dEhlYWRlclNlbGVjdGVkOiBcXFwiI0ZGRkZGRlxcXCIsXFxuXFxuICAgIGJnQ2VsbDogXFxcIiNGRkZGRkZcXFwiLFxcbiAgICBiZ0NlbGxNZWRpdW06IFxcXCIjRkFGQUZCXFxcIixcXG4gICAgYmdIZWFkZXI6IFxcXCIjRjdGN0Y4XFxcIixcXG4gICAgYmdIZWFkZXJIYXNGb2N1czogXFxcIiNFOUU5RUJcXFwiLFxcbiAgICBiZ0hlYWRlckhvdmVyZWQ6IFxcXCIjRUZFRkYxXFxcIixcXG5cXG4gICAgYmdCdWJibGU6IFxcXCIjRURFREYzXFxcIixcXG4gICAgYmdCdWJibGVTZWxlY3RlZDogXFxcIiNGRkZGRkZcXFwiLFxcblxcbiAgICBoZWFkZXJJY29uU2l6ZTogMjAsXFxuICAgIG1hcmtlckZvbnRTdHlsZTogXFxcIjEzcHhcXFwiLFxcblxcbiAgICBiZ1NlYXJjaFJlc3VsdDogXFxcIiNmZmY5ZTNcXFwiLFxcblxcbiAgICBib3JkZXJDb2xvcjogXFxcInJnYmEoMTE1LCAxMTYsIDEzMSwgMC4xNilcXFwiLFxcbiAgICBob3Jpem9udGFsQm9yZGVyQ29sb3I6IFxcXCJyZ2JhKDExNSwgMTE2LCAxMzEsIDAuMTYpXFxcIixcXG4gICAgZHJpbGxkb3duQm9yZGVyOiBcXFwicmdiYSgwLCAwLCAwLCAwKVxcXCIsXFxuXFxuICAgIGxpbmtDb2xvcjogXFxcIiM0RjVERkZcXFwiLFxcblxcbiAgICBjZWxsSG9yaXpvbnRhbFBhZGRpbmc6IDgsXFxuICAgIGNlbGxWZXJ0aWNhbFBhZGRpbmc6IDMsXFxuXFxuICAgIGhlYWRlckZvbnRTdHlsZTogXFxcIjYwMCAxM3B4XFxcIixcXG4gICAgYmFzZUZvbnRTdHlsZTogXFxcIjEzcHhcXFwiLFxcbiAgICBlZGl0b3JGb250U2l6ZTogXFxcIjEzcHhcXFwiLFxcbiAgICBsaW5lSGVpZ2h0OiAxLjQsXFxuICAgIGZvbnRGYW1pbHk6XFxuICAgICAgICBcXFwiSW50ZXIsIFJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBhdmVuaXIgbmV4dCwgYXZlbmlyLCBzZWdvZSB1aSwgaGVsdmV0aWNhIG5ldWUsIGhlbHZldGljYSwgVWJ1bnR1LCBub3RvLCBhcmlhbCwgc2Fucy1zZXJpZlxcXCIsXFxufTtcXG5cXG5jb25zdCBjb2xzOiBHcmlkQ29sdW1uW10gPSBbXFxuICAgIHtcXG4gICAgICAgIHRpdGxlOiBcXFwiQVxcXCIsXFxuICAgICAgICB3aWR0aDogMjAwLFxcbiAgICAgICAgZ3JvdXA6IFxcXCJHcm91cCAxXFxcIixcXG4gICAgfSxcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJCXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDFcXFwiLFxcbiAgICB9LFxcbiAgICB7XFxuICAgICAgICB0aXRsZTogXFxcIkNcXFwiLFxcbiAgICAgICAgd2lkdGg6IDIwMCxcXG4gICAgICAgIGdyb3VwOiBcXFwiR3JvdXAgMlxcXCIsXFxuICAgIH0sXFxuICAgIHtcXG4gICAgICAgIHRpdGxlOiBcXFwiRFxcXCIsXFxuICAgICAgICB3aWR0aDogMjAwLFxcbiAgICAgICAgZ3JvdXA6IFxcXCJHcm91cCAyXFxcIixcXG4gICAgfSxcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJFXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDJcXFwiLFxcbiAgICB9LFxcbl07XFxuXFxuZXhwb3J0IGNvbnN0IFVzZURhdGFTb3VyY2U6IFJlYWN0LlZGQyA9ICgpID0+IHtcXG4gICAgY29uc3QgY2FjaGUgPSBSZWFjdC51c2VSZWY8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pO1xcblxcbiAgICBjb25zdCByb3dzID0gMTAwXzAwMDtcXG5cXG4gICAgY29uc3QgbW92ZUFyZ3MgPSB1c2VNb3ZlYWJsZUNvbHVtbnMoe1xcbiAgICAgICAgY29sdW1uczogY29scyxcXG4gICAgICAgIGdldENlbGxDb250ZW50OiBSZWFjdC51c2VDYWxsYmFjaygoW2NvbCwgcm93XSkgPT4ge1xcbiAgICAgICAgICAgIGlmIChjb2wgPT09IDApIHtcXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcXG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogYCR7cm93fWAsXFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YTogYCR7cm93fWAsXFxuICAgICAgICAgICAgICAgIH07XFxuICAgICAgICAgICAgfVxcblxcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2NvbH0sJHtyb3d9YDtcXG4gICAgICAgICAgICBpZiAoY2FjaGUuY3VycmVudFtrZXldID09PSB1bmRlZmluZWQpIHtcXG4gICAgICAgICAgICAgICAgY2FjaGUuY3VycmVudFtrZXldID0gZmFrZXIubmFtZS5maXJzdE5hbWUoKSArIFxcXCIgXFxcIiArIGZha2VyLm5hbWUubGFzdE5hbWUoKTtcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgY29uc3QgZCA9IGNhY2hlLmN1cnJlbnRba2V5XTtcXG5cXG4gICAgICAgICAgICByZXR1cm4ge1xcbiAgICAgICAgICAgICAgICBraW5kOiBHcmlkQ2VsbEtpbmQuVGV4dCxcXG4gICAgICAgICAgICAgICAgYWxsb3dPdmVybGF5OiB0cnVlLFxcbiAgICAgICAgICAgICAgICBkYXRhOiBkLFxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGF0YTogZCxcXG4gICAgICAgICAgICB9O1xcbiAgICAgICAgfSwgW10pLFxcbiAgICB9KTtcXG5cXG4gICAgY29uc3QgW3NvcnQsIHNldFNvcnRdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPigpO1xcblxcbiAgICBjb25zdCBzb3J0QXJncyA9IHVzZUNvbHVtblNvcnQoe1xcbiAgICAgICAgY29sdW1uczogbW92ZUFyZ3MuY29sdW1ucyxcXG4gICAgICAgIGdldENlbGxDb250ZW50OiBtb3ZlQXJncy5nZXRDZWxsQ29udGVudCxcXG4gICAgICAgIHJvd3MsXFxuICAgICAgICBzb3J0OlxcbiAgICAgICAgICAgIHNvcnQgPT09IHVuZGVmaW5lZFxcbiAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxcbiAgICAgICAgICAgICAgICA6IHtcXG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtb3ZlQXJncy5jb2x1bW5zW3NvcnRdLFxcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IFxcXCJkZXNjXFxcIixcXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZTogXFxcInNtYXJ0XFxcIixcXG4gICAgICAgICAgICAgICAgICB9LFxcbiAgICB9KTtcXG5cXG4gICAgY29uc3QgY29sbGFwc2VBcmdzID0gdXNlQ29sbGFwc2luZ0dyb3Vwcyh7XFxuICAgICAgICBjb2x1bW5zOiBtb3ZlQXJncy5jb2x1bW5zLFxcbiAgICAgICAgdGhlbWU6IHRlc3RUaGVtZSxcXG4gICAgICAgIGZyZWV6ZUNvbHVtbnM6IDAsXFxuICAgIH0pO1xcblxcbiAgICBjb25zdCBvbkhlYWRlckNsaWNrID0gUmVhY3QudXNlQ2FsbGJhY2soKGluZGV4OiBudW1iZXIpID0+IHtcXG4gICAgICAgIHNldFNvcnQoaW5kZXgpO1xcbiAgICB9LCBbXSk7XFxuXFxuICAgIHJldHVybiAoXFxuICAgICAgICA8QmVhdXRpZnVsV3JhcHBlciB0aXRsZT1cXFwiQ3VzdG9tIHNvdXJjZSBleHRlbnNpb25zXFxcIiBkZXNjcmlwdGlvbj17PERlc2NyaXB0aW9uPkZpeG1lLjwvRGVzY3JpcHRpb24+fT5cXG4gICAgICAgICAgICA8RGF0YUVkaXRvclxcbiAgICAgICAgICAgICAgICB7Li4uZGVmYXVsdFByb3BzfVxcbiAgICAgICAgICAgICAgICB7Li4ubW92ZUFyZ3N9XFxuICAgICAgICAgICAgICAgIHsuLi5zb3J0QXJnc31cXG4gICAgICAgICAgICAgICAgey4uLmNvbGxhcHNlQXJnc31cXG4gICAgICAgICAgICAgICAgcm93cz17cm93c31cXG4gICAgICAgICAgICAgICAgb25Db2x1bW5Nb3ZlZD17bW92ZUFyZ3Mub25Db2x1bW5Nb3ZlZH1cXG4gICAgICAgICAgICAgICAgb25IZWFkZXJDbGlja2VkPXtvbkhlYWRlckNsaWNrfVxcbiAgICAgICAgICAgIC8+XFxuICAgICAgICA8L0JlYXV0aWZ1bFdyYXBwZXI+XFxuICAgICk7XFxufTtcXG4oVXNlRGF0YVNvdXJjZSBhcyBhbnkpLnBhcmFtZXRlcnMgPSB7XFxuICAgIG9wdGlvbnM6IHtcXG4gICAgICAgIHNob3dQYW5lbDogZmFsc2UsXFxuICAgIH0sXFxufTtcXG5cXG5leHBvcnQgY29uc3QgVW5kb1JlZG86IFJlYWN0LlZGQyA9ICgpID0+IHtcXG4gICAgY29uc3QgeyBjb2xzOiBjb2x1bW5zLCBnZXRDZWxsQ29udGVudCwgc2V0Q2VsbFZhbHVlIH0gPSB1c2VNb2NrRGF0YUdlbmVyYXRvcig2KTtcXG5cXG4gICAgY29uc3QgZ3JpZFJlZiA9IFJlYWN0LnVzZVJlZjxEYXRhRWRpdG9yUmVmPihudWxsKTtcXG5cXG4gICAgY29uc3QgeyBncmlkU2VsZWN0aW9uLCBvbkNlbGxFZGl0ZWQsIG9uR3JpZFNlbGVjdGlvbkNoYW5nZSwgdW5kbywgY2FuUmVkbywgY2FuVW5kbywgcmVkbyB9ID0gdXNlVW5kb1JlZG8oXFxuICAgICAgICBncmlkUmVmLFxcbiAgICAgICAgZ2V0Q2VsbENvbnRlbnQsXFxuICAgICAgICBzZXRDZWxsVmFsdWVcXG4gICAgKTtcXG5cXG4gICAgcmV0dXJuIChcXG4gICAgICAgIDxCZWF1dGlmdWxXcmFwcGVyXFxuICAgICAgICAgICAgdGl0bGU9XFxcIlVuZG8gLyBSZWRvIFN1cHBvcnRcXFwiXFxuICAgICAgICAgICAgZGVzY3JpcHRpb249e1xcbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb24+XFxuICAgICAgICAgICAgICAgICAgICBBIHNpbXBsZSB1bmRvL3JlZG8gaW1wbGVtZW50YXRpb25cXG4gICAgICAgICAgICAgICAgICAgIDxNb3JlSW5mbz5cXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2Uga2V5Ym9hcmQgc2hvcnRjdXRzIENNRCtaIGFuZCBDTUQrU0hJRlQrWiAvIENUUkwrWiBhbmQgQ1RSTCtZLiBPciBjbGljayB0aGVzZSBidXR0b25zOlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dW5kb30gZGlzYWJsZWQ9eyFjYW5VbmRvfSBzdHlsZT17eyBvcGFjaXR5OiBjYW5VbmRvID8gMSA6IDAuNCB9fT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5kb1xcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17cmVkb30gZGlzYWJsZWQ9eyFjYW5SZWRvfSBzdHlsZT17eyBvcGFjaXR5OiBjYW5SZWRvID8gMSA6IDAuNCB9fT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVkb1xcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9Nb3JlSW5mbz5cXG4gICAgICAgICAgICAgICAgICAgIDxNb3JlSW5mbz5cXG4gICAgICAgICAgICAgICAgICAgICAgICBJdCB3b3JrcyBieSB0YWtpbmcgYSBzbmFwc2hvdCBvZiB0aGUgY29udGVudCBvZiBhIGNlbGwgYmVmb3JlIGl0IGlzIGVkaXRlZCBhbmQgcmVwbGF5aW5nIGFueVxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRzIGJhY2suXFxuICAgICAgICAgICAgICAgICAgICA8L01vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxcbiAgICAgICAgICAgIH0+XFxuICAgICAgICAgICAgPERhdGFFZGl0b3JcXG4gICAgICAgICAgICAgICAgey4uLmRlZmF1bHRQcm9wc31cXG4gICAgICAgICAgICAgICAgcmVmPXtncmlkUmVmfVxcbiAgICAgICAgICAgICAgICBvbkNlbGxFZGl0ZWQ9e29uQ2VsbEVkaXRlZH1cXG4gICAgICAgICAgICAgICAgZ2V0Q2VsbENvbnRlbnQ9e2dldENlbGxDb250ZW50fVxcbiAgICAgICAgICAgICAgICBncmlkU2VsZWN0aW9uPXtncmlkU2VsZWN0aW9uID8/IHVuZGVmaW5lZH1cXG4gICAgICAgICAgICAgICAgb25HcmlkU2VsZWN0aW9uQ2hhbmdlPXtvbkdyaWRTZWxlY3Rpb25DaGFuZ2V9XFxuICAgICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XFxuICAgICAgICAgICAgICAgIHJvd3M9ezEwMDB9XFxuICAgICAgICAgICAgLz5cXG4gICAgICAgIDwvQmVhdXRpZnVsV3JhcHBlcj5cXG4gICAgKTtcXG59O1xcbihVbmRvUmVkbyBhcyBhbnkpLnBhcmFtZXRlcnMgPSB7XFxuICAgIG9wdGlvbnM6IHtcXG4gICAgICAgIHNob3dQYW5lbDogZmFsc2UsXFxuICAgIH0sXFxufTtcXG5cIjtcbnZhciBfX0xPQ0FUSU9OU19NQVBfXyA9IHtcbiAgXCJVc2VEYXRhU291cmNlXCI6IHtcbiAgICBcInN0YXJ0TG9jXCI6IHtcbiAgICAgIFwiY29sXCI6IDQwLFxuICAgICAgXCJsaW5lXCI6IDIyN1xuICAgIH0sXG4gICAgXCJlbmRMb2NcIjoge1xuICAgICAgXCJjb2xcIjogMSxcbiAgICAgIFwibGluZVwiOiAyOThcbiAgICB9LFxuICAgIFwic3RhcnRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDQwLFxuICAgICAgXCJsaW5lXCI6IDIyN1xuICAgIH0sXG4gICAgXCJlbmRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDEsXG4gICAgICBcImxpbmVcIjogMjk4XG4gICAgfVxuICB9LFxuICBcIlVuZG9SZWRvXCI6IHtcbiAgICBcInN0YXJ0TG9jXCI6IHtcbiAgICAgIFwiY29sXCI6IDM1LFxuICAgICAgXCJsaW5lXCI6IDMwNVxuICAgIH0sXG4gICAgXCJlbmRMb2NcIjoge1xuICAgICAgXCJjb2xcIjogMSxcbiAgICAgIFwibGluZVwiOiAzNDlcbiAgICB9LFxuICAgIFwic3RhcnRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDM1LFxuICAgICAgXCJsaW5lXCI6IDMwNVxuICAgIH0sXG4gICAgXCJlbmRCb2R5XCI6IHtcbiAgICAgIFwiY29sXCI6IDEsXG4gICAgICBcImxpbmVcIjogMzQ5XG4gICAgfVxuICB9XG59O1xuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcIkBsaW5hcmlhL3JlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJlc2l6ZURldGVjdG9yIH0gZnJvbSBcInJlYWN0LXJlc2l6ZS1kZXRlY3RvclwiO1xuaW1wb3J0IHsgRGF0YUVkaXRvciwgR3JpZENlbGxLaW5kIH0gZnJvbSBcIkBnbGlkZWFwcHMvZ2xpZGUtZGF0YS1ncmlkXCI7XG5pbXBvcnQgeyBmYWtlciB9IGZyb20gXCJAZmFrZXItanMvZmFrZXJcIjtcbmltcG9ydCB7IHVzZUNvbGxhcHNpbmdHcm91cHMsIHVzZUNvbHVtblNvcnQsIHVzZU1vdmVhYmxlQ29sdW1ucyB9IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgdXNlVW5kb1JlZG8gfSBmcm9tIFwiLi4vdXNlLXVuZG8tcmVkby5qc1wiO1xuaW1wb3J0IHsgdXNlTW9ja0RhdGFHZW5lcmF0b3IgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZha2VyLnNlZWQoMTMzNyk7XG5jb25zdCBTaW1wbGVXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgKixcbiAgICAqOjpiZWZvcmUsXG4gICAgKjo6YWZ0ZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICAgIH1cbmA7XG5jb25zdCBTaW1wbGVUaGVtZVdyYXBwZXIgPSBwID0+IHtcbiAgcmV0dXJuIF9qc3goU2ltcGxlV3JhcHBlciwge1xuICAgIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJjb250ZW50XCIsXG4gICAgICBjaGlsZHJlbjogcC5jaGlsZHJlblxuICAgIH0pXG4gIH0pO1xufTtcblNpbXBsZVRoZW1lV3JhcHBlci5kaXNwbGF5TmFtZSA9IFwiU2ltcGxlVGhlbWVXcmFwcGVyXCI7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHBhcmFtZXRlcnM6IHtcbiAgICBcInN0b3J5U291cmNlXCI6IHtcbiAgICAgIFwic291cmNlXCI6IFwiaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSBcXFwiQGxpbmFyaWEvcmVhY3RcXFwiO1xcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXFxcInJlYWN0XFxcIjtcXG5pbXBvcnQgeyB1c2VSZXNpemVEZXRlY3RvciB9IGZyb20gXFxcInJlYWN0LXJlc2l6ZS1kZXRlY3RvclxcXCI7XFxuaW1wb3J0IHtcXG4gICAgRGF0YUVkaXRvcixcXG4gICAgdHlwZSBEYXRhRWRpdG9yUHJvcHMsXFxuICAgIHR5cGUgRGF0YUVkaXRvclJlZixcXG4gICAgR3JpZENlbGxLaW5kLFxcbiAgICB0eXBlIEdyaWRDb2x1bW4sXFxuICAgIHR5cGUgVGhlbWUsXFxufSBmcm9tIFxcXCJAZ2xpZGVhcHBzL2dsaWRlLWRhdGEtZ3JpZFxcXCI7XFxuaW1wb3J0IHsgZmFrZXIgfSBmcm9tIFxcXCJAZmFrZXItanMvZmFrZXJcXFwiO1xcbmltcG9ydCB7IHVzZUNvbGxhcHNpbmdHcm91cHMsIHVzZUNvbHVtblNvcnQsIHVzZU1vdmVhYmxlQ29sdW1ucyB9IGZyb20gXFxcIi4uL2luZGV4LmpzXFxcIjtcXG5pbXBvcnQgeyB1c2VVbmRvUmVkbyB9IGZyb20gXFxcIi4uL3VzZS11bmRvLXJlZG8uanNcXFwiO1xcbmltcG9ydCB7IHVzZU1vY2tEYXRhR2VuZXJhdG9yIH0gZnJvbSBcXFwiLi91dGlscy5qc1xcXCI7XFxuXFxuZmFrZXIuc2VlZCgxMzM3KTtcXG5cXG5jb25zdCBTaW1wbGVXcmFwcGVyID0gc3R5bGVkLmRpdmBcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXG4gICAgKixcXG4gICAgKjo6YmVmb3JlLFxcbiAgICAqOjphZnRlciB7XFxuICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbiAgICB9XFxuYDtcXG5cXG5jb25zdCBTaW1wbGVUaGVtZVdyYXBwZXI6IFJlYWN0LkZDID0gcCA9PiB7XFxuICAgIHJldHVybiAoXFxuICAgICAgICA8U2ltcGxlV3JhcHBlcj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cXFwiY29udGVudFxcXCI+e3AuY2hpbGRyZW59PC9kaXY+XFxuICAgICAgICA8L1NpbXBsZVdyYXBwZXI+XFxuICAgICk7XFxufTtcXG5cXG5leHBvcnQgZGVmYXVsdCB7XFxuICAgIHRpdGxlOiBcXFwiRXh0cmEgUGFja2FnZXMvU291cmNlXFxcIixcXG5cXG4gICAgZGVjb3JhdG9yczogW1xcbiAgICAgICAgKFN0b3J5OiBSZWFjdC5Db21wb25lbnRUeXBlKSA9PiAoXFxuICAgICAgICAgICAgPFNpbXBsZVRoZW1lV3JhcHBlcj5cXG4gICAgICAgICAgICAgICAgPFN0b3J5IC8+XFxuICAgICAgICAgICAgPC9TaW1wbGVUaGVtZVdyYXBwZXI+XFxuICAgICAgICApLFxcbiAgICBdLFxcbn07XFxuXFxuY29uc3QgQmVhdXRpZnVsU3R5bGUgPSBzdHlsZWQuZGl2YFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjc5MGI5O1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMyNzkwYjksICMyMDcwYTkpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuXFxuICAgIHBhZGRpbmc6IDMycHggNDhweDtcXG5cXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG5cXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuXFxuICAgICYgPiBoMSB7XFxuICAgICAgICBmb250LXNpemU6IDUwcHg7XFxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XFxuICAgICAgICBtYXJnaW46IDAgMCAxMnB4IDA7XFxuICAgIH1cXG5cXG4gICAgLnNpemVyIHtcXG4gICAgICAgIGZsZXgtZ3JvdzogMTtcXG5cXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcblxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcXG4gICAgICAgIGJveC1zaGFkb3c6XFxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMjUpIDBweCA0cHggOHB4IC0ycHgsXFxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMDgpIDBweCAwcHggMHB4IDFweDtcXG5cXG4gICAgICAgIC5zaXplci1jbGlwIHtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcblxcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgIH1cXG4gICAgfVxcbmA7XFxuXFxuaW50ZXJmYWNlIEJlYXV0aWZ1bFByb3BzIHtcXG4gICAgdGl0bGU6IHN0cmluZztcXG4gICAgZGVzY3JpcHRpb24/OiBSZWFjdC5SZWFjdE5vZGU7XFxufVxcblxcbmNvbnN0IEJlYXV0aWZ1bFdyYXBwZXI6IFJlYWN0LkZDPEJlYXV0aWZ1bFByb3BzPiA9IHAgPT4ge1xcbiAgICBjb25zdCB7IHRpdGxlLCBjaGlsZHJlbiwgZGVzY3JpcHRpb24gfSA9IHA7XFxuXFxuICAgIGNvbnN0IHsgcmVmLCB3aWR0aCwgaGVpZ2h0IH0gPSB1c2VSZXNpemVEZXRlY3RvcigpO1xcblxcbiAgICByZXR1cm4gKFxcbiAgICAgICAgPEJlYXV0aWZ1bFN0eWxlPlxcbiAgICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cXG4gICAgICAgICAgICB7ZGVzY3JpcHRpb259XFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XFxcInNpemVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XFxcInNpemVyLWNsaXBcXFwiIHJlZj17cmVmfT5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXFxcInJlbGF0aXZlXFxcIixcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoID8/IDEwMCxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgPz8gMTAwLFxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvQmVhdXRpZnVsU3R5bGU+XFxuICAgICk7XFxufTtcXG5cXG5jb25zdCBEZXNjcmlwdGlvbiA9IHN0eWxlZC5wYFxcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgICBtYXJnaW46IDAgMCAyMHB4IDA7XFxuYDtcXG5cXG5leHBvcnQgY29uc3QgTW9yZUluZm8gPSBzdHlsZWQucGBcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xcblxcbiAgICBidXR0b24ge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcXG4gICAgICAgIGNvbG9yOiAjMmIyYjJiO1xcbiAgICAgICAgcGFkZGluZzogMnB4IDZweDtcXG4gICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XFxuICAgICAgICBtYXJnaW46IDAgMC4xZW07XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIH1cXG5gO1xcblxcbmNvbnN0IGRlZmF1bHRQcm9wczogUGFydGlhbDxEYXRhRWRpdG9yUHJvcHM+ID0ge1xcbiAgICBzbW9vdGhTY3JvbGxYOiB0cnVlLFxcbiAgICBzbW9vdGhTY3JvbGxZOiB0cnVlLFxcbiAgICBpc0RyYWdnYWJsZTogZmFsc2UsXFxuICAgIHJvd01hcmtlcnM6IFxcXCJub25lXFxcIixcXG4gICAgd2lkdGg6IFxcXCIxMDAlXFxcIixcXG59O1xcblxcbmNvbnN0IHRlc3RUaGVtZTogVGhlbWUgPSB7XFxuICAgIGFjY2VudENvbG9yOiBcXFwiIzRGNURGRlxcXCIsXFxuICAgIGFjY2VudEZnOiBcXFwiI0ZGRkZGRlxcXCIsXFxuICAgIGFjY2VudExpZ2h0OiBcXFwicmdiYSg2MiwgMTE2LCAyNTMsIDAuMSlcXFwiLFxcblxcbiAgICB0ZXh0RGFyazogXFxcIiMzMTMxMzlcXFwiLFxcbiAgICB0ZXh0TWVkaXVtOiBcXFwiIzczNzM4M1xcXCIsXFxuICAgIHRleHRMaWdodDogXFxcIiNCMkIyQzBcXFwiLFxcbiAgICB0ZXh0QnViYmxlOiBcXFwiIzMxMzEzOVxcXCIsXFxuXFxuICAgIGJnSWNvbkhlYWRlcjogXFxcIiM3MzczODNcXFwiLFxcbiAgICBmZ0ljb25IZWFkZXI6IFxcXCIjRkZGRkZGXFxcIixcXG4gICAgdGV4dEhlYWRlcjogXFxcIiMzMTMxMzlcXFwiLFxcbiAgICB0ZXh0R3JvdXBIZWFkZXI6IFxcXCIjMzEzMTM5QkJcXFwiLFxcbiAgICB0ZXh0SGVhZGVyU2VsZWN0ZWQ6IFxcXCIjRkZGRkZGXFxcIixcXG5cXG4gICAgYmdDZWxsOiBcXFwiI0ZGRkZGRlxcXCIsXFxuICAgIGJnQ2VsbE1lZGl1bTogXFxcIiNGQUZBRkJcXFwiLFxcbiAgICBiZ0hlYWRlcjogXFxcIiNGN0Y3RjhcXFwiLFxcbiAgICBiZ0hlYWRlckhhc0ZvY3VzOiBcXFwiI0U5RTlFQlxcXCIsXFxuICAgIGJnSGVhZGVySG92ZXJlZDogXFxcIiNFRkVGRjFcXFwiLFxcblxcbiAgICBiZ0J1YmJsZTogXFxcIiNFREVERjNcXFwiLFxcbiAgICBiZ0J1YmJsZVNlbGVjdGVkOiBcXFwiI0ZGRkZGRlxcXCIsXFxuXFxuICAgIGhlYWRlckljb25TaXplOiAyMCxcXG4gICAgbWFya2VyRm9udFN0eWxlOiBcXFwiMTNweFxcXCIsXFxuXFxuICAgIGJnU2VhcmNoUmVzdWx0OiBcXFwiI2ZmZjllM1xcXCIsXFxuXFxuICAgIGJvcmRlckNvbG9yOiBcXFwicmdiYSgxMTUsIDExNiwgMTMxLCAwLjE2KVxcXCIsXFxuICAgIGhvcml6b250YWxCb3JkZXJDb2xvcjogXFxcInJnYmEoMTE1LCAxMTYsIDEzMSwgMC4xNilcXFwiLFxcbiAgICBkcmlsbGRvd25Cb3JkZXI6IFxcXCJyZ2JhKDAsIDAsIDAsIDApXFxcIixcXG5cXG4gICAgbGlua0NvbG9yOiBcXFwiIzRGNURGRlxcXCIsXFxuXFxuICAgIGNlbGxIb3Jpem9udGFsUGFkZGluZzogOCxcXG4gICAgY2VsbFZlcnRpY2FsUGFkZGluZzogMyxcXG5cXG4gICAgaGVhZGVyRm9udFN0eWxlOiBcXFwiNjAwIDEzcHhcXFwiLFxcbiAgICBiYXNlRm9udFN0eWxlOiBcXFwiMTNweFxcXCIsXFxuICAgIGVkaXRvckZvbnRTaXplOiBcXFwiMTNweFxcXCIsXFxuICAgIGxpbmVIZWlnaHQ6IDEuNCxcXG4gICAgZm9udEZhbWlseTpcXG4gICAgICAgIFxcXCJJbnRlciwgUm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIGF2ZW5pciBuZXh0LCBhdmVuaXIsIHNlZ29lIHVpLCBoZWx2ZXRpY2EgbmV1ZSwgaGVsdmV0aWNhLCBVYnVudHUsIG5vdG8sIGFyaWFsLCBzYW5zLXNlcmlmXFxcIixcXG59O1xcblxcbmNvbnN0IGNvbHM6IEdyaWRDb2x1bW5bXSA9IFtcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJBXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDFcXFwiLFxcbiAgICB9LFxcbiAgICB7XFxuICAgICAgICB0aXRsZTogXFxcIkJcXFwiLFxcbiAgICAgICAgd2lkdGg6IDIwMCxcXG4gICAgICAgIGdyb3VwOiBcXFwiR3JvdXAgMVxcXCIsXFxuICAgIH0sXFxuICAgIHtcXG4gICAgICAgIHRpdGxlOiBcXFwiQ1xcXCIsXFxuICAgICAgICB3aWR0aDogMjAwLFxcbiAgICAgICAgZ3JvdXA6IFxcXCJHcm91cCAyXFxcIixcXG4gICAgfSxcXG4gICAge1xcbiAgICAgICAgdGl0bGU6IFxcXCJEXFxcIixcXG4gICAgICAgIHdpZHRoOiAyMDAsXFxuICAgICAgICBncm91cDogXFxcIkdyb3VwIDJcXFwiLFxcbiAgICB9LFxcbiAgICB7XFxuICAgICAgICB0aXRsZTogXFxcIkVcXFwiLFxcbiAgICAgICAgd2lkdGg6IDIwMCxcXG4gICAgICAgIGdyb3VwOiBcXFwiR3JvdXAgMlxcXCIsXFxuICAgIH0sXFxuXTtcXG5cXG5leHBvcnQgY29uc3QgVXNlRGF0YVNvdXJjZTogUmVhY3QuVkZDID0gKCkgPT4ge1xcbiAgICBjb25zdCBjYWNoZSA9IFJlYWN0LnVzZVJlZjxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pih7fSk7XFxuXFxuICAgIGNvbnN0IHJvd3MgPSAxMDBfMDAwO1xcblxcbiAgICBjb25zdCBtb3ZlQXJncyA9IHVzZU1vdmVhYmxlQ29sdW1ucyh7XFxuICAgICAgICBjb2x1bW5zOiBjb2xzLFxcbiAgICAgICAgZ2V0Q2VsbENvbnRlbnQ6IFJlYWN0LnVzZUNhbGxiYWNrKChbY29sLCByb3ddKSA9PiB7XFxuICAgICAgICAgICAgaWYgKGNvbCA9PT0gMCkge1xcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xcbiAgICAgICAgICAgICAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlRleHQsXFxuICAgICAgICAgICAgICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBgJHtyb3d9YCxcXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhOiBgJHtyb3d9YCxcXG4gICAgICAgICAgICAgICAgfTtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7Y29sfSwke3Jvd31gO1xcbiAgICAgICAgICAgIGlmIChjYWNoZS5jdXJyZW50W2tleV0gPT09IHVuZGVmaW5lZCkge1xcbiAgICAgICAgICAgICAgICBjYWNoZS5jdXJyZW50W2tleV0gPSBmYWtlci5uYW1lLmZpcnN0TmFtZSgpICsgXFxcIiBcXFwiICsgZmFrZXIubmFtZS5sYXN0TmFtZSgpO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICBjb25zdCBkID0gY2FjaGUuY3VycmVudFtrZXldO1xcblxcbiAgICAgICAgICAgIHJldHVybiB7XFxuICAgICAgICAgICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxcbiAgICAgICAgICAgICAgICBhbGxvd092ZXJsYXk6IHRydWUsXFxuICAgICAgICAgICAgICAgIGRhdGE6IGQsXFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRhOiBkLFxcbiAgICAgICAgICAgIH07XFxuICAgICAgICB9LCBbXSksXFxuICAgIH0pO1xcblxcbiAgICBjb25zdCBbc29ydCwgc2V0U29ydF0gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KCk7XFxuXFxuICAgIGNvbnN0IHNvcnRBcmdzID0gdXNlQ29sdW1uU29ydCh7XFxuICAgICAgICBjb2x1bW5zOiBtb3ZlQXJncy5jb2x1bW5zLFxcbiAgICAgICAgZ2V0Q2VsbENvbnRlbnQ6IG1vdmVBcmdzLmdldENlbGxDb250ZW50LFxcbiAgICAgICAgcm93cyxcXG4gICAgICAgIHNvcnQ6XFxuICAgICAgICAgICAgc29ydCA9PT0gdW5kZWZpbmVkXFxuICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXFxuICAgICAgICAgICAgICAgIDoge1xcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1vdmVBcmdzLmNvbHVtbnNbc29ydF0sXFxuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXFxcImRlc2NcXFwiLFxcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcXFwic21hcnRcXFwiLFxcbiAgICAgICAgICAgICAgICAgIH0sXFxuICAgIH0pO1xcblxcbiAgICBjb25zdCBjb2xsYXBzZUFyZ3MgPSB1c2VDb2xsYXBzaW5nR3JvdXBzKHtcXG4gICAgICAgIGNvbHVtbnM6IG1vdmVBcmdzLmNvbHVtbnMsXFxuICAgICAgICB0aGVtZTogdGVzdFRoZW1lLFxcbiAgICAgICAgZnJlZXplQ29sdW1uczogMCxcXG4gICAgfSk7XFxuXFxuICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2sgPSBSZWFjdC51c2VDYWxsYmFjaygoaW5kZXg6IG51bWJlcikgPT4ge1xcbiAgICAgICAgc2V0U29ydChpbmRleCk7XFxuICAgIH0sIFtdKTtcXG5cXG4gICAgcmV0dXJuIChcXG4gICAgICAgIDxCZWF1dGlmdWxXcmFwcGVyIHRpdGxlPVxcXCJDdXN0b20gc291cmNlIGV4dGVuc2lvbnNcXFwiIGRlc2NyaXB0aW9uPXs8RGVzY3JpcHRpb24+Rml4bWUuPC9EZXNjcmlwdGlvbj59PlxcbiAgICAgICAgICAgIDxEYXRhRWRpdG9yXFxuICAgICAgICAgICAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XFxuICAgICAgICAgICAgICAgIHsuLi5tb3ZlQXJnc31cXG4gICAgICAgICAgICAgICAgey4uLnNvcnRBcmdzfVxcbiAgICAgICAgICAgICAgICB7Li4uY29sbGFwc2VBcmdzfVxcbiAgICAgICAgICAgICAgICByb3dzPXtyb3dzfVxcbiAgICAgICAgICAgICAgICBvbkNvbHVtbk1vdmVkPXttb3ZlQXJncy5vbkNvbHVtbk1vdmVkfVxcbiAgICAgICAgICAgICAgICBvbkhlYWRlckNsaWNrZWQ9e29uSGVhZGVyQ2xpY2t9XFxuICAgICAgICAgICAgLz5cXG4gICAgICAgIDwvQmVhdXRpZnVsV3JhcHBlcj5cXG4gICAgKTtcXG59O1xcbihVc2VEYXRhU291cmNlIGFzIGFueSkucGFyYW1ldGVycyA9IHtcXG4gICAgb3B0aW9uczoge1xcbiAgICAgICAgc2hvd1BhbmVsOiBmYWxzZSxcXG4gICAgfSxcXG59O1xcblxcbmV4cG9ydCBjb25zdCBVbmRvUmVkbzogUmVhY3QuVkZDID0gKCkgPT4ge1xcbiAgICBjb25zdCB7IGNvbHM6IGNvbHVtbnMsIGdldENlbGxDb250ZW50LCBzZXRDZWxsVmFsdWUgfSA9IHVzZU1vY2tEYXRhR2VuZXJhdG9yKDYpO1xcblxcbiAgICBjb25zdCBncmlkUmVmID0gUmVhY3QudXNlUmVmPERhdGFFZGl0b3JSZWY+KG51bGwpO1xcblxcbiAgICBjb25zdCB7IGdyaWRTZWxlY3Rpb24sIG9uQ2VsbEVkaXRlZCwgb25HcmlkU2VsZWN0aW9uQ2hhbmdlLCB1bmRvLCBjYW5SZWRvLCBjYW5VbmRvLCByZWRvIH0gPSB1c2VVbmRvUmVkbyhcXG4gICAgICAgIGdyaWRSZWYsXFxuICAgICAgICBnZXRDZWxsQ29udGVudCxcXG4gICAgICAgIHNldENlbGxWYWx1ZVxcbiAgICApO1xcblxcbiAgICByZXR1cm4gKFxcbiAgICAgICAgPEJlYXV0aWZ1bFdyYXBwZXJcXG4gICAgICAgICAgICB0aXRsZT1cXFwiVW5kbyAvIFJlZG8gU3VwcG9ydFxcXCJcXG4gICAgICAgICAgICBkZXNjcmlwdGlvbj17XFxuICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIEEgc2ltcGxlIHVuZG8vcmVkbyBpbXBsZW1lbnRhdGlvblxcbiAgICAgICAgICAgICAgICAgICAgPE1vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZSBrZXlib2FyZCBzaG9ydGN1dHMgQ01EK1ogYW5kIENNRCtTSElGVCtaIC8gQ1RSTCtaIGFuZCBDVFJMK1kuIE9yIGNsaWNrIHRoZXNlIGJ1dHRvbnM6XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt1bmRvfSBkaXNhYmxlZD17IWNhblVuZG99IHN0eWxlPXt7IG9wYWNpdHk6IGNhblVuZG8gPyAxIDogMC40IH19PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmRvXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtyZWRvfSBkaXNhYmxlZD17IWNhblJlZG99IHN0eWxlPXt7IG9wYWNpdHk6IGNhblJlZG8gPyAxIDogMC40IH19PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWRvXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgICAgICA8L01vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICAgICAgPE1vcmVJbmZvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEl0IHdvcmtzIGJ5IHRha2luZyBhIHNuYXBzaG90IG9mIHRoZSBjb250ZW50IG9mIGEgY2VsbCBiZWZvcmUgaXQgaXMgZWRpdGVkIGFuZCByZXBsYXlpbmcgYW55XFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdHMgYmFjay5cXG4gICAgICAgICAgICAgICAgICAgIDwvTW9yZUluZm8+XFxuICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XFxuICAgICAgICAgICAgfT5cXG4gICAgICAgICAgICA8RGF0YUVkaXRvclxcbiAgICAgICAgICAgICAgICB7Li4uZGVmYXVsdFByb3BzfVxcbiAgICAgICAgICAgICAgICByZWY9e2dyaWRSZWZ9XFxuICAgICAgICAgICAgICAgIG9uQ2VsbEVkaXRlZD17b25DZWxsRWRpdGVkfVxcbiAgICAgICAgICAgICAgICBnZXRDZWxsQ29udGVudD17Z2V0Q2VsbENvbnRlbnR9XFxuICAgICAgICAgICAgICAgIGdyaWRTZWxlY3Rpb249e2dyaWRTZWxlY3Rpb24gPz8gdW5kZWZpbmVkfVxcbiAgICAgICAgICAgICAgICBvbkdyaWRTZWxlY3Rpb25DaGFuZ2U9e29uR3JpZFNlbGVjdGlvbkNoYW5nZX1cXG4gICAgICAgICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cXG4gICAgICAgICAgICAgICAgcm93cz17MTAwMH1cXG4gICAgICAgICAgICAvPlxcbiAgICAgICAgPC9CZWF1dGlmdWxXcmFwcGVyPlxcbiAgICApO1xcbn07XFxuKFVuZG9SZWRvIGFzIGFueSkucGFyYW1ldGVycyA9IHtcXG4gICAgb3B0aW9uczoge1xcbiAgICAgICAgc2hvd1BhbmVsOiBmYWxzZSxcXG4gICAgfSxcXG59O1xcblwiLFxuICAgICAgXCJsb2NhdGlvbnNNYXBcIjoge1xuICAgICAgICBcInVzZS1kYXRhLXNvdXJjZVwiOiB7XG4gICAgICAgICAgXCJzdGFydExvY1wiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiA0MCxcbiAgICAgICAgICAgIFwibGluZVwiOiAyMjdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5kTG9jXCI6IHtcbiAgICAgICAgICAgIFwiY29sXCI6IDEsXG4gICAgICAgICAgICBcImxpbmVcIjogMjk4XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN0YXJ0Qm9keVwiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiA0MCxcbiAgICAgICAgICAgIFwibGluZVwiOiAyMjdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5kQm9keVwiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiAxLFxuICAgICAgICAgICAgXCJsaW5lXCI6IDI5OFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ1bmRvLXJlZG9cIjoge1xuICAgICAgICAgIFwic3RhcnRMb2NcIjoge1xuICAgICAgICAgICAgXCJjb2xcIjogMzUsXG4gICAgICAgICAgICBcImxpbmVcIjogMzA1XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuZExvY1wiOiB7XG4gICAgICAgICAgICBcImNvbFwiOiAxLFxuICAgICAgICAgICAgXCJsaW5lXCI6IDM0OVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdGFydEJvZHlcIjoge1xuICAgICAgICAgICAgXCJjb2xcIjogMzUsXG4gICAgICAgICAgICBcImxpbmVcIjogMzA1XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImVuZEJvZHlcIjoge1xuICAgICAgICAgICAgXCJjb2xcIjogMSxcbiAgICAgICAgICAgIFwibGluZVwiOiAzNDlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHRpdGxlOiBcIkV4dHJhIFBhY2thZ2VzL1NvdXJjZVwiLFxuICBkZWNvcmF0b3JzOiBbU3RvcnkgPT4gX2pzeChTaW1wbGVUaGVtZVdyYXBwZXIsIHtcbiAgICBjaGlsZHJlbjogX2pzeChTdG9yeSwge30pXG4gIH0pXVxufTtcbmNvbnN0IEJlYXV0aWZ1bFN0eWxlID0gc3R5bGVkLmRpdmBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjc5MGI5O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzI3OTBiOSwgIzIwNzBhOSk7XG4gICAgY29sb3I6IHdoaXRlO1xuXG4gICAgcGFkZGluZzogMzJweCA0OHB4O1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGhlaWdodDogMTAwdmg7XG5cbiAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcblxuICAgICYgPiBoMSB7XG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICAgIG1hcmdpbjogMCAwIDEycHggMDtcbiAgICB9XG5cbiAgICAuc2l6ZXIge1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgYm94LXNoYWRvdzpcbiAgICAgICAgICAgIHJnYmEoOSwgMzAsIDY2LCAwLjI1KSAwcHggNHB4IDhweCAtMnB4LFxuICAgICAgICAgICAgcmdiYSg5LCAzMCwgNjYsIDAuMDgpIDBweCAwcHggMHB4IDFweDtcblxuICAgICAgICAuc2l6ZXItY2xpcCB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcblxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgfVxuYDtcbmNvbnN0IEJlYXV0aWZ1bFdyYXBwZXIgPSBwID0+IHtcbiAgY29uc3Qge1xuICAgIHRpdGxlLFxuICAgIGNoaWxkcmVuLFxuICAgIGRlc2NyaXB0aW9uXG4gIH0gPSBwO1xuICBjb25zdCB7XG4gICAgcmVmLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodFxuICB9ID0gdXNlUmVzaXplRGV0ZWN0b3IoKTtcbiAgcmV0dXJuIF9qc3hzKEJlYXV0aWZ1bFN0eWxlLCB7XG4gICAgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwge1xuICAgICAgY2hpbGRyZW46IHRpdGxlXG4gICAgfSksIGRlc2NyaXB0aW9uLCBfanN4KFwiZGl2XCIsIHtcbiAgICAgIGNsYXNzTmFtZTogXCJzaXplclwiLFxuICAgICAgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwge1xuICAgICAgICBjbGFzc05hbWU6IFwic2l6ZXItY2xpcFwiLFxuICAgICAgICByZWY6IHJlZixcbiAgICAgICAgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwge1xuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoICE9PSBudWxsICYmIHdpZHRoICE9PSB2b2lkIDAgPyB3aWR0aCA6IDEwMCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICE9PSBudWxsICYmIGhlaWdodCAhPT0gdm9pZCAwID8gaGVpZ2h0IDogMTAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSldXG4gIH0pO1xufTtcbkJlYXV0aWZ1bFdyYXBwZXIuZGlzcGxheU5hbWUgPSBcIkJlYXV0aWZ1bFdyYXBwZXJcIjtcbmNvbnN0IERlc2NyaXB0aW9uID0gc3R5bGVkLnBgXG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbmA7XG5leHBvcnQgY29uc3QgTW9yZUluZm8gPSBzdHlsZWQucGBcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luOiAwIDAgMjBweCAwO1xuXG4gICAgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICAgICAgY29sb3I6ICMyYjJiMmI7XG4gICAgICAgIHBhZGRpbmc6IDJweCA2cHg7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBib3gtc2hhZG93OiAwcHggMXB4IDJweCAjMDAwMDAwNDA7XG4gICAgICAgIG1hcmdpbjogMCAwLjFlbTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuYDtcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgc21vb3RoU2Nyb2xsWDogdHJ1ZSxcbiAgc21vb3RoU2Nyb2xsWTogdHJ1ZSxcbiAgaXNEcmFnZ2FibGU6IGZhbHNlLFxuICByb3dNYXJrZXJzOiBcIm5vbmVcIixcbiAgd2lkdGg6IFwiMTAwJVwiXG59O1xuY29uc3QgdGVzdFRoZW1lID0ge1xuICBhY2NlbnRDb2xvcjogXCIjNEY1REZGXCIsXG4gIGFjY2VudEZnOiBcIiNGRkZGRkZcIixcbiAgYWNjZW50TGlnaHQ6IFwicmdiYSg2MiwgMTE2LCAyNTMsIDAuMSlcIixcbiAgdGV4dERhcms6IFwiIzMxMzEzOVwiLFxuICB0ZXh0TWVkaXVtOiBcIiM3MzczODNcIixcbiAgdGV4dExpZ2h0OiBcIiNCMkIyQzBcIixcbiAgdGV4dEJ1YmJsZTogXCIjMzEzMTM5XCIsXG4gIGJnSWNvbkhlYWRlcjogXCIjNzM3MzgzXCIsXG4gIGZnSWNvbkhlYWRlcjogXCIjRkZGRkZGXCIsXG4gIHRleHRIZWFkZXI6IFwiIzMxMzEzOVwiLFxuICB0ZXh0R3JvdXBIZWFkZXI6IFwiIzMxMzEzOUJCXCIsXG4gIHRleHRIZWFkZXJTZWxlY3RlZDogXCIjRkZGRkZGXCIsXG4gIGJnQ2VsbDogXCIjRkZGRkZGXCIsXG4gIGJnQ2VsbE1lZGl1bTogXCIjRkFGQUZCXCIsXG4gIGJnSGVhZGVyOiBcIiNGN0Y3RjhcIixcbiAgYmdIZWFkZXJIYXNGb2N1czogXCIjRTlFOUVCXCIsXG4gIGJnSGVhZGVySG92ZXJlZDogXCIjRUZFRkYxXCIsXG4gIGJnQnViYmxlOiBcIiNFREVERjNcIixcbiAgYmdCdWJibGVTZWxlY3RlZDogXCIjRkZGRkZGXCIsXG4gIGhlYWRlckljb25TaXplOiAyMCxcbiAgbWFya2VyRm9udFN0eWxlOiBcIjEzcHhcIixcbiAgYmdTZWFyY2hSZXN1bHQ6IFwiI2ZmZjllM1wiLFxuICBib3JkZXJDb2xvcjogXCJyZ2JhKDExNSwgMTE2LCAxMzEsIDAuMTYpXCIsXG4gIGhvcml6b250YWxCb3JkZXJDb2xvcjogXCJyZ2JhKDExNSwgMTE2LCAxMzEsIDAuMTYpXCIsXG4gIGRyaWxsZG93bkJvcmRlcjogXCJyZ2JhKDAsIDAsIDAsIDApXCIsXG4gIGxpbmtDb2xvcjogXCIjNEY1REZGXCIsXG4gIGNlbGxIb3Jpem9udGFsUGFkZGluZzogOCxcbiAgY2VsbFZlcnRpY2FsUGFkZGluZzogMyxcbiAgaGVhZGVyRm9udFN0eWxlOiBcIjYwMCAxM3B4XCIsXG4gIGJhc2VGb250U3R5bGU6IFwiMTNweFwiLFxuICBlZGl0b3JGb250U2l6ZTogXCIxM3B4XCIsXG4gIGxpbmVIZWlnaHQ6IDEuNCxcbiAgZm9udEZhbWlseTogXCJJbnRlciwgUm9ib3RvLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIGF2ZW5pciBuZXh0LCBhdmVuaXIsIHNlZ29lIHVpLCBoZWx2ZXRpY2EgbmV1ZSwgaGVsdmV0aWNhLCBVYnVudHUsIG5vdG8sIGFyaWFsLCBzYW5zLXNlcmlmXCJcbn07XG5jb25zdCBjb2xzID0gW3tcbiAgdGl0bGU6IFwiQVwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAxXCJcbn0sIHtcbiAgdGl0bGU6IFwiQlwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAxXCJcbn0sIHtcbiAgdGl0bGU6IFwiQ1wiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAyXCJcbn0sIHtcbiAgdGl0bGU6IFwiRFwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAyXCJcbn0sIHtcbiAgdGl0bGU6IFwiRVwiLFxuICB3aWR0aDogMjAwLFxuICBncm91cDogXCJHcm91cCAyXCJcbn1dO1xuZXhwb3J0IGNvbnN0IFVzZURhdGFTb3VyY2UgPSAoKSA9PiB7XG4gIGNvbnN0IGNhY2hlID0gUmVhY3QudXNlUmVmKHt9KTtcbiAgY29uc3Qgcm93cyA9IDEwMDAwMDtcbiAgY29uc3QgbW92ZUFyZ3MgPSB1c2VNb3ZlYWJsZUNvbHVtbnMoe1xuICAgIGNvbHVtbnM6IGNvbHMsXG4gICAgZ2V0Q2VsbENvbnRlbnQ6IFJlYWN0LnVzZUNhbGxiYWNrKF9yZWYgPT4ge1xuICAgICAgbGV0IFtjb2wsIHJvd10gPSBfcmVmO1xuICAgICAgaWYgKGNvbCA9PT0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtpbmQ6IEdyaWRDZWxsS2luZC5UZXh0LFxuICAgICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgICBkYXRhOiBgJHtyb3d9YCxcbiAgICAgICAgICBkaXNwbGF5RGF0YTogYCR7cm93fWBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleSA9IGAke2NvbH0sJHtyb3d9YDtcbiAgICAgIGlmIChjYWNoZS5jdXJyZW50W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYWNoZS5jdXJyZW50W2tleV0gPSBmYWtlci5uYW1lLmZpcnN0TmFtZSgpICsgXCIgXCIgKyBmYWtlci5uYW1lLmxhc3ROYW1lKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBkID0gY2FjaGUuY3VycmVudFtrZXldO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogR3JpZENlbGxLaW5kLlRleHQsXG4gICAgICAgIGFsbG93T3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgZGF0YTogZCxcbiAgICAgICAgZGlzcGxheURhdGE6IGRcbiAgICAgIH07XG4gICAgfSwgW10pXG4gIH0pO1xuICBjb25zdCBbc29ydCwgc2V0U29ydF0gPSBSZWFjdC51c2VTdGF0ZSgpO1xuICBjb25zdCBzb3J0QXJncyA9IHVzZUNvbHVtblNvcnQoe1xuICAgIGNvbHVtbnM6IG1vdmVBcmdzLmNvbHVtbnMsXG4gICAgZ2V0Q2VsbENvbnRlbnQ6IG1vdmVBcmdzLmdldENlbGxDb250ZW50LFxuICAgIHJvd3MsXG4gICAgc29ydDogc29ydCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDoge1xuICAgICAgY29sdW1uOiBtb3ZlQXJncy5jb2x1bW5zW3NvcnRdLFxuICAgICAgZGlyZWN0aW9uOiBcImRlc2NcIixcbiAgICAgIG1vZGU6IFwic21hcnRcIlxuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGNvbGxhcHNlQXJncyA9IHVzZUNvbGxhcHNpbmdHcm91cHMoe1xuICAgIGNvbHVtbnM6IG1vdmVBcmdzLmNvbHVtbnMsXG4gICAgdGhlbWU6IHRlc3RUaGVtZSxcbiAgICBmcmVlemVDb2x1bW5zOiAwXG4gIH0pO1xuICBjb25zdCBvbkhlYWRlckNsaWNrID0gUmVhY3QudXNlQ2FsbGJhY2soaW5kZXggPT4ge1xuICAgIHNldFNvcnQoaW5kZXgpO1xuICB9LCBbXSk7XG4gIHJldHVybiBfanN4KEJlYXV0aWZ1bFdyYXBwZXIsIHtcbiAgICB0aXRsZTogXCJDdXN0b20gc291cmNlIGV4dGVuc2lvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogX2pzeChEZXNjcmlwdGlvbiwge1xuICAgICAgY2hpbGRyZW46IFwiRml4bWUuXCJcbiAgICB9KSxcbiAgICBjaGlsZHJlbjogX2pzeChEYXRhRWRpdG9yLCB7XG4gICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAuLi5tb3ZlQXJncyxcbiAgICAgIC4uLnNvcnRBcmdzLFxuICAgICAgLi4uY29sbGFwc2VBcmdzLFxuICAgICAgcm93czogcm93cyxcbiAgICAgIG9uQ29sdW1uTW92ZWQ6IG1vdmVBcmdzLm9uQ29sdW1uTW92ZWQsXG4gICAgICBvbkhlYWRlckNsaWNrZWQ6IG9uSGVhZGVyQ2xpY2tcbiAgICB9KVxuICB9KTtcbn07XG5Vc2VEYXRhU291cmNlLmRpc3BsYXlOYW1lID0gXCJVc2VEYXRhU291cmNlXCI7XG47XG5Vc2VEYXRhU291cmNlLnBhcmFtZXRlcnMgPSB7XG4gIG9wdGlvbnM6IHtcbiAgICBzaG93UGFuZWw6IGZhbHNlXG4gIH1cbn07XG5leHBvcnQgY29uc3QgVW5kb1JlZG8gPSAoKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb2xzOiBjb2x1bW5zLFxuICAgIGdldENlbGxDb250ZW50LFxuICAgIHNldENlbGxWYWx1ZVxuICB9ID0gdXNlTW9ja0RhdGFHZW5lcmF0b3IoNik7XG4gIGNvbnN0IGdyaWRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IHtcbiAgICBncmlkU2VsZWN0aW9uLFxuICAgIG9uQ2VsbEVkaXRlZCxcbiAgICBvbkdyaWRTZWxlY3Rpb25DaGFuZ2UsXG4gICAgdW5kbyxcbiAgICBjYW5SZWRvLFxuICAgIGNhblVuZG8sXG4gICAgcmVkb1xuICB9ID0gdXNlVW5kb1JlZG8oZ3JpZFJlZiwgZ2V0Q2VsbENvbnRlbnQsIHNldENlbGxWYWx1ZSk7XG4gIHJldHVybiBfanN4KEJlYXV0aWZ1bFdyYXBwZXIsIHtcbiAgICB0aXRsZTogXCJVbmRvIC8gUmVkbyBTdXBwb3J0XCIsXG4gICAgZGVzY3JpcHRpb246IF9qc3hzKERlc2NyaXB0aW9uLCB7XG4gICAgICBjaGlsZHJlbjogW1wiQSBzaW1wbGUgdW5kby9yZWRvIGltcGxlbWVudGF0aW9uXCIsIF9qc3hzKE1vcmVJbmZvLCB7XG4gICAgICAgIGNoaWxkcmVuOiBbXCJVc2Uga2V5Ym9hcmQgc2hvcnRjdXRzIENNRCtaIGFuZCBDTUQrU0hJRlQrWiAvIENUUkwrWiBhbmQgQ1RSTCtZLiBPciBjbGljayB0aGVzZSBidXR0b25zOlwiLCBfanN4KFwiYnV0dG9uXCIsIHtcbiAgICAgICAgICBvbkNsaWNrOiB1bmRvLFxuICAgICAgICAgIGRpc2FibGVkOiAhY2FuVW5kbyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2FuVW5kbyA/IDEgOiAwLjRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBcIlVuZG9cIlxuICAgICAgICB9KSwgX2pzeChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgb25DbGljazogcmVkbyxcbiAgICAgICAgICBkaXNhYmxlZDogIWNhblJlZG8sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNhblJlZG8gPyAxIDogMC40XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaGlsZHJlbjogXCJSZWRvXCJcbiAgICAgICAgfSldXG4gICAgICB9KSwgX2pzeChNb3JlSW5mbywge1xuICAgICAgICBjaGlsZHJlbjogXCJJdCB3b3JrcyBieSB0YWtpbmcgYSBzbmFwc2hvdCBvZiB0aGUgY29udGVudCBvZiBhIGNlbGwgYmVmb3JlIGl0IGlzIGVkaXRlZCBhbmQgcmVwbGF5aW5nIGFueSBlZGl0cyBiYWNrLlwiXG4gICAgICB9KV1cbiAgICB9KSxcbiAgICBjaGlsZHJlbjogX2pzeChEYXRhRWRpdG9yLCB7XG4gICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICByZWY6IGdyaWRSZWYsXG4gICAgICBvbkNlbGxFZGl0ZWQ6IG9uQ2VsbEVkaXRlZCxcbiAgICAgIGdldENlbGxDb250ZW50OiBnZXRDZWxsQ29udGVudCxcbiAgICAgIGdyaWRTZWxlY3Rpb246IGdyaWRTZWxlY3Rpb24gIT09IG51bGwgJiYgZ3JpZFNlbGVjdGlvbiAhPT0gdm9pZCAwID8gZ3JpZFNlbGVjdGlvbiA6IHVuZGVmaW5lZCxcbiAgICAgIG9uR3JpZFNlbGVjdGlvbkNoYW5nZTogb25HcmlkU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgY29sdW1uczogY29sdW1ucyxcbiAgICAgIHJvd3M6IDEwMDBcbiAgICB9KVxuICB9KTtcbn07XG5VbmRvUmVkby5kaXNwbGF5TmFtZSA9IFwiVW5kb1JlZG9cIjtcblVuZG9SZWRvLnBhcmFtZXRlcnMgPSB7XG4gIG9wdGlvbnM6IHtcbiAgICBzaG93UGFuZWw6IGZhbHNlXG4gIH1cbn07Il19*/"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__("./node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/***/ ((module) => {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/***/ ((module) => {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__("./node_modules/lodash/_arrayPush.js"),
    isFlattenable = __webpack_require__("./node_modules/lodash/_isFlattenable.js");

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFindIndex = __webpack_require__("./node_modules/lodash/_baseFindIndex.js"),
    baseIsNaN = __webpack_require__("./node_modules/lodash/_baseIsNaN.js"),
    strictIndexOf = __webpack_require__("./node_modules/lodash/_strictIndexOf.js");

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/***/ ((module) => {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ "./node_modules/lodash/_baseMap.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseEach = __webpack_require__("./node_modules/lodash/_baseEach.js"),
    isArrayLike = __webpack_require__("./node_modules/lodash/isArrayLike.js");

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),

/***/ "./node_modules/lodash/_baseOrderBy.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayMap = __webpack_require__("./node_modules/lodash/_arrayMap.js"),
    baseGet = __webpack_require__("./node_modules/lodash/_baseGet.js"),
    baseIteratee = __webpack_require__("./node_modules/lodash/_baseIteratee.js"),
    baseMap = __webpack_require__("./node_modules/lodash/_baseMap.js"),
    baseSortBy = __webpack_require__("./node_modules/lodash/_baseSortBy.js"),
    baseUnary = __webpack_require__("./node_modules/lodash/_baseUnary.js"),
    compareMultiple = __webpack_require__("./node_modules/lodash/_compareMultiple.js"),
    identity = __webpack_require__("./node_modules/lodash/identity.js"),
    isArray = __webpack_require__("./node_modules/lodash/isArray.js");

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;


/***/ }),

/***/ "./node_modules/lodash/_baseSortBy.js":
/***/ ((module) => {

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;


/***/ }),

/***/ "./node_modules/lodash/_baseUniq.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__("./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__("./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__("./node_modules/lodash/_arrayIncludesWith.js"),
    cacheHas = __webpack_require__("./node_modules/lodash/_cacheHas.js"),
    createSet = __webpack_require__("./node_modules/lodash/_createSet.js"),
    setToArray = __webpack_require__("./node_modules/lodash/_setToArray.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ "./node_modules/lodash/_compareAscending.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__("./node_modules/lodash/isSymbol.js");

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

module.exports = compareAscending;


/***/ }),

/***/ "./node_modules/lodash/_compareMultiple.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var compareAscending = __webpack_require__("./node_modules/lodash/_compareAscending.js");

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;


/***/ }),

/***/ "./node_modules/lodash/_createSet.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Set = __webpack_require__("./node_modules/lodash/_Set.js"),
    noop = __webpack_require__("./node_modules/lodash/noop.js"),
    setToArray = __webpack_require__("./node_modules/lodash/_setToArray.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__("./node_modules/lodash/_Symbol.js"),
    isArguments = __webpack_require__("./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__("./node_modules/lodash/isArray.js");

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/***/ ((module) => {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFlatten = __webpack_require__("./node_modules/lodash/_baseFlatten.js");

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ "./node_modules/lodash/noop.js":
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "./node_modules/lodash/orderBy.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseOrderBy = __webpack_require__("./node_modules/lodash/_baseOrderBy.js"),
    isArray = __webpack_require__("./node_modules/lodash/isArray.js");

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

module.exports = orderBy;


/***/ }),

/***/ "./node_modules/lodash/uniq.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseUniq = __webpack_require__("./node_modules/lodash/_baseUniq.js");

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

module.exports = uniq;


/***/ }),

/***/ "./packages/source/src/stories/use-data-source.stories.linaria.css!=!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/source/src/stories/use-data-source.stories.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_use_data_source_stories_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!./packages/source/src/stories/use-data-source.stories.tsx");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_use_data_source_stories_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_use_data_source_stories_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_use_data_source_stories_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_use_1_node_modules_linaria_webpack5_loader_lib_outputCssLoader_js_cacheProvider_use_data_source_stories_tsx__WEBPACK_IMPORTED_MODULE_6__/* ["default"].locals */ .Z.locals : undefined);


/***/ })

}]);
//# sourceMappingURL=packages-source-src-stories-use-data-source-stories.96ad7608.iframe.bundle.js.map