import test from 'blue-tape';

import { factorial } from '../utils';

test('utils/factorial', (t) => {
  t.test('can accuratly generate a known value', (t) => {
    let answer = 5 * 4 * 3 * 2;
    t.equal( factorial(5), answer );
    t.end();
  });

  t.test('the factorial of zero is one', (t) => {
    t.equal(factorial(0), 1);
    t.end();
  });

  t.test('the factorial of a negative is NaN', (t) => {
    t.ok( isNaN( factorial(-2) ) );
    t.end();
  });
});
