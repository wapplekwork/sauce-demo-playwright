const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');

module.exports = [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        localStorage: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      'no-console': 'off', // Allow console.log in test files
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-console': 'off', // Allow console.log in src files
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'playwright-report/',
      'test-results/',
      'allure-results/',
      'allure-report/',
      'coverage/',
      '*.js',
    ],
  },
];
