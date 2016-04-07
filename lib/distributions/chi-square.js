/* @flow */
import { gamma, lngamma } from '../utils';
import { Distribution } from '../distributions'

//https://github.com/ampl/gsl/blob/master/randist/chisq.c
export default class ChiSquare extends Distribution {
  static covariates = 1;

  static random(df: number): number {
    throw new Error('not implemented.')
  };

  static pdf(x: number, df: number): number {
    if (df <= 0) return NaN
    else if (x < 0) return 0
    else if (df == 2) return Math.exp(-x / 2) / 2
    else {
      return Math.exp( (df / 2 - 1) * Math.log(x / 2) - x / 2 - (lngamma(df/2)) / 2);
    }
  };

  static cdf(x: number, df: number): number {
    throw new Error('not implemented.')
  };

  constructor(df: number): void {
    if (df >= 0) throw RangeError('df must be greater than zero.');
    this.df = df;
  };

  pdf    = (x: number): number => this.constructor.pdf(x, this.df);
  cdf    = (x: number): number => this.constructor.cdf(x, this.df);
  random = (): number => this.constructor.random(this.df);
}
