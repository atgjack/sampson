import { Exponential, testDistribution } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573224

const answers = [
  //testCase #1
  {
    params: { mu: 10 },
    //answer
    answer: {
      mean: 10,
      variance: 100,
      stdDev: 10,
      relStdDev: 1,
      skewness: 2,
      kurtosis: 9,
      pdf: [
        { input: 9,   output: 0.04065697 },
        { input: 2.5, output: 0.07788008 },
        { input: 4,   output: 0.06703200 },
      ],
      cdf: [
        { input: 9,   output: 0.59343034 },
        { input: 2.5, output: 0.22119922 },
        { input: 4,   output: 0.32967995 },
      ],
    }
  },


  //testCase #2
  {
    params: { mu: 2 },
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
        { input: 9,   output: 0.98889100 },
        { input: 2.5, output: 0.71349520 },
        { input: 4,   output: 0.86466472 },
      ],
    }
  },
]

const validParams = { mu: 10 };

testDistribution('exponential', Exponential, validParams, answers, (t) => {
  // Validate params - df
  t.throws( () => new Exponential({ mu: 'test' }), 'throws on typeof(p) not number' );
  t.throws( () => new Exponential({ mu: -.001 }), 'throws on p less than zero' );

  // Generate 10000 values and make sure they are within a few decimals off df.
  let values = Exponential.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(average), validParams.mu, 'generates valid random values' );

  // Test PDF edgecases
  t.equal( Exponential.pdf(-1, validParams), 0, 'when x is less than zero the pdf is zero');

  // Test CDF edgecases
  t.equal( Exponential.cdf(-1, validParams), 0, 'when k is less than zero the cdf is zero');

  t.end();
});
