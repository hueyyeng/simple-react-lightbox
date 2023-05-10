import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import gzipPlugin from 'rollup-plugin-gzip'
import image from '@rollup/plugin-image'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps'
import pkg from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.tsx',
  external: [/@babel\/runtime/, 'react', 'react-dom'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: process.env.NODE_ENV === 'production' ? false : true,
      exports: 'named' /** Disable warning for default imports */
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: process.env.NODE_ENV === 'production' ? false : true,
      exports: 'named' /** Disable warning for default imports */
    }
  ],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      customResolveOptions: 'src'
    }),
    external(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      inputSourceMap: true,
      presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
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
    typescript({
      tsconfig:
        process.env.NODE_ENV === 'production'
          ? './tsconfig.build.json'
          : './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      sourceMap: process.env.NODE_ENV === 'production' ? false : true
    }),
    process.env.NODE_ENV !== 'production' && sourcemaps(),
    commonjs({
      include: 'node_modules/**'
    }),
    url({
      limit: 0, // 0 => copy all files
      include: ['**/*.?(ttf|woff|woff2|png|jpg|svg|gif)']
    }),
    gzipPlugin(),
    image(),
    process.env.NODE_ENV === 'production' && terser(),
    nodePolyfills()
  ]
}
