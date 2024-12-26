module.exports = {
    env: {
      node: true, 
      commonjs: true, 
      es2021: true, 
    },
    extends: 'eslint:recommended', 
    parserOptions: {
      ecmaVersion: 'latest', 
    },
    rules: {
      'indent': ['error', 2], // Enforce 2 spaces for indentation
    },
  };