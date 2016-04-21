/* @flow */
import { gamma, lngamma, gammainc_lower } from '../utils';
import Distribution from './distribution';
import Gamma from './gamma';

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/chisq.c

/**
* The Chi-Squared Distribution is a continuous probability distribution
* with parameters df = *degrees of freedom*.
* See: [Chi-Squared Distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution)
*/
export default class ChiSquared extends Distribution {
  static covariates = 1;
  static parameters = {
    'df': (df) => ( df >= 0),
  };

  /**
   * Generate a random value from ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from ChiSquared(df).
   */
  static random(params: Object): number {
    const { df } = this.validate(params);
    return 2 * Gamma.random( { a: df / 2, b:1 } );
  };

  /**
   * Calculate the probability of exaclty x in ChiSquared(df).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in ChiSquared(df).
   */
  static pdf(x: number, params: Object): number {
    const { df } = this.validate(params);
    if (typeof x != 'number') throw new TypeError('x must be a number')
    else if (x < 0) return 0
    else if (df == 2) return Math.exp(-x / 2) / 2
    else {
      return Math.exp( (df / 2 - 1) * Math.log(x / 2) - x / 2 - (lngamma(df/2))) / 2;
    }
  };

  /**
   * Calculate the probability of getting x or less from ChiSquared(df).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from ChiSquared(df).
   */
  static cdf(x: number, params: Object): number {
    const { df } = this.validate(params);
    if (typeof x != 'number') throw new TypeError('x must be a number')
    else if (x < 0) return 0
    else if (df == 2) return 1 - Math.exp(-x / 2)
    else return gammainc_lower(df / 2, x / 2)
  };

  /**
   * Get the mean of ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The mean of ChiSquared(df).
   */
  static mean(params: Object): number {
    const { df } = this.validate(params);
    return df;
  };

  /**
   * Get the variance of ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The variance of ChiSquared(df).
   */
  static variance(params: Object): number {
    const { df } = this.validate(params);
    return 2 * df;
  };

  /**
   * Get the standard deviation of ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The standard deviation of ChiSquared(df).
   */
  static stdDev(params: Object): number {
    const { df } = this.validate(params);
    return Math.sqrt( 2 * df );
  };

  /**
   * Get the relative standard deviation of ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The relative standard deviation of ChiSquared(df).
   */
  static relStdDev(params: Object): number {
    const { df } = this.validate(params);
    return Math.sqrt( 2 / df );
  };

  /**
   * Get the skewness of ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The skewness of ChiSquared(df).
   */
  static skewness(params: Object): number {
    const { df } = this.validate(params);
    return ( Math.pow(2, 1.5) / Math.sqrt(df) );
  };

  /**
   * Get the kurtosis of ChiSquared(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The kurtosis of ChiSquared(df).
   */
  static kurtosis(params: Object): number {
    const { df } = this.validate(params);
    return 3 + (12 / df);
  };
};
