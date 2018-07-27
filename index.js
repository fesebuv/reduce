'use strict';

var _reduce = require('./src/reduce')._reduce;

if (!Array.prototype.reduce) {
  Array.prototype.reduce = _reduce;
}
