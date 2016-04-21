/* @flow */
import { choose, stirling, gamma, lngamma, gammainc_lower } from '../utils';
import Normal from './normal';
import Distribution from './distribution';

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/gamma.c

/**
* The Gamma Distribution is a continuous probability distribution
* with parameters a = *shape* and b = *rate*.
* See: [Gamma Distribution](https://en.wikipedia.org/wiki/Gamma_distribution)
*/
export default class Gamma extends Distribution {
  static covariates = 2;
  static parameters = {
    'a': (a) => ( a > 0 ),
    'b': (b) => ( b > 0 )
  };

  /**
   * Generate a random value from Gamma(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from  Gamma(a, b).
   */
  static random(params: Object): number {
    const { a, b } = this.validate(params);
    if (a < 1) {
      let u = super.random();
      return this.random({a: 1 + a, b}) * Math.pow(u, 1 / a)
    } else {
      let x, v, u;
      let d = a - 1 / 3;
      let c = 1 / Math.sqrt(9 * d);
      while(1) {
        do {
          x = Normal.random( { mu: 0, sigma: 1 } );
          v = 1 + c * x;
        } while (v <= 0);
        v = v * v * v;
        while (!u) { u = super.random(); };
        if (u < 1 - 0.0331 * x * x * x * x) break;
        if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) break;
      };
      return d * v / b;
    }
  };

  /**
   * Calculate the probability of exaclty x in Gamma(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Gamma(a, b).
   */
  static pdf(x: number, params: Object): number {
    const { a, b } = this.validate(params);
    if (typeof x != 'number') throw new Error('x must be a number.')
    else if (x < 0) {
      return 0
    } else if (x == 0) {
      if (a == 1) return b
      else return 0;
    } else if (a == 1) {
      return Math.exp(-x * b) * b
    } else {
      return Math.exp(( a - 1 ) * Math.log( x * b) - (x * b) - lngamma(a)) * b;
    };
  };

  /**
   * Calculate the probability of getting x or less Gamma(a, b).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Gamma(a, b).
   */
  static cdf(x: number, params: Object): number {
    const { a, b } = this.validate(params);
    if (typeof x != 'number') throw new Error('x must be a number.')
    else if (x <= 0) return 0
    else return gammainc_lower(a, x * b);
  };

  /**
  * Get the mean of Gamma(a, b).
  * @param {Object} params - The distribution parameters.
  * @return {number} The mean of Gamma(a, b).
  */
  static mean(params: Object): number {
    const { a, b } = this.validate(params);
    return a / b;
  };

  /**
  * Get the variance of Gamma(a, b).
  * @param {Object} params - The distribution parameters.
  * @return {number} The variance of Gamma(a, b).
  */
  static variance(params: Object): number {
    const { a, b } = this.validate(params);
    return a / ( b * b );
  };

  /**
  * Get the standard deviation of Gamma(a, b).
  * @param {Object} params - The distribution parameters.
  * @return {number} The standard deviation of Gamma(a, b).
  */
  static stdDev(params: Object): number {
    const { a, b } = this.validate(params);
    return Math.sqrt( a / ( b * b) );
  };

  /**
  * Get the relative standard deviation of Gamma(a, b).
  * @param {Object} params - The distribution parameters.
  * @return {number} The relative standard deviation of Gamma(a, b).
  */
  static relStdDev(params: Object): number {
    const { a, b } = this.validate(params);
    return 1 / Math.sqrt(a);
  };

  /**
  * Get the skewness of Gamma(a, b).
  * @param {Object} params - The distribution parameters.
  * @return {number} The skewness of Gamma(a, b).
  */
  static skewness(params: Object): number {
    const { a, b } = this.validate(params);
    return 2 / Math.sqrt( a );
  };

  /**
   * Get the kurtosis of Gamma(a, b).
   * @param {Object} params - The distribution parameters.
   * @return {number} The kurtosis of Gamma(a, b).
   */
  static kurtosis(params: Object): number {
    const { a, b } = this.validate(params);
    return 6 / a;
  };
};
