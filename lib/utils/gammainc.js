/* @flow */
import lngamma from './lngamma'

const EPS = 1e-14;
const TINY = 1e-290;

/**
 * The regularized lower incomplete gamma function
 * [See](https://en.wikipedia.org/wiki/Incomplete_gamma_function#Lower_incomplete_Gamma_function)
 * @param {number} n - The number.
 * @return {number} An approximation of (n-1)! or Infinity if n is a negative integer.
 */
// Code kanged from: [samtools](https://github.com/lh3/samtools/blob/master/bcftools/kfunc.c)
export default function lower(s: number, z: number): number {
  let sum, x, k;
  for (k = 1, sum = 1, x = 1; k < 100; ++k) {
    sum += (x *= z / (s + k));
    if (x / sum < EPS) break;
  };
  return Math.exp(s * Math.log(z) - z - lngamma(s + 1) + Math.log(sum));
};

export { lower }
