/* @flow */
import variance from './variance'

export default function std(x: Array<number>) {
  let v = variance(x);
  return isNaN(v) ? 0 : Math.sqrt(v);
};
