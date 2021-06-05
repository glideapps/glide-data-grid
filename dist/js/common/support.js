"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidEmailAddress = isValidEmailAddress;
exports.checkBoolean = checkBoolean;
exports.checkString = checkString;
exports.checkNumber = checkNumber;
exports.isArray = isArray;
exports.checkArray = checkArray;
exports.proveType = proveType;
exports.proveNever = proveNever;
exports.panic = panic;
exports.assert = assert;
exports.assertNever = assertNever;
exports.defined = defined;
exports.nonNull = nonNull;
exports.isUndefinedish = isUndefinedish;
exports.isEmptyOrUndefined = isEmptyOrUndefined;
exports.isEmptyOrUndefinedish = isEmptyOrUndefinedish;
exports.nullToUndefined = nullToUndefined;
exports.definedMapWithDefault = definedMapWithDefault;
exports.definedishMapWithDefault = definedishMapWithDefault;
exports.truthify = truthify;
exports.fillArray = fillArray;
exports.dontAwait = dontAwait;
exports.removeArrayItem = removeArrayItem;
exports.maybe = maybe;
exports.disableBrowserAutocompleteToken = exports.MaxPinLifeMins = exports.emailDomainRegexp = exports.digitsAndLetters = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var digitsAndLetters = Array.from("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").sort().join("");
/* eslint-disable */

exports.digitsAndLetters = digitsAndLetters;
var emailDomainRegexp = /^@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
exports.emailDomainRegexp = emailDomainRegexp;
var emailAddressRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

function isValidEmailAddress(s) {
  return emailAddressRegexp.test(s);
} // FIXME: This doesn't belong here


var MaxPinLifeMins = 15; // This exists purely to prevent buggy autocomplete from putting postal codes in tab names.
//
// It would be real neat if Chrome supported actual web standards.
// You're supposed to be able to say `autocomplete="off"` as an attribute to disable it,
// but Chrome adamantly refuses to support this (see https://bugs.chromium.org/p/chromium/issues/detail?id=468153#c164)
// What they recommend we do instead is "set a semantic tag". So here's the semantic meaning of _this_ attribute:
// stop autocompleting, you jerks.
//
// This works in Chrome and Firefox, but not Safari. Right now, Safari autocomplete
// hasn't done anything catastrophic so we may just have to live with this.

exports.MaxPinLifeMins = MaxPinLifeMins;
var disableBrowserAutocompleteToken = "browsers-should-never-autocomplete-this";
exports.disableBrowserAutocompleteToken = disableBrowserAutocompleteToken;

function checkBoolean(x) {
  if (typeof x === "boolean") return x;
  return panic("Value should be a boolean: ".concat(x));
}

function checkString(x) {
  if (typeof x === "string") return x;
  return panic("Value should be a string: ".concat(x));
}

function checkNumber(x) {
  if (typeof x === "number") return x;
  return panic("Value should be a number: ".concat(x));
}

function isArray(x) {
  return Array.isArray(x);
}

function checkArray(x, checkItem) {
  if (!Array.isArray(x)) {
    return panic("Value should be an array: ".concat(x));
  }

  if (checkItem !== undefined) {
    x.forEach(checkItem);
  }

  return x;
}

function proveType(_val) {// do nothing, just prove the compiler thinks the types match
}

function proveNever(_never, _message, result) {
  return result;
}

function panic() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This should not happen";
  throw new Error(message);
}

function assert(fact) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Assertion failed";
  if (fact) return;
  return panic(message);
}

function assertNever(_never) {
  return panic("Hell froze over");
}

function defined(v, reason) {
  if (v === undefined) return panic("Value was undefined but should be defined" + (reason !== undefined ? ", expected to be defined because: ".concat(reason) : ""));
  return v;
}

function nonNull(v) {
  if (v === null) return panic("Value was null but should be non-null");
  return v;
}

function isUndefinedish(v) {
  return v === null || v === undefined;
}

function isEmptyOrUndefined(v) {
  return v === undefined || v.length === 0;
}

function isEmptyOrUndefinedish(v) {
  return v === undefined || v === null || v.length === 0;
}

function nullToUndefined(v) {
  if (v === null) return undefined;
  return v;
}

function definedMapWithDefault(v, defaultValue, f) {
  if (v === undefined) {
    return defaultValue;
  }

  return f(v);
}

function definedishMapWithDefault(v, defaultValue, f) {
  if (isUndefinedish(v)) {
    return defaultValue;
  }

  return f(v);
}

function truthify(x) {
  return !!x;
} // This makes it type-safe


function fillArray(length, value) {
  return new Array(length).fill(value);
}

function dontAwait(p) {
  p.catch(function (e) {
    throw e;
  });
}

function removeArrayItem(arr, index) {
  return [].concat(_toConsumableArray(arr.slice(0, index)), _toConsumableArray(arr.slice(index + 1)));
}

function maybe(fn, defaultValue) {
  try {
    var result = fn();
    return result;
  } catch (_unused) {
    return defaultValue;
  }
}