import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS, CREDENTIALS } from '../constants/appConstants';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly invalidCredentialsError: Locator;
  private readonly requiredFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
    this.invalidCredentialsError = page.getByRole('alert');
    this.requiredFieldError = page.getByText('Required');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(URLS.LOGIN);
    
  }

  async login(username = CREDENTIALS.VALID_USERNAME, password = CREDENTIALS.VALID_PASSWORD): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async verifyInvalidCredentialsError(): Promise<void> {
    await expect(this.invalidCredentialsError).toBeVisible();
    await expect(this.invalidCredentialsError).toContainText('Invalid credentials');
  }

  async verifyRequiredFieldError(count: number = 1): Promise<void> {
    await expect(this.requiredFieldError).toHaveCount(count);
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
    
  }
}


