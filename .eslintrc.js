// See https://eslint.org/docs/user-guide/configuring
// See https://prettier.io/docs/en/integrating-with-linters.html

module.exports = {
  'extends': [
    'airbnb',
    'plugin:prettier/recommended',
  ],
  'plugins': [
    'react-hooks',
    'relay',
  ],
  'parser': 'babel-eslint',
  'rules': {
    'max-len': 0,
    // Until import plugin supports webpack 2+ resolveModules
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    // react-hooks
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
  },
  'env': {
    'node': true,
    'browser': true,
  },
};
