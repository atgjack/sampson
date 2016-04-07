import test from 'blue-tape';

import { Gamma } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573217

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/gamma', (t) => {
  t.test('distributions/gamma/random', (t) => {
    let random = Gamma.random;

    t.test('throws on bad params', t => {
      // Args == undefined
      t.throws( () => random() );
      t.throws( () => random(.5) );
      // Args == zero
      t.throws( () => random(0, 1) );
      t.throws( () => random(1, 0) );
      // Args < 0
      t.throws( () => random(-2, 1) );
      t.throws( () => random(1, -2) );
      t.end()
    });

    t.test('generates values that average to the expected value', t => {
      let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(9, 2) )
      let average = values.reduce( (prev, next) => prev + next ) / (10000 / 10)
      t.equal( Math.round(average), 45 );
      t.end();
    });
  });

  t.test('distributions/gamma/pdf', t => {
    let pdf = Gamma.pdf;

    t.test('throws on bad params', t => {
      t.throws( () => pdf('test', 2, 1000) );
      t.throws( () => pdf(1, 'test', 1000) );
      t.throws( () => pdf(1, .5, 'test') );
      t.throws( () => pdf(1, -1, 2) );
      t.throws( () => pdf(1, 9, -1) );
      t.end();
    });

    t.test('generates accurate values', t => {
      t.equals( round(pdf(-1, 4, 1)), 0 );
      t.equals( round(pdf(0, 1, 5)), 5 );
      t.equals( round(pdf(0, 2, 5)), 0 );
      t.equals( round(pdf(1, 1, 5)), 0.0337 );
      t.equals( round(pdf(5, 4, 1)), 0.1404 );
      t.equals( round(pdf(5, 4, 1)), 0.1404 );
      t.equals( round(pdf(14, 3, .5)), 0.0112 );
      t.equals( round(pdf(2, 9, 2)), 0.0595 );
      t.end();
    });
  });

  t.test('distributions/gamma/cdf', t => {
    let cdf = Gamma.cdf;

    t.test('throws on bad params', t => {
      t.throws( () => cdf('test', .5, 1000) );
      t.throws( () => cdf(1, 'test', 1000) );
      t.throws( () => cdf(1, .5, 'test') );
      t.throws( () => cdf(1, -1, 2) );
      t.throws( () => cdf(1, 9, -1) );
      t.end()
    });

    t.test('generates accurate values', t => {
      t.equals( round(cdf(-1, 4, 1)), 0 );
      t.equals( round(cdf(5, 4, 1)), 0.7350 );
      t.equals( round(cdf(14, 3, .5)), 0.9704 );
      t.equals( round(cdf(2, 9, 2)), 0.0214 );
      t.end()
    });
  });

  t.test('distributions/gamma/class', t => {
    let Distribution = Gamma;

    t.test('throws on bad params', t => {
      // Args == undefined
      t.throws( () => new Distribution() );
      t.throws( () => new Distribution(.5) );
      // Args == zero
      t.throws( () => new Distribution(0, 1) );
      t.throws( () => new Distribution(1, 0) );
      // Args < 0
      t.throws( () => new Distribution(-2, 1) );
      t.throws( () => new Distribution(1, -2) );
      t.end();
    });

    t.test('generates a valid class', t => {
      let a = 10;
      let b = 2;
      let dist = new Distribution(a, b);
      t.equal( dist.a, a );
      t.equal( dist.b, b );
      t.equal( dist.mu, 5 );
      t.equal( dist.variance, 2.5 );
      t.ok( dist.random() );
      t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000), dist.mu );
      t.equal( round(dist.pdf(9)), 0.0167 );
      t.equal( round(dist.cdf(9)), 0.9846 );
      t.end();
    });
  });
});
