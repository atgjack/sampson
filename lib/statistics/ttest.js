/* @flow */

export default function tTest( sample: Object, other: ?Object, x: number ): number {
  if (!sample) return NaN;
  if (!other) return (sample.mean - x) / (sample.std / Math.sqrt(sample.size))
  else {
    let difference = x || 0;
    let weightedVar = ((sample.size - 1) * sample.variance + (other.size - 1) * other.variance) / (sample.size + other.size - 2);
    return (sample.mean - other.mean - difference) / Math.sqrt(weightedVar * ((1 / sample.size) + (1 / other.size)));
  }
}
