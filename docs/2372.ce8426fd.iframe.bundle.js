"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[2372],{

/***/ "./node_modules/react-laag/dist/react-laag.esm.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sJ": () => (/* binding */ useLayer)
/* harmony export */ });
/* unused harmony exports Arrow, DEFAULT_OPTIONS, PLACEMENT_TYPES, Transition, mergeRefs, setGlobalContainer, useHover, useMousePositionAsTrigger */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-dom/index.js");




function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Utility hook to track the reference of a html-element.
 * It notifies the listener when a change occured, so it can act
 * on the change
 */

function useTrackRef(onRefChange) {
  var storedReference = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // this is de function that actually gets passed to the `ref` prop
  // on the html element. I.e.:
  // <div ref={setter} />

  function setter(element) {
    if (!element || element === storedReference.current) {
      return;
    }

    storedReference.current = element;
    onRefChange(element);
  }

  return setter;
}
/**
 * Utility hook that stores mutable state.
 * Since a getter function is used, it will always return the most
 * up-to-date state. This is useful when you want to get certain state within
 * an effect, without triggering the same effect when the same state changes.
 * Note: may be seen as an anti-pattern.
 */

function useMutableStore(initialState) {
  var state = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialState);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    function set(setter) {
      if (typeof setter === "function") {
        state.current = setter(state.current);
      } else {
        state.current = setter;
      }
    }

    function get() {
      return state.current;
    }

    return [get, set];
  }, []);
}
/**
 * Utility hook that keeps track of active event listeners and how
 * to remove these listeners
 */

function useEventSubscriptions() {
  var subscriptions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    function hasEventSubscriptions() {
      return subscriptions.current.length > 0;
    }

    function removeAllEventSubscriptions() {
      for (var _iterator = _createForOfIteratorHelperLoose(subscriptions.current), _step; !(_step = _iterator()).done;) {
        var unsubscribe = _step.value;
        unsubscribe();
      }

      subscriptions.current = [];
    }

    function addEventSubscription(unsubscriber) {
      subscriptions.current.push(unsubscriber);
    }

    return {
      hasEventSubscriptions: hasEventSubscriptions,
      removeAllEventSubscriptions: removeAllEventSubscriptions,
      addEventSubscription: addEventSubscription
    };
  }, []);
}
/**
 * SSR-safe effect hook
 */

var useIsomorphicLayoutEffect = typeof window !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
/**
 * Utility hook that tracks an state object.
 * If `enabled=false` it will discard changes and reset the lastState to `null`
 */

function useLastState(currentState, enabled) {
  var lastState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(currentState);

  if (!enabled) {
    lastState.current = null;
    return lastState;
  }

  lastState.current = currentState;
  return lastState;
}
var EMPTY_BOUNDS = {
  top: 0,
  left: 0,
  right: 1,
  bottom: 1,
  width: 1,
  height: 1
};
/**
 * @description Utility hook that lets you use the mouse-position as source of the trigger.
 * This is useful in scenario's like context-menu's.
 *
 * @example
 * ```tsx
 * const {
 *  hasMousePosition,
 *  resetMousePosition,
 *  handleMouseEvent,
 *  trigger
 *  } = useMousePositionAsTrigger();
 *
 * const { renderLayer, layerProps } = useLayer({
 *  isOpen: hasMousePosition,
 *  trigger,
 *  onOutsideClick: resetMousePosition
 * });
 *
 * return (
 *  <>
 *   {isOpen && renderLayer(<div {...layerProps} />)}
 *   <div onContextMenu={handleMouseEvent} />
 *  </>
 * );
 * ```
 */

function useMousePositionAsTrigger(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$preventDefault = _ref.preventDefault,
      preventDefault = _ref$preventDefault === void 0 ? true : _ref$preventDefault;

  var parentRef = useRef(null);

  var _useState = useState(EMPTY_BOUNDS),
      mouseBounds = _useState[0],
      setMouseBounds = _useState[1];

  function resetMousePosition() {
    setMouseBounds(EMPTY_BOUNDS);
  }

  var hasMousePosition = mouseBounds !== EMPTY_BOUNDS;

  function handleMouseEvent(evt) {
    if (!enabled) {
      return;
    }

    if (preventDefault) {
      evt.preventDefault();
    }

    var left = evt.clientX,
        top = evt.clientY;
    setMouseBounds({
      top: top,
      left: left,
      width: 1,
      height: 1,
      right: left + 1,
      bottom: top + 1
    });
  }

  return {
    hasMousePosition: hasMousePosition,
    resetMousePosition: resetMousePosition,
    handleMouseEvent: handleMouseEvent,
    trigger: {
      getBounds: function getBounds() {
        return mouseBounds;
      },
      getParent: parentRef.current ? function () {
        return parentRef.current;
      } : undefined
    },
    parentRef: parentRef
  };
}

/**
 * Convert a pixel value into a numeric value
 * @param value string value (ie. '12px')
 */
function getPixelValue(value) {
  return parseFloat(value.replace("px", ""));
}
/**
 * Returns a numeric value that doesn't exceed min or max
 */

function limit(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
/**
 * Utility function which ensures whether a value is truthy
 */

function isSet(value) {
  return value === null || value === undefined ? false : true;
}
/**
 * Utility function that let's you assign multiple references to a 'ref' prop
 * @param refs list of MutableRefObject's and / or callbacks
 */

function mergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return function (element) {
    for (var _iterator = _createForOfIteratorHelperLoose(refs), _step; !(_step = _iterator()).done;) {
      var ref = _step.value;

      if (!ref) {
        continue;
      }

      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    }
  };
}

/**
 * Utility to get the correct ResizeObserver class
 */

function getResizeObserver(environment, polyfill) {
  if (typeof environment === "undefined") {
    return undefined;
  }

  return polyfill || environment.ResizeObserver;
}
/**
 * Utility function that given a element traverses up in the html-hierarchy
 * to find and return all ancestors that have scroll behavior
 */

function findScrollContainers(element, environment) {
  var result = [];

  if (!element || !environment || element === document.body) {
    return result;
  }

  var _environment$getCompu = environment.getComputedStyle(element),
      overflow = _environment$getCompu.overflow,
      overflowX = _environment$getCompu.overflowX,
      overflowY = _environment$getCompu.overflowY;

  if ([overflow, overflowX, overflowY].some(function (prop) {
    return ["auto", "scroll"].includes(prop);
  })) {
    result.push(element);
  }

  return [].concat(result, findScrollContainers(element.parentElement, environment));
}

function createReferenceError(subject) {
  return "react-laag: Could not find a valid reference for the " + subject + " element. There might be 2 causes:\n   - Make sure that the 'ref' is set correctly on the " + subject + " element when isOpen: true. Also make sure your component forwards the ref with \"forwardRef()\".\n   - Make sure that you are actually rendering the " + subject + " when the isOpen prop is set to true";
}
/**
 * This hook has the responsibility to track the bounds of:
 * - the trigger element
 * - the layer element
 * - the arrow element
 * - the scroll-containers of which the trigger element is a descendant of
 *
 * It will call the `onChange` callback with a collection of these elements when any
 * of the tracked elements bounds have changed
 *
 * It will detect these changes by listening:
 * - when the reference of the trigger element changes
 * - when the reference of the layer element changes
 * - when the trigger, layer or document body changes in size
 * - when the user scrolls the page, or any of the scroll containers
 */


