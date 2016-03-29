/* @flow */
import sum from './sum';

export default function mean(x: Array<number>): number {
  return ( x.length == 0) ? NaN : sum(x) / x.length;
};
