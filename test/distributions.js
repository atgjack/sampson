import test from 'blue-tape';
import Distribution from '../lib/distributions/distribution'

export * from '../lib/distributions';
export { Distribution };

const DIST_OVERRIDE = 'mean variance skewness kurtosis random pdf cdf validate'.split(' ');
const DIST_PROPS = 'mean variance stdDev relStdDev skewness kurtosis'.split(' ');
const DIST_METHODS = 'random pdf cdf'.split(' ');
const DIST_PRIVATE = 'validate'.split(' ');

export function round(x) { return Math.round(x * 10000000) / 10000000; }

// Takes the form :: string :: distribution :: object :: object :: function
// Answers are [[params, { [prop]: number, [pdf|cdf]: [{in, out}] }]]
export function testDistribution(name, distribution, validParams, answers, edgecases) {
  test(`distributions/${name}`, (t) => {
    t.test( '- implements interface', t => {
      t.ok( Distribution.isPrototypeOf(distribution), 'is an prototype of Distribution' );

      DIST_OVERRIDE.forEach( prop => {
        t.notEqual( Distribution[prop], distribution[prop], `overrides ${prop}` );
      });

      t.throws( () => new distribution(), 'throws on no params object' );
      t.throws( () => new distribution('test'), 'throws on typeof(params) is not object' );

      t.throws( () => distribution.pdf('test', validParams), 'throws on bad pdf param');
      t.throws( () => distribution.cdf('test', validParams), 'throws on bad cdf param');

      let rand;
      t.doesNotThrow( () => rand = distribution.random(validParams), 'can generate a random variable' )
      t.ok( typeof rand  == 'number', 'random variable is a number' );
      t.notOk( isNaN(rand), 'random variable is not NaN' );

      t.end();
    });

    if (answers && answers.length > 0) t.test( '- generates answers', t => {
      answers.forEach( ({ params, answer }) => {
        let dist;
        t.doesNotThrow( () => dist = new distribution(params), "doesn't throw with test params" );
        t.ok( dist instanceof distribution, 'generates an instance' );
        DIST_METHODS.forEach( method => {
          // skip random
          if (method == 'random') return;
          answer[method].forEach( ({ input, output}) => {
            if (isNaN(output)) {
              t.ok( isNaN(dist[method]( input )), `generates accurate method value - ${method}` )
            } else {
              t.equal( round(dist[method]( input )), round(output), `generates accurate method value - ${method}` );
            }
          });
        });
        DIST_PROPS.forEach( prop => {
          if (isNaN(answer[prop])) {
            t.ok( isNaN(dist[prop]),  `has accurate prop value - ${prop} ` );
          } else {
            t.equal( round(dist[prop]), round(answer[prop]), `has accurate prop value - ${prop} ` );
          }
        });
        t.ok( typeof dist.random() == 'number', 'can generate a random value' );
        t.equal( dist.sample(100).map( n => typeof n == 'number' && !isNaN(n) ).length, 100, 'can generate sample values');
      });
      t.end();
    });

    if (edgecases) t.test('- satisfies edgecases', edgecases);

    t.end();
  });
}
