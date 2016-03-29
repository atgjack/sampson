import test from 'blue-tape';

import variance from './variance';

let round = (x) => Math.round(x * 1000) / 1000;

test('utils/variance', (t) => {
  t.test('can accuratly generate a known value', (t) => {
    let data = [1,2,3,4,5,6,7,8,9,10];
    let answer = 8.25;
    t.equal(round(variance(data)), answer)
    t.end()
  });

  t.test('the variance of a single number is zero', (t) => {
    let data = [1];
    let answer = 0;
    t.equal(variance(data), answer);
    t.end();
  });

  t.test('the variance of the empty set is NaN', (t) => {
    t.ok( isNaN(variance( [] )) );
    t.end();
  });
});