function useTrackElements(_ref) {
  var enabled = _ref.enabled,
      onChange = _ref.onChange,
      environment = _ref.environment,
      ResizeObserverPolyfill = _ref.ResizeObserverPolyfill,
      overflowContainer = _ref.overflowContainer,
      triggerOption = _ref.triggerOption;
  // get the correct reference to the ResizeObserver class
  var ResizeObserver = getResizeObserver(environment, ResizeObserverPolyfill); // warn the user when no valid ResizeObserver class could be found

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
     false ? 0 : void 0;
  }, [ResizeObserver]); // keep reference of the optional arrow-component

  var arrowRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // if user has provided the trigger-option we should ingore certain things elsewhere

  var hasTriggerOption = Boolean(triggerOption); // Keep track of mutable element related state
  // It is generally better to use React.useState, but unfortunately that causes to many re-renders

  var _useMutableStore = useMutableStore({
    scrollContainers: [],
    trigger: null,
    layer: null
  }),
      get = _useMutableStore[0],
      set = _useMutableStore[1]; // utility to keep track of the scroll and resize listeners and how to unsubscribe them


  var _useEventSubscription = useEventSubscriptions(),
      hasEventSubscriptions = _useEventSubscription.hasEventSubscriptions,
      addEventSubscription = _useEventSubscription.addEventSubscription,
      removeAllEventSubscriptions = _useEventSubscription.removeAllEventSubscriptions; // All scroll and resize changes eventually end up here, where the collection of bounds (subjectsBounds) is
  // constructed in order to notifiy the `onBoundsChange` callback


  var handleChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function handleChange() {
    var _get = get(),
        layer = _get.layer,
        trigger = _get.trigger,
        scrollContainers = _get.scrollContainers;

    var closestScrollContainer = scrollContainers[0];

    if (!layer) {
      throw new Error(createReferenceError("layer"));
    } // ignore when user has provided the trigger-option


    if (!trigger && !hasTriggerOption) {
      throw new Error(createReferenceError("trigger"));
    }

    var scrollOffsets = {
      top: 0,
      left: 0
    };

    if (closestScrollContainer) {
      var scrollLeft = closestScrollContainer.scrollLeft,
          scrollTop = closestScrollContainer.scrollTop;
      scrollOffsets = {
        top: scrollTop,
        left: scrollLeft
      };
    } else {
      var scrollX = environment.scrollX,
          scrollY = environment.scrollY;
      scrollOffsets = {
        top: scrollY,
        left: scrollX
      };
    }

    var borderOffsets = {
      left: 0,
      top: 0
    };

    if (closestScrollContainer) {
      var _environment$getCompu2 = environment.getComputedStyle(closestScrollContainer),
          borderLeftWidth = _environment$getCompu2.borderLeftWidth,
          borderTopWidth = _environment$getCompu2.borderTopWidth;

      borderOffsets = {
        left: getPixelValue(borderLeftWidth) || 0,
        top: getPixelValue(borderTopWidth) || 0
      };
    }

    onChange({
      layer: layer,
      trigger: trigger,
      scrollContainers: scrollContainers,
      arrow: arrowRef.current
    }, scrollOffsets, borderOffsets);
  }, [get, onChange, environment, arrowRef, hasTriggerOption]); // responsible for adding the scroll and resize listeners to the correct
  // html elements

  var addEventListeners = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function addEventListeners() {
    var _get2 = get(),
        trigger = _get2.trigger,
        layer = _get2.layer,
        scrollContainers = _get2.scrollContainers;

    if (!layer) {
      throw new Error(createReferenceError("layer"));
    }

    if (!trigger && !hasTriggerOption) {
      // ignore when user has provided the trigger-option
      throw new Error(createReferenceError("trigger"));
    }

    if (ResizeObserver) {
      var ignoredInitialCall = false;

      var observerCallback = function observerCallback() {
        if (!ignoredInitialCall) {
          ignoredInitialCall = true;
          return;
        }

        handleChange();
      };

      var observer = new ResizeObserver(observerCallback);

      for (var _i = 0, _arr = [trigger, layer, document.body]; _i < _arr.length; _i++) {
        var element = _arr[_i];
        if (element) observer.observe(element);
      }

      addEventSubscription(function () {
        for (var _i2 = 0, _arr2 = [trigger, layer, document.body]; _i2 < _arr2.length; _i2++) {
          var _element = _arr2[_i2];
          if (_element) observer.unobserve(_element);
        }

        observer.disconnect();
      });
    }

    var listenForScrollElements = [environment].concat(scrollContainers);

    var _loop = function _loop() {
      var element = _step.value;
      element.addEventListener("scroll", handleChange);
      addEventSubscription(function () {
        return element.removeEventListener("scroll", handleChange);
      });
    };

    for (var _iterator = _createForOfIteratorHelperLoose(listenForScrollElements), _step; !(_step = _iterator()).done;) {
      _loop();
    }
  }, [get, addEventSubscription, handleChange, environment, ResizeObserver, hasTriggerOption]); // when either the reference to the trigger or layer element changes
  // we should reset the event listeners and trigger a `onChange`

  var resetWhenReferenceChangedWhileTracking = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (previous, next) {
    if (enabled && previous && previous !== next) {
      removeAllEventSubscriptions();
      addEventListeners();
      handleChange();
    }
  }, [removeAllEventSubscriptions, addEventListeners, handleChange, enabled]); // Logic when reference to layer changes

  var layerRef = useTrackRef((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (layer) {
    var _get3 = get(),
        previousLayer = _get3.layer; // store new reference


    set(function (state) {
      return _extends({}, state, {
        layer: layer
      });
    }); // check if we should reset the event listeners

    resetWhenReferenceChangedWhileTracking(previousLayer, layer);
  }, [get, set, resetWhenReferenceChangedWhileTracking]));
  var getScrollContainers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function handleScrollContainers(element) {
    var scrollContainers = findScrollContainers(element, environment);
    var closestScrollContainer = scrollContainers[0];

    if (closestScrollContainer) {
      // Check if we should warn the user about 'position: relative; stuff...'
      var position = environment.getComputedStyle(closestScrollContainer).position;
      var closestScrollContainerHasCorrectStyling = ["relative", "absolute", "fixed"].includes(position) || overflowContainer;

      if (!closestScrollContainerHasCorrectStyling) {
        closestScrollContainer.style.position = "relative";
      }

       false ? 0 : void 0;
    }

    return scrollContainers;
  }, [environment, overflowContainer]); // Logic when reference to trigger changes
  // Note: this will have no effect when user provided the trigger-option

  var triggerRef = useTrackRef((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (trigger) {
    // collect list of scroll containers
    var scrollContainers = getScrollContainers(trigger);

    var _get4 = get(),
        previousTrigger = _get4.trigger; // store new references


    set(function (state) {
      return _extends({}, state, {
        trigger: trigger,
        scrollContainers: scrollContainers
      });
    }); // check if we should reset the event listeners

    resetWhenReferenceChangedWhileTracking(previousTrigger, trigger);
  }, [get, set, resetWhenReferenceChangedWhileTracking, getScrollContainers])); // when user has provided the trigger-option, it monitors the optional parent-element
  // in order to determine the scroll-containers

  var triggerOptionParent = triggerOption == null ? void 0 : triggerOption.getParent == null ? void 0 : triggerOption.getParent();
  useIsomorphicLayoutEffect(function () {
    if (!triggerOptionParent) {
      return;
    }

    set(function (state) {
      return _extends({}, state, {
        scrollContainers: getScrollContainers(triggerOptionParent)
      });
    });
  }, [triggerOptionParent, set, getScrollContainers]);
  useIsomorphicLayoutEffect(function () {
    if (enabled) {
      // add event listeners if necessary
      if (!hasEventSubscriptions()) {
        addEventListeners();
      }
    }

    return function () {
      if (hasEventSubscriptions()) {
        removeAllEventSubscriptions();
      }
    };
  }, [enabled, hasEventSubscriptions, addEventListeners, removeAllEventSubscriptions]); // run this effect after every render

  useIsomorphicLayoutEffect(function () {
    if (enabled) {
      // eventually call `handleChange` with latest elements-refs
      handleChange();
    }
  });
  return {
    triggerRef: triggerRef,
    layerRef: layerRef,
    arrowRef: arrowRef,
    closestScrollContainer: get().scrollContainers[0] || null
  };
}

var GroupContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}); // Provider that wraps arround the layer in order to provide other useLayers
// down in the hiearchy (child layers) with means to communicate with the parent.
// This provider receives a `registrations` Set which can be used to add and
// delete registrations.

function GroupProvider(_ref) {
  var children = _ref.children,
      registrations = _ref.registrations;
  // registration function that is used as 'context payload' for child layers
  // to call. It returns a function to unregister.
  var handleRegister = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function register(registration) {
    registrations.current.add(registration);
    return function () {
      return registrations.current.delete(registration);
    };
  }, [registrations]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GroupContext.Provider, {
    value: handleRegister
  }, children);
} // asks child layers if they would close given the documents click event
// if there's one that signals not to close, return early (false)

function getShouldCloseAccordingToChildren(registrations, event) {
  for (var _iterator = _createForOfIteratorHelperLoose(registrations), _step; !(_step = _iterator()).done;) {
    var shouldCloseWhenClickedOutside = _step.value.shouldCloseWhenClickedOutside;

    if (!shouldCloseWhenClickedOutside(event)) {
      return false;
    }
  }

  return true;
}
/**
 * Responsible for close behavior
 * When the `onOutsideClick` callback is provided by the user, it will listen for clicks
 * in the document, and tell whether the user clicked outside -> not on layer / trigger.
 * It keeps track of nested useLayers a.k.a child layers (`registrations` Set), through which
 * we can ask whether they `shouldCloseWhenClickedOutside`, or tell them to close.
 *
 * Behavior:
 * - `onOutsideClick` only works on the most outer parent, and not on children. The parent will ask
 *   the child layers whether they would close, and will handle accordingly. The parent may
 *   command the children to close indirectly with the help of `onParentClose`
 * - When the parent just was closed, it will make sure that any children will also close
 *   with the help of `onParentClose`
 */


function useGroup(_ref2) {
  var isOpen = _ref2.isOpen,
      onOutsideClick = _ref2.onOutsideClick,
      onParentClose = _ref2.onParentClose;
  // store references to the dom-elements
  // we need these to later determine wether the clicked outside or not
  var trigger = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var layer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // a Set which keeps track of callbacks given by the child layers through context

  var registrations = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set()); // if this instance is a child itself, we should use this function to register
  // some callbacks to the parent

  var possibleRegisterFn = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(GroupContext); // recursively checks whether to close or not. This mechanism has some similarities
  // with event bubbling.

  var shouldCloseWhenClickedOutside = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function shouldCloseWhenClickedOutside(event) {
    var target = event.target;
    var clickedOnTrigger = trigger.current && trigger.current.contains(target);
    var clickedOnLayer = layer.current && layer.current.contains(target);
    var shouldCloseAccordingToChildren = getShouldCloseAccordingToChildren(registrations.current, event); // when clicked on own layer, but the child would have closed ->
    // let child close

    if (clickedOnLayer && shouldCloseAccordingToChildren) {
      registrations.current.forEach(function (_ref3) {
        var closeChild = _ref3.closeChild;
        return closeChild();
      });
    }

    return !clickedOnTrigger && !clickedOnLayer && shouldCloseAccordingToChildren;
  }, [trigger, layer, registrations]); // registration stuff

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (typeof possibleRegisterFn !== "function") {
      return;
    } // 'possibleRegisterFn' will return a function that will unregister
    // on cleanup


    return possibleRegisterFn({
      shouldCloseWhenClickedOutside: shouldCloseWhenClickedOutside,
      closeChild: function closeChild() {
         false ? 0 : void 0;

        if (onParentClose) {
          onParentClose();
        }
      }
    });
  }, [possibleRegisterFn, shouldCloseWhenClickedOutside, onParentClose, registrations]); // document click handling

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var isChild = typeof possibleRegisterFn === "function";
    var shouldNotListen = !isOpen || !onOutsideClick || isChild;

    if (shouldNotListen) {
      return;
    }

    function handleClick(event) {
      if (shouldCloseWhenClickedOutside(event)) {
        onOutsideClick();
      }
    }

    document.addEventListener("click", handleClick, true);
    return function () {
      return document.removeEventListener("click", handleClick, true);
    };
  }, [isOpen, onOutsideClick, shouldCloseWhenClickedOutside, possibleRegisterFn]); // When this 'useLayer' gets closed -> tell child layers to close as well

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isOpen) {
      registrations.current.forEach(function (_ref4) {
        var closeChild = _ref4.closeChild;
        return closeChild();
      });
    }
  }, [isOpen]);
  return {
    closeOnOutsideClickRefs: {
      trigger: trigger,
      layer: layer
    },
    registrations: registrations
  };
}

