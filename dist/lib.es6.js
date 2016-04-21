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

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

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

babelHelpers.slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

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
 * @param {number} z - The number.
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

var EPS = 1e-14;
/**
 * The regularized lower incomplete gamma function
 * [See](https://en.wikipedia.org/wiki/Incomplete_gamma_function#Lower_incomplete_Gamma_function)
 * @param {number} s - The first number.
 * @param {number} z - The second number.
 * @return {number} The value from the lower incomplete gamma function.
 */
// Code kanged from: [samtools](https://github.com/lh3/samtools/blob/master/bcftools/kfunc.c)
function gammainc_lower(s, z) {
  var sum = void 0,
      x = void 0,
      k = void 0;
  for (k = 1, sum = 1, x = 1; k < 100; ++k) {
    sum += x *= z / (s + k);
    if (x / sum < EPS) break;
  };
  return Math.exp(s * Math.log(z) - z - lngamma(s + 1) + Math.log(sum));
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
    if (!isNaN(n)) {
      var corrected = n - errorComp;
      var next = p + corrected;
      errorComp = next - p - corrected;
      return next;
    } else return p;
  }, 0);
};

/**
 * Averages a list of elements. Uses our internal sum function.
 * See: [Mean](https://en.wikipedia.org/wiki/Mean)
 * @param {Array<number>} x - The numbers to average.
 * @return {number} The mean or NaN if x is the empty set.
 */
