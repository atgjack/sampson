/* @flow */
import sum from './sum';

/**
 * Averages a list of elements. Uses our internal sum function.
 * See: [Mean](https://en.wikipedia.org/wiki/Mean)
 * @param {Array<number>} x - The numbers to average.
 * @return {number} The mean or NaN if x is the empty set.
 */
export default function mean(x: Array<number>): number {
  return ( x.length == 0) ? NaN : sum(x) / x.length;
};
