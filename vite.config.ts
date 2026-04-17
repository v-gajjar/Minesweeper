import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: '/Minesweeper/',
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: (name: string) => name, // keeps the literal name, no hash
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@feature': fileURLToPath(
        new URL('./src/components/feature', import.meta.url)
      ),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@enum': fileURLToPath(new URL('./src/enum', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',

    // Co-located tests + legacy /tests folder
    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'tests/**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
  },
});
