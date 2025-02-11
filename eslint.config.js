import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwindPlugin from "eslint-plugin-tailwindcss";

const restrictedSyntax = {
  reactQuery: {
    useQuery: (v) =>
      `CallExpression[callee.name='useQuery'] > ObjectExpression:first-child > Property[key.name='${v}']`,
    useQueries: (v) =>
      `CallExpression[callee.name='useQueries'] > ObjectExpression:first-child > Property[key.name='queries'] > ArrayExpression > ObjectExpression > Property[key.name='${v}']`,
  },
};

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
      "no-restricted-syntax": [
        "error",
        {
          selector: [
            restrictedSyntax.reactQuery.useQuery("staleTime"),
            restrictedSyntax.reactQuery.useQuery("gcTime"),
            restrictedSyntax.reactQuery.useQueries("staleTime"),
            restrictedSyntax.reactQuery.useQueries("gcTime"),
          ].join(", "),
          message:
            "`staleTime` & `gcTime` should be managed via the `getQueryCacheConfig` util instead.",
        },
        {
          selector: [
            restrictedSyntax.reactQuery.useQuery("queryKey"),
            restrictedSyntax.reactQuery.useQuery("queryFn"),
            restrictedSyntax.reactQuery.useQueries("queryKey"),
            restrictedSyntax.reactQuery.useQueries("queryFn"),
          ].join(", "),
          message:
            "'queryKey' & 'queryFn' should be managed by openapi-ts react-query integration instead. This allows standardized management of query keys & cache invalidation.",
        },
        {
          selector: [
            restrictedSyntax.reactQuery.useQuery("refetchOnMount"),
            restrictedSyntax.reactQuery.useQuery("refetchOnReconnect"),
            restrictedSyntax.reactQuery.useQuery("refetchOnWindowFocus"),
            restrictedSyntax.reactQuery.useQueries("refetchOnMount"),
            restrictedSyntax.reactQuery.useQueries("refetchOnReconnect"),
            restrictedSyntax.reactQuery.useQueries("refetchOnWindowFocus"),
          ].join(", "),
          message:
            "`refetchOnMount`, `refetchOnReconnect` & `refetchOnWindowFocus` should be managed centrally in the react-query provider",
        },
        {
          selector:
            "CallExpression > MemberExpression[property.name='invalidateQueries']",
          message:
            "Do not directly call `invalidateQueries`. Instead, use the `invalidateQueries` helper function.",
        },
        {
          selector: [
            "CallExpression[callee.object.name='http'][callee.property.name='all'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='head'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='get'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='post'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='put'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='delete'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='patch'] > Literal:first-child",
            "CallExpression[callee.object.name='http'][callee.property.name='options'] > Literal:first-child",
          ].join(", "),
          message:
            "Do not pass a string as the first argument to methods on Mock Service Worker's `http`. Use the `mswEndpoint` helper function instead, which provides type-safe routes based on the OpenAPI spec and the API base URL.",
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
