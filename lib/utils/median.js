/* @flow */
import select from './select'

/**
 * Finds the central most value for a list of numbers.
 * If the list is even, and has no single center, the two
 * inner-most values are averaged.
 * Uses our internal selection function.
 * See: [Median](https://en.wikipedia.org/wiki/Median)
 * @param {Array<number>} x - The numbers.
 * @return {number} The median or NaN if x is the empty set.
 */
export default function median(x: array) {
  let result;
  if (x.length == 0) result = NaN
  else {
    let even = x.length % 2 == 0;
    if (even) {
      result  = select(x, (x.length / 2));
      result += select(x, (x.length / 2) - 1);
      result /= 2;
    } else {
      result = select(x, (x.length - 1)/2);
    };
  };
  return result;
}
