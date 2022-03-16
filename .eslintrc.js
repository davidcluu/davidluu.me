module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react',
    'import',
  ],
  extends: [
    'airbnb-typescript',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
};
