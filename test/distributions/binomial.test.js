import test from 'blue-tape';

import { Binomial } from '../distributions';

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/binomial', (t) => {
  t.test('can generate a random value', (t) => {
    let random = Binomial.random;

    // Make sure it throws on missing args.
    t.throws( () => random() );
    t.throws( () => random(.5) );

    // Make sure it throws outside bounds.
    t.throws( () => random(1.00000001, 5) );
    t.throws( () => random(-.00000001, 5) );

    // Make sure that even at p=0, when n=0 the result is always 0.
    t.equal( random(1, 0), 0 );

    // Generate 10000 values and make sure they are within a few decimals of p * n. ( Small n + p.)
    let smallValues = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(.25, 10) )
    let smallAverage = smallValues.reduce( (prev, next) => prev + next ) / (10000 / 10)
    t.equal( Math.round(smallAverage), 25 );

    // Generate 10000 values and make sure they are within a few decimals of p * n. ( Large n + p.)
    let largeValues = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(.75, 100 * 10000) )
    let largeAverage = largeValues.reduce( (prev, next) => prev + next ) / (10000 * 10000)
    t.equal( Math.round(largeAverage), 75 );
    t.end();
  });

  t.test('can calculate pmf values', t => {
    let pdf = Binomial.pmf;
    t.equals( round(pdf(0, .25, 1000)), 0 );
    t.equals( pdf(-10, .25, 1000), 0 );
    t.equals( pdf(1001, .25, 1000), 0 );
    t.equals( pdf(0, 0, 1000), 1 );
    t.equals( pdf(100, 0, 1000), 0 );
    t.equals( pdf(1000, 1, 1000), 1 );
    t.equals( pdf(999, 1, 1000), 0 );
    t.equals( pdf(1000, 0, 1000), 0 );
    t.equals( pdf(1000, .4, 100000), 0 );
    t.equals( pdf(140, .01, 10000), Infinity );
    t.equals( round(pdf(250, .25, 1000)), 0.0291 );
    t.equals( round(pdf(300, 0.6, 500)), 0.0364 );
    t.end();
  });

  t.test('validates and generates the class', t => {

    // Make sure it throws on missing args.
    t.throws( () => new Binomial() )
    t.throws( () => new Binomial(.5) )

    // Make sure it throws outside bounds.
    t.throws( () => new Binomial(1.00000001, 5) );
    t.throws( () => new Binomial(-.00000001, 5) );

    let n = 10;
    let p = .5;
    let dist = new Binomial(p, n);
    t.equal( dist.mu, 5 );
    t.equal( dist.variance, 2.5 );
    t.equal( dist.n, n);
    t.equal( dist.p, p);
    t.ok( dist.random() <= dist.n );
    t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000), dist.mu );
    t.equal( round(dist.pdf(2)), 0.0439 );
    t.end();
  })
});
