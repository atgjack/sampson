/* @flow */
import { choose, stirling, gamma, lngamma, gammainc } from '../utils';
import Normal from './normal';
import Distribution from './distribution';

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/exponential.c

/**
* The Exponential Distribution is a continuous probability distribution
* with parameters r = *rate*.
* See: [Exponential Distribution](https://en.wikipedia.org/wiki/Exponential_distribution)
*/
export default class Exponential extends Distribution {
  static covariates = 2;

  /**
   * Generate a random value from Exponential(mu).
   * @param {number} mu - The scale.
   * @return {number} The random value from Exponential(mu).
   */
  static random(mu: number): number {
    if (typeof mu != 'number' || typeof mu  != 'number') throw new Error('Need mu for the exponential distribution.');
    if (mu <= 0) throw new Error('mu must be greater than zero.');
    return -mu * Math.log1p(-super.random());
  };

  /**
   * Calculate the probability of exaclty x in Exponential(mu).
   * @param {number} x - The value to predict.
   * @param {number} mu - The scale.
   * @return {number} The probability of x happening in Exponential(mu).
   */
  static pdf(x: number, mu: number): number {
    if (typeof mu != 'number') throw new Error('Need mu for the exponential distribution.');
    if (typeof x != 'number') throw new Error('x must be a number.');
    if (mu <= 0) throw new Error('a must be greater than zero.');
    if (x < 0) {
      return 0
    } else {
      return Math.exp( -x / mu ) / mu;
    };
  };

  /**
   * Calculate the probability of getting x or less Exponential(mu).
   * @param {number} x - The value to predict.
   * @param {number} mu - The scale.
   * @return {number} The probability of getting x or less from Exponential(mu).
   */
   static cdf(x: number, mu: number): number {
     if (typeof mu != 'number') throw new Error('Need mu and sigma for the gamma distribution.');
     if (typeof x != 'number') throw new Error('x must be a number.');
     if (mu <= 0) throw new Error('a must be greater than zero.');
     if ( x <= 0) return 0
     else return 1 - Math.exp(-x / mu);
   };

   /**
    * Generate an array of k random values from Exponential(mu).
    * @param {number} k - The number of values to generate.
    * @param {number} mu - The scale.
    * @return {Array<number>} An array of random values from Exponential(mu).
    */
   static sample(k: number, mu: number): Array<number> {
    return Array.apply(null, Array(k)).map( () => this.random(mu) );
   };

   /**
    * Generate a new Exponential object.
    * @param {number} mu - The scale.
    */
  constructor(mu: number): void {
    if (typeof mu != 'number') throw new Error('Need mu for the exponential distribution.');
    if (mu <= 0) throw new Error('mu must be greater than zero.');
    super();
    this.mu = mu;
    this.mean = mu;
    this.variance = Math.pow(mu, -1);
  };

  /**
   * Calculate the probability of exaclty x in Exponential(mu).
   * @memberof Exponential
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of x happening in Exponential(mu).
   */
  pdf    = (x: number): number => this.constructor.pdf(x, this.mu);

  /**
   * Calculate the probability of getting x or less from Exponential(mu).
   * @memberof Exponential
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of getting x or less from Exponential(mu).
   */
  cdf    = (x: number): number => this.constructor.cdf(x, this.mu);

  /**
   * Generate a random value from Exponential(mu).
   * @memberof Exponential
   * @instance
   * @return {number} The random value from Exponential(mu).
   */
  random = (): number => this.constructor.random(this.mu);

  /**
   * Generate an array of k random values from Exponential(mu).
   * @param {number} k - The number of values to generate.
   * @memberof Exponential
   * @instance
   * @return {Array<number>} An array of random values from Exponential(mu).
   */
  sample = (k: number): array => this.constructor.sample(k, this.mu);

}
