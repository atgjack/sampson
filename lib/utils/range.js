/* @flow */
/**
 * See: [Range](https://en.wikipedia.org/wiki/Range_(statistics))
 *
 * Finds the difference between the largest and smallest values.
 */
export default function range(list: array) {
  return Math.max(...list) - Math.min(...list);
}
