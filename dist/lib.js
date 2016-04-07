(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.probably = global.probably || {})));
}(this, function (exports) { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  /**
   * Choose k elements from a set of n elements.
   * See: [Binomial Coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient)
   * @param {number} n - The number of elements to choose from.
   * @param {number} k - The number of elements to choose.
   * @return {number} A binomial coefficient or NaN if n < k.
   */
  // Code kanged from: [Blog of Mark Dominus](http://blog.plover.com/math/choose.html)
  function choose(n, k) {
    if (k > n) return NaN;else {
      var r = 1;
      for (var d = 1; d <= k; d++) {
        r *= n--;
        r /= d;
      }
      return r;
    };
  };

  /**
   * A useful function. Gets used in the Normal distribution cdf.
   * It's the probability of a random variable with
   * normal distribution of mean 0 and variance 1/2 falling in the range [-x, x].
   * See: [Error](https://en.wikipedia.org/wiki/Error_function#)
   * @param {number} x - The numbers to average.
   * @return {number} The error value.
   */
  // Kanged from: https://en.wikipedia.org/wiki/Error_function#Numerical_approximation
  function error(x) {
    var t = 1 / (1 + .5 * Math.abs(x));
    var tau = t * Math.exp(-(x * x) - 1.26551223 + 1.00002368 * t + 0.37409196 * Math.pow(t, 2) + 0.09678418 * Math.pow(t, 3) - 0.18628806 * Math.pow(t, 4) + 0.27886807 * Math.pow(t, 5) - 1.13520398 * Math.pow(t, 6) + 1.48851587 * Math.pow(t, 7) - 0.82215223 * Math.pow(t, 8) + 0.17087277 * Math.pow(t, 9));
    return x >= 0 ? 1 - tau : tau - 1;
  };

  /**
   * n! is the product of all positive integers less than or equal to n.
   * [See](https://en.wikipedia.org/wiki/Factorial)
   * @param {number} n - The number.
   * @return {number} n!, or 1 if n == 0, or Inifinity if n > ~170, or NaN if n < 0.
   */
  function factorial(n) {
    if (n < 0) return NaN;else if (n == 0) return 1;else return n * factorial(n - 1);
  };

  var GAMMA_NUM_LN = 607 / 128;
  var GAMMA_TABLE_LN = [0.99999999999999709182, 57.156235665862923517, -59.597960355475491248, 14.136097974741747174, -0.49191381609762019978, 0.33994649984811888699e-4, 0.46523628927048575665e-4, -0.98374475304879564677e-4, 0.15808870322491248884e-3, -0.21026444172410488319e-3, 0.21743961811521264320e-3, -0.16431810653676389022e-3, 0.84418223983852743293e-4, -0.26190838401581408670e-4, 0.36899182659531622704e-5];

  /**
   * The log-gamma function is a useful general function.
   * It can handle much larger numbers because it grows much slower compared to the gamma function.
   * It's (n - 1)! and is used by the gamma function for n > 100.
   * [See](https://en.wikipedia.org/wiki/Gamma_function#The_log-gamma_function)
   * @param {number} n - The number.
   * @return {number} An approximation of ln(n-1)! or NaN if n < 0.
   */
  // Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)
  function lngamma(z) {
    if (z < 0) return NaN;
    var x = GAMMA_TABLE_LN[0];
    for (var i = GAMMA_TABLE_LN.length - 1; i > 0; --i) {
      x += GAMMA_TABLE_LN[i] / (z + i);
    }var t = z + GAMMA_NUM_LN + .5;
    return .5 * Math.log(2 * Math.PI) + (z + .5) * Math.log(t) - t + Math.log(x) - Math.log(z);
  };

  var GAMMA_NUM = 7;
  var GAMMA_TABLE = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

  /**
   * The gamma function is a useful general function. It's (n - 1)!.
   * [See](https://en.wikipedia.org/wiki/Gamma_function)
   * @param {number} n - The number.
   * @return {number} An approximation of (n-1)! or Infinity if n is a negative integer.
   */
  // Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)
  function gamma(n) {
    var z = n;
    if (z < 0 && z % 1 == 0) {
      return Infinity;
    } else if (z < 0.5) {
      return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    } else if (z > 100) {
      return Math.exp(lngamma(z));
    } else {
      z -= 1;
      var x = GAMMA_TABLE[0];
      for (var i = 1; i < GAMMA_NUM + 2; i++) {
        x += GAMMA_TABLE[i] / (z + i);
      };
      var t = z + GAMMA_NUM + .5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, z + .5) * Math.exp(-t) * x;
    };
  };

  /**
   *
   * Adds a list of elements together.
   * Uses the [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm)
   * to compensate for floating-point error.
   * See: [Summation](https://en.wikipedia.org/wiki/Summation)
   * @param {Array<number>} x - The numbers.
   * @return {number} The sum or 0 if x is the empty set.
   */
  // Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum.js)
  function sum(x) {
    if (x.length == 0) return 0;
    var errorComp = 0;
    return x.reduce(function (p, n) {
      var corrected = n - errorComp;
      var next = p + corrected;
      errorComp = next - p - corrected;
      return next;
    }, 0);
  };

  /**
   * Averages a list of elements. Uses our internal sum function.
   * See: [Mean](https://en.wikipedia.org/wiki/Mean)
   * @param {Array<number>} x - The numbers to average.
   * @return {number} The mean or NaN if x is the empty set.
   */
  function mean(x) {
    return x.length == 0 ? NaN : sum(x) / x.length;
  };

  /**
   * Finds the most frequent values of a list of numbers.
   * It always returns an array.
   * The result may contain one or more values.
   * See: [Mode](https://en.wikipedia.org/wiki/Mode)
   * @param {Array<number>} x - The numbers.
   * @return {number} The mode or NaN if x is the empty set.
   */
  function mode(x) {
    if (x.length == 0) return NaN;else if (x.length == 1) return x;else {
      var _ret = function () {
        var histo = x.reduce(function (obj, val) {
          if (obj[val]) obj[val]++;else obj[val] = 1;
          return obj;
        }, {});
        var histoKeys = Object.keys(histo);
        var most = histoKeys.map(function (i) {
          return histo[i];
        }).reduce(function (p, n) {
          return n > p ? n : p;
        });
        return {
          v: histoKeys.filter(function (i) {
            return histo[i] == most;
          }).map(function (i) {
            return Number(i);
          })
        };
      }();

      if ((typeof _ret === "undefined" ? "undefined" : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    };
  };

  var LIST_LIMIT = 600;
  var LIST_SCALE = .5;

  /**
   * Efficiently finds the kth largest element in a array.
   * See: [Selection](https://en.wikipedia.org/wiki/Selection_algorithm)
   * @param {Array<number>} x - The numbers.
   * @param {number} k - The element to select.
   * @param {number} [begin] - The starting index.
   * @param {number} [end] - The ending index.
   * @return {number} The kth largest element or NaN if x is the empty set.
   */
  // Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/pull/146/files)
  function select(x, k, begin, end) {
    var list = x.slice(0);
    if (list.length == 0 || k >= list.length) return NaN;
    var left = begin || 0;
    var right = end || list.length - 1;
    if (left == right) return list[left];else {
      while (right > left) {
        if (right - left > LIST_LIMIT) {
          var n = right - left + 1;
          var m = k - left + 1;
          var z = Math.log(n);
          var s = LIST_SCALE * Math.exp(2 * z / 3);
          var sd = LIST_SCALE * Math.sqrt(z * s * (n - s) / n);
          var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
          var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
          select(list, k, newLeft, newRight);
        }
        var t = list[k];
        var i = left;
        var j = right;
        swap(list, i, k);
        if (list[j] > t) swap(list, i, j);
        while (i < j) {
          swap(list, i, j);
          i++;
          j--;
          while (list[i] < t) {
            i++;
          }while (list[j] > t) {
            j--;
          }
        };
        if (list[left] === t) swap(list, left, j);else {
          j++;
          swap(list, j, right);
        };
        if (j > k) {
          right = j - 1;
        } else {
          left = j + 1;
          right = j - 1;
        };
      };
      return list[k];
    };
  };

  function swap(list, i, j) {
    var temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  /**
   * Finds the central most value for a list of numbers.
   * If the list is even, and has no single center, the two
   * inner-most values are averaged.
   * Uses our internal selection function.
   * See: [Median](https://en.wikipedia.org/wiki/Median)
   * @param {Array<number>} x - The numbers.
   * @return {number} The median or NaN if x is the empty set.
   */
  function median(list) {
    var result = void 0;
    if (list.length == 0) result = NaN;else {
      var even = list.length % 2 == 0;
      if (even) {
        result = select(list, list.length / 2);
        result += select(list, list.length / 2 - 1);
        result /= 2;
      } else {
        result = select(list, (list.length - 1) / 2);
      };
    };
    return result;
  }

  /**
   * Finds the element of a list of numbers at a certain percentile ordered smallest to largest.
   * Uses the internal select function.
   * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
   * @param {Array<number>} x - The numbers.
   * @return {number} The element at the xth percentile or NaN if x is the empty set.
   */
  function percentile(x, p) {
    if (p == undefined || p > 1 || p < 0) throw new Error('p must be between zero and one inclusive.');else if (x == undefined) throw new Error('need a list to provide a percentile.');else if (x.length == 0) return NaN;else {
      var index = Math.floor(x.length * p);
      if (index >= x.length) index = x.length - 1;
      return select(x, index);
    };
  };

  /**
   * Finds the nth largest element of a list of numbers.
   * Accepts both a single quantile and an array of quantiles.
   * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
   * @param {Array<number>} x - The numbers.
   * @param {Array<number>} quantiles - A list of quantiles to compute.
   * @return {number} The computed quantiles respective to quantiles provided or NaN if x is the empty set.
   */
  function quantile(x, quantiles) {
    if (!Array.isArray(x) || x.length == 0) throw new Error('you must provide an array.');
    if (!Array.isArray(quantiles) || quantiles.length == 0) throw new Error('you must provide some quantiles.');
    var validQuants = quantiles.reduce(function (p, n) {
      return n >= 0 && n <= 1 && p;
    }, true);
    if (!validQuants) throw new Error('quantiles must be between zero and one inclusive.');
    if (quantiles.length > 1) return quantiles.map(function (q) {
      return quantile(x, [q]);
    });else {
      var quant = quantiles[0];
      if (quant == 0) return x[0];else if (quant == 1) return x[x.length - 1];else {
        var index = x.length * quant;
        if (index % 1) {
          return select(x, Math.floor(index));
        } else if (x.length % 2) {
          return select(x, index);
        } else {
          return (select(x, index - 1) + select(x, index)) / 2;
        };
      };
    };
  };

  /**
   * Finds the difference between the largest and smallest values.
   * See: [Range](https://en.wikipedia.org/wiki/Range_(statistics))
   * @param {Array<number>} x - The numbers.
   * @return {number} The range or NaN if x is the empty set.
   */
  function range(x) {
    if (x.length == 0) return NaN;
    return Math.max.apply(Math, babelHelpers.toConsumableArray(x)) - Math.min.apply(Math, babelHelpers.toConsumableArray(x));
  }

  /**
   * A really useful function. Takes a set of observations and returns the sum of
   * the difference of each observation and the mean of the set raised to the nth power.
   * Can be used to find the absolute value of the difference for functions like MeanDeviation,
   * or by default, the signed values for functions like Variance and SquaredMeanDeviation.
   * @param {Array<number>} x - The numbers.
   * @param {number} n - The number to raise to.
   * @param {boolean} [absolute=false] - Use absolute value of difference.
   * @return {number} The sum of (x-mu)^n or NaN if x is the empty set.
   */
  // Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum_nth_power_deviations.js)
  function sumNthPowerDev(x, n, absolute) {
    if (x.length == 0) return NaN;else {
      var _ret = function () {
        var mu = mean(x);
        return {
          v: x.reduce(function (p, next) {
            var diff = next - mu;
            if (absolute) diff = Math.abs(diff);
            return p + Math.pow(diff, n);
          }, 0)
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    };
  };

  /**
  * A measure that is used to quantify the amount of variation of a set of data values from their mean value.
  * See: [Variance](https://en.wikipedia.org/wiki/Variance)
  * @param {Array<number>} x - The numbers.
  * @return {number} The variance or NaN if x is the empty set.
  */
  function variance(x) {
    return x.length == 0 ? NaN : sumNthPowerDev(x, 2) / x.length;
  };

  /**
   * A measure that is used to quantify the amount of variation of a set of data values.
   * See: [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)
   * @param {Array<number>} x - The numbers.
   * @return {number} The standard deviation or 0 if x is the empty set.
   */
  function std(x) {
    var v = variance(x);
    return isNaN(v) ? 0 : Math.sqrt(v);
  };

  /**
   * Efficiently appoximates ln(n!). Similar to the gamma function, but can be faster and more accurate.
   * See: [Stirling's Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)
   * @param {number} n - The number.
   * @return {number} An approximation on ln(n!).
   */
  function stirling(n) {
    return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
  };

  /**
   * The signed number of deviations an observed value is above the mean.
   * See: [Standard Score](https://en.wikipedia.org/wiki/Standard_score)
   * @param {number} x - The number.
   * @param {number} mu - The mean.
   * @param {number} std - The standard deviation.
   * @return {number} The zscore.
   */
  function zscore(x, mu, std) {
    return (x - mu) / std;
  };

  var Distribution = function () {
    babelHelpers.createClass(Distribution, null, [{
      key: "random",
      value: function random() {
        return Math.random();
      }
    }]);

    function Distribution() {
      babelHelpers.classCallCheck(this, Distribution);
    }

    return Distribution;
  }();

  Distribution.covariates = 0;
  Distribution.discrete = false;

  var last = NaN;

  /**
  * The Binomial Distribution is a discrete probability distribution
  * with parameters n = *number of trials* and p = *probability of success*.
  * See: [Normal Distribution](https://en.wikipedia.org/wiki/Normal)
  */

  var Normal = function (_Distribution) {
    babelHelpers.inherits(Normal, _Distribution);
    babelHelpers.createClass(Normal, null, [{
      key: 'random',


      /**
       * Generate a random value from N(mu, sigma).
       * @param {number} mu - The mean.
       * @param {number} sigma - The standard deviation.
       * @return {number} The random value from N(mu, sigma).
       */
      value: function random(mu, sigma) {
        if (typeof mu != 'number' || typeof sigma != 'number') throw new Error('Need mu and sigma for the normal distribution.');
        var z = last;
        last = NaN;
        if (!z) {
          var a = babelHelpers.get(Object.getPrototypeOf(Normal), 'random', this).call(this) * 2 * Math.PI;
          var b = Math.sqrt(-2.0 * Math.log(1.0 - babelHelpers.get(Object.getPrototypeOf(Normal), 'random', this).call(this)));
          z = Math.cos(a) * b;
          last = Math.sin(a) * b;
        }
        return mu + z * sigma;
      }
    }, {
      key: 'sample',


      /**
       * Generate an array of k random values from N(mu, sigma).
       * @param {number} k - The number of values to generate.
       * @param {number} mu - The mean.
       * @param {number} sigma - The standard deviation.
       * @return {Array<number>} An array of random values from N(mu, sigma).
       */
      value: function sample(k, mu, sigma) {
        var _this2 = this;

        return Array.apply(null, Array(k)).map(function () {
          return _this2.random(mu, sigma);
        });
      }
    }, {
      key: 'pdf',


      /**
       * Calculate the probability of exaclty x in N(mu, sigma).
       * @param {number} x - The value to predict.
       * @param {number} mu - The mean.
       * @param {number} sigma - The standard deviation.
       * @return {number} The probability of x happening in N(mu, sigma).
       */
      value: function pdf(x, mu, sigma) {
        if (typeof x != 'number') throw new Error('x must be a number.');
        if (typeof mu != 'number' || typeof sigma != 'number') throw new Error('Need mu and sigma for the normal distribution.');
        var u = x / Math.abs(sigma);
        return 1 / (Math.sqrt(2 * Math.PI) * Math.abs(sigma)) * Math.exp(-1 * Math.pow(x - mu, 2) / (2 * sigma * sigma));
      }
    }, {
      key: 'cdf',


      /**
       * Calculate the probability of getting x or less from N(mu, sigma).
       * @param {number} x - The value to predict.
       * @param {number} mu - The mean.
       * @param {number} sigma - The standard deviation.
       * @return {number} The probability of getting x or less from N(mu, sigma).
       */
      value: function cdf(x, mu, sigma) {
        if (typeof x != 'number') throw new Error('x must be a number.');
        if (typeof mu != 'number' || typeof sigma != 'number') throw new Error('Need mu and sigma for the normal distribution.');
        return .5 * (1 + error((x - mu) / (sigma * Math.sqrt(2))));
      }
    }]);


    /**
     * Generate a new Normal object.
     * @param {number} mu - The mean.
     * @param {number} sigma - The standard deviation.
     */

    function Normal(mu, sigma) {
      babelHelpers.classCallCheck(this, Normal);

      if (typeof mu != 'number' || typeof sigma != 'number') throw new Error('Need mu and sigma for the normal distribution.');

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Normal).call(this));

      _this.pdf = function (x) {
        return _this.constructor.pdf(x, _this.mu, _this.sigma);
      };

      _this.cdf = function (x) {
        return _this.constructor.cdf(x, _this.mu, _this.sigma);
      };

      _this.random = function () {
        return _this.constructor.random(_this.mu, _this.sigma);
      };

      _this.sample = function (n) {
        return _this.constructor.sample(n, _this.mu, _this.sigma);
      };

      _this.mu = mu;
      _this.sigma = sigma;
      _this.variance = sigma * sigma;
      return _this;
    }

    /**
     * Calculate the probability of exaclty x in N(mu, sigma).
     * @memberof Normal
     * @instance
     * @param {number} x - The value to predict.
     * @return {number} The probability of x happening in N(mu, sigma).
     */


    /**
     * Calculate the probability of getting x or less from N(mu, sigma).
     * @memberof Normal
     * @instance
     * @param {number} x - The value to predict.
     * @return {number} The probability of getting x or less from N(mu, sigma).
     */


    /**
     * Generate a random value from N(mu, sigma).
     * @memberof Normal
     * @instance
     * @return {number} The random value from N(mu, sigma).
     */


    /**
     * Generate an array of k random values from N(mu, sigma).
     * @param {number} k - The number of values to generate.
     * @memberof Normal
     * @instance
     * @return {Array<number>} An array of random values from N(mu, sigma).
     */


    return Normal;
  }(Distribution);

  Normal.covariates = 2;
  Normal.discrete = false;

  var SMALL_MEAN = 14;

  /**
  * The Binomial Distribution is a discrete probability distribution
  * with parameters n = *number of trials* and p = *probability of success*.
  * See: [Binomial Distribution](https://en.wikipedia.org/wiki/Binomial_distribution)
  */

  var Binomial = function (_Distribution) {
    babelHelpers.inherits(Binomial, _Distribution);
    babelHelpers.createClass(Binomial, null, [{
      key: 'mean',


      /**
       * Get the mean.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The mean of B(n,p).
       */
      value: function mean(p, n) {
        return n * p;
      }
    }, {
      key: 'variance',


      /**
       * Get the variance.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The variance of B(n,p).
       */
      value: function variance(p, n) {
        return n * p * (1 - p);
      }
    }, {
      key: 'stdDev',


      /**
       * Get the standard deviation.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The standard deviation of B(n,p).
       */
      value: function stdDev(p, n) {
        return Math.sqrt(n * p * (1 - p));
      }
    }, {
      key: 'relativeStdDev',


      /**
       * Get the relative standard deviation.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The relative standard deviation of B(n,p).
       */
      value: function relativeStdDev(p, n) {
        return Math.sqrt((1 - p) / (n * p));
      }
    }, {
      key: 'skewness',


      /**
       * Get the skewness.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The skewness of B(n,p).
       */
      value: function skewness(p, n) {
        return (1 - 2 * p) / Math.sqrt(n * p * (1 - p));
      }
    }, {
      key: 'kurtosis',


      /**
       * Get the kurtosis.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The kurtosis of B(n,p).
       */
      value: function kurtosis(p, n) {
        return 3 - 6 / n + 1 / (n * p * (1 - p));
      }
    }, {
      key: 'random',


      /**
       * Generate a random value from B(n, p).
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The random value from B(n,p).
       */
      value: function random(p, n) {
        var _this2 = this;

        if (typeof p != 'number' || p > 1 || p < 0) throw new Error("p must be between 0 and 1.");
        if (typeof n != 'number' || n < 0) throw new Error("n must be positive or zero.");
        if (n == 0) return 0;

        var flipped = false;
        var ix = 0;
        var prob = void 0;
        if (p > 0.5) {
          flipped = true;
          prob = 1 - p;
        } else prob = p;
        var q = 1 - prob;
        var s = prob / q;
        var np = n * prob;
        if (np < SMALL_MEAN) {
          var f = Math.pow(q, n);
          var u = babelHelpers.get(Object.getPrototypeOf(Binomial), 'random', this).call(this);
          while (ix <= n && u >= f) {
            u -= f;
            f *= s * (n - ix) / (ix + 1);
            ix++;
          };
        } else {
          (function () {

            var ffm = np + prob;
            var fm = Math.floor(ffm);
            var xm = fm + 0.5;
            var npq = np * q;

            var p1 = Math.floor(2.195 * Math.sqrt(npq) - 4.6 * q) + 0.5;

            var xl = xm - p1;
            var xr = xm + p1;

            var c = 0.134 + 20.5 / (15.3 + fm);
            var p2 = p1 * (1.0 + c + c);

            var al = (ffm - xl) / (ffm - xl * prob);
            var lambda_l = al * (1.0 + 0.5 * al);
            var ar = (xr - ffm) / (xr * q);
            var lambda_r = ar * (1 + 0.5 + ar);
            var p3 = p2 + c / lambda_l;
            var p4 = p3 + c / lambda_r;

            var varr = void 0,
                accept = void 0,
                u = void 0,
                v = void 0;

            var tryAgain = function tryAgain() {
              u = babelHelpers.get(Object.getPrototypeOf(Binomial), 'random', _this2).call(_this2) * p4;
              v = babelHelpers.get(Object.getPrototypeOf(Binomial), 'random', _this2).call(_this2);
              if (u <= p1) {
                ix = Math.floor(xm - p1 * v + u);
              } else if (u <= p2) {
                var x = xl + (u - p1) / c;
                v = v * c + 1.0 - Math.abs(x - xm) / p1;
                if (v > 1.0 || v <= 0.0) {
                  tryAgain();
                } else {
                  ix = x;
                };
              } else if (u <= p3) {
                ix = Math.floor(xl + Math.log(v) / lambda_l);
                v *= (u - p2) * lambda_l;
              } else {
                ix = Math.floor(xr - Math.log(v) / lambda_r);
                v *= (u - p3) * lambda_r;
              };
              varr = Math.log(v);
              var x1 = ix + 1;
              var w1 = n - ix - 1;
              var f1 = fm + 1;
              var z1 = n + 1 - fm;
              accept = xm * Math.log(f1 / x1) + (n - fm + .5) * Math.log(z1 / w1) + (ix - fm) * Math.log(w1 * prob / (x1 * q)) + stirling(f1) + stirling(z1) - stirling(x1) - stirling(w1);
              // skipped the faster options for now
              if (varr > accept) tryAgain();
            };
            tryAgain();
          })();
        };

        return Math.floor(flipped ? n - ix : ix);
      }
    }, {
      key: 'sample',


      /**
       * Generate an array of k random values from B(n, p).
       * @param {number} k - The number of values to generate.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {Array<number>} An array of random values from B(n,p).
       */
      value: function sample(k, p, n) {
        var _this3 = this;

        return Array.apply(null, Array(k)).map(function () {
          return _this3.random(p, n);
        });
      }
    }, {
      key: 'pmf',


      /**
       * Calculate the probability of exaclty k in B(n, p).
       * @param {number} k - The value to predict.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The probability of k happening in B(n,p).
       */
      value: function pmf(k, p, n) {
        if (k < 0 || k > n) return 0;else {
          var P = void 0;
          if (p == 0) {
            P = k == 0 ? 1 : 0;
          } else if (p == 1) {
            P = k == n ? 1 : 0;
          } else {
            var Cnk = choose(n, k);
            var pows = Math.pow(p, k) * Math.pow(1 - p, n - k);
            if (Cnk == 'Infinity') {
              if (pows == 0) return 0;else return Cnk;
            } else {
              return Cnk * pows;
            }
          }
          return P;
        };
      }
    }, {
      key: 'cdf',


      /**
       * Calculate the probability of k or less in B(n, p).
       * @param {number} k - The value to predict.
       * @param {number} p - The probability of success.
       * @param {number} n - number of trials.
       * @return {number} The probability getting a value of k or less from B(n,p).
       */
      value: function cdf(k, p, n) {
        if (typeof p != 'number' || p > 1 || p < 0) throw new Error("p must be between 0 and 1.");else if (typeof k != 'number') throw new Error("k must be a number.");else if (typeof n != 'number' || n < 0) throw new Error("n must be positive or zero.");else if (k < 0) return 0;else if (n < k) return 1;else return Array.apply(null, Array(Math.floor(k) + 1)).map(function (_, i) {
          return choose(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
        }).reduce(function (prev, next) {
          return prev + next;
        }, 0);
      }
    }]);


    /**
     * Generate a new Binomial object.
     * @param {number} p - The probability of success.
     * @param {number} n - number of trials.
     */

    function Binomial(p, n) {
      babelHelpers.classCallCheck(this, Binomial);

      if (p == undefined || p > 1 || p < 0) throw new Error("p must be between 0 and 1.");
      if (n == undefined || n < 0) throw new Error("n must be positive or zero.");

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Binomial).call(this));

      _this.pdf = function (k) {
        return _this.constructor.pmf(k, _this.p, _this.n);
      };

      _this.cdf = function (k) {
        return _this.constructor.cdf(k, _this.p, _this.n);
      };

      _this.random = function () {
        return _this.constructor.random(_this.p, _this.n);
      };

      _this.sample = function (k) {
        return _this.constructor.sample(k, _this.p, _this.n);
      };

      _this.p = p;
      _this.n = n;
      _this.mu = _this.constructor.mean(p, n);
      _this.variance = _this.constructor.variance(p, n);
      _this.stdDev = _this.constructor.stdDev(p, n);
      _this.relStdDev = _this.constructor.relativeStdDev(p, n);
      _this.skewness = _this.constructor.skewness(p, n);
      _this.kurtosis = _this.constructor.kurtosis(p, n);
      return _this;
    }

    /**
     * Calculate the probability of exaclty k in B(n, p).
     * @memberof Binomial
     * @instance
     * @param {number} k - The value to predict.
     * @return {number} The probability of k happening in B(n,p).
     */


    /**
     * Calculate the probability of k or less in B(n, p).
     * @memberof Binomial
     * @instance
     * @param {number} k - The value to predict.
     * @return {number} The probability getting a value of k or less from B(n,p).
     */


    /**
     * Generate a random value from B(n, p).
     * @memberof Binomial
     * @instance
     * @return {number} The random value from B(n,p).
     */


    /**
     * Generate an array of k random values from B(n, p).
     * @memberof Binomial
     * @instance
     * @param {number} k - The number of values to generate.
     * @return {Array<number>} An array of random values from B(n,p).
     */


    return Binomial;
  }(Distribution);

  Binomial.covariates = 2;
  Binomial.discrete = true;

  /**
  * The Binomial Distribution is a discrete probability distribution
  * with parameters n = *number of trials* and p = *probability of success*.
  * See: [Bernoulli Distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution)
  * @extends Binomial
  */

  var Bernoulli = function (_Binomial) {
    babelHelpers.inherits(Bernoulli, _Binomial);
    babelHelpers.createClass(Bernoulli, null, [{
      key: 'random',


      /**
       * Generate a random value from B(1, p).
       * @param {number} p - The probability of success.
       * @return {number} The random value from B(1,p).
       */
      value: function random(p) {
        if (p == undefined || p < 0 || p > 1) throw new Error('p must be between zero and one inclusive.');
        var u = Distribution.random();
        if (u < p) return 1;else return 0;
      }
    }, {
      key: 'pmf',


      /**
       * Calculate the probability of exaclty k in B(1, p).
       * @param {number} k - The value to predict.
       * @param {number} p - The probability of success.
       * @return {number} The probability of k happening in B(1,p).
       */
      value: function pmf(k, p) {
        if (k == 0) return 1 - p;else if (k == 1) return p;else return 0;
      }
    }, {
      key: 'cdf',


      /**
       * Calculate the probability of k or less in B(1, p).
       * @param {number} k - The value to predict.
       * @param {number} p - The probability of success.
       * @return {number} The probability getting a value of k or less from B(1,p).
       */
      value: function cdf(k, p) {
        if (typeof p != 'number' || p > 1 || p < 0) throw new Error("p must be between zero and one inclusive.");else if (typeof k != 'number') throw new Error("k must be a number.");else if (k == 1) return p;else if (k == 0) return 1 - p;else return NaN;
      }
    }]);


    /**
     * Generate a new Bernoulli object.
     * @param {number} p - The probability of success.
     */

    function Bernoulli(p) {
      babelHelpers.classCallCheck(this, Bernoulli);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Bernoulli).call(this, p, 1));

      _this.pdf = function (k) {
        return _this.constructor.pmf(k, _this.p);
      };

      _this.cdf = function (k) {
        return _this.constructor.cdf(k, _this.p);
      };

      _this.random = function () {
        return _this.constructor.random(_this.p);
      };

      _this.sample = function (n) {
        return Array.apply(null, Array(n)).map(function () {
          return _this.random();
        });
      };

      return _this;
    }

    /**
     * Calculate the probability of exaclty k in B(1, p).
     * @memberof Bernoulli
     * @instance
     * @param {number} k - The value to predict.
     * @return {number} The probability of k happening in B(1,p).
     */


    /**
    * Calculate the probability of k or less in B(1, p).
     * @memberof Bernoulli
     * @instance
     * @param {number} k - The value to predict.
     * @return {number} The probability getting a value of k or less from B(1,p).
     */


    /**
     * Generate a random value from B(1, p).
     * @memberof Bernoulli
     * @instance
     * @return {number} The random value from B(1,p).
     */


    /**
     * Generate an array of k random values from B(1, p).
     * @memberof Bernoulli
     * @instance
     * @param {number} k - The number of values to generate.
     * @return {Array<number>} An array of random values from B(1,p).
     */


    return Bernoulli;
  }(Binomial);

  Bernoulli.covariates = 1;

  //http://docs.scipy.org/doc/scipy-0.16.0/reference/generated/scipy.stats.t.html
  //https://github.com/chbrown/nlp/blob/master/src/main/java/cc/mallet/util/StatFunctions.java - CDF - ln236

  var StudentsTDistribution = function (_Distribution) {
    babelHelpers.inherits(StudentsTDistribution, _Distribution);
    babelHelpers.createClass(StudentsTDistribution, null, [{
      key: 'random',
      value: function random(df) {
        throw new Error('not implemented.');
      }
    }, {
      key: 'pdf',
      value: function pdf(t, df) {
        if (df <= 0) return NaN;else {
          return gamma((df + 1) / 2) / (Math.sqrt(Math.PI * df) * gamma(df / 2) * Math.pow(Math.pow(1 + t, 2 / df), -(df + 1) / 2));
        }
      }
    }, {
      key: 'cdf',
      value: function cdf(t, df) {
        if (df <= 0) return NaN;else {
          var a = void 0,
              b = void 0,
              idf = void 0,
              im2 = void 0,
              ioe = void 0,
              s = void 0,
              c = void 0,
              ks = void 0,
              fk = void 0,
              k = void 0;
          var g1 = 1 / Math.PI;
          idf = df;
          a = t / Math.sqrt(idf);
          b = idf / (idf + t * t);
          im2 = df - 2;
          ioe = idf % 2;
          s = 1;
          c = 1;
          idf = 1;
          ks = 2 + ioe;
          fk = ks;
          if (im2 >= 2) {
            for (k = ks; k <= im2; k += 2) {
              c = c * b * (fk - 1) / fk;
              s += c;
              if (s != idf) {
                idf = s;
                fk += 2;
              }
            }
          }
          if (ioe != 1) return .5 + .5 * a * Math.sqrt(b) * s;else {
            if (df == 1) s = 0;
            return .5 + (a * b * s + Math.atan(a)) * g1;
          };
        };
      }
    }]);

    function StudentsTDistribution(df) {
      babelHelpers.classCallCheck(this, StudentsTDistribution);

      if (df >= 0) throw RangeError('df must be greater than zero.');

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(StudentsTDistribution).call(this));

      _this.pdf = function (t) {
        return _this.constructor.pdf(t, _this.df);
      };

      _this.cdf = function (t) {
        return _this.constructor.cdf(t, _this.df);
      };

      _this.random = function () {
        return _this.constructor.random(_this.df);
      };

      _this.sample = function (n) {
        return Array.apply(null, Array(n)).map(function () {
          return _this.random();
        });
      };

      _this.df = df;
      return _this;
    }

    return StudentsTDistribution;
  }(Distribution);

  StudentsTDistribution.covariates = 1;

  /**
  * The sample class is the base for all of our sample based calculations.
  * These methods can be directly accessed on the class or renerated via
  * a class instance. You'll need a Sample object for the ttest function.
  */

  var Sample = function () {
    babelHelpers.createClass(Sample, null, [{
      key: 'variance',

      /**
       * Get the sample variance.
       * [See](https://en.wikipedia.org/wiki/Variance#Population_variance_and_sample_variance).
       * @param {Array<number>} x - The sample data.
       * @return {number} The sample variance or NaN.
       */
      value: function variance(x) {
        return sumNthPowerDev(x, 2) / (x.length - 1);
      }
    }, {
      key: 'sqrdMeanDev',


      /**
       * Get the sum of the squared deviations from the mean.
       * [See](https://en.wikipedia.org/wiki/Squared_deviations_from_the_mean).
       * @param {Array<number>} x - The sample data.
       * @return {number} The squared deviations from the mean or NaN.
       */
      value: function sqrdMeanDev(x) {
        return sumNthPowerDev(x, 2);
      }
    }, {
      key: 'meanDev',


      /**
       * Get the sum of the absolute deviations from the mean.
       * [See](https://en.wikipedia.org/wiki/Deviation_(statistics)#Unsigned_or_absolute_deviation).
       * @param {Array<number>} x - The sample data.
       * @return {number} The mean deviation.
       */
      value: function meanDev(x) {
        return sumNthPowerDev(x, 1, true) / x.length;
      }
    }, {
      key: 'stdDev',


      /**
       * Get the standard deviation.
       * [See](https://en.wikipedia.org/wiki/Standard_deviation).
       * @param {Array<number>} x - The sample data.
       * @return {number} The standard deviation.
       */
      value: function stdDev(x) {
        var v = this.variance(x);
        return isNaN(v) ? 0 : Math.sqrt(v);
      }
    }, {
      key: 'rootMeanSqrd',


      /**
       * Get the root mean square.
       * [See](https://en.wikipedia.org/wiki/Root_mean_square).
       * @param {Array<number>} x - The sample data.
       * @return {number} The root mean square.
       */
      value: function rootMeanSqrd(x) {
        return Math.sqrt(x.map(function (val) {
          return val * val;
        }).reduce(function (p, n) {
          return p + n;
        }) / x.length);
      }
    }, {
      key: 'stdMeanDev',


      /**
       * Get the standard deviation of the mean.
       * [See](https://en.wikipedia.org/wiki/Standard_error#Standard_error_of_the_mean).
       * @param {Array<number>} x - The sample data.
       * @return {number} The standard deviation of the mean.
       */
      value: function stdMeanDev(x) {
        return this.stdDev(x) / Math.sqrt(x.length);
      }
    }, {
      key: 'relativeStdDev',


      /**
       * Get the relative standard deviation or coefficient of variation.
       * [See](https://en.wikipedia.org/wiki/Coefficient_of_variation).
       * @param {Array<number>} x - The sample data.
       * @return {number} The relative standard deviation.
       */
      value: function relativeStdDev(x) {
        return this.stdDev(x) / mean(x);
      }
    }, {
      key: 'quartiles',


      /**
       * Get the .25, .5, .75 quantiles of the data.
       * The .5 quantile is the median. Together they are the quartiles.
       * [See](https://en.wikipedia.org/wiki/Quartile).
       * @param {Array<number>} x - The sample data.
       * @return {number} The quartiles.
       */
      value: function quartiles(x) {
        return quantile(x, [.25, .5, .75]);
      }
    }, {
      key: 'skewness',


      /**
       * Get the skewness.
       * [See](https://en.wikipedia.org/wiki/Skewness).
       * @param {Array<number>} x - The sample data.
       * @return {number} The skewness.
       */
      value: function skewness(x) {
        var std = this.stdDev(x);
        if (isNaN(std) || x.length < 3) return NaN;else {
          var n = x.length;
          var cubed = Math.pow(std, 3);
          var sumCubed = sumNthPowerDev(x, 3);
          return n * sumCubed / ((n - 1) * (n - 2) * cubed);
        }
      }
    }, {
      key: 'kurtosis',


      /**
       * Get the kurtosis.
       * [See](https://en.wikipedia.org/wiki/Kurtosis).
       * @param {Array<number>} x - The sample data.
       * @return {number} The kurtosis.
       */
      value: function kurtosis(x) {
        var std = this.stdDev(x);
        if (isNaN(std) || x.length < 3) return NaN;else {
          var n = x.length;
          var sumCubed = sumNthPowerDev(x, 2);
          var sumQuarted = sumNthPowerDev(x, 4);
          return sumQuarted / Math.pow(sumCubed, 2);
        }
      }
    }, {
      key: 'covariance',


      /**
       * Get the covariance.
       * [See](https://en.wikipedia.org/wiki/Covariance).
       * @param {Sample} x -A Sample object.
       * @param {Sample} y -A Sample object.
       * @return {number} The covariance.
       */
      value: function covariance(x, y) {
        if (!x || !y || x.size <= 1 || x.size !== y.size) return NaN;else {
          var _sum = x.data.map(function (_, i) {
            return (x.data[i] - x.mean) * (y.data[i] - y.mean);
          }).reduce(function (p, n) {
            return p + n;
          }, 0);
          return _sum / (x.size - 1);
        }
      }
    }, {
      key: 'correlation',


      /**
       * Get the correlation.
       * [See](https://en.wikipedia.org/wiki/Correlation_and_dependence).
       * @param {Sample} x -A Sample object.
       * @param {Sample} y -A Sample object.
       * @return {number} The correlation.
       */
      value: function correlation(x, y) {
        if (!x || !x.std || !y || !y.std) return NaN;
        var cov = this.covariance(x, y);
        return cov / x.std / y.std;
      }
    }]);


    /**
     * Generate a new Sample object.
     * @constructs Sample
     * @param {Array<number>} x - The sample data.
     */

    function Sample(x) {
      var _this = this;

      babelHelpers.classCallCheck(this, Sample);

      this.covariance = function (y) {
        return _this.constructor.covariance(_this, y);
      };

      this.correlation = function (y) {
        return _this.constructor.correlation(_this, y);
      };

      if (x.length == 0) throw new Error('Sample of size 0 not allowed.');
      this.data = x;
      this.size = x.length;
      this.mean = mean(x);
      this.std = this.constructor.stdDev(x);
      this.variance = this.constructor.variance(x);
      this.skewness = this.constructor.skewness(x);
      this.kurtosis = this.constructor.kurtosis(x);
      this.sqrdMeanDev = this.constructor.sqrdMeanDev(x);
      this.meanDev = this.constructor.meanDev(x);
      this.rootMeanSqrd = this.constructor.rootMeanSqrd(x);
      this.stdMeanDev = this.constructor.stdMeanDev(x);
      this.relStdDev = this.constructor.relativeStdDev(x);
      this.quartiles = this.constructor.quartiles(x);
    }

    /**
     * Get the covariance.
     * [See](https://en.wikipedia.org/wiki/Covariance).
     * @memberof Sample
     * @instance
     * @param {Sample} y - A Sample object.
     * @return {number} The covariance.
     */


    /**
     * Get the correlation.
     * [See](https://en.wikipedia.org/wiki/Correlation_and_dependence).
     * @memberof Sample
     * @instance
     * @param {Sample} y - A Sample object.
     * @return {number} The correlation.
     */


    return Sample;
  }();

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
  function ttest(sample, other, x) {
    if (!sample) return NaN;
    if (!other) return (sample.mean - x) / (sample.std / Math.sqrt(sample.size));else {
      var difference = x || 0;
      var weightedVar = ((sample.size - 1) * sample.variance + (other.size - 1) * other.variance) / (sample.size + other.size - 2);
      return (sample.mean - other.mean - difference) / Math.sqrt(weightedVar * (1 / sample.size + 1 / other.size));
    }
  }

  exports.choose = choose;
  exports.error = error;
  exports.factorial = factorial;
  exports.gamma = gamma;
  exports.lngamma = lngamma;
  exports.median = median;
  exports.mean = mean;
  exports.mode = mode;
  exports.percentile = percentile;
  exports.quantile = quantile;
  exports.range = range;
  exports.select = select;
  exports.std = std;
  exports.stirling = stirling;
  exports.sum = sum;
  exports.sumNthPowerDev = sumNthPowerDev;
  exports.variance = variance;
  exports.zscore = zscore;
  exports.Normal = Normal;
  exports.Binomial = Binomial;
  exports.Bernoulli = Bernoulli;
  exports.StudentsT = StudentsTDistribution;
  exports.Sample = Sample;
  exports.ttest = ttest;

}));