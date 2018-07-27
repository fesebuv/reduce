'use strict';

var fbReduce = require('./src/reduce');

if (!Array.prototype.reduce) {
  Array.prototype.reduce = fbReduce;
}
