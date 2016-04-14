/* @flow */
import Distribution from './distribution'

/**
* The Cauchy Distribution is a continuous probability distribution
* with parameters a = *location* and b = *scale*.
* See: [Cauchy Distribution](https://en.wikipedia.org/wiki/Cauchy_distribution)
*/
export default class Cauchy extends Distribution {
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
    if (typeof a != 'number') throw Error('a must be a number.');
    if (typeof b != 'number' || b <= 0) throw RangeError('b must be greater than zero.');
    return params
  }

  /**
   * Generate a random value from Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Cauchy(a, b).
   */
  static random(params: Object): number {
    const { a, b } = this.validate(params);
    let u: number;
    while (!u || u == 0.5) u = super.random();
    return a + b * Math.tan(Math.PI * u);
  };

  /**
   * Calculate the probability of exaclty x in Cauchy(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Cauchy(a, b).
   */
  static pdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new TypeError('x must be a number')
    const { a, b } = this.validate(params);
    return (b / ( Math.pow( x - a, 2) + Math.pow(b, 2) )) / Math.PI;
  };

  /**
   * Calculate the probability of getting x or less from Cauchy(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Cauchy(a, b).
   */
  static cdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new TypeError('x must be a number')
    const { a, b } = this.validate(params);
    return Math.atan( (x - a) / b ) / Math.PI + .5;
  };

  /**
   * Get the mean of Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The mean of Cauchy(a, b).
   */
  static mean(params: Object): number {
    return NaN;
  };

  /**
   * Get the variance of Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The variance of Cauchy(a, b).
   */
  static variance(params: Object): number {
    return NaN;
  };

  /**
   * Get the standard deviation of Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The standard deviation of Cauchy(a, b).
   */
  static stdDev(params: Object): number {
    return NaN;
  };

  /**
   * Get the relative standard deviation of Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The relative standard deviation of Cauchy(a, b).
   */
  static relStdDev(params: Object): number {
    return NaN;
  };

  /**
   * Get the skewness of Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The skewness of Cauchy(a, b).
   */
  static skewness(params: Object): number {
    return NaN;
  };

  /**
   * Get the kurtosis of Cauchy(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The kurtosis of Cauchy(a, b).
   */
  static kurtosis(params: Object): number {
    return NaN;
  };
};
