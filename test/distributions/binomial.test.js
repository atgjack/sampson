import { Binomial, testDistribution, round } from '../distributions';


//Test at http://stattrek.com/online-calculator/binomial.aspx

const answers = [
  //testCase #1
  {
    params: { p: .5, n: 10},
    //answer
    answer: {
      mean: 5,
      variance: 2.5,
      stdDev: Math.sqrt(2.5),
      relStdDev: Math.sqrt(2.5) / 5,
      skewness: 0,
      kurtosis: 2.8,
      pdf: [
        { input: 0,  output: 0.0009765625 },
        { input: 1,  output: 0.009765625 },
        { input: 5,  output: 0.24609375 },
      ],
      cdf: [
        { input: 0,  output: 0.0009765625 },
        { input: 1,  output: 0.0107421875 },
        { input: 5,  output: 0.623046875  },
      ],
    }
  },

  //testCase #2
]

const validParams = { p: .5, n: 10 };

testDistribution('binomial', Binomial, validParams, answers, (t) => {
  // Validate params - p
  t.throws( () => new Binomial({ p: 'test', n: 10 }), 'throws on typeof(p) not number' );
  t.throws( () => new Binomial({ p: 1.001, n: 10 }), 'throws on p greater than one' );
  t.throws( () => new Binomial({ p: -.001, n: 10 }), 'throws on p less than zero' );

  // Validate params - n
  t.throws( () => new Binomial({ p: .5, n: 'test' }), 'throws on typeof(n) not number' );
  t.throws( () => new Binomial({ p: .5, n: -1 }), 'throws on n less than zero' );


  // Make sure that at m=0, the result is always 0.
  let tries = Binomial.sample(10000, { ...validParams, n: 0 })
  let valid = tries.reduce( (p,n) => n == 0 && p, true )
  t.ok( valid, 'generates valid values at p == 0' );

  // Make sure that at p=0, the result is always 0.
  let Ptries = Binomial.sample(10000, { ...validParams, p: 0 })
  let Pvalid = Ptries.reduce( (p,n) => n == 0 && p, true )
  t.ok( Pvalid, 'generates valid values at p == 0' );

  // Generate 10000 values and make sure they are within a few decimals of p * n. ( Small n + p.)
  let smallValues = Binomial.sample(10000, { p: .25, n: 10 } )
  let smallAverage = smallValues.reduce( (prev, next) => prev + next ) / (10000 / 10)
  t.equal( Math.round(smallAverage), .25 * 10 * 10 );

  // Generate 10000 values and make sure they are within a few decimals of p * n. ( Large n + p.)
  let largeValues = Binomial.sample(10000, { p: .75, n: 100 * 10000 } );
  let largeAverage = largeValues.reduce( (prev, next) => prev + next ) / (10000 * 10000)
  t.equal( Math.round(largeAverage), .75 * 100 );

  // Test PDF edgecases
  t.equal( Binomial.pdf(-1, validParams), 0, 'when k is less than zero the pdf is zero');
  t.equal( Binomial.pdf(validParams.n + 1, validParams), 0, 'when k is greatern than n the pdf is zero');
  t.equal( Binomial.pdf(0, { ...validParams, p: 0}), 1, 'when p is zero and k is zero the pdf is one');
  t.equal( Binomial.pdf(1, { ...validParams, p: 0}), 0, 'when p is zero is the pdf is zero');
  t.equal( Binomial.pdf(validParams.n, { ...validParams, p: 1}), 1, 'when p is one and k is n the pdf is one');
  t.equal( Binomial.pdf(1, { ...validParams, p: 1}), 0, 'when p is one and k is not n the pdf is zero');
  t.equal( Binomial.pdf(140, { n: 10000, p: .01}), Infinity, 'when n and k are very large and apart the pdf is Infinity');
  t.equal( Binomial.pdf(1000, { n: 10000, p: .5}), 0, 'when n and k are very large and close the pdf is Infinity');

  // Test CDF edgecases
  t.equal( Binomial.cdf(-1, validParams), 0, 'when k is less than zero the cdf is zero');
  t.equal( Binomial.cdf(validParams.n + 1, validParams), 1, 'when k is greatern than n the pdf is one');
  t.end();
});
