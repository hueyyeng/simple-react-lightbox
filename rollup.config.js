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
import nodePolyfills from 'rollup-plugin-node-polyfills'

export default {
  input: 'src/index.js',
  preferBuiltins: false,
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
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            spec: true,
            forceAllTransforms: true,
            debug: false,
            useBuiltIns: 'entry',
            corejs: 3
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true
          }
        ]
      ]
    }),
    nodeResolve({ preferBuiltins: true, customResolveOptions: 'src' }),
    commonjs({
      include: 'node_modules/**'
    }),
    gzipPlugin(),
    image(),
    terser(),
    nodePolyfills()
  ]
}
