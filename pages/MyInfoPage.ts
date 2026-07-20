import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyInfoPage extends BasePage {
  private readonly myInfoHeader: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myInfoHeader = page.getByRole('heading', { name: 'PIM' }); // My Info shows PIM header
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.locator('form').filter({ has: page.getByPlaceholder('First Name') }).getByRole('button', { name: 'Save' });
  }

  async navigateToMyInfoPage(): Promise<void> {
    await this.navigateToSideMenu('My Info');
    await expect(this.myInfoHeader).toBeVisible();
  }

  async updatePersonalDetails(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }
}