var PLACEMENT_TYPES = ["bottom-start", "bottom-end", "bottom-center", "top-start", "top-center", "top-end", "left-end", "left-center", "left-start", "right-end", "right-center", "right-start", "center"];

var OPPOSITES = {
  top: "bottom",
  left: "right",
  bottom: "top",
  right: "left",
  center: "center"
};

var SideBase = /*#__PURE__*/function () {
  function SideBase(prop, opposite, isHorizontal, sizeProp, oppositeSizeProp, cssProp, oppositeCssProp, isCenter, isPush // left | top
  ) {
    this.prop = void 0;
    this.opposite = void 0;
    this.isHorizontal = void 0;
    this.sizeProp = void 0;
    this.oppositeSizeProp = void 0;
    this.cssProp = void 0;
    this.oppositeCssProp = void 0;
    this.isCenter = void 0;
    this.isPush = void 0;
    this.prop = prop;
    this.opposite = opposite;
    this.isHorizontal = isHorizontal;
    this.sizeProp = sizeProp;
    this.oppositeSizeProp = oppositeSizeProp;
    this.cssProp = cssProp;
    this.oppositeCssProp = oppositeCssProp;
    this.isCenter = isCenter;
    this.isPush = isPush;
  }

  var _proto = SideBase.prototype;

  _proto.factor = function factor(value) {
    return value * (this.isPush ? 1 : -1);
  };

  _proto.isOppositeDirection = function isOppositeDirection(side) {
    return this.isHorizontal !== side.isHorizontal;
  };

  return SideBase;
}();

function createSide(prop, recursive) {
  if (recursive === void 0) {
    recursive = true;
  }

  var isHorizontal = ["left", "right"].includes(prop);
  return new SideBase(prop, recursive ? createSide(OPPOSITES[prop], false) : null, isHorizontal, isHorizontal ? "width" : "height", isHorizontal ? "height" : "width", isHorizontal ? "left" : "top", isHorizontal ? "top" : "left", prop === "center", !["right", "bottom"].includes(prop));
}

var BoundSide = {
  top: /*#__PURE__*/createSide("top"),
  bottom: /*#__PURE__*/createSide("bottom"),
  left: /*#__PURE__*/createSide("left"),
  right: /*#__PURE__*/createSide("right")
};
var Side = /*#__PURE__*/_extends({}, BoundSide, {
  center: /*#__PURE__*/createSide("center")
});

var SIDES = ["top", "left", "bottom", "right"];
/**
 * A class containing the positional properties which represent the distance
 * between two Bounds instances for each side
 */

var BoundsOffsets = /*#__PURE__*/function () {
  function BoundsOffsets(offsets) {
    this.top = void 0;
    this.left = void 0;
    this.right = void 0;
    this.bottom = void 0;
    return Object.assign(this, offsets);
  }
  /**
   * Takes multiple BoundsOffets instances and creates a new BoundsOffsets instance
   * by taking the smallest value for each side
   * @param boundsOffsets list of BoundsOffsets instances
   */


  BoundsOffsets.mergeSmallestSides = function mergeSmallestSides(boundsOffsets) {
    var first = boundsOffsets[0],
        rest = boundsOffsets.slice(1);

    if (!first) {
      throw new Error("Please provide at least 1 bounds objects in order to merge");
    }

    var result = Object.fromEntries(SIDES.map(function (side) {
      return [side, first[side]];
    }));

    for (var _iterator = _createForOfIteratorHelperLoose(rest), _step; !(_step = _iterator()).done;) {
      var boundsOffset = _step.value;

      for (var _iterator2 = _createForOfIteratorHelperLoose(SIDES), _step2; !(_step2 = _iterator2()).done;) {
        var side = _step2.value;
        result[side] = Math.min(result[side], boundsOffset[side]);
      }
    }

    return new BoundsOffsets(result);
  }
  /**
   * Checks whether all sides sides are positive, meaning the corresponding Bounds instance
   * fits perfectly within a parent Bounds instance
   */
  ;

  _createClass(BoundsOffsets, [{
    key: "allSidesArePositive",
    get: function get() {
      var _this = this;

      return SIDES.every(function (side) {
        return _this[side] >= 0;
      });
    }
    /**
     * Returns a partial IBoundsOffsets with sides that are negative, meaning sides aren't entirely
     * visible in respect to a parent Bounds instance
     */

  }, {
    key: "negativeSides",
    get: function get() {
      var _this2 = this;

      return Object.fromEntries(SIDES.filter(function (side) {
        return _this2[side] < 0;
      }).map(function (side) {
        return [side, _this2[side]];
      }));
    }
  }]);

  return BoundsOffsets;
}();

/**
 * Utility function that returns sum of various computed styles
 * @param propertyValues list of computed styles (ie. '12px')
 */

function sumOfPropertyValues() {
  for (var _len = arguments.length, propertyValues = new Array(_len), _key = 0; _key < _len; _key++) {
    propertyValues[_key] = arguments[_key];
  }

  return propertyValues.reduce(function (sum, propertyValue) {
    return sum + (propertyValue ? getPixelValue(propertyValue) : 0);
  }, 0);
}

function boundsToObject(_ref) {
  var top = _ref.top,
      left = _ref.left,
      right = _ref.right,
      bottom = _ref.bottom,
      width = _ref.width,
      height = _ref.height;
  return {
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    width: width,
    height: height
  };
}
var EMPTY = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
/**
 * A class containing the positional properties of the native DOM's ClientRect
 * (`element.getBoundingClientRect()`), together with some utility methods
 */

