"use strict";
(self["webpackChunkroot"] = self["webpackChunkroot"] || []).push([[333],{

/***/ "./node_modules/react-number-format/dist/react-number-format.es.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
/**
 * react-number-format - 4.9.3
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016, 2022 to Sudhanshu Yadav, released under the MIT license.
 * https://github.com/s-yadav/react-number-format
 */



//     

                                                               

// basic noop function
function noop() {}
function returnTrue() {
  return true;
}

function charIsNumber(char         ) {
  return !!(char || '').match(/\d/);
}

function isNil(val     ) {
  return val === null || val === undefined;
}

function escapeRegExp(str        ) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function getThousandsGroupRegex(thousandsGroupStyle        ) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}

function applyThousandSeparator(
  str        ,
  thousandSeparator        ,
  thousandsGroupStyle        
) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator)
  );
}

//spilt a float number into different parts beforeDecimal, afterDecimal, and negation
function splitDecimal(numStr        , allowNegative) {
  if ( allowNegative === void 0 ) allowNegative          = true;

  var hasNagation = numStr[0] === '-';
  var addNegation = hasNagation && allowNegative;
  numStr = numStr.replace('-', '');

  var parts = numStr.split('.');
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || '';

  return {
    beforeDecimal: beforeDecimal,
    afterDecimal: afterDecimal,
    hasNagation: hasNagation,
    addNegation: addNegation,
  };
}

function fixLeadingZero(numStr         ) {
  if (!numStr) { return numStr; }
  var isNegative = numStr[0] === '-';
  if (isNegative) { numStr = numStr.substring(1, numStr.length); }
  var parts = numStr.split('.');
  var beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  var afterDecimal = parts[1] || '';

  return ("" + (isNegative ? '-' : '') + beforeDecimal + (afterDecimal ? ("." + afterDecimal) : ''));
}

/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
function limitToScale(numStr        , scale        , fixedDecimalScale         ) {
  var str = '';
  var filler = fixedDecimalScale ? '0' : '';
  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

function repeat(str, count) {
  return Array(count + 1).join(str);
}

function toNumericString(num) {
  num += ''; // typecast number to string

  // store the sign and remove it from the number.
  var sign = num[0] === '-' ? '-' : '';
  if (sign) { num = num.substring(1); }

  // split the number into cofficient and exponent
  var ref = num.split(/[eE]/g);
  var coefficient = ref[0];
  var exponent = ref[1];

  // covert exponent to number;
  exponent = Number(exponent);

  // if there is no exponent part or its 0, return the coffiecient with sign
  if (!exponent) { return sign + coefficient; }

  coefficient = coefficient.replace('.', '');

  /**
   * for scientific notation the current decimal index will be after first number (index 0)
   * So effective decimal index will always be 1 + exponent value
   */
  var decimalIndex = 1 + exponent;

  var coffiecientLn = coefficient.length;

  if (decimalIndex < 0) {
    // if decimal index is less then 0 add preceding 0s
    // add 1 as join will have
    coefficient = '0.' + repeat('0', Math.abs(decimalIndex)) + coefficient;
  } else if (decimalIndex >= coffiecientLn) {
    // if decimal index is less then 0 add leading 0s
    coefficient = coefficient + repeat('0', decimalIndex - coffiecientLn);
  } else {
    // else add decimal point at proper index
    coefficient =
      (coefficient.substring(0, decimalIndex) || '0') + '.' + coefficient.substring(decimalIndex);
  }

  return sign + coefficient;
}

/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
function roundToPrecision(numStr        , scale        , fixedDecimalScale         ) {
  //if number is empty don't do anything return empty string
  if (['', '-'].indexOf(numStr) !== -1) { return numStr; }

  var shoudHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;
  var ref = splitDecimal(numStr);
  var beforeDecimal = ref.beforeDecimal;
  var afterDecimal = ref.afterDecimal;
  var hasNagation = ref.hasNagation;
  var floatValue = parseFloat(("0." + (afterDecimal || '0')));
  var floatValueStr =
    afterDecimal.length <= scale ? ("0." + afterDecimal) : floatValue.toFixed(scale);
  var roundedDecimalParts = floatValueStr.split('.');
  var intPart = beforeDecimal
    .split('')
    .reverse()
    .reduce(function (roundedStr, current, idx) {
      if (roundedStr.length > idx) {
        return (
          (Number(roundedStr[0]) + Number(current)).toString() +
          roundedStr.substring(1, roundedStr.length)
        );
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);

  var decimalPart = limitToScale(
    roundedDecimalParts[1] || '',
    Math.min(scale, afterDecimal.length),
    fixedDecimalScale
  );
  var negation = hasNagation ? '-' : '';
  var decimalSeparator = shoudHaveDecimalSeparator ? '.' : '';
  return ("" + negation + intPart + decimalSeparator + decimalPart);
}

/** set the caret positon in an input field **/
function setCaretPosition(el                  , caretPos        ) {
  el.value = el.value;
  // ^ this is used to not only get 'focus', but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    }
    // (el.selectionStart === 0 added for Firefox bug)
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }

    // fail city, fortunately this never happens (as far as I've tested) :)
    el.focus();
    return false;
  }
}

/**
  Given previous value and newValue it returns the index
  start - end to which values have changed.
  This function makes assumption about only consecutive
  characters are changed which is correct assumption for caret input.
*/
function findChangedIndex(prevValue        , newValue        ) {
  var i = 0,
    j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) { i++; }

  //check what has been changed from last
  while (
    prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] &&
    newLength - j > i &&
    prevLength - j > i
  ) {
    j++;
  }

  return { start: i, end: prevLength - j };
}

