import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import path from "path";
import fs from "fs";

const FEATURES_DIR = "./src/features";

/**
 * Traverse the features directory and return an array of restricted paths for
 * use in the `import/no-restricted-paths` rule.
 *
 * @example
 * ```js
 *  [
 *   {
 *     except: [ './dependencies' ],
 *     from: './src/features',
 *     target: './src/features/dependencies'
 *   },
 *   {
 *     except: [ './versions' ],
 *     from: './src/features',
 *     target: './src/features/versions'
 *   },
 *   {
 *     except: [ './vulnerabilities' ],
 *     from: './src/features',
 *     target: './src/features/vulnerabilities'
 *   }
 * ]
 * ```
 */
const getRestrictedPathsForFeatureDir = () => {
  const featureDirPath = path.resolve(FEATURES_DIR);
  /**
   * @type {Array<{except: `./${string}`[], from: './src/features', target: string}>}
   */
  const restrictedPaths = [];

  try {
    const featureDirs = fs.readdirSync(featureDirPath);

    featureDirs.forEach((featureDir) => {
      const subPath = path.join(featureDirPath, featureDir);
      if (fs.lstatSync(subPath).isDirectory()) {
        restrictedPaths.push({
          except: [`./${featureDir}`],
          from: FEATURES_DIR,
          target: path.join(FEATURES_DIR, featureDir),
        });
      }
    });
  } catch (error) {
    console.error("Error reading features directory:", error);
  }

  return restrictedPaths;
};

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
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },

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
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/dashboard-alerts should not import from src/features/dashboard-messages, etc.
            ...getRestrictedPathsForFeatureDir(),

            // enforce unidirectional codebase:
            // e.g. src/routes can import from src/features but not the other way around
            {
              from: "./src/routes",
              target: "./src/features",
            },

            // enforce unidirectional codebase:
            // e.g src/features and src/routes can import from these shared modules but not the other way around
            {
              from: ["./src/features", "./src/routes"],
              target: [
                "./src/components",
                "./src/constants",
                "./src/hooks",
                "./src/i18n",
                "./src/lib",
                "./src/mocks",
                "./src/trusty-api",
                "./src/types",
                "./src/utils",
              ],
            },
          ],
        },
      ],
    },
  },
);
