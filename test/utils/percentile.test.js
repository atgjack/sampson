import test from 'blue-tape';

import { percentile } from '../utils';

test('utils/percentile', t => {
  t.test('throws without a list or percentile', t => {
    t.throws( () => percentile(undefined, .5) );
    t.throws( () => percentile([1,2,3,4,5], undefined) );
    t.end()
  })

  t.test('percentileing the empty set is NaN', t => {
    t.ok( isNaN(percentile([], .6)) );
    t.end();
  });

  t.test('percentileing a single item set is that item', t => {
    t.equal( percentile([1], .4), 1);
    t.equal( percentile([1], .1), 1);
    t.equal( percentile([1], .99), 1);
    t.end();
  });

  t.test('can generate a proper percentile', t => {
    t.equal( percentile([1,2,3,4,5], .1), 1);
    t.equal( percentile([1,2,3,4,5], .2), 2);
    t.equal( percentile([1,2,3,4,5], .5), 3);
    t.equal( percentile([1,2,3,4,5], .8), 5);
    t.equal( percentile([1,2,3,4,5], 1), 5);
    t.end()
  })
});
