(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.probably = global.probably || {})));
}(this, function (exports) { 'use strict';

  var babelHelpers = {};

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

  babelHelpers;

  // http://blog.plover.com/math/choose.html
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

  function factorial(n) {
    if (n < 0) return NaN;else if (n == 0) return 1;else return n * factorial(n - 1);
  };

  var GAMMA_NUM_LN = 607 / 128;
  var GAMMA_TABLE_LN = [0.99999999999999709182, 57.156235665862923517, -59.597960355475491248, 14.136097974741747174, -0.49191381609762019978, 0.33994649984811888699e-4, 0.46523628927048575665e-4, -0.98374475304879564677e-4, 0.15808870322491248884e-3, -0.21026444172410488319e-3, 0.21743961811521264320e-3, -0.16431810653676389022e-3, 0.84418223983852743293e-4, -0.26190838401581408670e-4, 0.36899182659531622704e-5];

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

  function gamma(input) {
    var z = input;
    if (z < 0.5) {
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

  // https://github.com/simple-statistics/simple-statistics/blob/master/src/sum.js
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

  function mean(x) {
    return x.length == 0 ? NaN : sum(x) / x.length;
  };

  function sumNthPowerDev(x, n) {
    var mu = mean(x);
    return x.reduce(function (p, next) {
      return p + Math.pow(next - mu, n);
    }, 0);
  };

  function variance(x) {
    return x.length == 0 ? NaN : sumNthPowerDev(x, 2) / x.length;
  };

  function std(x) {
    var v = variance(x);
    return isNaN(v) ? 0 : Math.sqrt(v);
  };

  function stirling(n) {
    return (n + .5) * Math.log(n) - n + Math.log(2 * Math.PI) / 2;
  };

  function zscore(x, mu, std) {
    return (x - mu) / std;
  };



  var Utils = Object.freeze({
  	choose: choose,
  	factorial: factorial,
  	gamma: gamma,
  	lngamma: lngamma,
  	mean: mean,
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
      key: "random",
      value: function random(a) {
        var u = Math.random();
        while (u == 0.5) {
          u = Math.random();
        }return a * Math.tan(Math.PI * u);
      }
    }, {
      key: "pmf",
      value: function pmf(x, a) {
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

      this.a = a;
    }

    return CauchyDistribution;
  }();

  CauchyDistribution.covariates = 1;
  CauchyDistribution.discrete = false;

  var SMALL_MEAN$1 = 14;

  var BinomialDistribution = function () {
    babelHelpers.createClass(BinomialDistribution, null, [{
      key: "random",
      value: function random(prob, n) {
        if (prob > 1 || prob < 0) throw new Error("p must be between 0 and 1.");
        if (n < 0) throw new Error("n must be positive or zero.");
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
                if (ix < 0) {
                  tryAgain();
                } else {
                  v *= (u - p2) * lambda_l;
                };
              } else {
                ix = Math.floor(xr - Math.log(v) / lambda_r);
                if (ix > n) {
                  tryAgain();
                } else {
                  v *= (u - p3) * lambda_r;
                };
              };
              varr = Math.log(v);
              var x1 = ix + 1;
              var w1 = n - ix - 1;
              var f1 = fm + 1;
              var z1 = n + 1 - fm;
              accept = xm * Math.log(f1 / x1) + (n - fm + .5) * Math.log(z1 / w1) + (ix - fm) * Math.log(w1 * p / (x1 * q)) + sterling(f1) + sterling(z1) - sterling(x1) - sterling(w1);
              // skipped the faster options for now
              if (varr > accept) tryAgain();
            };
            tryAgain();
          })();
        };

        return Math.floor(flipped ? n - ix : ix);
      }
    }, {
      key: "pmf",
      value: function pmf(k, p, n) {
        if (k < 0) throw new Error("k must be positive or zero.");
        if (k > n) return 0;else {
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

      if (p > 1 || p < 0) throw new Error("p must be between 0 and 1.");
      if (n < 0) throw new Error("n must be positive or zero.");
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
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BernoulliDistribution).call(this, p, 1));
    }

    return BernoulliDistribution;
  }(BinomialDistribution);

  BernoulliDistribution.covariates = 1;



  var Distributions = Object.freeze({
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
        return x.length == 0 ? NaN : sumNthPowerDev(x, 2) / (x.length - 1);
      }
    }, {
      key: 'std',
      value: function std(x) {
        var v = this.variance(x);
        return isNaN(v) ? 0 : Math.sqrt(v);
      }
    }, {
      key: 'skewness',
      value: function skewness(x) {
        var std = this.std(x);
        if (isNaN(std) || x.length < 3) return NaN;else {
          var n = x.length;
          var cubed = Math.pow(std, 3);
          var sumCubed = sumNthPowerDev(x, 3);
          return n * sumCubed / ((n - 1) * (n - 2) * cubed);
        }
      }
    }, {
      key: 'covariance',
      value: function covariance(x, y) {
        if (!x || !y || x.size <= 1 || x.size !== y.size) return NaN;else {
          var sum = x.data.map(function (_, i) {
            return (x.data[i] - x.mean) * (y.data[i] - y.mean);
          }).reduce(function (p, n) {
            return p + n;
          }, 0);
          return sum / (x.size - 1);
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
      this.std = this.constructor.std(data);
      this.variance = this.constructor.variance(data);
      this.skewness = this.constructor.skewness(data);
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



  var Statistics = Object.freeze({
  	Sample: Sample,
  	TTest: tTest
  });

  exports.Distributions = Distributions;
  exports.Statistics = Statistics;
  exports.Utils = Utils;

}));