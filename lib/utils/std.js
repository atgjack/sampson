/* @flow */
import variance from './variance'
/**
 * See: [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)
 *
 * A measure that is used to quantify the amount of variation of a set of data values.
 */
export default function std(x: Array<number>) {
  let v = variance(x);
  return isNaN(v) ? 0 : Math.sqrt(v);
};
