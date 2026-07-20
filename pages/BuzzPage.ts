import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BuzzPage extends BasePage {
  private readonly buzzHeader: Locator;
  private readonly postTextarea: Locator;
  private readonly postButton: Locator;
  private readonly likeButton: Locator;
  private readonly firstPost: Locator;

  constructor(page: Page) {
    super(page);
    this.buzzHeader = page.getByRole('heading', { name: 'Buzz' });
    this.postTextarea = page.getByPlaceholder('What\'s on your mind?');
    this.postButton = page.getByRole('button', { name: 'Post', exact: true });
    this.firstPost = page.locator('.oxd-grid-item').first();
    this.likeButton = this.firstPost.locator('.orangehrm-buzz-post-actions button').first();
  }

  async navigateToBuzzPage(): Promise<void> {
    await this.navigateToSideMenu('Buzz');
    await expect(this.buzzHeader).toBeVisible();
  }

  async createPost(content: string): Promise<void> {
    await this.postTextarea.fill(content);
    await this.postButton.click();
    
  }

  async likeFirstPost(): Promise<void> {
    await this.likeButton.click();
  }
}


