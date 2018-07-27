var expect = require('chai').expect;
var _reduce = require('../src/reduce')._reduce;

var INPUT_RANGE = [0, 1, 2, 3, 4];

var INPUT_2D = [
  [0, 1],
  [2, 3],
  [4, 5]
];

function sum(a, b) {
  return a + b;
}

function flatten(a, b) {
  return a.concat(b);
}

describe('`_reduce`', function () {

  before(function () {
    Array.prototype._reduce = _reduce;
  });

  it('should sum starting with 0', function () {
    var range = [].concat(INPUT_RANGE);
    var a = range.reduce(sum, 0);
    var b = range._reduce(sum, 0);
    expect(a).to.deep.equal(b);
  });

  it('should sum starting with 10', function () {
    var range = [].concat(INPUT_RANGE);
    var a = range.reduce(sum, 10);
    var b = range._reduce(sum, 10);
    expect(a).to.deep.equal(b);
  });

  it('should flatten a 2d array', function () {
    var a = INPUT_2D.reduce(flatten, []);
    var b = INPUT_2D._reduce(flatten, []);
    expect(a).to.deep.equal(b);
  });

  it('should allow access to index', function () {
    var input = ['a', 'b', 'c'];
    var expected = { A: 1, B: 2, C: 3 };
    var output = input._reduce(function (acc, cur, i) {
      var key = cur.toUpperCase();
      acc[key] = i + 1;
      return acc;
    }, {});
    expect(output).to.deep.equal(expected);
  });

  it('should allow access to original array', function () {
    var input = ['a', 'b', 'c'];
    var expected = { a: '1 of 3', b: '2 of 3', c: '3 of 3' };
    var output = input._reduce(function (acc, cur, i, arr) {
      acc[cur] = '' + (i + 1) + ' of ' + arr.length;
      return acc;
    }, {});
    expect(output).to.deep.equal(expected);
  });

  it('should allow me to mutate the input array', function () {
    var input = ['a', 'b', 'c'];
    var expected = ['a', 'b', 'c'];
    var output = input._reduce(function (acc, cur, i, arr) {
      if (i === 0) {
        arr.push('d');
      }
      acc[i] = cur;
      return acc;
    }, []);
    expect(output).to.deep.equal(expected);
  });

  it('should do some reducey things', function () {
    var foo = {
      a: 5,
      b: 'cat',
      d: {},
      e: [],
      f: null
    };
    var output = Object.keys(foo)._reduce(function (acc, cur) {
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
    expect(output).to.deep.equal(expected);
  });

  describe('when reducing an empty array', function () {
    it('should throw error when no initial value is provided', function () {
      try {
        []._reduce(sum);
      } catch(err) {
        expect(err).to.be.instanceof(Error);
      }
    });

    it('when initial value is provided', function () {
      var a = []._reduce(sum, 1);
      expect(a).to.equal(1);
    });
  });
});
