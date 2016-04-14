import { Bernoulli, testDistribution, round } from '../distributions';

const answers = [
  //testCase #1
  {
    params: { p: .5},
    //answer
    answer: {
      mean: .5,
      variance: .25,
      stdDev: .5,
      relStdDev: 1,
      skewness: 0,
      kurtosis: 1,
      pdf: [
        { input: 0,  output: 0.5 },
        { input: 1,  output: 0.5 },
      ],
      cdf: [
        { input: 0,  output: 0.5 },
        { input: 1,  output: 0.5 },
      ],
    }
  },


  //testCase #2
]

const validParams = { p: .5 };

testDistribution('bernoulli', Bernoulli, validParams, answers, (t) => {
  t.throws( () => new Bernoulli({ p: 'test' }), 'throws on typeof(p) not number' );
  t.throws( () => new Bernoulli({ p: 1.001 }), 'throws on p greater than one' );
  t.throws( () => new Bernoulli({ p: -.001 }), 'throws on p less than zero' );

  // Make sure that at p=0, the result is always 0.
  let tries = Bernoulli.sample(10000, { p: 0 })
  let valid = tries.reduce( (p,n) => n == 0 && p, true )
  t.ok( valid, 'generates valid values at p == 0' );

  // Generate 10000 values and make sure they are within a few decimals of p.
  let values = Bernoulli.sample(10000, validParams)
  let average = values.reduce( (prev, next) => prev + next ) / (10000 / 10)
  t.equal( Math.round(average), 5,  'generates valid values' );

  t.equal( Bernoulli.pdf(.4, validParams), 0,  'give NaN for cdf(k) and k is not an integer.' )
  t.ok( isNaN( Bernoulli.cdf(.4, validParams) ), 'give NaN for cdf(k) and k is not an integer.' )

  t.end();
});