var Bounds = /*#__PURE__*/function () {
  /**
   * Creates a new Bounds class
   * @param bounds An object that adheres to the `IBounds` interface
   */
  Bounds.create = function create(bounds) {
    return new Bounds(bounds);
  }
  /**
   * Creates a new Bounds class from a DOM-element
   * @param element reference to the DOM-element
   * @param options optional options object
   */
  ;

  Bounds.fromElement = function fromElement(element, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$withTransfor = _options.withTransform,
        withTransform = _options$withTransfor === void 0 ? true : _options$withTransfor,
        _options$environment = _options.environment,
        environment = _options$environment === void 0 ? window : _options$environment,
        _options$withScrollba = _options.withScrollbars,
        withScrollbars = _options$withScrollba === void 0 ? true : _options$withScrollba;
    var plain = boundsToObject(element.getBoundingClientRect());
    var bounds = new Bounds(plain);

    if (!withTransform) {
      var _environment$getCompu = environment.getComputedStyle(element),
          width = _environment$getCompu.width,
          height = _environment$getCompu.height,
          boxSizing = _environment$getCompu.boxSizing,
          borderLeft = _environment$getCompu.borderLeft,
          borderRight = _environment$getCompu.borderRight,
          borderTop = _environment$getCompu.borderTop,
          borderBottom = _environment$getCompu.borderBottom,
          paddingLeft = _environment$getCompu.paddingLeft,
          paddingRight = _environment$getCompu.paddingRight,
          paddingTop = _environment$getCompu.paddingTop,
          paddingBottom = _environment$getCompu.paddingBottom;

      var boxWidth = boxSizing === "border-box" ? getPixelValue(width) : sumOfPropertyValues(width, borderLeft, borderRight, paddingLeft, paddingRight);
      var boxHeight = boxSizing === "border-box" ? getPixelValue(height) : sumOfPropertyValues(height, borderTop, borderBottom, paddingTop, paddingBottom);
      bounds = new Bounds(_extends({}, bounds, {
        width: boxWidth,
        height: boxHeight
      }));
    }

    if (!withScrollbars) {
      var scrollbarWidth = bounds.width - element.clientWidth;
      var scrollbarHeight = bounds.height - element.clientHeight;
      return bounds.substract({
        right: scrollbarWidth,
        bottom: scrollbarHeight
      });
    }

    return bounds;
  }
  /**
   * Creates an empty Bounds class
   */
  ;

  Bounds.empty = function empty() {
    return new Bounds();
  }
  /**
   * Creates a Bounds class from the window's dimensions
   * @param environment reference to the window-object (needed when working with iframes for instance). Defaults to `window`
   */
  ;

  Bounds.fromWindow = function fromWindow(environment) {
    var _ref2 = environment || {},
        _ref2$innerWidth = _ref2.innerWidth,
        width = _ref2$innerWidth === void 0 ? 0 : _ref2$innerWidth,
        _ref2$innerHeight = _ref2.innerHeight,
        height = _ref2$innerHeight === void 0 ? 0 : _ref2$innerHeight;

    return new Bounds({
      width: width,
      height: height,
      right: width,
      bottom: height
    });
  };

  function Bounds(bounds) {
    if (bounds === void 0) {
      bounds = {};
    }

    this.top = void 0;
    this.left = void 0;
    this.right = void 0;
    this.bottom = void 0;
    this.width = void 0;
    this.height = void 0;
    return Object.assign(this, EMPTY, bounds);
  }
  /**
   * Returns the square surface of the bounds in pixels
   */


  var _proto = Bounds.prototype;

  /**
   * Returns a plain object containing only positional properties
   */
  _proto.toObject = function toObject() {
    return boundsToObject(this);
  };

  _proto.merge = function merge(partialBoundsOrMergeFn) {
    var current = this.toObject();
    return new Bounds(_extends({}, current, typeof partialBoundsOrMergeFn === "function" ? partialBoundsOrMergeFn(current) : partialBoundsOrMergeFn));
  }
  /**
   * Return a new Bounds instance by subtracting each property of the provided IBounds object
   * @param bounds partial IBounds object to substract with
   */
  ;

  _proto.substract = function substract(bounds) {
    var result = this.toObject();
    var entries = Object.entries(bounds);

    for (var _i = 0, _entries = entries; _i < _entries.length; _i++) {
      var _entries$_i = _entries[_i],
          prop = _entries$_i[0],
          value = _entries$_i[1];

      if (prop in BoundSide) {
        // if `prop` is one of 'top', 'left', 'bottom' or 'right'...
        var boundSide = BoundSide[prop]; // decide if we should add or substract

        result[prop] += boundSide.factor(value); // make sure that the size-properties are also updated

        result[boundSide.isHorizontal ? "width" : "height"] -= value;
      } else {
        // prop is 'width' or 'height'
        result[prop] -= value || 0;
      }
    }

    return new Bounds(result);
  }
  /**
   * Returns a new BoundsOffsets instance by determining the distance for each bound-side:
   * (child -> parent)
   * @param child child bounds instance
   */
  ;

  _proto.offsetsTo = function offsetsTo(child) {
    return new BoundsOffsets({
      top: child.top - this.top,
      bottom: this.bottom - child.bottom,
      left: child.left - this.left,
      right: this.right - child.right
    });
  }
  /**
   * Return a new Bounds instance by mapping over each bound-side
   * @param mapper callback that takes a boundSide + value in pixels, returning a new value for that side
   */
  ;

  _proto.mapSides = function mapSides(mapper) {
    var result = this.toObject();
    var boundSides = Object.values(BoundSide);

    for (var _i2 = 0, _boundSides = boundSides; _i2 < _boundSides.length; _i2++) {
      var boundSide = _boundSides[_i2];
      result[boundSide.prop] = mapper(boundSide, result[boundSide.prop]);
    }

    return new Bounds(result);
  };

  _createClass(Bounds, [{
    key: "surface",
    get: function get() {
      return this.width * this.height;
    }
  }]);

  return Bounds;
}();

/**
 * Class for various calculations based on a placement-type. I.e 'top-left';
 */

var Placement = /*#__PURE__*/function () {
  function Placement(primary, secondary, subjectBounds, layerDimensions, offsets) {
    this.primary = void 0;
    this.secondary = void 0;
    this.offsets = void 0;
    this.subjectsBounds = void 0;
    this._cachedLayerBounds = null;
    this._cachedContainerOffsets = null;
    this.primary = primary;
    this.secondary = secondary;
    this.offsets = offsets;
    this.setSubjectsBounds(subjectBounds, layerDimensions);
  }
  /**
   * Set subjectsBounds that are specific for this placement
   * @param subjectBounds original SubjectBounds instance
   * @param layerDimensions possible config prodvided by the user
   */


  var _proto = Placement.prototype;

  _proto.setSubjectsBounds = function setSubjectsBounds(subjectBounds, layerDimensions) {
    // if user did not provide any layerDimensions config...
    if (!layerDimensions) {
      this.subjectsBounds = subjectBounds;
      return;
    } // get anticipated layer-dimensions provided by the user


    var dimensions = // if the user passed a callback, call it with the layerSide corresponding to
    // the placement
    typeof layerDimensions === "function" ? layerDimensions(this.primary.prop) : layerDimensions; // create new SubjectsBounds instance by merging our newly create layer-bounds

    this.subjectsBounds = subjectBounds.merge({
      layer: _extends({}, subjectBounds.layer, dimensions)
    });
  }
  /**
   * Returns the string respresentation of this placement (ie. 'top-start')
   */
  ;

  /**
   * Calculates the actual boundaries based on the placement
   * @param secondaryOffset optional offset on the secondary-side
   */
  _proto.getLayerBounds = function getLayerBounds(secondaryOffset) {
    if (secondaryOffset === void 0) {
      secondaryOffset = 0;
    }

    // return cached version if possible
    if (this._cachedLayerBounds && secondaryOffset === 0) {
      return this._cachedLayerBounds;
    }

    var primary = this.primary,
        secondary = this.secondary,
        subjectsBounds = this.subjectsBounds;
    var trigger = subjectsBounds.trigger,
        layer = subjectsBounds.layer,
        arrow = subjectsBounds.arrow;
    var isHorizontal = primary.isHorizontal,
        oppositeCssProp = primary.oppositeCssProp,
        oppositeSizeProp = primary.oppositeSizeProp,
        prop = primary.prop,
        opposite = primary.opposite;
    var result = Bounds.empty(); // let's take the placement 'top-start' as an example...
    // the offsets are the following:
    // trigger -> 8px
    // container -> 10px;
    // arrow -> 2px;
    // PRIMARY STUFF
    // bottom = trigger.top + 8;

    result[opposite.prop] = trigger[prop] - primary.factor(this.offsets.trigger); // top = bottom - layer.height

    result[prop] = result[opposite.prop] - primary.factor(layer[primary.sizeProp]); // SECONDARY STUFF
    // arrowOffsetBase = 4

    var arrowOffsetBase = this.offsets.arrow * 2; // limitMin = trigger.left - (layer.width - arrow.width) + 4

    var limitMin = trigger[oppositeCssProp] - (layer[oppositeSizeProp] - arrow[oppositeSizeProp]) + arrowOffsetBase; // limitMax = trigger.left + (trigger.width - arrow.width) - 4

    var limitMax = trigger[oppositeCssProp] + (trigger[oppositeSizeProp] - arrow[oppositeSizeProp]) - arrowOffsetBase;

    if (!secondary.isPush) {
      // if secondary is bottom or right -> add the width or height of the layer
      limitMin += layer[oppositeSizeProp];
      limitMax += layer[oppositeSizeProp];
    }

    if (secondary.isCenter) {
      var propertyA = (isHorizontal ? BoundSide.top : BoundSide.left).prop;
      var propertyB = (isHorizontal ? BoundSide.bottom : BoundSide.right).prop; // left = limit(
      //   trigger.left + trigger.width / 2 - layer.width / 2 + secondaryOffset,
      //   limitMin,
      //   limitMax
      // )

      result[propertyA] = limit(trigger[propertyA] + trigger[oppositeSizeProp] / 2 - layer[oppositeSizeProp] / 2 + secondaryOffset, limitMin, limitMax); // right = left + layer.width

      result[propertyB] = result[propertyA] + layer[oppositeSizeProp];
    } else {
      var sec = secondary;
      var triggerValue = trigger[sec.prop]; // Under some conditions, when the layer is not able to align with the trigger
      // due to arrow-size and arrow-offsets, we need to compensate.
      // Otherwise, the secondary-offset will have no impact

      var arrowCompensation = triggerValue < limitMin ? limitMin - triggerValue : triggerValue > limitMax ? limitMax - triggerValue : 0; // left = limit(
      //   trigger.left + secondaryOffset + arrowCompensation,
      //   limitMin,
      //   limitMax
      // )

      result[sec.prop] = limit(triggerValue + secondaryOffset + arrowCompensation, limitMin, limitMax); // right = left + layer.width

      result[sec.opposite.prop] = result[sec.prop] + secondary.factor(layer[oppositeSizeProp]);
    } // set the correct dimensions


    result.width = result.right - result.left;
    result.height = result.bottom - result.top; // create new bounds object

    var layerBounds = Bounds.create(result);

    if (secondaryOffset === 0) {
      this._cachedLayerBounds = layerBounds;
    }

    return layerBounds;
  }
  /**
   * Checks whether the trigger is bigger on the opposite side
   * ie. placement "top-start" -> has trigger a bigger width?
   */
  ;

  /**
   * returns getLayerBounds(), including container-offsets
   */
  _proto.getLayerCollisionBounds = function getLayerCollisionBounds() {
    var container = this.offsets.container;
    return this.getLayerBounds().mapSides(function (side, value) {
      return value -= side.factor(container);
    }).merge(function (_ref) {
      var width = _ref.width,
          height = _ref.height;
      return {
        width: width + container * 2,
        height: height + container * 2
      };
    });
  }
  /**
   * Returns a BoundsOffsets instance containing merged offsets to containers with the most
   * negative scenario
   */
  ;

  _proto.getContainerOffsets = function getContainerOffsets(layerBounds) {
    if (this._cachedContainerOffsets && !layerBounds) {
      return this._cachedContainerOffsets;
    }

    var subjectBounds = this.subjectsBounds.merge({
      layer: layerBounds || this.getLayerCollisionBounds()
    });
    var offsets = BoundsOffsets.mergeSmallestSides(subjectBounds.layerOffsetsToScrollContainers);

    if (!layerBounds) {
      this._cachedContainerOffsets = offsets;
    }

    return offsets;
  };

  _createClass(Placement, [{
    key: "type",
    get: function get() {
      return this.primary.prop + "-" + (this.secondary.prop === "center" ? "center" : ["bottom", "right"].includes(this.secondary.prop) ? "end" : "start");
    }
  }, {
    key: "triggerIsBigger",
    get: function get() {
      var isHorizontal = this.secondary.isHorizontal;
      var _this$subjectsBounds = this.subjectsBounds,
          triggerHasBiggerWidth = _this$subjectsBounds.triggerHasBiggerWidth,
          triggerHasBiggerHeight = _this$subjectsBounds.triggerHasBiggerHeight;
      return isHorizontal && triggerHasBiggerWidth || !isHorizontal && triggerHasBiggerHeight;
    }
    /**
     * Checks whether the placement fits within all it's container (including container-offset)
     */

  }, {
    key: "fitsContainer",
    get: function get() {
      return this.getContainerOffsets().allSidesArePositive;
    }
    /**
     * Returns the surface in square pixels of the visible part of the layer
     */

  }, {
    key: "visibleSurface",
    get: function get() {
      var layerBounds = this.getLayerBounds();
      var containerOffsets = this.getContainerOffsets(layerBounds);
      var substract = containerOffsets.negativeSides;

      for (var side in substract) {
        // @ts-ignore
        substract[side] = -substract[side]; // make positive for substraction;
      }

      return layerBounds.substract(substract).surface;
    }
    /**
     * Returns a BoundSide by looking at the most negative offset that is the opposite direction
     */

  }, {
    key: "secondaryOffsetSide",
    get: function get() {
      var _Object$entries$map$f,
          _Object$entries$map$f2,
          _this = this;

      // Given placement 'top-start' and containerOffsets { left: -20, top: -10, right: -10, bottom: 200 }...
      // the only negative offsets on the opposite side are { left: -20, right: -10 }
      // since we have to return only 1 side, we pick the most negative, which is 'left'
      var containerOffsets = this.getContainerOffsets();

      var _ref2 = (_Object$entries$map$f = (_Object$entries$map$f2 = Object.entries(containerOffsets.negativeSides).map(function (_ref3) {
        var side = _ref3[0],
            value = _ref3[1];
        return [BoundSide[side], value];
      }).filter(function (_ref4) {
        var side = _ref4[0];
        return _this.primary.isOppositeDirection(side);
      }).sort(function (_ref5, _ref6) {
        var a = _ref5[1];
        var b = _ref6[1];
        return b - a;
      })) == null ? void 0 : _Object$entries$map$f2[0]) != null ? _Object$entries$map$f : [],
          mostNegativeSide = _ref2[0];

      return mostNegativeSide || null;
    }
  }]);

  return Placement;
}();
var PlacementCenter = /*#__PURE__*/function (_Placement) {
  _inheritsLoose(PlacementCenter, _Placement);

  function PlacementCenter() {
    return _Placement.apply(this, arguments) || this;
  }

  var _proto2 = PlacementCenter.prototype;

  _proto2.getLayerBounds = function getLayerBounds() {
    var _this$subjectsBounds2 = this.subjectsBounds,
        trigger = _this$subjectsBounds2.trigger,
        layer = _this$subjectsBounds2.layer;
    var result = Bounds.empty();
    result.top = trigger.top + trigger.height / 2 - layer.height / 2;
    result.bottom = result.top + layer.height;
    result.left = trigger.left + trigger.width / 2 - layer.width / 2;
    result.right = result.left + layer.width;
    result.width = result.right - result.left;
    result.height = result.bottom - result.top;
    return result;
  };

  return PlacementCenter;
}(Placement);

