import { StudentsT, testDistribution, round } from '../distributions';

// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=40 - pdf
// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=41 - cdf

const answers = [
  //testCase #1
  {
    params: { df: 10 },
    //answer
    answer: {
      mean: 0,
      variance: 1.25,
      stdDev: 1.118033988749895,
      relStdDev: NaN,
      skewness: 0,
      kurtosis: 4,
      pdf: [
        { input: 9,   output: 0.0000021 },
        { input: 2.5, output: 0.0269387 },
        { input: 4,   output: 0.0020310 },
      ],
      cdf: [
        { input: 9,   output: 0.9999979 },
        { input: 2.5, output: 0.9842766 },
        { input: 4,   output: 0.9987408 },
      ],
    }
  },


  //testCase #2
  {
    params: { df: 2 },
    //answer
    answer: {
      mean: 0,
      variance: Infinity,
      stdDev: Infinity,
      relStdDev: NaN,
      skewness: NaN,
      kurtosis: NaN,
      pdf: [
        { input: 9,   output: 0.0013225 },
        { input: 2.5, output: 0.0422006 },
        { input: 4,   output: 0.0130946 },
      ],
      cdf: [
        { input: 9,   output: 0.9939392 },
        { input: 2.5, output: 0.9351941 },
        { input: 4,   output: 0.9714045 },
      ],
    }
  },
]

const validParams = { df: 10 };

testDistribution('students-t', StudentsT, validParams, answers, (t) => {
  // Validate params - df
  t.throws( () => new StudentsT({ df: 'test' }), 'throws on typeof(p) not number' );
  t.throws( () => new StudentsT({ df: -.001 }), 'throws on p less than zero' );

  // Generate 10000 values and make sure they are within a few decimals off df.
  let values = StudentsT.sample(10000, validParams);
  let average = values.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(average), 0, 'generates valid random values' );

  // Generate 10000 values and make sure they are within a few decimals off df. ( df == 2 )
  let Dvalues = StudentsT.sample(10000, { df: 2 });
  let Daverage = Dvalues.reduce( (prev, next) => prev + next ) / (10000)
  t.equal( Math.round(Daverage), 0, 'generates valid random values' );

  // Test CDF edgecases
  t.equal( round(StudentsT.cdf(1,  { df: 3})), 0.8044989, 'strange case when df is three');
  t.equal( StudentsT.cdf(1,  { df: 1}), 0.75, 'strange case when df is one');
  t.equal( round(StudentsT.cdf(1,  { df: 6})), 0.8220412, 'strange case when df is even');

  // Test Descriptive edgecases
  t.ok( isNaN( StudentsT.mean({df: 1}) ), 'mean of df is one is NaN' );
  t.ok( isNaN( StudentsT.variance({df: .5}) ), 'variance of df less than one is NaN' );
  t.equal( StudentsT.variance({df: 2}), Infinity, 'variance of df less than or equal to two is Infinity' );
  t.ok( isNaN( StudentsT.stdDev({df: .5}) ), 'standard deviation of df less than one is NaN' );
  t.equal( StudentsT.stdDev({df: 2}), Infinity, 'standard deviation of df less than or equal to two is Infinity' );
  t.ok( isNaN( StudentsT.skewness({df: 2}) ), 'skewness of df less than or equal to two is NaN' );
  t.ok( isNaN( StudentsT.kurtosis({df: 4}) ), 'kurtosis of df less than or equal to four is NaN' );

  t.end();
});
