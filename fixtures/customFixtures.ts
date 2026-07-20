import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { PIMPage } from '../pages/PIMPage';
import { LeavePage } from '../pages/LeavePage';
import { TimePage } from '../pages/TimePage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { DirectoryPage } from '../pages/DirectoryPage';
import { BuzzPage } from '../pages/BuzzPage';
import * as testData from '../test-data/users.json';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  pimPage: PIMPage;
  leavePage: LeavePage;
  timePage: TimePage;
  recruitmentPage: RecruitmentPage;
  myInfoPage: MyInfoPage;
  directoryPage: DirectoryPage;
  buzzPage: BuzzPage;
  testData: any;
};

export const test = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PIMPage(page));
  },
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },
  timePage: async ({ page }, use) => {
    await use(new TimePage(page));
  },
  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  },
  myInfoPage: async ({ page }, use) => {
    await use(new MyInfoPage(page));
  },
  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },
  buzzPage: async ({ page }, use) => {
    await use(new BuzzPage(page));
  },
  testData: async ({}, use: any) => {
    await use(testData);
  }
});

export { expect } from '@playwright/test';
