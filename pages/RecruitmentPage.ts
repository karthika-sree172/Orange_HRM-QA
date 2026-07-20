import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecruitmentPage extends BasePage {
  private readonly recruitmentHeader: Locator;
  private readonly addCandidateButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly contactInput: Locator;
  private readonly saveButton: Locator;
  private readonly candidateSearchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.recruitmentHeader = page.locator('.oxd-topbar-header-title').getByRole('heading', { name: 'Recruitment' });
    this.addCandidateButton = page.getByRole('button', { name: 'Add' });
    
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Email') }).locator('input');
    this.contactInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Contact Number') }).locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    
    this.candidateSearchInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Candidate Name') }).getByPlaceholder('Type for hints...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async navigateToRecruitmentPage(): Promise<void> {
    await this.navigateToSideMenu('Recruitment');
    await expect(this.recruitmentHeader).toBeVisible();
  }

  async clickAddCandidate(): Promise<void> {
    await this.addCandidateButton.click();
    
  }

  async fillCandidateForm(firstName: string, lastName: string, email: string, contact: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.contactInput.fill(contact);
  }

  async saveCandidate(): Promise<void> {
    await this.saveButton.click();
    
  }

  async searchCandidate(name: string): Promise<void> {
    await this.selectFromAutocomplete(this.candidateSearchInput, name);
    await this.searchButton.click();
  }
}