/*
  Returns a number whose value is limited to the given range
*/
function clamp(num        , min        , max        ) {
  return Math.min(Math.max(num, min), max);
}

function getCurrentCaretPosition(el                  ) {
  /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
  return Math.max(el.selectionStart, el.selectionEnd);
}

function addInputMode(format                                   ) {
  return (
    format ||
    (typeof navigator !== 'undefined' &&
      !(navigator.platform && /iPhone|iPod/.test(navigator.platform)))
  );
}

//     
function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var defaultProps = {
  displayType: 'input',
  decimalSeparator: '.',
  thousandsGroupStyle: 'thousand',
  fixedDecimalScale: false,
  prefix: '',
  suffix: '',
  allowNegative: true,
  allowEmptyFormatting: false,
  allowLeadingZeros: false,
  isNumericString: false,
  type: 'text',
  onValueChange: noop,
  onChange: noop,
  onKeyDown: noop,
  onMouseUp: noop,
  onFocus: noop,
  onBlur: noop,
  isAllowed: returnTrue,
};
var NumberFormat = /*@__PURE__*/(function (superclass) {
  function NumberFormat(props        ) {
    superclass.call(this, props);
    var defaultValue = props.defaultValue;

    //validate props
    this.validateProps();

    var formattedValue = this.formatValueProp(defaultValue);

    this.state = {
      value: formattedValue,
      numAsString: this.removeFormatting(formattedValue),
      mounted: false,
    };

    this.selectionBeforeInput = {
      selectionStart: 0,
      selectionEnd: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  if ( superclass ) NumberFormat.__proto__ = superclass;
  NumberFormat.prototype = Object.create( superclass && superclass.prototype );
  NumberFormat.prototype.constructor = NumberFormat;

  NumberFormat.prototype.componentDidMount = function componentDidMount () {
    // set mounted state
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true,
    });
  };

  NumberFormat.prototype.componentDidUpdate = function componentDidUpdate (prevProps        ) {
    this.updateValueIfRequired(prevProps);
  };

  NumberFormat.prototype.componentWillUnmount = function componentWillUnmount () {
    clearTimeout(this.focusTimeout);
    clearTimeout(this.caretPositionTimeout);
  };

  NumberFormat.prototype.updateValueIfRequired = function updateValueIfRequired (prevProps        ) {
    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var focusedElm = ref.focusedElm;
    var stateValue = state.value;
    var lastNumStr = state.numAsString; if ( lastNumStr === void 0 ) lastNumStr = '';

    // If only state changed no need to do any thing
    if (prevProps !== props) {
      //validate props
      this.validateProps();

      var lastValueWithNewFormat = this.formatNumString(lastNumStr);

      var formattedValue = isNil(props.value) ? lastValueWithNewFormat : this.formatValueProp();
      var numAsString = this.removeFormatting(formattedValue);

      var floatValue = parseFloat(numAsString);
      var lastFloatValue = parseFloat(lastNumStr);

      if (
        //while typing set state only when float value changes
        ((!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue) ||
        //can also set state when float value is same and the format props changes
        lastValueWithNewFormat !== stateValue ||
        //set state always when not in focus and formatted value is changed
        (focusedElm === null && formattedValue !== stateValue)
      ) {
        this.updateValue({
          formattedValue: formattedValue,
          numAsString: numAsString,
          input: focusedElm,
          source: 'prop',
          event: null,
        });
      }
    }
  };

  /** Misc methods **/
  NumberFormat.prototype.getFloatString = function getFloatString (num) {
    if ( num === void 0 ) num         = '';

    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    var numRegex = this.getNumberRegex(true);

    //remove negation for regex check
    var hasNegation = num[0] === '-';
    if (hasNegation) { num = num.replace('-', ''); }

    //if decimal scale is zero remove decimal and number after decimalSeparator
    if (decimalSeparator && decimalScale === 0) {
      num = num.split(decimalSeparator)[0];
    }

    num = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.');

    //remove extra decimals
    var firstDecimalIndex = num.indexOf('.');

    if (firstDecimalIndex !== -1) {
      num = (num.substring(0, firstDecimalIndex)) + "." + (num
        .substring(firstDecimalIndex + 1, num.length)
        .replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), ''));
    }

    //add negation back
    if (hasNegation) { num = '-' + num; }

    return num;
  };

  //returned regex assumes decimalSeparator is as per prop
  NumberFormat.prototype.getNumberRegex = function getNumberRegex (g         , ignoreDecimalSeparator          ) {
    var ref = this.props;
    var format = ref.format;
    var decimalScale = ref.decimalScale;
    var customNumerals = ref.customNumerals;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    return new RegExp(
      '[0-9' +
        (customNumerals ? customNumerals.join('') : '') +
        ']' +
        (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format
          ? '|' + escapeRegExp(decimalSeparator)
          : ''),
      g ? 'g' : undefined
    );
  };

  NumberFormat.prototype.getSeparators = function getSeparators () {
    var ref = this.props;
    var decimalSeparator = ref.decimalSeparator;
    var ref$1 = this.props;
    var thousandSeparator = ref$1.thousandSeparator;
    var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;

    if (thousandSeparator === true) {
      thousandSeparator = ',';
    }
    if (!allowedDecimalSeparators) {
      allowedDecimalSeparators = [decimalSeparator, '.'];
    }

    return {
      decimalSeparator: decimalSeparator,
      thousandSeparator: thousandSeparator,
      allowedDecimalSeparators: allowedDecimalSeparators,
    };
  };

  NumberFormat.prototype.getMaskAtIndex = function getMaskAtIndex (index        ) {
    var ref = this.props;
    var mask = ref.mask; if ( mask === void 0 ) mask = ' ';
    if (typeof mask === 'string') {
      return mask;
    }

    return mask[index] || ' ';
  };

  NumberFormat.prototype.getValueObject = function getValueObject (formattedValue        , numAsString        ) {
    var floatValue = parseFloat(numAsString);

    return {
      formattedValue: formattedValue,
      value: numAsString,
      floatValue: isNaN(floatValue) ? undefined : floatValue,
    };
  };

  NumberFormat.prototype.validateProps = function validateProps () {
    var ref = this.props;
    var mask = ref.mask;

    //validate decimalSeparator and thousandSeparator
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    var thousandSeparator = ref$1.thousandSeparator;

    if (decimalSeparator === thousandSeparator) {
      throw new Error(("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: " + thousandSeparator + " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n          decimalSeparator: " + decimalSeparator + " (default value for decimalSeparator is .)\n       "));
    }

    //validate mask
    if (mask) {
      var maskAsStr = mask === 'string' ? mask : mask.toString();
      if (maskAsStr.match(/\d/g)) {
        throw new Error(("\n          Mask " + mask + " should not contain numeric character;\n        "));
      }
    }
  };
  /** Misc methods end **/

  /** caret specific methods **/
  NumberFormat.prototype.setPatchedCaretPosition = function setPatchedCaretPosition (el                  , caretPos        , currentValue        ) {
    /* setting caret position within timeout of 0ms is required for mobile chrome,
    otherwise browser resets the caret position after we set it
    We are also setting it without timeout so that in normal browser we don't see the flickering */
    setCaretPosition(el, caretPos);
    this.caretPositionTimeout = setTimeout(function () {
      if (el.value === currentValue) { setCaretPosition(el, caretPos); }
    }, 0);
  };

  /* This keeps the caret within typing area so people can't type in between prefix or suffix */
  NumberFormat.prototype.correctCaretPosition = function correctCaretPosition (value        , caretPos        , direction         ) {
    var ref = this.props;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var format = ref.format;

    //if value is empty return 0
    if (value === '') { return 0; }

    //caret position should be between 0 and value length
    caretPos = clamp(caretPos, 0, value.length);

    //in case of format as number limit between prefix and suffix
    if (!format) {
      var hasNegation = value[0] === '-';
      return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
    }

    //in case if custom format method don't do anything
    if (typeof format === 'function') { return caretPos; }

    /* in case format is string find the closest # position from the caret position */

    //in case the caretPos have input value on it don't do anything
    if (format[caretPos] === '#' && charIsNumber(value[caretPos])) {
      return caretPos;
    }

    //if caretPos is just after input value don't do anything
    if (format[caretPos - 1] === '#' && charIsNumber(value[caretPos - 1])) {
      return caretPos;
    }

    //find the nearest caret position
    var firstHashPosition = format.indexOf('#');
    var lastHashPosition = format.lastIndexOf('#');

    //limit the cursor between the first # position and the last # position
    caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);

    var nextPos = format.substring(caretPos, format.length).indexOf('#');
    var caretLeftBound = caretPos;
    var caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos);

    //get the position where the last number is present
    while (
      caretLeftBound > firstHashPosition &&
      (format[caretLeftBound] !== '#' || !charIsNumber(value[caretLeftBound]))
    ) {
      caretLeftBound -= 1;
    }

    var goToLeft =
      !charIsNumber(value[caretRightBound]) ||
      (direction === 'left' && caretPos !== firstHashPosition) ||
      caretPos - caretLeftBound < caretRightBound - caretPos;

    if (goToLeft) {
      //check if number should be taken after the bound or after it
      //if number preceding a valid number keep it after
      return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
    }

    return caretRightBound;
  };

  NumberFormat.prototype.getCaretPosition = function getCaretPosition (inputValue        , formattedValue        , caretPos        ) {
    var ref = this.props;
    var format = ref.format;
    var stateValue = this.state.value;
    var numRegex = this.getNumberRegex(true);
    var inputNumber = (inputValue.match(numRegex) || []).join('');
    var formattedNumber = (formattedValue.match(numRegex) || []).join('');
    var j, i;

    j = 0;

    for (i = 0; i < caretPos; i++) {
      var currentInputChar = inputValue[i] || '';
      var currentFormatChar = formattedValue[j] || '';
      //no need to increase new cursor position if formatted value does not have those characters
      //case inputValue = 1a23 and formattedValue =  123
      if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) {
        continue;
      }

      //When we are striping out leading zeros maintain the new cursor position
      //Case inputValue = 00023 and formattedValue = 23;
      if (
        currentInputChar === '0' &&
        currentFormatChar.match(numRegex) &&
        currentFormatChar !== '0' &&
        inputNumber.length !== formattedNumber.length
      ) {
        continue;
      }

      //we are not using currentFormatChar because j can change here
      while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
        j++;
      }
      j++;
    }

    if (typeof format === 'string' && !stateValue) {
      //set it to the maximum value so it goes after the last number
      j = formattedValue.length;
    }

    //correct caret position if its outside of editable area
    j = this.correctCaretPosition(formattedValue, j);

    return j;
  };
  /** caret specific methods ends **/

  /** methods to remove formattting **/
  NumberFormat.prototype.removePrefixAndSuffix = function removePrefixAndSuffix (val        ) {
    var ref = this.props;
    var format = ref.format;
    var prefix = ref.prefix;
    var suffix = ref.suffix;

    //remove prefix and suffix
    if (!format && val) {
      var isNegative = val[0] === '-';

      //remove negation sign
      if (isNegative) { val = val.substring(1, val.length); }

      //remove prefix
      val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;

      //remove suffix
      var suffixLastIndex = val.lastIndexOf(suffix);
      val =
        suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length
          ? val.substring(0, suffixLastIndex)
          : val;

      //add negation sign back
      if (isNegative) { val = '-' + val; }
    }

    return val;
  };

  NumberFormat.prototype.removePatternFormatting = function removePatternFormatting (val        ) {
    var ref = this.props;
    var format = ref.format;
    var formatArray = format.split('#').filter(function (str) { return str !== ''; });
    var start = 0;
    var numStr = '';

    for (var i = 0, ln = formatArray.length; i <= ln; i++) {
      var part = formatArray[i] || '';

      //if i is the last fragment take the index of end of the value
      //For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##
      var index = i === ln ? val.length : val.indexOf(part, start);

      /* in any case if we don't find the pattern part in the value assume the val as numeric string
      This will be also in case if user has started typing, in any other case it will not be -1
      unless wrong prop value is provided */
      if (index === -1) {
        numStr = val;
        break;
      } else {
        numStr += val.substring(start, index);
        start = index + part.length;
      }
    }

    return (numStr.match(this.getNumberRegex(true)) || []).join('');
  };

  NumberFormat.prototype.removeFormatting = function removeFormatting (val        ) {
    var ref = this.props;
    var format = ref.format;
    var removeFormatting = ref.removeFormatting;
    if (!val) { return val; }

    if (!format) {
      val = this.removePrefixAndSuffix(val);
      val = this.getFloatString(val);
    } else if (typeof format === 'string') {
      val = this.removePatternFormatting(val);
    } else if (typeof removeFormatting === 'function') {
      //condition need to be handled if format method is provide,
      val = removeFormatting(val);
    } else {
      val = (val.match(this.getNumberRegex(true)) || []).join('');
    }
    return val;
  };
  /** methods to remove formattting end **/

  /*** format specific methods start ***/
  /**
   * Format when # based string is provided
   * @param  {string} numStr Numeric String
   * @return {string}        formatted Value
   */
  NumberFormat.prototype.formatWithPattern = function formatWithPattern (numStr        ) {
    var ref = this.props;
    var format = ref.format;
    var hashCount = 0;
    var formattedNumberAry = format.split('');
    for (var i = 0, ln = format.length; i < ln; i++) {
      if (format[i] === '#') {
        formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
        hashCount += 1;
      }
    }
    return formattedNumberAry.join('');
  };
  /**
   * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
   * @return {string} formatted Value
   */
  NumberFormat.prototype.formatAsNumber = function formatAsNumber (numStr        ) {
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var allowNegative = ref.allowNegative;
    var thousandsGroupStyle = ref.thousandsGroupStyle;
    var ref$1 = this.getSeparators();
    var thousandSeparator = ref$1.thousandSeparator;
    var decimalSeparator = ref$1.decimalSeparator;

    var hasDecimalSeparator = numStr.indexOf('.') !== -1 || (decimalScale && fixedDecimalScale);
    var ref$2 = splitDecimal(numStr, allowNegative);
    var beforeDecimal = ref$2.beforeDecimal;
    var afterDecimal = ref$2.afterDecimal;
    var addNegation = ref$2.addNegation; // eslint-disable-line prefer-const

    //apply decimal precision if its defined
    if (decimalScale !== undefined) {
      afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);
    }

    if (thousandSeparator) {
      beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
    }

    //add prefix and suffix
    if (prefix) { beforeDecimal = prefix + beforeDecimal; }
    if (suffix) { afterDecimal = afterDecimal + suffix; }

    //restore negation sign
    if (addNegation) { beforeDecimal = '-' + beforeDecimal; }

    numStr = beforeDecimal + ((hasDecimalSeparator && decimalSeparator) || '') + afterDecimal;

    return numStr;
  };

  NumberFormat.prototype.formatNumString = function formatNumString (numStr) {
    if ( numStr === void 0 ) numStr         = '';

    var ref = this.props;
    var format = ref.format;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var customNumerals = ref.customNumerals;
    var formattedValue = numStr;

    if (customNumerals && customNumerals.length === 10) {
      var customNumeralRegex = new RegExp('[' + customNumerals.join('') + ']', 'g');
      formattedValue = numStr.replace(customNumeralRegex, function (digit) { return customNumerals.indexOf(digit).toString(); }
      );
    }

    if (numStr === '' && !allowEmptyFormatting) {
      formattedValue = '';
    } else if (numStr === '-' && !format) {
      formattedValue = '-';
    } else if (typeof format === 'string') {
      formattedValue = this.formatWithPattern(formattedValue);
    } else if (typeof format === 'function') {
      formattedValue = format(formattedValue);
    } else {
      formattedValue = this.formatAsNumber(formattedValue);
    }

    return formattedValue;
  };

  NumberFormat.prototype.formatValueProp = function formatValueProp (defaultValue                 ) {
    var ref = this.props;
    var format = ref.format;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var ref$1 = this.props;
    var value = ref$1.value;
    var isNumericString = ref$1.isNumericString;

    // if value is undefined or null, use defaultValue instead
    value = isNil(value) ? defaultValue : value;

    var isNonNumericFalsy = !value && value !== 0;

    if (isNonNumericFalsy && allowEmptyFormatting) {
      value = '';
    }

    // if value is not defined return empty string
    if (isNonNumericFalsy && !allowEmptyFormatting) { return ''; }

    if (typeof value === 'number') {
      value = toNumericString(value);
      isNumericString = true;
    }

    //change infinity value to empty string
    if (value === 'Infinity' && isNumericString) {
      value = '';
    }

    //round the number based on decimalScale
    //format only if non formatted value is provided
    if (isNumericString && !format && typeof decimalScale === 'number') {
      value = roundToPrecision(value, decimalScale, fixedDecimalScale);
    }

    var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);

    return formattedValue;
  };

  NumberFormat.prototype.formatNegation = function formatNegation (value) {
    if ( value === void 0 ) value         = '';

    var ref = this.props;
    var allowNegative = ref.allowNegative;
    var negationRegex = new RegExp('(-)');
    var doubleNegationRegex = new RegExp('(-)(.)*(-)');

    // Check number has '-' value
    var hasNegation = negationRegex.test(value);

    // Check number has 2 or more '-' values
    var removeNegation = doubleNegationRegex.test(value);

    //remove negation
    value = value.replace(/-/g, '');

    if (hasNegation && !removeNegation && allowNegative) {
      value = '-' + value;
    }

    return value;
  };

  NumberFormat.prototype.formatInput = function formatInput (value) {
    if ( value === void 0 ) value         = '';

    var ref = this.props;
    var format = ref.format;

    //format negation only if we are formatting as number
    if (!format) {
      value = this.removePrefixAndSuffix(value);
      value = this.formatNegation(value);
    }

    //remove formatting from number
    value = this.removeFormatting(value);

    return this.formatNumString(value);
  };

  /*** format specific methods end ***/
  NumberFormat.prototype.isCharacterAFormat = function isCharacterAFormat (caretPos        , value        ) {
    var ref = this.props;
    var format = ref.format;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;

    //check within format pattern
    if (typeof format === 'string' && format[caretPos] !== '#') { return true; }

    //check in number format
    if (
      !format &&
      (caretPos < prefix.length ||
        caretPos >= value.length - suffix.length ||
        (decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator))
    ) {
      return true;
    }

    return false;
  };

  /**
   * This will check if any formatting got removed by the delete or backspace and reset the value
   * It will also work as fallback if android chome keyDown handler does not work
   **/
  NumberFormat.prototype.correctInputValue = function correctInputValue (caretPos        , lastValue        , value        ) {
    var this$1 = this;

    var ref = this.props;
    var format = ref.format;
    var allowNegative = ref.allowNegative;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;
    var decimalSeparator = ref$1.decimalSeparator;
    var lastNumStr = this.state.numAsString || '';
    var ref$2 = this.selectionBeforeInput;
    var selectionStart = ref$2.selectionStart;
    var selectionEnd = ref$2.selectionEnd;
    var ref$3 = findChangedIndex(lastValue, value);
    var start = ref$3.start;
    var end = ref$3.end;

    /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
    if (
      !format &&
      start === end &&
      allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1
    ) {
      var separator = decimalScale === 0 ? '' : decimalSeparator;
      return (
        value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length)
      );
    }

    var leftBound = !!format ? 0 : prefix.length;
    var rightBound = lastValue.length - (!!format ? 0 : suffix.length);

    if (
      // don't do anything if something got added
      value.length > lastValue.length ||
      // or if the new value is an empty string
      !value.length ||
      // or if nothing has changed, in which case start will be same as end
      start === end ||
      // or in case if whole input is selected and new value is typed
      (selectionStart === 0 && selectionEnd === lastValue.length) ||
      // or in case if the whole content is replaced by browser, example (autocomplete)
      (start === 0 && end === lastValue.length) ||
      // or if charcters between prefix and suffix is selected.
      // For numeric inputs we apply the format so, prefix and suffix can be ignored
      (selectionStart === leftBound && selectionEnd === rightBound)
    ) {
      return value;
    }

    // check whether the deleted portion has a character that is part of a format
    var deletedValues = lastValue.substr(start, end - start);
    var formatGotDeleted = !![].concat( deletedValues ).find(function (deletedVal, idx) { return this$1.isCharacterAFormat(idx + start, lastValue); }
    );

    // if it has, only remove characters that are not part of the format
    if (formatGotDeleted) {
      var deletedValuePortion = lastValue.substr(start);
      var recordIndexOfFormatCharacters = {};
      var resolvedPortion = [];
      [].concat( deletedValuePortion ).forEach(function (currentPortion, idx) {
        if (this$1.isCharacterAFormat(idx + start, lastValue)) {
          recordIndexOfFormatCharacters[idx] = currentPortion;
        } else if (idx > deletedValues.length - 1) {
          resolvedPortion.push(currentPortion);
        }
      });

      Object.keys(recordIndexOfFormatCharacters).forEach(function (idx) {
        if (resolvedPortion.length > idx) {
          resolvedPortion.splice(idx, 0, recordIndexOfFormatCharacters[idx]);
        } else {
          resolvedPortion.push(recordIndexOfFormatCharacters[idx]);
        }
      });

      value = lastValue.substr(0, start) + resolvedPortion.join('');
    }

    //for numbers check if beforeDecimal got deleted and there is nothing after decimal,
    //clear all numbers in such case while keeping the - sign
    if (!format) {
      var numericString = this.removeFormatting(value);
      var ref$4 = splitDecimal(
        numericString,
        allowNegative
      );
      var beforeDecimal = ref$4.beforeDecimal;
      var afterDecimal = ref$4.afterDecimal;
      var addNegation = ref$4.addNegation; // eslint-disable-line prefer-const

      //clear only if something got deleted
      var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
      if (
        numericString.length < lastNumStr.length &&
        isBeforeDecimalPoint &&
        beforeDecimal === '' &&
        !parseFloat(afterDecimal)
      ) {
        return addNegation ? '-' : '';
      }
    }

    return value;
  };

  /** Update value and caret position */
  NumberFormat.prototype.updateValue = function updateValue (params   
                           
                        
                       
                            
                               
                   
                     
                              
   ) {
    var formattedValue = params.formattedValue;
    var input = params.input;
    var setCaretPosition = params.setCaretPosition; if ( setCaretPosition === void 0 ) setCaretPosition = true;
    var source = params.source;
    var event = params.event;
    var numAsString = params.numAsString;
    var caretPos = params.caretPos;
    var ref = this.props;
    var onValueChange = ref.onValueChange;
    var ref$1 = this.state;
    var lastValue = ref$1.value;

    if (input) {
      //calculate caret position if not defined
      if (caretPos === undefined && setCaretPosition) {
        var inputValue = params.inputValue || input.value;

        var currentCaretPosition = getCurrentCaretPosition(input);

        /**
         * set the value imperatively, this is required for IE fix
         * This is also required as if new caret position is beyond the previous value.
         * Caret position will not be set correctly
         */
        input.value = formattedValue;

        //get the caret position
        caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
      }

      /**
       * set the value imperatively, as we set the caret position as well imperatively.
       * This is to keep value and caret position in sync
       */
      input.value = formattedValue;

      //set caret position, and value imperatively when element is provided
      if (setCaretPosition) {
        //set caret position
        this.setPatchedCaretPosition(input, caretPos, formattedValue);
      }
    }

    //calculate numeric string if not passed
    if (numAsString === undefined) {
      numAsString = this.removeFormatting(formattedValue);
    }

    //update state if value is changed
    if (formattedValue !== lastValue) {
      this.setState({ value: formattedValue, numAsString: numAsString });

      // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287
      onValueChange(this.getValueObject(formattedValue, numAsString), { event: event, source: source });
    }
  };

  NumberFormat.prototype.onChange = function onChange (e                     ) {
    var el = e.target;
    var inputValue = el.value;
    var ref = this;
    var state = ref.state;
    var props = ref.props;
    var isAllowed = props.isAllowed;
    var lastValue = state.value || '';

    var currentCaretPosition = getCurrentCaretPosition(el);

    inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);

    var formattedValue = this.formatInput(inputValue) || '';
    var numAsString = this.removeFormatting(formattedValue);

    var valueObj = this.getValueObject(formattedValue, numAsString);
    var isChangeAllowed = isAllowed(valueObj);

    if (!isChangeAllowed) {
      formattedValue = lastValue;
    }

    this.updateValue({
      formattedValue: formattedValue,
      numAsString: numAsString,
      inputValue: inputValue,
      input: el,
      event: e,
      source: 'event',
    });

    if (isChangeAllowed) {
      props.onChange(e);
    }
  };

  NumberFormat.prototype.onBlur = function onBlur (e                     ) {
    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var format = props.format;
    var onBlur = props.onBlur;
    var allowLeadingZeros = props.allowLeadingZeros;
    var numAsString = state.numAsString;
    var lastValue = state.value;
    this.focusedElm = null;

    clearTimeout(this.focusTimeout);
    clearTimeout(this.caretPositionTimeout);

    if (!format) {
      // if the numAsString is not a valid number reset it to empty
      if (isNaN(parseFloat(numAsString))) {
        numAsString = '';
      }

      if (!allowLeadingZeros) {
        numAsString = fixLeadingZero(numAsString);
      }

      var formattedValue = this.formatNumString(numAsString);

      //change the state
      if (formattedValue !== lastValue) {
        // the event needs to be persisted because its properties can be accessed in an asynchronous way
        this.updateValue({
          formattedValue: formattedValue,
          numAsString: numAsString,
          input: e.target,
          setCaretPosition: false,
          event: e,
          source: 'event',
        });
        onBlur(e);
        return;
      }
    }
    onBlur(e);
  };

  NumberFormat.prototype.onKeyDown = function onKeyDown (e                             ) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value; if ( value === void 0 ) value = '';
    var expectedCaretPosition;
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var format = ref.format;
    var onKeyDown = ref.onKeyDown;
    var ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
    var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
    var negativeRegex = new RegExp('-');
    var isPatternFormat = typeof format === 'string';

    this.selectionBeforeInput = {
      selectionStart: selectionStart,
      selectionEnd: selectionEnd,
    };

    //Handle backspace and delete against non numerical/decimal characters or arrow keys
    if (key === 'ArrowLeft' || key === 'Backspace') {
      expectedCaretPosition = selectionStart - 1;
    } else if (key === 'ArrowRight') {
      expectedCaretPosition = selectionStart + 1;
    } else if (key === 'Delete') {
      expectedCaretPosition = selectionStart;
    }

    //if expectedCaretPosition is not set it means we don't want to Handle keyDown
    //also if multiple characters are selected don't handle
    if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
      onKeyDown(e);
      return;
    }

    var newCaretPosition = expectedCaretPosition;
    var leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
    var rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      var direction = key === 'ArrowLeft' ? 'left' : 'right';
      newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
    } else if (
      key === 'Delete' &&
      !numRegex.test(value[expectedCaretPosition]) &&
      !negativeRegex.test(value[expectedCaretPosition])
    ) {
      while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
        newCaretPosition++;
      }
    } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition])) {
      /* NOTE: This is special case when backspace is pressed on a
      negative value while the cursor position is after prefix. We can't handle it on onChange because
      we will not have any information of keyPress
      */
      if (selectionStart <= leftBound + 1 && value[0] === '-' && typeof format === 'undefined') {
        var newValue = value.substring(1);
        this.updateValue({
          formattedValue: newValue,
          caretPos: newCaretPosition,
          input: el,
          event: e,
          source: 'event',
        });
      } else if (!negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
          newCaretPosition--;
        }
        newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
      }
    }

    if (
      newCaretPosition !== expectedCaretPosition ||
      expectedCaretPosition < leftBound ||
      expectedCaretPosition > rightBound
    ) {
      e.preventDefault();
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }

    /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
            Remove this when you find different solution */
    if (e.isUnitTestRun) {
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }

    onKeyDown(e);
  };

  /** required to handle the caret position when click anywhere within the input **/
  NumberFormat.prototype.onMouseUp = function onMouseUp (e                          ) {
    var el = e.target;

    /**
     * NOTE: we have to give default value for value as in case when custom input is provided
     * value can come as undefined when nothing is provided on value prop.
     */
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value; if ( value === void 0 ) value = '';

    if (selectionStart === selectionEnd) {
      var caretPosition = this.correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }
    }

    this.props.onMouseUp(e);
  };

  NumberFormat.prototype.onFocus = function onFocus (e                     ) {
    var this$1 = this;

    // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
    // (onFocus event target selectionStart is always 0 before setTimeout)
    e.persist();

    this.focusedElm = e.target;
    this.focusTimeout = setTimeout(function () {
      var el = e.target;
      var selectionStart = el.selectionStart;
      var selectionEnd = el.selectionEnd;
      var value = el.value; if ( value === void 0 ) value = '';

      var caretPosition = this$1.correctCaretPosition(value, selectionStart);

      //setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)
      if (
        caretPosition !== selectionStart &&
        !(selectionStart === 0 && selectionEnd === value.length)
      ) {
        this$1.setPatchedCaretPosition(el, caretPosition, value);
      }

      this$1.props.onFocus(e);
    }, 0);
  };

  NumberFormat.prototype.render = function render () {
    var ref = this.props;
    var type = ref.type;
    var displayType = ref.displayType;
    var customInput = ref.customInput;
    var renderText = ref.renderText;
    var getInputRef = ref.getInputRef;
    var format = ref.format;
    var thousandSeparator = ref.thousandSeparator;
    var decimalSeparator = ref.decimalSeparator;
    var allowedDecimalSeparators = ref.allowedDecimalSeparators;
    var thousandsGroupStyle = ref.thousandsGroupStyle;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var removeFormatting = ref.removeFormatting;
    var mask = ref.mask;
    var defaultValue = ref.defaultValue;
    var isNumericString = ref.isNumericString;
    var allowNegative = ref.allowNegative;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var allowLeadingZeros = ref.allowLeadingZeros;
    var onValueChange = ref.onValueChange;
    var isAllowed = ref.isAllowed;
    var customNumerals = ref.customNumerals;
    var onChange = ref.onChange;
    var onKeyDown = ref.onKeyDown;
    var onMouseUp = ref.onMouseUp;
    var onFocus = ref.onFocus;
    var onBlur = ref.onBlur;
    var propValue = ref.value;
    var rest = objectWithoutProperties( ref, ["type", "displayType", "customInput", "renderText", "getInputRef", "format", "thousandSeparator", "decimalSeparator", "allowedDecimalSeparators", "thousandsGroupStyle", "decimalScale", "fixedDecimalScale", "prefix", "suffix", "removeFormatting", "mask", "defaultValue", "isNumericString", "allowNegative", "allowEmptyFormatting", "allowLeadingZeros", "onValueChange", "isAllowed", "customNumerals", "onChange", "onKeyDown", "onMouseUp", "onFocus", "onBlur", "value"] );
    var otherProps = rest;
    var ref$1 = this.state;
    var value = ref$1.value;
    var mounted = ref$1.mounted;

    // add input mode on element based on format prop and device once the component is mounted
    var inputMode = mounted && addInputMode(format) ? 'numeric' : undefined;

    var inputProps = Object.assign({ inputMode: inputMode }, otherProps, {
      type: type,
      value: value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onMouseUp: this.onMouseUp,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    });

    if (displayType === 'text') {
      return renderText ? (
        renderText(value, otherProps) || null
      ) : (
        react__WEBPACK_IMPORTED_MODULE_0__.createElement( 'span', Object.assign({}, otherProps, { ref: getInputRef }),
          value
        )
      );
    } else if (customInput) {
      var CustomInput = customInput;
      return react__WEBPACK_IMPORTED_MODULE_0__.createElement( CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
    }

    return react__WEBPACK_IMPORTED_MODULE_0__.createElement( 'input', Object.assign({}, inputProps, { ref: getInputRef }));
  };

  return NumberFormat;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component));

NumberFormat.defaultProps = defaultProps;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberFormat);


/***/ })

}]);
//# sourceMappingURL=333.10107cd7.iframe.bundle.js.map