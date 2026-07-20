import { Page, TestInfo } from '@playwright/test';
import * as path from 'path';

export class ScreenshotUtility {
  static async takeScreenshot(page: Page, name: string, testInfo?: TestInfo): Promise<void> {
    const screenshotPath = path.join('screenshots', `${name}-${Date.now()}.png`);
    const screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });
    
    if (testInfo) {
      await testInfo.attach(name, { body: screenshot, contentType: 'image/png' });
    }
  }
}
