/* @flow */
export default function factorial(n: number): number {
  if (n < 0) return NaN
  else if (n == 0) return 1
  else return (n * factorial( n - 1 ));
};
