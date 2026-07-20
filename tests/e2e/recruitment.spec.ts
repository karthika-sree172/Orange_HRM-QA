import { test } from '../../fixtures/customFixtures';
import { RandomDataGenerator } from '../../utils/RandomDataGenerator';

test.describe('Recruitment Module Tests @e2e', () => {

  test.beforeEach(async ({ loginPage, recruitmentPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await recruitmentPage.navigateToRecruitmentPage();
  });

  test('TC18: Add Candidate', async ({ recruitmentPage }) => {
    const firstName = RandomDataGenerator.getFirstName();
    const lastName = RandomDataGenerator.getLastName();
    const email = RandomDataGenerator.getEmail();
    const contact = RandomDataGenerator.getPhoneNumber();

    await recruitmentPage.clickAddCandidate();
    await recruitmentPage.fillCandidateForm(firstName, lastName, email, contact);
    await recruitmentPage.saveCandidate();
    await recruitmentPage.verifyToastMessage('Successfully Saved');
  });

  test('TC19: Search Candidate', async ({ recruitmentPage }) => {
    await recruitmentPage.searchCandidate('a');
  });
});
