/* @flow */
import sumNthPowerDev from './sumnthpowerdev'

/**
* A measure that is used to quantify the amount of variation of a set of data values from their mean value.
* See: [Variance](https://en.wikipedia.org/wiki/Variance)
* @param {Array<number>} x - The numbers.
* @return {number} The variance or NaN if x is the empty set.
*/
export default function variance(x: Array<number>) {
  return (x.length == 0) ? NaN : sumNthPowerDev(x, 2) / x.length;
};
