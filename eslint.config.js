import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
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
        document: true,
        window: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        describe: true,
        it: true,
        expect: true,
      },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      // Downgrade react rules from "error" to "warn"
      ...Object.fromEntries(
        Object.entries(react.configs.recommended.rules).map(([rule, value]) => [
          rule,
          value === 'error' ? 'warn' : value,
        ])
      ),

      // ✅ Make Prettier violations show as warnings, not errors
      'prettier/prettier': 'warn',

      // Optional relaxations
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
      'react/prop-types': 'off', // If you're not using PropTypes
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];