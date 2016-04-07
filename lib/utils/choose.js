/* @flow */
/**
 * Choose k elements from a set of n elements.
 * See: [Binomial Coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient)
 * @param {number} n - The number of elements to choose from.
 * @param {number} k - The number of elements to choose.
 * @return {number} A binomial coefficient or NaN if n < k.
 */
 // Code kanged from: [Blog of Mark Dominus](http://blog.plover.com/math/choose.html)
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
