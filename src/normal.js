/* @flow */
let last: number = NaN;

export default class NormalDistribution {
  static random(mu: number, sigma: number): number {
    if (!mu || !sigma) throw new Error('Need mu and sigma for the normal distribution.');
    let z: number = last;
    last = NaN;
    if (!z) {
      let a: number = Math.random() * 2 * Math.PI;
      let b: number = Math.sqrt( -2.0 * Math.log( 1.0 - Math.random() ) );
      z = Math.cos(a) * b;
      last = Math.sin(a) * b;
    }
    return mu + z * sigma;
  };

  constructor(mu: number, sigma: number): void {
    if (!mu || !sigma) throw new Error('Need mu and sigma for the normal distribution.');
    this.mu = mu;
    this.sigma = sigma;
    this.variance = sigma * sigma;
  };

  random = (): number => this.constructor.random(this.mu, this.sigma);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );
}
