/* @flow */
export default function variance(x: Array<number>) {
  return (x.length == 0) ? NaN : sumNthPowerDev(x, 2) / x.length;
};
