import { test } from '../../fixtures/customFixtures';
import { RandomDataGenerator } from '../../utils/RandomDataGenerator';

test.describe('Buzz Module Tests @smoke', () => {

  test.beforeEach(async ({ loginPage, buzzPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    await buzzPage.navigateToBuzzPage();
  });

  test('TC23: Create Post', async ({ buzzPage }) => {
    const postContent = `Automation test post - ${RandomDataGenerator.getRandomString(10)}`;
    await buzzPage.createPost(postContent);
    await buzzPage.verifyToastMessage('Successfully Saved');
  });

  test('TC24: Like Post', async ({ buzzPage }) => {
    await buzzPage.likeFirstPost();
  });
});
