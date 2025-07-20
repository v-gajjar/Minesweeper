import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from 'globals';
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default [
  js.configs.recommended,
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
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
          value === "error" ? "warn" : value,
        ])
      ),

      // ✅ Make Prettier violations show as warnings, not errors
      "prettier/prettier": "warn",

      // Optional relaxations
      "react/react-in-jsx-scope": "off", // Not needed for React 17+
      "react/prop-types": "off", // If you're not using PropTypes
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
