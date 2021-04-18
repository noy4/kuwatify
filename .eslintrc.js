module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
}
