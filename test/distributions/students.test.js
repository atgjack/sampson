import test from 'blue-tape';

import { StudentsT } from '../distributions';

// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=63 - pdf
// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=62 - cdf

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/students', (t) => {
  t.test('distributions/students/random', (t) => {
    let random = StudentsT.random;

    t.test('throws on bad params', t => {
      t.throws( () => random() );
      t.throws( () => random(0) );
      t.throws( () => random(-1) );
      t.throws( () => random('test') );
      t.end()
    });

    t.test('generates values that average to the expected value', t => {
      let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(4) )
      let average = values.reduce( (prev, next) => prev + next ) / (10000)
      t.equal( Math.round(average), 0 );
      t.end();
    });

    t.test('generates values that average to the expected value when df is two', t => {
      let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(2) )
      let average = values.reduce( (prev, next) => prev + next ) / (10000)
      t.equal( Math.round(average), 0 );
      t.end();
    });
  });

  t.test('distributions/students/pdf', t => {
    let pdf = StudentsT.pdf;

    t.test('throws on bad params', t => {
      t.throws( () => pdf('test', 2) );
      t.throws( () => pdf(1, 'test') );
      t.throws( () => pdf(1, -1) );
      t.throws( () => pdf(1, 0) );
      t.end();
    });

    t.test('generates accurate values', t => {
      t.equals( round(pdf(-1, 4)), 0.2147 );
      t.equals( round(pdf(1, 1)), 0.1592 );
      t.equals( round(pdf(4, 2)), 0.0131 );
      t.equals( round(pdf(4, 4)), 0.0067 );
      t.equals( round(pdf(1, 6)), 0.2231 );
      t.end();
    });
  });

  t.test('distributions/students/cdf', t => {
    let cdf = StudentsT.cdf;

    t.test('throws on bad params', t => {
      t.throws( () => cdf('test', 2) );
      t.throws( () => cdf(1, 'test') );
      t.throws( () => cdf(1, -1) );
      t.throws( () => pdf(1, 0) );
      t.end()
    });

    t.test('generates accurate values', t => {
      t.equals( round(cdf(-1, 4)), 0.1870 );
      t.equals( round(cdf(1, 1)), 0.75 );
      t.equals( round(cdf(-1, 2)), 0.2113 );
      t.equals( round(cdf(1, 3)), 0.8045 );
      t.equals( round(cdf(4, 2)), 0.9714 );
      t.equals( round(cdf(4, 4)), 0.9919 );
      t.equals( round(cdf(1, 6)), 0.8220 );
      t.end();
    });
  });

  t.test('distributions/students/class', t => {
    let Distribution = StudentsT;

    t.test('throws on bad params', t => {
      // Args == undefined
      t.throws( () => new Distribution() );
      t.throws( () => new Distribution(-1) );
      t.throws( () => new Distribution(0) );
      t.throws( () => new Distribution('test') );
      t.end();
    });

    t.test('generates a valid class', t => {
      let df = 10;
      let dist = new Distribution(df);
      t.equal( dist.df, df );
      t.equal( dist.mean, 0 );
      t.equal( dist.variance, 10 / 8 );
      t.ok( dist.random() );
      t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000), dist.mean );
      t.equal( round(dist.pdf(2)), 0.0611 );
      t.equal( round(dist.cdf(2)), 0.9633 );
      // Test Inifinte variance
      let infDist = new Distribution(1);
      t.equal( infDist.variance, Infinity );
      t.end();
    });
  });
});
