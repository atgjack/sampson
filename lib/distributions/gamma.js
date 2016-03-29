/* @flow */
import { choose, stirling, gamma, lngamma } from '../utils'

const SMALL_MEAN = 14;

export default class GammaDistribution {
  static covariates = 2;
  static discrete = false;

  static random(a: number, b: number): number {
    return console.log('this is wrong');
  };

  static pmf(x: number, a: number, b: number): number {
    if (x < 0) {
      return 0
    } else if (x == 0) {
      if (a == 1) return 1 / b;
      else return 0;
    } else if (a == 1) {
      return Math.exp(-x / b) / b
    } else {
      return Math.exp(( a - 1 ) * Math.log( x / b) - (x / b) - lngamma(a)) / b;
    };
  };

  constructor(a: number, b: number): void {
    this.a = a;
    this.b = b;
    this.mu = a / b;
    this.variance = a / (b * b);
  };

  pdf    = (x: number): number => this.constructor.pdf(x, this.a, this.b);
  random = (): number => this.constructor.random(this.a, this.b);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );

}
