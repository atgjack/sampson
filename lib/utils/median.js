/* @flow */
import select from './select'

/**
 * Finds the central most value for a list of numbers.
 * If the list is even, and has no single center, the two
 * inner-most values are averaged.
 * Uses our internal selection function.
 * See: [Median](https://en.wikipedia.org/wiki/Median)
 * @param {number} x - The numbers.
 * @return {number} The median or NaN if x is the empty set.
 */
export default function median(list: array) {
  let result;
  if (list.length == 0) result = NaN
  else {
    let even = list.length % 2 == 0;
    if (even) {
      result  = select(list, (list.length / 2));
      result += select(list, (list.length / 2) - 1);
      result /= 2;
    } else {
      result = select(list, (list.length - 1)/2);
    };
  };
  return result;
}
