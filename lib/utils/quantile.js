/* @flow */
import select from './select';

/**
 * Finds the nth largest element of a list of numbers.
 * Accepts both a single quantile and an array of quantiles.
 * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
 * @param {Array<number>} x - The numbers.
 * @param {Array<number>} quantiles - A list of quantiles to compute.
 * @return {number} The computed quantiles respective to quantiles provided or NaN if x is the empty set.
 */
export default function quantile(x: Array<number>, quantiles: Array<number>) {
  if (!Array.isArray(x) || x.length == 0) throw new Error('you must provide an array.');
  if (!Array.isArray(quantiles) || quantiles.length == 0) throw new Error('you must provide some quantiles.');
  let validQuants = quantiles.reduce( (p,n) => n >= 0 && n <= 1 && p, true);
  if (!validQuants) throw new Error('quantiles must be between zero and one inclusive.');
  if (quantiles.length > 1) return quantiles.map( q => quantile(x, [q]) )
  else {
    let quant = quantiles[0];
    if (quant == 0) return x[0]
    else if (quant == 1) return x[x.length - 1]
    else {
      let index = x.length * quant;
      if (index % 1) {
        return select(x, Math.floor(index));
      }
      else if (x.length % 2) {
        return select(x, index);
      } else {
        return (select(x, index - 1) + select(x, index)) / 2;
      };
    };
  };
};