function mean(x) {
  return x.length == 0 ? NaN : sum(x) / x.filter(function (d) {
    return !isNaN(d);
  }).length;
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
function median(x) {
  var result = void 0;
  if (x.length == 0) result = NaN;else {
    var even = x.length % 2 == 0;
    if (even) {
      result = select(x, x.length / 2);
      result += select(x, x.length / 2 - 1);
      result /= 2;
    } else {
      result = select(x, (x.length - 1) / 2);
    };
  };
  return result;
}

/**
 * Finds the element of a list of numbers at a certain percentile ordered smallest to largest.
 * Uses the internal select function.
 * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
 * @param {Array<number>} x - The numbers.
 * @param {number} p - The percentile.
 * @return {number} The element at the pth percentile of x or NaN if x is the empty set.
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

/***
 * An abstract Distribution class.
 * All of our Distributions extend this.
 * It holds the base uniform random number generator.
 * @interface
 */

var Distribution = function () {
  babelHelpers.createClass(Distribution, null, [{
    key: 'validate',


    /** @private */
    value: function validate(params) {
      var _this = this;

      var valid = {};
      if ((typeof params === 'undefined' ? 'undefined' : babelHelpers.typeof(params)) != 'object') throw new Error('Parameters must be an object.');else {
        var keys = Object.keys(this.parameters);
        keys.map(function (key) {
          return [key, _this.parameters[key]];
        }).forEach(function (ar) {
          var _ar = babelHelpers.slicedToArray(ar, 2);

          var name = _ar[0];
          var val = _ar[1];

          var type = babelHelpers.typeof(params[name]);
          if (type === undefined) throw new Error(name + ' needed for this distribution.');else if (type !== 'number') throw new Error(name + ' must be a number.');else if (typeof val == 'function') {
            var result = val(params[name]);
            if (!result) throw new Error(name + ' is not valid.');
            valid[name] = params[name];
          } else valid[name] = params[name];
        });
        return valid;
      };
    }
  }, {
    key: 'mean',


    /** @private */
    value: function mean(params) {
      return NaN;
    }
  }, {
    key: 'variance',

    /** @private */
    value: function variance(params) {
      return NaN;
    }
  }, {
    key: 'stdDev',

    /** @private */
    value: function stdDev(params) {
      return Math.sqrt(this.variance(params));
    }
  }, {
    key: 'relStdDev',

    /** @private */
    value: function relStdDev(params) {
      return this.stdDev(params) / this.mean(params);
    }
  }, {
    key: 'skewness',

    /** @private */
    value: function skewness(params) {
      return NaN;
    }
  }, {
    key: 'kurtosis',

    /** @private */
    value: function kurtosis(params) {
      return NaN;
    }
  }, {
    key: 'pdf',


    /** @private */
    value: function pdf() {
      return NaN;
    }
  }, {
    key: 'cdf',

    /** @private */
    value: function cdf() {
      return NaN;
    }
  }, {
    key: 'random',


    /**
     * Generate a uniform random variable.
     * @return {number} A uniform random variable.
     */
    value: function random() {
      return Math.random();
    }
  }, {
    key: 'sample',


    /**
     * Generate an array of k random values.
     * @param {number} k - The number of values to generate.
     * @param {Object} params - The distribution parameters.
     * @return {Array<number>} An array of k random values.
     */
    value: function sample(k, params) {
      var _this2 = this;

      return Array.apply(null, Array(k)).map(function () {
        return _this2.random(params);
      });
    }
  }]);


  /**
   * A generic distribution constructor.
   * @param {Object} params - The distribution parameters.
   */

  function Distribution(params) {
    babelHelpers.classCallCheck(this, Distribution);

    /**
     * The valitated distribution parameters.
     * @type {Object}
     */
    this.params = this.constructor.validate(params);
    /**
     * The distribution mean.
     * @type {number}
     */
    this.mean = this.constructor.mean(params);
    /**
     * The distribution standard deviation.
     * @type {number}
     */
    this.stdDev = this.constructor.stdDev(params);
    /**
     * The distribution relative standard deviation.
     * @type {number}
     */
    this.relStdDev = this.constructor.relStdDev(params);
    /**
     * The distribution variance.
     * @type {number}
     */
    this.variance = this.constructor.variance(params);
    /**
     * The distribution skewness.
     * @type {number}
     */
    this.skewness = this.constructor.skewness(params);
    /**
     * The distribution kurtosis.
     * @type {number}
     */
    this.kurtosis = this.constructor.kurtosis(params);
  }

  babelHelpers.createClass(Distribution, [{
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x.
     * @param {number} x - The value to predict.
     * @return {number} The probability of x occuring.
     */
    value: function pdf(x) {
      return this.constructor.pdf(x, this.params);
    }

    /**
     * Calculate the probability of getting x or less.
     * @param {number} x - The value to predict.
     * @return {number} The probability of getting x or less.
     */

  }, {
    key: 'cdf',
    value: function cdf(x) {
      return this.constructor.cdf(x, this.params);
    }

    /**
     * Generate a random value.
     * @return {number} The random value.
     */

  }, {
    key: 'random',
    value: function random() {
      return this.constructor.random(this.params);
    }

    /**
     * Generate an array of n random values.
     * @param {number} n - The number of values to generate.
     * @return {Array<number>} An array of n random values.
     */

  }, {
    key: 'sample',
    value: function sample(n) {
      return this.constructor.sample(n, this.params);
    }
  }]);
  return Distribution;
}();

Distribution.covariates = 0;
Distribution.discrete = false;
Distribution.params = {};

/**
* The Cauchy Distribution is a continuous probability distribution
* with parameters a = *location* and b = *scale*.
* See: [Cauchy Distribution](https://en.wikipedia.org/wiki/Cauchy_distribution)
*/

var Cauchy = function (_Distribution) {
  babelHelpers.inherits(Cauchy, _Distribution);

  function Cauchy() {
    babelHelpers.classCallCheck(this, Cauchy);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Cauchy).apply(this, arguments));
  }

  babelHelpers.createClass(Cauchy, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.a === undefined || params.b === undefined) {
        throw new Error('need a parameter object of shape { a: number, b: number }.');
      };
      var a = params.a;
      var b = params.b;

      if (typeof a != 'number') throw Error('a must be a number.');
      if (typeof b != 'number' || b <= 0) throw RangeError('b must be greater than zero.');
      return params;
    }

    /**
     * Generate a random value from Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Cauchy(a, b).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var a = _validate.a;
      var b = _validate.b;

      var u = void 0;
      while (!u || u == 0.5) {
        u = babelHelpers.get(Object.getPrototypeOf(Cauchy), 'random', this).call(this);
      }return a + b * Math.tan(Math.PI * u);
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Cauchy(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Cauchy(a, b).
     */
    value: function pdf(x, params) {
      if (typeof x != 'number') throw new TypeError('x must be a number');

      var _validate2 = this.validate(params);

      var a = _validate2.a;
      var b = _validate2.b;

      return b / (Math.pow(x - a, 2) + Math.pow(b, 2)) / Math.PI;
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less from Cauchy(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Cauchy(a, b).
     */
    value: function cdf(x, params) {
      if (typeof x != 'number') throw new TypeError('x must be a number');

      var _validate3 = this.validate(params);

      var a = _validate3.a;
      var b = _validate3.b;

      return Math.atan((x - a) / b) / Math.PI + .5;
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of Cauchy(a, b).
     */
    value: function mean(params) {
      return NaN;
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of Cauchy(a, b).
     */
    value: function variance(params) {
      return NaN;
    }
  }, {
    key: 'stdDev',


    /**
     * Get the standard deviation of Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The standard deviation of Cauchy(a, b).
     */
    value: function stdDev(params) {
      return NaN;
    }
  }, {
    key: 'relStdDev',


    /**
     * Get the relative standard deviation of Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The relative standard deviation of Cauchy(a, b).
     */
    value: function relStdDev(params) {
      return NaN;
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of Cauchy(a, b).
     */
    value: function skewness(params) {
      return NaN;
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Cauchy(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Cauchy(a, b).
     */
    value: function kurtosis(params) {
      return NaN;
    }
  }]);
  return Cauchy;
}(Distribution);

Cauchy.covariates = 1;
Cauchy.discrete = false;
Cauchy.parameters = {
  'a': function a(_a) {
    return true;
  },
  'b': function b(_b) {
    return _b >= 0;
  }
};

var last = NaN;

/**
* The Normal Distribution is a continuous probability distribution
* with parameters mu = *mean* and sigma = *standard deviation*.
* See: [Normal Distribution](https://en.wikipedia.org/wiki/Normal)
*/

var Normal = function (_Distribution) {
  babelHelpers.inherits(Normal, _Distribution);

  function Normal() {
    babelHelpers.classCallCheck(this, Normal);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Normal).apply(this, arguments));
  }

  babelHelpers.createClass(Normal, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.mu === undefined || params.sigma == undefined) {
        throw new Error('need a parameter object of shape { mu: number, simga: number }.');
      };
      var mu = params.mu;
      var sigma = params.sigma;

      if (typeof mu != 'number' || typeof sigma != 'number') throw new Error('Need mu and sigma for the normal distribution.');
      return params;
    }

    /**
     * Generate a random value from Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Normal(mu, sigma).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var mu = _validate.mu;
      var sigma = _validate.sigma;

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
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Normal(mu, sigma).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Normal(mu, sigma).
     */
    value: function pdf(x, params) {
      if (typeof x != 'number') throw new Error('x must be a number.');

      var _validate2 = this.validate(params);

      var mu = _validate2.mu;
      var sigma = _validate2.sigma;

      var u = x / Math.abs(sigma);
      return 1 / (Math.sqrt(2 * Math.PI) * Math.abs(sigma)) * Math.exp(-1 * Math.pow(x - mu, 2) / (2 * sigma * sigma));
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less from Normal(mu, sigma).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Normal(mu, sigma).
     */
    value: function cdf(x, params) {
      if (typeof x != 'number') throw new Error('x must be a number.');

      var _validate3 = this.validate(params);

      var mu = _validate3.mu;
      var sigma = _validate3.sigma;

      return .5 * (1 + error((x - mu) / (sigma * Math.sqrt(2))));
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of Normal(mu, sigma).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var mu = _validate4.mu;
      var sigma = _validate4.sigma;

      return mu;
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of Normal(mu, sigma).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var mu = _validate5.mu;
      var sigma = _validate5.sigma;

      return sigma * sigma;
    }
  }, {
    key: 'stdDev',


    /**
     * Get the standard deviation of Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The standard deviation of Normal(mu, sigma).
     */
    value: function stdDev(params) {
      var _validate6 = this.validate(params);

      var mu = _validate6.mu;
      var sigma = _validate6.sigma;

      return sigma;
    }
  }, {
    key: 'relStdDev',


    /**
     * Get the relative standard deviation of Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The relative standard deviation of Normal(mu, sigma).
     */
    value: function relStdDev(params) {
      var _validate7 = this.validate(params);

      var mu = _validate7.mu;
      var sigma = _validate7.sigma;

      return sigma / mu;
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of Normal(mu, sigma).
     */
    value: function skewness(params) {
      return 0;
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Normal(mu, sigma).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Normal(mu, sigma).
     */
    value: function kurtosis(params) {
      return 3;
    }
  }]);
  return Normal;
}(Distribution);

