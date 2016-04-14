import { Normal, testDistribution } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573188

const answers = [
  //testCase #1
  {
    params: { mu: 10, sigma:2 },
    //answer
    answer: {
      mean: 10,
      variance: 4,
      stdDev: 2,
      relStdDev: .2,
      skewness: 0,
      kurtosis: 3,
      pdf: [
        { input: 4,   output: 0.00221592 },
        { input: 6,   output: 0.02699548 },
        { input: 16,  output: 0.00221592 },
      ],
      cdf: [
        { input: 4,   output: 0.00134990 },
        { input: 6,   output: 0.02275013 },
        { input: 16,   output: 0.99865010 },
      ],
    }
  },


  //testCase #2
  {
    params: { mu: 1, sigma: 4 },
    //answer
    answer: {
      mean: 1,
      variance: 16,
      stdDev: 4,
      relStdDev: 4,
      skewness: 0,
      kurtosis: 3,
      pdf: [
        { input: -4,  output: 0.04566227 },
        { input: .5,  output: 0.09895942 },
        { input: 12,  output: 0.00227339 },
      ],
      cdf: [
        { input: -4,  output: 0.10564977 },
        { input: .5,  output: 0.45026177 },
        { input: 12,  output: 0.99702024 },
      ],
    }
  },
]

const validParams = { mu: 0, sigma: 1 };

testDistribution('normal', Normal, validParams, answers, (t) => {
  // Validate params - mu and sigma
  t.throws( () => new Normal({ mu: 'test', sigma: 1 }), 'throws on typeof(a) not number' );
  t.throws( () => new Normal({ mu: 1,  sigma: 'test' }), 'throws on typeof(b) not number' );

  // Generate 10000 values and make sure they are within a few decimals off df.
  let values = Normal.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(average), validParams.mu, 'generates valid random values' );

  t.end();
});
