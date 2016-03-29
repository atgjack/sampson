/* @flow */
export default class CauchyDistribution {
  static random(a: number): number {
    let u: number = Math.random();
    while (u == 0.5) u = Math.random();
    return a * Math.tan(Math.PI * u);
  };

  static pmf(x: number, a: number): number {
    let u = x / a;
    return (1 / (Math.PI * a)) / (1 + u * u);
  };

  constructor(a: number): void {
    this.a = a;
  };

  pdf    = (x: number): number => this.constructor.pdf(x, this.a);
  random = (): number => this.constructor.random(this.a);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );

}
