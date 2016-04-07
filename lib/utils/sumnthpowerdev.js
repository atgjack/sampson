/* @flow */
import mean from './mean'

/**
 * A really useful function. Takes a set of observations and returns the sum of
 * the difference of each observation and the mean of the set raised to the nth power.
 * Can be used to find the absolute value of the difference for functions like MeanDeviation,
 * or by default, the signed values for functions like Variance and SquaredMeanDeviation.
 * @param {Array<number>} x - The numbers.
 * @param {number} n - The number to raise to.
 * @param {boolean} [absolute=false] - Use absolute value of difference.
 * @return {number} The sum of (x-mu)^n or NaN if x is the empty set.
 */
 // Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum_nth_power_deviations.js)
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
