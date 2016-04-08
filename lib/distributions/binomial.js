/* @flow */
import { choose, stirling, mean } from '../utils'
import Distribution from './distribution'

const SMALL_MEAN = 14;

/**
* The Binomial Distribution is a discrete probability distribution
* with parameters n = *number of trials* and p = *probability of success*.
* See: [Binomial Distribution](https://en.wikipedia.org/wiki/Binomial_distribution)
*/
export default class Binomial extends Distribution {
  static covariates = 2;
  static discrete = true;

  /**
   * Get the mean.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The mean of B(n,p).
   */
  static mean(p: number, n: number): number {
    return n * p;
  };

  /**
   * Get the variance.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The variance of B(n,p).
   */
  static variance(p: number, n: number): number {
    return n * p * (1 - p)
  };

  /**
   * Get the standard deviation.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The standard deviation of B(n,p).
   */
  static stdDev(p: number, n: number): number {
    return Math.sqrt( n * p * (1 - p) );
  };

  /**
   * Get the relative standard deviation.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The relative standard deviation of B(n,p).
   */
  static relativeStdDev(p: number, n: number): number {
    return Math.sqrt( (1 - p) / (n * p) );
  };

  /**
   * Get the skewness.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The skewness of B(n,p).
   */
  static skewness(p: number, n: number): number {
    return (1 - (2 * p)) / Math.sqrt( n * p * (1 - p) );
  };

  /**
   * Get the kurtosis.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The kurtosis of B(n,p).
   */
  static kurtosis(p: number, n: number): number {
    return 3 - (6 / n) + (1 / (n * p * (1 - p)));
  };

  /**
   * Generate a random value from B(n, p).
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The random value from B(n,p).
   */
  static random(p: number, n: number): number {
    if (typeof p != 'number' || p > 1 || p < 0) throw new Error("p must be between 0 and 1.")
    if (typeof n != 'number' || n < 0) throw new Error("n must be positive or zero.")
    if (n == 0) return 0;

    let flipped: boolean = false;
    let ix: number = 0;
    let prob: number;
    if (p > 0.5) {
      flipped = true;
      prob = 1 - p;
    } else prob = p;
    let q: number = 1 - prob;
    let s: number = prob / q;
    let np: number = n * prob;
    if (np < SMALL_MEAN) {
      let f: number = Math.pow(q, n);
      let u: number = super.random();
      while (ix <= n && u >= f) {
        u -= f;
        f *= s * (n - ix) / (ix + 1);
        ix++;
      };
    } else {

      let ffm: number = np + prob;
      let fm: number = Math.floor(ffm);
      let xm: number = fm + 0.5;
      let npq: number = np * q;

      let p1: number = Math.floor( (2.195 * Math.sqrt(npq)) - (4.6 * q) ) + 0.5;

      let xl = xm - p1;
      let xr = xm + p1;

      let c = 0.134 + 20.5 / (15.3 + fm);
      let p2 = p1 * (1.0 + c + c);

      let al = (ffm - xl) / (ffm - xl * prob);
      let lambda_l = al * (1.0 + 0.5 * al);
      let ar = (xr - ffm) / (xr * q);
      let lambda_r = ar * (1 + 0.5 + ar);
      let p3 = p2 + c / lambda_l;
      let p4 = p3 + c / lambda_r;

      let varr, accept, u, v;

      let tryAgain: Function = (): void => {
        u = super.random() * p4;
        v = super.random();
        if (u <= p1) {
          ix = Math.floor( xm - (p1 * v) + u);
        } else if ( u <= p2) {
          let x = xl + ((u - p1) / c);
          v = (v * c) + 1.0 - (Math.abs(x - xm) / p1);
          if (v > 1.0 || v <= 0.0) {
            tryAgain();
          } else {
            ix = x;
          };
        } else if (u <= p3) {
          ix = Math.floor(xl + (Math.log(v) / lambda_l));
          v *= ((u - p2) * lambda_l);
        } else {
          ix = Math.floor(xr - (Math.log(v) / lambda_r));
          v *= ((u - p3) * lambda_r);
        };
        varr = Math.log(v);
        let x1: number = ix + 1;
        let w1: number = n - ix - 1;
        let f1: number = fm + 1;
        let z1: number = n + 1 - fm;
        accept = xm * Math.log(f1 / x1) + (n - fm + .5) * Math.log(z1 / w1) + (ix - fm) * Math.log(w1 * prob / (x1 * q)) + stirling(f1) + stirling(z1) - stirling(x1) - stirling(w1);
        // skipped the faster options for now
        if (varr > accept) tryAgain();
      };
      tryAgain();
    };

    return Math.floor(flipped ? (n - ix) : ix);
  };

