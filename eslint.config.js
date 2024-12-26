// module.exports = {
//     env: {
//       browser: true, 
//       node: true, 
//       es2021: true 
//     },
//     extends: 'eslint:recommended' // Extends ESLint's recommended rules
//   };

  module.exports = {
    languageOptions: {
      globals: {
        window: 'readonly', 
        document: 'readonly', 
        navigator: 'readonly', 
        global: 'readonly', 
        __dirname: 'readonly', 
        __filename: 'readonly' 
      }
    },
    // extends: 'eslint:recommended' // Extends ESLint's recommended rules
  };