/* @flow */
import { choose, stirling, gamma, lngamma, gammainc } from '../utils';
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

    /**
     * Generate a random value from Gamma(a, b).
     * @param {number} a - The shape.
     * @param {number} a - The rate.
     * @return {number} The random value from  Gamma(a, b).
     */
  static random(a: number, b: number): number {
    if (typeof a != 'number' || typeof a  != 'number') throw new Error('Need mu and sigma for the gamma distribution.');
    if (a <= 0) throw new Error('a must be greater than zero.');
    if (b <= 0) throw new Error('b must be greater than zero.');
    if (a < 1) {
      let u = super.random();
      return this.random(1 + a, b) * Math.pow(u, 1 / a)
    } else {
      let x, v, u;
      let d = a - 1 / 3;
      let c = 1 / Math.sqrt(9 * d);
      while(1) {
        do {
          x = Normal.random(0, 1);
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
   * @param {number} a - The shape.
   * @param {number} a - The rate.
   * @return {number} The probability of x happening in Gamma(a, b).
   */
  static pdf(x: number, a: number, b: number): number {
    if (typeof a != 'number' || typeof b  != 'number') throw new Error('Need a and b for the gamma distribution.');
    if (typeof x != 'number') throw new Error('x must be a number.');
    if (a <= 0) throw new Error('a must be greater than zero.');
    if (b <= 0) throw new Error('b must be greater than zero.');
    if (x < 0) {
      return 0
    } else if (x == 0) {
      if (a == 1) return b;
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
   * @param {number} a - The shape.
   * @param {number} a - The rate.
   * @return {number} The probability of getting x or less from Gamma(a, b).
   */
   static cdf(x: number, a: number, b: number): number {
     if (typeof a != 'number' || typeof b  != 'number') throw new Error('Need mu and sigma for the gamma distribution.');
     if (typeof x != 'number') throw new Error('x must be a number.');
     if (a <= 0) throw new Error('a must be greater than zero.');
     if (b <= 0) throw new Error('b must be greater than zero.');
     if (x <= 0) return 0
     else return gammainc(a, x * b);
   };

   /**
    * Generate an array of k random values from Gamma(a, b).
    * @param {number} k - The number of values to generate.
    * @param {number} a - The shape.
    * @param {number} a - The rate.
    * @return {Array<number>} An array of random values from Gamma(a, b).
    */
   static sample(x: number, a: number, b: number): Array<number> {
    return Array.apply(null, Array(x)).map( () => this.random(a, b) );
   };

   /**
    * Generate a new Gamma object.
    * @param {number} a - The shape.
    * @param {number} a - The rate.
    */
  constructor(a: number, b: number): void {
    if (typeof a != 'number' || typeof b  != 'number') throw new Error('Need mu and sigma for the gamma distribution.');
    if (a <= 0) throw new Error('a must be greater than zero.');
    if (b <= 0) throw new Error('b must be greater than zero.');
    super();
    this.a = a;
    this.b = b;
    this.mu = a / b;
    this.variance = a / (b * b);
  };

  /**
   * Calculate the probability of exaclty x in Gamma(a, b).
   * @memberof Gamma
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of x happening in Gamma(a, b).
   */
  pdf    = (x: number): number => this.constructor.pdf(x, this.a, this.b);

  /**
   * Calculate the probability of getting x or less from Gamma(a, b).
   * @memberof Gamma
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of getting x or less from Gamma(a, b).
   */
  cdf    = (x: number): number => this.constructor.cdf(x, this.a, this.b);

  /**
   * Generate a random value from Gamma(a, b).
   * @memberof Gamma
   * @instance
   * @return {number} The random value from Gamma(a, b).
   */
  random = (): number => this.constructor.random(this.a, this.b);

  /**
   * Generate an array of k random values from Gamma(a, b).
   * @param {number} k - The number of values to generate.
   * @memberof Gamma
   * @instance
   * @return {Array<number>} An array of random values from Gamma(a, b).
   */
  sample = (n: number): array => this.constructor.sample(n, this.a, this.b);;

}
