import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "src/api/openapi.json",
  output: {
    format: "prettier",
    path: "./src/api/generated",
    lint: "eslint",
  },
  plugins: [
    "@hey-api/sdk",
    "@tanstack/react-query",
    {
      enums: "typescript",
      name: "@hey-api/typescript",
    },
  ],
});
