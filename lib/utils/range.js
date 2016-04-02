/* @flow */
export default function range(list: array) {
  return Math.max(...list) - Math.min(...list);
}
