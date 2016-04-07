/* @flow */
import Binomial from './binomial';
import Distribution from './distribution';

/**
* The Binomial Distribution is a discrete probability distribution
* with parameters n = *number of trials* and p = *probability of success*.
* See: [Bernoulli Distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution)
* @extends Binomial
*/
export default class Bernoulli extends Binomial {
  static covariates = 1;

  /**
   * Generate a random value from B(1, p).
   * @param {number} p - The probability of success.
   * @return {number} The random value from B(1,p).
   */
  static random(p: number): number {
    if (p == undefined || p < 0 || p > 1) throw new Error('p must be between zero and one inclusive.')
    let u: number = Distribution.random();
    if (u < p) return 1
    else return 0;
  };

  /**
   * Calculate the probability of exaclty k in B(1, p).
   * @param {number} k - The value to predict.
   * @param {number} p - The probability of success.
   * @return {number} The probability of k happening in B(1,p).
   */
  static pmf(k: number, p: number): number {
    if (k == 0) return 1 - p
    else if (k == 1) return p
    else return 0;
  };

  /**
   * Calculate the probability of k or less in B(1, p).
   * @param {number} k - The value to predict.
   * @param {number} p - The probability of success.
   * @return {number} The probability getting a value of k or less from B(1,p).
   */
  static cdf(k: number, p: number): number {
    if (typeof p != 'number' || p > 1 || p < 0) throw new Error("p must be between zero and one inclusive.")
    else if (typeof k != 'number') throw new Error("k must be a number.")
    else if (k == 1) return p
    else if (k == 0) return 1 -p
    else return NaN;
  };

  /**
   * Generate a new Bernoulli object.
   * @param {number} p - The probability of success.
   */
  constructor(p: number): void {
    super(p, 1);
  };

  /**
   * Calculate the probability of exaclty k in B(1, p).
   * @memberof Bernoulli
   * @instance
   * @param {number} k - The value to predict.
   * @return {number} The probability of k happening in B(1,p).
   */
  pdf    = (k: number): number => this.constructor.pmf(k, this.p);

  /**
  * Calculate the probability of k or less in B(1, p).
   * @memberof Bernoulli
   * @instance
   * @param {number} k - The value to predict.
   * @return {number} The probability getting a value of k or less from B(1,p).
   */
  cdf    = (k: number): number => this.constructor.cdf(k, this.p);

  /**
   * Generate a random value from B(1, p).
   * @memberof Bernoulli
   * @instance
   * @return {number} The random value from B(1,p).
   */
  random = (): number => this.constructor.random(this.p);

  /**
   * Generate an array of k random values from B(1, p).
   * @memberof Bernoulli
   * @instance
   * @param {number} k - The number of values to generate.
   * @return {Array<number>} An array of random values from B(1,p).
   */
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );
}
