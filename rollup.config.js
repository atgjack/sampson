import babel from 'rollup-plugin-babel';

export default {
  entry: 'lib/main.js',
  format: 'cjs',
  plugins: [ babel() ],
  dest: 'lib.js'
};
