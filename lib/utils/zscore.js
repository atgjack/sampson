/* @flow */

/**
 * The signed number of deviations an observed value is above the mean.
 * See: [Standard Score](https://en.wikipedia.org/wiki/Standard_score)
 * @param {number} x - The number.
 * @param {number} mu - The mean.
 * @param {number} std - The standard deviation.
 * @return {number} The zscore.
 */
export default function zscore(x: number, mu: number, std: number): number { return (x - mu) / std; };
