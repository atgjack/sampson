/* @flow */
/**
 * See: [Mode](https://en.wikipedia.org/wiki/Mode)
 *
 * Finds the most frequent values of a list of numbers.
 * It always returns an array.
 * The result may contain one or more values.
 *
 * #### Restrictions:
 * ```
 * mode( [] ) == NaN
 * mode( [1] ) == [1]
 * ```
 */
export default function mode(list: Array<number>): number {
  if ( list.length == 0) return NaN
  else if ( list.length == 1) return list
  else {
    let histo = list.reduce( (obj,val) => {
      if (obj[val]) obj[val]++
      else obj[val] = 1;
      return obj;
    }, {});
    let histoKeys = Object.keys(histo);
    let most = histoKeys.map( i => histo[i] ).reduce( (p,n) => n > p ? n : p );
    return histoKeys.filter( i => histo[i] == most).map( i => Number(i) )
  };
};
