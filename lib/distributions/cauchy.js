/* @flow */
export default class CauchyDistribution {
  static covariates = 1;
  static discrete = false;

  static random(a: number): number {
    if (a == undefined || a <= 0) throw new Error('a must be positive and greater than zero.');
    let u: number;
    while (!u || u == 0.5) u = Math.random();
    return a * Math.tan(Math.PI * u);
  };

  static pdf(x: number, a: number): number {
    let u = x / a;
    return (1 / (Math.PI * a)) / (1 + u * u);
  };

  constructor(a: number): void {
    if (a == undefined || a <= 0) throw new Error('a must be positive and greater than zero.');
    this.a = a;
  };

  pdf    = (x: number): number => this.constructor.pdf(x, this.a);
  random = (): number => this.constructor.random(this.a);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );

}
