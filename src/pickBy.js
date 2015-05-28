var _curry2 = require('./internal/_curry2');


/**
 * Returns a partial copy of an object containing only the keys that
 * satisfy the supplied predicate.
 *
 * @deprecated since v0.14.0
 * @func
 * @memberOf R
 * @category Object
 * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick
 * @example
 *
 *      var isUpperCase = function(val, key) { return key.toUpperCase() === key; }
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */
module.exports = _curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
