/* @flow */
import { choose, stirling, gamma, lngamma, gammainc } from '../utils';
import Normal from './normal';
import Distribution from './distribution';

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/exponential.c

/**
* The Exponential Distribution is a continuous probability distribution
* with parameters mu = *rate*.
* See: [Exponential Distribution](https://en.wikipedia.org/wiki/Exponential_distribution)
*/
export default class Exponential extends Distribution {
  static covariates = 1;

  /**
   * @private
   * @param {Object} params - The distribution parameters.
   * @return {Object} The given parameters.
   */
  static validate(params: Object): Object {
    if (!params || params.mu === undefined) {
      throw new Error('need a parameter object of shape { mu: number }.')
    };
    const { mu } = params;
    if (typeof mu != 'number' || mu <= 0) throw RangeError('mu must be greater than zero.');
    return params
  }

  /**
   * Generate a random value from Exponential(mu).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Exponential(mu).
   */
  static random(params: Object): number {
    const { mu } = this.validate(params);
    return -mu * Math.log1p(-super.random());
  };

  /**
   * Calculate the probability of exaclty x in Exponential(mu).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Exponential(mu).
   */
  static pdf(x: number, params: Object): number {
    const { mu } = this.validate(params);
    if (typeof x != 'number') throw new Error('x must be a number.');
    else if (x < 0) {
      return 0
    } else {
      return Math.exp( -x / mu ) / mu;
    };
  };

  /**
   * Calculate the probability of getting x or less Exponential(mu).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Exponential(mu).
   */
   static cdf(x: number, params: Object): number {
     const { mu } = this.validate(params);
     if (typeof x != 'number') throw new Error('x must be a number.');
     else if ( x <= 0) return 0
     else return 1 - Math.exp(-x / mu);
   };

   /**
    * Get the mean of Exponential(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The mean of Exponential(mu).
    */
   static mean(params: Object): number {
     const { mu } = this.validate(params);
     return mu;
   };

   /**
    * Get the variance of Exponential(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The variance of Exponential(mu).
    */
   static variance(params: Object): number {
     const { mu } = this.validate(params);
     return mu * mu;
   };

   /**
    * Get the standard deviation of Exponential(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The standard deviation of Exponential(mu).
    */
   static stdDev(params: Object): number {
     const { mu } = this.validate(params);
     return mu;
   };

   /**
    * Get the relative standard deviation of Exponential(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The relative standard deviation of Exponential(mu).
    */
   static relStdDev(params: Object): number {
     return 1;
   };

   /**
    * Get the skewness of Exponential(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The skewness of Exponential(mu).
    */
   static skewness(params: Object): number {
     return 2;
   };

   /**
    * Get the kurtosis of Exponential(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The kurtosis of Exponential(mu).
    */
   static kurtosis(params: Object): number {
     return 9;
   };
};
