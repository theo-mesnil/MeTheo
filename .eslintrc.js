module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'sort-destructure-keys'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': 'warn',
    'comma-dangle': ['error', 'never'],
    'import/no-default-export': ['off'],
    'import/order': ['warn', { 'newlines-between': 'always' }],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      'warn',
      { caseSensitive: false }
    ]
  }
};
