/* @flow */
import { gamma, lngamma, gammainc } from '../utils';
import Distribution from './distribution';
import Gamma from './gamma';

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/chisq.c

/**
* The Chi-Squared Distribution is a continuous probability distribution
* with parameters df = degrees of freedom*.
* See: [Chi-Squared Distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution)
*/
export default class ChiSquared extends Distribution {
  static covariates = 1;

  /**
   * Generate a random value from ChiSquared(df).
   * @param {number} df - The degrees of freedom.
   * @return {number} The random value from ChiSquared(df).
   */
  static random(df: number): number {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    else return 2 * Gamma.random( df / 2, 1)
  };

  /**
   * Calculate the probability of exaclty x in ChiSquared(df).
   * @param {number} x - The value to predict.
   * @param {number} df - The degrees of freedom.
   * @return {number} The probability of x happening in ChiSquared(df).
   */
  static pdf(x: number, df: number): number {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    else if (typeof x != 'number') throw new TypeError('x must be a number')
    else if (x < 0) return 0
    else if (df == 2) return Math.exp(-x / 2) / 2
    else {
      return Math.exp( (df / 2 - 1) * Math.log(x / 2) - x / 2 - (lngamma(df/2))) / 2;
    }
  };

  /**
   * Calculate the probability of getting x or less ChiSquared(df).
   * @param {number} x - The value to predict.
   * @param {number} df - The degrees of freedom.
   * @return {number} The probability of getting x or less from ChiSquared(df).
   */
  static cdf(x: number, df: number): number {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    else if (typeof x != 'number') throw new TypeError('x must be a number')
    else if (x < 0) return 0
    else if (df == 2) return 1 - Math.exp(-x / 2)
    else return gammainc(df / 2, x / 2)
  };

   /**
    * Generate an array of k random values from ChiSquared(df).
    * @param {number} k - The number of values to generate.
    * @param {number} df - The degrees of freedom.
    * @return {Array<number>} An array of random values from ChiSquared(df).
    */
   static sample(k: number, df: number): Array<number> {
    return Array.apply(null, Array(k)).map( () => this.random(df) );
   };

   /**
    * Generate a new ChiSquared object.
    * @param {number} df - The degrees of freedom.
    */
  constructor(df: number): void {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    super();
    this.df = df;
    this.mu = df;
    this.variance = 2 * df;
  };

  /**
   * Calculate the probability of exaclty x in ChiSquared(df).
   * @memberof ChiSquared
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of x happening in ChiSquared(df).
   */
  pdf    = (x: number): number => this.constructor.pdf(x, this.df);

  /**
   * Calculate the probability of getting x or less from ChiSquared(df).
   * @memberof ChiSquared
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of getting x or less from ChiSquared(df).
   */
  cdf    = (x: number): number => this.constructor.cdf(x, this.df);

  /**
   * Generate a random value from ChiSquared(df).
   * @memberof ChiSquared
   * @instance
   * @return {number} The random value from ChiSquared(df).
   */
  random = (): number => this.constructor.random(this.df);

  /**
   * Generate an array of k random values from ChiSquared(df).
   * @param {number} k - The number of values to generate.
   * @memberof ChiSquared
   * @instance
   * @return {Array<number>} An array of random values from ChiSquared(df).
   */
  sample = (n: number): array => this.constructor.sample(n, this.df);;

}
