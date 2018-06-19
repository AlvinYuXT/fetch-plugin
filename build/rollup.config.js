import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  external: [ 'whatwg-fetch' ],
  output: {
    name: "_fetch",
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    babel({
      include: 'src/**'
    }),
    uglify()
  ]
};