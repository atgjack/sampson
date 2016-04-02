import test from 'blue-tape';

import { median } from '../utils';

test('utils/median', (t) => {
  t.test('median of the empty set is NaN', (t) => {
    t.ok( isNaN( median([]) ) );
    t.end();
  });

  t.test('works for even-lengthed lists', t => {
    t.equal( median([0,1,2,3,4,5]), (2 + 3) / 2 );
    t.end();
  });

  t.test('works for odd-lengthed lists', t => {
    t.equal( median([0,1,2,3,4]), 2 );
    t.end();
  });
});
