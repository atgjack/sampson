/* @flow */
export default function zscore(x: number, mu: number, std: number): number { return (x - mu) / std; };
