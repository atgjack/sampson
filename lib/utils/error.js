/* @flow */

/**
 * A useful function. Gets used in the Normal distribution cdf.
 * It's the probability of a random variable with
 * normal distribution of mean 0 and variance 1/2 falling in the range [-x, x].
 * See: [Error](https://en.wikipedia.org/wiki/Error_function#)
 * @param {number} x - The numbers to average.
 * @return {number} The error value.
 */
 // Kanged from: https://en.wikipedia.org/wiki/Error_function#Numerical_approximation
export default function error(x: number): number {
  let t = 1 / ( 1 + .5 * Math.abs(x))
  let tau = t * Math.exp( -(x*x) - 1.26551223
      + 1.00002368*t + 0.37409196*Math.pow(t,2)
      + 0.09678418*Math.pow(t,3) - 0.18628806*Math.pow(t,4)
      + 0.27886807*Math.pow(t,5) - 1.13520398*Math.pow(t,6)
      + 1.48851587*Math.pow(t,7) - 0.82215223*Math.pow(t,8)
      + 0.17087277*Math.pow(t,9) );
  return (x >= 0) ? 1 - tau : tau - 1;
};
