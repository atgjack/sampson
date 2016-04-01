import test from 'blue-tape';

import lngamma from './lngamma';

test('utils/lngamma', (t) => {
  t.test('can accurately generate a known value for ln(n!)', (t) => {
    let data = 50;
    let answer = 144.5657439463449;
    t.equal( lngamma(data), answer )
    t.end()
  });

  t.test('if z is less than zero the result is NaN', t => {
    let data = -4;
    t.ok( isNaN(lngamma(data)) );
    t.end()
  });
});