function getNegativeOffsetBetweenLayerCenterAndTrigger(subjectsBounds, placement, arrowOffset) {
  var layer = subjectsBounds.layer,
      trigger = subjectsBounds.trigger,
      arrow = subjectsBounds.arrow;
  var sizeProperty = placement.primary.oppositeSizeProp;

  var _ref = !placement.primary.isHorizontal ? ["left", "right"] : ["top", "bottom"],
      sideA = _ref[0],
      sideB = _ref[1];

  var offsetA = layer[sideA] + layer[sizeProperty] / 2 - trigger[sideA] - arrow[sizeProperty] / 2 - arrowOffset;
  var offsetB = layer[sideB] - layer[sizeProperty] / 2 - trigger[sideB] + arrow[sizeProperty] / 2 + arrowOffset;
  return (offsetA < 0 ? -offsetA : 0) + (offsetB > 0 ? -offsetB : 0);
}

var STYLE_BASE = {
  position: "absolute",
  willChange: "top, left",
  left: null,
  right: null,
  top: null,
  bottom: null
};
function getArrowStyle(subjectsBounds, placement, arrowOffset) {
  var _extends2;

  if (placement.primary.isCenter) {
    return STYLE_BASE;
  }

  var layer = subjectsBounds.layer,
      trigger = subjectsBounds.trigger,
      arrow = subjectsBounds.arrow;
  var sizeProperty = placement.primary.oppositeSizeProp;
  var triggerIsBigger = trigger[sizeProperty] > layer[sizeProperty];
  var min = arrowOffset + arrow[sizeProperty] / 2;
  var max = layer[sizeProperty] - arrow[sizeProperty] / 2 - arrowOffset;
  var negativeOffset = getNegativeOffsetBetweenLayerCenterAndTrigger(subjectsBounds, placement, arrowOffset);
  var primarySide = placement.primary.prop;
  var secondarySide = placement.primary.oppositeCssProp;
  var secondaryValue = triggerIsBigger ? layer[sizeProperty] / 2 + negativeOffset : trigger[secondarySide] + trigger[sizeProperty] / 2 - layer[secondarySide];
  return _extends({}, STYLE_BASE, (_extends2 = {}, _extends2[primarySide] = "100%", _extends2[secondarySide] = limit(secondaryValue, min, max), _extends2));
}

/**
 * Class mostly concerned about calculating and finding the right placement
 */

