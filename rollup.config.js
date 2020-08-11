import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import gzipPlugin from 'rollup-plugin-gzip'
import image from 'rollup-plugin-image'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: false
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: false
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url({
      limit: 0, // 0 => copy all files
      include: ['**/*.?(ttf|woff|woff2|png|jpg|svg|gif)']
    }),
    svgr(),
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve({ preferBuiltins: true, customResolveOptions: 'src' }),
    commonjs({
      include: 'node_modules/**'
    }),
    gzipPlugin(),
    image(),
    terser()
  ]
}
