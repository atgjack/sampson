import test from 'blue-tape';

import { gamma } from '../utils';

// need round for large magnitude ;-;
let round = (x) => Math.round(x * 1000) / 1000;

test('utils/gamma', (t) => {
  t.test('is infinite at negative integers', (t) => {
    t.equal( round(gamma(-1)), Infinity );
    t.equal( round(gamma(-3)), Infinity );
    t.end();
  });

  t.test('can accurately generate a known value', (t) => {
    let data = .5;
    let answer = 1.772;
    t.equal( round(gamma(data)), answer );
    t.end();
  });

  t.test('can accurately generate a known value greater than one hundred', t => {
    let data = 101;
    let answer = 9.332621544394413e+157;
    t.equal( round(gamma(data)), answer );
    t.end();
  });

  t.test('can accurately generate a known value less than one half', t => {
    let data = .2;
    let answer = 4.591;
    t.equal( round(gamma(data)), answer );
    t.end();
  });
});
