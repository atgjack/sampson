/* @flow */

/**
 * See: [Standard Score](https://en.wikipedia.org/wiki/Standard_score)
 *
 * The signed number of deviations an observed value is above the mean.
 */
export default function zscore(x: number, mu: number, std: number): number { return (x - mu) / std; };
