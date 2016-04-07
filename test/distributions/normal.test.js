import test from 'blue-tape';

import { Normal } from '../distributions';

//Test at http://onlinestatbook.com/2/calculators/normal_dist.html

let round = (x) => Math.round(x * 10000) / 10000;

test('distributions/normal', (t) => {
  t.test('distributions/normal/random', (t) => {
    let random = Normal.random;

    t.test('throws on bad params', t => {
      t.throws( () => random() );
      t.throws( () => random(.5) );
      t.end()
    });

    t.test('generates accurate values for sigma equal zero', t => {
      t.equal( random(0, 0), 0 );
      t.equal( random(10, 0), 10 );
      t.equal( random(100, 0), 100 );
      t.end()
    });

    t.test('generates values that average to the supplied mu', t => {
      let values = Array.apply(null, Array(10000)).map( (_,i) => i ).map( i => random(100, 5) )
      let average = values.reduce( (prev, next) => prev + next ) / (10000)
      t.equal( Math.round(average), 100 );
      t.end();
    });
  });

  t.test('distributions/normal/pdf', t => {
    let pdf = Normal.pdf;

    t.test('throws on bad params', t => {
      t.throws( () => pdf('test', .5, 1000) );
      t.throws( () => pdf(1, 'test', 1000) );
      t.throws( () => pdf(1, .5, 'test') );
      t.end();
    });

    t.test('generates accurate values', t => {
      t.equals( round(pdf(93, 100, 5)), 0.0299 );
      t.equals( round(pdf(109, 100, 5)), 0.0158 );
      t.equals( round(pdf(-445, -480, 25)), 0.0060 );
      t.equals( round(pdf(-490, -480, 25)), 0.0147 );
      t.equals( round(pdf(387, 420, 24)), 0.0065 );
      t.equals( round(pdf(454, 420, 24)), 0.0061 );
      t.end();
    });
  });

  t.test('distributions/normal/cdf', t => {
    let cdf = Normal.cdf;

    t.test('throws on bad params', t => {
      t.throws( () => cdf(1, 'test', 1000) );
      t.throws( () => cdf(1, .5, 'test') );
      t.throws( () => cdf('test', .5, 1000) );
      t.end()
    });

    t.test('generates accurate values', t => {
      t.equals( round(cdf(93, 100, 5)), 0.0808  );
      t.equals( round(cdf(109, 100, 5)), 0.9641 );
      t.equals( round(cdf(-445, -480, 25)), 0.9192 );
      t.equals( round(cdf(-490, -480, 25)), 0.3446 );
      t.equals( round(cdf(387, 420, 24)), 0.0846 );
      t.equals( round(cdf(454, 420, 24)), 0.9217 );
      t.end()
    });
  });

  t.test('distributions/normal/class', t => {
    let Distribution = Normal;

    t.test('throws on bad params', t => {
      t.throws( () => new Distribution() )
      t.throws( () => new Distribution(.5) )
      t.end();
    });

    t.test('generates a valid class', t => {
      let mu = 10;
      let sigma = .5;
      let dist = new Distribution(mu, sigma);
      t.equal( dist.mu, mu );
      t.equal( dist.variance, .25 );
      t.equal( dist.sigma, sigma);
      t.ok( dist.random() );
      t.equal( Math.round(dist.sample(1000).reduce( (p,n) => p+n ) / 1000), dist.mu );
      t.equal( round(dist.pdf(9)), 0.1080 );
      t.equal( round(dist.cdf(9)), 0.0228 );
      t.end();
    });
  });
});
