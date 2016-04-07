/* @flow */
/**
 *
 * Adds a list of elements together.
 * Uses the [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm)
 * to compensate for floating-point error.
 * See: [Summation](https://en.wikipedia.org/wiki/Summation)
 * @param {Array<number>} x - The numbers.
 * @return {number} The sum or 0 if x is the empty set.
 */
 // Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum.js)
export default function sum(x: Array<number>): number {
  if ( x.length == 0) return 0;
  let errorComp = 0;
  return x.reduce( (p,n) => {
    let corrected = n - errorComp;
    let next = p + corrected;
    errorComp = next - p - corrected;
    return next;
  }, 0);
};
