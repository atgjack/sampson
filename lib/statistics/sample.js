/* @flow */
import { mean, sumNthPowerDev } from '../utils';

export default class Sample {
  static variance(x: Array<number>): number {
    return (x.length == 0) ? NaN : sumNthPowerDev(x, 2) / (x.length - 1);
  };

  static std(x: Array<number>): number {
    let v = this.variance(x);
    return isNaN(v) ? 0 : Math.sqrt(v);
  };

  static skewness(x: Array<number>): number {
    let std = this.std(x);
    if (isNaN(std) || x.length < 3) return NaN
    else {
      let n = x.length
      let cubed = Math.pow(std, 3);
      let sumCubed = sumNthPowerDev(x, 3);
      return n * sumCubed / ((n - 1) * (n - 2) * cubed)
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
    this.std = this.constructor.std(data);
    this.variance = this.constructor.variance(data);
    this.skewness = this.constructor.skewness(data);
  }

  covariance  = (y: Object) => this.constructor.covariance(this, y);
  correlation = (y: Object) => this.constructor.correlation(this, y);
}
