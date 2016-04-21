/* @flow */
import { error } from '../utils';
import Distribution from './distribution'

let last: number = NaN;

/**
* The Normal Distribution is a continuous probability distribution
* with parameters mu = *mean* and sigma = *standard deviation*.
* See: [Normal Distribution](https://en.wikipedia.org/wiki/Normal)
*/
export default class Normal extends Distribution {
  static covariates = 2;
  static discrete = false;
  static parameters = {
    'mu': (mu) => true,
    'sigma': (sigma) => ( sigma >= 0 )
  };

  /**
   * Generate a random value from Normal(mu, sigma).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Normal(mu, sigma).
   */
  static random(params: Object): number {
    const { mu, sigma } = this.validate(params);
    let z: number = last;
    last = NaN;
    if (!z) {
      let a: number = super.random() * 2 * Math.PI;
      let b: number = Math.sqrt( -2.0 * Math.log( 1.0 - super.random() ) );
      z = Math.cos(a) * b;
      last = Math.sin(a) * b;
    }
    return mu + z * sigma;
  };

  /**
   * Calculate the probability of exaclty x in Normal(mu, sigma).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Normal(mu, sigma).
   */
  static pdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new Error('x must be a number.')
    const { mu, sigma } = this.validate(params);
    let u = x / Math.abs(sigma);
    return ( 1 / ( Math.sqrt(2 * Math.PI) * Math.abs(sigma) ) ) * Math.exp( -1 * Math.pow(x - mu, 2) / ( 2 * sigma * sigma) );
  };

  /**
   * Calculate the probability of getting x or less from Normal(mu, sigma).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Normal(mu, sigma).
   */
  static cdf(x: number, params: Object): number {
    if (typeof x != 'number') throw new Error('x must be a number.')
    const { mu, sigma } = this.validate(params);
    return .5 * (1 + error( (x - mu) / (sigma * Math.sqrt(2)) ));
  };


   /**
    * Get the mean of Normal(mu, sigma).
    * @param {Object} params - The distribution parameters.
    * @return {number} The mean of Normal(mu, sigma).
    */
   static mean(params: Object): number {
     const { mu, sigma } = this.validate(params);
     return mu;
   };

   /**
    * Get the variance of Normal(mu, sigma).
    * @param {Object} params - The distribution parameters.
    * @return {number} The variance of Normal(mu, sigma).
    */
   static variance(params: Object): number {
     const { mu, sigma } = this.validate(params);
     return sigma * sigma;
   };

   /**
    * Get the standard deviation of Normal(mu, sigma).
    * @param {Object} params - The distribution parameters.
    * @return {number} The standard deviation of Normal(mu, sigma).
    */
   static stdDev(params: Object): number {
     const { mu, sigma } = this.validate(params);
     return sigma;
   };

   /**
    * Get the relative standard deviation of Normal(mu, sigma).
    * @param {Object} params - The distribution parameters.
    * @return {number} The relative standard deviation of Normal(mu, sigma).
    */
   static relStdDev(params: Object): number {
     const { mu, sigma } = this.validate(params);
     return sigma / mu;
   };

   /**
    * Get the skewness of Normal(mu, sigma).
    * @param {Object} params - The distribution parameters.
    * @return {number} The skewness of Normal(mu, sigma).
    */
   static skewness(params: Object): number {
     return 0;
   };

   /**
    * Get the kurtosis of Normal(mu, sigma).
    * @param {Object} params - The distribution parameters.
    * @return {number} The kurtosis of Normal(mu, sigma).
    */
   static kurtosis(params: Object): number {
     return 3;
   };
};
