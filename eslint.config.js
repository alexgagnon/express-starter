import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.wireit', 'dist/', 'ecosystem.config.cjs']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.lint.json', // target the base config file, not the build one
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      semi: 'off',
      '@typescript-eslint/semi': 'error' // may need to turn off eslint rule and activate typescript-eslint rule
    }
  },
  prettierConfig
);
