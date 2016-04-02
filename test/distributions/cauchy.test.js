import test from 'blue-tape';

import { Cauchy } from '../distributions';

// Test at http://keisan.casio.com/exec/system/1180573169

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/cauchy', (t) => {
  t.test('can generate a random value', (t) => {
    let random = Cauchy.random;

    // Make sure it throws on missing arg.
    t.throws( () => random() );

    // Make sure it throws outside bounds.
    t.throws( () => random(0) );
    t.throws( () => random(-1) );

    // Generate 10000 values and make sure they are within a few decimals of 0.
    let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(1) )
    let average = Math.round(values.reduce( (prev, next) => prev + next ) / (10000))
    t.ok( average >= -5 && average <= 5 );

    t.end();
  });

  t.test('can calculate pmf values', t => {
    let pdf = Cauchy.pdf;
    t.equals( round(pdf(0, 1)), 0.3183 );
    t.equals( round(pdf(2, 2)), 0.0796 );
    t.end();
  });

  t.test('validates and generates the class', t => {

    // Make sure it throws on missing args.
    t.throws( () => new Cauchy() )

    // Make sure it throws outside bounds.
    t.throws( () => new Cauchy(0) );
    t.throws( () => new Cauchy(-1) );

    let a = 1;
    let dist = new Cauchy(a);
    t.ok( isNaN(dist.mu) );
    t.ok( isNaN(dist.variance) );
    t.equal( dist.a, a);
    let rand = dist.random();
    t.ok( rand <= 5 || rand >= 5 );
    t.equal( round(dist.pdf(1)), 0.1592 );
    t.equal( round(dist.pdf(3)), 0.0318 );
    let aver = Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000);
    t.ok( aver <= 5 && aver >= -5 );
    t.end();
  })
});
