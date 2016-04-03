/* @flow */
/**
 * See: [Stirling's Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)
 *
 * Efficiently appoximates ln(n!). Similar to the gamma function, but can be faster and more accurate.
 */
export default function stirling(n: number): number {
  return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
};
