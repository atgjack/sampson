import test from 'blue-tape';

import { mode } from '../utils';

test('utils/mode', (t) => {
  t.test('mode of the empty set is NaN', t=> {
    t.ok( isNaN(mode([])) );
    t.end();
  });
  t.test('mode of a single item set is that item', t=> {
    t.deepEqual( mode([1]), [1] )
    t.end();
  });
  t.test('mode of a simple set is calculated correctly', t => {
    let set = Array.apply(null, Array(1000)).map( (_, i) => (i % 3) ? 420 : i );
    t.deepEqual(mode(set), [420]);
    t.end();
  });
  t.test('mode of a set can return multiple values', t => {
    let set = Array.apply(null, Array(1000)).map( (_, i) => (i % 10) / (i % 5) );
    t.deepEqual(mode(set), [1]);
    t.end();
  });
});
