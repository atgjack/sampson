import test from 'blue-tape';

import select from './select';

test('utils/select', (t) => {
  t.test('can accurately generate a known value', (t) => {
    let data = [NaN,0,1,-1,-2,2,9,10,-3,3,7,8,-4,-5,1,4,5,6,NaN];
    let index = 6;
    let answer = 0;
    t.equal( select(data, index, 1, 16), answer )
    t.end()
  });

  t.test('selecting from a single number array yeilds that number', (t) => {
    let data = [420];
    let answer = 420;
    t.equal( select(data, 0), answer );
    t.end();
  });

  t.test('selecting from the empty set yeilds NaN', (t) => {
    let data = [];
    let index = 5;
    t.ok( isNaN(select(data, index)) )
    t.end()
  });

  t.test('can select from a large array', (t) => {
    let size = 1000;
    let index = 420;
    let data = Array.apply(null, Array(size)).map( (_,i) => size - (i + 1) );
    let answer = data[index];
    t.equal( select(data, index), index )
    t.end()
  });
});
