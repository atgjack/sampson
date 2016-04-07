/* @flow */
/**
 * Finds the difference between the largest and smallest values.
 * See: [Range](https://en.wikipedia.org/wiki/Range_(statistics))
 * @param {number} x - The numbers.
 * @return {number} The range or NaN if x is the empty set.
 */
export default function range(x: array) {
  if (x.length == 0) return NaN
  return Math.max(...x) - Math.min(...x);
}
