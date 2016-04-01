import test from 'blue-tape';

import std from './std';

let round = (x) => Math.round(x * 1000) / 1000;

test('utils/std', (t) => {
  t.test('can accurately generate a known value', (t) => {
    let data = [1,2,3,4,5,6,7,8,9,10];
    let answer = 2.872;
    t.equal( round(std(data)), answer )
    t.end()
  });

  t.test('deviation of an empty array is zero', (t) => {
    let data = [];
    let answer = 0;
    t.equal( round(std(data)), answer )
    t.end()
  });

  t.test('deviation of one number is zero', (t) => {
    let data = [420];
    let answer = 0;
    t.equal( round(std(data)), answer )
    t.end()
  });
});
