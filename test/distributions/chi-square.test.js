import test from 'blue-tape';

import { ChiSquared } from '../distributions';

// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=63 - pdf
// Test at http://www.danielsoper.com/statcalc/calculator.aspx?id=62 - cdf

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/chi-square', (t) => {
  t.test('distributions/chi-square/random', (t) => {
    let random = ChiSquared.random;

    t.test('throws on bad params', t => {
      t.throws( () => random() );
      t.throws( () => random(-1) );
      t.throws( () => random('test') );
      t.end()
    });

    t.test('generates values that average to the expected value', t => {
      let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(4) )
      let average = values.reduce( (prev, next) => prev + next ) / (10000)
      t.equal( Math.round(average), 4 );
      t.end();
    });
  });

  t.test('distributions/chi-square/pdf', t => {
    let pdf = ChiSquared.pdf;

    t.test('throws on bad params', t => {
      t.throws( () => pdf('test', 2) );
      t.throws( () => pdf(1, 'test') );
      t.throws( () => pdf(1, -1) );
      t.end();
    });

    t.test('generates accurate values', t => {
      t.equals( round(pdf(-1, 4)), 0 );
      t.equals( round(pdf(4, 2)), 0.0677 );
      t.equals( round(pdf(4, 4)), 0.1353 );
      t.equals( round(pdf(10, 6)), 0.0421 );
      t.end();
    });
  });

  t.test('distributions/chi-square/cdf', t => {
    let cdf = ChiSquared.cdf;

    t.test('throws on bad params', t => {
      t.throws( () => cdf('test', 2) );
      t.throws( () => cdf(1, 'test') );
      t.throws( () => cdf(1, -1) );
      t.end()
    });

    t.test('generates accurate values', t => {
      t.equals( round(cdf(-1, 4)), 0 );
      t.equals( round(cdf(4, 2)), 0.8647 );
      t.equals( round(cdf(4, 4)), 0.5940 );
      t.equals( round(cdf(10, 6)), 0.8753 );
      t.end();
    });
  });

  t.test('distributions/chi-square/class', t => {
    let Distribution = ChiSquared;

    t.test('throws on bad params', t => {
      // Args == undefined
      t.throws( () => new Distribution() );
      t.throws( () => new Distribution(-1) );
      t.throws( () => new Distribution('test') );
      t.end();
    });

    t.test('generates a valid class', t => {
      let df = 10;
      let dist = new Distribution(df);
      t.equal( dist.df, df );
      t.equal( dist.mu, df );
      t.equal( dist.variance, 2 * df );
      t.ok( dist.random() );
      t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000), dist.mu );
      t.equal( round(dist.pdf(9)), 0.0949 );
      t.equal( round(dist.cdf(9)), 0.4679 );
      t.end();
    });
  });
});
