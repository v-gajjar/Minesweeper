// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist", "coverage"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,

  // App code (browser)
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    plugins: { react, prettier },
    rules: {
      // Downgrade React preset "error" rules to "warn"
      ...(() => {
        const base = react?.configs?.recommended?.rules ?? {};
        return Object.fromEntries(
          Object.entries(base).map(([rule, val]) => [
            rule,
            val === "error" ? "warn" : val,
          ])
        );
      })(),

      "prettier/prettier": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // This repo has short-circuit patterns. Allow them to avoid false flags.
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
    settings: { react: { version: "detect" } },
  },

  // Tests (Vitest globals)
  {
    files: ["tests/**/*.{js,jsx,ts,tsx}", "**/*.test.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.vitest },
    },
    plugins: { prettier },
    rules: { "prettier/prettier": "warn" },
  },

  // Config/tooling (Node env)
  {
    files: [
      "*.config.{js,cjs,mjs,ts}",
      "vite.config.*",
      "vitest.config.*",
      "scripts/**",
    ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
];
