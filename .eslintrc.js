module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
  },
  parser: 'babel-eslint',
  // añade 'prettier' (y si quieres 'prettier/react') a las opciones de 'extends'
  // y por ultimo, en la llave de 'plugins' añade el plugin de eslint para prettier
  plugins: ['prettier'],
};
