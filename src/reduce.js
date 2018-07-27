'use strict';

var _reduce = function (callback, initialValue) {
  var arr = this;
  var len = arr.length;
  var hasInitialValue = initialValue !== undefined;

  if (len <= 0) {
    if (hasInitialValue) {
      return initialValue;
    }
    throw new TypeError('Reduce of empty array with no initial value');
  }

  var previousValue = initialValue || arr[0];
  var currentIndex = Number(!hasInitialValue);

  for (var i = currentIndex; i < len; i++) {
    var currentValue = arr[i];
    previousValue = callback(previousValue, currentValue, i, arr);
  }
  return previousValue;
}

module.exports = {
  _reduce: _reduce
};
