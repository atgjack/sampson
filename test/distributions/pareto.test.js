import { Pareto, testDistribution } from '../distributions';

//Test at http://www.wolframalpha.com/input/?i=pareto+distribution+k+%3D4+alpha+%3D+5

const answers = [
  //testCase #1
  {
    params: { m: 1, a: 2 },
    //answer
    answer: {
      mean: 2,
      variance: Infinity,
      stdDev: Infinity,
      relStdDev: Infinity,
      skewness: NaN,
      kurtosis: NaN,
      pdf: [
        { input: 4,   output: 0.03125 },
        { input: 6,   output: 0.00925926 },
        { input: 14,  output: 0.00072886 },
      ],
      cdf: [
        { input: 4,   output: 0.9375 },
        { input: 6,   output: 0.97222222 },
        { input: 14,  output: 0.99489796 },
      ],
    }
  },


  //testCase #2
  {
    params: { m: 4, a: 5 },
    //answer
    answer: {
      mean: 5,
      variance: 1.6666667,
      stdDev: 1.2909944,
      relStdDev: 1.2909944 / 5,
      skewness: 4.64758,
      kurtosis: 70.8,
      pdf: [
        { input: 5,   output: 0.32768 },
        { input: 10,  output: 0.00512 },
        { input: 13,  output: 0.00106074 },
      ],
      cdf: [
        { input: 5,   output: 0.67232 },
        { input: 10,  output: 0.98976 },
        { input: 13,  output: 0.99724207 },
      ],
    }
  },
]

const validParams = { m: 1, a: 2 };

testDistribution('Pareto', Pareto, validParams, answers, (t) => {
  // Validate params - a
  t.throws( () => new Pareto({ m: 'test', a: 1 }), 'throws on typeof(a) not number' );

    // Validate params - b
  t.throws( () => new Pareto({ m: 1,  a: 'test' }), 'throws on typeof(b) not number' );
  t.throws( () => new Pareto({ m: -1, a: 1 }), 'throws on m less than zero' );
  t.throws( () => new Pareto({ m: 0,  a: 1 }), 'throws on m equal to zero' );

  // Generate 10000 values and make sure they are average within two orders of magnitude of df.
  // This is a hard random variable to test. !! Open to ideas. !!
  let values = Pareto.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000 * 100)
  t.equal( Math.round(average), Math.round(validParams.a * validParams.m / (validParams.a - 1) / 100), 'generates valid random values' );

  // Edge cases for pdf, cdf, and mean
  t.equal( Pareto.mean({m: 10, a: 0}), Infinity);
  t.equal( Pareto.pdf(0, validParams), 0);
  t.equal( Pareto.cdf(0, validParams), 0);

  t.end();
});
