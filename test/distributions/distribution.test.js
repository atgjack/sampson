import test from 'blue-tape';
import { Distribution } from '../distributions';

test.test('-- distribution/base --', (t) => {
  t.notOk( !!Distribution.mean(), 'the mean is undefined' );
  t.notOk( !!Distribution.variance(), 'the variance is undefined' );
  t.notOk( !!Distribution.stdDev(), 'the standard deviation is undefined' );
  t.notOk( !!Distribution.relStdDev(), 'the relative standard deviation is undefined' );
  t.notOk( !!Distribution.skewness(), 'the skewness is undefined' );
  t.notOk( !!Distribution.kurtosis(), 'the kurtosis is undefined' );
  t.notOk( !!Distribution.pdf(), 'the pdf is undefined' );
  t.notOk( !!Distribution.cdf(), 'the cdf is undefined' );
  t.throws( () => Distribution.valitate({}), 'empty validator throws' )
  t.throws( () => new Distribution({}), 'new class throws' )
  t.end()
})
