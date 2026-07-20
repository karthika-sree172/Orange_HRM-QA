import { test } from '../../fixtures/customFixtures';
import { RandomDataGenerator } from '../../utils/RandomDataGenerator';

test.describe('PIM Module Tests @regression', () => {
  let uniqueEmpId: string;

  test.beforeEach(async ({ loginPage, pimPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await pimPage.navigateToPIMPage();
  });

  test('TC13: Add New Employee', async ({ pimPage }) => {
    uniqueEmpId = RandomDataGenerator.getRandomNumber(10000, 99999).toString();
    const firstName = RandomDataGenerator.getFirstName();
    const lastName = RandomDataGenerator.getLastName();

    await pimPage.clickAddEmployee();
    await pimPage.fillAddEmployeeForm(firstName, lastName, uniqueEmpId);
    await pimPage.saveEmployee();
    await pimPage.verifyToastMessage('Successfully Saved');
  });

  test('TC14: Search Employee by ID', async ({ pimPage }) => {
    // Relying on a fixed or newly created ID. Better to create first.
    uniqueEmpId = RandomDataGenerator.getRandomNumber(10000, 99999).toString();
    await pimPage.clickAddEmployee();
    await pimPage.fillAddEmployeeForm('Test', 'User', uniqueEmpId);
    await pimPage.saveEmployee();
    await pimPage.verifyToastMessage('Successfully Saved');

    await pimPage.navigateToPIMPage(); // Reset to search
    await pimPage.searchEmployeeById(uniqueEmpId);
  });
});
