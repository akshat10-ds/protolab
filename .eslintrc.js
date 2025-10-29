module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Very minimal rules for now
  },
  ignorePatterns: ['build/', 'dist/', 'node_modules/', '*.config.ts', '*.config.js'],
};
