import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // Provide an inline tsconfig so esbuild does not walk up to mobile/tsconfig.json,
  // which extends "expo/tsconfig.base" — a package not installed at the root.
  esbuild: {
    tsconfigRaw: JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'bundler',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
      },
    }),
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
  resolve: {
    alias: {
      '@mobile': path.resolve(__dirname, 'mobile/src'),
    },
  },
});
