/* @flow */
/**
 * See: [Factorial](https://en.wikipedia.org/wiki/Factorial)
 *
 * n! is the product of all positive integers less than or equal to n.
 * ```
 * 0! == 1
 * n > ~170 == Infinity
 * n < 0 == NaN
 * ```
 */
export default function factorial(n: number): number {
  if (n < 0) return NaN
  else if (n == 0) return 1
  else return (n * factorial( n - 1 ));
};