Normal.covariates = 2;
Normal.discrete = false;
Normal.parameters = {
  'mu': function mu(_mu) {
    return true;
  },
  'sigma': function sigma(_sigma) {
    return _sigma >= 0;
  }
};

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/exponential.c

/**
* The Exponential Distribution is a continuous probability distribution
* with parameters mu = *rate*.
* See: [Exponential Distribution](https://en.wikipedia.org/wiki/Exponential_distribution)
*/

var Exponential = function (_Distribution) {
  babelHelpers.inherits(Exponential, _Distribution);

  function Exponential() {
    babelHelpers.classCallCheck(this, Exponential);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Exponential).apply(this, arguments));
  }

  babelHelpers.createClass(Exponential, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.mu === undefined) {
        throw new Error('need a parameter object of shape { mu: number }.');
      };
      var mu = params.mu;

      if (typeof mu != 'number' || mu <= 0) throw RangeError('mu must be greater than zero.');
      return params;
    }

    /**
     * Generate a random value from Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Exponential(mu).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var mu = _validate.mu;

      return -mu * Math.log1p(-babelHelpers.get(Object.getPrototypeOf(Exponential), 'random', this).call(this));
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Exponential(mu).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Exponential(mu).
     */
    value: function pdf(x, params) {
      var _validate2 = this.validate(params);

      var mu = _validate2.mu;

      if (typeof x != 'number') throw new Error('x must be a number.');else if (x < 0) {
        return 0;
      } else {
        return Math.exp(-x / mu) / mu;
      };
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less Exponential(mu).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Exponential(mu).
     */
    value: function cdf(x, params) {
      var _validate3 = this.validate(params);

      var mu = _validate3.mu;

      if (typeof x != 'number') throw new Error('x must be a number.');else if (x <= 0) return 0;else return 1 - Math.exp(-x / mu);
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of Exponential(mu).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var mu = _validate4.mu;

      return mu;
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of Exponential(mu).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var mu = _validate5.mu;

      return mu * mu;
    }
  }, {
    key: 'stdDev',


    /**
     * Get the standard deviation of Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The standard deviation of Exponential(mu).
     */
    value: function stdDev(params) {
      var _validate6 = this.validate(params);

      var mu = _validate6.mu;

      return mu;
    }
  }, {
    key: 'relStdDev',


    /**
     * Get the relative standard deviation of Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The relative standard deviation of Exponential(mu).
     */
    value: function relStdDev(params) {
      return 1;
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of Exponential(mu).
     */
    value: function skewness(params) {
      return 2;
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Exponential(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Exponential(mu).
     */
    value: function kurtosis(params) {
      return 9;
    }
  }]);
  return Exponential;
}(Distribution);

Exponential.covariates = 1;
Exponential.parameters = {
  'mu': function mu(_mu) {
    return true;
  }
};

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/gamma.c

/**
* The Gamma Distribution is a continuous probability distribution
* with parameters a = *shape* and b = *rate*.
* See: [Gamma Distribution](https://en.wikipedia.org/wiki/Gamma_distribution)
*/

