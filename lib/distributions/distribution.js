/* @flow */
/***
 * An abstract Distribution class.
 * All of our Distributions extend this.
 * It holds the base uniform random number generator.
 * @interface
 */
export default class Distribution {
  static covariates: number = -1;
  static discrete: boolean  = false;
  static parameters: Object = {};

  /** @private */
  static validate(params: Object) {
    let valid = {};
    if (typeof(params) != 'object') throw new Error('Parameters must be an object.')
    else if (Object.keys(params).length != this.covariates) throw new Error('Need proper params.')
    else {
      let keys = Object.keys(this.parameters)
      keys.map( key => [key, this.parameters[key]])
        .forEach( ar => {
          const [name, val] = ar;
          let type = typeof(params[name])
          if (type !== 'number') throw new Error(`${name} is needed and must be a number.`)
          else if (typeof(val) == 'function') {
            let result = val(params[name], params);
            if (!result) throw new Error(`${name} is not valid.`)
            else valid[name] = params[name];
          } else if (val) valid[name] = params[name];
        });
      return valid;
    };
  };

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
    /**
     * The valitated distribution parameters.
     * @type {Object}
     */
    this.params     = this.constructor.validate(params);
    /**
     * The distribution mean.
     * @type {number}
     */
    this.mean       = this.constructor.mean(params);
    /**
     * The distribution standard deviation.
     * @type {number}
     */
    this.stdDev     = this.constructor.stdDev(params);
    /**
     * The distribution relative standard deviation.
     * @type {number}
     */
    this.relStdDev  = this.constructor.relStdDev(params);
    /**
     * The distribution variance.
     * @type {number}
     */
    this.variance   = this.constructor.variance(params);
    /**
     * The distribution skewness.
     * @type {number}
     */
    this.skewness   = this.constructor.skewness(params);
    /**
     * The distribution kurtosis.
     * @type {number}
     */
    this.kurtosis   = this.constructor.kurtosis(params);
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
