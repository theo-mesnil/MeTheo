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
    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        pathGroups: [
          { pattern: 'api/**', group: 'internal' },
          { pattern: 'components/**', group: 'internal' },
          { pattern: 'contexts/**', group: 'internal' },
          { pattern: 'navigation', group: 'internal' },
          { pattern: 'screens/**', group: 'internal' },
          { pattern: 'themes/**', group: 'internal' },
          { pattern: 'utils/**', group: 'internal' }
        ],
        pathGroupsExcludedImportTypes: ['react']
      }
    ],
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
  },
  settings: {
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src']
    }
  }
};
