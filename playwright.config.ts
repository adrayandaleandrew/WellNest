import { defineConfig, devices } from '@playwright/test';
import { config as loadEnv } from 'dotenv';

// Load E2E credentials from .env.test (gitignored — set PLAYWRIGHT_ADMIN_EMAIL + PLAYWRIGHT_ADMIN_PASSWORD)
loadEnv({ path: '.env.test' });

const authFile = 'tests/e2e/.auth/user.json';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Authenticate once, save state to file
    {
      name: 'setup',
      testMatch: /global-setup\.ts/,
    },
    // Login flow tests — fresh browser, no stored auth
    {
      name: 'auth',
      testMatch: /admin-login\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    // All other E2E tests — reuse stored auth state
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: authFile },
      dependencies: ['setup'],
      testIgnore: /admin-login\.spec\.ts/,
    },
  ],

  webServer: {
    command: 'npm run dev',
    cwd: 'admin',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