var Gamma = function (_Distribution) {
  babelHelpers.inherits(Gamma, _Distribution);

  function Gamma() {
    babelHelpers.classCallCheck(this, Gamma);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Gamma).apply(this, arguments));
  }

  babelHelpers.createClass(Gamma, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.a === undefined || params.b === undefined) {
        throw new Error('need a parameter object of shape { a: number, b: number }.');
      };
      var a = params.a;
      var b = params.b;

      if (typeof a != 'number' || typeof b != 'number') {
        throw new Error('Need a and b for the gamma distribution.');
      };
      if (a <= 0) throw new Error('a must be greater than zero.');
      if (b <= 0) throw new Error('b must be greater than zero.');
      return params;
    }

    /**
     * Generate a random value from Gamma(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from  Gamma(a, b).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var a = _validate.a;
      var b = _validate.b;

      if (a < 1) {
        var u = babelHelpers.get(Object.getPrototypeOf(Gamma), 'random', this).call(this);
        return this.random({ a: 1 + a, b: b }) * Math.pow(u, 1 / a);
      } else {
        var x = void 0,
            v = void 0,
            _u = void 0;
        var d = a - 1 / 3;
        var c = 1 / Math.sqrt(9 * d);
        while (1) {
          do {
            x = Normal.random({ mu: 0, sigma: 1 });
            v = 1 + c * x;
          } while (v <= 0);
          v = v * v * v;
          while (!_u) {
            _u = babelHelpers.get(Object.getPrototypeOf(Gamma), 'random', this).call(this);
          };
          if (_u < 1 - 0.0331 * x * x * x * x) break;
          if (Math.log(_u) < 0.5 * x * x + d * (1 - v + Math.log(v))) break;
        };
        return d * v / b;
      }
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Gamma(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Gamma(a, b).
     */
    value: function pdf(x, params) {
      var _validate2 = this.validate(params);

      var a = _validate2.a;
      var b = _validate2.b;

      if (typeof x != 'number') throw new Error('x must be a number.');else if (x < 0) {
        return 0;
      } else if (x == 0) {
        if (a == 1) return b;else return 0;
      } else if (a == 1) {
        return Math.exp(-x * b) * b;
      } else {
        return Math.exp((a - 1) * Math.log(x * b) - x * b - lngamma(a)) * b;
      };
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less Gamma(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Gamma(a, b).
     */
    value: function cdf(x, params) {
      var _validate3 = this.validate(params);

      var a = _validate3.a;
      var b = _validate3.b;

      if (typeof x != 'number') throw new Error('x must be a number.');else if (x <= 0) return 0;else return gammainc_lower(a, x * b);
    }
  }, {
    key: 'mean',


    /**
    * Get the mean of Gamma(a, b).
    * @param {Object} params - The distribution parameters.
    * @return {number} The mean of Gamma(a, b).
    */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var a = _validate4.a;
      var b = _validate4.b;

      return a / b;
    }
  }, {
    key: 'variance',


    /**
    * Get the variance of Gamma(a, b).
    * @param {Object} params - The distribution parameters.
    * @return {number} The variance of Gamma(a, b).
    */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var a = _validate5.a;
      var b = _validate5.b;

      return a / (b * b);
    }
  }, {
    key: 'stdDev',


    /**
    * Get the standard deviation of Gamma(a, b).
    * @param {Object} params - The distribution parameters.
    * @return {number} The standard deviation of Gamma(a, b).
    */
    value: function stdDev(params) {
      var _validate6 = this.validate(params);

      var a = _validate6.a;
      var b = _validate6.b;

      return Math.sqrt(a / (b * b));
    }
  }, {
    key: 'relStdDev',


    /**
    * Get the relative standard deviation of Gamma(a, b).
    * @param {Object} params - The distribution parameters.
    * @return {number} The relative standard deviation of Gamma(a, b).
    */
    value: function relStdDev(params) {
      var _validate7 = this.validate(params);

      var a = _validate7.a;
      var b = _validate7.b;

      return 1 / Math.sqrt(a);
    }
  }, {
    key: 'skewness',


    /**
    * Get the skewness of Gamma(a, b).
    * @param {Object} params - The distribution parameters.
    * @return {number} The skewness of Gamma(a, b).
    */
    value: function skewness(params) {
      var _validate8 = this.validate(params);

      var a = _validate8.a;
      var b = _validate8.b;

      return 2 / Math.sqrt(a);
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Gamma(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Gamma(a, b).
     */
    value: function kurtosis(params) {
      var _validate9 = this.validate(params);

      var a = _validate9.a;
      var b = _validate9.b;

      return 6 / a;
    }
  }]);
  return Gamma;
}(Distribution);

Gamma.covariates = 2;
Gamma.parameters = {
  'a': function a(_a) {
    return _a >= 0;
  },
  'b': function b(_b) {
    return _b >= 0;
  }
};

/**
* The Pareto Distribution is a continuous probability distribution
* with parameters m = *minimum value* and a = *shape*.
* See: [Pareto Distribution](https://en.wikipedia.org/wiki/Pareto_distribution)
*/

