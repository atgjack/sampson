/* @flow */
import { mean, sumNthPowerDev, sum, quantile } from '../utils';

export default class Sample {
  static variance(x: Array<number>): number {
    return sumNthPowerDev(x, 2) / (x.length - 1);
  };

  static sqrdMeanDev(x: Array<number>): number {
    return sumNthPowerDev(x, 2);
  };

  static meanDev(x: Array<number>): number {
    return sumNthPowerDev(x, 1, true) / (x.length);
  };

  static stdDev(x: Array<number>): number {
    let v = this.variance(x);
    return isNaN(v) ? 0 : Math.sqrt(v);
  };

  static rootMeanSqrd(x: Array<number>): number {
    return Math.sqrt( x.map(val => val * val ).reduce( (p,n) => p+n ) / x.length);
  };

  static stdMeanDev(x: Array<number>): number {
    return this.stdDev(x) / Math.sqrt(x.length);
  };

  static relativeStdDev(x: Array<number>): number {
    return this.stdDev(x) / mean(x);
  };

  static quartiles(x: Array<number>) {
    return quantile(x, .25, .5, .75);
  };

  static skewness(x: Array<number>): number {
    let std = this.stdDev(x);
    if (isNaN(std) || x.length < 3) return NaN
    else {
      let n = x.length
      let cubed = Math.pow(std, 3);
      let sumCubed = sumNthPowerDev(x, 3);
      return n * sumCubed / ((n - 1) * (n - 2) * cubed)
    }
  };

  static kurtosis(x: Array<number>): number {
    let std = this.stdDev(x);
    if (isNaN(std) || x.length < 3) return NaN
    else {
      let n = x.length
      let sumCubed = sumNthPowerDev(x, 2);
      let sumQuarted = sumNthPowerDev(x, 4);
      return sumQuarted / Math.pow(sumCubed, 2)
    }
  };

  static covariance(x: Object, y: Object): number {
    if (!x || !y || x.size <= 1 || x.size !== y.size) return NaN
    else {
      let sum = x.data
        .map( (_, i) => (x.data[i] - x.mean) * (y.data[i] - y.mean) )
        .reduce( (p, n) => { return p + n }, 0);
      return sum / (x.size - 1);
    }
  };

  static correlation(x: Object, y: Object): number {
    if (!x || !x.std || !y || !y.std) return NaN;
    let cov = this.covariance(x, y);
    return cov / x.std / y.std;
  };

  constructor(data: Array<number>): void {
    if (data.length == 0) throw new Error('Sample of size 0 not allowed.')
    this.data = data;
    this.size = data.length;
    this.mean = mean(data);
    this.std = this.constructor.stdDev(data);
    this.variance = this.constructor.variance(data);
    this.skewness = this.constructor.skewness(data);
    this.kurtosis = this.constructor.kurtosis(data);
    this.sqrdMeanDev = this.constructor.sqrdMeanDev(data);
    this.meanDev = this.constructor.meanDev(data);
    this.rootMeanSqrd = this.constructor.rootMeanSqrd(data);
    this.stdMeanDev = this.constructor.stdMeanDev(data);
    this.relStdDev = this.constructor.relativeStdDev(data);
    this.quartiles = this.constructor.quartiles(data);
  }

  covariance  = (y: Object) => this.constructor.covariance(this, y);
  correlation = (y: Object) => this.constructor.correlation(this, y);
}
