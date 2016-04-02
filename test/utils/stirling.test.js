import test from 'blue-tape';

import { stirling } from '../utils';

test('utils/stirling', (t) => {
  t.test('can accurately generate a known value for ln(n!)', (t) => {
    let data = 50;
    let answer = 148.47610030732605;
    t.equal( stirling(data), answer )
    t.end()
  });
});
