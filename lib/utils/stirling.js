/* @flow */
/**
 * Efficiently appoximates ln(n!). Similar to the gamma function, but can be faster and more accurate.
 * See: [Stirling's Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)
 * @param {number} n - The number.
 * @return {number} An approximation on ln(n!).
 */
export default function stirling(n: number): number {
  return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
};
