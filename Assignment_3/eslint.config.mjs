import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      camelcase: 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-console': 'error',
      'no-duplicate-imports': 'error',
    },
  },
  {
    ignores: ['.node_modules/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