var Pareto = function (_Distribution) {
  babelHelpers.inherits(Pareto, _Distribution);

  function Pareto() {
    babelHelpers.classCallCheck(this, Pareto);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Pareto).apply(this, arguments));
  }

  babelHelpers.createClass(Pareto, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.m === undefined || params.a == undefined) {
        throw new Error('need a parameter object of shape { m: number, a: number }.');
      };
      var m = params.m;
      var a = params.a;

      if (typeof m != 'number' || m <= 0) throw RangeError('m must be greater than zero.');
      if (typeof a != 'number') throw RangeError('a must be a number.');
      return params;
    }

    /**
     * Generate a random value from Pareto(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Pareto(mu).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var m = _validate.m;
      var a = _validate.a;

      return a * Math.pow(babelHelpers.get(Object.getPrototypeOf(Pareto), 'random', this).call(this), -1 / m);
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Pareto(mu).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Pareto(mu).
     */
    value: function pdf(x, params) {
      var _validate2 = this.validate(params);

      var m = _validate2.m;
      var a = _validate2.a;

      if (typeof x != 'number') throw new Error('x must be a number.');else if (x < m) {
        return 0;
      } else {
        return a * Math.pow(m, a) / Math.pow(x, a + 1);
      };
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less Pareto(mu).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Pareto(mu).
     */
    value: function cdf(x, params) {
      var _validate3 = this.validate(params);

      var m = _validate3.m;
      var a = _validate3.a;

      if (typeof x != 'number') throw new Error('x must be a number.');else if (x < m) return 0;else return 1 - Math.pow(m / x, a);
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of Pareto(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of Pareto(mu).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var m = _validate4.m;
      var a = _validate4.a;

      if (a <= 1) return Infinity;else return a * m / (a - 1);
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of Pareto(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of Pareto(mu).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var m = _validate5.m;
      var a = _validate5.a;

      if (a <= 2) return Infinity;else return a * m * m / ((a - 1) * (a - 1) * (a - 2));
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of Pareto(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of Pareto(mu).
     */
    value: function skewness(params) {
      var _validate6 = this.validate(params);

      var m = _validate6.m;
      var a = _validate6.a;

      if (a < 3) return NaN;else return 2 * (1 + a) / (a - 3) * Math.sqrt((a - 2) / a);
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Pareto(mu).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Pareto(mu).
     */
    value: function kurtosis(params) {
      var _validate7 = this.validate(params);

      var m = _validate7.m;
      var a = _validate7.a;

      if (a < 4) return NaN;else return 6 * (a * a * a + a * a - 6 * a - 2) / (a * (a - 3) * (a - 4));
    }
  }]);
  return Pareto;
}(Distribution);

Pareto.covariates = 1;
Pareto.parameters = {
  'm': function m(_m) {
    return _m >= 0;
  },
  'a': function a(_a) {
    return true;
  }
};

var SMALL_MEAN = 14;

/**
* The Binomial Distribution is a discrete probability distribution
* with parameters n = *number of trials* and p = *probability of success*.
* See: [Binomial Distribution](https://en.wikipedia.org/wiki/Binomial_distribution)
*/

var Binomial = function (_Distribution) {
  babelHelpers.inherits(Binomial, _Distribution);

  function Binomial() {
    babelHelpers.classCallCheck(this, Binomial);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Binomial).apply(this, arguments));
  }

  babelHelpers.createClass(Binomial, null, [{
    key: 'random',


    /**
     * Generate a random value from B(n, p).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from B(n,p).
     */
    value: function random(params) {
      var _this2 = this;

      var _validate = this.validate(params);

      var n = _validate.n;
      var p = _validate.p;

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
    key: 'pdf',


    /**
     * Calculate the probability of exaclty k in B(n, p).
     * @param {number} k - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of k happening in B(n,p).
     */
    value: function pdf(k, params) {
      var _validate2 = this.validate(params);

      var n = _validate2.n;
      var p = _validate2.p;

      if (typeof k != 'number') throw new Error("k must be a number.");else if (k < 0 || k > n) return 0;else {
        var P = void 0;
        var x = Math.floor(k);
        if (p == 0) {
          P = x == 0 ? 1 : 0;
        } else if (p == 1) {
          P = x == n ? 1 : 0;
        } else {
          var Cnk = choose(n, x);
          var pows = Math.pow(p, x) * Math.pow(1 - p, n - x);
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
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability getting a value of k or less from B(n,p).
     */
    value: function cdf(k, params) {
      var _validate3 = this.validate(params);

      var n = _validate3.n;
      var p = _validate3.p;

      if (typeof k != 'number') throw new Error("k must be a number.");else if (k < 0) return 0;else if (n < k) return 1;else return Array.apply(null, Array(Math.floor(k) + 1)).map(function (_, i) {
        return choose(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
      }).reduce(function (prev, next) {
        return prev + next;
      }, 0);
    }
  }, {
    key: 'mean',


    /**
    * Get the mean of B(n,p).
    * @param {Object} params - The distribution parameters.
    * @return {number} The mean of B(n,p).
    */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var n = _validate4.n;
      var p = _validate4.p;

      return n * p;
    }
  }, {
    key: 'variance',


    /**
    * Get the variance of B(n,p).
    * @param {Object} params - The distribution parameters.
    * @return {number} The variance of B(n,p).
    */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var n = _validate5.n;
      var p = _validate5.p;

      return n * p * (1 - p);
    }
  }, {
    key: 'stdDev',


    /**
    * Get the standard deviation of B(n,p).
    * @param {Object} params - The distribution parameters.
    * @return {number} The standard deviation of B(n,p).
    */
    value: function stdDev(params) {
      var _validate6 = this.validate(params);

      var n = _validate6.n;
      var p = _validate6.p;

      return Math.sqrt(n * p * (1 - p));
    }
  }, {
    key: 'relStdDev',


    /**
    * Get the relative standard deviation of B(n,p).
    * @param {Object} params - The distribution parameters.
    * @return {number} The relative standard deviation of B(n,p).
    */
    value: function relStdDev(params) {
      var _validate7 = this.validate(params);

      var n = _validate7.n;
      var p = _validate7.p;

      return Math.sqrt((1 - p) / (n * p));
    }
  }, {
    key: 'skewness',


    /**
    * Get the skewness of B(n,p).
    * @param {Object} params - The distribution parameters.
    * @return {number} The skewness of B(n,p).
    */
    value: function skewness(params) {
      var _validate8 = this.validate(params);

      var n = _validate8.n;
      var p = _validate8.p;

      return (1 - 2 * p) / Math.sqrt(n * p * (1 - p));
    }
  }, {
    key: 'kurtosis',


    /**
    * Get the kurtosis of B(n,p).
    * @param {Object} params - The distribution parameters.
    * @return {number} The kurtosis of B(n,p).
    */
    value: function kurtosis(params) {
      var _validate9 = this.validate(params);

      var n = _validate9.n;
      var p = _validate9.p;

      return 3 - 6 / n + 1 / (n * p * (1 - p));
    }
  }]);
  return Binomial;
}(Distribution);

Binomial.covariates = 2;
Binomial.discrete = true;
Binomial.parameters = {
  'p': function p(_p) {
    return _p >= 0 && _p <= 1;
  },
  'n': function n(_n) {
    return _n >= 0;
  }
};

/**
* The Poisson Distribution is a discrete probability distribution
* with parameters mu = *expected value*.
* See: [Poisson Distribution](https://en.wikipedia.org/wiki/Poisson_distribution)
*/

var Poisson = function (_Distribution) {
  babelHelpers.inherits(Poisson, _Distribution);

  function Poisson() {
    babelHelpers.classCallCheck(this, Poisson);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Poisson).apply(this, arguments));
  }

  babelHelpers.createClass(Poisson, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.mu === undefined) {
        throw new Error('need a parameter object of shape { mu: number }.');
      };
      var mu = params.mu;

      if (typeof mu != 'number' || mu <= 0) throw new Error("mu must be greater than zero");
      return params;
    }

    /**
     * Generate a random value from B(n, p).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Poisson(mu).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var mu = _validate.mu;

      var prod = 1;
      var emu = void 0;
      var k = 0;
      while (mu > 10) {
        var m = Math.round(mu * (7 / 8));
        var x = Gamma.random({ a: m, b: 1 });
        if (x >= mu) return k + Binomial.random({ p: mu / x, n: m - 1 });else {
          k += m;
          mu -= x;
        };
      };
      emu = Math.exp(-mu);
      do {
        prod *= babelHelpers.get(Object.getPrototypeOf(Poisson), 'random', this).call(this);
        k++;
      } while (prod > emu);
      return k - 1;
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty k in B(n, p).
     * @param {number} k - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of k happening in Poisson(mu).
     */
    value: function pdf(k, params) {
      var _validate2 = this.validate(params);

      var mu = _validate2.mu;

      if (typeof k !== 'number') throw new Error('k must be a number.');else return Math.exp(Math.log(mu) * k - lngamma(k + 1) - mu);
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of k or less in B(n, p).
     * @param {number} k - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability getting a value of k or less from Poisson(mu).
     */
    value: function cdf(k, params) {
      var _this2 = this;

      var _validate3 = this.validate(params);

      var mu = _validate3.mu;

      if (typeof k !== 'number') throw new Error('k must be a number.');else if (k < 0) return 0;else {
        var arr = Array.apply(null, Array(k + 1)).map(function (_, i) {
          return _this2.pdf(i, params);
        });
        return sum(arr);
      };
    }
  }, {
    key: 'mean',


    /**
    * Get the mean of Poisson(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The mean of Poisson(mu).
    */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var mu = _validate4.mu;

      return mu;
    }
  }, {
    key: 'variance',


    /**
    * Get the variance of Poisson(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The variance of Poisson(mu).
    */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var mu = _validate5.mu;

      return mu;
    }
  }, {
    key: 'skewness',


    /**
    * Get the skewness of Poisson(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The skewness of Poisson(mu).
    */
    value: function skewness(params) {
      var _validate6 = this.validate(params);

      var mu = _validate6.mu;

      return Math.pow(mu, -.5);
    }
  }, {
    key: 'kurtosis',


    /**
    * Get the kurtosis of Poisson(mu).
    * @param {Object} params - The distribution parameters.
    * @return {number} The kurtosis of Poisson(mu).
    */
    value: function kurtosis(params) {
      var _validate7 = this.validate(params);

      var mu = _validate7.mu;

      return Math.pow(mu, -1);
    }
  }]);
  return Poisson;
}(Distribution);

