import js from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';

export default defineConfig([
  globalIgnores(['dist']),
  {
    name: 'js/recommended',
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...configs.react.recommended,
  plugins.typescriptEslint,
  ...configs.base.typescript,
  ...configs.react.typescript,
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  reactRefresh.configs.vite,
]);
