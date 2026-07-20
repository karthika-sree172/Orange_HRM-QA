import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  private readonly leaveHeader: Locator;
  private readonly applyLeaveLink: Locator;
  private readonly leaveTypeDropdown: Locator;
  private readonly fromDateInput: Locator;
  private readonly toDateInput: Locator;
  private readonly commentTextarea: Locator;
  private readonly applyButton: Locator;
  private readonly myLeaveLink: Locator;

  constructor(page: Page) {
    super(page);
    this.leaveHeader = page.locator('.oxd-topbar-header-title').getByRole('heading', { name: 'Leave' });
    this.applyLeaveLink = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'Apply' });
    this.leaveTypeDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Leave Type' }).locator('.oxd-select-text');
    this.fromDateInput = page.locator('.oxd-input-group').filter({ hasText: 'From Date' }).locator('input');
    this.toDateInput = page.locator('.oxd-input-group').filter({ hasText: 'To Date' }).locator('input');
    this.commentTextarea = page.locator('.oxd-input-group').filter({ hasText: 'Comments' }).locator('textarea');
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.myLeaveLink = page.locator('.oxd-topbar-body-nav-tab').filter({ hasText: 'My Leave' });
  }

  async navigateToLeavePage(): Promise<void> {
    await this.navigateToSideMenu('Leave');
    await expect(this.leaveHeader).toBeVisible();
  }

  async applyLeave(leaveType: string, fromDate: string, toDate: string, comment: string): Promise<void> {
    await this.applyLeaveLink.click();
    
    
    await this.selectFromDropdown(this.leaveTypeDropdown, leaveType);

    await this.fromDateInput.fill(fromDate);
    await this.toDateInput.fill(toDate);
    await this.commentTextarea.fill(comment);
    
    await this.applyButton.click();
  }

  async viewMyLeaveList(): Promise<void> {
    await this.myLeaveLink.click();
    
  }
}


