import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    // Pure-logic unit tests only; exclude server modules that need Next runtime.
    include: ["lib/core/**/*.test.ts"],
  },
});
