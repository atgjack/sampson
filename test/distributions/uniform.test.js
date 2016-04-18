import { Uniform, testDistribution } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573217

const answers = [
  //testCase #1
  {
    params: { a: 0, b:1 },
    //answer
    answer: {
      mean: .5,
      variance: 1/12,
      stdDev: Math.sqrt(1/12),
      relStdDev: Math.sqrt(1/12) * 2,
      skewness: 0,
      kurtosis: -6/5,
      pdf: [
        { input: -1,  output: 0 },
        { input: 2,   output: 0 },
        { input: .5,  output: 1 },
        { input: .25, output: 1 },
      ],
      cdf: [
        { input: -1,  output: 0 },
        { input: 2,   output: 1 },
        { input: .5,  output: .5 },
        { input: .25, output: .25 },
      ],
    }
  },


  //testCase #2
  {
    params: { a: 420, b: 666 },
    //answer
    answer: {
      mean: 543,
      variance: 5043,
      stdDev: Math.sqrt(5043),
      relStdDev: Math.sqrt(5043) / 543,
      skewness: 0,
      kurtosis: -6/5,
      pdf: [
        { input: 350, output: 0 },
        { input: 700, output: 0 },
        { input: 444, output: 1 / 246 },
        { input: 555, output: 1 / 246 },
      ],
      cdf: [
        { input: 350, output: 0 },
        { input: 700, output: 1 },
        { input: 444, output: 0.0975609756097561 },
        { input: 555, output: 0.5487804878048781 },
      ],
    }
  },
]

const validParams = { a: 0, b: 100 };

testDistribution('Uniform', Uniform, validParams, answers, (t) => {
  // Validate params - a
  t.throws( () => new Uniform({ a: 'test', b: 1 }), 'throws on typeof(a) not number' );

    // Validate params - b
  t.throws( () => new Uniform({ a: 1,  b: 'test' }), 'throws on typeof(b) not number' );
  t.throws( () => new Uniform({ a: 1,  b: -1 }), 'throws on b less than zero' );
  t.throws( () => new Uniform({ a: 1,  b: 0 }), 'throws on b equal to zero' );

  // Generate 10000 values and make sure they are average within two orders of magnitude of df.
  // This is a hard random variable to test. !! Open to ideas. !!
  let values = Uniform.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(average), Math.round((validParams.b - validParams.a) / 2), 'generates valid random values' );

  //Test x < 0 pdf and cdf cases
  t.equal( Uniform.pdf(-1, validParams), 0, 'pdf of x less than zero is zero.');
  t.equal( Uniform.cdf(-1, validParams), 0, 'cdf of x less than zero is zero.');

  t.end();
});
