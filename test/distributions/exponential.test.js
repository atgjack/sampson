import test from 'blue-tape';

import { Exponential } from '../distributions';

//Test at http://keisan.casio.com/exec/system/1180573224

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/exponential', (t) => {
  t.test('distributions/exponential/random', (t) => {
    let random = Exponential.random;

    t.test('throws on bad params', t => {
      t.throws( () => random() );
      t.throws( () => random(-1) );
      t.end()
    });

    t.test('generates values that average to the expected value', t => {
      let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(5) )
      let average = values.reduce( (prev, next) => prev + next ) / (10000)
      t.equal( Math.round(average), 5 );
      t.end();
    });
  });

  t.test('distributions/exponential/pdf', t => {
    let pdf = Exponential.pdf;

    t.test('throws on bad params', t => {
      t.throws( () => pdf('test', 2) );
      t.throws( () => pdf(1, 'test') );
      t.throws( () => pdf(1, -1) );
      t.end();
    });

    t.test('generates accurate values', t => {
      t.equals( round(pdf(-1, 4)), 0 );
      t.equals( round(pdf(5, 4)), 0.0716 );
      t.equals( round(pdf(14, 3)), 0.0031 );
      t.equals( round(pdf(2, 9)), 0.0890 );
      t.end();
    });
  });

  t.test('distributions/exponential/cdf', t => {
    let cdf = Exponential.cdf;

    t.test('throws on bad params', t => {
      t.throws( () => cdf('test', 2) );
      t.throws( () => cdf(1, 'test') );
      t.throws( () => cdf(1, -1) );
      t.end();
    });

    t.test('generates accurate values', t => {
      t.equals( round(cdf(-1, 4)), 0 );
      t.equals( round(cdf(5, 4)), 0.7135 );
      t.equals( round(cdf(14, 3)), 0.9906 );
      t.equals( round(cdf(2, 9)), 0.1993 );
      t.end();
    });
  });

  t.test('distributions/exponential/class', t => {
    let Distribution = Exponential;

    t.test('throws on bad params', t => {
      t.throws( () => new Distribution() );
      t.throws( () => new Distribution(-1) );
      t.end();
    });

    t.test('generates a valid class', t => {
      let mu = 10;
      let dist = new Distribution(mu);
      t.equal( dist.mu, mu );
      t.equal( dist.mean, mu );
      t.equal( dist.variance, 0.1 );
      t.ok( dist.random() );
      t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000), dist.mean );
      t.equal( round(dist.pdf(9)), 0.0407 );
      t.equal( round(dist.cdf(9)), 0.5934 );
      t.end();
    });
  });
});
