/* @flow */
import { lngamma, stirling, gammainc_lower, sum } from '../utils';
import Distribution from './distribution';
import Gamma from './gamma';
import Binomial from './binomial';

/**
* The Poisson Distribution is a discrete probability distribution
* with parameters mu = *expected value*.
* See: [Poisson Distribution](https://en.wikipedia.org/wiki/Poisson_distribution)
*/
export default class Poisson extends Distribution {
  static covariates = 1;
  static discrete = true;
  static parameters = {
    'mu': (mu) => ( mu >= 0),
  };

  /**
   * Generate a random value from B(n, p).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Poisson(mu).
   */
  static random(params: Object): number {
    let { mu } = this.validate(params);
    let prod = 1;
    let emu;
    let k = 0;
    while (mu > 10) {
      let m = Math.round(mu * (7 / 8));
      let x = Gamma.random({ a: m, b: 1 });
      if (x >= mu) return k + Binomial.random({ p: mu / x, n: m - 1})
      else {
        k += m;
        mu -= x;
      };
    };
    emu = Math.exp(-mu)
    do {
      prod *= super.random()
      k++
    } while (prod > emu);
    return k - 1;
  };

  /**
   * Calculate the probability of exaclty k in B(n, p).
   * @param {number} k - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of k happening in Poisson(mu).
   */
  static pdf(k: number, params: Object): number {
    const { mu } = this.validate(params);
    if (typeof k !== 'number') throw new Error('k must be a number.')
    else return Math.exp( Math.log(mu) * k - lngamma(k + 1) - mu);
  };

  /**
   * Calculate the probability of k or less in B(n, p).
   * @param {number} k - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability getting a value of k or less from Poisson(mu).
   */
  static cdf(k: number, params: Object): number {
    const { mu } = this.validate(params);
    if (typeof k !== 'number') throw new Error('k must be a number.')
    else if (k < 0) return 0
    else {
      let arr = Array.apply(null, Array(k + 1)).map( (_, i) => this.pdf(i, params));
      return sum(arr);
    };
  };

  /**
  * Get the mean of Poisson(mu).
  * @param {Object} params - The distribution parameters.
  * @return {number} The mean of Poisson(mu).
  */
  static mean(params: Object): number {
    const { mu } = this.validate(params);
    return mu;
  };

  /**
  * Get the variance of Poisson(mu).
  * @param {Object} params - The distribution parameters.
  * @return {number} The variance of Poisson(mu).
  */
  static variance(params: Object): number {
    const { mu } = this.validate(params);
    return mu;
  };

  /**
  * Get the skewness of Poisson(mu).
  * @param {Object} params - The distribution parameters.
  * @return {number} The skewness of Poisson(mu).
  */
  static skewness(params: Object): number {
    const { mu } = this.validate(params);
    return Math.pow(mu, -.5);
  };

  /**
  * Get the kurtosis of Poisson(mu).
  * @param {Object} params - The distribution parameters.
  * @return {number} The kurtosis of Poisson(mu).
  */
  static kurtosis(params: Object): number {
    const { mu } = this.validate(params);
    return Math.pow(mu, -1);
  };

}