var Placements = /*#__PURE__*/function () {
  function Placements(placements, config, subjectsBounds) {
    this.placements = void 0;
    this.config = void 0;
    this.subjectsBounds = void 0;
    this.placements = placements;
    this.config = config;
    this.subjectsBounds = subjectsBounds;
  }
  /**
   * Converts a placement-type into a primary-side and a secondary-side
   */


  Placements.getSidesFromPlacementType = function getSidesFromPlacementType(type) {
    var _type$split = type.split("-"),
        a = _type$split[0],
        b = _type$split[1];

    var primary = BoundSide[a];
    var secondary;

    if (b === "center") {
      secondary = Side.center;
    } else if (primary.isHorizontal) {
      secondary = b === "start" ? Side.top : Side.bottom;
    } else {
      secondary = b === "start" ? Side.left : Side.right;
    }

    return [primary, secondary];
  }
  /**
   * Main static method to create a Placements instance
   * @param subjectsBounds instance of the SubjectsBounds class
   * @param config config provided by the user
   */
  ;

  Placements.create = function create(subjectsBounds, config) {
    // create offsets-object from user config
    var offsets = {
      arrow: config.arrowOffset,
      container: config.containerOffset,
      trigger: config.triggerOffset
    }; // function which creates a prioritized list of possible placments
    // by looking at user-config

    function getListOfPlacements(preferedPlacement) {
      if (preferedPlacement === void 0) {
        preferedPlacement = config.placement;
      }

      var _Placements$getSidesF = Placements.getSidesFromPlacementType(preferedPlacement),
          primary = _Placements$getSidesF[0],
          secondary = _Placements$getSidesF[1];

      var preferredSide = BoundSide[primary.isHorizontal ? config.preferY : config.preferX]; // some priorities may alter when the trigger is bigger

      var triggerIsBigger = !primary.isHorizontal && subjectsBounds.triggerHasBiggerWidth || primary.isHorizontal && subjectsBounds.triggerHasBiggerHeight; // utility function which constructs a placement by primary and secondary sides

      function placementFrom(primary, secondary) {
        return new Placement(primary, secondary, subjectsBounds, config.layerDimensions, offsets);
      } // creating the list


      var list = [];
      list[0] = placementFrom(primary, secondary);
      list[1] = placementFrom(primary, secondary.isCenter ? preferredSide : Side.center);
      list[2] = placementFrom(primary, Side[(secondary.opposite.isCenter ? preferredSide.opposite : secondary.opposite).prop]);
      list[3] = placementFrom(preferredSide, triggerIsBigger ? primary : Side[primary.opposite.prop]);
      list[4] = placementFrom(preferredSide, Side.center);
      list[5] = placementFrom(preferredSide, triggerIsBigger ? Side[primary.opposite.prop] : primary);
      list[6] = placementFrom(BoundSide[preferredSide.opposite.prop], triggerIsBigger ? primary : Side[primary.opposite.prop]);
      list[7] = placementFrom(BoundSide[preferredSide.opposite.prop], Side.center);
      list[8] = placementFrom(BoundSide[preferredSide.opposite.prop], triggerIsBigger ? Side[primary.opposite.prop] : primary);
      list[9] = placementFrom(BoundSide[primary.opposite.prop], secondary);
      list[10] = placementFrom(BoundSide[primary.opposite.prop], secondary.isCenter ? preferredSide : Side.center);
      list[11] = placementFrom(BoundSide[primary.opposite.prop], Side[(secondary.opposite.isCenter ? preferredSide.opposite : secondary.opposite).prop]); // only include placements that are part of 'possible-placements'

      list = list.filter(function (placement) {
        return placement.type === config.placement || config.possiblePlacements.includes(placement.type);
      });
      return list;
    } // treat placement 'center' a little bit different


    if (config.placement === "center") {
      return new Placements([new PlacementCenter(Side.center, Side.center, subjectsBounds, config.layerDimensions, offsets)].concat(getListOfPlacements(config.preferY + "-" + config.preferX)), config, subjectsBounds);
    }

    return new Placements(getListOfPlacements(), config, subjectsBounds);
  };

  var _proto = Placements.prototype;

  _proto.filterPlacementsBySide = function filterPlacementsBySide(side) {
    return this.placements.filter(function (placement) {
      return placement.primary === side;
    });
  };

  _proto.findFirstPlacementThatFits = function findFirstPlacementThatFits() {
    return this.placements.find(function (placement) {
      return placement.fitsContainer;
    });
  };

  _proto.placementWithBiggestVisibleSurface = function placementWithBiggestVisibleSurface() {
    var _this$placements$map$ = this.placements.map(function (placement) {
      return {
        placement: placement,
        surface: placement.visibleSurface
      };
    }) // sort -> biggest surface first
    . // sort -> biggest surface first
    sort(function (a, b) {
      return b.surface - a.surface;
    }),
        placementWithBiggestSurface = _this$placements$map$[0].placement;

    return placementWithBiggestSurface;
  };

  _proto.findSuitablePlacement = function findSuitablePlacement() {
    if (!this.config.auto) {
      return this.placements[0];
    }

    return this.findFirstPlacementThatFits() || this.placementWithBiggestVisibleSurface();
  }
  /**
   * secondary offset: the number of pixels between the edge of the
   * scroll-container and the current placement, on the side of the layer
   * that didn't fit.
   * Eventually this secondary offset gets added / subtracted from the
   * placement that does fit in order to move the layer closer to the
   * position of the placement that just would not fit.
   * This creates the effect that the layer is moving gradually from one
   * placement to the next as the users scrolls the page or scroll-container
   */
  ;

  _proto.getSecondaryOffset = function getSecondaryOffset(placement) {
    var _this$config = this.config,
        auto = _this$config.auto,
        snap = _this$config.snap; // return early when we're not interested...

    if (!auto || snap || placement instanceof PlacementCenter) {
      return 0;
    } // if current placement fits and is prefered placement...
    // return early


    var placementsOnSameSide = this.filterPlacementsBySide(placement.primary);
    var currentPlacementHasHighestPriority = placementsOnSameSide.indexOf(placement) === 0;

    if (currentPlacementHasHighestPriority && placement.fitsContainer) {
      return 0;
    }

    var firstPlacementThatDoesNotFit = placementsOnSameSide.find(function (placement) {
      return !placement.fitsContainer;
    });

    if (!firstPlacementThatDoesNotFit) {
      return 0;
    }

    var secondaryOffsetSide = firstPlacementThatDoesNotFit.secondaryOffsetSide;

    if (!secondaryOffsetSide) {
      return 0;
    }

    var containerOffsets = placement.getContainerOffsets(); // determine whether we should add or substract the secondary-offset

    var secondary = placement.secondary;
    var factor;

    if (placement.triggerIsBigger || firstPlacementThatDoesNotFit === placement) {
      factor = secondaryOffsetSide.isPush ? -1 : 1;
    } else {
      factor = secondary === Side.left || [Side.top, Side.center].includes(secondary) && secondaryOffsetSide.isPush ? -1 : 1;
    } // get number of pixels between placement that did not fit and current
    // placement


    var secondaryOffset = containerOffsets[secondaryOffsetSide.prop];
    return secondaryOffset * factor;
  };

  _proto.getStyles = function getStyles(layerBounds, placement, scrollOffsets, borderOffsets) {
    var layerStyleBase = {
      willChange: "top, left, width, height"
    };
    var arrow = getArrowStyle(this.subjectsBounds.merge({
      layer: layerBounds
    }), placement, this.config.arrowOffset);
    var layer = this.config.overflowContainer ? _extends({}, layerStyleBase, {
      position: "fixed",
      top: layerBounds.top,
      left: layerBounds.left
    }) : _extends({}, layerStyleBase, {
      position: "absolute",
      top: layerBounds.top - this.subjectsBounds.parent.top + scrollOffsets.top - borderOffsets.top,
      left: layerBounds.left - this.subjectsBounds.parent.left + scrollOffsets.left - borderOffsets.left
    });
    return {
      arrow: arrow,
      layer: layer
    };
  };

  _proto.getHasDisappeared = function getHasDisappeared(layerBounds) {
    var subject = this.config.overflowContainer ? this.subjectsBounds.trigger : layerBounds;
    var containerOffsets = BoundsOffsets.mergeSmallestSides(this.subjectsBounds.offsetsToScrollContainers(subject, true));
    var entries = Object.entries(containerOffsets.negativeSides);
    var hasFullyDisappeared = entries.some(function (_ref) {
      var prop = _ref[0],
          value = _ref[1];
      var side = BoundSide[prop];
      return value <= -subject[side.sizeProp];
    });

    if (hasFullyDisappeared) {
      return "full";
    }

    if (!containerOffsets.allSidesArePositive) {
      return "partial";
    }

    return null;
  };

  _proto.result = function result(scrollOffsets, borderOffsets) {
    var suitablePlacement = this.findSuitablePlacement();
    var secondaryOffset = this.getSecondaryOffset(suitablePlacement);
    var layerBounds = suitablePlacement.getLayerBounds(secondaryOffset);
    var styles = this.getStyles(layerBounds, suitablePlacement, scrollOffsets, borderOffsets);
    var layerSide = suitablePlacement.primary.prop;
    return {
      styles: styles,
      layerSide: layerSide,
      placement: suitablePlacement,
      layerBounds: layerBounds,
      hasDisappeared: this.getHasDisappeared(layerBounds)
    };
  };

  return Placements;
}();

var SubjectsBounds = /*#__PURE__*/function () {
  function SubjectsBounds(subjectsBounds, overflowContainer) {
    this.overflowContainer = void 0;
    this.trigger = void 0;
    this.layer = void 0;
    this.arrow = void 0;
    this.parent = void 0;
    this.window = void 0;
    this.scrollContainers = void 0;
    this.overflowContainer = overflowContainer;
    Object.assign(this, subjectsBounds);
  }

  SubjectsBounds.create = function create(environment, layer, trigger, parent, arrow, scrollContainers, overflowContainer, getTriggerBounds) {
    var window = Bounds.fromWindow(environment);
    return new SubjectsBounds({
      layer: Bounds.fromElement(layer, {
        environment: environment,
        withTransform: false
      }),
      trigger: getTriggerBounds ? Bounds.create(boundsToObject(getTriggerBounds())) : Bounds.fromElement(trigger),
      arrow: arrow ? Bounds.fromElement(arrow) : Bounds.empty(),
      parent: parent ? Bounds.fromElement(parent) : window,
      window: window,
      scrollContainers: [window].concat(scrollContainers.map(function (container) {
        return Bounds.fromElement(container, {
          withScrollbars: false
        });
      }))
    }, overflowContainer);
  };

  var _proto = SubjectsBounds.prototype;

  _proto.merge = function merge(subjectsBounds) {
    return new SubjectsBounds(_extends({}, this, subjectsBounds), this.overflowContainer);
  };

  _proto.offsetsToScrollContainers = function offsetsToScrollContainers(subject, allContainers) {
    if (allContainers === void 0) {
      allContainers = false;
    }

    var scrollContainers = this.overflowContainer && !allContainers ? [this.window] : this.scrollContainers;
    return scrollContainers.map(function (scrollContainer) {
      return scrollContainer.offsetsTo(subject);
    });
  };

  _createClass(SubjectsBounds, [{
    key: "layerOffsetsToScrollContainers",
    get: function get() {
      return this.offsetsToScrollContainers(this.layer);
    }
  }, {
    key: "triggerHasBiggerWidth",
    get: function get() {
      return this.trigger.width > this.layer.width;
    }
  }, {
    key: "triggerHasBiggerHeight",
    get: function get() {
      return this.trigger.height > this.layer.height;
    }
  }]);

  return SubjectsBounds;
}();

