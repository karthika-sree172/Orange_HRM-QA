import { test, expect } from '../../fixtures/customFixtures';
import { CREDENTIALS } from '../../constants/appConstants';

test.describe('Login Tests @smoke', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
  });

  test('TC01: Valid Login', async ({ loginPage, dashboardPage }) => {
    await loginPage.login();
    await dashboardPage.verifyDashboardIsDisplayed();
  });

  test('TC02: Invalid Username', async ({ loginPage }) => {
    await loginPage.login(CREDENTIALS.INVALID_USERNAME, CREDENTIALS.VALID_PASSWORD);
    await loginPage.verifyInvalidCredentialsError();
  });

  test('TC03: Invalid Password', async ({ loginPage }) => {
    await loginPage.login(CREDENTIALS.VALID_USERNAME, CREDENTIALS.INVALID_PASSWORD);
    await loginPage.verifyInvalidCredentialsError();
  });

  test('TC04: Empty Username', async ({ loginPage }) => {
    await loginPage.enterPassword(CREDENTIALS.VALID_PASSWORD);
    await loginPage.clickLogin();
    await loginPage.verifyRequiredFieldError(1);
  });

  test('TC05: Empty Password', async ({ loginPage }) => {
    await loginPage.enterUsername(CREDENTIALS.VALID_USERNAME);
    await loginPage.clickLogin();
    await loginPage.verifyRequiredFieldError(1);
  });

  test('TC06: Empty Credentials', async ({ loginPage }) => {
    await loginPage.clickLogin();
    await loginPage.verifyRequiredFieldError(2);
  });

  test('TC07: Forgot Password Link', async ({ loginPage, page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/.*requestPasswordResetCode/);
  });

  test('TC08: Logout Verification', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.login();
    await dashboardPage.verifyDashboardIsDisplayed();
    await dashboardPage.logout();
    await expect(page).toHaveURL(/.*login/);
  });
});