  /**
   * Generate an array of k random values from B(n, p).
   * @param {number} k - The number of values to generate.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {Array<number>} An array of random values from B(n,p).
   */
  static sample(k: number, p: number, n: number): Array<number> {
    return Array.apply(null, Array(k)).map( () => this.random(p, n) );
  };

  /**
   * Calculate the probability of exaclty k in B(n, p).
   * @param {number} k - The value to predict.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The probability of k happening in B(n,p).
   */
  static pmf(k: number, p: number, n: number): number {
    if (k < 0 || k > n) return 0
    else {
      let P: number;
      if (p == 0) { P = (k == 0) ? 1 : 0 }
      else if (p == 1) { P = (k == n) ? 1 : 0 }
      else {
        let Cnk = choose(n, k);
        let pows = Math.pow(p, k) * Math.pow((1-p), (n-k));
        if (Cnk == 'Infinity') {
          if (pows == 0) return 0
          else return Cnk;
        } else {
          return Cnk * pows;
        }
      }
      return P;
    };
  };

  /**
   * Calculate the probability of k or less in B(n, p).
   * @param {number} k - The value to predict.
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   * @return {number} The probability getting a value of k or less from B(n,p).
   */
  static cdf(k: number, p: number, n: number): number {
    if (typeof p != 'number' || p > 1 || p < 0) throw new Error("p must be between 0 and 1.")
    else if (typeof k != 'number') throw new Error("k must be a number.")
    else if (typeof n != 'number' || n < 0) throw new Error("n must be positive or zero.")
    else if (k < 0) return 0
    else if (n < k) return 1
    else return Array.apply( null, Array(Math.floor(k) + 1) ).map( (_, i) => {
      return choose(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
    }).reduce( (prev, next) => prev + next, 0 );
  };

  /**
   * Generate a new Binomial object.
   * @constructs Binomial
   * @param {number} p - The probability of success.
   * @param {number} n - number of trials.
   */
  constructor(p: number, n: number): void {
    if (p == undefined || p > 1 || p < 0) throw new Error("p must be between 0 and 1.")
    if (n == undefined || n < 0) throw new Error("n must be positive or zero.")
    super();
    this.p = p;
    this.n = n;
    this.mu = this.constructor.mean(p, n);
    this.variance = this.constructor.variance(p, n);
    this.stdDev = this.constructor.stdDev(p, n);
    this.relStdDev = this.constructor.relativeStdDev(p, n);
    this.skewness = this.constructor.skewness(p, n);
    this.kurtosis = this.constructor.kurtosis(p, n);
  };

  /**
   * Calculate the probability of exaclty k in B(n, p).
   * @memberof Binomial
   * @instance
   * @param {number} k - The value to predict.
   * @return {number} The probability of k happening in B(n,p).
   */
  pdf    = (k: number): number => this.constructor.pmf(k, this.p, this.n);

  /**
   * Calculate the probability of k or less in B(n, p).
   * @memberof Binomial
   * @instance
   * @param {number} k - The value to predict.
   * @return {number} The probability getting a value of k or less from B(n,p).
   */
  cdf    = (k: number): number => this.constructor.cdf(k, this.p, this.n);

  /**
   * Generate a random value from B(n, p).
   * @memberof Binomial
   * @instance
   * @return {number} The random value from B(n,p).
   */
  random = (): number => this.constructor.random(this.p, this.n);

  /**
   * Generate an array of k random values from B(n, p).
   * @memberof Binomial
   * @instance
   * @param {number} k - The number of values to generate.
   * @return {Array<number>} An array of random values from B(n,p).
   */
  sample = (k: number): array => this.constructor.sample(k, this.p, this.n);

}
