# reduce

[`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) is an array method that works by applying an accumulator to each element in the array in order to simplify it into a single value.

## Example

```js

[1,2,3].reduce(function (accumulator, current) {
  return accumulator + current;
});

// should return 6
```

You may also pass an initial value for instance:

```js

[1,2,3].reduce(function (accumulator, current) {
  return accumulator + current;
}, 10);

// should return 16
```

The code found on this repository is an implementation of the reduce method. Furthermore, it can be used as a polyfill.
