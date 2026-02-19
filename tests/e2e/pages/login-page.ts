import { type Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.page.getByTestId('email-input').fill(email);
    await this.page.getByTestId('password-input').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  get emailInput() {
    return this.page.getByTestId('email-input');
  }

  get passwordInput() {
    return this.page.getByTestId('password-input');
  }

  get loginButton() {
    return this.page.getByTestId('login-button');
  }

  get errorMessage() {
    return this.page.getByTestId('error-message');
  }
}
