/* @flow */
import { choose, sterling } from './utils'

const SMALL_MEAN = 14;

export default class BinomialDistribution {
  static random(n: number, prob: number): number {
    if (prob > 1 || prob < 0) throw new Error("p must be between 0 and 1.")
    if (n < 0) throw new Error("n must be positive or zero.")
    if (n == 0) return 0;

    let flipped: boolean = false;
    let ix: number = 0;
    let p: number;
    if (prob > 0.5) {
      flipped = true;
      p = 1 - prob;
    } else p = prob;
    let q: number = 1 - p;
    let s: number = p / q;
    let np: number = n * p;
    if (np < SMALL_MEAN) {
      let f: number = Math.pow(q, n);
      let u: number = Math.random();
      while (ix <= n && u >= f) {
        u -= f;
        f *= s * (n - ix) / (ix + 1);
        ix++;
      };
    } else {

      let ffm: number = np + p;
      let fm: number = Math.floor(ffm);
      let xm: number = fm + 0.5;
      let npq: number = np * q;

      let p1: number = Math.floor( (2.195 * Math.sqrt(npq)) - (4.6 * q) ) + 0.5;

      let xl = xm - p1;
      let xr = xm + p1;

      let c = 0.134 + 20.5 / (15.3 + fm);
      let p2 = p1 * (1.0 + c + c);

      let al = (ffm - xl) / (ffm - xl * p);
      let lambda_l = al * (1.0 + 0.5 * al);
      let ar = (xr - ffm) / (xr * q);
      let lambda_r = ar * (1 + 0.5 + ar);
      let p3 = p2 + c / lambda_l;
      let p4 = p3 + c / lambda_r;

      let varr, accept, u, v;

      let tryAgain: Function = (): void => {
        u = Math.random() * p4;
        v = Math.random();
        if (u <= p1) {
          ix = Math.floor( xm - (p1 * v) + u);
        } else if ( u <= p2) {
          let x = xl + ((u - p1) / c);
          v = (v * c) + 1.0 - (Math.abs(x - xm) / p1);
          if (v > 1.0 || v <= 0.0) {
            tryAgain();
          } else {
            ix = x;
          };
        } else if (u <= p3) {
          ix = Math.floor(xl + (Math.log(v) / lambda_l));
          if (ix < 0) {
            tryAgain();
          } else {
            v *= ((u - p2) * lambda_l);
          };
        } else {
          ix = Math.floor(xr - (Math.log(v) / lambda_r));
          if (ix > n) {
            tryAgain();
          } else {
            v *= ((u - p3) * lambda_r);
          };
        };
        varr = Math.log(v);
        let x1: number = ix + 1;
        let w1: number = n - ix - 1;
        let f1: number = fm + 1;
        let z1: number = n + 1 - fm;
        accept = xm * Math.log(f1 / x1) + (n - fm + .5) * Math.log(z1 / w1) + (ix - fm) * Math.log(w1 * p / (x1 * q)) + sterling(f1) + sterling(z1) - sterling(x1) - sterling(w1);
        // skipped the faster options for now
        if (varr > accept) tryAgain();
      };
      tryAgain();
    };

    return Math.floor(flipped ? (n - ix) : ix);
  };

  static pdf(k: number, p: number, n: number): number {
    if (k < 0) throw new Error("k must be positive or zero.")
    if (k > n) return 0
    else {
      let P: number;
      if (p == 0) { P = (k == 0) ? 1 : 0 }
      else if (p == 1) { P = (k == n) ? 1 : 0 }
      else {
        let Cnk = choose(n, k);
        let pows = Math.pow(p, k) * Math.pow((1-p), (n-k));
        if (Cnk == 'Infinity') {
          if (pows == 0) return 0
          else return Cnk;
        } else {
          return Cnk * pows;
        }
      }
      return P;
    };
  };

  constructor(n: number, p: number): void {
    if (p > 1 || p < 0) throw new Error("p must be between 0 and 1.")
    if (n < 0) throw new Error("n must be positive or zero.")
    this.p = p;
    this.n = n;
    this.mu = n * p;
    this.variance = n * p * (1 - p);
  };

  pdf    = (k: number): number => this.constructor.pdf(k, this.p, this.n);
  random = (): number => this.constructor.random(this.n, this.p);
  sample = (n: number): array => Array.apply(null, Array(n)).map( () => this.random() );

}
