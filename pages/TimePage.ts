import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TimePage extends BasePage {
  private readonly timeHeader: Locator;
  private readonly timesheetsLink: Locator;
  private readonly attendanceLink: Locator;
  private readonly employeeNameInput: Locator;
  private readonly viewButton: Locator;

  constructor(page: Page) {
    super(page);
    this.timeHeader = page.locator('.oxd-topbar-header-title').getByRole('heading', { name: 'Time', exact: true });
    this.timesheetsLink = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Timesheets' });
    this.attendanceLink = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Attendance' });
    this.employeeNameInput = page.getByPlaceholder('Type for hints...');
    this.viewButton = page.locator('form').getByRole('button', { name: 'View' });
  }

  async navigateToTimePage(): Promise<void> {
    await this.navigateToSideMenu('Time');
    await expect(this.timeHeader).toBeVisible();
  }

  async viewTimesheet(employeeName: string): Promise<void> {
    await this.timesheetsLink.click();
    await this.selectFromAutocomplete(this.employeeNameInput, employeeName);
    await this.viewButton.click();
  }
}


