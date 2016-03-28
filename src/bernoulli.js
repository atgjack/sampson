/* @flow */
export default class BernoulliDistribution {
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
    if (p > 1 || p < 0) throw new Error("p must be between 0 and 1.")
    this.p = p;
    this.mu = p;
    this.variance = p * (1 - p);
  };

  pdf    = (k: number): number => this.constructor.pdf(k, this.p);
  random = (): number => this.constructor.random(this.p);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );

}
