import { Weibull, testDistribution } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573217
//http://user.engineering.uiowa.edu/~dbricker/active%20learning%20cases/Stochastic/Weibull_tables.PDF
//http://www.wolframalpha.com/widgets/view.jsp?id=632245ec65eb39b085d24c066adb2729

const answers = [
  //testCase #1
  {
    params: { a: 10, b:2.5 },
    //answer
    answer: {
      mean: 8.8726382,
      variance: 14.4146689,
      stdDev: 3.7966655,
      relStdDev: 0.4279072,
      skewness: 0.3586318,
      kurtosis: 2.8567831 - 3,
      pdf: [
        { input: 2,   output: 0.02196423 },
        { input: 6,   output: 0.08791476 },
        { input: 10,  output: 0.09196986 },
      ],
      cdf: [
        { input: 2,   output: 0.01772949 },
        { input: 6,   output: 0.24335024 },
        { input: 10,  output: 0.63212056 },
      ],
    }
  },


  //testCase #2
  {
    params: { a: 1, b: 4 },
    //answer
    answer: {
      mean: 0.9064025,
      variance: 0.0646615,
      stdDev: 0.2542862,
      relStdDev: 0.2805445,
      skewness: -0.0872370,
      kurtosis: 2.7478295 - 3,
      pdf: [
        { input: 1,   output: 1.47151776 },
        { input: .5,  output: 0.46970653 },
        { input: 1.5, output: 0.08545116 },
      ],
      cdf: [
        { input: 1,   output: 0.63212056 },
        { input: .5,  output: 0.06058694 },
        { input: 1.5, output: 0.99367028 },
      ],
    }
  },
]

const validParams = { a: 2, b: 1 };

testDistribution('Weibull', Weibull, validParams, answers, (t) => {
  // Validate params - a
  t.throws( () => new Weibull({ a: 'test', b: 1 }), 'throws on typeof(a) not number' );

    // Validate params - b
  t.throws( () => new Weibull({ a: 1,  b: 'test' }), 'throws on typeof(b) not number' );
  t.throws( () => new Weibull({ a: 1,  b: -1 }), 'throws on b less than zero' );
  t.throws( () => new Weibull({ a: 1,  b: 0 }), 'throws on b equal to zero' );

  // Generate 10000 values and make sure they are average within two orders of magnitude of df.
  // This is a hard random variable to test. !! Open to ideas. !!
  let values = Weibull.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000 * 100)
  t.equal( Math.round(average), Math.round(validParams.a / 100), 'generates valid random values' );

  //Test x < 0 pdf and cdf cases
  t.equal( Weibull.pdf(-1, validParams), 0, 'pdf of x less than zero is zero.');
  t.equal( Weibull.cdf(-1, validParams), 0, 'cdf of x less than zero is zero.');

  t.end();
});
