import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Base configuration for all files
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },

  // ESLint recommended rules
  js.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,

  // JavaScript/TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'prettier': prettier,
    },
    rules: {
      // TypeScript rules overrides
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // React rules
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Prettier rules
      'prettier/prettier': 'error',

      // Disable rules that conflict with Prettier
      ...prettierConfig.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

