import { Cauchy, testDistribution } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573217

const answers = [
  //testCase #1
  {
    params: { a: 10, b:2 },
    //answer
    answer: {
      mean: NaN,
      variance: NaN,
      stdDev: NaN,
      relStdDev: NaN,
      skewness: NaN,
      kurtosis: NaN,
      pdf: [
        { input: 4,   output: 0.01591549 },
        { input: 6,   output: 0.03183099 },
        { input: 14,  output: 0.03183099 },
      ],
      cdf: [
        { input: 4,   output: 0.10241638 },
        { input: 6,   output: 0.14758362 },
        { input: 14,  output: 0.85241638 },
      ],
    }
  },


  //testCase #2
  {
    params: { a: 1, b: 4 },
    //answer
    answer: {
      mean: NaN,
      variance: NaN,
      stdDev: NaN,
      relStdDev: NaN,
      skewness: NaN,
      kurtosis: NaN,
      pdf: [
        { input: 2,   output: 0.07489644 },
        { input: .5,  output: 0.07835320 },
        { input: 8,   output: 0.01958830 },
      ],
      cdf: [
        { input: 2,   output: 0.57797913 },
        { input: .5,  output: 0.46041658 },
        { input: 8,   output: 0.83475066 },
      ],
    }
  },
]

const validParams = { a: 2, b: 1 };

testDistribution('Cauchy', Cauchy, validParams, answers, (t) => {
  // Validate params - a
  t.throws( () => new Cauchy({ a: 'test', b: 1 }), 'throws on typeof(a) not number' );

    // Validate params - b
  t.throws( () => new Cauchy({ a: 1,  b: 'test' }), 'throws on typeof(b) not number' );
  t.throws( () => new Cauchy({ a: 1,  b: -1 }), 'throws on b less than zero' );
  t.throws( () => new Cauchy({ a: 1,  b: 0 }), 'throws on b equal to zero' );

  // Generate 10000 values and make sure they are average within two orders of magnitude of df.
  // This is a hard random variable to test. !! Open to ideas. !!
  let values = Cauchy.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000 * 100)
  t.equal( Math.round(average), Math.round(validParams.a / 100), 'generates valid random values' );

  t.end();
});
