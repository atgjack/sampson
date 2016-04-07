/* @flow */
import select from './select';

/**
 * Finds the element of a list of numbers at a certain percentile ordered smallest to largest.
 * Uses the internal select function.
 * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
 * @param {number} x - The numbers.
 * @return {number} The element at the xth percentile or NaN if x is the empty set.
 */
export default function percentile(x: Array<number>, p: number): number {
  if (p == undefined || p > 1 || p < 0) throw new Error('p must be between zero and one inclusive.')
  else if (x == undefined) throw new Error('need a list to provide a percentile.')
  else if (x.length == 0) return NaN
  else {
    let index = Math.floor(x.length * p);
    if (index >= x.length) index = x.length - 1;
    return select(x, index);
  };
};
