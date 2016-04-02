import test from 'blue-tape';

import { quantile } from '../utils';

test('utils/quantile', t => {
  let list = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
  let oddList = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];

  t.test('throws on bad arguments', t => {
    t.throws( () => quantile() );
    t.throws( () => quantile([]) );
    t.throws( () => quantile(list, -.1) );
    t.throws( () => quantile(list, .1, .2, .3, 1.1) );
    t.end();
  });

  t.test('can generate a single quantile from even list', t => {
    t.equal( quantile(list, .25), 7 );
    t.equal( quantile(list, .5), 9 );
    t.equal( quantile(list, .75), 15 );
    t.end();
  });

  t.test('can generate a single quantile from odd list', t => {
    t.equal( quantile(oddList, .25), 7 );
    t.equal( quantile(oddList, .5), 9 );
    t.equal( quantile(oddList, .75), 15 );
    t.equal( quantile([1,2,3,4,5], .2), 2 );
    t.end();
  });

  t.test('can generate a multiple quantiles', t => {
    t.deepEqual( quantile(list, .25, .5, .75), [7, 9, 15] );
    t.deepEqual( quantile(oddList, .25, .5, .75), [7, 9, 15] );
    t.end();
  });

  t.test('can generate max and min quantiles', t => {
    t.equal( quantile(list, 0), list[0] );
    t.equal( quantile(list, 1), list[list.length - 1] );
    t.end();
  });

});
