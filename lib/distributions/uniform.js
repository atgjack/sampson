/* @flow */
import Distribution from './distribution'

/**
* The Uniform Distribution is a continuous probability distribution
* with parameters a = *min* and b = *max*.
* See: [Uniform Distribution](https://en.wikipedia.org/wiki/Uniform_distribution)
*/
export default class Uniform extends Distribution {
  static covariates = 2;
  static discrete = false;
  static parameters = {
    'a': true,
    'b': (b, params) => ( b > params.a ),
  };

  /**
   * Generate a random value from Uniform(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Uniform(a, b).
   */
  static random(params: Object): number {
    const { a, b } = this.validate(params);
    return a + super.random() * (b - a);
  };

  /**
   * Calculate the probability of exaclty x in Uniform(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Uniform(a, b).
   */
  static pdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new TypeError('x must be a number')
    const { a, b } = this.validate(params);
    if (x < a || x > b) return 0
    else return 1 / (b - a);
  };

  /**
   * Calculate the probability of getting x or less from Uniform(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Uniform(a, b).
   */
  static cdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new TypeError('x must be a number')
    const { a, b } = this.validate(params);
    if (x < a) return 0
    else if (x >= b) return 1
    else return (x - a) / (b - a);
  };

  /**
   * Get the mean of Uniform(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The mean of Uniform(a, b).
   */
  static mean(params: Object): number {
    const { a, b } = this.validate(params);
    return (a + b) / 2;
  };

  /**
   * Get the variance of Uniform(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The variance of Uniform(a, b).
   */
  static variance(params: Object): number {
    const { a, b } = this.validate(params);
    return Math.pow(b - a, 2) / 12;
  };

  /**
   * Get the skewness of Uniform(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The skewness of Uniform(a, b).
   */
  static skewness(params: Object): number {
    return 0;
  };

  /**
   * Get the kurtosis of Uniform(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The kurtosis of Uniform(a, b).
   */
  static kurtosis(params: Object): number {
    return -6 / 5;
  };
};
