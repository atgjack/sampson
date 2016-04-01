import test from 'blue-tape';

import choose from './choose';

test('utils/choose', (t) => {
  t.test('can accuratly generate a known values', (t) => {
    t.equal( choose(4,2), 6 );
    t.equal( choose(10,3), 120 );
      t.equal( choose(50,20), 47129212243960 );
    t.end();
  });

  t.test('if k > n the result is NaN', (t) => {
    t.ok( isNaN(choose(5, 15)) );
    t.end();
  });
});
