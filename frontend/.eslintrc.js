module.exports = {
    parser: '@javascript-eslint/parser',
    parserOptions: {
      project: 'jsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@javascript-eslint/eslint-plugin'],
    extends: [
      'plugin:@javascript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@javascript-eslint/interface-name-prefix': 'off',
      '@javascript-eslint/explicit-function-return-type': 'off',
      '@javascript-eslint/explicit-module-boundary-types': 'off',
      '@javascript-eslint/no-explicit-any': 'off',
    },
  };