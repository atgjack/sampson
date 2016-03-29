/* @flow */
// http://blog.plover.com/math/choose.html
export default function choose(n: number, k: number) {
  if (k > n) throw new Error('k cannot be greater than n.');
  let r: number = 1;
  for (let d = 1; d <= k; d++) {
    r *= n--;
    r /= d;
  }
  return r
};
