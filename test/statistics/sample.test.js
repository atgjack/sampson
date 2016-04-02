import test from 'blue-tape';

import { Sample } from '../statistics';

// Test at http://www.calculatorsoup.com/calculators/statistics/descriptivestatistics.php

let round = (x) => Math.round(x * 1000) / 1000;

test('statistics/sample', (t) => {

  t.test('validates length', t => {
    t.throws( () => new Sample([]) );
    t.end();
  });

  t.test('validates methods', t => {
      t.ok( isNaN(Sample.variance([])) );
      t.equal( Sample.stdDev([]), 0 );
      t.ok( isNaN(Sample.skewness([0,1])) );
      t.ok( isNaN(Sample.kurtosis([0,1])) );
      t.end();
    });

  let data = [0,1,2,3,4,5,6,7,8,9,10];
  let sample = new Sample(data);

  t.test('can accuratly calculate known values', (t) => {
    t.equal( sample.data, data );
    t.equal( sample.size, data.length );
    t.equal( sample.mean, 5 );
    t.equal( round(sample.std), 3.317 );
    t.equal( sample.variance, 11 );
    t.equal( sample.skewness, 0 );
    t.equal( round(sample.kurtosis), 0.162);
    t.deepEqual( sample.quartiles, [2,5,8]);
    t.equal( round(sample.meanDev), 2.727);
    t.equal( sample.sqrdMeanDev, 110);
    t.equal( round(sample.rootMeanSqrd), 5.916 )
    t.equal( round(sample.relStdDev), 0.663 )

    t.end();
  });

  let ddata = data.map( n => n * 4 );
  let eddata = ddata.concat([420]);
  let ssample = new Sample(ddata);
  let essample = new Sample(eddata);

  t.test('can calculate covariance', t => {
    t.equal( sample.covariance(ssample), 44 );
    t.ok( isNaN(sample.covariance(essample)) );
    t.end();
  });

  t.test('can calculate correlation', t => {
    t.equal( sample.correlation(ssample), 1 );
    t.ok( isNaN(sample.correlation()) );
    t.end();
  });
});
