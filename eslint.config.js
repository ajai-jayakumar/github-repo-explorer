import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginQuery.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          // Define groups for sorting imports
          groups: [
            // Group 1: React and other third-party libraries
            ['^react', '^@?\\w'],
            // Group 2: Internal imports from specific directories (e.g., @, components)
            ['^(@|components)(/.*|$)'],
            // Group 3: Side-effect imports (e.g., CSS files)
            ['^\\u0000'],
            // Group 4: Parent imports (up one or two levels)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Group 5: Same-folder imports (relative imports with subfolders)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Group 6: Style imports (e.g., CSS files)
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  prettier
);
