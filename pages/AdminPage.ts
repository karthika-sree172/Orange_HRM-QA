import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  private readonly adminHeader: Locator;
  private readonly addUserButton: Locator;
  private readonly systemUsersTable: Locator;
  private readonly searchUsernameInput: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;

  // Add User Form Locators
  private readonly userRoleDropdown: Locator;
  private readonly employeeNameInput: Locator;
  private readonly statusDropdown: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly saveButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.adminHeader = page.locator('.oxd-topbar-header-title').getByRole('heading', { name: 'Admin' });
    this.addUserButton = page.getByRole('button', { name: 'Add' });
    this.systemUsersTable = page.locator('.oxd-table');
    
    // Search locators
    this.searchUsernameInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Username') }).locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    
    // Add user locators
    this.userRoleDropdown = page.locator('.oxd-input-group').filter({ has: page.getByText('User Role') }).locator('.oxd-select-text');
    this.employeeNameInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Employee Name') }).getByPlaceholder('Type for hints...');
    this.statusDropdown = page.locator('.oxd-input-group').filter({ has: page.getByText('Status') }).locator('.oxd-select-text');
    this.usernameInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Username') }).locator('input');
    this.passwordInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Password', { exact: true }) }).locator('input');
    this.confirmPasswordInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Confirm Password') }).locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async navigateToAdminPage(): Promise<void> {
    await this.navigateToSideMenu('Admin');
    await expect(this.adminHeader).toBeVisible();
  }

  async searchUser(username: string): Promise<void> {
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
    
  }

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
    
  }

  async clickAddUser(): Promise<void> {
    await this.addUserButton.click();
    
  }

  async fillAddUserForm(userRole: string, employeeName: string, status: string, username: string, password: string): Promise<void> {
    // Select User Role
    await this.selectFromDropdown(this.userRoleDropdown, userRole);

    // Fill Employee Name (Auto-complete)
    await this.selectFromAutocomplete(this.employeeNameInput, employeeName);

    // Select Status
    await this.selectFromDropdown(this.statusDropdown, status);

    // Fill Credentials
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  async deleteUser(username: string): Promise<void> {
    await this.searchUser(username);
    const row = this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name: username, exact: true }) });
    const deleteButton = row.getByRole('button').filter({ has: this.page.locator('.bi-trash') });
    await deleteButton.click();
    const confirmDelete = this.page.getByRole('button', { name: 'Yes, Delete' });
    await confirmDelete.click();
  }
}


