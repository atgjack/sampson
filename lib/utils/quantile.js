/* @flow */
import select from './select';

export default function quantile(list: Array<number>, ...quantiles: Array<number>) {
  if (list == undefined || list.length == 0) throw new Error('you must provide an array.');
  let validQuants = quantiles.reduce( (p,n) => n >= 0 && n <= 1 && p, true);
  if (!validQuants) throw new Error('quantiles must be between zero and one inclusive.');
  if (quantiles.length > 1) return quantiles.map( q => quantile(list, q) )
  else {
    let quant = quantiles[0];
    if (quant == 0) return list[0]
    else if (quant == 1) return list[list.length - 1]
    else {
      let index = list.length * quant;
      if (index % 1) {
        return select(list, Math.floor(index));
      }
      else if (list.length % 2) {
        return select(list, index);
      } else {
        return (select(list, index - 1) + select(list, index)) / 2;
      };
    };
  };
};
