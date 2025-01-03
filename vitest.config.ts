/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    // setupFiles: "setupTests.ts",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
    css: false,
    coverage: {
      include: ["src/**/*.{js,jsx}", "src/**/*.{ts,tsx}"],
      exclude: [
        "coverage/**",
        "dist/**",
        "**/[.]**",
        "**/*.d.ts",
        "**/virtual:*",
        "**/__x00__*",
        "**/\x00*",
        "public/**",
        "test?(s)/**",
        "test?(-*).?(c|m)[jt]s?(x)",
        "**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)",
        "**/__tests__/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        "**/vitest.{workspace,projects}.[jt]s?(on)",
        "**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
        "src/**/*stories.tsx",
        "src/types/**/*.{ts,tsx}",
      ],
      thresholds: {
        branches: 42.63,
        functions: 51.48,
        lines: 56.17,
        statements: 55.21,
      },
      enabled: false,
      provider: "istanbul",
      reporter: ["text", "json", "html", "json-summary", "lcov"],
    },
  },
});
