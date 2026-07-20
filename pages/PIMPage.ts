import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PIMPage extends BasePage {
  private readonly pimHeader: Locator;
  private readonly addEmployeeButton: Locator;
  private readonly employeeIdSearchInput: Locator;
  private readonly employeeNameSearchInput: Locator;
  private readonly searchButton: Locator;
  
  // Add Employee Form
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly employeeIdInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pimHeader = page.locator('.oxd-topbar-header-title').getByRole('heading', { name: 'PIM' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.employeeNameSearchInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Employee Name') }).getByPlaceholder('Type for hints...');
    this.employeeIdSearchInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigateToPIMPage(): Promise<void> {
    await this.navigateToSideMenu('PIM');
    await expect(this.pimHeader).toBeVisible();
  }

  async clickAddEmployee(): Promise<void> {
    await this.addEmployeeButton.click();
    
  }

  async fillAddEmployeeForm(firstName: string, lastName: string, empId: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(empId);
  }

  async saveEmployee(): Promise<void> {
    await this.saveButton.click();
  }

  async searchEmployeeById(empId: string): Promise<void> {
    await this.employeeIdSearchInput.fill(empId);
    await this.searchButton.click();
    
  }
}


