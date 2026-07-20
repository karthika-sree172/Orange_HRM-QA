import { test } from '../../fixtures/customFixtures';
import { RandomDataGenerator } from '../../utils/RandomDataGenerator';

test.describe('Admin Module Tests @sanity @regression', () => {
  let uniqueUsername: string;

  test.beforeEach(async ({ loginPage, adminPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await adminPage.navigateToAdminPage();
  });

  test('TC09: Search User by valid username', async ({ adminPage }) => {
    await adminPage.searchUser('Admin');
    // Basic verification - should return some record or specific table row count
    // Assertions would ideally verify the row data
  });

  test('TC10: Reset Search', async ({ adminPage }) => {
    await adminPage.searchUser('Admin');
    await adminPage.resetSearch();
  });

  test('TC11: Add New System User', async ({ adminPage }) => {
    uniqueUsername = 'QA' + RandomDataGenerator.getRandomString(5);
    await adminPage.clickAddUser();
    await adminPage.fillAddUserForm('Admin', 'a', 'Enabled', uniqueUsername, 'Admin@123');
    await adminPage.clickSave();
    await adminPage.verifyToastMessage('Successfully Saved');
  });
  
  test('TC12: Delete System User', async ({ adminPage }) => {
    uniqueUsername = 'QA' + RandomDataGenerator.getRandomString(5);
    // Setup data
    await adminPage.clickAddUser();
    await adminPage.fillAddUserForm('ESS', 'a', 'Enabled', uniqueUsername, 'Admin@123');
    await adminPage.clickSave();
    await adminPage.verifyToastMessage('Successfully Saved');

    // Test Delete
    await adminPage.deleteUser(uniqueUsername);
    await adminPage.verifyToastMessage('Successfully Deleted');
  });
});