var GLOBAL_CONTAINER = null;
function setGlobalContainer(container) {
  if (typeof document === "undefined") {
    return;
  }

   false ? 0 : void 0;

  if (typeof container === "function") {
    GLOBAL_CONTAINER = container();
  } else if (typeof container === "string") {
    GLOBAL_CONTAINER = document.getElementById(container);
  } else {
    GLOBAL_CONTAINER = container;
  }

   false ? 0 : void 0;
}
var DEFAULT_OPTIONS = {
  auto: false,
  arrowOffset: 0,
  containerOffset: 10,
  triggerOffset: 0,
  overflowContainer: true,
  placement: "top-center",
  possiblePlacements: PLACEMENT_TYPES,
  preferX: "right",
  preferY: "bottom",
  snap: false,
  container: undefined,
  trigger: undefined
};
function useLayer(_ref) {
  var _triggerBoundsRef$cur;

  var _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
      _ref$overflowContaine = _ref.overflowContainer,
      overflowContainer = _ref$overflowContaine === void 0 ? DEFAULT_OPTIONS.overflowContainer : _ref$overflowContaine,
      _ref$environment = _ref.environment,
      environment = _ref$environment === void 0 ? typeof window !== "undefined" ? window : undefined : _ref$environment,
      ResizeObserverPolyfill = _ref.ResizeObserver,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? DEFAULT_OPTIONS.placement : _ref$placement,
      _ref$possiblePlacemen = _ref.possiblePlacements,
      possiblePlacements = _ref$possiblePlacemen === void 0 ? DEFAULT_OPTIONS.possiblePlacements : _ref$possiblePlacemen,
      _ref$preferX = _ref.preferX,
      preferX = _ref$preferX === void 0 ? DEFAULT_OPTIONS.preferX : _ref$preferX,
      _ref$preferY = _ref.preferY,
      preferY = _ref$preferY === void 0 ? DEFAULT_OPTIONS.preferY : _ref$preferY,
      _ref$auto = _ref.auto,
      auto = _ref$auto === void 0 ? DEFAULT_OPTIONS.auto : _ref$auto,
      _ref$snap = _ref.snap,
      snap = _ref$snap === void 0 ? DEFAULT_OPTIONS.snap : _ref$snap,
      _ref$triggerOffset = _ref.triggerOffset,
      triggerOffset = _ref$triggerOffset === void 0 ? DEFAULT_OPTIONS.triggerOffset : _ref$triggerOffset,
      _ref$containerOffset = _ref.containerOffset,
      containerOffset = _ref$containerOffset === void 0 ? DEFAULT_OPTIONS.containerOffset : _ref$containerOffset,
      _ref$arrowOffset = _ref.arrowOffset,
      arrowOffset = _ref$arrowOffset === void 0 ? DEFAULT_OPTIONS.arrowOffset : _ref$arrowOffset,
      _ref$container = _ref.container,
      container = _ref$container === void 0 ? DEFAULT_OPTIONS.container : _ref$container,
      _ref$layerDimensions = _ref.layerDimensions,
      layerDimensions = _ref$layerDimensions === void 0 ? null : _ref$layerDimensions,
      onDisappear = _ref.onDisappear,
      onOutsideClick = _ref.onOutsideClick,
      onParentClose = _ref.onParentClose,
      triggerOption = _ref.trigger;

  // initialize styles
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
    return {
      layerSide: placement === "center" ? "center" : Placements.getSidesFromPlacementType(placement)[0].prop,
      styles: {
        layer: {
          position: overflowContainer ? "fixed" : "absolute",
          top: 0,
          left: 0
        },
        arrow: {
          position: "absolute",
          top: 0,
          left: 0
        }
      }
    };
  }),
      state = _useState[0],
      setState = _useState[1];

  var triggerBoundsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // tracks state in order for us to use read inside functions that require dependencies,
  // like `useCallback`, without triggering an update

  var lastState = useLastState(state, isOpen); // keeps track of scheduled animation-frames

  var raf = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      // when this hook unmounts, make sure to cancel any scheduled animation-frames
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, []); // Most important function regarding positioning
  // It receives boundaries collected by `useTrackElements`, does some calculations,
  // sets new styles, and handles when a layer has disappeared.

  var handlePositioning = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function handlePositioning(_ref2, scrollOffsets, borderOffsets) {
    var arrow = _ref2.arrow,
        layer = _ref2.layer,
        scrollContainers = _ref2.scrollContainers,
        trigger = _ref2.trigger;
    var parent = scrollContainers[0];
    var subjectsBounds = SubjectsBounds.create(environment, layer, trigger, parent, arrow, scrollContainers, overflowContainer, triggerOption == null ? void 0 : triggerOption.getBounds);
    var config = {
      placement: placement,
      possiblePlacements: possiblePlacements,
      auto: auto,
      layerDimensions: layerDimensions,
      arrowOffset: arrowOffset,
      containerOffset: containerOffset,
      triggerOffset: triggerOffset,
      preferX: preferX,
      preferY: preferY,
      snap: snap,
      overflowContainer: overflowContainer
    };

    var _Placements$create$re = Placements.create(subjectsBounds, config).result(scrollOffsets, borderOffsets),
        hasDisappeared = _Placements$create$re.hasDisappeared,
        layerSide = _Placements$create$re.layerSide,
        styles = _Placements$create$re.styles;

    var newState = {
      layerSide: layerSide,
      styles: styles
    };

    if (!lastState.current || didStateChange(lastState.current, newState)) {
      lastState.current = newState; // optimistically update lastState to prevent infinite loop

      /**
       * We're using requestAnimationFrame-features here to ensure that position updates will
       * happen max once per frame.
       * If during a frame there's already an update scheduled, the existing update will be cancelled
       * and the new update will take precedence.
       */

      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }

      raf.current = requestAnimationFrame(function () {
        setState(newState);
        raf.current = null;
      });
    }

    if (isSet(hasDisappeared) && isSet(onDisappear)) {
      onDisappear(hasDisappeared);
    }
  }, [arrowOffset, auto, containerOffset, environment, layerDimensions, onDisappear, overflowContainer, placement, possiblePlacements, preferX, preferY, snap, triggerOffset, lastState, triggerOption]);

  var _useTrackElements = useTrackElements({
    ResizeObserverPolyfill: ResizeObserverPolyfill,
    environment: environment,
    enabled: isOpen,
    overflowContainer: overflowContainer,
    onChange: handlePositioning,
    triggerOption: triggerOption
  }),
      triggerRef = _useTrackElements.triggerRef,
      layerRef = _useTrackElements.layerRef,
      arrowRef = _useTrackElements.arrowRef,
      closestScrollContainer = _useTrackElements.closestScrollContainer;

  var _useGroup = useGroup({
    isOpen: isOpen,
    onOutsideClick: onOutsideClick,
    onParentClose: onParentClose
  }),
      closeOnOutsideClickRefs = _useGroup.closeOnOutsideClickRefs,
      registrations = _useGroup.registrations;

  var props = {
    triggerProps: Boolean(triggerOption) ? {} // when using the `trigger` option, make `triggerProps` useless
    : {
      ref: mergeRefs(triggerRef, closeOnOutsideClickRefs.trigger, triggerBoundsRef)
    },
    layerProps: {
      ref: mergeRefs(layerRef, closeOnOutsideClickRefs.layer),
      style: state.styles.layer
    },
    arrowProps: {
      ref: arrowRef,
      style: state.styles.arrow,
      layerSide: state.layerSide
    },
    layerSide: state.layerSide,
    triggerBounds: isOpen ? triggerOption ? triggerOption.getBounds() : (_triggerBoundsRef$cur = triggerBoundsRef.current) == null ? void 0 : _triggerBoundsRef$cur.getBoundingClientRect() : null,
    renderLayer: function renderLayer(children) {
      return typeof document !== "undefined" ? (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GroupProvider, {
        registrations: registrations,
        children: children
      }), overflowContainer || !closestScrollContainer ? getContainerElement(container) : closestScrollContainer) : null;
    }
  };
  return props;
}

function didStateChange(previous, next) {
  if (previous.layerSide !== next.layerSide) {
    return true;
  }

  var styleProps = ["position", "top", "left", "right", "bottom"];

  for (var _i = 0, _styleProps = styleProps; _i < _styleProps.length; _i++) {
    var prop = _styleProps[_i];

    if (previous.styles.layer[prop] !== next.styles.layer[prop] || previous.styles.arrow[prop] !== next.styles.arrow[prop]) {
      return true;
    }
  }

  return false;
}

var DEFAULT_CONTAINER_ID = "layers";

function getContainerElement(container) {
  var element;

  if (typeof container === "function") {
    element = container();

    if (!element || !(element instanceof HTMLElement)) {
      throw new Error("react-laag: You've passed a function to the 'container' prop, but it returned no valid HTMLElement");
    }
  } else if (container instanceof HTMLElement) {
    element = container;
  } else if (typeof container === "string") {
    element = document.getElementById(container);

    if (!element) {
      throw new Error("react-laag: You've passed element with id '" + container + "' to the 'container' prop, but it returned no valid HTMLElement");
    }
  } else if (GLOBAL_CONTAINER instanceof HTMLElement) {
    return GLOBAL_CONTAINER;
  } else {
    element = document.getElementById(DEFAULT_CONTAINER_ID);

    if (!element) {
      element = document.createElement("div");
      element.id = DEFAULT_CONTAINER_ID;
      element.style.cssText = "\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        right: 0px;\n      ";
      document.body.appendChild(element);
    }
  }

  return element;
}

var _excluded = (/* unused pure expression or super */ null && (["size", "angle", "borderWidth", "borderColor", "roundness", "backgroundColor", "layerSide", "style"]));
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";
var RIGHT = "right";

function getWidthBasedOnAngle(angle, size) {
  return Math.tan(angle * (Math.PI / 180)) * size;
}

function getViewBox(sizeA, sizeB, side, borderWidth) {
  var _map;

  var map = (_map = {}, _map[BOTTOM] = "0 " + -borderWidth + " " + sizeB + " " + sizeA, _map[TOP] = "0 0 " + sizeB + " " + (sizeA + borderWidth), _map[RIGHT] = -borderWidth + " 0 " + sizeA + " " + sizeB, _map[LEFT] = "0 0 " + (sizeA + borderWidth) + " " + sizeB, _map);
  return map[side.prop];
}

