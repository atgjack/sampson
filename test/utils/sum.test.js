import test from 'blue-tape';

import { sum } from '../utils';

test('utils/sum', (t) => {
  t.test('can accurately generate a known value', (t) => {
    let data = [1,2,3,4,5,6,7,8,9,10];
    let answer = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10;;
    t.equal(sum(data), answer)
    t.end()
  });

  t.test('the sum of a single number is that number', (t) => {
    let answer = 420;
    let data = [420];
    t.equal( sum(data), answer );
    t.end();
  });

  t.test('can accurately handle floating point error correction', (t) => {
    let data = [.1,.2,.3,.4,.5,.6,.7,.8,.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0];
    let wrong = data.reduce( (p,n) => p + n);
    let answer = 21;
    let testVal = sum(data);
    t.equal( testVal, answer );
    t.notEqual( testVal, wrong );
    t.end()
  });

  t.test('the sum of the empty set is zero', (t) => {
    t.equal( sum([]), 0 );
    t.end();
  });
});
