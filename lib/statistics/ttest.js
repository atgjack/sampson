/* @flow */

/**
 * Computes Student's T-Test for the provided samples.
 * If only one sample is provided, a one-sample t-test is computed on the sample mean vs x.
 * If two samples are provided, a two-sample t-test is computed on the difference between the sample means and x.
 * See: [Student's T-Test](https://en.wikipedia.org/wiki/Student%27s_t-test)
 * @param {Sample} sample - The sample to test
 * @param {Sample} [other] - An optional sample to compare with a two sample test.
 * @param {number} [x=0] - The mean or difference to test.
 * @return {number} The t-statistic or NaN if the sample is the empty set.
 */
export default function ttest( sample: Object, other: ?Object, x: ?number ): number {
  if (!sample) return NaN;
  if (!other) return (sample.mean - x) / (sample.std / Math.sqrt(sample.size))
  else {
    let difference = x || 0;
    let weightedVar = ((sample.size - 1) * sample.variance + (other.size - 1) * other.variance) / (sample.size + other.size - 2);
    return (sample.mean - other.mean - difference) / Math.sqrt(weightedVar * ((1 / sample.size) + (1 / other.size)));
  }
}
