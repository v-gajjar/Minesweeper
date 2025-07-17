import tseslint from 'typescript-eslint';

export default [
  // other configs...

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // ✅ explicitly define path
        tsconfigRootDir: new URL('.', import.meta.url).pathname // 👈 fix root
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      // rules here
    }
  }
];
