/* @flow */
import BinomialDistribution from './binomial'

export default class BernoulliDistribution extends BinomialDistribution {
  static covariates = 1;

  static random(p: number): number {
    if (p == undefined || p < 0 || p > 1) throw new Error('p must be between zero and one inclusive.')
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

  pdf    = (k: number): number => this.constructor.pmf(k, this.p);
  random = (): number => this.constructor.random(this.p);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );
}
