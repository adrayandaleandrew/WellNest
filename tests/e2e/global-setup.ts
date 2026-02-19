import { test as setup, expect } from '@playwright/test';

const authFile = 'tests/e2e/.auth/user.json';

/**
 * Runs once before functional E2E specs.
 * Logs in as admin and saves the auth state so all subsequent tests
 * in the 'chromium' project don't need to re-authenticate.
 *
 * Requires PLAYWRIGHT_ADMIN_EMAIL and PLAYWRIGHT_ADMIN_PASSWORD to be set.
 * Set them in .env.test at the repo root (gitignored).
 */
setup('authenticate as admin', async ({ page }) => {
  const email = process.env.PLAYWRIGHT_ADMIN_EMAIL;
  const password = process.env.PLAYWRIGHT_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Missing E2E credentials. Create .env.test at the repo root with:\n' +
        '  PLAYWRIGHT_ADMIN_EMAIL=<your-admin-email>\n' +
        '  PLAYWRIGHT_ADMIN_PASSWORD=<your-admin-password>',
    );
  }

  await page.goto('/');
  await page.getByTestId('email-input').fill(email);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-button').click();

  await page.waitForURL('**/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Persist auth cookies/localStorage for reuse in subsequent tests
  await page.context().storageState({ path: authFile });
});
