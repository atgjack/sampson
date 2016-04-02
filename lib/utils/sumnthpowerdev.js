/* @flow */
import mean from './mean'

export default function sumNthPowerDev(x: Array<number>, n: number, absolute: ?boolean): number {
  if (x.length == 0) return NaN
  else {
    let mu: number = mean(x);
    return x.reduce( (p, next) => {
      let diff = next - mu;
      if (absolute) diff = Math.abs(diff);
      return p + Math.pow(diff, n);
    }, 0);
  };
};
