import * as dotenv from 'dotenv';
import * as path from 'path';

export class ConfigurationUtility {
  static loadEnvironment(): void {
    const env = process.env.TEST_ENV || 'qa';
    const envPath = path.resolve(__dirname, '..', `.env.${env}`);
    dotenv.config({ path: envPath });
  }

  static getBaseUrl(): string {
    return process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';
  }

  static getUsername(): string {
    return process.env.USERNAME || 'Admin';
  }

  static getPassword(): string {
    return process.env.PASSWORD || 'admin123';
  }
}
