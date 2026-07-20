import { test } from '../../fixtures/customFixtures';

test.describe('Directory Module Tests @regression', () => {

  test.beforeEach(async ({ loginPage, directoryPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await directoryPage.navigateToDirectoryPage();
  });

  test('TC21: Search Employee by Name', async ({ directoryPage }) => {
    await directoryPage.searchByName('a');
    await directoryPage.verifyProfileCardVisible();
  });

  test('TC22: Search by Job Title', async ({ directoryPage }) => {
    await directoryPage.searchByJobTitle('Chief Executive Officer');
    await directoryPage.verifyProfileCardVisible();
  });
});
