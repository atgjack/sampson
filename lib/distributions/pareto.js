/* @flow */
import Distribution from './distribution';

/**
* The Pareto Distribution is a continuous probability distribution
* with parameters m = *minimum value* and a = *shape*.
* See: [Pareto Distribution](https://en.wikipedia.org/wiki/Pareto_distribution)
*/
export default class Pareto extends Distribution {
  static covariates = 2;
  static parameters = {
    'm': (m) => ( m > 0 ),
    'a': (a) => true
  };

  /**
   * Generate a random value from Pareto(mu).
   * @param {Object} params - The distribution parameters.
   * @return {number} The random value from Pareto(mu).
   */
  static random(params: Object): number {
    const { m, a } = this.validate(params);
    return a * Math.pow(super.random(), -1 / m)
  };

  /**
   * Calculate the probability of exaclty x in Pareto(mu).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of x happening in Pareto(mu).
   */
  static pdf(x: number, params: Object): number {
    const { m, a } = this.validate(params);
    if (typeof x != 'number') throw new Error('x must be a number.');
    else if (x < m) {
      return 0
    } else {
      return a * Math.pow(m, a) / Math.pow(x, a + 1);
    };
  };

  /**
   * Calculate the probability of getting x or less Pareto(mu).
   * @param {number} x - The value to predict.
   * @param {Object} params - The distribution parameters.
   * @return {number} The probability of getting x or less from Pareto(mu).
   */
   static cdf(x: number, params: Object): number {
     const { m, a } = this.validate(params);
     if (typeof x != 'number') throw new Error('x must be a number.');
     else if ( x < m) return 0
     else return 1 - Math.pow(m / x, a);
   };

   /**
    * Get the mean of Pareto(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The mean of Pareto(mu).
    */
   static mean(params: Object): number {
     const { m, a } = this.validate(params);
     if (a <= 1) return Infinity
     else return (a * m) / (a - 1)
   };

   /**
    * Get the variance of Pareto(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The variance of Pareto(mu).
    */
   static variance(params: Object): number {
     const { m, a } = this.validate(params);
     if (a <= 2) return Infinity
     else return (a * m * m) / ((a - 1) * (a - 1) * (a - 2));
   };

   /**
    * Get the skewness of Pareto(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The skewness of Pareto(mu).
    */
   static skewness(params: Object): number {
     const { m, a } = this.validate(params);
     if (a < 3) return NaN
     else return (2 * (1 + a) / (a -3)) * Math.sqrt((a - 2) / a);
   };

   /**
    * Get the kurtosis of Pareto(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The kurtosis of Pareto(mu).
    */
   static kurtosis(params: Object): number {
     const { m, a } = this.validate(params);
     if (a < 4) return NaN
     else return 6 * ((a * a * a) + (a * a) - 6 * a -2) / (a * (a - 3) * (a - 4));
   };
};
