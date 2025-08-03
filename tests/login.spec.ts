import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testUsers } from '../utils/testData';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage; // Initialize LoginPage
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('should display login page correctly', async ({ page }: { page: Page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  test('should login successfully with valid credentials', async ({ page }: { page: Page }) => {
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked out user', async ({ page }: { page: Page }) => {
    const user = testUsers.lockedUser;
    await loginPage.login(user.username, user.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test.describe('Invalid Login Attempts', () => {
    testUsers.invalidUsers.forEach((user, index) => {
      test(`should show error for ${user.description}`, async ({ page }: { page: Page }) => {
        await loginPage.login(user.username, user.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
        if (errorMessage) {
          expect(errorMessage.length).toBeGreaterThan(0);
        }
      });
    });
  });

  test('should logout successfully', async ({ page }: { page: Page }) => {
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    await inventoryPage.logout();
    await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});
