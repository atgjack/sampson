import test from 'blue-tape';

import { Bernoulli } from '../distributions';

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/bernoulli', (t) => {
  t.test('can generate a random value', (t) => {
    let random = Bernoulli.random;

    // Make sure it throws on missing arg.
    t.throws( () => random() );

    // Make sure it throws outside bounds.
    t.throws( () => random(1.00000001) );
    t.throws( () => random(-.00000001) );

    // Make sure that at p=0, the result is always 0.
    let tries = Array.apply(null, Array(1000)).map( () => random(0) )
    let valid = tries.reduce( (p,n) => n == 0 && p, true )
    t.ok( valid );

    // Generate 10000 values and make sure they are within a few decimals of p.
    let smallValues = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(.4) )
    let smallAverage = smallValues.reduce( (prev, next) => prev + next ) / (10000 / 10)
    t.equal( Math.round(smallAverage), 4 );

    t.end();
  });

  t.test('can calculate pmf values', t => {
    let pdf = Bernoulli.pmf;
    t.equals( pdf(0, .25), .75 );
    t.equals( pdf(1, .25), .25 );
    t.equals( pdf(Math.random(), .25), 0 );
    t.end();
  });

  t.test('distributions/bernoulli/cdf', t => {
    let cdf = Bernoulli.cdf;

    t.test('throws on bad params', t => {
      t.throws( () => cdf(1, 1.5) );
      t.throws( () => cdf(1, -.5) );
      t.throws( () => cdf(1, 'test') );
      t.throws( () => cdf('test', .5) );
      t.end()
    });

    t.test('generates accurate values', t => {
      t.ok( isNaN(cdf(-1, .5)) );
      t.ok( isNaN(cdf(1001, .5)) );
      t.equal( cdf(0, .25), .75 );
      t.equal( cdf(1, .25), .25 );
      t.equal( round(cdf(0, .665)), .335 );
      t.end()
    });
  });
  t.test('validates and generates the class', t => {

    // Make sure it throws on missing args.
    t.throws( () => new Bernoulli() )

    // Make sure it throws outside bounds.
    t.throws( () => new Bernoulli(1.00000001) );
    t.throws( () => new Bernoulli(-.00000001) );

    let n = 1;
    let p = .5;
    let dist = new Bernoulli(p);
    t.equal( dist.mu, n * p );
    t.equal( dist.variance, n * p * (1 - p) );
    t.equal( dist.n, n);
    t.equal( dist.p, p);
    let rand = dist.random();
    t.ok( rand == 1 || rand == 0 );
    t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 100) / 10, dist.mu );
    t.equal( dist.pdf(1), p );
    t.equal( dist.pdf(0), 1 - p );
    t.equal( dist.pdf(1), p );
    t.equal( dist.cdf(0), 1 - p );
    t.end();
  })
});
