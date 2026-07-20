import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly dashboardHeader: Locator;
  private readonly quickLaunchWidgets: Locator;
  private readonly timeAtWorkWidget: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.quickLaunchWidgets = page.locator('.orangehrm-quick-launch-heading');
    this.timeAtWorkWidget = page.getByText('Time at Work');
  }

  async verifyDashboardIsDisplayed(): Promise<void> {
    await expect(this.dashboardHeader).toBeVisible();
  }

  async verifyWidgetsAreDisplayed(): Promise<void> {
    await expect(this.quickLaunchWidgets.first()).toBeVisible();
    await expect(this.timeAtWorkWidget).toBeVisible();
  }
}


