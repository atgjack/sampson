/* @flow */
/**
 * n! is the product of all positive integers less than or equal to n.
 * [See](https://en.wikipedia.org/wiki/Factorial)
 * @param {number} n - The number.
 * @return {number} n!, or 1 if n == 0, or Inifinity if n > ~170, or NaN if n < 0.
 */
export default function factorial(n: number): number {
  if (n < 0) return NaN
  else if (n == 0) return 1
  else return (n * factorial( n - 1 ));
};
