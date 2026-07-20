import { test } from '../../fixtures/customFixtures';
import { RandomDataGenerator } from '../../utils/RandomDataGenerator';

test.describe('My Info Module Tests @sanity', () => {

  test.beforeEach(async ({ loginPage, myInfoPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await myInfoPage.navigateToMyInfoPage();
  });

  test('TC20: Update Personal Details', async ({ myInfoPage }) => {
    const newFirstName = RandomDataGenerator.getFirstName();
    const newLastName = RandomDataGenerator.getLastName();

    await myInfoPage.updatePersonalDetails(newFirstName, newLastName);
    await myInfoPage.verifyToastMessage('Successfully Updated');
  });
});
