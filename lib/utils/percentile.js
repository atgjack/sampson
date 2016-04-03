/* @flow */
import select from './select';

/**
 * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
 *
 * Finds the element of a list of numbers at a certain percentile ordered smallest to largest.
 *
 * #### Restrictions:
 * ```
 * percentile( null, .5 )     // Error
 * percentile( [1,2,3], p<0 ) // Error
 * percentile( [1,2,3], p>1 ) // Error
 * percentile( [], .5 )       // NaN
 * ```
 */
export default function percentile(list: Array<number>, p: number): number {
  if (p == undefined || p > 1 || p < 0) throw new Error('p must be between zero and one inclusive.')
  else if (list == undefined) throw new Error('need a list to provide a percentile.')
  else if (list.length == 0) return NaN
  else {
    let index = Math.floor(list.length * p);
    if (index >= list.length) index = list.length - 1;
    return select(list, index);
  };
};
