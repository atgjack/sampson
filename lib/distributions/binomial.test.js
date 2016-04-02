import test from 'blue-tape';

import Binomial from './binomial';

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
});
