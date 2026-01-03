// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/max-len': ['error', { code: 150 }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-multi-spaces': ['error'],
    },
  },
  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      // Customize Playwright rules
      // ...
    },
  },
  {
    files: ['**/*.setup.ts'],
    rules: {
      'playwright/no-standalone-expect': 'off',
      'playwright/expect-expect': 'off',
    },
  }
);
