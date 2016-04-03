/* @flow */
import sum from './sum';

/**
 * See: [Mean](https://en.wikipedia.org/wiki/Mean)
 *
 * Averages a list of elements. Uses our internal sum function.
 */
export default function mean(x: Array<number>): number {
  return ( x.length == 0) ? NaN : sum(x) / x.length;
};
