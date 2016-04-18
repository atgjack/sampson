/* @flow */
/***
 * An abstract Distribution class.
 * All of our Distributions extend this.
 * It holds the base uniform random number generator.
 * @interface
 */
export default class Distribution {
  static covariates: number = 0;
  static discrete: boolean  = false;

  /** @private */
  static validate() { throw new Error('You must define a validation function for your distribution.') }

  /** @private */
  static mean(params: Object): number            { return NaN; };
  /** @private */
  static variance(params: Object): number        { return NaN; };
  /** @private */
  static stdDev(params: Object): number          { return Math.sqrt(this.variance(params)); };
  /** @private */
  static relStdDev(params: Object): number       { return this.stdDev(params) / this.mean(params); };
  /** @private */
  static skewness(params: Object): number        { return NaN; };
  /** @private */
  static kurtosis(params: Object): number        { return NaN; };

  /** @private */
  static pdf(): number            { return NaN; };
  /** @private */
  static cdf(): number            { return NaN; };

  /**
   * Generate a uniform random variable.
   * @return {number} A uniform random variable.
   */
  static random(): number         { return Math.random(); };

  /**
   * Generate an array of k random values.
   * @param {number} k - The number of values to generate.
   * @param {Object} params - The distribution parameters.
   * @return {Array<number>} An array of k random values.
   */
  static sample(k: number, params: Object): Array<number> {
    return Array.apply(null, Array(k)).map( () => this.random(params) );
  };


  /**
   * A generic distribution constructor.
   * @param {Object} params - The distribution parameters.
   */
  constructor(params: Object): void {
    const frozenParams    = Object.assign({}, params);
    /**
     * The valitated distribution parameters.
     * @type {Object}
     */
    this.params     = this.constructor.validate(frozenParams);
    /**
     * The distribution mean.
     * @type {number}
     */
    this.mean       = this.constructor.mean(frozenParams);
    /**
     * The distribution standard deviation.
     * @type {number}
     */
    this.stdDev     = this.constructor.stdDev(frozenParams);
    /**
     * The distribution relative standard deviation.
     * @type {number}
     */
    this.relStdDev  = this.constructor.relStdDev(frozenParams);
    /**
     * The distribution variance.
     * @type {number}
     */
    this.variance   = this.constructor.variance(frozenParams);
    /**
     * The distribution skewness.
     * @type {number}
     */
    this.skewness   = this.constructor.skewness(frozenParams);
    /**
     * The distribution kurtosis.
     * @type {number}
     */
    this.kurtosis   = this.constructor.kurtosis(frozenParams);
  };

  /**
   * Calculate the probability of exaclty x.
   * @param {number} x - The value to predict.
   * @return {number} The probability of x occuring.
   */
  pdf(x: number): number { return this.constructor.pdf(x, this.params); }

  /**
   * Calculate the probability of getting x or less.
   * @param {number} x - The value to predict.
   * @return {number} The probability of getting x or less.
   */
  cdf(x: number): number { return this.constructor.cdf(x, this.params); }

  /**
   * Generate a random value.
   * @return {number} The random value.
   */
  random(): number { return this.constructor.random(this.params); }

  /**
   * Generate an array of n random values.
   * @param {number} n - The number of values to generate.
   * @return {Array<number>} An array of n random values.
   */
  sample(n: number): number { return this.constructor.sample(n, this.params); }
}
