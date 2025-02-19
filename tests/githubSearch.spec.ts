import { expect, test } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

// Helper function for page navigation
const navigateTo = async (page, username = '') => {
  await page.goto(`${BASE_URL}${username ? `?username=${username}` : ''}`);
};

// Go back to the home page after each test run
test.beforeEach(async ({ page }) => {
  await navigateTo(page);
});

test.describe('Github Users Explorer', () => {
  test('should render the user list when user presses enter', async ({
    page,
  }) => {
    const searchInput = page.getByTestId('username-input');
    await searchInput.fill('alex');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/.*?username=alex/);
    await expect(page.getByTestId('user-list-skeleton')).toBeVisible();
    await expect(page.getByTestId('user-list')).toBeVisible();
  });

  test('should render the user list when clicking submit', async ({ page }) => {
    const searchInput = page.getByTestId('username-input');
    await searchInput.fill('john');
    await page.getByTestId('submit-form').click();

    await expect(page).toHaveURL(/.*?username=john/);
    await expect(page.getByTestId('user-list')).toBeVisible();
    await expect(page.getByTestId('user-list-item')).toHaveCount(5);
  });

  test('should prefill input when query param exists', async ({ page }) => {
    await navigateTo(page, 'raj');
    await expect(page.getByTestId('username-input')).toHaveValue('raj');
  });

  test('should reset form on clicking clear icon', async ({ page }) => {
    await navigateTo(page, 'mark');
    await page.getByTestId('clear-input-button').click();
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByTestId('username-input')).toBeEmpty();
    await expect(page.getByTestId('user-list')).not.toBeVisible();
  });

  test('should show error message on API failure', async ({ page }) => {
    await page.route('**/search/users*', (route) => route.abort('failed'));
    await navigateTo(page, 'mark');
    await expect(page.getByTestId('error-msg')).toContainText(
      'Error fetching the user data'
    );
  });

  test('should show no users message when no result found', async ({
    page,
  }) => {
    await navigateTo(page, 'dfgsddasfafasfasdfads');
    await expect(page.getByTestId('no-user-msg')).toContainText(
      'No users available with username "dfgsddasfafasfasdfads"'
    );
  });
});

// Github Repositories Tests
test.describe('Github Repositories Explorer', () => {
  test('should show repositories on clicking user', async ({ page }) => {
    await navigateTo(page, 'andy');
    await page.getByTestId('user-list-item').first().click();
    await expect(page.getByTestId('repositories-list-skeleton')).toBeVisible();
    await expect(page.getByTestId('repository-list-wrapper')).toBeVisible();
  });

  test('should show error message on repository API failure', async ({
    page,
  }) => {
    await navigateTo(page, 'omco');
    await page.route('**/users/**', (route) => route.abort('failed'));
    await page.getByTestId('user-list-item').first().click();
    await expect(page.getByTestId('error-msg')).toContainText(
      'Error fetching the user repositories data'
    );
  });

  test('should show no repositories message when no result found', async ({
    page,
  }) => {
    await navigateTo(page, 'asdfasd');
    await page.getByTestId('user-list-item').first().click();
    await expect(page.getByTestId('no-repositories-msg')).toContainText(
      'No repositories available for "asdfasd"'
    );
  });
});