Poisson.covariates = 1;
Poisson.discrete = true;
Poisson.parameters = {
  'mu': function mu(_mu) {
    return true;
  }
};

/**
* The Bernoulli Distribution is a discrete probability distribution
* with parameter p = *probability of success*.
* See: [Bernoulli Distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution)
*/

var Bernoulli = function (_Binomial) {
  babelHelpers.inherits(Bernoulli, _Binomial);
  babelHelpers.createClass(Bernoulli, null, [{
    key: 'random',


    /**
     * Generate a random value from B(1, p).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from B(1,p).
     */
    value: function random(params) {
      var _validate = this.validate(babelHelpers.extends({}, params, { n: 1 }));

      var p = _validate.p;

      var u = Distribution.random();
      if (u < p) return 1;else return 0;
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty k in B(1, p).
     * @param {number} k - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of k happening in B(1,p).
     */
    value: function pdf(k, params) {
      var _validate2 = this.validate(babelHelpers.extends({}, params, { n: 1 }));

      var p = _validate2.p;

      if (typeof k != 'number') throw new Error("k must be a number.");else if (k == 0) return 1 - p;else if (k == 1) return p;else return 0;
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of k or less in B(1, p).
     * @param {number} k - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability getting a value of k or less from B(1,p).
     */
    value: function cdf(k, params) {
      var _validate3 = this.validate(babelHelpers.extends({}, params, { n: 1 }));

      var p = _validate3.p;

      if (typeof k != 'number') throw new Error("k must be a number.");else if (k == 1) return p;else if (k == 0) return 1 - p;else return NaN;
    }
  }]);


  /**
   * Generate a new Bernoulli object.
   * @param {Object} params - The distribution parameters.
   */

  function Bernoulli(params) {
    babelHelpers.classCallCheck(this, Bernoulli);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Bernoulli).call(this, babelHelpers.extends({}, params, { n: 1 })));
  }

  return Bernoulli;
}(Binomial);

Bernoulli.covariates = 1;

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/chisq.c

/**
* The Chi-Squared Distribution is a continuous probability distribution
* with parameters df = *degrees of freedom*.
* See: [Chi-Squared Distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution)
*/

var ChiSquared = function (_Distribution) {
  babelHelpers.inherits(ChiSquared, _Distribution);

  function ChiSquared() {
    babelHelpers.classCallCheck(this, ChiSquared);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ChiSquared).apply(this, arguments));
  }

  babelHelpers.createClass(ChiSquared, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.df === undefined) {
        throw new Error('need a parameter object of shape { df: number }.');
      };
      var df = params.df;

      if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
      return params;
    }

    /**
     * Generate a random value from ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from ChiSquared(df).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var df = _validate.df;

      return 2 * Gamma.random({ a: df / 2, b: 1 });
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in ChiSquared(df).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in ChiSquared(df).
     */
    value: function pdf(x, params) {
      var _validate2 = this.validate(params);

      var df = _validate2.df;

      if (typeof x != 'number') throw new TypeError('x must be a number');else if (x < 0) return 0;else if (df == 2) return Math.exp(-x / 2) / 2;else {
        return Math.exp((df / 2 - 1) * Math.log(x / 2) - x / 2 - lngamma(df / 2)) / 2;
      }
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less from ChiSquared(df).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from ChiSquared(df).
     */
    value: function cdf(x, params) {
      var _validate3 = this.validate(params);

      var df = _validate3.df;

      if (typeof x != 'number') throw new TypeError('x must be a number');else if (x < 0) return 0;else if (df == 2) return 1 - Math.exp(-x / 2);else return gammainc_lower(df / 2, x / 2);
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of ChiSquared(df).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var df = _validate4.df;

      return df;
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of ChiSquared(df).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var df = _validate5.df;

      return 2 * df;
    }
  }, {
    key: 'stdDev',


    /**
     * Get the standard deviation of ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The standard deviation of ChiSquared(df).
     */
    value: function stdDev(params) {
      var _validate6 = this.validate(params);

      var df = _validate6.df;

      return Math.sqrt(2 * df);
    }
  }, {
    key: 'relStdDev',


    /**
     * Get the relative standard deviation of ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The relative standard deviation of ChiSquared(df).
     */
    value: function relStdDev(params) {
      var _validate7 = this.validate(params);

      var df = _validate7.df;

      return Math.sqrt(2 / df);
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of ChiSquared(df).
     */
    value: function skewness(params) {
      var _validate8 = this.validate(params);

      var df = _validate8.df;

      return Math.pow(2, 1.5) / Math.sqrt(df);
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of ChiSquared(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of ChiSquared(df).
     */
    value: function kurtosis(params) {
      var _validate9 = this.validate(params);

      var df = _validate9.df;

      return 3 + 12 / df;
    }
  }]);
  return ChiSquared;
}(Distribution);

