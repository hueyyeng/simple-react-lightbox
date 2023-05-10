module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'react', 'react-hooks'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$']
            ]
          }
        ]
      }
    }
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'space-before-function-paren': 0,
    'react/jsx-boolean-value': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  }
}
