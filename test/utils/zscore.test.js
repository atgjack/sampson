import test from 'blue-tape';

import { zscore } from '../utils';

test('utils/zscore', (t) => {
  t.equal( zscore(10, 20, 2), -5 )
  t.equal( zscore(250, 350, 10), -10)
  t.equal( zscore( .85, 0, .05), 17)
  t.end()
});
