import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/main.tsx"],
  ignore: ["src/api/generated/**/*"],
  ignoreDependencies: ["husky"],
  project: ["src/**/*.{js,jsx,ts,tsx}"],
};

export default config;