function getTrianglePath(sizeA, sizeB, side, roundness, angle) {
  var _BOTTOM$TOP$RIGHT$LEF, _BOTTOM$TOP$RIGHT$LEF2, _BOTTOM$TOP$RIGHT$LEF3;

  var relativeRoundness = roundness / 10 * sizeA * 2;
  var A = (_BOTTOM$TOP$RIGHT$LEF = {}, _BOTTOM$TOP$RIGHT$LEF[BOTTOM] = [0, sizeA], _BOTTOM$TOP$RIGHT$LEF[TOP] = [0, 0], _BOTTOM$TOP$RIGHT$LEF[RIGHT] = [sizeA, sizeB], _BOTTOM$TOP$RIGHT$LEF[LEFT] = [0, sizeB], _BOTTOM$TOP$RIGHT$LEF)[side.prop].join(" ");
  var B = side.isHorizontal ? "V 0" : "H " + sizeB;
  var cPoint = sizeB / 2;
  var c1A = sizeB / 2 + getWidthBasedOnAngle(angle, sizeA / 8);
  var c1B = sizeA / 8;
  var C = (_BOTTOM$TOP$RIGHT$LEF2 = {}, _BOTTOM$TOP$RIGHT$LEF2[BOTTOM] = ["C", c1A, c1B, cPoint + relativeRoundness, 0, cPoint, 0], _BOTTOM$TOP$RIGHT$LEF2[TOP] = ["C", c1A, sizeA - c1B, cPoint + relativeRoundness, sizeA, cPoint, sizeA], _BOTTOM$TOP$RIGHT$LEF2[RIGHT] = ["C", c1B, sizeB - c1A, 0, cPoint - relativeRoundness, 0, cPoint], _BOTTOM$TOP$RIGHT$LEF2[LEFT] = ["C", sizeA - c1B, sizeB - c1A, sizeA, cPoint - relativeRoundness, sizeA, cPoint], _BOTTOM$TOP$RIGHT$LEF2)[side.prop].join(" ");
  var d1A = sizeB / 2 - getWidthBasedOnAngle(angle, sizeA / 8);
  var d1B = sizeA / 8;
  var D = (_BOTTOM$TOP$RIGHT$LEF3 = {}, _BOTTOM$TOP$RIGHT$LEF3[BOTTOM] = ["C", cPoint - relativeRoundness, 0, d1A, d1B, A], _BOTTOM$TOP$RIGHT$LEF3[TOP] = ["C", cPoint - relativeRoundness, sizeA, d1A, sizeA - d1B, A], _BOTTOM$TOP$RIGHT$LEF3[RIGHT] = ["C", 0, cPoint + relativeRoundness, d1B, sizeB - d1A, A], _BOTTOM$TOP$RIGHT$LEF3[LEFT] = ["C", sizeA, cPoint + relativeRoundness, sizeA - d1B, sizeB - d1A, A], _BOTTOM$TOP$RIGHT$LEF3)[side.prop].join(" ");
  return ["M", A, B, C, D].join(" ");
}

function getBorderMaskPath(sizeA, sizeB, borderWidth, side, angle) {
  var borderOffset = getWidthBasedOnAngle(angle, borderWidth);

  var _ref = !side.isPush ? [sizeA, sizeA - borderWidth] : [0, borderWidth],
      A = _ref[0],
      B = _ref[1];

  if (side.isHorizontal) {
    return ["M", A, borderWidth, "V", sizeB - borderWidth, "L", B, sizeB - borderWidth - borderOffset, "V", borderOffset + borderWidth, "Z"].join(" ");
  }

  return ["M", borderWidth, A, "H", sizeB - borderWidth, "L", sizeB - borderWidth - borderOffset, B, "H", borderOffset + borderWidth, "Z"].join(" ");
}

var Arrow = /*#__PURE__*/(/* unused pure expression or super */ null && (forwardRef(function Arrow(_ref2, ref) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 8 : _ref2$size,
      _ref2$angle = _ref2.angle,
      angle = _ref2$angle === void 0 ? 45 : _ref2$angle,
      _ref2$borderWidth = _ref2.borderWidth,
      borderWidth = _ref2$borderWidth === void 0 ? 0 : _ref2$borderWidth,
      _ref2$borderColor = _ref2.borderColor,
      borderColor = _ref2$borderColor === void 0 ? "black" : _ref2$borderColor,
      _ref2$roundness = _ref2.roundness,
      roundness = _ref2$roundness === void 0 ? 0 : _ref2$roundness,
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === void 0 ? "white" : _ref2$backgroundColor,
      _ref2$layerSide = _ref2.layerSide,
      layerSide = _ref2$layerSide === void 0 ? "top" : _ref2$layerSide,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded);

  if (layerSide === "center") {
    return null;
  }

  var side = BoundSide[layerSide];
  var sizeA = size;
  var sizeB = getWidthBasedOnAngle(angle, size) * 2;
  var maxSize = Math.max(sizeA, sizeB);
  return createElement("svg", _extends({
    ref: ref
  }, rest, {
    style: _extends({}, style, {
      transform: "translate" + (side.isHorizontal ? "Y" : "X") + "(-50%)"
    }),
    width: maxSize,
    height: maxSize,
    preserveAspectRatio: side.isPush ? "xMinYMin" : "xMaxYMax",
    viewBox: getViewBox(sizeA, sizeB, side, borderWidth)
  }), createElement("path", {
    fill: backgroundColor,
    strokeWidth: borderWidth,
    stroke: borderColor,
    d: getTrianglePath(sizeA, sizeB, side, roundness, angle)
  }), createElement("path", {
    fill: backgroundColor,
    d: getBorderMaskPath(sizeA, sizeB, borderWidth, side, angle)
  }));
})));

var Status;

(function (Status) {
  Status[Status["ENTERING"] = 0] = "ENTERING";
  Status[Status["LEAVING"] = 1] = "LEAVING";
  Status[Status["IDLE"] = 2] = "IDLE";
})(Status || (Status = {}));

function useHover(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$delayEnter = _ref.delayEnter,
      delayEnter = _ref$delayEnter === void 0 ? 0 : _ref$delayEnter,
      _ref$delayLeave = _ref.delayLeave,
      delayLeave = _ref$delayLeave === void 0 ? 0 : _ref$delayLeave,
      _ref$hideOnScroll = _ref.hideOnScroll,
      hideOnScroll = _ref$hideOnScroll === void 0 ? true : _ref$hideOnScroll;

  var _useState = useState(false),
      show = _useState[0],
      setShow = _useState[1];

  var timeout = useRef(null);
  var status = useRef(Status.IDLE);
  var hasTouchMoved = useRef(false);
  var removeTimeout = useCallback(function removeTimeout() {
    clearTimeout(timeout.current);
    timeout.current = null;
    status.current = Status.IDLE;
  }, []);

  function onMouseEnter() {
    // if was leaving, stop leaving
    if (status.current === Status.LEAVING && timeout.current) {
      removeTimeout();
    }

    if (show) {
      return;
    }

    status.current = Status.ENTERING;
    timeout.current = window.setTimeout(function () {
      setShow(true);
      timeout.current = null;
      status.current = Status.IDLE;
    }, delayEnter);
  }

  function onMouseLeave(_, immediate) {
    // if was waiting for entering,
    // clear timeout
    if (status.current === Status.ENTERING && timeout.current) {
      removeTimeout();
    }

    if (!show) {
      return;
    }

    if (immediate) {
      setShow(false);
      timeout.current = null;
      status.current = Status.IDLE;
      return;
    }

    status.current = Status.LEAVING;
    timeout.current = window.setTimeout(function () {
      setShow(false);
      timeout.current = null;
      status.current = Status.IDLE;
    }, delayLeave);
  } // make sure to clear timeout on unmount


  useEffect(function () {
    function onScroll() {
      if (show && hideOnScroll) {
        removeTimeout();
        setShow(false);
      }
    }

    function onTouchEnd() {
      if (show) {
        removeTimeout();
        setShow(false);
      }
    }

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("touchend", onTouchEnd, true);
    return function () {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("touchend", onTouchEnd, true);

      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [show, hideOnScroll, removeTimeout]);
  var hoverProps = {
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onTouchStart: function onTouchStart() {
      hasTouchMoved.current = false;
    },
    onTouchMove: function onTouchMove() {
      hasTouchMoved.current = true;
    },
    onTouchEnd: function onTouchEnd() {
      if (!hasTouchMoved.current && !show) {
        setShow(true);
      }

      hasTouchMoved.current = false;
    }
  };
  return [show, hoverProps, function () {
    return onMouseLeave(null, true);
  }];
}

/**
 * @deprecated
 * Note: this component is marked as deprecated and will be removed and a possible
 * future release
 */

function Transition(_ref) {
  var isOpenExternal = _ref.isOpen,
      children = _ref.children;

  var _useState = useState({
    isOpenInternal: isOpenExternal,
    isLeaving: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var didMount = useRef(false);
  useEffect(function () {
    if (isOpenExternal) {
      setState({
        isOpenInternal: true,
        isLeaving: false
      });
    } else if (didMount.current) {
      setState({
        isOpenInternal: false,
        isLeaving: true
      });
    }
  }, [isOpenExternal, setState]);
  useEffect(function () {
     false ? 0 : void 0;
  }, [children]);
  useEffect(function () {
    didMount.current = true;
  }, []);

  if (!isOpenExternal && !state.isOpenInternal && !state.isLeaving) {
    return null;
  }

  return children(state.isOpenInternal, function () {
    if (!state.isOpenInternal) {
      setState(function (s) {
        return _extends({}, s, {
          isLeaving: false
        });
      });
    }
  }, state.isLeaving);
}


//# sourceMappingURL=react-laag.esm.js.map


/***/ })

}]);
//# sourceMappingURL=2372.ce8426fd.iframe.bundle.js.map