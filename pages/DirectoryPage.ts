import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DirectoryPage extends BasePage {
  private readonly directoryHeader: Locator;
  private readonly searchNameInput: Locator;
  private readonly jobTitleDropdown: Locator;
  private readonly locationDropdown: Locator;
  private readonly searchButton: Locator;
  private readonly profileCard: Locator;

  constructor(page: Page) {
    super(page);
    this.directoryHeader = page.locator('.oxd-topbar-header-title').getByRole('heading', { name: 'Directory' });
    this.searchNameInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Employee Name') }).getByPlaceholder('Type for hints...');
    this.jobTitleDropdown = page.locator('.oxd-input-group').filter({ has: page.getByText('Job Title') }).locator('.oxd-select-text');
    this.locationDropdown = page.locator('.oxd-input-group').filter({ has: page.getByText('Location') }).locator('.oxd-select-text');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.profileCard = page.getByAltText('Profile Picture');
  }

  async navigateToDirectoryPage(): Promise<void> {
    await this.navigateToSideMenu('Directory');
    await expect(this.directoryHeader).toBeVisible();
  }

  async searchByName(name: string): Promise<void> {
    await this.selectFromAutocomplete(this.searchNameInput, name);
    await this.searchButton.click();
    
  }

  async searchByJobTitle(jobTitle: string): Promise<void> {
    await this.selectFromDropdown(this.jobTitleDropdown, jobTitle);
    await this.searchButton.click();
    
  }

  async verifyProfileCardVisible(): Promise<void> {
    await expect(async () => {
      const cardCount = await this.profileCard.count();
      const isNoRecordsVisible = await this.page.getByText('No Records Found').isVisible();
      expect(cardCount > 0 || isNoRecordsVisible).toBeTruthy();
    }).toPass({ timeout: 30000 });
  }
}