ChiSquared.covariates = 1;
ChiSquared.parameters = {
  'df': function df(_df) {
    return _df >= 0;
  }
};

// Code kanged from: https://github.com/ampl/gsl/blob/master/randist/tdist.c
// Code kanged from: http://docs.scipy.org/doc/scipy-0.16.0/reference/generated/scipy.stats.t.html
// Code kanged from: https://github.com/chbrown/nlp/blob/master/src/main/java/cc/mallet/util/StatFunctions.java - CDF - ln236

/**
* The Student's t-Distribution is a continuous probability distribution
* with parameters df = degrees of freedom*.
* See: [Student's t-Distribution](https://en.wikipedia.org/wiki/Student%27s_t-distribution)
*/

var StudentsT = function (_Distribution) {
  babelHelpers.inherits(StudentsT, _Distribution);

  function StudentsT() {
    babelHelpers.classCallCheck(this, StudentsT);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(StudentsT).apply(this, arguments));
  }

  babelHelpers.createClass(StudentsT, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.df === undefined) {
        throw new Error('need a parameter object of shape { df: number }.');
      };
      var df = params.df;

      if (typeof df != 'number' || df <= 0) throw RangeError('df must be greater than zero.');
      return params;
    }

    /**
     * Generate a random value from StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from StudentsT(df).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var df = _validate.df;

      if (df <= 2) {
        var y1 = Normal.random({ mu: 0, sigma: 1 });
        var y2 = ChiSquared.random({ df: df });
        return y1 / Math.sqrt(y2 / df);
      } else {
        var _y = void 0,
            _y2 = void 0,
            z = void 0;
        do {
          _y = Normal.random({ mu: 0, sigma: 1 });
          _y2 = Exponential.random({ mu: 1 / (df / 2 - 1) });
          z = _y * _y2 / (df - 2);
        } while (1 - z < 0 || Math.exp(-_y2 - z) > 1 - z);
        return _y / Math.sqrt((1 - 2 / df) * (1 - z));
      }
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in StudentsT(df).
     * @param {number} t - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in StudentsT(df).
     */
    value: function pdf(t, params) {
      if (typeof t != 'number') throw TypeError('t must be a number.');

      var _validate2 = this.validate(params);

      var df = _validate2.df;

      var lg1 = lngamma(df / 2);
      var lg2 = lngamma((df + 1) / 2);
      return Math.exp(lg2 - lg1) / Math.sqrt(Math.PI * df) * Math.pow(1 + t * t / df, -(df + 1) / 2);
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less StudentsT(df).
     * @param {number} t - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from StudentsT(df).
     */
    value: function cdf(t, params) {
      if (typeof t != 'number') throw TypeError('t must be a number.');

      var _validate3 = this.validate(params);

      var df = _validate3.df;

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
          //        if (s != idf) {
          idf = s;
          fk += 2;
          //        }
        }
      }
      if (ioe != 1) return .5 + .5 * a * Math.sqrt(b) * s;else {
        if (df == 1) s = 0;
        return .5 + (a * b * s + Math.atan(a)) * g1;
      };
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of StudentsT(df).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var df = _validate4.df;

      return df <= 1 ? NaN : 0;
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of StudentsT(df).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var df = _validate5.df;

      if (df < 1) return NaN;else if (df <= 2) return Infinity;else return df / (df - 2);
    }
  }, {
    key: 'stdDev',


    /**
     * Get the standard deviation of StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The standard deviation of StudentsT(df).
     */
    value: function stdDev(params) {
      var _validate6 = this.validate(params);

      var df = _validate6.df;

      if (df < 1) return NaN;else if (df <= 2) return Infinity;else return Math.sqrt(df / (df - 2));
    }
  }, {
    key: 'relStdDev',


    /**
     * Get the relative standard deviation of StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The relative standard deviation of StudentsT(df).
     */
    value: function relStdDev(params) {
      var _validate7 = this.validate(params);

      var df = _validate7.df;

      return NaN;
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of StudentsT(df).
     */
    value: function skewness(params) {
      var _validate8 = this.validate(params);

      var df = _validate8.df;

      if (df > 3) return 0;else return NaN;
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of StudentsT(df).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of StudentsT(df).
     */
    value: function kurtosis(params) {
      var _validate9 = this.validate(params);

      var df = _validate9.df;

      if (df <= 4) return NaN;else return 3 * (df - 2) / (df - 4);
    }
  }]);
  return StudentsT;
}(Distribution);

StudentsT.covariates = 1;
StudentsT.parameters = {
  'df': function df(_df) {
    return _df >= 0;
  }
};

/**
* The Weibull Distribution is a continuous probability distribution
* with parameters a = *scale* and b = *shape*.
* See: [Weibull Distribution](https://en.wikipedia.org/wiki/Weibull_distribution)
*/

