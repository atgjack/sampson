/* @flow */
import { gamma } from '../utils';
import Distribution from './distribution';
import Normal from './normal';
import ChiSquare from './chi-square';

// https://github.com/ampl/gsl/blob/master/randist/tdist.c
// http://docs.scipy.org/doc/scipy-0.16.0/reference/generated/scipy.stats.t.html
// https://github.com/chbrown/nlp/blob/master/src/main/java/cc/mallet/util/StatFunctions.java - CDF - ln236
export default class StudentsTDistribution extends Distribution {
  static covariates = 1;

  static random(df: number): number {
    //if (df <= 2)
    let y1 = Normal.random(0, 1);
    let y2 = ChiSquare.random(df)
    return y1 / Math.sqrt(y2 / df);
  };

  static pdf(t: number, df: number): number {
    if (df <= 0) return NaN
    else {
      return gamma((df + 1)/2) / (Math.sqrt(Math.PI * df) * gamma(df / 2) * Math.pow( Math.pow(1+t, 2/df), -(df + 1) / 2));
    }
  };

  static cdf(t: number, df: number): number {
    if (df <= 0) return NaN
    else {
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
  };

  constructor(df: number): void {
    if (df >= 0) throw RangeError('df must be greater than zero.');
    super();
    this.df = df;
  };

  pdf    = (t: number): number => this.constructor.pdf(t, this.df);
  cdf    = (t: number): number => this.constructor.cdf(t, this.df);
  random = (): number => this.constructor.random(this.df);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );
}
