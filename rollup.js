var rollup =  require('rollup');
var babel  = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var minify = require('uglify-js').minify;

rollup.rollup({
  entry: 'lib/main.js',
  plugins: [ babel() ],
}).then( function(bundle) {
  bundle.write({
    format: 'es6',
    dest: 'dist/lib.es6.js'
  });
  bundle.write({
    format: 'umd',
    moduleName: 'sampson',
    dest: 'dist/lib.js'
  });
}).catch( function(err) { console.log(err) });

rollup.rollup({
  entry: 'lib/main.js',
  plugins: [ babel(), uglify() ],
}).then( function(bundle) {
  bundle.write({
    format: 'umd',
    moduleName: 'sampson',
    dest: 'dist/lib.min.js'
  });
}).catch( function(err) { console.log(err) });
