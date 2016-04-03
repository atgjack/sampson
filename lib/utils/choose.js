/* @flow */
/**
 * See: [Binomial Coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient)
 *
 * Choose k elements from a set of n elements.
 * `k > n == Infinity`
 *
 *
 * Code kanged from: [Blog of Mark Dominus](http://blog.plover.com/math/choose.html)
 */
export default function choose(n: number, k: number): number {
  if (k > n) return NaN
  else {
    let r: number = 1;
    for (let d = 1; d <= k; d++) {
      r *= n--;
      r /= d;
    }
    return r
  };
};
