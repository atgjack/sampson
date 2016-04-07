import test from 'blue-tape';

import { Sample, ttest } from '../statistics';;

let round = (x) => Math.round(x * 1000) / 1000;

test('statistics/ttest', (t) => {
  let sample = new Sample([6,1,2,3,4,5]);
  let ssample = new Sample([3,4,5,4,6,1]);

  t.test('no-sample ttest return NaN', t => {
    t.ok( isNaN( ttest() ) );
    t.end();
  });

  t.test('one-sample ttest', t => {
    t.equal( round(ttest(sample, null, 0)), 4.583 );
    t.end()
  });

  t.test('two-sample ttest', t => {
    t.equal( round(ttest(sample, ssample)), -.321 );
    t.end()
  });

});
