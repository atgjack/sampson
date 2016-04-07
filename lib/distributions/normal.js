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

  /**
   * Generate a random value from N(mu, sigma).
   * @param {number} mu - The mean.
   * @param {number} sigma - The standard deviation.
   * @return {number} The random value from N(mu, sigma).
   */
  static random(mu: number, sigma: number): number {
    if (typeof mu != 'number' || typeof sigma  != 'number') throw new Error('Need mu and sigma for the normal distribution.');
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
   * Generate an array of k random values from N(mu, sigma).
   * @param {number} k - The number of values to generate.
   * @param {number} mu - The mean.
   * @param {number} sigma - The standard deviation.
   * @return {Array<number>} An array of random values from N(mu, sigma).
   */
  static sample(k: number, mu: number, sigma: number): Array<number> {
    return Array.apply(null, Array(k)).map( () => this.random(mu, sigma) );
  };

  /**
   * Calculate the probability of exaclty x in N(mu, sigma).
   * @param {number} x - The value to predict.
   * @param {number} mu - The mean.
   * @param {number} sigma - The standard deviation.
   * @return {number} The probability of x happening in N(mu, sigma).
   */
  static pdf(x: number, mu: number, sigma: number): number {
    if (typeof x != 'number') throw new Error('x must be a number.')
    if (typeof mu != 'number' || typeof sigma  != 'number') throw new Error('Need mu and sigma for the normal distribution.');
    let u = x / Math.abs(sigma);
    return ( 1 / ( Math.sqrt(2 * Math.PI) * Math.abs(sigma) ) ) * Math.exp( -1 * Math.pow(x - mu, 2) / ( 2 * sigma * sigma) );
  };

  /**
   * Calculate the probability of getting x or less from N(mu, sigma).
   * @param {number} x - The value to predict.
   * @param {number} mu - The mean.
   * @param {number} sigma - The standard deviation.
   * @return {number} The probability of getting x or less from N(mu, sigma).
   */
  static cdf(x: number, mu: number, sigma: number): number {
    if (typeof x != 'number') throw new Error('x must be a number.')
    if (typeof mu != 'number' || typeof sigma  != 'number') throw new Error('Need mu and sigma for the normal distribution.');
    return .5 * (1 + error( (x - mu) / (sigma * Math.sqrt(2)) ));
  };

  /**
   * Generate a new Normal object.
   * @param {number} mu - The mean.
   * @param {number} sigma - The standard deviation.
   */
  constructor(mu: number, sigma: number): void {
    if (typeof mu != 'number' || typeof sigma  != 'number') throw new Error('Need mu and sigma for the normal distribution.');
    super();
    this.mu = mu;
    this.sigma = sigma;
    this.variance = sigma * sigma;
  };

  /**
   * Calculate the probability of exaclty x in N(mu, sigma).
   * @memberof Normal
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of x happening in N(mu, sigma).
   */
  pdf    = (x: number): number => this.constructor.pdf(x, this.mu, this.sigma);

  /**
   * Calculate the probability of getting x or less from N(mu, sigma).
   * @memberof Normal
   * @instance
   * @param {number} x - The value to predict.
   * @return {number} The probability of getting x or less from N(mu, sigma).
   */
  cdf    = (x: number): number => this.constructor.cdf(x, this.mu, this.sigma);

  /**
   * Generate a random value from N(mu, sigma).
   * @memberof Normal
   * @instance
   * @return {number} The random value from N(mu, sigma).
   */
  random = (): number => this.constructor.random(this.mu, this.sigma);

  /**
   * Generate an array of k random values from N(mu, sigma).
   * @param {number} k - The number of values to generate.
   * @memberof Normal
   * @instance
   * @return {Array<number>} An array of random values from N(mu, sigma).
   */
  sample = (n: number): array => this.constructor.sample(n, this.mu, this.sigma);
}
