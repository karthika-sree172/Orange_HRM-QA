import { test } from '../../fixtures/customFixtures';
import { DateUtility } from '../../utils/DateUtility';

test.describe('Leave Module Tests @regression', () => {

  test.beforeEach(async ({ loginPage, leavePage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await leavePage.navigateToLeavePage();
  });

  test('TC15: Apply Leave', async ({ leavePage }) => {
    const fromDate = DateUtility.getFutureDate(5);
    const toDate = DateUtility.getFutureDate(7);
    await leavePage.applyLeave('CAN - FMLA', fromDate, toDate, 'Family Vacation');
    // Expect success or no balance error depending on the demo data state
  });

  test('TC16: View My Leave List', async ({ leavePage }) => {
    await leavePage.viewMyLeaveList();
    // Verify list loads
  });
});
