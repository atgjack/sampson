import test from 'blue-tape';

import { range } from '../utils';

test('utils/range', (t) => {
  t.equal( range([0,1,2,3,4,5,6,7,8,9,10]), 10 );
  t.end();
});
