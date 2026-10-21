import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs, html, css}'],
    plugins: { js },
    extends: ['js/recommended', eslintConfigPrettier],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'warn',
    },
  },
]);
