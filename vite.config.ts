/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      reporter: ["text", "json"],
      provider: "v8",
    },
  },
});
