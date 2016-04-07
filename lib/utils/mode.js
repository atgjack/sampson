/* @flow */
/**
 * Finds the most frequent values of a list of numbers.
 * It always returns an array.
 * The result may contain one or more values.
 * See: [Mode](https://en.wikipedia.org/wiki/Mode)
 * @param {Array<number>} x - The numbers.
 * @return {number} The mode or NaN if x is the empty set.
 */
export default function mode(x: Array<number>): number {
  if ( x.length == 0) return NaN
  else if ( x.length == 1) return x
  else {
    let histo = x.reduce( (obj,val) => {
      if (obj[val]) obj[val]++
      else obj[val] = 1;
      return obj;
    }, {});
    let histoKeys = Object.keys(histo);
    let most = histoKeys.map( i => histo[i] ).reduce( (p,n) => n > p ? n : p );
    return histoKeys.filter( i => histo[i] == most).map( i => Number(i) )
  };
};
