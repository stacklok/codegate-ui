import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { Mode, plugin as mdPlugin } from "vite-plugin-markdown";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    mdPlugin({
      mode: [Mode.MARKDOWN],
    }),
    react(),
  ],
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