var Weibull = function (_Distribution) {
  babelHelpers.inherits(Weibull, _Distribution);

  function Weibull() {
    babelHelpers.classCallCheck(this, Weibull);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Weibull).apply(this, arguments));
  }

  babelHelpers.createClass(Weibull, null, [{
    key: 'random',


    /**
     * Generate a random value from Weibull(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Weibull(a, b).
     */
    value: function random(params) {
      var _validate = this.validate(params);

      var a = _validate.a;
      var b = _validate.b;

      return a * Math.pow(-Math.log(babelHelpers.get(Object.getPrototypeOf(Weibull), 'random', this).call(this)), 1 / b);
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Weibull(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Weibull(a, b).
     */
    value: function pdf(x, params) {
      if (typeof x != 'number') throw new TypeError('x must be a number');

      var _validate2 = this.validate(params);

      var a = _validate2.a;
      var b = _validate2.b;

      if (x < 0) return 0;else return b / a * Math.pow(x / a, b - 1) * Math.exp(-Math.pow(x / a, b));
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less from Weibull(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Weibull(a, b).
     */
    value: function cdf(x, params) {
      if (typeof x != 'number') throw new TypeError('x must be a number');

      var _validate3 = this.validate(params);

      var a = _validate3.a;
      var b = _validate3.b;

      if (x < 0) return 0;else return 1 - Math.exp(-Math.pow(x / a, b));
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of Weibull(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of Weibull(a, b).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var a = _validate4.a;
      var b = _validate4.b;

      return a * gamma(1 + 1 / b);
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of Weibull(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of Weibull(a, b).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var a = _validate5.a;
      var b = _validate5.b;

      return a * a * (gamma(1 + 2 / b) - Math.pow(gamma(1 + 1 / b), 2));
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of Weibull(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of Weibull(a, b).
     */
    value: function skewness(params) {
      var a = params.a;
      var b = params.b;

      var std = this.stdDev(params);
      var mu = this.mean(params);
      return (gamma(1 + 3 / b) * Math.pow(a, 3) - 3 * mu * std * std - Math.pow(mu, 3)) / Math.pow(std, 3);
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Weibull(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Weibull(a, b).
     */
    value: function kurtosis(params) {
      var a = params.a;
      var b = params.b;

      var std = this.stdDev(params);
      var mu = this.mean(params);
      var skew = this.skewness(params);
      return (gamma(1 + 4 / b) * Math.pow(a, 4) - 4 * skew * Math.pow(std, 3) * mu - 6 * Math.pow(mu, 2) * Math.pow(std, 2) - Math.pow(mu, 4)) / Math.pow(std, 4) - 3;
    }
  }]);
  return Weibull;
}(Distribution);

Weibull.covariates = 1;
Weibull.discrete = false;
Weibull.parameters = {
  'a': function a(_a) {
    return _a >= 0;
  },
  'b': function b(_b) {
    return _b > 0;
  }
};

/**
* The Uniform Distribution is a continuous probability distribution
* with parameters a = *min* and b = *max*.
* See: [Uniform Distribution](https://en.wikipedia.org/wiki/Uniform_distribution)
*/

var Uniform = function (_Distribution) {
  babelHelpers.inherits(Uniform, _Distribution);

  function Uniform() {
    babelHelpers.classCallCheck(this, Uniform);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Uniform).apply(this, arguments));
  }

  babelHelpers.createClass(Uniform, null, [{
    key: 'validate',


    /**
     * @private
     * @param {Object} params - The distribution parameters.
     * @return {Object} The given parameters.
     */
    value: function validate(params) {
      if (!params || params.a === undefined || params.b === undefined) {
        throw new Error('need a parameter object of shape { a: number, b: number }.');
      };
      var a = params.a;
      var b = params.b;

      if (typeof a != 'number') throw Error('a must be a number.');
      if (typeof b != 'number' || b <= a) throw RangeError('b must be greater than a.');
      return params;
    }

    /**
     * Generate a random value from Uniform(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The random value from Uniform(a, b).
     */

  }, {
    key: 'random',
    value: function random(params) {
      var _validate = this.validate(params);

      var a = _validate.a;
      var b = _validate.b;

      return a + babelHelpers.get(Object.getPrototypeOf(Uniform), 'random', this).call(this) * (b - a);
    }
  }, {
    key: 'pdf',


    /**
     * Calculate the probability of exaclty x in Uniform(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of x happening in Uniform(a, b).
     */
    value: function pdf(x, params) {
      if (typeof x != 'number') throw new TypeError('x must be a number');

      var _validate2 = this.validate(params);

      var a = _validate2.a;
      var b = _validate2.b;

      if (x < a || x > b) return 0;else return 1 / (b - a);
    }
  }, {
    key: 'cdf',


    /**
     * Calculate the probability of getting x or less from Uniform(a, b).
     * @param {number} x - The value to predict.
     * @param {Object} params - The distribution parameters.
     * @return {number} The probability of getting x or less from Uniform(a, b).
     */
    value: function cdf(x, params) {
      if (typeof x != 'number') throw new TypeError('x must be a number');

      var _validate3 = this.validate(params);

      var a = _validate3.a;
      var b = _validate3.b;

      if (x < a) return 0;else if (x >= b) return 1;else return (x - a) / (b - a);
    }
  }, {
    key: 'mean',


    /**
     * Get the mean of Uniform(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The mean of Uniform(a, b).
     */
    value: function mean(params) {
      var _validate4 = this.validate(params);

      var a = _validate4.a;
      var b = _validate4.b;

      return (a + b) / 2;
    }
  }, {
    key: 'variance',


    /**
     * Get the variance of Uniform(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The variance of Uniform(a, b).
     */
    value: function variance(params) {
      var _validate5 = this.validate(params);

      var a = _validate5.a;
      var b = _validate5.b;

      return Math.pow(b - a, 2) / 12;
    }
  }, {
    key: 'skewness',


    /**
     * Get the skewness of Uniform(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The skewness of Uniform(a, b).
     */
    value: function skewness(params) {
      return 0;
    }
  }, {
    key: 'kurtosis',


    /**
     * Get the kurtosis of Uniform(a, b).
     * @param {Object} params - The distribution parameters.
     * @return {number} The kurtosis of Uniform(a, b).
     */
    value: function kurtosis(params) {
      return -6 / 5;
    }
  }]);
  return Uniform;
}(Distribution);

Uniform.covariates = 1;
Uniform.discrete = false;
Uniform.parameters = {
  'a': function a(_a) {
    return true;
  },
  'b': function b(_b, params) {
    return _b > params.a;
  }
};

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


  /**
   * Get the correlation with another sample.
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

export { choose, error, factorial, gamma, gammainc_lower, lngamma, median, mean, mode, percentile, quantile, range, select, std, stirling, sum, sumNthPowerDev, variance, zscore, Normal, Binomial, Bernoulli, StudentsT, Gamma, ChiSquared, Exponential, Cauchy, Pareto, Poisson, Weibull, Uniform, Sample, ttest };