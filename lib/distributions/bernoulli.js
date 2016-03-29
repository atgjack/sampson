/* @flow */
import BinomialDistribution from './binomial'

export default class BernoulliDistribution extends BinomialDistribution {
  static covariates = 1;

  static random(p: number): number {
    let u: number = Math.random();
    if (u < p) return 1
    else return 0;
  };

  static pmf(k: number, p: number): number {
    if (k == 0) return 1 - p
    else if (k == 1) return p
    else return 0;
  };

  constructor(p: number): void {
    super(p, 1);
  };
}
