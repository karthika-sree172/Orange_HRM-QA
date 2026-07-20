import { Page, Locator } from '@playwright/test';
import * as path from 'path';

export class FileUploadUtility {
  static async uploadFile(page: Page, locator: Locator, fileName: string): Promise<void> {
    const filePath = path.join(__dirname, '..', 'test-data', fileName);
    await locator.setInputFiles(filePath);
  }
}
