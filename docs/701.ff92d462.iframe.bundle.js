"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[701],{

/***/ "./node_modules/@storybook/preview-web/dist/esm/renderDocs.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "renderDocs": () => (/* binding */ renderDocs),
  "unmountDocs": () => (/* binding */ unmountDocs)
});

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("./node_modules/regenerator-runtime/runtime.js");
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("./node_modules/core-js/modules/es.object.to-string.js");
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("./node_modules/core-js/modules/es.promise.js");
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("./node_modules/react-dom/index.js");
;// CONCATENATED MODULE: ./node_modules/@storybook/preview-web/dist/esm/NoDocs.js

var wrapper = {
  fontSize: '14px',
  letterSpacing: '0.2px',
  margin: '10px 0'
};
var main = {
  margin: 'auto',
  padding: 30,
  borderRadius: 10,
  background: 'rgba(0,0,0,0.03)'
};
var heading = {
  textAlign: 'center'
};
var NoDocs = function NoDocs() {
  return /*#__PURE__*/react.createElement("div", {
    style: wrapper,
    className: "sb-nodocs sb-wrapper"
  }, /*#__PURE__*/react.createElement("div", {
    style: main
  }, /*#__PURE__*/react.createElement("h1", {
    style: heading
  }, "No Docs"), /*#__PURE__*/react.createElement("p", null, "Sorry, but there are no docs for the selected story. To add them, set the story's\xA0", /*#__PURE__*/react.createElement("code", null, "docs"), " parameter. If you think this is an error:"), /*#__PURE__*/react.createElement("ul", null, /*#__PURE__*/react.createElement("li", null, "Please check the story definition."), /*#__PURE__*/react.createElement("li", null, "Please check the Storybook config."), /*#__PURE__*/react.createElement("li", null, "Try reloading the page.")), /*#__PURE__*/react.createElement("p", null, "If the problem persists, check the browser console, or the terminal you've run Storybook from.")));
};
NoDocs.displayName = "NoDocs";
;// CONCATENATED MODULE: ./node_modules/@storybook/preview-web/dist/esm/renderDocs.js




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function renderDocs(story, docsContext, element, callback) {
  return renderDocsAsync(story, docsContext, element).then(callback);
}

function renderDocsAsync(_x, _x2, _x3) {
  return _renderDocsAsync.apply(this, arguments);
}

function _renderDocsAsync() {
  _renderDocsAsync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(story, docsContext, element) {
    var _docs$getContainer, _docs$getPage;

    var docs, DocsContainer, Page, docsElement;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            docs = story.parameters.docs;

            if (!((docs !== null && docs !== void 0 && docs.getPage || docs !== null && docs !== void 0 && docs.page) && !(docs !== null && docs !== void 0 && docs.getContainer || docs !== null && docs !== void 0 && docs.container))) {
              _context.next = 3;
              break;
            }

            throw new Error('No `docs.container` set, did you run `addon-docs/preset`?');

          case 3:
            _context.t1 = docs.container;

            if (_context.t1) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (_docs$getContainer = docs.getContainer) === null || _docs$getContainer === void 0 ? void 0 : _docs$getContainer.call(docs);

          case 7:
            _context.t1 = _context.sent;

          case 8:
            _context.t0 = _context.t1;

            if (_context.t0) {
              _context.next = 11;
              break;
            }

            _context.t0 = function (_ref) {
              var children = _ref.children;
              return /*#__PURE__*/react.createElement(react.Fragment, null, children);
            };

          case 11:
            DocsContainer = _context.t0;
            _context.t3 = docs.page;

            if (_context.t3) {
              _context.next = 17;
              break;
            }

            _context.next = 16;
            return (_docs$getPage = docs.getPage) === null || _docs$getPage === void 0 ? void 0 : _docs$getPage.call(docs);

          case 16:
            _context.t3 = _context.sent;

          case 17:
            _context.t2 = _context.t3;

            if (_context.t2) {
              _context.next = 20;
              break;
            }

            _context.t2 = NoDocs;

          case 20:
            Page = _context.t2;
            // Use `componentId` as a key so that we force a re-render every time
            // we switch components
            docsElement = /*#__PURE__*/react.createElement(DocsContainer, {
              key: story.componentId,
              context: docsContext
            }, /*#__PURE__*/react.createElement(Page, null));
            _context.next = 24;
            return new Promise(function (resolve) {
              react_dom.render(docsElement, element, resolve);
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _renderDocsAsync.apply(this, arguments);
}

function unmountDocs(element) {
  react_dom.unmountComponentAtNode(element);
}

/***/ })

}]);
//# sourceMappingURL=701.ff92d462.iframe.bundle.js.map