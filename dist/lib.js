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
   * See: [Binomial Coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient)
   *
   * Choose k elements from a set of n elements.
   * `k > n == Infinity`
   *
   *
   * Code kanged from: [Blog of Mark Dominus](http://blog.plover.com/math/choose.html)
   */
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
   * See: [Factorial](https://en.wikipedia.org/wiki/Factorial)
   *
   * n! is the product of all positive integers less than or equal to n.
   * ```
   * 0! == 1
   * n > ~170 == Infinity
   * n < 0 == NaN
   * ```
   */
  function factorial(n) {
    if (n < 0) return NaN;else if (n == 0) return 1;else return n * factorial(n - 1);
  };

  var GAMMA_NUM_LN = 607 / 128;
  var GAMMA_TABLE_LN = [0.99999999999999709182, 57.156235665862923517, -59.597960355475491248, 14.136097974741747174, -0.49191381609762019978, 0.33994649984811888699e-4, 0.46523628927048575665e-4, -0.98374475304879564677e-4, 0.15808870322491248884e-3, -0.21026444172410488319e-3, 0.21743961811521264320e-3, -0.16431810653676389022e-3, 0.84418223983852743293e-4, -0.26190838401581408670e-4, 0.36899182659531622704e-5];

  /**
   * See: [Log-Gamma Function](https://en.wikipedia.org/wiki/Gamma_function#The_log-gamma_function)
   *
   * The log-gamma function is a useful general function.
   * It can handle much larger numbers because it grows much slower compared to the gamma function.
   * It's (n - 1)! and is used by the gamma function for n > 100.
   *
   * Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)
   */
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
   * See: [Gamma Function](https://en.wikipedia.org/wiki/Gamma_function)
   *
   * The gamma function is a useful general function. It's (n - 1)!.
   *
   * #### Restrictions:
   * ```
   * gamma(-1) == Infinity
   * ```
   *
   * Code kanged from: [gamma.js](https://github.com/substack/gamma.js/blob/master/index.js)
   */
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
   * See: [Summation](https://en.wikipedia.org/wiki/Summation)
   *
   * Adds a list of elements together.
   * Uses the [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm)
   * to compensate for floating-point error.
   *
   * Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum.js)
   */
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
   * See: [Mean](https://en.wikipedia.org/wiki/Mean)
   *
   * Averages a list of elements. Uses our internal sum function.
   */
  function mean(x) {
    return x.length == 0 ? NaN : sum(x) / x.length;
  };

  /**
   * See: [Mode](https://en.wikipedia.org/wiki/Mode)
   *
   * Finds the most frequent values of a list of numbers.
   * It always returns an array.
   * The result may contain one or more values.
   *
   * #### Restrictions:
   * ```
   * mode( [] ) == NaN
   * mode( [1] ) == [1]
   * ```
   */
  function mode(list) {
    if (list.length == 0) return NaN;else if (list.length == 1) return list;else {
      var _ret = function () {
        var histo = list.reduce(function (obj, val) {
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
   * See: [Selection](https://en.wikipedia.org/wiki/Selection_algorithm)
   *
   * Efficiently finds the kth largest element in a array.
   *
   * #### Restrictions:
   * ```
   * select( null, 1 ) == NaN     // Error
   * ```
   *
   * Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/pull/146/files)
   */
  function select(array, k, begin, end) {
    var list = array.slice(0);
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
   * See: [Median](https://en.wikipedia.org/wiki/Median)
   *
   * Finds the central most value for a list of numbers.
   * If the list is even, and has no single center, the two
   * inner-most values are averaged.
   * Uses our internal selection function.
   *
   * #### Restrictions:
   * ```
   * median( [] ) == NaN
   * ```
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
   * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
   *
   * Finds the element of a list of numbers at a certain percentile ordered smallest to largest.
   *
   * #### Restrictions:
   * ```
   * percentile( null, .5 )     // Error
   * percentile( [1,2,3], p<0 ) // Error
   * percentile( [1,2,3], p>1 ) // Error
   * percentile( [], .5 )       // NaN
   * ```
   */
  function percentile(list, p) {
    if (p == undefined || p > 1 || p < 0) throw new Error('p must be between zero and one inclusive.');else if (list == undefined) throw new Error('need a list to provide a percentile.');else if (list.length == 0) return NaN;else {
      var index = Math.floor(list.length * p);
      if (index >= list.length) index = list.length - 1;
      return select(list, index);
    };
  };

  /**
   * See: [List Ranking](https://en.wikipedia.org/wiki/List_ranking)
   *
   * Finds the nth largest element of a list of numbers.
   * Accepts both a single quantile and an array of quantiles.
   *
   * #### Restrictions:
   * ```
   * quantile( null, 1 )      // Error
   * quantile( [], 1 )        // Error
   * quantile( [1,2,3], p<0 ) // Error
   * quantile( [1,2,3], p>1 ) // Error
   * ```
   */
  function quantile(list) {
    if (list == undefined || list.length == 0) throw new Error('you must provide an array.');

    for (var _len = arguments.length, quantiles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      quantiles[_key - 1] = arguments[_key];
    }

    var validQuants = quantiles.reduce(function (p, n) {
      return n >= 0 && n <= 1 && p;
    }, true);
    if (!validQuants) throw new Error('quantiles must be between zero and one inclusive.');
    if (quantiles.length > 1) return quantiles.map(function (q) {
      return quantile(list, q);
    });else {
      var quant = quantiles[0];
      if (quant == 0) return list[0];else if (quant == 1) return list[list.length - 1];else {
        var index = list.length * quant;
        if (index % 1) {
          return select(list, Math.floor(index));
        } else if (list.length % 2) {
          return select(list, index);
        } else {
          return (select(list, index - 1) + select(list, index)) / 2;
        };
      };
    };
  };

  /**
   * See: [Range](https://en.wikipedia.org/wiki/Range_(statistics))
   *
   * Finds the difference between the largest and smallest values.
   */
  function range(list) {
    return Math.max.apply(Math, babelHelpers.toConsumableArray(list)) - Math.min.apply(Math, babelHelpers.toConsumableArray(list));
  }

  /**
   * A really useful function. Takes a set of observations and returns the sum of
   * the difference of each observation and the mean of the set raised to the nth power.
   * Can be used to find the absolute value of the difference for functions like MeanDeviation,
   * or by default, the signed values for functions like Variance and SquaredMeanDeviation.
   *
   * Code kanged from: [simple-statistics](https://github.com/simple-statistics/simple-statistics/blob/master/src/sum_nth_power_deviations.js)
   */
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
   * See: [Variance](https://en.wikipedia.org/wiki/Variance)
   *
  * A measure that is used to quantify the amount of variation of a set of data values from their mean value.
  */
  function variance(x) {
    return x.length == 0 ? NaN : sumNthPowerDev(x, 2) / x.length;
  };

  /**
   * See: [Standard Deviation](https://en.wikipedia.org/wiki/Standard_deviation)
   *
   * A measure that is used to quantify the amount of variation of a set of data values.
   */
  function std(x) {
    var v = variance(x);
    return isNaN(v) ? 0 : Math.sqrt(v);
  };

  /**
   * See: [Stirling's Approximation](https://en.wikipedia.org/wiki/Stirling%27s_approximation)
   *
   * Efficiently appoximates ln(n!). Similar to the gamma function, but can be faster and more accurate.
   */
  function stirling(n) {
    return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
  };

  /**
   * See: [Standard Score](https://en.wikipedia.org/wiki/Standard_score)
   *
   * The signed number of deviations an observed value is above the mean.
   */
  function zscore(x, mu, std) {
    return (x - mu) / std;
  };



  var utils = Object.freeze({
  	choose: choose,
  	factorial: factorial,
  	gamma: gamma,
  	lngamma: lngamma,
  	median: median,
  	mean: mean,
  	mode: mode,
  	percentile: percentile,
  	quantile: quantile,
  	range: range,
  	select: select,
  	std: std,
  	stirling: stirling,
  	sum: sum,
  	sumNthPowerDev: sumNthPowerDev,
  	variance: variance,
  	zscore: zscore
  });

  var GammaDistribution = function () {
    babelHelpers.createClass(GammaDistribution, null, [{
      key: 'random',
      value: function random(a, b) {
        return console.log('this is wrong');
      }
    }, {
      key: 'pmf',
      value: function pmf(x, a, b) {
        if (x < 0) {
          return 0;
        } else if (x == 0) {
          if (a == 1) return 1 / b;else return 0;
        } else if (a == 1) {
          return Math.exp(-x / b) / b;
        } else {
          return Math.exp((a - 1) * Math.log(x / b) - x / b - lngamma(a)) / b;
        };
      }
    }]);

    function GammaDistribution(a, b) {
      var _this = this;

      babelHelpers.classCallCheck(this, GammaDistribution);

      this.pdf = function (x) {
        return _this.constructor.pdf(x, _this.a, _this.b);
      };

      this.random = function () {
        return _this.constructor.random(_this.a, _this.b);
      };

      this.sample = function (n) {
        return Array.apply(null, Array(n)).map(function () {
          return _this.random();
        });
      };

      this.a = a;
      this.b = b;
      this.mu = a / b;
      this.variance = a / (b * b);
    }

    return GammaDistribution;
  }();

  GammaDistribution.covariates = 2;
  GammaDistribution.discrete = false;

  var last = NaN;

  var NormalDistribution = function () {
    babelHelpers.createClass(NormalDistribution, null, [{
      key: 'random',
      value: function random(mu, sigma) {
        if (!mu || !sigma) throw new Error('Need mu and sigma for the normal distribution.');
        var z = last;
        last = NaN;
        if (!z) {
          var a = Math.random() * 2 * Math.PI;
          var b = Math.sqrt(-2.0 * Math.log(1.0 - Math.random()));
          z = Math.cos(a) * b;
          last = Math.sin(a) * b;
        }
        return mu + z * sigma;
      }
    }, {
      key: 'pdf',
      value: function pdf(x, mu, sigma) {
        var u = x / Math.abs(sigma);
        return 1 / (Math.sqrt(2 * Math.PI) * Math.abs(sigma)) * Math.exp(-1 * Math.pow(x - mu, 2) / (2 * sigma * sigma));
      }
    }]);

    function NormalDistribution(mu, sigma) {
      var _this = this;

      babelHelpers.classCallCheck(this, NormalDistribution);

      this.pdf = function (x) {
        return _this.constructor.pdf(x, _this.mu, _this.sigma);
      };

      this.random = function () {
        return _this.constructor.random(_this.mu, _this.sigma);
      };

      this.sample = function (n) {
        return Array.apply(null, Array(n)).map(function () {
          return _this.random();
        });
      };

      if (!mu || !sigma) throw new Error('Need mu and sigma for the normal distribution.');
      this.mu = mu;
      this.sigma = sigma;
      this.variance = sigma * sigma;
    }

    return NormalDistribution;
  }();

  NormalDistribution.covariates = 2;
  NormalDistribution.discrete = false;

  var CauchyDistribution = function () {
    babelHelpers.createClass(CauchyDistribution, null, [{
      key: 'random',
      value: function random(a) {
        if (a == undefined || a <= 0) throw new Error('a must be positive and greater than zero.');
        var u = void 0;
        while (!u || u == 0.5) {
          u = Math.random();
        }return a * Math.tan(Math.PI * u);
      }
    }, {
      key: 'pdf',
      value: function pdf(x, a) {
        var u = x / a;
        return 1 / (Math.PI * a) / (1 + u * u);
      }
    }]);

    function CauchyDistribution(a) {
      var _this = this;

      babelHelpers.classCallCheck(this, CauchyDistribution);

      this.pdf = function (x) {
        return _this.constructor.pdf(x, _this.a);
      };

      this.random = function () {
        return _this.constructor.random(_this.a);
      };

      this.sample = function (n) {
        return Array.apply(null, Array(n)).map(function () {
          return _this.random();
        });
      };

      if (a == undefined || a <= 0) throw new Error('a must be positive and greater than zero.');
      this.a = a;
    }

    return CauchyDistribution;
  }();

  CauchyDistribution.covariates = 1;
  CauchyDistribution.discrete = false;

  var SMALL_MEAN$1 = 14;

  var BinomialDistribution = function () {
    babelHelpers.createClass(BinomialDistribution, null, [{
      key: 'random',
      value: function random(prob, n) {
        if (typeof prob != 'number' || prob > 1 || prob < 0) throw new Error("p must be between 0 and 1.");
        if (typeof n != 'number' || n < 0) throw new Error("n must be positive or zero.");
        if (n == 0) return 0;

        var flipped = false;
        var ix = 0;
        var p = void 0;
        if (prob > 0.5) {
          flipped = true;
          p = 1 - prob;
        } else p = prob;
        var q = 1 - p;
        var s = p / q;
        var np = n * p;
        if (np < SMALL_MEAN$1) {
          var f = Math.pow(q, n);
          var u = Math.random();
          while (ix <= n && u >= f) {
            u -= f;
            f *= s * (n - ix) / (ix + 1);
            ix++;
          };
        } else {
          (function () {

            var ffm = np + p;
            var fm = Math.floor(ffm);
            var xm = fm + 0.5;
            var npq = np * q;

            var p1 = Math.floor(2.195 * Math.sqrt(npq) - 4.6 * q) + 0.5;

            var xl = xm - p1;
            var xr = xm + p1;

            var c = 0.134 + 20.5 / (15.3 + fm);
            var p2 = p1 * (1.0 + c + c);

            var al = (ffm - xl) / (ffm - xl * p);
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
              u = Math.random() * p4;
              v = Math.random();
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
              accept = xm * Math.log(f1 / x1) + (n - fm + .5) * Math.log(z1 / w1) + (ix - fm) * Math.log(w1 * p / (x1 * q)) + stirling(f1) + stirling(z1) - stirling(x1) - stirling(w1);
              // skipped the faster options for now
              if (varr > accept) tryAgain();
            };
            tryAgain();
          })();
        };

        return Math.floor(flipped ? n - ix : ix);
      }
    }, {
      key: 'pmf',
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
    }]);

    function BinomialDistribution(p, n) {
      babelHelpers.classCallCheck(this, BinomialDistribution);

      _initialiseProps.call(this);

      if (p == undefined || p > 1 || p < 0) throw new Error("p must be between 0 and 1.");
      if (n == undefined || n < 0) throw new Error("n must be positive or zero.");
      this.p = p;
      this.n = n;
      this.mu = n * p;
      this.variance = n * p * (1 - p);
    }

    return BinomialDistribution;
  }();

  BinomialDistribution.covariates = 2;
  BinomialDistribution.discrete = true;

  var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.pdf = function (k) {
      return _this.constructor.pmf(k, _this.p, _this.n);
    };

    this.random = function () {
      return _this.constructor.random(_this.p, _this.n);
    };

    this.sample = function (n) {
      return Array.apply(null, Array(n)).map(function () {
        return _this.random();
      });
    };
  };

  var BernoulliDistribution = function (_BinomialDistribution) {
    babelHelpers.inherits(BernoulliDistribution, _BinomialDistribution);
    babelHelpers.createClass(BernoulliDistribution, null, [{
      key: 'random',
      value: function random(p) {
        if (p == undefined || p < 0 || p > 1) throw new Error('p must be between zero and one inclusive.');
        var u = Math.random();
        if (u < p) return 1;else return 0;
      }
    }, {
      key: 'pmf',
      value: function pmf(k, p) {
        if (k == 0) return 1 - p;else if (k == 1) return p;else return 0;
      }
    }]);

    function BernoulliDistribution(p) {
      babelHelpers.classCallCheck(this, BernoulliDistribution);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BernoulliDistribution).call(this, p, 1));

      _this.pdf = function (k) {
        return _this.constructor.pmf(k, _this.p);
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

    return BernoulliDistribution;
  }(BinomialDistribution);

  BernoulliDistribution.covariates = 1;



  var distributions = Object.freeze({
  	Normal: NormalDistribution,
  	Binomial: BinomialDistribution,
  	Bernoulli: BernoulliDistribution,
  	Cauchy: CauchyDistribution,
  	Gamma: GammaDistribution
  });

  var Sample = function () {
    babelHelpers.createClass(Sample, null, [{
      key: 'variance',
      value: function variance(x) {
        return sumNthPowerDev(x, 2) / (x.length - 1);
      }
    }, {
      key: 'sqrdMeanDev',
      value: function sqrdMeanDev(x) {
        return sumNthPowerDev(x, 2);
      }
    }, {
      key: 'meanDev',
      value: function meanDev(x) {
        return sumNthPowerDev(x, 1, true) / x.length;
      }
    }, {
      key: 'stdDev',
      value: function stdDev(x) {
        var v = this.variance(x);
        return isNaN(v) ? 0 : Math.sqrt(v);
      }
    }, {
      key: 'rootMeanSqrd',
      value: function rootMeanSqrd(x) {
        return Math.sqrt(x.map(function (val) {
          return val * val;
        }).reduce(function (p, n) {
          return p + n;
        }) / x.length);
      }
    }, {
      key: 'stdMeanDev',
      value: function stdMeanDev(x) {
        return this.stdDev(x) / Math.sqrt(x.length);
      }
    }, {
      key: 'relativeStdDev',
      value: function relativeStdDev(x) {
        return this.stdDev(x) / mean(x);
      }
    }, {
      key: 'quartiles',
      value: function quartiles(x) {
        return quantile(x, .25, .5, .75);
      }
    }, {
      key: 'skewness',
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
      value: function correlation(x, y) {
        if (!x || !x.std || !y || !y.std) return NaN;
        var cov = this.covariance(x, y);
        return cov / x.std / y.std;
      }
    }]);

    function Sample(data) {
      var _this = this;

      babelHelpers.classCallCheck(this, Sample);

      this.covariance = function (y) {
        return _this.constructor.covariance(_this, y);
      };

      this.correlation = function (y) {
        return _this.constructor.correlation(_this, y);
      };

      if (data.length == 0) throw new Error('Sample of size 0 not allowed.');
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

    return Sample;
  }();

  function tTest(sample, other, x) {
    if (!sample) return NaN;
    if (!other) return (sample.mean - x) / (sample.std / Math.sqrt(sample.size));else {
      var difference = x || 0;
      var weightedVar = ((sample.size - 1) * sample.variance + (other.size - 1) * other.variance) / (sample.size + other.size - 2);
      return (sample.mean - other.mean - difference) / Math.sqrt(weightedVar * (1 / sample.size + 1 / other.size));
    }
  }



  var statistics = Object.freeze({
  	Sample: Sample,
  	tTest: tTest
  });

  exports.distributions = distributions;
  exports.statistics = statistics;
  exports.utils = utils;

}));