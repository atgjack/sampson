import test from 'blue-tape';

import { error } from '../utils';

// Test at http://keisan.casio.com/exec/system/1180573449

let round = (x) => Math.round(x * 1000000) / 1000000;

test('utils/error', (t) => {
  t.test('can accurately generate a known value', (t) => {
    t.equal( round(error(.35)), 0.379382 );
    t.equal( round(error(1.1)), 0.880205 );
    t.equal( round(error(.8888)), 0.791229 );
    t.end()
  });
});
