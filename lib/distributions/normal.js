/* @flow */
let last: number = NaN;

export default class NormalDistribution {
  static covariates = 2;
  static discrete = false;

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

  static pdf(x: number, mu: number, sigma: number): number {
    let u = x / Math.abs(sigma);
    return ( 1 / ( Math.sqrt(2 * Math.PI) * Math.abs(sigma) ) ) * Math.exp( -1 * Math.pow(x - mu, 2) / ( 2 * sigma * sigma) );
  };

  constructor(mu: number, sigma: number): void {
    if (!mu || !sigma) throw new Error('Need mu and sigma for the normal distribution.');
    this.mu = mu;
    this.sigma = sigma;
    this.variance = sigma * sigma;
  };

  pdf    = (x: number): number => this.constructor.pdf(x, this.mu, this.sigma);
  random = (): number => this.constructor.random(this.mu, this.sigma);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );
}
