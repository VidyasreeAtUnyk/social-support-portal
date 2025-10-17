import { FlatCompat } from '@eslint/eslintrc';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierPlugin from 'eslint-plugin-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Top-level ignores for generated/build artifacts
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/coverage/**',
      '**/coverage-final.json',
      '**/lcov-report/**',
      'next-env.d.ts',
      '**/public/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      jsdoc: jsdocPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // 🔹 JSDoc
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',

      // 🔹 Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],
    },
  },
  // Disable linting for generated Next types entirely
  {
    files: ['.next/**/*.ts'],
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  // Relax strict any usage in our test and mock files
  {
    files: ['**/__tests__/**', '**/mock*.ts', '**/mock*/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
