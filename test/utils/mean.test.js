import test from 'blue-tape';

import { mean } from '../utils';

test('utils/mean', (t) => {
  t.test('can accurately generate a known value', (t) => {
    let data = [1,2,3,4,5,6,7,8,9,10];
    let answer = (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10) / 10;
    t.equal( mean(data), answer )
    t.end()
  });

  t.test('the mean of a single number is that number', (t) => {
    let answer = 420;
    let data = [420];
    t.equal( mean(data), answer );
    t.end();
  });

  t.test('the mean of the empty set is NaN', (t) => {
    t.ok( isNaN(mean([])) );
    t.end();
  });
});
