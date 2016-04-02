/* @flow */
import select from './select'

export default function median(list: array) {
  let result;
  if (list.length == 0) result = NaN
  else {
    let even = list.length % 2 == 0;
    if (even) {
      result  = select(list, (list.length / 2));
      result += select(list, (list.length / 2) - 1);
      result /= 2;
    } else {
      result = select(list, (list.length - 1)/2);
    };
  };
  return result;
}
