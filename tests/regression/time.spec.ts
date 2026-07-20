import { test } from '../../fixtures/customFixtures';

test.describe('Time Module Tests @regression', () => {

  test.beforeEach(async ({ loginPage, timePage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await timePage.navigateToTimePage();
  });

  test('TC17: View Employee Timesheet', async ({ timePage }) => {
    // Relying on data present in the demo system
    await timePage.viewTimesheet('a');
  });
});
