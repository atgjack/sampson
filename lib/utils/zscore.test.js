import test from 'blue-tape';

import zScore from './zscore';

test('utils/zscore', (t) => {
  t.equal( zScore(10, 20, 2), -5 )
  t.equal( zScore(250, 350, 10), -10)
  t.equal( zScore( .85, 0, .05), 17)
  t.end()
});
