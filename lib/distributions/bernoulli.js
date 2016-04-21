/* @flow */
import Binomial from './binomial';
import Distribution from './distribution';

/**
* The Bernoulli Distribution is a discrete probability distribution
* with parameter p = *probability of success*.
* See: [Bernoulli Distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution)
*/
export default class Bernoulli extends Binomial {
  /**
   * Generate a random value from B(1, p).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from B(1,p).
   */
  static random(params: Object): number {
    const { p } = this.validate({ ...params, n: 1 });
    let u: number = Distribution.random();
    if (u < p) return 1
    else return 0;
  };

  /**
   * Calculate the probability of exaclty k in B(1, p).
   * @param {number} k - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of k happening in B(1,p).
   */
  static pdf(k: number, params: Object): number {
    const { p } = this.validate({ ...params, n: 1 });
    if (typeof k != 'number') throw new Error("k must be a number.")
    else if (k == 0) return 1 - p
    else if (k == 1) return p
    else return 0;
  };

  /**
   * Calculate the probability of k or less in B(1, p).
   * @param {number} k - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability getting a value of k or less from B(1,p).
   */
  static cdf(k: number, params: Object): number {
    const { p } = this.validate({ ...params, n: 1 });
    if (typeof k != 'number') throw new Error("k must be a number.")
    else if (k == 1) return p
    else if (k == 0) return 1 -p
    else return NaN;
  };

  /**
   * Generate a new Bernoulli object.
   * @param {Object} params - The distribution parameters.
   */
  constructor(params: Object): void {
    super({ ...params, n: 1 });
  };
}
