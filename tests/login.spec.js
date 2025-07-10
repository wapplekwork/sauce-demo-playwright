// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage } = require('../pages/LoginPage');
const { testUsers } = require('../utils/testData');

test.describe('Login Functionality', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('should display login page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked out user', async ({ page }) => {
    const user = testUsers.lockedUser;
    await loginPage.login(user.username, user.password);
    
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test.describe('Invalid Login Attempts', () => {
    testUsers.invalidUsers.forEach((user, index) => {
      test(`should show error for ${user.description}`, async ({ page }) => {
        await loginPage.login(user.username, user.password);
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.length).toBeGreaterThan(0);
      });
    });
  });

  test('should logout successfully', async ({ page }) => {
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    
    await inventoryPage.logout();
    await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});