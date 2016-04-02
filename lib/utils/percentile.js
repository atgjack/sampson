/* @flow */
import select from './select';

export default function percentile(list: Array<number>, p: number): number {
  if (p == undefined || p > 1 || p < 0) throw new Error('p must be between zero and 1 inclusive.');
  if (!list) throw new Error('need a list to rank.')
  let index = Math.floor(list.length * p);
  if (index >= list.length) index = list.length - 1;
  return select(list, index);
}
