/* @flow */
import variance from './variance'
/**
 * A measure that is used to quantify the amount of variation of a set of data values.
 * See: [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)
 * @param {number} x - The numbers.
 * @return {number} The standard deviation or 0 if x is the empty set.
 */
export default function std(x: Array<number>) {
  let v = variance(x);
  return isNaN(v) ? 0 : Math.sqrt(v);
};
