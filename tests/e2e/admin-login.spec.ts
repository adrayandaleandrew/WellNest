import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

/**
 * Admin login flow — runs in the 'auth' project (no stored auth state).
 *
 * Credentials come from .env.test (gitignored):
 *   PLAYWRIGHT_ADMIN_EMAIL=<admin-email>
 *   PLAYWRIGHT_ADMIN_PASSWORD=<admin-password>
 */
test.describe('Admin login', () => {
  test('login form is visible on the root route', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('successful login redirects to /dashboard', async ({ page }) => {
    const email = process.env.PLAYWRIGHT_ADMIN_EMAIL;
    const password = process.env.PLAYWRIGHT_ADMIN_PASSWORD;

    if (!email || !password) {
      test.skip(true, 'PLAYWRIGHT_ADMIN_EMAIL / PLAYWRIGHT_ADMIN_PASSWORD not set in .env.test');
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email!, password!);

    await page.waitForURL('**/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('wrong credentials show an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@example.com', 'WrongPass1');

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
