import { ChiSquared, testDistribution, round } from '../distributions';

// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=63 - pdf
// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=62 - cdf

const answers = [
  //testCase #1
  {
    params: { df: 10 },
    //answer
    answer: {
      mean: 10,
      variance: 20,
      stdDev: 4.47213595499958,
      relStdDev: 0.447213595499958,
      skewness: 0.8944271909999159,
      kurtosis: 4.2,
      pdf: [
        { input: 9,   output: 0.0949038 },
        { input: 2.5, output: 0.0145724 },
        { input: 4,   output: 0.0451118 },
      ],
      cdf: [
        { input: 9,   output: 0.46789642 },
        { input: 2.5, output: 0.00912428 },
        { input: 4,   output: 0.05265302 },
      ],
    }
  },


  //testCase #2
  {
    params: { df: 2 },
    //answer
    answer: {
      mean: 2,
      variance: 4,
      stdDev: 2,
      relStdDev: 1,
      skewness: 2,
      kurtosis: 9,
      pdf: [
        { input: 9,   output: 0.00555450 },
        { input: 2.5, output: 0.14325240 },
        { input: 4,   output: 0.06766764 },
      ],
      cdf: [
        { input: 9,   output: 0.9888910 },
        { input: 2.5, output: 0.71349520 },
        { input: 4,   output: 0.86466472 },
      ],
    }
  },
]

const validParams = { df: 10 };

testDistribution('chi-square', ChiSquared, validParams, answers, (t) => {
  // Validate params - df
  t.throws( () => new ChiSquared({ df: 'test' }), 'throws on typeof(p) not number' );
  t.throws( () => new ChiSquared({ df: -.001 }), 'throws on p less than zero' );

  // Generate 10000 values and make sure they are within a few decimals off df.
  let values = ChiSquared.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(average), validParams.df, 'generates valid random values' );

  // Test PDF edgecases
  t.equal( ChiSquared.pdf(-1, validParams), 0, 'when x is less than zero the pdf is zero');

  // Test CDF edgecases
  t.equal( ChiSquared.cdf(-1, validParams), 0, 'when k is less than zero the cdf is zero');

  t.end();
});
