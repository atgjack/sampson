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
* The Student's t-Distribution is a continuous probability distribution
* with parameters df = degrees of freedom*.
* See: [Student's t-Distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
*/
export default class StudentsT extends Distribution {
  static covariates = 1;
  static parameters = {
    'df': (df) => ( df >= 0),
  };

  /**
   * Generate a random value from StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from StudentsT(df).
   */
  static random( params: Object): number {
    const { df } = this.validate(params);
    if (df <= 2) {
      let y1 = Normal.random({ mu: 0, sigma: 1 });
      let y2 = ChiSquare.random({ df });
      return y1 / Math.sqrt(y2 / df);
    } else {
      let y1, y2, z;
      do {
        y1 = Normal.random({ mu: 0, sigma: 1 });
        y2 = Exponential.random({ mu: 1 / (df / 2 - 1) });
        z  = y1 * y2 / (df - 2);
      } while (1 - z < 0 || Math.exp(-y2 - z) > (1 - z));
      return y1 / Math.sqrt( (1 - 2 / df) * (1 - z));
    }
  };

  /**
   * Calculate the probability of exaclty x in StudentsT(df).
   * @param {number} t - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in StudentsT(df).
   */
  static pdf(t: number,  params: Object): number {
    if (typeof t != 'number') throw TypeError('t must be a number.')
    const { df } = this.validate(params);
    let lg1 = lngamma(df / 2);
    let lg2 = lngamma((df + 1) / 2);
    return ((Math.exp(lg2 - lg1) / Math.sqrt(Math.PI * df)) * Math.pow((1 + t * t / df), -(df + 1) / 2));
  };

  /**
   * Calculate the probability of getting x or less StudentsT(df).
   * @param {number} t - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from StudentsT(df).
   */
  static cdf(t: number,  params: Object): number {
    if (typeof t != 'number') throw TypeError('t must be a number.')
    const { df } = this.validate(params);
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
//        if (s != idf) {
          idf = s;
          fk += 2;
//        }
      }
    }
    if (ioe != 1) return .5 + .5 * a * Math.sqrt(b) * s
    else {
      if (df == 1) s = 0;
      return .5 + (a * b * s + Math.atan(a)) * g1;
    };
  };

  /**
   * Get the mean of StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The mean of StudentsT(df).
   */
  static mean(params: Object): number {
    const { df } = this.validate(params);
    return df <= 1 ? NaN : 0;
  };

  /**
   * Get the variance of StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The variance of StudentsT(df).
   */
  static variance(params: Object): number {
    const { df } = this.validate(params);
    if (df < 1) return NaN
    else if (df <= 2) return Infinity
    else return df / (df - 2);
  };

  /**
   * Get the standard deviation of StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The standard deviation of StudentsT(df).
   */
  static stdDev(params: Object): number {
    const { df } = this.validate(params);
    if (df < 1) return NaN
    else if (df <= 2) return Infinity
    else return Math.sqrt( df / (df - 2) );
  };

  /**
   * Get the relative standard deviation of StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The relative standard deviation of StudentsT(df).
   */
  static relStdDev(params: Object): number {
    const { df } = this.validate(params);
    return NaN;
  };

  /**
   * Get the skewness of StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The skewness of StudentsT(df).
   */
  static skewness(params: Object): number {
    const { df } = this.validate(params);
    if (df > 3) return 0
    else return NaN;
  };

  /**
   * Get the kurtosis of StudentsT(df).
   * @param {Object} params - The distribution parameters.
   * @return {number} The kurtosis of StudentsT(df).
   */
  static kurtosis(params: Object): number {
    const { df } = this.validate(params);
    if (df <= 4) return NaN
    else return 3 * (df -2) / (df -4);
  };
};
