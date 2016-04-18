/* @flow */
import Distribution from './distribution';
import { gamma } from '../utils';

/**
* The Weibull Distribution is a continuous probability distribution
* with parameters a = *scale* and b = *shape*.
* See: [Weibull Distribution](https://en.wikipedia.org/wiki/Weibull_distribution)
*/
export default class Weibull extends Distribution {
  static covariates = 1;
  static discrete = false;

  /**
   * @private
   * @param {Object} params - The distribution parameters.
   * @return {Object} The given parameters.
   */
  static validate(params: Object): Object {
    if (!params || params.a === undefined || params.b === undefined) {
      throw new Error('need a parameter object of shape { a: number, b: number }.')
    };
    const { a, b } = params;
    if (typeof a != 'number' || a <= 0) throw Error('a must be greater than zero.');
    if (typeof b != 'number' || b <= 0) throw RangeError('b must be greater than zero.');
    return params
  };

  /**
   * Generate a random value from Weibull(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Weibull(a, b).
   */
  static random(params: Object): number {
    const { a, b } = this.validate(params);
    return a * Math.pow(-Math.log(super.random()), 1 / b);
  };

  /**
   * Calculate the probability of exaclty x in Weibull(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Weibull(a, b).
   */
  static pdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new TypeError('x must be a number')
    const { a, b } = this.validate(params);
    if (x < 0) return 0
    else return (b / a) * Math.pow(x / a, b - 1) * Math.exp( -(Math.pow(x / a, b)) );
  };

  /**
   * Calculate the probability of getting x or less from Weibull(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Weibull(a, b).
   */
  static cdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new TypeError('x must be a number')
    const { a, b } = this.validate(params);
    if (x < 0) return 0
    else return 1 - Math.exp( -Math.pow(x / a, b) );
  };

  /**
   * Get the mean of Weibull(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The mean of Weibull(a, b).
   */
  static mean(params: Object): number {
    const { a, b } = this.validate(params);
    return a * gamma(1 + 1 / b);
  };

  /**
   * Get the variance of Weibull(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The variance of Weibull(a, b).
   */
  static variance(params: Object): number {
    const { a, b } = this.validate(params);
    return a * a * (gamma(1 + 2 / b) - Math.pow(gamma(1 + 1 / b), 2));
  };

  /**
   * Get the skewness of Weibull(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The skewness of Weibull(a, b).
   */
  static skewness(params: Object): number {
    const { a, b } = params;
    let std = this.stdDev(params);
    let mu = this.mean(params);
    return (gamma(1 + 3 / b) * Math.pow(a, 3) - 3 * mu * std * std - Math.pow(mu, 3)) / Math.pow(std, 3);
  };

  /**
   * Get the kurtosis of Weibull(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The kurtosis of Weibull(a, b).
   */
  static kurtosis(params: Object): number {
    const { a, b } = params;
    let std = this.stdDev(params);
    let mu = this.mean(params);
    let skew = this.skewness(params)
    return (gamma(1 + 4 / b) * Math.pow(a, 4) - 4 * skew * Math.pow(std, 3) * mu - 6 * Math.pow(mu, 2) * Math.pow(std, 2) - Math.pow(mu, 4)) / Math.pow(std, 4) - 3;
  };
};
