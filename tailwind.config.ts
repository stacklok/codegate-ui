import { stacklokTailwindPreset } from '@stacklok/ui-kit-mono'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@stacklok/ui-kit-mono/dist/**/*.js',
  ],
  presets: [stacklokTailwindPreset],
} satisfies Config
