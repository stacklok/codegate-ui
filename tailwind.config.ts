import { stacklokTailwindPreset } from "@stacklok/ui-kit-mono";
import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@stacklok/ui-kit-mono/dist/**/*.js",
  ],
  presets: [stacklokTailwindPreset],
  theme: {
    ...stacklokTailwindPreset.theme,
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--gray-950)",
            "--tw-prose-headings": "var(--gray-950)",
            "--tw-prose-lead": "var(--gray-600)",
            "--tw-prose-links": "var(--gray-950)",
            "--tw-prose-bold": "var(--gray-950)",
            "--tw-prose-counters": "var(--gray-500)",
            "--tw-prose-bullets": "var(--gray-300)",
            "--tw-prose-hr": "var(--gray-200)",
            "--tw-prose-quotes": "var(--gray-950)",
            "--tw-prose-quote-borders": "var(--gray-200)",
            "--tw-prose-captions": "var(--gray-500)",
            "--tw-prose-code": "var(--gray-950)",
            "--tw-prose-pre-code": "var(--gray-200)",
            "--tw-prose-pre-bg": "var(--gray-800)",
            "--tw-prose-th-borders": "var(--gray-300)",
            "--tw-prose-td-borders": "var(--gray-200)",
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: "var(--font-title)",
              fontWeight: "600",
            },
          },
        },
      }),
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;
