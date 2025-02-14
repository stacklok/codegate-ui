/**
 * @type {import("lint-staged").Config}
 */
export default {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': [
    'npx prettier --write',
    'npx eslint --fix',
    'bash -c tsc -p ./tsconfig.app.json --noEmit',
  ],
}
