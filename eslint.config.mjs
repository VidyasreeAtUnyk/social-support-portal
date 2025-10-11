import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    rules: {
      // 🔹 JSDoc
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',

      // 🔹 Tailwind
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-contradicting-classname': 'warn',

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
];

export default eslintConfig;
