import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Minesweeper/",
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
});
