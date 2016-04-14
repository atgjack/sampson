import { Gamma, testDistribution } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573217

const answers = [
  //testCase #1
  {
    params: { a: 10, b:2 },
    //answer
    answer: {
      mean: 5,
      variance: 2.5,
      stdDev: 1.5811388300841898,
      relStdDev: 0.31622776601683794,
      skewness: 0.6324555320336759,
      kurtosis: 0.6,
      pdf: [
        { input: -1,  output: 0 },
        { input: 0,   output: 0 },
        { input: 4,   output: 0.24815383 },
        { input: 6,   output: 0.17472876 },
        { input: 2,   output: 0.02646238 },
      ],
      cdf: [
        { input: -1,  output: 0 },
        { input: 4,   output: 0.28337574 },
        { input: 6,   output: 0.75760784 },
        { input: 2,   output: 0.00813224 },
      ],
    }
  },


  //testCase #2
  {
    params: { a: 1, b: 4 },
    //answer
    answer: {
      mean: .25,
      variance: 0.0625,
      stdDev: .25,
      relStdDev: 1,
      skewness: 2,
      kurtosis: 6,
      pdf: [
        { input: -1,  output: 0 },
        { input: 0,   output: 4 },
        { input: 2,   output: 0.00134186 },
        { input: .5,  output: 0.54134113 },
        { input: 1,   output: 0.07326256 },
      ],
      cdf: [
        { input: -1,  output: 0 },
        { input: 2,   output: 0.99966454 },
        { input: .5,  output: 0.86466472 },
        { input: 1,   output: 0.98168436 },
      ],
    }
  },
]

const validParams = { a: 2, b: 1 };

testDistribution('gamma', Gamma, validParams, answers, (t) => {
  // Validate params - a
  t.throws( () => new Gamma({ a: 'test', b: 1 }), 'throws on typeof(a) not number' );
  t.throws( () => new Gamma({ a: -1, b: 1 }), 'throws on a less than zero' );
  t.throws( () => new Gamma({ a: 0,  b: 1 }), 'throws on a equal to zero' );

    // Validate params - b
  t.throws( () => new Gamma({ a: 1,  b: 'test' }), 'throws on typeof(b) not number' );
  t.throws( () => new Gamma({ a: 1,  b: -1 }), 'throws on b less than zero' );
  t.throws( () => new Gamma({ a: 1,  b: 0 }), 'throws on b equal to zero' );

  // Generate 10000 values and make sure they are within a few decimals off df.
  let values = Gamma.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(average), validParams.a / validParams.b, 'generates valid random values' );

  // Generate 10000 values and make sure they are within a few decimals off df. ( a < 1 )
  let Avalues = Gamma.sample(10000, {a: .2, b: 2});
  let Aaverage = Avalues.reduce( (prev, next) => prev + next ) / (10000 / 10)
  t.equal( Math.round(Aaverage), .2 / 2 * 10, 'generates valid random values' );

  // Test PDF edgecases
  t.equal( Gamma.pdf(-1, validParams), 0, 'when x is less than zero the pdf is zero');
  t.equal( Gamma.pdf(0, {...validParams, a: 1}), validParams.b, 'when x is zero and a is one the pdf is b');

  // Test CDF edgecases
  t.equal( Gamma.cdf(-1, validParams), 0, 'when k is less than zero the cdf is zero');

  t.end();
});
