var assert = require('assert');

if (!Array.prototype.fbReduce) {
  Array.prototype.fbReduce = function (callback, initialValue) {
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
  };
}



// ----------- TESTS.... -------



// test and examples
function sum(a, b) {
  return a + b;
}

function it(msg, method) {
  method(msg);
  console.log('[ok]', msg);
}


var INPUT_RANGE = [0, 1, 2, 3, 4];

it('should sum starting with 0', function (msg) {
  var range = [].concat(INPUT_RANGE);
  var a = range.reduce(sum, 0);
  var b = range.fbReduce(sum, 0);
  assert.equal(a, b, msg);
});

it('should sum starting with 10', function (msg) {
  var range = [].concat(INPUT_RANGE);
  var a = range.reduce(sum, 10);
  var b = range.fbReduce(sum, 10);
  assert.equal(a, b, msg);
});



var INPUT_2D = [
  [0, 1],
  [2, 3],
  [4, 5]
];

function flatten(a, b) {
  return a.concat(b);
}

it('should flatten a 2d array', function (msg) {
  var a = INPUT_2D.reduce(flatten, []);
  var b = INPUT_2D.fbReduce(flatten, []);
  assert.deepEqual(a, b, msg);
});

it('should do some reducey things', function (msg) {
  var foo = {
    a: 5,
    b: 'cat',
    d: {},
    e: [],
    f: null
  };
  var output = Object.keys(foo).fbReduce(function (acc, cur) {
    if (!foo[cur]) {
      return acc;
    }
    acc[cur] = typeof foo[cur];
    return acc;
  }, {});
  var expected = {
    a: 'number',
    b: 'string',
    d: 'object',
    e: 'object'
  };
  assert.deepEqual(output, expected, msg);
});

it('should allow access to index', function (msg) {
  var input = ['a', 'b', 'c'];
  var expected = { A: 1, B: 2, C: 3 };
  var output = input.fbReduce(function (acc, cur, i) {
    var key = cur.toUpperCase();
    acc[key] = i + 1;
    return acc;
  }, {});
  assert.deepEqual(output, expected, msg);
});

it('should allow access to original array', function (msg) {
  var input = ['a', 'b', 'c'];
  var expected = { a: '1 of 3', b: '2 of 3', c: '3 of 3' };
  var output = input.fbReduce(function (acc, cur, i, arr) {
    acc[cur] = '' + (i + 1) + ' of ' + arr.length;
    return acc;
  }, {});
  assert.deepEqual(output, expected, msg + ', ' + JSON.stringify(output));
});

it('should allow me to mutate the input array, yolo', function (msg) {
  var input = ['a', 'b', 'c'];
  var expected = ['a', 'b', 'c'];
  var output = input.fbReduce(function (acc, cur, i, arr) {
    if (i === 0) {
      arr.push('d');
    }
    acc[i] = cur;
    return acc;
  }, []);
  assert.deepEqual(output, expected, msg + ', ' + JSON.stringify(output));
});
