/* @flow */
import { mean, sumNthPowerDev, sum, quantile } from '../utils';

/**
* The sample class is the base for all of our sample based calculations.
* These methods can be directly accessed on the class or renerated via
* a class instance. You'll need a Sample object for the ttest function.
*/
export default class Sample {
  /**
   * Get the sample variance.
   * [See](https://en.wikipedia.org/wiki/Variance#Population_variance_and_sample_variance).
   * @param {Array<number>} x - The sample data.
   * @return {number} The sample variance or NaN.
   */
  static variance(x: Array<number>): number {
    return sumNthPowerDev(x, 2) / (x.length - 1);
  };

  /**
   * Get the sum of the squared deviations from the mean.
   * [See](https://en.wikipedia.org/wiki/Squared_deviations_from_the_mean).
   * @param {Array<number>} x - The sample data.
   * @return {number} The squared deviations from the mean or NaN.
   */
  static sqrdMeanDev(x: Array<number>): number {
    return sumNthPowerDev(x, 2);
  };

  /**
   * Get the sum of the absolute deviations from the mean.
   * [See](https://en.wikipedia.org/wiki/Deviation_(statistics)#Unsigned_or_absolute_deviation).
   * @param {Array<number>} x - The sample data.
   * @return {number} The mean deviation.
   */
  static meanDev(x: Array<number>): number {
    return sumNthPowerDev(x, 1, true) / (x.length);
  };

  /**
   * Get the standard deviation.
   * [See](https://en.wikipedia.org/wiki/Standard_deviation).
   * @param {Array<number>} x - The sample data.
   * @return {number} The standard deviation.
   */
  static stdDev(x: Array<number>): number {
    let v = this.variance(x);
    return isNaN(v) ? 0 : Math.sqrt(v);
  };

  /**
   * Get the root mean square.
   * [See](https://en.wikipedia.org/wiki/Root_mean_square).
   * @param {Array<number>} x - The sample data.
   * @return {number} The root mean square.
   */
  static rootMeanSqrd(x: Array<number>): number {
    return Math.sqrt( x.map(val => val * val ).reduce( (p,n) => p+n ) / x.length);
  };

  /**
   * Get the standard deviation of the mean.
   * [See](https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_mean).
   * @param {Array<number>} x - The sample data.
   * @return {number} The standard deviation of the mean.
   */
  static stdMeanDev(x: Array<number>): number {
    return this.stdDev(x) / Math.sqrt(x.length);
  };

  /**
   * Get the relative standard deviation or coefficient of variation.
   * [See](https://en.wikipedia.org/wiki/Coefficient_of_variation).
   * @param {Array<number>} x - The sample data.
   * @return {number} The relative standard deviation.
   */
  static relativeStdDev(x: Array<number>): number {
    return this.stdDev(x) / mean(x);
  };

  /**
   * Get the .25, .5, .75 quantiles of the data.
   * The .5 quantile is the median. Together they are the quartiles.
   * [See](https://en.wikipedia.org/wiki/Quartile).
   * @param {Array<number>} x - The sample data.
   * @return {number} The quartiles.
   */
  static quartiles(x: Array<number>): number {
    return quantile(x, [.25, .5, .75]);
  };

  /**
   * Get the skewness.
   * [See](https://en.wikipedia.org/wiki/Skewness).
   * @param {Array<number>} x - The sample data.
   * @return {number} The skewness.
   */
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

  /**
   * Get the kurtosis.
   * [See](https://en.wikipedia.org/wiki/Kurtosis).
   * @param {Array<number>} x - The sample data.
   * @return {number} The kurtosis.
   */
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

  /**
   * Get the covariance.
   * [See](https://en.wikipedia.org/wiki/Covariance).
   * @param {Sample} x -A Sample object.
   * @param {Sample} y -A Sample object.
   * @return {number} The covariance.
   */
  static covariance(x: Object, y: Object): number {
    if (!x || !y || x.size <= 1 || x.size !== y.size) return NaN
    else {
      let sum = x.data
        .map( (_, i) => (x.data[i] - x.mean) * (y.data[i] - y.mean) )
        .reduce( (p, n) => { return p + n }, 0);
      return sum / (x.size - 1);
    }
  };

  /**
   * Get the correlation.
   * [See](https://en.wikipedia.org/wiki/Correlation_and_dependence).
   * @param {Sample} x -A Sample object.
   * @param {Sample} y -A Sample object.
   * @return {number} The correlation.
   */
  static correlation(x: Object, y: Object): number {
    if (!x || !x.std || !y || !y.std) return NaN;
    let cov = this.covariance(x, y);
    return cov / x.std / y.std;
  };


  /**
   * Generate a new Sample object.
   * @constructs Sample
   * @param {Array<number>} x - The sample data.
   */
  constructor(x: Array<number>): void {
    if (x.length == 0) throw new Error('Sample of size 0 not allowed.')
    /**
     * The sample data passed as x.
     * @type {Array<number>}
     */
    this.data = x;
    /**
     * The length of th sample data.
     * @type {number}
     */
    this.size = x.length;
    /**
     * The mean of the sample data.
     * @type {number}
     */
    this.mean = mean(x);
    /**
     * The standard deviation of the sample data.
     * @type {number}
     */
    this.std = this.constructor.stdDev(x);
    /**
     * The variance of the sample data.
     * @type {number}
     */
    this.variance = this.constructor.variance(x);
    /**
     * The skewness of the sample data.
     * @type {number}
     */
    this.skewness = this.constructor.skewness(x);
    /**
     * The kurtosis of the sample data.
     * @type {number}
     */
    this.kurtosis = this.constructor.kurtosis(x);
    /**
     * The squared mean deviation of the sample data.
     * @type {number}
     */
    this.sqrdMeanDev = this.constructor.sqrdMeanDev(x);
    /**
     * The absolute mean deviation of the sample data.
     * @type {number}
     */
    this.meanDev = this.constructor.meanDev(x);
    /**
     * The root mean deviation of the sample data.
     * @type {number}
     */
    this.rootMeanSqrd = this.constructor.rootMeanSqrd(x);
    /**
     * The standard mean deviation of the sample data.
     * @type {number}
     */
    this.stdMeanDev = this.constructor.stdMeanDev(x);
    /**
     * The relative standard deviation of the sample data.
     * @type {number}
     */
    this.relStdDev = this.constructor.relativeStdDev(x);
    /**
     * The 25%, 50%, and 75% quantiles of the sample data.
     * @type {Array<number>}
     */
    this.quartiles = this.constructor.quartiles(x);
  }

  /**
   * Get the covariance with another sample.
   * @param {Sample} y - A Sample object.
   * @return {number} The covariance.
   */
  covariance  = (y: Object) => this.constructor.covariance(this, y);

  /**
   * Get the correlation with another sample.
   * @param {Sample} y - A Sample object.
   * @return {number} The correlation.
   */
  correlation = (y: Object) => this.constructor.correlation(this, y);
}
