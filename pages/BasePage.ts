import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyCurrentUrl(expectedUrlPart: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedUrlPart));
  }

  // Common side menu navigation (used by multiple pages after login)
  async navigateToSideMenu(menuName: string): Promise<void> {
    await this.page.getByRole('link', { name: menuName }).click();
  }

  async logout(): Promise<void> {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(this.page).toHaveURL(/login/);
  }

  async verifyToastMessage(expectedMessage: string): Promise<void> {
    const toast = this.page.locator('.oxd-toast-content').filter({ hasText: expectedMessage });
    await expect(toast).toBeVisible({ timeout: 20000 });
    await expect(toast).toBeHidden({ timeout: 20000 });
  }

  async selectFromAutocomplete(inputLocator: Locator, text: string): Promise<void> {
    await expect(this.page.locator('.oxd-form-loader')).toBeHidden({ timeout: 30000 });
    await inputLocator.fill(text);
    const listbox = this.page.getByRole('listbox');
    await expect(listbox).toBeVisible({ timeout: 30000 });
    const option = listbox.getByRole('option').filter({ hasNotText: 'Searching' }).first();
    await expect(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }

  async selectFromDropdown(dropdownLocator: Locator, optionName: string): Promise<void> {
    await expect(this.page.locator('.oxd-form-loader')).toBeHidden({ timeout: 30000 });
    await dropdownLocator.click();
    const listbox = this.page.getByRole('listbox');
    const option = listbox.getByRole('option', { name: optionName, exact: true });
    await expect(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }
}

