/* @flow */
import { lngamma } from '../utils';
import Distribution from './distribution';
import Normal from './normal';
import Exponential from './exponential';
import ChiSquare from './chi-square';

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/tdist.c
// Code kanged from: http://docs.scipy.org/doc/scipy-0.16.0/reference/generated/scipy.stats.t.html
// Code kanged from: https://github.com/chbrown/nlp/blob/master/src/main/java/cc/mallet/util/StatFunctions.java - CDF - ln236

/**
* The Chi-Squared Distribution is a continuous probability distribution
* with parameters df = degrees of freedom*.
* See: [Student's t-Distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
*/
export default class StudentsT extends Distribution {
  static covariates = 1;

  /**
   * Generate a random value from StudentsT(df).
   * @param {number} df - The degrees of freedom.
   * @return {number} The random value from StudentsT(df).
   */
  static random(df: number): number {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    if (df <= 2) {
      let y1 = Normal.random(0, 1);
      let y2 = ChiSquare.random(df);
      return y1 / Math.sqrt(y2 / df);
    } else {
      let y1, y2, z;
      do {
        y1 = Normal.random(0, 1);
        y2 = Exponential.random(1 / (df / 2 - 1));
        z  = y1 * y2 / (df - 2);
      } while (1 - z < 0 || Math.exp(-y2 - z) > (1 - z));
      return y1 / Math.sqrt( (1 - 2 / df) * (1 - z));
    }
  };

  /**
   * Calculate the probability of exaclty x in StudentsT(df).
   * @param {number} t - The value to predict.
   * @param {number} df - The degrees of freedom.
   * @return {number} The probability of x happening in StudentsT(df).
   */
  static pdf(t: number, df: number): number {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    if (typeof t != 'number') throw TypeError('t must be a number.')
    let lg1 = lngamma(df / 2);
    let lg2 = lngamma((df + 1) / 2);
    return ((Math.exp(lg2 - lg1) / Math.sqrt(Math.PI * df)) * Math.pow((1 + t * t / df), -(df + 1) / 2));
  };

  /**
   * Calculate the probability of getting x or less StudentsT(df).
   * @param {number} t - The value to predict.
   * @param {number} df - The degrees of freedom.
   * @return {number} The probability of getting x or less from StudentsT(df).
   */
  static cdf(t: number, df: number): number {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    if (typeof t != 'number') throw TypeError('t must be a number.')
    let a, b, idf, im2, ioe, s, c,ks, fk, k;
    let g1 = 1 / Math.PI;
    idf = df;
    a = t / Math.sqrt(idf);
    b = idf / (idf + t * t);
    im2 = df - 2;
    ioe = idf % 2;
    s = 1;
    c = 1;
    idf = 1;
    ks = 2 + ioe;
    fk = ks;
    if (im2 >= 2) {
      for (k = ks; k <= im2; k += 2) {
        c = c * b * (fk -1) / fk;
        s += c;
        if (s != idf) {
          idf = s;
          fk += 2;
        }
      }
    }
    if (ioe != 1) return .5 + .5 * a * Math.sqrt(b) * s
    else {
      if (df == 1) s = 0;
      return .5 + (a * b * s + Math.atan(a)) * g1;
    };
  };

   /**
    * Generate an array of k random values from StudentsT(df).
    * @param {number} k - The number of values to generate.
    * @param {number} df - The degrees of freedom.
    * @return {Array<number>} An array of random values from StudentsT(df).
    */
   static sample(k: number, df: number): Array<number> {
     if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
     return Array.apply(null, Array(k)).map( () => this.random(df) );
   };

   /**
    * Generate a new StudentsT object.
    * @param {number} df - The degrees of freedom.
    */
  constructor(df: number): void {
    if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
    super();
    this.df = df;
    this.mean = 0;
    this.variance = df > 2 ? (df / (df - 2)) : Infinity;
  };

    /**
     * Calculate the probability of exaclty x in StudentsT(df).
     * @memberof StudentsT
     * @instance
     * @param {number} t - The value to predict.
     * @return {number} The probability of x happening in StudentsT(df).
     */
    pdf    = (t: number): number => this.constructor.pdf(t, this.df);

    /**
     * Calculate the probability of getting x or less from StudentsT(df).
     * @memberof StudentsT
     * @instance
     * @param {number} t - The value to predict.
     * @return {number} The probability of getting x or less from StudentsT(df).
     */
    cdf    = (t: number): number => this.constructor.cdf(t, this.df);

    /**
     * Generate a random value from StudentsT(df).
     * @memberof StudentsT
     * @instance
     * @return {number} The random value from StudentsT(df).
     */
    random = (): number => this.constructor.random(this.df);

    /**
     * Generate an array of k random values from StudentsT(df).
     * @param {number} k - The number of values to generate.
     * @memberof StudentsT
     * @instance
     * @return {Array<number>} An array of random values from StudentsT(df).
     */
    sample = (n: number): array => this.constructor.sample(n, this.df);;

  }
