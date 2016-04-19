import { Poisson, testDistribution, round } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573179

const answers = [
  {
    params: { mu: 10 },
    answer: {
      mean: 10,
      variance: 10,
      stdDev: Math.sqrt(10),
      relStdDev: Math.sqrt(10) / 10,
      skewness: 1 / Math.sqrt(10),
      kurtosis: 0.1,
      pdf: [
        { input: 9,   output: 0.1251100 },
        { input: 2,   output: 0.0022700 },
        { input: 4,   output: 0.0189166 },
      ],
      cdf: [
        { input: 9,   output: 0.45792971 },
        { input: 2,   output: 0.00276940 },
        { input: 4,   output: 0.02925269 },
      ],
    }
  },

  {
    params: { mu: 2 },
    answer: {
      mean: 2,
      variance: 2,
      stdDev: Math.sqrt(2),
      relStdDev: Math.sqrt(2) / 2,
      skewness: 1 / Math.sqrt(2),
      kurtosis: 0.5,
      pdf: [
        { input: 1,   output: 0.27067057 },
        { input: 3,   output: 0.18044704 },
        { input: 5,   output: 0.03608941 },
      ],
      cdf: [
        { input: 1,   output: 0.40600584 },
        { input: 3,   output: 0.85712346 },
        { input: 5,   output: 0.98343639 },
      ],
    }
  },
]

const validParams = { mu: 12 };

testDistribution('Poisson', Poisson, validParams, answers, (t) => {
  // Validate params - df
  t.throws( () => new Poisson({ mu: 'test' }), 'throws on typeof(mu) not number' );
  t.throws( () => new Poisson({ mu: -.001 }), 'throws on mu less than zero' );

  // Generate 10000 values and make sure they are within a few decimals off mu.
  let values = Poisson.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000 * 10)
  t.equal( Math.round(average), Math.round(validParams.mu / 10), 'generates valid random values' );

  // Test PDF edgecases
  t.equal( Poisson.pdf(-1, validParams), 0, 'when x is less than zero the pdf is zero');

  // Test CDF edgecases
  t.equal( Poisson.cdf(-1, validParams), 0, 'when k is less than zero the cdf is zero');

  t.end();
});
