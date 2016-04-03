/* @flow */
import sumNthPowerDev from './sumnthpowerdev'

/**
 * See: [Variance](https://en.wikipedia.org/wiki/Variance)
 *
* A measure that is used to quantify the amount of variation of a set of data values from their mean value.
*/
export default function variance(x: Array<number>) {
  return (x.length == 0) ? NaN : sumNthPowerDev(x, 2) / x.length;
};
