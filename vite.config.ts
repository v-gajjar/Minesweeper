import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/Minesweeper/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@feature': path.resolve(__dirname, './src/components/feature'),
      '@config': path.resolve(__dirname, './src/config'),
      '@enum': path.resolve(__dirname, './src/enum'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
});
