/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { Mode, plugin as mdPlugin } from 'vite-plugin-markdown'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    mdPlugin({
      mode: [Mode.MARKDOWN],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    env: {
      VITE_BASE_API_URL: 'https://mock.codegate.ai',
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
    css: false,
    coverage: {
      include: ['src/**/*.{js,jsx}', 'src/**/*.{ts,tsx}'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/[.]**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'public/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/test-utils.tsx',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/vitest.{workspace,projects}.[jt]s?(on)',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        'src/**/*stories.tsx',
        'src/types/**/*.{ts,tsx}',
      ],
      enabled: false,
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
    },
  },
})
