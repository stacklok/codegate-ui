import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwindPlugin from "eslint-plugin-tailwindcss";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tailwindPlugin.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      tailwindcss: {
        callees: ["tv", "twMerge"],
        config: "./tailwind.config.ts",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "tailwindcss/enforces-negative-arbitrary-values": "error",
      "tailwindcss/enforces-shorthand": "error",
      "tailwindcss/classnames-order": "off", // handled by prettier
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-custom-classname": [
        "error",
        {
          callees: ["tv", "twMerge"],
          whitelist: [
            "theme\\-(minder|trusty)",
            "light",
            "dark",
            "scrollbar-thin",
            "font-default",
            "font-title",
            "font-code",
            "subhead-bold",
            "subhead-regular",
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              importNames: ["useMutation"],
              message: "Use the custom `useToastMutation` instead",
              name: "@tanstack/react-query",
            },
          ],
        },
      ],
    },
  },
);
