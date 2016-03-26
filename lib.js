'use strict';

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

babelHelpers;

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
  }]);

  function NormalDistribution(mu, sigma) {
    var _this = this;

    babelHelpers.classCallCheck(this, NormalDistribution);

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

function factorial(n) {
  if (n < 0) return -1;else if (n == 0) return 1;else return n * factorial(n - 1);
};

function sterling(n) {
  var n2 = n * n;
  return (13860 - (462 - (132 - (90 - 140 / n2) / n2) / n2) / n2) / n / 166320;
};

var BINOM_TABLE = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]];

// https://pomax.github.io/bezierinfo/

function choose(n, k) {
  function addBinomial() {
    var s = BINOM_TABLE.length;
    var nextRow = [];
    nextRow[0] = 1;
    var prev = s - 1;
    for (var i = 1; i <= prev; i++) {
      nextRow[i] = BINOM_TABLE[prev][i - 1] + BINOM_TABLE[prev][i];
    };
    nextRow[s] = 1;
    BINOM_TABLE.push(nextRow);
  };
  while (n >= BINOM_TABLE.length) {
    addBinomial();
  };
  return BINOM_TABLE[n][k];
};

var Utils = Object.freeze({
  factorial: factorial,
  sterling: sterling,
  BINOM_TABLE: BINOM_TABLE,
  choose: choose
});

var _class;
var _temp;
var _initialiseProps;
var SMALL_MEAN = 14;

var BinomialDistribution = (_temp = _class = function () {
  babelHelpers.createClass(BinomialDistribution, null, [{
    key: "random",
    value: function random(n, prob) {
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
      if (np < SMALL_MEAN) {
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
    key: "pdf",
    value: function pdf(k, p, n) {
      if (k > n) return 0;else {
        var P = void 0;
        if (p == 0) {
          P = k == 0 ? 1 : 0;
        } else if (p == 1) {
          P = k == n ? 1 : 0;
        } else {
          P = choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        }
        return P;
      };
    }
  }]);

  function BinomialDistribution(n, p) {
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
}(), _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.pdf = function (k) {
    return _this.constructor.pdf(k, _this.p, _this.n);
  };

  this.random = function () {
    return _this.constructor.random(_this.n, _this.p);
  };

  this.sample = function (n) {
    return Array.apply(null, Array(n)).map(function () {
      return _this.random();
    });
  };
}, _temp);

exports.Normal = NormalDistribution;
exports.Binomial = BinomialDistribution;
exports.Utils = Utils;